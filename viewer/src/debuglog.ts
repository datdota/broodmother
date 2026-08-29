// Lightweight in-page diagnostics console. Collects notable client-side events — missing models (falling back
// to a representative/default), failed model loads, anything unexpected — deduped with a repeat count. Toggle
// with the `~` (backtick) key. Self-contained: builds its own DOM + styles, no index.html changes.

type Kind = "warn" | "error" | "info";
interface Entry { t: number; kind: Kind; msg: string; count: number; }

const entries: Entry[] = [];
const index = new Map<string, Entry>();
const MAX = 300;

let panel: HTMLElement | null = null;
let listEl: HTMLElement | null = null;
let badge: HTMLElement | null = null;
let open = false;

/** Build the panel + key binding up front so `~` works even before the first log. */
export function initDebugLog(): void {
  ensure();
}

export function dlog(kind: Kind, msg: string): void {
  const key = `${kind}|${msg}`;
  const existing = index.get(key);
  if (existing) {
    existing.count++;
    existing.t = performance.now();
  } else {
    const e: Entry = { t: performance.now(), kind, msg, count: 1 };
    index.set(key, e);
    entries.push(e);
    if (entries.length > MAX) {
      const old = entries.shift();
      if (old) index.delete(`${old.kind}|${old.msg}`);
    }
  }
  ensure();
  updateBadge();
  if (open) renderList();
}

function ensure(): void {
  if (panel) return;
  const style = document.createElement("style");
  style.textContent = `
    #dbgbadge { position:fixed; bottom:8px; right:8px; z-index:200; font:11px ui-monospace,Menlo,monospace;
      background:rgba(10,14,20,.82); color:#e6b24c; border:1px solid #3b4450; border-radius:6px; padding:3px 8px;
      cursor:pointer; pointer-events:auto; display:none; }
    #dbgbadge:hover { border-color:#54bccb; }
    #dbgpanel { position:fixed; right:8px; bottom:34px; z-index:200; width:min(560px,92vw); max-height:52vh;
      display:none; flex-direction:column; background:rgba(8,11,15,.96); border:1px solid #3b4450; border-radius:8px;
      box-shadow:0 12px 40px -10px #000; font:12px ui-monospace,Menlo,monospace; color:#d6dee7; overflow:hidden; }
    #dbgpanel.open { display:flex; }
    #dbgpanel .hd { display:flex; align-items:center; gap:10px; padding:7px 10px; border-bottom:1px solid #202c38;
      color:#54bccb; letter-spacing:.1em; text-transform:uppercase; font-size:10px; }
    #dbgpanel .hd .sp { margin-left:auto; }
    #dbgpanel .hd button { background:#173042; color:#54bccb; border:1px solid #2a4658; border-radius:4px;
      padding:2px 8px; font:inherit; cursor:pointer; }
    #dbglist { overflow:auto; padding:4px 0; }
    #dbglist .row { display:flex; gap:8px; padding:2px 10px; white-space:pre-wrap; word-break:break-word; }
    #dbglist .row .k { flex:none; width:46px; text-transform:uppercase; font-size:10px; padding-top:1px; }
    #dbglist .row.warn .k { color:#e6b24c; } #dbglist .row.error .k { color:#e35d54; } #dbglist .row.info .k { color:#54bccb; }
    #dbglist .row .n { flex:none; color:#5a636d; } #dbglist .row .m { color:#d6dee7; }
    #dbglist .empty { color:#5a636d; padding:10px; }
  `;
  document.head.appendChild(style);

  badge = document.createElement("div");
  badge.id = "dbgbadge";
  badge.title = "diagnostics — press ` to toggle";
  badge.addEventListener("click", toggle);

  panel = document.createElement("div");
  panel.id = "dbgpanel";
  panel.innerHTML =
    `<div class="hd"><span>Diagnostics</span><span class="sp"></span>` +
    `<button id="dbgclear">clear</button><button id="dbgclose">close ~</button></div><div id="dbglist"></div>`;
  document.body.append(badge, panel);
  listEl = panel.querySelector("#dbglist");
  panel.querySelector("#dbgclose")!.addEventListener("click", toggle);
  panel.querySelector("#dbgclear")!.addEventListener("click", () => { entries.length = 0; index.clear(); updateBadge(); renderList(); });

  window.addEventListener("keydown", (e) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
    if (e.key === "`" || e.key === "~") { e.preventDefault(); toggle(); }
  });
}

function toggle(): void {
  open = !open;
  panel?.classList.toggle("open", open);
  if (open) renderList();
}

function updateBadge(): void {
  if (!badge) return;
  const warns = entries.filter((e) => e.kind !== "info").reduce((a, e) => a + e.count, 0);
  badge.style.display = entries.length ? "block" : "none";
  badge.textContent = `⚠ ${warns} · \` log`;
}

function renderList(): void {
  if (!listEl) return;
  if (!entries.length) { listEl.innerHTML = `<div class="empty">no diagnostics</div>`; return; }
  listEl.innerHTML = entries
    .slice()
    .reverse()
    .map((e) => `<div class="row ${e.kind}"><span class="k">${e.kind}</span><span class="n">${e.count > 1 ? "×" + e.count : ""}</span><span class="m">${escapeHtml(e.msg)}</span></div>`)
    .join("");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}
