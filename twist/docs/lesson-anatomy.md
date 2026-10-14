# Lesson anatomy

How Twist content is organised, from a whole curriculum down to a single
task, and how the app decides that a child has mastered a skill. Decided
2026-10-12. The data model behind it is in [model.md](model.md).

> Grade determines curriculum expectations, proficiency determines learning
> level, and age determines presentation.

## The chain

**Curriculum, Subject, Year, Topic, Skill, Lesson, Activity, Task.**

Each level has a name for the team (and the records), a name teachers use
in each country, and sometimes a different name for children. The team
name is the same in every market; the other two follow the school.

| Level | Team name | England: teachers | England: children | Deutschland: Lehrkräfte | Deutschland: Kinder |
|---|---|---|---|---|---|
| 1 | Curriculum | Curriculum | | Lehrplan | |
| 2 | Subject | Subject | Maths, English, French | Fach | Mathe, Deutsch, Englisch |
| 3 | Year | Year group; learning year for French | Year 2; French year 1 | Klasse; Lernjahr | Klasse 2; Stufe 0, 1. Lernjahr |
| 4 | Topic | Topic | Topic | Thema | Thema |
| 5 | Skill | Skill (learning objective) | "I can ..." | Kompetenz (Lernziel) | "Ich kann ..." |
| 6 | Lesson | Lesson | Lesson 2 of 4 | Lektion | Lektion 2 von 4 |
| 7 | Activity | Activity (lesson phase) | Warm up, Learn, Practise, Show what you know | Phase | Aufwärmen, Entdecken, Üben, Zeig, was du kannst |
| 8 | Task | Task, question | (no label; just the next thing to do) | Aufgabe | Aufgabe |

How it reads in a sentence: *In Year 2 Maths, the topic "Adding and
subtracting to 20" has six skills. "I can add across ten" is taught in
three lessons. Each lesson is a few activities (warm up, learn, practise,
show what you know) made of about 15 tasks.*

What each level is:

- **Curriculum**: everything taught in one country, in its own language.
  Two for now: Deutschland (de-DE) and England (en-GB).
- **Subject**: one school subject in that curriculum. Behind it sits a
  shared domain (`math`, `lit-de`, `lit-en`, `fl`), so Mathe and Maths use
  the same skills where the learning is the same.
- **Year**: the school year a child is in, which sets what their curriculum
  expects by the end of it. Foreign languages count by learning year,
  because schools start them at different ages.
- **Topic**: a block of related skills; the sections a child sees in a year.
- **Skill**: one thing the child learns to do, said as "I can ..." or "Ich
  kann ...". Placement in a year, mastery and the child's level are all
  recorded per skill.
- **Lesson**: one short sitting. A skill is taught over 2 to 6 lessons.
- **Activity**: one block inside a lesson with one job (below).
- **Task**: one thing the child does: answer, tap, drag, say, write.

Two more levels are for the team and teachers only:

| Team name | England | Deutschland | What it is |
|---|---|---|---|
| Learning progression | Learning progression | Lernstrang | The skills of one strand in teaching order, across all years (place value, spelling strategies) |
| Standard | Statutory requirement; early learning goal | Kompetenzerwartung; Bildungsstandard | One line of an official document, quoted, that skills are mapped to |

Earlier names, for reading older notes: a skill was called a step (and a
learning goal for a short while); a lesson was called a part; a task was
called an item or a question; a topic was called a unit; a year was called
a stage; a curriculum was called a profile; a standard was called an
objective. In schoolido-learning a skill is still a `skill` and a lesson
part is still a `module`.

## Skills and lessons

A skill is taught over several short lessons because the learners are
young: attention is short, and a skill sticks better when it comes back
over several sittings than when it is drilled in one.

- A skill has as many lessons as it needs: a small one (read and set half
  past) may need 2, a large one (written subtraction with exchange) 5 or 6.
  Sometimes two skills that cannot be taught apart share their lessons.
- Lesson length follows the child's age:

| Age | Lesson length | Tasks per lesson |
|---|---|---|
| 4 to 5 | about 8 minutes | 14 to 24 |
| 6 to 7 | about 10 to 12 minutes | 18 to 28 |
| 8 to 10 | about 12 to 15 minutes | 20 to 32 |

