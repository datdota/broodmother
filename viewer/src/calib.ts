// Live calibration state, driven by the calibration panel (press "c" or add ?calibrate). Terrain rebuilds when
// the map values change; units read the scale/facing/visibility values every frame. Tune here, then bake the
// map numbers into public/terrain/terrain.json and the model defaults into the code.

export interface Calib {
  // active base layer + its map alignment (image pixels + pixels-per-world-unit)
  layerId: string;
  mapCx: number;
  mapCy: number;
  mapScale: number;
  // model scale factors (models are authored ~world-scale, so ~1.0) and facing offset (degrees)
  heroScale: number;
  buildingScale: number;
  yawOffsetDeg: number;
  // category visibility (for isolating things while aligning)
  showHeroes: boolean;
  showCreeps: boolean;
  showBuildings: boolean;
  showMap: boolean;
}

export const calib: Calib = {
  layerId: "hd_740",
  mapCx: 2048,
  mapCy: 1928,
  mapScale: 0.225,
  // VRF exports models in metres (Source inch-units x 0.0254); the world is in inch-units, so the base factor
  // to bring a model back to world scale is ~1/0.0254 = 39.37. Per-unit m_flScale (~0.94) refines this later.
  heroScale: 39.37,
  buildingScale: 39.37,
  yawOffsetDeg: 90, // model glTF-forward vs true facing (ring is correct at 0); +90 faces models the right way
  showHeroes: true,
  showCreeps: true,
  showBuildings: true,
  showMap: true,
};

export function yawOffsetRad(): number {
  return (calib.yawOffsetDeg * Math.PI) / 180;
}
