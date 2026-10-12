// Builds site/index.html from the rnd docs and what is on disk.
// Run from anywhere: node site/build.mjs (or node build.mjs inside site/).
// The page is generated; edit this script or template.html, never index.html.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SITE, "..");
const ANTON = join(ROOT, "anton");
const PRIOR = join(ANTON, "notes/prior/2026-10-07-anton-curriculum-research.md");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

function walk(dir, skip = []) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    if (skip.includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, skip));
    else out.push(p);
  }
  return out;
}

// ---------- small markdown helpers ----------

function sections(md, level) {
  const marker = "#".repeat(level) + " ";
  const out = [];
  let cur = null;
  for (const line of md.split("\n")) {
    if (line.startsWith(marker)) {
      cur = { title: line.slice(marker.length).trim(), lines: [] };
      out.push(cur);
    } else if (cur) {
      if (/^#{1,6} /.test(line) && line.match(/^#+/)[0].length < level) cur = null;
      else cur.lines.push(line);
    }
  }
  return out;
}

function listItems(lines) {
  const items = [];
  for (const line of lines) {
    const m = line.match(/^(?:[-*]|\d+\.)\s+(.*)$/);
    if (m) items.push(m[1]);
    else if (/^\s{2,}\S/.test(line) && items.length) items[items.length - 1] += " " + line.trim();
  }
  return items;
}

function boldLead(item) {
  const m = item.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!m) return { lead: null, rest: item };
  return { lead: m[1].replace(/[:.]$/, "").trim(), rest: m[2].trim() };
}

function table(lines) {
  const rows = lines.filter((l) => l.trim().startsWith("|"));
  if (rows.length < 2) return { head: [], rows: [] };
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  return { head: cells(rows[0]), rows: rows.slice(2).map(cells).filter((r) => r.some(Boolean)) };
}

function paragraphs(lines) {
  return lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("|") && !/^(?:[-*]|\d+\.)\s/.test(p) && !p.startsWith(">"));
}

// ---------- prior baseline: topic maps ----------

