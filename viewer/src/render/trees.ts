// Renders the map's ~2,300 trees as InstancedMeshes (one draw call per model sub-mesh — a few dozen total, cheap).
// Each tree keeps its REAL model: public/terrain/trees.json is [x, y, z, yaw, scale, modelIdx], modelIdx indexing
// TREE_MODELS below (must match the extraction order in assets/extract-trees.sh). Trees are seated on the terrain
// height sampler (not their baked map z) so their bases sit exactly on the shaded ground.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { yawToSceneRotation } from "../coords.js";
import { dlog } from "../debuglog.js";
import { assetUrl } from "../config.js";

// The tree glbs are authored ~10x larger than the hero glbs, so the hero factor (39.37) would make them tower.
// Tuned so a typical tree renders ~2-3x a hero's height (hero ≈ 82 units); one factor keeps the real per-model
// size variety (bamboo short, big pines tall).
const TREE_SCALE = 12;

// index order MUST match assets/extract-trees.sh / the models.txt it prints
const TREE_MODELS = [
  "tree_pine_01", "tree_oak_01", "tree_oak_01b", "tree_pine_02", "tree_pine_03b", "tree_oak_02",
  "tree_cine_02_low", "tree_bamboo_02", "tree_bamboo_01", "dire_tree008", "dire_tree004b",
  "dire_tree004", "dire_tree007",
];

type Tree = [number, number, number, number, number, number]; // x, y, z, yaw, scale, modelIdx
type HeightAt = (wx: number, wy: number) => number;

export async function loadTrees(heightAt: HeightAt): Promise<THREE.Group> {
  const group = new THREE.Group();
  group.name = "trees";
  let trees: Tree[];
  try {
    trees = await (await fetch(assetUrl("/terrain/trees.json"))).json();
  } catch {
    dlog("warn", "trees.json missing — no trees rendered");
    return group;
  }
  const loader = new GLTFLoader();

  const mtx = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();

  for (let mi = 0; mi < TREE_MODELS.length; mi++) {
    const list = trees.filter((t) => t[5] === mi);
    if (!list.length) continue;
    const path = `/models/trees/${TREE_MODELS[mi]}/model.glb`;
    let gltf;
    try {
      gltf = await loader.loadAsync(assetUrl(path));
    } catch (e) {
      dlog("error", `tree model failed to load: ${path}${(e as Error)?.message ? ` (${(e as Error).message})` : ""}`);
      continue;
    }
    gltf.scene.updateMatrixWorld(true);
    // model-space base (min Y) so we can seat each instance's feet on the ground
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const baseY = box.min.y;

    // one InstancedMesh per sub-mesh (trunk / canopy), each sharing the per-tree transforms
    const submeshes: { geom: THREE.BufferGeometry; mat: THREE.Material | THREE.Material[] }[] = [];
    gltf.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const geom = m.geometry.clone();
        geom.applyMatrix4(m.matrixWorld); // bake the node transform into the geometry
        submeshes.push({ geom, mat: m.material });
      }
    });

    for (const { geom, mat } of submeshes) {
      const inst = new THREE.InstancedMesh(geom, mat, list.length);
      inst.frustumCulled = false; // instances span the whole map; the shared bounds would cull all-or-nothing
      inst.castShadow = true;
      inst.receiveShadow = true;
      for (let i = 0; i < list.length; i++) {
        const [x, y, , yaw, s] = list[i];
        const sc = s * TREE_SCALE;
        const ground = heightAt(x, y);
        pos.set(x, ground - baseY * sc, -y); // world (x,y) -> scene (x, ground, -y); lift so the base sits on ground
        q.setFromAxisAngle(up, yawToSceneRotation(yaw));
        scl.set(sc, sc, sc);
        mtx.compose(pos, q, scl);
        inst.setMatrixAt(i, mtx);
      }
      inst.instanceMatrix.needsUpdate = true;
      group.add(inst);
    }
  }
  return group;
}
