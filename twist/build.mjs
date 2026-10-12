// Checks the Twist curriculum records and builds the views.
//   node twist/build.mjs            (from the rnd root, or `npm run build` in twist/)
// Reads stages/, frameworks/, competencies/, profiles/; writes views/.
// Fails (exit 1) on errors; prints warnings. Views are generated: never edit them.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const T = dirname(fileURLToPath(import.meta.url));
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

const walk = (d) => (existsSync(d) ? readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);
const load = (dir) => walk(join(T, dir)).filter((p) => p.endsWith(".yaml")).sort().map((p) => {
  try { return { file: relative(T, p), data: YAML.parse(readFileSync(p, "utf8")) }; }
  catch (e) { err(`${relative(T, p)}: YAML error: ${e.message.split("\n")[0]}`); return null; }
}).filter(Boolean);

// ---------- load ----------
const stageFiles = load("stages");
const frameworkFiles = load("frameworks");
const progressionFiles = load("competencies");
const profileFiles = load("profiles");

const markets = new Map();
for (const { file, data } of stageFiles) {
  const ids = [...(data.grades ?? []), ...(data.learning_years ?? [])].map((s) => s.id);
  markets.set(data.market, { file, ...data, ids, order: new Map(ids.map((id, i) => [id, i])) });
}

const objectives = new Map(); // code -> objective + framework
const frameworks = new Map();
for (const { file, data } of frameworkFiles) {
  frameworks.set(data.framework, { file, ...data });
  for (const o of data.objectives ?? []) {
    if (objectives.has(o.code)) err(`${file}: duplicate objective code ${o.code}`);
    objectives.set(o.code, { ...o, framework: data.framework });
  }
}

const steps = new Map(); // id -> step + progression
const progressions = new Map();
const GRADE_IN_ID = /(^|[.-])(klasse|year|grade|g[1-9]|lernjahr|ly-\d|stufe|reception)([.-]|\d|$)/;
// Source course ids (c-mat-1, c-natdeu-2, c-mono-eng-gb-0 ...), source names and paths.
const SOURCE_REF = /\bc-(mat|natdeu|nateng|eng|deu|mono|alpha|sl|sci|mus|his|geo|com|bio|chem|phy|sel|preschool)-[a-z0-9-]*\d|\banton\b|catalogue\.db|official-de\/|\/api\//i;
for (const { file, data } of progressionFiles) {
  const p = data.progression;
  if (!p) { err(`${file}: missing progression`); continue; }
  const domain = p.split(".")[0];
  progressions.set(p, { file, ...data, domain, stepIds: [] });
  if (!data.title?.de || !data.title?.en) err(`${file}: progression title needs de and en`);
  for (const s of data.steps ?? []) {
    const where = `${file}: ${s.id}`;
    if (!s.id?.startsWith(p + ".")) err(`${where}: id must start with ${p}.`);
    if (steps.has(s.id)) err(`${where}: duplicate step id`);
    if (GRADE_IN_ID.test(s.id)) err(`${where}: id contains a grade or stage`);
    if (!/^[a-z0-9.-]+$/.test(s.id)) err(`${where}: id must be lowercase ASCII`);
    if (!s.can_do?.de || !s.can_do?.en) err(`${where}: can_do needs de and en`);
    if (!s.topic?.de || !s.topic?.en) err(`${where}: topic needs de and en`);
    if (SOURCE_REF.test(JSON.stringify(s))) err(`${where}: records must not cite sources`);
    const objs = s.objectives ?? [];
    if (!objs.length && !s.enrichment && !s.note && !s.beyond_framework) err(`${where}: no objectives; mark enrichment or beyond_framework with a reason, or add a note`);
    if (s.enrichment && !s.reason) err(`${where}: enrichment needs a reason`);
    if (!objs.length && !s.enrichment && !s.beyond_framework) warn(`${where}: no objective yet (${s.note ? "note: " + s.note.slice(0, 60) + "…" : ""})`);
    for (const c of objs) if (!objectives.has(c)) err(`${where}: unknown objective ${c}`);
    steps.set(s.id, { ...s, progression: p, file, index: progressions.get(p).stepIds.length });
    progressions.get(p).stepIds.push(s.id);
  }
}

