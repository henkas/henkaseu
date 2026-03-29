# henkas.eu — Founder-First Layout Redesign

**Date:** 2026-03-29
**Owner:** Henki Papp
**Scope:** Restructure bento grid layout to emphasize builder/founder identity, fix section sizing and balance, add visual assets.

## Context

The current layout treats henkas.eu as a traditional developer portfolio (work experience prominent, projects secondary). The site should instead position Henki as a builder/aspiring founder — projects are the hero, work experience is supporting credibility. Target audience includes program decision makers and investors (e.g., for nstop), not primarily recruiters.

## Changes Overview

### 1. Hero Section (Modified)

**Eyebrow:** Change from `Systems Engineer · Europe / Remote` to `Systems Engineer · Builder · Netherlands`

**Tagline:** Replace the current two lines:
```
I build things that run everything else.
From homelab to enterprise.
```
With:
```
I build things that run everything else.
And sometimes, things that run on their own.
```
The second line renders in `var(--accent-light)` to visually distinguish it as the "founder hint."

### 2. About Row (Modified — 2:1 ratio)

**Current:** `grid-template-columns: 3fr 1fr` (About spans 3 bento columns, sidebar spans 1)

**New:** The About section and sidebar use a **2:1 ratio** (`grid-template-columns: 2fr 1fr`). This narrows the bio for better reading width and gives the sidebar more room for Stack tags.

Since the About + sidebar are no longer direct bento grid children at fixed column spans, they should be wrapped in a container that spans the full 4 columns and uses its own inner 2:1 grid. Alternatively, adjust the bento-span classes — implementation can choose the cleanest approach.

**Sidebar "Stack & Tools" — split:**
- **Keep in sidebar:** Languages, Frontend, Infrastructure (the builder-relevant groups)
- **Move to bottom row:** Tooling, Cloud, Compliance & ITSM (in a new "More tools" card)

This resolves the height mismatch where the sidebar was much taller than the About bio.

### 3. Project Cards (Modified)

**App icons:** Add app icon images to nstop and Rattie project cards.
- nstop: `<img src="/nstop.png">` — 36×36px, border-radius 8px, displayed above the title
- Rattie: `<img src="/rattie.png">` — same styling

These are rendered in the `ProjectCard.astro` component. Add an optional `icon` field to project frontmatter:
```yaml
icon: /nstop.png
```
The component renders the icon above the card title when present.

**SSC 2026 Winner badge icon:** Replace the orange Swift bird SVG (`award-swift-icon` class) with a white Apple logo SVG. The current icon is misleading — the Swift Student Challenge is an Apple program.

Apple logo SVG (fill white):
```svg
<svg width="12" height="14" viewBox="0 0 24 24" fill="white">
  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.48C5.55 7.98 7.07 7.03 8.74 7.01C10.04 6.99 11.26 7.87 12.05 7.87C12.83 7.87 14.29 6.8 15.87 7C16.54 7.03 18.29 7.27 19.4 8.89C19.3 8.95 17.09 10.24 17.12 12.97C17.15 16.25 19.95 17.35 19.99 17.36C19.96 17.45 19.49 19.05 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
</svg>
```

### 4. Work Section (Redesigned)

**Current:** 1-column bento card showing only 2 of 6 roles (filtered to `order <= 2`), each as a padded card with role/company/period.

**New:** 2-column-equivalent bento card (in the credentials row) showing **all 6 roles** in a condensed timeline format.

**Timeline item layout:**
```
┌─────────────────────────────────────────────┐
│ Senior System Administrator    Jan 2026 — … │
│ i3D.net                                     │
└─────────────────────────────────────────────┘
```
Each item is a `surface-card` with:
- Left: role (font-weight 600, --text-primary) + company (--accent-light)
- Right: period (--text-muted, right-aligned)
- Current role gets `border-color: var(--accent)` subtle highlight
- Past roles use softer text colors (`#aaaacc` for role, `var(--accent)` for company)

