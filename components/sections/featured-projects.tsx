import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { featuredProjects } from "@/content/data/projects";

export function FeaturedProjects() {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          description="A few production products I've designed, built, and shipped."
        />
        <Reveal delay={0.1}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-2 transition-colors hover:text-accent"
          >
            View all projects <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
