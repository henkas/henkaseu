# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Henki Papp at `henkas.eu`. Full design spec: `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`.

## Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build to dist/ (static output)
npm run preview    # Preview built output locally
npx astro check    # TypeScript + Astro type checking
```

Deployment is to Cloudflare Pages. Build command is `astro build`, output dir is `dist/`.

## Stack

- **Astro** — static site generator, zero runtime JS by default
- **Tailwind CSS** — utility-first styling
- **Astro Content Collections** — type-safe markdown content for projects and work entries
- The only runtime JS on the page is the project category filter (vanilla, no framework)

## Architecture

### Routing

Two routes only:
- `/` — `src/pages/index.astro` — full single-page scroll, all sections
- `/projects/[slug]` — `src/pages/projects/[slug].astro` — static detail pages via `getStaticPaths()` + `getCollection('projects')`

### Content Collections

Adding a project = creating `src/content/projects/<slug>.md`. Adding a job = creating `src/content/work/<slug>.md`.

**Project frontmatter:**
```yaml
title, description, tags[], status (active|completed|archived),
category (sysadmin|coding|hobby), featured (bool), date (YYYY-MM),
links: { github?, live? }
```

**Work frontmatter:**
```yaml
company, role, period, description, tags[], order (int, 1 = most recent)
```

Set `featured: true` on exactly one project — it renders as the large bento card spanning 2 grid rows.

### Component Boundaries

Each page section is its own `src/components/` Astro component, composed in `index.astro`. `WorkCard.astro` and `ProjectCard.astro` are the leaf components passed collection entries as props. `src/layouts/Base.astro` owns `<head>`, font loading, and global meta.

### Design Tokens

All colors are defined as CSS custom properties in `src/styles/global.css`. Never use raw hex values in components — reference tokens. The full token table is in the design spec. Key ones:

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#0a0a0f` | Body background |
| `--bg-card` | `#111116` | Section cards |
| `--bg-surface` | `#16161f` | Cards within cards |
| `--accent` | `#7b68ee` | Primary violet |
| `--accent-light` | `#a78bfa` | Labels, active tags |
| `--text-secondary` | `#8888aa` | Body text |
| `--text-muted` | `#7777aa` | Section labels, dates |

Neutrals carry a purple undertone — never substitute plain grays.

### Work Card Layout

Work cards use a three-row structure: header (title + period), then a two-column body (`grid-template-columns: 72.5% 22.5%`, `gap: 5%`) with description left and tech tag pills right. Past roles use explicit softer colors — never `opacity` on the whole card.

### Project Grid

Projects section renders a bento top grid (`2fr 1fr 1fr`, featured card `grid-row: span 2`) followed by a regular `1fr 1fr 1fr` bottom grid. Category filtering uses `data-category` attributes toggled by a small inline script — no framework needed.
