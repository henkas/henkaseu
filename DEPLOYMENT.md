# Deployment

This document covers the **one-time cutover** from the existing Cloudflare Pages project to the new Workers + Static Assets setup, and the **ongoing CI/CD** via Workers Builds (auto-deploy on push to `main`).

The Worker config (`wrangler.jsonc`) is pinned to the **Sewer Rats** Cloudflare account (`account_id: 19e3c57078ceab1f298c169ef0f5e271`). Run `wrangler whoami` to confirm you're authenticated as a user with access to that account before deploying.

## Prerequisites

- Node 18+ and the repo cloned locally.
- Authenticated wrangler session: `npx wrangler login` (opens browser; pick the Cloudflare account with access to **Sewer Rats**).
- DNS for `henkas.eu` already lives in Cloudflare (currently used by the Pages project), so no DNS work is required for the apex domain — only for the new `apps.henkas.eu` subdomain.

## Part 1 — First-time cutover

The existing Cloudflare Pages project currently owns the custom domain `henkas.eu`. Wrangler refuses to attach a domain to a Worker while another project owns it, so the order below matters.

### Step 1: Build and dry-run locally

```bash
npm install
npm run deploy:dry-run
```

The dry-run should report **41+ files** uploaded and a single `env.ASSETS` binding. If wrangler complains about the account, run `npx wrangler whoami` and check you're on the Sewer Rats account.

### Step 2: Detach `henkas.eu` from the Pages project

In the Cloudflare dashboard:

1. **Workers & Pages → henkaseu (or the old Pages project name) → Custom domains**
2. Remove `henkas.eu` (and `www.henkas.eu` if present).
3. Confirm the domain is back to "available" — this can take a minute.

**Do not delete the Pages project yet.** Keep it around until the Worker is verified live, so you have a one-click rollback path if anything misfires.

### Step 3: Deploy the Worker

```bash
npm run deploy
```

This runs `astro build` then `wrangler deploy`, which:

- Uploads `src/worker.ts` and the contents of `dist/`.
- Attaches the routes from `wrangler.jsonc` — **both** `henkas.eu` and `apps.henkas.eu` as Custom Domains.
- For `apps.henkas.eu`, Cloudflare creates the DNS record automatically (it's a Custom Domain, so DNS is managed for you).

Expected output ends with something like:

```
Published henkas-eu (1.23 sec)
  https://henkas.eu (custom domain)
  https://apps.henkas.eu (custom domain)
```

### Step 4: Verify

```bash
curl -I https://henkas.eu/
curl -s https://henkas.eu/.well-known/webfinger | head -3
curl -I https://apps.henkas.eu/
curl -I https://apps.henkas.eu/conjuring
curl -I https://apps.henkas.eu/terms-of-service
```

All should return `HTTP/2 200`. The WebFinger response should be valid JSON with `acct:admin@henkas.eu` as the subject.

In a browser, open the apps subsite and click through: index → Conjuring detail → footer Terms link → footer Privacy link → back. The URL bar should stay clean (no `/apps/` prefix anywhere).

### Step 5: Delete the old Pages project

Once verified for 24 hours (or as long as you want), delete the old Pages project from the dashboard. The Worker is now the sole owner of `henkas.eu`.

## Part 2 — GitHub auto-deploy (Workers Builds)

Once the Worker is deployed manually, wire up automatic deploys on push to `main`. Cloudflare's Workers Builds is the modern equivalent of what Pages did with its built-in Git integration.

### Step 1: Connect the GitHub repo

In the Cloudflare dashboard:

1. **Workers & Pages → henkas-eu (the Worker you just deployed) → Settings → Builds**.
2. Click **Connect**.
3. Choose **GitHub** and authorize Cloudflare for the `henkas/henkaseu` repository (or whichever org/repo holds this code).
4. Repository selection: pick this repo.
5. Production branch: `main`.

> **Important:** Workers Builds requires the **Worker name in the dashboard to match the `name` field in `wrangler.jsonc`** (`henkas-eu`). If you renamed the Worker manually, fix one or the other before connecting, or the first build will fail.

### Step 2: Configure build settings

Cloudflare auto-detects most of this from `package.json` and `wrangler.jsonc`, but verify in the dashboard:

| Setting | Value |
|---|---|
| Branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Wrangler config path | `wrangler.jsonc` |
| Node version | 20 (or current LTS) |

You don't need to add any environment variables or secrets — the Worker has no runtime config beyond what's in `wrangler.jsonc`.

### Step 3: Trigger the first build

Push a trivial commit to `main` (or run **Trigger build** in the dashboard). Watch the build log in **Workers & Pages → henkas-eu → Builds**.

On success, the dashboard shows the new version live and the commit SHA. From this point on, every push to `main` triggers a build and rollout — pull requests get a preview URL automatically.

### Step 4: (Optional) Branch previews

By default, only `main` deploys to the production routes (`henkas.eu`, `apps.henkas.eu`). Non-main branches build but don't take over the custom domains — they get a preview URL at `henkas-eu-<branch>.<your-subdomain>.workers.dev`. To disable preview builds on non-main branches, toggle that off in **Settings → Builds → Branch deployments**.

## Operational notes

- **Manual deploys still work** even after Workers Builds is connected — `npm run deploy` from your laptop pushes a new version immediately and is the right escape hatch when CI is down.
- **The Worker writes no state.** There are no secrets, no KV namespaces, no D1 databases. Rebuilding from scratch is just `git clone && npm install && npm run deploy`.
- **The contact form is intentionally disabled.** When you wire up a new submission backend, decide whether to handle it inside this Worker (add a route to `src/worker.ts`) or via an external form provider, and update `src/components/Contact.astro` to remove the `disabled` attributes.
- **WebFinger lives in `src/worker.ts`.** If the OIDC issuer ever moves off `auth.henkas.eu`, edit `WEBFINGER_RESPONSE` and redeploy.

## Rollback

If a deploy goes wrong, the Workers dashboard keeps the last several versions and lets you roll back with one click: **Workers & Pages → henkas-eu → Deployments → … → Rollback to this version**. No need to redeploy from the CLI in an emergency.
