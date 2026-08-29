// Loads extracted glTF (.glb) models once and hands out clones. Multi-part heroes (base body + separate
// head/weapon/armour models listed in /models/manifest.json) are assembled PER INSTANCE and best-effort: the
// textured base always renders, and each part's skinned mesh is cloned and bonemerged onto that instance's
// bones (rebound by matching bone names). A failing part is skipped — it never loses the hero. The base idle
// animation drives the whole assembly.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { bannedParts } from "../blacklist.js";
import { assetUrl } from "../config.js";

const loader = new GLTFLoader();
const baseCache = new Map<string, Promise<{ scene: THREE.Object3D; clips: THREE.AnimationClip[] }>>();
const partCache = new Map<string, Promise<THREE.Object3D>>();
let manifestPromise: Promise<Record<string, string[]>> | null = null;

/** Drop cached base/part gltfs so their GPU resources can be freed (used by the gallery between batches). */
export function clearModelCache(): void {
  baseCache.clear();
  partCache.clear();
}

function manifest(): Promise<Record<string, string[]>> {
  if (!manifestPromise) {
    manifestPromise = fetch(assetUrl("/models/manifest.json")).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  }
  return manifestPromise;
}

// Index-aligned with manifest: part_names[hero][i] is the original basename of manifest[hero][i].
let partNamesPromise: Promise<Record<string, string[]>> | null = null;
function partNames(): Promise<Record<string, string[]>> {
  if (!partNamesPromise) {
    partNamesPromise = fetch(assetUrl("/models/part_names.json")).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  }
  return partNamesPromise;
}

// hero -> part basenames to EXCLUDE from assembly: the committed part_blacklist.json merged with the hero
// explorer's live localStorage overrides (see ./blacklist), so a gallery toggle takes effect on reload with no
// manual JSON editing or re-extract.

function loadBase(path: string) {
  let p = baseCache.get(path);
  if (!p) {
    p = loader.loadAsync(assetUrl(path)).then((g) => ({ scene: g.scene, clips: g.animations }));
    baseCache.set(path, p);
  }
  return p;
}

function loadPart(url: string) {
  let p = partCache.get(url);
  if (!p) {
    p = loader.loadAsync(assetUrl(url)).then((g) => g.scene);
    partCache.set(url, p);
  }
  return p;
}

function bonesByName(root: THREE.Object3D): Map<string, THREE.Bone> {
  const map = new Map<string, THREE.Bone>();
  root.traverse((o) => {
    if ((o as THREE.Bone).isBone) map.set(o.name, o as THREE.Bone);
  });
  return map;
}

export interface ModelActions {
  idle?: THREE.AnimationAction;
  run?: THREE.AnimationAction;
  attack?: THREE.AnimationAction;
}

export interface ModelInstance {
  root: THREE.Object3D;
  mixer?: THREE.AnimationMixer;
  /** Native (pre-scale) bounds of the BASE body only — used to seat + center the model. A mis-bound cosmetic
   *  part can fling the full-assembly bbox far from origin (hoodwink "swung on a rope"), so seating/pivot must
   *  come from the base body, never the whole assembly. */
  baseBox: THREE.Box3;
  /** Kept clips categorized for the client to blend idle<->run by speed (+ trigger attack). */
  actions: ModelActions;
  /** How far the idle clip moves the root bone vertically off its bind pose. baseBox is measured at bind, so
   *  seating must add this or a floating rig (e.g. oracle, root bind Y=3.8 but clip ~3.2) ends up under the map. */
  rootYShift: number;
}

