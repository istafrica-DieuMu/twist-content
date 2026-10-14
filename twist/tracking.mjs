// Progress and OpenRouter cost per curriculum: what each year needs, what is
// drafted, what has been generated (pictures, narration) and what it cost.
// build.mjs writes the result to views/tracking.md.
//   node tracking.mjs --live   also asks OpenRouter what the key has spent and
//                              keeps it in assets/costs.yaml (no other network use).
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const T = dirname(fileURLToPath(import.meta.url));
const load = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));
const COSTS = "assets/costs.yaml";

// OpenRouter list prices in US dollars per token, read from
// https://openrouter.ai/api/v1/models on 2026-10-13. Gemini counts audio as
// 32 tokens a second. The listening check is assumed to answer in about 150
// tokens with its reasoning; a clip is about 0.4 s longer before trimming.
const PRICE = {
  tts: { model: "google/gemini-3.8-flash-tts", in: 0.5e-6, out: 9e-6 },
  listen: { model: "google/gemini-3.8-flash", in: 0.75e-6, audio: 0.75e-6, out: 3.75e-6 },
};
const AUDIO_TOKENS_PER_S = 32, BRIEF_TOKENS = 150, LISTEN_PROMPT_TOKENS = 90, LISTEN_OUT_TOKENS = 150, UNTRIMMED_S = 0.4;

const usd = (x) => `$${x < 10 ? x.toFixed(2) : x.toFixed(0)}`;
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "–");

function clipCost(c) {
  const tries = c.tries ?? 1, s = (c.seconds ?? 0) + UNTRIMMED_S, textTokens = (c.text ?? "").length / 4;
  const tts = tries * ((BRIEF_TOKENS + textTokens) * PRICE.tts.in + s * AUDIO_TOKENS_PER_S * PRICE.tts.out);
  const listen = c.check ? tries * ((LISTEN_PROMPT_TOKENS + textTokens) * PRICE.listen.in + s * AUDIO_TOKENS_PER_S * PRICE.listen.audio + LISTEN_OUT_TOKENS * PRICE.listen.out) : 0;
  return { tts, listen };
}

