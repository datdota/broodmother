// Applies v2 stream batches (keyframe + delta + catalog) to a handle-keyed world and emits one Snapshot per
// tick, ready for the interpolation buffer. Mirrors the Java round-trip reconstruction in StreamReplayHarness.

import { spectate } from "../proto/stream.js";
import type { GameEventState, PlayerState, ProjectileState, Snapshot, UnitState } from "./types.js";

interface Ident {
  type: number;
  team: number;
  nameId: number;
  heroId: number;
  playerSlot: number;
  modelScale: number;
}
interface Xf {
  x: number;
  y: number;
  yaw: number;
  hp: number;
  maxHp: number;
  mp: number;
  flags: number;
  activity: number;
}
interface Slow {
  level: number;
  maxMp: number;
  respawnEnds: number; // absolute game-time at which respawn completes; countdown = ends - now
  itemIds: number[];
  abilities: { nameId: number; level: number; cooldownEnd: number; cooldownLength: number }[];
  strength: number;
  agility: number;
  intellect: number;
  moveSpeed: number;
}

const EVENT_LOG_MAX = 64;

export class Reconstructor {
  private catalog: string[] = [""]; // id 0 = "no string"
  private idents = new Map<number, Ident>();
  private xf = new Map<number, Xf>();
  private slow = new Map<number, Slow>();
  private players: PlayerState[] = [];
  private radiantScore = 0;
  private direScore = 0;
  private dayTime = true;
  private serverTick = 0;
  private gameTime = 0;

  tickRate = 30;
  version = 0;
  readonly events: GameEventState[] = [];
  // transient projectile spawns/destroys since the last drainProjectiles() (consumed by the render layer)
  private projSpawns: ProjectileState[] = [];
  private projDestroys: number[] = [];

  drainProjectiles(): { spawns: ProjectileState[]; destroys: number[] } {
    const out = { spawns: this.projSpawns, destroys: this.projDestroys };
    this.projSpawns = [];
    this.projDestroys = [];
    return out;
  }

  // last-hit / deny markers at a world (x,y), drained by the render layer to float a "$"/"!" there
  private combatMarks: { kind: string; x: number; y: number }[] = [];
  drainCombatMarks(): { kind: string; x: number; y: number }[] {
    const out = this.combatMarks;
    this.combatMarks = [];
    return out;
  }

  /** Decode one binary WS message and return the reconstructed tick, or undefined if it carried no tick. */
  apply(bytes: Uint8Array): Snapshot | undefined {
    const batch = spectate.Batch.decode(bytes);
    let built = false;
    // Each StreamMsg sets exactly one oneof field; test presence rather than the concrete-class `.body` getter.
    for (const m of batch.msgs) {
      if (m.hello) {
        this.version = m.hello.version ?? 0;
        this.tickRate = m.hello.tickRate || 30;
      } else if (m.catalog) {
        this.applyCatalog(m.catalog);
      } else if (m.keyframe) {
        this.applyKeyframe(m.keyframe);
        built = true;
      } else if (m.delta) {
        this.applyDelta(m.delta);
        built = true;
      } else if (m.stats) {
        this.players = (m.stats.players ?? []).map(toPlayer);
      } else if (m.events) {
        this.applyEvents(m.events.events ?? []);
      } else if (m.projectiles) {
        for (const s of m.projectiles.spawns ?? []) {
          this.projSpawns.push({
            handle: s.handle ?? 0,
            source: s.source ?? 0,
            target: s.target ?? 0,
            targetX: s.targetX ?? 0,
            targetY: s.targetY ?? 0,
            speed: s.speed ?? 900,
            isAttack: s.isAttack ?? false,
            linear: s.linear ?? false,
            originX: s.originX ?? 0,
            originY: s.originY ?? 0,
            velX: s.velX ?? 0,
            velY: s.velY ?? 0,
            distance: s.distance ?? 0,
          });
        }
        for (const d of m.projectiles.destroys ?? []) this.projDestroys.push(d);
      }
    }
    return built ? this.snapshot() : undefined;
  }

  private applyCatalog(c: spectate.ICatalog): void {
    const base = c.base ?? 0;
    const names = c.names ?? [];
    for (let i = 0; i < names.length; i++) {
      this.catalog[base + i] = names[i];
    }
  }

  private applyKeyframe(k: spectate.IKeyframe): void {
    this.serverTick = k.serverTick ?? 0;
    this.gameTime = k.gameTime ?? 0;
    this.idents.clear();
    this.xf.clear();
    this.slow.clear();
    for (const id of k.idents ?? []) this.putIdent(id);
    this.applyTransforms(k.transforms);
    for (const s of k.slow ?? []) this.putSlow(s);
    if (k.match) this.applyMatch(k.match);
  }

  private applyDelta(d: spectate.IDelta): void {
    this.serverTick = d.serverTick ?? 0;
    this.gameTime = d.gameTime ?? 0;
    for (const id of d.spawns ?? []) this.putIdent(id);
    this.applyTransforms(d.transforms);
    for (const s of d.slow ?? []) this.putSlow(s);
    for (const h of d.despawns ?? []) {
      this.idents.delete(h);
      this.xf.delete(h);
      this.slow.delete(h);
    }
    if (d.match) this.applyMatch(d.match);
  }

