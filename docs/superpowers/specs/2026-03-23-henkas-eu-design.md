# henkas.eu — Personal Portfolio Design Spec

**Date:** 2026-03-23
**Owner:** Henki Papp
**Domain:** henkas.eu
**Photography subdomain:** photo.henkas.eu

---

## 1. Overview

A personal hub/portfolio website for Henki Papp. Serves multiple audiences simultaneously: potential employers, tech peers and open source community, startup/founder contacts, and general personal branding (LinkedIn, GitHub, email signature, business card).

**Tone:** Bold and creative with personality, warm and approachable, with a layer of professional polish. Not a generic dev portfolio — distinctly personal.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro |
| Styling | Tailwind CSS |
| Content | Astro Content Collections (markdown/MDX) |
| Deployment | Cloudflare Pages (static output) |
| Runtime JS | Minimal — only for project category filter |

Astro is chosen for its static-first output, near-zero runtime JS, excellent Content Collections API, and low complexity for a content-focused site.

---

## 3. Visual Design System

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `bg-page` | `#0a0a0f` | Page background |
| `bg-card` | `#111116` | Section/card background |
| `bg-surface` | `#16161f` | Elevated surface (cards within cards) |
| `bg-hover` | `#222235` | Hover/active state |
| `border` | `#1e1e2e` | Default border |
| `border-subtle` | `#1a1a28` | Past/de-emphasised borders |
| `accent` | `#7b68ee` | Primary accent (violet) |
| `accent-light` | `#a78bfa` | Light accent, labels, active tags |
| `accent-gradient` | `#7b68ee → #a78bfa` | CTA buttons, featured badges |
| `text-primary` | `#ffffff` | Headings, primary content |
| `text-secondary` | `#8888aa` | Body text, descriptions |
| `text-muted` | `#7777aa` | Section labels, periods, metadata |
| `text-dim` | `#666680` | Past/de-emphasised body text |
| `text-faint` | `#555570` | Past/de-emphasised periods |

All neutrals carry a subtle purple undertone — they are never plain gray. This creates tonal cohesion across the entire page.

### Typography

- **Font:** Inter (system-ui fallback)
- **Hero name:** 54px, weight 800, letter-spacing -3px, line-height 0.92
- **Section headings:** 20–22px, weight 700, letter-spacing -0.5px
- **Card titles:** 14–17px, weight 600–700
- **Body text:** 12–14px, weight 400, line-height 1.7–1.8
- **Labels/metadata:** 9–10px, weight 500, uppercase, letter-spacing 2px
- **Tech tags:** 9px, monospace font, pill shape (border-radius 20px)

### Component Patterns

**Nav:** Sticky, frosted glass (`backdrop-filter: blur(12px)`, semi-transparent `#111116cc`), 10px border-radius.

**Section cards:** `#111116` background, `1px solid #1e1e2e` border, `10px` border-radius, `28px 32px` padding.

**Surface cards (within sections):** `#16161f` background, `1px solid #222235` border, `8px` border-radius.

**Tech tags:** `background #1e1e2e`, `color #a78bfa` (active) or `#8888aa` (muted), monospace, pill shape.

**CTA button:** `linear-gradient(135deg, #7b68ee, #a78bfa)`, white text, weight 600.

**Past work items:** No opacity hack. Use explicit softer colors (`#aaaacc` title, `#7b68ee` company, `#666680` description) so borders and backgrounds remain sharp.

---

## 4. Page Structure & Routing

**Routing model:** Hybrid — single-page scroll for the main experience, individual detail pages per project.

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Full single-page with all sections |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Individual project detail page |

Navigation uses anchor links (`#about`, `#work`, `#projects`, `#photography`, `#contact`).

---

## 5. Sections

### 5.1 Nav
Sticky top bar. Left: `henkas.eu` wordmark. Right: anchor links (About, Work, Projects, Photos) + Contact as accented pill button.

### 5.2 Hero
Two-column split layout:
- **Left (name/intro):** eyebrow label, large name (`Henki Papp`), 1–2 line tagline, three action buttons (View my work, GitHub, LinkedIn).
- **Right (status cards):** Two surface cards — "Currently" (current role + company) and "Latest project" (project name + tech tags).

