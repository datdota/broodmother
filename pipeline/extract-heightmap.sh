#!/usr/bin/env bash
# Bake <ASSET_OUT>/terrain/heightmap.bin from the compiled map's real terrain geometry:
#   1. export the map world node (maps/dota/worldnodes/n0) to glb — the static ground+cliffs surface
#   2. rasterize it into a high-res heightmap (extract-heightmap.mjs)
# Trees/buildings are separate entities, so the world node is terrain only. Run from pipeline/:  ./extract-heightmap.sh [gridW]
set -euo pipefail
SD="$(cd "$(dirname "$0")" && pwd)"                 # pipeline/
PUBLIC="${ASSET_OUT:-$SD/../viewer/public}"          # where assets are written (override to stage for the CDN)

VRF="${VRF_CLI:-$SD/tools/Source2Viewer-CLI}"
MAPVPK="${MAPVPK:-$HOME/.local/share/Steam/steamapps/common/dota 2 beta/game/dota/maps/dota.vpk}"
GW="${1:-512}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

echo "[heightmap] exporting map world node…"
"$VRF" -i "$MAPVPK" -f "maps/dota/worldnodes/n0.vwnod_c" -o "$TMP" -d --gltf_export_format glb >/dev/null 2>&1

echo "[heightmap] rasterizing terrain (gridW=$GW)…"
mkdir -p "$PUBLIC/terrain"
node --max-old-space-size=4096 "$SD/extract-heightmap.mjs" "$TMP/maps/dota/worldnodes/n0.glb" "$PUBLIC/terrain/heightmap.bin" "$GW"
echo "[heightmap] wrote $PUBLIC/terrain/heightmap.bin"
