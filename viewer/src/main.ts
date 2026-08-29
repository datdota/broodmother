// Entry point: connect the v2 stream, reconstruct + interpolate the world, and drive the Three.js scene, camera
// rig, and observer HUD. Render at now-150ms so motion is always straddled by two real snapshots.

import * as THREE from "three";
import { createStage } from "./render/renderer.js";
import { loadTerrain } from "./render/terrain.js";
import { UnitLayer } from "./render/units.js";
import { DotaCamera } from "./render/camera.js";
import { Hud } from "./hud.js";
import { StreamClient, type StreamTarget } from "./net/ws.js";
import { runDemo } from "./net/demo.js";
import { createCalibPanel } from "./calibpanel.js";
import { CalibWizard } from "./wizard.js";
import { createEntitiesPanel } from "./entitiespanel.js";
import { createPicker } from "./picker.js";
import { ProjectileLayer } from "./render/projectiles.js";
import { loadTrees } from "./render/trees.js";
import { initDebugLog } from "./debuglog.js";
import { Profiler } from "./profiler.js";
import { apiToken } from "./config.js";

initDebugLog();

const DELAY_MS = 150;
const q = new URLSearchParams(location.search);
const TOKEN = apiToken(); // "" for the public build; set via ?token= or VITE_API_TOKEN for the private API

function target(): StreamTarget {
  return {
    token: TOKEN,
    serverId: q.get("serverId") ?? undefined,
    replay: q.get("replay") ?? undefined,
    interval: q.get("interval") ? Number(q.get("interval")) : undefined,
    startTick: q.get("startTick") ? Number(q.get("startTick")) : undefined,
  };
}

const app = document.getElementById("app")!;
const stage = createStage(app);
const hud = new Hud();
const client = new StreamClient();

client.onStats = (s) => {
  const detail =
    `frames ${s.frames} · tick ${s.tick} · ${(s.bytesPerSec / 1024).toFixed(1)} KB/s · ${(s.bytes / 1024).toFixed(0)} KB total` +
    (s.message ? ` · ${s.message}` : "");
  hud.setStatus(s.state.toUpperCase(), detail);
};

// Connect, and watch for the case where the socket opens but no frames ever arrive — a live game that is
// paused/ended/unwatchable (the server accepts the subscribe but drops coverage). Surface it instead of
// sitting on a silent "LIVE / frames 0".
let watchdog: ReturnType<typeof setTimeout> | undefined;
function startConnect(t: StreamTarget): void {
  client.connect(t);
  clearTimeout(watchdog);
  watchdog = setTimeout(() => {
    if (client.stats.frames === 0) {
      const what = t.serverId ? `live game ${t.serverId}` : `replay ${t.replay}`;
      hud.setStatus("NO DATA", `${what} sent no frames — it may be paused/ended/unavailable. Reload to pick another.`);
    }
  }, 12000);
}

if (q.has("demo")) {
  hud.setStatus("DEMO", "fixture replay (no server)");
  runDemo(client);
} else if (q.get("replay") || q.get("serverId")) {
  startConnect(target());
} else {
  hud.setStatus("PICK", "choose a game or replay");
  createPicker((t) => startConnect({ token: TOKEN, interval: 2, ...t }));
}

