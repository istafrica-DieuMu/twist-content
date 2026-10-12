// Checks lesson records against the lesson anatomy (docs/lesson-anatomy.md)
// and the asset bank (assets/), and builds the lessons and assets views.
// Called by build.mjs; returns nothing, reports through err() and warn().
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import YAML from "yaml";

const TASK_TYPES = new Set(["audio_choice", "clock_hands_drag", "drag_and_drop_count", "drag_and_drop", "fill_in_blank", "highlight_in_text", "image_multiple_choice", "matching", "multi_select", "multiple_choice", "ordering", "pick_side", "point_on_line", "sorting", "speak", "tap_to_count", "text_input", "tracing", "true_false"]);
const ACTIVITY = {
  "warm-up": { from: ["earlier-skills", "last-lesson"] },
  learn: { mode: ["worked-examples", "demonstration", "model-text", "new-sound", "new-word", "do-it-with-me"] },
  practise: { support: ["full", "some", "none"], setting: ["plain", "in-context"] },
  check: { size: ["quick", "skill", "timed"] },
};
const TASKS_PER_LESSON = { "4-5": [6, 12], "6-7": [8, 16], "8-10": [12, 25] };
// Task types whose support is built in (the trace guide), so they take no text hints.
const SELF_SUPPORTED = new Set(["tracing"]);

