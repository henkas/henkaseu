# henkas.eu — Grid Layout Fix & Color Palette Revision

**Date:** 2026-03-29
**Owner:** Henki Papp
**Scope:** Fix bento grid tile placement issues and revise color palette for better contrast/readability

---

## 1. Problem

After the initial bento layout redesign, two issues remain:

1. **Grid placement:** CSS Grid auto-placement produces uneven rows. The Achievements tile (4 items tall) stretches its entire row, leaving huge gaps under shorter tiles (Homelab, Work). Photography is orphaned alone in a row. Using `align-self: start` prevents stretching but creates floating cards with empty space around them.

2. **Color palette:** Despite two rounds of adjustments, the backgrounds are still too dark and too similar. Page (`#0e0e18`) and card (`#171722`) are barely distinguishable. The overall feel is "uniform dark" with insufficient visual layering.

## 2. Goals

- Tiles fill their rows completely — no floating cards, no gaps
- Clear visual separation between page background and card background
- Purple undertone preserved but pushed brighter
- All text tokens pass WCAG AA at their use case
- Grid works cleanly at 4-col, 2-col, and 1-col breakpoints

---

## 3. Color Palette: "Bold & Bright"

All background, border, and text tokens updated. Accent tokens unchanged.

| Token | Current | New | Notes |
|---|---|---|---|
| `--bg-page` | `#0e0e18` | `#181828` | Visibly dark purple, not near-black |
| `--bg-card` | `#171722` | `#242440` | Clear separation from page |
| `--bg-surface` | `#1e1e2e` | `#1e1e30` | Cards within cards |
| `--bg-hover` | `#2a2a40` | `#32325a` | Hover states, tag backgrounds |
| `--border` | `#2a2a3e` | `#3a3a65` | Visible purple-tinted borders |
| `--border-subtle` | `#222236` | `#32325a` | Past/de-emphasised borders |
| `--text-secondary` | `#9da3be` | `#c8cde0` | Body text — high readability |
| `--text-muted` | `#8b91ab` | `#a0a0c8` | Labels, metadata |
| `--text-dim` | `#7a7f99` | `#9595b8` | Past roles, group labels |
| `--text-faint` | `#6b7089` | `#7878a0` | Decorative only |

### Nav background

Update the frosted glass background in `Nav.astro` from `#111116cc` to `#242440cc` to match the new card color.

### Unchanged tokens

- `--accent: #7b68ee`
- `--accent-light: #b4a0ff`
- `--color-active: #4ade80`
- `--text-primary: #ffffff`

---

## 4. Grid Layout: Revised Tile Map

### Remove `align-self: start`

Remove `align-self: start` from `.bento-card` in global.css. Tiles should stretch to fill their grid row by default (the CSS Grid default of `align-self: stretch`). This eliminates floating cards.

### Row 1 — Introduction

About expands to 3 columns. The right column (1 col) contains the status cards and Stack & Tools, rendered as a flex column wrapper.

**Hero changes:** The Hero component is simplified to just the name, eyebrow, tagline, and action buttons — no status cards. The "Currently" and "Latest project" status cards move out of Hero and into the right-column sidebar alongside Stack & Tools.

**Component structure:**

```
Row 1, Col 1-3: About tile (3c)
  - "About" label
  - "Hi, I'm Henki." heading
  - Bio paragraphs

Row 1, Col 4: Sidebar wrapper (1c, flex column)
  - "Currently" status card (role + company)
  - "Latest project" status card (title + tags)
  - "Stack & Tools" card with grouped tags
```

The sidebar is NOT a bento-card itself — it's a plain `<div>` wrapper with `display: flex; flex-direction: column; gap: 12px`. The three items inside it are styled as surface cards (`.surface-card` or equivalent: `--bg-card` background, border, border-radius). This wrapper naturally fills the row height alongside About. It is rendered inline by `About.astro` as a second sibling element (same pattern as the current About + Stack split).

