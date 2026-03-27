# Bento Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert henkas.eu from a 900px single-column layout to a 1400px 4-column bento dashboard with improved contrast and typography.

**Architecture:** The main page (`index.astro`) wraps section components in a `.bento` CSS Grid container. Each component renders as one or more grid tiles instead of full-width sections. Hero stays above the grid. All color tokens and font sizes are updated in `global.css`. No new dependencies.

**Tech Stack:** Astro, Tailwind CSS, CSS Grid, vanilla JS (existing modal behavior preserved)

**Spec:** `docs/superpowers/specs/2026-03-27-bento-layout-redesign.md`

**Recovery:** If any build check fails, revert the current task's changes with `git checkout -- <files>` and debug before proceeding.

**Deploy safety:** Do not push to remote until Task 14 verification is complete. Intermediate commits will produce a visually broken site.

---

### Task 1: Update design tokens (colors + typography)

**Files:**
- Modify: `src/styles/global.css:5-27` (CSS custom properties)
- Modify: `src/styles/global.css:43-46` (body font-size)
- Modify: `src/styles/global.css:64-74` (.tag class)
- Modify: `src/styles/global.css:80-86` (.label class)
- Modify: `src/styles/global.css:88-95` (.section-num — remove)

- [ ] **Step 1: Update color tokens in `:root`**

Replace these 5 token values in `src/styles/global.css`:

```css
--text-secondary: #9da3be;  /* was #8888aa */
--text-muted:     #8b91ab;  /* was #7777aa */
--text-dim:       #7a7f99;  /* was #666680 */
--text-faint:     #6b7089;  /* was #555570 */
--accent-light:   #b4a0ff;  /* was #a78bfa */
```

- [ ] **Step 2: Update typography scale**

In `body` rule, change `font-size: 14px` → `font-size: 15px`.

In `.tag` class, change `font-size: 9px` → `font-size: 10px` and `padding: 3px 8px` → `padding: 4px 10px`.

In `.label` class, change `font-size: 9px` → `font-size: 10px`.

- [ ] **Step 3: Remove `.section-num` class**

Delete the entire `.section-num` rule block (lines ~88-95).

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build succeeds (colors/fonts are just CSS changes, no structural breakage)

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: update color tokens for WCAG AA and bump typography scale"
```

---

### Task 2: Add tagline field to project schema + content

**Files:**
- Modify: `src/content/config.ts:6-7` (add tagline to schema)
- Modify: `src/content/projects/nstop.md` (add tagline)
- Modify: `src/content/projects/rattie.md` (add tagline)
- Modify: `src/content/projects/fiscalmap-mcp.md` (add tagline)
- Modify: `src/content/projects/henkas-eu.md` (add tagline)
- Modify: `src/content/projects/homelab.md` (add tagline)
- Modify: `src/content/projects/schedyx.md` (add tagline)

- [ ] **Step 1: Add tagline to project schema**

In `src/content/config.ts`, add after `description: z.string(),` (line 7):

```typescript
tagline: z.string().optional(),
```

- [ ] **Step 2: Add taglines to all project frontmatter**

Add `tagline` field to each project's frontmatter:

`nstop.md`: `tagline: "Real-time Dutch transit for expats"`
`rattie.md`: `tagline: "Pet rat care companion for iOS"`
`fiscalmap-mcp.md`: `tagline: "Dutch tax data for AI agents"`
`henkas-eu.md`: `tagline: "This site — you're looking at it"`
`homelab.md`: `tagline: "Self-hosted infrastructure at home"`
`schedyx.md`: `tagline: "Smart self-hosted scheduling assistant"`

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds, 7 pages

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/projects/
git commit -m "content: add tagline field to project schema and all projects"
```

---

### Task 3: Add bento grid styles to global.css

**Files:**
- Modify: `src/styles/global.css` (add new `.bento` rules after `.btn-ghost:hover`)

- [ ] **Step 1: Add bento grid CSS**

Add after the `.btn-ghost:hover` rule block (~line 136):

