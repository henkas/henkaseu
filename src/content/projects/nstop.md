---
title: nstop
description: Real-time Dutch transit for expats. nstop watches your calendar and the live transit network so you always know exactly when to leave. Built for the ~1.6M English-speaking expats in the Netherlands.
tagline: "Real-time Dutch transit for expats"
icon: /nstop.png
tags: [Swift, SwiftUI, iOS, NDOV, Transit API]
status: active
category: coding
featured: true
date: 2026-03
links:
  live: https://nstop.app
milestones:
  - { text: "nstop Ltd. incorporated (UK)", state: done }
  - { text: "Data agreement signed with national transit authority (NDOV Loket)", state: done }
  - { text: "Transit data gateway built — all major Dutch operators", state: done }
  - { text: "API in internal testing", state: active }
  - { text: "iOS app in development", state: active }
  - { text: "TestFlight beta — Q3 2026", state: upcoming }
  - { text: "App Store release — Q4 2026", state: upcoming }
---

nstop is an iOS app that delivers real-time departures, platform changes, and service alerts from every transit operator in the Netherlands — entirely in English. It's the first product from NSTOP LTD, the company I founded to fix how expats navigate Dutch public transport.

## The problem

Every Dutch transit app assumes you speak Dutch. The existing alternatives are slow, ad-riddled, or don't cover all operators. nstop is built from scratch for people who live in the Netherlands but don't speak the language — a market of roughly 1.6 million people that no one is serving well.

## Architecture

- Live data from the national NDOV gateway, covering all major operators (NS, GVB, RET, HTM, Arriva, and more)
- SwiftUI interface with zero external dependencies
- Upcoming: calendar integration that tells you *when to leave*, not just what's departing
 