// ---------- prerequisites ----------
const before = new Map(); // id -> ids that must come first
for (const [id, s] of steps) {
  const req = new Set(s.prerequisites?.hard ?? []);
  for (const r of req) if (!steps.has(r)) err(`${s.file}: ${id}: unknown prerequisite ${r}`);
  for (const r of s.prerequisites?.soft ?? []) if (!steps.has(r)) err(`${s.file}: ${id}: unknown soft prerequisite ${r}`);
  const prog = progressions.get(s.progression);
  if (prog.order !== "free" && s.index > 0) req.add(prog.stepIds[s.index - 1]);
  before.set(id, [...req].filter((r) => steps.has(r)));
}
{ // cycle check
  const state = new Map();
  const visit = (id, path) => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) { err(`prerequisite cycle: ${[...path, id].join(" -> ")}`); return; }
    state.set(id, 1);
    for (const r of before.get(id)) visit(r, [...path, id]);
    state.set(id, 2);
  };
  for (const id of steps.keys()) visit(id, []);
}

// ---------- coverage of frameworks by steps ----------
const stepsFor = new Map();
for (const [id, s] of steps) for (const c of s.objectives ?? []) { if (!stepsFor.has(c)) stepsFor.set(c, []); stepsFor.get(c).push(id); }
// Objectives a profile declares out of scope (with a reason) need no step.
const outOfScope = new Map();
for (const { file, data } of profileFiles) for (const [code, why] of Object.entries(data.out_of_scope ?? {})) {
  if (!objectives.has(code)) err(`${file}: out_of_scope names unknown objective ${code}`);
  else if (!why) err(`${file}: out_of_scope ${code} needs a reason`);
  else if (stepsFor.has(code)) warn(`${file}: ${code} is out of scope but steps map to it`);
  outOfScope.set(code, why);
}
for (const [code, o] of objectives) {
  if (o.kind === "content" && !stepsFor.has(code) && !outOfScope.has(code)) err(`${frameworks.get(o.framework).file}: content objective ${code} has no step ("${o.text.slice(0, 70)}…")`);
}

// ---------- profiles ----------
const BAND_STAGE = { "end-klasse-2": "klasse-2", "end-klasse-4": "klasse-4", "end-reception": "reception", "end-year-1": "year-1", "end-year-2": "year-2", "end-year-3": "year-3", "end-year-4": "year-4", "end-year-5": "year-5", "end-year-6": "year-6" };
const profiles = [];
for (const { file, data } of profileFiles) {
  const market = markets.get(data.market);
  if (!market) { err(`${file}: unknown market ${data.market}`); continue; }
  for (const f of data.frameworks ?? []) if (!frameworks.has(f)) err(`${file}: unknown framework ${f}`);
  const pos = new Map(); // step -> [stageIndex, order]
  const rows = [];
  for (const [stage, list] of Object.entries(data.placement ?? {})) {
    if (!market.order.has(stage)) { err(`${file}: unknown stage ${stage}`); continue; }
    (list ?? []).forEach((id, i) => {
      if (!steps.has(id)) { err(`${file}: ${stage}: unknown step ${id}`); return; }
      if (pos.has(id)) { err(`${file}: ${id} placed twice`); return; }
      pos.set(id, [market.order.get(stage), i]);
      rows.push({ id, stage, order: i });
    });
  }
  const lt = (a, b) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
  for (const [id, p] of pos) {
    for (const r of before.get(id)) {
      if (!pos.has(r)) { warn(`${file}: ${id} needs ${r}, which this profile does not place`); continue; }
      if (!lt(pos.get(r), p)) err(`${file}: ${id} is placed before its prerequisite ${r}`);
    }
    // Placement against the framework band, for this profile's frameworks.
    for (const c of steps.get(id).objectives ?? []) {
      const o = objectives.get(c);
      if (!o || !(data.frameworks ?? []).includes(o.framework)) continue;
      const by = BAND_STAGE[o.band];
      // A learning year is compared through the grade it usually falls in (ly-4 counts as year-6).
      const stageName = market.ids[p[0]];
      const grade = data.learning_years?.[stageName]?.grades?.at(-1) ?? stageName;
      const at = market.order.get(grade);
      // A statement printed across both NRW columns is expected by Klasse 2 and
      // deepened later, so later steps may map to it.
      if (by && !o.spans && market.order.has(by) && at > market.order.get(by) && o.kind === "content")
        warn(`${file}: ${id} is placed after ${o.band} but maps to ${c}`);
    }
  }
  // Every content objective of the profile's frameworks reached by a placed step.
  for (const f of data.frameworks ?? []) for (const o of frameworks.get(f)?.objectives ?? []) {
    if (o.kind !== "content" || (data.out_of_scope ?? {})[o.code]) continue;
    if (!(stepsFor.get(o.code) ?? []).some((s) => pos.has(s))) err(`${file}: objective ${o.code} has no placed step`);
  }
  for (const id of steps.keys()) if (!pos.has(id) && data.domains?.includes(steps.get(id).progression.split(".")[0])) {
    const s = steps.get(id);
    const asked = (s.objectives ?? []).some((c) => (data.frameworks ?? []).includes(objectives.get(c)?.framework));
    if (asked) err(`${file}: ${id} serves this profile's frameworks but is not placed`);
  }
  profiles.push({ file, ...data, market, pos, rows });
}

