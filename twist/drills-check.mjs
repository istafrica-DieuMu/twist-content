// Checks the drill banks in drills/ (docs/practice.md, Drill banks).
// A bank is hand-written; this file only checks it.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import YAML from "yaml";

export const FORMATS = new Set(["type", "choose", "flash", "say", "timed", "listen"]);
// Languages a word in a foreign-language bank can be in (drills/README.md).
export const LANGS = new Set(["en", "fr"]);
// Formats for a word in a foreign-language bank.
export const LANG_FORMATS = new Set(["listen", "flash"]);

// The value of a maths fact written with + − × ÷, left to right with × and ÷ first.
export function factValue(q) {
  const toks = String(q).replace(/−/g, "-").match(/\d+|[+\-×÷]/g);
  if (!toks || toks.length % 2 === 0) return NaN;
  const nums = [+toks[0]], ops = [];
  for (let i = 1; i < toks.length; i += 2) {
    const op = toks[i], n = +toks[i + 1];
    if (op === "×") nums.push(nums.pop() * n);
    else if (op === "÷") nums.push(nums.pop() / n);
    else { ops.push(op); nums.push(n); }
  }
  return ops.reduce((v, op, i) => (op === "+" ? v + nums[i + 1] : v - nums[i + 1]), nums[0]);
}

// The value of a number word to 100 in English, French or German; NaN if it is not one.
const EN_NUM = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const FR_NUM = { "zéro": 0, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, vingts: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60, cent: 100 };
const DE_NUM = { null: 0, eins: 1, ein: 1, zwei: 2, drei: 3, vier: 4, "fünf": 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10, elf: 11, "zwölf": 12, dreizehn: 13, vierzehn: 14, "fünfzehn": 15, sechzehn: 16, siebzehn: 17, achtzehn: 18, neunzehn: 19, zwanzig: 20, "dreißig": 30, vierzig: 40, "fünfzig": 50, sechzig: 60, siebzig: 70, achtzig: 80, neunzig: 90, hundert: 100, einhundert: 100 };
export function numberWordValue(w, lang) {
  const s = String(w ?? "").trim().toLowerCase();
  if (lang === "de") {
    if (s in DE_NUM) return s === "ein" ? NaN : DE_NUM[s];
    const m = s.match(/^(ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun)und(zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig)$/u);
    return m ? DE_NUM[m[1]] + DE_NUM[m[2]] : NaN;
  }
  const toks = s.split(/[- ]+/);
  if (lang === "en") {
    if (/^(a|one) hundred$/.test(s)) return 100;
    if (toks.length === 1) return toks[0] in EN_NUM ? EN_NUM[toks[0]] : NaN;
    const [t, u] = toks;
    return toks.length === 2 && EN_NUM[t] >= 20 && EN_NUM[t] % 10 === 0 && EN_NUM[u] >= 1 && EN_NUM[u] <= 9 ? EN_NUM[t] + EN_NUM[u] : NaN;
  }
  if (lang === "fr") {
    // et joins un and onze to vingt to soixante (vingt et un, soixante et onze) and nowhere else (quatre-vingt-un);
    // quatre-vingts takes its s only at the end.
    const last = toks[toks.length - 1], et = toks.includes("et");
    const wantEt = toks.length > 1 && (last === "un" || last === "onze") && ["vingt", "trente", "quarante", "cinquante", "soixante"].includes(toks[toks.length - 2 - (et ? 1 : 0)]) && toks[0] !== "quatre";
    if (et !== wantEt) return NaN;
    if (toks.includes("vingts") && !(s === "quatre-vingts")) return NaN;
    if (s === "quatre-vingt") return NaN;
    let v = 0;
    for (const [i, t] of toks.entries()) {
      if (t === "et") continue;
      if (!(t in FR_NUM)) return NaN;
      if (t.startsWith("vingt") && toks[i - 1] === "quatre") v += 76; // quatre (4) is already counted; 4 × 20 = 80
      else v += FR_NUM[t];
    }
    return v;
  }
  return NaN;
}

