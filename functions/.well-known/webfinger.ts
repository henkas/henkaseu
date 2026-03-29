/**
 * WebFinger endpoint (RFC 7033)
 *
 * Used for OpenID Connect issuer discovery — ZITADEL at auth.henkas.eu
 * advertises itself as the OIDC provider for the henkas.eu domain.
 *
 * Clients query: /.well-known/webfinger?resource=acct:admin@henkas.eu
 * and receive back the issuer URL to use for OIDC discovery.
 */

const WEBFINGER_RESPONSE = {
  subject: 'acct:admin@henkas.eu',
  links: [
    {
      rel: 'http://openid.net/specs/connect/1.0/issuer',
      href: 'https://auth.henkas.eu',
    },
  ],
};

export async function onRequestGet(): Promise<Response> {
  return new Response(JSON.stringify(WEBFINGER_RESPONSE, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/jrd+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
