/**
 * Worker entry for henkas.eu and apps.henkas.eu.
 *
 * Routing model:
 *   apps.henkas.eu/<page>            -> internally fetch /apps/<page> from ASSETS
 *   apps.henkas.eu/<file.ext>        -> served from root (shared Astro assets like
 *                                       /_astro/*.css and /favicon.svg live there)
 *   henkas.eu/.well-known/webfinger  -> OIDC issuer discovery JSON
 *   henkas.eu/apps/*                 -> 404 (the apps site is subdomain-only in prod)
 *   henkas.eu/<anything>             -> ASSETS
 *
 * The effective hostname is taken from the Host header so that `wrangler dev`
 * with `-H "Host: apps.henkas.eu"` exercises the same code path as production.
 * On true localhost (no Host override), /apps/* is reachable directly so the
 * apps pages can be browsed during local Astro development.
 */

export interface Env {
	ASSETS: Fetcher;
}

const APPS_HOSTNAME = 'apps.henkas.eu';
const HAS_EXTENSION = /\.[a-z0-9]+$/i;

// OIDC issuer for the henkas.eu tailnet (authentik, per-application issuer).
// Tailscale requires this href to match the `issuer` in
// https://auth.henkas.eu/application/o/tailscale/.well-known/openid-configuration
// exactly, trailing slash included.
const OIDC_ISSUER = 'https://auth.henkas.eu/application/o/tailscale/';
const WEBFINGER_ACCT = /^acct:[^@]+@henkas\.eu$/i;

function effectiveHost(request: Request, url: URL): string {
	const header = request.headers.get('host');
	const raw = header ?? url.hostname;
	return raw.split(':')[0].toLowerCase();
}

function isLocalHost(hostname: string): boolean {
	return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

function webfingerResponse(url: URL): Response {
	// Per RFC 7033 the subject echoes the queried resource; anything outside
	// acct:*@henkas.eu is not ours to answer for.
	const resource = url.searchParams.get('resource') ?? '';
	if (!WEBFINGER_ACCT.test(resource)) {
		return new Response('Not found', { status: 404 });
	}
	const body = {
		subject: resource,
		links: [
			{
				rel: 'http://openid.net/specs/connect/1.0/issuer',
				href: OIDC_ISSUER,
			},
		],
	};
	return new Response(JSON.stringify(body, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/jrd+json',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}

function fetchAppsAsset(request: Request, env: Env, url: URL): Promise<Response> {
	const isSharedAsset = HAS_EXTENSION.test(url.pathname);
	const rewritten = new URL(url.toString());
	if (!isSharedAsset) {
		// Astro emits trailing-slash directory pages (dist/apps/<slug>/index.html).
		// Always normalize to that shape so the assets binding serves the file
		// directly instead of issuing a 307 to canonicalize the path.
		let path = url.pathname === '/' ? '/apps/' : '/apps' + url.pathname;
		if (!path.endsWith('/')) path += '/';
		rewritten.pathname = path;
	}
	return env.ASSETS.fetch(new Request(rewritten.toString(), request));
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const host = effectiveHost(request, url);

		if (host === APPS_HOSTNAME) {
			return fetchAppsAsset(request, env, url);
		}

		if (url.pathname === '/.well-known/webfinger') {
			return webfingerResponse(url);
		}

		if (url.pathname.startsWith('/apps') && !isLocalHost(host)) {
			return new Response('Not found', { status: 404 });
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
