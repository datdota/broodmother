#!/usr/bin/env python3
# Parse the compiled map's entity lump (default_ents.vents, decompiled by Source2Viewer-CLI) into the tree list the
# web client renders. Each ent_dota_tree carries its real model, origin, yaw and scale, so we keep the *actual*
# per-tree model (13 distinct props_tree meshes) instead of collapsing everything to two generic trees.
#
# Usage: extract-trees.py <default_ents.vents> <out-trees.json> <out-models.txt>
import json
import re
import sys

vents, out_json, out_models = sys.argv[1], sys.argv[2], sys.argv[3]
txt = open(vents).read()

blocks = re.split(r"====\d+====", txt)
num = lambda s: [float(x) for x in s.strip().strip("[]").split(",")]

models: list[str] = []
trees: list[list] = []
for b in blocks:
    if 'classname                      "ent_dota_tree"' not in b:
        continue
    m = re.search(r'model\s+resource_name:"([^"]+)"', b)
    o = re.search(r"origin\s+\[([^\]]+)\]", b)
    a = re.search(r"angles\s+\[([^\]]+)\]", b)
    s = re.search(r"scales\s+\[([^\]]+)\]", b)
    if not (m and o):
        continue
    path = m.group(1)
    if path not in models:
        models.append(path)
    mi = models.index(path)
    ox, oy, oz = num(o.group(1))
    yaw = num(a.group(1))[1] if a else 0.0
    sc = num(s.group(1))[0] if s else 1.0
    trees.append([round(ox), round(oy), round(oz), round(yaw), round(sc, 3), mi])

json.dump(trees, open(out_json, "w"), separators=(",", ":"))
open(out_models, "w").write("\n".join(models) + "\n")
print(f"{len(trees)} trees, {len(models)} distinct models")
for i, p in enumerate(models):
    print(f"  [{i}] {p}  ({sum(1 for t in trees if t[5] == i)})")
