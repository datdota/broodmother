// Bake a real, high-res heightmap from the compiled map's terrain geometry (maps/dota/worldnodes/n0 exported to
// glb — the static ground+cliffs surface; trees/buildings are separate entities, not in here). We rasterize every
// terrain triangle into a grid, taking the surface (max) height per cell, giving accurate cliffs at whatever cell
// size we choose — far better than the game's coarse 128-cell dotamapheightfielddata.bin.
//
// Usage: node --max-old-space-size=4096 assets/extract-heightmap.mjs <world.glb> <out.bin> [gridW]
import { NodeIO } from "@gltf-transform/core";
import { writeFileSync } from "fs";

const [glbPath, outPath, gwArg] = process.argv.slice(2);
const GW = Number(gwArg ?? 512);
const GH = Math.round((GW * 136) / 128); // keep the world's 128:136 aspect
const EXT_X = 8192, EXT_Y = 8704; // world half-extents (Dota units)
const U = 39.37; // glb metres -> Dota units (VRF divides source units by this)

const io = new NodeIO();
const doc = await io.read(glbPath);

// glb is Y-up; the horizontal axes map to Dota world as worldX = -gz, worldY = gx (verified by aligning the baked
// river against the overview: this is the orientation where the river sits below the land and the N-S/E-W aspect
// matches the real map). height = gy.
const height = new Float32Array(GW * GH).fill(-Infinity);

function xf(m, x, y, z) {
  // column-major (gl-matrix): row r = sum_c m[c*4+r]*p_c
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12],
    m[1] * x + m[5] * y + m[9] * z + m[13],
    m[2] * x + m[6] * y + m[10] * z + m[14],
  ];
}

// (gx,gy,gz) -> grid (fractional col, row) + height in Dota units
function toGrid(gx, gy, gz) {
  const wx = -gz * U, wy = gx * U, h = gy * U;
  const fc = ((wx + EXT_X) / (2 * EXT_X)) * (GW - 1);
  const fr = ((EXT_Y - wy) / (2 * EXT_Y)) * (GH - 1);
  return [fc, fr, h];
}

let tris = 0;
for (const node of doc.getRoot().listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const m = node.getWorldMatrix();
  for (const prim of mesh.listPrimitives()) {
    const pos = prim.getAttribute("POSITION");
    if (!pos) continue;
    const idxAcc = prim.getIndices();
    const count = idxAcc ? idxAcc.getCount() : pos.getCount();
    const gi = (i) => (idxAcc ? idxAcc.getScalar(i) : i);
    const P = new Float32Array(3);
    const tri = [];
    for (let i = 0; i < count; i += 3) {
      tri.length = 0;
      for (let k = 0; k < 3; k++) {
        pos.getElement(gi(i + k), P);
        const [gx, gy, gz] = xf(m, P[0], P[1], P[2]);
        tri.push(toGrid(gx, gy, gz));
      }
      rasterize(tri[0], tri[1], tri[2]);
      tris++;
    }
  }
}

// max-height rasterization of one triangle into the grid (barycentric over the cell bbox)
function rasterize(a, b, c) {
  const minc = Math.max(0, Math.floor(Math.min(a[0], b[0], c[0])));
  const maxc = Math.min(GW - 1, Math.ceil(Math.max(a[0], b[0], c[0])));
  const minr = Math.max(0, Math.floor(Math.min(a[1], b[1], c[1])));
  const maxr = Math.min(GH - 1, Math.ceil(Math.max(a[1], b[1], c[1])));
  const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
  if (Math.abs(d) < 1e-9) return; // degenerate
  for (let r = minr; r <= maxr; r++) {
    for (let col = minc; col <= maxc; col++) {
      const w0 = ((b[1] - c[1]) * (col - c[0]) + (c[0] - b[0]) * (r - c[1])) / d;
      const w1 = ((c[1] - a[1]) * (col - c[0]) + (a[0] - c[0]) * (r - c[1])) / d;
      const w2 = 1 - w0 - w1;
      if (w0 < -0.001 || w1 < -0.001 || w2 < -0.001) continue;
      const h = w0 * a[2] + w1 * b[2] + w2 * c[2];
      const n = r * GW + col;
      if (h > height[n]) height[n] = h;
    }
  }
}

// fill cells no triangle covered (outside the mesh) by nearest-neighbour spread, so borders are flat ground
function fillHoles() {
  let holes = [];
  for (let i = 0; i < height.length; i++) if (height[i] === -Infinity) holes.push(i);
  const total = holes.length;
  while (holes.length) {
    const next = [];
    for (const n of holes) {
      const r = (n / GW) | 0, c = n % GW;
      let s = 0, k = 0;
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const rr = r + dr, cc = c + dc;
        if (rr >= 0 && rr < GH && cc >= 0 && cc < GW) {
          const v = height[rr * GW + cc];
          if (v !== -Infinity) { s += v; k++; }
        }
      }
      if (k) height[n] = s / k; else next.push(n);
    }
    if (next.length === holes.length) { for (const n of next) height[n] = 0; break; }
    holes = next;
  }
  return total;
}

const holes = fillHoles();

// ground baseline = median height (ground cells dominate), so the loader can zero it out
const baseZ = [...height].sort((a, b) => a - b)[height.length >> 1];

// binary: 'DH01' + int32 GW,GH + float32 extX,extY,baseZ + float32[GW*GH] (row 0 = north)
const buf = Buffer.alloc(4 + 5 * 4 + height.length * 4);
buf.write("DH01", 0, "ascii");
buf.writeInt32LE(GW, 4);
buf.writeInt32LE(GH, 8);
buf.writeFloatLE(EXT_X, 12);
buf.writeFloatLE(EXT_Y, 16);
buf.writeFloatLE(baseZ, 20);
for (let i = 0; i < height.length; i++) buf.writeFloatLE(height[i], 24 + i * 4);
writeFileSync(outPath, buf);

// stats + ASCII preview so orientation/relief can be eyeballed
let lo = Infinity, hi = -Infinity;
for (const v of height) { if (v < lo) lo = v; if (v > hi) hi = v; }
console.log(`tris ${tris.toLocaleString()}  grid ${GW}x${GH} (${(2 * EXT_X / GW).toFixed(0)}u cells)  height ${lo.toFixed(0)}..${hi.toFixed(0)}  baseZ ${baseZ.toFixed(0)}  holes ${holes}`);
const COLS = 64, ROWS = 34;
const ramp = " .:-=+*#%@";
let out = "";
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const v = height[((r / ROWS * GH) | 0) * GW + ((c / COLS * GW) | 0)];
    const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
    out += ramp[Math.min(ramp.length - 1, (t * ramp.length) | 0)];
  }
  out += "\n";
}
console.log(out);
