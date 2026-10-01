import type { Experience } from "./types";

/**
 * Work history, newest first. Shown on the home page and the CV.
 *
 * Bullet formula: strong verb + what you built or owned + the result.
 * Only add numbers you can defend in an interview. Work under NDA is
 * described by what it does, never by client name.
 */
export const experience: Experience[] = [
  {
    company: "Remark Studio",
    note: "where I am now, Bahria Enclave",
    companyUrl: "https://remarkstudio.tech",
    role: "Agentic AI Full Stack Developer",
    type: "Full-time",
    location: "Bahria Enclave, Islamabad",
    start: "2026-05",
    summary:
      "Islamabad agency building web platforms, AI agents and CRM systems for clients. I lead engineering on its AI and CRM products.",
    highlights: [
      "Architected and built a multi-tenant CRM for a visa consultancy with FastAPI, PostgreSQL and Next.js, covering leads, clients, cases, invoicing and visa decisions.",
      "Built an AI CV-assessment pipeline with the OpenAI Agents SDK that recommends countries and generates PDF reports. Eligibility is decided by a rules engine, not the model, and a person reviews every positive result.",
      "Routed AI tasks across GPT, Gemini and DeepSeek via OpenRouter, with cost caps, fallbacks and an evaluation set; anything touching personal data stays on paid providers.",
      "Built visa-sponsored job matching across 14 job boards, and secured the platform with 2FA, audit logs and 2,600+ automated tests, deployed with Docker on GCP.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Next.js", "OpenAI Agents SDK", "Docker", "GCP"],
    projects: ["visa-crm", "the-visa-consultancy", "remark-studio"],
  },
  {
    company: "German health-tech company",
    note: "remote, alongside Remark",
    role: "Full Stack Engineer",
    type: "Contract",
    location: "Remote",
    start: "2025-11",
    summary:
      "Outsourced product engineering and QA across a patient mobile app, a booking marketplace and a care-monitoring dashboard. Client under NDA.",
    highlights: [
      "Built and shipped a medication-reminder app to the App Store with React Native, Expo and FHIR R4, including a custom native iOS alarm module so reminders ring even on silent.",
      "Built most of a service-booking marketplace with Next.js, MongoDB and Stripe, holding slots inside database transactions so two customers can't book the same time.",
      "Ran QA and security testing on a care-monitoring dashboard with Playwright across 4 user roles, with written test scenarios and bug reports.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Next.js", "MongoDB", "Stripe", "Playwright"],
    projects: ["medication-reminder", "ouiimi"],
  },
  {
    company: "Founderflow",
    companyUrl: "https://founderflowhq.ai",
    role: "Agentic AI Full Stack Engineer",
    type: "Contract",
    location: "Remote",
    start: "2026-05",
    end: "2026-08",
    summary:
      "AI executive assistant that reads founders’ email and calendars, flags revenue-critical messages and drafts replies.",
    highlights: [
      "Designed the architecture of the platform and led prompt engineering for every agent.",
      "Built a multi-model agent pipeline with the OpenAI Agents SDK after benchmarking models: GPT-4o analyses email, Claude Haiku 4.5 rates severity, and Gemini 3.1 Pro drafts replies.",
      "Re-engineered email priority scoring after early versions mis-ranked messages, fixing the main triage bottleneck.",
      "Built the FastAPI backend as a modular monolith with isolated workers on GCP, so one blocked worker can’t take the platform down.",
    ],
    stack: ["OpenAI Agents SDK", "Python", "FastAPI", "Next.js", "GCP", "Nginx"],
    projects: ["founderflow"],
  },
  {
    company: "Aptive Mind",
    role: "Full Stack Engineer",
    type: "Full-time",
    location: "Bahria Town Phase 4, Rawalpindi",
    start: "2025-11",
    end: "2026-04",
    summary: "Client web platforms for hospitality, events and consumer products.",
    highlights: [
      "Built a short-stay rental platform with Next.js, Firebase and Stripe: location search, availability calendars and an admin dashboard for pricing and revenue.",
      "Prevented double bookings with Firestore transactions, and moved payments, notifications and nightly availability cleanup into Cloud Functions.",
      "Built an events venue website with live ticketing from a third-party API, and cut total site size from 22 MB to 2.6 MB.",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Docker"],
    projects: ["my-expat-stays", "the-golden-chariot"],
  },
  {
    company: "Auroxa Tech",
    note: "where voice AI clicked for me",
    role: "Full Stack Engineer",
    type: "Full-time",
    location: "Innovista Rawal, DHA Phase 1, Islamabad",
    start: "2025-07",
    end: "2025-11",
    summary: "AI voice agents for US service businesses.",
    highlights: [
      "Built an AI phone agent for a water-delivery company with Vapi and Python/FastAPI, handling account lookups, billing, deliveries and new-customer sign-up.",
      "Built a payment-recovery pipeline that matches customers across systems and decides who gets a call, an SMS (Twilio) or an email.",
      "Built an HVAC booking agent on the GoHighLevel CRM and calendar for lead capture, appointment booking and warm transfers to staff.",
    ],
    stack: ["Python", "FastAPI", "Vapi", "Twilio", "GoHighLevel", "Docker", "Fly.io"],
    projects: ["fontis-water-agent", "hvac-booking-agent"],
  },
  {
    company: "Dot Escapist",
    role: "Frontend Developer",
    type: "Full-time",
    location: "G-13, Islamabad",
    start: "2024-08",
    end: "2025-06",
    summary: "Internal operations software for the construction industry.",
    highlights: [
      "Built an asset-tracking system for precast construction with Next.js, TypeScript and Django REST Framework, following each element through design, production, quality, logistics and site.",
      "Built searchable data tables, user management and department-based views backed by PostgreSQL.",
    ],
    stack: ["Next.js", "TypeScript", "Django", "PostgreSQL"],
  },
  {
    company: "Al-Basirr Technologies",
    note: "where it started, NSTP NUST",
    role: "Frontend Developer Intern",
    type: "Internship",
    location: "NSTP, NUST, Islamabad",
    start: "2024-06",
    end: "2024-08",
    summary: "AI study-abroad and scholarship consultation platform.",
    highlights: [
      "Built the student flow in Next.js: resume upload, a multi-step profile form and matched scholarship results.",
      "Integrated a FastAPI and OpenAI backend that matches students with universities and scholarships.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "OpenAI"],
  },
];
