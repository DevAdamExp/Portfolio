import type { SkillGroup } from "./types";

/**
 * Skills grouped by area. Names are matched against lib/tech.tsx for logos
 * and brand colours; a name without an entry still renders as a letter tile.
 */
export const skills: SkillGroup[] = [
  {
    title: "AI & agents",
    description: "LLM agents with tool use, retrieval and structured outputs, plus real-time voice agents.",
    skills: ["OpenAI Agents SDK", "LangGraph", "MCP", "OpenRouter", "Vapi", "LiveKit", "Twilio"],
  },
  {
    title: "Backend",
    description: "Typed APIs, background jobs and data models built for correctness under load.",
    skills: ["Python", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    title: "Frontend & mobile",
    description: "Fast, accessible interfaces with server rendering and shared types end to end.",
    skills: ["TypeScript", "Next.js", "React", "React Native", "Expo"],
  },
  {
    title: "Infrastructure",
    description: "Containerised services, CI/CD and the proxies and caches that keep them fast.",
    skills: ["GCP", "Docker", "Nginx", "GitHub Actions", "Vercel", "Playwright"],
  },
];
