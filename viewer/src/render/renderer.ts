// Three.js stage: renderer + scene + perspective camera + lights, sized to a container. WebGL2 today
// (rock-solid, standard materials); the module is the single place to swap in WebGPURenderer later.

import * as THREE from "three";

export interface Stage {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  raycaster: THREE.Raycaster;
  dom: HTMLCanvasElement;
}

const BG = 0x0a0d12;

export function createStage(container: HTMLElement): Stage {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft-edged shadows for the raking sun
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x11161d);
  scene.fog = new THREE.Fog(0x11161d, 11000, 30000);

  // Steep top-down Dota framing; near/far generous for the ~16k-unit map.
  const camera = new THREE.PerspectiveCamera(38, 1, 20, 60000);

  // Big soft sun + fill so the extracted models (no emissive of their own) read clearly, without blowing out.
  // Ambient/hemi trimmed a touch so the sun's shadows + relief shading actually register (too much flat fill
  // washes elevation out).
  const hemi = new THREE.HemisphereLight(0xccdcf0, 0x35404e, 1.7);
  const ambient = new THREE.AmbientLight(0x9fb2c8, 0.7);
  const sun = new THREE.DirectionalLight(0xfff2d8, 3.2);
  sun.position.set(-6500, 8200, 5200); // lower & raking so slopes/trees throw readable shadows
  const fill = new THREE.DirectionalLight(0x6f8fc0, 0.9);
  fill.position.set(4000, 3000, -4000);

  // Sun casts shadows across the whole ±9k map. Ortho shadow frustum sized to the map; a 4k map keeps tree
  // shadows crisp without a perf hit (single instanced shadow pass).
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); // 2k is plenty for the map extent; 4k quadruples shadow-pass fill cost
  sun.shadow.camera.near = 1000;
  sun.shadow.camera.far = 22000;
  const S = 9800;
  sun.shadow.camera.left = -S;
  sun.shadow.camera.right = S;
  sun.shadow.camera.top = S;
  sun.shadow.camera.bottom = -S;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 40; // world-scale units — avoids acne on the big terrain triangles
  sun.target.position.set(0, 0, 0);
  scene.add(hemi, ambient, sun, sun.target, fill);

  const raycaster = new THREE.Raycaster();

  function resize() {
    const r = container.getBoundingClientRect();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // re-read: browser zoom changes DPR
    // Let three.js write the canvas's inline CSS size (setSize's default third arg). index.html styles the
    // canvas `display:block` with no width/height, so otherwise it lays out at the DPR-scaled buffer size —
    // 2x the container on retina, cropping the view to its top-left quarter (a followed unit renders at the
    // centre, i.e. past the visible corner). gallery.ts may pass `false` only because heroes.html sizes its
    // canvas in CSS.
    renderer.setSize(r.width, r.height);
    camera.aspect = r.width / Math.max(1, r.height);
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  return { renderer, scene, camera, raycaster, dom: renderer.domElement };
}
