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
    "I build products end to end, from the database to the screen, in Next.js, Python and FastAPI. When AI earns its place in a product, I build it in properly: with rules, reviews and tests, so it doesn’t let your users down.",
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
  title: "A visa CRM that uses AI for assessments,",
  titleAccent: "without letting the model decide.",
  paragraphs: [
    "A visa consultancy was running every case on spreadsheets and WhatsApp, and checking each person’s eligibility by hand. The easy answer is “just ask a model”. But here a wrong yes costs someone months and real money.",
    "So I split the job. The model reads and drafts. A rules engine makes the call. A person signs off. Around that sits a back office that has to get money right, every single time.",
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
  intro: "Live products first. For each one: what I owned, and the hardest problem I hit.",
  moreTitle: "More work",
  moreIntro: "Voice agents, healthcare and client work. The private ones I’m happy to walk you through on a call.",
  moreNote: "psst, the NDA ones are the fun ones",
};

export const habits = {
  note: "how I build agents",
  title: "Four habits, every build",
  intro: "Same order every time, and each one comes with a real example. A habit without proof is just a slogan.",
  items: [
    {
      title: "Map the work first",
      body: "Before any model: who does what, where it breaks, and what a mistake actually costs.",
      practice: "Visa cases lived on spreadsheets and WhatsApp, so the CRM came before the AI.",
    },
    {
      title: "Small tools, typed outputs",
      body: "Agents get a short list of narrow, typed tools, not free rein.",
      practice: "The HVAC agent gets exactly nine functions. Nothing else.",
    },
    {
      title: "Rules and people decide",
      body: "Hard rules for anything that matters, and a human check for the rest.",
      practice: "One rule file per country, plus maker–checker sign-off.",
      dark: true,
    },
    {
      title: "Measure from day one",
      body: "Benchmarks, eval sets, cost caps and logs before launch, not after.",
      practice: "Founderflow’s models were picked by benchmark; the CRM caps cost per run.",
    },
  ],
};

export const about = {
  note: "what I’m looking for",
  title: "A team to grow with,",
  titleAccent: "for the long run.",
  paragraphs: [
    "Hey, I’m Adam. I’m looking for a long-term home: an established company with a real product, real users and engineering that’s in good order. Somewhere I can stay for years, own something meaningful, and keep getting better.",
    "What matters to me is simple. Stable work and fair pay. Managers who make clear decisions. And room to bring new ideas, AI included, into a product people already rely on.",
    "I’ve done the startup and agency sprint. Now I want to put that pace into a team that thinks in years, not weeks.",
  ],
  lookingFor: "A long-term full-stack or AI engineering role at an established company",
  where: "Remote, or relocating, happily",
  photoCaption: "off-screen, clearing my head",
  fitTitle: "If you’re hiring, here’s what you get",
  fit: [
    {
      need: "You need features shipped end to end",
      answer: "I own the whole slice: schema, API, UI, tests and deploy. No hand-offs, no half-finished tickets.",
    },
    {
      need: "You want AI that holds up with real customers",
      answer: "Rules decide, models assist, people review. I’ve shipped it with cost caps, evals and audit logs.",
    },
    {
      need: "You want someone who sticks around",
      answer: "I’m looking to stay and grow with one team for years, not to hop to the next thing.",
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
  intro: "Grouped by layer, from the agent on top to the infrastructure underneath. Marked tools are the ones I use every day.",
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
  note: "tell me what you’re building, and what keeps breaking",
  openTo: "Long-term roles · remote or relocation",
};