```css
/* ── Bento grid ──────────────────────────────────── */

.bento {
  max-width: 1400px;
  margin: 24px auto 0;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
}

.bento-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  overflow: hidden;
}

.bento-card-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

/* Span utilities */
.bento-span-2 { grid-column: span 2; }
.bento-span-4 { grid-column: span 4; }
.bento-span-2-2 { grid-column: span 2; grid-row: span 2; }

@media (max-width: 1100px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-span-2-2 {
    grid-row: span 1;
  }
  .bento-span-4 {
    grid-column: span 2;
  }
}

@media (max-width: 700px) {
  .bento {
    grid-template-columns: 1fr;
  }
  .bento-span-2,
  .bento-span-4,
  .bento-span-2-2 {
    grid-column: span 1;
  }
}
```

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds (new CSS classes, not yet used)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add bento grid CSS with responsive breakpoints"
```

---

### Task 4: Restructure index.astro with bento grid

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace the `<main>` content**

Replace the `<main>` block (lines 20-28) with:

```astro
<main>
  <Hero />
  <div class="bento">
    <About />
    <Projects />
    <Work />
    <Certifications />
    <Photography />
    <Contact />
  </div>
</main>
```

Components will be updated in subsequent tasks to output bento tiles instead of full-width sections.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds. Page will look broken visually (components still have old wrappers) but no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "layout: wrap section components in bento grid container"
```

---

### Task 5: Update Hero component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Update Hero styles**

In `.hero-section`: change `max-width` from `900px` to `1400px`. Add `min-height: 280px`.

In `.hero-grid`: change `grid-template-columns` from `1.4fr 1fr` to `1.2fr 1fr`. Change `gap` from `32px` to `40px`.

In `.hero-name`: change `font-size` from `54px` to `64px`.

In `.hero-tagline`: change `font-size` from `16px` to `18px`.

In `@media (max-width: 700px)` `.hero-name`: change `font-size` from `42px` to `48px`.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "style: widen hero to 1400px and bump typography"
```

---

### Task 6: Update About component (split into two bento tiles)

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Restructure About to output two sibling bento tiles**

Keep the existing frontmatter unchanged — it computes a `stackGroups` array (verified: the variable is named `stackGroups` in the current file). Replace the entire template (everything after the `---` closing fence) with two sibling tiles. Remove the `<section>` wrapper, the `.section-card` wrapper, and the section-num/label header. Output:

1. An About bio tile (`.bento-card.bento-span-2`)
2. A Stack & Tools tile (`.bento-card.bento-span-2`)

The frontmatter (data fetching + stack group logic) stays the same.

Template becomes:

```astro
<div id="about" class="bento-card bento-span-2 about-tile">
  <div class="bento-card-label">About</div>
  <h2 class="about-heading">Hi, I'm Henki.</h2>
  <div class="about-bio">
    <p>
      I'm a systems engineer currently based in the Netherlands with a soft spot for building
      things that solve real problems — whether that's a transit app for the 1.6M expats who
      can't read Dutch departure boards, or a self-hosted tool that does one thing, runs on
      your own hardware, and never asks a SaaS platform for permission.
    </p>
    <p>
      Outside of work I run a homelab, obsess over systems that run unattended, and occasionally
      get sidetracked building iOS apps for my pet rats. I care about simplicity, ownership and
      tools that don't phone home.
    </p>
    <p>
      If you're working on something interesting — or just want to talk homelab topology, transit
      APIs, or why most software does too much and asks too much in return — you know where to find me.
    </p>
  </div>
</div>

