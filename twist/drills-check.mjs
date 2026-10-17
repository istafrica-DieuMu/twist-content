// Checks the drill banks in drills/ (docs/practice.md, Drill banks).
// A bank is hand-written; this file only checks it.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import YAML from "yaml";

export const FORMATS = new Set(["type", "choose", "flash", "say", "timed"]);

// The value of a maths fact written with + − × ÷, left to right with × and ÷ first.
export function factValue(q) {
  const toks = String(q).replace(/−/g, "-").match(/\d+|[+\-×÷]/g);
  if (!toks || toks.length % 2 === 0) return NaN;
  const nums = [+toks[0]], ops = [];
  for (let i = 1; i < toks.length; i += 2) {
    const op = toks[i], n = +toks[i + 1];
    if (op === "×") nums.push(nums.pop() * n);
    else if (op === "÷") nums.push(nums.pop() / n);
    else { ops.push(op); nums.push(n); }
  }
  return ops.reduce((v, op, i) => (op === "+" ? v + nums[i + 1] : v - nums[i + 1]), nums[0]);
}

export function checkBank(file, d, steps) {
  const p = [], where = file;
  if (!d || typeof d !== "object") return [`${where}: not a drill bank`];
  if (!steps.has(d.skill)) p.push(`${where}: unknown skill ${d.skill}`);
  const [domain, ...rest] = String(d.skill ?? "").split(".");
  const parts = file.split("/");
  if (parts.at(-2) !== domain) p.push(`${where}: a bank for ${d.skill} belongs in the folder drills/${domain}/`);
  if (parts.at(-1) !== `${rest.at(-1)}.yaml`) p.push(`${where}: the file name must be the skill's slug, ${rest.at(-1)}.yaml`);
  for (const f of d.formats ?? []) if (!FORMATS.has(f)) p.push(`${where}: unknown format ${f}`);
  if (!(d.formats ?? []).length) p.push(`${where}: no formats`);
  const seen = new Set();
  for (const [i, it] of (d.items ?? []).entries()) {
    const fact = it && it.q != null && it.a != null, word = it && it.word != null && it.sentence != null;
    if (fact === word) { p.push(`${where}: item ${i + 1} needs either q and a, or word and sentence`); continue; }
    const k = fact ? String(it.q) : String(it.word).toLowerCase();
    if (seen.has(k)) p.push(`${where}: ${k} appears twice`);
    seen.add(k);
    if (fact && factValue(it.q) !== Number(it.a)) p.push(`${where}: ${it.q} is ${factValue(it.q)}, not ${it.a}`);
    if (word && !new RegExp(`(^|[^\\p{L}])${it.word}([^\\p{L}]|$)`, "iu").test(it.sentence)) p.push(`${where}: "${it.word}" is not in its sentence "${it.sentence}"`);
  }
  if (!(d.items ?? []).length) p.push(`${where}: no items`);
  return p;
}

export function checkDrills({ T, steps, err }) {
  const dir = join(T, "drills");
  const walk = (x) => (existsSync(x) ? readdirSync(x).flatMap((f) => { const q = join(x, f); return statSync(q).isDirectory() ? walk(q) : [q]; }) : []);
  let banks = 0, items = 0;
  for (const f of walk(dir).filter((x) => x.endsWith(".yaml")).sort()) {
    const file = relative(T, f);
    let d;
    try { d = YAML.parse(readFileSync(f, "utf8")); } catch (e) { err(`${file}: YAML error: ${e.message.split("\n")[0]}`); continue; }
    for (const m of checkBank(file, d, steps)) err(m);
    banks++; items += d?.items?.length ?? 0;
  }
  return { banks, items };
}
