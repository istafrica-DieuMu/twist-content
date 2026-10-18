import { test } from "node:test";
import assert from "node:assert/strict";
import { drawCheck, mulberry32 } from "../pages/player/practice-rules.mjs";

// A pool of 20 over 4 parts, 5 tasks each.
const parts = ["row-3", "row-6", "row-9", "multiples"];
const check = { activity: "check", size: "skill", draw: 5, tasks: Array.from({ length: 20 }, (_, i) => ({ id: `c${i + 1}`, part: parts[i % 4] })) };

test("a draw has 5 different tasks covering every part", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const d = drawCheck(check, { rng: mulberry32(seed) });
    assert.equal(d.length, 5);
    assert.equal(new Set(d.map((t) => t.id)).size, 5);
    assert.deepEqual([...new Set(d.map((t) => t.part))].sort(), [...parts].sort());
  }
});

test("a second attempt leaves out the tasks of the last one", () => {
  const first = drawCheck(check, { rng: mulberry32(3) });
  const second = drawCheck(check, { last: first.map((t) => t.id), rng: mulberry32(4) });
  assert.equal(second.filter((t) => first.includes(t)).length, 0);
});

test("the least recently seen tasks come first", () => {
  const seen = Object.fromEntries(check.tasks.map((t, i) => [t.id, i < 15 ? 10 : 2]));
  const d = drawCheck(check, { seen, rng: mulberry32(5) });
  assert.ok(d.every((t) => +t.id.slice(1) > 15));
});

test("a check without draw shows every task", () => {
  const plain = { tasks: check.tasks.slice(0, 5) };
  assert.equal(drawCheck(plain).length, 5);
});

test("a quick pool without parts draws 3", () => {
  const quick = { size: "quick", draw: 3, tasks: Array.from({ length: 6 }, (_, i) => ({ id: `q${i}` })) };
  assert.equal(drawCheck(quick, { rng: mulberry32(9) }).length, 3);
});
