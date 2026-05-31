import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
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

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-3">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-bold text-gradient">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
