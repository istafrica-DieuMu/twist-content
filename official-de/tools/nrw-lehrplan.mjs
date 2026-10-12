// Extracts the Kompetenzerwartungen from an NRW Lehrplan Primarstufe text
// (pdftotext -layout output) into a reference framework file in official-de/frameworks/.
//   node official-de/tools/nrw-lehrplan.mjs mathe   (from the rnd root)
// NRW prints two columns: end of the Schuleingangsphase (Klasse 2) on the
// left, end of Klasse 4 on the right. A statement spanning both columns is
// expected by the end of Klasse 2 and deepened in Klassen 3 and 4 (Lehrplan
// 2.3.2). The output is generated: rerun this script, never edit the YAML.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const DOCS = {
  mathe: {
    id: "nrw-mathe-2021",
    text: "official-de/nrw/text/ps_lp_m_einzeldatei_2021_08_02.txt",
    title: "Lehrplan für die Primarstufe in Nordrhein-Westfalen, Fach Mathematik (2021)",
    url: "https://lehrplannavigator.nrw.de/system/files/media/document/file/ps_lp_m_einzeldatei_2021_08_02.pdf",
    domain: "math",
    from: "2.3.1 Prozessbezogene Kompetenzerwartungen",
    to: /^\f?3\s+Leistungen fördern und bewerten$/,
    areas: {
      "2.3.1 Prozessbezogene Kompetenzerwartungen": ["Prozesse", "pk", "process"],
      "Zahlen und Operationen": ["Zahlen und Operationen", "zo", "content"],
      "Raum und Form": ["Raum und Form", "rf", "content"],
      "Größen und Messen": ["Größen und Messen", "gm", "content"],
      "Daten, Häufigkeiten, Wahrscheinlichkeiten": ["Daten, Häufigkeiten, Wahrscheinlichkeiten", "dhw", "content"],
    },
  },
};

const key = process.argv[2];
const doc = DOCS[key];
if (!doc) { console.error(`usage: nrw-lehrplan.mjs <${Object.keys(DOCS).join("|")}>`); process.exit(1); }

const all = readFileSync(join(ROOT, doc.text), "utf8").split("\n");
const start = all.findIndex((l) => l.trim() === doc.from);
let end = all.findIndex((l, i) => i > start && doc.to.test(l.trim()));
if (end < 0) end = all.length;

// Page numbers stand alone on a line, at the left (even) or right (odd) edge,
// and close the page they are printed on.
const isPageNo = (l) => /^\s*\d{2,3}\s*$/.test(l);
const pageOf = [];
{
  let next = null;
  for (let i = all.length - 1; i >= 0; i--) { if (isPageNo(all[i])) next = Number(all[i].trim()); pageOf[i] = next; }
}

const slug = (s) => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const BULLET = /^\s*\uF0B7\s*/;
const tidy = (parts) => parts.join("\n").replace(/(\p{L})-\n(\p{Ll})/gu, "$1$2").replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/,(?=\S)/g, ", ").trim().replace(/[,.]$/, "");

const objectives = [];
const counters = {};
let area = null, group = null, rightCol = null, single = false;
let open = { L: null, R: null, S: null };
let pairNo = 0;

const push = (item, band, extra = {}) => {
  const k = `${area[1]}.${slug(group)}`;
  counters[k] = (counters[k] ?? 0) + 1;
  objectives.push({ code: `${doc.id}.${k}.${counters[k]}`, kind: area[2], area: area[0], group, band, page: item.page, text: tidy(item.parts), ...extra, ...(item.pair ? { pair: item.pair } : {}) });
};
const closeAll = () => {
  // Order: left before right keeps pairs together in the file.
  if (open.S) push(open.S, "end-klasse-2", { spans: true });
  if (open.L) push(open.L, "end-klasse-2");
  if (open.R) push(open.R, "end-klasse-4");
  open = { L: null, R: null, S: null };
};
const close = (c) => {
  if (!open[c]) return;
  if (c === "S") push(open.S, "end-klasse-2", { spans: true });
  if (c === "L") push(open.L, "end-klasse-2");
  if (c === "R") push(open.R, single ? "end-klasse-4" : "end-klasse-4");
  open[c] = null;
};

