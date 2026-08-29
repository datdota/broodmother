# Deploying broodmother

Three parts: frontend, cdn, backend.

## Setup

```bash
cp deploy.env.example deploy.env   
```

## Deploy

```bash
./deploy-cdn.sh    # assets  -> $CDN_DEST  (run after regenerating with the pipeline)
./deploy.sh        # build + app shell -> $WEB_DEST
```

`deploy.sh` writes `viewer/.env.production` from `deploy.env`, builds with `base=$VITE_BASE`, and rsyncs
`viewer/dist/` minus the CDN-served assets. `deploy-cdn.sh` mirrors `viewer/public/{models,terrain,demo,minimap.png}`
to the CDN. The frontend fetches assets from `VITE_ASSET_BASE` and talks to `VITE_API_BASE` / `VITE_WS_BASE`.

## Dev tools in prod
`heroes.html` (hero explorer) and `align.html` (heightmap alignment) ship too. `heroes.html` uses `VITE_ASSET_BASE`
automatically; `align.html` is standalone — open it as `align.html?assets=https://cdn.datdota.com/broodmother` so
it loads the overview/hillshade from the CDN.
