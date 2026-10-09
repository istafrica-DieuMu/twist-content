# Anton R&D phases

## Phase 1: capture English-GB and German-DE (done 2026-10-09)

Revised 2026-10-09 after recon. All content is public JSON with a known file
list and byte size per file (notes/api.md), so the course structure alone
gives the full curriculum map, and a sample of exercise files gives the
exercise types. The capture runs in layers, cheapest first: structure, then
a text sample, then the browser pass. Full text, images and audio come later
and only where an output needs them.

| Step | What | Done when |
|------|------|-----------|
| 1a | Recon. Plan index for every language version, one course file per curriculum, one exercise file, notes/api.md. | API shape known, estimate reported. Done 2026-10-08. |
| 1b | Structure pass. Every course file listed in English-GB or German, outdated ones included: 121 files, 7.6 MB, 4 minutes. Builds ../catalogue/. | Catalogue lists every course, topic, lesson and exercise title with sizes. |
| 1c | Text sample. Up to 4 lessons per course spread across its topics, every exercise in each: 2,514 exercise files, 16 MB, about 45 minutes. Text only, no media. Builds ../taxonomy.md from Anton's trainer names. | Taxonomy lists every trainer type seen, with counts and the matching Twist question type. **Gate: if the last part of the sample still turns up new trainer types, extend the sample to the courses where they appeared before moving on.** |
| 1d | Browser pass. Needs the Playwright MCP and a sign-in. Play one exercise per trainer type and screenshot start, interaction and feedback; record lesson mechanics, rewards and progression. | Every trainer type in the taxonomy has screenshots; lesson-mechanics.md written. |
| 1e | Notes. subjects.md, topic-maps.md, exercise-types.md, lesson-mechanics.md, usefulness.md in notes/; findings rows in ../FINDINGS.md. | All notes written from captured data, findings filed. |
| 1f | Full text. Done 2026-10-09: all 31,804 exercise files. The remaining ~29,000 exercise files (about 167 MB), in 27 per-subject chunks (tools/lists/1f/README.md), all German-DE chunks first, then English-GB, run a few at a time. Run only when an output needs item-level data, such as difficulty calibration or the reference set. | Each chunk logged in index.md with captured vs listed counts. |
| 1g | Images. Done 2026-10-09: 12 lessons, 540 files. Image files for chosen lessons, listed per exercise in mediaFiles. | Lessons and reasons listed in index.md. |
| 1h | Audio. Done 2026-10-09: 12 lessons, 603 clips. Clips for a few lessons only, to judge voice and pacing. | Lessons listed in index.md. |

The fetch tool is tools/fetch.mjs: resumable through api/fetch-log.jsonl,
fixed delay between requests, and it never refetches or overwrites a file.

## Phase 2: other curricula (next)

Same brief and layout, every grade. Steps 1b and 1c only at first (the plan
index from 1a already lists every version); the browser pass (1d) only for
trainer types not already seen in Phase 1.

- **2a, EU curricula first:** French, Spanish, and any other European
  versions or country variants found in the Phase 1 plan index. Observed so
  far: EU countries follow a fairly similar school, subject and lesson
  structure to English-GB and German-DE, so these should map onto the Phase 1
  catalogue with little extra work. Phase 2a tests that claim and records
  where it breaks.
- **2b, English-US on its own:** its subjects and lesson structure differ
  from English-GB and German-DE, so it gets its own recon (1a) and its own
  mapping into the catalogue rather than reusing the EU shape.

## Phase 3: put the data to work

Suggestions, roughly in order of payoff. Outputs land at the rnd root. Any
change to Schoolido itself is a separate piece of work in schoolido-learning,
planned on its own when we get there.

1. **Catalogue.** Built early, in step 1b: ../catalogue/catalogue.db
   (SQLite) and Markdown views, rebuilt as more files are captured. Every
   later step queries it instead of reading raw JSON.
2. **Exercise-type gap list.** Anton's types vs our
   schemas/question-types/ and what the app renders. Output: a ranked backlog
   of item types to add, with screenshots showing how each works. Also covers
   the item types the app currently drops.
3. **Lesson mechanics benchmark.** Items per lesson, practice vs test balance,
   retry and mastery rules, rewards. Compare against our depth contract and
   practice sets; propose changes for the app's lesson flow.
4. **Coverage matrix.** Built in ../crosswalk/ (spec in its README): Anton
   lessons across all grades vs the Twist module catalogues, per LOI and
   subject. Lists missing lessons on either side and lessons misplaced by
   grade on either side. Not capped at G1-G4: what Anton teaches above our
   current grades shows where our progression leads. This is where catalogue
   suggestions come back, redoing notes/prior/ with full data behind them.
5. **Difficulty calibration.** Per grade: number ranges, word lengths,
   sentence lengths, distractor patterns. Feeds the grade-relative rules for
   authoring and the AI judge.
6. **Media benchmark.** From the media packs: image style, how counts and
   option icons are drawn, audio clip lengths and voice style. Compare with
   our image-gen rules and narration standard.
7. **Reference set for review.** Pick well-made Anton items as examples of
   each exercise type for the review app and the deep AI reviewer's gold set.
8. **German-DE insight for the de/ repair.** How Anton sequences German for
   German-speaking children, as input to the German en-LOI repair plan.

Phase 3 should learn from Anton's patterns, structure and mechanics. Reusing
Anton's actual questions, audio or images inside Schoolido content is a
different matter and needs a legal check first.

## Phase 4: keep it current (optional)

Re-run the 1b structure pass every few months and diff it against the saved
api/ files. Shows what Anton added or changed, at low cost because only the
API is fetched.
