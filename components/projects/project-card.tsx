import Link from "next/link";
import { ArrowUpRight, ExternalLink, Smartphone } from "lucide-react";
import type { Project, ProjectLink } from "@/content/data/types";
import { Tag } from "@/components/ui/tag";
import { GithubIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

const LINK_ICON = {
  repo: GithubIcon,
  "play-store": Smartphone,
  live: ExternalLink,
  external: ExternalLink,
} as const;

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = LINK_ICON[link.kind];
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent-2"
          >
            <Icon className="size-3.5" /> {link.label}
          </a>
        );
      })}
    </div>
  );
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group glass relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {/* gradient sheen on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-transparent to-accent-3/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-2">
            {project.domain}
          </span>
          {project.type === "freelance" ? (
            <span className="rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-faint">
              Freelance
            </span>
          ) : null}
        </div>
        <span className="shrink-0 text-xs text-faint">{project.year}</span>
      </div>
      <div className="mt-1.5 text-xs text-faint">
        {project.role} · {project.teamSize} people
      </div>

      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent-2/90">
        {project.tagline}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {project.stack.length > 5 ? (
          <Tag>+{project.stack.length - 5}</Tag>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <ProjectLinks links={project.links} />
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto text-sm font-semibold text-foreground transition-colors hover:text-accent-2"
        >
          Case study →
        </Link>
      </div>

      {/* full-card click target to case study */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0"
        aria-label={`View ${project.title} case study`}
      />
    </article>
  );
}
