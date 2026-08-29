// Terrain base layer: a Dota map image (HD render or minimap overview) draped on the displaced ground grid,
// aligned to world coordinates. Multiple layers are registered in /terrain/layers.json, each with its OWN
// calibration; the active layer's alignment drives the grid, and the calibration panel / wizard edit it live.
// Elevation comes from the heightfield (./heightfield). An optional bright world-space grid (shader) can be
// toggled on to read the relief.

import * as THREE from "three";
import { sceneZ } from "../coords.js";
import { calib } from "../calib.js";
import { loadHeightfield, FLAT, type HeightSampler } from "./heightfield.js";
import { assetUrl } from "../config.js";

const SEG_X = 384; // terrain grid resolution — fine enough to render the baked heightmap's sharp cliffs
const SEG_Y = 408;
const GRID_SPACING = 512; // world units between grid lines (4 Dota tiles)
const GRID_COLOR = 0x35e0ff; // bright cyan — pops against the dark ground/background
const GRID_OPACITY = 0.5;

export interface LayerMeta {
  id: string;
  label: string;
  image: string;
  center_px: [number, number];
  scale: number;
}

interface LayersFile {
  default: string;
  layers: LayerMeta[];
}

export interface Terrain {
  mesh: THREE.Mesh;
  heightAt(wx: number, wy: number): number;
  rebuild(): void; // re-align from the live calibration
  layers: LayerMeta[];
  switchLayer(id: string): Promise<void>;
  imageSize(): { w: number; h: number };
  setGrid(on: boolean): void;
  gridOn(): boolean;
}

const loader = new THREE.TextureLoader();

async function loadTexture(image: string): Promise<THREE.Texture> {
  const tex = await loader.loadAsync(assetUrl(`/terrain/${image}`));
  tex.flipY = false; // UVs are image-pixel space (row 0 = top)
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export async function loadTerrain(): Promise<Terrain> {
  const file: LayersFile = await (await fetch(assetUrl("/terrain/layers.json"))).json();
  const q = new URLSearchParams(location.search);
  const startId = q.get("layer") ?? file.default;

  // Lit material so the displaced relief shades under the sun; vertex colors add a height tint. A shader-injected
  // world-space grid overlay (toggleable) rides the surface to make the relief legible.
  const mat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, vertexColors: true });
  let gridOn = false;
  let gridUniforms: { uGridOpacity: { value: number } } | null = null;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uGrid = { value: GRID_SPACING };
    shader.uniforms.uGridOpacity = { value: gridOn ? GRID_OPACITY : 0 };
    shader.uniforms.uGridColor = { value: new THREE.Color(GRID_COLOR) };
    gridUniforms = shader.uniforms as unknown as { uGridOpacity: { value: number } };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vWPos;\nuniform float uGrid;\nuniform float uGridOpacity;\nuniform vec3 uGridColor;",
      )
      .replace(
        "#include <dithering_fragment>",
        `vec2 gc = vWPos.xz / uGrid;
         vec2 gg = abs(fract(gc - 0.5) - 0.5) / fwidth(gc);
         float ln = 1.0 - min(min(gg.x, gg.y), 1.0);
         gl_FragColor.rgb = mix(gl_FragColor.rgb, uGridColor, ln * uGridOpacity);
         #include <dithering_fragment>`,
      );
  };
  mat.customProgramCacheKey = () => "terrain-grid";

  const geom = new THREE.BufferGeometry();
  const VX = SEG_X + 1, VY = SEG_Y + 1;
  geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(VX * VY * 3), 3));
  geom.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(VX * VY * 2), 2));
  geom.setAttribute("color", new THREE.BufferAttribute(new Float32Array(VX * VY * 3), 3));
  const idx: number[] = [];
  for (let j = 0; j < SEG_Y; j++) {
    for (let i = 0; i < SEG_X; i++) {
      const a = j * VX + i, b = a + 1, c = a + VX, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  geom.setIndex(idx);
  const mesh = new THREE.Mesh(geom, mat);
  mesh.name = "terrain";
  mesh.receiveShadow = true;

  let W = 1, H = 1;
  let hf: HeightSampler = FLAT;

  // Build the displaced grid from the current calibration: each vertex's image px -> world -> scene, with Y from
  // the heightfield sampled at that world point.
  function build() {
    const cx = calib.mapCx, cy = calib.mapCy, k = calib.mapScale;
    const wxOf = (px: number) => (px - cx) / k;
    const wyOf = (py: number) => (cy - py) / k;
    const p = geom.getAttribute("position") as THREE.BufferAttribute;
    const uv = geom.getAttribute("uv") as THREE.BufferAttribute;
    const col = geom.getAttribute("color") as THREE.BufferAttribute;
    for (let j = 0; j < VY; j++) {
      for (let i = 0; i < VX; i++) {
        const u = i / SEG_X, v = j / SEG_Y;
        const wx = wxOf(u * W), wy = wyOf(v * H);
        const y = hf.sample(wx, wy);
        const n = j * VX + i;
        p.setXYZ(n, wx, y, sceneZ(wy));
        uv.setXY(n, u, v);
        // height tint: river/low -> cooler + darker; high ground -> warmer + brighter
        let r = 1, g = 1, b = 1;
        if (y < -8) { const t = Math.min(1, -y / 120); r = 1 - 0.3 * t; g = 1 - 0.15 * t; b = 1 + 0.12 * t; }
        else if (y > 15) { const t = Math.min(1, y / 700); r = 1 + 0.16 * t; g = 1 + 0.12 * t; b = 1 - 0.06 * t; }
        col.setXYZ(n, r, g, b);
      }
    }
    p.needsUpdate = true;
    uv.needsUpdate = true;
    col.needsUpdate = true;
    geom.computeVertexNormals();
    geom.computeBoundingSphere();
    mesh.visible = calib.showMap;
  }

  async function switchLayer(id: string) {
    const layer = file.layers.find((l) => l.id === id) ?? file.layers[0];
    const tex = await loadTexture(layer.image);
    mat.map?.dispose();
    mat.map = tex;
    mat.needsUpdate = true;
    W = tex.image.width;
    H = tex.image.height;
    calib.layerId = layer.id;
    calib.mapCx = layer.center_px[0];
    calib.mapCy = layer.center_px[1];
    calib.mapScale = layer.scale;
    build();
  }

  hf = await loadHeightfield();
  await switchLayer(startId);

  return {
    mesh,
    heightAt: (wx, wy) => hf.sample(wx, wy),
    rebuild: build,
    layers: file.layers,
    switchLayer,
    imageSize: () => ({ w: W, h: H }),
    setGrid: (on) => {
      gridOn = on;
      if (gridUniforms) gridUniforms.uGridOpacity.value = on ? GRID_OPACITY : 0;
    },
    gridOn: () => gridOn,
  };
}
