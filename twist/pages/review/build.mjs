// Teacher review: every de-DE lesson as a printable page, one PDF per year
// and subject plus one combined PDF. Reads the lesson records, draws each
// `show` with the player's drawn.js and prints with headless Chrome.
//   node twist/pages/review/build.mjs [curriculum]    (default de-DE)
// Output goes to pages/review/out/ (not in git).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import YAML from "yaml";

const HERE = dirname(fileURLToPath(import.meta.url));
const T = join(HERE, "../..");
const CUR = process.argv[2] ?? "de-DE";
const OUT = join(HERE, "out");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const read = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const txt = (v) => v == null ? "" : v === true ? "Ja (stimmt)" : v === false ? "Nein (stimmt nicht)" : typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? String(v) : Array.isArray(v) ? v.map(txt).join(", ") : Object.entries(v).map(([k, x]) => (["de", "en", "fr"].includes(k) ? "" : k + ": ") + txt(x)).join(" / ");

// Lesson sets in placement order
const cur = read(`curricula/${CUR}.yaml`);
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".yaml") ? [join(d, e.name)] : []);
const bySkill = new Map();
for (const f of walk(join(T, "lessons", CUR))) { const d = YAML.parse(readFileSync(f, "utf8")); bySkill.set(d.skill, d); }
const yearsRec = read(`years/${CUR}.yaml`);
const yearLabel = Object.fromEntries([...(yearsRec.grades ?? []), ...(yearsRec.learning_years ?? [])].map((y) => [y.id, y.label.de ?? y.label.en]));
const SUBJECT_ORDER = ["math", "lit-de", "lit-en", "fl"];
const volumes = [];
for (const [year, skills] of Object.entries(cur.placement)) {
  for (const dom of SUBJECT_ORDER) {
    const sets = skills.filter((s) => s.split(".")[0] === dom).map((s) => bySkill.get(s)).filter(Boolean);
    if (sets.length) volumes.push({ year, dom, subject: cur.subjects[dom], sets });
  }
}

// What drawn.js reads from the page (see its header)
const objects = Object.fromEntries((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, { de: o.labels.de, en: o.labels.en, initial: o.initial?.de, drawn: o.status === "drawn" }]));
const colours = read("assets/drawn.yaml").colours;
const pics = readdirSync(join(T, "assets/objects")).filter((f) => f.endsWith(".png"));
const drawnJs = readFileSync(join(T, "pages/player/drawn.js"), "utf8");
const tpl = readFileSync(join(T, "pages/player/template.html"), "utf8");
const playerCss = tpl.slice(tpl.indexOf("<style>") + 7, tpl.indexOf("</style>"));
const fontLink = tpl.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];

const TYPE = { multiple_choice: "Auswahl", image_multiple_choice: "Bildauswahl", audio_choice: "Hören und wählen", true_false: "Ja oder Nein", fill_in_blank: "Lücke füllen", text_input: "Eingabe", tap_to_count: "Antippen und zählen", drag_and_drop_count: "Plättchen schieben", point_on_line: "Zahlenstrahl", point_on_grid: "Gitter", clock_hands_drag: "Uhr stellen", highlight_in_text: "Markieren", tracing: "Nachspuren", speak: "Sprechen", matching: "Zuordnen", sorting: "Sortieren", ordering: "Ordnen" };
const ACT = { "warm-up": "Aufwärmen", learn: "Entdecken", practise: "Üben", check: "Zeig, was du kannst" };
const SUPPORT = { full: "Stufe 1: mit allen Hilfen", one: "Stufe 2: mit einer Hilfe", some: "Stufe 2: mit einer Hilfe", none: "Stufe 3: ohne Hilfe" };

