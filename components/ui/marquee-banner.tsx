const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "Django",
  "Python",
  "React Native",
  "Flutter",
  "PostgreSQL",
  "Neo4j",
  "LangChain",
  "RAG",
  "Redis",
  "Node.js",
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "GraphQL",
  "NestJS",
  "Angular",
  "FastAPI",
  "Tailwind CSS",
];

const DOUBLED = [...TECH, ...TECH];

/** Infinite scrolling tech-stack strip. Purely decorative. */
export function MarqueeBanner() {
  return (
    <div
      className="relative overflow-hidden border-y border-border/50 py-3.5"
      aria-hidden
    >
      {/* left/right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div
        className="flex w-max whitespace-nowrap"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-5 font-mono text-xs text-faint"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
