import type { SkillGroup } from "./types";

/**
 * Skills grouped by area. Names are matched against lib/tech.tsx for logos;
 * a name without a logo there still renders, just without an icon.
 */
export const skills: SkillGroup[] = [
  {
    title: "AI & agents",
    skills: ["OpenAI Agents SDK", "LangGraph", "LangChain", "CrewAI", "MCP", "LiveKit", "Vapi", "Pinecone"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Django", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "Nginx", "Dapr", "GitHub Actions", "Vercel", "Fly.io", "Git"],
  },
];
