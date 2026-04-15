# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands should be run from `/Users/mac/Developer/Portfolio/protfolio/` (the Next.js project root — note the parent `Portfolio/` directory only holds Claude Code packages).

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

There are no automated tests in this project.

## Architecture

This is a **Next.js 16 App Router** portfolio site using TypeScript and Tailwind CSS v4.

### Key architectural decisions

**3D background**: `SystemBackgroundWrapper` (client component) renders `SystemBackground` — a full-screen fixed Three.js canvas (`z-0`) with a rotating star field and meteor effects. The entire page body has `background: transparent` so all pages share this one canvas. Never remove the `alpha: false` WebGL option or set a CSS background on `body`/`html` — that breaks the effect.

**Page transitions**: `app/template.tsx` wraps every page in a Framer Motion fade — this is Next.js's built-in template mechanism and runs automatically on every route change.

**Home page loading gate**: `app/page.tsx` renders a `LoadingScreen` overlay via `AnimatePresence`. Sections below are rendered immediately in the DOM but hidden by the overlay, so they're ready when the reveal happens. Heavy sections (`SkillsSection`, `ProjectsSection`, `MethodologySection`) are lazily imported with `dynamic()` + `ssr: false`.

**Data layer**: All portfolio content lives in static TypeScript files:
- `app/projects/data/projects.ts` — typed `Project[]` with tech stack, status, performance metrics
- `app/experience/data/jobs.ts` — typed `Job[]`
- `app/process/data/phases.ts` — methodology phases

To add/edit portfolio content, edit only these data files.

### Design system

Two sources of truth that must stay in sync:
- **`lib/design-tokens.ts`** — JS/TS constants (`designTokens`, `tw` utility classes)
- **`app/globals.css`** — CSS custom properties (e.g. `--acc-red`, `--bg-void`, `--fg-cinema`)

Tailwind v4 is configured via `postcss.config.mjs`. Font variables (`--font-bebas`, `--font-inter`) are injected by `app/layout.tsx` and consumed in CSS. Use `.font-bebas` for display/heading text (Bebas Neue), `.font-mono` for labels, and `var(--font-inter)` for body.

Accent color is `#D10000` / `var(--acc-red)`. All pages use dark backgrounds (`#020202`–`#0A0A0A`).

### Route structure

| Route | Notes |
|-------|-------|
| `/` | Single-page sections (Hero, Experience, Skills, Methodology, Projects) |
| `/experience` | Full experience timeline |
| `/projects` | Project grid + detail view |
| `/process` | Methodology/phases (has its own sub-components in `app/process/components/`) |
| `/skills` | Skills page |
| `/resume` | Resume page |
| `/contact` | Contact page |

### Component conventions

- 3D / WebGL components live in `app/components/3d/` and must be `"use client"` with `ssr: false` dynamic imports at call sites
- `SectionWrapper` provides consistent section padding — use it for new top-level sections
- `ScrambleText` and `SingularityCursor` are UI primitives in `app/components/ui/`
