# Grid Layout Fix & Color Palette Revision — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix bento grid tile placement (About 3c + sidebar 1c, Work 1c, Achievements 2c) and apply the "Bold & Bright" color palette for better contrast.

**Architecture:** Update CSS tokens in global.css, then restructure 5 components: Hero (remove status cards), About (widen to 3c + add sidebar with status cards and stack), Work (narrow to 1c), Certifications (widen to 2c with 2×2 grid), Nav (update frosted glass color). Remove `align-self: start` so tiles fill their rows.

**Tech Stack:** Astro, CSS Grid, CSS custom properties

**Spec:** `docs/superpowers/specs/2026-03-29-grid-color-fix.md`

**Recovery:** If any build check fails, revert with `git checkout -- <files>` and debug.

**Deploy safety:** Do not push until all tasks are complete and verified.

---

### Task 1: Update color tokens and remove align-self

**Files:**
- Modify: `src/styles/global.css:5-27` (CSS custom properties)
- Modify: `src/styles/global.css:141-148` (.bento-card — remove align-self)

- [ ] **Step 1: Update all color tokens in `:root`**

In `src/styles/global.css`, replace lines 5-26 (the `:root` content) with:

```css
  /* Backgrounds */
  --bg-page:    #181828;
  --bg-card:    #242440;
  --bg-surface: #1e1e30;
  --bg-hover:   #32325a;

  /* Borders */
  --border:        #3a3a65;
  --border-subtle: #32325a;

  /* Accent */
  --accent:       #7b68ee;
  --accent-light: #b4a0ff;
  --color-active: #4ade80;

  /* Text */
  --text-primary:   #ffffff;
  --text-secondary: #c8cde0;
  --text-muted:     #a0a0c8;
  --text-dim:       #9595b8;
  --text-faint:     #7878a0;
```

- [ ] **Step 2: Remove `align-self: start` from `.bento-card`**

In `.bento-card` rule (line 147), delete the line `align-self: start;`. The rule should become:

```css
.bento-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px 28px;
  overflow: hidden;
}
```

- [ ] **Step 3: Add `bento-span-3` utility**

Add after the existing `.bento-span-2` line (line 160):

```css
.bento-span-3 { grid-column: span 3; }
```

And in the `@media (max-width: 700px)` block, add `bento-span-3` to the reset rule:

```css
  .bento-span-2,
  .bento-span-3,
  .bento-span-4,
  .bento-span-2-2 {
    grid-column: span 1;
  }
```

In the `@media (max-width: 1100px)` block, add:

```css
  .bento-span-3 {
    grid-column: span 2;
  }
```

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: apply Bold & Bright color palette and fix bento grid utilities

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Update Nav frosted glass background

**Files:**
- Modify: `src/components/Nav.astro:35`

- [ ] **Step 1: Change nav background color**

In `src/components/Nav.astro`, in the `.nav-inner` style rule, change:
`background: #111116cc;` → `background: #242440cc;`

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "style: update nav frosted glass to match new palette

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Simplify Hero (remove status cards)

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Replace entire Hero.astro**

Replace the entire contents of `src/components/Hero.astro` with:

```astro
---
// Hero is now just name + tagline + actions.
// Status cards moved to About sidebar.
---

<section id="hero" class="hero-section">
  <div class="hero-content">
    <p class="label hero-eyebrow">Systems Engineer · Europe / Remote</p>
    <h1 class="hero-name">Henki Papp</h1>
    <p class="hero-tagline">
      I build things that run everything else.<br />From homelab to enterprise.
    </p>
    <div class="hero-actions">
      <a href="#projects" class="btn-primary">View my work</a>
      <div class="hero-icon-links">
        <a
          href="https://github.com/henkas"
          target="_blank"
          rel="noopener"
          class="hero-icon-link"
          aria-label="GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/henkipapp"
          target="_blank"
          rel="noopener"
          class="hero-icon-link"
          aria-label="LinkedIn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    max-width: 1400px;
    margin: 48px auto 0;
    padding: 0 24px;
  }

  .hero-content {
    max-width: 700px;
  }

  .hero-eyebrow {
    margin: 0 0 16px;
  }

  .hero-name {
    font-size: 64px;
    font-weight: 800;
    letter-spacing: -3px;
    line-height: 0.92;
    color: var(--text-primary);
    margin: 0 0 20px;
  }

  .hero-tagline {
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 28px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .hero-icon-links {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 4px;
  }

  .hero-icon-link {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    transition: color 0.15s;
  }

  .hero-icon-link:hover {
    color: var(--text-primary);
  }

  @media (max-width: 700px) {
    .hero-name {
      font-size: 48px;
      letter-spacing: -2px;
    }
  }
</style>
```

Key changes: removed the two-column grid, removed status cards, removed content collection imports. Hero is now a simple left-aligned block.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "layout: simplify hero, move status cards to About sidebar

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Restructure About (3c + sidebar with status cards and stack)

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Replace entire About.astro**

Replace the entire contents of `src/components/About.astro` with:

