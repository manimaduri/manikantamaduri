"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactResult } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/email";
import { appendContactRow } from "@/lib/sheets";

/**
 * Contact pipeline (no DB):
 *   validate → honeypot → Turnstile → rate-limit → Resend email → Sheets log.
 * Email is the source of truth; a failed Sheets append does not fail the request.
 */
export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
    token: formData.get("cf-turnstile-response") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // A filled honeypot ("company") looks like a generic validation failure to bots.
    return { ok: false, error: "Please check the form and try again.", fieldErrors };
  }

  const { name, email, message, token } = parsed.data;

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";

  const human = await verifyTurnstile(token, ip);
  if (!human) {
    return { ok: false, error: "Bot verification failed. Please retry." };
  }

  const { success } = await checkRateLimit(ip);
  if (!success) {
    return {
      ok: false,
      error: "Too many messages from this network. Please try again later.",
    };
  }

  const { sent, error } = await sendContactEmail({ name, email, message });
  if (!sent) {
    const msg =
      error === "email-not-configured"
        ? "Messaging isn't configured yet. Please email me directly."
        : "Something went wrong sending your message. Please try again.";
    return { ok: false, error: msg };
  }

  // Non-fatal structured log.
  await appendContactRow({
    timestamp: new Date().toISOString(),
    name,
    email,
    message,
  });

  return { ok: true };
}
