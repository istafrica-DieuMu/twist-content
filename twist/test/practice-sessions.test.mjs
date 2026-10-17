import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, setState, pools, indexContent, buildSession, drillTask, interleave, requeue, mulberry32, tasksForMinutes } from "../pages/player/practice-rules.mjs";

// A lesson set with n tasks per stage and 5 check tasks.
const mk = (skill, n = 5, topic = "Einmaleins") => ({
  id: `de-DE.math.${skill}`, skill: `math.mult-div.${skill}`, language: "de", year: "klasse-2", ages: ["6-7"],
  topic: { de: topic, en: "Times tables" },
  lessons: [{ n: 1, activities: [
    { activity: "practise", stages: ["full", "some", "none"].map((support) => ({ support, tasks: Array.from({ length: n }, (_, i) => ({ id: `${support}-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) })) },
    { activity: "check", size: "skill", tasks: Array.from({ length: 5 }, (_, i) => ({ id: `c-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) },
  ] }],
});
const bank = { skill: "math.mult-div.table-3-6-9", formats: ["type", "choose"], items: [{ q: "3 × 4", a: 12 }, { q: "6 × 2", a: 12 }, { q: "9 × 3", a: 27 }, { q: "12 ÷ 3", a: 4 }] };
const index = indexContent([mk("table-3-6-9"), mk("table-7"), mk("table-2-4-8", 1)], { "math.mult-div.table-3-6-9": bank }, "de-DE");

test("pools split tasks by stage and mark skill-check tasks", () => {
  const p = pools(mk("table-7"));
  assert.equal(p.full.length, 5); assert.equal(p.none.length, 5); assert.equal(p.check.length, 5);
  assert.equal(p.skillCheck.length, 5);
});

test("recaps due: 3 tasks per skill from no-help and check, interleaved, never the last skill check", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.table-3-6-9", "can_do"); setState(c, "math.mult-div.table-7", "can_do");
  c.lastCheck["math.mult-div.table-7"] = ["de-DE.math.table-7#1#c-0", "de-DE.math.table-7#1#c-1"];
  c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(1) });
  assert.equal(s.items.length, 6);
  assert.ok(s.items.every((i) => i.stage === "none" || i.stage === "check"));
  assert.ok(s.items.every((i) => !c.lastCheck["math.mult-div.table-7"].includes(i.key)));
  for (let i = 1; i < s.items.length; i++) assert.notEqual(s.items[i].skill, s.items[i - 1].skill);
  assert.ok(s.items.every((i) => i.recap && i.mode === "none" && i.why.length > 0));
});

test("catch-up climbs full, some, none and uses catch mode", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.table-7", "needs_refresh");
  const s = buildSession({ kind: "catch-up", child: c, index, skills: ["math.mult-div.table-7"], rng: mulberry32(2) });
  assert.equal(s.items.length, 14);
  const order = { full: 0, some: 1, none: 2, check: 3 };
  for (let i = 1; i < s.items.length; i++) assert.ok(order[s.items[i].stage] >= order[s.items[i - 1].stage]);
  assert.ok(s.items.every((i) => i.mode === "catch"));
});

test("a small skill falls back to easier stages and never repeats a task", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  const s = buildSession({ kind: "review", child: c, index, skills: ["math.mult-div.table-2-4-8"], rng: mulberry32(3) });
  const keys = s.items.map((i) => i.key);
  assert.equal(new Set(keys).size, keys.length);
  assert.equal(keys.length, 8); // 1 + 1 + 1 stage tasks + 5 check tasks
});

test("least recently seen tasks come first", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  for (let i = 0; i < 5; i++) c.seen[`de-DE.math.table-7#1#none-${i}`] = 5;
  c.seen["de-DE.math.table-7#1#none-3"] = 1;
  const s = buildSession({ kind: "review", child: c, index, skills: ["math.mult-div.table-7"], rng: mulberry32(4) });
  const firstNone = s.items.findIndex((i) => i.key === "de-DE.math.table-7#1#none-3");
  const others = s.items.filter((i) => i.stage === "none" && i.key !== "de-DE.math.table-7#1#none-3").map((i) => s.items.indexOf(i));
  assert.ok(others.every((x) => x > firstNone));
});

test("drill sessions run by time and use bank items, weak ones first", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  c.drills["math.mult-div.table-3-6-9"] = { best: 0, weak: { "9 × 3": 2 } };
  const s = buildSession({ kind: "drill", child: c, index, skills: ["math.mult-div.table-3-6-9"], minutes: 2, rng: mulberry32(5) });
  assert.equal(s.minutes, 2);
  assert.ok(s.items.length >= 20);
  assert.equal(s.items[0].drill.q, "9 × 3");
});

test("drill tasks use German signs and render as text_input or multiple_choice", () => {
  const t = drillTask({ q: "3 × 4", a: 12 }, "type", bank, "de", "de-DE", mulberry32(6));
  assert.equal(t.type, "text_input"); assert.equal(t.text, "3 · 4 = _"); assert.equal(t.answer, "12");
  const m = drillTask({ q: "12 ÷ 3", a: 4 }, "choose", bank, "de", "de-DE", mulberry32(7));
  assert.equal(m.type, "multiple_choice"); assert.equal(m.text, "12 : 3 = _");
  assert.equal(m.options.length, 3); assert.ok(m.options.includes("4")); assert.equal(new Set(m.options).size, 3);
  const w = drillTask({ word: "said", sentence: "Mum said it is time for bed." }, "say", { formats: ["say"], items: [] }, "en", "en-GB", mulberry32(8));
  assert.equal(w.type, "text_input"); assert.equal(w.keyboard, "letters"); assert.equal(w.answer, "said"); assert.equal(w._sayWord, "said");
  assert.ok(w.text.includes("___"));
});

test("interleave and requeue", () => {
  const a = [{ skill: "a", key: "a1" }, { skill: "a", key: "a2" }], b = [{ skill: "b", key: "b1" }];
  assert.deepEqual(interleave([a, b]).map((x) => x.key), ["a1", "b1", "a2"]);
  const items = [{ key: "x" }, { key: "y" }];
  const r = requeue(items, 0);
  assert.equal(r.length, 3); assert.equal(r[2].again, true);
  assert.equal(requeue(r, 2).length, 3);
});

test("minutes to tasks", () => assert.equal(tasksForMinutes(10), 15));

test("why names the stage in plain words", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  const s = buildSession({ kind: "skill", child: c, index, skills: ["math.mult-div.table-7"], rng: mulberry32(11) });
  const stages = new Set(s.items.map((i) => i.why.match(/; ([a-z-]+ stage|check task);/)[1]));
  assert.deepEqual([...stages].sort(), ["full-help stage", "no-help stage", "some-help stage"]);
});
