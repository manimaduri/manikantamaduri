"use client";

import { useActionState, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/actions/contact";
import { contactSchema, type ContactResult } from "@/lib/contact-schema";
import { profile, socials } from "@/content/data/profile";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const MESSAGE_MAX = 3000;

type Field = "name" | "email" | "message";

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:bg-surface focus:outline-none focus:ring-2",
    hasError
      ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
      : "border-border focus:border-accent/60 focus:ring-accent/30",
  );
}

export function Contact() {
  const [state, formAction, isPending] = useActionState<
    ContactResult | null,
    FormData
  >(submitContact, null);

  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [clientErrors, setClientErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  // true when Turnstile is not configured (local dev) or after user passes it
  const [turnstileReady, setTurnstileReady] = useState(!TURNSTILE_SITE_KEY);
  const [turnstileError, setTurnstileError] = useState(false);

  function validateField(field: Field, value: string): string | undefined {
    const result = contactSchema.shape[field].safeParse(value.trim());
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function validateAll(): Partial<Record<Field, string>> {
    const errs: Partial<Record<Field, string>> = {};
    for (const field of ["name", "email", "message"] as const) {
      const err = validateField(field, values[field]);
      if (err) errs[field] = err;
    }
    return errs;
  }

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setClientErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  }

  function handleBlur(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setClientErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Touch all fields so every error becomes visible
    setTouched({ name: true, email: true, message: true });
    const errs = validateAll();
    setClientErrors(errs);

    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileReady) {
      e.preventDefault();
      setTurnstileError(true);
      return;
    }
  }

  // Merge server-side field errors with client-side ones (server wins on overlap)
  const serverFieldErrors =
    state && !state.ok ? (state.fieldErrors ?? {}) : {};
  function fieldError(field: Field): string | undefined {
    return serverFieldErrors[field] ?? clientErrors[field];
  }

  const charsLeft = MESSAGE_MAX - values.message.length;

  return (
    <Section id="contact">
      <div className="glass overflow-hidden rounded-3xl p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: invitation + direct contacts */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="text-gradient">great.</span>
                </>
              }
              description="Have a role, project, or idea in mind? Drop a message — I usually reply within a day."
            />

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-accent-2"
              >
                <Mail className="size-4 text-accent-2" /> {profile.email}
              </a>
              <p className="inline-flex items-center gap-2.5 text-muted">
                <MapPin className="size-4 text-accent-2" /> {profile.location}
              </p>
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="rounded-full border border-border bg-surface/50 p-2.5 text-muted transition-all hover:border-accent/60 hover:text-accent-2"
                  >
                    <SocialIcon name={s.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            {state?.ok ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center">
                <CheckCircle2 className="size-10 text-emerald-400" />
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                action={formAction}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Honeypot */}
                <div
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label>
                    Company
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={inputClass(!!fieldError("name"))}
                      autoComplete="name"
                    />
                    <FieldError msg={fieldError("name")} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={inputClass(!!fieldError("email"))}
                      autoComplete="email"
                    />
                    <FieldError msg={fieldError("email")} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or role…"
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`${inputClass(!!fieldError("message"))} resize-none`}
                  />
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <FieldError msg={fieldError("message")} />
                    <span
                      className={cn(
                        "ml-auto shrink-0 text-xs tabular-nums",
                        charsLeft < 200 ? "text-amber-400" : "text-faint",
                        charsLeft < 0 && "text-red-400",
                      )}
                    >
                      {values.message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                </div>

                {/* Turnstile */}
                {TURNSTILE_SITE_KEY ? (
                  <div>
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      options={{ theme: "dark" }}
                      onSuccess={() => {
                        setTurnstileReady(true);
                        setTurnstileError(false);
                      }}
                      onError={() => {
                        setTurnstileReady(false);
                        setTurnstileError(true);
                      }}
                      onExpire={() => {
                        setTurnstileReady(false);
                        setTurnstileError(false);
                      }}
                    />
                    {turnstileError && (
                      <p className="mt-1.5 text-xs text-red-400">
                        Please complete the verification above before sending.
                      </p>
                    )}
                  </div>
                ) : null}

                {/* Server-level error */}
                {state && !state.ok && !state.fieldErrors ? (
                  <p className="inline-flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="size-4" /> {state.error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? "Sending…" : "Send message"}
                  <Send className="size-4" />
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function FieldError({ msg }: { msg: string | undefined }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="size-3 shrink-0" />
      {msg}
    </p>
  );
}
