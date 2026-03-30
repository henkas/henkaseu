---
title: BasketWise
description: An English-first Dutch grocery price comparison app. Compares weekly deals across seven supermarket chains — AH, Jumbo, Lidl, Aldi, Hoogvliet, Plus, Dirk — and builds optimised shopping lists that tell you exactly where to buy each item cheapest.
tagline: "Smart grocery deals for Dutch expats"
tags: [Next.js, NestJS, TypeScript, Supabase, Typesense]
status: active
category: coding
featured: false
date: 2026-03
links:
  github: https://github.com/henkas/basketwise
---

BasketWise aggregates live promotions from every major Dutch supermarket and helps you build shopping lists that automatically find the cheapest store for each item — including split-trip optimisation across up to three stores.

Built for the same expat audience as nstop: English by default, because every existing Dutch grocery deal app assumes you speak the language.

## How it works

- Automated scrapers pull promotions daily from seven supermarket chains via APIs, structured page data, and fallback actors
- Smart shopping lists match your items to active deals with confidence-scored recommendations
- Split-trip optimiser calculates the cheapest combination of stores for your weekly shop
- Price history tracking with EU Omnibus Directive compliance for honest discount detection