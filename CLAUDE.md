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

A **Next.js 16 App Router** portfolio using TypeScript and Tailwind CSS v4. Every page is statically generated and rendered as Server Components; the only client components are `ThemeToggle`, `MobileNav` (below `lg`) and `PrintButton` on `/resume`. Keep it that way — the site is deliberately lightweight: no animation libraries, WebGL or client-side data fetching.

### Content layer

All portfolio and CV content lives in typed files under `content/` — see `content/README.md` for the editing guide:

- `profile.ts` — name, title, `headline`/`headlineAccent`/`intro` for the hero, `focus`/`coreStack` for the `engineer.ts` card, contact, links, CV options (`cv.showPhoto`, `cv.pdf`)
- `experience.ts` — `Experience[]`, newest first; omit `end` for the current role
- `projects.ts` — `Project[]`; `slug` drives `/projects/[slug]`, `featured` shows on home, `onCv` on the CV, `architecture` (`FlowStep[]`) renders the system diagram on cards (`ArchitecturePreview`) and project pages (`ArchitectureSteps`)
- `skills.ts` — skill groups with a one-line `description`
- `education.ts` — education, languages, and the "How I work" principles
- `types.ts` — the schema for all of the above

The home page, project pages and `/resume` all read from these files — never hard-code content in components. The hero stats are derived from content (`Hero.tsx`), not typed in. Tech logos and brand colours are resolved by name in `lib/tech.tsx` (Simple Icons via `react-icons/si`, extra Simple Icons paths in `lib/brand-icons.tsx`, or an SVG in `public/logos/tech/`), with `darkColor` for brands too dark on the dark theme; company logos come from `public/logos/companies/` with an initials fallback (`CompanyLogo`). Only write numbers/metrics that the owner has confirmed.

### Design system

`app/globals.css` is the single source of truth: colour tokens (`--bg`, `--surface`, `--surface-2`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--accent`, `--accent-2`, `--glow`, …) for light and dark, exposed to Tailwind via `@theme inline` as `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `text-subtle`, `border-line`, `text-accent`, `bg-accent-soft`, etc. Reusable classes: `.container-page` (the 72rem page grid), `.eyebrow`, `.text-gradient`, `.card` / `.card-hover`, `.btn` / `.btn-sm` / `.btn-primary` / `.btn-secondary`, `.chip` / `.chip-sm`, `.badge` / `.badge-accent`, `.check-list`, `.bg-grid` + `.fade-mask`, `.fade-in`.

- Layout: every home section uses `Section` (eyebrow, title, description; `layout="split"` puts the heading in a sticky left column on `lg`). Sections are full-width with a top hairline; content sits in `.container-page`.
- Responsive: check 360, 390, 768, 1024 and 1440px. Grid children that hold wide content need `min-w-0`; nav collapses into `MobileNav` below `lg`.
- Fonts: Geist (sans) and Geist Mono via `next/font` in `app/layout.tsx`. Mono is for code, dates and small metadata.
- Theme: `data-theme` on `<html>` is set before paint by the inline script in `layout.tsx`; the `dark:` variant keys off it. Use tokens rather than `dark:` where possible.
- Colour: the emerald→cyan accent (`--accent`, `--accent-2`) is for eyebrows, the headline highlight, status badges and diagram connectors; tech logos use their brand colours. Everything else stays neutral.
- Motion: CSS only, opacity/transform, ≤ 200ms for interactions and one page-load fade, all behind `prefers-reduced-motion`. No WebGL, custom cursors, loaders or animation libraries.

### Route structure

| Route | Notes |
|-------|-------|
| `/` | Hero (headline, `engineer.ts` card, stats), Experience timeline, Selected projects, Skills, How I work, Contact (`app/(site)/page.tsx`) |
| `/projects` | All project cards, grouped into products and AI agents |
| `/projects/[slug]` | Project write-up (problem, architecture, what I built, outcome) with a sticky facts/stack sidebar, statically generated |
| `/resume` | Single-column A4 CV generated from `content/`, with print CSS in `app/resume/resume.css`; outside the `(site)` group so it has no site header |
| `/experience`, `/skills`, `/process`, `/contact` | Redirect to home-page anchors (`next.config.ts`) |

`app/(site)/layout.tsx` adds the header and footer; `app/not-found.tsx` renders its own. `app/opengraph-image.tsx`, `sitemap.ts` and `robots.ts` use `siteUrl` from `content/profile.ts` (`NEXT_PUBLIC_SITE_URL`).

### CV

The CV must stay one A4 page: after changing content run `npm run build && npm run cv:pdf`, which warns if it spills. Keep bullets to one line (~105 characters) and commit the regenerated PDF.
