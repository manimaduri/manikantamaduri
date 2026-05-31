import type { SocialLink } from "./types";

export const profile = {
  name: "Manikanta Maduri",
  firstName: "Manikanta",
  /** Roles cycled through the animated hero typing line. */
  roles: [
    "Full-Stack Developer",
    "Gen AI / LLM Engineer",
    "React Native Developer",
    "System Designer",
  ],
  headline:
    "Full-Stack Developer building AI-enabled, scalable web & mobile products.",
  location: "Hyderabad, Telangana",
  email: "manikantamaduri2023@gmail.com",
  phone: "+91 91103 81506",
  /** Path to the downloadable resume under /public. */
  resumeUrl: "/Manikanta_Maduri_Full_Stack_GenAI.pdf",
  summary:
    "Full-Stack Developer with 3+ years of experience building AI-enabled, scalable web and mobile products using Next.js, React, Django, Node.js, React Native, and PostgreSQL. I ship LLM-powered features — RAG workflows, vector search, document intelligence, and AI API integrations — with a strong foundation in system design, API development, performance optimization, and team leadership.",
  /** Deeper narrative shown in the About section (different from hero summary). */
  bio: "I've led teams of up to 12 developers, owned cloud infrastructure across AWS, GCP, and Azure — including serverless architectures — and delivered LLM-powered products that run in real business environments. My work spans document intelligence and RAG pipelines, CRM platforms, AI-driven job portals, EdTech systems, political-tech mobile apps with offline sync, and cross-platform mobile. I care about system design, clean architecture, and shipping things that actually hold up at scale.",
  /** Headline stats shown in the About strip. */
  stats: [
    { value: "3+", label: "Years experience" },
    { value: "15+", label: "Projects shipped" },
    { value: "12", label: "Largest team led" },
    { value: "AWS · GCP", label: "Cloud platforms" },
  ],
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/manimaduri", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/manikanta-maduri/", icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];