function leadCount(lead) {
  // "(1) (31)": a number followed by another bracketed number is a part index, skip it.
  const nums = [...lead.matchAll(/\((\d+)\)(?!\s*\(\d)/g)].map((m) => +m[1]);
  return nums.length ? nums.reduce((a, b) => a + b, 0) : null;
}

function topicMaps(md) {
  const top = sections(md, 2).find((s) => s.title === "Topic maps");
  if (!top) return [];
  const grades = [];
  for (const g of sections(top.lines.join("\n"), 3)) {
    const m = g.title.match(/^(.+?), (.+?) \((\d+) exercises, (?:about )?(\d+) lessons(.*)\)$/);
    const intro = paragraphs(g.lines)[0] || "";
    const secs = listItems(g.lines).map((it) => {
      const { lead, rest } = boldLead(it);
      if (!lead) return { name: it, count: null, detail: "", summed: false };
      const name = lead.replace(/\s*\(\d+(?: exercises)?\)(?!\s*\(\d)/g, "").trim();
      let count = leadCount(lead);
      let summed = false;
      if (count === null && !/exercises\)/.test(lead)) {
        const inner = [...rest.matchAll(/\((\d+)[:)]/g)].map((x) => +x[1]);
        if (inner.length) { count = inner.reduce((a, b) => a + b, 0); summed = true; }
      }
      const ex = lead.match(/\((\d+) exercises\)/);
      return { name, count, exercises: ex ? +ex[1] : null, detail: rest, summed };
    });
    if (m) {
      grades.push({
        curriculum: m[1], grade: m[2], exercises: +m[3], lessons: +m[4],
        approx: /about/.test(g.title), extra: m[5].trim(), intro, sections: secs,
      });
    } else {
      grades.push({ curriculum: g.title.split(" (")[0], grade: "Section level", exercises: null, lessons: null, approx: false, extra: "", intro, sections: secs });
    }
  }
  return grades;
}

// ---------- prior baseline: exercise types, alignment, gaps ----------

function exerciseTypes(md) {
  const s = sections(md, 2).find((x) => x.title === "Exercise type inventory");
  if (!s) return { intro: "", rows: [] };
  const t = table(s.lines);
  return {
    intro: paragraphs(s.lines)[0] || "",
    rows: t.rows.map(([type, share, notes]) => {
      const pct = share.match(/(\d+)%/);
      return { type, share, pct: pct ? +pct[1] : null, notes };
    }),
  };
}

function ageAlignment(md) {
  const s = sections(md, 3).find((x) => x.title === "Age alignment");
  return s ? { ...table(s.lines), note: paragraphs(s.lines)[0] || "" } : { head: [], rows: [] };
}

function gaps(md) {
  const top = sections(md, 2).find((x) => x.title.startsWith("Gap comparison"));
  if (!top) return { size: null, groups: [] };
  const subs = sections(top.lines.join("\n"), 3);
  const size = subs.find((x) => x.title === "Size");
  const groups = subs
    .filter((x) => x.title.includes(":") || x.title.startsWith("Our German"))
    .map((x) => ({
      title: x.title,
      items: listItems(x.lines).map(boldLead),
      text: paragraphs(x.lines),
    }));
  return { size: size ? { ...table(size.lines), note: paragraphs(size.lines).join("\n\n") } : null, groups };
}

function strengths(md) {
  const top = sections(md, 2).find((x) => x.title.startsWith("Strengths and weaknesses"));
  if (!top) return [];
  return sections(top.lines.join("\n"), 3).map((x) => ({ title: x.title, items: listItems(x.lines).map(boldLead) }));
}

// ---------- plan ----------

function plan(md, indexMd) {
  const secs = sections(md, 2);
  const stepDone = (id) => new RegExp(`^\\s*[-*]?\\s*${id}\\s*:\\s*done`, "im").test(indexMd);
  const stepStarted = (id) => new RegExp(`^\\s*[-*]?\\s*${id}\\s*:\\s*(in progress|started)`, "im").test(indexMd);
  return secs.map((s) => {
    const t = table(s.lines);
    const steps = t.rows.map(([id, what, done]) => ({
      id, what, done,
      status: stepDone(id) ? "done" : stepStarted(id) ? "active" : "todo",
      gate: /Gate/.test(done),
    }));
    return { title: s.title, paras: paragraphs(s.lines), steps, items: listItems(s.lines).map(boldLead) };
  });
}

// ---------- root outputs ----------

function findings(md) {
  const t = table(md.split("\n"));
  return t.rows.map(([id, source, area, finding, evidence, status, fedInto]) => ({ id, source, area, finding, evidence, status, fedInto }));
}

function taxonomy(md) {
  const secs = sections(md, 2);
  const get = (name) => {
    const s = secs.find((x) => x.title === name);
    return s ? table(s.lines) : { head: [], rows: [] };
  };
  return { types: get("Exercise types"), mechanics: get("Lesson mechanics") };
}

// ---------- capture counts ----------

// Step 1f: one row per chunk list, with how many of its files exist on disk.
function fullTextChunks() {
  const dir = join(ANTON, "tools/lists/1f");
  if (!existsSync(dir)) return [];
  // A parallel run splits some chunks into shards; those chunks count as running while any shard runs.
  const manifest = existsSync(join(dir, "shards/manifest.json")) ? JSON.parse(read(join(dir, "shards/manifest.json"))) : null;
  const shardLogs = manifest ? manifest.shards.map((s) => read(join(dir, "shards", s + ".run.log"))) : [];
  const shardsRunning = shardLogs.some((l) => l && !/^fetched \d+/m.test(l));
  return readdirSync(dir).filter((f) => /^\d\d-.*\.txt$/.test(f)).sort().map((f) => {
    const files = read(join(dir, f)).split("\n").map((l) => l.trim().split(/\s+/)[0]).filter(Boolean);
    const done = files.filter((id) => existsSync(join(ANTON, "api", id + ".json"))).length;
    const inShards = manifest && manifest.chunks.includes(f);
    const log = inShards && shardsRunning ? "running in shards" : read(join(dir, f.replace(/\.txt$/, ".run.log")));
    const [, cur, sub] = f.replace(/\.txt$/, "").match(/^\d\d-(de|en_gb)-(.+)$/) || [];
    return { file: f, curriculum: cur, subject: sub, total: files.length, done, started: !!log, finished: /^fetched \d+/m.test(log) };
  });
}

function captures() {
  const count = (sub) => walk(join(ANTON, sub)).length;
  const api = walk(join(ANTON, "api")).map((p) => relative(ANTON, p)).filter((p) => p.endsWith(".json"));
  return {
    api: api.length,
    plans: api.filter((p) => p.startsWith("api/plan/")).length,
    levels: api.filter((p) => p.startsWith("api/level/") && !p.includes("/probe/")).length,
    media: count("media"),
    screenshots: count("screenshots"),
    snapshots: count("snapshots"),
    notes: walk(join(ANTON, "notes"), ["prior"]).filter((p) => p.endsWith(".md")).length,
    chunks: fullTextChunks(),
    screenshots1d: walk(join(ANTON, "screenshots/1d")).length,
    index: existsSync(join(ANTON, "index.md")),
  };
}

// ---------- docs ----------

function docs() {
  return walk(ROOT, [".git", "site", "api", "media", "screenshots", "snapshots", "node_modules"])
    .filter((p) => p.endsWith(".md") && !p.endsWith("CLAUDE.md"))
    .map((p) => ({ path: relative(ROOT, p), md: readFileSync(p, "utf8") }))
    .sort((a, b) => {
      const depth = (x) => x.path.split("/").length;
      return depth(a) - depth(b) || a.path.localeCompare(b.path);
    });
}

function readme(md) {
  const secs = sections(md, 2);
  const get = (name) => {
    const s = secs.find((x) => x.title === name);
    return s ? table(s.lines).rows : [];
  };
  return { sources: get("Sources"), outputs: get("Outputs") };
}

function crosswalkSpec(md) {
  const s = sections(md, 2).find((x) => x.title === "What each file holds");
  return s ? listItems(s.lines).map(boldLead) : [];
}

async function catalogue() {
  const file = join(ROOT, "catalogue/catalogue.db");
  if (!existsSync(file)) return null;
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(file, { readOnly: true });
  const q = (sql, ...a) => db.prepare(sql).all(...a).map((r) => ({ ...r }));
  const strip = (s) => String(s || "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const curricula = {};
  for (const cur of ["en_gb", "de"]) {
    curricula[cur] = q(`SELECT c.id, cc.title, c.subject, c.subject_name, c.grades, c.grade_min, c.grade_max,
        c.outdated, c.lessons, c.exercises FROM course c JOIN course_curriculum cc ON cc.course = c.id
        WHERE cc.curriculum = ? ORDER BY c.subject_name, c.grade_min, c.id`, cur)
      .map((c) => ({ ...c, title: strip(c.title), grades: JSON.parse(c.grades) }));
  }
  const topics = {};
  for (const t of q("SELECT id, course, title FROM topic ORDER BY course, position")) (topics[t.course] ||= []).push({ id: t.id, title: strip(t.title), lessons: [] });
  const tIndex = {};
  for (const list of Object.values(topics)) for (const t of list) tIndex[t.id] = t;
  for (const l of q("SELECT topic, title, exercises FROM lesson ORDER BY course, position")) tIndex[l.topic]?.lessons.push([strip(l.title), l.exercises]);
  for (const list of Object.values(topics)) for (const t of list) delete t.id;
  const trainers = q(`SELECT et.trainer, COUNT(DISTINCT et.exercise) exercises, SUM(et.items) items,
      COUNT(DISTINCT e.course) courses FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise
      GROUP BY et.trainer ORDER BY exercises DESC`);
  for (const t of trainers) {
    t.subjects = q(`SELECT c.subject_name s, COUNT(DISTINCT et.exercise) n FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise
      JOIN course c ON c.id = e.course WHERE et.trainer = ? GROUP BY s ORDER BY n DESC LIMIT 5`, t.trainer).map((x) => `${x.s} (${x.n})`);
    t.examples = q(`SELECT DISTINCT e.title t, c.id course FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise
      JOIN course c ON c.id = e.course WHERE et.trainer = ? LIMIT 5`, t.trainer).map((x) => `${strip(x.t)} (${x.course})`);
  }
  const kinds = q("SELECT kind, COUNT(*) n FROM exercise GROUP BY kind ORDER BY n DESC");
  const cap = q("SELECT COUNT(*) total, SUM(captured) captured FROM exercise")[0];
  const totals = q("SELECT (SELECT COUNT(*) FROM course) courses, (SELECT COUNT(*) FROM lesson) lessons, (SELECT COUNT(*) FROM exercise) exercises")[0];
  return { curricula, topics, trainers, kinds, capture: cap, totals };
}

const prior = read(PRIOR);
const indexMd = read(join(ANTON, "index.md"));
const data = {
  built: new Date().toISOString(),
  captures: captures(),
  plan: plan(read(join(ANTON, "PHASES.md")), indexMd),
  prior: {
    path: relative(ROOT, PRIOR),
    grades: topicMaps(prior),
    types: exerciseTypes(prior),
    alignment: ageAlignment(prior),
    gaps: gaps(prior),
    strengths: strengths(prior),
  },
  findings: findings(read(join(ROOT, "FINDINGS.md"))),
  taxonomy: taxonomy(read(join(ROOT, "taxonomy.md"))),
  anatomy: (() => {
    const md = read(join(ROOT, "anatomy.md"));
    const sec = sections(md, 2).find((x) => x.title === "Side by side");
    const t = sec ? table(sec.lines) : { rows: [] };
    return {
      intro: paragraphs(md.split("\n").slice(1)).slice(0, 2),
      rows: t.rows.map(([level, twist, twistSize, anton, antonSize, labels, note]) => ({ level, twist, twistSize, anton, antonSize, labels, note })),
    };
  })(),
  crosswalks: walk(join(ROOT, "crosswalk")).filter((p) => p.endsWith(".md") && !p.endsWith("README.md")).sort().map((p) => {
    const md = read(p);
    const sum = sections(md, 2).find((x) => /summary/i.test(x.title));
    return { path: relative(ROOT, p), title: (md.match(/^# (.+)$/m) || [, relative(ROOT, p)])[1], summary: sum ? listItems(sum.lines) : [] };
  }),
  cat: await catalogue(),
  readme: readme(read(join(ROOT, "README.md"))),
  crosswalkSpec: crosswalkSpec(read(join(ROOT, "crosswalk/README.md"))),
  crosswalkBuilt: walk(join(ROOT, "crosswalk")).filter((p) => !p.endsWith("README.md")).length,
  catalogueBuilt: existsSync(join(ROOT, "catalogue/catalogue.db")),
  docs: docs(),
};

const json = JSON.stringify(data).replace(/</g, "\\u003c");
// Two outputs from one template:
// - index.html: a complete standalone page, tracked in the repo, opens from disk.
// - dist/artifact.html: the same page without <html>/<head>/<body>, which the
//   claude.ai publisher wraps itself. Gitignored.
// Function replacer: a string replacement would treat $&, $' and $` in the data as patterns.
const fragment = read(join(SITE, "template.html")).replace("/*DATA*/null", () => json);
const cut = fragment.indexOf("</style>") + "</style>".length;
const page =
  '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  fragment.slice(0, cut) + "\n</head>\n<body>\n" + fragment.slice(cut) + "\n</body>\n</html>\n";
writeFileSync(join(SITE, "index.html"), page);
mkdirSync(join(SITE, "dist"), { recursive: true });
writeFileSync(join(SITE, "dist/artifact.html"), fragment);
console.log(
  `site/index.html: ${data.docs.length} docs, ${data.prior.grades.length} baseline grades, ` +
  `${data.prior.types.rows.length} exercise types, ${data.findings.length} findings, ${data.captures.api} api files`
);
