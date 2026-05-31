import { z } from "zod";

/** Shared validation schema for the contact form (used client + server). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80)
    .regex(/^[^\r\n]*$/, "Invalid characters in name"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(160)
    .regex(/^[^\r\n]*$/, "Invalid email format"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(3000, "Message is too long"),
  // Honeypot: must stay empty. Real users never see this field.
  company: z.string().max(0).optional().default(""),
  // Cloudflare Turnstile token (optional when Turnstile isn't configured).
  token: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };
