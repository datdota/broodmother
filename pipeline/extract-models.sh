#!/usr/bin/env bash
#
# Extract Dota 2 hero + building models to glTF (.glb) for the web client, using Source2Viewer-CLI. Heroes are
# resolved through hero_models.tsv (unit_name -> model path, from npc_heroes.txt) so name != model-dir heroes
# (drow_ranger -> drow, templar_assassin -> lanaya, …) stage under their unit name. After staging, glbs are
# optimized (facial morph-targets stripped, textures embedded + pruned) and the loose PNGs dropped.
# Re-run per patch. Verified: VRF 20.0, Dota 7.3x.
#
#   ./extract-models.sh                 # default demo hero set + buildings
#   ./extract-models.sh all             # the full roster (hero_models.tsv) + buildings
#   ./extract-models.sh am axe lina     # specific unit names + buildings
#
# Env: DOTA2_DIR (game path), VRF_CLI (CLI binary; auto-downloaded to ./tools if missing),
#      ASSET_OUT (where assets are written; default ../viewer/public).
set -uo pipefail
cd "$(dirname "$0")"                                  # pipeline/ (tools/, out/, *.tsv, node scripts are here)
PUBLIC="${ASSET_OUT:-../viewer/public}"; export ASSET_OUT="$PUBLIC" # child node scripts inherit this
mkdir -p tools out "$PUBLIC/models/heroes" "$PUBLIC/models/buildings"

VRF="${VRF_CLI:-$(command -v Source2Viewer-CLI || echo ./tools/Source2Viewer-CLI)}"
if [ ! -x "$VRF" ]; then
  echo "[models] fetching Source2Viewer-CLI…"
  url=$(curl -fsSL "https://api.github.com/repos/ValveResourceFormat/ValveResourceFormat/releases/latest" \
        | grep -oE 'https://[^"]*cli-linux-x64\.zip' | head -1)
  curl -fsSL -o tools/cli.zip "$url" && (cd tools && unzip -oq cli.zip && chmod +x Source2Viewer-CLI && rm -f cli.zip)
  VRF=./tools/Source2Viewer-CLI
fi

DOTA=""
for d in "${DOTA2_DIR:-}" \
         "$HOME/.local/share/Steam/steamapps/common/dota 2 beta" \
         "$HOME/.steam/steam/steamapps/common/dota 2 beta"; do
  d="${d/#\~/$HOME}"
  [ -n "$d" ] && [ -f "$d/game/dota/pak01_dir.vpk" ] && DOTA="$d" && break
done
[ -z "$DOTA" ] && { echo "error: set DOTA2_DIR to your Dota 2 install (game/dota/pak01_dir.vpk)" >&2; exit 1; }
VPK="$DOTA/game/dota/pak01_dir.vpk"
echo "[models] dota2: $DOTA"

# unit_name -> model .vmdl_c path
declare -A MODELPATH
while IFS=$'\t' read -r short path; do [ -n "$short" ] && MODELPATH[$short]="$path"; done < hero_models.tsv

