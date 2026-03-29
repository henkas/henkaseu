# Founder-First Layout Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the henkas.eu bento grid to emphasize builder/founder identity — projects as hero, work as supporting credibility, better section sizing and visual assets.

**Architecture:** The 4-column bento grid stays, but sections are reorganized into logical rows using wrapper divs with inner grids (About 2:1, Credentials 3:5). Work becomes a condensed timeline with click-to-modal details. Homelab is removed, Photography expands, Contact becomes compact.

**Tech Stack:** Astro 4, Tailwind CSS, vanilla JS (dialog modals), CSS custom properties for tokens.

**Spec:** `docs/superpowers/specs/2026-03-29-layout-redesign.md`

**Verification:** No test framework. Use `npx astro check` + `npm run build` after each task. Visual verification via dev server (`npm run dev`).

---

### Task 1: Hero — Update eyebrow and tagline

**Files:**
- Modify: `src/components/Hero.astro:8-12`

- [ ] **Step 1: Update the eyebrow text**

In `src/components/Hero.astro`, change line 8:
```html
<!-- FROM -->
<p class="label hero-eyebrow">Systems Engineer · Europe / Remote</p>

<!-- TO -->
<p class="label hero-eyebrow">Systems Engineer · Builder · Netherlands</p>
```

- [ ] **Step 2: Update the tagline**

In `src/components/Hero.astro`, change lines 10-12:
```html
<!-- FROM -->
<p class="hero-tagline">
  I build things that run everything else.<br />From homelab to enterprise.
</p>

<!-- TO -->
<p class="hero-tagline">
  I build things that run everything else.<br /><span class="hero-tagline-accent">And sometimes, things that run on their own.</span>
</p>
```

- [ ] **Step 3: Add the accent style**

In the `<style>` block of `Hero.astro`, add after `.hero-tagline`:
```css
.hero-tagline-accent {
  color: var(--accent-light);
}
```

- [ ] **Step 4: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro
git commit -m "hero: update eyebrow and tagline for builder identity"
```

---

### Task 2: Content schema — Add icon field to projects

**Files:**
- Modify: `src/content/config.ts:6`
- Modify: `src/content/projects/nstop.md:1-10`
- Modify: `src/content/projects/rattie.md:1-10`

- [ ] **Step 1: Add icon field to projects schema**

In `src/content/config.ts`, add `icon` to the projects schema object, after the `tagline` field:
```typescript
tagline: z.string().optional(),
icon: z.string().optional(),
```

- [ ] **Step 2: Add icon to nstop frontmatter**

In `src/content/projects/nstop.md`, add to frontmatter:
```yaml
icon: /nstop.png
```

- [ ] **Step 3: Add icon to rattie frontmatter**

In `src/content/projects/rattie.md`, add to frontmatter:
```yaml
icon: /rattie.png
```

- [ ] **Step 4: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/projects/nstop.md src/content/projects/rattie.md
git commit -m "content: add icon field to projects schema, set for nstop and rattie"
```

---

### Task 3: ProjectCard — Add app icons and fix SSC badge

**Files:**
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Add icon to Props interface**

In `src/components/ProjectCard.astro`, update the `Props` interface (line 2-12):
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
  icon?: string;
}
```

- [ ] **Step 2: Destructure icon from props**

Update the destructuring line:
```typescript
const { title, description, tags, category, featured, slug, status, links, award, tagline, icon } = Astro.props;
```

- [ ] **Step 3: Add icon rendering to featured card**

In the featured card template (after `<div class="card-meta">` block, before `<h3 class="card-title">`), add:
```html
{icon && <img src={icon} alt={title} class="card-app-icon" />}
```

- [ ] **Step 4: Add icon rendering to non-featured card**

In the non-featured card template (after `<div class="card-meta">` block, before `<h3 class="card-title">`), add the same:
```html
{icon && <img src={icon} alt={title} class="card-app-icon" />}
```

- [ ] **Step 5: Replace the SSC Swift bird SVG with Apple logo**

Find the `.award-badge` span (around line 78). Replace the entire SVG inside it:
```html
<!-- FROM -->
<svg class="award-swift-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21.85 7.06c.07.27..."/></svg>

<!-- TO -->
<svg class="award-apple-icon" width="12" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.48C5.55 7.98 7.07 7.03 8.74 7.01C10.04 6.99 11.26 7.87 12.05 7.87C12.83 7.87 14.29 6.8 15.87 7C16.54 7.03 18.29 7.27 19.4 8.89C19.3 8.95 17.09 10.24 17.12 12.97C17.15 16.25 19.95 17.35 19.99 17.36C19.96 17.45 19.49 19.05 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
```

- [ ] **Step 6: Update styles**

In the `<style>` block, add the icon style and rename the SVG class:
```css
.card-app-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}

