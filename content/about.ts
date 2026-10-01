/**
 * Every word on the home page that isn't a job or a project.
 *
 * Voice: first person, plain words, short sentences. Say what something does
 * before how it works. Hand-written notes (`note`) are decoration: keep them
 * under eight words and never put a fact only there.
 */

export const hero = {
  hello: "hi, it’s me",
  oldTitles: ["frontend developer", "full stack engineer"],
  role: "Full Stack Developer",
  roleLine: "with an edge in agentic AI",
  promise:
    "I build web and mobile products end to end with Next.js, React Native, Python and FastAPI. Lately that often includes AI features, built with the same tests and checks as everything else.",
  photoCaption: "thinking about edge cases, probably",
  sticky: "ships the AI and the boring bits",
};

/** The four numbers under the hero. Each one must be true and defensible. */
export const proof = [
  { value: 2, suffix: "+", label: "years shipping to production" },
  { value: 7, suffix: "", label: "roles, two of them right now" },
  { value: 10, suffix: "", label: "projects, 6 of them live" },
  { value: 2600, suffix: "+", label: "tests behind one system", highlight: true },
];

export const shippedWith = [
  "Remark Studio",
  "Founderflow",
  "Aptive Mind",
  "Auroxa Tech",
  "a German health-tech team",
  "Dot Escapist",
  "Al-Basirr Technologies",
];

export const proudOf = {
  note: "if you only read one thing, make it this",
  meta: "Remark Studio · 2026 · Architect & lead engineer",
  title: "A visa CRM, powered by AI.",
  titleAccent: "But the model never makes the final call.",
  paragraphs: [
    "A visa consultancy ran every case on spreadsheets and WhatsApp and checked eligibility by hand. A model can read a CV quickly, but if it says yes when the answer is no, a real person loses months and money.",
    "So the model only reads and drafts. Fixed rules make the eligibility call, and a consultant approves every positive result.",
  ],
  steps: [
    { title: "The model reads", body: "Parses the CV, suggests countries and digs up official requirements.", note: "never the final word" },
    { title: "Rules decide", body: "A rule file per country makes the eligibility call.", note: "every “yes”" },
    { title: "A person signs off", body: "Nothing positive reaches a client without approval." },
  ],
  facts: [
    { value: "2,600+", label: "backend tests gate every release" },
    { value: "4-eyes", label: "nobody approves their own work" },
    { value: "Paid only", label: "models that see personal data" },
  ],
};

export const work = {
  note: "selected work",
  title: "Things I’ve shipped",
  intro: "What I owned on each one, and the hardest problem.",
  moreTitle: "More work",
  moreIntro: "Voice agents, healthcare and client sites. Happy to walk through the private ones on a call.",
  moreNote: "psst, the NDA ones are the fun ones",
};

export const habits = {
  note: "how I work",
  title: "How I work, day to day",
  intro: "Not principles. Just what I actually do, with where you can see it.",
  items: [
    {
      title: "I write it down first",
      body: "Before I code, I sketch the data, the screens and what can go wrong. It saves me rewrites.",
      practice: "The medication app shipped with about 30 docs: runbooks, test plans, a privacy assessment.",
    },
    {
      title: "Small commits, every day",
      body: "I push small, working changes often, so nothing sits half-done and reviews stay easy.",
      practice: "Around 1,000 commits on the CRM in its first few months.",
    },
    {
      title: "Tests before trust",
      body: "If it handles money, bookings or health data, it doesn’t ship until a test covers it.",
      practice: "2,600+ backend tests on the CRM, and a 48-step end-to-end suite on the app.",
      dark: true,
    },
    {
      title: "AI drafts, people decide",
      body: "Models are good at reading and drafting. Final calls go to rules or a person.",
      practice: "Eligibility comes from rule files per country; every “yes” is approved by a consultant.",
    },
  ],
};

export const about = {
  note: "what I’m looking for",
  title: "A team to grow with,",
  titleAccent: "for the long run.",
  paragraphs: [
    "Hey, I’m Adam. So far I’ve worked at agencies, startups and on contracts, often on several things at once. I’ve learned a lot that way, and now I want to settle into one team.",
    "I’m looking for an established company with a real product and good engineering practices: stable work, fair pay, managers who decide clearly, and room to suggest improvements, including AI where it helps.",
  ],
  lookingFor: "A long-term full-stack role at an established company",
  where: "Remote, or relocating, happily",
  photoCaption: "off-screen, clearing my head",
  fitTitle: "If you’re hiring, here’s what you get",
  fit: [
    {
      need: "You need features shipped end to end",
      answer: "I can take a feature from the database to the screen, with tests, and deploy it.",
    },
    {
      need: "You want AI that holds up with real customers",
      answer: "I’ve shipped AI with cost limits, evaluations and audit logs, and humans approving the risky parts.",
    },
    {
      need: "You want someone who sticks around",
      answer: "That’s exactly what I’m looking for: one team, for years.",
    },
  ],
};

export const journey = {
  note: "the journey",
  title: "Seven stops so far",
};

export const toolkit = {
  note: "toolkit",
  title: "The stack I ship with",
  intro: "What I’ve used in production, grouped by layer. Dotted ones I use every day.",
  daily: ["Python", "FastAPI", "TypeScript", "Next.js", "OpenAI Agents SDK", "PostgreSQL", "Docker"],
  layers: [
    {
      name: "AI & agents",
      line: "Agents with typed tools, model routing and voice.",
      tint: "bg-sky",
      tools: ["OpenAI Agents SDK", "LangGraph", "OpenRouter", "Claude", "Gemini", "MCP", "Vapi", "LiveKit", "Twilio", "ElevenLabs"],
    },
    {
      name: "Backend & data",
      line: "Typed APIs, background jobs and data that stays correct.",
      tint: "bg-mint",
      tools: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Django", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Firebase"],
    },
    {
      name: "Frontend & mobile",
      line: "Fast web apps and native-feeling mobile apps.",
      tint: "bg-butter",
      tools: ["TypeScript", "Next.js", "React", "React Native", "Expo", "Tailwind CSS", "Stripe"],
    },
    {
      name: "Infra & quality",
      line: "Containers, CI and the tests that gate every release.",
      tint: "bg-blush",
      tools: ["Docker", "Google Cloud", "Nginx", "GitHub Actions", "Vercel", "Fly.io", "Playwright", "pytest", "Jest"],
    },
  ],
};

export const ending = {
  title: "You’ve reached the end.",
  subtitle: "Or the beginning.",
  note: "tell me what you’re building",
  openTo: "Long-term roles · remote or relocation",
};
