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
  return { curriculum, year, band, today: 0, states: {}, seen: {}, lastCheck: {}, drills: {}, sessions: 0, lastSkill: null, log: [], active: [], lessons: {} };
}

// ---------- the app around practice (rewards.md) ----------

export const BEE = [10, 50, 100, 250, 500, 1000];
// The Busy Bee badge: its level from finished practice sessions, and the way to the next.
export function busyBee(sessions) {
  const level = BEE.filter((n) => sessions >= n).length, next = BEE[level] ?? null;
  return { level, from: level ? BEE[level - 1] : 0, next, toGo: next == null ? 0 : next - sessions };
}

export const STREAK = [[5, "spark"], [10, "flame"], [20, "campfire"], [40, "torch"], [60, "comet"], [100, "volcano"], [190, "sun"], [380, "supernova"]];
const schoolDay = (d) => ((d % 7) + 7) % 7 < 5; // the pretend day 0 is a Monday
export function markActive(child, day = child.today) {
  const a = (child.active ??= []);
  if (!a.includes(day)) { a.push(day); a.sort((x, y) => x - y); }
}
// School days in a row with a lesson or session finished. Weekends neither
// break nor add; today not played yet keeps the streak alive.
export function streak(child) {
  const act = new Set(child.active ?? []);
  let current = 0;
  for (let d = child.today; d >= 0; d--) { if (!schoolDay(d)) continue; if (act.has(d)) current++; else if (d !== child.today) break; }
  let best = current, run = 0;
  for (let d = 0; d <= child.today; d++) { if (!schoolDay(d)) continue; if (act.has(d)) best = Math.max(best, ++run); else if (d !== child.today) run = 0; }
  return { current, best, badges: STREAK.filter(([n]) => best >= n).map(([, id]) => id), next: STREAK.find(([n]) => n > best) ?? null };
}

// A lesson finished in the app: the first lesson starts the skill; a skill
// check decides Can do it or Practised, never taking a skill below where it is.
// Strand badges (rewards.md, Strand badges): one per strand and year, earned when
// every skill of the strand placed in the child's year is at Can do it; gold
// when all are at Remembers it. A skill's area is the middle part of its id.
export const STRANDS = [
  ["number-navigator", "math", ["numbers-to-20", "numbers-to-100", "numbers-to-1000", "large-numbers", "fractions", "decimals", "percentages-ratio"]],
  ["calculation-ace", "math", ["add-sub-to-20", "add-sub-to-100", "add-sub-to-1000", "mult-div", "mult-div-larger", "written-add-sub", "written-mult-div", "word-problems"]],
  ["shape-shifter", "math", ["shapes", "solids", "space", "symmetry", "angles", "coordinates"]],
  ["measure-master", "math", ["length", "mass-capacity", "time", "money", "area-volume"]],
  ["data-detective", "math", ["data", "chance"]],
  ["code-cracker", "math", ["patterns", "algebra"]],
  ["bookworm", "lit", ["phonological", "letters", "decoding", "fluency", "comprehension", "texts-media", "phonics", "word-reading", "texts"]],
  ["wordsmith", "lit", ["handwriting", "writing", "composition"]],
  ["spelling-wizard", "lit", ["spelling", "spelling-strategies"]],
  ["grammar-guardian", "lit", ["nouns", "verbs", "adjectives", "sentences", "vocabulary", "grammar"]],
  ["golden-mic", "lit", ["speaking"]],
  ["chatterbox", "fl", ["listening", "speaking"]],
  ["pen-pal", "fl", ["reading", "writing", "grammar"]],
  ["globetrotter", "fl", ["themes", "culture-strategies"]],
];
export const MEMORY = [1, 10, 25, 50, 100, 200, 300, 400];
const CAN = ["can_do", "remembered", "needs_refresh"];
// Every badge with where the child is on it. yearSkills maps a subject to the
// skills placed in the child's year (a foreign language by its learning year).
// Badges the preview can't tell yet (placement and end-of-year checks, recap
// weeks, later-year skills) come back as locked with no progress.
export function badges(child, yearSkills) {
  const st = (k) => child.states[k]?.state ?? "not_started", out = [];
  const subjs = Object.keys(yearSkills);
  for (const [id, group, areas] of STRANDS) {
    const subj = subjs.find((x) => (group === "lit" ? x.startsWith("lit-") : x === group));
    const ks = subj ? yearSkills[subj].filter((k) => areas.includes(k.split(".")[1])) : [];
    if (!ks.length) continue;
    const have = ks.filter((k) => CAN.includes(st(k))).length;
    out.push({ id, kind: "strand", subj, have, need: ks.length, earned: have === ks.length, gold: ks.every((k) => st(k) === "remembered") });
  }
  const all = Object.keys(child.states), can = all.filter((k) => CAN.includes(st(k))).length, rem = all.filter((k) => st(k) === "remembered").length;
  out.push({ id: "lift-off", kind: "milestone", have: Math.min(can, 1), need: 1, earned: can > 0 });
  const bySubj = subjs.filter((x) => out.some((b) => b.subj === x));
  out.push({ id: "hat-trick", kind: "milestone", have: bySubj.filter((x) => out.some((b) => b.subj === x && b.earned)).length, need: bySubj.length, earned: bySubj.length > 0 && bySubj.every((x) => out.some((b) => b.subj === x && b.earned)) });
  for (const id of ["pathfinder", "summit", "legend"]) out.push({ id, kind: "milestone", earned: false });
  const mem = MEMORY.filter((n) => rem >= n).length;
  out.push({ id: "elephant-memory", kind: "memory", level: mem, have: rem, need: MEMORY[mem] ?? null, earned: mem > 0 });
  for (const id of ["comeback-kid", "like-clockwork"]) out.push({ id, kind: "memory", earned: false });
  const sk = streak(child);
  for (const [n, id] of STREAK) out.push({ id, kind: "streak", have: Math.min(sk.best, n), need: n, earned: sk.best >= n });
  const bee = busyBee(child.sessions);
  out.push({ id: "busy-bee", kind: "effort", level: bee.level, have: child.sessions, need: bee.next, earned: bee.level > 0 });
  out.push({ id: "time-traveller", kind: "effort", earned: false });
  return out;
}

