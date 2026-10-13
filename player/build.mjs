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
  de: [[" = ?", " gleich wie viel?"], [" + ", " plus "], [" − ", " minus "], [" = ", " gleich "], ["_", "wie viel"], [" → ", ", dann "]],
  en: [[" = ?", " equals what?"], [" + ", " plus "], [" − ", " minus "], [" = ", " equals "], ["_", "what"], [" → ", ", then "]],
};
const spoken = (text, lang) => (READ_MATHS[lang] ?? []).reduce((t, [a, b]) => t.split(a).join(b), String(text).trim());
const lineId = (lang, t) => createHash("sha1").update(`${lang}|${t}`).digest("hex").slice(0, 10);

const voices = read("assets/voices.yaml");
const lines = existsSync(join(T, "assets/narration/lines.yaml")) ? read("assets/narration/lines.yaml") ?? {} : {};
const assign = voices.assign ?? {};
const voiceFor = (activity, phrase) => (phrase && assign[`phrases.${phrase}`]) || assign[activity] || voices.chosen;
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
  if (o && typeof o === "object" && o.object) { const l = objectRecs[o.object].labels[lang]; return ["de", "fr"].includes(lang) ? l.split(" ").slice(1).join(" ") || l : l; }
  if (typeof o === "string" && (t.option_audio || !LETTERISH.test(o))) return o;
  return null;
}

const sets = [];
for (const p of walk(join(T, "lessons")).filter((f) => f.endsWith(".yaml")).sort()) {
  const d = YAML.parse(readFileSync(p, "utf8"));
  const rel = relative(join(T, "lessons"), p);
  const lang = d.language;
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
        t._hints = (t.hints ?? []).map((h) => clip(lang, h, a.activity, null, w));
        t._options = (t.options ?? []).map((o) => { const x = optionText(t, o, lang); return x ? clip(lang, x, a.activity, null, w) : null; });
        // Pair sides, bins and options with their own `say` (a swatch saying "Yellow.").
        const tap = (x) => x && typeof x === "object" && x.say ? sayClips(x.say, lang, a.activity, w)[0] : null;
        if (t.pairs) t._pairs = t.pairs.map((p) => ({ left: tap(p.left), right: tap(p.right) }));
        if (t.bins) t._bins = t.bins.map(tap);
        (t.options ?? []).forEach((o, i) => { const c = tap(o); if (c) t._options[i] = c; });
        t._feedback = Object.fromEntries(Object.entries(t.feedback ?? {}).map(([k, v]) => [String(k), clip(lang, v, a.activity, null, w)]));
      }
    }
  }
  sets.push({ file: rel, id: d.id, title: d.title, language: lang, target_language: d.target_language ?? null, summary: d.summary,
    no_reading: !!d.metadata?.no_reading, year: d.metadata?.year, minutes: d.metadata?.lesson_minutes, lessons: d.lessons });
}

const phrases = {};
for (const [lang, groups] of Object.entries(read("assets/phrases.yaml")))
  for (const [g, items] of Object.entries(groups))
    (phrases[lang] ??= {})[g] = items.map((x) => ({ text: x, src: clip(lang, x, null, g, `phrases ${g}`) }));

const objects = Object.fromEntries((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, { de: o.labels.de, en: o.labels.en }]));
const colours = read("assets/drawn.yaml").colours;
const pics = readdirSync(join(T, "assets/objects")).filter((f) => f.endsWith(".png"));

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
const data = { built: new Date().toISOString().slice(0, 10), assets: "../twist/assets/", sets, phrases, objects, colours, pics, voices: { chosen: voices.chosen, assign } };
const html = readFileSync(join(HERE, "template.html"), "utf8").replace("__DATA__", () => JSON.stringify(data).replace(/</g, "\\u003c"));
writeFileSync(join(HERE, "index.html"), html);
console.log(`player/index.html: ${sets.length} lesson sets, ${sets.reduce((n, s) => n + s.lessons.length, 0)} lessons, ${clips} spoken lines (${missingFiles} audio files missing locally)`);