<div class="bento-card bento-span-2 stack-tile">
  <div class="bento-card-label">Stack &amp; tools</div>
  {stackGroups.map((group) => (
    <div class="stack-group">
      <p class="stack-group-label">{group.label}</p>
      <div class="stack-tags">
        {group.tags.map((t) => <span class="tag">{t}</span>)}
      </div>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Update scoped styles**

Remove `.about-section`, `.about-grid`, and `@media` rules. Replace with:

```css
.about-heading {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.about-bio p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.about-bio p:last-child {
  margin-bottom: 0;
}

.stack-group {
  margin-bottom: 12px;
}

.stack-group-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 6px;
}

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro
git commit -m "layout: split About into two bento tiles (bio + stack)"
```

---

### Task 7: Update Projects component (bento tiles, remove filter)

**Files:**
- Modify: `src/components/Projects.astro`
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Update ProjectCard props and structure**

In `ProjectCard.astro`, add `tagline` to the Props interface:

```typescript
interface Props {
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  slug: string;
  status: string;
  links?: { github?: string; live?: string };
  award?: { name: string; badge?: string };
  tagline?: string;
}
```

Update destructuring to include `tagline`.

Reorder the card template to: category → title → tagline/description → badge → tags.

For featured cards, add class `bento-card bento-span-2-2` on the outer element.
For small cards, add class `bento-card` on the outer element.

Featured card template:

```astro
<a
  href={`/projects/${slug}`}
  class="bento-card bento-span-2-2 project-card project-card--featured"
  data-category={category}
>
  <div class="card-meta">
    <span class="label card-category">{category}</span>
    {status === 'active' && links?.live && <span class="status-dot" title="Active"></span>}
  </div>

  <h3 class="card-title">{title}</h3>

  <span class="featured-badge">Featured</span>

  <p class="card-desc">{description}</p>

  <div class="card-tags">
    {tags.slice(0, 5).map((t) => (
      <span class="tag">{t}</span>
    ))}
  </div>

  <div class="card-links">
    {links?.live && (
      <span
        class="card-link-pill"
        onclick={`event.preventDefault(); window.open('${links.live}', '_blank')`}
      >
        Live ↗
      </span>
    )}
    {links?.github && (
      <span
        class="card-link-pill card-link-pill--muted"
        onclick={`event.preventDefault(); window.open('${links.github}', '_blank')`}
      >
        GitHub ↗
      </span>
    )}
    <span class="card-readmore">Read more →</span>
  </div>
</a>
```

Small card template:

```astro
<a
  href={`/projects/${slug}`}
  class="bento-card project-card"
  data-category={category}
>
  <div class="card-meta">
    <span class="label card-category">{category}</span>
    {status === 'active' && links?.live && <span class="status-dot" title="Active"></span>}
  </div>

  <h3 class="card-title">{title}</h3>

  {tagline && <p class="card-tagline">{tagline}</p>}

  {award && (
    <span class="award-badge">
      <svg class="award-swift-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21.85 7.06c.07.27.13.56.17.84.59 3.8-1.07 8.03-4.79 10.95-.06.05-.14.09-.2.14 .05-.02.13-.06.22-.11 1.55-.86 5.06-3.38 4.3-7.37a6.5 6.5 0 0 0-.36-1.15c-.04-.09-.09-.17-.13-.26-.73-1.46-2.14-2.88-4.02-4.08C13.62 3.7 9.58 2.16 6.03 1.3c0 0 3.68 2.77 5.09 4.54A55.8 55.8 0 0 1 3.66 1 .16.16 0 0 0 3.47 1c-.01.01-.01.04 0 .06 1.88 3.27 4.42 6.81 5.14 7.7-1.78-1-4.8-3.31-6.82-5.34A.12.12 0 0 0 1.61 3.5c.31 1.15.93 2.74 2.04 4.37 1.34 1.98 4.56 5.47 8.86 7.28-2.14.96-4.87.91-7.47-.3.02.03.04.05.07.08 2.06 1.63 4.46 2.5 6.73 2.5 1.95 0 3.79-.65 5.14-1.89l.03-.03c2.68-2.37 3.63-5.81 4.03-7.65.05-.22.08-.42.11-.58.22-1.61.04-2.97-.36-4.11-.03-.1-.07-.19-.11-.29-.02-.03-.03-.06-.04-.09a.1.1 0 0 1 .01.03c.04.08.09.17.12.25z"/></svg>
      {award.name}
    </span>
  )}

  <div class="card-tags">
    {tags.slice(0, 3).map((t) => (
      <span class="tag">{t}</span>
    ))}
  </div>
</a>
```

- [ ] **Step 2: Replace ProjectCard scoped styles entirely**

Replace the entire `<style>` block in `ProjectCard.astro` with:

```css
.project-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.project-card:hover {
  border-color: var(--accent);
}

.project-card--featured {
  gap: 10px;
}

.project-card--featured:hover {
  border-color: var(--accent-light);
}

.featured-badge {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent-light);
  border: 1px solid var(--accent);
  padding: 3px 10px;
  border-radius: 20px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-category {
  text-transform: capitalize;
  letter-spacing: 1.5px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--color-active);
  border-radius: 50%;
  flex-shrink: 0;
}

.card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.3px;
}

.project-card--featured .card-title {
  font-size: 22px;
  letter-spacing: -0.5px;
}

.card-tagline {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.card-desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: auto;
}

.card-links {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.card-link-pill {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-light);
  border: 1px solid var(--accent);
  padding: 4px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.15s;
}

.card-link-pill:hover {
  background: var(--accent);
  color: #fff;
}

.card-link-pill--muted {
  color: var(--text-secondary);
  border-color: var(--border);
}

.card-link-pill--muted:hover {
  background: var(--border);
  color: var(--text-primary);
}

.card-readmore {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: auto;
}

.award-badge {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #c4b5fd;
  border: 1px solid #6d5dca;
  background: linear-gradient(135deg, rgba(65, 88, 208, 0.15), rgba(139, 92, 246, 0.15));
  padding: 3px 8px;
  border-radius: 20px;
}

.award-swift-icon {
  color: #f97316;
}
```

- [ ] **Step 3: Update Projects.astro — remove filter, output flat bento tiles**

Replace the entire file with this. Key changes: remove `bentoSmall`, `remaining`, `categories` variables from frontmatter. Remove `<section>` wrapper, filter pills, bento-grid/regular-grid wrappers. Remove category filter JS. Keep modal JS and dialog elements.

Note: `<dialog>` elements are inside the `.bento` grid (via the parent in index.astro) but this is fine — `display:none` elements don't participate in grid layout.

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from './ProjectCard.astro';
import ProjectDetail from './ProjectDetail.astro';

const allProjects = await getCollection('projects');

const projects = allProjects.sort((a, b) => {
  if (a.data.featured && !b.data.featured) return -1;
  if (!a.data.featured && b.data.featured) return 1;
  return b.data.date.localeCompare(a.data.date);
});

const featured = projects.find((p) => p.data.featured);
const nonFeatured = projects.filter((p) => !p.data.featured);
---

<!-- Anchor for nav -->
<div id="projects" style="display:contents"></div>

<!-- Project cards as direct bento children -->
{featured && (
  <ProjectCard
    title={featured.data.title}
    description={featured.data.description}
    tags={featured.data.tags}
    category={featured.data.category}
    featured={true}
    slug={featured.slug}
    status={featured.data.status}
    links={featured.data.links}
    award={featured.data.award}
    tagline={featured.data.tagline}
  />
)}
{nonFeatured.map((p) => (
  <ProjectCard
    title={p.data.title}
    description={p.data.description}
    tags={p.data.tags}
    category={p.data.category}
    featured={false}
    slug={p.slug}
    status={p.data.status}
    links={p.data.links}
    award={p.data.award}
    tagline={p.data.tagline}
  />
))}

<!-- Modal dialogs (display:none, don't affect grid layout) -->
{allProjects.map((entry) => (
  <dialog id={`modal-${entry.slug}`} class="project-dialog">
    <button class="dialog-close" aria-label="Close">✕</button>
    <div class="dialog-scroll">
      <ProjectDetail project={entry} isModal={true} />
    </div>
  </dialog>
))}

<script>
  // ── Project modals ─────────────────────────────────

  // Open on card click
  document.querySelectorAll<HTMLAnchorElement>('[data-category]').forEach((card) => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href') ?? '';
      if (!href.startsWith('/projects/')) return;
      e.preventDefault();
      const slug = href.replace('/projects/', '').replace(/\/$/, '');
      const dialog = document.getElementById(`modal-${slug}`) as HTMLDialogElement | null;
      if (!dialog) return;
      dialog.showModal();
      history.pushState({ slug }, '', `/projects/${slug}`);
    });
  });

  // Close via ✕ button
  document.querySelectorAll<HTMLButtonElement>('.dialog-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      (btn.closest('dialog') as HTMLDialogElement).close();
      history.pushState(null, '', '/');
    });
  });

  // Close via backdrop click
  document.querySelectorAll<HTMLDialogElement>('.project-dialog').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
        history.pushState(null, '', '/');
      }
    });
  });

  // Close via back link inside modal
  document.querySelectorAll<HTMLAnchorElement>('[data-modal-back]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      (link.closest('dialog') as HTMLDialogElement | null)?.close();
      history.pushState(null, '', '/');
    });
  });

  // Auto-open if page loads at /projects/slug
  const match = location.pathname.match(/^\/projects\/([^/]+)/);
  if (match) {
    const d = document.getElementById(`modal-${match[1]}`) as HTMLDialogElement | null;
    d?.showModal();
  }

  // Browser back closes open dialogs
  window.addEventListener('popstate', () => {
    if (!location.pathname.startsWith('/projects/')) {
      document.querySelectorAll<HTMLDialogElement>('.project-dialog[open]').forEach((d) =>
        d.close()
      );
    }
  });
