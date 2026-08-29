// WebSocket client for the efficient v2 stream (/ws/stream). One Batch protobuf per binary message; decoded and
// reconstructed into the interpolation buffer. Reconnects with backoff (the Rust ingest has none).

import { Reconstructor } from "../world/reconstruct.js";
import { SnapshotBuffer } from "../world/snapshot.js";
import { wsBase, apiUrl, isPublic } from "../config.js";

export interface StreamTarget {
  token: string;
  serverId?: string; // live game (by server_steam_id; kept a string — it exceeds JS's safe-integer range)
  replay?: string; // replay filename
  interval?: number; // replay sample cadence in ticks (default 2 ≈ 15fps)
  startTick?: number;
}

export interface StreamStats {
  state: "connecting" | "live" | "closed" | "error" | "demo";
  message: string;
  frames: number;
  bytes: number; // total received
  bytesPerSec: number; // rolling over the last second
  tick: number;
}

/** Build the /ws/stream URL against WS_BASE (or the current origin, which the dev server proxies to the backend). */
export function streamUrl(t: StreamTarget): string {
  const p = new URLSearchParams();
  if (t.token) p.set("token", t.token); // browsers can't set WS headers, so the token (when any) rides the query
  if (t.serverId) {
    p.set("serverId", t.serverId);
  } else if (t.replay) {
    p.set("replay", t.replay);
    p.set("interval", String(t.interval ?? 2));
    if (t.startTick) p.set("startTick", String(t.startTick));
  }
  return `${wsBase()}/ws/stream?${p.toString()}`;
}

/**
 * Resolve the WebSocket URL for a target. In PUBLIC mode a live game goes through the ticket flow: fetch a
 * short-lived signed ticket, then connect the public WS with it (browsers can't set a WS auth header). In private
 * mode (a token is configured), use the authenticated /ws/stream. Called on every (re)dial so a reconnect always
 * carries a fresh, unexpired ticket.
 */
async function resolveStreamUrl(t: StreamTarget): Promise<string> {
  if (isPublic() && t.serverId) {
    const res = await fetch(apiUrl(`/api/v2/public/matches/${t.serverId}/ticket`));
    if (!res.ok) throw new Error(`ticket HTTP ${res.status}`);
    const { ticket } = await res.json();
    const p = new URLSearchParams({ serverId: t.serverId, ticket });
    return `${wsBase()}/ws/public/stream?${p.toString()}`;
  }
  return streamUrl(t);
}

export class StreamClient {
  readonly buffer = new SnapshotBuffer();
  readonly recon = new Reconstructor();
  readonly stats: StreamStats = { state: "connecting", message: "", frames: 0, bytes: 0, bytesPerSec: 0, tick: 0 };
  onStats?: (s: StreamStats) => void;

  private ws?: WebSocket;
  private closed = false;
  private backoff = 500;
  private target?: StreamTarget;
  private window: { t: number; n: number }[] = []; // last-second byte samples for the rate

  connect(target: StreamTarget): void {
    this.closed = false;
    this.target = target;
    this.dial();
  }

  close(): void {
    this.closed = true;
    this.ws?.close();
  }

  /** Resolve the URL (fetching a fresh public ticket if needed) then open; retry with backoff on resolve failure. */
  private dial(): void {
    if (this.closed || !this.target) return;
    resolveStreamUrl(this.target)
      .then((url) => { if (!this.closed) this.open(url); })
      .catch((e) => {
        if (this.closed) return;
        this.setState("connecting", `retry in ${this.backoff}ms (${e})`);
        setTimeout(() => this.dial(), this.backoff);
        this.backoff = Math.min(this.backoff * 2, 8000);
      });
  }

  /** Feed one raw Batch (used by demo/offline replay of a captured fixture). */
  feed(bytes: Uint8Array): void {
    this.recordBytes(bytes.byteLength);
    const snap = this.recon.apply(bytes);
    if (snap) {
      this.buffer.push(snap);
      this.stats.frames++;
      this.stats.tick = snap.serverTick;
      this.emit();
    }
  }

  private open(url: string): void {
    this.setState("connecting", url);
    const ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    this.ws = ws;

    ws.onopen = () => {
      this.backoff = 500;
      this.setState("live", "");
    };
    ws.onmessage = (ev) => {
      if (!(ev.data instanceof ArrayBuffer)) return; // ignore text/ping
      const bytes = new Uint8Array(ev.data);
      this.recordBytes(bytes.byteLength);
      const snap = this.recon.apply(bytes);
      if (snap) {
        this.buffer.push(snap);
        this.stats.frames++;
        this.stats.tick = snap.serverTick;
        this.emit();
      }
    };
    ws.onerror = () => this.setState("error", "socket error");
    ws.onclose = () => {
      if (this.closed) {
        this.setState("closed", "");
        return;
      }
      this.setState("connecting", `reconnecting in ${this.backoff}ms`);
      setTimeout(() => this.dial(), this.backoff); // re-dial re-resolves a fresh ticket for public streams
      this.backoff = Math.min(this.backoff * 2, 8000);
    };
  }

  private recordBytes(n: number): void {
    const now = performance.now();
    this.stats.bytes += n;
    this.window.push({ t: now, n });
    while (this.window.length && now - this.window[0].t > 1000) this.window.shift();
    this.stats.bytesPerSec = this.window.reduce((a, s) => a + s.n, 0);
  }

  private setState(state: StreamStats["state"], message: string): void {
    this.stats.state = state;
    this.stats.message = message;
    this.emit();
  }

  private emit(): void {
    this.onStats?.(this.stats);
  }
}
