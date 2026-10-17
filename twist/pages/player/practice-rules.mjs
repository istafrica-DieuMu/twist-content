// Practice rules for the lesson player's Practice tab (twist/docs/practice.md
// and lesson-anatomy.md, Recaps). Plain functions with no DOM: node tests run
// them, the player inlines them (build.mjs drops the `export`s), and the app
// team can port them. Days are whole numbers counted from the pretend start.

export const BANDS = {
  "4-5": { recaps: [1, 4, 10], tasks: 10, recapTasks: 2 },
  "6-7": { recaps: [2, 7, 14], tasks: 14, recapTasks: 3 },
  "8-10": { recaps: [2, 7, 21], tasks: 16, recapTasks: 3 },
};
export const STATES = ["not_started", "learning", "practised", "can_do", "remembered", "needs_refresh"];
export const UPKEEP_DAYS = 60;
export const WINDOW = 0.8;

export function ageBand(ages) {
  const n = parseInt(String((ages ?? [])[0] ?? "8"), 10);
  return n <= 5 ? "4-5" : n <= 7 ? "6-7" : "8-10";
}

export function newChild({ curriculum, year, band }) {
  return { curriculum, year, band, today: 0, states: {}, seen: {}, lastCheck: {}, drills: {}, sessions: 0, lastSkill: null };
}

const blank = () => ({ state: "not_started", canDoDay: null, pos: 0, recaps: [], prev: null, rememberedDay: null, upkeepDone: false });
export const stateOf = (child, skill) => (child.states[skill] ??= blank());

export function setState(child, skill, state) {
  const s = stateOf(child, skill);
  s.state = state; s.prev = null; s.recaps = []; s.pos = 0; s.upkeepDone = false;
  s.canDoDay = ["can_do", "remembered", "needs_refresh"].includes(state) ? child.today : null;
  s.rememberedDay = state === "remembered" ? child.today : null;
  if (state === "needs_refresh") s.prev = "can_do";
}

export function nextRecap(child, skill) {
  const s = child.states[skill];
  if (!s || s.canDoDay == null) return null;
  const gaps = BANDS[child.band].recaps, last = s.recaps.at(-1);
  if (s.state === "needs_refresh") return { day: (last?.day ?? s.canDoDay ?? child.today) + 1, gap: 1, pos: s.pos, upkeep: false, refresh: true };
  if (s.state === "remembered") return s.upkeepDone ? null : { day: s.rememberedDay + UPKEEP_DAYS, gap: UPKEEP_DAYS, pos: gaps.length, upkeep: true, refresh: false };
  if (s.state !== "can_do") return null;
  const step = s.pos === 0 ? gaps[0] : gaps[s.pos] - gaps[s.pos - 1];
  const day = Math.max(s.canDoDay + gaps[s.pos], (last?.day ?? s.canDoDay) + step);
  return { day, gap: step, pos: s.pos, upkeep: false, refresh: false };
}

// A recap counts once 80% of its gap has passed.
export function recapCounts(child, skill, day) {
  const n = nextRecap(child, skill);
  return !!n && day >= n.day - (1 - WINDOW) * n.gap;
}

export function recordRecap(child, skill, pass, day) {
  const s = child.states[skill], n = nextRecap(child, skill);
  if (!s || !n) return "none";
  if (!recapCounts(child, skill, day)) return "early";
  const last = BANDS[child.band].recaps.length - 1;
  if (n.refresh) {
    s.recaps.push({ day, pass, pos: s.pos, refresh: true });
    // Restoring Remembers it after a failed upkeep counts as the upkeep done.
    if (pass) { if (s.prev === "remembered") s.upkeepDone = true; s.state = s.prev ?? "can_do"; s.prev = null; }
    return "counted";
  }
  if (n.upkeep) {
    s.recaps.push({ day, pass, pos: n.pos, upkeep: true });
    if (pass) s.upkeepDone = true; else { s.prev = "remembered"; s.state = "needs_refresh"; }
    return "counted";
  }
  s.recaps.push({ day, pass, pos: s.pos });
  if (!pass) { s.prev = s.state; s.state = "needs_refresh"; return "counted"; }
  const earlierPass = s.recaps.some((r) => r.pass && !r.refresh && r.pos < last);
  if (s.pos === last && earlierPass) { s.state = "remembered"; s.rememberedDay = day; }
  else s.pos = Math.min(s.pos + 1, last);
  return "counted";
}

