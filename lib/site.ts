import { profile } from "@/content/data/profile";

/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const site = {
  name: profile.name,
  title: `${profile.name} — Full-Stack & Gen AI Developer`,
  description: profile.headline,
  url: siteUrl,
  locale: "en_US",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;