const fig = (show, answer, small = false) => show == null ? "" : `<span class="fig${small ? " small" : ""}" data-show="${esc(JSON.stringify(show))}" data-answer="${esc(JSON.stringify(answer ?? []))}"></span>`;
const isRight = (o, answer) => {
  const ans = [].concat(answer ?? []).map(String);
  const keys = typeof o === "object" && o ? [o.text, o.id, o.value, o.count, o.count == null ? o.object : null].filter((x) => x != null).map(String) : [String(o)];
  return keys.some((k) => ans.includes(k));
};
const optionHtml = (o, t) => {
  const right = t.type !== "sorting" && isRight(o, t.answer);
  const body = typeof o === "object" && o ? (o.object || o.drawn ? fig(o.show ?? o, t.answer, true) : "") + esc(txt(o.text ?? (o.object || o.drawn ? "" : o))) + (o.bin ? ` <span class="rv-bin">→ ${esc(o.bin)}</span>` : "") : esc(String(o));
  return `<li class="${right ? "rv-right" : ""}">${body}${right ? ' <b class="rv-tick">✓</b>' : ""}</li>`;
};
function task(t, n) {
  const rows = [];
  rows.push(`<div class="rv-thead"><span class="rv-n">${n}</span><span class="rv-type">${esc(TYPE[t.type] ?? t.type)}</span>${t.part ? `<span class="rv-part">Teil: ${esc(t.part)}</span>` : ""}${t.difficulty ? `<span class="rv-part">${esc(t.difficulty)}</span>` : ""}<span class="rv-id">${esc(t.id)}</span></div>`);
  if (t.text) rows.push(`<div class="rv-q">${esc(txt(t.text))}</div>`);
  if (t.say) rows.push(`<div class="rv-say"><i>Gesprochen:</i> ${esc(txt(t.say))}</div>`);
  if (t.audio) rows.push(`<div class="rv-say"><i>Ton:</i> ${esc(txt(t.audio))}</div>`);
  if (t.frame) rows.push(`<div class="rv-frame"><i>Lückenform:</i> ${esc(txt(t.frame))}</div>`);
  if (t.show) rows.push(`<div class="rv-figrow">${fig(t.show, t.answer)}</div>`);
  if (t.pairs) rows.push(`<table class="rv-pairs">${t.pairs.map((p) => `<tr><td>${p.left?.object || p.left?.drawn ? fig(p.left, null, true) : ""}${esc(txt(p.left?.text ?? (p.left?.object ? "" : p.left)))}</td><td>↔</td><td>${p.right?.object || p.right?.drawn ? fig(p.right, null, true) : ""}${esc(txt(p.right?.text ?? (p.right?.object ? "" : p.right)))}</td></tr>`).join("")}</table>`);
  if (t.bins) rows.push(`<div class="rv-bins">Fächer: ${t.bins.map((b) => `<b>${esc(b.id)}</b> = ${esc(txt(b.show?.text ?? b.say ?? b.id))}`).join(" · ")}</div>`);
  if (t.options) rows.push(`<ul class="rv-opts">${t.options.map((o) => optionHtml(o, t)).join("")}</ul>`);
  const shownRight = t.options && t.type !== "sorting" && t.options.some((o) => isRight(o, t.answer));
  if (t.answer != null && !shownRight) rows.push(`<div class="rv-ans"><i>Lösung:</i> ${esc(txt(t.answer))}</div>`);
  if (t.expected_text) rows.push(`<div class="rv-ans"><i>Erwartet:</i> ${esc(txt(t.expected_text))}</div>`);
  if (t.spans) rows.push(`<div class="rv-ans"><i>Markieren:</i> ${esc(txt(t.spans))}</div>`);
  if (t.hints?.length) rows.push(`<ol class="rv-hints">${t.hints.map((h) => `<li>${esc(txt(h))}</li>`).join("")}</ol>`);
  if (t.feedback) rows.push(`<div class="rv-fb"><i>Rückmeldung bei falscher Wahl:</i> ${Object.entries(t.feedback).map(([k, v]) => `<b>${esc(k)}</b>: ${esc(txt(v))}`).join(" · ")}</div>`);
  return `<div class="rv-task">${rows.join("")}</div>`;
}
function activity(a) {
  const head = ACT[a.activity] ?? a.activity;
  const extra = a.activity === "check" && a.draw ? ` <span class="rv-note">(jedes Mal ${a.draw} zufällige Aufgaben aus diesen ${(a.tasks ?? []).length})</span>` : "";
  let body = "";
  let n = 0;
  if (a.screens) body += a.screens.map((s, i) => `<div class="rv-screen"><span class="rv-n">${i + 1}</span>${s.text ? `<div class="rv-q">${esc(txt(s.text))}</div>` : ""}${s.say ? `<div class="rv-say"><i>Gesprochen:</i> ${esc(txt(s.say))}</div>` : ""}${s.show ? `<div class="rv-figrow">${fig(s.show, [])}</div>` : ""}</div>`).join("");
  if (a.tasks) body += a.tasks.map((t) => task(t, ++n)).join("");
  if (a.stages) body += a.stages.map((s) => `<h5>${esc(SUPPORT[s.support] ?? s.support)}</h5>` + (s.tasks ?? []).map((t) => task(t, ++n)).join("")).join("");
  return `<section class="rv-act"><h4>${esc(head)}${extra}</h4>${body}</section>`;
}
function lessonSet(d, vol) {
  const m = d.metadata ?? {};
  const head = `<header class="rv-sethead"><div class="rv-crumb">${esc(vol.subject)} · ${esc(yearLabel[vol.year] ?? vol.year)} · ${esc(txt(m.topic?.de ?? m.topic))}</div><h2>${esc(d.title?.de ?? txt(d.title))}</h2><div class="rv-skill">${esc(d.skill)}${d.title?.en ? ` · ${esc(d.title.en)}` : ""}</div>${d.summary ? `<p class="rv-summary">${esc(d.summary)}</p>` : ""}${m.parts?.length ? `<div class="rv-parts"><i>Die Prüfung deckt ab:</i> ${m.parts.map((p) => esc(p.what?.de ?? p.id)).join("; ")}</div>` : ""}</header>`;
  const lessons = (d.lessons ?? []).map((l) => `<article class="rv-lesson"><h3>Lektion ${l.n}: ${esc(l.title?.de ?? txt(l.title))}</h3>${l.goal ? `<p class="rv-goal"><i>Ziel:</i> ${esc(l.goal.de ?? txt(l.goal))}</p>` : ""}${(l.activities ?? []).map(activity).join("")}</article>`).join("");
  return `<div class="rv-set">${head}${lessons}<div class="rv-notes"><b>Anmerkungen</b><div class="rv-lines"></div></div></div>`;
}

