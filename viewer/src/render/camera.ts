// Dota camera rig: a fixed-pitch perspective camera that pans over the map, zooms by dolly, and can lock-follow
// a clicked unit. Never a free-fly camera — pitch and yaw are constant, only the ground target and distance move.

import * as THREE from "three";

const PITCH = (57 * Math.PI) / 180; // above horizontal, matching the real client
const MIN_D = 1400;
const MAX_D = 15000;
const BOUND = 9000; // keep the target on the map
const PAN_K = 0.0014; // world units panned per screen-px per unit of distance (feels constant at any zoom)
const KEY_SPEED = 1.4;

export interface CameraOpts {
  pickables: () => THREE.Object3D[];
  posOf: (handle: number) => THREE.Vector3 | undefined;
  onSelect: (handle: number | null) => void;
}

const SMOOTH_TAU = 130; // ms; camera eases toward its goal target (glides when following / recentering)

export class DotaCamera {
  paused = false; // the calibration wizard takes over pointer input while true
  private target = new THREE.Vector3(0, 0, 0); // goal center
  private smoothT = new THREE.Vector3(0, 0, 0); // rendered center, eased toward target
  private distance = 9000;
  private follow: number | null = null;
  private keys = new Set<string>();
  private dragging = false;
  private moved = 0;
  private lastX = 0;
  private lastY = 0;

  constructor(
    private camera: THREE.PerspectiveCamera,
    private dom: HTMLElement,
    private raycaster: THREE.Raycaster,
    private opts: CameraOpts,
  ) {
    dom.addEventListener("pointerdown", this.onDown);
    dom.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    dom.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", (e) => this.keys.add(e.key.toLowerCase()));
    window.addEventListener("keyup", (e) => this.keys.delete(e.key.toLowerCase()));
  }

  followHandle(): number | null {
    return this.follow;
  }

  /** Lock-follow a specific unit (used by HUD portrait / scoreboard clicks). */
  focus(handle: number | null): void {
    this.follow = handle;
    this.opts.onSelect(handle);
  }

  /** Recenter the camera on a world (wx, wy) point without following a unit (minimap click). */
  moveTo(wx: number, wy: number): void {
    this.follow = null;
    this.target.x = wx;
    this.target.z = -wy; // world +Y maps to scene -Z (see coords.ts)
    this.clampTarget();
  }

  /** The ground point the camera is centered on, as world (wx, wy) — for the minimap viewport box. Uses the
   *  smoothed (rendered) center so the box tracks what's actually on screen. */
  targetWorld(): { x: number; y: number } {
    return { x: this.smoothT.x, y: -this.smoothT.z };
  }

  private clampTarget() {
    this.target.x = Math.max(-BOUND, Math.min(BOUND, this.target.x));
    this.target.z = Math.max(-BOUND, Math.min(BOUND, this.target.z));
  }

  private onDown = (e: PointerEvent) => {
    if (this.paused) return;
    this.dragging = true;
    this.moved = 0;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  private onMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.moved += Math.abs(dx) + Math.abs(dy);
    // grab-the-world pan: drag moves the map under the cursor, scaled by distance so it feels constant on screen
    const k = PAN_K * this.distance;
    this.target.x -= dx * k;
    this.target.z -= dy * k;
    this.follow = null; // manual pan releases follow
    this.clampTarget();
    this.smoothT.copy(this.target); // grab-the-world drag stays 1:1 (no easing lag under the cursor)
  };

  private onUp = (e: PointerEvent) => {
    if (this.dragging && this.moved < 6) this.pick(e);
    this.dragging = false;
  };

  private onWheel = (e: WheelEvent) => {
    if (this.paused) return;
    e.preventDefault();
    this.distance = Math.max(MIN_D, Math.min(MAX_D, this.distance * (1 + Math.sign(e.deltaY) * 0.12)));
  };

  private pick(e: PointerEvent) {
    const r = this.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.opts.pickables(), true);
    // hit may be a nested model mesh — walk up to the unit group that carries the handle
    let handle: number | undefined;
    for (let o: THREE.Object3D | null = hits[0]?.object ?? null; o; o = o.parent) {
      if (typeof o.userData.handle === "number") {
        handle = o.userData.handle;
        break;
      }
    }
    this.follow = handle ?? null;
    this.opts.onSelect(this.follow);
  }

  update(dt: number) {
    // keyboard pan
    const k = KEY_SPEED * this.distance * dt * 0.001;
    // NOTE: 's' is reserved for the scoreboard toggle, so vertical pan is arrows + w only (down = arrowdown).
    if (this.keys.has("w") || this.keys.has("arrowup")) { this.target.z -= k; this.follow = null; }
    if (this.keys.has("arrowdown")) { this.target.z += k; this.follow = null; }
    if (this.keys.has("a") || this.keys.has("arrowleft")) { this.target.x -= k; this.follow = null; }
    if (this.keys.has("d") || this.keys.has("arrowright")) { this.target.x += k; this.follow = null; }

    if (this.follow != null) {
      const p = this.opts.posOf(this.follow);
      if (p) {
        this.target.x = p.x;
        this.target.z = p.z;
      }
    }
    this.clampTarget();

    // Ease the rendered center toward the goal (frame-rate independent) so following a unit / recentering glides
    // instead of snapping. Direct drag already keeps smoothT == target, so panning stays crisp.
    const a = 1 - Math.exp(-dt / SMOOTH_TAU);
    this.smoothT.x += (this.target.x - this.smoothT.x) * a;
    this.smoothT.z += (this.target.z - this.smoothT.z) * a;

    const off = new THREE.Vector3(0, this.distance * Math.sin(PITCH), this.distance * Math.cos(PITCH));
    this.camera.position.copy(this.smoothT).add(off);
    this.camera.lookAt(this.smoothT);
  }
}
