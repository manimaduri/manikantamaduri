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

  return (
    <script
      type="application/ld+json"
      // JSON is fully controlled by us — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