const CSS = `
${playerCss}
html, body { background: #fff !important; color: #1b1030; height: auto !important; overflow: visible !important; display: block !important; }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font: 10pt/1.35 "Red Hat Text", system-ui, sans-serif; margin: 0; padding: 0; }
@page { size: A4; margin: 14mm 13mm 14mm 13mm; }
.rv-doc { max-width: none; }
.rv-cover { page-break-after: always; padding-top: 40mm; }
.rv-cover h1 { font: 800 26pt "Red Hat Display", sans-serif; margin: 0 0 6mm; }
.rv-cover p { max-width: 150mm; }
.rv-cover table { border-collapse: collapse; margin-top: 6mm; }
.rv-cover td, .rv-cover th { border-bottom: 1px solid #ddd; padding: 2px 10px 2px 0; text-align: left; }
.rv-set { page-break-before: always; }
.rv-sethead { border-bottom: 2px solid #6849dd; margin-bottom: 4mm; padding-bottom: 2mm; }
.rv-crumb { color: #6849dd; font-weight: 600; font-size: 9pt; }
.rv-sethead h2 { font: 800 17pt "Red Hat Display", sans-serif; margin: 1mm 0; }
.rv-skill { color: #777; font-size: 8.5pt; }
.rv-summary { font-size: 9pt; color: #444; margin: 2mm 0; }
.rv-parts { font-size: 9pt; }
.rv-lesson h3 { font: 800 13pt "Red Hat Display", sans-serif; margin: 5mm 0 1mm; color: #2b0f45; break-after: avoid; }
.rv-goal { margin: 0 0 2mm; }
.fig .grp.scat { width: 330px; }
.fig.small .grp.scat { width: 96px; }
.fig .grp.row { justify-content: flex-start; }
.rv-act h4 { font: 700 11pt "Red Hat Display", sans-serif; margin: 3mm 0 1mm; background: #f1edfc; padding: 1mm 2mm; break-after: avoid; }
.rv-act h5 { font-size: 9.5pt; margin: 2mm 0 1mm; color: #6849dd; break-after: avoid; }
.rv-note { font-weight: 400; font-size: 9pt; color: #555; }
.rv-task, .rv-screen { border: 1px solid #e3def5; border-radius: 4px; padding: 1.5mm 2.5mm; margin: 0 0 1.6mm; break-inside: avoid; }
.rv-thead { display: flex; gap: 8px; font-size: 8pt; color: #777; align-items: baseline; }
.rv-thead .rv-type { font-weight: 600; color: #2b0f45; }
.rv-thead .rv-id { margin-left: auto; }
.rv-n { display: inline-block; min-width: 14px; font-weight: 700; color: #6849dd; font-size: 8.5pt; }
.rv-screen .rv-n { float: left; margin-right: 4px; }
.rv-q { font-weight: 600; margin: 0.5mm 0; }
.rv-say, .rv-fb, .rv-bins { font-size: 9pt; color: #444; }
.rv-say i, .rv-ans i, .rv-fb i, .rv-goal i, .rv-parts i { color: #888; font-style: normal; }
.rv-frame { font-family: monospace; }
.rv-figrow { margin: 1mm 0; }
.fig { display: inline-block; vertical-align: middle; }
.fig svg { max-height: 34mm; max-width: 120mm; width: auto; height: auto; }
.fig img { max-height: 26mm; }
.fig.small svg, .fig.small img { max-height: 12mm; max-width: 40mm; }
.fig .cards, .fig .card { font-size: 11pt; }
.rv-opts { list-style: none; padding: 0; margin: 1mm 0; display: flex; flex-wrap: wrap; gap: 2mm 5mm; }
.rv-opts li { border: 1px solid #ddd; border-radius: 3px; padding: 0.5mm 2mm; }
.rv-opts li.rv-right { border-color: #2e7d32; background: #edf7ee; }
.rv-tick { color: #2e7d32; }
.rv-bin { color: #777; font-size: 8.5pt; }
.rv-ans { font-size: 9.5pt; }
.rv-hints { margin: 1mm 0 0 4mm; padding-left: 3mm; font-size: 9pt; color: #444; }
.rv-pairs td { padding: 0 4px; }
.rv-notes { margin-top: 5mm; break-inside: avoid; }
.rv-notes .rv-lines { height: 32mm; background: repeating-linear-gradient(#fff 0 7mm, #ccc 7mm 7.2mm); }
`;

