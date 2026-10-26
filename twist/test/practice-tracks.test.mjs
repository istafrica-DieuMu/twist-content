// Tracks (DaZ): a subject of its own that places the same skill a second
// time. The child's states and practice keep it apart from Englisch.
import { test } from "node:test";
import assert from "node:assert/strict";
import { newChild, indexContent, stateKey, skillOfKey, finishLesson, buildSession, mulberry32 } from "../pages/player/practice-rules.mjs";

const set = (id, extra) => ({ id, skill: "fl.themes.hello", language: "en", year: "stufe-0", ages: ["6-7"], topic: { de: "Hallo", en: "Hello" },
  lessons: [{ n: 1, activities: [{ activity: "practise", stages: [{ support: "full", tasks: [{ id: "a", type: "true_false", text: "?", answer: true }] }] }] }], ...extra });
const englisch = set("de-DE.fl.en-hello", { language: "de", target_language: "en" });
const daz = set("de-DE.daz.de-hello", { track: "daz", year: "daz-start", target_language: "de" });

test("a track's set is in the index only for a child who has the track", () => {
  const without = indexContent([englisch, daz], {}, "de-DE");
  assert.deepEqual(without.subjects, ["fl"]);
  assert.equal(without.sets.length, 1);
  const withDaz = indexContent([englisch, daz], {}, "de-DE", { daz: "daz-start" });
  assert.deepEqual(withDaz.subjects, ["daz", "fl"]);
  assert.equal(withDaz.bySkill["fl.themes.hello"].set.id, "de-DE.fl.en-hello");
  assert.equal(withDaz.bySkill["daz:fl.themes.hello"].set.id, "de-DE.daz.de-hello");
});

test("DaZ and Englisch keep their own state for the same skill", () => {
  assert.equal(stateKey(daz), "daz:fl.themes.hello");
  assert.equal(stateKey(englisch), "fl.themes.hello");
  assert.equal(skillOfKey(stateKey(daz)), "fl.themes.hello");
  const c = newChild({ curriculum: "de-DE", year: "klasse-1", band: "6-7" });
  finishLesson(c, { setId: daz.id, skill: stateKey(daz), n: 1, check: { pass: true, keys: [] } });
  assert.equal(c.states["daz:fl.themes.hello"].state, "can_do");
  assert.equal(c.states["fl.themes.hello"], undefined);
});

test("a practice session for the DaZ key draws only DaZ tasks", () => {
  const index = indexContent([englisch, daz], {}, "de-DE", { daz: "daz-start" });
  const c = newChild({ curriculum: "de-DE", year: "klasse-1", band: "6-7" });
  const s = buildSession({ kind: "skill", child: c, index, skills: ["daz:fl.themes.hello"], rng: mulberry32(1) });
  assert.ok(s.items.length > 0);
  assert.ok(s.items.every((it) => it.set === "de-DE.daz.de-hello"));
});
