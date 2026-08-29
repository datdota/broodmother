// Click-to-calibrate wizard. Uses the live building positions from the stream (no hardcoded coords): it hides
// units, asks you to click each reference building (the two ancients) on the map, reads the texture pixel under
// each click, and least-squares-solves the map calibration (center_px + scale) so world positions land on the
// map art. Wire to a panel button.

import * as THREE from "three";
import { calib } from "./calib.js";
import type { Terrain, LayerMeta } from "./render/terrain.js";
import type { DotaCamera } from "./render/camera.js";
import { UnitType, RADIANT, type UnitState } from "./world/types.js";
import type { InterpWorld } from "./world/snapshot.js";

interface Deps {
  terrain: Terrain;
  cam: DotaCamera;
  camera: THREE.Camera;
  raycaster: THREE.Raycaster;
  dom: HTMLElement;
  getWorld: () => InterpWorld | undefined;
  rebuild: () => void;
}

interface Ref {
  label: string;
  wx: number;
  wy: number;
}
interface Sample extends Ref {
  pu: number;
  pv: number;
}

export class CalibWizard {
  private overlay?: HTMLDivElement;
  private refs: Ref[] = [];
  private samples: Sample[] = [];
  private i = 0;
  private saved = { heroes: true, creeps: true, buildings: true };

  constructor(private d: Deps) {}

  start() {
    const world = this.d.getWorld();
    if (!world) return this.toast("No data yet — wait for the game to load.");
    const ancients = world.units.filter((u) => u.type === UnitType.BUILDING && u.unitName.includes("fort"));
    if (ancients.length < 2) return this.toast("Ancients not visible yet — try again once the map is populated.");

    this.refs = ancients
      .map((u: UnitState) => ({
        label: u.team === RADIANT ? "RADIANT ANCIENT (bottom-left)" : "DIRE ANCIENT (top-right)",
        wx: u.x,
        wy: u.y,
      }))
      .sort((a) => (a.label.startsWith("RADIANT") ? -1 : 1));
    this.samples = [];
    this.i = 0;

    // isolate the map
    this.saved = { heroes: calib.showHeroes, creeps: calib.showCreeps, buildings: calib.showBuildings };
    calib.showHeroes = calib.showCreeps = calib.showBuildings = false;
    calib.showMap = true;
    this.d.rebuild();
    this.d.cam.paused = true;
    this.d.dom.addEventListener("pointerup", this.onClick);
    this.prompt();
  }

  private onClick = (e: PointerEvent) => {
    const r = this.d.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.d.raycaster.setFromCamera(ndc, this.d.camera);
    const hit = this.d.raycaster.intersectObject(this.d.terrain.mesh, false)[0];
    if (!hit?.uv) return;
    const { w, h } = this.d.terrain.imageSize();
    const ref = this.refs[this.i];
    this.samples.push({ ...ref, pu: hit.uv.x * w, pv: hit.uv.y * h });
    this.i++;
    if (this.i >= this.refs.length) this.finish();
    else this.prompt();
  };

  private finish() {
    this.d.dom.removeEventListener("pointerup", this.onClick);
    this.d.cam.paused = false;
    const s = solve(this.samples);
    if (s) {
      calib.mapCx = s.cx;
      calib.mapCy = s.cy;
      calib.mapScale = s.scale;
      // persist onto the active layer so switching away and back keeps it (this session)
      const layer = this.d.terrain.layers.find((l: LayerMeta) => l.id === calib.layerId);
      if (layer) {
        layer.center_px = [s.cx, s.cy];
        layer.scale = s.scale;
      }
      this.d.rebuild();
    }
    // restore units
    calib.showHeroes = this.saved.heroes;
    calib.showCreeps = this.saved.creeps;
    calib.showBuildings = this.saved.buildings;
    this.d.rebuild();
    this.done(s);
  }

  private prompt() {
    this.ensureOverlay();
    this.overlay!.innerHTML =
      `<b>Calibration wizard</b><br>Click the <span style="color:#e6b24c">${this.refs[this.i].label}</span> on the map.` +
      `<br><span style="color:#8b96a1">${this.i + 1} / ${this.refs.length} · Esc to cancel</span>`;
  }

  private done(s: ReturnType<typeof solve>) {
    this.ensureOverlay();
    if (s) {
      this.overlay!.innerHTML =
        `<b>Calibrated ✓</b><br>Save to <code>layers.json</code> for "${calib.layerId}":<br>` +
        `<code style="color:#8fe39c">"center_px": [${Math.round(s.cx)}, ${Math.round(s.cy)}], "scale": ${s.scale.toFixed(4)}</code>` +
        `<br><span style="color:#8b96a1">press any key to close</span>`;
      window.addEventListener("keydown", this.close, { once: true });
    } else {
      this.toast("Calibration failed — points too close. Retry.");
    }
  }

  private ensureOverlay() {
    if (this.overlay) return;
    this.overlay = document.createElement("div");
    this.overlay.style.cssText =
      "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,14,20,.95);" +
      "border:1px solid #54bccb;border-radius:10px;padding:16px 22px;font:13px ui-monospace,monospace;" +
      "color:#d6dee7;z-index:60;text-align:center;pointer-events:none;box-shadow:0 20px 60px -12px #000;";
    document.body.appendChild(this.overlay);
    window.addEventListener("keydown", this.onEsc);
  }

  private onEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") this.close();
  };

  private close = () => {
    this.d.dom.removeEventListener("pointerup", this.onClick);
    window.removeEventListener("keydown", this.onEsc);
    this.d.cam.paused = false;
    this.overlay?.remove();
    this.overlay = undefined;
  };

  private toast(msg: string) {
    this.ensureOverlay();
    this.overlay!.textContent = msg;
    setTimeout(() => this.close(), 2200);
  }
}

// Least-squares solve of (cx, cy, scale) from samples where pu = cx + wx*scale, pv = cy - wy*scale.
function solve(pts: Sample[]): { cx: number; cy: number; scale: number } | null {
  const n = pts.length;
  if (n < 2) return null;
  let sx = 0, sy = 0, sxx = 0, syy = 0, spu = 0, spv = 0, sxpu = 0, sypv = 0;
  for (const p of pts) {
    sx += p.wx; sy += p.wy; sxx += p.wx * p.wx; syy += p.wy * p.wy;
    spu += p.pu; spv += p.pv; sxpu += p.wx * p.pu; sypv += p.wy * p.pv;
  }
  // A [cx cy s]^T = b
  const A = [
    [n, 0, sx],
    [0, n, -sy],
    [sx, -sy, sxx + syy],
  ];
  const b = [spu, spv, sxpu - sypv];
  const x = solve3(A, b);
  if (!x || !isFinite(x[2]) || Math.abs(x[2]) < 1e-9) return null;
  return { cx: x[0], cy: x[1], scale: x[2] };
}

function solve3(A: number[][], b: number[]): number[] | null {
  const det = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const d = det(A);
  if (Math.abs(d) < 1e-9) return null;
  const col = (j: number) => A.map((row, i) => row.map((v, k) => (k === j ? b[i] : v)));
  return [det(col(0)) / d, det(col(1)) / d, det(col(2)) / d];
}
