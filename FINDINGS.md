# Findings

One row per finding. Every finding links to the source files it rests on.
Ids are never reused; a rejected finding keeps its row.

- **area**: curriculum, exercise-types, mechanics, media, audio, api, other.
- **status**: open (recorded, not acted on), applied (fed into Schoolido
  work), rejected (checked and dropped; say why in the finding).
- **fed into**: the Schoolido PR, doc or decision it changed.

| id | source | area | finding | evidence | status | fed into |
|----|--------|------|---------|----------|--------|----------|
| F-001 | anton | exercise-types | Anton uses 65 distinct trainers; fill-gap (1,574 sampled exercises) and choose-one (1,370) lead, then a long tail where 25 of 62 sampled trainers appear in fewer than 20 exercises | `taxonomy.md`, `catalogue/views/anton-trainers.md`, `anton/notes/exercise-types.md` | open | |
| F-002 | anton | exercise-types | 9 shared Anton types have no Twist question type: teach screens, memory game, tap-on-picture, written-maths grid, colouring, timed reading, geometry transforms, syllable marking, read-a-passage-then-answer | `taxonomy.md` (schoolido column) | open | |
| F-003 | anton | curriculum | English-GB has 61 courses, 2,582 lessons, 14,563 exercises across 12 subjects; German-DE 71 courses, 2,945 lessons, 18,679 exercises across 15 subjects; both run from preschool to KS3 or Oberstufe | `anton/notes/subjects.md`, `anton/api/plan/` | open | |
| F-004 | anton | curriculum | Anton's Deutsch has 91 to 135 lessons per grade in Klasse 1 to 3; its UK English has 117 lessons in Year 2 and 165 in Year 1 | `anton/notes/topic-maps.md`, `catalogue/views/` | open | |
| F-005 | anton | exercise-types | Some Anton interactions check only on a Prüfen button (coins into a purse, column subtraction grid, ordering, mirroring a shape) rather than per tap | `anton/screenshots/1d/b0-dragAndValidate-start.png`, `d0-mathGrid-start.png`, `j0-dragSort-start.png`, `h0-shapeMirror-start.png` | open | |
| F-006 | anton | curriculum | German literacy trainers absent from Twist: syllable marking (`syllabifier`, 42 exercises so far) and timed reading (`flashRead`, word shown about 2 s) | `anton/screenshots/1d/90-flashRead-start.png`, `91-flashRead-word.png`, `taxonomy.md` | open | |
| F-007 | anton | mechanics | A wrong answer adds a red progress segment and the learner retries the same item; the item never resets | `anton/screenshots/1d/11-memory-wrong-feedback.png`, `53-dragMatch-wrong.png`, `anton/notes/lesson-mechanics.md` | open | |
| F-008 | anton | mechanics | After a mistake a Lösen button reveals the answer; revealed items count grey, neither right nor wrong | `anton/screenshots/1d/22-findAll-wrong.png`, `24-findAll-reveal.png` | open | |
| F-009 | anton | mechanics | Lessons have a median of 6 exercises (90% have 4 to 8, over all 5,213); exercises average about 14 items; tests are separate exercises, 4,564 of 31,804 | `catalogue/catalogue.db` (lesson, exercise tables), `anton/notes/lesson-mechanics.md` | open | |
| F-010 | anton | mechanics | Rewards: up to 3 stars per exercise, trophies for tests, coins (2 after one exercise) spent on games; no locks in school courses, sequential locks in preschool puzzles | `anton/screenshots/1d/13-exercise-end.png`, `51-lesson-einzahl-mehrzahl.png`, `m2-spiele.png`, `l0-kidColorize-start-course.png` | open | |
| F-011 | anton | other | A sample spread across courses (4 lessons per course) looked saturated at 62 trainers but missed 3 that live in a few lessons (`syllabifier`, `selectFrom100`, `squareMirror`), found by the full-text pass | `anton/tools/lists/sample-1c.txt`, `taxonomy.md` | open | |
