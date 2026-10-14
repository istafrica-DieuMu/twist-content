// Checks the Twist curriculum records and builds the views.
//   node twist/build.mjs            (from the rnd root, or `npm run build` in twist/)
// Reads years/, frameworks/, competencies/, curricula/; writes views/.
// Fails (exit 1) on errors; prints warnings. Views are generated: never edit them.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync, unlinkSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { checkLessons } from "./lessons-check.mjs";
import { tracking } from "./tracking.mjs";

const T = dirname(fileURLToPath(import.meta.url));
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);

const walk = (d) => (existsSync(d) ? readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);
const load = (dir) => walk(join(T, dir)).filter((p) => p.endsWith(".yaml")).sort().map((p) => {
  try { return { file: relative(T, p), data: YAML.parse(readFileSync(p, "utf8")) }; }
  catch (e) { err(`${relative(T, p)}: YAML error: ${e.message.split("\n")[0]}`); return null; }
}).filter(Boolean);

// ---------- load ----------
const stageFiles = load("years");
const frameworkFiles = load("frameworks");
const progressionFiles = load("competencies");
const profileFiles = load("curricula");

const markets = new Map();
for (const { file, data } of stageFiles) {
  const ids = [...(data.grades ?? []), ...(data.learning_years ?? [])].map((s) => s.id);
  markets.set(data.market, { file, ...data, ids, order: new Map(ids.map((id, i) => [id, i])) });
}

