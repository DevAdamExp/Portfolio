import type { Project } from "./types";

/**
 * Projects, in the order they should appear. Each one gets a page at
 * /projects/<slug>. `featured` projects are shown on the home page and
 * `onCv` projects on the CV.
 */
export const projects: Project[] = [
  {
    slug: "gocreation",
    name: "GoCreation",
    tagline: "AI legal assistant for company formation in Morocco",
    description:
      "A platform that guides Moroccan entrepreneurs through forming an SARL or SARL AU. Its assistant, TALYA, drafts compliant legal documents in minutes and coordinates domiciliation and registration.",
    kind: "Client work",
    status: "Live",
    role: "Full-stack & AI engineer",
    featured: true,
    onCv: true,
    links: { live: "https://gocreation.ma" },
    image: { src: "/projects/gocreation.png", alt: "GoCreation landing page" },
    stack: ["Next.js", "LangGraph", "FastAPI", "OpenAI", "Pinecone"],
    problem:
      "Forming a company in Morocco means navigating bureaucracy and paying for legal consultation — often a week or more of back-and-forth before an SARL or SARL AU is registered.",
    approach: [
      "Built TALYA, an agentic assistant orchestrated with LangGraph that interviews founders and generates the statutes and filings their entity needs.",
      "Used retrieval over Pinecone to ground document generation in vetted legal templates.",
      "FastAPI services handle document generation, domiciliation requests and application state; the Next.js front end walks users through each step.",
    ],
    outcomes: [
      "Turns a multi-day, consultation-heavy process into a guided flow where compliant documents are drafted in minutes.",
    ],
    architecture: [
      { label: "Founder", detail: "Guided intake in Next.js", tech: "Next.js" },
      { label: "TALYA agent", detail: "LangGraph orchestration", tech: "LangGraph" },
      { label: "Retrieval", detail: "Legal templates in Pinecone", tech: "Pinecone" },
      { label: "Drafting", detail: "OpenAI generates statutes", tech: "OpenAI" },
      { label: "Documents", detail: "FastAPI assembles filings", tech: "FastAPI" },
    ],
  },
  {
    slug: "ouiimi",
    name: "OUIIMI",
    tagline: "Service-booking marketplace with a fair revenue model",
    description:
      "A marketplace where independent service businesses — salons, spas, groomers — take bookings and payments online for a 5% revenue share instead of the usual 15–30% platform fee.",
    kind: "Product",
    status: "Live",
    role: "Full-stack engineer",
    featured: true,
    onCv: true,
    links: { live: "https://ouiimi.com" },
    stack: ["Next.js", "React", "MongoDB", "Stripe", "Tailwind CSS"],
    problem:
      "Small service businesses lose margin to high platform fees and revenue to no-shows, while juggling staff calendars and listings spread across several map and directory services.",
    approach: [
      "Built multi-staff scheduling with real-time availability, so a business can manage every team member’s calendar in one place.",
      "Integrated Stripe Connect to split each payment between the platform and the business.",
      "Wrote sync jobs that push listing data in bulk to map and directory services and keep it consistent.",
    ],
    architecture: [
      { label: "Customer", detail: "Books in the Next.js app", tech: "Next.js" },
      { label: "Scheduling", detail: "Multi-staff availability", tech: "MongoDB" },
      { label: "Payments", detail: "Stripe Connect split", tech: "Stripe" },
      { label: "Listing sync", detail: "Bulk jobs to map directories" },
    ],
  },
  {
    slug: "jordan-voice-agent",
    name: "Jordan",
    tagline: "Real-time voice agent for inbound customer support",
    description:
      "A low-latency voice agent that answers inbound support calls, holds natural, interruptible conversations, resolves routine queries and hands complex cases to a person.",
    kind: "AI agent",
    status: "Private",
    role: "AI engineer",
    featured: true,
    onCv: true,
    stack: ["LiveKit", "OpenAI", "FastAPI", "Python"],
    problem:
      "Staffing phones for a high volume of inbound support calls was expensive and still left customers waiting.",
    approach: [
      "Built the agent on LiveKit with the OpenAI Realtime API for speech-to-speech conversation that callers can interrupt naturally.",
      "Exposed ticketing and account lookups as tools through a FastAPI service, so the agent can act, not just answer.",
      "Added escalation rules that transfer the call to a person with the conversation context attached.",
    ],
    architecture: [
      { label: "Caller", detail: "Inbound phone call" },
      { label: "LiveKit", detail: "Real-time audio room", tech: "LiveKit" },
      { label: "Voice agent", detail: "OpenAI Realtime API", tech: "OpenAI" },
      { label: "Tools", detail: "Tickets and accounts via FastAPI", tech: "FastAPI" },
      { label: "Handoff", detail: "Escalation with context" },
    ],
  },
  {
    slug: "my-expat-stays",
    name: "My Expat Stays",
    tagline: "Vetted short-term rentals for overseas Pakistanis",
    description:
      "A curated rental marketplace for overseas Pakistanis visiting or relocating home, focused on verified properties that meet international standards.",
    kind: "Client work",
    status: "Live",
    role: "Full-stack engineer",
    featured: true,
    links: { live: "https://myexpatstays.com" },
    image: { src: "/projects/expatstays.png", alt: "My Expat Stays home page" },
    stack: ["Next.js", "PostgreSQL", "Google Maps", "Vercel"],
    problem:
      "Overseas Pakistanis struggle to find accommodation they can trust when they visit or move back — listings are inconsistent and quality is hard to judge from abroad.",
    approach: [
      "Built property search and booking with Next.js on PostgreSQL, with map-based discovery through the Google Maps API.",
      "Syndicated listing data through location aggregators (Yext, Uberall) so property details stay accurate across the web.",
    ],
    architecture: [
      { label: "Guest", detail: "Search and booking in Next.js", tech: "Next.js" },
      { label: "Listings", detail: "Vetted properties in PostgreSQL", tech: "PostgreSQL" },
      { label: "Maps", detail: "Discovery via Google Maps", tech: "Google Maps" },
      { label: "Syndication", detail: "Yext and Uberall aggregators" },
    ],
  },
  {
    slug: "fontis-onboarding-agent",
    name: "Fontis",
    tagline: "Voice agent that onboards new water-delivery customers",
    description:
      "A phone agent for a water-delivery company that recognises existing customers and onboards new ones, sending a secure registration form by SMS.",
    kind: "AI agent",
    status: "Private",
    role: "AI engineer",
    stack: ["Vapi", "FastAPI", "PostgreSQL", "Python"],
    problem:
      "Registering new customers by hand was slow and error-prone, especially during peak hours.",
    approach: [
      "Built the call flow on Vapi, with FastAPI tools the agent calls mid-conversation.",
      "Identifies returning customers with a PostgreSQL lookup and collects details from new ones.",
      "Sends a secure registration link by SMS to complete sign-up and writes the result back to the CRM.",
    ],
    architecture: [
      { label: "Caller", detail: "Inbound phone call" },
      { label: "Vapi agent", detail: "Conversational intake", tech: "Vapi" },
      { label: "Lookup", detail: "Existing customer in PostgreSQL", tech: "PostgreSQL" },
      { label: "Sign-up", detail: "Secure link by SMS", tech: "FastAPI" },
      { label: "CRM", detail: "Record written back" },
    ],
  },
  {
    slug: "hvac-scheduling-agent",
    name: "HVAC Scheduler",
    tagline: "Voice agent that qualifies leads and books service calls",
    description:
      "A voice agent for HVAC service companies that answers calls, qualifies the job and books it straight into the GoHighLevel calendar.",
    kind: "AI agent",
    status: "Private",
    role: "AI engineer",
    stack: ["Vapi", "GoHighLevel", "Zapier", "Python"],
    cover: { scheme: "ink" },
    problem: "HVAC companies were losing jobs to missed calls and slow, manual scheduling.",
    approach: [
      "Built a Vapi agent that qualifies the caller’s request and checks live calendar availability.",
      "Books appointments directly into GoHighLevel and triggers follow-ups through Zapier.",
    ],
    architecture: [
      { label: "Caller", detail: "Service request by phone" },
      { label: "Vapi agent", detail: "Qualifies the job", tech: "Vapi" },
      { label: "Calendar", detail: "Live availability in GoHighLevel", tech: "GoHighLevel" },
      { label: "Follow-up", detail: "Zapier automations", tech: "Zapier" },
    ],
  },
  {
    slug: "the-golden-chariot",
    name: "The Golden Chariot",
    tagline: "Website for a luxury wedding venue",
    description:
      "A marketing site for a wedding venue that needed its online presence to match the experience on site, with an inquiry flow that reaches the right person.",
    kind: "Client work",
    status: "Live",
    role: "Frontend engineer",
    links: { live: "https://thegoldenchariot.com" },
    image: { src: "/projects/goldenchariot.png", alt: "The Golden Chariot home page" },
    cover: { scheme: "paper" },
    stack: ["Next.js", "Framer Motion", "Resend", "Tailwind CSS"],
    problem:
      "The venue needed a digital presence that matched the experience on site and could handle a high volume of booking inquiries.",
    approach: [
      "Built an image-led site with restrained motion, optimised for fast loads on mobile.",
      "Added an inquiry flow with transactional email through Resend that routes each request automatically.",
      "Structured pages and metadata around local wedding and event search terms.",
    ],
    architecture: [
      { label: "Visitor", detail: "Image-led Next.js site", tech: "Next.js" },
      { label: "Inquiry", detail: "Booking request form" },
      { label: "Routing", detail: "Transactional email via Resend", tech: "Resend" },
      { label: "Venue team", detail: "Request reaches the right contact" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
