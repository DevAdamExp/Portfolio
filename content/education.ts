import type { Education, Language, Principle } from "./types";

export const education: Education[] = [
  {
    institution: "PIAIC, Air University",
    program: "AI Engineering Diploma",
    start: "2023-06",
    details: "Generative AI, agentic systems and cloud-native computing.",
  },
];

export const languages: Language[] = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
];

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
