// Primitive unit views, one per stable handle, pooled and diffed each frame. Shape encodes type (capsule hero,
// cylinder creep, box building, cone ward, big-capsule roshan), team encodes color, a flattened ground ring
// shows facing/selection, and a billboarded bar shows HP. This is the swappable seam: a GltfUnitView replaces
// the primitive body in Phase E without touching the layer or the scene.

import * as THREE from "three";
import { UnitType, RADIANT, DIRE, isAlive, type UnitState } from "../world/types.js";
import type { InterpWorld } from "../world/snapshot.js";
import { toScene, yawToSceneRotation } from "../coords.js";
import { instanceModel } from "./models.js";
import { modelFor, type ModelSpec, type ModelKind } from "../assets/manifest.js";
import { calib, yawOffsetRad } from "../calib.js";
import { dlog } from "../debuglog.js";

const RADIANT_C = 0x63c46e;
const DIRE_C = 0xe35d54;
const NEUTRAL_C = 0x9aa4ae;
const CYAN = 0x54bccb;

function scaleForKind(kind: ModelKind): number {
  return kind === "hero" || kind === "ward" ? calib.heroScale : calib.buildingScale;
}

function categoryShown(type: number): boolean {
  if (type === UnitType.HERO || type === UnitType.ILLUSION) return calib.showHeroes;
  if (type === UnitType.CREEP || type === UnitType.NEUTRAL || type === UnitType.COURIER) return calib.showCreeps;
  if (type === UnitType.BUILDING) return calib.showBuildings;
  return true;
}

interface Spec {
  geom: THREE.BufferGeometry;
  y: number; // body centre height above the unit's ground point
  top: number; // body top, for the HP bar
  ring: number; // facing/selection ground-ring radius (0 = none)
  barW: number;
}

const G = {
  hero: new THREE.CapsuleGeometry(30, 120, 6, 16),
  creep: new THREE.CylinderGeometry(17, 22, 66, 12),
  neutral: new THREE.CylinderGeometry(22, 27, 78, 12),
  courier: new THREE.CylinderGeometry(11, 14, 34, 10),
  ward: new THREE.ConeGeometry(26, 96, 12),
  tower: new THREE.BoxGeometry(150, 300, 150),
  fort: new THREE.BoxGeometry(320, 460, 320),
  roshan: new THREE.CapsuleGeometry(58, 110, 6, 16),
};

function spec(type: number): Spec {
  switch (type) {
    case UnitType.HERO:
    case UnitType.ILLUSION:
      return { geom: G.hero, y: 90, top: 180, ring: 48, barW: 120 };
    case UnitType.CREEP:
      return { geom: G.creep, y: 33, top: 66, ring: 0, barW: 74 };
    case UnitType.NEUTRAL:
      return { geom: G.neutral, y: 39, top: 78, ring: 0, barW: 84 };
    case UnitType.COURIER:
      return { geom: G.courier, y: 17, top: 34, ring: 0, barW: 60 };
    case UnitType.WARD_OBS:
    case UnitType.WARD_SEN:
      return { geom: G.ward, y: 48, top: 96, ring: 0, barW: 70 };
    case UnitType.BUILDING:
      return { geom: G.tower, y: 150, top: 300, ring: 0, barW: 190 };
    case UnitType.ROSHAN:
      return { geom: G.roshan, y: 113, top: 226, ring: 78, barW: 170 };
    default:
      return { geom: G.creep, y: 33, top: 66, ring: 0, barW: 74 };
  }
}

const matCache = new Map<number, THREE.MeshStandardMaterial>();
function material(color: number): THREE.MeshStandardMaterial {
  let m = matCache.get(color);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.5,
      metalness: 0.1,
      emissive: new THREE.Color(color).multiplyScalar(0.22), // slight self-glow so units read on dark ground
    });
    matCache.set(color, m);
  }
  return m;
}

function bodyColor(u: UnitState): number {
  if (u.type === UnitType.ROSHAN) return 0x6b5a3a;
  if (u.type === UnitType.WARD_OBS) return 0x3f9f5a;
  if (u.type === UnitType.WARD_SEN) return 0xc46ec4;
  const team = u.team === RADIANT ? RADIANT_C : u.team === DIRE ? DIRE_C : NEUTRAL_C;
  if (u.type === UnitType.BUILDING) return darken(team, 0.55);
  return team;
}

