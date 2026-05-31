import Link from "next/link";
import { profile, socials } from "@/content/data/profile";
import { navLinks } from "@/lib/site";
import { SocialIcon } from "@/components/ui/social-icon";

export function SiteFooter() {
  const year = 2026; // build-time constant; bump on yearly redeploy

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-lg font-bold">
            <span className="text-gradient">{profile.name}</span>
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {profile.headline}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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

      <div className="border-t border-border/60 py-5">
        <p className="mx-auto max-w-6xl px-5 text-center text-xs text-faint sm:px-8">
          © {year} {profile.name}. Built with Next.js, Tailwind CSS & Framer
          Motion.
        </p>
      </div>
    </footer>
  );
}
