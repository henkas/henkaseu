# AGENTS.md

This file provides working instructions for coding agents in this repository.

## Project

- Personal portfolio site for Henki Papp at `henkas.eu`
- Stack: Astro, Tailwind CSS, Astro Content Collections
- Deployment target: Cloudflare Pages
- Primary product/design spec: `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`

## Source Of Truth

Use these in order:

1. `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`
2. `CLAUDE.md`
3. `.superpowers/brainstorm/35888-1774223398/*`

The design spec is authoritative for structure, content model, and visual rules. `CLAUDE.md` is the concise implementation guide. The `.superpowers/brainstorm` files are exploratory design artifacts; use them for visual intent and background, not as binding requirements when they conflict with the spec.

## Commands

```bash
npm run dev
npm run build
npm run preview
npx astro check
```

Build output is `dist/`. Cloudflare Pages should use `astro build`.

## Architecture

The site has two routes only:

- `/` -> `src/pages/index.astro`
- `/projects/[slug]` -> `src/pages/projects/[slug].astro`

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

Content rules:

- Exactly one project should have `featured: true`
- `order: 1` is the most recent work entry
- Add new projects and jobs through content collection entries, not hardcoded page data

## Design System

Follow the design spec closely. This site should feel bold, personal, and polished, not like a generic developer portfolio.

Hard rules:

- Define shared colors as CSS custom properties in `src/styles/global.css`
- Do not introduce raw hex colors inside components when a token should exist instead
- Neutrals must keep the established purple undertone; do not swap in plain gray neutrals
- Keep typography aligned with the spec: Inter, strong headings, tight letter-spacing, small uppercase metadata, monospace tech pills
- Preserve the minimal-JS static-first approach

Key tokens called out in the current spec:

- `--bg-page: #0a0a0f`
- `--bg-card: #111116`
- `--bg-surface: #16161f`
- `--accent: #7b68ee`
- `--accent-light: #a78bfa`
- `--text-secondary: #8888aa`
- `--text-muted: #7777aa`

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

This workspace currently contains planning and design documents but little or no implementation code. If you scaffold or add source files, follow the structure defined in the design spec and `CLAUDE.md` rather than inventing a new layout.