export function recapsDue(child) {
  return Object.keys(child.states)
    .map((k) => [k, nextRecap(child, k)])
    .filter(([k, n]) => n && recapCounts(child, k, child.today))
    .sort((a, b) => a[1].day - b[1].day)
    .map(([k]) => k);
}

// ---------- content: pools per skill ----------

export const taskKey = (setId, n, taskId) => `${setId}#${n}#${taskId}`;

export function pools(set) {
  const p = { full: [], some: [], none: [], check: [], skillCheck: [] };
  for (const l of set.lessons) for (const a of l.activities) {
    if (a.activity === "practise") for (const st of a.stages ?? []) for (const t of st.tasks ?? [])
      p[st.support]?.push({ key: taskKey(set.id, l.n, t.id), set: set.id, lesson: l.n, task: t, stage: st.support });
    if (a.activity === "check") for (const t of a.tasks ?? []) {
      const e = { key: taskKey(set.id, l.n, t.id), set: set.id, lesson: l.n, task: t, stage: "check" };
      p.check.push(e);
      if (a.size === "skill" || a.size === "timed") p.skillCheck.push(e.key);
    }
  }
  return p;
}

export function indexContent(sets, drills, curriculum) {
  const mine = sets.filter((s) => s.id.startsWith(curriculum + "."));
  const bySkill = {}, topics = new Map();
  for (const s of mine) {
    bySkill[s.skill] = { set: s, pools: pools(s) };
    const subject = s.id.split(".")[1], name = s.topic ?? { de: "", en: "" };
    const key = `${subject}|${name.en ?? name.de}`;
    if (!topics.has(key)) topics.set(key, { key, subject, name, skills: [] });
    topics.get(key).skills.push(s.skill);
  }
  const myDrills = Object.fromEntries(Object.entries(drills).filter(([k]) => bySkill[k]));
  return { curriculum, sets: mine, bySkill, drills: myDrills, topics: [...topics.values()], subjects: [...new Set(mine.map((s) => s.id.split(".")[1]))] };
}

// ---------- picking ----------

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const shuffle = (xs, rng) => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Least recently seen first (never seen counts as oldest); ties in random order.
function leastRecent(entries, child, rng, exclude = new Set()) {
  return shuffle(entries.filter((e) => !exclude.has(e.key)), rng)
    .sort((a, b) => (child.seen[a.key] ?? -Infinity) - (child.seen[b.key] ?? -Infinity));
}
const seenText = (child, e) => (child.seen[e.key] == null ? "never seen" : `last seen on day ${child.seen[e.key]}`);

// Take n entries from the pools in the order given, falling back to the next
// pool when one runs out; never the same task twice.
function take(child, entry, order, n, rng, exclude) {
  const out = [], used = new Set(exclude);
  for (const stage of order) {
    for (const e of leastRecent(entry.pools[stage], child, rng, used)) { if (out.length >= n) break; out.push(e); used.add(e.key); }
    if (out.length >= n) break;
  }
  return out;
}

export const tasksForMinutes = (m) => Math.round(m * 1.5);

export function interleave(groups) {
  const qs = groups.map((g) => [...g]).filter((g) => g.length), out = [];
  while (qs.some((q) => q.length)) for (const q of qs) if (q.length) out.push(q.shift());
  return out;
}

export function requeue(items, i) {
  if (items[i].again || items.some((x, j) => j !== i && x.again && x.key === items[i].key)) return items;
  return [...items, { ...items[i], again: true, why: items[i].why + "; missed on the first try, so it comes back once" }];
}

const STAGE_WORDS = { full: "full-help stage", some: "some-help stage", none: "no-help stage", check: "check task" };
const item = (child, skill, e, mode, recap, why) => ({ key: e.key, skill, set: e.set, lesson: e.lesson, stage: e.stage, task: e.task, mode, recap, why: `${why}; ${STAGE_WORDS[e.stage]}; ${seenText(child, e)}` });

