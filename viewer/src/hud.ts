// Drives the DOM observer HUD from the interpolated world: top portrait bar, score/clock, net-worth advantage,
// bottom unit console (type-aware), minimap over the real overview texture, a selectable per-player stats panel,
// and a toggleable scoreboard. Static chrome lives in index.html.

import { UnitType, RADIANT, DIRE, isAlive, type UnitState, type PlayerState } from "./world/types.js";
import type { InterpWorld } from "./world/snapshot.js";
import { assetUrl } from "./config.js";

const $ = (id: string) => document.getElementById(id)!;

// The overview minimap texture covers world ±9472, but has a ~29px (of 512) dark unplayable margin baked in.
// We crop that margin off the PNG (extract-models.sh), so the visible texture now spans ±8399 — keep the dot /
// click / viewport mapping in sync with the cropped extent.
const MINI_EXT = 8399;

function clock(sec: number): string {
  const s = Math.abs(sec);
  return `${sec < 0 ? "-" : ""}${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function heroShort(unitName: string): string {
  return unitName.replace("npc_dota_hero_", "");
}

// All icon hosts are cdn.datdota.com, and the dynamic segment is encodeURIComponent'd — so a hostile unit/player
// name (persona names are user-controlled!) can't break out of the src/href attribute when interpolated into HTML.
function heroImg(unitName: string): string {
  // Full portraits carry a _full suffix on the CDN (miniheroes/abilities/items do not).
  return `https://cdn.datdota.com/images/heroes/${encodeURIComponent(heroShort(unitName))}_full.png`;
}

function abilityImg(name: string): string {
  return `https://cdn.datdota.com/images/ability/${encodeURIComponent(name)}.png`;
}

function miniheroImg(unitName: string): string {
  return `https://cdn.datdota.com/images/miniheroes/${encodeURIComponent(heroShort(unitName))}.png`;
}

// Hide broken icons via JS instead of an inline onerror= handler, so the CSP can forbid inline scripts entirely.
function hideBrokenImgs(container: HTMLElement): void {
  container.querySelectorAll("img").forEach((el) => {
    const img = el as HTMLImageElement;
    img.onerror = () => { img.style.visibility = "hidden"; };
    if (img.complete && img.naturalWidth === 0) img.style.visibility = "hidden";
  });
}

// A human label for ANY unit type (so clicking a ward/creep/roshan shows what it actually is, not a player).
function unitLabel(u: UnitState, player?: PlayerState): string {
  switch (u.type) {
    case UnitType.HERO:
    case UnitType.ILLUSION: {
      const base = player?.name || titleCase(heroShort(u.unitName));
      return u.type === UnitType.ILLUSION ? `${base} (illusion)` : base;
    }
    case UnitType.WARD_OBS: return "Observer Ward";
    case UnitType.WARD_SEN: return "Sentry Ward";
    case UnitType.COURIER: return "Courier";
    case UnitType.ROSHAN: return "Roshan";
    default: return titleCase(u.unitName.replace(/^npc_dota_(neutral_|creep_)?/, "")) || "Unit";
  }
}

function titleCase(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ") : "";
}

interface StatDef { value: (p: PlayerState, hero?: UnitState) => string; num: (p: PlayerState, hero?: UnitState) => number; }
const STATS: Record<string, StatDef> = {
  kda: { value: (p) => `${p.kills}/${p.deaths}/${p.assists}`, num: (p) => p.kills * 1000 - p.deaths + p.assists / 100 },
  netWorth: { value: (p) => p.netWorth.toLocaleString(), num: (p) => p.netWorth },
  gpm: { value: (p) => String(p.gpm), num: (p) => p.gpm },
  xpm: { value: (p) => String(p.xpm), num: (p) => p.xpm },
  lastHits: { value: (p) => String(p.lastHits), num: (p) => p.lastHits },
  denies: { value: (p) => String(p.denies), num: (p) => p.denies },
  level: { value: (_p, h) => String(h?.level ?? 0), num: (_p, h) => h?.level ?? 0 },
};

const STAT_MODES = ["Both", "Radiant", "Dire", "Sorted"] as const;
type StatMode = (typeof STAT_MODES)[number];

