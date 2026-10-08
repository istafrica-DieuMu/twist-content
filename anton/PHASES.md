# Anton R&D phases

## Phase 1: capture English-GB and German-DE (current)

Instructions in BRIEF.md. Run as five sub-steps, each its own session if
needed, with a commit at the end of each.

| Step | What | Done when |
|------|------|-----------|
| 1a | Recon. Sign in, start from the endpoints and plan ids in notes/prior/, save the plan index for every version and the subject lists, one full subject tree per curriculum, write notes/api.md. | API shape is known and an estimate exists for the full crawl: number of subjects, lessons and calls, and expected time. **Gate: stop and report the estimate before 1b.** |
| 1b | Full JSON crawl, English-GB. Every subject tree and every lesson's content into api/. | index.md lists every subject with lesson counts captured vs offered. |
| 1c | Full JSON crawl, German-DE. Same as 1b. | Same as 1b. |
| 1d | Hands-on pass. Play exercises until every type is covered, screenshot each, record lesson mechanics, spot-download media packs. | Every exercise type seen in the JSON has screenshots; media packs listed in index.md. |
| 1e | Notes. subjects.md, topic-maps.md, exercise-types.md, lesson-mechanics.md, api.md, usefulness.md in notes/; findings rows in ../FINDINGS.md; type and mechanics tables in ../taxonomy.md. | All six notes written from the captured data, with no re-fetching, and the two root files filled. |

Recon comes first because the API shape decides the cost. If lessons come as
one JSON per lesson, 1b and 1c are cheap. If content only appears in rendered
pages, the crawl is far slower and the plan should be revisited.

## Phase 2: other curricula

Same brief and layout, every grade. Steps 1a to 1c only at first; the
hands-on pass (1d) only for exercise types not already seen in Phase 1.

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

1. **Catalogue.** A script builds ../catalogue/catalogue.db (SQLite) from
   api/: subjects, lessons, items, exercise type, grade, plus generated
   Markdown views. Every later step queries this instead of reading raw JSON.
   Cheap, and it makes the rest fast.
2. **Exercise-type gap list.** Anton's types vs our
   schemas/question-types/ and what the app renders. Output: a ranked backlog
   of item types to add, with screenshots showing how each works. Also covers
   the item types the app currently drops.
3. **Lesson mechanics benchmark.** Items per lesson, practice vs test balance,
   retry and mastery rules, rewards. Compare against our depth contract and
   practice sets; propose changes for the app's lesson flow.
4. **Coverage matrix.** Built as ../crosswalk/anton-en.md and anton-de.md:
   Anton topics across all grades vs our catalogues, en and de separately. Not capped at G1-G4: what Anton teaches above our
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

Re-run the 1b/1c JSON crawl every few months and diff it against the saved
api/ files. Shows what Anton added or changed, at low cost because only the
API is fetched.
