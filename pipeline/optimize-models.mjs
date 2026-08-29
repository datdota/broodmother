// Strips the facial morph-target blendshapes VRF bakes into hero glbs (useless for a top-down spectator view,
// but they duplicate the vertex data ~45x) and prunes orphaned data. Keeps a small ANIMATION SET per model —
// the best idle + run + attack clip — so the client can blend idle<->run by speed and play attacks; all other
// clips are dropped to control size.
//   node assets/optimize-models.mjs            # every public/models/**/*.glb
//   node assets/optimize-models.mjs a.glb b.glb  # only the given files (targeted re-extract)
import { NodeIO } from "@gltf-transform/core";
import { prune, dedup } from "@gltf-transform/functions";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Assets live under ASSET_OUT (default ../viewer/public relative to this script).
const PUBLIC = process.env.ASSET_OUT ?? fileURLToPath(new URL("../viewer/public", import.meta.url));
const ROOT = `${PUBLIC}/models/`;
const io = new NodeIO();

function findGlbs(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...findGlbs(p));
    else if (name.endsWith(".glb")) out.push(p);
  }
  return out;
}

// Best-per-category clip scoring. Each returns 0 = reject; higher = better. The client matches the kept clips
// back to categories by name (idle / run|walk / attack), so the winning names must stay recognizable.
const scoreIdle = (s) => {
  if (/injured|loadout|aggress|_agg|reverse|spin|versus|_alt|taunt|haste|rare|_to_|death|spawn|cast|effigy|portrait|victory|showoff|channel|@/.test(s)) return 0;
  if (s === "idle" || s === "idle_anim") return 6;
  if (/^[a-z0-9]*_?idle(_anim)?$/.test(s)) return 4;
  if (/idle/.test(s)) return 2;
  return 0;
};
const scoreRun = (s) => {
  if (!/run|walk/.test(s)) return 0;
  if (/injured|reverse|loadout|versus|_agg|_to_|cast|death|chase|@/.test(s)) return 0;
  if (s === "run" || s === "run_run" || s === "run_anim") return 6;
  if (/fast|faster|fastest/.test(s)) return 2; // avoid sped-up variants
  if (s === "run_walk") return 4;
  if (/run/.test(s)) return 3;
  return 1;
};
const scoreAttack = (s) => {
  if (!/attack/.test(s)) return 0;
  if (/cast|showoff|versus|spin|crit|slashes|start|_to_|vault|fast|faster|fastest|@/.test(s)) return 0;
  if (s === "attack" || s === "attack_anim" || s === "attack01" || s === "attack1") return 6;
  if (/^attack_?0?1(_anim)?$/.test(s)) return 6;
  if (/^attack_?0?2(_anim)?$/.test(s)) return 3;
  if (/attack/.test(s)) return 2;
  return 0;
};

function pickBest(anims, scorer) {
  let best = null, bestScore = 0;
  for (const a of anims) {
    const sc = scorer(a.getName().toLowerCase());
    if (sc > bestScore) { bestScore = sc; best = a; }
  }
  return best;
}

const targets = process.argv.slice(2);
const files = targets.length ? targets : findGlbs(ROOT);

let before = 0, after = 0;
for (const path of files) {
  before += statSync(path).size;
  const doc = await io.read(path);
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      for (const target of prim.listTargets()) target.dispose();
    }
    mesh.setWeights([]);
  }
  const anims = doc.getRoot().listAnimations();
  if (anims.length) {
    const keep = new Set([pickBest(anims, scoreIdle), pickBest(anims, scoreRun), pickBest(anims, scoreAttack)].filter(Boolean));
    if (keep.size === 0) keep.add(anims[0]);
    for (const a of anims) {
      if (keep.has(a)) continue;
      a.listSamplers().forEach((s) => s.dispose());
      a.listChannels().forEach((c) => c.dispose());
      a.dispose();
    }
  }
  await doc.transform(prune(), dedup());
  await io.write(path, doc);
  after += statSync(path).size;
}
console.log(`[optimize] ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB across ${files.length} glb(s)`);
