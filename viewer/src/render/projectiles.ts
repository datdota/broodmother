// Renders tracking projectiles (ranged attacks + tracking abilities) as small glowing billboards that fly from
// the launching unit toward the target's current position at the given speed, removed on arrival or when the
// server destroys them. Dota's real projectile visuals are .vpcf particles (which don't port to three.js), so
// this is a faithful stand-in: a colored additive sprite + a short fading trail.

import * as THREE from "three";
import type { InterpWorld, } from "../world/snapshot.js";
import type { ProjectileState } from "../world/types.js";
import { toScene } from "../coords.js";

const HEIGHT = 90; // world units above ground the projectile flies at (roughly unit chest height)
const ARRIVE = 60; // within this world distance of the target, the projectile has "hit"

interface Live {
  sprite: THREE.Sprite;
  target: number; // target unit handle (0 = fixed point)
  tx: number;
  ty: number;
  speed: number;
  pos: THREE.Vector3; // current scene position
  linear: boolean;
  dirX: number; // linear: unit direction in scene space
  dirZ: number;
  remaining: number; // linear: distance left to travel (world units)
}

function makeTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.7)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface Ring { mesh: THREE.Mesh; age: number; life: number; base: number; }
interface FloatText { sprite: THREE.Sprite; age: number; life: number; }

function makeTextTexture(text: string, color: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.font = "bold 92px system-ui, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.lineWidth = 8;
  g.strokeStyle = "rgba(0,0,0,0.9)";
  g.strokeText(text, 64, 68);
  g.fillStyle = color;
  g.fillText(text, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class ProjectileLayer {
  readonly group = new THREE.Group();
  private live = new Map<number, Live>();
  private tex = makeTexture();
  private rings: Ring[] = [];
  private ringGeo = new THREE.RingGeometry(0.72, 1, 40);
  private texts: FloatText[] = [];
  private textTex = new Map<string, THREE.Texture>();

  /** Float a small symbol (last-hit "$" / deny "!") at a world-scene position; rises + fades. */
  floatText(text: string, pos: THREE.Vector3, color: string): void {
    const key = `${text}|${color}`;
    let tex = this.textTex.get(key);
    if (!tex) { tex = makeTextTexture(text, color); this.textTex.set(key, tex); }
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
    sprite.scale.set(75, 75, 75);
    sprite.position.copy(pos);
    sprite.renderOrder = 30;
    this.group.add(sprite);
    this.texts.push({ sprite, age: 0, life: 1.1 });
  }

  /** @param posOf scene ground position of a unit by handle (from the UnitLayer). */
  constructor(private posOf: (handle: number) => THREE.Vector3 | undefined) {
    this.group.renderOrder = 20;
  }

  /** A brief expanding ground ring — a stand-in for a spell-cast particle burst (Dota .vpcf don't port). */
  castFlash(pos: THREE.Vector3, color = 0x8fd7ff): void {
    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    const mesh = new THREE.Mesh(this.ringGeo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(pos.x, pos.y + 6, pos.z);
    const base = 45;
    mesh.scale.setScalar(base);
    this.group.add(mesh);
    this.rings.push({ mesh, age: 0, life: 0.55, base });
  }

  spawn(p: ProjectileState): void {
    if (this.live.has(p.handle)) return;
    // linear skillshots start at their origin; tracking ones at the source unit (fall back to target if unseen)
    const from = p.linear
      ? sceneVec(p.originX, p.originY)
      : this.posOf(p.source) ?? (p.target ? this.posOf(p.target) : undefined) ?? sceneVec(p.targetX, p.targetY);
    const mat = new THREE.SpriteMaterial({
      map: this.tex,
      color: p.isAttack ? 0xffe6a8 : p.linear ? 0xff9d6b : 0x8fd7ff, // attack=warm, skillshot=orange, ability=cyan
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    const s = p.isAttack ? 55 : p.linear ? 100 : 85;
    sprite.scale.set(s, s, s);
    const pos = new THREE.Vector3(from.x, HEIGHT, from.z);
    sprite.position.copy(pos);
    this.group.add(sprite);
    // scene direction: world +Y maps to scene -Z, so velocity (vx,vy) -> (vx, -vy)
    const len = Math.hypot(p.velX, p.velY) || 1;
    this.live.set(p.handle, {
      sprite, target: p.target, tx: p.targetX, ty: p.targetY, speed: Math.max(300, p.speed), pos,
      linear: p.linear, dirX: p.velX / len, dirZ: -p.velY / len, remaining: p.distance || 2000,
    });
  }

  destroy(handle: number): void {
    const l = this.live.get(handle);
    if (!l) return;
    this.remove(l, handle);
  }

  private remove(l: Live, handle: number): void {
    this.group.remove(l.sprite);
    (l.sprite.material as THREE.SpriteMaterial).dispose();
    this.live.delete(handle);
  }

  update(_world: InterpWorld, dt: number): void {
    const step = dt / 1000;
    for (const [handle, l] of this.live) {
      const travel = l.speed * step;
      if (l.linear) {
        l.pos.x += l.dirX * travel;
        l.pos.z += l.dirZ * travel;
        l.remaining -= travel;
        if (l.remaining <= 0) { this.remove(l, handle); continue; }
      } else {
        const tgt = l.target ? this.posOf(l.target) : undefined;
        const dest = tgt ? new THREE.Vector3(tgt.x, HEIGHT, tgt.z) : sceneVec(l.tx, l.ty).setY(HEIGHT);
        const dir = dest.clone().sub(l.pos);
        const dist = dir.length();
        if (dist <= ARRIVE) { this.remove(l, handle); continue; }
        dir.multiplyScalar(Math.min(1, travel / dist));
        l.pos.add(dir);
      }
      l.sprite.position.copy(l.pos);
    }
    // cast-flash rings: expand + fade, then dispose
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.age += step;
      const t = r.age / r.life;
      if (t >= 1) {
        this.group.remove(r.mesh);
        (r.mesh.material as THREE.Material).dispose();
        this.rings.splice(i, 1);
        continue;
      }
      r.mesh.scale.setScalar(r.base * (1 + t * 2.6));
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.75 * (1 - t);
    }
    // floating last-hit/deny symbols: rise and fade
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const ft = this.texts[i];
      ft.age += step;
      const t = ft.age / ft.life;
      if (t >= 1) {
        this.group.remove(ft.sprite);
        (ft.sprite.material as THREE.Material).dispose();
        this.texts.splice(i, 1);
        continue;
      }
      ft.sprite.position.y += 90 * step;
      (ft.sprite.material as THREE.SpriteMaterial).opacity = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
    }
  }
}

function sceneVec(wx: number, wy: number): THREE.Vector3 {
  const [x, y, z] = toScene(wx, wy, 0);
  return new THREE.Vector3(x, y, z);
}
