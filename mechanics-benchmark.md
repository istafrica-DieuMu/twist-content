# Lesson mechanics benchmark

Phase 3 item 3, 2026-10-09. Twist's lesson flow
(`schoolido-learning/docs/specs/lesson-part.md`, `docs/specs/assessment.md`)
against Anton's, from the course files and the browser pass
(`anton/notes/lesson-mechanics.md`, screenshots in `anton/screenshots/1d/`).
The structure side by side is in [anatomy.md](anatomy.md); this file is about
how a learner moves through it, and what Twist could take from it.

## Volume

| | Twist | Anton |
|---|---|---|
| One sitting | a part: 6 or 7 steps, 25 to 35 questions, 5 to 15 minutes | no fixed sitting; one exercise is about 14 items |
| One lesson | several parts plus a final assessment | median 6 exercises (about 80 items), one of them a test |
| Practice outside the lesson | `skill_practice` banks and `practice_set` mixes | replay any exercise |
| Summative | lesson final (8 to 15 slots), grade baseline and final | the lesson test only |

A Twist part is about the size of two Anton exercises. Item volume per
lesson is similar; Anton spreads it over more, smaller lessons.

## Flow, side by side

| Moment | Twist | Anton | Evidence |
|---|---|---|---|
| Start | opener with a learning objective, then 3 warmup checks | straight into the first item; instruction read aloud | `10-memory-start.png` |
| Teaching | always: 3 to 5 worked examples before practice | only where the author put a teach screen or story | `c0-contentPlayer-start.png` |
| First mistake | 3 hint tiers on guided items; re-queued later | red segment, retry the same item at once | `11-memory-wrong-feedback.png` |
| Stuck | tier 3 hint is a direct cue | "Lösen" reveals the answer; counted grey | `24-findAll-reveal.png` |
| Constructive tasks | answer checked per item | some types wait for "Prüfen" | `b0-dragAndValidate-start.png` |
| Progress | step header chip | a bar that fills one segment per answer, coloured right / wrong / revealed | `12-memory-after-item.png` |
| End | XP per step | Anton character, cheer, 0 to 3 stars, retry, next | `13-exercise-end.png` |
| Test | per-part assessment, 5 questions, no hints | test exercise, same feedback as practice, trophies | `41-test-wrong.png` |
| Rewards | XP | stars, trophies, coins spent on games | `m2-spiele.png` |
| Order | parts in sequence, prerequisites | any exercise, any time (school courses) | `14-lesson-path-after-ex1.png` |

## What Twist could take

Proposals for the app and content teams; none is decided.

1. **A segmented progress bar.** One segment per answered item, coloured by
   result, is cheap and gives the child a running sense of how it is going.
2. **A reveal after repeated mistakes in practice steps.** Twist's tier 3
   hint comes close; an explicit "show me" that counts as neither right nor
   wrong would stop a stuck child from guessing. Not in assessments.
3. **Check on demand for constructive items** (ordering, building, drag
   into zones): let the child arrange everything, then check, instead of
   judging each move.
4. **Visible, spendable rewards.** Stars per step and a coin-for-game loop
   are an app decision, not content; Anton shows how far it goes.
5. **Shorter units for review.** Anton's 14-item exercises are a good size
   for revisiting one skill; Twist's `skill_practice` banks could be served
   in runs of about that length.

## What Twist should keep

- Teaching before practice in every part. Anton teaches only where an author
  added a teach screen; many of its lessons go straight to drills.
- Three-tier hints per guided item. Anton's hints are per exercise and rare.
- Assessment design: slot-based finals, baselines and grade finals. Anton has
  only a per-lesson test with the same feedback as practice.
- Speaking items. Anton has none.
