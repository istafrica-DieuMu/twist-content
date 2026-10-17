import { test } from "node:test";
import assert from "node:assert/strict";
import { ageBand, newChild, setState, nextRecap, recapCounts, recordRecap, recapsDue } from "../pages/player/practice-rules.mjs";

const S = "math.mult-div.table-3-6-9";

test("age bands from a lesson set's ages", () => {
  assert.equal(ageBand(["4-5"]), "4-5");
  assert.equal(ageBand(["6-7"]), "6-7");
  assert.equal(ageBand(["8-10"]), "8-10");
  assert.equal(ageBand(undefined), "8-10");
});

test("6 to 7: recaps at 2, 7 and 14 days, remembered after the last and one earlier", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, S, "can_do");
  assert.equal(nextRecap(c, S).day, 2);
  assert.equal(recordRecap(c, S, true, 2), "counted");
  assert.equal(nextRecap(c, S).day, 7);
  assert.equal(recordRecap(c, S, true, 7), "counted");
  assert.equal(nextRecap(c, S).day, 14);
  assert.equal(recordRecap(c, S, true, 14), "counted");
  assert.equal(c.states[S].state, "remembered");
  assert.equal(nextRecap(c, S).day, 74);
  assert.equal(nextRecap(c, S).upkeep, true);
});

test("an early recap is evidence only", () => {
  const c = newChild({ curriculum: "en-GB", year: "year-3", band: "8-10" });
  setState(c, S, "can_do");
  // second recap is due on day 7, its gap is 5 days, so it counts from day 6
  recordRecap(c, S, true, 2);
  assert.equal(recapCounts(c, S, 5), false);
  assert.equal(recordRecap(c, S, true, 5), "early");
  assert.equal(c.states[S].pos, 1);
  assert.equal(recapCounts(c, S, 6), true);
});

test("a failed recap sets needs_refresh; passing the next restores the state", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, S, "can_do");
  recordRecap(c, S, false, 2);
  assert.equal(c.states[S].state, "needs_refresh");
  assert.equal(nextRecap(c, S).day, 3);
  assert.equal(nextRecap(c, S).refresh, true);
  recordRecap(c, S, true, 3);
  assert.equal(c.states[S].state, "can_do");
  assert.equal(c.states[S].pos, 0);
});

test("the last recap alone does not make remembered", () => {
  const c = newChild({ curriculum: "en-GB", year: "reception", band: "4-5" });
  setState(c, S, "can_do");
  recordRecap(c, S, false, 1); recordRecap(c, S, true, 2); // refresh passed, back to can_do at pos 0
  c.states[S].pos = 2; c.states[S].recaps = [{ day: 2, pass: false, pos: 0 }];
  recordRecap(c, S, true, 12);
  assert.equal(c.states[S].state, "can_do");
});

test("recapsDue lists skills whose recap counts today, oldest first", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, "a", "can_do"); c.today = 1; setState(c, "b", "can_do"); setState(c, "c", "practised");
  c.today = 3;
  assert.deepEqual(recapsDue(c), ["a", "b"]);
  c.today = 1;
  assert.deepEqual(recapsDue(c), []);
});

test("no recap for skills below can_do", () => {
  const c = newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
  setState(c, S, "practised");
  assert.equal(nextRecap(c, S), null);
  assert.equal(recordRecap(c, S, true, 5), "none");
});
