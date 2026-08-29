// Single source of truth for per-hero part exclusions. Two layers, merged per hero:
//   1. public/models/part_blacklist.json — the committed baseline (shared, in the repo)
//   2. localStorage overrides — what you toggle in the hero explorer (gallery), saved instantly
// A hero present in the localStorage layer REPLACES the file entry for that hero, so the explorer is the live
// source of truth: unchecking a part hides it and re-checking shows it again, no manual JSON editing.

import { assetUrl } from "./config.js";

const LS_KEY = "dota:partBlacklist";

let filePromise: Promise<Record<string, string[]>> | null = null;
function fileBlacklist(): Promise<Record<string, string[]>> {
  if (!filePromise) {
    filePromise = fetch(assetUrl("/models/part_blacklist.json")).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  }
  return filePromise;
}

export function localOverrides(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Merged exclusions for one hero — localStorage override wins over the committed file. */
export async function bannedParts(hero: string): Promise<Set<string>> {
  const local = localOverrides();
  if (hero in local) return new Set(local[hero]);
  return new Set((await fileBlacklist())[hero] ?? []);
}

/** Persist the explorer's current exclusions for a hero (called on every checkbox change). */
export function saveOverride(hero: string, removed: string[]): void {
  const all = localOverrides();
  all[hero] = removed;
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}
