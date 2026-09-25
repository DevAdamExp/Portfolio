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

A **Next.js 16 App Router** portfolio using TypeScript and Tailwind CSS v4. Every page is statically generated and rendered as Server Components; the only client component on the site is `ThemeToggle` (plus `PrintButton` on `/resume`). Keep it that way — the site is deliberately calm and lightweight.

### Content layer

All portfolio and CV content lives in typed files under `content/` — see `content/README.md` for the editing guide:

- `profile.ts` — name, title, intro, contact, links, CV options (`cv.showPhoto`, `cv.pdf`)
- `experience.ts` — `Experience[]`, newest first; omit `end` for the current role
- `projects.ts` — `Project[]`; `slug` drives `/projects/[slug]`, `featured` shows on home, `onCv` on the CV
- `skills.ts` — grouped skill names
- `education.ts` — education, languages, and the "How I work" principles
- `types.ts` — the schema for all of the above

The home page, project pages and `/resume` all read from these files — never hard-code content in components. Tech logos are resolved by name in `lib/tech.tsx` (Simple Icons via `react-icons/si`, or an SVG in `public/logos/tech/`); company logos come from `public/logos/companies/` with an initials fallback (`CompanyLogo`). Only write numbers/metrics that the owner has confirmed.

### Design system

`app/globals.css` is the single source of truth: colour tokens (`--bg`, `--fg`, `--fg-muted`, `--fg-subtle`, `--border`, `--accent`, …) for light and dark, exposed to Tailwind via `@theme inline` as `bg-bg`, `text-fg`, `text-muted`, `text-subtle`, `border-line`, `text-accent`, etc. Reusable classes: `.container-page` (the single ~44rem column), `.section-title`, `.link`, `.btn` / `.btn-primary` / `.btn-secondary`, `.chip`, `.prose-list`, `.fade-in`.

- Fonts: Geist (sans) and Geist Mono via `next/font` in `app/layout.tsx`. Mono is only for small metadata such as dates.
- Theme: `data-theme` on `<html>` is set before paint by the inline script in `layout.tsx`; the `dark:` variant keys off it. Use tokens rather than `dark:` where possible.
- Accent (`--accent`, emerald) is reserved for tiny status markers (current role, live projects). No other colour.
- Motion: CSS only, opacity/transform, ≤ 200ms for interactions and one quiet page-load fade, all behind `prefers-reduced-motion`. No WebGL, custom cursors, loaders or animation libraries.

### Route structure

| Route | Notes |
|-------|-------|
| `/` | Intro, Experience, Selected projects, Skills, How I work, Contact (`app/(site)/page.tsx`) |
| `/projects` | All projects, grouped into products and AI agents |
| `/projects/[slug]` | Project write-up (problem, what I built, outcome, stack), statically generated |
| `/resume` | Single-column A4 CV generated from `content/`, with print CSS in `app/resume/resume.css`; outside the `(site)` group so it has no site header |
| `/experience`, `/skills`, `/process`, `/contact` | Redirect to home-page anchors (`next.config.ts`) |

`app/(site)/layout.tsx` adds the header and footer; `app/not-found.tsx` renders its own. `app/opengraph-image.tsx`, `sitemap.ts` and `robots.ts` use `siteUrl` from `content/profile.ts` (`NEXT_PUBLIC_SITE_URL`).

### CV

The CV must stay one A4 page: after changing content run `npm run build && npm run cv:pdf`, which warns if it spills. Keep bullets to one line (~105 characters) and commit the regenerated PDF.