if [ "${1:-}" = "all" ]; then HEROES="${!MODELPATH[*]}"
elif [ $# -gt 0 ]; then HEROES="$*"
else HEROES="abaddon alchemist dark_seer dark_willow disruptor enigma gyrocopter hoodwink slardar tusk"; fi
echo "[models] $(echo $HEROES | wc -w) heroes"

BUILD_R=( "models/props_structures/radiant_tower001.vmdl_c:buildings/radiant_tower"
          "models/props_structures/dire_tower001.vmdl_c:buildings/dire_tower"
          "models/props_structures/good_ancient001.vmdl_c:buildings/radiant_ancient"
          "models/props_structures/bad_ancient001.vmdl_c:buildings/dire_ancient"
          "models/props_structures/good_barracks_melee001.vmdl_c:buildings/radiant_rax_melee"
          "models/props_structures/good_barracks_ranged001.vmdl_c:buildings/radiant_rax_ranged"
          "models/props_structures/dire_barracks_melee001.vmdl_c:buildings/dire_rax_melee"
          "models/props_structures/dire_barracks_ranged001.vmdl_c:buildings/dire_rax_ranged"
          "models/props_structures/radiant_statue002.vmdl_c:buildings/radiant_filler"
          "models/props_structures/dire_column001.vmdl_c:buildings/dire_filler" )

# hero -> body-part vmdl paths (bonemerged onto the base at runtime for multi-part heroes)
declare -A PARTS
[ -f hero_parts.tsv ] && while IFS=$'\t' read -r hh pp; do [ -n "$hh" ] && PARTS[$hh]+="$pp "; done < hero_parts.tsv
# creep/neutral unit_name -> model vmdl path (single-mesh; staged under creeps/<unit_name>/)
declare -A CREEPMODEL
[ -f creep_models.tsv ] && while IFS=$'\t' read -r cn cp; do [ -n "$cn" ] && CREEPMODEL[$cn]="$cp"; done < creep_models.tsv

# --- single-pass extraction (one VPK open for the whole batch) ---------------
FILTER=""
for h in $HEROES; do
  FILTER+="${MODELPATH[$h]:-models/heroes/$h/$h.vmdl_c},"
  for p in ${PARTS[$h]:-}; do FILTER+="$p,"; done
done
for b in "${BUILD_R[@]}"; do FILTER+="${b%%:*},"; done
for c in "${!CREEPMODEL[@]}"; do FILTER+="${CREEPMODEL[$c]},"; done
if [ -n "${SKIP_VRF:-}" ]; then
  echo "[models] SKIP_VRF set — re-staging from existing out/"
else
  echo "[models] extracting (idle anim + materials + parts + creeps)…"
  # export ALL animations (hero idle clips are named e.g. zeus_idle / idle_alt, not "idle"); the optimizer
  # then keeps just the best idle clip to control size.
  "$VRF" -i "$VPK" -d -f "${FILTER%,}" -o out --gltf_export_format glb \
    --gltf_export_materials --gltf_export_animations >/dev/null 2>&1 || true
fi

# --- stage one model -> dest/<out>.glb + its referenced textures -------------
stage() { # $1 = vmdl_c path, $2 = dest subdir, $3 = out basename (default "model")
  local vmdl="$1" dest="$PUBLIC/models/$2" out="${3:-model}" src
  src="out/$(dirname "$vmdl")"
  local glb="$src/$(basename "${vmdl%.vmdl_c}").glb"
  [ -f "$glb" ] || { echo "  ✗ missing: $vmdl" >&2; return 1; }
  mkdir -p "$dest"; cp "$glb" "$dest/$out.glb"
  strings "$dest/$out.glb" | grep -oE '"uri":"[^"]+\.png"' | sed -E 's/.*"uri":"([^"]+)".*/\1/' | sort -u \
    | while read -r t; do cp "$src/$t" "$dest/" 2>/dev/null || true; done
  return 0
}

# Emit the staged parts (hero, part_N.glb, original basename) + the processed-hero list; merge-manifest.mjs
# folds them into public/models/{manifest,part_names,heroes}.json, updating ONLY processed heroes (so a
# targeted re-extract leaves the rest intact).
: > out/staged.tsv
echo "$HEROES" > out/processed.txt
for h in $HEROES; do
  stage "${MODELPATH[$h]:-models/heroes/$h/$h.vmdl_c}" "heroes/$h" "model" || continue
  i=0
  for p in ${PARTS[$h]:-}; do
    if stage "$p" "heroes/$h" "part_$i"; then
      printf '%s\t%s\t%s\n' "$h" "part_$i.glb" "$(basename "${p%.vmdl_c}")" >> out/staged.tsv
      i=$((i + 1))
    fi
  done
  echo "  ✓ heroes/$h (+$i parts)"
done

echo "[models] buildings"
for b in "${BUILD_R[@]}"; do stage "${b%%:*}" "${b##*:}" "model"; done
echo "[models] creeps ($(echo ${!CREEPMODEL[@]} | wc -w))"
for c in "${!CREEPMODEL[@]}"; do stage "${CREEPMODEL[$c]}" "creeps/$c" "model"; done

# Minimap overview texture (the in-game minimap background). Aligned to world ±9472 per
# resource/overviews/dota_<patch>.txt (pos_x -9472, scale 18.5, 1024px). Pick the highest dota_<patch> overview.
echo "[models] minimap overview texture"
ov=$("$VRF" -i "$VPK" -l -e vtex_c 2>/dev/null | grep -oE 'materials/overviews/dota_[0-9]+_psd_[0-9a-f]+\.vtex_c' | sort -t_ -k2 -n | tail -1)
if [ -n "$ov" ]; then
  "$VRF" -i "$VPK" -f "$ov" -o out/mm -d >/dev/null 2>&1 || true
  mm=$(find out/mm -name '*.png' 2>/dev/null | head -1)
  # resize to 512, then crop the ~29px dark unplayable margin so the map fills the panel. The cropped texture
  # spans world ±8399 (must match MINI_EXT in src/hud.ts).
  [ -n "$mm" ] && cp "$mm" "$PUBLIC/minimap.png" \
    && mogrify -resize 512x512 -gravity center -crop 454x454+0+0 +repage "$PUBLIC/minimap.png" >/dev/null 2>&1 \
    && echo "  ✓ minimap.png ($ov, cropped 454²)"
fi

echo "[models] merging manifests"
node merge-manifest.mjs || echo "  (merge skipped — run 'node merge-manifest.mjs' by hand)"

# --- downscale textures, then optimize (strip morphs, embed + prune) ---------
find "$PUBLIC/models" -name '*.png' -iname '*color*' -print0 2>/dev/null | xargs -0 -r mogrify -resize '512x512>' 2>/dev/null || true
find "$PUBLIC/models" -name '*.png' ! -iname '*color*' -print0 2>/dev/null | xargs -0 -r mogrify -resize '64x64>' 2>/dev/null || true
echo "[models] optimizing glbs…"
node optimize-models.mjs || echo "  (optimize skipped: run 'npm i' in viewer/)"
find "$PUBLIC/models" -name '*.png' -delete
echo "[models] done -> $PUBLIC/models/  ($(du -sh "$PUBLIC/models" | cut -f1))"