// Placement rows in file order, with the topic comment above each skill where
// the curriculum has one (a comment that only names a subject is not a topic).
function placements(cur, subjects) {
  const rows = [], subjectNames = new Set([...Object.values(subjects), "Maths", "English", "French", "Mathe", "Deutsch", "Englisch"]);
  let inPlacement = false, year = null, topic = null;
  for (const line of readFileSync(join(T, "curricula", `${cur}.yaml`), "utf8").split("\n")) {
    if (/^placement:/.test(line)) { inPlacement = true; continue; }
    if (!inPlacement) continue;
    if (/^\S/.test(line)) break;
    let m;
    if ((m = line.match(/^  ([a-z0-9-]+):\s*$/))) { year = m[1]; topic = null; }
    // A short comment names a topic; a longer one with a date or a reason is a note and changes nothing.
    else if ((m = line.match(/^\s+#\s*(.+?)\s*$/))) { if (subjectNames.has(m[1])) topic = null; else if (m[1].length <= 40 && !/[(,:]/.test(m[1])) topic = m[1]; }
    else if ((m = line.match(/^\s+-\s+([a-z0-9.-]+)/))) rows.push({ year, skill: m[1], topic });
  }
  return rows;
}

function skillTopics() {
  const out = new Map();
  for (const dom of readdirSync(join(T, "competencies"))) {
    if (!dom.match(/^[a-z-]+$/)) continue;
    for (const f of readdirSync(join(T, "competencies", dom)).filter((x) => x.endsWith(".yaml"))) {
      const d = load(join("competencies", dom, f));
      for (const s of d.skills ?? d.steps ?? []) out.set(s.id, s.topic ?? {});
    }
  }
  return out;
}

function lessonSets(cur) {
  const out = new Map(), dir = join(T, "lessons", cur);
  if (!existsSync(dir)) return out;
  for (const dom of readdirSync(dir)) for (const f of readdirSync(join(dir, dom)).filter((x) => x.endsWith(".yaml"))) {
    let d;
    try { d = load(join("lessons", cur, dom, f)); } catch { continue; } // the checker reports the YAML error
    let tasks = 0;
    for (const l of d.lessons ?? []) for (const a of l.activities ?? []) {
      tasks += (a.tasks ?? []).length;
      for (const st of a.stages ?? []) tasks += (st.tasks ?? []).length;
    }
    out.set(d.skill, { file: `${dom}/${f}`, lessons: (d.lessons ?? []).length, tasks, status: d.metadata?.status ?? "draft" });
  }
  return out;
}

export function tracking() {
  const topics = skillTopics();
  const lines = load("assets/narration/lines.yaml") ?? {};
  const voiceLogs = {};
  for (const f of readdirSync(join(T, "assets/narration")).filter((x) => /^[a-z0-9-]+\.yaml$/.test(x) && x !== "lines.yaml")) voiceLogs[f.replace(/\.yaml$/, "")] = load(join("assets/narration", f)) ?? {};
  const pictures = load("assets/objects/pictures.yaml") ?? {};
  const objects = load("assets/objects.yaml").objects;
  const live = existsSync(join(T, COSTS)) ? load(COSTS) : null;

  // Narration: each (line, voice) is one clip; its cost is split over the lesson sets that use the line.
  const narr = new Map(); // "de-DE/math/add-to-10" or "shared" -> { clips, missing, tts, listen }
  const voices = {};
  const bucket = (k) => { if (!narr.has(k)) narr.set(k, { clips: 0, missing: 0, tts: 0, listen: 0 }); return narr.get(k); };
  for (const [id, e] of Object.entries(lines)) {
    const uses = [...new Set((e.used ?? []).map((u) => (/^(de-DE|en-GB)\/[^#]+/.exec(u) ?? ["shared"])[0]))];
    for (const v of e.voices ?? []) {
      const vs = (voices[v] ??= { clips: 0, missing: 0, passed: 0, seconds: 0, tts: 0, listen: 0 });
      const c = voiceLogs[v]?.[id];
      if (!c) { vs.missing++; for (const u of uses) bucket(u).missing += 1 / uses.length; continue; }
      const { tts, listen } = clipCost(c);
      vs.clips++; vs.seconds += c.seconds ?? 0; vs.tts += tts; vs.listen += listen; if (c.check?.correct) vs.passed++;
      for (const u of uses) { const b = bucket(u); b.clips += 1 / uses.length; b.tts += tts / uses.length; b.listen += listen / uses.length; }
    }
  }
  const pictureCost = Object.values(pictures).reduce((a, p) => a + (p.cost ?? 0), 0);
  const priced = Object.values(pictures).filter((p) => p.cost != null).length;
  const narrTotal = Object.values(voices).reduce((a, v) => a + v.tts + v.listen, 0);

  let out = `## OpenRouter cost\n\n`;
  out += `| part | model | made | cost | how it is known |\n|---|---|---|---|---|\n`;
  out += `| Pictures | ${[...new Set(Object.values(pictures).map((p) => p.model).filter(Boolean))].join(", ")} | ${Object.keys(pictures).length} files (${priced} priced) | ${usd(pictureCost)} | logged per picture by pictures.py |\n`;
  const tts = Object.values(voices).reduce((a, v) => a + v.tts, 0), listen = Object.values(voices).reduce((a, v) => a + v.listen, 0);
  const clips = Object.values(voices).reduce((a, v) => a + v.clips, 0), secs = Object.values(voices).reduce((a, v) => a + v.seconds, 0);
  out += `| Narration | ${PRICE.tts.model} | ${clips} clips, ${(secs / 3600).toFixed(1)} h | about ${usd(tts)} | estimated from clip length, text and tries |\n`;
  out += `| Listening check | ${PRICE.listen.model} | ${clips} clips | about ${usd(listen)} | estimated the same way |\n`;
  out += `| **Total** | | | **about ${usd(pictureCost + narrTotal)}** | |\n\n`;
  out += `The logs keep only the latest version of each picture and clip, so remakes, voice pilots and failed runs are not in these figures; they are a lower bound. `;
  out += live
    ? `The key itself had spent ${usd(live.usage)} in total on ${live.checked} (${usd(live.usage_daily)} that day, ${usd(live.usage_weekly)} that week; ${live.limit == null ? "no limit" : `limit ${usd(live.limit)}`}). The key is shared with schoolido-learning authoring, so not all of that is Twist.\n\n`
    : `Run \`node tracking.mjs --live\` to add what the key has actually spent.\n\n`;

  out += `Per voice:\n\n| voice | clips | passed the check | missing | audio | cost |\n|---|---|---|---|---|---|\n`;
  for (const [v, s] of Object.entries(voices).sort()) out += `| ${v} | ${s.clips} | ${s.passed} (${pct(s.passed, s.clips)}) | ${s.missing} | ${(s.seconds / 60).toFixed(0)} min | ${usd(s.tts + s.listen)} |\n`;
  out += `\n`;

  // ---------- per curriculum ----------
  const projections = [], coverage = [];
  for (const cur of ["de-DE", "en-GB"]) {
    const c = load(`curricula/${cur}.yaml`), lang = c.language ?? (cur === "de-DE" ? "de" : "en");
    const subjects = c.subjects ?? {}, rows = placements(cur, subjects), sets = lessonSets(cur);
    const dom = (s) => s.split(".")[0], subj = (s) => subjects[dom(s)] ?? dom(s);
    const done = rows.filter((r) => sets.has(r.skill));
    const lessons = [...sets.values()].reduce((a, s) => a + s.lessons, 0), tasks = [...sets.values()].reduce((a, s) => a + s.tasks, 0);
    const curNarr = [...narr.entries()].filter(([k]) => k.startsWith(cur + "/")).reduce((a, [, b]) => ({ cost: a.cost + b.tts + b.listen, missing: a.missing + b.missing }), { cost: 0, missing: 0 });
    // Coverage per subject: skills with a lesson set, topics with every skill done, clips made of clips needed.
    const topicOf = (r) => `${subj(r.skill)}|${r.year}|${r.topic ?? topics.get(r.skill)?.[lang] ?? topics.get(r.skill)?.en ?? "(no topic)"}`;
    const cover = (rs) => {
      const tp = new Map();
      for (const r of rs) { const k = topicOf(r); tp.set(k, (tp.get(k) ?? true) && sets.has(r.skill)); }
      const b = rs.filter((r) => sets.has(r.skill)).map((r) => narr.get(`${cur}/${sets.get(r.skill).file.replace(/\.yaml$/, "")}`)).filter(Boolean);
      const made = b.reduce((a, x) => a + x.clips, 0), miss = b.reduce((a, x) => a + x.missing, 0);
      return { skills: [rs.filter((r) => sets.has(r.skill)).length, rs.length], lessons: rs.filter((r) => sets.has(r.skill)).reduce((a, r) => a + sets.get(r.skill).lessons, 0), topics: [[...tp.values()].filter(Boolean).length, tp.size], clips: [Math.round(made), Math.round(made + miss)] };
    };
    for (const s of [...new Set(rows.map((r) => subj(r.skill)))]) coverage.push({ cur, subject: s, ...cover(rows.filter((r) => subj(r.skill) === s)) });
    coverage.push({ cur, subject: "all", ...cover(rows) });

    out += `## ${cur}\n\n${done.length} of ${rows.length} placed skills drafted (${pct(done.length, rows.length)}): ${sets.size} lesson sets, ${lessons} lessons, ${tasks} tasks. Narration so far about ${usd(curNarr.cost)}; ${Math.round(curNarr.missing)} clips still to make.\n\n`;

    // Year by subject.
    const years = [...new Set(rows.map((r) => r.year))], subs = [...new Set(rows.map((r) => subj(r.skill)))];
    out += `| year | ${subs.join(" | ")} | all |\n|---|${subs.map(() => "---").join("|")}|---|\n`;
    for (const y of years) {
      const yr = rows.filter((r) => r.year === y);
      out += `| ${y} | ${subs.map((s) => { const x = yr.filter((r) => subj(r.skill) === s); return x.length ? `${x.filter((r) => sets.has(r.skill)).length} / ${x.length}` : ""; }).join(" | ")} | ${yr.filter((r) => sets.has(r.skill)).length} / ${yr.length} |\n`;
    }
    out += `\nTopics, in placement order. A topic is done when every skill in it has a lesson set.\n\n`;
    out += `| year | subject | topic | skills drafted | lessons | narration |\n|---|---|---|---|---|---|\n`;
    for (const y of years) {
      const groups = new Map();
      for (const r of rows.filter((r) => r.year === y)) {
        const name = r.topic ?? topics.get(r.skill)?.[lang] ?? topics.get(r.skill)?.en ?? "(no topic)";
        const k = `${subj(r.skill)}|${name}`;
        if (!groups.has(k)) groups.set(k, []);
        groups.get(k).push(r.skill);
      }
      for (const [k, skills] of groups) {
        const [s, name] = k.split("|"), d = skills.filter((x) => sets.has(x));
        const nl = d.reduce((a, x) => a + sets.get(x).lessons, 0);
        const cost = d.reduce((a, x) => { const b = narr.get(`${cur}/${sets.get(x).file.replace(/\.yaml$/, "")}`); return a + (b ? b.tts + b.listen : 0); }, 0);
        const mark = d.length === skills.length ? "done" : d.length ? "started" : "";
        out += `| ${y} | ${s} | ${name} | ${d.length} / ${skills.length}${mark ? ` ${mark}` : ""} | ${nl || ""} | ${cost ? usd(cost) : ""} |\n`;
      }
    }
    out += `\n`;
    // Clips still missing count at the average clip cost, so a half-voiced curriculum is not cheap by accident.
    const perSet = sets.size ? (curNarr.cost + curNarr.missing * (narrTotal / Math.max(clips, 1))) / sets.size : 0;
    projections.push({ cur, left: rows.length - done.length, perSet });
  }

  // ---------- what is left ----------
  const drawnObjects = objects.filter((o) => o.status === "drawn").length;
  out += `## Still to generate\n\n`;
  out += `| curriculum | skills without lessons | narration per lesson set | narration to finish, about |\n|---|---|---|---|\n`;
  for (const p of projections) out += `| ${p.cur} | ${p.left} | ${usd(p.perSet)} | ${usd(p.left * p.perSet)} |\n`;
  const avgPic = priced ? pictureCost / priced : 0;
  out += `\nPictures: ${drawnObjects} of ${objects.length} bank objects drawn, about ${usd(avgPic)} each, so new pictures cost about ${usd(avgPic * 10)} per ten. The projection assumes later lesson sets need as much narration as the ones so far, counting clips not yet made at the average clip cost.\n`;

  // ---------- coverage, at the top ----------
  const cell = ([a, b]) => `${pct(a, b)} (${a} / ${b})`;
  let top = `# Tracking\n\nGenerated by \`build.mjs\` (tracking.mjs) from the records and the generation logs; do not edit. What each curriculum places per year, what is drafted, and what has been generated with OpenRouter and what it cost.\n\n`;
  top += `## Coverage\n\nSkills drafted: placed skills with a lesson set. Topics done: topics where every skill has one. Lessons: lessons written in those lesson sets. Narration made: clips made for the lesson sets drafted so far.\n\n`;
  top += `| curriculum | subject | skills drafted | topics done | lessons | narration made |\n|---|---|---|---|---|---|\n`;
  for (const c of coverage) {
    const b = c.subject === "all" ? (x) => `**${x}**` : (x) => x;
    top += `| ${b(c.cur)} | ${b(c.subject)} | ${b(cell(c.skills))} | ${b(cell(c.topics))} | ${b(String(c.lessons))} | ${b(cell(c.clips))} |\n`;
  }
  return top + `\n` + out;
}

async function liveUsage() {
  let k = process.env.OPENROUTER_API_KEY;
  const env = join(T, "../../schoolido-learning/.env");
  if (!k && existsSync(env)) k = (/^OPENROUTER_AUTHORING_API_KEY=["']?([^"'\n]+)/m.exec(readFileSync(env, "utf8")) ?? [])[1];
  if (!k) throw new Error("No OpenRouter key: set OPENROUTER_API_KEY.");
  const r = await fetch("https://openrouter.ai/api/v1/key", { headers: { Authorization: `Bearer ${k}` } });
  if (!r.ok) throw new Error(`OpenRouter answered ${r.status}`);
  const d = (await r.json()).data;
  const keep = { checked: new Date().toISOString().slice(0, 10), usage: d.usage, usage_daily: d.usage_daily, usage_weekly: d.usage_weekly, usage_monthly: d.usage_monthly, limit: d.limit };
  writeFileSync(join(T, COSTS), "# Written by tracking.mjs --live: what the OpenRouter key has spent, in US dollars.\n" + YAML.stringify(keep));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--live")) await liveUsage();
  writeFileSync(join(T, "views/tracking.md"), tracking());
  console.log("views/tracking.md");
}