export async function instanceModel(path: string): Promise<ModelInstance> {
  const { scene, clips } = await loadBase(path);
  const root = skeletonClone(scene); // textured base — this is what always renders
  root.updateMatrixWorld(true);
  const baseBox = new THREE.Box3().setFromObject(root); // BASE-only bounds, before parts are merged in

  // best-effort assembly of extra body parts onto this instance's skeleton
  const dir = path.slice(0, path.lastIndexOf("/"));
  const hero = dir.slice(dir.lastIndexOf("/") + 1);
  const allParts = (await manifest())[hero] ?? [];
  const names = (await partNames())[hero] ?? [];
  const banned = await bannedParts(hero);
  // Drop blacklisted parts (matched by their original basename, index-aligned with the manifest).
  const parts = allParts.filter((_, i) => !banned.has(names[i]));
  if (parts.length) {
    const bones = bonesByName(root);
    const rootBone = [...bones.values()][0]; // fallback for bones a part has that the base lacks
    for (const file of parts) {
      try {
        const partScene = skeletonClone(await loadPart(`${dir}/${file}`));
        const meshes: THREE.SkinnedMesh[] = [];
        partScene.traverse((o) => {
          if ((o as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(o as THREE.SkinnedMesh);
        });
        for (const mesh of meshes) {
          // Rebind every bone to the base skeleton; bones the base lacks (e.g. hair/cloth sim bones) fall back
          // to the base root so they follow the unit instead of stretching from (0,0) — parts stay attached.
          const rebound = mesh.skeleton.bones.map((b) => bones.get(b.name) ?? rootBone);
          mesh.bind(new THREE.Skeleton(rebound, mesh.skeleton.boneInverses), mesh.bindMatrix);
          mesh.frustumCulled = false;
          root.add(mesh); // reparent onto the base; skinning follows the shared bones
        }
      } catch {
        /* skip a broken/incompatible part — base still renders */
      }
    }
  }

  if (clips.length === 0) return { root, baseBox, actions: {}, rootYShift: 0 };
  // The optimizer keeps ~one idle/run/attack clip each; categorize by name (attack > run > idle to disambiguate
  // names like "attack_idle"). idle+run play continuously and the client blends them by speed.
  const mixer = new THREE.AnimationMixer(root);
  const actions: ModelActions = {};
  let idleClip: THREE.AnimationClip | null = null;
  for (const clip of clips) {
    const n = clip.name.toLowerCase();
    const cat: keyof ModelActions = n.includes("attack") ? "attack" : n.includes("run") || n.includes("walk") ? "run" : "idle";
    if (actions[cat]) continue;
    if (cat === "idle") idleClip = clip; // original (pre-recenter) — for the root-Y seating shift
    actions[cat] = mixer.clipAction(recenterRootMotion(clip));
  }
  const rootYShift = computeRootYShift(idleClip, root);
  actions.idle?.play();
  actions.run?.play();
  if (actions.idle && actions.run) { actions.idle.setEffectiveWeight(1); actions.run.setEffectiveWeight(0); }
  else if (actions.idle) actions.idle.setEffectiveWeight(1);
  else if (actions.run) actions.run.setEffectiveWeight(1);
  return { root, mixer, baseBox, actions, rootYShift };
}

// Mean vertical offset the idle clip applies to the root/pelvis bone, relative to its bind translation. baseBox
// is measured at bind pose, so seating adds this to keep floating rigs (root bind Y ≠ animated Y) on the ground.
function computeRootYShift(idleClip: THREE.AnimationClip | null, root: THREE.Object3D): number {
  if (!idleClip) return 0;
  for (const track of idleClip.tracks) {
    if (!/(pelvis|root)[^.]*\.position$/i.test(track.name)) continue;
    const node = root.getObjectByName(track.name.slice(0, track.name.lastIndexOf(".")));
    if (!node) continue;
    const v = track.values as unknown as Float32Array;
    let sy = 0;
    const n = v.length / 3;
    for (let i = 1; i < v.length; i += 3) sy += v[i];
    return sy / n - node.position.y;
  }
  return 0;
}

// Play every clip IN PLACE: the unit's world position comes from the server, so any horizontal translation baked
// into the root/pelvis bone is wrong. Two failure modes it causes: a constant offset draws the mesh far off the
// unit ("on a rope", e.g. hoodwink's debut idle at x=45,z=-20); a per-cycle forward drift in a run clip slides
// the model off its base then snaps back on loop ("zorping"). Fix both by flattening root/pelvis X/Z to 0 for
// any track that actually drifts or is offset — small natural sway (< ~0.75 units) is left untouched so clean
// clips are unchanged. Y (vertical bob) is always kept. Idempotent via the clone.
function recenterRootMotion(clip: THREE.AnimationClip): THREE.AnimationClip {
  const out = clip.clone();
  for (const track of out.tracks) {
    if (!/(pelvis|root)[^.]*\.position$/i.test(track.name)) continue;
    const v = track.values as unknown as Float32Array;
    const n = v.length / 3;
    if (n === 0) continue;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity, sx = 0, sz = 0;
    for (let i = 0; i < v.length; i += 3) {
      minX = Math.min(minX, v[i]); maxX = Math.max(maxX, v[i]); sx += v[i];
      minZ = Math.min(minZ, v[i + 2]); maxZ = Math.max(maxZ, v[i + 2]); sz += v[i + 2];
    }
    const drift = Math.max(maxX - minX, maxZ - minZ);          // per-cycle locomotion drift
    const offset = Math.max(Math.abs(sx / n), Math.abs(sz / n)); // constant world offset
    if (drift > 0.75 || offset > 2) {
      for (let i = 0; i < v.length; i += 3) { v[i] = 0; v[i + 2] = 0; } // in-place; keep Y
    }
  }
  return out;
}
