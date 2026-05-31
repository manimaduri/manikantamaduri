import { Resend } from "resend";
import { profile } from "@/content/data/profile";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

/** Sender must be on a Resend-verified domain in production. */
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? profile.email;

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/**
 * Deliver a contact-form message by email.
 * Returns false when Resend isn't configured (local dev) — caller decides.
 */
export async function sendContactEmail({
  name,
  email,
  message,
}: ContactMessage): Promise<{ sent: boolean; error?: string }> {
  if (!resend) return { sent: false, error: "email-not-configured" };

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) return { sent: false, error: error.message };
  return { sent: true };
}
