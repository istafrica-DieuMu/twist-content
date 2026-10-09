// Picks one target exercise per shared type in taxonomy.md for the 1d browser pass.
// Prefers English, Deutsch and Maths courses in grades 1 to 6, and exercises where the trainer comes first.
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
const db = new DatabaseSync("catalogue/catalogue.db", { readOnly: true });
const P = Object.fromEntries(JSON.parse(readFileSync("anton/api/list/plans.json", "utf8")).plans.map((p) => [p.project, p]));
const T = {
  "fill-gap": ["gapMulti", "gap", "lsg", "table"], "choose-one": ["buttons", "multipleChoice", "imageButtons"], teach: ["contentPlayer", "content"],
  "match-pairs": ["dragMatch", "listMatchVertical"], "build-word": ["wordBuilder", "dragSpell"], memory: ["memory"], "sort-into-groups": ["dragGroup"],
  "choose-all": ["findAll"], "find-on-picture": ["findOnImage"], "choose-by-sound": ["soundButtons"], "find-in-text": ["findWordsInText"],
  segment: ["wordSlice", "sentenceSlice"], "read-and-answer": ["multipleChoiceText"], "label-picture": ["dragAndValidate", "dragPunc"],
  "written-maths": ["mathGrid"], "put-in-order": ["dragSort"], "trace-path": ["followPath"], "colour-in": ["kidColorize"], timed: ["flashRead"],
  "odd-one-out": ["kickItem"], geometry: ["shapes", "shapeMirror"], count: ["kidCount", "mathFillStripe"], "set-clock": ["digitalClock"],
};
const q = db.prepare(`SELECT e.course, c.grade_min g, t.title topic, l.title lesson, e.position pos, e.title ex, et.trainer
  FROM exercise_trainer et JOIN exercise e ON e.id = et.exercise JOIN lesson l ON l.id = e.lesson JOIN topic t ON t.id = l.topic
  JOIN course c ON c.id = e.course JOIN course_curriculum cc ON cc.course = c.id AND cc.curriculum = ? WHERE et.trainer = ? AND et.position = 1 AND c.outdated = 0
  ORDER BY (c.subject IN ('nateng', 'natdeu', 'mat')) DESC, (c.grade_min BETWEEN 1 AND 6) DESC, c.grade_min LIMIT 1`);
const CUR = process.argv[2] || "de";
const clean = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
for (const [type, trs] of Object.entries(T)) {
  let r = null;
  for (const t of trs) if ((r = q.get(CUR, t))) break;
  if (!r) { console.log(`${type} | none`); continue; }
  const p = P[r.course];
  console.log([type, r.trainer, r.course, (p.guiLanguages || []).filter((l) => l === "en_gb" || l === "de").join("+"), p.pageUrl, clean(r.topic), clean(r.lesson), `#${r.pos} ${clean(r.ex)}`].join(" | "));
}
