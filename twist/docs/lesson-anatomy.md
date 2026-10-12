# Lesson anatomy

How a lesson is built, from the step it teaches down to a single item, and
how the app decides that a child has mastered a step. Decided 2026-10-12;
the levels above the lesson are in [model.md](model.md).

> Grade determines curriculum expectations, proficiency determines learning
> level, and age determines presentation.

## The levels

| Level | What it is | Size |
|---|---|---|
| Step | One "Ich kann / I can" competency in the library. The unit of placement and of mastery | |
| Lesson | Everything a child needs to learn one step (sometimes two that cannot be taught apart) | 2 to 6 parts |
| Part | One short sitting. A child finishes a part in one go | 5 to 12 minutes, by age band |
| Activity | One block inside a part with one job: start, teach, guided practice, practice, check, review, apply | 3 to 12 items, or a teach sequence |
| Item | One question of one Twist question type | |

A lesson is broken into parts because the learners are young: attention is
short, and a skill sticks better when it comes back over several sittings
than when it is drilled in one. This is the shape Twist had before (lesson,
parts, steps, questions), kept and renamed: a Twist "step" is now an
activity, and "question" is now an item.

Outside lessons, the same items feed practice runs, topic reviews,
diagnostics and stage assessments (below).

## Parts

- A lesson has as many parts as the step needs: a small step (read and set
  half past) may need 2, a large one (written subtraction with exchange) 5 or 6.
- Part length follows the age band:

| Age band | Part length | Items per part |
|---|---|---|
| a4-5 | about 5 minutes | 8 to 12 |
| a6-7 | about 8 minutes | 12 to 18 |
| a8-10 | about 10 to 12 minutes | 15 to 25 |

- Each part can be finished and left. The next part opens straight away,
  and the app suggests it on a later day when the lesson has more than two
  parts, so the lesson spreads over several sittings.
- Each part builds on the one before: new sub-skill, or the same skill
  with less support, or a new representation.
- The last part ends with the lesson check (see Mastery).

## Activities

Seven activity types. Every part uses some of them; which ones, in what
order and how long, depends on the subject and the size of the step.

| Activity | Job | Hints | Counts for mastery |
|---|---|---|---|
| Start | Says the goal in child language and warms up with 2 or 3 items from the prerequisite steps | no | no |
| Teach | Shows how: worked examples, a narrated demonstration, a model text, a sound and its letter. No answers asked, or only "do it with me" taps | n/a | no |
| Guided practice | First tries with full support | 3 tiers | no |
| Practice | Tries with less support, items getting harder; after two misses on an item the answer is shown and the item counts as neither right nor wrong | 1 tier | no |
| Apply | The skill in a new setting: a word problem, a sentence, a short text, a speaking task | 1 tier | no |
| Review | Mixed items from earlier parts or earlier steps | no | yes, as delayed evidence |
| Check | Short, no hints, first try counts | no | yes |

Rules for every lesson, whatever the subject:

1. Teach comes before the first practice of anything new.
2. Every part ends with something the child can succeed at (a check, a
   review, or a short apply), never in the middle of teaching.
3. The final part ends with the lesson check.
4. From the second part on, each part opens with a short review of the part
   before.

### Typical sequences by subject

Starting shapes, not templates. Authors change them when a step is bigger
or smaller.

**Mathe / Maths, concept step** (place value, a new operation): 3 to 4 parts.
Part 1: start, teach with the drawn model (Zwanzigerfeld, number line),
guided. Part 2: review, teach the second representation, guided, practice.
Part 3: review, practice, apply (Sachaufgabe). Part 4: review, check.

**Mathe / Maths, fluency step** (Einmaleins der 7, number bonds to 10):
2 to 3 parts, short teach of the strategy (derive from a core fact), then
long practice runs with rising speed; check at the end. Most of the work
then happens in practice runs outside the lesson.

**Deutsch, letter group** (L, O, A, M): one part per letter plus one mixed
part. Each part: hear the sound, see the letter, find it at the start of
words, blend syllables with letters already known, write the letter (trace,
then copy). Mixed part: read and write short words with all four, check.

**English, phonics** (s, a, t, p): the same shape as the German letter
group, following the school's phonics order.

**Reading comprehension** (find information, infer): 2 to 3 parts. Teach
the strategy on a short text read aloud, guided questions on a second text,
then a new text with practice questions and the check. Texts are
age-banded; for a4-5 and a6-7 they are read aloud.

**Writing and grammar** (direct speech, a report): teach with a model text,
guided sentence work (complete, reorder, correct), then an apply activity
that produces the child's own sentences or a short text. The check uses
selected-response and short constructed items; free writing is not scored
automatically.

**Englisch / French** (a theme, a language pattern): hear and repeat
(speaking), match word and picture or meaning, use in a short dialogue or
chunk, check. Listening and speaking come before reading and writing,
especially in Stufe 0 and for a4-5 and a6-7.

## Items

Items are hand-authored, so every lesson is checked by a person before a
child sees it.

Each item records:

- its question type (one of the Twist question types) and activity role;
- prompt text and spoken prompt (audio is always available for a4-5 and
  a6-7);
