import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Smartphone,
  Users,
  Briefcase,
} from "lucide-react";
import { projects, getProject } from "@/content/data/projects";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/ui/brand-icons";

const LINK_ICON = {
  repo: GithubIcon,
  "play-store": Smartphone,
  live: ExternalLink,
  external: ExternalLink,
} as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tagline)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pt-28 pb-20 sm:px-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-2"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-2">
            {project.domain}
          </span>
          {project.type === "freelance" ? (
            <span className="rounded-full border border-border-strong px-2.5 py-1 text-xs font-medium text-faint">
              Freelance
            </span>
          ) : null}
          <span className="text-xs text-faint">{project.year}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-accent-2/90">{project.tagline}</p>
        <p className="mt-5 text-base leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-4 text-accent-2" /> {project.role}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-accent-2" /> Team of {project.teamSize}
          </span>
          {project.client ? (
            <span className="text-faint">Client: {project.client}</span>
          ) : null}
        </div>

        {project.links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.links.map((link) => {
              const Icon = LINK_ICON[link.kind];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-3 px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Icon className="size-4" /> {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              );
            })}
          </div>
        ) : null}
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">
          What I built
        </h2>
        <ul className="mt-5 space-y-3.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="relative pl-6 text-base leading-relaxed text-muted"
            >
              <span className="absolute left-0 top-2.5 size-1.5 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">
          Tech stack
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 border-t border-border pt-8">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 font-display text-lg font-bold text-foreground transition-colors hover:text-accent-2"
        >
          Interested in work like this? Let&apos;s talk{" "}
          <ArrowUpRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}
