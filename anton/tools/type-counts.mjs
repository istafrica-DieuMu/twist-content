// Full-text counts per shared exercise type (taxonomy.md) for the gap list.
//   node anton/tools/type-counts.mjs   (from the rnd root)
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
const db = new DatabaseSync("catalogue/catalogue.db", { readOnly: true });
// Map trainer -> shared type from the taxonomy table (second-to-last column lists trainers in backticks).
const map = {};
for (const line of readFileSync("taxonomy.md", "utf8").split("\n")) {
  const m = line.match(/^\| ([a-z-]+) \|/); if (!m) continue;
  for (const t of line.split("|")[3]?.match(/`([A-Za-z0-9]+)`/g) || []) map[t.replace(/`/g, "")] = m[1];
}
const rows = db.prepare(`SELECT et.trainer t, e.id x, c.subject s, cc.curriculum cur FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise
  JOIN course c ON c.id = e.course JOIN course_curriculum cc ON cc.course = c.id`).all();
const types = {}, unmapped = new Set();
for (const r of rows) {
  const ty = map[r.t]; if (!ty) { unmapped.add(r.t); continue; }
  const a = (types[ty] ||= { ex: new Set(), subj: {} });
  a.ex.add(r.x); a.subj[r.s] = (a.subj[r.s] || new Set()).add(r.x);
}
const total = new Set(rows.map((r) => r.x)).size;
for (const [ty, a] of Object.entries(types).sort((p, q) => q[1].ex.size - p[1].ex.size)) {
  const top = Object.entries(a.subj).map(([s, set]) => [s, set.size]).sort((p, q) => q[1] - p[1]).slice(0, 4).map(([s, n]) => `${s} ${n}`).join(", ");
  console.log(`${ty} | ${a.ex.size} | ${(100 * a.ex.size / total).toFixed(1)}% | ${top}`);
}
console.log("total exercises", total, "unmapped", [...unmapped].join(",") || "none");
