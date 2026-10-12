// Difficulty calibration from the Anton full text (Phase 3, item 5).
//   node anton/tools/calibrate.mjs   (from the rnd root) -> writes calibration.md
// Per curriculum, subject and grade: items per exercise; for maths the largest
// number in each exercise; for language subjects word length and sentence length
// of item text. Text is every string under trainers[].atoms except keys that hold
// paths, sounds, colours or ids, with markup removed.
import { DatabaseSync } from "node:sqlite";
import { readFileSync, writeFileSync } from "node:fs";
const db = new DatabaseSync("catalogue/catalogue.db", { readOnly: true });
const SKIP = new Set(["lsg", "sound", "voice", "path", "image", "id", "color", "colors", "class", "svg", "backgroundLsg", "voiceLang", "elementCategory", "groupId", "width", "x1", "x2", "y1", "y2", "correctIconType", "speaker"]);
const clean = (s) => s.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim();
function strings(v, out, key = "") {
  if (SKIP.has(key)) return;
  if (typeof v === "string") { if (!/[\\/]|\.lsg|\.svg|^#|^rgba?\(/.test(v)) { const c = clean(v); if (c) out.push(c); } }
  else if (typeof v === "number") out.push(String(v));
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out, key));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) strings(x, out, k);
}
const q = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); const at = (p) => s[Math.min(s.length - 1, Math.floor(p * (s.length - 1)))]; return { n: s.length, p10: at(0.1), med: at(0.5), p90: at(0.9) }; };
const rows = db.prepare(`SELECT e.file_id f, c.subject s, c.grade_min g, c.grade_max gx, cc.curriculum cur FROM exercise e
  JOIN course c ON c.id = e.course JOIN course_curriculum cc ON cc.course = c.id
  WHERE c.outdated = 0 AND c.subject IN ('mat', 'nateng', 'natdeu', 'eng', 'deu') AND c.grade_min = c.grade_max`).all()
  .concat(db.prepare(`SELECT e.file_id f, c.subject s, 99 g, 99 gx, cc.curriculum cur FROM exercise e JOIN course c ON c.id = e.course
  JOIN course_curriculum cc ON cc.course = c.id WHERE c.outdated = 0 AND c.subject = 'deu'`).all());
const acc = {};
for (const r of rows) {
  let lv; try { lv = JSON.parse(readFileSync(`anton/api/${r.f}.json`, "utf8")); } catch { continue; }
  const key = `${r.cur}|${r.s}|${r.g}`;
  const a = (acc[key] ||= { items: [], maxNum: [], wordLen: [], sentLen: [] });
  let items = 0; const txt = [];
  for (const t of lv.trainers || []) { const at = Array.isArray(t.atoms) ? t.atoms : t.atoms ? [t.atoms] : []; items += at.length; strings(at, txt); }
  a.items.push(items);
  if (r.s === "mat") {
    // English: "9,934" groups thousands and "3.5" is a decimal; German: "1.200" groups and "3,5" is a decimal.
    const raw = txt.join(" ").match(/\d{1,3}(?:[.,]\d{3})+(?![\d])|\d+(?:[.,]\d+)?/g) || [];
    const val = (n) => {
      if (/^\d{1,3}([.,]\d{3})+$/.test(n)) {
        const sep = n.match(/[.,]/)[0];
        if ((r.cur === "de" && sep === ".") || (r.cur !== "de" && sep === ",")) return parseFloat(n.split(sep).join(""));
      }
      return parseFloat(r.cur === "de" ? n.replace(",", ".") : n.replace(/,/g, ""));
    };
    const vals = raw.map(val).filter((n) => Number.isFinite(n) && n < 1e9);
    if (vals.length) a.maxNum.push(Math.max(...vals));
  } else {
    for (const s of txt) {
      const words = s.match(/[A-Za-zÄÖÜäöüß]+/g) || [];
      for (const w of words) a.wordLen.push(w.length);
      if (/[.!?]$/.test(s) && words.length >= 3) a.sentLen.push(words.length);
    }
  }
}
const SUBJ = { mat: "Maths", nateng: "English", natdeu: "Deutsch", eng: "English as a foreign or additional language", deu: "DaZ" };
const gname = (cur, g) => (g === 99 ? "ungraded" : g === 0 ? "R" : cur === "de" ? `K${g}` : `Y${g}`);
const out = ["# Difficulty calibration", "", "Phase 3 item 5, generated 2026-10-09 by `anton/tools/calibrate.mjs` from all captured Anton exercise files (single-grade, non-outdated courses; DaZ is ungraded).", "",
  "Text is every string inside an exercise's items except paths, sounds, colours and ids, with markup removed. Numbers are p10 / median / p90 across exercises (maths) or across words and sentences (language).", ""];
