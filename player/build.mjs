// Builds player/index.html: the twist/ model lessons rendered in a phone
// frame, with pictures, drawn components and narration. Reads the records;
// never edit index.html by hand. Run: node player/build.mjs
//
// Each spoken line is matched to its clip with the same rules as
// twist/assets/tools/narration.py (maths reading rule, sha1 id, voice by
// activity); the build fails if a line has no clip in lines.yaml.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const T = join(HERE, "..", "twist");
const YAML = createRequire(join(T, "package.json"))("yaml");
const read = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

// Must match READ_MATHS in narration.py.
const READ_MATHS = {
  de: [[" = ?", " gleich wie viel?"], [" < ", " ist kleiner als "], [" > ", " ist größer als "], [" + ", " plus "], [" − ", " minus "], [" = ", " gleich "], ["_", "wie viel"], [" → ", ", dann "]],
  en: [[" = ?", " equals what?"], [" < ", " is less than "], [" > ", " is greater than "], [" + ", " plus "], [" − ", " minus "], [" = ", " equals "], ["_", "what"], [" → ", ", then "]],
};
// German numbers are spoken as words; must match say_numbers_de() in narration.py.
const ONES_DE = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const TENS_DE = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
const under100 = (x) => x < 20 ? ONES_DE[x] : (x % 10 ? (x % 10 === 1 ? "ein" : ONES_DE[x % 10]) + "und" : "") + TENS_DE[Math.floor(x / 10)];
const under1000 = (x) => { const h = Math.floor(x / 100), r = x % 100; return (!h ? "" : h === 1 ? "hundert" : ONES_DE[h] + "hundert") + (r || !h ? under100(r) : ""); };
const deWords = (n) => { if (n < 1000) return under1000(n); const k = Math.floor(n / 1000), r = n % 1000, kw = under1000(k);
  return (k === 1 ? "tausend" : (kw.endsWith("eins") ? kw.slice(0, -4) : kw) + (k % 100 === 1 ? "ein" : "") + "tausend") + (r ? under1000(r) : ""); };
const DE_PLACES = [[/\bH: /g, "Hunderter "], [/\bZ: /g, "Zehner "], [/\bE: /g, "Einer "], [/(\S+) H, (\S+) Z, (\S+) E\b/g, "$1 Hunderter, $2 Zehner, $3 Einer"]];
const sayNumbersDe = (t) => DE_PLACES.reduce((s, [rx, b]) => s.replace(rx, b), t)
  .replace(/(?<![\d,.:])(\d{1,3}) (\d{3})(?![\d,.:]?\d)/g, "$1$2")
  .replace(/(?<![\d,.:])\d{1,6}(?![,.:]?\d)/g, (m) => deWords(+m));
const spoken = (text, lang) => { const t = (READ_MATHS[lang] ?? []).reduce((t, [a, b]) => t.split(a).join(b), String(text).trim()); return lang === "de" ? sayNumbersDe(t) : t; };
const lineId = (lang, t) => createHash("sha1").update(`${lang}|${t}`).digest("hex").slice(0, 10);

const voices = read("assets/voices.yaml");
const lines = existsSync(join(T, "assets/narration/lines.yaml")) ? read("assets/narration/lines.yaml") ?? {} : {};
// Voices per curriculum (voices.yaml curricula:), else the default. Must
// match voice_for() in narration.py.
let CUR = null;
const vcfg = (cur) => voices.curricula?.[cur] ?? voices;
const voiceFor = (activity, phrase) => { const c = vcfg(CUR), a = c.assign ?? {}; return (phrase && a[`phrases.${phrase}`]) || a[activity] || c.chosen; };
const curForLang = (lang) => Object.entries(voices.curricula ?? {}).find(([, c]) => c.language === lang)?.[0] ?? null;
const problems = [];
let clips = 0, missingFiles = 0;

function clip(lang, text, activity, phrase, where) {
  if (!text) return null;
  const t = spoken(text, lang), id = lineId(lang, t);
  if (!lines[id]) problems.push(`${where}: no narration line for "${t}" (run twist/assets/tools/narration.py --list and a voice)`);
  const f = `narration/${voiceFor(activity, phrase)}/${id}.mp3`;
  clips++;
  if (!existsSync(join(T, "assets", f))) missingFiles++;
  return f;
}
const sayClips = (say, lang, activity, where) =>
  (say && typeof say === "object" ? Object.entries(say) : [[lang, say]]).map(([lg, v]) => clip(lg, v, activity, null, where)).filter(Boolean);
const soundClip = (id, activity) => `narration/${voiceFor(activity)}/sounds/${id.replace(":", "-long")}.mp3`;

// Must match option_texts() in narration.py: a speaker on an option only
// when hearing it does not give the answer away.
const NO_OPTION_AUDIO = new Set(["audio_choice", "true_false", "highlight_in_text", "tracing", "speak", "text_input", "drag_and_drop_count", "point_on_line", "matching", "sorting"]);
const LETTERISH = /^[A-Za-zÄÖÜäöüß]{1,3}$/;
const objectRecs = Object.fromEntries((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, o]));
function optionText(t, o, lang) {
  if (t.option_audio === false || (t.option_audio === undefined && NO_OPTION_AUDIO.has(t.type))) return null;
  if (o && typeof o === "object" && o.count != null) return null;
  if (o && typeof o === "object" && o.object) return word(o.object, lang);
  if (typeof o === "string" && (t.option_audio || !LETTERISH.test(o))) return o;
  return null;
}