const RENDER = `
const A = ${JSON.stringify(pathToFileURL(join(OUT, "assets")).href + "/")};
const D = ${JSON.stringify({ objects, colours, pics }).replace(/</g, "\\u003c")};
const UI = { planBack: "hinten", planFront: "vorn" };
let set = { curriculum: ${JSON.stringify(CUR)}, language: "de" };
let SHOWN_ANSWER = [];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
${drawnJs}
document.fonts.ready.then(() => {
  for (const el of document.querySelectorAll(".fig[data-show]")) {
    try { SHOWN_ANSWER = [].concat(JSON.parse(el.dataset.answer)).map(String); el.innerHTML = show(JSON.parse(el.dataset.show), el.classList.contains("small") ? { small: true } : {}); }
    catch (e) { el.textContent = "[Zeichnung: " + el.dataset.show + "]"; }
  }
  document.body.dataset.done = "1";
});
`;

function page(title, inner) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(title)}</title>${fontLink}<style>${CSS}</style></head><body><div class="rv-doc">${inner}</div><script>${RENDER}</script></body></html>`;
}
const today = new Date().toISOString().slice(0, 10);
function cover(title, vols) {
  const rows = vols.map((v) => `<tr><td>${esc(yearLabel[v.year] ?? v.year)}</td><td>${esc(v.subject)}</td><td>${v.sets.length} Lernpakete</td><td>${v.sets.reduce((a, s) => a + s.lessons.length, 0)} Lektionen</td></tr>`).join("");
  return `<section class="rv-cover"><h1>${esc(title)}</h1><p>Twist, ${esc(CUR)}. Stand ${today}. Zur fachlichen Prüfung durch Lehrkräfte.</p>
