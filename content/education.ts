import type { Certification, Education, Language, Principle } from "./types";

export const education: Education[] = [
  {
    institution: "PIAIC, Air University",
    program: "AI Engineering Diploma",
    start: "2023-06",
    details: "Generative AI, agentic systems and cloud-native computing.",
  },
];

/** Newest first. PDFs and preview images live in /public/certificates/. */
export const certifications: Certification[] = [
  {
    name: "Agentic AI Professional Level 2 Developer",
    issuer: "PIAIC",
    date: "2026-01",
    credentialId: "2026030215846",
    url: "/certificates/piaic-agentic-ai-level-2.pdf",
    image: "/certificates/piaic-agentic-ai-level-2.webp",
  },
  {
    name: "Agentic AI Level 1 Developer",
    issuer: "PIAIC",
    date: "2026-01",
    credentialId: "2026010215846",
    url: "/certificates/piaic-agentic-ai-level-1.pdf",
    image: "/certificates/piaic-agentic-ai-level-1.webp",
    // Level 2 supersedes it on the one-page CV.
    onCv: false,
  },
  {
    name: "Introduction to LangGraph",
    issuer: "LangChain Academy",
    date: "2024-11",
    credentialId: "nmozasavts",
    url: "/certificates/langchain-introduction-to-langgraph.pdf",
    image: "/certificates/langchain-introduction-to-langgraph.webp",
  },
];

export const languages: Language[] = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
];

/** Shown above the principles in the "How I work" section. */
export const principlesIntro =
  "I care about clear architecture, typed contracts from database to UI, and software that is simple to operate once it ships.";

/** "How I work" on the home page. Keep each one short and concrete. */
export const principles: Principle[] = [
  {
    title: "Understand the problem first",
    body: "I start with the workflow and the people in it — constraints, data and failure modes — before choosing a model or a framework.",
  },
  {
    title: "Design for the boring path",
    body: "Clear boundaries, typed contracts and simple infrastructure. Agents get narrow tools, structured outputs and a human in the loop where it matters.",
  },
  {
    title: "Ship in small, verifiable steps",
    body: "Working software early, evaluated against real inputs, then iterated. Each release should be easy to review and easy to roll back.",
  },
  {
    title: "Own it after launch",
    body: "Logging, monitoring and cost tracking from day one, so the system can be operated, debugged and improved by whoever comes next.",
  },
];