```astro
---
import { getCollection } from 'astro:content';

const [projects, workEntries] = await Promise.all([
  getCollection('projects'),
  getCollection('work'),
]);

// Status card data
const featured = projects.find((p) => p.data.featured);
const currentJob = workEntries.find((e) => e.data.order === 1);

// Stack & tools groups
const usedTags = new Set([
  ...projects.flatMap((p) => p.data.tags),
  ...workEntries.flatMap((e) => e.data.tags),
]);

const groupDefs = [
  {
    label: 'Languages',
    candidates: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'PHP', 'Go', 'Rust', 'Bash'],
  },
  {
    label: 'Frontend',
    candidates: ['SwiftUI', 'React', 'Astro', 'Vue', 'Next.js', 'Angular'],
  },
  {
    label: 'Infrastructure',
    candidates: [
      'Linux', 'RHEL', 'Windows Server', 'Proxmox', 'VMware ESXi',
      'Docker', 'Kubernetes', 'Ansible', 'Active Directory',
    ],
  },
  {
    label: 'Tooling',
    candidates: [
      'PostgreSQL', 'Cloudflare', 'Git', 'Node.js',
      'Microsoft 365', 'Entra ID', 'Intune', 'Microsoft Defender', 'Purview',
      'Oracle Cloud', 'Microsoft Azure', 'AWS', 'SharePoint', 'Teams',
    ],
  },
  {
    label: 'Compliance & ITSM',
    candidates: [
      'ISO 27001', 'ITIL', 'ServiceNow', 'ServiceDesk Plus',
      'Incident Response', 'Autosys', 'RCA',
    ],
  },
];

const stackGroups = groupDefs
  .map((g) => ({ label: g.label, tags: g.candidates.filter((t) => usedTags.has(t)) }))
  .filter((g) => g.tags.length > 0);
---

<!-- About tile (3 columns) -->
<div id="about" class="bento-card bento-span-3 about-tile">
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

<!-- Sidebar (1 column): status cards + stack -->
<div class="sidebar-wrapper">
  <!-- Currently -->
  <div class="sidebar-card">
    <p class="bento-card-label">Currently</p>
    {currentJob && (
      <>
        <p class="sidebar-title">{currentJob.data.role}</p>
        <p class="sidebar-accent">{currentJob.data.company}</p>
      </>
    )}
  </div>

  <!-- Latest project -->
  {featured && (
    <div class="sidebar-card">
      <p class="bento-card-label">Latest project</p>
      <p class="sidebar-title">{featured.data.title}</p>
      <div class="sidebar-tags">
        {featured.data.tags.slice(0, 3).map((tag) => (
          <span class="tag">{tag}</span>
        ))}
      </div>
    </div>
  )}

  <!-- Stack & Tools -->
  <div class="sidebar-card">
    <p class="bento-card-label">Stack &amp; tools</p>
    {stackGroups.map((group) => (
      <div class="stack-group">
        <p class="stack-group-label">{group.label}</p>
        <div class="stack-tags">
          {group.tags.map((t) => <span class="tag">{t}</span>)}
        </div>
      </div>
    ))}
  </div>
</div>

<style>
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

  /* Sidebar wrapper — not a bento-card, just a flex container */
  .sidebar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sidebar-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sidebar-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .sidebar-accent {
    font-size: 13px;
    color: var(--accent-light);
    margin: 0;
  }

  .sidebar-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .stack-group {
    margin-bottom: 10px;
  }

  .stack-group:last-child {
    margin-bottom: 0;
  }

  .stack-group-label {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 4px;
  }

  .stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
</style>
```

Key changes: About goes from `bento-span-2` to `bento-span-3`. The old Stack tile is replaced by a sidebar wrapper containing three stacked cards (Currently, Latest project, Stack & Tools). Status card data (featured project, current job) moves here from Hero.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "layout: About 3c + sidebar with status cards and stack

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Narrow Work to 1 column

**Files:**
- Modify: `src/components/Work.astro`

- [ ] **Step 1: Replace entire Work.astro**

Replace the entire contents of `src/components/Work.astro` with:

```astro
---
import { getCollection } from 'astro:content';

const entries = await getCollection('work');
const sorted = entries
  .filter((e) => e.data.order <= 2)
  .sort((a, b) => a.data.order - b.data.order);
---

<div id="work" class="bento-card work-tile">
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

<style>
  .work-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .work-item {
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
</style>
```

Key changes: removed `bento-span-2` (defaults to 1c). Changed `.work-items` from `display: flex` (row) to `flex-direction: column` (stack). Removed the `@media` rule (already column, no need to switch).

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Work.astro
git commit -m "layout: narrow Work to single column with stacked cards

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Widen Achievements to 2 columns with 2×2 grid

**Files:**
- Modify: `src/components/Certifications.astro`

- [ ] **Step 1: Replace entire Certifications.astro**

Replace the entire contents of `src/components/Certifications.astro` with:

```astro
---
import { getCollection } from 'astro:content';

const allCerts = await getCollection('certifications');
const certs = allCerts.sort((a, b) => a.data.order - b.data.order);
---

<div id="achievements" class="bento-card bento-span-2 achievements-tile">
  <div class="bento-card-label">Achievements</div>
  <div class="cert-grid">
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

<style>
  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
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

  @media (max-width: 1100px) {
    .cert-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

Key changes: added `bento-span-2`. Changed `.cert-items` (flex column) to `.cert-grid` (CSS grid 2 columns). Added responsive fallback to 1 column at ≤1100px.

- [ ] **Step 2: Build check**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications.astro
git commit -m "layout: widen Achievements to 2c with 2x2 badge grid

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Final verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: 7 pages built, zero errors

- [ ] **Step 2: Type check**

Run: `npx astro check`
Expected: No errors

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

Check at these widths:
- 1440px — full 4-column bento, tiles fill rows
- 1100px — 2-column fallback
- 700px — single column
- 375px — mobile

Verify:
- No floating cards with empty space around them
- Cards fill their rows (no gaps)
- Page background (#181828) clearly distinguishable from card background (#242440)
- Body text is easily readable
- Project modals still open/close
- Nav anchors scroll to correct sections
- Hero shows only name/tagline (no status cards)
- Status cards appear in the About sidebar (right column)
- Achievements displays as 2×2 grid
- Work is a single narrow column with stacked cards

- [ ] **Step 4: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: visual polish after grid and color revision

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
