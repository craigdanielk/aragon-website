# CLAUDE.md — aragon-website

## What This Repo Is
Personal/agency website for ARAGON — Craig's content pipeline and AI consulting practice. Marketing site with blog, case studies, and service pages.

## Tech Stack
- Next.js 16 (App Router) with TypeScript
- React 19, Tailwind CSS 4
- MDX for blog/content (gray-matter, remark-gfm, rehype-highlight)
- Framer Motion for animations
- Deployed on Vercel

## How to Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
```

## Key Files
- `src/app/` — App Router pages: about, blog, builds, consultation, architecture, conversations, api
- `src/components/` — UI components (nav, footer, hero-background, motion, post-card, sections/)
- `src/lib/` — Shared utilities
- `content/blog/` — Blog posts (MDX/markdown with frontmatter)
- `content/conversations/` — Conversation content
- `public/` — Static assets
- `next.config.ts` — Next.js config
- `globals.css` — Global styles (Tailwind)

## Known Gotchas
- Uses Next.js 16 (bleeding edge) — check compatibility before adding packages
- Content lives in `content/` at project root, not in `src/`
- Remote: https://github.com/craigdanielk/aragon-website.git