// ---------- views ----------
const V = join(T, "views");
mkdirSync(V, { recursive: true });
const md = (s) => String(s ?? "").replace(/\|/g, "\\|");
const header = (title, note) => `# ${title}\n\nGenerated by twist/build.mjs from the records. Do not edit.${note ? " " + note : ""}\n\n`;
const written = [];
// Clear old views so renamed or removed records leave nothing stale behind.
for (const f of readdirSync(V)) if (f.endsWith(".md") && f !== "README.md") unlinkSync(join(V, f));
const write = (name, text) => { writeFileSync(join(V, name), text); written.push(name); };

// Library by domain.
const domains = [...new Set([...progressions.values()].map((p) => p.domain))].sort();
for (const d of domains) {
  let out = header(`Competency library: ${d}`);
  const progs = [...progressions.values()].filter((p) => p.domain === d);
  out += `${progs.length} progressions, ${progs.reduce((n, p) => n + p.stepIds.length, 0)} steps.\n\n`;
  for (const p of progs) {
    out += `## ${p.title.de} (${p.title.en})\n\n\`${p.progression}\`${p.order === "free" ? ", steps in any order" : ""}\n\n| step | Ich kann … | I can … | objectives |\n|---|---|---|---|\n`;
    for (const id of p.stepIds) {
      const s = steps.get(id);
      const objs = (s.objectives ?? []).map((c) => c.replace(/^kmk-[a-z]+-20\d\d\./, "KMK ")).join(", ");
      out += `| \`${id.slice(p.progression.length + 1)}\`${s.enrichment ? " (enrichment)" : ""} | ${md(s.can_do.de)} | ${md(s.can_do.en)} | ${md(objs || (s.enrichment ? s.reason : s.beyond_framework ?? s.note))} |\n`;
    }
    out += "\n";
  }
  write(`library-${d}.md`, out);
}

// Profile grade views.
for (const pr of profiles) {
  let out = header(`${pr.title ?? pr.profile} (${pr.profile}): grade view`, "Topics are runs of placed steps that share a topic label.");
  for (const stage of pr.market.ids) {
    const rows = pr.rows.filter((r) => r.stage === stage).sort((a, b) => a.order - b.order);
    if (!rows.length) continue;
    const lang = pr.market.market.startsWith("de") ? "de" : "en";
    const label = [...(pr.market.grades ?? []), ...(pr.market.learning_years ?? [])].find((s) => s.id === stage)?.label?.[lang] ?? stage;
    out += `## ${label}\n\n${rows.length} steps.\n\n`;
    // One section per subject, in the profile's subject order; topics inside it.
    for (const [domain, name] of Object.entries(pr.subjects ?? {})) {
      const inDomain = rows.filter((r) => r.id.split(".")[0] === domain);
      if (!inDomain.length) continue;
      out += `### ${name} (${inDomain.length})\n`;
      let topic = null;
      for (const r of inDomain) {
        const s = steps.get(r.id);
        if (s.topic[lang] !== topic) { topic = s.topic[lang]; out += `\n#### ${topic}\n\n`; }
        out += `- ${s.can_do[lang]}  \n  <sub>\`${r.id}\`</sub>\n`;
      }
      out += "\n";
    }
  }
  write(`profile-${pr.profile}.md`, out);
}

