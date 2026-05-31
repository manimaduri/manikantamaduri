import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Career" title="Experience" />

      <ol className="mt-10 space-y-10 border-l border-border pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <Reveal as="li" key={`${item.company}-${i}`} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 size-3 rounded-full border-2 border-accent bg-bg sm:-left-[2.15rem]" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-bold text-foreground">
                {item.role}{" "}
                <span className="text-accent-2">· {item.company}</span>
              </h3>
              <span className="font-mono text-xs text-faint">
                {item.start} — {item.end}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{item.summary}</p>
            <ul className="mt-4 space-y-2">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="relative pl-5 text-sm leading-relaxed text-muted"
                >
                  <span className="absolute left-0 top-2 size-1.5 rounded-full bg-accent/70" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
