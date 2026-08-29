// Start picker: lists live games (/api/v2/private/source-tv) and local replays (/api/v2/private/replays) from the backend
// (via the dev proxy / API_BASE), and connects the stream to the chosen one. Shown when no target is in the URL.
// Public mode (no token) uses the unauthenticated /api/v2/public/live-games; private mode (token set) uses
// /api/v2/private/source-tv + /replays. Replays are private-only.

import { apiUrl, authHeaders, isPublic } from "./config.js";

export interface PickTarget {
  serverId?: string;
  replay?: string;
}

/** Normalized live-game row, from either the public or private endpoint. */
interface Row {
  serverId: string;
  gameTime: number;
  radiantScore: number;
  direScore: number;
  spectators: number;
  averageMmr: number;
  leagueId: number;
  covered?: boolean; // public only: are we currently streaming it
}

interface Replay {
  name: string;
  sizeBytes: number;
  modifiedEpochMs: number;
}

const css = `
#picker { position:fixed; inset:0; z-index:100; background:radial-gradient(120% 90% at 50% 0%,#111a24,#0a0d12 70%);
  display:flex; flex-direction:column; align-items:center; font-family:ui-monospace,Menlo,monospace; color:#d6dee7; overflow:auto; }
#picker h1 { font-family:system-ui,sans-serif; font-weight:800; letter-spacing:-.02em; font-size:30px; margin:48px 0 2px; }
#picker .sub { color:#8b96a1; font-size:13px; margin-bottom:26px; }
#picker .cols { display:flex; gap:22px; width:min(1000px,92vw); align-items:flex-start; }
#picker .col { flex:1; background:#0e131b; border:1px solid #202c38; border-radius:10px; padding:14px; min-height:120px; }
#picker .col h2 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:#54bccb; margin:0 0 10px; display:flex; justify-content:space-between; }
#picker .row { display:block; width:100%; text-align:left; background:#141c26; border:1px solid #223040; border-radius:7px;
  padding:9px 11px; margin-bottom:7px; color:#d6dee7; cursor:pointer; font:inherit; }
#picker .row:hover { border-color:#54bccb; background:#17222e; }
/* Games we're actually streaming (watchable now) — tinted green, sorted to the top of the list.
   NB: not ".live" — that class is the HUD's absolutely-positioned status pill in index.html. */
#picker .row.is-covered { border-color:#2f6d3a; background:#15251b; }
#picker .row.is-covered:hover { border-color:#63c46e; background:#193020; }
#picker .row .live-badge { display:inline-block; color:#63c46e; font-weight:700; font-size:10px; letter-spacing:.1em;
  border:1px solid #2f6d3a; border-radius:4px; padding:1px 6px; margin-right:8px; vertical-align:1px; }
#picker .row .m { color:#8b96a1; font-size:11px; }
#picker .row .sc { font-weight:700; }
#picker .row .r { color:#63c46e; } #picker .row .d { color:#e35d54; }
#picker .msg { color:#8b96a1; font-size:12px; padding:10px 2px; }
#picker .msg.err { color:#e6b24c; }
#picker .bar { display:flex; gap:10px; align-items:center; margin-top:16px; }
#picker input { background:#0c1219; border:1px solid #223040; border-radius:6px; color:#d6dee7; padding:7px 10px; font:inherit; }
#picker button.act { background:#173042; color:#54bccb; border:1px solid #54bccb; border-radius:6px; padding:7px 14px; cursor:pointer; font:inherit; }
#picker .foot { margin:24px 0 40px; color:#5f6b76; font-size:12px; }
#picker .foot a { color:#54bccb; text-decoration:none; }
#picker .foot a:hover { text-decoration:underline; }
`;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.abs(s % 60)).padStart(2, "0")}`;

export function createPicker(onSelect: (t: PickTarget) => void): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const el = document.createElement("div");
  el.id = "picker";
  el.innerHTML = `
    <h1>Dota Observer 3D</h1>
    <div class="sub">pick a live game or a replay to spectate</div>
    <div class="cols">
      <div class="col"><h2>Live games <span id="gspin" class="m">loading…</span></h2><div id="games"></div></div>
      <div class="col"><h2>Replays <span id="rspin" class="m">loading…</span></h2><div id="replays"></div></div>
    </div>
    <div class="bar">
      <input id="manual" placeholder="replay filename e.g. 8517496456_913924535.dem" size="42" />
      <button class="act" id="watch">Watch replay</button>
      <button class="act" id="refresh">Refresh</button>
    </div>
    <div class="foot">open source · <a href="http://github.com/datdota/broodmother" target="_blank" rel="noopener noreferrer">github.com/datdota/broodmother</a></div>`;
  document.body.appendChild(el);

  if (isPublic()) {
    // replays are a private/authenticated feature — hide that column and the replay controls in public mode
    (el.querySelectorAll(".col")[1] as HTMLElement).style.display = "none";
    (el.querySelector("#manual") as HTMLElement).style.display = "none";
    (el.querySelector("#watch") as HTMLElement).style.display = "none";
  }

  const pick = (t: PickTarget) => {
    el.remove();
    style.remove();
    onSelect(t);
  };

  async function load() {
    await Promise.all([loadGames(), isPublic() ? Promise.resolve() : loadReplays()]);
  }

  async function loadGames() {
    const box = el.querySelector("#games")!;
    const spin = el.querySelector("#gspin")!;
    try {
      const rows = isPublic() ? await publicGames() : await privateGames();
      spin.textContent = `${rows.length}`;
      box.innerHTML = rows.length ? "" : `<div class="msg">no live games right now</div>`;
      // Streamable ("covered") games first, then most-watched — so what you can actually watch is up top.
      const sorted = rows.sort((a, b) => Number(!!b.covered) - Number(!!a.covered) || b.spectators - a.spectators);
      for (const g of sorted) {
        const b = document.createElement("button");
        b.className = g.covered ? "row is-covered" : "row";
        b.innerHTML =
          `${g.covered ? `<span class="live-badge">● LIVE</span>` : ""}` +
          `<span class="sc">${clock(g.gameTime)}</span> · <span class="r">${g.radiantScore}</span>-<span class="d">${g.direScore}</span>` +
          `<span class="m"> · ${g.spectators} spec${g.averageMmr ? ` · ${g.averageMmr} mmr` : ""}` +
          `${g.leagueId ? ` · league ${g.leagueId}` : ""}</span>`;
        b.onclick = () => pick({ serverId: g.serverId });
        box.appendChild(b);
      }
    } catch (e) {
      spin.textContent = "";
      box.innerHTML = `<div class="msg err">could not load live games (${e}).</div>`;
    }
  }

  async function publicGames(): Promise<Row[]> {
    const res = await fetch(apiUrl("/api/v2/public/live-games"));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return ((data.games ?? []) as Record<string, unknown>[]).map((g): Row => ({
      serverId: String(g.serverId), gameTime: Number(g.gameTime), radiantScore: Number(g.radiantScore),
      direScore: Number(g.direScore), spectators: Number(g.spectators), averageMmr: Number(g.averageMmr),
      leagueId: Number(g.leagueId), covered: Boolean(g.covered),
    }));
  }

  async function privateGames(): Promise<Row[]> {
    const res = await fetch(apiUrl("/api/v2/private/source-tv"), { headers: authHeaders() });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // server_steam_id exceeds JS's safe-integer range, so quote it before parsing to keep it exact.
    const text = (await res.text()).replace(/"server_steam_id":\s*(\d+)/g, '"server_steam_id":"$1"');
    return ((JSON.parse(text).game_list ?? []) as Record<string, unknown>[])
      .filter((g) => g.server_steam_id)
      .map((g): Row => ({
        serverId: String(g.server_steam_id), gameTime: Number(g.game_time), radiantScore: Number(g.radiant_score),
        direScore: Number(g.dire_score), spectators: Number(g.spectators), averageMmr: Number(g.average_mmr),
        leagueId: Number(g.league_id),
      }));
  }

  async function loadReplays() {
    const box = el.querySelector("#replays")!;
    const spin = el.querySelector("#rspin")!;
    try {
      const res = await fetch(apiUrl("/api/v2/private/replays"), { headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reps: Replay[] = (await res.json()).sort((a: Replay, b: Replay) => b.modifiedEpochMs - a.modifiedEpochMs);
      spin.textContent = `${reps.length}`;
      box.innerHTML = "";
      if (!reps.length) box.innerHTML = `<div class="msg">no replays on the server</div>`;
      for (const r of reps) {
        const b = document.createElement("button");
        b.className = "row";
        b.innerHTML = `${r.name} <span class="m">· ${(r.sizeBytes / 1048576).toFixed(0)} MB</span>`;
        b.onclick = () => pick({ replay: r.name });
        box.appendChild(b);
      }
    } catch (e) {
      spin.textContent = "";
      box.innerHTML = `<div class="msg err">server not reachable (${e}).</div>`;
    }
  }

  (el.querySelector("#watch") as HTMLButtonElement).onclick = () => {
    const name = (el.querySelector("#manual") as HTMLInputElement).value.trim();
    if (name) pick({ replay: name });
  };
  (el.querySelector("#refresh") as HTMLButtonElement).onclick = () => load();
  load();
}