export function buildSession({ kind, child, index, skills = [], minutes = null, rng = Math.random }) {
  const band = BANDS[child.band], length = minutes && kind !== "drill" ? tasksForMinutes(minutes) : band.tasks;
  const known = skills.filter((k) => index.bySkill[k]);
  const lastCheck = (k) => new Set(child.lastCheck[k] ?? []);
  if (kind === "recaps") {
    // At most as many skills as fit the session length; the rest stay due.
    const due = (known.length ? known : recapsDue(child)).filter((k) => index.bySkill[k]).slice(0, Math.max(1, Math.floor(length / band.recapTasks)));
    const groups = due.map((k) => take(child, index.bySkill[k], ["none", "check", "some", "full"], band.recapTasks, rng, lastCheck(k))
      .map((e) => item(child, k, e, "none", true, `recap of ${k} is due`)));
    return { kind, skills: due, mode: "none", items: interleave(groups).slice(0, Math.max(length, groups.length * band.recapTasks)), seconds: null, minutes };
  }
  if (kind === "drill") {
    const k = known[0], bank = index.drills[k], lang = index.bySkill[k].set.language;
    const weak = child.drills[k]?.weak ?? {}, id = (it) => String(it.q ?? it.word);
    const order = shuffle(bank.items, rng).sort((a, b) => (weak[id(b)] ?? 0) - (weak[id(a)] ?? 0));
    const formats = bank.formats.filter((f) => f !== "timed"), n = Math.max(20, (minutes ?? 2) * 30);
    const items = Array.from({ length: n }, (_, i) => {
      const it = order[i % order.length], format = formats[i % formats.length];
      return { key: `drill#${k}#${id(it)}#${i}`, skill: k, set: index.bySkill[k].set.id, lesson: null, stage: "drill", mode: "none", recap: false,
        task: drillTask(it, format, bank, lang, index.curriculum, rng), drill: { ...it, format },
        why: `drill bank ${k}; format ${format}; ${weak[id(it)] ? `missed or slow ${weak[id(it)]} times, so it comes early` : "random order"}` };
    });
    return { kind, skills: [k], mode: "none", items, seconds: bank.seconds?.[child.band] ?? null, minutes: minutes ?? 2 };
  }
  const order = { "catch-up": ["full", "some", "none", "check"], skill: ["full", "some", "none"], review: ["none", "check", "some", "full"], mixed: ["full", "some", "none", "check"] }[kind];
  const mode = kind === "catch-up" ? "catch" : "none";
  const per = Math.ceil(length / Math.max(1, known.length));
  const groups = known.map((k) => {
    const e = index.bySkill[k];
    // Skill practice and catch-up climb the stages: a third of the tasks from each.
    const picked = kind === "skill" || kind === "catch-up"
      ? order.slice(0, 3).flatMap((st, i) => take(child, e, [st], Math.ceil(per / 3) + (i === 2 ? per : 0), rng, lastCheck(k)).slice(0, i === 2 ? per : Math.ceil(per / 3)))
      : take(child, e, order, per, rng, lastCheck(k));
    const uniq = [], seen = new Set(); for (const x of picked) if (!seen.has(x.key)) { seen.add(x.key); uniq.push(x); }
    const fill = uniq.length < per ? take(child, e, order, per, rng, new Set([...lastCheck(k), ...seen])).slice(0, per - uniq.length) : [];
    return [...uniq, ...fill].slice(0, per).map((x) => item(child, k, x, mode, false, `${kind} of ${k}`));
  });
  let items = known.length > 1 ? interleave(groups) : groups[0] ?? [];
  if (kind === "skill" || kind === "catch-up") items = items.sort((a, b) => ["full", "some", "none", "check"].indexOf(a.stage) - ["full", "some", "none", "check"].indexOf(b.stage));
  return { kind, skills: known, mode, items: items.slice(0, length), seconds: null, minutes };
}

// ---------- drill tasks ----------

const SIGNS = { "de-DE": [["×", "·"], ["÷", ":"]] };
const signs = (q, cur) => (SIGNS[cur] ?? []).reduce((s, [a, b]) => s.split(a).join(b), q);
const DRILL_TXT = {
  de: { hear: "Welches Wort hörst du?", read: "Lies schnell!", write: "Schreib das Wort." },
  en: { hear: "Which word do you hear?", read: "Read it quickly!", write: "Write the word." },
};