const objectives = new Map(); // code -> objective + framework
const frameworks = new Map();
for (const { file, data } of frameworkFiles) {
  frameworks.set(data.framework, { file, ...data });
  for (const o of data.standards ?? []) {
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
  for (const s of data.skills ?? []) {
    const where = `${file}: ${s.id}`;
    if (!s.id?.startsWith(p + ".")) err(`${where}: id must start with ${p}.`);
    if (steps.has(s.id)) err(`${where}: duplicate step id`);
    if (GRADE_IN_ID.test(s.id)) err(`${where}: id contains a grade or stage`);
    if (!/^[a-z0-9.-]+$/.test(s.id)) err(`${where}: id must be lowercase ASCII`);
    if (!s.can_do?.de || !s.can_do?.en) err(`${where}: can_do needs de and en`);
    if (!s.topic?.de || !s.topic?.en) err(`${where}: topic needs de and en`);
    if (SOURCE_REF.test(JSON.stringify(s))) err(`${where}: records must not cite sources`);
    const objs = s.standards ?? [];
    if (!objs.length && !s.enrichment && !s.note && !s.beyond_framework) err(`${where}: no standards; mark enrichment or beyond_framework with a reason, or add a note`);
    if (s.enrichment && !s.reason) err(`${where}: enrichment needs a reason`);
    if (!objs.length && !s.enrichment && !s.beyond_framework) warn(`${where}: no standard yet (${s.note ? "note: " + s.note.slice(0, 60) + "…" : ""})`);
    for (const c of objs) if (!objectives.has(c)) err(`${where}: unknown standard ${c}`);
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
for (const [id, s] of steps) for (const c of s.standards ?? []) { if (!stepsFor.has(c)) stepsFor.set(c, []); stepsFor.get(c).push(id); }
// Objectives a profile declares out of scope (with a reason) need no step.
const outOfScope = new Map();
for (const { file, data } of profileFiles) for (const [code, why] of Object.entries(data.out_of_scope ?? {})) {
  if (!objectives.has(code)) err(`${file}: out_of_scope names unknown objective ${code}`);
  else if (!why) err(`${file}: out_of_scope ${code} needs a reason`);
  else if (stepsFor.has(code)) warn(`${file}: ${code} is out of scope but steps map to it`);
  outOfScope.set(code, why);
}
for (const [code, o] of objectives) {
  if (o.kind === "content" && !stepsFor.has(code) && !outOfScope.has(code)) err(`${frameworks.get(o.framework).file}: content standard ${code} has no skill ("${o.text.slice(0, 70)}…")`);
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
      if (!pos.has(r)) { warn(`${file}: ${id} needs ${r}, which this curriculum does not place`); continue; }
      if (!lt(pos.get(r), p)) err(`${file}: ${id} is placed before its prerequisite ${r}`);
    }
    // Placement against the framework band, for this profile's frameworks.
    for (const c of steps.get(id).standards ?? []) {
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
  for (const f of data.frameworks ?? []) for (const o of frameworks.get(f)?.standards ?? []) {
    if (o.kind !== "content" || (data.out_of_scope ?? {})[o.code]) continue;
    if (!(stepsFor.get(o.code) ?? []).some((s) => pos.has(s))) err(`${file}: standard ${o.code} has no placed skill`);
  }
  for (const id of steps.keys()) if (!pos.has(id) && data.domains?.includes(steps.get(id).progression.split(".")[0])) {
    const s = steps.get(id);
    const asked = (s.standards ?? []).some((c) => (data.frameworks ?? []).includes(objectives.get(c)?.framework));
    if (asked) err(`${file}: ${id} serves this curriculum's frameworks but is not placed`);
  }
  profiles.push({ file, ...data, market, pos, rows });
}

// ---------- lessons and assets ----------
const L = checkLessons({ T, steps, profiles, err, warn });

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
  out += `${progs.length} progressions, ${progs.reduce((n, p) => n + p.stepIds.length, 0)} skills.\n\n`;
  for (const p of progs) {
    out += `## ${p.title.de} (${p.title.en})\n\n\`${p.progression}\`${p.order === "free" ? ", skills in any order" : ""}\n\n| skill | Ich kann … | I can … | standards |\n|---|---|---|---|\n`;
    for (const id of p.stepIds) {
      const s = steps.get(id);
      const objs = (s.standards ?? []).map((c) => c.replace(/^kmk-[a-z]+-20\d\d\./, "KMK ")).join(", ");
      out += `| \`${id.slice(p.progression.length + 1)}\`${s.enrichment ? " (enrichment)" : ""} | ${md(s.can_do.de)} | ${md(s.can_do.en)} | ${md(objs || (s.enrichment ? s.reason : s.beyond_framework ?? s.note))} |\n`;
    }
    out += "\n";
  }
  write(`library-${d}.md`, out);
}

// Profile grade views.
for (const pr of profiles) {
  let out = header(`${pr.title ?? pr.curriculum} (${pr.curriculum}): grade view`, "Topics are runs of placed skills that share a topic label.");
  for (const stage of pr.market.ids) {
    const rows = pr.rows.filter((r) => r.stage === stage).sort((a, b) => a.order - b.order);
    if (!rows.length) continue;
    const lang = pr.market.market.startsWith("de") ? "de" : "en";
    const label = [...(pr.market.grades ?? []), ...(pr.market.learning_years ?? [])].find((s) => s.id === stage)?.label?.[lang] ?? stage;
    out += `## ${label}\n\n${rows.length} skills.\n\n`;
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
  write(`curriculum-${pr.curriculum}.md`, out);
}

// Placement summary: steps per stage and subject, for every profile.
{
  let out = header("Placements", "Skills placed per year and subject in each curriculum. Full skill lists are in the curriculum views.");
  for (const pr of profiles) {
    const lang = pr.market.market.startsWith("de") ? "de" : "en";
    const subjects = Object.entries(pr.subjects ?? {});
    const label = (id) => [...(pr.market.grades ?? []), ...(pr.market.learning_years ?? [])].find((s) => s.id === id)?.label?.[lang] ?? id;
    out += `## ${pr.title ?? pr.curriculum} (${pr.curriculum})\n\n${pr.rows.length} skills placed. Frameworks: ${(pr.frameworks ?? []).join(", ")}. Grade view: [curriculum-${pr.curriculum}.md](curriculum-${pr.curriculum}.md).\n\n`;
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
    if (oos) out += `${oos} standards are out of scope for this curriculum, each with a reason in the curriculum file.\n\n`;
  }
  const shared = [...steps.keys()].filter((id) => profiles.length > 1 && profiles.every((p) => p.pos.has(id)));
  if (profiles.length > 1) out += `## Shared skills\n\n${shared.length} skills are placed in every curriculum (${[...new Set(shared.map((id) => id.split(".")[0]))].map((d) => `${d}: ${shared.filter((id) => id.startsWith(d + ".")).length}`).join(", ")}).\n`;
  write("placements.md", out);
}

// Lessons: one row per lesson set, then its lessons.
{
  let out = header("Lessons", "One section per lesson set: its skill, metadata, and each lesson's activities.");
  out += `${L.sets.length} lesson sets, ${L.sets.reduce((n, s) => n + s.summary.length, 0)} lessons, ${L.sets.reduce((n, s) => n + s.summary.reduce((m, l) => m + l.tasks, 0), 0)} tasks.\n\n`;
  for (const { d, summary, typeMix } of L.sets) {
    const meta = d.metadata ?? {};
    out += `## ${d.title.de} (${d.title.en})\n\n\`${d.id}\` teaches \`${d.skill}\` in ${d.curriculum}, ${meta.year}. Ages ${(meta.ages ?? []).join(", ")}, about ${meta.lesson_minutes} minutes a lesson. Status: ${meta.status}, version ${meta.version}.\n\n`;
    out += `${md(d.summary)}\n\n`;
    out += `| Lesson | New | Tasks | Activities |\n|---|---|---|---|\n`;
    for (const l of summary) out += `| ${l.n}. ${md(l.title.de)} | ${l.new ? "yes" : "no"} | ${l.tasks} | ${l.seq.join(", ")} |\n`;
    out += `\nTask types: ${Object.entries(typeMix).map(([k, v]) => `${k} ${v}`).join(", ")}. Builds on: ${(meta.builds_on ?? []).map((x) => `\`${x}\``).join(", ")}. Misconceptions addressed: ${(meta.misconceptions ?? []).length}.\n\n`;
  }
  write("lessons.md", out);
}

// Course views: each curriculum as it is actually authored, year by year,
// in placement order; skills without lessons yet are listed so the view
// grows as lessons are written.
for (const pr of profiles) {
  const cur = pr.curriculum, lang = pr.market.market.startsWith("de") ? "de" : "en";
  const bySkill = new Map(L.sets.filter((x) => x.d.curriculum === cur).map((x) => [x.d.skill, x]));
  const label = (stage) => [...(pr.market.grades ?? []), ...(pr.market.learning_years ?? [])].find((s) => s.id === stage)?.label?.[lang] ?? stage;
  const done = pr.rows.filter((r) => bySkill.has(r.id));
  let out = header(`${pr.title ?? cur} (${cur}): the course as authored`, "Year by year and subject by subject, in placement order: each skill with its lesson set, the lessons in it and the record's path. Skills with no lessons yet are marked, so this view fills in as lessons are written.");
  const tasks = (x) => x.summary.reduce((n, l) => n + l.tasks, 0);
  out += `${done.length} of ${pr.rows.length} placed skills have a lesson set: ${done.reduce((n, r) => n + bySkill.get(r.id).summary.length, 0)} lessons, ${done.reduce((n, r) => n + tasks(bySkill.get(r.id)), 0)} tasks.\n\n`;
  out += `| ${lang === "de" ? "Jahr" : "Year"} | ${Object.values(pr.subjects ?? {}).join(" | ")} |\n|---|${Object.keys(pr.subjects ?? {}).map(() => "---").join("|")}|\n`;
  for (const stage of pr.market.ids) {
    const rows = pr.rows.filter((r) => r.stage === stage);
    if (!rows.length) continue;
    out += `| ${label(stage)} | ${Object.keys(pr.subjects ?? {}).map((d) => { const inD = rows.filter((r) => r.id.split(".")[0] === d); return inD.length ? `${inD.filter((r) => bySkill.has(r.id)).length} / ${inD.length}` : ""; }).join(" | ")} |\n`;
  }
  out += "\n";
  for (const stage of pr.market.ids) {
    const rows = pr.rows.filter((r) => r.stage === stage).sort((a, b) => a.order - b.order);
    if (!rows.length) continue;
    out += `## ${label(stage)}\n\n`;
    for (const [domain, name] of Object.entries(pr.subjects ?? {})) {
      const inDomain = rows.filter((r) => r.id.split(".")[0] === domain);
      if (!inDomain.length) continue;
      out += `### ${name}\n`;
      let topic = null;
      for (const r of inDomain) {
        const st = steps.get(r.id), x = bySkill.get(r.id);
        if (st.topic[lang] !== topic) { topic = st.topic[lang]; out += `\n#### ${md(topic)}\n\n`; }
        if (!x) { out += `- *${lang === "de" ? "noch keine Lektionen" : "no lessons yet"}*: ${md(st.can_do[lang])} <sub>\`${r.id}\`</sub>\n`; continue; }
        out += `- **${md(x.d.title[lang] ?? x.d.title.de)}**: ${x.summary.length} ${lang === "de" ? "Lektionen" : "lessons"}, ${tasks(x)} ${lang === "de" ? "Aufgaben" : "tasks"}. <sub>\`twist/${x.file}\`</sub>\n`;
        out += `  ${x.summary.map((l) => `${l.n}. ${md(l.title[lang] ?? l.title.de)} (${l.tasks})`).join(" · ")}\n`;
      }
      out += "\n";
    }
  }
  write(`course-${cur}.md`, out);
}

// Asset bank: what exists, what lessons use, what is still needed.
{
  let out = header("Asset bank", "Every bank entry with the lesson sets that use it.");
  const row = (kind, map, id, extra) => { const u = L.used[kind].get(id); return `| \`${id}\` | ${extra} | ${u ? u.size : 0} | ${map.get(id)?.status ?? ""} |\n`; };
  const objs = [...L.objects.values()];
  const pics = existsSync(join(T, "assets/objects")) ? readdirSync(join(T, "assets/objects")).filter((f) => f.endsWith(".png")) : [];
  const picCell = (id) => { const base = pics.includes(`${id}.png`) ? `[png](../assets/objects/${id}.png)` : "missing"; const cols = pics.filter((f) => f.startsWith(id + ".") && f !== `${id}.png`).map((f) => f.slice(id.length + 1, -4)); return cols.length ? `${base}; ${cols.join(", ")}` : base; };
  out += `## Objects (${objs.length})\n\n${objs.filter((o) => L.used.object.has(o.id)).length} used by lessons so far; ${objs.filter((o) => o.colour_slot).length} have a colour slot; ${objs.filter((o) => pics.includes(`${o.id}.png`)).length} have a picture. Pictures are made by assets/tools/pictures.py from each object's \`draw\` line.\n\n| id | de / en / fr | used by | status | picture |\n|---|---|---|---|---|\n`;
  for (const o of objs.sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id))) out += row("object", L.objects, o.id, `${o.labels.de} / ${o.labels.en} / ${o.labels.fr}${o.colour_slot ? " (colour slot)" : ""}`).replace(/ \|\n$/, ` | ${picCell(o.id)} |\n`);
  out += `\n## Drawn by the app (${L.drawn.size})\n\n| id | what | used by | status |\n|---|---|---|---|\n`;
  for (const c of L.drawn.values()) out += row("drawn", L.drawn, c.id, md(c.what));
  out += `\n## Recorded sounds (${L.sounds.size})\n\nEach voice has its own copy, in assets/narration/<voice>/sounds/. Status \`test\` means made for the voice pilot.\n\n| id | what | used by | status |\n|---|---|---|---|\n`;
  for (const c of L.sounds.values()) out += row("sound", L.sounds, c.id, md(c.what));
  // Voices: what the narration tool has made for each candidate.
  const V = YAML.parse(readFileSync(join(T, "assets/voices.yaml"), "utf8"));
  const linesFile = join(T, "assets/narration/lines.yaml");
  const nLines = existsSync(linesFile) ? Object.keys(YAML.parse(readFileSync(linesFile, "utf8")) ?? {}).length : 0;
  out += `\n## Voices (${V.candidates.length} in the pilot)\n\nOne voice speaks every line, sound and phrase. ${nLines} lines in assets/narration/lines.yaml plus ${L.sounds.size} sounds, made by assets/tools/narration.py and checked by a listening model. Chosen: ${V.chosen ? "\`" + V.chosen + "\`" : "not yet"}.\n\n| voice | model | clips | passed the check | minutes | MB | note |\n|---|---|---|---|---|---|---|\n`;
  for (const v of V.candidates) {
    const f = join(T, "assets/narration", `${v.id}.yaml`);
    const log = existsSync(f) ? Object.values(YAML.parse(readFileSync(f, "utf8")) ?? {}) : [];
    const sum = (k) => log.reduce((a, x) => a + (x[k] ?? 0), 0);
    out += `| \`${v.id}\` | ${v.model}, ${v.voice} | ${log.length} | ${log.filter((x) => x.check?.correct).length} | ${(sum("seconds") / 60).toFixed(1)} | ${(sum("bytes") / 1048576).toFixed(1)} | ${md(v.note ?? "")} |\n`;
  }
  write("assets.md", out);
}

