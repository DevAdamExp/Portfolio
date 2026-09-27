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

/** Shown above the principles in the "How I work" section. */
export const principlesIntro =
  "Plain architecture, typed contracts from the database to the UI, and software that’s easy to run after it ships.";

/** "How I work" on the home page. Keep each one short and concrete. */
export const principles: Principle[] = [
  {
    title: "Start with the problem, not the model",
    body: "I learn the workflow and the people in it: the constraints, the data, what tends to go wrong. Then I pick a model or a framework.",
  },
  {
    title: "Keep it boring",
    body: "Clear boundaries, typed contracts and simple infrastructure. Agents get narrow tools, structured outputs and a person in the loop where it matters.",
  },
  {
    title: "Ship small, then check",
    body: "Working software early, tested against real inputs, then improved. Each release is easy to review and easy to roll back.",
  },
  {
    title: "Launch is the start",
    body: "Logging, monitoring and cost tracking from day one, so whoever runs it next can see what it’s doing and fix it.",
  },
];
