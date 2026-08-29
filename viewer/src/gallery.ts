// Hero inspector: loads ONE hero at a time (base body + each bonemerged part as a separately-toggleable object)
// so we can find spurious ability/prop parts and decide exactly which to cut from hero_parts.tsv. Hero is in the
// URL (?hero=ringmaster); a dropdown + prev/next switch heroes; a checklist toggles each object's visibility.
// Open /heroes.html. Assembly mirrors render/models.ts so what you see matches the live client.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { bannedParts, saveOverride } from "./blacklist.js";
import { assetUrl } from "./config.js";

const SCALE = 39.37; // metres -> world units (matches the live client)
const loader = new GLTFLoader();

// name fragments that usually indicate an ability/prop/cosmetic part rather than the hero body — just a colour
// hint in the list, never auto-hidden.
const SUS = /wheel|unicycle|prop|mirror|cushion|pie|strongman|lookdev|portal|debris|memorial|decoy|bulbs|banner|sign|drum|shield|familiar|_form|illusion|effigy|additive|gyro|bango|ship|wave|ball|crystal|totem/i;

const app = document.getElementById("app")!;
const heroSel = document.getElementById("hero") as HTMLSelectElement;
const listEl = document.getElementById("list")!;
const countEl = document.getElementById("count")!;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setClearColor(0x11161d, 1);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xccdcf0, 0x3a4552, 2.6));
scene.add(new THREE.AmbientLight(0xb4c4d6, 1.5));
const key = new THREE.DirectionalLight(0xfff4e0, 3.0);
key.position.set(-400, 700, 500);
scene.add(key);
const fill = new THREE.DirectionalLight(0x6f8fc0, 1.0);
fill.position.set(400, 300, -400);
scene.add(fill);

const camera = new THREE.PerspectiveCamera(38, 1, 1, 20000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableRotate = false; // left-drag spins the MODEL (below); orbit keeps wheel-zoom + right-drag pan
function resize() {
  const r = app.getBoundingClientRect();
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / Math.max(1, r.height);
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);

let heroes: string[] = [];
let current: THREE.Object3D = new THREE.Group();
let mixer: THREE.AnimationMixer | undefined;
let spinning = false;
let currentHero = "";
let currentParts: { name: string; base: boolean; cb: HTMLInputElement }[] = [];

// left-drag spins the model in place (turntable); vertical drag tilts, clamped so it can't flip.
let dragging = false;
let px = 0;
let py = 0;
renderer.domElement.addEventListener("pointerdown", (e) => {
  if (e.button === 0) {
    dragging = true;
    px = e.clientX;
    py = e.clientY;
  }
});
addEventListener("pointerup", () => (dragging = false));
addEventListener("pointermove", (e) => {
  if (!dragging || !current) return;
  current.rotation.y += (e.clientX - px) * 0.01;
  current.rotation.x = Math.max(-1, Math.min(1, current.rotation.x + (e.clientY - py) * 0.01));
  px = e.clientX;
  py = e.clientY;
});

function bonesByName(root: THREE.Object3D): Map<string, THREE.Bone> {
  const map = new Map<string, THREE.Bone>();
  root.traverse((o) => {
    if ((o as THREE.Bone).isBone) map.set(o.name, o as THREE.Bone);
  });
  return map;
}

const jsonCache = new Map<string, Promise<Record<string, string[]>>>();
function loadJson(url: string) {
  let p = jsonCache.get(url);
  if (!p) {
    p = fetch(assetUrl(url)).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
    jsonCache.set(url, p);
  }
  return p;
}

interface Part {
  name: string;
  base: boolean;
  set: (v: boolean) => void;
}

async function buildHero(
  hero: string,
): Promise<{ root: THREE.Object3D; mixer?: THREE.AnimationMixer; parts: Part[]; baseMeshes: THREE.Object3D[] }> {
  const gltf = await loader.loadAsync(assetUrl(`/models/heroes/${hero}/model.glb`));
  const root = skeletonClone(gltf.scene);
  const bones = bonesByName(root);
  const rootBone = [...bones.values()][0];

  const baseMeshes: THREE.Object3D[] = [];
  root.traverse((o) => {
    if ((o as THREE.SkinnedMesh).isSkinnedMesh) baseMeshes.push(o);
  });
  const parts: Part[] = [{ name: "(base body)", base: true, set: (v) => baseMeshes.forEach((m) => (m.visible = v)) }];

  const [manifest, names] = await Promise.all([loadJson("/models/manifest.json"), loadJson("/models/part_names.json")]);
  const files = manifest[hero] ?? [];
  const partNames = names[hero] ?? [];
  for (let i = 0; i < files.length; i++) {
    try {
      const ps = skeletonClone((await loader.loadAsync(assetUrl(`/models/heroes/${hero}/${files[i]}`))).scene);
      const grp = new THREE.Group();
      ps.traverse((o) => {
        const m = o as THREE.SkinnedMesh;
        if (m.isSkinnedMesh) {
          const rebound = m.skeleton.bones.map((b) => bones.get(b.name) ?? rootBone);
          m.bind(new THREE.Skeleton(rebound, m.skeleton.boneInverses), m.bindMatrix);
          m.frustumCulled = false;
          grp.add(m);
        }
      });
      root.add(grp);
      parts.push({ name: partNames[i] ?? files[i].replace(/\.glb$/, ""), base: false, set: (v) => (grp.visible = v) });
    } catch {
      /* skip a broken/incompatible part */
    }
  }

  let mx: THREE.AnimationMixer | undefined;
  const idle = gltf.animations.find((c) => /idle/i.test(c.name)) ?? gltf.animations[0];
  if (idle) {
    mx = new THREE.AnimationMixer(root);
    mx.clipAction(idle).play();
  }
  return { root, mixer: mx, parts, baseMeshes };
}

function disposeCurrent() {
  scene.remove(current);
  current.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose());
  });
  mixer = undefined;
}

