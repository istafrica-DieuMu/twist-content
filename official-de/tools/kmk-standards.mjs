// Extracts the competency statements from a KMK Bildungsstandards text
// (pdftotext -layout output) into a Twist framework file.
//   node official-de/tools/kmk-standards.mjs mathe   (from the rnd root)
// Reads official-de/kmk/text/<file>.txt, writes twist/frameworks/de/<id>.yaml.
// The output is generated: rerun this script, never edit the YAML by hand.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const DOCS = {
  mathe: {
    id: "kmk-mathe-2022",
    text: "official-de/kmk/text/2022_06_23-Bista-Primarbereich-Mathe.txt",
    title: "Bildungsstandards im Fach Mathematik für den Primarbereich (Beschluss der KMK vom 23.06.2022)",
    url: "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2022/2022_06_23-Bista-Primarbereich-Mathe.pdf",
    domain: "math",
    // Top-level areas in document order: heading line -> code.
    areas: [
      ["Mathematisch argumentieren", "pk-argumentieren", "process"],
      ["Mathematisch kommunizieren", "pk-kommunizieren", "process"],
      ["Probleme mathematisch lösen", "pk-probleme", "process"],
      ["Mathematisch modellieren", "pk-modellieren", "process"],
      ["Mathematisch darstellen", "pk-darstellen", "process"],
      ["Mit mathematischen Objekten und Werkzeugen arbeiten", "pk-werkzeuge", "process"],
      ["Leitidee Zahl und Operation", "zo", "content"],
      ["Leitidee Größen und Messen", "gm", "content"],
      ["Leitidee Muster, Strukturen und funktionaler Zusammenhang", "msf", "content"],
      ["Leitidee Raum und Form", "rf", "content"],
      ["Leitidee Daten und Zufall", "dz", "content"],
    ],
    start: "Mathematisch argumentieren",
    // Spots where the PDF layout breaks a statement; replaced after joining.
    fixes: [["(z. B. m, Dreiviertelstunde, l)", "(z. B. ½ m, Dreiviertelstunde, ¼ l)"]],
  },
};

DOCS.deutsch = {
  id: "kmk-deutsch-2022",
  text: "official-de/kmk/text/2022_06_23-Bista-Primarbereich-Deutsch.txt",
  title: "Bildungsstandards im Fach Deutsch für den Primarbereich (Beschluss der KMK vom 23.06.2022)",
  url: "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2022/2022_06_23-Bista-Primarbereich-Deutsch.pdf",
  domain: "lit-de",
  // Deutsch has five Kompetenzbereiche and no separate process list; each
  // bullet list sits under a heading, and some bullets carry "o" sub-points.
  mode: "headed",
  areas: [
    ["4.1 Sprechen und Zuhören", "sz", "content"],
    ["4.2 Schreiben", "sch", "content"],
    ["4.3 Lesen", "les", "content"],
    ["4.4 Sich mit Texten und anderen Medien auseinandersetzen", "tm", "content"],
    ["4.5 Sprache und Sprachgebrauch untersuchen", "sp", "content"],
  ],
  start: "4.1 Sprechen und Zuhören",
  end: "5. Anhang",
  fixes: [],
};

const key = process.argv[2];
const doc = DOCS[key];
if (!doc) { console.error(`usage: kmk-standards.mjs <${Object.keys(DOCS).join("|")}>`); process.exit(1); }

const lines = readFileSync(join(ROOT, doc.text), "utf8").split("\n");
// The footer "Seite N" closes page N, so a line belongs to the next footer's page.
const pageOf = [];
{
  let next = null;
  for (let i = lines.length - 1; i >= 0; i--) {
    const m = lines[i].match(/^\s+Seite (\d+)\s*$/);
    if (m) next = Number(m[1]);
    pageOf[i] = next ?? (pageOf[i + 1] ?? 0) + 0;
  }
  // Lines after the last footer sit on the page after it.
  let last = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s+Seite (\d+)\s*$/);
    if (m) last = Number(m[1]);
    else if (pageOf[i] === null || pageOf[i] === undefined || pageOf[i] < last) pageOf[i] = last + 1;
  }
}

