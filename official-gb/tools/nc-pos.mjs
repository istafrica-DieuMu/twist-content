// Extracts statutory content from the National Curriculum in England
// (programmes of study) and the EYFS early learning goals into Twist
// framework files.
//   node official-gb/tools/nc-pos.mjs <maths|english|languages|eyfs>   (from the rnd root)
// Reads official-gb/<issuer>/text/<file>.txt (pdftotext -layout), writes
// twist/frameworks/gb/<id>.yaml. Generated: rerun the script, never edit the YAML.
// Crown copyright, reused under the Open Government Licence.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const DOCS = {
  maths: {
    id: "nc-maths-2014", domain: "math",
    text: "official-gb/dfe/text/PRIMARY_national_curriculum_-_Mathematics_220714.txt",
    title: "National curriculum in England: mathematics programmes of study, key stages 1 and 2",
    url: "https://assets.publishing.service.gov.uk/media/5a7da548ed915d2ac884cb07/PRIMARY_national_curriculum_-_Mathematics_220714.pdf",
    start: /^Year 1 programme of study$/, end: null,
    // pdftotext flattens stacked fractions (⅓ becomes "31") and superscripts.
    // These restore the printed notation; fixed objectives carry fixed: true.
    fixes: [
      ["fractions 31 , 41 , 24 and 34 of", "fractions 1/3, 1/4, 2/4 and 3/4 of"],
      ["for example, 21 of 6 = 3 and recognise the equivalence of 24 and 21", "for example, 1/2 of 6 = 3 and recognise the equivalence of 2/4 and 1/2"],
      ["[for example, + 71 = 76 ]", "[for example, 5/7 + 1/7 = 6/7]"],
      ["decimal equivalents to 41 , 21 , 34", "decimal equivalents to 1/4, 1/2, 3/4"],
      ["[for example, 0.71 = 100 ]", "[for example, 0.71 = 71/100]"],
      ["equivalents of 21 , 41 , 1 2 4 , , and", "equivalents of 1/2, 1/4, 1/5, 2/5, 4/5 and"],
      ["and 21 a turn (total 180o)", "and 1/2 a turn (total 180°)"],
      ["(total 360o)", "(total 360°)"], ["multiples of 90o", "multiples of 90°"], ["in degrees (o)", "in degrees (°)"],
      ["squared (2) and cubed (3)", "squared (²) and cubed (³)"],
      ["41 × 21 = 81", "1/4 × 1/2 = 1/8"], ["31 ÷ 2 = 61", "1/3 ÷ 2 = 1/6"], ["simple fraction [for example, 38 ]", "simple fraction [for example, 3/8]"],
      ["(cm2)", "(cm²)"], ["(m2)", "(m²)"], ["(cm3)", "(cm³)"], ["(m3)", "(m³)"],
    ],
  },
  english: {
    id: "nc-english-2014", domain: "lit-en",
    text: "official-gb/dfe/text/PRIMARY_national_curriculum_-_English_220714.txt",
    title: "National curriculum in England: English programmes of study, key stages 1 and 2",
    url: "https://assets.publishing.service.gov.uk/media/5a7de93840f0b62305b7f8ee/PRIMARY_national_curriculum_-_English_220714.pdf",
    start: /^Spoken language – years 1 to 6$/, end: /^English Appendix 1: Spelling$/,
  },
  languages: {
    id: "nc-languages-2014", domain: "fl",
    text: "official-gb/dfe/text/PRIMARY_national_curriculum_-_Languages.txt",
    title: "National curriculum in England: languages programmes of study, key stage 2",
    url: "https://assets.publishing.service.gov.uk/media/5a7b9246e5274a7318b8f889/PRIMARY_national_curriculum_-_Languages.pdf",
    start: /^Key stage 2: Foreign language$/, end: /^The starred/,
  },
  eyfs: {
    id: "eyfs-2026", domain: null, mode: "eyfs",
    text: "official-gb/eyfs/text/EYFS_group_and_school_based_from_September_2026.txt",
    title: "Early years foundation stage statutory framework for group and school-based providers (from 1 September 2026)",
    url: "https://assets.publishing.service.gov.uk/media/6a5f8e4fb00f3323bf1a23a1/EYFS_group_and_school_based_from_September_2026.pdf",
    start: /^Communication and Language$/, startNext: /^ELG:/, end: /^Understanding the World$/,
  },
};
const doc = DOCS[process.argv[2]];
if (!doc) { console.error(`usage: nc-pos.mjs <${Object.keys(DOCS).join("|")}>`); process.exit(1); }

