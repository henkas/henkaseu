# henkas.eu — Bento Layout Redesign

**Date:** 2026-03-27
**Owner:** Henki Papp
**Scope:** Layout, color/contrast, typography overhaul of the main portfolio page

---

## 1. Problem

The current site constrains all content to a `max-width: 900px` centered column. On screens wider than ~1100px, two-thirds of the viewport is empty space. Text sizes (9px labels, 14px body) feel small on modern high-res displays, and several text color tokens fail WCAG AA contrast requirements. The numbered-section vertical scroll layout reads like a digital resume rather than a personal showcase.

## 2. Goals

- Use screen real estate purposefully on wide displays (up to 1400px)
- Shift the visual identity from "structured CV" to "personal showcase / builder's portfolio"
- Make Projects the dominant visual element (~60% of grid area)
- Meet WCAG AA contrast minimums for all text tokens
- Improve readability with a modest typography scale bump
- Maintain full responsiveness down to mobile

---

## 3. Layout: Full-Width Bento Dashboard

### Max-width & grid

- **Max-width:** 1400px (up from 900px)
- **Grid:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px`
- **Grid auto-rows:** `minmax(120px, auto)`
- **Horizontal padding:** 24px

### Hero (above the grid)

Full-width section, two-column: `grid-template-columns: 1.2fr 1fr; gap: 40px`.

- **Left:** Eyebrow label, name (64px, weight 800, letter-spacing -3px), tagline (18px), action buttons (View my work + GitHub/LinkedIn icons)
- **Right:** Two status cards side-by-side — "Currently" (role + company) and "Latest project" (title + tags)
- Hero is NOT inside the bento grid — it sits above it with its own max-width container
- **Spacing:** `max-width: 1400px; margin: 48px auto 0; padding: 0 24px; min-height: 280px`

### Bento tile map

```
Col:  1         2         3         4
    ┌─────────────────┬─────────────────┐
 R1 │   About (2c)    │  Stack (2c)     │
    ├────────┬────────┼────────┬────────┤
 R2 │ Feat.  │   P1   │   P2   │   P3   │
    │ (2c,   │        │        │        │
 R3 │  2r)   │   P4   │ (empty cells    │
    │        │        │  auto-fill)     │
    ├────────┴────────┼────────┼────────┤
 R4 │   Work (2c)     │  Ach   │ Photo  │
    │                 │  (1c)  │  (1c)  │
    ├─────────────────┴────────┴────────┤
 R5 │          Contact (4c)             │
    └───────────────────────────────────┘
```

**HTML source order** (CSS auto-placement produces the layout above):

1. About (2c)
2. Stack & Tools (2c)
3. Featured project (2c, 2r)
4. Small project card × 4 (1c each) — auto-fill into cols 3-4 of rows 2-3
5. Work (2c)
6. Achievements (1c)
7. Photography (1c)
8. Contact (4c)

| Tile | Grid span | Content |
|---|---|---|
| About | `col: span 2` | "Hi, I'm Henki." + bio paragraphs |
| Stack & Tools | `col: span 2` | Grouped tech tags (Languages, Infrastructure, Cloud & Tooling) — auto-generated from content collections. Rendered by `About.astro` as a second bento tile (see section 9) |
| Featured project | `col: span 2, row: span 2` | Category, title, "Featured" badge, full description, tech tags, Live/GitHub links, "Read more →" |
| Small project cards (×4) | `col: span 1` each | Category → Title → One-liner description → Award badge (if any) → Tech tags. Clickable — opens `<dialog>` modal via existing pushState JS (same behavior as current site) |
| Work | `col: span 2` | Two compact side-by-side cards within the tile: `display: flex; gap: 12px`. Current role gets full contrast; past role uses softer colors. Each card shows role, company, period only — padding `14px 16px` |
| Achievements | `col: span 1` | Renamed from "Certifications". Badge image + name + issuer. If `badge_image` is absent, show a placeholder box (same as current `cert-badge-placeholder`) |
| Photography | `col: span 1` | 2 thumbnail placeholders (reduced from 3) + one-line caption + link to photo.henkas.eu |
| Contact | `col: span 4` | Full-width bar: "Let's talk." heading left, email/GitHub/LinkedIn links right |

**Note:** With 4 small project cards in a 4-col grid, the featured card (2c, 2r) occupies cols 1-2 of rows 2-3, and the 4 small cards fill cols 3-4 of rows 2-3 (2 per row). If the project count changes, CSS auto-placement handles overflow gracefully.

### Removed elements

- **Section numbers** (01, 02, 03...) — removed to drop the resume feel
- **Category filter pills** — unnecessary with only 5-6 projects visible in the bento
- **Work entries 3-6** — trimmed to just 2 most recent roles (full history lives on LinkedIn)

---

## 4. Responsive Breakpoints

### ≤1100px → 2 columns

```css
.bento { grid-template-columns: repeat(2, 1fr); }
```

- Featured project: `col: span 2, row: span 1` (no longer tall)
- Contact: `col: span 2`, stacks vertically
- All other tiles: `col: span 1`

### ≤700px → 1 column

```css
.bento { grid-template-columns: 1fr; }
```

- Hero unstacks to single column, name shrinks to 48px
- All tiles: `col: span 1`
- Work items stack vertically
- Status cards in hero stack vertically

---

## 5. Color & Contrast

All background and border tokens are **unchanged**. Only text and accent-light tokens are adjusted to meet WCAG AA.

| Token | Old | New | Contrast vs `#111116` | WCAG |
|---|---|---|---|---|
| `--text-secondary` | `#8888aa` | `#9da3be` | 6.5:1 | AAA |
| `--text-muted` | `#7777aa` | `#8b91ab` | 5.0:1 | AA |
| `--text-dim` | `#666680` | `#7a7f99` | 4.0:1 | AA-large |
| `--text-faint` | `#555570` | `#6b7089` | 3.2:1 | AA-large |
| `--accent-light` | `#a78bfa` | `#b4a0ff` | 6.4:1 | AAA |