Most of a lesson is Practise: three stages of 5 or 6 tasks each, so 15 to
18 practice tasks before the check. Learn screens and tracing take longer
than a tap, so a lesson with several of them sits at the low end.
(Raised after the second round of model lessons, when Practise became
three stages; they came out at 18 to 24 tasks.)

- Each lesson can be finished and left. The next lesson opens straight
  away; when a skill has more than two lessons, the app suggests the next
  one on a later day, so the skill spreads over several sittings.
- Each lesson builds on the one before: a new part of the skill, the same
  skill with less help, or a new way of showing it.
- The last lesson of a skill ends with the skill check (see Mastery).

## Activities

Four general activities make up every lesson. They are deliberately few:
the differences between lessons come from settings on the activity, not
from more activity names.

| Activity | Children see | Deutsch | Job |
|---|---|---|---|
| **Warm-up** | Warm up | Aufwärmen | Recall what this builds on, or what the last lesson taught |
| **Learn** | Learn | Entdecken | Teaching: examples, a demonstration, a model text, a new sound |
| **Practise** | Practise | Üben | The long part of the lesson: three stages, from full hints to none |
| **Check** | Show what you know | Zeig, was du kannst | Short, no help, counts toward mastery |

Every activity opens with an intro screen: the mascot, the activity's name
and one spoken line ("Wir wärmen uns auf.", phrases.yaml). The lesson start,
each change of practise stage and the lesson end are static screens with the
mascot too. Each of these seven screen kinds has three mascot poses
(assets/mascot.yaml, files in assets/mascot/: start, warmup, learn,
practise, stage, check, end, each -1 to -3). The app picks one by lesson and
rotates on, so neighbouring lessons and the two stage changes in one lesson
show different poses.

### What each activity can be set to

**Warm-up** draws its tasks from one of two places:

| Setting | Means |
|---|---|
| from: earlier skills | The skills this one builds on (what used to be the "starter") |
| from: last lesson | The previous lesson of the same skill (what used to be the "recap") |

**Learn** is shown in one of these ways; no answers are scored:

| Setting | Means |
|---|---|
| worked examples | 2 to 4 solved examples, one step at a time |
| demonstration | a narrated animation of the drawn model (ten-frame, number line, letter formation) |
| model text | a text to read or hear before writing or answering |
| new sound or word | hear it, see it, say it (phonics, foreign language) |
| do it with me | the child taps along; nothing is marked |

**Practise** is where the child does most of the work, so it is the
longest activity in every lesson. It always runs in three stages, in this
order, and the Check comes after the third:

| Stage | Hints | Tasks | What happens on a miss |
|---|---|---|---|
| full | 3 hint levels: a strategy, thinking aloud, a direct cue | 5 or 6 | the next hint opens |
| some | 1 hint | 5 or 6 | the hint opens |
| none | no hints | 5 or 6 | after two misses the answer is shown and the task counts as neither right nor wrong |

What used to be three activities (guided practice, practice, apply) is now
one Practise whose help fades as the child goes. The child sees one
activity; the app may show a small marker between stages.

Practise also has a setting, for the whole activity or for one stage:

| Setting | Means | Example |
|---|---|---|
| plain | the skill on its own | 8 + 5 = ? |
| in context | a word problem, a sentence, a short text, a speaking task | Lena has 8 marbles and gets 5 more ... |

A common shape is plain for the first two stages and in context for the
last, so the child applies the skill once the hints are gone. A whole
Practise can be in context, as in a story lesson.

Tasks get harder across the stages as well as losing hints: the full stage
starts easy and shows the drawn model; by the none stage the model is
often gone and the answer is typed rather than chosen.

**Check** comes in three sizes, all without help, where only the first try
counts:

| Setting | Means | Counts for mastery |
|---|---|---|
| quick check | 3 tasks at the end of a lesson, so the lesson ends on success | no; it tells the app whether to slow down |
| skill check | 4 or 5 tasks at the end of the last lesson of a skill | yes |
| timed | a skill check with a time per task, for facts to know by heart | yes |

Every check is spoken by a second voice, a little more focused and serious
than the teaching voice, so the child hears that this part counts. The
teaching voice comes back when the lesson ends. Which voices these are is
set in assets/voices.yaml.

### Rules from the model lessons

Writing the first three model lessons (Mathe, Deutsch, Englisch) added
these. The build checks every one of them.

1. **Tracing carries its own support.** The trace guide and arrows are the
   help, so tracing tasks take no text hints in any stage. In the none
   stage the child copies the letter without the guide.
2. **A skill check never copies a task.** It may test the same thing again
   (with four letters there are only so many sounds), but not the identical
   task with the same options. Quick checks may repeat.
3. **Oral lessons need no reading.** A lesson marked `no_reading` (Stufe 0,
   ages 4 to 5) has no task where the child must read an option or a
   prompt; instructions are spoken, options are pictures or sounds. Number
   options are allowed when each one can be heard (its speaker says it).
4. **Speaking is practised, not marked.** Speech recognition for young
   children is not reliable enough to decide mastery, so `speak` tasks
   belong in Practise and are left out of skill checks.
5. **Instructions in the home language, at first.** In Stufe 0 and the
   first French lessons the instructions are spoken in German or English and
   only the target words in the new language; classroom phrases in the new
   language come in as the child learns them.
6. **Warm-ups draw only on what came before.** `builds_on` must be a
   prerequisite of the skill, directly or further back.
7. **Metadata matches the tasks.** The drawn components and sounds a lesson
   declares are exactly the ones its tasks use, so the asset lists stay true.
8. **A lesson ends on something the child does,** never on Learn.

### Leaving activities out

Any activity can be left out, depending on the lesson, the subject and the
child's age. Two rules always hold:

1. Anything new gets a Learn before the first Practise.
2. The last lesson of a skill ends with a skill check.

Examples:

| Lesson | Activities |
|---|---|
| First lesson of a new idea | Warm-up (earlier skills), Learn, Practise, Check (quick) |
| A middle lesson | Warm-up (last lesson), Learn (a second model), Practise, Check (quick) |
| A recap lesson | Warm-up, Practise, Check; no Learn |
| Ages 4 to 5 | Learn, Practise, Check (quick, 3 tasks); no Warm-up |
| A times-table lesson after the first | Warm-up, Practise, Check (timed) |
| Last lesson of a skill | Warm-up (last lesson), Practise (last stage in context), Check (skill check) |

Practise always has all three stages; what changes between lessons is
what the tasks ask and whether a stage is in context.

### Typical lesson plans by subject

Starting shapes, not fixed templates. Authors change them when a skill is
bigger or smaller.

**Maths / Mathe, a new idea** (place value, a new operation): 3 to 4
lessons. Lesson 1: warm-up, learn with a drawn model (ten-frame,
Zwanzigerfeld, number line), practise, quick check. Lesson 2: warm-up,
learn with a second model, practise, quick check. Lesson 3: warm-up,
practise in context (a word problem, Sachaufgabe). Lesson 4: warm-up,
practise, skill check.

**Maths / Mathe, facts to know by heart** (the 7 times table, number bonds
to 10): 2 to 3 lessons with a short learn (work it out from a fact you
know), then long practise whose last stage adds speed, timed skill
check at the end. Most of the work then happens in practice sessions
outside the lessons.

**Deutsch, a group of letters** (L, O, A, M): one lesson per letter plus
one mixed lesson. Each letter lesson: learn (hear the sound, see the
letter), practise (find it at the start of words, blend syllables with
letters already known, trace and copy it). Mixed lesson: warm-up, practise
reading and writing short words with all four, skill check.

**English, phonics** (s, a, t, p): the same shape as the German letter
group, following the school's phonics order.

**Reading** (find information, read between the lines): 2 to 3 lessons.
Learn the strategy on a short text read aloud, practise with full support
on a second text, then a new text with practise and the skill check. Texts
match the child's age; for ages 4 to 7 they are read aloud.

**Writing and grammar** (direct speech, a report): learn from a model
text, practise on sentences (complete, reorder, correct), then practise in
context where the child writes their own sentences or a short text. The
skill check uses tasks with answers to choose or short answers to write;
free writing is not marked automatically.

**Englisch / French** (a theme, a language pattern): learn (hear and
repeat), practise (match word and picture or meaning, then use it in a
short dialogue or phrase, speaking), check. Listening and speaking come
before reading and writing, especially in Stufe 0 and for ages 4 to 7.

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
- whether its options can be heard: a picture option says its word and a
  number is read aloud, unless hearing it would give the answer away (a
  letter, a syllable, or any option in a "which one sounds like this" task);
