// Entities window (toggle with "e"): lists every live entity from the current world, grouped by type + name,
// with a per-group indication of whether it's actually drawn — real glTF model vs primitive fallback vs hidden.
// A coverage/diagnostics aid: spot pre-allocated Monkey King illusions in the base, creeps with no real model,
// wards/roshan falling back to primitives, etc.

import { UnitType, RADIANT, DIRE, type UnitState } from "./world/types.js";
import type { InterpWorld } from "./world/snapshot.js";

const TYPE_NAME: Record<number, string> = {
  [UnitType.UNKNOWN]: "unknown",
  [UnitType.HERO]: "heroes",
  [UnitType.ILLUSION]: "illusions",
  [UnitType.CREEP]: "lane creeps",
  [UnitType.NEUTRAL]: "neutrals",
  [UnitType.WARD_OBS]: "obs wards",
  [UnitType.WARD_SEN]: "sentry wards",
  [UnitType.BUILDING]: "buildings",
  [UnitType.COURIER]: "couriers",
  [UnitType.ROSHAN]: "roshan",
};
const TYPE_ORDER = [1, 2, 7, 3, 4, 5, 6, 9, 8, 0];

const css = `
#ents { position:fixed; top:0; right:0; bottom:0; width:min(420px,42vw); z-index:90; display:none;
  flex-direction:column; background:rgba(10,14,20,.94); border-left:1px solid #223040; color:#d6dee7;
  font:12px/1.4 ui-monospace,Menlo,monospace; box-shadow:-8px 0 30px rgba(0,0,0,.45); }
#ents.open { display:flex; }
#ents header { padding:10px 12px; border-bottom:1px solid #223040; display:flex; justify-content:space-between; align-items:baseline; }
#ents header b { font-size:13px; letter-spacing:.04em; }
#ents header .x { cursor:pointer; color:#8b96a1; padding:0 4px; }
#ents .sum { padding:8px 12px; color:#8b96a1; border-bottom:1px solid #182430; }
#ents .sum b { color:#d6dee7; }
#ents .list { overflow:auto; flex:1; padding:4px 0 40px; }
#ents .grp { padding:7px 12px 2px; color:#54bccb; text-transform:uppercase; letter-spacing:.12em; font-size:10px; }
#ents .row { display:grid; grid-template-columns:10px 1fr auto auto; gap:8px; align-items:center; padding:2px 12px; }
#ents .row .dot { width:8px; height:8px; border-radius:50%; }
#ents .row .nm { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
#ents .row .ct { color:#8b96a1; font-variant-numeric:tabular-nums; }
#ents .badge { font-size:10px; padding:1px 6px; border-radius:9px; border:1px solid; }
#ents .b-model { color:#63c46e; border-color:#2f5a37; }
#ents .b-prim  { color:#e6b24c; border-color:#5a4a24; }
#ents .b-hidden{ color:#e35d54; border-color:#5a2a28; }
#ents .b-mixed { color:#54bccb; border-color:#24505a; }
`;

const teamColor = (t: number) => (t === RADIANT ? "#63c46e" : t === DIRE ? "#e35d54" : "#9aa4ae");

interface Deps {
  getWorld: () => InterpWorld | undefined;
  renderInfo: (handle: number) => { hasModel: boolean; visible: boolean } | undefined;
}

interface Group {
  type: number;
  name: string;
  team: number;
  count: number;
  visible: number;
  model: number;
}

export function createEntitiesPanel(deps: Deps): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const el = document.createElement("div");
  el.id = "ents";
  el.innerHTML = `<header><b>Entities <span style="color:#8b96a1">· "e" to toggle</span></b><span class="x">✕</span></header>
    <div class="sum"></div><div class="list"></div>`;
  document.body.appendChild(el);

  const sum = el.querySelector(".sum") as HTMLElement;
  const list = el.querySelector(".list") as HTMLElement;
  let timer: ReturnType<typeof setInterval> | undefined;

  const close = () => {
    el.classList.remove("open");
    if (timer) clearInterval(timer);
    timer = undefined;
  };
  const open = () => {
    el.classList.add("open");
    refresh();
    timer = setInterval(refresh, 500);
  };
  (el.querySelector(".x") as HTMLElement).onclick = close;
  addEventListener("keydown", (e) => {
    if (e.key === "e" && !(e.target instanceof HTMLInputElement)) {
      el.classList.contains("open") ? close() : open();
    }
  });

  function refresh() {
    const world = deps.getWorld();
    if (!world) {
      sum.textContent = "no live world";
      list.innerHTML = "";
      return;
    }
    // group by type + unit_name
    const groups = new Map<string, Group>();
    let total = 0;
    let shown = 0;
    for (const u of world.units as Iterable<UnitState>) {
      total++;
      const info = deps.renderInfo(u.handle);
      if (info?.visible) shown++;
      const name = u.unitName || `(anon ${TYPE_NAME[u.type] ?? u.type})`;
      const key = `${u.type}|${name}`;
      let g = groups.get(key);
      if (!g) {
        g = { type: u.type, name, team: u.team, count: 0, visible: 0, model: 0 };
        groups.set(key, g);
      }
      g.count++;
      if (info?.visible) g.visible++;
      if (info?.hasModel) g.model++;
    }

    sum.innerHTML = `<b>${total}</b> entities · <b>${shown}</b> drawn · <b>${groups.size}</b> kinds`;

    const byType = new Map<number, Group[]>();
    for (const g of groups.values()) (byType.get(g.type) ?? byType.set(g.type, []).get(g.type)!).push(g);

    const parts: string[] = [];
    for (const type of TYPE_ORDER) {
      const gs = byType.get(type);
      if (!gs) continue;
      gs.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
      const typeTotal = gs.reduce((n, g) => n + g.count, 0);
      parts.push(`<div class="grp">${TYPE_NAME[type] ?? type} · ${typeTotal}</div>`);
      for (const g of gs) {
        parts.push(
          `<div class="row"><span class="dot" style="background:${teamColor(g.team)}"></span>` +
            `<span class="nm" title="${g.name}">${g.name}</span>` +
            `<span class="ct">×${g.count}</span>${badge(g)}</div>`,
        );
      }
    }
    list.innerHTML = parts.join("");
  }
}

function badge(g: Group): string {
  if (g.visible === 0) return `<span class="badge b-hidden">hidden</span>`;
  if (g.model === g.count) return `<span class="badge b-model">model</span>`;
  if (g.model === 0) return `<span class="badge b-prim">primitive</span>`;
  return `<span class="badge b-mixed">${g.model}/${g.count} model</span>`;
}
