# AGENTS.md

This file provides working instructions for coding agents in this repository.

## Project

- Personal portfolio at `henkas.eu` plus a small apps subsite at `apps.henkas.eu`
- Stack: Astro, Tailwind CSS, Astro Content Collections
- Hosting: Cloudflare Workers + Static Assets (one Worker serves both domains)
- Primary product/design spec: `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`
- Deployment and CI/CD setup: `DEPLOYMENT.md`

## Source Of Truth

Use these in order:

1. `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`
2. `CLAUDE.md`
3. `.superpowers/brainstorm/35888-1774223398/*`

The design spec is authoritative for structure, content model, and visual rules. `CLAUDE.md` is the concise implementation guide. The `.superpowers/brainstorm` files are exploratory design artifacts; use them for visual intent and background, not as binding requirements when they conflict with the spec.

## Commands

```bash
npm run dev              # Astro dev server (localhost:4321)
npm run dev:worker       # Worker locally via wrangler (localhost:8787)
npm run build            # astro build -> dist/
npm run check            # astro check (TypeScript)
npm run deploy           # build + wrangler deploy
npm run deploy:dry-run   # build + validate wrangler.jsonc
```

Build output is `dist/`. The Worker entry is `src/worker.ts`; the worker handles hostname-based routing (henkas.eu vs apps.henkas.eu) and delegates static content to the `ASSETS` binding.

## Architecture

Main site (`henkas.eu`):

- `/` -> `src/pages/index.astro`
- `/projects/[slug]` -> `src/pages/projects/[slug].astro`
- `/.well-known/webfinger` -> handled in `src/worker.ts`

Apps subsite (`apps.henkas.eu`), built under `src/pages/apps/`:

- `apps.henkas.eu/` -> apps index (`src/pages/apps/index.astro`)
- `apps.henkas.eu/<appname>` -> per-app landing page (`src/pages/apps/[appname].astro`)
- `apps.henkas.eu/terms-of-service` and `/privacy-policy` -> placeholder legal pages

The worker rewrites incoming `apps.henkas.eu/<path>` to `/apps/<path>/` before fetching from `env.ASSETS`. Internal apps-subsite links go through the `appsUrl()` helper in `src/lib/urls.ts` to stay clean on the public URL while still working in `astro dev`.

Implementation rules:

- Keep the main experience as a single-page scroll on `/`
- Generate project detail pages statically with `getStaticPaths()` and `getCollection('projects')`
- Keep runtime JavaScript minimal; the only intended client-side behavior is the project category filter
- Prefer Astro components for section composition and vanilla JS only where explicitly needed

Expected component boundaries:

- Each homepage section should live in its own `src/components/*.astro` file
- `WorkCard.astro` and `ProjectCard.astro` are leaf display components
- `src/layouts/Base.astro` owns document head, font loading, and global metadata

## Content Model

Projects live in `src/content/projects/*.md`.

Required project frontmatter:

```yaml
title: string
description: string
tags: string[]
status: active | completed | archived
category: sysadmin | coding | hobby
featured: boolean
date: YYYY-MM
links:
  github: string? 
  live: string?
```

Work history lives in `src/content/work/*.md`.

Required work frontmatter:

```yaml
company: string
role: string
period: string
description: string
tags: string[]
order: number
```

Apps live in `src/content/apps/*.md`.

Required app frontmatter:

```yaml
name: string
tagline: string
status: live | beta | coming-soon
order: number
date: YYYY-MM
platforms: [iOS | iPadOS | Android | Web | macOS | Windows | Linux]
license: string?
icon: string?
links:
  appStore: url | "coming-soon"
  googlePlay: url | "coming-soon"
  web: url?
  github: url?
```

Content rules:

- Exactly one project should have `featured: true`
- `order: 1` is the most recent work entry; apps are ordered by `order` ascending
- App-store links use the literal `"coming-soon"` to render a disabled badge instead of a live link
- Add new projects, jobs, and apps through content collection entries, not hardcoded page data

## Design System

Follow the design spec closely. This site should feel bold, personal, and polished, not like a generic developer portfolio.

Hard rules:

- Define shared colors as CSS custom properties in `src/styles/global.css`
- Do not introduce raw hex colors inside components when a token should exist instead
- Neutrals must keep the established purple undertone; do not swap in plain gray neutrals
- Keep typography aligned with the spec: Inter, strong headings, tight letter-spacing, small uppercase metadata, monospace tech pills
- Preserve the minimal-JS static-first approach

Key tokens as currently defined in `src/styles/global.css`:

- `--bg-page: #181828`
- `--bg-card: #242440`
- `--bg-surface: #1e1e30`
- `--accent: #7b68ee`
- `--accent-light: #b4a0ff`
- `--text-secondary: #c8cde0`
- `--text-muted: #a0a0c8`

## Layout Rules

Hero:

- Two-column split
- Left side is intro and primary actions
- Right side is status cards for current role and latest project

Work section:

- Use card-based entries
- Use a three-row structure with header plus two-column body
- Body columns should follow the spec ratio: `72.5% / 22.5%` with `5%` gap
- Past roles should use explicit softer colors, not reduced whole-card opacity

Projects section:

- Category filter pills: All, Sysadmin, Coding, Hobby
- Filter via `data-category` attributes and a small inline script
- Top grid is bento: `2fr 1fr 1fr`
- Featured card spans two rows
- Remaining items continue in a regular 3-column grid

Photography section:

- Keep it small and directional, not a full gallery
- Link out to `photo.henkas.eu`

## Editing Guidance

- Prefer extending the documented structure over inventing new routes or sections
- Keep markup and styling intentional; avoid boilerplate portfolio patterns when making visual changes
- Preserve static generation and low complexity
- If design and implementation docs diverge, align code to the spec and update supporting docs only if the change is intentional
- When adding styles, centralize reusable values as tokens before repeating them

## Current Repo State

The main portfolio and the apps subsite are both implemented. New work should extend the existing structure (add a page, add a content collection entry, add a component) rather than reorganize layouts or introduce new routing patterns. See `CLAUDE.md` for the current implementation map and `DEPLOYMENT.md` for the deploy + CI/CD model.
