---
title: Homelab
description: 4-node Proxmox cluster running production-grade self-hosted infrastructure — auth, email, reverse proxy, media, and dev environments.
tagline: My own cloud. No subscriptions, no lock-in.
tags: [Proxmox, Docker, Linux, Mailcow, ZITADEL, Pangolin, Ansible]
status: active
category: sysadmin
featured: false
layout: "wide"
date: 2023-01
---

Running a private cloud at home because renting someone else's is fine until it isn't. Four Proxmox nodes form the compute backbone — VMs and LXC containers for everything from isolated dev environments to persistent production-like services.

**What's running:**

- **Email** — Mailcow-dockerized stack as a secondary mail system alongside Microsoft 365. Full SMTP/IMAP, spam filtering, DKIM/DMARC, webmail.
- **Identity** — ZITADEL as a self-hosted OAuth 2.0 / OIDC provider. SSO for internal apps without depending on a third-party IdP.
- **Networking** — Pangolin reverse proxy exposing selected private services to the internet with proper TLS, without punching holes in the firewall.
- **Media & storage** — NAS stack with media server applications for local streaming and file management.
- **Dev environments** — Isolated VMs and containers for testing infrastructure changes and building projects like nstop and SchedyX without touching anything production-adjacent.

The goal isn't to replicate cloud providers — it's to understand at a low level what they're doing, own the data, and build systems I actually trust.