export function finishLesson(child, { setId, skill, n, check = null, score = null }) {
  (child.lessons ??= {})[setId] = Math.max(child.lessons[setId] ?? 0, n);
  // How the lesson's check went, the latest try: right first time of how many, and on a skill
  // check the parts with a miss. Study shows a lesson with a miss as not mastered yet.
  if (score) ((child.scores ??= {})[setId] ??= {})[n] = { right: score.right, total: score.total, missed: score.missed ?? [], day: child.today };
  child.last = { setId, n, day: child.today };
  const was = child.states[skill]?.state ?? "not_started";
  if (check) {
    recordCheck(child, skill, check.keys);
    if (check.pass && !["can_do", "remembered"].includes(was)) setState(child, skill, "can_do");
    if (!check.pass && ["not_started", "learning"].includes(was)) setState(child, skill, "practised");
  } else if (was === "not_started") setState(child, skill, "learning");
  markActive(child);
  const now = child.states[skill]?.state ?? was;
  logEvent(child, `lesson ${n} of ${setId} finished${check ? `, skill check ${check.pass ? "passed" : "not passed"}` : ""}${now !== was ? `; ${skill}: ${was} → ${now}` : ""}`);
}

// What happened to the child, newest last, for the time machine's history.
export function logEvent(child, text) {
  (child.log ??= []).push({ day: child.today, text });
  if (child.log.length > 300) child.log.splice(0, child.log.length - 300);
}

