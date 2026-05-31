import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    company: "N-Labs",
    role: "Full-Stack Developer",
    start: "Aug 2023",
    end: "Present",
    summary:
      "Shipping full-stack web, mobile, and enterprise products across AI, CRM, education, and workflow-automation domains.",
    highlights: [
      "Built and shipped full-stack web, mobile, and enterprise products using Next.js, React, Django, Node.js, React Native, and PostgreSQL.",
      "Developed AI-powered capabilities — LLM API integrations, RAG retrieval workflows, document processing pipelines, and intelligent automation for search, extraction, and business processes.",
      "Designed and integrated RESTful APIs, third-party services, and enterprise systems for end-to-end workflow automation.",
      "Improved scalability and reliability through SSR, SEO, caching, and background jobs using Redis, Celery, and AWS.",
      "Led teams of up to 5–10 developers, drove rapid delivery, maintained code quality, and handled client-facing collaboration.",
      "Managed production deployments and cloud infrastructure using AWS — EC2, RDS, S3, SES, Lambda, and EventBridge.",
    ],
  },
];
