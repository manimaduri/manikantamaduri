import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { MarqueeBanner } from "@/components/ui/marquee-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <About />
      <Skills />
      <Section id="work">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Production products I've designed, built, and shipped — filter by domain."
        />
        <div className="mt-10">
          <ProjectsGrid />
        </div>
      </Section>
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
