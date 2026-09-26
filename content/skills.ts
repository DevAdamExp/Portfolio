import type { SkillGroup } from "./types";

/**
 * Skills grouped by area. Names are matched against lib/tech.tsx for logos
 * and brand colours; a name without an entry still renders as a letter tile.
 */
export const skills: SkillGroup[] = [
  {
    title: "AI & agents",
    description: "LLM agents with tool use, retrieval and structured outputs, plus real-time voice agents.",
    skills: ["OpenAI Agents SDK", "LangGraph", "LangChain", "CrewAI", "MCP", "LiveKit", "Vapi", "Pinecone"],
  },
  {
    title: "Backend",
    description: "Typed APIs, background jobs and data models built for correctness under load.",
    skills: ["Python", "FastAPI", "Django", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Frontend",
    description: "Fast, accessible interfaces with server rendering and shared types end to end.",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Infrastructure",
    description: "Containerised services, CI/CD and the proxies and caches that keep them fast.",
    skills: ["Docker", "Nginx", "Dapr", "GitHub Actions", "Vercel", "Fly.io", "Git"],
  },
];
