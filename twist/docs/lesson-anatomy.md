# Lesson anatomy

How Twist content is organised, from a whole curriculum down to a single
task, and how the app decides that a child has mastered a learning goal.
Decided 2026-10-12. The data model behind the upper levels is in
[model.md](model.md).

> Grade determines curriculum expectations, proficiency determines learning
> level, and age determines presentation.

## The names

The levels use the words teachers already use in each country, so that a
teacher, a parent and the app mean the same thing.

| Level | English (England) | Deutsch (Deutschland) | What it is | Example |
|---|---|---|---|---|
| 1 | Curriculum | Lehrplan | Everything taught in one country, in its own language | Lehrplan Deutschland; England |
| 2 | Subject | Fach | Maths, English, French; Mathe, Deutsch, Englisch | Mathe |
| 3 | Year | Klasse | The school year a child is in. Foreign languages count by learning year: French year 1 to 4; Stufe 0, 1. and 2. Lernjahr | Klasse 1; Year 2 |
| 4 | Unit | Thema | A block of related learning goals, the sections a child sees in a year | Rechnen bis 20 |
| 5 | Learning goal | Lernziel | One thing the child learns to do, said as "I can ..." or "Ich kann ...". Placement and mastery are recorded per learning goal | Ich kann Plusaufgaben mit Zehnerübergang lösen. |
| 6 | Lesson | Lektion | One short sitting. A learning goal is taught over 2 to 6 lessons | Lektion 2 von 4 |
| 7 | Activity | Phase | One block inside a lesson with one job: starter, teaching, guided practice, practice, apply, recap, quick check | Gemeinsam üben |
| 8 | Task | Aufgabe | One thing the child does: answer, tap, drag, say, write | Aufgabe 6 |

How it reads in a sentence: *In Year 2 Maths, the unit "Adding and
subtracting to 20" has six learning goals. "I can add across ten" is taught
in three lessons; each lesson has a starter, teaching, practice and a
quick check, about 15 tasks in all.*

Behind the curriculum, two levels are for the team and teachers only:

| Level | English | Deutsch | What it is |
|---|---|---|---|
| Learning progression | Learning progression | Lernstrang | The learning goals of one skill in teaching order, across all years (place value, spelling strategies) |
| Standard | Standard (statutory requirement, early learning goal) | Kompetenzerwartung (Bildungsstandard) | One line of an official document, quoted, that learning goals are mapped to |

Older names, for reading earlier notes: a learning goal was called a step
(and a skill in schoolido-learning); a lesson was called a part; a task was
called an item or a question; a unit was called a topic; a year was called
a stage. The field names in the records still use the older words until
they are renamed (see model.md).

## Learning goals and lessons

A learning goal is taught over several short lessons because the learners
are young: attention is short, and a skill sticks better when it comes back
over several sittings than when it is drilled in one.

- A learning goal has as many lessons as it needs: a small one (read and
  set half past) may need 2, a large one (written subtraction with
  exchange) 5 or 6. Sometimes two goals that cannot be taught apart share
  their lessons.
- Lesson length follows the child's age:

| Age | Lesson length | Tasks per lesson |
|---|---|---|
| 4 to 5 | about 5 minutes | 8 to 12 |
| 6 to 7 | about 8 minutes | 12 to 18 |
| 8 to 10 | about 10 to 12 minutes | 15 to 25 |

- Each lesson can be finished and left. The next lesson opens straight
  away; when a goal has more than two lessons, the app suggests the next one
  on a later day, so the goal spreads over several sittings.
- Each lesson builds on the one before: a new part of the skill, the same
  skill with less help, or a new way of showing it.
- The last lesson of a goal ends with the goal check (see Mastery).

## Activities

Seven kinds of activity, named the way teachers name the phases of a
lesson. Every lesson uses some of them; which ones, in what order and how
long, depends on the subject and the size of the goal.

| Activity | Phase | Job | Hints | Counts for mastery |
|---|---|---|---|---|
| Starter | Einstieg | Says the goal in child language and warms up with 2 or 3 tasks from earlier goals it builds on | no | no |
| Teaching | Erklärung | Shows how: worked examples, a narrated demonstration, a model text, a sound and its letter. No answers asked, or only "do it with me" taps | n/a | no |
| Guided practice | Gemeinsam üben | First tries with full support | 3 levels | no |
| Practice | Üben | Tries with less support, tasks getting harder; after two misses on a task the answer is shown and the task counts as neither right nor wrong | 1 level | no |
| Apply | Anwenden | The skill in a new setting: a word problem, a sentence, a short text, a speaking task | 1 level | no |
| Recap | Wiederholung | Mixed tasks from earlier lessons or earlier goals | no | yes, as delayed evidence |
| Quick check | Kurzer Check | Short, no hints, first try counts | no | yes |

