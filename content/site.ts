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
      description: "Web platforms that are live today, and a voice agent that answers support calls.",
    },
    experience: {
      title: "Experience",
      description: "Most recent first. What I owned, and what shipped.",
    },
    skills: {
      title: "Skills",
      description: "Grouped by where each tool sits in the stack.",
    },
    // The description for "How I work" is `principlesIntro` in education.ts.
    approach: { title: "How I work" },
  },
  dayToDay: "Day to day:",
  projectsPage: {
    title: "Work",
    intro:
      "Web platforms, and AI agents that answer calls and take action in business systems. Each write-up covers the problem, how the system fits together and what I built.",
    metaDescription: "Web platforms, AI products and voice agents I have designed and built.",
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
    caption: "Five waves drifting at their own pace.",
    label: "Slowly drifting bands of blush, navy, wine and ink under a velvet-red sun.",
    stillLabel: "Bands of blush, navy, wine and ink under a velvet-red sun.",
  },
  notFound: {
    heading: "This page isn’t here.",
    body: "It may have moved during a redesign.",
    artTitle: "Groove No. 404",
    artCaption: "Still life.",
  },
};
