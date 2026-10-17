import { test } from "node:test";
import assert from "node:assert/strict";
import { checkBank } from "../drills-check.mjs";

const steps = new Map([
  ["math.mult-div.table-3-6-9", { id: "math.mult-div.table-3-6-9" }],
  ["lit-en.spelling.exception-words-y1", { id: "lit-en.spelling.exception-words-y1" }],
]);

test("a correct maths bank has no problems", () => {
  const p = checkBank("drills/math/table-3-6-9.yaml", { skill: "math.mult-div.table-3-6-9", formats: ["type", "choose", "timed"], seconds: { "6-7": 8 }, items: [{ q: "3 × 4", a: 12 }, { q: "12 ÷ 3", a: 4 }] }, steps);
  assert.deepEqual(p, []);
});

test("a wrong answer, a duplicate and an unknown format are reported", () => {
  const p = checkBank("drills/math/table-3-6-9.yaml", { skill: "math.mult-div.table-3-6-9", formats: ["type", "dance"], items: [{ q: "3 × 4", a: 13 }, { q: "3 × 4", a: 12 }] }, steps);
  assert.ok(p.some((m) => m.includes("3 × 4") && m.includes("13")));
  assert.ok(p.some((m) => m.includes("twice")));
  assert.ok(p.some((m) => m.includes("dance")));
});

test("unknown skill, wrong folder and wrong file name are reported", () => {
  const p = checkBank("drills/lit-en/times.yaml", { skill: "math.mult-div.table-7", formats: ["type"], items: [{ q: "7 × 2", a: 14 }] }, steps);
  assert.ok(p.some((m) => m.includes("unknown skill")));
  assert.ok(p.some((m) => m.includes("folder")));
  assert.ok(p.some((m) => m.includes("file name")));
});

test("a word bank's word must appear in its sentence", () => {
  const p = checkBank("drills/lit-en/exception-words-y1.yaml", { skill: "lit-en.spelling.exception-words-y1", formats: ["type"], items: [{ word: "said", sentence: "Mum told me." }] }, steps);
  assert.ok(p.some((m) => m.includes("said") && m.includes("sentence")));
});

test("an item must be a fact or a word, not both or neither", () => {
  const p = checkBank("drills/lit-en/exception-words-y1.yaml", { skill: "lit-en.spelling.exception-words-y1", formats: ["type"], items: [{ q: "1 + 1", a: 2, word: "two", sentence: "I have two." }, {}] }, steps);
  assert.equal(p.filter((m) => m.includes("either q and a, or word and sentence")).length, 2);
});
