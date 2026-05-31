import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production products across AI, document intelligence, CRM, EdTech, job portals, and cross-platform mobile.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-28">
      <SectionHeading
        eyebrow="Portfolio"
        title="All projects"
        description="A selection of production products I've designed, built, and shipped — filter by domain."
      />
      <div className="mt-10">
        <ProjectsGrid />
      </div>
    </Section>
  );
}
