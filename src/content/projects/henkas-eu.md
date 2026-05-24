---
title: henkas.eu
description: This site. A personal portfolio built with Astro and Tailwind, deployed as a single Cloudflare Worker that serves both henkas.eu and apps.henkas.eu. Dark violet palette, bento project grid, zero runtime JS except the category filter.
tagline: "This site — you're looking at it"
tags: [Astro, Tailwind CSS, TypeScript, Cloudflare Workers]
status: active
category: coding
featured: false
date: 2026-03
links:
  live: https://henkas.eu
  github: https://github.com/henkas/henkaseu
---

Static portfolio site built with Astro. All content is managed as markdown files via Astro Content Collections. Hosted on Cloudflare Workers with Static Assets — a single Worker serves both `henkas.eu` (portfolio) and `apps.henkas.eu` (a small subsite for personal apps), with hostname-based routing in `src/worker.ts`. Auto-deployed on every push to `main` via Workers Builds.
