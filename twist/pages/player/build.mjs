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
const T = join(HERE, "..", "..");
const YAML = createRequire(join(T, "package.json"))("yaml");
const read = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));
// Where each skill sits in its year (curricula/<curriculum>.yaml, placement), so the app's Learn tab follows the course.
const PLACE = {};
for (const cur of ["de-DE", "en-GB"]) for (const [y, ks] of Object.entries(read(`curricula/${cur}.yaml`).placement ?? {})) (ks ?? []).forEach((k, i) => { PLACE[`${cur}|${y}|${k}`] = i; });
// The foreign-language learning year that goes with each school year (curricula learning_years).
const LEARNING_YEARS = {};
for (const cur of ["de-DE", "en-GB"]) for (const [ly, v] of Object.entries(read(`curricula/${cur}.yaml`).learning_years ?? {})) for (const g of v?.grades ?? []) (LEARNING_YEARS[cur] ??= {})[g] = ly;
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
// Money after a number; must match say_money_de() in narration.py.
const sayMoneyDe = (t) => t.replace(/(?<![\d,])(\d+),(\d{2}) €/g, "$1 Euro $2").replace(/(\d) €/g, "$1 Euro").replace(/(\d) ct\b/g, "$1 Cent");
// Symbols spoken as words; must match say_symbols_en() in narration.py.
const DEN_EN = { 2: "half", 3: "third", 4: "quarter", 5: "fifth", 6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth",
  11: "eleventh", 12: "twelfth", 13: "thirteenth", 14: "fourteenth", 15: "fifteenth", 16: "sixteenth", 17: "seventeenth",
  18: "eighteenth", 19: "nineteenth", 20: "twentieth", 24: "twenty-fourth", 25: "twenty-fifth", 30: "thirtieth", 40: "fortieth",
  50: "fiftieth", 60: "sixtieth", 100: "hundredth", 1000: "thousandth" };
const VULGAR_EN = [["½ hour", "half an hour"], ["½", "a half"], ["¼", "a quarter"], ["¾", "three quarters"], ["⅓", "a third"], ["⅔", "two thirds"], ["⅛", "an eighth"]];
const VULGAR_DE = [["½", "ein halb"], ["¼", "ein Viertel"], ["¾", "drei Viertel"]];
const UNITS_EN = { mm: "millimetres", cm: "centimetres", m: "metres", km: "kilometres" };
const fractionEn = (n, d) => { const w = DEN_EN[+d]; return !w ? `${n} over ${d}` : +n === 1 ? `one ${w}` : `${n} ${w === "half" ? "halves" : w + "s"}`; };
const saySymbolsEn = (t) => VULGAR_EN.reduce((s, [a, b]) => s.split(a).join(b), t
  .replace(/(?<![\d/.])(\d+) (\d+)\/(\d+)(?![\d/])/g, (m, w, n, d) => `${w} and ${fractionEn(n, d)}`)
  .replace(/(?<![\d/.])(\d+)\/(\d+)(?![\d/])/g, (m, n, d) => fractionEn(n, d))
  .replace(/(\d) ?½/g, "$1 and a half"))
  .replace(/ ?°C\b/g, " degrees Celsius").replace(/ ?°/g, " degrees")
  .replace(/\b(mm|cm|km|m)²/g, (m, u) => "square " + UNITS_EN[u]).replace(/\b(mm|cm|km|m)³/g, (m, u) => "cubic " + UNITS_EN[u])
  .replace(/(\d) ?%/g, "$1 per cent")
  .split(" × ").join(" times ").split(" ÷ ").join(" divided by ")
  .replace(/(\d) : (\d)/g, "$1 to $2").replace(/(\d) r (\d)/g, "$1 remainder $2")
  .replace(/−(?=\d)/g, "negative ");
const spoken = (text, lang) => { let t = (READ_MATHS[lang] ?? []).reduce((t, [a, b]) => t.split(a).join(b), String(text).trim());
  if (lang === "en") t = saySymbolsEn(t);
  if (lang === "de") t = sayNumbersDe(sayMoneyDe(VULGAR_DE.reduce((s, [a, b]) => s.split(a).join(b), t))).replace(/\beins (Euro|Cent)\b/g, "ein $1");
  return t; };
const lineId = (lang, t) => createHash("sha1").update(`${lang}|${t}`).digest("hex").slice(0, 10);

const voices = read("assets/voices.yaml");
const lines = existsSync(join(T, "assets/narration/lines.yaml")) ? read("assets/narration/lines.yaml") ?? {} : {};
// Voices per curriculum (voices.yaml curricula:), else the default. Must
// match voice_for() in narration.py.
let CUR = null;
const vcfg = (cur) => voices.curricula?.[cur] ?? voices;
const voiceFor = (activity, phrase, speaker) => { const c = vcfg(CUR), a = c.assign ?? {}; return speaker ? c.speakers[speaker] : (phrase && a[`phrases.${phrase}`]) || a[activity] || c.chosen; };
const curForLang = (lang) => Object.entries(voices.curricula ?? {}).find(([, c]) => c.language === lang)?.[0] ?? null;
const problems = [];
let clips = 0, missingFiles = 0;

