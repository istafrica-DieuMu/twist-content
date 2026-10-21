// The gaps practice.md listed as "not yet in the reference", the time machine
// and the drill map, each pinned by a test.
import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, setState, recordRecap, nextRecap, recapsDue, indexContent, buildSession, applySession, drillTask, mulberry32,
  recordCheck, nearMisses, catchUpReason, upcoming, nextDueDay, autoResults, drillMap } from "../pages/player/practice-rules.mjs";

const mk = (skill) => ({ id: `de-DE.math.${skill}`, skill: `math.mult-div.${skill}`, language: "de", year: "klasse-2", ages: ["6-7"], topic: { de: "Einmaleins", en: "Times tables" },
  lessons: [{ n: 1, activities: [{ activity: "practise", stages: ["full", "some", "none"].map((support) => ({ support, tasks: [0, 1, 2, 3, 4].map((i) => ({ id: `${support}-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) })) },
    { activity: "check", size: "skill", tasks: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ id: `c-${i}`, type: "multiple_choice", options: ["1", "2"], answer: "1" })) }] }] });
const TABLE = { skill: "math.mult-div.s0", formats: ["type", "choose", "timed"], seconds: { "6-7": 8 },
  items: [3, 6, 9].flatMap((b) => Array.from({ length: 10 }, (_, i) => ({ q: `${i + 1} × ${b}`, a: (i + 1) * b }))) };
const WORDS = { skill: "math.mult-div.s1", formats: ["say", "choose"], seconds: { "6-7": 12 },
  items: ["door", "floor", "poor", "because", "find", "kind", "mind", "behind"].map((word) => ({ word, sentence: `The ${word} is here.` })) };
const index = indexContent(["s0", "s1", "s2"].map(mk), { "math.mult-div.s0": TABLE, "math.mult-div.s1": WORDS }, "de-DE");
const child = () => newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
const S0 = "math.mult-div.s0", S1 = "math.mult-div.s1";

// ---------- the last skill check stays fresh ----------

test("a skill check the child took is recorded and practice leaves its tasks out", () => {
  const c = child();
  const keys = index.bySkill[S0].pools.check.slice(0, 5).map((e) => e.key);
  recordCheck(c, S0, keys);
  assert.deepEqual(c.lastCheck[S0], keys);
  for (let seed = 1; seed < 30; seed++) {
    const s = buildSession({ kind: "review", child: c, index, skills: [S0], rng: mulberry32(seed) });
    assert.ok(s.items.every((it) => !keys.includes(it.key)), `seed ${seed}`);
  }
});

test("a newer skill check replaces the last one", () => {
  const c = child(), pool = index.bySkill[S0].pools.check.map((e) => e.key);
  recordCheck(c, S0, pool.slice(0, 5)); recordCheck(c, S0, pool.slice(3, 8));
  assert.deepEqual(c.lastCheck[S0], pool.slice(3, 8));
});

// ---------- recaps first ----------

test("while a skill's recap is due, other sessions keep its no-help and check tasks back", () => {
  const c = child();
  setState(c, S0, "can_do"); c.today = 2;
  assert.deepEqual(recapsDue(c), [S0]);
  for (let seed = 1; seed < 20; seed++) {
    const s = buildSession({ kind: "review", child: c, index, skills: [S0, "math.mult-div.s2"], rng: mulberry32(seed) });
    const mine = s.items.filter((it) => it.skill === S0);
    assert.ok(mine.length > 0);
    assert.ok(mine.every((it) => it.stage === "full" || it.stage === "some"), `seed ${seed}: ${mine.map((x) => x.stage)}`);
    assert.ok(s.items.some((it) => it.skill === "math.mult-div.s2" && (it.stage === "none" || it.stage === "check")));
  }
});

test("held-back tasks are still used when the skill has nothing else left", () => {
  const c = child();
  setState(c, S0, "can_do"); c.today = 2;
  const s = buildSession({ kind: "review", child: c, index, skills: [S0], minutes: 10, rng: mulberry32(3) });
  assert.equal(s.items.length, 15);
});

test("the recaps session itself still takes the no-help and check tasks first", () => {
  const c = child();
  setState(c, S0, "can_do"); c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(1) });
  assert.ok(s.items.every((it) => it.stage === "none" || it.stage === "check"));
});

// ---------- near misses in drills ----------

test("a times-table drill offers neighbouring facts as wrong answers", () => {
  const near = nearMisses({ q: "7 × 8", a: 56 }, []);
  for (const x of ["48", "64", "49", "63"]) assert.ok(near.includes(x), x);
  assert.ok(!near.includes("56"));
  for (let seed = 1; seed < 20; seed++) {
    const t = drillTask({ q: "7 × 3", a: 21 }, "choose", TABLE, "de", "de-DE", mulberry32(seed));
    assert.equal(t.options.length, 3);
    assert.ok(t.options.includes("21"));
    for (const o of t.options.filter((x) => x !== "21")) assert.ok(["14", "28", "18", "24", "20", "22"].includes(o), `seed ${seed}: ${o}`);
  }
});

test("a division or sum drill offers answers one or two away, never below zero", () => {
  assert.deepEqual(nearMisses({ q: "1 + 0", a: 1 }, []).filter((x) => +x < 0), []);
  const d = nearMisses({ q: "56 ÷ 8", a: 7 }, []);
  assert.ok(d.includes("6") && d.includes("8"));
});

test("a word drill offers words that look like the right one", () => {
  for (let seed = 1; seed < 20; seed++) {
    const t = drillTask(WORDS.items[0], "choose", WORDS, "en", "en-GB", mulberry32(seed));
    const wrong = t.options.filter((x) => x !== "door");
    assert.deepEqual(wrong.sort(), ["floor", "poor"], `seed ${seed}`);
  }
});

// ---------- the catch-up reason says what happened ----------

test("a skill that slipped at a recap says when", () => {
  const c = child();
  setState(c, S0, "can_do"); recordRecap(c, S0, false, 2);
  c.today = 3; assert.deepEqual(catchUpReason(c, S0), { de: "Das war gestern noch schwer", en: "You found this tricky yesterday" });
  c.today = 5; assert.deepEqual(catchUpReason(c, S0), { de: "Das war vor 3 Tagen noch schwer", en: "You found this tricky 3 days ago" });
  c.today = 10; assert.deepEqual(catchUpReason(c, S0), { de: "Das war letzte Woche noch schwer", en: "You found this tricky last week" });
  c.today = 30; assert.deepEqual(catchUpReason(c, S0), { de: "Das war vor einer Weile noch schwer", en: "You found this tricky a while ago" });
});

test("a skill set to needs_refresh by hand, or at Practised, keeps the general reason", () => {
  const c = child();
  setState(c, S0, "needs_refresh");
  assert.deepEqual(catchUpReason(c, S0), { de: "Das üben wir nochmal", en: "Let's practise this again" });
  setState(c, S1, "practised");
  assert.deepEqual(catchUpReason(c, S1), { de: "Fast geschafft: übe es noch einmal", en: "Nearly there: practise it once more" });
});

// ---------- time machine ----------

test("upcoming lists each skill's next recap by day", () => {
  const c = child();
  setState(c, S0, "can_do"); c.today = 3; setState(c, S1, "can_do");
  const u = upcoming(c, 30);
  assert.deepEqual(u.map((x) => [x.skill, x.day]), [[S0, 2], [S1, 5]]);
});

test("nextDueDay is the first day a recap counts", () => {
  const c = child();
  setState(c, S0, "can_do"); // 6-7: first recap after 2 days, counts from 80% of the gap
  assert.equal(nextDueDay(c), 2);
  c.today = 2; recordRecap(c, S0, true, 2);
  assert.equal(nextRecap(c, S0).day, 7);
  assert.equal(nextDueDay(c), 6); // gap 5, counts from day 7 - 1
  assert.equal(nextDueDay(child()), null);
});

test("autoResults answers a whole session the chosen way", () => {
  const s = buildSession({ kind: "skill", child: child(), index, skills: [S0], rng: mulberry32(1) });
  assert.ok(autoResults(s, "right", mulberry32(1)).every((r) => r.outcome === "first"));
  assert.ok(autoResults(s, "wrong", mulberry32(1)).every((r) => r.outcome === "wrong"));
  const mixed = autoResults(s, "mixed", mulberry32(1));
  assert.equal(mixed.length, s.items.length);
  assert.ok(mixed.some((r) => r.outcome === "first") && mixed.some((r) => r.outcome !== "first"));
});

test("sessions, recaps and state changes go into the child's log", () => {
  const c = child();
  setState(c, S0, "can_do"); c.today = 2;
  const s = buildSession({ kind: "recaps", child: c, index, rng: mulberry32(1) });
  applySession(c, s, autoResults(s, "wrong", mulberry32(1)), true);
  const text = c.log.map((e) => `${e.day}: ${e.text}`).join("\n");
  assert.match(text, /2: .*recaps/);
  assert.match(text, /2: .*math\.mult-div\.s0.*can_do.*needs_refresh/);
});

// ---------- drill map ----------

test("a drill records each item: times seen, right first time, and its last result", () => {
  const c = child();
  const s = buildSession({ kind: "drill", child: c, index, skills: [S0], minutes: 2, rng: mulberry32(2) });
  const res = s.items.map((it, i) => (i < 3 ? { outcome: i === 0 ? "wrong" : "first", ms: i === 2 ? 20000 : 1000 } : null));
  applySession(c, s, res, true);
  const d = c.drills[S0], id = (i) => String(s.items[i].drill.q);
  assert.deepEqual(d.items[id(0)], { n: 1, ok: 0, last: "miss", day: 0 });
  assert.deepEqual(d.items[id(1)], { n: 1, ok: 1, last: "known", day: 0 });
  assert.deepEqual(d.items[id(2)], { n: 1, ok: 1, last: "slow", day: 0 });
  assert.equal(d.rates.length, 1);
});

test("a times-table bank maps onto a grid; a word bank onto a list", () => {
  const c = child();
  c.drills[S0] = { best: 0, weak: {}, rates: [], items: { "7 × 3": { n: 2, ok: 2, last: "known", day: 0 }, "8 × 6": { n: 1, ok: 0, last: "miss", day: 0 } } };
  const m = drillMap(TABLE, c.drills[S0]), g = m.grids[0];
  assert.equal(m.grids.length, 1);
  assert.equal(g.op, "×");
  assert.deepEqual(g.rows, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  assert.deepEqual(g.cols, ["3", "6", "9"]);
  assert.equal(g.cells["7"]["3"].status, "known");
  assert.equal(g.cells["8"]["6"].status, "miss");
  assert.equal(g.cells["1"]["9"].status, "unseen");
  assert.deepEqual(m.counts, { known: 1, slow: 0, miss: 1, unseen: 28 });
  const w = drillMap(WORDS, undefined);
  assert.deepEqual(w.grids, []);
  assert.equal(w.wall.length, 8);
  assert.equal(w.items.length, 8);
  assert.ok(w.items.every((x) => x.status === "unseen"));
});

test("a drill of the tricky ones plays only the missed and slow items", () => {
  const c = child();
  c.drills[S0] = { best: 0, weak: {}, rates: [], items: { "7 × 3": { n: 1, ok: 0, last: "miss", day: 0 }, "8 × 6": { n: 1, ok: 1, last: "slow", day: 0 }, "2 × 3": { n: 1, ok: 1, last: "known", day: 0 } } };
  const s = buildSession({ kind: "drill", child: c, index, skills: [S0], minutes: 2, tricky: true, rng: mulberry32(1) });
  assert.ok(s.items.every((it) => ["7 × 3", "8 × 6"].includes(it.drill.q)));
  const f = buildSession({ kind: "drill", child: c, index, skills: [S0], minutes: 2, focus: ["11 × 11", "2 × 3"], rng: mulberry32(1) });
  assert.ok(f.items.every((it) => it.drill.q === "2 × 3"));
});

test("a foreign-language bank plays only the words of the language the child learns", () => {
  const set = (cur, tl) => ({ id: `${cur}.fl.colours`, skill: "fl.themes.colours", language: cur === "de-DE" ? "de" : "en", target_language: tl, year: "y", ages: ["6-7"], topic: { de: "Farben", en: "Colours" }, lessons: [] });
  const bank = { skill: "fl.themes.colours", formats: ["listen"], items: [{ word: "red", lang: "en" }, { word: "blue", lang: "en" }, { word: "rouge", lang: "fr" }, { word: "bleu", lang: "fr" }] };
  const de = indexContent([set("de-DE", "en")], { "fl.themes.colours": bank }, "de-DE");
  const gb = indexContent([set("en-GB", "fr")], { "fl.themes.colours": bank }, "en-GB");
  assert.deepEqual(de.drills["fl.themes.colours"].items.map((x) => x.word), ["red", "blue"]);
  assert.deepEqual(gb.drills["fl.themes.colours"].items.map((x) => x.word), ["rouge", "bleu"]);
});

test("a bank of times and divides makes one grid each; a division sits where its times fact does", () => {
  const bank = { items: [{ q: "7 × 3", a: 21 }, { q: "8 × 3", a: 24 }, { q: "7 × 4", a: 28 }, { q: "8 × 4", a: 32 }, { q: "21 ÷ 3", a: 7 }, { q: "24 ÷ 3", a: 8 }, { q: "28 ÷ 4", a: 7 }, { q: "32 ÷ 4", a: 8 }] };
  const m = drillMap(bank, { items: { "21 ÷ 3": { n: 1, ok: 1, last: "known", day: 0 } } });
  assert.deepEqual(m.grids.map((g) => g.op), ["×", "÷"]);
  assert.deepEqual(m.grids[1].rows, ["7", "8"]);
  assert.deepEqual(m.grids[1].cols, ["3", "4"]);
  assert.equal(m.grids[1].cells["7"]["3"].id, "21 ÷ 3");
  assert.equal(m.grids[1].cells["7"]["3"].status, "known");
});

test("facts that would leave a grid mostly empty go on the wall instead", () => {
  const bank = { items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({ q: `${n} × ${n}`, a: n * n })).concat([{ q: "2 × 3", a: 6 }, { q: "2 × 4", a: 8 }, { q: "3 × 3", a: 9 }, { q: "3 × 4", a: 12 }]) };
  const m = drillMap(bank);
  assert.deepEqual(m.grids, []);
  assert.equal(m.wall.length, 14);
});

test("a word without an example sentence makes a flash or listening task", () => {
  const bank = { items: [{ word: "und" }, { word: "der" }, { word: "die" }] };
  const f = drillTask(bank.items[0], "flash", bank, "de", "de-DE", mulberry32(1));
  assert.equal(f._flashWord, "und");
  assert.equal(f.options.length, 3);
  const l = drillTask(bank.items[1], "listen", bank, "de", "de-DE", mulberry32(1));
  assert.equal(l._sayWord, "der");
});

test("a heard colour is answered with colours and a heard number with digits, never with the written word", () => {
  const bank = { items: [{ word: "rouge", lang: "fr", colour: "red" }, { word: "bleu", lang: "fr", colour: "blue" }, { word: "vert", lang: "fr", colour: "green" }, { word: "red", lang: "en", colour: "red" }] };
  const t = drillTask(bank.items[0], "listen", bank, "en", "en-GB", mulberry32(1));
  assert.equal(t.answer, "red");
  assert.ok(t._swatches);
  assert.deepEqual([...t.options].sort(), ["blue", "green", "red"]);
  assert.equal(t._sayWord, "rouge");
  assert.equal(t._sayLang, "fr");
  const nums = { items: [1, 2, 3, 4, 5, 6, 7].map((d) => ({ word: ["un", "deux", "trois", "quatre", "cinq", "six", "sept"][d - 1], lang: "fr", digit: d })) };
  const n = drillTask(nums.items[4], "listen", nums, "en", "en-GB", mulberry32(2));
  assert.equal(n.answer, "5");
  assert.ok(n.options.every((o) => /^\d+$/.test(o)));
  assert.ok(n.options.every((o) => Math.abs(+o - 5) <= 2));
});
