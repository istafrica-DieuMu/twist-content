// Builds catalogue/catalogue.db and catalogue/views/ from the source folders.
// Run from the rnd root: node catalogue/build.mjs
// Generated output: edit this script, never the db or the views.

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const CAT = dirname(fileURLToPath(import.meta.url));
const ROOT = join(CAT, "..");
const API = join(ROOT, "anton/api");
const DB = join(CAT, "catalogue.db");
const VIEWS = join(CAT, "views");

const CURRICULA = { en_gb: "English-GB", de: "German-DE" };
const SUBJECTS = {
  nateng: "English", natdeu: "Deutsch", mat: "Maths", sci: "Science", geo: "Geography",
  his: "History", mus: "Music", com: "Computing", sel: "PSHE", preschool: "Preschool",
  eng: "English (foreign or additional language)", deu: "Deutsch als Zweitsprache (DaZ)",
  lang: "Foreign languages", bio: "Biology", chem: "Chemistry", phy: "Physics",
  sleng: "English (foreign or additional language)", sldeu: "Deutsch als Zweitsprache (DaZ)",
};
const gradeLabel = (g, cur) =>
  g === 0 ? (cur === "de" ? "Vorschule" : "Reception / preschool")
  : g === 99 ? "Not graded"
  : cur === "de" ? `Klasse ${g}` : `Year ${g}`;

const plans = JSON.parse(readFileSync(join(API, "list/plans.json"), "utf8")).plans;
const subjectOf = (p) => (typeof p.subject === "object" ? "lang" : p.subject);
const titleOf = (p, cur) => (typeof p.title === "object" ? p.title[cur] || p.title.en || Object.values(p.title)[0] : p.title);

if (existsSync(DB)) rmSync(DB);
const db = new DatabaseSync(DB);
db.exec(`
  CREATE TABLE source (id TEXT PRIMARY KEY, name TEXT);
  CREATE TABLE curriculum (id TEXT PRIMARY KEY, source TEXT, name TEXT);
  CREATE TABLE course (id TEXT PRIMARY KEY, source TEXT, subject TEXT, subject_name TEXT,
    grades TEXT, grade_min INTEGER, grade_max INTEGER, outdated INTEGER, lessons INTEGER, exercises INTEGER,
    version INTEGER, version_date TEXT, raw_path TEXT);
  CREATE TABLE course_curriculum (course TEXT, curriculum TEXT, title TEXT, PRIMARY KEY (course, curriculum));
  CREATE TABLE topic (id TEXT PRIMARY KEY, course TEXT, position INTEGER, title TEXT, tags TEXT);
  CREATE TABLE lesson (id TEXT PRIMARY KEY, course TEXT, topic TEXT, position INTEGER, title TEXT, tags TEXT, exercises INTEGER);
  CREATE TABLE exercise (id TEXT PRIMARY KEY, course TEXT, lesson TEXT, position INTEGER, title TEXT, kind TEXT,
    bytes INTEGER, file_id TEXT, captured INTEGER);
  CREATE TABLE exercise_trainer (exercise TEXT, position INTEGER, trainer TEXT, items INTEGER, sound_mode TEXT,
    PRIMARY KEY (exercise, position));
  CREATE TABLE exercise_media (exercise TEXT, kind TEXT, files INTEGER, PRIMARY KEY (exercise, kind));
`);
db.prepare("INSERT INTO source VALUES (?, ?)").run("anton", "Anton (anton.app)");
for (const [id, name] of Object.entries(CURRICULA)) db.prepare("INSERT INTO curriculum VALUES (?, ?, ?)").run(id, "anton", name);

const ins = {
  course: db.prepare("INSERT INTO course VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"),
  cc: db.prepare("INSERT INTO course_curriculum VALUES (?,?,?)"),
  topic: db.prepare("INSERT INTO topic VALUES (?,?,?,?,?)"),
  lesson: db.prepare("INSERT INTO lesson VALUES (?,?,?,?,?,?,?)"),
  exercise: db.prepare("INSERT INTO exercise VALUES (?,?,?,?,?,?,?,?,?)"),
  trainer: db.prepare("INSERT OR IGNORE INTO exercise_trainer VALUES (?,?,?,?,?)"),
  media: db.prepare("INSERT OR IGNORE INTO exercise_media VALUES (?,?,?)"),
};

