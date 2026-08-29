// Shared world model. Mirrors the fields the TUI keeps (tui/src/world.rs) but reconstructed from the v2 stream.

export const UnitType = {
  UNKNOWN: 0,
  HERO: 1,
  ILLUSION: 2,
  CREEP: 3,
  NEUTRAL: 4,
  WARD_OBS: 5,
  WARD_SEN: 6,
  BUILDING: 7,
  COURIER: 8,
  ROSHAN: 9,
} as const;

export const RADIANT = 2;
export const DIRE = 3;

export interface UnitState {
  handle: number;
  type: number;
  x: number;
  y: number;
  yaw: number;
  team: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  flags: number; // bit0 = alive
  activity: number; // m_NetworkActivity: 1500 idle, 1502 run, 1503/1504 attack, 1506+ cast (0 if not sent)
  heroId: number;
  playerSlot: number; // 255 = none
  level: number;
  respawnTime: number; // seconds remaining (0 = alive), derived client-side
  unitName: string;
  items: string[];
  modelScale: number; // per-unit render scale (m_flScale); 1.0 = default
  abilities: AbilityState[]; // heroes only
  strength: number;
  agility: number;
  intellect: number;
  moveSpeed: number;
}

export interface AbilityState {
  name: string;
  level: number;
  cooldownEnd: number; // absolute game-time it's ready (0 = ready); remaining = cooldownEnd - gameTime
  cooldownLength: number;
}

export interface PlayerState {
  slot: number;
  team: number;
  heroId: number;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  lastHits: number;
  denies: number;
  netWorth: number;
  gpm: number;
  xpm: number;
  buybackCooldown: number;
}

export interface GameEventState {
  time: number;
  kind: string;
  text: string;
}

export interface ProjectileState {
  handle: number;
  source: number; // launching unit handle
  target: number; // target unit handle (0 = none)
  targetX: number;
  targetY: number;
  speed: number;
  isAttack: boolean;
  linear: boolean; // skillshot: flies from origin along (velX,velY) for `distance`
  originX: number;
  originY: number;
  velX: number;
  velY: number;
  distance: number;
}

/** One reconstructed tick — the analogue of a v1 EntityFrame, ready to push into the interpolation buffer. */
export interface Snapshot {
  serverTick: number;
  gameTime: number;
  recvMs: number;
  units: Map<number, UnitState>;
  players: PlayerState[];
  radiantScore: number;
  direScore: number;
  dayTime: boolean;
}

export function isAlive(u: UnitState): boolean {
  return (u.flags & 1) !== 0;
}
