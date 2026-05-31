import type { SocialLink } from "@/content/data/types";

interface PersonJsonLdProps {
  profile: {
    name: string;
    headline: string;
    email: string;
    location: string;
  };
  socials: SocialLink[];
  url: string;
}

/** Structured data (schema.org Person) for rich search results. */
export function PersonJsonLd({ profile, socials, url }: PersonJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url,
    jobTitle: "Full-Stack & Gen AI Developer",
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    description: profile.headline,
    sameAs: socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  // Escape </script> sequences so they can't break out of the script tag.
  const safe = JSON.stringify(json)
    .replace(/</g, "\\u003c")
    .replace(/\//g, "\\u002f");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