</script>
```

No `<style>` block needed — all styling comes from `.bento-card` (global) and `ProjectCard.astro` (scoped).

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build succeeds, 7 pages

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro
git commit -m "layout: convert projects to bento tiles, remove category filter"
```

---

### Task 8: Update Work component (compact 2-card tile)

**Files:**
- Modify: `src/components/Work.astro`
- Modify: `src/components/WorkCard.astro`

- [ ] **Step 1: Replace entire Work.astro**

Replace the entire file contents. Filter to `order <= 2`, remove WorkCard import, remove `<section>` wrapper. Complete file:

```astro
---
import { getCollection } from 'astro:content';

const entries = await getCollection('work');
const sorted = entries
  .filter((e) => e.data.order <= 2)
  .sort((a, b) => a.data.order - b.data.order);
---

<div id="work" class="bento-card bento-span-2 work-tile">
  <div class="bento-card-label">Work</div>
  <div class="work-items">
    {sorted.map((entry, i) => (
      <div class:list={['work-item', { 'work-item--past': i > 0 }]}>
        <div class="work-role">{entry.data.role}</div>
        <div class="work-company">{entry.data.company}</div>
        <div class="work-period">{entry.data.period}</div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Update scoped styles**

Replace all existing styles with:

```css
.work-items {
  display: flex;
  gap: 12px;
}