- the hints its Practise stage asks for: three in the full stage (a
  strategy, thinking aloud, a direct cue), one in the some stage, none in
  the none stage or in a Check;
- difficulty (easy, core, stretch) and the local details it depends on
  (currency, number format, handwriting script, written-subtraction
  method).

### Fewer images

Each task uses the least image-heavy form that still teaches the skill.
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

A task can have versions; the skill and what the task asks stay the same.

- **By age**: 4 to 5 (led by audio, no reading needed, big targets, fewer
  tasks), 6 to 7 (audio support, short text), 8 to 10 (led by text). An
  older beginner gets the 8 to 10 version of an early skill.
- **By country**: € or £, 3,5 or 3.5, `·` or `×`, the written-subtraction
  method, the handwriting script.
- **By target language**, for Englisch and French lessons: the words,
  audio and examples in that language.

### Authoring checks

Written after the full de-DE review of 2026-10-14, which fixed about 220
lesson sets for the same few mistakes. Each lesson set meets these before
it counts as drafted.

The build warns on these (lessons-check.mjs):

- Lesson 1's warm-up comes from earlier skills, never from the last
  lesson, and those skills are named in `builds_on` as prerequisites.
- A skill check never repeats a Practise or Warm-up task; change the
  numbers, the words or the question.
- True/false tasks in a set do not all have the same answer.
- Options that differ only in capitals, spaces or hyphens (Dunkelrot,
  dunkelrot, dunkel rot) sound the same, so they carry
  `option_audio: false`.
- A "Wo ist der Fehler?" task always has a mistake; when "no mistake" is
  a possible answer, ask "Gibt es einen Fehler?".
- German numbers: four digits without a space (4380), five or more grouped
  with a space (34 500). In `say`, numbers of 10 000 or more are written
  in words; the voice misreads them in digits. A text with `·` or `|` gets
  its own `say`, because the voice reads the sign.
- Hints say the idea itself, never "Denk an den Lernteil".
- A true/false task shows its statement on screen, not only "Stimmt das?"
  with the statement in `say`.
- Ordering cards are stored shuffled, never in answer order: the app
  shows them as stored.
- No dash characters in records. A set that teaches dashes (parenthesis,
  semicolons and colons) writes them as a spaced hyphen (" - ") and sets
  `metadata.dashes: true`; the app shows them as dashes.
- List items with a question mark are quoted (`"Wer?"`); narration.py
  reads the files with PyYAML, which rejects them bare.

The author checks these by reading every task:

- **One right answer.** Work out every answer. No distractor may also be
  right (a square is also a Parallelogramm; 285 is divisible by 3 as well
  as 5; Delfin and Delphin are both in the Duden).
- **What the screen shows.** The question and its data are on screen, not
  only in `say`. Text, `say`, drawn data and hints give the same numbers.
  A drawn component shows what the text claims, and only what the
  component can draw (drawn.yaml).
- **Hints climb.** A nudge, then the strategy, then the answer. No hint
  gives the answer away early or repeats the one before.
- **Learn teaches what Practise asks.** Every word, rule or shape a task
  needs appears in Learn first (Trapez, über, ß). Metadata
  `misconceptions.addressed` names the tasks that really address it.
- **The year fits.** Numbers stay in the year's range (Cent to 100 in
  Klasse 2), methods follow the Lehrplan (one-digit divisors in Klasse 4),
  and a Klasse 1 letter task uses only letters already taught.
