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
  if (s.state === "needs_refresh") return { day: (last?.day ?? child.today) + 1, gap: 1, pos: s.pos, upkeep: false, refresh: true };
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
    if (pass) { s.state = s.prev ?? "can_do"; s.prev = null; }
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