function clip(lang, text, activity, phrase, where, speaker) {
  if (!text) return null;
  const t = spoken(text, lang), id = lineId(lang, t);
  if (!lines[id]) problems.push(`${where}: no narration line for "${t}" (run twist/assets/tools/narration.py --list and a voice)`);
  const f = `narration/${voiceFor(activity, phrase, speaker)}/${id}.mp3`;
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
  // A counted group stays silent ("Wo sind 2 Bananen?"), and then so do the
  // other options, so a task never speaks some options and not others.
  if ((t.options ?? []).some((x) => x && typeof x === "object" && x.count != null)) return null;
  if (o && typeof o === "object" && o.object) return word(o.object, lang);
  // Letters and sounds stay silent (hearing them gives the answer), but only
  // when every option is one: a task's options all speak or none do.
  const letters = (t.options ?? []).every((x) => typeof x === "string" && LETTERISH.test(x));
  if (typeof o === "string" && (t.option_audio || !letters)) return o;
  return null;
}

// What a speak task's model says. Must match speak_model() in narration.py.
function speakModel(t, tl) {
  if (t.say && typeof t.say === "object" && t.say[tl]) return t.say[tl];
  let x = String(t.expected_text).trim(); x = x[0].toUpperCase() + x.slice(1);
  return /[.!?]$/.test(x) ? x : x + ".";
}
const word = (oid, lang) => { const l = objectRecs[oid].labels[lang]; return ["de", "fr"].includes(lang) && l.includes(" ") ? l.split(" ").slice(1).join(" ") : l; };

// The start screen's topic pose (assets/mascot.yaml topics): by the skill's
// topic, or for the language lessons by curriculum. Must match the check in build.mjs.
const skillTopic = new Map();
const skillCanDo = new Map();
const skillRecs = {};
for (const f of walk(join(T, "competencies")).filter((f) => f.endsWith(".yaml"))) for (const k of read(relative(T, f)).skills ?? []) { skillTopic.set(k.id, k.topic?.en); skillCanDo.set(k.id, k.can_do); skillRecs[k.id] = { can_do: k.can_do, topic: k.topic ?? null, prerequisites: k.prerequisites ?? {} }; }
const topicPoses = read("assets/mascot.yaml").topics ?? [];
const poseFor = (d) => topicPoses.find((t) => t.domain ? t.domain === d.skill.split(".")[0] && t.curriculum === d.curriculum : (t.topics ?? []).includes(skillTopic.get(d.skill)))?.id ?? null;
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
        // `sounds`: a word said sound by sound from the bank, played in order.
        else if (t.audio?.sounds) t._target = t.audio.sounds.map((x) => soundClip(x, a.activity));
        // `turns`: a dialogue, one clip per turn in that speaker's voice, played in order.
        else if (t.audio) t._target = (t.audio.turns ?? [t.audio]).map((turn) => Object.entries(turn).filter(([k]) => !["sound", "sounds", "speaker", "turns"].includes(k)).map(([lg, v]) => clip(lg, v, a.activity, null, w, turn.speaker))[0]).filter(Boolean);
        if (t.type === "speak") { const tl = d.target_language ?? lang; t._model = clip(tl, speakModel(t, tl), a.activity, null, w); }
        t._hints = (t.hints ?? []).map((h) => clip(lang, h, a.activity, null, w));
        t._options = (t.options ?? []).map((o) => { const x = optionText(t, o, lang); return x ? clip(lang, x, a.activity, null, w) : null; });
        // Tapping a pair side, bin, sorting item or shown picture says its own
        // `say`, or a picture's word (not in target-language lessons).
        // Must match tappable() in narration.py.
        const target = d.target_language;
        // Text cards of one to three letters stay silent only when every card is one.
        const cards = [...(t.pairs ?? []).flatMap((p) => [p.left, p.right]), ...(t.bins ?? []), ...(t.type === "sorting" ? t.options ?? [] : [])].filter((x) => x && typeof x === "object" && typeof x.text === "string");
        const letterCards = cards.length > 0 && cards.every((x) => LETTERISH.test(x.text));
        const tap = (x) => {
          if (!x || typeof x !== "object") return null;
          if (x.say) return sayClips(x.say, lang, a.activity, w)[0];
          const o = x.show ?? x;
          if (!target && o.object && o.count == null) return clip(lang, word(o.object, lang), a.activity, null, w);
          if (t.option_audio !== false && typeof x.text === "string" && !letterCards) return clip(lang, x.text, a.activity, null, w); // a number or sum card reads itself
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
  // metadata.dashes: the set teaches dashes, which records write as a spaced hyphen
  // (house style bans the dash character). Show them as real dashes on screen; the
  // narration links above were made from the original text, so audio is unaffected.
  if (d.metadata?.dashes) {
    const DASH = (v) => typeof v === "string" ? v.replace(/ - /g, " \u2013 ") : Array.isArray(v) ? v.map(DASH) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "say" || k === "audio" || k.startsWith("_") ? x : DASH(x)])) : v;
    d.lessons = DASH(d.lessons);
  }
  sets.push({ file: rel, id: d.id, skill: d.skill, can_do: skillCanDo.get(d.skill) ?? null, pose: poseFor(d), title: d.title, language: lang, target_language: d.target_language ?? null, summary: d.summary,
    no_reading: !!d.metadata?.no_reading, year: d.metadata?.year, minutes: d.metadata?.lesson_minutes, lessons: d.lessons,
    curriculum: d.curriculum, topic: d.metadata?.topic ?? null, builds_on: d.metadata?.builds_on ?? [], ages: d.metadata?.ages ?? [],
    order: PLACE[`${d.curriculum}|${d.metadata?.year}|${d.skill}`] ?? 9999 });
}

