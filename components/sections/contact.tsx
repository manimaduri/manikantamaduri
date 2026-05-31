"use client";

import { useActionState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/actions/contact";
import type { ContactResult } from "@/lib/contact-schema";
import { profile, socials } from "@/content/data/profile";
import { SocialIcon } from "@/components/ui/social-icon";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClass =
  "w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent/60 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/30";

export function Contact() {
  const [state, formAction, isPending] = useActionState<
    ContactResult | null,
    FormData
  >(submitContact, null);

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
              <form action={formAction} className="space-y-4" noValidate>
                {/* Honeypot — visually hidden, off accessibility tree */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
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
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className={fieldClass}
                    />
                    <FieldError state={state} field="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                      className={fieldClass}
                    />
                    <FieldError state={state} field="email" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or role…"
                    required
                    className={`${fieldClass} resize-none`}
                  />
                  <FieldError state={state} field="message" />
                </div>

                {TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    options={{ theme: "dark" }}
                  />
                ) : null}

                {state && !state.ok ? (
                  <p className="inline-flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="size-4" /> {state.error}
                  </p>
                ) : null}

                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
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

function FieldError({
  state,
  field,
}: {
  state: ContactResult | null;
  field: string;
}) {
  const msg = state && !state.ok ? state.fieldErrors?.[field] : undefined;
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-400">{msg}</p>;
}
