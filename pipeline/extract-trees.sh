#!/usr/bin/env bash
# Extract the map's trees for the viewer:
#   1. decompile the map entity lump and parse each ent_dota_tree -> <ASSET_OUT>/terrain/trees.json (with model idx)
#   2. export the 13 distinct props_tree models -> <ASSET_OUT>/models/trees/<basename>/model.glb (optimized)
# Run from pipeline/:  ./extract-trees.sh
set -euo pipefail
SD="$(cd "$(dirname "$0")" && pwd)"                 # pipeline/
PUBLIC="${ASSET_OUT:-$SD/../viewer/public}"; export ASSET_OUT="$PUBLIC" # child node scripts inherit this

VRF="${VRF_CLI:-$SD/tools/Source2Viewer-CLI}"
VPK="${VPK:-$HOME/.local/share/Steam/steamapps/common/dota 2 beta/game/dota/pak01_dir.vpk}"
MAPVPK="${MAPVPK:-$HOME/.local/share/Steam/steamapps/common/dota 2 beta/game/dota/maps/dota.vpk}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

echo "[trees] decompiling map entities…"
"$VRF" --input "$MAPVPK" --vpk_filepath "maps/dota/entities/default_ents.vents_c" --output "$TMP" -d >/dev/null 2>&1
VENTS="$TMP/maps/dota/entities/default_ents.vents"

echo "[trees] parsing ent_dota_tree…"
mkdir -p "$PUBLIC/terrain" "$PUBLIC/models/trees"
python3 "$SD/extract-trees.py" "$VENTS" "$PUBLIC/terrain/trees.json" "$TMP/models.txt"

# model basename order MUST match the index order printed above (and TREE_MODELS in src/render/trees.ts)
mapfile -t MODELS < "$TMP/models.txt"
FILTER=""; for m in "${MODELS[@]}"; do FILTER+="${m}_c,"; done

echo "[trees] exporting ${#MODELS[@]} tree models…"
"$VRF" -i "$VPK" -d -f "${FILTER%,}" -o "$TMP/out" --gltf_export_format glb --gltf_export_materials >/dev/null 2>&1 || true

for m in "${MODELS[@]}"; do
  base="$(basename "${m%.vmdl}")"
  glb="$TMP/out/$(dirname "$m")/$base.glb"
  dest="$PUBLIC/models/trees/$base"
  if [ ! -f "$glb" ]; then echo "  ✗ missing: $m" >&2; continue; fi
  mkdir -p "$dest"; cp "$glb" "$dest/model.glb"
  strings "$dest/model.glb" | grep -oE '"uri":"[^"]+\.png"' | sed -E 's/.*"uri":"([^"]+)".*/\1/' | sort -u \
    | while read -r t; do cp "$TMP/out/$(dirname "$m")/$t" "$dest/" 2>/dev/null || true; done
  echo "  ✓ trees/$base"
done

echo "[trees] downscaling textures + optimizing…"
find "$PUBLIC/models/trees" -name '*.png' -iname '*color*' -print0 2>/dev/null | xargs -0 -r mogrify -resize '512x512>' 2>/dev/null || true
find "$PUBLIC/models/trees" -name '*.png' ! -iname '*color*' -print0 2>/dev/null | xargs -0 -r mogrify -resize '64x64>' 2>/dev/null || true
node "$SD/optimize-models.mjs" "$PUBLIC"/models/trees/*/model.glb || echo "  (optimize skipped)"
find "$PUBLIC/models/trees" -name '*.png' -delete
echo "[trees] decimating (trees are the triangle budget + render twice with shadows)…"
node "$SD/simplify-trees.mjs" 0.3 || echo "  (simplify skipped)"
echo "[trees] done."
