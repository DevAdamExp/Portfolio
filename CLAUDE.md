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

A **Next.js 16 App Router** portfolio using TypeScript and Tailwind CSS v4. Every page is statically generated and rendered as Server Components; the only client components are `ThemeToggle` and `PrintButton` on `/resume`. Keep it that way — the site is deliberately simple and lightweight: no animation libraries, WebGL or client-side data fetching.

### Content layer

All portfolio and CV content lives in typed files under `content/` — see `content/README.md` for the editing guide:

- `profile.ts` — name, title, `headline` (the words after " — " are set in a quieter grey), `intro`, `coreStack` (named in a sentence beside Skills), contact, links, CV options (`cv.showPhoto`, `cv.pdf`)
- `experience.ts` — `Experience[]`, newest first; omit `end` for the current role
- `projects.ts` — `Project[]`; `slug` drives `/projects/[slug]`, `featured` shows on home, `onCv` on the CV, `architecture` (`FlowStep[]`) renders as a one-line flow on project cards (`ArchitectureInline`) and a "How it works" walkthrough on project pages (`ArchitectureSteps`), `image` is a real screenshot shown on the project page
- `skills.ts` — skill groups with a one-line `description`
- `education.ts` — education, languages, and the "How I work" principles
- `site.ts` — section titles and one-line descriptions, the `/projects` intro, the contact card that ends every page, and the 404 page
- `types.ts` — the schema for all of the above

The home page, project pages and `/resume` all read from these files — never hard-code content in components. Tech logos and brand colours are resolved by name in `lib/tech.tsx` (Simple Icons via `react-icons/si`, extra Simple Icons paths in `lib/brand-icons.tsx`, or an SVG in `public/logos/tech/`), with `darkColor` for brands too dark on the dark theme; company logos come from `public/logos/companies/` with an initials fallback (`CompanyLogo`). Only write numbers/metrics that the owner has confirmed.

### Design system

Simple, clean and professional: text-first, one sans-serif family, plenty of whitespace, simple bordered cards, and colour only where it means something. Words do the work: plain, specific, first-person sentences built only from facts in `content/`, one idea per section. No art, illustrations, gradients, glows, background patterns, code-window mockups, stat counters, marquees, custom cursors or loaders. When adding something, ask whether the page reads better without it.

`app/globals.css` is the single source of truth for tokens (light and dark "velvet night"), exposed to Tailwind via `@theme inline` as `bg-bg`, `bg-surface`, `bg-surface-sunk`, `text-fg`, `text-muted`, `text-subtle`, `border-line`, `border-line-strong`, `text-accent`, `bg-navy`, `text-live`, `bg-band`, `text-band-fg`, `text-band-muted`, and the sizes `text-small` / `text-body` / `text-lead`. Don't write `text-[var(--x)]` for a size — Tailwind compiles an untyped `var()` there as a colour. Tailwind utilities always beat the component classes (they're in a later layer), so no `!` overrides are needed; and never combine two display utilities (e.g. `inline-flex` with `hidden sm:inline-flex`) on one element.

- Colour roles: **wine** (`--accent`; velvet rose at night) = something you can act on (link hovers, list markers, focus ring), with `--accent-fill` for primary buttons (wine by day, velvet at night); **navy** = initials tiles; **ink** = content; **grey** (`text-muted` / `text-subtle`) = supporting text, including the second half of the headline; **green** (`--live`) = current role / live project; **wine card** (`--band`) = the contact card. Running text is ≥ 10:1 and meta text ≥ 5.2:1 in both themes.
- Type: Geist for everything, Geist Mono only for small metadata (`.meta`, `.eyebrow`). `.display-hero` (home headline, 36→60px), `.display-page` (page titles, 32→48px), `.section-title` (24→32px), `.item-title` (20→22px), body 17→18px (`--step-0`), `.lead` 19→21px. All sizes are fluid `clamp()` steps in `:root`.
- Layout: one `.container-page` column (64rem of content plus fluid gutters) and `.measure` (42rem) for running text. `Section` renders a title, an optional one-line description and the content, separated by whitespace. Experience reads like a CV (dates on the left, details on the right); projects and principles are `.card`s in a two-column grid. Grid children holding wide content need `min-w-0`.
- Components: `.link`, `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-light` and `.btn-ghost` (on the wine card) / `.btn-sm`, `.icon-btn`, `.card`, `.chip` / `.chip-sm`, `.prose-list` (wine dash markers), `.live-dot`.
- Theme: `data-theme` on `<html>` is set before paint by the inline script in `layout.tsx`; the `dark:` variant keys off it. Use tokens rather than `dark:` where possible. `ThemeToggle` reveals the new theme in a circle via `document.startViewTransition` where supported and keeps the browser's theme colour in step.
- Motion: CSS only, only `transform`/`opacity`, all inside `@media screen and (prefers-reduced-motion: no-preference)`: one staggered `.fade-in` on load and a short `.reveal` rise as sections scroll in (`animation-timeline: view()` behind `@supports`, so content is always visible without it). Nothing loops. Interactions ≤ 200ms. Never hide content by default waiting for JS.
- Responsive: check 320, 360, 390, 768, 1024 and 1440px in both themes, with no horizontal scroll.

### Route structure

| Route | Notes |
|-------|-------|
| `/` | Intro (portrait, headline, intro, "Now" line, CTAs), Selected work (project cards), Experience (CV-style list), Skills, How I work (`app/(site)/page.tsx`) |
| `/projects` | All projects, grouped into products and AI agents |
| `/projects/[slug]` | Project write-up (title, facts, screenshot if any, overview, problem, how it works, what I built, outcome, stack), statically generated |
| `/resume` | Single-column A4 CV generated from `content/`, with print CSS in `app/resume/resume.css`; outside the `(site)` group so it has no site header |
| `/experience`, `/skills`, `/process`, `/contact` | Redirect to home-page anchors (`next.config.ts`) |

`app/(site)/layout.tsx` adds the header (which includes the skip link) and footer; every page ends with the wine contact card (`#contact`) in `SiteFooter`. `app/not-found.tsx` renders its own header and footer. Copy for all of these lives in `content/site.ts`. `app/opengraph-image.tsx`, `sitemap.ts` and `robots.ts` use `siteUrl` from `content/profile.ts` (`NEXT_PUBLIC_SITE_URL`).

### CV

The CV must stay one A4 page: after changing content run `npm run build && npm run cv:pdf`, which warns if it spills. Keep bullets to one line (~105 characters at the 9.5pt body size) and commit the regenerated PDF. The sheet is always white and ATS-safe; its only brand touches are the wine header rule and section headings.
