// Offline demo: replay the committed fixture (real Java-encoded batches) so the scene runs with live-looking
// units without the server. Loaded via ?demo=1. Also serves as a headless smoke test of the whole pipeline.

import protobuf from "protobufjs/minimal";
import type { StreamClient } from "./ws.js";
import { assetUrl } from "../config.js";

export async function runDemo(client: StreamClient): Promise<void> {
  const buf = new Uint8Array(await (await fetch(assetUrl("/demo/batches.bin"))).arrayBuffer());
  const reader = protobuf.Reader.create(buf);
  const msgs: Uint8Array[] = [];
  while (reader.pos < reader.len) {
    const len = reader.uint32();
    msgs.push(buf.subarray(reader.pos, reader.pos + len));
    reader.pos += len;
  }
  client.stats.state = "demo"; // so the HUD status doesn't show the never-connected socket state
  let i = 0;
  setInterval(() => {
    if (i === 0) client.buffer.clear(); // drop stale snapshots so the loop seam doesn't slide units back
    client.feed(msgs[i]);
    i = (i + 1) % msgs.length; // loop (the first batch's keyframe re-inits the world)
  }, 66); // ~15/s, the live cadence
}