.work-item {
  flex: 1;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 16px;
}

.work-role {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.work-company {
  font-size: 13px;
  color: var(--accent-light);
  margin-bottom: 2px;
}

.work-period {
  font-size: 11px;
  color: var(--text-muted);
}

.work-item--past .work-role { color: #aaaacc; }
.work-item--past .work-company { color: #7b68ee; }
.work-item--past { border-color: var(--border-subtle); }

@media (max-width: 700px) {
  .work-items { flex-direction: column; }
}
```

- [ ] **Step 3: WorkCard.astro is no longer used — remove import from Work.astro**

The inline template replaces WorkCard. WorkCard.astro can be left in the repo (it may be useful for future layouts) but is no longer imported.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/Work.astro
git commit -m "layout: compact work to 2-card bento tile"
```

---

### Task 9: Update Certifications component (→ "Achievements")

**Files:**
- Modify: `src/components/Certifications.astro`

- [ ] **Step 1: Update template**

Remove `<section>` and `.section-card` wrappers. Change label text. Output as bento tile:

```astro
<div id="achievements" class="bento-card achievements-tile">
  <div class="bento-card-label">Achievements</div>
  <div class="cert-items">
    {certs.map((cert) => (
      <div class:list={['cert-item', { 'cert-item--pending': cert.data.status === 'in-progress' }]}>
        {cert.data.badge_image
          ? <img src={cert.data.badge_image} alt={cert.data.name} class="cert-badge-img" width="36" height="36" />
          : <div class="cert-badge-placeholder"></div>
        }
        <div class="cert-info">
          <p class="cert-name">{cert.data.name}</p>
          <p class="cert-issuer">{cert.data.issuer}</p>
          {cert.data.status === 'active' && cert.data.credly_url && (
            <a href={cert.data.credly_url} target="_blank" rel="noopener" class="cert-verify">
              Verify ↗
            </a>
          )}
          {cert.data.status === 'in-progress' && (
            <span class="label cert-pending-label">In progress</span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Update scoped styles**

Remove `.certs-section` and `.certs-grid`. Update styles:

```css
.cert-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
}

.cert-item--pending { opacity: 0.55; }

.cert-badge-img {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  object-fit: contain;
}

.cert-badge-placeholder {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: var(--bg-hover);
  border: 1px dashed var(--border);
  border-radius: 6px;
}

.cert-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.cert-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.cert-issuer {
  font-size: 11px;
  color: var(--accent-light);
  margin: 0;
}

.cert-verify {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 12px;
  margin-top: 2px;
  transition: border-color 0.15s, color 0.15s;
}

.cert-verify:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.cert-pending-label {
  color: var(--text-dim);
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/Certifications.astro
git commit -m "layout: convert certifications to Achievements bento tile"
```

---

### Task 10: Update Photography component (compact callout)

**Files:**
- Modify: `src/components/Photography.astro`

- [ ] **Step 1: Update template**

Remove `<section>` and `.section-card` wrappers. Reduce to 2 thumbnails. Output as bento tile:

```astro
<div id="photography" class="bento-card photo-tile">
  <div class="bento-card-label">Photography</div>
  <div class="photo-thumbs">
    <div class="photo-thumb photo-thumb--placeholder"></div>
    <div class="photo-thumb photo-thumb--placeholder"></div>
  </div>
  <p class="photo-caption">Landscapes, urban, and whatever catches my eye.</p>
  <a
    href="https://photo.henkas.eu"
    target="_blank"
    rel="noopener"
    class="photo-link"
  >
    photo.henkas.eu ↗
  </a>
</div>
```

- [ ] **Step 2: Update scoped styles**

```css
.photo-tile {
  display: flex;
  flex-direction: column;
}

.photo-thumbs {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex: 1;
}

.photo-thumb {
  flex: 1;
  aspect-ratio: 4/3;
  border-radius: 6px;
  overflow: hidden;
}

.photo-thumb--placeholder {
  background: var(--bg-hover);
  border: 1px solid var(--border);
}

.photo-caption {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0 0 8px;
}

.photo-link {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-light);
  text-decoration: none;
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/Photography.astro
git commit -m "layout: convert photography to compact bento callout"
```

---

### Task 11: Update Contact component (full-width bar)

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Update template**

Remove `<section>` and `.section-card` wrappers. Output as full-width bento bar:

```astro
---
const email = 'henkas@henkas.eu';
const github = 'https://github.com/henkas';
const linkedin = 'https://linkedin.com/in/henkipapp';
---

<div id="contact" class="bento-card bento-span-4 contact-bar">
  <div class="contact-left">
    <h2 class="contact-heading">Let's talk.</h2>
    <p class="contact-body">You know where to find me.</p>
  </div>
  <div class="contact-links">
    <a href={`mailto:${email}`} class="contact-link contact-link--accent">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      {email}
    </a>
    <a href={github} target="_blank" rel="noopener" class="contact-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      github.com/henkas
    </a>
    <a href={linkedin} target="_blank" rel="noopener" class="contact-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      linkedin.com/in/henkipapp
    </a>
  </div>
</div>
```

- [ ] **Step 2: Update scoped styles**

```css
.contact-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
}

.contact-heading {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.contact-body {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.contact-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}

.contact-link:hover {
  color: var(--text-primary);
}

.contact-link--accent {
  color: var(--accent-light);
  font-weight: 600;
}

.contact-link--accent:hover {
  color: var(--text-primary);
}

@media (max-width: 1100px) {
  .contact-bar {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .contact-links {
    flex-direction: column;
    gap: 10px;
  }
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.astro
git commit -m "layout: convert contact to full-width bento bar"
```

---

### Task 12: Update Nav component

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Rename nav link and widen**

Change `<a href="#certifications">Certs</a>` to `<a href="#achievements">Achievements</a>`.

Change `.nav-inner` max-width from `900px` to `1400px`.

Note: All anchor IDs (`#about`, `#projects`, `#work`, `#achievements`, `#photography`, `#contact`) were already added directly to each component's bento tile in Tasks 6-11.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "nav: rename Certs to Achievements, widen to 1400px"
```

---

### Task 13: Final verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: 7 pages built, zero errors

- [ ] **Step 2: Type check**

Run: `npx astro check`
Expected: No errors

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

Check at these widths:
- 1440px — full 4-column bento
- 1100px — 2-column fallback
- 700px — single column
- 375px — mobile

Verify:
- All bento tiles render in correct positions
- Hero is full-width above the grid
- Project modals still open/close (click card → dialog opens, ✕/backdrop/back closes)
- Project detail pages at `/projects/[slug]` still render
- Nav anchor links scroll to correct sections
- Colors look correct (no old #8888aa visible)
- No horizontal overflow at any width

- [ ] **Step 4: Commit any fixes**

If any fixes were needed, commit them.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete bento layout redesign"
```