`text-dim` is used for past work card descriptions and stack group labels (≥10px bold). `text-faint` is used only for decorative/non-essential elements (section number remnants being removed, past role periods). After the redesign:

- `text-dim` (#7a7f99, 4.0:1) — used at ≥14px bold weight where AA-large (3:1) applies. Must NOT be used for normal-weight text below 18px.
- `text-faint` (#6b7089, 3.2:1) — used only for decorative or redundant text where WCAG exempts (e.g., period text that duplicates information available elsewhere). Must NOT be used for essential content.

All proposed colors maintain the purple undertone — they are not plain grays.

---

## 6. Typography

| Element | Old | New |
|---|---|---|
| Hero name | 54px | 64px |
| Section/card headings | 22px | 24px |
| Card titles (small) | 15px | 17px |
| Body text | 14px | 15px |
| Project one-liners | (new) | 13px |
| Labels/metadata | 9px | 10px |
| Tech tags | 9px | 10px |
| Tag padding | 3px 8px | 4px 10px |

Font families unchanged: Inter for text, JetBrains Mono for tags.

---

## 7. Project Card Structure

All project cards (featured and small) follow a consistent top-down order:

1. **Category** — uppercase label, always at the very top
2. **Title** — always second
3. **One-liner description** — 3-6 word summary (new, small cards only)
4. **Badge** (if any) — Featured badge, SSC Winner, etc.
5. **Tech tags** — pushed to bottom via `margin-top: auto`

This ensures uniform visual alignment across all cards regardless of badge presence.

---

## 8. Content Changes

### Work section

Trimmed from 6 entries to 2. Only render entries where `order <= 2` in the Work component. Full career history is on LinkedIn.

Display as two side-by-side compact cards within a single bento tile. Current role gets full contrast; past role uses softer explicit colors (same pattern as existing `isDimmed` logic).

### "Certifications" → "Achievements"

Section display label renamed. Nav link text updated ("Certs" → "Achievements"). The content collection directory remains `src/content/certifications/` and the collection name stays `certifications` in code — only the user-facing label changes.

### Photography

Thumbnail count reduced from 3 to 2 to fit the single-column bento tile. Link to `photo.henkas.eu` remains.

### Nav links (post-change)

Full nav link set: **About, Projects, Work, Achievements, Photos** + Contact (pill CTA).

### Project one-liners

Each project's existing `description` field already contains a summary. For small cards, show only the first ~6 words or a separate short tagline. This can be derived by truncating `description` or by adding an optional `tagline` field to the project schema.

**Recommended:** Add optional `tagline: z.string().optional()` to the project schema. If present, show it on small cards. If absent, truncate `description` to first sentence.

---

## 9. Files to Modify

| File | Changes |
|---|---|
| `src/styles/global.css` | Update color tokens, typography scale, remove section-num class, add bento grid styles, update detail styles |
| `src/pages/index.astro` | Replace vertical section stack with bento grid container |
| `src/components/Nav.astro` | "Certs" → "Achievements" in nav link text |
| `src/components/Hero.astro` | Widen max-width to 1400px, bump name to 64px |
| `src/components/About.astro` | Remove section-num. Split into two bento tiles rendered by the same component: (1) About bio tile (2c) and (2) Stack & Tools tile (2c). Both are output from `About.astro` as sibling elements (no wrapper div) using Astro's `Fragment` |
| `src/components/Projects.astro` | Remove category filter, remove section-card wrapper, output bento tiles directly (featured + small cards) |
| `src/components/ProjectCard.astro` | Reorder: category → title → one-liner → badge → tags. Add `tagline` prop support |
| `src/components/Work.astro` | Filter to `order <= 2`, render as compact side-by-side cards in a single bento tile |
| `src/components/WorkCard.astro` | Simplify to compact card variant (no description column, just role/company/period) |
| `src/components/Certifications.astro` | Rename section label to "Achievements", adapt to single-column bento tile |
| `src/components/Photography.astro` | Reduce to 2 thumbnails + link callout, adapt to single-column bento tile |
| `src/components/Contact.astro` | Convert to full-width bar (4-col span), horizontal layout |
| `src/content/config.ts` | Add optional `tagline` field to project schema |
| `src/content/projects/*.md` | Add `tagline` to each project's frontmatter |

---

## 10. Files NOT Modified

- `src/pages/projects/[slug].astro` — detail pages keep their existing layout
- `src/components/ProjectDetail.astro` — modal/detail content unchanged. The new `tagline` field is NOT displayed on detail pages (only used on small bento cards)
- `src/content/work/*.md` — frontmatter unchanged, filtering happens in component
- `src/content/certifications/*.md` — unchanged
- `src/layouts/Base.astro` — unchanged
- `astro.config.mjs`, `tailwind.config.mjs`, `package.json` — unchanged

---

## 11. Verification

1. `npm run build` — must produce 7 pages with zero errors
2. `npm run dev` — visual check at 1440px, 1100px, 700px, and 375px widths
3. `npx astro check` — TypeScript/Astro type checking passes
4. Verify all text tokens meet WCAG AA using browser DevTools contrast checker
5. Confirm project modals still open/close correctly (pushState behavior unchanged)
6. Confirm project detail pages at `/projects/[slug]` render correctly