export function drillTask(it, format, bank, lang, curriculum, rng) {
  const L = DRILL_TXT[lang] ?? DRILL_TXT.en;
  const base = { id: `drill-${it.q ?? it.word}`, hints: [], _prompt: [], _target: null, _hints: [], _feedback: {} };
  if (it.q != null) {
    const text = `${signs(String(it.q), curriculum)} = _`, a = String(it.a);
    if (format === "choose") {
      const near = [...new Set([...bank.items.map((x) => String(x.a)), String(+it.a + 1), String(Math.max(0, +it.a - 1))])].filter((x) => x !== a);
      const opts = shuffle([a, ...shuffle(near, rng).slice(0, 2)], rng);
      return { ...base, type: "multiple_choice", text, options: opts, answer: a };
    }
    return { ...base, type: "text_input", text, answer: a, keyboard: "digits" };
  }
  const w = String(it.word), gap = it.sentence.replace(new RegExp(`(^|[^\\p{L}])${w}(?=[^\\p{L}]|$)`, "giu"), `$1___`);
  if (format === "say" || format === "type") return { ...base, type: "text_input", text: `${L.write}\n${gap}`, answer: w, keyboard: "letters", _sayWord: w };
  const others = shuffle(bank.items.filter((x) => x.word && x.word !== w).map((x) => String(x.word)), rng).slice(0, 2);
  const options = shuffle([w, ...others], rng);
  if (format === "flash") return { ...base, type: "multiple_choice", text: L.read, options, answer: w, _flashWord: w };
  return { ...base, type: "multiple_choice", text: L.hear, options, answer: w, _sayWord: w };
}

// ---------- scoring ----------

const RIGHT = new Set(["first", "second", "helped"]);

export function scoreSession(session, results) {
  const perSkill = {}; let right = 0, firstTry = 0, ms = 0;
  session.items.forEach((it, i) => {
    const r = results[i]; if (!r) return;
    const p = (perSkill[it.skill] ??= { right: 0, firstTry: 0, total: 0 });
    p.total++; ms += r.ms ?? 0;
    if (RIGHT.has(r.outcome)) { right++; p.right++; }
    if (r.outcome === "first") { firstTry++; p.firstTry++; }
  });
  const total = results.filter(Boolean).length;
  return { right, firstTry, total, perSkill, perMinute: session.kind === "drill" && ms ? Math.round((firstTry / ms) * 60000) : null };
}

export function applySession(child, session, results, finished = true) {
  const out = { recaps: {}, record: false };
  session.items.forEach((it, i) => { if (results[i] && it.lesson != null) child.seen[it.key] = child.today; });
  if (session.kind === "recaps") {
    for (const k of session.skills) {
      const mine = session.items.map((it, i) => [it, results[i]]).filter(([it]) => it.skill === k && !it.again);
      // A recap counts only when all its tasks were answered; a session left early leaves it due.
      if (!mine.length || mine.some(([, r]) => !r)) continue;
      const rs = mine;
      const firsts = rs.filter(([, r]) => r.outcome === "first").length;
      out.recaps[k] = recordRecap(child, k, firsts >= 2, child.today);
    }
  }
  if (session.kind === "drill") {
    const k = session.skills[0], d = (child.drills[k] ??= { best: 0, weak: {} }), limit = (session.seconds ?? 8) * 1000;
    // An item missed or slow at least once this session gets weaker; one
    // answered right and fast every time this session gets a little stronger.
    const bad = {}, seen = new Set();
    session.items.forEach((it, i) => {
      const r = results[i]; if (!r) return; const id = String(it.drill.q ?? it.drill.word);
      seen.add(id); if (r.outcome !== "first" || r.ms > limit) bad[id] = true;
    });
    for (const id of seen) d.weak[id] = bad[id] ? (d.weak[id] ?? 0) + 1 : Math.max(0, (d.weak[id] ?? 0) - 1);
    const rate = scoreSession(session, results).perMinute ?? 0;
    if (rate > d.best) { d.best = rate; out.record = true; }
  }
  if (finished && session.items.length && (session.kind === "drill" || session.items.every((_, i) => results[i]))) child.sessions++;
  child.lastSkill = session.skills.at(-1) ?? child.lastSkill;
  return out;
}

// ---------- suggestions ----------

