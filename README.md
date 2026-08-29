# broodmother

A **web-based** (hence the name) 3D spectator client for Dota 2. It renders live and replayed
matches in the browser from an efficient delta-encoded entity stream, driven by the public backend at
`gc.datdota.com` (or your own local stack).

This repo is the frontend of the system. It contains the viewer, the asset-extraction
pipeline, and the streaming wire-format.

```
broodmother/
├─ viewer/     Three.js + TypeScript spectator client (Vite)
├─ pipeline/   asset extraction from a local Dota 2 install (models, terrain, heightmap)
├─ proto/      the public streaming contract (entity_frame + entity_stream .proto)
└─ fixtures    a recorded stream (viewer/public/demo) so it runs with no backend
```

## Quick start

```bash
cd viewer
cp .env.example .env      # then edit if needed
npm install
npm run proto             # generate protobuf bindings from ../proto
npm run dev               # http://localhost:9876
```

Open `http://localhost:9876/?demo=1` to run the offline fixture with no backend.

### Two ways to work

| You want to ... | `.env` settings |
|---|---|
| Hack on the **frontend only** | `DOTA_BACKEND=public`, `VITE_ASSET_BASE=<cdn>` |
| Run the **full stack** (your own backend) | `DOTA_BACKEND=local` (backend on `127.0.0.1:8111`) |
| Work on the **extraction pipeline** | `VITE_ASSET_BASE=` (empty → serve `viewer/public/` locally) |

- **Backend** (`DOTA_BACKEND`): the Vite proxy sends `/api` + `/ws` to `local` (127.0.0.1:8111) or `public`
  (gc.datdota.com). `DOTA_SERVER` overrides the target outright.
- **Assets** (`VITE_ASSET_BASE`): empty serves models/terrain from local `viewer/public/`; set it to the CDN to
  pull everything remotely. Everything routes through `assetUrl()` in `viewer/src/config.ts`.

## Assets & the CDN

Models and terrain are **extracted from your own Dota 2 install** and are **not committed** (they're Valve art,
and they're large). In production they're served from the CDN; locally you either point at the CDN or regenerate
them with the pipeline:

```bash
cd pipeline
./extract-models.sh       # heroes, creeps, buildings  (needs DOTA2_DIR)
./extract-trees.sh        # per-tree models + placements
./extract-heightmap.sh    # bakes viewer/public/terrain/heightmap.bin from the map geometry
```

The pipeline writes into `viewer/public/` by default (override with `ASSET_OUT`); a deploy step then uploads that
tree to the CDN. `viewer/public/align.html` is the interactive tool for aligning the baked heightmap to the map.

## Protocol

`proto/entity_stream.proto` (which imports `entity_frame.proto`) is the WebSocket wire format. It's pure game
state (no auth, GC, or backend internals). The private backend keeps a vendored copy of this same `proto/`.

## Backend API (served by gc.datdota.com)

The viewer uses the **public** namespace only:

- `GET /api/v2/public/live-games` — live games + which of them we're actually covering
- `GET /api/v2/public/matches/{id}/ticket` — a short-lived signed join ticket (rate-limited per IP)
- `WS  /ws/public/stream?serverId=&ticket=…` — stream a public match; the ticket scopes the socket to one match and expires

Authenticated (`/api/v2/private/*`) endpoints — arbitrary matches, replays, outputs, swarm status — require a
bearer token and aren't part of the public experience.

## License

**GNU AGPL-3.0** — see [LICENSE](LICENSE). If you run a modified version of this
viewer and let others use it over a network, you must offer them your complete
corresponding source under the same license.

The license covers the **source code only**. Dota 2 and its assets are Valve
Corporation's property and are neither included nor licensed here — the pipeline
extracts them from your own game install (see [NOTICE](NOTICE)). This project is
not affiliated with Valve.

Use of the datdota-operated public backend (`gc.datdota.com`) is governed
separately by [TERMS.md](TERMS.md), not by this license.

For uses the AGPL doesn't permit (e.g. a proprietary/closed product), contact
<bensteenhuisen@gmail.com>.
