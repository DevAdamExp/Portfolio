# Muhammad Adam — Portfolio

Personal site and CV. Built with Next.js 16 (App Router), TypeScript and
Tailwind CSS v4. Every page is static, and the home page ships no client
JavaScript beyond the framework runtime and a theme toggle. The design is
deliberately simple: one sans-serif family, clean cards, wine accents and a
dark "velvet night" theme.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build and type-check
npm run lint
```

## Edit content

All content (profile, experience, projects, skills, education) lives in
[`content/`](content/README.md), which also explains how to add jobs,
projects, skills and logos. The home page, project pages and the CV at
`/resume` update from the same files.

## CV PDF

The "Download CV" buttons serve `public/Muhammad-Adam-CV.pdf`. Regenerate it
after changing content:

```bash
npm run build && npm run cv:pdf
```

This uses your installed Google Chrome; set `CHROME_PATH` to use another
Chromium build.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) so
metadata, the sitemap and social previews use the right domain, then deploy
to Vercel or any Node host.
