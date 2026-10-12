# Exercise-type gap list

Phase 3 item 2, 2026-10-09. Which Anton interaction types Twist lacks, ranked
by how much Anton uses them, and which Twist types Anton lacks. Counts are
from the complete capture (31,768 exercises with trainers, both curricula)
via `anton/tools/type-counts.mjs`; type names are from
[taxonomy.md](taxonomy.md). One exercise can use several types, so shares add
up to more than 100%. Screenshots are in `anton/screenshots/1d/`.

## Anton types with no Twist question type

Ranked for Twist: reach in Anton first, then fit with Twist's subjects
(English, German, Math, G1 to G4).

| Rank | Shared type | Anton exercises | Share | Where Anton uses it | What it would take in Twist | Screenshot |
|---|---|---|---|---|---|---|
| 1 | find-on-picture (tap a place or object in a picture) | 1,656 | 5.2% | foreign languages, science, maths, Englisch | A tap-region question type: picture plus named hit zones. Closest Twist type is `point-on-line` (one axis only) | `e0-findOnImage-start.png` |
| 2 | read-and-answer (passage, then questions) | 1,105 | 3.5% | Deutsch, Englisch, English, biology | Twist's `*-context` items already show a 2 to 3 sentence passage. Anton's are full texts with several questions each: a passage step or a multi-question item | `g0-multipleChoiceText-start.png` |
| 3 | written-maths (column methods, formulas) | 1,040 | 3.3% | maths only | A digit-grid type for column addition, subtraction and multiplication (hundreds/tens/units cells, typed digits, check on demand). Relevant to G3/G4 math | `d0-mathGrid-start.png` |
| 4 | memory (pairs game) | 2,488 | 7.8% | foreign languages, Englisch, science, Deutsch | A game variant of `matching`. Note Anton also uses `memory` for tap-in-order, which Twist's `ordering` covers | `10-memory-start.png` |
| 5 | mark-syllables (German syllable arcs) | 57 | 0.2% | Deutsch K1/K2, English | Small in Anton, but syllable marking is a core German primary method; relevant to German G1/G2 | none (found in 1f) |
| 6 | timed (flash reading, race games) | 289 | 0.9% | maths, Deutsch, English | A timer on an existing type (show the word for about 2 s, then choose). Supports reading fluency | `90-flashRead-start.png` |
| 7 | colour-in (pick a colour, tap a region) | 274 | 0.9% | preschool, chemistry, maths | Would reuse the tap-region type from rank 1 | none (checked by hand) |
| 8 | geometry transforms (move, mirror) | 80 | 0.3% | maths | A grid with draggable points; G3/G4 symmetry | `h0-shapeMirror-start.png` |
| 9 | grid-shading (hundred square, shade parts) | 46 | 0.1% | maths | A selectable grid; place value and fractions | none (found in 1f) |

## Anton types Twist covers only partly

| Shared type | Anton exercises | Twist type | Difference |
|---|---|---|---|
| assemble-from-parts (`wordSlice`, `sentenceSlice`) | 1,571 | `ordering` | Anton builds words from letter and syllable tiles with a picture cue |
| build-word (`wordBuilder`, `dragSpell`, `dragOrder`) | 2,818 | `ordering`, `text-input` | Anton also builds non-word answers (year spans) from tiles |
| label-picture (`dragAndValidate`, `dragPunc`, `dragPuzzle`) | 1,251 | `drag-and-drop`, `drag-and-drop-count` | Checked on Prüfen, not per drop |
| count (`kidCount`, `mathFillStripe`) | 120 | `tap-to-count` | Close match |
| set-clock (`digitalClock`) | 10 | `clock-hands-drag` | Anton's is digital; Twist's is analogue |

## Twist types Anton has no trainer for

| Twist type | Note |
|---|---|
| `speak` | Anton has no speaking interaction in either curriculum. Twist's is a real differentiator |
| `true-false` | Anton asks yes/no through general button trainers |
| `pick-side` | No direct counterpart seen |
| `point-on-line` | No number-line trainer of its own seen |

## What is not known yet

- Which Twist item types the app renders today. The gap list should be read
  against the app's renderer list, which needs the app team.
- How often each Anton type appears per grade. The counts above are across
  all grades; a per-grade cut for G1 to G4 would sharpen ranks 1 to 3.