function teamColor(u: UnitState): number {
  return u.team === RADIANT ? RADIANT_C : u.team === DIRE ? DIRE_C : NEUTRAL_C;
}

function darken(c: number, f: number): number {
  const r = ((c >> 16) & 255) * f, g = ((c >> 8) & 255) * f, b = (c & 255) * f;
  return (r << 16) | (g << 8) | b;
}

class UnitView {
  group = new THREE.Group();
  body: THREE.Mesh;
  private ring?: THREE.Group;
  private hpBg?: THREE.Mesh;
  private hpFill?: THREE.Mesh;
  private barW: number;
  private barTop: number;
  private modelRoot?: THREE.Object3D;
  private modelObj?: THREE.Object3D;
  private modelKind: ModelKind = "hero";
  private baseMinY = 0;
  private baseMaxY = 0;
  private baseCenterX = 0;
  private baseCenterZ = 0;
  private rootYShift = 0;
  private mixer?: THREE.AnimationMixer;
  private actIdle?: THREE.AnimationAction;
  private actRun?: THREE.AnimationAction;
  private actAttack?: THREE.AnimationAction;
  private attacking = false;
  private lastWX = 0;
  private lastWY = 0;
  private haveLastPos = false;
  private modelTried = false;
  private visible = false;
  type: number;

  /** Diagnostics for the entities window: is a real glTF model loaded, and is the view currently drawn. */
  get renderInfo(): { hasModel: boolean; visible: boolean } {
    return { hasModel: !!this.modelRoot, visible: this.visible };
  }

  constructor(u: UnitState) {
    const s = spec(u.type);
    this.type = u.type;
    this.barW = s.barW;
    this.barTop = s.top;
    this.group.userData.handle = u.handle; // pick target (recursive) for both primitive and model
    this.body = new THREE.Mesh(s.geom, material(bodyColor(u)));
    this.body.position.y = s.y;
    this.group.add(this.body);

    if (s.ring) this.ring = this.makeRing(s.ring);
    this.makeBar();
  }

