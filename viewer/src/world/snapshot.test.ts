import { describe, it, expect } from "vitest";
import { SnapshotBuffer } from "./snapshot.js";
import { UnitType, RADIANT, type Snapshot, type UnitState } from "./types.js";

function unit(handle: number, x: number, y: number): UnitState {
  return {
    handle,
    type: UnitType.HERO,
    x,
    y,
    yaw: 0,
    team: RADIANT,
    hp: 100,
    maxHp: 100,
    mp: 0,
    maxMp: 0,
    flags: 1,
    activity: 0,
    heroId: 1,
    playerSlot: 0,
    level: 1,
    respawnTime: 0,
    unitName: "",
    items: [],
    modelScale: 1,
    abilities: [],
    strength: 0,
    agility: 0,
    intellect: 0,
    moveSpeed: 0,
  };
}

function snapAt(recvMs: number, handle: number, x: number, y: number): Snapshot {
  return {
    serverTick: 0,
    gameTime: 0,
    recvMs,
    units: new Map([[handle, unit(handle, x, y)]]),
    players: [],
    radiantScore: 0,
    direScore: 0,
    dayTime: true,
  };
}

describe("SnapshotBuffer interpolation (ported from tui/src/world.rs)", () => {
  // A unit turning a corner: the rendered path must not have velocity discontinuities at the snapshot
  // boundaries the way a plain lerp would. We check the second difference (acceleration) stays bounded.
  it("splines motion smoothly across snapshot boundaries", () => {
    const t0 = 0;
    const dt = 100;
    const pts: [number, number][] = [
      [0, 0],
      [100, 0],
      [200, 0],
      [200, 100],
      [200, 200],
    ];
    const buf = new SnapshotBuffer();
    pts.forEach(([x, y], i) => buf.push(snapAt(t0 + dt * i, 7, x, y)));

    const renderNow = t0 + dt * (pts.length - 1);
    const delay = 250;
    const step = 10;

    const positions: [number, number][] = [];
    for (let t = 0; t <= 300; t += step) {
      const w = buf.interpolatedAt(renderNow + t, delay)!;
      const u = w.units.find((u) => u.handle === 7)!;
      positions.push([u.x, u.y]);
    }

    let maxAccel = 0;
    for (let i = 2; i < positions.length; i++) {
      const ax = Math.abs(positions[i][0] - 2 * positions[i - 1][0] + positions[i - 2][0]);
      const ay = Math.abs(positions[i][1] - 2 * positions[i - 1][1] + positions[i - 2][1]);
      maxAccel = Math.max(maxAccel, ax, ay);
    }
    // per-step velocity is ~10 units (100u/100ms sampled at 10ms); a spline keeps accel well under that
    expect(maxAccel).toBeLessThan(8);
  });

  // A jump larger than TELEPORT_DIST must snap (hold origin, then destination), never slide through the midpoint.
  it("snaps big jumps instead of sliding", () => {
    const t0 = 0;
    const dt = 100;
    const pts: [number, number][] = [
      [0, 0],
      [0, 0],
      [6000, 0],
      [6000, 0],
    ];
    const buf = new SnapshotBuffer();
    pts.forEach(([x, y], i) => buf.push(snapAt(t0 + dt * i, 7, x, y)));

    const renderNow = t0 + dt * (pts.length - 1);
    const delay = 150; // sample the middle of the teleport segment
    const x = buf.interpolatedAt(renderNow, delay)!.units.find((u) => u.handle === 7)!.x;
    expect(x === 0 || x === 6000).toBe(true);
  });
});
