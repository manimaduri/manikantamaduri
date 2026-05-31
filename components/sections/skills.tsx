"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { skillGroups } from "@/content/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const group = skillGroups[active];

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills & technologies"
        description="A full-stack toolkit centered on AI-enabled product engineering."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {skillGroups.map((g, i) => (
          <button
            key={g.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              i === active
                ? "border-accent/60 bg-accent-soft text-foreground"
                : "border-border bg-surface/40 text-muted hover:border-border-strong hover:text-foreground",
            )}
            aria-pressed={i === active}
          >
            {g.emphasis ? <Sparkles className="size-3.5 text-accent-2" /> : null}
            {g.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={group.label}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {group.skills.map((skill) => (
            <li
              key={skill}
              className={cn(
                "rounded-xl border px-3.5 py-2 text-sm transition-all duration-300",
                group.emphasis
                  ? "border-accent/30 bg-accent-soft text-foreground hover:border-accent/60 hover:shadow-[var(--shadow-glow)]"
                  : "border-border bg-surface/50 text-muted hover:border-accent/30 hover:bg-accent-soft/50 hover:text-foreground",
              )}
            >
              {skill}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </Section>
  );
}
