import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Gen AI, RAG, full-stack engineering, and shipping production products.",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section className="pt-28">
      <SectionHeading
        eyebrow="Writing"
        title="Blog"
        description="Notes on Gen AI, RAG, and building production-ready full-stack products."
      />

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">New posts coming soon.</p>
      ) : (
        <ul className="mt-10 divide-y divide-border">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                <time className="font-mono text-sm text-faint sm:pt-1">
                  {formatDate(post.date)}
                </time>
                <div>
                  <h2 className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-foreground transition-colors group-hover:text-accent-2">
                    {post.title}
                    <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {post.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {post.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    <span className="text-xs text-faint">
                      · {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
