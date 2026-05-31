/** Shared content types for the portfolio data layer (content-as-code). */

export type ProjectType = "work" | "freelance" | "personal" | "oss";

export type ProjectDomain =
  | "AI"
  | "CRM"
  | "Job Portal"
  | "EdTech"
  | "Mobile"
  | "Marketplace"
  | "Web";

export interface ProjectLink {
  label: string; // e.g. "Live", "Play Store", "Repo"
  href: string;
  kind: "live" | "play-store" | "repo" | "external";
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  type: ProjectType;
  domain: ProjectDomain;
  role: string;
  teamSize: number;
  /** Optional client / org name to display. */
  client?: string;
  /** Short summary used on cards. */
  summary: string;
  /** Detailed bullet highlights used on the case-study page. */
  highlights: string[];
  stack: string[];
  /** Links are only rendered when present — no dead links. */
  links: ProjectLink[];
  /** Display year or range, e.g. "2024" or "2023–2024". */
  year: string;
  /** Image path under /public, or null to render a gradient placeholder. */
  image: string | null;
  featured: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  start: string; // display string, e.g. "Aug 2023"
  end: string; // e.g. "Present"
  location?: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  label: string;
  /** Surface this group with extra emphasis (e.g. Gen AI). */
  emphasis?: boolean;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  year: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issuedDate?: string;
  credentialUrl?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide-react icon name resolved in the UI layer. */
  icon: "github" | "linkedin" | "mail" | "twitter" | "phone";
}
