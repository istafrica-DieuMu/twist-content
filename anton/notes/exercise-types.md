# Exercise types

Step 1e note, 2026-10-09. The type table itself is in
[../../taxonomy.md](../../taxonomy.md); per-trainer counts, subjects and
examples are in
[../../catalogue/views/anton-trainers.md](../../catalogue/views/anton-trainers.md).
This note records how the types were found, what was checked, and what the
inventory says.

## Method

1. **Names from the data.** Every exercise file lists its interactions as
   `trainers[].trainer`. The 1c text sample (2,514 files, 399 lessons, all
   121 courses) gave 62 names. They were grouped into 23 shared types by
   their item fields (`atoms`) and mapped to the closest Twist schema in
   `schemas/question-types/`.
2. **Checked in the browser.** Step 1d opened one exercise per type and
   screenshotted it (20 of 23 types; `notes/1d-log.md`). Four mappings were
   corrected (see below).
3. **Widened by the full text.** The 1f pass added 3 trainers the sample
   missed (`syllabifier`, `selectFrom100`, `squareMirror`). 65 so far.

## What the inventory says

- **Most interaction is gap filling and choosing.** In the sample, fill-gap
  (1,574 exercises) and choose-one (1,370) are far ahead of the next type,
  teach screens (649) and match-pairs (637).
- **A long tail of specialised trainers.** 33 of the 62 sampled trainers
  appear in fewer than 60 sampled exercises, 25 in fewer than 20. Many belong to one subject: `mathGrid`
  and `mathFormula` (written maths), `flashRead` (Blitzlesen), `followPath`
  (handwriting), `syllabifier` (German syllables), `kidSoundSequence`
  (music).
- **One exercise mixes trainers.** An exercise file lists 4.2 trainer
  entries on average; trainer and item are not one-to-one.
- **Exercises are about 14 items long** on average (1f files so far).

## Corrections from the browser pass

| Was | Is | Evidence |
|---|---|---|
| `memory` = pairs game only | also tap-in-order (`chooseMode`) | `screenshots/1d/10-memory-start.png` |
| segment (cut words up) | assemble-from-parts: `wordSlice` builds "Baum" from B, m, au | `screenshots/1d/a0-wordSlice-start.png` |
| teach = passive | `contentPlayer` can be an interactive audio story with a hint button | `screenshots/1d/c0-contentPlayer-start.png` |
| Twist `drag-and-drop-count` has no Anton match | `dragAndValidate` counts coins into a purse | `screenshots/1d/b0-dragAndValidate-start.png` |

## Against Twist

Anton types with no Twist question type: teach screens, the memory game,
tap on a picture, written-maths grids, colouring, timed reading, geometry
transforms, syllable marking, the hundred square, and read-a-passage-then-
answer (Twist can ask the questions but has no passage).

Twist types with no Anton trainer of their own: `true-false`, `pick-side`,
`point-on-line`, `speak`.

## Gaps in this note

- count (`kidCount`), set-clock (`digitalClock`) and colour-in
  (`kidColorize`) were not opened in the browser (English-GB only, or behind
  a preschool lock).
- Shares per type will be recounted from the full text when 1f finishes.