db.exec("BEGIN");
for (const p of plans) {
  if (p.isDebug) continue;
  const curs = (p.guiLanguages || []).filter((l) => CURRICULA[l]);
  if (!curs.length) continue;
  const file = join(API, "plan", p.project + ".json");
  if (!existsSync(file)) continue;
  const plan = JSON.parse(readFileSync(file, "utf8"));
  const grades = p.grades || [];
  const subj = subjectOf(p);
  ins.course.run(p.project, "anton", subj, SUBJECTS[subj] || subj, JSON.stringify(grades),
    grades.length ? Math.min(...grades) : null, grades.length ? Math.max(...grades) : null,
    p.isOutdated ? 1 : 0, plan.totalBlocks ?? p.totalBlocks ?? 0, plan.totalLevels ?? p.totalLevels ?? 0,
    plan.version ?? p.version ?? null, plan.versionDate ?? p.versionDate ?? null, `anton/api/plan/${p.project}.json`);
  for (const c of curs) ins.cc.run(p.project, c, titleOf(p, c));
  (plan.topics || []).forEach((t, ti) => {
    ins.topic.run(t.puid, p.project, ti + 1, t.title, JSON.stringify(t.tags || []));
    (t.blocks || []).forEach((b, bi) => {
      const levels = b.levels || [];
      ins.lesson.run(b.puid, p.project, t.puid, bi + 1, b.title, JSON.stringify(b.tags || []), levels.length);
      levels.forEach((l, li) => {
        const fileId = "level/" + l.path.replace(/^\/\.\.\//, "");
        const raw = join(API, fileId + ".json");
        const captured = existsSync(raw);
        ins.exercise.run(l.puid, p.project, b.puid, li + 1, l.title, l.type,
          +String(l.etag || "0-0").split("-")[1] || 0, fileId, captured ? 1 : 0);
        if (!captured) return;
        try {
          const lv = JSON.parse(readFileSync(raw, "utf8"));
          (lv.trainers || []).forEach((tr, i) =>
            ins.trainer.run(l.puid, i + 1, tr.trainer || "unknown", Array.isArray(tr.atoms) ? tr.atoms.length : tr.atoms ? 1 : 0, tr.soundMode ?? null));
          for (const [kind, files] of Object.entries(lv.mediaFiles || {}))
            if (Array.isArray(files)) ins.media.run(l.puid, kind, files.length);
        } catch (e) { /* unparsable capture: counted as captured, no trainers */ }
      });
    });
  });
}
db.exec("COMMIT");

// ---------- views ----------
mkdirSync(VIEWS, { recursive: true });
const q = (sql, ...a) => db.prepare(sql).all(...a);
const gradeKey = (c) => (c.grade_min === 99 ? 1000 : c.grade_min ?? 999);
const index = [];
index.push("# Anton catalogue views", "",
  "Generated by `catalogue/build.mjs` from `anton/api/`. Do not edit by hand.", "",
  "Lessons and exercises per subject and curriculum. A course listed in both curricula counts in both.", "");

for (const [cur, curName] of Object.entries(CURRICULA)) {
  const courses = q(`SELECT c.*, cc.title FROM course c JOIN course_curriculum cc ON cc.course = c.id
    WHERE cc.curriculum = ? ORDER BY c.subject_name, c.grade_min, c.id`, cur);
  const bySubj = {};
  for (const c of courses) (bySubj[c.subject_name] ||= []).push(c);
  index.push(`## ${curName}`, "", "| Subject | Courses | Grades | Lessons | Exercises | View |", "|---|---|---|---|---|---|");
  for (const [subj, cs] of Object.entries(bySubj).sort((a, b) => a[0].localeCompare(b[0]))) {
    const slug = subj.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const fname = `${cur}-${slug}.md`;
    const gs = [...new Set(cs.flatMap((c) => JSON.parse(c.grades)))].sort((a, b) => a - b);
    const L = cs.reduce((a, c) => a + c.lessons, 0), E = cs.reduce((a, c) => a + c.exercises, 0);
    index.push(`| ${subj} | ${cs.length} | ${gs.map((g) => (g === 99 ? "ungraded" : g === 0 ? "R" : g)).join(", ")} | ${L} | ${E} | [${fname}](${fname}) |`);

    const out = [`# ${curName} · ${subj}`, "", "Generated by `catalogue/build.mjs`. Do not edit by hand.", ""];
    for (const c of cs.sort((a, b) => gradeKey(a) - gradeKey(b) || a.id.localeCompare(b.id))) {
      const gl = JSON.parse(c.grades).map((g) => gradeLabel(g, cur)).join(", ");
      out.push(`## ${c.title} (${gl})`, "",
        `Course \`${c.id}\` · ${c.lessons} lessons · ${c.exercises} exercises${c.outdated ? " · **marked outdated by Anton**" : ""} · raw: \`${c.raw_path}\``, "");
      for (const t of q("SELECT * FROM topic WHERE course = ? ORDER BY position", c.id)) {
        const ls = q("SELECT title, exercises FROM lesson WHERE topic = ? ORDER BY position", t.id);
        out.push(`- **${t.title.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim()}** (${ls.length}): ` +
          ls.map((l) => `${l.title.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim()} [${l.exercises}]`).join("; "));
      }
      out.push("");
    }
    writeFileSync(join(VIEWS, fname), out.join("\n"));
  }
  index.push("");
}
// Trainer view: every Anton trainer type seen in captured exercise files.
{
  const rows = q(`SELECT et.trainer, COUNT(DISTINCT et.exercise) exercises, SUM(et.items) items, COUNT(DISTINCT e.course) courses
    FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise GROUP BY et.trainer ORDER BY exercises DESC, et.trainer`);
  const capturedN = q("SELECT COUNT(*) n FROM exercise WHERE captured = 1")[0].n;
  const out = ["# Anton trainer types", "", "Generated by `catalogue/build.mjs`. Do not edit by hand.", "",
    `From ${capturedN} captured exercise files. An exercise can use more than one trainer, so the exercise counts add up to more than the files.`, "",
    "| Trainer | Exercises | Items | Courses | Subjects | Example exercise titles |", "|---|---|---|---|---|---|"];
  for (const r of rows) {
    const subj = q(`SELECT c.subject_name s, COUNT(DISTINCT et.exercise) n FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise
      JOIN course c ON c.id = e.course WHERE et.trainer = ? GROUP BY s ORDER BY n DESC LIMIT 4`, r.trainer).map((x) => `${x.s} ${x.n}`).join(", ");
    const ex = q(`SELECT DISTINCT e.title t FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise WHERE et.trainer = ? LIMIT 4`, r.trainer)
      .map((x) => String(x.t).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\|/g, "/").trim()).join("; ");
    out.push(`| \`${r.trainer}\` | ${r.exercises} | ${r.items} | ${r.courses} | ${subj} | ${ex} |`);
  }
  writeFileSync(join(VIEWS, "anton-trainers.md"), out.join("\n") + "\n");
}

const cap = q("SELECT COUNT(*) n, SUM(captured) c FROM exercise")[0];
const tr = q("SELECT COUNT(DISTINCT trainer) n FROM exercise_trainer")[0];
index.push("## Capture", "", `${cap.c} of ${cap.n} exercise files captured. ${tr.n} distinct trainer types seen in captured files: [anton-trainers.md](anton-trainers.md).`, "");
writeFileSync(join(VIEWS, "README.md"), index.join("\n"));

const t = q("SELECT (SELECT COUNT(*) FROM course) courses, (SELECT COUNT(*) FROM lesson) lessons, (SELECT COUNT(*) FROM exercise) exercises")[0];
console.log(`catalogue.db: ${t.courses} courses, ${t.lessons} lessons, ${t.exercises} exercises; ${cap.c} exercise files captured, ${tr.n} trainer types`);