  /** Load the extracted glTF model behind the primitive (once). On success the primitive body is hidden. */
  ensureModel(ms: ModelSpec) {
    if (this.modelTried) return;
    this.modelTried = true;
    this.modelKind = ms.kind;
    instanceModel(ms.path)
      .then(({ root: m, mixer, baseBox, actions, rootYShift }) => {
        this.rootYShift = ms.kind === "ward" ? 0 : rootYShift;
        // VRF exports the ward prop lying on its X-axis; stand it up (+90° about Z) BEFORE measuring bounds
        // so seating (baseMinY) is computed against the upright model.
        let box = baseBox;
        if (ms.kind === "ward") {
          m.rotation.z = Math.PI / 2;
          m.updateMatrixWorld(true);
          box = new THREE.Box3().setFromObject(m);
        }
        // Seat + PIVOT on the BASE body's bounds only (not the full assembly): a mis-bound cosmetic part can
        // fling the assembly bbox far off-origin, which made e.g. hoodwink orbit a distant pivot ("on a rope").
        this.baseMinY = box.min.y;
        this.baseMaxY = box.max.y;
        this.baseCenterX = (box.min.x + box.max.x) / 2;
        this.baseCenterZ = (box.min.z + box.max.z) / 2;
        // Wisp's model is near fully transparent (energy being) so it's invisible in the scene. Make his own
        // meshes opaque + emissive and wrap him in a soft additive glow so he reads as a bright orb.
        if (ms.path.includes("/heroes/wisp/")) {
          m.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (!mesh.isMesh) return;
            for (const mat of (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) as THREE.MeshStandardMaterial[]) {
              if (!mat) continue;
              mat.transparent = false;
              mat.opacity = 1;
              mat.depthWrite = true;
              if (mat.emissive) { mat.emissive.setHex(0x66d9ff); mat.emissiveIntensity = 0.9; }
            }
          });
          const sz = box.getSize(new THREE.Vector3());
          const r = Math.max(sz.x, sz.y, sz.z) * 0.55;
          const aura = new THREE.Mesh(
            new THREE.SphereGeometry(r, 20, 16),
            new THREE.MeshBasicMaterial({ color: 0x7fe0ff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }),
          );
          aura.position.set((box.min.x + box.max.x) / 2, (box.min.y + box.max.y) / 2, (box.min.z + box.max.z) / 2);
          m.add(aura);
        }
        m.traverse((o) => { if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true; });
        const holder = new THREE.Group();
        holder.add(m);
        this.modelObj = m;
        this.modelRoot = holder;
        this.mixer = mixer;
        this.actIdle = actions.idle;
        this.actRun = actions.run;
        this.actAttack = actions.attack;
        if (this.actAttack) {
          this.actAttack.setLoop(THREE.LoopOnce, 1);
          this.actAttack.clampWhenFinished = true;
        }
        if (mixer) {
          mixer.addEventListener("finished", (ev: { action: THREE.AnimationAction }) => {
            if (ev.action === this.actAttack) {
              this.attacking = false;
              this.actAttack!.stop();
            }
          });
        }
        this.body.visible = false;
        this.group.add(holder);
      })
      .catch((err) => {
        // model failed to load (missing/corrupt glb) — keep the primitive, but surface it in the diagnostics log
        dlog("error", `model failed to load: ${ms.path}${err?.message ? ` (${err.message})` : ""}`);
      });
  }

  private makeRing(r: number): THREE.Group {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 8, r, 28),
      new THREE.MeshBasicMaterial({ color: NEUTRAL_C, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 6;
    // facing notch pointing +X (yaw 0)
    const notch = new THREE.Mesh(
      new THREE.ConeGeometry(r * 0.32, r * 0.7, 3),
      new THREE.MeshBasicMaterial({ color: NEUTRAL_C, transparent: true, opacity: 0.9, depthWrite: false }),
    );
    notch.rotation.z = -Math.PI / 2;
    notch.position.set(r + 12, 6, 0);
    g.add(ring, notch);
    this.group.add(g);
    return g;
  }

  private makeBar() {
    const h = 14;
    this.hpBg = new THREE.Mesh(
      new THREE.PlaneGeometry(this.barW + 8, h + 8),
      new THREE.MeshBasicMaterial({ color: 0x05080c, transparent: true, opacity: 0.7, depthTest: false }),
    );
    this.hpFill = new THREE.Mesh(
      new THREE.PlaneGeometry(this.barW, h),
      new THREE.MeshBasicMaterial({ color: RADIANT_C, depthTest: false }),
    );
    this.hpBg.renderOrder = 10;
    this.hpFill.renderOrder = 11;
    this.group.add(this.hpBg, this.hpFill);
  }

  update(u: UnitState, groundY: number, selected: boolean, camQuat: THREE.Quaternion, dt: number) {
    const [x, , z] = toScene(u.x, u.y, 0);
    this.group.position.set(x, groundY, z);

    // true facing from yaw (0°=east, CCW). The ground ring notch points +X (= facing 0), so it uses this
    // directly; the model gets an extra offset for its glTF-forward (-Z) convention.
    const facing = yawToSceneRotation(u.yaw);
    const alive = isAlive(u);
    const shown = categoryShown(u.type);
    this.visible = alive && shown;
    this.body.visible = alive && shown && !this.modelRoot;
    if (this.modelRoot && this.modelObj) {
      const f = scaleForKind(this.modelKind) * (u.modelScale || 1);
      this.modelObj.scale.setScalar(f);
      // seat base on ground (Y, incl. the idle root-Y shift for floating rigs) and center the body over the
      // unit (X/Z) so it rotates about its own center
      this.modelObj.position.set(-this.baseCenterX * f, -(this.baseMinY + this.rootYShift) * f, -this.baseCenterZ * f);
      this.barTop = this.baseMaxY * f;
      this.modelRoot.visible = alive && shown;
      this.modelRoot.rotation.y = facing + yawOffsetRad();
    }
    // animate heroes/illusions (full idle+run+attack) and neutrals/roshan (idle only — few alive at once).
    // lane creeps are skipped: hundreds of mixers would cost too much.
    const animated = u.type === UnitType.HERO || u.type === UnitType.ILLUSION
      || u.type === UnitType.NEUTRAL || u.type === UnitType.ROSHAN || u.type === UnitType.COURIER;
    if (this.mixer && animated) {
      // attack (m_NetworkActivity 1503/1504): play the attack clip once, replaying while still attacking
      const isAttack = u.activity === 1503 || u.activity === 1504;
      if (isAttack && !this.attacking && this.actAttack) {
        this.attacking = true;
        this.actAttack.reset();
        this.actAttack.setEffectiveWeight(1);
        this.actAttack.play();
      }
      if (this.attacking) {
        this.actIdle?.setEffectiveWeight(0);
        this.actRun?.setEffectiveWeight(0);
      } else {
        this.actAttack?.setEffectiveWeight(0);
        // blend idle<->run by ground speed (world units/sec) from the interpolated position delta
        if (this.actIdle && this.actRun && dt > 0) {
          const speed = this.haveLastPos ? Math.hypot(u.x - this.lastWX, u.y - this.lastWY) / (dt / 1000) : 0;
          const t = Math.max(0, Math.min(1, (speed - 50) / 150));
          this.actRun.setEffectiveWeight(t);
          this.actIdle.setEffectiveWeight(1 - t);
        }
      }
      this.lastWX = u.x;
      this.lastWY = u.y;
      this.haveLastPos = true;
      this.mixer.update(dt / 1000);
    }

    if (this.ring) {
      this.ring.visible = alive && shown;
      this.ring.rotation.y = facing; // notch points +X = true facing (0°)

      const rc = selected ? CYAN : teamColor(u);
      (this.ring.children as THREE.Mesh[]).forEach((m) => ((m.material as THREE.MeshBasicMaterial).color.setHex(rc)));
    }

    // HP bar: billboard + width by fraction
    const frac = u.maxHp > 0 ? Math.max(0, Math.min(1, u.hp / u.maxHp)) : 0;
    const showBar = alive && shown && u.maxHp > 0;
    if (this.hpBg && this.hpFill) {
      this.hpBg.visible = this.hpFill.visible = showBar;
      if (showBar) {
        const barY = this.barTop + 60;
        this.hpBg.position.set(0, barY, 0);
        this.hpFill.position.set(-this.barW / 2 + (this.barW * frac) / 2, barY, 1);
        this.hpFill.scale.x = frac;
        (this.hpFill.material as THREE.MeshBasicMaterial).color.setHex(u.team === DIRE ? DIRE_C : RADIANT_C);
        this.hpBg.quaternion.copy(camQuat);
        this.hpFill.quaternion.copy(camQuat);
      }
    }
  }

  dispose() {
    this.group.removeFromParent();
    this.ring?.children.forEach((m) => (m as THREE.Mesh).geometry.dispose());
    this.hpBg?.geometry.dispose();
    this.hpFill?.geometry.dispose();
  }
}