// assets: { objects: Map id -> object, pics: Set of picture file names, swatches: Set of colours }; left out, the
// asset checks are skipped (the tests).
export function checkBank(file, d, steps, assets) {
  const p = [], where = file;
  if (!d || typeof d !== "object") return [`${where}: not a drill bank`];
  if (!steps.has(d.skill)) p.push(`${where}: unknown skill ${d.skill}`);
  const [domain, ...rest] = String(d.skill ?? "").split(".");
  const parts = file.split("/");
  if (parts.at(-2) !== domain) p.push(`${where}: a bank for ${d.skill} belongs in the folder drills/${domain}/`);
  // Two skills of a domain can share a slug (word-reading and spelling of the
  // same word list); the strand then goes in front: word-reading.exception-words-y2.yaml.
  if (![`${rest.at(-1)}.yaml`, `${rest.join(".")}.yaml`].includes(parts.at(-1))) p.push(`${where}: the file name must be the skill's slug, ${rest.at(-1)}.yaml (or ${rest.join(".")}.yaml when another skill has the same slug)`);
  for (const f of d.formats ?? []) if (!FORMATS.has(f)) p.push(`${where}: unknown format ${f}`);
  if (!(d.formats ?? []).length) p.push(`${where}: no formats`);
  const seen = new Set();
  let langItems = 0;
  for (const [i, it] of (d.items ?? []).entries()) {
    const n = i + 1;
    const lang = it && it.word != null && it.lang != null;
    const fact = it && it.q != null && it.a != null, word = it && it.word != null && it.sentence != null && !lang;
    if ([fact, word, lang].filter(Boolean).length !== 1) { p.push(`${where}: item ${n} needs either q and a, or word and sentence, or word, lang and home`); continue; }
    const k = fact ? String(it.q) : lang ? `${it.lang}:${String(it.word).toLowerCase()}` : String(it.word).toLowerCase();
    if (seen.has(k)) p.push(`${where}: ${k} appears twice`);
    seen.add(k);
    if (fact && factValue(it.q) !== Number(it.a)) p.push(`${where}: ${it.q} is ${factValue(it.q)}, not ${it.a}`);
    if (word && !new RegExp(`(^|[^\\p{L}])${it.word}([^\\p{L}]|$)`, "iu").test(it.sentence)) p.push(`${where}: "${it.word}" is not in its sentence "${it.sentence}"`);
    if (lang) { langItems++; p.push(...checkLangItem(where, n, it, assets)); }
  }
  if (langItems) for (const f of d.formats ?? []) if (!LANG_FORMATS.has(f)) p.push(`${where}: a foreign-language bank uses listen and flash, not ${f}`);
  if (!langItems && (d.formats ?? []).includes("listen")) p.push(`${where}: listen is a format for foreign-language words`);
  if (!(d.items ?? []).length) p.push(`${where}: no items`);
  return p;
}

// A word in the language being learnt with what it means: a picture (object, or a colour swatch) or a digit, and
// the word at home in German and English.
function checkLangItem(where, n, it, assets) {
  const p = [], w = `${where}: item ${n} (${it.word})`;
  if (!LANGS.has(it.lang)) p.push(`${w}: lang must be one of ${[...LANGS].join(", ")}, not ${it.lang}`);
  if (!it.home || typeof it.home !== "object" || !it.home.de || !it.home.en) p.push(`${w}: needs home with de and en`);
  const shows = ["object", "digit", "colour"].filter((f) => it[f] != null);
  if (!shows.length) p.push(`${w}: needs an object, a digit or a colour`);
  if (it.digit != null && shows.length > 1) p.push(`${w}: a digit stands alone, without an object or a colour`);
  if (it.digit != null) {
    if (!Number.isInteger(it.digit)) p.push(`${w}: digit must be a whole number, not ${it.digit}`);
    for (const [l, s] of [[it.lang, it.word], ["de", it.home?.de], ["en", it.home?.en]]) {
      if (s == null || !LANGS.has(l) && l !== "de") continue;
      const v = numberWordValue(s, l);
      if (v !== it.digit) p.push(`${w}: "${s}" is ${Number.isNaN(v) ? "not a number word to 100" : v}, not ${it.digit}`);
    }
  }
  if (assets && it.object != null) {
    const o = assets.objects.get(it.object);
    if (!o) p.push(`${w}: no object ${it.object} in assets/objects.yaml`);
    else {
      const pic = it.colour != null && it.colour !== o.recolour?.base ? `${it.object}.${it.colour}.png` : `${it.object}.png`;
      if (!assets.pics.has(pic)) p.push(`${w}: no picture assets/objects/${pic}`);
    }
  }
  if (assets && it.colour != null && it.object == null && !assets.swatches.has(it.colour)) p.push(`${w}: the colour-swatch component has no colour ${it.colour}`);
  return p;
}

export function loadAssets(T) {
  const objects = new Map(), pics = new Set(), swatches = new Set();
  try { for (const o of YAML.parse(readFileSync(join(T, "assets/objects.yaml"), "utf8")).objects ?? []) objects.set(o.id, o); } catch {}
  if (existsSync(join(T, "assets/objects"))) for (const f of readdirSync(join(T, "assets/objects"))) pics.add(f);
  try {
    const sw = (YAML.parse(readFileSync(join(T, "assets/drawn.yaml"), "utf8")).components ?? []).find((c) => c.id === "colour-swatch");
    for (const c of String(sw?.data ?? "").match(/\[([^\]]*)\]/)?.[1].split(",") ?? []) swatches.add(c.trim());
  } catch {}
  return { objects, pics, swatches };
}

export function checkDrills({ T, steps, err }) {
  const dir = join(T, "drills");
  const walk = (x) => (existsSync(x) ? readdirSync(x).flatMap((f) => { const q = join(x, f); return statSync(q).isDirectory() ? walk(q) : [q]; }) : []);
  const assets = loadAssets(T);
  let banks = 0, items = 0;
  for (const f of walk(dir).filter((x) => x.endsWith(".yaml")).sort()) {
    const file = relative(T, f);
    let d;
    try { d = YAML.parse(readFileSync(f, "utf8")); } catch (e) { err(`${file}: YAML error: ${e.message.split("\n")[0]}`); continue; }
    for (const m of checkBank(file, d, steps, assets)) err(m);
    banks++; items += d?.items?.length ?? 0;
  }
  return { banks, items };
}
