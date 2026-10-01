import type { Project } from "./types";

/**
 * Projects, in the order they should appear. Each one gets a page at
 * /projects/<slug>. `featured` projects are listed on the home page and
 * `onCv` projects on the CV.
 *
 * Client work under NDA is described by what it does, never by client name,
 * and has no screenshots.
 */
export const projects: Project[] = [
  {
    slug: "visa-crm",
    name: "Visa consultancy CRM",
    tagline: "Multi-tenant CRM with an AI CV-assessment pipeline",
    description:
      "Back office for a visa consultancy: leads, clients, cases, invoicing and visa decisions in one place, replacing spreadsheets and WhatsApp. An AI pipeline assesses CVs and drafts country recommendations, but a rules engine makes the eligibility call and a person signs off.",
    kind: "Product",
    status: "Private",
    role: "Architect and lead engineer",
    client: "Built at Remark Studio",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Next.js", "OpenAI Agents SDK", "OpenRouter", "Docker", "GCP"],
    problem:
      "The consultancy ran every case across spreadsheets and WhatsApp, and checked each applicant’s eligibility by hand. A model can’t be trusted to make that call on its own: a wrong “yes” costs a client money and time.",
    approach: [
      "Modelled the full lead → client → case → decision workflow with stage gates, deadlines and maker–checker sign-off enforced on the server.",
      "Built the CV-assessment pipeline as separate steps: parse, recommend countries, research official requirements, validate, compliance check, PDF report. The verdict comes from per-country rule files, not the model.",
      "Routed each AI task to a model through OpenRouter with cost caps and fallbacks; anything touching personal data only goes to paid providers.",
      "Kept money in Decimal with gapless invoice numbers, isolated tenants so out-of-scope records return 404, and logged every material change.",
    ],
    outcomes: ["2,600+ automated backend tests.", "Every positive eligibility result is reviewed by a person before it reaches a client."],
    image: { src: "/projects/visa-crm/1.jpg", alt: "Dashboard with the “needs you” queue and sign-off panels" },
    gallery: [
      { src: "/projects/visa-crm/1.jpg", alt: "Dashboard with the “needs you” queue and sign-off panels" },
      { src: "/projects/visa-crm/2.jpg", alt: "Pipeline board next to the AI CV-assessment screen" },
      { src: "/projects/visa-crm/3.jpg", alt: "Dashboard, pipeline and CV assessment stacked" },
    ],
  },
  {
    slug: "founderflow",
    featured: true,
    hardest: "Early versions mis-ranked emails, so I re-engineered priority scoring.",
    name: "Founderflow",
    tagline: "AI executive assistant for founders",
    description:
      "Reads founders’ email and calendars, flags revenue-critical messages and drafts replies. I designed the platform and led prompt engineering for every agent.",
    kind: "Product",
    status: "Live",
    role: "Platform architect (contract)",
    client: "Founderflow",
    onCv: true,
    links: { live: "https://founderflowhq.ai" },
    stack: ["OpenAI Agents SDK", "Python", "FastAPI", "Next.js", "GCP"],
    problem: "Founders miss revenue-critical emails and follow-ups buried in busy inboxes and calendars.",
    approach: [
      "Benchmarked models against each other, then split the work: GPT-4o analyses email, Claude Haiku 4.5 filters and rates severity, Gemini 3.1 Pro drafts the replies.",
      "Re-engineered priority scoring after early versions mis-ranked messages.",
      "Built the FastAPI backend as a modular monolith with isolated workers, so one blocked worker can’t take the platform down.",
    ],
    image: { src: "/projects/founderflow/1.jpg", alt: "Founderflow daily briefing dashboard" },
    gallery: [
      { src: "/projects/founderflow/1.jpg", alt: "Founderflow daily briefing dashboard" },
      { src: "/projects/founderflow/2.jpg", alt: "Founderflow landing page and learning loop" },
      { src: "/projects/founderflow/3.jpg", alt: "Founderflow screens stacked" },
    ],
  },
  {
    slug: "ouiimi",
    featured: true,
    hardest: "Two people grabbing the same slot. Holds now run inside database transactions.",
    name: "OUIIMI",
    tagline: "Service-booking marketplace",
    description:
      "Customers find local services such as salons and groomers, book a slot and pay a deposit; businesses manage staff, availability and bookings. Slot holds run inside database transactions, so two customers can’t book the same time.",
    kind: "Client work",
    status: "Live",
    role: "Lead developer",
    client: "German health-tech contract",
    onCv: true,
    links: { live: "https://ouiimi.com" },
    stack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "GitHub Actions"],
    problem: "Local service businesses needed online bookings with deposits and staff schedules, without double bookings.",
    approach: [
      "Built the service catalogue, staff assignment, availability slots, cart and checkout.",
      "Held slots inside MongoDB transactions with an atomic booking counter, and released expired holds from one place.",
      "Took deposits and a platform fee with Stripe, and set up GitHub Actions CI/CD to the production server.",
    ],
    image: { src: "/projects/ouiimi/1.jpg", alt: "OUIIMI discover page with service listings" },
    gallery: [
      { src: "/projects/ouiimi/1.jpg", alt: "OUIIMI discover page with service listings" },
      { src: "/projects/ouiimi/2.jpg", alt: "OUIIMI booking page on desktop and mobile" },
      { src: "/projects/ouiimi/3.jpg", alt: "OUIIMI on three phones: discover, booking and categories" },
    ],
  },
  {
    slug: "medication-reminder",
    name: "Medication reminder app",
    tagline: "iOS app that makes sure patients don’t miss a dose",
    description:
      "Patient app on a FHIR R4 healthcare backend, with dose tracking, adherence history, clinician PDF reports and family sharing. Shipped to the App Store. Client under NDA.",
    kind: "Client work",
    status: "Private",
    role: "Mobile engineer",
    client: "German health-tech contract",
    stack: ["React Native", "Expo", "TypeScript", "FHIR"],
    problem: "Phone notifications are easy to silence or lose, so reminders were being missed or showing up twice.",
    approach: [
      "Built a custom native iOS alarm module so dose reminders ring even when the phone is on silent, with a spoken reminder.",
      "Added a 14-day adherence history, a one-page PDF report for clinicians and read-only family sharing.",
      "Covered the main flows with a 48-step end-to-end suite and fixture checks for the adherence logic.",
    ],
  },
  {
    slug: "fontis-water-agent",
    name: "Fontis Water voice agent",
    tagline: "AI phone support for a water-delivery company",
    description:
      "Answers customer calls for account lookups, billing, deliveries and new sign-ups, plus a payment-recovery pipeline that decides who gets a call, an SMS or an email.",
    kind: "AI agent",
    status: "Private",
    role: "Backend and voice engineer",
    client: "Built at Auroxa Tech",
    stack: ["Vapi", "Python", "FastAPI", "Twilio", "Docker"],
    problem: "Billing questions, delivery changes and declined payments were all handled by phone, by hand.",
    approach: [
      "Gave the agent five groups of tools it can call mid-conversation: customer, billing, delivery, onboarding and contracts.",
      "Parsed declined-payment reports, matched each customer by phone, email or name and address, and confirmed the match against the balances API.",
      "Scored each customer daily to decide between a call, an SMS or an email.",
    ],
    architecture: [
      { label: "Caller", detail: "Inbound phone call" },
      { label: "Vapi agent", detail: "Conversation", tech: "Vapi" },
      { label: "Tools", detail: "Accounts, billing, deliveries", tech: "FastAPI" },
      { label: "Outreach", detail: "SMS follow-up", tech: "Twilio" },
    ],
  },
  {
    slug: "my-expat-stays",
    featured: true,
    hardest: "Double bookings, solved with Firestore transactions.",
    name: "My Expat Stays",
    tagline: "Short-stay apartment rental platform",
    description:
      "Guests search, book and pay for apartments; admins manage pricing, availability and revenue. Firestore transactions check availability before every booking is written.",
    kind: "Client work",
    status: "Live",
    role: "Lead developer",
    client: "Built at Aptive Mind",
    onCv: true,
    links: { live: "https://myexpatstays.com" },
    image: { src: "/projects/expatstays.jpg", alt: "My Expat Stays home page" },
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe"],
    problem: "Visitors needed a trusted way to find, book and pay for short-stay apartments online.",
    approach: [
      "Built location search, availability calendars and Stripe payments.",
      "Wrote Cloud Functions for payment intents, booking notifications and a nightly availability cleanup.",
      "Built an admin dashboard for pricing rules, availability and revenue.",
    ],
  },
  {
    slug: "hvac-booking-agent",
    name: "HVAC booking agent",
    tagline: "Voice agent that books service calls into the CRM",
    description:
      "Answers calls for an HVAC business, captures the lead, checks live availability and books the job straight into the GoHighLevel calendar, with SMS confirmations and warm transfer to staff.",
    kind: "AI agent",
    status: "Private",
    role: "Sole engineer",
    client: "Built at Auroxa Tech",
    stack: ["Vapi", "Python", "FastAPI", "GoHighLevel", "Twilio", "Fly.io"],
    problem: "The business was losing jobs to missed calls and manual scheduling.",
    approach: [
      "Gave the agent nine tools: book, cancel, check availability, business hours, classify call, create contact, warm transfer, log summary and send confirmation.",
      "Generated slots within business hours and filtered out existing bookings, caching recent changes because the CRM’s appointment data lagged.",
      "Verified CRM webhooks with HMAC signatures, and scripted the CRM setup so it can be rebuilt from scratch.",
    ],
  },
  {
    slug: "the-visa-consultancy",
    hardest: "Uploads on Vercel’s read-only filesystem.",
    name: "The Visa Consultancy",
    tagline: "Immigration agency website with an admin CMS",
    description:
      "Public site with 25+ pages of visa and test guidance, per-country student visa pages and a secured admin dashboard for blogs and users.",
    kind: "Client work",
    status: "Live",
    role: "Sole developer",
    client: "Built at Remark Studio",
    links: { live: "https://thevisaconsultancy.com" },
    image: { src: "/projects/visaconsultancy.jpg", alt: "The Visa Consultancy home page" },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    problem: "The agency needed a site covering many visa types and countries that its team could update without a developer.",
    approach: [
      "Built data-driven per-country pages and service-specific enquiry forms that email the team.",
      "Added a JWT-secured admin dashboard with a rich-text editor and sanitised HTML.",
      "Stored uploads so they work on Vercel’s read-only filesystem, and compressed images and video at build time.",
    ],
  },
  {
    slug: "the-golden-chariot",
    name: "The Golden Chariot",
    tagline: "Events and wedding venue website",
    description:
      "Venue website with live events and ticketing from a third-party API and a spam-protected enquiry form. Total site size cut from 22 MB to 2.6 MB.",
    kind: "Client work",
    status: "Live",
    role: "Developer",
    client: "Built at Aptive Mind",
    links: { live: "https://thegoldenchariot.com" },
    image: { src: "/projects/goldenchariot.jpg", alt: "The Golden Chariot home page" },
    stack: ["Next.js", "Tailwind CSS", "Docker"],
    problem: "The venue needed a fast site that shows live events and handles enquiries.",
    approach: [
      "Pulled events and ticket types through a server-side proxy, hiding sold-out and admin-only tickets.",
      "Verified reCAPTCHA on the server before sending enquiries.",
      "Compressed images and trimmed scripts: total size down from 22 MB to 2.6 MB.",
    ],
  },
  {
    slug: "remark-studio",
    featured: true,
    name: "Remark Studio",
    tagline: "Agency website",
    description: "Agency website with WebGL visuals, animated service showcases and a case study of the visa CRM.",
    kind: "Client work",
    status: "Live",
    role: "Developer",
    client: "Remark Studio",
    links: { live: "https://remarkstudio.tech" },
    stack: ["Next.js", "TypeScript", "three.js"],
    problem: "The agency needed a site that shows its web, voice AI and CRM work to business clients.",
    approach: [
      "Rendered the site’s artwork from three.js scenes in headless Chromium, so images regenerate identically.",
      "Kept motion optional with reduced-motion support and a skip link.",
    ],
    image: { src: "/projects/remark-studio/1.jpg", alt: "Remark Studio hero" },
    gallery: [
      { src: "/projects/remark-studio/1.jpg", alt: "Remark Studio hero" },
      { src: "/projects/remark-studio/2.jpg", alt: "Remark Studio capabilities and problem sections" },
      { src: "/projects/remark-studio/3.jpg", alt: "Remark Studio pages stacked" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
