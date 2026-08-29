import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import protobuf from "protobufjs/minimal";
import { Reconstructor } from "./reconstruct.js";
import { UnitType } from "./types.js";

// Cross-language wire check: decode real Batch bytes produced by the Java StreamEncoder (fixtures/batches.bin,
// written length-delimited by StreamReplayHarness) through the actual apply() path. Exercises packed columnar
// transforms, sint32 zig-zag coords, the oneof envelope, and catalog string interning.
function batches(): Uint8Array[] {
  const buf = readFileSync(fileURLToPath(new URL("./fixtures/batches.bin", import.meta.url)));
  const reader = protobuf.Reader.create(buf);
  const out: Uint8Array[] = [];
  while (reader.pos < reader.len) {
    const len = reader.uint32();
    out.push(buf.subarray(reader.pos, reader.pos + len));
    reader.pos += len;
  }
  return out;
}

describe("Reconstructor decodes Java-encoded v2 batches", () => {
  it("reconstructs a coherent world from the fixture", () => {
    const recon = new Reconstructor();
    let snaps = 0;
    let last;
    for (const b of batches()) {
      const s = recon.apply(b);
      if (s) {
        snaps++;
        last = s;
      }
    }

    expect(recon.version).toBe(2);
    expect(snaps).toBeGreaterThan(40);
    expect(last).toBeDefined();
    const units = [...last!.units.values()];
    expect(units.length).toBeGreaterThan(20);

    // heroes carry interned names + 6 item slots
    const heroes = units.filter((u) => u.type === UnitType.HERO && u.playerSlot !== 255);
    expect(heroes.length).toBe(10);
    for (const h of heroes) {
      expect(h.unitName.startsWith("npc_dota_hero_")).toBe(true);
      expect(h.items.length).toBe(6);
    }

    // sint32 zig-zag: Radiant occupies negative-coordinate space, so some unit must have a negative coord
    expect(units.some((u) => u.x < 0 || u.y < 0)).toBe(true);
    // coords stay within the map bounds
    for (const u of units) {
      expect(Math.abs(u.x)).toBeLessThan(10000);
      expect(Math.abs(u.y)).toBeLessThan(10000);
    }
  });
});
