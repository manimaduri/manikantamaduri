"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile, socials } from "@/content/data/profile";
import { LinkButton } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Typewriter } from "./typewriter";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 py-12 sm:px-8 "
    >
      {/* Decorative animated gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        style={{ animation: reduce ? undefined : "var(--animate-glow-pulse)" }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.firstName}</span>.
            <br />
            <span className="text-foreground">I&apos;m a </span>
            <Typewriter words={[...profile.roles]} />
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="/#work" variant="primary">
              View my work <ArrowUpRight className="size-4" />
            </LinkButton>
            <LinkButton href="/#contact" variant="outline">
              Get in touch
            </LinkButton>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowDown className="size-4" /> Résumé
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-accent-2" /> {profile.location}
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-accent-2"
                >
                  <SocialIcon name={s.icon} className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