// Split a row into left and right text at the first wide gap whose text
// starts at or beyond the right column.
const split = (line) => {
  if (rightCol == null) return { left: line, right: "" };
  const re = /\s{2,}/g; let m;
  while ((m = re.exec(line))) {
    const at = m.index + m[0].length;
    if (at >= rightCol - 8 && at < line.length) return { left: line.slice(0, m.index), right: line.slice(at) };
  }
  const first = line.search(/\S/);
  if (first >= rightCol - 8) return { left: "", right: line.slice(first) };
  return { left: line, right: "" };
};

for (let i = start; i < end; i++) {
  const raw = all[i];
  const t = raw.trim();
  if (!t || isPageNo(raw)) continue;
  if (doc.areas[t]) { closeAll(); area = doc.areas[t]; group = null; continue; }
  if (!area) continue;
  if (/^Kompetenzerwartungen am Ende/.test(t)) {
    closeAll();
    const idx = [...raw.matchAll(/Kompetenzerwartungen am Ende/g)].map((m) => m.index);
    single = idx.length === 1;
    rightCol = single ? null : idx[1];
    let j = i - 1; while (j > start && !all[j].trim()) j--;
    group = all[j].trim();
    continue;
  }
  if (/^der (Schuleingangsphase|Klasse 4)/.test(t) || /^Die Schülerinnen und Schüler/.test(t)) continue;
  if (!group) continue;
  // A group heading for the next block: a short line followed by the header.
  let k = i + 1; while (k < end && !all[k].trim()) k++;
  if (k < end && /^Kompetenzerwartungen am Ende/.test(all[k].trim())) { closeAll(); continue; }
  if (doc.areas[all[k]?.trim()]) { /* next line is an area heading */ }

  const page = pageOf[i];
  if (single) {
    if (BULLET.test(raw)) { close("R"); open.R = { parts: [raw.replace(BULLET, "")], page }; }
    else if (open.R) open.R.parts.push(t);
    continue;
  }
  const { left, right } = split(raw);
  const lb = BULLET.test(left), rb = BULLET.test(right);
  const leftText = left.replace(BULLET, "").trim(), rightText = right.replace(BULLET, "").trim();
  const spanning = !right && lb && left.trimEnd().length > rightCol + 2;
  if (spanning) { closeAll(); open.S = { parts: [leftText], page }; continue; }
  if (open.S && !lb && !rb) { open.S.parts.push(t); continue; }
  if (open.S && (lb || rb)) close("S");
  let pair = null;
  if (lb && rb) pair = `${doc.id}.p${++pairNo}`;
  if (lb) { close("L"); open.L = { parts: [leftText], page, pair }; }
  else if (leftText && open.L) open.L.parts.push(leftText);
  if (rb) { close("R"); open.R = { parts: [rightText], page, pair }; }
  else if (rightText && open.R) open.R.parts.push(rightText);
}
closeAll();

const q = (s) => JSON.stringify(s);
let out = `# Generated by official-de/tools/nrw-lehrplan.mjs from the captured NRW text.
# Do not edit. Objective texts are verbatim; codes are ours.
# band end-klasse-2: by the end of the Schuleingangsphase; spans: printed
# across both columns, so expected by Klasse 2 and deepened in Klassen 3, 4.
# pair: the Klasse 2 and Klasse 4 versions of the same expectation.
framework: ${doc.id}
title: ${q(doc.title)}
url: ${q(doc.url)}
country: DE
land: NW
domain: ${doc.domain}
standards:
`;
for (const o of objectives) {
  out += `  - code: ${o.code}\n    kind: ${o.kind}\n    area: ${q(o.area)}\n    group: ${q(o.group)}\n    band: ${o.band}\n`;
  if (o.spans) out += `    spans: true\n`;
  if (o.pair) out += `    pair: ${o.pair}\n`;
  out += `    page: ${o.page}\n    text: ${q(o.text)}\n`;
}
writeFileSync(join(ROOT, `official-de/frameworks/${doc.id}.yaml`), out);
const by = {};
for (const o of objectives) { const g = `${o.area} / ${o.band}${o.spans ? " (spans)" : ""}`; by[g] = (by[g] ?? 0) + 1; }
console.log(`official-de/frameworks/${doc.id}.yaml: ${objectives.length} objectives`);
console.table(by);