export function checkLessons({ T, steps, profiles, err, warn }) {
  const walk = (d) => (existsSync(d) ? readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);
  const read = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));

  // ---- asset bank ----
  const objects = new Map((read("assets/objects.yaml").objects ?? []).map((o) => [o.id, o]));
  const drawn = new Map((read("assets/drawn.yaml").components ?? []).map((o) => [o.id, o]));
  const characters = new Map((read("assets/characters.yaml").characters ?? []).map((o) => [o.id, o]));
  const sounds = new Map((read("assets/sounds.yaml").sounds ?? []).map((o) => [o.id, o]));
  for (const [id, o] of objects) {
    for (const k of ["category", "labels", "initial", "syllables", "status"]) if (o[k] === undefined) err(`assets/objects.yaml: ${id} has no ${k}`);
    if (!/^[a-z0-9-]+$/.test(id)) err(`assets/objects.yaml: id ${id} must be lowercase English`);
  }
  const used = { object: new Map(), drawn: new Map(), character: new Map(), sound: new Map() };
  const use = (kind, id, where) => { if (!used[kind].has(id)) used[kind].set(id, new Set()); used[kind].get(id).add(where); };

  // Walk any value for asset references.
  const refs = (v, where, file) => {
    if (Array.isArray(v)) return v.forEach((x) => refs(x, where, file));
    if (!v || typeof v !== "object") return;
    if (v.object !== undefined) {
      const o = objects.get(v.object);
      if (!o) err(`${file}: ${where}: unknown object ${v.object}`);
      else if (v.colour && !o.colour_slot) err(`${file}: ${where}: object ${v.object} has no colour slot, so it cannot be shown in ${v.colour}`);
      use("object", v.object, file);
    }
    if (v.drawn !== undefined) { if (!drawn.has(v.drawn)) err(`${file}: ${where}: unknown drawn component ${v.drawn}`); use("drawn", v.drawn, file); }
    if (v.character !== undefined) { if (!characters.has(v.character)) err(`${file}: ${where}: unknown character ${v.character}`); use("character", v.character, file); }
    if (v.sound !== undefined) { if (!sounds.has(v.sound)) err(`${file}: ${where}: unknown sound ${v.sound}`); use("sound", v.sound, file); }
    for (const [k, x] of Object.entries(v)) if (typeof x === "object") refs(x, where, file);
  };

  // ---- lessons ----
  const sets = [];
  const ids = new Set();
  for (const p of walk(join(T, "lessons")).filter((p) => p.endsWith(".yaml"))) {
    const file = relative(T, p);
    let d;
    try { d = YAML.parse(readFileSync(p, "utf8")); } catch (e) { err(`${file}: YAML error: ${e.message.split("\n")[0]}`); continue; }
    if (!d?.id) { err(`${file}: missing id`); continue; }
    if (ids.has(d.id)) err(`${file}: duplicate lesson set id ${d.id}`);
    ids.add(d.id);
    const md = d.metadata ?? {};
    const skill = steps.get(d.skill);
    if (!skill) err(`${file}: unknown skill ${d.skill}`);
    const cur = profiles.find((pr) => pr.curriculum === d.curriculum);
    if (!cur) err(`${file}: unknown curriculum ${d.curriculum}`);
    else if (skill) {
      const placed = cur.rows.find((r) => r.id === d.skill);
      if (!placed) err(`${file}: ${d.skill} is not placed in ${d.curriculum}`);
      else if (md.year !== placed.stage) err(`${file}: metadata.year is ${md.year} but ${d.curriculum} places the skill in ${placed.stage}`);
    }
    for (const k of ["year", "topic", "ages", "lesson_minutes", "builds_on", "forms", "misconceptions", "status", "version"]) if (md[k] === undefined) err(`${file}: metadata has no ${k}`);
    if (!d.title?.de || !d.title?.en) err(`${file}: title needs de and en`);
    const xt = Object.keys(d.title ?? {}).filter((k) => !["de", "en", "fr"].includes(k));
    if (xt.length) err(`${file}: title has unexpected keys (${xt.join(", ")}); quote titles that contain commas`);
    if (!d.summary) err(`${file}: no summary`);
    if (skill) {
      // Anything the skill builds on, directly or through its prerequisites.
      const pre = new Set();
      const climb = (id) => { const s = steps.get(id); for (const r of [...(s?.prerequisites?.hard ?? []), ...(s?.prerequisites?.soft ?? [])]) if (!pre.has(r)) { pre.add(r); climb(r); } };
      climb(d.skill);
      for (const b of md.builds_on ?? []) { if (!steps.has(b)) err(`${file}: builds_on names unknown skill ${b}`); else if (!pre.has(b)) warn(`${file}: builds_on ${b} is not a prerequisite of ${d.skill}`); }
    }
    for (const a of md.also_practises ?? []) if (!steps.has(a)) err(`${file}: also_practises names unknown skill ${a}`);
    const lessons = d.lessons ?? [];
    if (lessons.length < 2 || lessons.length > 6) warn(`${file}: ${lessons.length} lessons; a skill usually has 2 to 6`);
    const taskIds = new Set();
    const nonCheck = new Map();
    const checkTasks = [];
    const summary = [];
    lessons.forEach((l, i) => {
      const lw = `lesson ${l.n}`;
      if (l.n !== i + 1) err(`${file}: lessons must be numbered 1, 2, 3 ...; found ${l.n} at position ${i + 1}`);
      if (!l.title?.de || !l.title?.en) err(`${file}: ${lw} title needs de and en`);
      const extra = Object.keys(l.title ?? {}).filter((k) => !["de", "en", "fr"].includes(k));
      if (extra.length) err(`${file}: ${lw} title has unexpected keys (${extra.join(", ")}); quote titles that contain commas`);
      if (typeof l.new_content !== "boolean") err(`${file}: ${lw} needs new_content: true or false`);
      if (i === 0 && l.new_content === false) warn(`${file}: lesson 1 has no new content`);
      const acts = l.activities ?? [];
      // Rule 1: anything new gets a Learn before the first Practise.
      const firstLearn = acts.findIndex((a) => a.activity === "learn");
      const firstPractise = acts.findIndex((a) => a.activity === "practise");
      if (l.new_content && (firstLearn < 0 || (firstPractise >= 0 && firstLearn > firstPractise))) err(`${file}: ${lw} has new content but no Learn before its first Practise`);
      if (!l.new_content && firstLearn >= 0) warn(`${file}: ${lw} has a Learn but new_content is false`);
      // Rule 2: the last lesson ends with a skill check; skill checks only there.
      const last = acts[acts.length - 1];
      if (i === lessons.length - 1 && !(last?.activity === "check" && ["skill", "timed"].includes(last.size))) err(`${file}: the last lesson must end with a skill check`);
      acts.forEach((a, j) => { if (a.activity === "check" && ["skill", "timed"].includes(a.size) && (i < lessons.length - 1 || j < acts.length - 1)) err(`${file}: ${lw}: a skill check belongs at the very end of the last lesson`); });
      // Ends on success: last activity is a check, a warm-up or a practise, never a learn.
      if (last?.activity === "learn") err(`${file}: ${lw} ends with Learn; a lesson ends on something the child does`);
      let count = 0;
      const seq = [];
      acts.forEach((a, j) => {
        const aw = `${lw} activity ${j + 1} (${a.activity})`;
        const spec = ACTIVITY[a.activity];
        if (!spec) { err(`${file}: ${aw}: unknown activity`); return; }
        for (const [k, values] of Object.entries(spec)) if (!values.includes(a[k])) err(`${file}: ${aw}: ${k} must be one of ${values.join(", ")}`);
        seq.push(a.activity === "practise" ? `practise (${a.support}${a.setting === "in-context" ? ", in context" : ""})` : a.activity === "check" ? `check (${a.size})` : a.activity);
        if (a.activity === "learn") { if (!a.screens?.length) err(`${file}: ${aw}: Learn needs screens`); refs(a.screens, aw, file); return; }
        if (!a.tasks?.length) err(`${file}: ${aw}: no tasks`);
        for (const t of a.tasks ?? []) {
          count++;
          const tw = `${aw} task ${t.id}`;
          if (taskIds.has(t.id)) err(`${file}: duplicate task id ${t.id}`);
          taskIds.add(t.id);
          if (!TASK_TYPES.has(t.type)) err(`${file}: ${tw}: unknown task type ${t.type}`);
          if (!t.text && !t.say) err(`${file}: ${tw}: needs text or say`);
          if (!["easy", "core", "stretch"].includes(t.difficulty)) err(`${file}: ${tw}: difficulty must be easy, core or stretch`);
          checkAnswer(t, tw, file, err);
          const hints = t.hints?.length ?? 0;
          if (a.activity === "practise" && a.support === "full" && hints !== 3 && !SELF_SUPPORTED.has(t.type)) err(`${file}: ${tw}: full support needs 3 hints, has ${hints}`);
          if (a.activity === "practise" && a.support === "some" && hints < 1) err(`${file}: ${tw}: some support needs a hint`);
          if ((a.activity === "check" || (a.activity === "practise" && a.support === "none")) && hints) err(`${file}: ${tw}: no hints allowed here`);
          if (d.metadata?.no_reading && typeof (t.options ?? [])[0] === "string" && !["audio_choice"].includes(t.type)) err(`${file}: ${tw}: no_reading lesson, but options are text`);
          if (d.metadata?.no_reading && t.type === "audio_choice" && typeof (t.options ?? [])[0] === "string") err(`${file}: ${tw}: no_reading lesson, but the child must read the options`);
          if (a.activity === "check" && ["skill", "timed"].includes(a.size) && t.type === "speak") warn(`${file}: ${tw}: speaking in a skill check; speech recognition for young children is not reliable enough to decide mastery`);
          refs(t, tw, file);
          const sig = JSON.stringify([t.type, t.text ?? t.say, t.answer, t.show ?? null, t.audio ?? null, t.options ?? null]);
          if (a.activity === "check") checkTasks.push([t.id, sig, a.size]); else nonCheck.set(sig, t.id);
        }
      });
      const age = (md.ages ?? [])[0];
      const [lo, hi] = TASKS_PER_LESSON[age] ?? [0, 99];
      if (count < lo || count > hi) warn(`${file}: ${lw} has ${count} tasks; ages ${age} usually ${lo} to ${hi}`);
      summary.push({ n: l.n, title: l.title, new: l.new_content, tasks: count, seq });
    });
    for (const [id, sig, size] of checkTasks) if (size !== "quick" && nonCheck.has(sig)) err(`${file}: skill check task ${id} repeats task ${nonCheck.get(sig)}`);
    // Metadata must match what the tasks actually use.
    const usedHere = { drawn: new Set(), sound: new Set() };
    const collect = (v) => { if (Array.isArray(v)) return v.forEach(collect); if (!v || typeof v !== "object") return; if (v.drawn) usedHere.drawn.add(v.drawn); if (v.sound) usedHere.sound.add(v.sound); Object.values(v).forEach((x) => typeof x === "object" && collect(x)); };
    collect(d.lessons);
    for (const [k, key] of [["drawn", "drawn"], ["sounds", "sound"]]) {
      const declared = new Set(md[k] ?? []);
      for (const x of declared) if (!usedHere[key].has(x)) warn(`${file}: metadata.${k} lists ${x}, which no task uses`);
      for (const x of usedHere[key]) if (!declared.has(x)) warn(`${file}: tasks use ${key} ${x}, missing from metadata.${k}`);
    }
    for (const x of md.drawn ?? []) if (!drawn.has(x)) err(`${file}: metadata.drawn names unknown component ${x}`);
    sets.push({ file, d, summary, typeMix: typeMix(lessons) });
  }
  return { sets, objects, drawn, characters, sounds, used };
}

