// Runtime configuration for where the viewer loads assets and reaches the backend. Set via Vite env (.env):
//   VITE_ASSET_BASE  models/terrain/fixtures origin  ("" = locally-served public/, else a CDN URL)
//   VITE_API_BASE    REST base URL                    ("" = same-origin; the dev proxy forwards /api)
//   VITE_WS_BASE     WebSocket base URL               ("" = same-origin; the dev proxy forwards /ws)
//   VITE_API_TOKEN   auth token for the PRIVATE API   ("" = none; public endpoints need no token)
// This is the ONLY place these are read, so the same build runs against local dev or the public backend.

const env = import.meta.env as Record<string, string | undefined>;
const trim = (v: string | undefined) => (v ?? "").replace(/\/+$/, "");

export const ASSET_BASE = trim(env.VITE_ASSET_BASE);
export const API_BASE = trim(env.VITE_API_BASE);
export const WS_BASE = trim(env.VITE_WS_BASE);

/** Resolve a viewer asset (model / terrain / fixture) against ASSET_BASE. Leading slash optional. */
export function assetUrl(path: string): string {
  return ASSET_BASE + (path.startsWith("/") ? path : "/" + path);
}

/** Resolve a backend REST path against API_BASE ("" = same-origin, proxied in dev). */
export function apiUrl(path: string): string {
  return API_BASE + (path.startsWith("/") ? path : "/" + path);
}

/** Base for WebSocket URLs — WS_BASE if set, else the current origin (dev proxy forwards /ws). */
export function wsBase(): string {
  if (WS_BASE) return WS_BASE;
  return `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}`;
}

// Private-API auth token: a `?token=` in the page URL (dev convenience) wins, else VITE_API_TOKEN from .env.
// Empty for the public build — public endpoints require no token. Read lazily so tests (no `location`) are safe.
export function apiToken(): string {
  const urlTok = typeof location !== "undefined" ? new URLSearchParams(location.search).get("token") : null;
  return urlTok ?? trim(env.VITE_API_TOKEN);
}

/** Bearer header for REST calls to the private API, or {} when no token is configured (public). Browsers can't
 *  set headers on WebSockets, so WS auth stays a query param / join ticket — this is REST-only. */
export function authHeaders(): Record<string, string> {
  const t = apiToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

/** Public mode = no API token: the viewer uses the unauthenticated /api/v2/public API + WS join tickets. With a
 *  token it uses the authenticated /api/v2/private endpoints (live games + replays). */
export function isPublic(): boolean {
  return apiToken() === "";
}