const startAt = doc.mode === "headed"
  ? lines.findIndex((l) => l.trim() === doc.start)
  : lines.findIndex((l, i) => l.trim() === doc.start && i > lines.findIndex((x) => /Prozessbezogene Kompetenzen$/.test(x.trim())));
const endAt = doc.end ? lines.findIndex((l, i) => i > startAt && l.trim() === doc.end) : lines.length;
const objectives = [];
let area = null, group = null, cur = null;
const counters = {};
const isFooter = (l) => /^\s+Seite \d+\s*$/.test(l);
const flush = () => {
  if (!cur) return;
  let t = cur.parts.join("\n");
  t = t.replace(/(\p{L})-\n(\p{Ll})/gu, "$1$2").replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim().replace(/,$/, "");
  for (const [a, b] of doc.fixes) t = t.replace(a, b);
  objectives.push({ ...cur.meta, text: t });
  cur = null;
};

// In headed mode the group is the top line of the unindented block above the
// list starter ("Die Schülerinnen und Schüler"), skipping footers and blanks.
const headingAbove = (i) => {
  let j = i - 1;
  while (j > startAt && (!lines[j].trim() || isFooter(lines[j]))) j--;
  let top = j;
  while (j > startAt && lines[j].trim() && !/^\s/.test(lines[j]) && !isFooter(lines[j])) { top = j; j--; }
  return lines[top].trim();
};
for (let i = startAt; i < endAt; i++) {
  const raw = lines[i];
  if (isFooter(raw)) continue;
  const line = raw.trim();
  const a = doc.areas.find(([h]) => line === h);
  if (a) { flush(); area = a; group = null; continue; }
  if (!area) continue;
  if (line === "Die Schülerinnen und Schüler") {
    flush();
    // The group heading is the nearest non-empty line above (content areas only).
    let j = i - 1; while (j > 0 && !lines[j].trim()) j--;
    group = doc.mode === "headed" ? headingAbove(i) : area[2] === "content" ? lines[j].trim() : null;
    continue;
  }
  const bullet = line.match(/^•\s+(.*)$/);
  if (bullet) {
    flush();
    counters[area[1]] = (counters[area[1]] ?? 0) + 1;
    cur = { meta: { code: `${doc.id}.${area[1]}.${counters[area[1]]}`, area: area[0].replace(/^Leitidee /, ""), kind: area[2], group, page: pageOf[i] }, parts: [bullet[1]] };
    continue;
  }
  // Inside a bullet: skip blank lines and the digit rows of stacked fractions.
  if (cur && (!line || /^[\d\s]+$/.test(line))) continue;
  if (cur && /^\s{6,}\S/.test(raw)) { cur.parts.push(line.replace(/^o\s+/, "")); continue; }
  flush();
}
flush();

const q = (s) => JSON.stringify(s);
let out = `# Generated by official-de/tools/kmk-standards.mjs from the captured KMK text.
# Do not edit. Objective texts are verbatim; codes are ours.
framework: ${doc.id}
title: ${q(doc.title)}
url: ${q(doc.url)}
country: DE
domain: ${doc.domain}
band: end-klasse-4
objectives:
`;
for (const o of objectives) {
  out += `  - code: ${o.code}\n    kind: ${o.kind}\n    area: ${q(o.area)}\n`;
  if (o.group) out += `    group: ${q(o.group)}\n`;
  out += `    page: ${o.page}\n    text: ${q(o.text)}\n`;
}
writeFileSync(join(ROOT, `twist/frameworks/de/${doc.id}.yaml`), out);
const by = objectives.reduce((m, o) => ((m[o.area] = (m[o.area] ?? 0) + 1), m), {});
console.log(`twist/frameworks/de/${doc.id}.yaml: ${objectives.length} objectives`, by);