export function suggestions(child, index) {
  const cards = [], has = (k) => !!index.bySkill[k];
  const due = recapsDue(child).filter(has);
  if (due.length) cards.push({ kind: "recaps", skills: due, reason: { de: `${due.length} ${due.length === 1 ? "Sache" : "Sachen"} zum Wiederholen`, en: `${due.length} ${due.length === 1 ? "skill" : "skills"} to remember` } });
  const weak = Object.entries(child.states).filter(([k, s]) => has(k) && (s.state === "needs_refresh" || s.state === "practised"))
    .sort(([, a], [, b]) => (a.state === "needs_refresh" ? 0 : 1) - (b.state === "needs_refresh" ? 0 : 1));
  if (weak.length) { const [k, s] = weak[0]; cards.push({ kind: "catch-up", skills: [k], reason: s.state === "needs_refresh" ? { de: "Das üben wir nochmal", en: "Let's practise this again" } : { de: "Fast geschafft: übe es noch einmal", en: "Nearly there: practise it once more" } }); }
  const drillSkills = Object.keys(index.drills);
  const started = drillSkills.find((k) => child.drills[k]) ?? drillSkills.find((k) => ["learning", "practised", "can_do", "remembered"].includes(child.states[k]?.state)) ?? drillSkills[0];
  if (started) cards.push({ kind: "drill", skills: [started], reason: child.drills[started]?.best ? { de: `Schlag deinen Rekord: ${child.drills[started].best} pro Minute`, en: `Beat your record: ${child.drills[started].best} a minute` } : { de: "Schnell rechnen und lesen", en: "Quick-fire practice" } });
  if (cards.length < 3) {
    const k = child.lastSkill && has(child.lastSkill) ? child.lastSkill : index.sets[0]?.skill;
    const topic = index.topics.find((t) => t.skills.includes(k));
    if (topic) cards.push({ kind: "review", skills: topic.skills, topic: topic.key, reason: { de: `Wiederholen: ${topic.name.de}`, en: `Review: ${topic.name.en}` } });
  }
  return cards.slice(0, 3);
}

// ---------- typed requests ----------

const SUBJECT_WORDS = { math: ["mathe", "maths", "math", "rechnen"], "lit-de": ["deutsch"], "lit-en": ["english"], fl: ["englisch", "french", "französisch"] };
// Walked in this order, so "Blitzlesen wiederholen" is a review, not a drill.
const KIND_WORDS = {
  review: ["wiederholen", "wiederholung", "review", "revise"],
  "catch-up": ["nachholen", "catch up", "catch-up", "nochmal"],
  drill: ["einmaleins", "times table", "times tables", "blitzlesen", "schnell", "quick", "drill"],
};

export function parseRequest(text, index) {
  const t = ` ${String(text).toLowerCase()} `, filters = {}, understood = [];
  const m = t.match(/(\d+)\s*(min|minuten|minutes|mins)\b/);
  if (m) { filters.minutes = +m[1]; understood.push(m[0].trim()); }
  for (const [subject, words] of Object.entries(SUBJECT_WORDS)) {
    const w = words.find((x) => t.includes(x));
    if (w && index.subjects.includes(subject)) { filters.subject = subject; understood.push(w); break; }
  }
  for (const [kind, words] of Object.entries(KIND_WORDS)) {
    const w = words.find((x) => t.includes(x));
    if (w) { filters.kind = kind; understood.push(w); break; }
  }
  // A table number: "mit 7", "the 7s", "7er", "table 7"
  const n = t.match(/\bmit (\d+)\b(?!\s*(?:min|minuten|minutes|mins)\b)|\bthe (\d+)s\b|\b(\d+)er\b|\btables? (\d+)\b/);
  if (n) {
    const num = n.slice(1).find(Boolean);
    const hits = Object.keys(index.drills).filter((k) => new RegExp(`table(-\\d+)*-${num}(-|$)`).test(k));
    const all = hits.length ? hits : Object.keys(index.bySkill).filter((k) => new RegExp(`table(-\\d+)*-${num}(-|$)`).test(k));
    if (all.length) { filters.skills = all; filters.subject = "math"; understood.push(n[0].trim()); }
  }
  if (filters.kind === "drill" && !filters.skills && /einmaleins|times table/.test(t)) filters.subject = "math";
  const topics = index.topics.filter((tp) => [tp.name.de, tp.name.en].some((x) => x && x.length >= 4 && t.includes(x.toLowerCase())));
  if (topics.length) { filters.topics = topics.map((x) => x.key); understood.push(...topics.map((x) => x.name.de)); if (!filters.subject) filters.subject = topics[0].subject; }
  const once = understood.filter((w, i) => understood.findIndex((x) => x.toLowerCase() === w.toLowerCase()) === i);
  return { filters, understood: once, unknown: Object.keys(filters).length === 0 };
}
