// Maps a unit to its extracted glTF model (staged under /models/ by web/assets/extract-models.sh). Returns null
// for units with no model yet — those keep their primitive. `kind` selects the scale factor in the calibrator.

import { UnitType, RADIANT, type UnitState } from "../world/types.js";
import { dlog } from "../debuglog.js";
import { assetUrl } from "../config.js";

const loggedMissing = new Set<string>();
function logMissing(unitName: string, kind: string, fallback: string): void {
  const key = `${kind}:${unitName}`;
  if (loggedMissing.has(key)) return;
  loggedMissing.add(key);
  dlog("warn", `no ${kind} model for "${unitName || "(unnamed)"}" — using ${fallback}`);
}

export type ModelKind = "hero" | "tower" | "ancient" | "rax" | "ward";

export interface ModelSpec {
  path: string;
  kind: ModelKind;
}

// Set of creep/neutral/roshan unit_names that have a staged model.glb (dir name == unit_name). Loaded once;
// until it lands, the creep/neutral/roshan branch returns null so views stay primitive and upgrade in place
// (modelFor is re-evaluated every frame and ensureModel only fires on a non-null spec — no wrong lock-in).
let creepSet: Set<string> | null = null;
fetch(assetUrl("/models/creeps.json"))
  .then((r) => r.json())
  .then((a: string[]) => (creepSet = new Set(a)))
  .catch(() => (creepSet = new Set()));

function creepModel(name: string): ModelSpec | null {
  return creepSet && creepSet.has(name) ? { path: `/models/creeps/${name}/model.glb`, kind: "hero" } : null;
}

// Wards stage like creeps but VRF exports the prop lying on its X-axis; the renderer stands it up (kind "ward").
function wardModel(name: string): ModelSpec | null {
  return creepSet && creepSet.has(name) ? { path: `/models/creeps/${name}/model.glb`, kind: "ward" } : null;
}

export function modelFor(u: UnitState): ModelSpec | null {
  if (u.type === UnitType.HERO || u.type === UnitType.ILLUSION) {
    const short = u.unitName.replace("npc_dota_hero_", "");
    return short ? { path: `/models/heroes/${short}/model.glb`, kind: "hero" } : null;
  }
  if (u.type === UnitType.BUILDING) {
    const team = u.team === RADIANT ? "radiant" : "dire";
    const n = u.unitName;
    if (n.includes("fort")) return { path: `/models/buildings/${team}_ancient/model.glb`, kind: "ancient" };
    if (n.includes("tower")) return { path: `/models/buildings/${team}_tower/model.glb`, kind: "tower" };
    if (n.includes("rax") || n.includes("barrack")) {
      const lane = n.includes("range") ? "ranged" : "melee";
      return { path: `/models/buildings/${team}_rax_${lane}/model.glb`, kind: "rax" };
    }
    if (n.includes("filler")) {
      // Fillers are named {good|bad}_filler_N (also npc_dota_{goodguys|badguys}_fillers) — prefer the name's side.
      const t = n.startsWith("bad") || n.includes("badguys") ? "dire" : n.startsWith("good") || n.includes("goodguys") ? "radiant" : team;
      return { path: `/models/buildings/${t}_filler/model.glb`, kind: "tower" };
    }
    return null;
  }
  // Vision wards: dedicated unit types, staged like creeps (single mesh, kind "hero" world-scale).
  if (u.type === UnitType.WARD_OBS) return wardModel("npc_dota_observer_wards");
  if (u.type === UnitType.WARD_SEN) return wardModel("npc_dota_sentry_wards");
  if (u.type === UnitType.COURIER) return creepModel("npc_dota_courier");
  if (u.type === UnitType.ROSHAN) {
    return creepModel("npc_dota_roshan");
  }
  if (u.type === UnitType.CREEP || u.type === UnitType.NEUTRAL) {
    if (!creepSet) return null; // manifest not loaded yet — stay primitive, upgrade once it lands
    // The stream carries the real unit_name and the staged dirs are named by it, so map subtype-exactly.
    const exact = creepModel(u.unitName);
    if (exact) return exact;
    // unstaged variant → a representative model so it still reads (never worse than the old single-model map).
    if (u.type === UnitType.NEUTRAL) {
      logMissing(u.unitName, "neutral", "default neutral (dark troll)");
      return creepModel("npc_dota_neutral_dark_troll");
    }
    const team = u.team === RADIANT ? "goodguys" : "badguys";
    logMissing(u.unitName, "creep", `default ${team} melee`);
    return creepModel(`npc_dota_creep_${team}_melee`);
  }
  return null;
}
