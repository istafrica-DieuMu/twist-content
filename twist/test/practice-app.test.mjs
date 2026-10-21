// The app around practice: the Busy Bee badge, the school-day streak, and a
// lesson finished in the player moving the pretend child on.
import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, setState, indexContent, buildSession, applySession, autoResults, mulberry32, busyBee, streak, markActive, finishLesson, badges } from "../pages/player/practice-rules.mjs";

const child = () => newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });

test("the Busy Bee counts finished sessions to its next level", () => {
  assert.deepEqual(busyBee(0), { level: 0, from: 0, next: 10, toGo: 10 });
  assert.deepEqual(busyBee(12), { level: 1, from: 10, next: 50, toGo: 38 });
  assert.deepEqual(busyBee(1000), { level: 6, from: 1000, next: null, toGo: 0 });
});

test("a streak counts school days in a row; weekends never break it", () => {
  const c = child(); // day 0 is a Monday
  for (const d of [0, 1, 2, 3, 4, 7]) markActive(c, d);
  c.today = 7; assert.equal(streak(c).current, 6);
  c.today = 8; assert.equal(streak(c).current, 6, "today not played yet keeps the streak");
  c.today = 9; assert.equal(streak(c).current, 0, "a missed school day ends it");
  assert.equal(streak(c).best, 6);
  assert.deepEqual(streak(c).badges, ["spark"]);
  assert.deepEqual(streak(c).next, [10, "flame"]);
});

test("weekend practice is welcome but adds no school day", () => {
  const c = child();
  for (const d of [3, 4, 5, 6, 7]) markActive(c, d);
  c.today = 7; assert.equal(streak(c).current, 3);
});

test("a finished session counts as a day of practice", () => {
  const set = { id: "de-DE.math.s0", skill: "math.mult-div.s0", language: "de", year: "klasse-2", ages: ["6-7"], topic: { de: "T", en: "T" },
    lessons: [{ n: 1, activities: [{ activity: "practise", stages: [{ support: "full", tasks: [{ id: "a", type: "multiple_choice", options: ["1", "2"], answer: "1" }] }] }] }] };
  const index = indexContent([set], {}, "de-DE"), c = child();
  c.today = 2;
  const s = buildSession({ kind: "skill", child: c, index, skills: ["math.mult-div.s0"], rng: mulberry32(1) });
  applySession(c, s, autoResults(s, "right", mulberry32(1)), true);
  assert.deepEqual(c.active, [2]);
});

test("finishing a lesson moves the skill on: learning, then the skill check decides", () => {
  const c = child(), k = "math.mult-div.s0";
  finishLesson(c, { setId: "de-DE.math.s0", skill: k, n: 1 });
  assert.equal(c.states[k].state, "learning");
  assert.equal(c.lessons["de-DE.math.s0"], 1);
  finishLesson(c, { setId: "de-DE.math.s0", skill: k, n: 3, check: { pass: false, keys: ["x#3#c1"] } });
  assert.equal(c.states[k].state, "practised");
  assert.deepEqual(c.lastCheck[k], ["x#3#c1"]);
  finishLesson(c, { setId: "de-DE.math.s0", skill: k, n: 3, check: { pass: true, keys: ["x#3#c2"] } });
  assert.equal(c.states[k].state, "can_do");
  assert.equal(c.lessons["de-DE.math.s0"], 3);
  assert.deepEqual(c.active, [0]);
  assert.deepEqual(c.last, { setId: "de-DE.math.s0", n: 3, day: 0 });
});

test("a failed check never takes a skill below where it is", () => {
  const c = child(), k = "math.mult-div.s0";
  setState(c, k, "remembered");
  finishLesson(c, { setId: "de-DE.math.s0", skill: k, n: 3, check: { pass: false, keys: [] } });
  assert.equal(c.states[k].state, "remembered");
});

test("strand badges: earned when every skill of the strand in the year can be done, gold when all remembered", () => {
  const c = newChild({ curriculum: "en-GB", year: "year-3", band: "8-10" });
  const year = { math: ["math.numbers-to-1000.a", "math.numbers-to-1000.b", "math.shapes.c"], "lit-en": ["lit-en.phonics.d"] };
  setState(c, "math.numbers-to-1000.a", "can_do");
  let nav = badges(c, year).find((b) => b.id === "number-navigator");
  assert.deepEqual([nav.have, nav.need, nav.earned], [1, 2, false]);
  assert.equal(badges(c, year).find((b) => b.id === "lift-off").earned, true);
  setState(c, "math.numbers-to-1000.b", "remembered");
  nav = badges(c, year).find((b) => b.id === "number-navigator");
  assert.equal(nav.earned, true); assert.equal(nav.gold, false);
  setState(c, "math.numbers-to-1000.a", "remembered");
  assert.equal(badges(c, year).find((b) => b.id === "number-navigator").gold, true);
  // A strand with no skills in the year has no badge that year.
  assert.equal(badges(c, year).some((b) => b.id === "data-detective"), false);
  // Hat Trick needs a strand badge in every subject of the year.
  assert.equal(badges(c, year).find((b) => b.id === "hat-trick").earned, false);
  setState(c, "lit-en.phonics.d", "can_do");
  assert.equal(badges(c, year).find((b) => b.id === "hat-trick").earned, true);
  assert.equal(badges(c, year).find((b) => b.id === "elephant-memory").level, 1);
});
