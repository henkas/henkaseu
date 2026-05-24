# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio + apps subsite for Henki Papp, hosted on `henkas.eu` and `apps.henkas.eu`. Full design spec: `docs/superpowers/specs/2026-03-23-henkas-eu-design.md`. Deployment cutover and CI/CD setup: `DEPLOYMENT.md`.

## Commands

```bash
npm run dev              # Start Astro dev server (localhost:4321)
npm run dev:worker       # Start the Worker locally via wrangler (localhost:8787)
npm run build            # astro build -> dist/ (static output)
npm run check            # TypeScript + Astro type checking
npm run preview          # Preview the built static output
npm run deploy           # astro build + wrangler deploy (full deploy)
npm run deploy:dry-run   # Build + validate wrangler.jsonc without uploading
```

For local development of the main site, `npm run dev` is enough. To exercise the hostname-based routing (apps.henkas.eu vs henkas.eu), use:

```bash
npm run dev:worker                          # Simulates henkas.eu by default
npx wrangler dev --host apps.henkas.eu      # Simulates apps.henkas.eu
```

## Stack

- **Astro** static site generator — `output: 'static'`, builds to `dist/`
- **Tailwind CSS** for utility styles, custom CSS for component styling
- **Astro Content Collections** for projects, work, certifications, and apps
- **Cloudflare Workers + Static Assets** for hosting (account: `Sewer Rats`, account_id pinned in `wrangler.jsonc`)
- The only runtime JS on the page is the project category filter (vanilla, no framework)

## Architecture

### Two domains, one Worker

`henkas.eu` (portfolio) and `apps.henkas.eu` (apps subsite) are served by the **same Worker** with a single `dist/` output. `src/worker.ts` dispatches by `Host` header:

- `apps.henkas.eu/<path>` → internally fetches `/apps/<path>/` from `env.ASSETS`
- `apps.henkas.eu/<file.ext>` → served from root (shared CSS, favicon, etc.)
- `henkas.eu/.well-known/webfinger` → JSON for OIDC issuer discovery
- `henkas.eu/apps/*` → 404 (apps site is subdomain-only)
- `henkas.eu/<anything else>` → assets

`assets.run_worker_first` is `true` in `wrangler.jsonc` so the Worker inspects every request before the asset binding tries to match a file — that's required because the same path resolves to different files depending on the subdomain.

### Routing

- `/` — `src/pages/index.astro` — main portfolio single page
- `/projects/[slug]` — `src/pages/projects/[slug].astro` — project detail
- `/apps/` (served at `apps.henkas.eu/`) — `src/pages/apps/index.astro` — apps index (hero + single column list)
- `/apps/[appname]` (served at `apps.henkas.eu/[appname]`) — `src/pages/apps/[appname].astro` — per-app landing page
- `/apps/terms-of-service` and `/apps/privacy-policy` — apps subsite legal pages

Internal apps-subsite links go through the `appsUrl()` helper in `src/lib/urls.ts` so they resolve correctly in both `astro dev` (where pages live under `/apps/...`) and production (where the Worker strips the `/apps` prefix).

### Content Collections

Adding content = creating a markdown file. Schemas live in `src/content/config.ts`.

- `src/content/projects/<slug>.md` — portfolio projects
- `src/content/work/<slug>.md` — work entries
- `src/content/certifications/<slug>.md` — certifications
- `src/content/apps/<slug>.md` — apps subsite entries

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

**App frontmatter:**
```yaml
name, tagline, status (live|beta|coming-soon), order (int),
date (YYYY-MM), license?, icon?,
platforms: [iOS|iPadOS|Android|Web|macOS|Windows|Linux]
links:
  appStore: <url> | "coming-soon"
  googlePlay: <url> | "coming-soon"
  web: <url>
  github: <url>
```

Set `featured: true` on exactly one project — it renders as the large bento card spanning 2 grid rows.

### Component Boundaries

Each main-page section is its own `src/components/` Astro component, composed in `index.astro`. `WorkCard.astro`, `ProjectCard.astro`, and `AppCard.astro` are leaf components passed collection entries as props.

Layouts:
- `src/layouts/Base.astro` — main site `<head>`, fonts, meta
- `src/layouts/AppsBase.astro` — apps subsite `<head>` + nav + footer (T&C, Privacy, copyright)

### Design Tokens

All colors are defined as CSS custom properties in `src/styles/global.css`. Never use raw hex values in components — reference tokens. The full token table is in the design spec. Key ones:

| Token | Value | Use |
|---|---|---|
| `--bg-page` | `#181828` | Body background |
| `--bg-card` | `#242440` | Section cards |
| `--bg-surface` | `#1e1e30` | Cards within cards |
| `--accent` | `#7b68ee` | Primary violet |
| `--accent-light` | `#b4a0ff` | Labels, active tags |
| `--text-secondary` | `#c8cde0` | Body text |
| `--text-muted` | `#a0a0c8` | Section labels, dates |

Neutrals carry a purple undertone — never substitute plain grays.

### Work Card Layout

Work cards use a three-row structure: header (title + period), then a two-column body (`grid-template-columns: 72.5% 22.5%`, `gap: 5%`) with description left and tech tag pills right. Past roles use explicit softer colors — never `opacity` on the whole card.

### Project Grid

Projects section renders a bento top grid (`2fr 1fr 1fr`, featured card `grid-row: span 2`) followed by a regular `1fr 1fr 1fr` bottom grid. Category filtering uses `data-category` attributes toggled by a small inline script — no framework needed.

### Apps Site Layout

The apps index is a hero (gradient title + subhead) followed by a single column of `AppCard` rows. Each card has a square icon slot on the left, name + status badge + tagline + platform tags in the middle, and a hover chevron on the right. Detail pages mirror the project detail structure: header (icon + name + tagline + platforms + status + license), download/source button row, then markdown body. "Coming Soon" app-store links render as visually disabled buttons.

## Contact form

The contact form on the main site is intentionally `disabled` on every field while a new submission backend is being decided. The previous Cloudflare Pages Function (`functions/api/contact.ts`) and Resend integration were removed. To re-enable, remove `disabled` from the inputs in `src/components/Contact.astro` and either add a new Worker route or post to an external form service.
