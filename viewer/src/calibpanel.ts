// Live calibration panel. Toggle with the "c" key (open by default with ?calibrate). Drag sliders to align the
// map, scale hero/building models, fix the facing offset, and isolate categories — then copy the values from
// the readout into public/terrain/terrain.json (map) and the code defaults (models).

import { calib } from "./calib.js";
import type { Terrain } from "./render/terrain.js";

interface PanelDeps {
  rebuild: () => void;
  terrain: Terrain;
  startWizard: () => void;
}

interface Row {
  label: string;
  key: keyof typeof calib;
  min: number;
  max: number;
  step: number;
  map?: boolean; // triggers a terrain rebuild
}

const ROWS: Row[] = [
  { label: "map cx", key: "mapCx", min: 0, max: 4096, step: 1, map: true },
  { label: "map cy", key: "mapCy", min: 0, max: 4096, step: 1, map: true },
  { label: "map scale", key: "mapScale", min: 0.05, max: 0.6, step: 0.001, map: true },
  { label: "hero scale", key: "heroScale", min: 1, max: 90, step: 0.25 },
  { label: "building scale", key: "buildingScale", min: 1, max: 140, step: 0.5 },
  { label: "facing°", key: "yawOffsetDeg", min: -180, max: 180, step: 5 },
];

const TOGGLES: { label: string; key: keyof typeof calib; map?: boolean }[] = [
  { label: "heroes", key: "showHeroes" },
  { label: "creeps", key: "showCreeps" },
  { label: "buildings", key: "showBuildings" },
  { label: "map", key: "showMap", map: true },
];

export function createCalibPanel(deps: PanelDeps): void {
  const onMapChange = deps.rebuild;
  const panel = document.createElement("div");
  panel.id = "calib";
  panel.style.cssText =
    "position:fixed;top:44px;right:12px;width:250px;background:rgba(12,17,23,.94);border:1px solid #2c3a48;" +
    "border-radius:8px;padding:10px 12px;font:11px ui-monospace,monospace;color:#d6dee7;z-index:50;" +
    "pointer-events:auto;box-shadow:0 10px 30px -8px #000;";
  const open = new URLSearchParams(location.search).has("calibrate");
  panel.style.display = open ? "block" : "none";

  const readout = document.createElement("pre");
  readout.style.cssText = "margin:8px 0 0;padding:8px;background:#080c11;border-radius:5px;color:#8fe39c;white-space:pre-wrap;font-size:10px;";

  const refresh = () => {
    readout.textContent =
      `terrain.json:\n  "center_px": [${Math.round(calib.mapCx)}, ${Math.round(calib.mapCy)}],\n` +
      `  "scale": ${calib.mapScale.toFixed(3)}\n` +
      `models: hero ${calib.heroScale.toFixed(2)}  bldg ${calib.buildingScale.toFixed(2)}  facing ${calib.yawOffsetDeg}°`;
  };

  const title = document.createElement("div");
  title.textContent = "CALIBRATION  ·  c to hide";
  title.style.cssText = "letter-spacing:.14em;color:#54bccb;margin-bottom:8px;";
  panel.appendChild(title);

  const syncers: (() => void)[] = [];

  // base-layer selector + wizard launcher
  const layerRow = document.createElement("div");
  layerRow.style.cssText = "display:flex;gap:6px;margin-bottom:8px;";
  const sel = document.createElement("select");
  sel.style.cssText = "flex:1;background:#0c1219;color:#d6dee7;border:1px solid #2c3a48;border-radius:5px;padding:3px;";
  for (const l of deps.terrain.layers) {
    const opt = document.createElement("option");
    opt.value = l.id;
    opt.textContent = l.label;
    sel.appendChild(opt);
  }
  sel.value = calib.layerId;
  sel.addEventListener("change", async () => {
    await deps.terrain.switchLayer(sel.value);
    syncers.forEach((s) => s());
    refresh();
  });
  const wizBtn = document.createElement("button");
  wizBtn.textContent = "Wizard";
  wizBtn.style.cssText = "background:#173042;color:#54bccb;border:1px solid #54bccb;border-radius:5px;padding:3px 10px;cursor:pointer;";
  wizBtn.addEventListener("click", () => deps.startWizard());
  layerRow.append(sel, wizBtn);
  panel.appendChild(layerRow);

  for (const row of ROWS) {
    const wrap = document.createElement("label");
    wrap.style.cssText = "display:grid;grid-template-columns:74px 1fr 46px;align-items:center;gap:6px;margin:4px 0;";
    const name = document.createElement("span");
    name.textContent = row.label;
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(row.min);
    slider.max = String(row.max);
    slider.step = String(row.step);
    slider.value = String(calib[row.key] as number);
    const val = document.createElement("span");
    val.style.textAlign = "right";
    val.textContent = String(calib[row.key]);
    slider.addEventListener("input", () => {
      (calib[row.key] as number) = Number(slider.value);
      val.textContent = row.step < 1 ? Number(slider.value).toFixed(3) : slider.value;
      if (row.map) onMapChange();
      refresh();
    });
    syncers.push(() => {
      slider.value = String(calib[row.key]);
      val.textContent = row.step < 1 ? Number(calib[row.key]).toFixed(3) : String(calib[row.key]);
    });
    wrap.append(name, slider, val);
    panel.appendChild(wrap);
  }

  const toggleRow = document.createElement("div");
  toggleRow.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;";
  for (const t of TOGGLES) {
    const lab = document.createElement("label");
    lab.style.cssText = "display:flex;gap:4px;align-items:center;cursor:pointer;";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = calib[t.key] as boolean;
    cb.addEventListener("change", () => {
      (calib[t.key] as boolean) = cb.checked;
      if (t.map) onMapChange();
    });
    lab.append(cb, document.createTextNode(t.label));
    toggleRow.appendChild(lab);
  }
  panel.appendChild(toggleRow);
  panel.appendChild(readout);
  refresh();

  document.body.appendChild(panel);
  window.addEventListener("keydown", (e) => {
    if (e.key === "c" && !e.metaKey && !e.ctrlKey) {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    }
  });
}
