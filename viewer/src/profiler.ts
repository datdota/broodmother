// Perf overlay (toggle with 'p'): per-phase CPU cost, real GPU frame time (WebGL2 timer query), draw-call /
// triangle counts, and toggles to isolate what each subsystem costs. Flip "shadows" off and watch the GPU ms
// drop to read the shadow-pass cost; same for trees / units / projectiles. CPU marks are cheap; the GPU query is
// the honest per-frame number (CPU submit time is not GPU time).

import * as THREE from "three";

export interface Toggle {
  label: string;
  get(): boolean;
  set(v: boolean): void;
}

const PHASES = ["interp", "units", "proj", "hud", "submit"] as const;
type Phase = (typeof PHASES)[number];

export class Profiler {
  visible = false;
  private panel: HTMLDivElement;
  private t0 = 0;
  private last = 0;
  private cpu: Record<Phase, number> = { interp: 0, units: 0, proj: 0, hud: 0, submit: 0 };
  private ema: Record<string, number> = {};
  private frameMs = 0;

  // GPU timer query (EXT_disjoint_timer_query_webgl2): a small ring of in-flight queries read back a few frames later
  private gl: WebGL2RenderingContext;
  private ext: { TIME_ELAPSED_EXT: number; GPU_DISJOINT_EXT: number } | null;
  private inflight: WebGLQuery[] = [];
  private active: WebGLQuery | null = null;
  private gpuMs = 0;

  constructor(private renderer: THREE.WebGLRenderer, private toggles: Toggle[]) {
    this.gl = renderer.getContext() as WebGL2RenderingContext;
    this.ext = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
    this.panel = document.createElement("div");
    this.panel.style.cssText =
      "position:fixed;top:56px;right:8px;z-index:50;font:11px/1.5 ui-monospace,Menlo,monospace;" +
      "background:rgba(8,11,16,.82);color:#cfe0f0;border:1px solid #2a3644;border-radius:6px;padding:8px 10px;" +
      "min-width:190px;display:none;backdrop-filter:blur(4px);user-select:none";
    document.body.appendChild(this.panel);

    window.addEventListener("keydown", (e) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
      if (e.key.toLowerCase() === "p") this.toggle();
    });
  }

  toggle() {
    this.visible = !this.visible;
    this.panel.style.display = this.visible ? "block" : "none";
    if (this.visible) this.render();
  }

  begin() {
    const now = performance.now();
    if (this.last) this.frameMs = now - this.last;
    this.last = now;
    this.t0 = now;
    // start a GPU query for this frame if the extension is present and none is active
    if (this.ext && !this.active) {
      const q = this.gl.createQuery();
      if (q) {
        this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT, q);
        this.active = q;
      }
    }
  }

  mark(phase: Phase) {
    const now = performance.now();
    this.cpu[phase] = now - this.t0;
    this.t0 = now;
  }

  /** Close the GPU query (call right after renderer.render) and drain any finished ones. */
  gpuEnd() {
    if (this.ext && this.active) {
      this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);
      this.inflight.push(this.active);
      this.active = null;
    }
    this.drainGpu();
  }

  private drainGpu() {
    if (!this.ext) return;
    const disjoint = this.gl.getParameter(this.ext.GPU_DISJOINT_EXT);
    while (this.inflight.length) {
      const q = this.inflight[0];
      const avail = this.gl.getQueryParameter(q, this.gl.QUERY_RESULT_AVAILABLE);
      if (!avail) break;
      this.inflight.shift();
      if (!disjoint) this.gpuMs = this.gl.getQueryParameter(q, this.gl.QUERY_RESULT) / 1e6;
      this.gl.deleteQuery(q);
    }
  }

  end() {
    if (!this.visible) return;
    const k = 0.12;
    for (const p of PHASES) this.ema[p] = (this.ema[p] ?? this.cpu[p]) + (this.cpu[p] - (this.ema[p] ?? this.cpu[p])) * k;
    this.ema.frame = (this.ema.frame ?? this.frameMs) + (this.frameMs - (this.ema.frame ?? this.frameMs)) * k;
    this.ema.gpu = (this.ema.gpu ?? this.gpuMs) + (this.gpuMs - (this.ema.gpu ?? this.gpuMs)) * k;
    this.render();
  }

  private render() {
    const info = this.renderer.info.render;
    const f = this.ema.frame ?? 0;
    const rows: string[] = [];
    rows.push(`<b style="color:#fff">${f.toFixed(1)} ms</b>  <span style="color:#8fa">${(1000 / Math.max(0.1, f)).toFixed(0)} fps</span>`);
    rows.push(`GPU ${this.ext ? `${(this.ema.gpu ?? 0).toFixed(2)} ms` : "n/a"}`);
    rows.push(`<hr style="border:0;border-top:1px solid #223;margin:5px 0">`);
    for (const p of PHASES) rows.push(`${p.padEnd(7)}<span style="float:right">${(this.ema[p] ?? 0).toFixed(2)}</span>`);
    rows.push(`<hr style="border:0;border-top:1px solid #223;margin:5px 0">`);
    rows.push(`draws<span style="float:right">${info.calls}</span>`);
    rows.push(`tris<span style="float:right">${(info.triangles / 1000).toFixed(0)}k</span>`);
    rows.push(`<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px" id="prof-tg"></div>`);
    this.panel.innerHTML = rows.join("<br>");

    const box = this.panel.querySelector("#prof-tg")!;
    for (const t of this.toggles) {
      const on = t.get();
      const b = document.createElement("button");
      b.textContent = t.label;
      b.style.cssText =
        `font:10px ui-monospace,monospace;padding:2px 6px;border-radius:4px;cursor:pointer;border:1px solid ${on ? "#3a6" : "#444"};` +
        `background:${on ? "rgba(60,180,110,.25)" : "rgba(60,60,60,.25)"};color:${on ? "#bfe" : "#889"}`;
      b.onclick = () => { t.set(!t.get()); this.render(); };
      box.appendChild(b);
    }
  }
}
