"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpStatProps {
  value: string;
  label: string;
}

/** Stat card that counts up from zero when scrolled into view. */
export function CountUpStat({ value, label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  // Parse numeric prefix and suffix: "15+" → { num: 15, suffix: "+" }
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || num === null || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, num]);

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
    >
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-bold text-gradient">
        {num !== null ? `${display}${suffix}` : value}
      </dd>
      <dd className="mt-1 text-sm text-muted">{label}</dd>
    </div>
  );
}