async function show(hero: string) {
  disposeCurrent();
  listEl.innerHTML = `<div style="color:#8b96a1">loading…</div>`;
  const { root, mixer: mx, parts, baseMeshes } = await buildHero(hero);
  root.scale.setScalar(SCALE);
  scene.add(root);
  root.updateMatrixWorld(true);
  // frame on the BASE body only — a mis-bound spurious part can explode the full-assembly bbox and shrink the hero.
  const box = new THREE.Box3();
  for (const m of baseMeshes) box.expandByObject(m);
  if (box.isEmpty()) box.setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  root.position.y = -box.min.y; // seat base on ground
  current = root;
  mixer = mx;

  // frame the model — guard against a degenerate/unscaled skinned bbox (fall back to a nominal hero height)
  let h = size.y;
  if (!isFinite(h) || h < 5) h = 70;
  const spread = Math.max(h, size.x, size.z, 40);
  const dist = spread * 2.3;
  camera.position.set(dist * 0.5, h * 0.7, dist);
  controls.target.set(0, h * 0.45, 0);
  controls.update();

  // build the checklist — parts already excluded (committed file + your saved explorer edits) start unchecked +
  // hidden, so the explorer reflects exactly what the live client renders.
  const banned = await bannedParts(hero);
  countEl.textContent = `${parts.length}`;
  listEl.innerHTML = "";
  currentHero = hero;
  currentParts = [];
  for (const p of parts) {
    const label = document.createElement("label");
    if (p.base) label.className = "base";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    const excluded = !p.base && banned.has(p.name);
    cb.checked = !excluded;
    if (excluded) p.set(false);
    cb.onchange = () => { p.set(cb.checked); persistExclusions(); };
    const span = document.createElement("span");
    span.textContent = p.name;
    if (!p.base && SUS.test(p.name)) span.className = "sus";
    label.append(cb, span);
    listEl.appendChild(label);
    currentParts.push({ name: p.name, base: p.base, cb });
  }
}

/** Save the current hero's excluded parts so the live client honors them on reload — no manual JSON editing. */
function persistExclusions() {
  const remove = currentParts.filter((p) => !p.base && !p.cb.checked).map((p) => p.name);
  saveOverride(currentHero, remove);
}

/** Copy a paste-ready summary of which objects are hidden (to remove) vs kept for the current hero. */
async function copyConfig() {
  const remove = currentParts.filter((p) => !p.base && !p.cb.checked).map((p) => p.name);
  const keep = currentParts.filter((p) => p.cb.checked).map((p) => p.name);
  // Your edits already persist to localStorage and are honored live — this copy is only to promote them into the
  // committed part_blacklist.json (so they ship to everyone, not just this browser).
  const jsonLine = `${JSON.stringify(currentHero)}: ${JSON.stringify(remove)}`;
  const text = `${jsonLine}\n\n${currentHero}\nremove: ${remove.join(", ") || "(none)"}\nkeep: ${keep.join(", ")}`;
  try {
    await navigator.clipboard.writeText(text);
    flashCopy("copied ✓ (for part_blacklist.json)");
  } catch {
    flashCopy("copy failed — select & copy from console");
    console.log(text);
  }
}

function flashCopy(msg: string) {
  const b = document.getElementById("copy") as HTMLButtonElement;
  const prev = b.textContent;
  b.textContent = msg;
  setTimeout(() => (b.textContent = prev), 1500);
}

function setHero(hero: string, pushUrl = true) {
  heroSel.value = hero;
  if (pushUrl) {
    const u = new URL(location.href);
    u.searchParams.set("hero", hero);
    history.replaceState(null, "", u);
  }
  show(hero);
}

document.getElementById("prev")!.addEventListener("click", () => {
  const i = heroes.indexOf(heroSel.value);
  setHero(heroes[(i - 1 + heroes.length) % heroes.length]);
});
document.getElementById("next")!.addEventListener("click", () => {
  const i = heroes.indexOf(heroSel.value);
  setHero(heroes[(i + 1) % heroes.length]);
});
heroSel.addEventListener("change", () => setHero(heroSel.value));
document.getElementById("spin")!.addEventListener("click", () => (spinning = !spinning));
document.getElementById("copy")!.addEventListener("click", copyConfig);

let last = performance.now();
function frame(now: number) {
  const dt = (now - last) / 1000;
  last = now;
  if (mixer) mixer.update(dt);
  if (spinning && current) current.rotation.y += dt * 0.5;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

(async () => {
  resize();
  heroes = await (await fetch(assetUrl("/models/heroes.json"))).json();
  heroes.sort();
  heroSel.innerHTML = heroes.map((h) => `<option value="${h}">${h}</option>`).join("");
  const want = new URLSearchParams(location.search).get("hero");
  setHero(want && heroes.includes(want) ? want : heroes[0], false);
  requestAnimationFrame(frame);
})();