.award-apple-icon {
  color: white;
}
```

Remove the old `.award-swift-icon` style:
```css
/* DELETE THIS */
.award-swift-icon {
  color: #f97316;
}
```

- [ ] **Step 7: Pass icon prop from Projects.astro**

In `src/components/Projects.astro`, add `icon` to both the featured and non-featured `<ProjectCard>` calls.

Featured (around line 30):
```html
icon={featured.data.icon}
```

Non-featured (around line 43):
```html
icon={p.data.icon}
```

- [ ] **Step 8: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro
git commit -m "projects: add app icons to cards, replace Swift bird with Apple logo"
```

---

### Task 4: About row — Wrapper with 2:1 inner grid and Stack split

**Files:**
- Modify: `src/components/About.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add the about-row wrapper class to global.css**

In `src/styles/global.css`, add after the `.bento-span-2-2` line (before the `@media` rules):
```css
.about-row {
  grid-column: span 4;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}
```

- [ ] **Step 2: Add responsive collapse for about-row**

In the `@media (max-width: 1100px)` block in `global.css`, add:
```css
.about-row {
  grid-column: span 2;
  grid-template-columns: 1fr;
}
```

In the `@media (max-width: 700px)` block, add:
```css
.about-row {
  grid-column: span 1;
}
```

- [ ] **Step 3: Wrap About component in about-row**

In `src/components/About.astro`, replace the opening of the About tile and the sidebar wrapper. Change:
```html
<!-- About tile (3 columns) -->
<div id="about" class="bento-card bento-span-3 about-tile">
```
To:
```html
<div class="about-row">
<div id="about" class="bento-card about-tile">
```

And at the end of the sidebar-wrapper closing `</div>` (line 118), add another closing `</div>` for the about-row wrapper.

- [ ] **Step 4: Trim Stack groups to keep only 3 in sidebar**

In `src/components/About.astro`, change the `groupDefs` array (lines 19-50) to only contain the 3 groups that stay in the sidebar:
```javascript
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
];
```

- [ ] **Step 5: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/About.astro src/styles/global.css
git commit -m "about: 2:1 inner grid wrapper, trim stack groups for sidebar"
```

---

### Task 5: Work section — Condensed timeline with click-to-modal

**Files:**
- Modify: `src/components/Work.astro` (full rewrite)

- [ ] **Step 1: Rewrite the frontmatter to load all entries**

Replace the entire frontmatter of `src/components/Work.astro`:
```javascript
---
import { getCollection } from 'astro:content';

const entries = await getCollection('work');
const sorted = entries.sort((a, b) => a.data.order - b.data.order);
---
```

- [ ] **Step 2: Write the timeline HTML template**

Replace the entire HTML template (everything between `---` and `<style>`):
```html
<div id="work" class="bento-card work-tile">
  <div class="bento-card-label">Work</div>
  <div class="work-timeline">
    {sorted.map((entry, i) => (
      <button
        class:list={['timeline-item', { 'timeline-item--current': i === 0 }]}
        data-work-slug={entry.slug}
      >
        <div class="timeline-left">
          <span class="timeline-role">{entry.data.role}</span>
          <span class="timeline-company">{entry.data.company}</span>
        </div>
        <div class="timeline-right">
          <span class="timeline-period">{entry.data.period}</span>
        </div>
      </button>
    ))}
  </div>
</div>

{sorted.map((entry) => (
  <dialog id={`work-modal-${entry.slug}`} class="work-dialog">
    <button class="dialog-close" aria-label="Close">✕</button>
    <div class="dialog-scroll">
      <div class="work-detail">
        <p class="label work-detail-label">Work Experience</p>
        <h2 class="work-detail-role">{entry.data.role}</h2>
        <p class="work-detail-company">{entry.data.company}</p>
        <p class="work-detail-period">{entry.data.period}</p>
        <p class="work-detail-desc">{entry.data.description}</p>
        <div class="work-detail-tags">
          {entry.data.tags.map((t) => (
            <span class="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </dialog>
))}

<script>
  // Open work modals
  document.querySelectorAll<HTMLButtonElement>('[data-work-slug]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.workSlug;
      const dialog = document.getElementById(`work-modal-${slug}`) as HTMLDialogElement | null;
      dialog?.showModal();
    });
  });

  // Close via button
  document.querySelectorAll<HTMLDialogElement>('.work-dialog').forEach((dialog) => {
    const closeBtn = dialog.querySelector('.dialog-close');
    closeBtn?.addEventListener('click', () => dialog.close());

    // Close via backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
</script>
```

- [ ] **Step 3: Write the styles**

