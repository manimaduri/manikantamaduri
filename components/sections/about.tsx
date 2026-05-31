import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUpStat } from "@/components/ui/count-up-stat";
import { profile } from "@/content/data/profile";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Code, systems, and teams —{" "}
            <span className="text-gradient">delivered.</span>
          </>
        }
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>{profile.bio}</p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-3">
          {profile.stats.map((stat) => (
            <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </dl>
      </div>
    </Section>
  );
}
