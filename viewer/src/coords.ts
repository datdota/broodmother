// World <-> scene mapping. Dota world coords are origin-centred, ~±8192 x / ±8704 y, 128-unit cells
// (see Coordinates.java, tui/src/heightfield.rs). Three.js is Y-up, so we lay the map on the X/Z plane with
// north (+world Y) pointing to -Z (screen "up"), and use Y for elevation.

export const MAP_EXT_X = 8192;
export const MAP_EXT_Y = 8704;
export const CELL = 128; // world units per heightfield cell

/** World (wx, wy) + elevation -> Three.js scene coordinates. */
export function toScene(wx: number, wy: number, elevation = 0): [number, number, number] {
  return [wx, elevation, -wy];
}

export const sceneX = (wx: number) => wx;
export const sceneZ = (wy: number) => -wy;

/**
 * Dota yaw is degrees CCW from +world-X. In scene space +Z is -worldY, so a rotation about the Y axis of
 * -yaw maps a unit's facing onto the ground plane. Returns radians; calibrate the sign/offset against a known
 * unit if models look mirrored (Coordinates.java reference tower at world (-3952,-6112)).
 */
export function yawToSceneRotation(yawDegrees: number): number {
  // Replay analysis: reported yaw == movement direction atan2(dy,dx) (0°=+worldX east, CCW), R=0.965. In scene
  // +worldX=+X and +worldY=-Z, so a facing at world angle θ maps to a +θ rotation about Y (NOT negated).
  return (yawDegrees * Math.PI) / 180;
}
