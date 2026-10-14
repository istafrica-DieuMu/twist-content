// Generates anton/notes/subjects.md and anton/notes/topic-maps.md from the catalogue.
// Rerun after more files are captured: node anton/tools/notes-1e.mjs (from the rnd root).
import { DatabaseSync } from "node:sqlite";
import { writeFileSync } from "node:fs";
const db = new DatabaseSync("catalogue/catalogue.db", { readOnly: true });
const q = (s, ...a) => db.prepare(s).all(...a);
const CUR = { en_gb: "English-GB", de: "German-DE" };
const gl = (g, c) => (g === 0 ? "R" : g === 99 ? "ungraded" : String(g));
const today = new Date().toISOString().slice(0, 10);

const s = [`# Subjects and grades`, "", `Generated ${today} by \`tools/notes-1e.mjs\` from \`catalogue/catalogue.db\`. Source: all 121 course files (step 1b), so every number here is complete, not sampled.`, ""];
for (const [cur, name] of Object.entries(CUR)) {
  const rows = q(`SELECT c.subject_name sn, COUNT(*) courses, SUM(c.lessons) l, SUM(c.exercises) e, SUM(c.outdated) o,
      GROUP_CONCAT(c.grades, '|') g FROM course c JOIN course_curriculum cc ON cc.course = c.id AND cc.curriculum = ?
      GROUP BY sn ORDER BY l DESC`, cur);
  const tl = rows.reduce((a, r) => a + r.l, 0), te = rows.reduce((a, r) => a + r.e, 0);
  s.push(`## ${name}`, "", `${rows.length} subjects, ${rows.reduce((a, r) => a + r.courses, 0)} courses, ${tl.toLocaleString("en")} lessons, ${te.toLocaleString("en")} exercises.`, "",
    "| Subject | Courses | Grades | Lessons | Exercises | Outdated courses |", "|---|---|---|---|---|---|");
  for (const r of rows) {
    const gs = [...new Set(r.g.split("|").flatMap((x) => JSON.parse(x)))].sort((a, b) => a - b).map((g) => gl(g, cur)).join(", ");
    s.push(`| ${r.sn} | ${r.courses} | ${gs} | ${r.l} | ${r.e} | ${r.o || ""} |`);
  }
  s.push("");
}
s.push("Courses shared by both curricula (the `c-mono-*` language courses) count in both tables.", "", "Per-course detail: `catalogue/views/README.md`.", "");
writeFileSync("anton/notes/subjects.md", s.join("\n"));

const t = [`# Topic maps`, "", `Generated ${today} by \`tools/notes-1e.mjs\`. The full trees (every topic and lesson with its exercise count) are the catalogue views, one file per curriculum and subject: \`catalogue/views/\`. This note summarises them.`, ""];
for (const [cur, name] of Object.entries(CUR)) {
  t.push(`## ${name}`, "", "| Course | Grades | Topics | Lessons | Exercises | Exercises per lesson | View |", "|---|---|---|---|---|---|---|");
  for (const c of q(`SELECT c.id, cc.title, c.subject, c.subject_name sn, c.grades, c.lessons l, c.exercises e, c.outdated o,
      (SELECT COUNT(*) FROM topic t WHERE t.course = c.id) topics FROM course c JOIN course_curriculum cc ON cc.course = c.id AND cc.curriculum = ?
      WHERE c.subject IN ('nateng','natdeu','mat','eng','deu') ORDER BY c.subject, c.grade_min, c.id`, cur)) {
    const slug = c.sn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    t.push(`| ${c.title.replace(/<[^>]+>/g, "")} (${c.sn})${c.o ? " · outdated" : ""} | ${JSON.parse(c.grades).map((g) => gl(g, cur)).join(", ")} | ${c.topics} | ${c.l} | ${c.e} | ${c.l ? (c.e / c.l).toFixed(1) : "–"} | [${cur}-${slug}.md](../../catalogue/views/${cur}-${slug}.md) |`);
  }
  t.push("");
}
t.push("Only the language and maths subjects are listed here, as the ones closest to Twist; every other subject is in the catalogue views.", "");
writeFileSync("anton/notes/topic-maps.md", t.join("\n"));
console.log("wrote subjects.md, topic-maps.md");
