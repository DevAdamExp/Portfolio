import type { SiteCopy } from "./types";

/**
 * Copy for the parts of the site that aren't about a job or a project:
 * section titles and intros, the /projects intro, the contact band that ends
 * every page, and the caption under the hero painting.
 */
export const site: SiteCopy = {
  sections: {
    work: {
      title: "Selected work",
      description: "Products, client platforms and voice agents. Each has a short write-up: the problem, how it works and what I built.",
    },
    experience: {
      title: "Experience",
      description: "Most recent first. What I owned, and what shipped.",
    },
    skills: {
      title: "Skills",
      description: "What I use in production, not everything I’ve ever touched.",
    },
    // The description for "How I work" is `principlesIntro` in education.ts.
    approach: { title: "How I work" },
  },
  projectsPage: {
    intro:
      "Products, client platforms and AI agents I’ve built end to end. Each one has a short write-up: the problem, how the system fits together, what I built and the stack.",
    products: "Products & platforms",
    agents: "AI & voice agents",
    agentsDescription: "Agents that talk to customers and take action in business systems through tools.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Working on something with AI agents? Let’s talk.",
    body: "Email is best. I’m happy to talk through an architecture, a tricky integration or an idea you’re still shaping.",
  },
  art: {
    title: "Groove No. 1",
    year: "2026",
    caption: "Five waves drifting at their own pace. Drawn in SVG, moved with CSS.",
    label: "Slowly drifting bands of blush, navy, wine and ink under a velvet-red sun.",
  },
};
