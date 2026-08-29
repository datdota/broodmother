// Elevation. Primary source is our own baked heightmap (public/terrain/heightmap.bin, "DH01") — rasterized from
// the compiled map's real terrain geometry (assets/extract-heightmap.mjs), so cliffs are sharp and in the right
// place and the river is correctly flat. We subtract the stored ground baseline (ground ≈ 0), apply a vertical
// EXAGgeration (the real relief is modest from the top-down camera), clamp the tall perimeter walls, and sample
// bilinearly with NO smoothing so cliffs stay cliffy. Falls back to the game's coarse dotamapheightfielddata.bin
// (heightfield.bin) if the bake is missing.

import { assetUrl } from "../config.js";

// Vertical exaggeration of the (accurate) relief, and clamps so the perimeter mountains frame without towering.
// 1.0 = true in-game heights; the baked cliffs are already sharp, so keep this near real scale.
const EXAG = 0.1;
const CEIL = 500;
const FLOOR = -220;

// World -> baked-grid affine (col = A*wx + B*wy + C, row = D*wx + E*wy + F), from the manual alignment tool
// (public/align.html) using the two Roshan pits. Replaces the assumed extents/axes with the measured transform.
const ALIGN = { A: 0, B: 0.034876, C: 270.051, D: 0.026211, E: 0, F: 285.427 };

export interface HeightSampler {
  sample(wx: number, wy: number): number;
}

export const FLAT: HeightSampler = { sample: () => 0 };

function bakedSampler(buf: ArrayBuffer): HeightSampler | null {
  const dv = new DataView(buf);
  if (String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3)) !== "DH01") return null;
  const GW = dv.getInt32(4, true), GH = dv.getInt32(8, true);
  const baseZ = dv.getFloat32(20, true);
  const h = new Float32Array(buf, 24, GW * GH);
  const g = (c: number, r: number) =>
    h[Math.max(0, Math.min(GH - 1, r)) * GW + Math.max(0, Math.min(GW - 1, c))];
  return {
    sample(wx, wy) {
      const fc = ALIGN.A * wx + ALIGN.B * wy + ALIGN.C;
      const fr = ALIGN.D * wx + ALIGN.E * wy + ALIGN.F;
      const c0 = Math.floor(fc), r0 = Math.floor(fr);
      const tc = fc - c0, tr = fr - r0;
      const top = g(c0, r0) * (1 - tc) + g(c0 + 1, r0) * tc;
      const bot = g(c0, r0 + 1) * (1 - tc) + g(c0 + 1, r0 + 1) * tc;
      const raw = top * (1 - tr) + bot * tr;
      return Math.max(FLOOR, Math.min(CEIL, (raw - baseZ) * EXAG));
    },
  };
}

// Fallback: the game's 128x136 tier grid (7 ground, 8 river, 9-12 high ground). Coarse + noisy, so only used if
// the baked heightmap is unavailable.
const HW = 128, HH = 136, EXT_X = 8192, EXT_Y = 8704, LEVEL = 130;
function legacySampler(buf: ArrayBuffer): HeightSampler {
  const grid = new Uint8Array(buf, 8, HW * HH);
  const th = (t: number) => (t === 8 ? -0.7 * LEVEL : t >= 9 && t <= 12 ? (t - 8) * LEVEL : 0);
  const g = (c: number, r: number) =>
    th(grid[Math.max(0, Math.min(HH - 1, r)) * HW + Math.max(0, Math.min(HW - 1, c))]);
  return {
    sample(wx, wy) {
      const fc = ((wx + EXT_X) / (2 * EXT_X)) * HW - 0.5;
      const fr = ((EXT_Y - wy) / (2 * EXT_Y)) * HH - 0.5;
      const c0 = Math.floor(fc), r0 = Math.floor(fr);
      const tc = fc - c0, tr = fr - r0;
      const top = g(c0, r0) * (1 - tc) + g(c0 + 1, r0) * tc;
      const bot = g(c0, r0 + 1) * (1 - tc) + g(c0 + 1, r0 + 1) * tc;
      return top * (1 - tr) + bot * tr;
    },
  };
}

export async function loadHeightfield(): Promise<HeightSampler> {
  try {
    const res = await fetch(assetUrl("/terrain/heightmap.bin"));
    if (res.ok) {
      const s = bakedSampler(await res.arrayBuffer());
      if (s) return s;
    }
  } catch { /* fall through to legacy */ }
  try {
    const buf = await (await fetch(assetUrl("/terrain/heightfield.bin"))).arrayBuffer();
    if (buf.byteLength >= 8 + HW * HH) return legacySampler(buf);
  } catch { /* none */ }
  return FLAT;
}