function typeMix(lessons) {
  const m = {};
  for (const l of lessons) for (const a of l.activities ?? []) for (const t of a.tasks ?? []) m[t.type] = (m[t.type] ?? 0) + 1;
  return m;
}

function checkAnswer(t, tw, file, err) {
  const opt = (o) => (typeof o === "string" ? o : o.colour ?? o.object ?? o.drawn);
  const options = (t.options ?? []).map(opt);
  switch (t.type) {
    case "multiple_choice": case "audio_choice": case "image_multiple_choice":
      if (!options.length) err(`${file}: ${tw}: needs options`);
      else if (!options.includes(t.answer)) err(`${file}: ${tw}: answer ${t.answer} is not one of the options`);
      for (const k of Object.keys(t.feedback ?? {})) if (!options.includes(k) || k === t.answer) err(`${file}: ${tw}: feedback for ${k}, which is not a wrong option`);
      if (t.type === "audio_choice" && !t.audio) err(`${file}: ${tw}: audio_choice needs audio`);
      break;
    case "fill_in_blank": {
      const gaps = (t.frame ?? "").split("_").length - 1;
      if (!Array.isArray(t.answer) || t.answer.length !== gaps) err(`${file}: ${tw}: frame has ${gaps} gaps but answer has ${t.answer?.length ?? 0} parts`);
      for (const a of t.answer ?? []) if (!options.includes(a)) err(`${file}: ${tw}: answer part ${a} is not one of the options`);
      break;
    }
    case "true_false": if (typeof t.answer !== "boolean") err(`${file}: ${tw}: answer must be true or false`); break;
    case "text_input": case "point_on_line": case "drag_and_drop_count": case "tap_to_count":
      if (t.answer === undefined) err(`${file}: ${tw}: needs an answer`);
      if (t.type === "drag_and_drop_count" && !(t.answer <= t.total_items)) err(`${file}: ${tw}: answer is more than total_items`);
      break;
    case "tracing": if (!t.char) err(`${file}: ${tw}: tracing needs char`); break;
    case "speak": if (!t.expected_text) err(`${file}: ${tw}: speak needs expected_text`); break;
    case "highlight_in_text": if (!t.spans) err(`${file}: ${tw}: highlight_in_text needs spans`); break;
  }
}