**Click-to-modal:** Each timeline item is clickable and opens a `<dialog>` modal (same pattern as project modals). The modal shows the full `description` from frontmatter, plus the `tags` array as tech pills. The dialog markup and JS follow the same approach as `Projects.astro` (dialog per entry, `showModal()` on click, close on backdrop/button/back), but live inside `Work.astro` as their own set of dialogs.

**Work content entries:** Remove the `filter((e) => e.data.order <= 2)` — show all entries sorted by order.

### 5. Credentials Row (New Layout)

Work and Achievements sit side by side in a **3:5 ratio** (`grid-template-columns: 3fr 5fr`).

This is implemented as a wrapper div spanning all 4 bento columns, with its own inner grid — same approach as the About row.

**Achievements (Modified):**
- Stays as a 2×2 grid of cert items
- Badge images increase from 36×36 to **44×44px** with border-radius 8px
- Cert item padding increases to `14px 16px` for more breathing room
- Item gap increases to `10px`

### 6. Bottom Row (Restructured)

**Remove:** Homelab card (entirely removed from the page)

**New layout** (4 equal columns):

| Photography (span 2) | More tools (span 1) | Contact (span 1) |
|---|---|---|

**Photography (Modified — 2 columns):**
- Replace placeholder divs with real images in a 2×2 grid
- Images: `/photo-puppy.jpg`, `/photo-plane.jpg`, `/photo-puppy2.jpg`, `/photo-plane2.jpg`
- Each image slot: `aspect-ratio: 4/3`, `border-radius: 8px`, `object-fit: cover`
- Update caption: "Puppies, planes, and whatever catches my eye."
- Keep link to `photo.henkas.eu`

**More tools (New — 1 column):**
- New bento card containing the Stack tag groups that were moved out of the sidebar
- Groups: Tooling, Cloud, Compliance & ITSM
- Same styling as the sidebar Stack card (group label + tag pills)

**Contact (Modified — 1 column):**
- Change from full-width 4-column bar to a compact 1-column bento card
- Keep "Let's talk." heading and "You know where to find me." body
- Stack contact links vertically: email (accent), GitHub, LinkedIn
- Each link keeps its SVG icon + text, but laid out vertically instead of horizontally

### 7. Nav

No changes needed. All section IDs and nav links remain correct.

## Responsive Behavior

The existing responsive breakpoints in `global.css` handle collapse:
- **≤1100px:** Grid collapses to 2 columns. The About 2:1 inner grid and Credentials 3:5 inner grid collapse to `1fr` (stacked).
- **≤700px:** Grid collapses to 1 column. All span classes become `span 1`.

No new breakpoints needed. The inner grids (About, Credentials) should add their own `@media` rules to collapse at the same thresholds.

## Files to Modify

| File | Change |
|---|---|
| `src/components/Hero.astro` | Update eyebrow text and tagline |
| `src/components/About.astro` | Split Stack groups, adjust sidebar structure |
| `src/components/Work.astro` | Full rewrite — condensed timeline + dialog modals |
| `src/components/ProjectCard.astro` | Add optional app icon, replace SSC badge SVG |
| `src/components/Photography.astro` | Replace placeholders with real images, expand to 2col |
| `src/components/Contact.astro` | Change from full-width bar to compact 1-col card |
| `src/components/Certifications.astro` | Increase badge size and padding |
| `src/pages/index.astro` | Remove Homelab import, restructure bento grid with wrapper rows |
| `src/styles/global.css` | Add wrapper grid styles for About row and Credentials row |
| `src/content/config.ts` | Add optional `icon` field to projects schema |
| `src/content/projects/nstop.md` | Add `icon: /nstop.png` to frontmatter |
| `src/content/projects/rattie.md` | Add `icon: /rattie.png` to frontmatter |

## Files to Delete

| File | Reason |
|---|---|
| `src/content/projects/homelab.md` | Homelab project removed from page |

## Out of Scope

- Content changes to the About bio text
- New project entries or work entries
- Mobile-specific design variations beyond existing responsive collapse
- Photography subdomain (photo.henkas.eu)
- Project detail modal content or styling changes