const phrases = {};
for (const [lang, groups] of Object.entries(read("assets/phrases.yaml")))
  for (const [g, items] of Object.entries(groups)) { CUR = curForLang(lang);
    (phrases[lang] ??= {})[g] = items.map((x) => ({ text: x, src: clip(lang, x, null, g, `phrases ${g}`) })); }

const objects = Object.fromEntries((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, { de: o.labels.de, en: o.labels.en, initial: o.initial?.de, drawn: o.status === "drawn" }]));
const colours = read("assets/drawn.yaml").colours;
const pics = readdirSync(join(T, "assets/objects")).filter((f) => f.endsWith(".png"));

// --draft <file> writes a test copy even with lines not narrated yet.
const draft = process.argv.includes("--draft") ? process.argv[process.argv.indexOf("--draft") + 1] : null;
if (problems.length && !draft) { console.error(problems.join("\n")); process.exit(1); }
if (problems.length) console.error(`${problems.length} lines not narrated yet (draft)`);
const drills = {};
// A drill word that a drill speaks gets its recorded clip when there is one; the player
// falls back to the browser's voice. Must match the drill words in narration.py.
const drillClip = (b, it) => {
  const dom = b.skill.split(".")[0], lang = it.lang ?? { "lit-de": "de", "lit-en": "en" }[dom];
  if (it.word == null || !lang || !(b.formats ?? []).some((f) => f === "say" || f === "listen")) return null;
  CUR = { de: "de-DE", fr: "en-GB" }[lang] ?? (dom === "lit-en" ? "en-GB" : "de-DE");
  const t = spoken(String(it.word), lang), id = lineId(lang, t), f = `narration/${voiceFor("practise")}/${id}.mp3`;
  return lines[id] && existsSync(join(T, "assets", f)) ? f : null;
};
for (const p of walk(join(T, "drills")).filter((f) => f.endsWith(".yaml"))) {
  const b = YAML.parse(readFileSync(p, "utf8"));
  for (const it of b.items ?? []) { const c = drillClip(b, it); if (c) it._clip = c; }
  drills[b.skill] = b;
}
const data = { built: new Date().toISOString().slice(0, 10), assets: "../../assets/", learningYears: LEARNING_YEARS, sets, phrases, objects, colours, pics, voices: { chosen: voices.chosen, assign: voices.assign }, skills: skillRecs, drills };
const rules = readFileSync(join(HERE, "practice-rules.mjs"), "utf8").replace(/^export /gm, "");
const ui = readFileSync(join(HERE, "practice-ui.js"), "utf8") + "\n" + readFileSync(join(HERE, "app-ui.js"), "utf8");
const html = readFileSync(join(HERE, "template.html"), "utf8").replace("__DATA__", () => JSON.stringify(data).replace(/</g, "\\u003c")).replace("/*__PRACTICE__*/", () => rules + "\n" + ui).replace("/*__PRACTICE_CSS__*/", () => readFileSync(join(HERE, "practice.css"), "utf8") + "\n" + readFileSync(join(HERE, "app.css"), "utf8")).replace("/*__DRAWN__*/", () => readFileSync(join(HERE, "drawn.js"), "utf8"));
writeFileSync(draft ?? join(HERE, "index.html"), html);
if (draft) { writeFileSync(draft, html.replace('"assets":"../../assets/"', `"assets":${JSON.stringify("file://" + join(HERE, "../../assets") + "/")}`)); }
console.log(`player/index.html: ${sets.length} lesson sets, ${sets.reduce((n, s) => n + s.lessons.length, 0)} lessons, ${clips} spoken lines (${missingFiles} audio files missing locally)`);
