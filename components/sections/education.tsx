import { GraduationCap, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { education, certifications } from "@/content/data/education";

export function Education() {
  return (
    <Section id="education">
      <div className="grid gap-12 lg:grid-cols-1">
        <div>
          <SectionHeading eyebrow="Background" title="Education" />
          <div className="mt-8 space-y-4">
            {education.map((e) => (
              <Reveal
                key={e.degree}
                className="glass flex items-start gap-4 rounded-2xl p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-2">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-foreground">
                    {e.degree}
                  </h3>
                  <p className="text-sm text-muted">{e.field}</p>
                  <p className="mt-1 text-sm text-faint">
                    {e.institution} · {e.year}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Credentials" title="Certifications" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {certifications.map((c, i) => {
              const inner = (
                <>
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-accent-2" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {c.title}
                    </p>
                    <p className="mt-0.5 text-xs text-faint">
                      {c.issuer}
                      {c.issuedDate ? ` · ${c.issuedDate}` : ""}
                    </p>
                  </div>
                  {c.credentialUrl ? (
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint transition-colors group-hover:text-accent-2" />
                  ) : null}
                </>
              );

              return (
                <Reveal as="li" key={c.title} delay={i * 0.04}>
                  {c.credentialUrl ? (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group glass flex items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[var(--shadow-glow)]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="glass flex items-start gap-3 rounded-xl p-4">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
