import type { Profile } from "./types";

export const profile: Profile = {
  name: "Muhammad Adam",
  title: "Agentic AI Full Stack Developer",
  // The words after " — " are set in wine italic on the home page.
  headline: "I build AI agents that do real work — and the software that makes them dependable.",
  intro:
    "They answer support calls, draft company-formation documents and book service jobs straight into a calendar. I build the whole system: the model loop, the tools it calls, the APIs behind it and the screens people use.",
  coreStack: ["Python", "FastAPI", "TypeScript", "Next.js", "LangGraph", "OpenAI Agents SDK"],
  cvSummary:
    "Full-stack engineer with 2+ years shipping production web platforms and agentic AI systems: Next.js and TypeScript front ends, Python/FastAPI services, LLM orchestration with the OpenAI Agents SDK and LangGraph, real-time voice agents on LiveKit and Vapi, and the Docker, Redis and Nginx infrastructure behind them.",
  location: "Islamabad, Pakistan",
  email: "chaudhrayadam@gmail.com",
  phone: "+92 303 8705165",
  // Optional line shown next to your current role, e.g. "Open to new opportunities".
  availability: undefined,
  photo: { src: "/images/portrait.jpg", alt: "Portrait of Muhammad Adam" },
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/AdamChoudary",
      display: "github.com/AdamChoudary",
    },
    // Add your LinkedIn to show it in the header, footer and CV:
    // linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/<handle>", display: "linkedin.com/in/<handle>" },
  },
  cv: {
    showPhoto: false,
    pdf: "/Muhammad-Adam-CV.pdf",
  },
};

/** Canonical site URL for metadata, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