// What a speak task's model says. Must match speak_model() in narration.py.
function speakModel(t, tl) {
  if (t.say && typeof t.say === "object" && t.say[tl]) return t.say[tl];
  let x = String(t.expected_text).trim(); x = x[0].toUpperCase() + x.slice(1);
  return /[.!?]$/.test(x) ? x : x + ".";
}
const word = (oid, lang) => { const l = objectRecs[oid].labels[lang]; return ["de", "fr"].includes(lang) && l.includes(" ") ? l.split(" ").slice(1).join(" ") : l; };

const sets = [];
for (const p of walk(join(T, "lessons")).filter((f) => f.endsWith(".yaml")).sort()) {
  const d = YAML.parse(readFileSync(p, "utf8"));
  const rel = relative(join(T, "lessons"), p);
  const lang = d.language;
  CUR = d.curriculum;
  for (const l of d.lessons) {
    l._title = clip(lang, l.title[lang], null, null, `${rel} lesson ${l.n}`);
    for (const a of l.activities) {
      for (const s of a.screens ?? []) {
        s._audio = sayClips(s.say ?? s.text, lang, "learn", `${rel} lesson ${l.n} learn`);
        if (s.sound) s._sound = soundClip(s.sound, "learn");
      }
      for (const t of [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((st) => st.tasks)]) {
        const w = `${rel} ${t.id}`;
        t._prompt = sayClips(t.say ?? t.text, lang, a.activity, w);
        if (t.audio?.sound) t._target = soundClip(t.audio.sound, a.activity);
        else if (t.audio) t._target = sayClips(Object.fromEntries(Object.entries(t.audio).filter(([k]) => k !== "sound")), lang, a.activity, w)[0];
        if (t.type === "speak") { const tl = d.target_language ?? lang; t._model = clip(tl, speakModel(t, tl), a.activity, null, w); }
        t._hints = (t.hints ?? []).map((h) => clip(lang, h, a.activity, null, w));
        t._options = (t.options ?? []).map((o) => { const x = optionText(t, o, lang); return x ? clip(lang, x, a.activity, null, w) : null; });
        // Tapping a pair side, bin, sorting item or shown picture says its own
        // `say`, or a picture's word (not in target-language lessons).
        // Must match tappable() in narration.py.
        const target = d.target_language;
        const tap = (x) => {
          if (!x || typeof x !== "object") return null;
          if (x.say) return sayClips(x.say, lang, a.activity, w)[0];
          const o = x.show ?? x;
          if (!target && o.object && o.count == null) return clip(lang, word(o.object, lang), a.activity, null, w);
          if (t.option_audio !== false && typeof x.text === "string" && !LETTERISH.test(x.text)) return clip(lang, x.text, a.activity, null, w); // a number or sum card reads itself
          return null;
        };
        if (t.pairs) t._pairs = t.pairs.map((p) => ({ left: tap(p.left), right: tap(p.right) }));
        if (t.bins) t._bins = t.bins.map(tap);
        if (t.type === "sorting") (t.options ?? []).forEach((o, i) => { const c = tap(o); if (c) t._options[i] = c; });
        if (t.show?.objects) t._showWords = t.show.objects.map((oid) => (target ? null : clip(lang, word(oid, lang), a.activity, null, w)));
        t._feedback = Object.fromEntries(Object.entries(t.feedback ?? {}).map(([k, v]) => [String(k), clip(lang, v, a.activity, null, w)]));
      }
    }
  }
  sets.push({ file: rel, id: d.id, title: d.title, language: lang, target_language: d.target_language ?? null, summary: d.summary,
    no_reading: !!d.metadata?.no_reading, year: d.metadata?.year, minutes: d.metadata?.lesson_minutes, lessons: d.lessons });
}

const phrases = {};
for (const [lang, groups] of Object.entries(read("assets/phrases.yaml")))
  for (const [g, items] of Object.entries(groups)) { CUR = curForLang(lang);
    (phrases[lang] ??= {})[g] = items.map((x) => ({ text: x, src: clip(lang, x, null, g, `phrases ${g}`) })); }

const objects = Object.fromEntries((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, { de: o.labels.de, en: o.labels.en, initial: o.initial?.de, drawn: o.status === "drawn" }]));
const colours = read("assets/drawn.yaml").colours;
const pics = readdirSync(join(T, "assets/objects")).filter((f) => f.endsWith(".png"));

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
const data = { built: new Date().toISOString().slice(0, 10), assets: "../twist/assets/", sets, phrases, objects, colours, pics, voices: { chosen: voices.chosen, assign: voices.assign } };
const html = readFileSync(join(HERE, "template.html"), "utf8").replace("__DATA__", () => JSON.stringify(data).replace(/</g, "\\u003c"));
writeFileSync(join(HERE, "index.html"), html);
console.log(`player/index.html: ${sets.length} lesson sets, ${sets.reduce((n, s) => n + s.lessons.length, 0)} lessons, ${clips} spoken lines (${missingFiles} audio files missing locally)`);