- the representation (below) and the data it needs;
- the correct answer and feedback for each typical wrong answer;
- for guided items, three hint tiers: strategy, think-aloud, direct cue;
- difficulty (easy, core, stretch) and the facets it depends on (currency,
  number format, script, written-subtraction method).

### Fewer images

Each item takes the least image-heavy representation that teaches the
step, recorded on the lesson as `representation`:

| Representation | Use it for | Made by |
|---|---|---|
| text | most literacy items, word problems for a8-10 | author |
| audio | prompts, sounds, words, dictation, listening | recorded clips, TTS for sentences |
| drawn | ten-frames, Zwanzigerfeld, number lines, Rechenstrich, Hundertertafel, place-value charts, clocks, coins and notes, shapes, grids, coordinates, charts | the app, from data in the item |
| picture | vocabulary nouns, early reading word-picture matches, story scenes | one shared picture library, keyed by concept |
| photo | only where a real object matters (measuring tools, real coins if drawn coins are not enough) | shared library |

Pictures are reused by concept across lessons, curricula and languages: one
picture of a cat serves Deutsch, English, Englisch and French.

### Variants

An item can have variants; the goal and the item logic stay the same.

- **Age band**: a4-5 (audio-led, no reading needed, big targets, fewer
  items), a6-7 (audio support, short text), a8-10 (text-led). An older
  beginner gets the a8-10 variant of an early step.
- **Locale facets**: € or £, 3,5 or 3.5, `·` or `×`, the written-subtraction
  method, the handwriting script.
- **Target language** for `fl` lessons: the English or French words, audio
  and examples.

## Mastery

Mastery is recorded per child and per step. It drives where a child works
(proficiency), what is suggested next, what comes back for review, and how
the child stands against their grade's expectations.

### States

| State | Means | Reached by |
|---|---|---|
| Not started | No evidence yet | |
| Learning | The child has started the lesson | Opening part 1 |
| Practised | The child finished the lesson but has not yet shown it reliably | Finishing the last part, with the lesson check below the bar |
| Secure | The child can do it now, without help | Passing the lesson check, or a diagnostic |
| Mastered | The child can still do it later | Passing a delayed review after the step became secure |
| Needs review | A review was failed | Failing a review of a secure or mastered step |

`Needs review` sends the step back into practice runs; passing the next
review returns it to the state it had.

### The lesson check

- 5 items for a6-7 and a8-10, 4 for a4-5, drawn from across the lesson's
  parts and covering each sub-skill at least once.
- No hints. Only the first try counts. A shown answer counts as wrong.
- Passing: at least 4 of 5 correct (3 of 4 for a4-5), and every item of
  the step's core difficulty answered correctly at least once in the lesson.
- Fail: the step stays at `Practised`. The app offers a short repair part
  (teach again with a different representation, then guided practice), and
  the child can take a new check made of different items. A child is never
  asked to repeat the whole lesson.

### Delayed review: from secure to mastered

Retention is the real goal, so `Secure` is not the end.

- Reviews come back in practice runs and topic reviews, spaced out: about
  2 days, 1 week, 3 weeks and 2 months after the step became secure.
- A review is 2 or 3 items of the step, mixed with other steps.
- Mastered: the step was secure, and the child passed reviews on two
  different days at least a week apart.
- A failed review (fewer than 2 of 3, or 1 of 2) sets `Needs review` and
  shortens the gap to the next one.

### Diagnostics: proficiency, not grade

A child does not have to start at their grade's first step, and does not
have to sit through steps they already know.

- A diagnostic for a progression asks 1 or 2 items per step, starting at the
  child's grade expectation and moving up after success and down after
  mistakes, until it finds the edge.
- A step passed in a diagnostic (2 of 2, or 1 of 1 for a4-5) becomes
  `Secure`, and its first delayed review is scheduled. Steps below it in the
  same progression are inferred secure if they are its hard prerequisites.
- The first step the child misses becomes the next lesson.

### Prerequisites and access

- A lesson is suggested when its hard prerequisites are at least
  `Practised`.
- A child can still open any lesson. If a hard prerequisite is not secure,
  the lesson starts with a short review of that prerequisite.

### Progression level and grade standing

- **Progression level**: the furthest step in a progression with every
  earlier hard prerequisite secure. This is the child's proficiency on that
  progression and decides where they work.
- **Grade standing**, per subject: the share of the steps placed in the
  child's stage that are secure or mastered, compared with how far the
  school year has run. Shown to parents as ahead, on track or catching up.
  It never blocks the child.

### What counts, and what does not

| Counts | Does not count |
|---|---|
| Lesson check, first try | Guided practice, with or without hints |
| Delayed reviews | Practice items in the lesson |
| Diagnostic items | Answers that were shown after two misses |
| Stage assessments (baseline, final) | Speed, except in fluency steps where a time target is part of the step |

Fluency steps (number bonds, times tables, Blitzlesen) add a time target to
the check: correct and within a set time per item, set per age band.

### Numbers to tune

All thresholds above are starting values: check length, pass mark, review
spacing, the mastered rule, the diagnostic rule and fluency times. They are
set per age band in the app's configuration, not in content, and should be
adjusted from real data once children use the app.
