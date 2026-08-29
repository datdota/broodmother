#!/usr/bin/env bash
# Deploy the extracted assets (models, terrain, demo fixture, minimap) to the CDN. Run after regenerating them
# with the pipeline. These are what the frontend fetches via VITE_ASSET_BASE. Config comes from deploy.env
# (gitignored) — copy deploy.env.example and fill it in.
set -euo pipefail
cd "$(dirname "$0")"

[ -f deploy.env ] || { echo "error: deploy.env not found — copy deploy.env.example and fill it in" >&2; exit 1; }
set -a; . ./deploy.env; set +a
: "${DEPLOY_HOST:?}" "${CDN_DEST:?}"

PUB=viewer/public
[ -d "$PUB/models" ] || echo "warn: $PUB/models missing — run the pipeline first (assets are gitignored)" >&2

echo "[cdn] uploading assets to $DEPLOY_HOST:$CDN_DEST/ …"
ssh "$DEPLOY_HOST" "mkdir -p $CDN_DEST"
# --delete so stale/renamed assets don't linger; the CDN dir is dedicated to broodmother.
for item in models terrain demo minimap.png; do
  [ -e "$PUB/$item" ] || continue
  rsync -rlz --delete --omit-dir-times --relative "$PUB/./$item" "$DEPLOY_HOST:$CDN_DEST/"
done

echo "[cdn] done -> assets live at your VITE_ASSET_BASE"
