"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { projects, projectDomains } from "@/content/data/projects";
import type { ProjectDomain } from "@/content/data/types";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectDomain;

const FILTERS: Filter[] = ["All", ...projectDomains];

export function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.domain === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by domain">
        {FILTERS.map((f) => {
          const count =
            f === "All"
              ? projects.length
              : projects.filter((p) => p.domain === f).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === f
                  ? "border-accent/60 bg-accent-soft text-foreground"
                  : "border-border bg-surface/40 text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {f}
              <span className="text-xs text-faint">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