export class UnitLayer {
  readonly group = new THREE.Group();
  private views = new Map<number, UnitView>();

  constructor(private heightAt: (wx: number, wy: number) => number) {}

  update(world: InterpWorld, camera: THREE.Camera, selectedHandle: number | null, dt: number) {
    const seen = new Set<number>();
    for (const u of world.units) {
      seen.add(u.handle);
      let v = this.views.get(u.handle);
      if (!v || v.type !== u.type) {
        v?.dispose();
        v = new UnitView(u);
        this.views.set(u.handle, v);
        this.group.add(v.group);
      }
      const ms = modelFor(u);
      if (ms) v.ensureModel(ms);
      v.update(u, this.heightAt(u.x, u.y), u.handle === selectedHandle, camera.quaternion, dt);
    }
    for (const [h, v] of this.views) {
      if (!seen.has(h)) {
        v.dispose();
        this.views.delete(h);
      }
    }
  }

  pickables(): THREE.Object3D[] {
    return [...this.views.values()].map((v) => v.group);
  }

  scenePos(handle: number): THREE.Vector3 | undefined {
    return this.views.get(handle)?.group.position.clone();
  }

  /** Per-handle render state for the entities window: is a real model loaded, and is it currently drawn. */
  renderInfo(handle: number): { hasModel: boolean; visible: boolean } | undefined {
    return this.views.get(handle)?.renderInfo;
  }
}
