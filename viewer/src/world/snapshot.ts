// Short snapshot ring that interpolates unit positions between the discrete ticks the server sends (~15/s), so
// motion renders smooth. We render at `now - delay`, always straddled by two real snapshots, and lerp each
// unit's position by its stable handle. Ported from tui/src/world.rs (Catmull-Rom spline + teleport snap).

import type { Snapshot, UnitState } from "./types.js";

// Past this world-unit jump between the two bracketing snapshots we treat the move as a teleport (TP, relocate,
// or a reused handle) and snap instead of sliding across the map. ~4000u ≈ half the map radius.
const TELEPORT_DIST = 4000;
const MAX_AGE_MS = 2000;

export interface InterpWorld {
  serverTick: number;
  gameTime: number;
  alpha: number;
  interpolated: boolean;
  units: UnitState[];
  players: Snapshot["players"];
  radiantScore: number;
  direScore: number;
  dayTime: boolean;
}

function catmullRom(p0: number, p1: number, p2: number, p3: number, u: number): number {
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * u +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
  );
}

function withPos(u: UnitState, x: number, y: number): UnitState {
  return { ...u, x, y };
}

// Catmull-Rom overshoots past the segment endpoints when a unit changes speed/direction (very visible at game
// start as units accelerate out of the fountain — it reads as erratic sliding/jitter). Clamp each interpolated
// coordinate to the [p1,p2] segment plus a small margin so the curve stays smooth but never flings past the ends.
function clampSeg(v: number, a: number, b: number): number {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const m = (hi - lo) * 0.12;
  return Math.max(lo - m, Math.min(hi + m, v));
}

/** Interpolate the whole world across the segment [s1, s2], bracketed by s0/s3 for the spline tangents. */
function spline(s0: Snapshot, s1: Snapshot, s2: Snapshot, s3: Snapshot, u: number): InterpWorld {
  const units: UnitState[] = [];
  for (const [h, ub] of s2.units) {
    const p1 = s1.units.get(h);
    if (!p1) {
      units.push(ub); // newly spawned this segment: no prior position to interpolate from
    } else if (Math.hypot(ub.x - p1.x, ub.y - p1.y) > TELEPORT_DIST) {
      // teleport: hold at origin then snap to the destination, never slide across the map
      units.push(u < 0.5 ? withPos(ub, p1.x, p1.y) : ub);
    } else {
      const p0 = s0.units.get(h) ?? p1;
      const p3 = s3.units.get(h) ?? ub;
      const cx = clampSeg(catmullRom(p0.x, p1.x, ub.x, p3.x, u), p1.x, ub.x);
      const cy = clampSeg(catmullRom(p0.y, p1.y, ub.y, p3.y, u), p1.y, ub.y);
      units.push(withPos(ub, cx, cy));
    }
  }
  return worldOf(s2, units, u, true);
}

function lerp(a: Snapshot, b: Snapshot, alpha: number, interpolated: boolean): InterpWorld {
  const units: UnitState[] = [];
  for (const [h, ub] of b.units) {
    const ua = a.units.get(h);
    units.push(ua ? withPos(ub, ua.x + (ub.x - ua.x) * alpha, ua.y + (ub.y - ua.y) * alpha) : ub);
  }
  return worldOf(b, units, alpha, interpolated);
}

function worldOf(s: Snapshot, units: UnitState[], alpha: number, interpolated: boolean): InterpWorld {
  return {
    serverTick: s.serverTick,
    gameTime: s.gameTime,
    alpha,
    interpolated,
    units,
    players: s.players,
    radiantScore: s.radiantScore,
    direScore: s.direScore,
    dayTime: s.dayTime,
  };
}

export class SnapshotBuffer {
  private snaps: Snapshot[] = [];

  push(s: Snapshot): void {
    this.snaps.push(s);
    while (this.snaps.length > 2) {
      const newest = this.snaps[this.snaps.length - 1].recvMs;
      if (newest - this.snaps[0].recvMs > MAX_AGE_MS) {
        this.snaps.shift();
      } else {
        break;
      }
    }
  }

  get length(): number {
    return this.snaps.length;
  }

  clear(): void {
    this.snaps.length = 0;
  }

  latestTick(): number | undefined {
    return this.snaps[this.snaps.length - 1]?.serverTick;
  }

  /** World state at `now - delay` (both ms). Straddled by two real snapshots and splined for smooth motion. */
  interpolated(delayMs: number, now = performance.now()): InterpWorld | undefined {
    return this.interpolatedAt(now, delayMs);
  }

  interpolatedAt(now: number, delayMs: number): InterpWorld | undefined {
    if (this.snaps.length === 0) return undefined;
    const target = now - delayMs;

    let seg = -1;
    for (let i = 0; i < this.snaps.length; i++) {
      if (this.snaps[i].recvMs <= target) seg = i;
      else break;
    }
    // render time older than anything buffered -> show oldest as-is
    if (seg < 0) return lerp(this.snaps[0], this.snaps[0], 0, false);

    const s1 = this.snaps[seg];
    const s2 = this.snaps[seg + 1];
    // buffer not yet ahead of the render time -> show newest as-is (no interp)
    if (!s2) {
      const a = this.snaps[this.snaps.length - 1];
      return lerp(a, a, 0, false);
    }
    const s0 = seg > 0 ? this.snaps[seg - 1] : s1;
    const s3 = this.snaps[seg + 2] ?? s2;

    const span = Math.max(s2.recvMs - s1.recvMs, 1e-6);
    const u = Math.min(Math.max((target - s1.recvMs) / span, 0), 1);
    return spline(s0, s1, s2, s3, u);
  }
}