// Placement summary: steps per stage and subject, for every profile.
{
  let out = header("Placements", "Steps placed per stage and subject in each curriculum. Full step lists are in the profile views.");
  for (const pr of profiles) {
    const lang = pr.market.market.startsWith("de") ? "de" : "en";
    const subjects = Object.entries(pr.subjects ?? {});
    const label = (id) => [...(pr.market.grades ?? []), ...(pr.market.learning_years ?? [])].find((s) => s.id === id)?.label?.[lang] ?? id;
    out += `## ${pr.title ?? pr.profile} (${pr.profile})\n\n${pr.rows.length} steps placed. Frameworks: ${(pr.frameworks ?? []).join(", ")}. Grade view: [profile-${pr.profile}.md](profile-${pr.profile}.md).\n\n`;
    out += `| Stage | ${subjects.map(([, n]) => n).join(" | ")} | Total |\n|---|${subjects.map(() => "---|").join("")}---|\n`;
    const totals = subjects.map(() => 0);
    for (const stage of pr.market.ids) {
      const rows = pr.rows.filter((r) => r.stage === stage);
      if (!rows.length) continue;
      const counts = subjects.map(([d], i) => { const n = rows.filter((r) => r.id.split(".")[0] === d).length; totals[i] += n; return n; });
      const ly = pr.learning_years?.[stage]?.grades;
      out += `| ${label(stage)}${ly ? ` (${ly.map(label).join(", ")})` : ""} | ${counts.map((n) => n || "").join(" | ")} | ${rows.length} |\n`;
    }
    out += `| **Total** | ${totals.join(" | ")} | ${pr.rows.length} |\n\n`;
    const oos = Object.keys(pr.out_of_scope ?? {}).length;
    if (oos) out += `${oos} framework objectives are out of scope for this curriculum, each with a reason in the profile.\n\n`;
  }
  const shared = [...steps.keys()].filter((id) => profiles.length > 1 && profiles.every((p) => p.pos.has(id)));
  if (profiles.length > 1) out += `## Shared steps\n\n${shared.length} steps are placed in every curriculum (${[...new Set(shared.map((id) => id.split(".")[0]))].map((d) => `${d}: ${shared.filter((id) => id.startsWith(d + ".")).length}`).join(", ")}).\n`;
  write("placements.md", out);
}

// Framework coverage.
for (const [fid, f] of frameworks) {
  let out = header(`Coverage: ${f.title}`);
  const objs = f.objectives ?? [];
  const covered = objs.filter((o) => stepsFor.has(o.code));
  out += `${covered.length} of ${objs.length} objectives have at least one step (content: ${objs.filter((o) => o.kind === "content" && stepsFor.has(o.code)).length} of ${objs.filter((o) => o.kind === "content").length}). Process objectives are mostly met through how lessons are built (phase 2).\n\n`;
  out += `| code | band | objective | steps |\n|---|---|---|---|\n`;
  for (const o of objs) out += `| ${o.code.slice(fid.length + 1)} | ${o.band ?? f.band ?? ""} | ${md(o.text)} | ${(stepsFor.get(o.code) ?? []).map((s) => `\`${s}\``).join(", ") || (outOfScope.has(o.code) ? `out of scope: ${md(outOfScope.get(o.code))}` : o.kind === "process" ? "(process)" : "**none**")} |\n`;
  write(`coverage-${fid}.md`, out);
}

// ---------- report ----------
const n = (m) => [...m.values()].length;
console.log(`twist: ${n(progressions)} progressions, ${n(steps)} steps, ${n(frameworks)} frameworks (${n(objectives)} objectives), ${profiles.length} profiles`);
for (const pr of profiles) {
  const by = {}; for (const r of pr.rows) by[r.stage] = (by[r.stage] ?? 0) + 1;
  console.log(`  ${pr.profile}: ${pr.rows.length} placed`, by);
}
console.log(`  views: ${written.join(", ")}`);
if (warnings.length) { console.log(`\n${warnings.length} warnings:`); for (const w of warnings) console.log("  - " + w); }
if (errors.length) { console.log(`\n${errors.length} errors:`); for (const e of errors) console.log("  - " + e); process.exit(1); }
console.log("\nok");