Rules for every lesson, whatever the subject:

1. Teaching comes before the first practice of anything new.
2. Every lesson ends with something the child can succeed at (a quick
   check, a recap or a short apply), never in the middle of teaching.
3. The last lesson of a goal ends with the goal check.
4. From the second lesson on, each lesson starts with a short recap of the
   one before.

### Typical sequences by subject

Starting shapes, not fixed templates. Authors change them when a goal is
bigger or smaller.

**Maths / Mathe, a new idea** (place value, a new operation): 3 to 4
lessons. Lesson 1: starter, teaching with a drawn model (ten-frame,
Zwanzigerfeld, number line), guided practice. Lesson 2: recap, teaching
with a second model, guided practice, practice. Lesson 3: recap, practice,
apply (a word problem, Sachaufgabe). Lesson 4: recap, goal check.

**Maths / Mathe, facts to know by heart** (the 7 times table, number bonds
to 10): 2 to 3 lessons with short teaching of the strategy (work it out
from a fact you know), then long practice with rising speed, goal check at
the end. Most of the work then happens in practice sessions outside the
lessons.

**Deutsch, a group of letters** (L, O, A, M): one lesson per letter plus
one mixed lesson. Each lesson: hear the sound, see the letter, find it at
the start of words, blend syllables with letters already known, write the
letter (trace, then copy). Mixed lesson: read and write short words with
all four letters, goal check.

**English, phonics** (s, a, t, p): the same shape as the German letter
group, following the school's phonics order.

**Reading** (find information, read between the lines): 2 to 3 lessons.
Teach the strategy on a short text read aloud, guided questions on a
second text, then a new text with practice questions and the goal check.
Texts match the child's age; for ages 4 to 7 they are read aloud.

**Writing and grammar** (direct speech, a report): teach with a model
text, guided sentence work (complete, reorder, correct), then an apply
activity where the child writes their own sentences or a short text. The
goal check uses tasks with answers to choose or short answers to write;
free writing is not marked automatically.

**Englisch / French** (a theme, a language pattern): hear and repeat
(speaking), match word and picture or meaning, use it in a short dialogue
or phrase, quick check. Listening and speaking come before reading and
writing, especially in Stufe 0 and for ages 4 to 7.

## Tasks

Tasks are written by hand, so every lesson is checked by a person before a
child sees it.

Each task records:

- its task type (one of the Twist question types) and the activity it
  belongs to;
- what the child reads and what the app says aloud (audio is always
  available for ages 4 to 7);
- how it is shown (below) and the data needed to draw it;
- the correct answer and feedback for each typical wrong answer;
- for guided practice, three hint levels: a strategy, thinking aloud, a
  direct cue;
- difficulty (easy, core, stretch) and the local details it depends on
  (currency, number format, handwriting script, written-subtraction
  method).

### Fewer images

Each task uses the least image-heavy form that still teaches the goal.
The lesson records which form it relies on.

| Form | Use it for | Made by |
|---|---|---|
| Text | most reading and writing tasks; word problems for ages 8 to 10 | the author |
| Audio | instructions, sounds, words, dictation, listening | recorded clips; text-to-speech for sentences |
| Drawn | ten-frames, Zwanzigerfeld, number lines, Rechenstrich, Hundertertafel, place-value charts, clocks, coins and notes, shapes, grids, coordinates, charts | the app, from data in the task |
| Picture | vocabulary nouns, early word-picture matches, story scenes | one shared picture library, one picture per concept |
| Photo | only where a real object matters (measuring tools, real coins) | the shared library |

Pictures are reused by concept across lessons, curricula and languages:
one picture of a cat serves Deutsch, English, Englisch and French.

### Versions of a task

A task can have versions; the goal and what the task asks stay the same.

- **By age**: 4 to 5 (led by audio, no reading needed, big targets, fewer
  tasks), 6 to 7 (audio support, short text), 8 to 10 (led by text). An
  older beginner gets the 8 to 10 version of an early goal.
- **By country**: € or £, 3,5 or 3.5, `·` or `×`, the written-subtraction
  method, the handwriting script.
