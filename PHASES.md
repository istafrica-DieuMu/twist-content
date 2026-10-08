# Anton R&D phases

## Phase 1: capture English-GB and German-DE (current)

Instructions in BRIEF.md. Run as five sub-steps, each its own session if
needed, with a commit at the end of each.

| Step | What | Done when |
|------|------|-----------|
| 1a | Recon. Sign in, find the API, save the subject lists and one full subject tree per curriculum, write notes/api.md. | API shape is known and an estimate exists for the full crawl: number of subjects, lessons and calls, and expected time. **Gate: stop and report the estimate before 1b.** |
| 1b | Full JSON crawl, English-GB. Every subject tree and every lesson's content into api/. | index.md lists every subject with lesson counts captured vs offered. |
| 1c | Full JSON crawl, German-DE. Same as 1b. | Same as 1b. |
| 1d | Hands-on pass. Play exercises until every type is covered, screenshot each, record lesson mechanics, spot-download media packs. | Every exercise type seen in the JSON has screenshots; media packs listed in index.md. |
| 1e | Notes. subjects.md, topic-maps.md, exercise-types.md, lesson-mechanics.md, api.md, usefulness.md. | All six notes written from the captured data, with no re-fetching. |

Recon comes first because the API shape decides the cost. If lessons come as
one JSON per lesson, 1b and 1c are cheap. If content only appears in rendered
pages, the crawl is far slower and the plan should be revisited.

## Phase 2: other curricula

French, English-US and Spanish, using the same brief and layout. Steps 1a to
1c only at first; the hands-on pass (1d) only for exercise types not already
seen in Phase 1.

## Phase 3: put the data to work

Suggestions, roughly in order of payoff. Each one is a separate piece of work
in schoolido-learning, planned on its own when we get there.

1. **Searchable index.** Load api/ into a local SQLite database (subjects,
   lessons, items, exercise type, grade). Every later step queries this
   instead of reading raw JSON. Cheap, and it makes the rest fast.
2. **Exercise-type gap list.** Anton's types vs our
   schemas/question-types/ and what the app renders. Output: a ranked backlog
   of item types to add, with screenshots showing how each works. Also covers
   the item types the app currently drops.
3. **Lesson mechanics benchmark.** Items per lesson, practice vs test balance,
   retry and mastery rules, rewards. Compare against our depth contract and
   practice sets; propose changes for the app's lesson flow.
4. **Coverage matrix.** Anton topics vs our G1-G4 catalogues, en and de
   separately. This is where catalogue suggestions come back, now with full
   data behind them.
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
