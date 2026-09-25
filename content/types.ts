/**
 * Content schema for the portfolio and CV.
 *
 * Every page (home, projects, CV) reads from the files in this folder, so an
 * edit here shows up everywhere. See content/README.md for a walkthrough.
 */

/** Year and month, e.g. "2026-05". */
export type YearMonth = `${number}-${string}`;

export interface SocialLink {
  label: string;
  href: string;
  /** Shown on the CV instead of the full URL, e.g. "github.com/AdamChoudary". */
  display?: string;
}

export interface Profile {
  name: string;
  /** Current title, used in the page header, CV and metadata. */
  title: string;
  /** One sentence shown under your name on the home page. */
  headline: string;
  /** Short paragraphs for the home page intro. */
  bio: string[];
  /** Two to three sentences for the top of the CV. */
  cvSummary: string;
  location: string;
  email: string;
  /** Only shown on the CV, never on the public site. */
  phone?: string;
  availability?: string;
  photo?: { src: string; alt: string };
  links: {
    github?: SocialLink;
    linkedin?: SocialLink;
    website?: SocialLink;
  };
  cv: {
    /** Photos help in some regions (PK, Gulf, parts of Europe) and hurt ATS/US applications. */
    showPhoto: boolean;
    /** File in /public served by the "Download CV" buttons. */
    pdf: string;
  };
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";

export interface Experience {
  company: string;
  companyUrl?: string;
  /** Path under /public, e.g. "/logos/companies/aptive-mind.svg". Falls back to initials. */
  logo?: string;
  role: string;
  type: EmploymentType;
  location?: string;
  start: YearMonth;
  /** Omit for your current role. */
  end?: YearMonth;
  /** One sentence describing scope and ownership. */
  summary: string;
  /** Impact-first bullets: action, what you built, the result. */
  highlights: string[];
  /** Tech names; icons are resolved from lib/tech.tsx. */
  stack: string[];
  /** Project slugs from content/projects.ts. */
  projects?: string[];
  /** Hide an entry from the CV while keeping it on the site. Defaults to true. */
  onCv?: boolean;
}

export type ProjectKind = "Product" | "Client work" | "AI agent" | "Open source";
export type ProjectStatus = "Live" | "Private" | "Archived";

export interface Project {
  /** URL segment: /projects/<slug>. */
  slug: string;
  name: string;
  /** One line, shown on cards. */
  tagline: string;
  /** Two to three sentences, shown on cards and at the top of the detail page. */
  description: string;
  kind: ProjectKind;
  status: ProjectStatus;
  /** Your role on the project, e.g. "Lead full-stack engineer". */
  role: string;
  year?: string;
  /** Company or client the work was done for. */
  client?: string;
  featured?: boolean;
  links?: { live?: string; repo?: string };
  /** Real screenshots only, ideally 16:10 and around 1600px wide. */
  image?: { src: string; alt: string };
  stack: string[];
  /** The problem, in the user's or business's terms. */
  problem: string;
  /** What you designed and built. */
  approach: string[];
  /** Results. Only add numbers you can back up. */
  outcomes?: string[];
  /** Show on the CV under "Selected projects". */
  onCv?: boolean;
}

export interface SkillGroup {
  title: string;
  /** Tech names; icons are resolved from lib/tech.tsx. */
  skills: string[];
}

export interface Education {
  institution: string;
  program: string;
  start: YearMonth;
  end?: YearMonth;
  details?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Principle {
  title: string;
  body: string;
}
