# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands should be run from `/Users/mac/Developer/Portfolio/protfolio/` (the Next.js project root — note the parent `Portfolio/` directory only holds Claude Code packages).

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (also type-checks content/)
npm run lint     # ESLint
npm run cv:pdf   # After a build: render /resume to public/Muhammad-Adam-CV.pdf (uses installed Chrome, or CHROME_PATH)
```

There are no automated tests in this project.

## Architecture

A **Next.js 16 App Router** portfolio using TypeScript and Tailwind CSS v4. Every page is statically generated and rendered as Server Components; the only client components are `ThemeToggle`, `MotionToggle` and `PrintButton` on `/resume`. Keep it that way — the site is deliberately calm and lightweight: no animation libraries, WebGL or client-side data fetching. Project covers morph between the list and the project page with React's `<ViewTransition>` (`experimental.viewTransition` in `next.config.ts`, types in `types/react-canary.d.ts`). Only name small elements: naming the whole `<main>` froze navigation for seconds on large screens.

### Content layer

All portfolio and CV content lives in typed files under `content/` — see `content/README.md` for the editing guide:

- `profile.ts` — name, title, `headline` (the words after " — " are set in wine italic), `intro`, `coreStack` (named in a sentence beside Skills), contact, links, CV options (`cv.showPhoto`, `cv.pdf`)
- `experience.ts` — `Experience[]`, newest first; omit `end` for the current role
- `projects.ts` — `Project[]`; `slug` drives `/projects/[slug]` and seeds the generative cover, `featured` shows on home, `onCv` on the CV, `architecture` (`FlowStep[]`) renders as a one-line flow in project lists (`ArchitectureInline`), a "How it works" walkthrough on project pages (`ArchitectureSteps`) and the number of bands in the cover; `cover.scheme` overrides the cover colours
- `skills.ts` — skill groups with a one-line `description`
- `education.ts` — education, languages, and the "How I work" principles
- `site.ts` — section titles and one-line descriptions, the `/projects` intro, the contact band that ends every page, and the hero painting's caption
- `types.ts` — the schema for all of the above

The home page, project pages and `/resume` all read from these files — never hard-code content in components. Tech logos and brand colours are resolved by name in `lib/tech.tsx` (Simple Icons via `react-icons/si`, extra Simple Icons paths in `lib/brand-icons.tsx`, or an SVG in `public/logos/tech/`), with `darkColor` for brands too dark on the dark theme; company logos come from `public/logos/companies/` with an initials fallback (`CompanyLogo`). Only write numbers/metrics that the owner has confirmed.

### Design system

Clean and text-first like 37signals, with one piece of calm, "groovy" art. Words do the work: plain, specific, first-person sentences built only from facts in `content/`; big serif statements; generous whitespace; one idea per section. The art is placed like a framed painting, never behind text, and nothing competes with it. Keep it restrained — no gradients, glows, background patterns, code-window mockups, stat counters, marquees, custom cursors or loaders. When adding something, ask whether the page reads better without it.

`app/globals.css` is the single source of truth for tokens (light "paper" and dark "velvet night"), exposed to Tailwind via `@theme inline` as `bg-bg`, `bg-surface`, `bg-surface-sunk`, `text-fg`, `text-muted`, `text-subtle`, `border-line`, `border-line-strong`, `text-accent`, `bg-navy`, `text-live`, `bg-band`, `text-band-fg`, `text-band-muted`, and the sizes `text-small` / `text-body` / `text-lead` / `text-step-2` / `text-step-3`. Don't write `text-[var(--x)]` for a size — Tailwind compiles an untyped `var()` there as a colour. Tailwind utilities always beat the component classes (they're in a later layer), so no `!` overrides are needed.

- Colour roles: **wine** (`--accent`; velvet rose at night) = something you can act on (links on hover, the italic headline clause, list markers, focus ring), with `--accent-fill` for primary buttons (wine by day, velvet at night); **navy** = structure (initials tiles); **ink** = content; **green** (`--live`) = current role / live project; **velvet band** (`--band`) = the contact band. Art colours (`--art-*`, `--horizon-*`, cover schemes) are decorative only and never carry text. Running text is ≥ 10:1, meta text ≥ 5.8:1 in both themes.
- Type: Newsreader (serif) for display — `.display-hero` (home headline, 42→72px), `.display-page` (page titles, 38→64px), `.section-title` (30→44px), `.item-title` (22→28px); Inter for reading at 17→19px (`--step-0`) with `.lead` at 19→23px; IBM Plex Mono only for small metadata (`.meta`, `.eyebrow`). All sizes are fluid `clamp()` steps in `:root`.
- Layout: `.container-page` (76rem of content plus fluid gutters), `.grid-12`, `.measure` (40rem line length). `Section` renders the rail pattern: a hairline, the title and description in a rail on the left (sticky from 1024px on tall screens) and the content on the right. Grid children holding wide content need `min-w-0`.
- Components: `.link`, `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost` (on the band) / `.btn-sm`, `.icon-btn`, `.chip` / `.chip-sm`, `.prose-list` (wine dash markers), `.live-dot`, `.grow-underline` (inside a `.group` link), `.cover-frame` + `.cover-canvas`.
- Art lives only in `app/components/art/`, with geometry computed at build time in `lib/art.ts`: `GrooveArt` (the hero painting — five wave bands drifting at their own pace under a sun that rises once on load; `still` for the 404), `Horizon` (the wavy lower edge of the contact band) and `ProjectCover` (deterministic from the slug: "Horizon" bands for products, "Signal" arcs for AI agents). At most one continuously moving artwork is on screen at a time.
- Theme: `data-theme` on `<html>` is set before paint by the inline script in `layout.tsx`, which also restores a paused `data-motion`; the `dark:` variant keys off `data-theme`. Use tokens rather than `dark:` where possible. `ThemeToggle` reveals the new theme in a circle via `document.startViewTransition` where supported.
- Motion: CSS only, and only `transform`/`opacity`, all inside `@media screen and (prefers-reduced-motion: no-preference)`. Continuous motion (the painting, the horizon, the "How it works" pulse) sits in a `.motion` container, and the live dots are listed next to it, so `MotionToggle` (Pause/Play in the art caption and footer) stops everything that loops. Interactions ≤ 240ms; cover morphs ~560ms; one staggered `.fade-in` on load; `.reveal` for scroll reveals (short range, so text reaches full contrast quickly) uses `animation-timeline: view()` behind `@supports`, so content is always visible without it. Never hide content by default waiting for JS.
- Responsive: check 360, 390, 768, 1024 and 1440px in both themes, with no horizontal scroll.

### Route structure

| Route | Notes |
|-------|-------|
| `/` | Intro (portrait, headline, intro, "Now" line, CTAs, the live painting), Selected work (project plates), Experience (timeline), Skills, How I work (`app/(site)/page.tsx`) |
| `/projects` | All projects, grouped into products and AI agents |
| `/projects/[slug]` | Project write-up (overview, problem, how it works, what I built, outcome, stack), statically generated |
| `/resume` | Single-column A4 CV generated from `content/`, with print CSS in `app/resume/resume.css`; outside the `(site)` group so it has no site header |
| `/experience`, `/skills`, `/process`, `/contact` | Redirect to home-page anchors (`next.config.ts`) |

`app/(site)/layout.tsx` adds the header (which includes the skip link) and footer; every page ends with the velvet contact band (`#contact`) in `SiteFooter`. `app/not-found.tsx` renders its own header and footer. Copy for all of these lives in `content/site.ts`. `app/opengraph-image.tsx`, `sitemap.ts` and `robots.ts` use `siteUrl` from `content/profile.ts` (`NEXT_PUBLIC_SITE_URL`).

### CV

The CV must stay one A4 page: after changing content run `npm run build && npm run cv:pdf`, which warns if it spills. Keep bullets to one line (~105 characters at the 9.5pt body size) and commit the regenerated PDF. The sheet is always white and ATS-safe; its only brand touches are the serif name and the wine header rule and section headings.
