# Taxonomy

Shared names used across FINDINGS.md, the catalogue and the crosswalk. Each
source's own labels map onto these, so different sources stay comparable.

## Exercise types

Version 1, 2026-10-09, from the Anton 1c text sample: 2,514 exercise files
from 399 lessons across all 121 courses. All 62 Anton trainers seen are
mapped below. The sample looked saturated (shuffled, the count of distinct
trainers levelled off at 62), but the full-text pass (1f) has since turned up
4 more trainers that live in a handful of lessons the sample did not reach:
`syllabifier`, `selectFrom100`, `squareMirror` (German-DE) and `squareShader`
(English-GB Maths). 66 in all, from the complete capture of 31,804
exercise files. Counts for the 62 are from the sample; the 4 new ones count
the full text.

**schoolido** is the closest file in schoolido-learning/schemas/question-types/,
or "none" when Twist has no equivalent. Mappings come from each trainer's
item structure in the JSON, checked in step 1d against screenshots of 20 of
the 23 types (anton/notes/1d-log.md); corrections from 1d are marked.
Exercise counts are exercises in the sample that use the trainer; one
exercise can use several trainers.

| type | description | Anton trainers (exercises in sample) | exercises | schoolido |
|------|-------------|---------------|-----------|-----------|
| fill-gap | Complete a sentence, table or diagram label, typed or from buttons | `gapMulti` 707, `gap` 515, `lsg` 231, `table` 118, `flowText` 3 | 1574 | fill-in-blank, text-input |
| choose-one | Pick one answer from text or picture options | `buttons` 544, `multipleChoice` 392, `imageButtons` 229, `selectCard` 128, `flipButtons` 73, `switchPath` 4 | 1370 | multiple-choice, image-multiple-choice |
| teach | Explanation screen or narrated walkthrough; `contentPlayer` can be interactive (1d: tap the right character in an audio story) | `content` 432, `contentCard` 118, `contentPlayer` 95, `list` 4 | 649 | none (Twist teach step, not a question type) |
| match-pairs | Connect items that belong together | `dragMatch` 348, `listMatchVertical` 101, `listMatch` 61, `lineCombineRight` 58, `kidPairs` 31, `dragCard` 15, `drawLines` 13, `lineCombineLeft` 10 | 637 | matching |
| build-word | Spell or build a word from letters or parts | `wordBuilder` 171, `dragSpell` 110, `dragOrder` 79 | 360 | ordering, text-input |
| memory | Memory game: turn cards to find pairs; with `chooseMode` it is tap-in-order instead (seen in 1d) | `memory` 358 | 358 | none (pairs game); ordering (tap-in-order) |
| sort-into-groups | Drag items into named categories | `dragGroup` 205, `kidDragGroup` 89 | 294 | sorting |
| choose-all | Select every option that fits | `findAll` 203, `findSequence` 29, `kidCards` 18 | 250 | multi-select |
| find-on-picture | Tap the right place or object in a picture | `findOnImage` 157, `findZone` 9, `findAny` 6 | 172 | none |
| choose-by-sound | Hear a prompt, pick the matching option | `soundButtons` 171 | 171 | audio-choice |
| find-in-text | Tap words in a text that meet a condition | `findWordsInText` 129, `gravity` 24 | 153 | highlight-in-text |
| assemble-from-parts | Put a word or sentence together from given pieces (1d: wordSlice builds "Baum" from B, m, au); was "segment", renamed | `wordSlice` 73, `sentenceSlice` 65 | 138 | ordering |
| read-and-answer | Read a passage, then answer questions on it | `multipleChoiceText` 107, `buttonsText` 15 | 122 | multiple-choice (passage not modelled) |
| label-picture | Drag labels, pieces or objects to zones on a picture, checked with Prüfen (1d: coins into a purse to make an amount) | `dragAndValidate` 84, `dragPunc` 18, `dragPuzzle` 3 | 105 | drag-and-drop, drag-and-drop-count |
| written-maths | Work a calculation in a grid or formula, typed | `mathGrid` 43, `mathFormula` 41, `mathFreeGrid` 5 | 89 | text-input (no column-arithmetic grid) |
| put-in-order | Arrange steps, items or sounds in sequence | `dragSort` 59, `kidSoundSequence` 8, `listSort` 3 | 70 | ordering |
| trace-path | Follow or draw a path | `followPath` 58 | 58 | tracing |
| colour-in | Colour parts of a picture by rule: pick a colour, then tap a region (part of a square, a circle, ...); checked by hand by the user | `kidColorize` 17 | 17 | none |
| timed | Answer against a clock or in a race game | `flashRead` 11, `buttonsAnimationTime` 3, `buttonsAnimation` 2 | 16 | none (no timed mode) |
| odd-one-out | Remove the items that do not belong | `kickItem` 15 | 15 | multi-select |
| geometry | Move, mirror or transform a shape; `squareMirror` found in 1f | `shapes` 4, `shapeMirror` 2, `squareMirror` 6 (1f so far) | 12 | none |
| count | Count objects or mark a quantity | `mathFillStripe` 3, `kidCount` 1 | 4 | tap-to-count |
| set-clock | Set a clock to a given time | `digitalClock` 2 | 2 | clock-hands-drag (analogue only) |
| mark-syllables | Mark the syllables of a word (German syllable arcs); found in 1f, not in the 1c sample | `syllabifier` 42 (1f so far) | 42 | none |
| grid-shading | Select or shade squares on a grid: numbers on a hundred square, shaded parts of a grid; found in 1f | `selectFrom100` 13, `squareShader` 8 (1f so far) | 21 | none |

