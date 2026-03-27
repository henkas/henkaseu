---
title: Homelab
description: A self-hosted infrastructure stack running on bare metal at home — Proxmox hypervisor, containerised services, automated backups, and a Cloudflare tunnel so everything is reachable without a static IP.
tagline: "Self-hosted infrastructure at home"
tags: [Proxmox, Docker, Linux, Cloudflare, Ansible]
status: active
category: sysadmin
featured: false
date: 2023-01
---

The homelab is a living system — a place to run personal services, experiment with infrastructure tooling, and learn by breaking things in a safe environment.

## Current stack

- **Hypervisor:** Proxmox VE on a repurposed workstation
- **Networking:** VLANs for IoT/trusted/DMZ separation, Cloudflare Tunnel for external access
- **Services:** Vaultwarden, Gitea, Jellyfin, Uptime Kuma, Grafana + Loki
- **Automation:** Ansible for configuration management, automated Proxmox backups to local NAS + Backblaze B2

## Philosophy

Everything is defined as code. If the machine burns down, I should be able to rebuild from the Ansible playbooks and backup in under an hour.