**About.astro changes:** Currently outputs two sibling tiles (About 2c + Stack 2c). Change to:
- About tile: `grid-column: span 3` (was span 2)
- New sidebar wrapper: single grid cell (1c), containing three stacked cards

The status cards (Currently, Latest project) need data from content collections (work + projects). This data is already fetched in the About frontmatter. The sidebar can be rendered by About.astro as a second sibling element.

### Row 2-3 — Projects

No changes. Featured (2c, 2r) + small cards (1c each). With 5 non-featured projects, auto-placement fills: 2 cards in cols 3-4 of row 2, 2 cards in cols 3-4 of row 3, 1 card overflows to row 4 col 1 — but this is actually the SchedyX card. Since Homelab is now treated as a regular project card (it already is), the 5 small cards will auto-fill alongside the featured card.

With `align-self: stretch` restored, small cards in the same row as the featured card will stretch to fill the row height, which looks correct.

### Row 4 — Work, Achievements, Photography

| Tile | Span | Layout |
|---|---|---|
| Work | 1 col | Stacked vertically (was 2 cols side-by-side). Two work-item cards in a flex column |
| Achievements | 2 cols | 2×2 internal grid for badge items: `grid-template-columns: 1fr 1fr; gap: 8px` |
| Photography | 1 col | Same as current — 2 thumbnails + caption + link |

All four tiles share the same row and stretch to match the tallest (Achievements with its 2×2 grid). Work and Photography have enough content to fill without looking empty.

### Row 5 — Contact

No changes. Full-width bar (4c).

### Responsive

**≤1100px (2 columns):**
- About: `span 2` (full width)
- Sidebar: `span 2`, flex-direction stays column, stacks as its own row below About
- Featured: `span 2, row: span 1`
- Small project cards: `span 1` (2 per row)
- Work: `span 1`
- Achievements: `span 1` (internal grid becomes `grid-template-columns: 1fr`)
- Photography: `span 1` (beside Work in same row)
- Contact: `span 2`

**≤700px (1 column):**
- Everything spans 1 column, stacks vertically

---

## 5. Files to Modify

| File | Changes |
|---|---|
| `src/styles/global.css` | Update all color tokens (section 3). Remove `align-self: start` from `.bento-card`. Update `.tag` background to use new `--bg-hover` |
| `src/components/Nav.astro` | Change frosted glass background from `#111116cc` to `#242440cc` |
| `src/components/Hero.astro` | Remove status cards (Currently + Latest project). Keep only eyebrow, name, tagline, action buttons |
| `src/components/About.astro` | Change About tile to `span 3`. Add sidebar wrapper (1c) with status cards + Stack & Tools. Fetch featured project data for "Latest project" card |
| `src/components/Work.astro` | Change from `bento-span-2` to no span (defaults to 1c). Stack work items vertically instead of side-by-side |
| `src/components/Certifications.astro` | Add `bento-span-2`. Change internal layout to `grid-template-columns: 1fr 1fr; gap: 8px` for badge items |
| `src/components/ProjectCard.astro` | No structural changes. Update any hardcoded colors if present (e.g. award badge border) |

## 6. Files NOT Modified

- `src/pages/index.astro` — bento wrapper stays the same
- `src/pages/projects/[slug].astro` — detail pages unchanged
- `src/components/ProjectDetail.astro` — unchanged
- `src/components/Projects.astro` — unchanged (auto-placement handles 5 small cards)
- `src/components/Photography.astro` — already 1c, no changes needed
- `src/components/Contact.astro` — already 4c bar, unchanged
- `src/content/` — no content changes
- `src/layouts/Base.astro` — unchanged

---

## 7. Verification

1. `npm run build` — 7 pages, zero errors
2. `npm run dev` — visual check at 1440px, 1100px, 700px, 375px
3. Verify: no floating cards with empty space around them
4. Verify: cards fill their rows (no gaps between tiles in the same row)
5. Verify: page background is clearly distinguishable from card background
6. Verify: body text is easily readable without straining
7. Verify: project modals still work
8. Verify: nav anchors scroll to correct sections