export class Hud {
  private rrow = $("rrow");
  private drow = $("drow");
  private rPortraits: HTMLElement[] = [];
  private dPortraits: HTMLElement[] = [];
  private lastMini = 0;
  private lastPanels = 0;
  private scoreboardOn = false;
  private statMode: StatMode = "Both";
  private viewport: { x: number; y: number }[] = [];
  private consoleSig = ""; // followed-unit + items + abilities signature; icons rebuilt only when it changes
  /** Set by main: focus/select a unit by handle (portrait / scoreboard / stats-row clicks). */
  onFocus: (handle: number | null) => void = () => {};
  /** Set by main: recenter the camera on a world (wx, wy) point (minimap click). */
  onMinimapClick: (wx: number, wy: number) => void = () => {};

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.rPortraits.push(this.portrait(this.rrow, i));
      this.dPortraits.push(this.portrait(this.drow, i + 5));
    }
    ($("statsel") as HTMLSelectElement).addEventListener("change", () => (this.lastPanels = 0));
    const modeBtn = $("statmode");
    modeBtn.addEventListener("click", () => {
      this.statMode = STAT_MODES[(STAT_MODES.indexOf(this.statMode) + 1) % STAT_MODES.length];
      modeBtn.textContent = this.statMode;
      this.lastPanels = 0;
    });
    this.wireMinimap();
  }

  // Minimap: click-to-recenter (world coords from the click fraction) + a drag handle to resize the panel.
  private wireMinimap() {
    const mm = $("minimap");
    (mm.querySelector("#minibg") as HTMLImageElement).src = assetUrl("/minimap.png"); // CDN or local per config
    const resize = $("mmresize");
    let resizing = false;
    let scrubbing = false;
    // press or drag anywhere on the minimap recenters the camera live (scrub) — no accidental panning.
    const recenterAt = (e: PointerEvent) => {
      const r = mm.getBoundingClientRect();
      const fx = (e.clientX - r.left) / r.width;
      const fy = (e.clientY - r.top) / r.height;
      this.onMinimapClick(fx * 2 * MINI_EXT - MINI_EXT, MINI_EXT - fy * 2 * MINI_EXT);
    };
    resize.addEventListener("pointerdown", (e) => { resizing = true; e.stopPropagation(); resize.setPointerCapture(e.pointerId); });
    mm.addEventListener("pointerdown", (e) => {
      if ((e.target as HTMLElement).id === "mmresize") return;
      scrubbing = true;
      mm.setPointerCapture(e.pointerId);
      recenterAt(e);
    });
    window.addEventListener("pointermove", (e) => {
      if (resizing) {
        const r = mm.getBoundingClientRect();
        const size = Math.max(180, Math.min(700, Math.max(e.clientX - r.left, r.bottom - e.clientY)));
        mm.style.width = `${size}px`;
        mm.style.height = `${size}px`;
      } else if (scrubbing) {
        recenterAt(e);
      }
    });
    window.addEventListener("pointerup", () => { resizing = false; scrubbing = false; });
  }

  /** Ground-projected screen corners (world coords), drawn as the viewport box on the minimap. Set by main. */
  setViewport(corners: { x: number; y: number }[]): void {
    this.viewport = corners;
  }

  private portrait(row: HTMLElement, slot: number): HTMLElement {
    const el = document.createElement("div");
    el.className = "por click";
    el.dataset.slot = String(slot);
    el.innerHTML = "<i class='hp'></i>";
    el.addEventListener("click", () => {
      const h = el.dataset.handle;
      if (h) this.onFocus(Number(h));
    });
    row.appendChild(el);
    return el;
  }

  setStatus(live: string, detail: string) {
    $("livelbl").textContent = live;
    $("status").textContent = detail;
  }

  setFps(fps: number, memMB?: number) {
    $("fps").textContent = `${Math.round(fps)} fps` + (memMB ? ` · ${memMB} MB` : "");
  }

  toggleScoreboard(): void {
    this.scoreboardOn = !this.scoreboardOn;
    $("scoreboard").classList.toggle("hide", !this.scoreboardOn);
    this.lastPanels = 0;
  }

  update(world: InterpWorld, followHandle: number | null) {
    $("clk").textContent = clock(world.gameTime);
    $("day").textContent = world.dayTime ? "☀ day" : "◐ night";
    $("scR").textContent = String(world.radiantScore);
    $("scD").textContent = String(world.direScore);

    const heroBySlot = new Map<number, UnitState>();
    for (const u of world.units) {
      if ((u.type === UnitType.HERO || u.type === UnitType.ILLUSION) && u.playerSlot !== 255) {
        heroBySlot.set(u.playerSlot, u);
      }
    }

    for (const p of world.players) {
      const arr = p.slot < 5 ? this.rPortraits : this.dPortraits;
      const el = arr[p.slot % 5];
      if (!el) continue;
      const hero = heroBySlot.get(p.slot);
      const frac = hero && hero.maxHp > 0 ? hero.hp / hero.maxHp : 0;
      const alive = hero ? isAlive(hero) : false;
      el.classList.toggle("dead", !alive);
      el.classList.toggle("sel", hero != null && hero.handle === followHandle);
      el.dataset.handle = hero ? String(hero.handle) : "";
      (el.querySelector(".hp") as HTMLElement).style.width = `${Math.round(frac * 100)}%`;
      this.setPortraitImg(el, hero);
      el.title = `${p.name || titleCase(heroShort(hero?.unitName ?? ""))}  ${p.kills}/${p.deaths}/${p.assists}`;
    }

    const rnw = world.players.filter((p) => p.team === RADIANT).reduce((a, p) => a + p.netWorth, 0);
    const dnw = world.players.filter((p) => p.team === DIRE).reduce((a, p) => a + p.netWorth, 0);
    const total = Math.max(1, rnw + dnw);
    ($("nwR") as HTMLElement).style.width = `${(rnw / total) * 100}%`;
    ($("nwD") as HTMLElement).style.width = `${(dnw / total) * 100}%`;
    const diff = rnw - dnw;
    $("nwlbl").textContent = diff === 0 ? "" : `${diff > 0 ? "RADIANT" : "DIRE"} +${(Math.abs(diff) / 1000).toFixed(1)}k`;
    $("nwlbl").style.color = diff >= 0 ? "var(--radiant)" : "var(--dire)";

    this.updateConsole(world, followHandle);

    const now = performance.now();
    if (now - this.lastPanels > 300) {
      this.updateStats(world, heroBySlot, followHandle);
      if (this.scoreboardOn) this.updateScoreboard(world, heroBySlot);
      this.lastPanels = now;
    }
    if (now - this.lastMini > 120) {
      this.updateMinimap(world);
      this.lastMini = now;
    }
  }

  private setPortraitImg(el: HTMLElement, hero?: UnitState) {
    const want = hero ? heroImg(hero.unitName) : "";
    if (el.dataset.img === want) return;
    el.dataset.img = want;
    el.querySelector("img")?.remove();
    if (!want) return;
    const img = document.createElement("img");
    img.src = want;
    img.onerror = () => img.remove();
    el.insertBefore(img, el.firstChild);
  }

  private updateConsole(world: InterpWorld, followHandle: number | null) {
    const box = $("console");
    const u = followHandle != null ? world.units.find((x) => x.handle === followHandle) : undefined;
    if (!u) {
      box.classList.add("hide");
      return;
    }
    box.classList.remove("hide");
    const isHero = u.type === UnitType.HERO || u.type === UnitType.ILLUSION;
    const player = isHero && u.playerSlot !== 255 ? world.players.find((p) => p.slot === u.playerSlot) : undefined;
    $("cname").textContent = `${unitLabel(u, player)}${isHero && u.level ? ` · Lv ${u.level}` : ""}`;

    // hero portrait image in the console (only for heroes)
    const cport = $("cport");
    const wantImg = isHero ? heroImg(u.unitName) : "";
    if (cport.dataset.img !== wantImg) {
      cport.dataset.img = wantImg;
      cport.querySelector("img")?.remove();
      if (wantImg) {
        const img = document.createElement("img");
        img.src = wantImg;
        img.onerror = () => img.remove();
        cport.appendChild(img);
      }
    }

    ($("chp") as HTMLElement).style.width = `${u.maxHp > 0 ? (u.hp / u.maxHp) * 100 : 0}%`;
    ($("cmp") as HTMLElement).style.width = `${u.maxMp > 0 ? (u.mp / u.maxMp) * 100 : 0}%`;
    $("chpNum").textContent = `${Math.max(0, u.hp)} / ${u.maxHp}`;
    $("cmpNum").textContent = `${Math.max(0, u.mp)} / ${u.maxMp}`;

    // stats line (heroes only) — cheap text, safe every frame
    $("cstats").innerHTML = isHero
      ? `<span class="str">STR <b>${u.strength}</b></span><span class="agi">AGI <b>${u.agility}</b></span>` +
        `<span class="int">INT <b>${u.intellect}</b></span><span class="ms">◈ <b>${u.moveSpeed}</b></span>`
      : "";

    // items + abilities: rebuild the icon DOM only when the set changes (avoids per-frame <img> churn/flicker)
    const items = $("citems");
    const cabil = $("cabil");
    items.classList.toggle("hide", !isHero);
    cabil.classList.toggle("hide", !isHero || u.abilities.length === 0);
    ($("gold").parentElement as HTMLElement).style.visibility = isHero ? "visible" : "hidden";
    const sig = isHero ? `${u.handle}|${u.items.join(",")}|${u.abilities.map((a) => a.name + ":" + a.level).join(",")}` : "none";
    if (sig !== this.consoleSig) {
      this.consoleSig = sig;
      this.rebuildItems(items, isHero ? u.items : []);
      this.rebuildAbilities(cabil, isHero ? u.abilities : []);
    }
    if (isHero) {
      $("gold").textContent = String(player?.netWorth ?? 0);
      // tick each ability's cooldown overlay every frame from the absolute cooldown-end time
      for (let i = 0; i < u.abilities.length && i < cabil.children.length; i++) {
        const cd = cabil.children[i].querySelector(".cd") as HTMLElement | null;
        if (!cd) continue;
        const rem = u.abilities[i].cooldownEnd > 0 ? u.abilities[i].cooldownEnd - world.gameTime : 0;
        if (rem > 0.05) { cd.textContent = String(Math.ceil(rem)); cd.style.display = "flex"; }
        else { cd.style.display = "none"; }
      }
    }
  }

  private rebuildItems(container: HTMLElement, itemNames: string[]) {
    container.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const it = document.createElement("i");
      const name = itemNames[i];
      if (name) {
        it.className = "f";
        it.title = name;
        const img = document.createElement("img");
        img.src = `https://cdn.datdota.com/images/items/${encodeURIComponent(name)}.png`;
        img.alt = name;
        img.loading = "lazy";
        img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:3px;";
        img.onerror = () => { img.remove(); it.textContent = name.replace(/_/g, " ").slice(0, 7); };
        it.appendChild(img);
      }
      container.appendChild(it);
    }
  }

  private rebuildAbilities(container: HTMLElement, abilities: UnitState["abilities"]) {
    container.innerHTML = "";
    for (const a of abilities.slice(0, 6)) {
      const el = document.createElement("div");
      el.className = a.level > 0 ? "ab" : "ab unlearned";
      el.title = titleCase(a.name.replace(/^.*?_/, ""));
      const pips = Array.from({ length: 4 }, (_, i) => `<i class="${i < a.level ? "on" : ""}"></i>`).join("");
      el.innerHTML =
        `<img src="${abilityImg(a.name)}"/>` +
        `<div class="cd" style="display:none"></div><div class="lv">${pips}</div>`;
      container.appendChild(el);
    }
    hideBrokenImgs(container);
  }

  private updateStats(world: InterpWorld, heroBySlot: Map<number, UnitState>, followHandle: number | null) {
    const key = ($("statsel") as HTMLSelectElement).value;
    const def = STATS[key] ?? STATS.kda;
    const box = $("statrows");
    const row = (p: PlayerState) => {
      const hero = heroBySlot.get(p.slot);
      const sel = hero != null && hero.handle === followHandle ? " sel" : "";
      const team = p.team === RADIANT ? "r" : "d";
      const handle = hero ? hero.handle : "";
      const pic = hero ? `<img class="pic" src="${heroImg(hero.unitName)}"/>` : `<span class="pic"></span>`;
      const nm = p.name || titleCase(heroShort(hero?.unitName ?? "")) || "—";
      return `<div class="srow ${team} click${sel}" data-handle="${handle}">${pic}<span class="nm">${escapeHtml(nm)}</span><span class="val">${def.value(p, hero)}</span></div>`;
    };
    let players = world.players.slice();
    if (this.statMode === "Radiant") players = players.filter((p) => p.team === RADIANT).sort((a, b) => a.slot - b.slot);
    else if (this.statMode === "Dire") players = players.filter((p) => p.team === DIRE).sort((a, b) => a.slot - b.slot);
    else if (this.statMode === "Sorted") players.sort((a, b) => def.num(b, heroBySlot.get(b.slot)) - def.num(a, heroBySlot.get(a.slot)));
    else players.sort((a, b) => a.slot - b.slot); // Both: radiant (0-4) then dire (5-9)
    box.innerHTML = players.map(row).join("");
    hideBrokenImgs(box);
    box.querySelectorAll<HTMLElement>(".srow").forEach((r) => {
      const h = r.dataset.handle;
      if (h) r.addEventListener("click", () => this.onFocus(Number(h)));
    });
  }

  private updateScoreboard(world: InterpWorld, heroBySlot: Map<number, UnitState>) {
    const teamBlock = (team: number, name: string, cls: string, score: number) => {
      const rows = world.players
        .filter((p) => p.team === team)
        .sort((a, b) => a.slot - b.slot)
        .map((p) => {
          const hero = heroBySlot.get(p.slot);
          const handle = hero ? hero.handle : "";
          const pic = hero ? `<img class="hpic" src="${heroImg(hero.unitName)}"/>` : "";
          const pname = escapeHtml(p.name || "—");
          const hname = escapeHtml(titleCase(heroShort(hero?.unitName ?? "")));
          return `<tr class="click" data-handle="${handle}">
            <td class="l">${pic}<span class="pname">${pname}</span> <span class="hname">${hname}</span></td>
            <td>${hero?.level ?? 0}</td><td class="gold">${p.netWorth.toLocaleString()}</td>
            <td>${p.kills}</td><td>${p.deaths}</td><td>${p.assists}</td></tr>`;
        })
        .join("");
      return `<div class="sb-team ${cls}"><span>${name}</span><span class="sb-score">${score}</span></div>
        <table class="sb"><thead><tr><th class="l">Player</th><th>Lvl</th><th>Net</th><th>K</th><th>D</th><th>A</th></tr></thead>
        <tbody>${rows}</tbody></table>`;
    };
    const sb = $("scoreboard");
    sb.innerHTML =
      teamBlock(RADIANT, "The Radiant", "r", world.radiantScore) +
      teamBlock(DIRE, "The Dire", "d", world.direScore) +
      `<div class="sb-hint">press <b>s</b> to close · click a row to follow</div>`;
    hideBrokenImgs(sb);
    sb.querySelectorAll<HTMLElement>("tr.click").forEach((r) => {
      const h = r.dataset.handle;
      if (h) r.addEventListener("click", () => this.onFocus(Number(h)));
    });
  }

  private updateMinimap(world: InterpWorld) {
    const mmx = (wx: number) => ((wx + MINI_EXT) / (2 * MINI_EXT)) * 250;
    const mmy = (wy: number) => ((MINI_EXT - wy) / (2 * MINI_EXT)) * 250;
    const dot = (wx: number, wy: number, col: string, r: number, stroke = "") =>
      `<circle cx="${mmx(wx).toFixed(1)}" cy="${mmy(wy).toFixed(1)}" r="${r}" fill="${col}"${stroke}/>`;
    let s = "";
    let heroImgs = ""; // heroes drawn last (on top) as circular minihero icons
    for (const u of world.units) {
      if (!isAlive(u)) continue;
      const col = u.team === RADIANT ? "#63c46e" : u.team === DIRE ? "#e35d54" : "#9aa4ae";
      if ((u.type === UnitType.HERO || u.type === UnitType.ILLUSION) && u.playerSlot !== 255) {
        const cx = mmx(u.x), cy = mmy(u.y), r = 8;
        heroImgs +=
          `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r + 1}" fill="${col}" stroke="#0a0d12" stroke-width="0.6"/>` +
          `<image href="${miniheroImg(u.unitName)}" x="${(cx - r).toFixed(1)}" y="${(cy - r).toFixed(1)}" width="${2 * r}" height="${2 * r}" clip-path="circle(50%)" preserveAspectRatio="xMidYMid slice"/>`;
      } else if (u.type === UnitType.BUILDING) s += dot(u.x, u.y, col, 2.4);
      else if (u.type === UnitType.ROSHAN) s += dot(u.x, u.y, "#e6b24c", 3.4);
      else if (u.type === UnitType.NEUTRAL) s += dot(u.x, u.y, "#c9a24b", 1.5); // neutral camps (amber)
      else if (u.type === UnitType.CREEP) s += dot(u.x, u.y, col, 1.3);
      else if (u.type === UnitType.WARD_OBS || u.type === UnitType.WARD_SEN) s += dot(u.x, u.y, "#dfe6ee", 1.6);
    }
    s += heroImgs;
    // current camera viewport as a trapezium (ground-projected screen corners, set by main each frame)
    if (this.viewport.length === 4) {
      const pts = this.viewport.map((c) => `${mmx(c.x).toFixed(1)},${mmy(c.y).toFixed(1)}`).join(" ");
      s += `<polygon points="${pts}" fill="rgba(255,255,255,0.06)" stroke="#dfe6ee" stroke-width="1.2" stroke-opacity="0.8"/>`;
    }
    $("mini").innerHTML = s;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}
