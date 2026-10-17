import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, setState, indexContent, buildSession, scoreSession, applySession, suggestions, parseRequest, mulberry32 } from "../pages/player/practice-rules.mjs";

const mk = (id, skill, topic) => ({ id, skill, language: id.startsWith("de") ? "de" : "en", year: "klasse-2", ages: ["6-7"], topic,
  lessons: [{ n: 1, activities: [{ activity: "practise", stages: ["full", "some", "none"].map((support) => ({ support, tasks: [0, 1, 2, 3, 4].map((i) => ({ id: `${support}-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) })) },
    { activity: "check", size: "skill", tasks: [0, 1, 2, 3, 4].map((i) => ({ id: `c-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) }] }] });
const sets = [
  mk("de-DE.math.table-7", "math.mult-div.table-7", { de: "Einmaleins", en: "Times tables" }),
  mk("de-DE.math.table-3-6-9", "math.mult-div.table-3-6-9", { de: "Einmaleins", en: "Times tables" }),
  mk("de-DE.lit-de.sight-words-easy", "lit-de.fluency.sight-words-easy", { de: "Blitzlesen", en: "Flash reading" }),
];
const drills = { "math.mult-div.table-3-6-9": { formats: ["type"], seconds: { "6-7": 8 }, items: [{ q: "3 × 4", a: 12 }, { q: "6 × 3", a: 18 }] } };
const index = indexContent(sets, drills, "de-DE");

test("score counts right answers and first tries per skill", () => {
  const s = { kind: "review", items: [{ skill: "a" }, { skill: "a" }, { skill: "b" }, { skill: "b" }] };
  const r = scoreSession(s, [{ outcome: "first", ms: 1000 }, { outcome: "second", ms: 1000 }, { outcome: "shown", ms: 1000 }, { outcome: "wrong", ms: 1000 }]);
  assert.equal(r.right, 2); assert.equal(r.firstTry, 1); assert.equal(r.total, 4);
  assert.deepEqual(r.perSkill.a, { right: 2, firstTry: 1, total: 2 });
  assert.equal(r.perMinute, null);
});

test("drill score is first-try items per minute", () => {
  const s = { kind: "drill", items: [{ skill: "d" }, { skill: "d" }, { skill: "d" }] };
  const r = scoreSession(s, [{ outcome: "first", ms: 10000 }, { outcome: "first", ms: 10000 }, { outcome: "wrong", ms: 10000 }]);
  assert.equal(r.perMinute, 4); // 2 right in 30 seconds
});

test("a recap session passes a skill at 2 of 3 and updates the state", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "math.mult-div.table-7", "can_do"); c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(1) });
  const res = s.items.map((_, i) => ({ outcome: i === 0 ? "wrong" : "first", ms: 2000 }));
  const out = applySession(c, s, res);
  assert.equal(out.recaps["math.mult-div.table-7"], "counted");
  assert.equal(c.states["math.mult-div.table-7"].pos, 1);
  assert.ok(s.items.every((i) => c.seen[i.key] === 2));
  assert.equal(c.sessions, 1);
});

test("missed and slow drill items become weak, and a new best is recorded", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  const s = buildSession({ kind: "drill", child: c, index, skills: ["math.mult-div.table-3-6-9"], minutes: 2, rng: mulberry32(2) });
  const res = s.items.slice(0, 4).map((it, i) => ({ outcome: i === 0 ? "wrong" : "first", ms: i === 1 ? 9000 : 3000 }));
  const out = applySession(c, { ...s, items: s.items.slice(0, 4) }, res);
  const weak = c.drills["math.mult-div.table-3-6-9"].weak;
  assert.ok(weak[s.items[0].drill.q] >= 1);
  assert.ok(weak[s.items[1].drill.q] >= 1);
  assert.equal(out.record, true);
  assert.ok(c.drills["math.mult-div.table-3-6-9"].best > 0);
});

test("suggestions: recaps first, then catch-up, then a drill; never empty", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  const empty = suggestions(c, index);
  assert.ok(empty.length >= 1);
  setState(c, "math.mult-div.table-7", "can_do"); setState(c, "lit-de.fluency.sight-words-easy", "needs_refresh"); c.today = 2;
  const k = suggestions(c, index).map((x) => x.kind);
  assert.deepEqual(k.slice(0, 3), ["recaps", "catch-up", "drill"]);
  assert.ok(suggestions(c, index).every((x) => x.reason.de && x.reason.en));
});

test("typed requests become filters", () => {
  const a = parseRequest("10 Minuten Einmaleins mit 3", index);
  assert.equal(a.filters.minutes, 10); assert.equal(a.filters.kind, "drill");
  assert.deepEqual(a.filters.skills, ["math.mult-div.table-3-6-9"]); assert.equal(a.unknown, false);
  const b = parseRequest("Blitzlesen wiederholen", index);
  assert.equal(b.filters.kind, "review"); assert.deepEqual(b.filters.topics, ["lit-de|Flash reading"]);
  const c = parseRequest("5 minutes of times tables", index);
  assert.equal(c.filters.minutes, 5); assert.equal(c.filters.subject, "math");
});

test("a drill counts as finished when its time ran out; a session closed early does not count", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  const d = buildSession({ kind: "drill", child: c, index, skills: ["math.mult-div.table-3-6-9"], minutes: 2, rng: mulberry32(9) });
  applySession(c, d, [{ outcome: "first", ms: 3000 }]);
  assert.equal(c.sessions, 1);
  const r = buildSession({ kind: "review", child: c, index, skills: ["math.mult-div.table-7"], rng: mulberry32(10) });
  applySession(c, r, [{ outcome: "first", ms: 3000 }], false);
  assert.equal(c.sessions, 1);
});

test("a request with nothing known is unknown", () => {
  const r = parseRequest("blue elephants", index);
  assert.equal(r.unknown, true); assert.deepEqual(r.filters, {});
});