Replace the entire `<style>` block:
```css
<style>
  .work-timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .timeline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.15s;
    width: 100%;
  }

  .timeline-item:hover {
    border-color: var(--accent);
  }

  .timeline-item--current {
    border-color: rgba(123, 104, 238, 0.3);
  }

  .timeline-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .timeline-role {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .timeline-company {
    font-size: 12px;
    color: var(--accent-light);
  }

  .timeline-right {
    text-align: right;
    flex-shrink: 0;
  }

  .timeline-period {
    font-size: 11px;
    color: var(--text-muted);
  }

  /* Past roles: softer colors */
  .timeline-item:not(.timeline-item--current) .timeline-role {
    color: #aaaacc;
  }
  .timeline-item:not(.timeline-item--current) .timeline-company {
    color: var(--accent);
  }

  /* Work dialog — reuses global .project-dialog styles */
  .work-dialog {
    position: fixed;
    inset: 0;
    width: min(680px, 94vw);
    max-height: 90vh;
    margin: auto;
    background: var(--bg-page);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0;
    overflow: hidden;
  }

  .work-dialog .dialog-scroll {
    overflow-y: auto;
    max-height: 90vh;
  }

  .work-dialog::backdrop {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
  }

  .work-detail {
    padding: 40px 36px;
  }

  .work-detail-label {
    margin-bottom: 16px;
  }

  .work-detail-role {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text-primary);
    margin: 0 0 8px;
  }

  .work-detail-company {
    font-size: 15px;
    color: var(--accent-light);
    margin: 0 0 4px;
  }

  .work-detail-period {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 20px;
  }

  .work-detail-desc {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin: 0 0 20px;
  }

  .work-detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
</style>
```

- [ ] **Step 4: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Work.astro
git commit -m "work: condensed timeline with click-to-modal details for all 6 roles"
```

---

### Task 6: Credentials row — Work + Achievements side by side (3:5)

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/Certifications.astro`

- [ ] **Step 1: Add credentials-row wrapper class to global.css**

In `src/styles/global.css`, add after the `.about-row` definition:
```css
.credentials-row {
  grid-column: span 4;
  display: grid;
  grid-template-columns: 3fr 5fr;
  gap: 16px;
}
```

- [ ] **Step 2: Add responsive collapse for credentials-row**

In the `@media (max-width: 1100px)` block, add:
```css
.credentials-row {
  grid-column: span 2;
  grid-template-columns: 1fr;
}
```

In the `@media (max-width: 700px)` block, add:
```css
.credentials-row {
  grid-column: span 1;
}
```

- [ ] **Step 3: Wrap Work + Certifications in credentials-row in index.astro**

In `src/pages/index.astro`, replace:
```html
<Work />
<Certifications />
```
With:
```html
<div class="credentials-row">
  <Work />
  <Certifications />
</div>
```

- [ ] **Step 4: Remove bento-span-2 from Certifications**

In `src/components/Certifications.astro`, change line 8:
```html
<!-- FROM -->
<div id="achievements" class="bento-card bento-span-2 achievements-tile">

<!-- TO -->
<div id="achievements" class="bento-card achievements-tile">
```

- [ ] **Step 5: Increase badge and cert item sizes**

In `src/components/Certifications.astro`, update the styles:

Change `.cert-grid` gap:
```css
.cert-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
```

Change `.cert-item` padding:
```css
.cert-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
}
```

Change badge sizes from 36px to 44px:
```css
.cert-badge-img {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: contain;
}
.cert-badge-placeholder {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  background: var(--bg-hover);
  border: 1px dashed var(--border);
  border-radius: 8px;
}
```

- [ ] **Step 6: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/styles/global.css src/components/Certifications.astro
git commit -m "layout: credentials row with Work (3fr) + Achievements (5fr), bigger badges"
```

---

### Task 7: Photography — Real images in 2-column card

**Files:**
- Modify: `src/components/Photography.astro`

- [ ] **Step 1: Replace placeholder images with real photos**

In `src/components/Photography.astro`, replace the photo-thumbs div (lines 7-10):
```html
<!-- FROM -->
<div class="photo-thumbs">
  <div class="photo-thumb photo-thumb--placeholder"></div>
  <div class="photo-thumb photo-thumb--placeholder"></div>
</div>

<!-- TO -->
<div class="photo-thumbs">
  <div class="photo-thumb"><img src="/photo-puppy.jpg" alt="Puppy" loading="lazy" /></div>
  <div class="photo-thumb"><img src="/photo-plane.jpg" alt="Plane" loading="lazy" /></div>
  <div class="photo-thumb"><img src="/photo-puppy2.jpg" alt="Puppy" loading="lazy" /></div>
  <div class="photo-thumb"><img src="/photo-plane2.jpg" alt="Plane" loading="lazy" /></div>
