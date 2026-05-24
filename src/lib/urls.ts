// URL helpers for the apps subsite.
//
// In production builds the apps pages are served at the bare path on
// apps.henkas.eu (the Worker rewrites incoming /<path> -> /apps/<path> when
// fetching from the assets binding). On disk they live at /apps/* so that
// `astro dev` can serve them directly during local development.
//
// `appsUrl()` emits whichever prefix matches the build mode so that internal
// navigation works in both contexts without any HTML rewriting at the edge.

const APPS_PREFIX = import.meta.env.PROD ? '' : '/apps';

export function appsUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/' || normalized === '') return APPS_PREFIX ? `${APPS_PREFIX}/` : '/';
  // Always emit trailing-slash URLs so canonical, link hrefs, and the URL bar
  // agree (Astro's static output is directory-based: /conjuring/index.html).
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${APPS_PREFIX}${withSlash}`;
}