for (const cur of ["en_gb", "de"]) for (const s of ["mat", "nateng", "natdeu", "eng", "deu"]) {
  const ks = Object.keys(acc).filter((k) => k.startsWith(`${cur}|${s}|`)).sort((a, b) => +a.split("|")[2] - +b.split("|")[2]);
  if (!ks.length) continue;
  out.push(`## ${cur === "de" ? "German-DE" : "English-GB"} · ${SUBJ[s]}`, "");
  if (s === "mat") {
    out.push("| Grade | Exercises | Items per exercise (med) | Largest number per exercise: p10 / median / p90 | Exercises over 100 | Over 1,000 |", "|---|---|---|---|---|---|");
    for (const k of ks) { const a = acc[k], it = q(a.items), m = q(a.maxNum); const pc = (t) => a.maxNum.length ? Math.round(100 * a.maxNum.filter((x) => x > t).length / a.maxNum.length) + "%" : "n/a";
      out.push(`| ${gname(cur, +k.split("|")[2])} | ${it.n} | ${it.med} | ${m ? `${m.p10} / ${m.med} / ${m.p90}` : "n/a"} | ${pc(100)} | ${pc(1000)} |`); }
  } else {
    out.push("| Grade | Exercises | Items per exercise (med) | Word length p10 / med / p90 | Sentence length (words) p10 / med / p90 | Sentences |", "|---|---|---|---|---|---|");
    for (const k of ks) { const a = acc[k], it = q(a.items), w = q(a.wordLen), sl = q(a.sentLen); out.push(`| ${gname(cur, +k.split("|")[2])} | ${it.n} | ${it.med} | ${w ? `${w.p10} / ${w.med} / ${w.p90}` : "n/a"} | ${sl ? `${sl.p10} / ${sl.med} / ${sl.p90}` : "n/a"} | ${sl ? sl.n : 0} |`); }
  }
  out.push("");
}
out.push("## Reading", "",
  "- **Maths number range steps up at Year 3 / Klasse 3.** Exercises with numbers over 100: Year 2 9%, Year 3 30%; Klasse 2 2%, Klasse 3 56%. At the same age (Klasse 3 = Year 4, ages 8-9) German maths has twice the share above 100 (56% against 27%). Numbers over 1,000 reach 13% in Klasse 4 and in Year 5, which are the same age.",
  "- **Twist alignment:** Twist G1 = Year 2 / Klasse 1, G2 = Year 3 / Klasse 2, G3 = Year 4 / Klasse 3, G4 = Year 5 / Klasse 4 (anatomy.md). Read each Twist grade against those rows.",
  "- **Sentences lengthen slowly and steadily.** Median words per sentence in item text: English Year 1 7 to Year 6 10; Deutsch Klasse 1 6 to Klasse 8 10; Englisch as a foreign language Klasse 3 5 to Klasse 10 11.",
  "- **Word length barely moves** (median 4 letters throughout; the p90 rises from 7 to 10 in Deutsch). Not a useful difficulty signal on its own.",
  "- **Exercises get longer with age in the language subjects:** median items per exercise Deutsch Klasse 1 6 to Klasse 6 18; Englisch Klasse 3 8 to Klasse 10 21.",
  "- **Limits:** numbers include any digit in the item text (instructions, years, labels), so medians mix computation with context; the p90 and the over-100 / over-1,000 shares are the steadier measures. Sentence counts cover strings ending in . ! or ? with at least 3 words.", "");
writeFileSync("calibration.md", out.join("\n"));
console.log(out.join("\n"));