// Framework coverage.
for (const [fid, f] of frameworks) {
  let out = header(`Coverage: ${f.title}`);
  const objs = f.standards ?? [];
  const covered = objs.filter((o) => stepsFor.has(o.code));
  out += `${covered.length} of ${objs.length} standards have at least one skill (content: ${objs.filter((o) => o.kind === "content" && stepsFor.has(o.code)).length} of ${objs.filter((o) => o.kind === "content").length}). Process standards are mostly met through how lessons are built.\n\n`;
  out += `| code | band | standard | skills |\n|---|---|---|---|\n`;
  for (const o of objs) out += `| ${o.code.slice(fid.length + 1)} | ${o.band ?? f.band ?? ""} | ${md(o.text)} | ${(stepsFor.get(o.code) ?? []).map((s) => `\`${s}\``).join(", ") || (outOfScope.has(o.code) ? `out of scope: ${md(outOfScope.get(o.code))}` : o.kind === "process" ? "(process)" : "**none**")} |\n`;
  write(`coverage-${fid}.md`, out);
}

// Progress and OpenRouter cost.
write("tracking.md", tracking());

// ---------- report ----------
const n = (m) => [...m.values()].length;
console.log(`twist: ${n(progressions)} progressions, ${n(steps)} skills, ${n(frameworks)} frameworks (${n(objectives)} standards), ${profiles.length} curricula`);
for (const pr of profiles) {
  const by = {}; for (const r of pr.rows) by[r.stage] = (by[r.stage] ?? 0) + 1;
  console.log(`  ${pr.curriculum}: ${pr.rows.length} placed`, by);
}
console.log(`  lessons: ${L.sets.length} lesson sets; assets: ${L.objects.size} objects, ${L.drawn.size} drawn components`);
console.log(`  views: ${written.join(", ")}`);
if (warnings.length) { console.log(`\n${warnings.length} warnings:`); for (const w of warnings) console.log("  - " + w); }
if (errors.length) { console.log(`\n${errors.length} errors:`); for (const e of errors) console.log("  - " + e); process.exit(1); }
console.log("\nok");