Twist question types with no Anton trainer of their own in the sample:
`true-false`, `pick-side`, `point-on-line` and `speak`. (`drag-and-drop-count`
is covered by `dragAndValidate`, seen in 1d.)
Anton may cover some of these inside general trainers (true/false through
`buttons`, for example); step 1d checks.

Per-trainer counts, subjects and example exercises:
[catalogue/views/anton-trainers.md](catalogue/views/anton-trainers.md).

## Lesson mechanics

Terms for lesson structure: sequencing, retries, mastery, hints, feedback,
rewards and progression. Filled in step 1d; the structure-level terms below
come from the course files.

| term | meaning | source labels |
|------|---------|---------------|
| course | One subject for one grade or grade band | Anton: plan (`plan/<project>`) |
| topic | A unit within a course | Anton: topic |
| lesson | A unit of exercises: median 6, 90% have 4 to 8, range 2 to 48 (all 5,213 lessons) | Anton: block |
| exercise | One run of items with one or more trainers | Anton: level |
| item | One question or task inside an exercise | Anton: atom |
| end-of-lesson test | An exercise marked as the lesson's test | Anton: level `type: "test"` (4,564 of 31,804) |
| tip exercise | Exercise of kind `bulb` (251 of 31,804); meaning still to confirm | Anton: level `type: "bulb"` |
| stars | 0 to 3 per exercise, shown on the lesson path; three stars with one slip in 24 taps | Anton: end screen |
| trophies | Tests earn trophies instead of stars | Anton: test row in lesson list |
| coins | Earned by finishing exercises (2 after one exercise); spent on games | Anton: Spiele page |
| retry in place | A wrong answer adds a red progress segment; the learner tries again, the item does not reset | Anton: all trainers seen |
| reveal | After a mistake a Lösen button shows the answer; revealed items count grey, neither right nor wrong | Anton: findAll |
| check button | Some trainers check only on Prüfen (dragAndValidate, mathGrid, dragSort, shapeMirror) | Anton |
| hint | A Tipp button with a bulb on some exercises | Anton: contentPlayer |
| locks | None in school courses seen; preschool puzzle courses unlock tiles in sequence | Anton |