- **German as a teacher says it.** Nomen, Verb, Adjektiv in every year
  (Klasse 1 and 2 may add "Tunwort" once, where the term is introduced);
  German quotes „…“; du-form, short sentences. In Englisch, hints are in
  German and never mix English nouns into German sentences ("auf einem
  chair").
- **No accidental giveaways.** A noun is not the only capitalised option;
  a spoken picture name does not say the answer; options in a sound task
  are not read aloud.

## Mastery

Mastery is recorded per child and per skill. It decides where a
child works, what is suggested next, what comes back for recap, and how the
child stands against what their year expects.

### States

| State | English | Deutsch | Means | Reached by |
|---|---|---|---|---|
| 1 | Not started | Noch nicht begonnen | No evidence yet | |
| 2 | Learning | Lerne ich gerade | The child has started its lessons | Opening lesson 1 |
| 3 | Practised | Geübt | The child finished the lessons but has not yet shown the skill reliably | Finishing the last lesson below the pass mark |
| 4 | Secure | Kann ich | The child can do it now, without help | Passing the skill check, or a placement check |
| 5 | Mastered | Kann ich sicher | The child can still do it later | Passing recaps on two days at least a week apart |
| 6 | Needs a recap | Wiederholen | A later recap was missed | Failing a recap of a secure or mastered skill |

A child sees the states as stars or a badge on each "I can" skill. `Needs a
recap` puts the skill back into practice sessions; passing the next recap
returns it to the state it had.

### The skill check

- 5 tasks for ages 6 and up, 4 for ages 4 to 5, taken from across the
  skill's lessons and covering each part of the skill at least once.
- No hints. Only the first try counts. A shown answer counts as wrong.
- Pass mark: at least 4 of 5 (3 of 4 for ages 4 to 5), and every core task
  of the skill answered correctly at least once in its lessons.
- If the child does not pass, the skill stays at `Practised`. The app
  offers one short extra lesson (Learn again in a different way, then
  Practise with full support) and a new skill check with different tasks. A child is
  never asked to repeat all the lessons.

### Recaps: from secure to mastered

Remembering later is the real aim, so `Secure` is not the end.

- Recaps come back in practice sessions and topic recaps, spaced out: about
  2 days, 1 week, 3 weeks and 2 months after the skill became secure.
- A recap of one skill is 2 or 3 tasks, mixed with tasks from other skills.
- Mastered: the skill was secure, and the child passed recaps on two
  different days at least a week apart.
- A failed recap (fewer than 2 of 3, or 1 of 2) sets `Needs a recap` and
  brings the next recap closer.

### Placement checks: where a child really is

A child does not have to start at the first skill of their year, and does
not have to sit through skills they already know.

- A placement check (Einstufung) for one learning progression asks 1 or 2
  tasks per skill, starting at what the child's year expects and
  moving up after success and down after mistakes, until it finds the edge.
- A skill passed in a placement check (2 of 2, or 1 of 1 for ages 4 to 5)
  becomes `Secure`, and its first recap is scheduled. Skills it builds on in
  the same progression count as secure too.
- The first skill the child misses becomes the next one to learn.

### What a skill needs first, and access

- A skill is suggested when every skill it builds on is at least
  `Practised`.
- A child can still open any skill. If something it builds on is not secure,
  its first lesson starts with a short recap of that.

### Level and standing

- **Level** in a learning progression: the furthest skill the child has
  reached with everything it builds on secure. This is where the child
  works in that progression.
- **Standing** in a subject, shown to parents: the share of the skills in
  the child's year that are secure or mastered, compared with how far the
  school year has run. Shown as ahead, on track or catching up. It never
  blocks the child.

### What counts, and what does not

| Counts | Does not count |
|---|---|
| Skill checks, first try | Quick checks at the end of a lesson |
| Warm-up tasks that recall earlier skills, after the skill is secure | Practise tasks inside lessons |
| Recaps in practice sessions | Answers shown after two misses |
| Placement checks; start-of-year and end-of-year checks | Speed, except in a timed skill check |

Skills that are facts to know by heart (number bonds, times tables,
Blitzlesen) use the timed skill check: correct, and within a set time per
task for the child's age.

### Practice outside lessons

| English | Deutsch | What it is |
|---|---|---|
| Practice session | Übungsrunde | About 14 tasks of one skill, or a mix of due recaps |
| Topic recap | Themenwiederholung | Mixed tasks from all skills of a topic |
| Placement check | Einstufung | Finds the child's level in one learning progression |
| Start-of-year and end-of-year check | Eingangs- und Abschlusscheck | A check across the year's skills, for the whole subject |

### Numbers to tune

All thresholds above are starting values: skill check length, pass mark,
recap spacing, the mastered rule, the placement rule and the time targets.
They are set per age in the app's configuration, not in the content, and
should be adjusted from real data once children use the app.