const L = readFileSync(join(ROOT, doc.text), "utf8").split("\n");
const isPageNo = (l) => /^\s*\d{1,3}\s*$/.test(l);
const isRunningHead = (l) => /^\s*(Mathematics|English|Languages) – key stages? [12]( and 2)?\s*$/.test(l);
// Page numbers close their page.
const pageOf = []; { let next = null; for (let i = L.length - 1; i >= 0; i--) { if (isPageNo(L[i])) next = Number(L[i].trim()); pageOf[i] = next; } }
const BULLET = /^(\s*)[•]\s+(.*)$/;
const slug = (s) => s.toLowerCase().replace(/[–—-]/g, " ").replace(/[^a-z0-9 ]+/g, "").trim().replace(/\s+/g, "-");
const tidy = (parts) => parts.join("\n").replace(/(\p{L})-\n(\p{Ll})/gu, "$1$2").replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim().replace(/[;,.]$/, "");

// Skip contents pages: the start heading must be followed by real content within a few lines.
const startAt = L.findIndex((l, i) => doc.start.test(l.trim()) && L.slice(i + 1, i + 4).some((x) => doc.startNext ? doc.startNext.test(x.trim()) : true));
let endAt = doc.end ? L.findIndex((l, i) => i > startAt && doc.end.test(l.trim())) : L.length;
if (endAt < 0) endAt = L.length;

const objectives = [];
const counters = {};
let stage = null, band = null, strand = null, sub = null, inList = false, cur = null, lead = null, leadIndent = null;
const push = () => {
  if (!cur) return;
  const k = `${stage}.${slug(strand)}${sub ? "." + slug(sub) : ""}`;
  counters[k] = (counters[k] ?? 0) + 1;
  let text = tidy(cur.parts), fixed = false;
  for (const [from, to] of doc.fixes ?? []) if (text.includes(from)) { text = text.replace(from, to); fixed = true; }
  objectives.push({ code: `${doc.id}.${k}.${counters[k]}`, area: strand, group: sub, band, page: cur.page, text, fixed, lead: cur.lead ? tidy(cur.lead) : null });
  cur = null;
};
const prevContent = (i) => { let j = i - 1; while (j > startAt && (!L[j].trim() || isPageNo(L[j]) || isRunningHead(L[j]))) j--; return L[j]; };

