import { defineConfig, loadEnv } from "vite";

// The dev server proxies /api and /ws to a backend so the page can use same-origin URLs. Pick the backend with
// DOTA_BACKEND (local | public) in .env, or override the target outright with DOTA_SERVER.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // "" = load all vars, incl. non-VITE_ ones
  const backend = env.DOTA_BACKEND ?? "local";
  const target = env.DOTA_SERVER || (backend === "public" ? "https://gc.datdota.com" : "http://127.0.0.1:8111");
  return {
    base: env.VITE_BASE || "/", // e.g. "/broodmother/" when served under a subpath in production
    build: {
      rollupOptions: {
        // Multi-page: the main viewer + the hero-inspector dev tool (so heroes.html is actually built/shipped).
        input: { main: "index.html", heroes: "heroes.html" },
      },
    },
    server: {
      port: 9876,
      strictPort: true,
      proxy: {
        "/api": { target, changeOrigin: true },
        "/ws": { target: target.replace(/^http/, "ws"), ws: true, changeOrigin: true },
      },
    },
    test: {
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
  };
});
