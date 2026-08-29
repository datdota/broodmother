// Decimate the tree meshes. Trees are the render's triangle budget (~4.5M across ~2,300 instances) and render
// twice (main + shadow pass), so we simplify them hard — they're small on screen and read fine at low poly.
// Idempotent-ish: run on the extracted glbs. Usage: node simplify-trees.mjs [ratio]
import { NodeIO } from "@gltf-transform/core";
import { simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import { readdirSync, statSync } from "fs";
import { fileURLToPath } from "node:url";

const ratio = Number(process.argv[2] ?? 0.3); // target fraction of triangles to keep
// Assets live under ASSET_OUT (default ../viewer/public relative to this script).
const PUBLIC = process.env.ASSET_OUT ?? fileURLToPath(new URL("../viewer/public", import.meta.url));
const TREES = `${PUBLIC}/models/trees`;
await MeshoptSimplifier.ready;
const io = new NodeIO();

const triCount = (doc) => {
  let t = 0;
  for (const m of doc.getRoot().listMeshes())
    for (const p of m.listPrimitives()) {
      const idx = p.getIndices();
      t += idx ? idx.getCount() / 3 : p.getAttribute("POSITION").getCount() / 3;
    }
  return t;
};

let before = 0, after = 0;
for (const d of readdirSync(TREES)) {
  const f = `${TREES}/${d}/model.glb`;
  try { statSync(f); } catch { continue; }
  const doc = await io.read(f);
  const b = triCount(doc);
  // weld first so simplify can collapse across split vertices; error cap keeps silhouettes sane
  await doc.transform(weld(), simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.02 }));
  const a = triCount(doc);
  await io.write(f, doc);
  before += b; after += a;
  console.log(d.padEnd(18), `${Math.round(b)} -> ${Math.round(a)} tris`);
}
console.log(`TOTAL ${Math.round(before).toLocaleString()} -> ${Math.round(after).toLocaleString()} tris (${(100 * after / before).toFixed(0)}%)`);
