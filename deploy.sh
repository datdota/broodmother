#!/usr/bin/env bash
# Build the viewer for production and deploy the app shell to the web server. The large assets are NOT uploaded
# here — they live on the CDN (see deploy-cdn.sh); the frontend fetches them via VITE_ASSET_BASE. Config comes
# from deploy.env (gitignored) — copy deploy.env.example and fill it in.
set -euo pipefail
cd "$(dirname "$0")"

[ -f deploy.env ] || { echo "error: deploy.env not found — copy deploy.env.example and fill it in" >&2; exit 1; }
set -a; . ./deploy.env; set +a
: "${DEPLOY_HOST:?}" "${WEB_DEST:?}" "${VITE_BASE:?}" "${VITE_ASSET_BASE:?}" "${VITE_API_BASE:?}" "${VITE_WS_BASE:?}"

# Write the production env vite reads at build time (gitignored).
cat > viewer/.env.production <<EOF
VITE_BASE=$VITE_BASE
VITE_ASSET_BASE=$VITE_ASSET_BASE
VITE_API_BASE=$VITE_API_BASE
VITE_WS_BASE=$VITE_WS_BASE
VITE_API_TOKEN=
EOF

echo "[deploy] building (base=$VITE_BASE, assets=$VITE_ASSET_BASE)…"
( cd viewer && npm run build )

# Mirror the app shell -> server, EXCLUDING the CDN-served assets (they're deployed by deploy-cdn.sh). The two dev
# tools (align.html, heroes.html) are kept — they use VITE_ASSET_BASE / an ?assets= override for their assets.
echo "[deploy] uploading to $DEPLOY_HOST:$WEB_DEST/ …"
ssh "$DEPLOY_HOST" "mkdir -p $WEB_DEST"
rsync -rlz --delete --omit-dir-times \
  --exclude 'models/' --exclude 'terrain/' --exclude 'demo/' --exclude 'minimap.png' \
  viewer/dist/ "$DEPLOY_HOST:$WEB_DEST/"

echo "[deploy] done -> frontend live (assets from $VITE_ASSET_BASE, API $VITE_API_BASE)"
