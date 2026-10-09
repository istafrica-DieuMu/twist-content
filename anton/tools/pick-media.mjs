// Picks the 1g/1h media lessons and writes their media lists.
//   node anton/tools/pick-media.mjs   (from the rnd root)
// Lessons: 6 per curriculum across subjects and grades; where a lesson was played
// in 1d it is reused so the media matches the screenshots. Otherwise the middle
// lesson of the course is taken. Writes tools/lists/media/{1g-visual,1h-audio}.txt
// and tools/lists/media/lessons.json.
import { DatabaseSync } from "node:sqlite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
const db = new DatabaseSync("catalogue/catalogue.db", { readOnly: true });
const PICK = [
  ["de", "c-natdeu-1", "Einzahl und Mehrzahl", "Deutsch K1, played in 1d"],
  ["de", "c-mat-1", "Zahlen vergleichen", "Mathe K1, played in 1d"],
  ["de", "c-deu-a1", null, "DaZ Kurs A1"],
  ["de", "c-eng-3", null, "Englisch as a foreign language, K3"],
  ["de", "c-sci-1", null, "Sachunterricht K1-2"],
  ["de", "c-preschool-natdeu-de", null, "Vorschule letters"],
  ["en_gb", "c-nateng-1-gb", "Phonics - ay", "English Y1 phonics, probed in 1a"],
  ["en_gb", "c-mat-2-gb", null, "Maths Y2"],
  ["en_gb", "c-sci-3-gb", null, "Science Y3-4"],
  ["en_gb", "c-his-1-gb", null, "History KS1"],
  ["en_gb", "c-alpha-eng-gb", null, "EAL alphabet and phonics"],
  ["en_gb", "c-preschool-mat-gb", null, "Preschool maths"],
];
const lessons = [], visual = new Map(), audio = new Map(), skipped = { composed: 0 };
for (const [cur, course, title, why] of PICK) {
  const ls = db.prepare("SELECT id, title FROM lesson WHERE course = ? ORDER BY topic, position").all(course);
  const l = title ? ls.find((x) => x.title.startsWith(title)) : ls[Math.floor(ls.length / 2)];
  if (!l) { console.log("no lesson", course, title); continue; }
  const ex = db.prepare("SELECT file_id f FROM exercise WHERE lesson = ? ORDER BY position").all(l.id);
  const counts = { images: 0, lsgs: 0, svgs: 0, sounds: 0 };
  for (const { f } of ex) {
    const mf = JSON.parse(readFileSync(`anton/api/${f}.json`, "utf8")).mediaFiles || {};
    for (const [kind, list] of Object.entries(mf)) for (const m of list || []) {
      if (!m.etag) { skipped.composed++; continue; }   // multi-sounds are assembled in the app, no single file
      (kind === "sounds" ? audio : visual).set(m.fileId, m.etag);
      counts[kind] = (counts[kind] || 0) + 1;
    }
  }
  lessons.push({ curriculum: cur, course, lesson: l.title, lessonId: l.id, exercises: ex.length, why, media: counts });
}
const bytes = (m) => [...m.values()].reduce((a, e) => a + (+String(e).split("-")[1] || 0), 0);
mkdirSync("anton/tools/lists/media", { recursive: true });
writeFileSync("anton/tools/lists/media/1g-visual.txt", [...visual].map(([f, e]) => `${f}\t${e}`).join("\n") + "\n");
writeFileSync("anton/tools/lists/media/1h-audio.txt", [...audio].map(([f, e]) => `${f}\t${e}`).join("\n") + "\n");
writeFileSync("anton/tools/lists/media/lessons.json", JSON.stringify(lessons, null, 1));
for (const l of lessons) console.log(`${l.curriculum} ${l.course} | ${l.lesson} | ${l.exercises} ex | img ${l.media.images} lsg ${l.media.lsgs} svg ${l.media.svgs} snd ${l.media.sounds}`);
console.log(`visual files ${visual.size} (${(bytes(visual) / 1e6).toFixed(1)} MB), audio files ${audio.size} (${(bytes(audio) / 1e6).toFixed(1)} MB), composed sounds skipped ${skipped.composed}`);