</div>
```

- [ ] **Step 2: Update caption**

Change the caption text:
```html
<!-- FROM -->
<p class="photo-caption">Landscapes, urban, and whatever catches my eye.</p>

<!-- TO -->
<p class="photo-caption">Puppies, planes, and whatever catches my eye.</p>
```

- [ ] **Step 3: Add bento-span-2 to the photo tile**

Change line 5:
```html
<!-- FROM -->
<div id="photography" class="bento-card photo-tile">

<!-- TO -->
<div id="photography" class="bento-card bento-span-2 photo-tile">
```

- [ ] **Step 4: Update styles for 2x2 grid with real images**

Replace the photo styles in the `<style>` block:
```css
.photo-tile {
  display: flex;
  flex-direction: column;
}
.photo-thumbs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
  flex: 1;
}
.photo-thumb {
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/3;
}
.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

- [ ] **Step 5: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Photography.astro
git commit -m "photography: real images in 2x2 grid, expand to 2-column card"
```

---

### Task 8: Bottom row — New "More tools" card + compact Contact

**Files:**
- Create: `src/components/MoreTools.astro`
- Modify: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create the MoreTools component**

Create `src/components/MoreTools.astro`:
```astro
---
import { getCollection } from 'astro:content';

const [projects, workEntries] = await Promise.all([
  getCollection('projects'),
  getCollection('work'),
]);

const usedTags = new Set([
  ...projects.flatMap((p) => p.data.tags),
  ...workEntries.flatMap((e) => e.data.tags),
]);

const groupDefs = [
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

<div class="bento-card more-tools-tile">
  <div class="bento-card-label">More tools</div>
  {stackGroups.map((group) => (
    <div class="stack-group">
      <p class="stack-group-label">{group.label}</p>
      <div class="stack-tags">
        {group.tags.map((t) => <span class="tag">{t}</span>)}
      </div>
    </div>
  ))}
</div>

<style>
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

- [ ] **Step 2: Rewrite Contact as compact 1-column card**

Replace the entire HTML template in `src/components/Contact.astro`:
```html
<div id="contact" class="bento-card contact-card">
  <div class="bento-card-label">Contact</div>
  <h2 class="contact-heading">Let's talk.</h2>
  <p class="contact-body">You know where to find me.</p>
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

Replace the entire `<style>` block:
```css
<style>
  .contact-heading {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text-primary);
    margin: 0 0 4px;
  }
  .contact-body {
    font-size: 13px;
    color: var(--text-secondary);
    margin: 0 0 16px;
  }
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .contact-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
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
</style>
```

- [ ] **Step 3: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/MoreTools.astro src/components/Contact.astro
git commit -m "bottom row: new MoreTools card, compact Contact card"
```

---

### Task 9: Index page — Final assembly and Homelab removal

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/content/projects/homelab.md`

- [ ] **Step 1: Update imports in index.astro**

In `src/pages/index.astro`, update the imports:
```javascript
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Work from '../components/Work.astro';
import Certifications from '../components/Certifications.astro';
import Photography from '../components/Photography.astro';
import MoreTools from '../components/MoreTools.astro';
import Contact from '../components/Contact.astro';

import '../styles/global.css';
```

- [ ] **Step 2: Update the main template**

Replace the `<main>` content:
```html
<main>
  <Hero />
  <div class="bento">
    <About />
    <Projects />
    <div class="credentials-row">
      <Work />
      <Certifications />
    </div>
    <Photography />
    <MoreTools />
    <Contact />
  </div>
</main>
```

Note: The `<About />` component now renders its own `about-row` wrapper internally, so it needs no wrapper here. The credentials-row wrapper was added in Task 6 — if it was added there, remove the duplicate. The final template above is the source of truth.

- [ ] **Step 3: Delete the homelab project content**

Run:
```bash
rm src/content/projects/homelab.md
```

- [ ] **Step 4: Verify build**

Run: `npx astro check && npm run build`
Expected: No errors. The homelab project should no longer appear in the projects grid.

- [ ] **Step 5: Visual verification**

Run: `npm run dev` and check all sections in the browser:
- Hero shows updated eyebrow and tagline
- About row is 2:1 ratio with trimmed Stack sidebar
- Project cards show nstop and Rattie icons
- Rattie SSC badge shows white Apple logo
- Homelab card is gone from projects grid
- Work shows all 6 roles as condensed timeline; clicking opens modal
- Achievements has bigger badges at 3:5 ratio next to Work
- Photography shows 4 real photos in 2x2 grid spanning 2 columns
- More tools card shows Tooling + Compliance groups
- Contact is compact 1-column card with vertical links
- Responsive: resize to tablet (1100px) and mobile (700px) — all collapses correctly

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "layout: final assembly — remove homelab, add MoreTools, restructure bento grid"
```