### 5.3 About
Two-column layout:
- **Left (2fr):** "Hi, I'm Henki." heading + 3–5 sentence personal bio. Tone: honest, personal, a bit of dry humour.
- **Right (1fr):** "Stack & tools" label + tech tag pills. Skills woven in here rather than a dedicated section.

### 5.4 Work
List of work experience cards. Each card structure:
- **Header row:** Job title (left) + date range (right, `#7777aa`)
- **Company:** `#a78bfa` accent colour
- **Body row:** Two-column split — description (72.5%) | gap (5%) | tech tag pills (22.5%, right-aligned)

Current role: full contrast. Past roles: softer explicit colors (not opacity), border `#1a1a28`.

Content driven by `src/content/work/` markdown files.

### 5.5 Projects
**Header:** Section label left + category filter pills right (All / Sysadmin / Coding / Hobby). Filter is client-side JS, toggling card visibility by `data-category` attribute.

**Bento grid (top):** `grid-template-columns: 2fr 1fr 1fr`
- Featured card spans 2 rows (col 1). Shows: featured badge, category label, title, description, tech tags, "Read more →" link.
- 4 small cards fill the 2×2 right area. Show: category, title, tech tags.

**Regular grid (bottom):** `grid-template-columns: 1fr 1fr 1fr` — remaining small cards.

Featured project is marked via `featured: true` in frontmatter. Small cards link to `/projects/[slug]`. Featured card also links to its detail page.

### 5.6 Photography
Short section — not a full gallery.
- 3 thumbnail preview images in a 3-column grid (sourced from actual photos later)
- One-line description ("Landscapes, urban, and whatever catches my eye.")
- Link button to `photo.henkas.eu`

A dedicated photography site (`photo.henkas.eu`) will be built separately and linked from here.

### 5.7 Contact
Two-column layout:
- **Left:** "Let's talk." heading + 1–2 sentence invite.
- **Right:** Stacked link rows — Email (accent colour), GitHub (muted), LinkedIn (muted).

---

## 6. Content Collections

### `src/content/projects/` — Project schema

```yaml
title: string               # Project name
description: string         # 1–3 sentence summary
tags: string[]              # Tech stack / tools used
status: active | completed | archived
category: sysadmin | coding | hobby
featured: boolean           # If true, renders as large bento card
date: YYYY-MM               # Month of start or completion
links:
  github: string (optional) # GitHub repo URL
  live: string (optional)   # Live demo / site URL
```

### `src/content/work/` — Work experience schema

```yaml
company: string             # Company name
role: string                # Job title
period: string              # e.g. "2022 — present"
description: string         # 1–2 sentence summary
tags: string[]              # Tech stack / tools used
order: number               # Sort order (1 = most recent)
```

---

## 7. Project Detail Pages (`/projects/[slug]`)

Each project gets its own page generated from its markdown file. Layout:
- Back link (`← Projects`)
- Project title + status badge
- Category + date
- Full markdown body (writeup, setup notes, screenshots, etc.)
- Tech tag pills
- Links (GitHub, live demo if available)
- Simple nav header (same as main site)

Detail pages use `getStaticPaths()` with `getCollection('projects')` — fully static at build time.

---

## 8. File Structure

```
src/
  pages/
    index.astro
    projects/
      [slug].astro
  content/
    projects/         ← one .md per project
    work/             ← one .md per job
  components/
    Nav.astro
    Hero.astro
    About.astro
    Work.astro
    WorkCard.astro
    Projects.astro
    ProjectCard.astro
    Photography.astro
    Contact.astro
  layouts/
    Base.astro        ← <head>, meta, font loading
  styles/
    global.css        ← Tailwind base + CSS custom properties
public/
  fonts/              ← Inter if self-hosted
  og-image.png        ← Open Graph image for social sharing
```

---

## 9. Deployment

- **Platform:** Cloudflare Pages (free tier)
- **Build command:** `astro build`
- **Output:** `dist/` (static)
- **Domain:** `henkas.eu` pointed to Cloudflare Pages via DNS
- **Photography subdomain:** `photo.henkas.eu` — separate project, linked from main site

---

## 10. Out of Scope

- Blog / writing section (excluded by design)
- CMS integration (content managed as markdown files in repo)
- Server-side rendering (fully static)
- `photo.henkas.eu` photography site (separate future project)