  private applyMatch(m: spectate.IMatchLite): void {
    this.radiantScore = m.radiantScore ?? 0;
    this.direScore = m.direScore ?? 0;
    this.dayTime = m.dayTime ?? true;
  }

  private applyTransforms(t: spectate.ITransforms | null | undefined): void {
    if (!t) return;
    const h = t.handles ?? [];
    for (let i = 0; i < h.length; i++) {
      this.xf.set(h[i], {
        x: t.xs![i],
        y: t.ys![i],
        yaw: t.yaws![i],
        hp: t.hps![i],
        maxHp: t.maxHps![i],
        mp: t.mps![i],
        flags: t.flags![i],
        activity: t.activities?.[i] ?? 0,
      });
    }
  }

  private putIdent(id: spectate.IUnitIdent): void {
    this.idents.set(id.handle ?? 0, {
      type: id.type ?? 0,
      team: id.team ?? 0,
      nameId: id.nameId ?? 0,
      heroId: id.heroId ?? 0,
      playerSlot: id.playerSlot ?? 255,
      modelScale: id.modelScale || 1,
    });
  }

  private putSlow(s: spectate.IUnitSlow): void {
    this.slow.set(s.handle ?? 0, {
      level: s.level ?? 0,
      maxMp: s.maxMp ?? 0,
      respawnEnds: this.gameTime + (s.respawnTime ?? 0),
      itemIds: s.itemIds ?? [],
      abilities: (s.abilities ?? []).map((a) => ({
        nameId: a.nameId ?? 0,
        level: a.level ?? 0,
        cooldownEnd: a.cooldownEnd ?? 0,
        cooldownLength: a.cooldownLength ?? 0,
      })),
      strength: s.strength ?? 0,
      agility: s.agility ?? 0,
      intellect: s.intellect ?? 0,
      moveSpeed: s.moveSpeed ?? 0,
    });
  }

  private applyEvents(evs: spectate.IGameEvent[]): void {
    for (const e of evs) {
      const kind = e.kind ?? "";
      if (kind === "lasthit" || kind === "deny") {
        this.combatMarks.push({ kind, x: e.x ?? 0, y: e.y ?? 0 });
      } else {
        this.events.push({ time: e.time ?? 0, kind, text: e.text ?? "" });
      }
    }
    if (this.events.length > EVENT_LOG_MAX) this.events.splice(0, this.events.length - EVENT_LOG_MAX);
  }

  private name(id: number): string {
    return this.catalog[id] ?? "";
  }

  private snapshot(): Snapshot {
    const units = new Map<number, UnitState>();
    for (const [h, ident] of this.idents) {
      const x = this.xf.get(h);
      if (!x) continue; // every unit should have a transform; skip if a delta arrived mid-assembly
      const slow = this.slow.get(h);
      units.set(h, {
        handle: h,
        type: ident.type,
        x: x.x,
        y: x.y,
        yaw: x.yaw,
        team: ident.team,
        hp: x.hp,
        maxHp: x.maxHp,
        mp: x.mp,
        maxMp: slow?.maxMp ?? 0,
        flags: x.flags,
        activity: x.activity,
        heroId: ident.heroId,
        playerSlot: ident.playerSlot,
        level: slow?.level ?? 0,
        respawnTime: slow ? Math.max(0, slow.respawnEnds - this.gameTime) : 0,
        unitName: this.name(ident.nameId),
        items: slow ? slow.itemIds.map((id) => this.name(id)) : [],
        modelScale: ident.modelScale,
        abilities: slow
          ? slow.abilities.map((a) => ({
              name: this.name(a.nameId),
              level: a.level,
              cooldownEnd: a.cooldownEnd,
              cooldownLength: a.cooldownLength,
            }))
          : [],
        strength: slow?.strength ?? 0,
        agility: slow?.agility ?? 0,
        intellect: slow?.intellect ?? 0,
        moveSpeed: slow?.moveSpeed ?? 0,
      });
    }
    return {
      serverTick: this.serverTick,
      gameTime: this.gameTime,
      recvMs: performance.now(),
      units,
      players: this.players,
      radiantScore: this.radiantScore,
      direScore: this.direScore,
      dayTime: this.dayTime,
    };
  }
}

function toPlayer(p: spectate.IPlayerStat): PlayerState {
  return {
    slot: p.slot ?? 0,
    team: p.team ?? 0,
    heroId: p.heroId ?? 0,
    name: p.name ?? "",
    kills: p.kills ?? 0,
    deaths: p.deaths ?? 0,
    assists: p.assists ?? 0,
    lastHits: p.lastHits ?? 0,
    denies: p.denies ?? 0,
    netWorth: p.netWorth ?? 0,
    gpm: p.gpm ?? 0,
    xpm: p.xpm ?? 0,
    buybackCooldown: p.buybackCooldown ?? 0,
  };
}