// The tasks of the child's last skill check; practice leaves them out so the
// next check stays fresh.
export function recordCheck(child, skill, keys) {
  child.lastCheck[skill] = [...keys];
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

// Every skill's next recap within `days`, soonest first.
export function upcoming(child, days = 60) {
  return Object.keys(child.states)
    .map((skill) => ({ skill, ...nextRecap(child, skill) }))
    .filter((n) => n.day != null && n.day <= child.today + days)
    .sort((a, b) => a.day - b.day || a.skill.localeCompare(b.skill))
    .map(({ skill, day, upkeep, refresh }) => ({ skill, day, kind: refresh ? "refresh" : upkeep ? "upkeep" : "recap" }));
}

// The first day, from today on, on which some recap counts; null if none is planned.
export function nextDueDay(child) {
  const days = Object.keys(child.states).map((k) => nextRecap(child, k)).filter(Boolean)
    .map((n) => Math.ceil(n.day - (1 - WINDOW) * n.gap - 1e-9));
  return days.length ? Math.max(child.today, Math.min(...days)) : null;
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

// Maths first, then the home language, then the foreign language.
const SUBJECT_ORDER = ["math", "lit-de", "lit-en", "fl"];
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
  // A foreign-language bank holds the words of every language taught; keep the one this curriculum teaches.
  const myDrills = Object.fromEntries(Object.entries(drills).filter(([k]) => bySkill[k]).map(([k, b]) => {
    const tl = bySkill[k].set.target_language;
    return [k, tl && b.items.some((it) => it.lang) ? { ...b, items: b.items.filter((it) => !it.lang || it.lang === tl) } : b];
  }));
  return { curriculum, sets: mine, bySkill, drills: myDrills, topics: [...topics.values()], subjects: [...new Set(mine.map((s) => s.id.split(".")[1]))].sort((a, b) => SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b)) };
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

export function buildSession({ kind, child, index, skills = [], minutes = null, tricky = false, focus = null, rng = Math.random }) {
  const band = BANDS[child.band], length = minutes && kind !== "drill" ? tasksForMinutes(minutes) : band.tasks;
  const known = skills.filter((k) => index.bySkill[k]);
  const lastCheck = (k) => new Set(child.lastCheck[k] ?? []);
  // While a skill's recap is due, the recap gets its no-help and check tasks
  // first: other sessions use them only when nothing else is left.
  const due = new Set(kind === "recaps" ? [] : recapsDue(child));
  const held = (k) => new Set(due.has(k) ? [...index.bySkill[k].pools.none, ...index.bySkill[k].pools.check].map((e) => e.key) : []);
  if (kind === "recaps") {
    // At most as many skills as fit the session length; the rest stay due.
    const due = (known.length ? known : recapsDue(child)).filter((k) => index.bySkill[k]).slice(0, Math.max(1, Math.floor(length / band.recapTasks)));
    const groups = due.map((k) => take(child, index.bySkill[k], ["none", "check", "some", "full"], band.recapTasks, rng, lastCheck(k))
      .map((e) => item(child, k, e, "none", true, `recap of ${k} is due`)));
    return { kind, skills: due, mode: "none", items: interleave(groups).slice(0, Math.max(length, groups.length * band.recapTasks)), seconds: null, minutes };
  }
  if (kind === "drill") {
    const k = known[0], bank = index.drills[k], lang = index.bySkill[k].set.language;
    const weak = child.drills[k]?.weak ?? {}, id = (it) => String(it.q ?? it.word), stats = child.drills[k]?.items ?? {};
    // A drill of the tricky ones plays only the items last missed or slow; a
    // focus plays only the items asked for. Either falls back to the whole bank.
    const picked = focus ? bank.items.filter((it) => focus.includes(id(it)))
      : tricky ? bank.items.filter((it) => ["miss", "slow"].includes(stats[id(it)]?.last)) : [];
    const order = shuffle(picked.length ? picked : bank.items, rng).sort((a, b) => (weak[id(b)] ?? 0) - (weak[id(a)] ?? 0));
    const formats = bank.formats.filter((f) => f !== "timed"), n = Math.max(20, (minutes ?? 2) * 30);
    const items = Array.from({ length: n }, (_, i) => {
      const it = order[i % order.length], format = formats[i % formats.length];
      return { key: `drill#${k}#${id(it)}#${i}`, skill: k, set: index.bySkill[k].set.id, lesson: null, stage: "drill", mode: "none", recap: false,
        task: drillTask(it, format, bank, lang, index.curriculum, rng), drill: { ...it, format },
        why: `drill bank ${k}; format ${format}; ${picked.length ? (focus ? "chosen on the drill map" : "missed or slow last time") : weak[id(it)] ? `missed or slow ${weak[id(it)]} times, so it comes early` : "random order"}` };
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
      ? order.slice(0, 3).flatMap((st, i) => take(child, e, [st], Math.ceil(per / 3) + (i === 2 ? per : 0), rng, new Set([...lastCheck(k), ...held(k)])).slice(0, i === 2 ? per : Math.ceil(per / 3)))
      : take(child, e, order, per, rng, new Set([...lastCheck(k), ...held(k)]));
    const uniq = [], seen = new Set(); for (const x of picked) if (!seen.has(x.key)) { seen.add(x.key); uniq.push(x); }
    const fill = uniq.length < per ? take(child, e, order, per, rng, new Set([...lastCheck(k), ...seen])).slice(0, per - uniq.length) : [];
    return [...uniq, ...fill].slice(0, per).map((x) => item(child, k, x, mode, false, `${kind} of ${k}${due.has(k) ? "; its recap is due, so its no-help and check tasks are kept for the recap" : ""}`));
  });
  let items = known.length > 1 ? interleave(groups) : groups[0] ?? [];
  if (kind === "skill" || kind === "catch-up") items = items.sort((a, b) => ["full", "some", "none", "check"].indexOf(a.stage) - ["full", "some", "none", "check"].indexOf(b.stage));
  return { kind, skills: known, mode, items: items.slice(0, length), seconds: null, minutes };
}

// ---------- check pools ----------

// One attempt at a check with `draw` (lesson-anatomy.md, "Check pools"):
// leave out the tasks of the child's last attempt while enough remain, take
// one task of every part first, fill up with the least recently seen, then
// shuffle. `seen` maps task id to the day it was last shown.
export function drawCheck(check, { last = [], seen = {}, rng = Math.random } = {}) {
  const tasks = check.tasks ?? [], n = check.draw ?? tasks.length;
  if (n >= tasks.length) return [...tasks];
  const prev = new Set(last), fresh = tasks.filter((t) => !prev.has(t.id));
  const from = fresh.length >= n ? fresh : tasks;
  const order = shuffle(from, rng).sort((a, b) => (seen[a.id] ?? -Infinity) - (seen[b.id] ?? -Infinity));
  const out = [];
  for (const part of shuffle([...new Set(order.map((t) => t.part).filter(Boolean))], rng)) {
    const t = order.find((x) => x.part === part && !out.includes(x));
    if (t && out.length < n) out.push(t);
  }
  for (const t of order) { if (out.length >= n) break; if (!out.includes(t)) out.push(t); }
  return shuffle(out, rng);
}

// ---------- drill tasks ----------

const SIGNS = { "de-DE": [["×", "·"], ["÷", ":"]] };
const signs = (q, cur) => (SIGNS[cur] ?? []).reduce((s, [a, b]) => s.split(a).join(b), q);
const DRILL_TXT = {
  de: { hear: "Welches Wort hörst du?", read: "Lies schnell!", write: "Schreib das Wort.", colour: "Welche Farbe hörst du?", number: "Welche Zahl hörst du?" },
  en: { hear: "Which word do you hear?", read: "Read it quickly!", write: "Write the word.", colour: "Which colour do you hear?", number: "Which number do you hear?" },
};

// Wrong answers a child could really give, closest first: for a times-table
// fact the neighbouring facts (7 × 8: 48, 64, 49, 63), then one or two away;
// for any other sum one or two away, then ten away. Never below zero.
export function nearMisses(it, items) {
  const a = +it.a, m = String(it.q).match(/^\s*(\d+)\s*([×x·*÷:+−-])\s*(\d+)\s*$/), out = [];
  if (m && "×x·*".includes(m[2])) { const [p, q] = [+m[1], +m[3]]; out.push((p - 1) * q, (p + 1) * q, p * (q - 1), p * (q + 1)); }
  out.push(a - 1, a + 1, a - 2, a + 2);
  if (m && "+−-".includes(m[2])) out.push(a - 10, a + 10);
  return [...new Set(out.filter((x) => x >= 0 && x !== a).map(String))];
}
// Words that look like the right one: a shared ending or beginning, a similar length.
function lookAlikes(w, words, rng) {
  const common = (x, y) => { let i = 0; while (i < x.length && i < y.length && x[i] === y[i]) i++; return i; };
  const rev = (x) => [...x].reverse().join("");
  const score = (x) => 2 * common(rev(w.toLowerCase()), rev(x.toLowerCase())) + 2 * common(w.toLowerCase(), x.toLowerCase()) - Math.abs(w.length - x.length);
  return shuffle([...new Set(words)].filter((x) => x !== w), rng).sort((x, y) => score(y) - score(x));
}

export function drillTask(it, format, bank, lang, curriculum, rng) {
  const L = DRILL_TXT[lang] ?? DRILL_TXT.en;
  // _phrase names the instruction's recording in phrases.yaml (drill_*), in the language of `lang`.
  const base = { id: `drill-${it.q ?? it.word}`, hints: [], _prompt: [], _target: null, _hints: [], _feedback: {}, _lang: lang };
  if (it.q != null) {
    const text = `${signs(String(it.q), curriculum)} = _`, a = String(it.a);
    if (format === "choose") {
      const near = nearMisses(it, bank.items);
      const opts = shuffle([a, ...shuffle(near.slice(0, 4), rng).slice(0, 2)], rng);
      return { ...base, type: "multiple_choice", text, options: opts, answer: a };
    }
    return { ...base, type: "text_input", text, answer: a, keyboard: "digits" };
  }
  // Words in reading and language banks have no example sentence; only a spelling task needs one.
  const w = String(it.word), gap = it.sentence ? it.sentence.replace(new RegExp(`(^|[^\\p{L}])${w}(?=[^\\p{L}]|$)`, "giu"), `$1___`) : w;
  if (format === "say" || format === "type") return { ...base, _phrase: "drill_write", type: "text_input", text: `${L.write}\n${gap}`, answer: w, keyboard: "letters", _sayWord: w, _sayLang: it.lang ?? lang, _clip: it._clip ?? null };
  const others = lookAlikes(w, bank.items.filter((x) => x.word && (x.lang ?? it.lang) === it.lang).map((x) => String(x.word)), rng).slice(0, 2);
  const options = shuffle([w, ...others], rng);
  if (format === "flash") return { ...base, _phrase: "drill_read", type: "multiple_choice", text: L.read, options, answer: w, _flashWord: w };
  // A word in the language being learnt is heard only: the child shows they
  // understood it by picking its colour or its digit, never by reading it.
  const say = { _sayWord: w, _sayLang: it.lang ?? lang, _clip: it._clip ?? null };
  const same = bank.items.filter((x) => (x.lang ?? it.lang) === it.lang && x.word !== w);
  if (format === "listen" && it.colour) {
    const opts = shuffle([it.colour, ...shuffle([...new Set(same.map((x) => x.colour).filter((c) => c && c !== it.colour))], rng).slice(0, 2)], rng);
    return { ...base, ...say, _phrase: "drill_colour", type: "multiple_choice", text: L.colour, options: opts, answer: it.colour, _swatches: true };
  }
  if (format === "listen" && it.digit != null) {
    const d = it.digit, near = [...new Set(same.map((x) => x.digit).filter((x) => x != null && x !== d))].sort((a, b) => Math.abs(a - d) - Math.abs(b - d));
    const opts = shuffle([String(d), ...shuffle(near.slice(0, 4), rng).slice(0, 2).map(String)], rng);
    return { ...base, ...say, _phrase: "drill_number", type: "multiple_choice", text: L.number, options: opts, answer: String(d) };
  }
  return { ...base, ...say, _phrase: "drill_hear", type: "multiple_choice", text: L.hear, options, answer: w };
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
  const before = Object.fromEntries(session.skills.map((k) => [k, child.states[k]?.state ?? "not_started"]));
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
    // Per item for the drill map: times seen, right first time, and how the last try went.
    d.items ??= {};
    session.items.forEach((it, i) => {
      const r = results[i]; if (!r) return; const id = String(it.drill.q ?? it.drill.word), s = (d.items[id] ??= { n: 0, ok: 0, last: "unseen", day: 0 });
      s.n++; if (r.outcome === "first") s.ok++;
      s.last = r.outcome !== "first" ? "miss" : r.ms > limit ? "slow" : "known"; s.day = child.today;
    });
    // A rate counts only for a sprint played to the end: a few seconds before a pause say nothing.
    const rate = scoreSession(session, results).perMinute ?? 0;
    if (finished) { (d.rates ??= []).push(rate); if (d.rates.length > 10) d.rates.shift(); }
    if (finished && rate > d.best) { d.best = rate; out.record = true; }
  }
  // A skill still to catch up on, practised to the end with most answers right first time, rests
  // for the day: the suggestion does not come back until tomorrow.
  if (session.kind !== "drill" && session.kind !== "recaps") for (const k of session.skills) {
    const mine = session.items.map((it, i) => [it, results[i]]).filter(([it]) => it.skill === k && !it.again);
    if (!mine.length || mine.some(([, r]) => !r) || !["practised", "needs_refresh"].includes(child.states[k]?.state)) continue;
    if (mine.filter(([, r]) => r.outcome === "first").length >= 0.8 * mine.length) child.states[k].goodDay = child.today;
  }
  if (finished && session.items.length && (session.kind === "drill" || session.items.every((_, i) => results[i]))) { child.sessions++; markActive(child); }
  child.lastSkill = session.skills.at(-1) ?? child.lastSkill;
  const sc = scoreSession(session, results);
  logEvent(child, `${session.kind} session${finished ? "" : ", left early"}: ${session.kind === "drill" ? `${sc.perMinute ?? 0} a minute${out.record ? ", a new record" : ""}` : `${sc.right} of ${sc.total} right`} (${session.skills.join(", ")})`);
  for (const k of session.skills) { const now = child.states[k]?.state ?? "not_started"; if (now !== before[k]) logEvent(child, `${k}: ${before[k]} → ${now}`); }
  return out;
}

// Answers for a whole session without playing it, for the time machine:
// "right" first try every time, "wrong" never, "mixed" mostly right.
export function autoResults(session, style, rng = Math.random) {
  const limit = (session.seconds ?? 8) * 1000;
  return session.items.map(() => {
    const u = rng(), outcome = style === "right" ? "first" : style === "wrong" ? "wrong" : u < 0.7 ? "first" : u < 0.85 ? "second" : "wrong";
    return { outcome, ms: outcome === "first" ? Math.round(limit * (0.3 + 0.5 * rng())) : limit };
  });
}

// A drill bank as a map of what the child knows. Sums of two numbers make a
// grid per sign (rows the first number, columns the second; a division sits
// by its answer, so 21 ÷ 3 is where 7 × 3 is); words make a list.
export function drillMap(bank, d) {
  const stats = d?.items ?? {}, id = (it) => String(it.q ?? it.word);
  const items = bank.items.map((it) => ({ id: id(it), label: id(it), a: it.a ?? null, status: stats[id(it)]?.last ?? "unseen", n: stats[id(it)]?.n ?? 0, ok: stats[id(it)]?.ok ?? 0 }));
  const counts = { known: 0, slow: 0, miss: 0, unseen: 0 };
  for (const x of items) counts[x.status]++;
  const parts = bank.items.map((it) => String(it.q ?? "").match(/^\s*(\d+)\s*(\S)\s*(\d+)\s*$/));
  if (!parts.length || !parts.every(Boolean)) return { grids: [], wall: items, items, counts };
  const num = (xs) => [...new Set(xs)].sort((x, y) => x - y).map(String), grids = [], inGrid = new Set();
  for (const op of [...new Set(parts.map((m) => m[2]))]) {
    const at = parts.map((m, i) => [m, i]).filter(([m]) => m[2] === op).map(([m, i]) => [op === "÷" || op === ":" ? String(bank.items[i].a) : m[1], m[3], i]);
    const rows = num(at.map(([r]) => +r)), cols = num(at.map(([, c]) => +c)), cells = {};
    // A grid only when it is fairly full (sums to 10 fill a triangle); doubles or squares alone would be a lonely diagonal.
    if (rows.length < 2 || cols.length < 2 || new Set(at.map(([r, c]) => `${r}|${c}`)).size < 0.4 * rows.length * cols.length) continue;
    for (const r of rows) cells[r] = {};
    for (const [r, c, i] of at) { cells[r][c] = items[i]; inGrid.add(i); }
    grids.push({ op, rows, cols, cells });
  }
  return { grids, wall: items.filter((_, i) => !inGrid.has(i)), items, counts };
}

// Why a skill needs catching up, in the child's words: when it slipped at a
// recap if it did, else the general line.
export function catchUpReason(child, skill) {
  const s = child.states[skill];
  if (s?.state === "practised") return { de: "Fast geschafft: übe es noch einmal", en: "Nearly there: practise it once more" };
  const miss = [...(s?.recaps ?? [])].reverse().find((r) => !r.pass);
  if (s?.state !== "needs_refresh" || !miss) return { de: "Das üben wir nochmal", en: "Let's practise this again" };
  const d = child.today - miss.day;
  const when = d <= 0 ? ["heute", "today"] : d === 1 ? ["gestern", "yesterday"] : d < 7 ? [`vor ${d} Tagen`, `${d} days ago`] : d < 14 ? ["letzte Woche", "last week"] : ["vor einer Weile", "a while ago"];
  return { de: `Das war ${when[0]} noch schwer`, en: `You found this tricky ${when[1]}` };
}

export function suggestions(child, index) {
  const cards = [], has = (k) => !!index.bySkill[k];
  const due = recapsDue(child).filter(has);
  if (due.length) cards.push({ kind: "recaps", skills: due, reason: { de: `${due.length} ${due.length === 1 ? "Sache" : "Sachen"} zum Wiederholen`, en: `${due.length} ${due.length === 1 ? "skill" : "skills"} to remember` } });
  const weak = Object.entries(child.states).filter(([k, s]) => has(k) && (s.state === "needs_refresh" || s.state === "practised") && s.goodDay !== child.today)
    .sort(([, a], [, b]) => (a.state === "needs_refresh" ? 0 : 1) - (b.state === "needs_refresh" ? 0 : 1));
  if (weak.length) { const [k] = weak[0]; cards.push({ kind: "catch-up", skills: [k], reason: catchUpReason(child, k) }); }
  // Sprints and reviews come from what the child has taken (a lesson begun or a sprint played),
  // so a child is not offered colours before the colours lesson. A child who has taken nothing
  // yet gets no card: there is nothing to review, and Start points to the first lesson.
  const TAKEN = ["learning", "practised", "can_do", "remembered", "needs_refresh"];
  const taken = (k) => has(k) && (TAKEN.includes(child.states[k]?.state) || !!child.drills[k]);
  const drillSkills = Object.keys(index.drills);
  const started = drillSkills.find((k) => child.drills[k]) ?? drillSkills.find(taken);
  if (started) cards.push({ kind: "drill", skills: [started], reason: child.drills[started]?.best ? { de: `Schlag deinen Rekord: ${child.drills[started].best} pro Minute`, en: `Beat your record: ${child.drills[started].best} a minute` } : { de: "Schnell rechnen und lesen", en: "Quick-fire practice" } });
  if (cards.length < 3) {
    const k = child.lastSkill && taken(child.lastSkill) ? child.lastSkill : Object.keys(child.states).find(taken);
    const topic = k && index.topics.find((t) => t.skills.includes(k));
    if (topic) cards.push({ kind: "review", skills: topic.skills.filter((x) => taken(x)), topic: topic.key, reason: { de: `Wiederholen: ${topic.name.de}`, en: `Review: ${topic.name.en}` } });
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