loadTerrain().then((terrain) => {
  stage.scene.add(terrain.mesh);
  let treesGroup: THREE.Group | undefined;
  loadTrees(terrain.heightAt).then((trees) => { treesGroup = trees; stage.scene.add(trees); }).catch(() => {});
  const units = new UnitLayer(terrain.heightAt);
  stage.scene.add(units.group);
  const projectiles = new ProjectileLayer((h) => units.scenePos(h));
  stage.scene.add(projectiles.group);

  // Perf overlay ('p'): per-part cost + toggles. Flipping "shadows" forces material recompile so the delta in
  // GPU ms is the true shadow-pass cost; trees/units/proj just hide their group.
  const prof = new Profiler(stage.renderer, [
    {
      label: "shadows",
      get: () => stage.renderer.shadowMap.enabled,
      set: (v) => {
        stage.renderer.shadowMap.enabled = v;
        stage.scene.traverse((o) => {
          const m = (o as THREE.Mesh).material;
          if (m) (Array.isArray(m) ? m : [m]).forEach((mm) => (mm.needsUpdate = true));
        });
      },
    },
    { label: "trees", get: () => treesGroup?.visible ?? false, set: (v) => { if (treesGroup) treesGroup.visible = v; } },
    { label: "units", get: () => units.group.visible, set: (v) => { units.group.visible = v; } },
    { label: "proj", get: () => projectiles.group.visible, set: (v) => { projectiles.group.visible = v; } },
  ]);
  const prevActivity = new Map<number, number>(); // for detecting cast transitions -> cast-flash rings

  const cam = new DotaCamera(stage.camera, stage.dom, stage.raycaster, {
    pickables: () => units.pickables(),
    posOf: (h) => units.scenePos(h),
    onSelect: () => {},
  });
  // HUD portrait / scoreboard / stats-row clicks lock-follow that unit; minimap click recenters the camera.
  hud.onFocus = (h) => cam.focus(h);
  hud.onMinimapClick = (wx, wy) => cam.moveTo(wx, wy);

  // The camera viewport as a ground trapezium for the minimap: project the 4 screen corners onto the ground.
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const NDC_CORNERS: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  function viewportGroundCorners(): { x: number; y: number }[] {
    const out: { x: number; y: number }[] = [];
    for (const [nx, ny] of NDC_CORNERS) {
      stage.raycaster.setFromCamera(new THREE.Vector2(nx, ny), stage.camera);
      const hit = new THREE.Vector3();
      if (stage.raycaster.ray.intersectPlane(groundPlane, hit)) out.push({ x: hit.x, y: -hit.z });
    }
    return out;
  }
  // 's' toggles the scoreboard (camera vertical pan is arrows + w; 's' is not a pan key).
  window.addEventListener("keydown", (e) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
    if (e.key.toLowerCase() === "s") hud.toggleScoreboard();
    if (e.key.toLowerCase() === "g") terrain.setGrid(!terrain.gridOn()); // toggle the elevation grid overlay
  });

  const wizard = new CalibWizard({
    terrain,
    cam,
    camera: stage.camera,
    raycaster: stage.raycaster,
    dom: stage.dom,
    getWorld: () => client.buffer.interpolated(DELAY_MS),
    rebuild: () => terrain.rebuild(),
  });
  createCalibPanel({ rebuild: () => terrain.rebuild(), terrain, startWizard: () => wizard.start() });
  createEntitiesPanel({
    getWorld: () => client.buffer.interpolated(DELAY_MS),
    renderInfo: (h) => units.renderInfo(h),
  });

  let last = performance.now();
  let fps = 60;
  let fpsAcc = 0;
  // Mid-stream stall detection: the WS stays open while the bot's frame source stops (e.g. the SDR spectate
  // gets STEAM_LOGON-kicked and re-signons every ~20s). Frames just resume on the same socket once it recovers,
  // so we don't reconnect — we only surface the gap instead of freezing on a silent last frame.
  let lastFrames = -1;
  let lastFrameAt = performance.now();
  function frame(now: number) {
    const dt = now - last;
    last = now;
    fps += ((1000 / Math.max(1, dt)) - fps) * 0.1; // smoothed
    if ((fpsAcc += dt) > 250) {
      const mem = (performance as { memory?: { usedJSHeapSize: number } }).memory;
      hud.setFps(fps, mem ? Math.round(mem.usedJSHeapSize / 1048576) : undefined);
      fpsAcc = 0;
      if (client.stats.frames !== lastFrames) {
        lastFrames = client.stats.frames;
        lastFrameAt = now;
      } else if (!q.has("demo") && lastFrames > 0 && now - lastFrameAt > 4000) {
        hud.setStatus("STALLED", `stream stalled ${Math.round((now - lastFrameAt) / 1000)}s — source dropped (live SDR kick?); waiting to recover`);
      }
    }
    prof.begin();
    const follow = cam.followHandle();
    const world = client.buffer.interpolated(DELAY_MS, now);
    prof.mark("interp");
    if (world) {
      units.update(world, stage.camera, follow, dt);
      prof.mark("units");
      // projectiles: drain spawns/destroys from the stream, then advance them against current unit positions
      const proj = client.recon.drainProjectiles();
      for (const s of proj.spawns) projectiles.spawn(s);
      for (const d of proj.destroys) projectiles.destroy(d);
      // cast-flash: activity >= 1506 is a cast/ability state (1503/1504 are attacks) — fire once on entry
      for (const u of world.units) {
        const prev = prevActivity.get(u.handle) ?? 0;
        if (u.activity >= 1506 && prev < 1506) {
          const p = units.scenePos(u.handle);
          if (p) projectiles.castFlash(p);
        }
        prevActivity.set(u.handle, u.activity);
      }
      // last-hit "$" / deny "!" markers at the death location
      for (const mk of client.recon.drainCombatMarks()) {
        if (mk.x === 0 && mk.y === 0) continue;
        const pos = new THREE.Vector3(mk.x, terrain.heightAt(mk.x, mk.y) + 140, -mk.y);
        projectiles.floatText(mk.kind === "deny" ? "!" : "$", pos, mk.kind === "deny" ? "#f2938c" : "#ffd24a");
      }
      projectiles.update(world, dt);
      prof.mark("proj");
      const vp = viewportGroundCorners();
      if (vp.length === 4) hud.setViewport(vp);
      hud.update(world, follow);
      prof.mark("hud");
    }
    cam.update(dt);
    stage.renderer.render(stage.scene, stage.camera);
    prof.gpuEnd();
    prof.mark("submit");
    prof.end();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}).catch((e) => hud.setStatus("ERROR", `terrain load failed: ${e}`));
