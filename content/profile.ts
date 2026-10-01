import type { Profile } from "./types";

export const profile: Profile = {
  name: "Muhammad Adam",
  title: "Agentic AI Full Stack Developer",
  // The words after " — " are set in wine italic on the home page.
  headline: "I build AI agents that do real work — and the software that makes them dependable.",
  intro:
    "They answer support calls, assess visa applications and book service jobs straight into a calendar. I build the whole system: the model loop, the tools it calls, the APIs behind it and the screens people use.",
  coreStack: ["Python", "FastAPI", "TypeScript", "Next.js", "React Native", "OpenAI Agents SDK"],
  cvSummary:
    "Full Stack AI Engineer with 2+ years building production web, mobile and agentic AI systems. Strong in TypeScript, Next.js, Python and FastAPI, with hands-on experience in multi-agent LLM pipelines, voice agents, React Native and healthcare (FHIR) apps. Open to relocation.",
  location: "Islamabad, Pakistan",
  email: "chaudhrayadam@gmail.com",
  phone: "+92 303 8705165",
  // Optional line shown next to your current role, e.g. "Open to new opportunities".
  availability: "Open to relocation",
  photo: { src: "/images/portrait.jpg", alt: "Portrait of Muhammad Adam" },
  links: {
    github: {
      label: "GitHub",
      href: "https://github.com/DevAdamExp",
      display: "github.com/DevAdamExp",
    },
    // Add your LinkedIn to show it in the header, footer and CV:
    // linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/<handle>", display: "linkedin.com/in/<handle>" },
  },
  cv: {
    showPhoto: false,
    pdf: "/Muhammad-Adam-CV.pdf",
  },
};

/** Canonical site URL for metadata, sitemap and Open Graph. Production builds default to the live domain; NEXT_PUBLIC_SITE_URL overrides it. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? "https://adam-dev-ai-architect.vercel.app" : "http://localhost:3000");
