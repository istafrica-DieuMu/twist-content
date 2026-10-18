# Practice content: authoring queue

Queued 2026-10-18 after the pilot on the times tables (commit 3eef54499).
Covers G12 to G14 in PLAN.md: a check pool in every lesson set, and drill
banks for the skills to know by heart. The format is in
lesson-anatomy.md, "Check pools"; drill banks in practice.md.

Progress is read from the lessons and shown in views/tracking.md,
"Practice content", one row per batch. Nothing here is ticked by hand.

## Size

| Work | Count | New tasks |
|---|---|---|
| Skill checks from 5 to 20 (4 to 20 at ages 4 to 5) | 912 sets | about 13,700 |
| Quick checks from 3 to 6 | 968 checks | about 2,900 |
| Drill banks | 24 new, 30 in all | about 1,500 items |

## Brief for each lesson set

Give the authoring agent this list, the "Authoring checks" in
lesson-anatomy.md and one pilot set of the same subject as the model
(`lessons/de-DE/klasse-2/math/table-7.yaml` or
`lessons/en-GB/year-4/math/table-7.yaml` for maths).

1. **Parts.** Add `metadata.parts`: 2 to 5 parts of the skill, taken from
   its "I can" line and what the lessons teach, each with `what` in de and
   en. A part is something the check must show, not a task type.
2. **Skill check.** Add `draw: 5` (`draw: 4` at ages 4 to 5) and a `part`
   on every task. Keep the existing tasks and their ids; write new ones on
   from the last id (`l2-c6` ...) to 20 in all, at least 3 a part, spread
   evenly.
3. **Quick checks.** Add `draw: 3` and 3 new tasks to each, on what that
   lesson taught.
4. **Every rule of a check holds**: no hints, only the first try counts,
   no `speak` in a skill check, no task copied from Practise or a Warm-up,
   no task twice in a pool. A no-reading set keeps options the child can
   hear.
5. **Mix the task types** the lessons use, and keep the difficulty of the
   no-help stage. A pool is not 20 of one type.
6. **Pictures and components.** Use objects already in the asset bank and
   components already in the set; a new object needs a picture
   (assets/tools/pictures.py) and goes in the batch's notes.
7. **Language.** German written and spoken as a native teacher would;
   British English for en-GB. Foreign-language sets keep instructions in
   the home language as their lessons do.
8. **Done** when `node twist/build.mjs` shows no warnings for the set.

## Batches

In this order: maths first (most practice and every drill bank), then the
home languages, then the foreign languages. A batch is one row of the
tracking table; an agent takes about 15 sets at a time.

| # | Batch | Sets |
|---|---|---|
| 1 | de-DE math klasse-1 | 41 |
| 2 | de-DE math klasse-2 | 63 (3 done) |
| 3 | de-DE math klasse-3 | 51 |
| 4 | de-DE math klasse-4 | 48 |
| 5 | en-GB math reception | 14 |
| 6 | en-GB math year-1 | 29 |
| 7 | en-GB math year-2 | 51 (1 done) |
| 8 | en-GB math year-3 | 52 (1 done) |
| 9 | en-GB math year-4 | 39 (1 done) |
| 10 | en-GB math year-5 | 48 |
| 11 | en-GB math year-6 | 26 |
| 12 | de-DE lit-de klasse-1 | 51 |
| 13 | de-DE lit-de klasse-2 | 46 |
| 14 | de-DE lit-de klasse-3 | 42 |
| 15 | de-DE lit-de klasse-4 | 35 |
| 16 | en-GB lit-en reception | 32 |
| 17 | en-GB lit-en year-1 | 32 |
| 18 | en-GB lit-en year-2 | 29 |
| 19 | en-GB lit-en year-3 | 20 |
| 20 | en-GB lit-en year-4 | 16 |
| 21 | en-GB lit-en year-5 | 17 |
| 22 | en-GB lit-en year-6 | 17 |
| 23 | de-DE fl stufe-0 | 14 |
| 24 | de-DE fl lernjahr-1 | 28 |
| 25 | de-DE fl lernjahr-2 | 16 |
| 26 | en-GB fl ly-1 | 14 |
| 27 | en-GB fl ly-2 | 28 |
| 28 | en-GB fl ly-3 | 11 |
| 29 | en-GB fl ly-4 | 8 |

**After each batch:**
- A second agent reviews it against the same brief: answers, one right
  option, native language, parts that fit the skill, no copies.
- Narrate the new lines in the check voices (`narration.py --voice
  gemini-puck` and `--voice gemini-puck-en`), then rebuild the player.
- Add the pass to reviews.yaml.
- Commit the batch.

## Drill banks

One hand-written bank per skill (practice.md, Drill banks). Done: 5 and
10, 3 6 9, 7, facts to 20, Year 1 exception words, Sight words easy.

| Subject | Skill | Items |
|---|---|---|
| Maths | `math.add-sub-to-20.add-to-10` | the additions to 10 |
| Maths | `math.add-sub-to-20.sub-to-10` | the subtractions to 10 |
| Maths | `math.add-sub-to-100.complement` | pairs to 100 in tens and fives |
| Maths | `math.numbers-to-100.double-halve` | doubles to 50 and halves to 100 |
| Maths | `math.mult-div.core-facts` | ×1, ×2, ×5, ×10 |
| Maths | `math.mult-div.table-2-4-8` | 2, 4 and 8, with division |
| Maths | `math.mult-div.all-tables` | every fact to 10 × 10, mixed |
| Maths | `math.mult-div.div-facts` | every division fact to 100 ÷ 10 |
| Maths | `math.mult-div.squares` | the squares to 10 × 10 |
| Maths | `math.mult-div.table-11-12` | 11 and 12, to 12 × 12 |
| English | `lit-en.word-reading.first-tricky-words` | Reception tricky words, flash |
| English | `lit-en.word-reading.exception-words-y2` | Year 2 words, flash |
| English | `lit-en.spelling.exception-words-y2` | Year 2 words with sentences, say |
| English | `lit-en.word-reading.exception-words-ks2` | KS2 words, flash |
| English | `lit-en.spelling.word-list-3-4` | the Year 3 and 4 statutory words, say |
| English | `lit-en.spelling.word-list-5-6` | the Year 5 and 6 statutory words, say |
| Deutsch | `lit-de.fluency.function-words` | häufige kleine Wörter, flash |
| Deutsch | `lit-de.fluency.sight-words-longer` | längere Blitzwörter, flash |
| Deutsch | `lit-de.spelling.core-vocabulary` | Grundwortschatz with sentences, say |
| Deutsch | `lit-de.letters.sound-chart` | letter and Anlaut, flash |
| Foreign language | `fl.themes.numbers-to-10` | number words, needs a new item format |
| Foreign language | `fl.themes.numbers-to-20` | number words, needs a new item format |
| Foreign language | `fl.themes.numbers-to-100` | number words, needs a new item format |
| Foreign language | `fl.themes.colours` | colour words, needs a new item format |

The foreign-language banks need an item that pairs a word in the new
language with a picture or the home-language word. Decide that format
before writing them; drills-check.mjs then checks it.

## Open before starting

- The converter (handoff page) reads `metadata.parts`, `draw` and `part`;
  the pilot sets show the format.
- Narration of about 16,600 new lines in the check voices.
- The foreign-language drill item format.
