// Merge freshly-staged hero parts into the committed manifests, so a TARGETED re-extract updates only the
// heroes it processed and leaves the rest intact. Reads out/processed.txt (heroes this run handled) and
// out/staged.tsv (hero \t part_N.glb \t original_basename), then rewrites public/models/{manifest,part_names}.json
// (parallel arrays, index-aligned) and heroes.json. Run from web/assets after staging.

import fs from "fs";
import { fileURLToPath } from "node:url";

// Assets live under ASSET_OUT (default ../viewer/public relative to this script).
const PUBLIC = process.env.ASSET_OUT ?? fileURLToPath(new URL("../viewer/public", import.meta.url));
const MODELS = `${PUBLIC}/models`;
const read = (f, d) => {
  try {
    return JSON.parse(fs.readFileSync(`${MODELS}/${f}`, "utf8"));
  } catch {
    return d;
  }
};

const processed = fs.existsSync("out/processed.txt")
  ? fs.readFileSync("out/processed.txt", "utf8").split(/\s+/).filter(Boolean)
  : [];
const staged = fs.existsSync("out/staged.tsv")
  ? fs.readFileSync("out/staged.tsv", "utf8").split("\n").filter((l) => l.trim())
  : [];

const partsByHero = {};
const namesByHero = {};
for (const l of staged) {
  const [h, part, name] = l.split("\t");
  (partsByHero[h] ??= []).push(part);
  (namesByHero[h] ??= []).push(name);
}

const manifest = read("manifest.json", {});
const names = read("part_names.json", {});
for (const h of processed) {
  if (partsByHero[h]?.length) {
    manifest[h] = partsByHero[h];
    names[h] = namesByHero[h];
  } else {
    delete manifest[h];
    delete names[h];
  }
}

fs.writeFileSync(`${MODELS}/manifest.json`, JSON.stringify(manifest));
fs.writeFileSync(`${MODELS}/part_names.json`, JSON.stringify(names));
const heroes = fs
  .readdirSync(`${MODELS}/heroes`)
  .filter((d) => fs.existsSync(`${MODELS}/heroes/${d}/model.glb`))
  .sort();
fs.writeFileSync(`${MODELS}/heroes.json`, JSON.stringify(heroes));
console.log(
  `merged ${processed.length} processed hero(s); manifest has ${Object.keys(manifest).length} multipart heroes; heroes.json=${heroes.length}`,
);
