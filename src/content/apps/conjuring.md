---
name: Conjuring
tagline: "A warm, opinionated husbandry log for the invertebrates you keep."
status: coming-soon
order: 1
date: "2026-05"
platforms: [Android, iPadOS]
license: MIT
links:
  appStore: coming-soon
  googlePlay: coming-soon
  github: "https://github.com/henkas/Conjuring"
---

Most pet-tracking apps are built for dogs and cats, which leaves keepers of more interesting animals doing it all in spreadsheets. Conjuring is a husbandry log for the invertebrates you keep — spiders first, with scorpions, mantids, isopods, and the rest of the eight-plus-legged friends following on the same data model.

The core idea is that "a tarantula" and "a colony of feeder roaches" are the same kind of thing once you stop thinking in spreadsheets: both are subjects you track, log events about, and feed (or feed *with*). One polymorphic event table covers feeding, molting, misting, environment readings, and rehousing. Adding a new species means inserting a row, not migrating a schema.

Built with Kotlin Multiplatform — Jetpack Compose on Android first, an iPadOS port sharing the same business logic to follow. Local-first by design: the SQLite database lives on your device, backed up by the operating system. Sign-in is identity-only, so your display name shows up on your device and nothing leaves it. No backend, no sync server, no analytics unless you explicitly turn them on.

The voice of the app borrows from how keepers actually talk about their animals — warm, personal, and occasionally cheeky. The `sex = Unsure` label reads "Non-binary until further notice", which is the canonical example.

Open source under the MIT license, shipping to Google Play and the App Store.