for (let i = startAt; i < endAt; i++) {
  const raw = L[i], t = raw.trim();
  if (!t || isPageNo(raw) || isRunningHead(raw)) continue;
  let m;
  if (doc.mode === "eyfs") {
    if (/^(Communication and Language|Literacy|Mathematics|Personal, Social and Emotional Development|Physical Development)$/.test(t)) { push(); band = t; inList = false; continue; }
    if ((m = t.match(/^ELG: (.+)$/))) { push(); strand = m[1]; stage = "elg"; sub = null; inList = false; continue; }
    if (/^Children at the expected level/.test(t)) { inList = true; continue; }
  } else {
    if ((m = t.match(/^Years? (\d)( and (\d))? programme of study$/))) { push(); stage = m[3] ? `y${m[1]}${m[3]}` : `y${m[1]}`; band = m[3] ? `end-year-${m[3]}` : `end-year-${m[1]}`; inList = false; continue; }
    if (/^Spoken language – years 1 to 6$/.test(t)) { push(); stage = "y1to6"; band = "end-year-6"; strand = "Spoken language"; inList = false; continue; }
    if (/^Key stage 2: Foreign language$/.test(t)) { push(); stage = "ks2"; band = "end-year-6"; strand = "Foreign language"; inList = false; continue; }
    if (/^Statutory requirements$/.test(t)) {
      push();
      // A new strand heading sits right above; on a continuation page the line above is a bullet.
      const above = prevContent(i);
      if (above && !/^\s/.test(above) && !BULLET.test(above) && !/[.:,]$/.test(above.trim()) && above.trim().length < 70 && !/^Notes and guidance/.test(above.trim())) { strand = above.trim(); sub = null; }
      inList = true; continue;
    }
    if (/^Notes and guidance/.test(t)) { push(); inList = false; continue; }
    if (/^Pupils should be taught to:?$/.test(t)) { inList = true; continue; }
    if (inList && !BULLET.test(raw) && !/^\s/.test(raw) && t.length < 60 && !/[.,;]$/.test(t)) { push(); sub = t.replace(/ \(see English Appendix \d\)$/, ""); continue; }
  }
  if (!inList) continue;
  if ((m = raw.match(BULLET))) {
    const indent = m[1].length;
    push();
    // A deeper bullet is a sub-point of the last lead bullet (ends with ":" or "by:").
    if (lead && indent > leadIndent) { cur = { parts: [m[2]], page: pageOf[i], lead: lead.parts }; continue; }
    lead = null;
    cur = { parts: [m[2]], page: pageOf[i] };
    if (/:$/.test(m[2].trim()) || /:\s*$/.test(L[i + 1]?.trim() === "" ? m[2] : m[2])) { lead = { parts: [m[2]] }; leadIndent = indent; cur = null; }
    continue;
  }
  if (cur && /^\s/.test(raw)) {
    cur.parts.push(t);
    // A top-level bullet whose colon lands on a continuation line is a lead too.
    if (cur.lead === undefined && /:$/.test(t)) { lead = { parts: cur.parts }; leadIndent = L[i - cur.parts.length + 1].match(BULLET)?.[1].length ?? 0; cur = null; }
    continue;
  }
  if (lead && !cur && /^\s/.test(raw)) { lead.parts.push(t); continue; }
}
push();

const q = (s) => JSON.stringify(s);
let out = `# Generated by official-gb/tools/nc-pos.mjs from the captured document.
# Do not edit. Texts are verbatim; codes are ours. "lead" is the stem a
# sub-point completes ("Pupils should be taught to: spell: ...").
# Crown copyright, Open Government Licence v3.0.
framework: ${doc.id}
title: ${q(doc.title)}
url: ${q(doc.url)}
country: GB-ENG
${doc.domain ? `domain: ${doc.domain}\n` : ""}objectives:
`;
for (const o of objectives) {
  out += `  - code: ${o.code}\n    kind: content\n    area: ${q(o.area)}\n`;
  if (o.group) out += `    group: ${q(o.group)}\n`;
  out += `    band: ${doc.mode === "eyfs" ? "end-reception" : o.band}\n`;
  if (doc.mode === "eyfs") out += `    eyfs_area: ${q(o.band)}\n`;
  if (o.lead) out += `    lead: ${q(o.lead)}\n`;
  out += `    page: ${o.page}\n    text: ${q(o.text)}\n`;
  if (o.fixed) out += `    fixed: true\n`;
}
writeFileSync(join(ROOT, `twist/frameworks/gb/${doc.id}.yaml`), out);
const by = {}; for (const o of objectives) { const k = `${o.code.split(".")[1]} ${o.area}`; by[k] = (by[k] ?? 0) + 1; }
console.log(`twist/frameworks/gb/${doc.id}.yaml: ${objectives.length} objectives`); console.table(by);