- **By target language**, for Englisch and French lessons: the words,
  audio and examples in that language.

## Mastery

Mastery is recorded per child and per learning goal. It decides where a
child works, what is suggested next, what comes back for recap, and how the
child stands against what their year expects.

### States

| State | English | Deutsch | Means | Reached by |
|---|---|---|---|---|
| 1 | Not started | Noch nicht begonnen | No evidence yet | |
| 2 | Learning | Lerne ich gerade | The child has started the goal's lessons | Opening lesson 1 |
| 3 | Practised | Geübt | The child finished the lessons but has not yet shown the goal reliably | Finishing the last lesson below the pass mark |
| 4 | Secure | Kann ich | The child can do it now, without help | Passing the goal check, or a placement check |
| 5 | Mastered | Kann ich sicher | The child can still do it later | Passing recaps on two days at least a week apart |
| 6 | Needs a recap | Wiederholen | A later recap was missed | Failing a recap of a secure or mastered goal |

A child sees the states as stars or a badge on each "I can" goal. `Needs a
recap` puts the goal back into practice sessions; passing the next recap
returns it to the state it had.

### The goal check

- 5 tasks for ages 6 and up, 4 for ages 4 to 5, taken from across the
  goal's lessons and covering each part of the skill at least once.
- No hints. Only the first try counts. A shown answer counts as wrong.
- Pass mark: at least 4 of 5 (3 of 4 for ages 4 to 5), and every core task
  of the goal answered correctly at least once in its lessons.
- If the child does not pass, the goal stays at `Practised`. The app
  offers one short extra lesson (taught again in a different way, then
  guided practice) and a new goal check with different tasks. A child is
  never asked to repeat all the lessons.

### Recaps: from secure to mastered

Remembering later is the real aim, so `Secure` is not the end.

- Recaps come back in practice sessions and unit recaps, spaced out: about
  2 days, 1 week, 3 weeks and 2 months after the goal became secure.
- A recap of one goal is 2 or 3 tasks, mixed with tasks from other goals.
- Mastered: the goal was secure, and the child passed recaps on two
  different days at least a week apart.
- A failed recap (fewer than 2 of 3, or 1 of 2) sets `Needs a recap` and
  brings the next recap closer.

### Placement checks: where a child really is

A child does not have to start at the first goal of their year, and does
not have to sit through goals they already know.

- A placement check (Einstufung) for one learning progression asks 1 or 2
  tasks per learning goal, starting at what the child's year expects and
  moving up after success and down after mistakes, until it finds the edge.
- A goal passed in a placement check (2 of 2, or 1 of 1 for ages 4 to 5)
  becomes `Secure`, and its first recap is scheduled. Goals it builds on in
  the same progression count as secure too.
- The first goal the child misses becomes the next one to learn.

### What a goal needs first, and access

- A goal is suggested when every goal it builds on is at least
  `Practised`.
- A child can still open any goal. If something it builds on is not secure,
  its first lesson starts with a short recap of that.

### Level and standing

- **Level** in a learning progression: the furthest goal the child has
  reached with everything it builds on secure. This is where the child
  works in that progression.
- **Standing** in a subject, shown to parents: the share of the goals in
  the child's year that are secure or mastered, compared with how far the
  school year has run. Shown as ahead, on track or catching up. It never
  blocks the child.

### What counts, and what does not

| Counts | Does not count |
|---|---|
| Goal checks, first try | Guided practice, with or without hints |
| Recaps | Practice tasks inside lessons |
| Placement checks | Answers shown after two misses |
| Start-of-year and end-of-year checks | Speed, except for facts to know by heart, where a time target is part of the goal |

Goals that are facts to know by heart (number bonds, times tables,
Blitzlesen) add a time target to the goal check: correct, and within a set
time per task for the child's age.

### Practice outside lessons

| English | Deutsch | What it is |
|---|---|---|
| Practice session | Übungsrunde | About 14 tasks of one goal, or a mix of due recaps |
| Unit recap | Themenwiederholung | Mixed tasks from all goals of a unit |
| Placement check | Einstufung | Finds the child's level in one learning progression |
| Start-of-year and end-of-year check | Eingangs- und Abschlusscheck | A check across the year's goals, for the whole subject |

### Numbers to tune

All thresholds above are starting values: goal check length, pass mark,
recap spacing, the mastered rule, the placement rule and the time targets.
They are set per age in the app's configuration, not in the content, and
should be adjusted from real data once children use the app.
