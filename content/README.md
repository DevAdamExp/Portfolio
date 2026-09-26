# Editing your portfolio content

Everything on the site and the CV comes from the typed files in this folder.
Edit a file, save, and the home page, project pages and `/resume` all update.
TypeScript flags a missing or misspelled field when you run `npm run build`.

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, title, headline, intro, profile card, contact details, links, CV options |
| `experience.ts` | Work history (newest first) |
| `projects.ts` | Projects, their detail pages, what is featured / on the CV |
| `skills.ts` | Skill groups and the logos next to them |
| `education.ts` | Education, languages, and the "How I work" principles |
| `types.ts` | The schema for all of the above, with comments on every field |

## Add a job

Add an object to the top of `experience` in `experience.ts`:

```ts
{
  company: "Acme",
  companyUrl: "https://acme.com",           // optional, links the company name
  logo: "/logos/companies/acme.svg",         // optional, see "Logos" below
  role: "Senior Software Engineer",
  type: "Full-time",
  location: "Remote",                        // optional
  start: "2026-10",                          // YYYY-MM
  // end: "2027-06",                         // leave out while you work there
  summary: "One sentence: the scope you own and why it matters.",
  highlights: [
    "Verb + what you built or changed + the result.",
  ],
  stack: ["Python", "FastAPI", "Next.js"],   // names from lib/tech.tsx get logos
  projects: ["gocreation"],                  // optional project slugs
}
```

When you leave a role, add its `end` date.

## Add a project

Add an object to `projects.ts`. The `slug` becomes the URL (`/projects/<slug>`).
Set `featured: true` to show it on the home page and `onCv: true` to list it on
the CV. Screenshots go in `/public/projects/` — real screenshots only, ideally
16:10 at around 1600px wide. The screenshot appears at the top of the project
page; cards show the architecture diagram instead.

Write `problem` in your user's or client's terms, `approach` as what you
designed and built, and `outcomes` only with results you can back up.

`architecture` is the system diagram shown on the project card and the
project page. List the steps in request order; `tech` adds that tool's logo:

```ts
architecture: [
  { label: "Caller", detail: "Inbound phone call" },
  { label: "Voice agent", detail: "OpenAI Realtime API", tech: "OpenAI" },
  { label: "Tools", detail: "Tickets via FastAPI", tech: "FastAPI" },
],
```

Keep labels short (one or two words); cards show four or five steps best.

## Add a skill

Add the name to a group in `skills.ts`. If the name has an entry in
`lib/tech.tsx` it shows that logo in its brand colour; otherwise it shows a
letter tile. Each group's `description` appears under its title.

## Home page hero

`headline` is the large heading and `headlineAccent` is the part of it shown
in the green-to-cyan gradient. `intro` sits under it. `focus` and
`coreStack` fill the `engineer.ts` card next to the headline. The numbers
under the hero are calculated from your experience and projects, so they
update themselves.

## Logos

**Technology logos** come from [Simple Icons](https://react-icons.github.io/react-icons/icons/si/)
via `react-icons`. To add one, import it in `lib/tech.tsx` and add a line to
the registry with its brand colour (Simple Icons lists it on each icon's page):

```ts
Supabase: { icon: SiSupabase, color: "#3FCF8E" },
```

Add `darkColor` when the brand colour is too dark to see in dark mode, and
leave `color` out for black-and-white brands (they follow the text colour).
LangGraph, LiveKit, CrewAI and MCP live in `lib/brand-icons.tsx` because
`react-icons` doesn't include them yet.

For a tool that isn't in Simple Icons, save a single-colour SVG to
`/public/logos/tech/` and register it with `{ logo: "/logos/tech/name.svg" }`.

**Company logos** go in `/public/logos/companies/`. Use a square SVG or PNG
(at least 96×96) on a transparent or white background, then set `logo` on the
experience entry. Without a logo the company shows its initials.

## The CV

`/resume` is generated from the same files. Things only the CV uses:

- `profile.cvSummary` — the summary at the top
- `profile.phone` — shown on the CV only, never on the site
- `profile.cv.showPhoto` — `true` adds your photo (common in Pakistan, the Gulf
  and parts of Europe; leave it `false` for US/UK roles and applicant-tracking
  systems)
- `onCv: false` on an experience entry hides it from the CV

After changing content, regenerate the PDF that the "Download CV" buttons
serve:

```bash
npm run build && npm run cv:pdf
```
