# Lesson anatomy: Twist vs Anton

How each product structures content, level by level, and what each calls
the parts. Twist from schoolido-learning (`docs/specs/lesson-part.md`,
`schemas/`); Anton from the course and exercise files (1b, 1c, 1f) and the
browser pass (1d).

**Anton names** are given three ways: the name in Anton's files, the label
in the German app, and the label in English-GB URLs. Labels marked "seen"
were read on screen in 1d; the English-GB labels come from URLs only,
because the account ran in the German version.

## Side by side

| level | twist | twist size | anton | anton size | anton labels | note |
|-------|-------|------------|-------|------------|--------------|------|
| Language | Language of instruction (LOI): `en`, `de`. One curriculum, written in two languages | 2 LOIs | Language version: `guiLanguages` de, en_gb, en_us, fr, es, pt. Each has its own curricula | 6 versions | DE: language picker "DE"; GB: "EN (UK)" (seen) | Twist translates one curriculum; Anton runs separate national curricula |
| Subject | Subject: `english`, `german`, `math` | 3 | Subject code: `natdeu`, `nateng`, `mat`, `sci`, `deu` (DaZ), ... | 15 in German-DE, 12 in English-GB | DE: Fach / Fächer (seen); GB: Subject | Anton also has science, humanities, music, preschool and DaZ |
| Grade | Grade: `grade-1` to `grade-4` | 4 | Course (`plan`), one per subject and grade or grade band | 121 courses in both curricula | DE: "1. Klasse", "9./10. Klasse", "Oberstufe" (seen); GB: "Year 1", "KS3" | Anton's course is a subject-grade pair; bands (KS2, Oberstufe) span grades |
| Unit | Unit (`module_metadata.unit`), a broad domain | a few per subject and grade | Topic | 7 to 22 per primary core course (Deutsch, English, Maths, grades 1 to 6) | DE: section headings on the course page, `thema-03-...` in URLs (seen); GB: `topic-08-...` in URLs | Close match in role |
| Lesson | Lesson: one topic folder holding its parts and a final assessment | 25 to 43 per subject and grade (en LOI) | Lesson (`block`) | 5,213 in both curricula; 42 to 165 per primary core course | DE: "Zählen 1 bis 5 · 10 Übungen", page title "Übungen - ..." (seen); GB: `exercises-01-...` in URLs | Anton has 2 to 4 times more lessons per grade; each is smaller |
| Sitting | Part: one 5 to 15 minute sitting with its own `module_id` | several per lesson (CVC Words has 6: five parts plus a review) | none; the learner picks any exercise in a lesson | | | Twist's part has no Anton counterpart |
| Step / exercise | Step: 6 or 7 in fixed order: opener, warmup, teach, guided practice, applied practice, challenge, assessment | 6 or 7 per part | Exercise (`level`), free order, no fixed roles; kinds `normal`, `test`, `bulb` | median 6 per lesson (90% have 4 to 8) | DE: "Übung1: ..." on the lesson path, "Übung" in URLs (seen); GB: `exercise-01` in URLs | Twist steps have teaching roles; Anton exercises are interchangeable drills plus one test |
| Item | Question with a stable `id` (`wu-1`, `gp-1`, ...) | 25 to 35 per part | Item (`atom`) inside a trainer | about 14 per exercise, about 80 per lesson | none on screen; the progress bar counts them | Similar volume per sitting |
| Interaction type | Question type: 19 schemas in `schemas/question-types/` | 19 | Trainer, Anton's own name per interaction | 66, grouped into shared types (taxonomy.md) | none on screen | Anton has 9 shared types Twist lacks |
| Teaching | `teach` step: 3 to 5 worked examples, no interaction, before practice | 1 per part | Teach screens (`content`, `contentCard`) or interactive stories (`contentPlayer`), mixed in where the author puts them | 649 in the 1c sample | DE: none separate; "Tipp" button on some (seen) | Twist always teaches first; Anton teaches when a lesson needs it |
| Hints | 3 tiers per guided-practice question (strategy, metacognitive, direct cue) | 3 per guided question | Hint per exercise on some exercises; a reveal after a mistake | some exercises | DE: "Tipp", "Lösen" (seen) | Twist scaffolds per item; Anton reveals the answer |
| Wrong answer | Re-queued later in the part (repeat-on-failure) | | Retry in place; the item stays until right or revealed | | red progress segment (seen) | |
| Formative check | `assessment` step: exactly 5 questions, no hints | 1 per standard part | Test exercise (`type: test`), about one per lesson | 4,564 | DE: "Test", earns trophies (seen) | |
| Summative check | Final assessment: 8 to 15 skill slots, 2+ items each, one picked per attempt | 1 per lesson, plus grade baseline and grade final | none seen beyond the lesson test | | | Twist has placement and grade-level assessment; Anton does not |
| Practice | `skill_practice` banks and `practice_set` compositions outside the lesson | per skill | Replay any exercise; no separate practice banks seen | | DE: retry button on the end screen (seen) | |
| Reward | XP per step (5 to 40) | per step | 3 stars per exercise, trophies for tests, coins for games | | DE: stars, trophies, coins, "Spiele" (seen) | Anton's rewards are visible and spendable |
| Order and locks | Parts in order; prerequisites by `module_id` | | No locks in school courses; preschool puzzles unlock in sequence | | lock icons in preschool (seen) | |
