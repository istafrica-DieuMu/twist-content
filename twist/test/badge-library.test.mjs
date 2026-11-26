import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const T = join(dirname(fileURLToPath(import.meta.url)), "..");
const lib = parse(readFileSync(join(T, "badges/badge-library.yaml"), "utf8"));

const CATEGORIES = ["consistency", "mastery", "effort-growth", "explorer", "firsts", "star-collector", "progress"];
const METRICS = ["streak", "perfect_lessons", "correct_in_row", "total_correct", "grades_mastered", "retried_lessons",
  "score_improved", "mistakes_corrected", "all_subjects_days", "all_subjects_weeks", "balanced_learner",
  "lessons_replayed", "stars", "stars_in_a_day", "lessons_completed", "grades_completed"];
const SUBJECTS = ["math", "english", "german"];

const family = (prefix, ns, subjects) => (subjects ? subjects.flatMap((s) => ns.map((n) => `${prefix}_${s}_${n}`)) : ns.map((n) => `${prefix}_${n}`));
const PDF_IDS = [
  ...family("streak", [5, 10, 15, 30, 50, 100, 200, 365]),
  ...family("perfect_lessons", [5, 10, 25, 50, 100]),
  ...family("perfect_lessons", [5, 10, 25, 50], SUBJECTS),
  ...family("correct_in_row", [5, 10, 25, 50]),
  ...family("total_correct", [50, 250, 500, 1000, 2000]),
  ...family("grades_mastered", [1, 3, 5], SUBJECTS),
  ...family("retried_lessons", [5, 10, 25, 50]),
  ...family("score_improved", [1, 5, 10, 25]),
  ...family("mistakes_corrected", [10, 25, 50, 100]),
  ...family("all_subjects_day", [1, 5, 10, 25]),
  ...family("all_subjects_week", [1, 4, 12]),
  ...family("balanced_learner", [1, 4, 12]),
  "first_lesson", "first_star", "first_perfect_lesson", "first_retry", "first_grade_completed",
  ...SUBJECTS.map((s) => `first_lesson_${s}`), ...SUBJECTS.map((s) => `first_grade_${s}`),
  ...family("stars_total", [10, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500]),
  ...family("stars", [10, 25, 50, 75, 100, 150, 200, 250, 300], SUBJECTS),
  ...family("stars_day", [5, 10, 15, 20, 25, 30, 35, 40]),
  ...family("lessons_completed", [5, 10, 25, 50, 100, 150, 200]),
  ...family("lessons_completed", [5, 10, 20, 35, 50, 75], SUBJECTS),
  ...family("grades_completed", [2, 4, 6, "all"]),
  ...family("grades_completed", [2, 4, "all"], SUBJECTS),
];

test("the library holds the 160 badges of the badge library, each once", () => {
  const ids = lib.badges.map((b) => b.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual([...ids].sort(), [...PDF_IDS].sort());
});

test("the seven categories have names in English and German", () => {
  assert.deepEqual(lib.categories.map((c) => c.id), CATEGORIES);
  for (const c of lib.categories) assert.ok(c.name?.en && c.name?.de, c.id);
});

test("every badge has a known category, metric and subject, and a threshold", () => {
  for (const b of lib.badges) {
    assert.ok(CATEGORIES.includes(b.category), `${b.id}: category ${b.category}`);
    assert.ok(METRICS.includes(b.metric), `${b.id}: metric ${b.metric}`);
    assert.ok(b.subject === undefined || SUBJECTS.includes(b.subject), `${b.id}: subject ${b.subject}`);
    assert.ok(b.threshold === "all" || (Number.isInteger(b.threshold) && b.threshold > 0), `${b.id}: threshold ${b.threshold}`);
  }
});

test("every badge has a name and a description in English and German, and no two share a name", () => {
  for (const b of lib.badges) {
    for (const lang of ["en", "de"]) {
      assert.ok(b.name?.[lang]?.trim(), `${b.id}: name.${lang}`);
      assert.ok(b.description?.[lang]?.trim(), `${b.id}: description.${lang}`);
    }
  }
  for (const lang of ["en", "de"]) {
    const names = lib.badges.map((b) => b.name[lang]);
    assert.equal(new Set(names).size, names.length, `repeated ${lang} name`);
  }
});

test("every badge has a goal in English and German, unlike its description", () => {
  for (const b of lib.badges) {
    for (const lang of ["en", "de"]) {
      assert.ok(b.goal?.[lang]?.trim(), `${b.id}: goal.${lang}`);
      assert.notEqual(b.goal[lang], b.description[lang], `${b.id}: goal.${lang} repeats the description`);
    }
  }
});

test("each category has titled sets, and its badges are in its sets, one set after another", () => {
  const setIds = lib.categories.flatMap((c) => (c.sets ?? []).map((s) => s.id));
  assert.equal(new Set(setIds).size, setIds.length, "repeated set id");
  for (const c of lib.categories) {
    assert.ok(c.sets?.length, `${c.id}: no sets`);
    for (const s of c.sets) {
      assert.match(s.id, /^[a-z0-9-]+$/, `${c.id}: set id ${s.id}`);
      assert.ok(s.name?.en?.trim() && s.name?.de?.trim(), `${c.id}: set ${s.id} name`);
    }
    const order = lib.badges.filter((b) => b.category === c.id).map((b) => b.set);
    for (const set of order) assert.ok(c.sets.some((s) => s.id === set), `${c.id}: badge set ${set} is not one of its sets`);
    const runs = order.filter((s, i) => s !== order[i - 1]);
    assert.deepEqual(runs, c.sets.map((s) => s.id).filter((id) => order.includes(id)), `${c.id}: badges out of set order`);
    for (const s of c.sets) assert.ok(order.includes(s.id), `${c.id}: set ${s.id} has no badges`);
  }
});

test("every badge has its picture in assets/badge-library", () => {
  const missing = lib.badges.filter((b) => !existsSync(join(T, "assets/badge-library", `${b.id}.webp`))).map((b) => b.id);
  assert.deepEqual(missing, []);
});
