import type { Experience } from "./types";

/**
 * Work history, newest first. Shown on the home page and the CV.
 *
 * Bullet formula: strong verb + what you built or owned + the result.
 * Only add numbers you can defend in an interview.
 */
export const experience: Experience[] = [
  {
    company: "The Visa Consultancy",
    role: "Agentic AI Full Stack Developer",
    type: "Full-time",
    start: "2026-05",
    // DRAFT: summary, highlights and stack are a starting point. Replace them
    // with the specifics of what you are building there.
    summary:
      "Building agentic AI systems and full-stack applications that automate the consultancy's client and case workflows.",
    highlights: [
      "Build LLM agents for client intake, eligibility pre-screening and follow-ups, with human review on each decision.",
      "Own delivery end to end: Next.js interfaces, Python/FastAPI services and the tools the agents call.",
      "Add guardrails, structured outputs and evaluations so AI-generated guidance stays accurate and traceable.",
    ],
    stack: ["Python", "FastAPI", "OpenAI Agents SDK", "LangGraph", "Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    company: "Aptive Mind",
    role: "Full Stack Engineer",
    type: "Full-time",
    start: "2025-11",
    // Confirm this end date.
    end: "2026-04",
    summary:
      "Built enterprise full-stack systems for large-scale location-data orchestration and AI-powered automation.",
    highlights: [
      "Architected large-scale location-data orchestration that keeps business listings consistent across platforms.",
      "Built full-stack features with Next.js, TypeScript and Python/FastAPI, shipped as Docker containers.",
      "Integrated LLM-powered automation into existing business workflows without disrupting operations.",
    ],
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "Docker"],
  },
  {
    company: "Auroxa Tech",
    role: "Full Stack Engineer",
    type: "Full-time",
    start: "2025-07",
    end: "2025-11",
    summary:
      "Led full-stack and voice-AI engineering for client products, from API design through deployment.",
    highlights: [
      "Built real-time voice agents on Vapi, LiveKit and the OpenAI Realtime API, integrated with CRMs and calendars.",
      "Engineered bulk data-sync pipelines with reconciliation checks to keep large datasets consistent across APIs.",
      "Owned deployment: Dockerised services behind Nginx with load balancing, reverse proxying and Redis caching.",
    ],
    stack: ["Python", "FastAPI", "Vapi", "LiveKit", "OpenAI Agents SDK", "Redis", "Docker", "Nginx", "Dapr", "Next.js"],
  },
  {
    company: "Dot Escapist",
    role: "Frontend Developer",
    type: "Full-time",
    start: "2024-08",
    end: "2025-06",
    summary:
      "Shipped client applications across a Next.js front end and a Django back end.",
    highlights: [
      "Delivered features end to end across Django REST endpoints, PostgreSQL models and Next.js screens.",
      "Implemented secure server actions and API routes with shared types between back end and UI.",
      "Reworked CRUD-heavy UI flows to cut steps and improve responsiveness.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS"],
  },
  {
    company: "Al-Basirr Technologies",
    role: "Frontend Developer Intern",
    type: "Internship",
    start: "2024-06",
    end: "2024-08",
    summary: "Frontend internship focused on API integration for enterprise clients.",
    highlights: [
      "Integrated REST APIs into responsive Next.js and Tailwind CSS interfaces.",
      "Debugged API errors, verification issues and data conflicts during large integrations.",
    ],
    stack: ["Next.js", "Tailwind CSS", "JavaScript"],
  },
];