<p>Jedes Lernpaket übt eine Fähigkeit und beginnt auf einer neuen Seite. Eine Lektion hat die Teile <b>Aufwärmen</b>, <b>Entdecken</b> (Erklärung), <b>Üben</b> in drei Stufen (mit allen Hilfen, mit einer Hilfe, ohne Hilfe) und <b>Zeig, was du kannst</b> (die Prüfung, die für den Lernstand zählt). Die richtige Antwort ist grün mit ✓ markiert. „Gesprochen“ ist der Text, den die Stimme vorliest. Bilder und Zeichnungen erscheinen wie in der App.</p>
<p>Bitte notieren Sie Fehler, unpassende Aufgaben, falsche Klassenstufe oder unnatürliches Deutsch im Feld „Anmerkungen“ am Ende jedes Lernpakets, mit der Aufgabennummer.</p>
<table><tr><th>Jahr</th><th>Fach</th><th></th><th></th></tr>${rows}</table></section>`;
}

mkdirSync(OUT, { recursive: true });
// Print-size copies of the object pictures (512 px originals make a huge PDF)
const THUMBS = join(OUT, "assets/objects");
mkdirSync(THUMBS, { recursive: true });
for (const f of pics) if (!existsSync(join(THUMBS, f))) execFileSync("sips", ["-Z", "160", join(T, "assets/objects", f), "--out", join(THUMBS, f)], { stdio: "ignore" });
const pdfs = [];
const ONLY = process.env.ONLY;
for (const v of volumes) {
  if (ONLY && `${v.year}-${v.dom}` !== ONLY) continue;
  const name = `${CUR}-${v.year}-${v.dom}`;
  const title = `${v.subject}, ${yearLabel[v.year] ?? v.year}`;
  const html = page(title, cover(title, [v]) + v.sets.map((d) => lessonSet(d, v)).join(""));
  const hp = join(OUT, name + ".html");
  writeFileSync(hp, html);
  const pdf = join(OUT, name + ".pdf");
  if (existsSync(pdf)) rmSync(pdf);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files", "--virtual-time-budget=120000", "--run-all-compositor-stages-before-draw", `--print-to-pdf=${pdf}`, pathToFileURL(hp).href], { stdio: "ignore", timeout: 600000 });
  pdfs.push(pdf);
  console.log(name, v.sets.length, "sets");
}
if (ONLY) process.exit(0);
const all = join(OUT, `${CUR}-alle-lektionen.pdf`);
const coverHtml = join(OUT, `${CUR}-cover.html`);
writeFileSync(coverHtml, page(`Twist ${CUR}: alle Lektionen`, cover(`Twist ${CUR}: alle Lektionen`, volumes)));
const coverPdf = join(OUT, `${CUR}-cover.pdf`);
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${coverPdf}`, pathToFileURL(coverHtml).href], { stdio: "ignore" });
execFileSync("pdfunite", [coverPdf, ...pdfs, all]);
console.log("wrote", all);
