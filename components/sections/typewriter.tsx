"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}

/** Cycles through `words` with a typing/deleting effect on a gradient span. */
export function Typewriter({
  words,
  typingMs = 90,
  deletingMs = 45,
  pauseMs = 1600,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    // With reduced motion, skip the typing effect entirely (rendered statically below).
    if (reduce) return;

    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingMs,
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingMs,
        );
      } else {
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, deletingMs);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typingMs, deletingMs, pauseMs, reduce]);

  const display = reduce ? (words[0] ?? "") : text || " ";

  return (
    <span className="text-gradient">
      {display}
      {!reduce && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] animate-pulse rounded-full bg-accent-2 align-middle"
        />
      )}
    </span>
  );
}
