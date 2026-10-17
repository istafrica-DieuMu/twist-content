// Findings from the final review, each pinned by a test.
import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, setState, recordRecap, nextRecap, recapsDue, indexContent, buildSession, applySession, drillTask, parseRequest, mulberry32 } from "../pages/player/practice-rules.mjs";

const mk = (skill) => ({ id: `de-DE.math.${skill}`, skill: `math.mult-div.${skill}`, language: "de", year: "klasse-2", ages: ["6-7"], topic: { de: "Einmaleins", en: "Times tables" },
  lessons: [{ n: 1, activities: [{ activity: "practise", stages: ["full", "some", "none"].map((support) => ({ support, tasks: [0, 1, 2, 3, 4].map((i) => ({ id: `${support}-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) })) },
    { activity: "check", size: "skill", tasks: [0, 1, 2, 3, 4].map((i) => ({ id: `c-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) }] }] });
const names = Array.from({ length: 20 }, (_, i) => `s${i}`);
const index = indexContent(names.map(mk), {}, "de-DE");

test("quitting a recap part-way does not fail it", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.s0", "can_do"); c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(1) });
  applySession(c, s, [{ outcome: "first", ms: 1000 }], false);
  assert.equal(c.states["math.mult-div.s0"].state, "can_do");
  assert.equal(c.states["math.mult-div.s0"].pos, 0);
});

test("needs_refresh set by hand falls due the next day and stays due", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.s0", "needs_refresh");
  c.today = 1; assert.deepEqual(recapsDue(c), ["math.mult-div.s0"]);
  c.today = 4; assert.deepEqual(recapsDue(c), ["math.mult-div.s0"]);
});

test("passing the refresh after a failed upkeep does not bring the upkeep back at once", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.s0", "remembered");
  recordRecap(c, "math.mult-div.s0", false, 60);
  assert.equal(c.states["math.mult-div.s0"].state, "needs_refresh");
  recordRecap(c, "math.mult-div.s0", true, 61);
  assert.equal(c.states["math.mult-div.s0"].state, "remembered");
  c.today = 62; assert.deepEqual(recapsDue(c), []);
});

test("a recaps session keeps to the session length and leaves the rest due", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  for (const k of names) setState(c, `math.mult-div.${k}`, "can_do");
  c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(2) });
  assert.ok(s.items.length <= 14);
  assert.equal(s.skills.length, 4); // floor(14 / 3)
});

test("a word repeated in its sentence is blanked everywhere", () => {
  const t = drillTask({ word: "the", sentence: "The cat is on the mat." }, "say", { formats: ["say"], items: [] }, "en", "en-GB", mulberry32(3));
  assert.ok(!/\bthe\b/i.test(t.text.split("\n")[1]));
});

test("minutes are not read as a table number", () => {
  const ix = indexContent([mk("table-5-10")], { "math.mult-div.table-5-10": { formats: ["type"], items: [{ q: "5 × 2", a: 10 }] } }, "de-DE");
  const r = parseRequest("Mathe mit 10 Minuten", ix);
  assert.equal(r.filters.minutes, 10);
  assert.equal(r.filters.skills, undefined);
});
