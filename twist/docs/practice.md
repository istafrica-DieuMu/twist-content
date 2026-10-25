# Practice

Practice outside lessons, for the teams that build it: the backend
(IST-B2C/backend), the mobile app (ist-schoolido) and the parent dashboard
(IST-B2C/Parent-dashboard). Mastery, recaps and the states are in
lesson-anatomy.md; stars and badges in rewards.md.

Decided 2026-10-17.

**Reference implementation.** Every rule below is a plain function in
`twist/pages/player/practice-rules.mjs`, with tests in
`twist/test/practice-*.test.mjs` (`cd twist && npm test`). Port those
functions; this page says what they do and why. To see them working, open
the lesson player (`twist/pages/player/index.html`) and choose Practice. Its
side panel sets a pretend child's skill states, takes a skill check for it
(pass or fail), explains why each task was picked, and has a time machine:
move the child on a day, a week or to the next recap, see the recaps of the
next four weeks on a calendar, let the child play the top suggestion all
right, mostly right or all wrong, read what happened in its history, and
rewind any of it.

## What practice is for

- Bring back skills before they are forgotten (recaps).
- Close gaps: skills at `practised` or `needs_refresh` (catch-up).
- Let a child practise what they choose: a topic, a skill, a drill.
- Build speed on facts to know by heart: times tables, facts to 20,
  tricky and exception words (drills).

Practice earns no stars. Recap tasks inside a session count for mastery
under the recap rules; everything else is practice only.

## Sessions

| Kind (`kind`) | For | Tasks from | Help |
|---|---|---|---|
| Recaps due (`recaps`) | Skills with a recap due and not taken by a warm-up | No-help Practise tasks and check tasks of each skill | None |
| Catch-up (`catch-up`) | One skill at `practised` or `needs_refresh` | Full-help stage first, then some-help, then no-help | The first hint once, after a wrong answer |
| Topic review (`review`) | A topic the child picks | No-help Practise tasks and check tasks of the topic's skills | None |
| Skill practice (`skill`) | One skill the child picks | All three Practise stages, getting harder | None |
| Mixed (`mixed`) | Skills the child picks in Make my own | All stages and checks | None |
| Drill (`drill`) | A skill with a drill bank | The drill bank | None; an optional timer |

- **Length.** 10 tasks for ages 4 to 5, 14 for 6 to 7, 16 for 8 to 10. A
  session asked for in minutes takes 1.5 tasks a minute. A drill runs by
  time instead: 2, 3 or 5 minutes.
- **Recaps due** takes 2 tasks a skill (ages 4 to 5) or 3, and at most as
  many skills as fit the length; the rest stay due for the next session.
- **Mixing.** Recaps due, topic review and mixed interleave skills: never
  two tasks of the same skill in a row when another skill is left.
- **Which task.** Inside its pool, a session takes the task the child has
  seen least recently (never seen counts as oldest), never one of the
  child's last skill-check tasks, with choice options shuffled each time.
- **Recaps first.** When a recap is due, its tasks take the no-help and
  check tasks first; other sessions use the rest.
- **Missed tasks.** A task missed on the first try comes back once at the
  end of the session.
- **Two misses.** The answer is shown, as in lessons, and counts as wrong.
- **Stage as difficulty.** Hints are off in practice, so the Practise
  stage a task comes from works as its difficulty: full-help tasks are the
  easiest way in, no-help and check tasks the hardest.

## Content

### Where the tasks come from

Practice reuses the lesson tasks. Its only content of its own is the drill
banks. For each skill, the backend needs its lesson tasks grouped by pool
(`pools`):

| Pool | Tasks |
|---|---|
| `full`, `some`, `none` | The tasks of the Practise stage with that `support` |
| `check` | The tasks of every Check activity |
| `skillCheck` | The tasks of Checks of size `skill` or `timed`, so a session can leave out the ones the child last saw in a skill check |

A check with `draw` holds a pool: a skill check of 20 tasks, each tagged
with the `part` of the skill it covers (the set lists its parts in
`metadata.parts`), and a quick check of 6. One attempt shows `draw` of
them: 5 for a skill check (4 at ages 4 to 5) and 3 for a quick check
(`drawCheck`). Every task of the pool is in the `check` pool for practice.
A check without `draw` is a set not yet authored for practice; it shows
every task, as before, so the app handles both.

A task keeps one key across sessions: `<set id>#<lesson n>#<task id>`
(`taskKey`), for example `de-DE.math.table-3-6-9#1#l1-n1`.

### Drill banks

A drill bank is a hand-written list of the items of one skill: the facts or
the words. The app forms the question from an item when it plays it. Drills
are part of practice only; lessons never use them.

File: `twist/drills/<domain>/<skill>.yaml`, named after the skill's slug.
A bank belongs to the skill, so both curricula share it when they share the
skill.

```yaml
skill: math.mult-div.table-3-6-9
formats: [type, choose, timed]
seconds: { 6-7: 8, 8-10: 5 }   # time target per item, for the timed format
items:
  - { q: "3 × 4", a: 12 }
  - { q: "12 ÷ 3", a: 4 }
```

```yaml
skill: lit-en.spelling.exception-words-y1
formats: [type, choose]
items:
  - { word: said, sentence: "Mum said it is time for bed." }
  - { word: they, sentence: "They ran to the park." }
```

- **Formats.** `type`: the child types the answer. `choose`: three options,
  the answer and two near misses (below). `flash`: a word shows for a moment
  on its own, then the options come and the child picks it (reading).
  `say`: the word is spoken and the child types it (spelling). `listen`: the
  word is spoken and the child picks it. `timed`: any of these against the
  time target.
- **Near misses** (`nearMisses`). For a times-table fact the neighbouring
  facts (7 × 8: 48, 64, 49, 63), then answers one or two away; for any other
  sum one or two away, then ten away; never below zero. For a word, the
  words of the bank that look most like it: a shared ending or beginning and
  a similar length (door: floor, poor).
- **Foreign-language banks** hold the words of every language taught, each
  with its `lang`. A curriculum plays only the words of the language its
  set teaches (`target_language`), spoken in that language. Their words are
  heard only: a `listen` item with a `colour` is answered by picking the
  colour from three swatches, one with a `digit` by picking the digit, so
  the child shows they understood the word without reading it.
- **Drill words that are spoken** (`say`, `listen`) are narration lines like
  lesson lines (`narration.py` gathers them, kind `drill`); the player plays
  the clip a moment after the screen settles, with a big speaker to hear it
  again, and until a clip exists the browser's clearest voice for the
  language, a little slower.
- **Signs.** Items are written with `×` and `÷`; show them in the
  curriculum's `operation-signs` facet (`·` and `:` in de-DE).
- **Words** are spoken by the narration voice like lesson lines.
- **Item to task** (`drillTask`). A fact becomes `text_input` with the
  digit keyboard, or `multiple_choice`. A word becomes `text_input` with
  its sentence and the word blanked, or `multiple_choice` with two
  look-alike words of the bank. A word needs a sentence only for `say` and
  `type`.
- **The content build checks** that the skill exists, that every maths
  answer is right, that no item appears twice, that each format is known,
  and that a word bank's words appear in their sentences.

| Bank | Skill | Items |
|---|---|---|
| Times tables 3, 6, 9 | `math.mult-div.table-3-6-9` | 60 |
| Facts to 20 | `math.add-sub-to-20.fluency-to-20` | 72 |
| Year 1 exception words | `lit-en.spelling.exception-words-y1` | 52 |
| Sight words (Blitzlesen) | `lit-de.fluency.sight-words-easy` | 30 |
| Times tables 5 and 10 | `math.mult-div.table-5-10` | 40 |
| Times table 7 | `math.mult-div.table-7` | 29 |

### How the app gets content

Nothing reaches the backend yet. The importer reads JSON, and who builds
the converter from the Twist YAML to that JSON is an open decision on the
handoff page (R&D cannot write into schoolido-learning). The proposal:

1. The converter turns lessons, skills and drill banks into the importer's
   JSON. It carries `metadata.parts`, a check's `draw` and each task's
   `part`. Drill banks are a new record: one per skill, with its formats,
   time targets and items.
2. The backend builds sessions and sends them to the app.
3. The app plays the tasks with the lesson screens and posts each answer.
4. The backend scores the session, updates the states and recap dates,
   and serves the suggestions and the parent's practice view.

## Backend

### What to store per child

| Field | What it holds |
|---|---|
| Per skill | The state; the day it reached `can_do`; the position in the recap schedule; each recap (day, passed, position); the state before `needs_refresh`; the day it reached `remembered`; whether the 60-day upkeep recap is done |
| `seen` | Per task key, the day the child last saw it |
| `lastCheck` | Per skill, the task keys of the child's last skill check |
| `drills` | Per drill bank, the best rate (items a minute) and, per item, a weakness count |
| `sessions` | Finished sessions, for Busy Bee |
| `lastSkill` | The last skill practised, for the fallback suggestion |

The curriculum, year and age band come from the child profile.

### Drawing a check

Lessons draw their checks too, not only practice. When a child reaches a
check with `draw`, the backend picks the tasks with `drawCheck`: one task
of every part first, then the least recently seen, never a task from the
child's last attempt at that check while enough remain. It stores the
task ids shown as the last attempt (`lastCheck` per skill for the skill
check), and the seen days as for practice. A child who fails a skill
check gets a new draw from the same pool.

### Building a session

Request: `{ kind, skills, topics, minutes }`; only `kind` is required.
Response (`buildSession`):

```json
{
  "kind": "recaps",
  "skills": ["math.mult-div.table-3-6-9"],
  "mode": "none",
  "minutes": null,
  "seconds": null,
  "items": [
    { "key": "de-DE.math.table-3-6-9#1#l1-n1", "skill": "math.mult-div.table-3-6-9",
      "set": "de-DE.math.table-3-6-9", "lesson": 1, "stage": "none", "recap": true, "task": {} }
  ]
}
```

- `mode` is `catch` for catch-up (one hint after a wrong answer) and
  `none` for every other kind (no hints).
- `seconds` is the drill's time target per item for the child's age band.
- A drill item has `lesson: null`, `stage: "drill"` and a `drill` field
  with the item and its format.
- `recap: true` marks a task whose answer counts for the skill's recap.

### Recording answers

The app posts one result per item, in order: `{ outcome, ms }`.
`outcome` is `first`, `second`, `helped` (right after the catch-up hint)
or `shown` (answer shown after two misses; counts as wrong). `ms` is the
time from showing the task to the answer.

### Applying a session

`applySession` does all of this:

- **Seen.** Every answered lesson task gets today's day in `seen`.
- **Recaps.** For each skill in a recaps session, the recap passes with 2
  of its 2 or 3 tasks right on the first try, and the result goes to the
  recap schedule (`recordRecap`). A recap counts only when all its tasks
  were answered, and only once 80% of its gap has passed; a session left
  early leaves it due.
- **Drills.** An item missed or slower than the time target this session
  gets one weaker; an item right and fast every time gets one stronger.
  Weaker items come first in the next drill of that bank. The rate is
  first-try right answers a minute; above the best it is a new record.
  A drill paused or left early keeps its item results but sets no rate
  and no record.
- **Sessions.** A session counts as finished when every task in it is
  answered, and a drill when its time runs out.
- **Lesson checks.** Each lesson's check is kept, the latest try
  (`child.scores[setId][n]`: right first time, of how many, and on a skill
  check the parts with a miss). Study's unit list shows a lesson with a
  miss with the mascot, a circle per question of its check (a tick for
  each right) and a Redo button; nothing else is written. The tricky
  parts are for grown-ups (the parents dashboard). A skill left at one star
  (`practised`) with every lesson done failed its skill check, so its last
  lesson is marked even without a kept score ("Not quite yet"). The track's popover marks the same lesson in its meter and offers
  "Try again: <lesson>".

### Suggestions

Up to 3 cards (`suggestions`), each with a kind, its skills and a reason
in both languages, in this order. Before them, in the player
(`mySuggestions`): practice a parent sent (`child.assigned`: kind, skills, minutes, the
day sent; the parents dashboard's Send, see pages/parents-lab), the
newest still waiting, "Von deinen Eltern" / "From your grown-up";
finishing it records the day and score. Then:

1. Recaps due, if any: "4 skills to remember" / "4 Sachen zum Wiederholen".
2. Catch-up: a skill at `needs_refresh` first, else one at `practised`.
   The reason says when it slipped, if a recap failed (`catchUpReason`):
   "You found this tricky yesterday", "… 3 days ago", "… last week", "… a
   while ago" / "Das war gestern noch schwer", "… vor 3 Tagen …", "…
   letzte Woche …", "… vor einer Weile …". Otherwise "Let's practise this
   again"; at `practised`, "Nearly there: practise it once more". A
   catch-up practised to the end with at least 4 in 5 answers right first
   time rests until the next day (`goodDay`), so the same card does not
   come back straight after.
3. Drill: a bank the child has started, else one whose skill is under way,
   with the record if there is one ("Beat your record: 18 a minute").
4. With fewer than 3 cards: a review of the topic of the last skill
   practised.

The backend's practice recommendations already carry type, reason,
priority and expiry; each card maps onto one.

### Typed requests

A request is turned into filters, shown as chips the child can change
before starting:

```json
{ "subject": "math", "skills": ["math.mult-div.table-3-6-9"], "kind": "drill", "minutes": 10 }
```

- Fields: `subject`, `topics`, `skills`, `kind` (`mixed`, `drill`,
  `review`, `catch-up`), `minutes`. Every field is optional.
- `parseRequest` reads requests with a keyword list in English and German:
  subject names, topic names, skill words ("Einmaleins", "times tables",
  "Blitzlesen"), numbers with "Minuten" or "minutes", and table numbers
  ("mit 7", "the 7s", "7er"). It also returns the words it understood and
  whether it understood nothing.
- The contract is request in, these filters out. The backend may later
  read requests with a language model; nothing else changes.

## Mobile app

### The app's tabs

The app has four tabs at the bottom, as in ist-schoolido
(`app/(tabs)/_layout.tsx`): **Start / Home**, **Lernen / Study**, **Üben /
Practise** and **Ich / Me**. The tab bar shows on the tab screens and their
pages, and hides inside a lesson or a session. In the browser, Twist Preview
(`twist/pages/player/index.html`) is that app: its App view is the phone
with the four tabs, with the pretend child of the side panel as the child of
every tab; Study shows the lesson tools beside it, the other tabs the
pretend child and the time machine.

- **Start.** One plan for today. At the top, the greeting (the child's
  name when the pretend child has one) and a goal ring that fills as the
  plan gets done, with the streak in it; it opens Me. "Your plan for
  today" has two steps, each ticked off once done that day (read from the
  child's log):
  - **The lesson.** The large card follows the last lesson the child
    finished: the next lesson of that unit ("Pick up where you left off"),
    else the next unit of that course ("Next in English"), else the first
    unit of the next year; with no lesson yet, "Start here" and the first
    lesson of the first subject. It shows the unit's lessons as dots and
    the unit's place in the year ("Unit 8 of 20, Year 3").
  - **Practice.** The top practice suggestion.
  With both done, a well done with the streak, and "Want more?" with the
  next lesson. Below, "Your subjects": a ring per subject that fills with
  the units done this year, marked "new" until the child starts it; a tap
  opens Study on that subject. The Busy Bee bar shows only when the next
  level is three sessions away or less. The pretend child's year is a
  school year; a foreign language takes its learning year from it.
- **Study.** All the structured content. At the top, the subjects (maths
  first) and the year (the child's own marked; a foreign language by its
  learning year), with how many units are done; search within that
  subject and year; the topics as a row of chips to pick one ("Alle
  Themen" / "All topics" first; a topic shows its units done, "3/8", or a
  tick when all are); "Als Nächstes" / "Up next", one row with the next
  lesson and its minutes; then each topic with its units in course order
  (curricula placement), joined by a line from ring to ring that fills
  where units are done. A unit shows a ring of lessons done and, once
  started, its stars; done units sit smaller, and the unit with the next
  lesson is open and outlined. It opens to its "I can" goal and its
  lessons; a lesson opens in the lesson player. A lesson finished from the
  app moves its skill on (`finishLesson`): the first lesson starts it
  (`learning`); the skill check decides `can_do` or `practised`, never
  taking a skill below where it is, and is recorded as the last check. A
  lesson's ✕ and its "Fertig" / "Done" go back to Study.
- **Me.** The child's name and year; stars, the streak and badges earned
  as three tiles; "Diese Woche" / "This week", Monday to Friday with a
  flame on each day played, today outlined, the streak, the best run and
  the days to the next streak badge; the badges (`badges`, rewards.md):
  the earned ones, "Fast geschafft" / "Almost there" (the three closest,
  with a bar, only the next streak badge among them), and the rest folded
  away, each with how to earn it; stars per subject, each opening Study;
  drill records, each opening its drill map.
- **Badges** (`badges`): strand badges for the child's year (every skill of
  the strand placed in the year at `can_do`; gold when all `remembered`),
  Lift-off, Hat Trick, Elephant Memory, the streak badges and Busy Bee.
  Pathfinder, Summit, Legend, Comeback Kid, Like Clockwork and Time
  Traveller need checks or history the preview doesn't keep; they show
  locked with how to earn them.
- **Streak** (`streak`, rewards.md): school days in a row with a lesson or
  session finished; weekends neither break nor add, and today not played
  yet keeps it. **Busy Bee** (`busyBee`): 10, 50, 100, 250, 500, 1000
  sessions.

### The Practice tab

From the top:

1. **Title.** "Üben" / "Practise" and "Was üben wir heute?" / "What shall
   we practise today?". The greeting and the streak live on Start.
2. **Busy Bee strip**, at the bottom and only three sessions or fewer
   from the next level ("7 von 10 bis zum Fleißigen Bienchen" / "7 of 10
   to the Busy Bee"); opens Me.
3. **Suggested for you.** The first suggestion as a large card in the
   subject's colour, with the topic's mascot, the kind ("Weißt du es
   noch?" / "Do you remember?"), what it plays ("4 Sachen auffrischen" /
   "Refresh 4 skills", the topics, "12 Aufgaben aus 2 Themen, etwa 5
   Minuten") and a start button. Suggestions come from what the child has
   taken: recaps, catch-up, a sprint the child has played or whose skill
   they have begun, and a review of a topic they have begun. A child who
   has taken nothing yet gets no suggestion; Start points to the first
   lesson. A foreign language appears only from the year its curriculum
   gives it a learning year (French from Year 3).
   There is no search on the page; the builder's step 2 holds the one
   search, and it looks through every year, so an older skill can be
   found again.
4. **Selbst aussuchen / Choose my own**, a floating "+" button over the
   page, bottom right above the tab bar: wide with its label at the top of
   the page, a circle once scrolled, hidden while a sheet is open. It opens
   a builder in two steps:
   - **How:** three solid colour tiles in a sheet only as tall as they
     are, Race across the top and the other two side by side, each picture
     standing over the tile's top edge; a tap goes straight on, and the
     sheet says nothing aloud. Schnell! / Race!
     (a sprint the child has played or whose skill they have begun, else
     a 5-minute `mixed` round of learnt skills), Wundertüte! / Surprise!
     (`mixed` on three random learnt skills; it starts at once) and
     Frag mich ab! / Quiz me! (`review`, no hints, on
     learnt skills) and Selbst aussuchen / Pick my own (`mixed`, with
     hints, on the skills the child taps). Its step 2 has the search,
     subject chips, then "Noch üben" / "Needs practice" (skills at
     `practised` or `needs_refresh`, or with a lesson check that had a
     miss) above "Kannst du schon" / "You know these"; a search shows hits
     from every year. Under the list: the time (5, 10 or 15 minutes; a
     typed length wins) and a Hints switch (off plays `review` when every
     picked skill is learnt). The youngest see the topic's mascot on each
     card. A card with
     nothing to play is greyed out: "Nach deiner ersten Lektion" / "After
     your first lesson". Older bands get plainer names (Auf Zeit / Timed,
     Zufall / Random, Wiederholen / Review). No new session kinds.
   - **What:** up to 7, a subject by its picture (only subjects with
     something for that type), and the app picks the skills; in Pick my
     own the child taps the skills. From 8, the
     one search ("Suchen: Uhr, Plus, Nomen …"), topic words as chips, a
     subject filter, and the skills as cards with their short title, topic
     and stars; the suggestion is chosen already, so "Los geht's" starts at
     once. Without a search the cards are what the type can play, this
     year first; a search looks through every year. A typed request ("10
     Minuten Einmaleins mit 7") is read by `parseRequest`, as described
     under Typed requests, and its minutes set the length. Again on a
     skill not learnt yet plays it as `mixed`, with hints.
5. **Drills.** The banks of the child's year as a row of cards (record or
   "Noch nicht gespielt", and a bar of known, slow and missed items), and
   "Alle Drills" / "All drills": every bank of the curriculum by subject.
   A card opens its drill map.
6. **Ein Fach üben / Practise a subject.** The same rings as on Start
   (units done this year, "new" until started). A subject opens a page in its
   colour with the topics of the child's year, each with a ring for its
   stars and "Drill" when it has one; "Alle Klassen" / "All years" shows
   every year. An open topic starts with "Ganzes Thema wiederholen" /
   "Review the whole topic", then its skills, each with stars, "Üben" /
   "Practise" (skill practice) and, with a drill bank, "Drill" (the drill
   map).

The kinds as the child sees them:

| `kind` | de | en |
|---|---|---|
| `recaps` | Weißt du es noch? | Do you remember? |
| `catch-up` | Nachholen | Catch up |
| `review` | Wiederholen | Review |
| `skill` | Gezielt üben | Skill practice |
| `mixed` | Gemischt | Mixed |
| `drill` | Drill | Drill |

### Playing a session

- An intro screen comes first: the kind as a chip, the skill's name (or
  the kind's, for several skills), the size ("14 tasks, about 6 minutes")
  and a Goal card made from the session itself: its kind, the skills'
  names, and in a drill the minutes and the child's record ("Practise
  numbers in order to 10 again, with hints to help you."). It changes
  with every session, so it is shown and not spoken. Start begins the
  first task and the drill clock.
- Tasks play on the lesson task screens, with the kind's name in the
  header and a progress bar (by tasks; by time in a drill).
- No hints, except in `catch` mode: the first hint once, after a wrong
  answer.
- A task missed on the first try is added once at the end.
- After two misses the answer is shown.
- A drill ends when its time runs out. A missed drill item comes back
  after 3 to 5 other items. `flash` shows the word for a moment; `say`
  speaks it.
- Leaving early posts the answers given so far; recaps with unanswered
  tasks stay due.

### Drill map

"Drill" on a skill opens its map before the drill starts: what the child
knows of the bank, in four colours: known (right first time, within the time
target), still slow, not yet right, not tried yet (`drillMap`).

- **Number facts make a grid**, one per sign: rows the first number, columns
  the second, the answer in each tried cell. A division sits by its answer,
  so 21 ÷ 3 is where 7 × 3 is. Facts that would leave a grid less than 40%
  full (doubles, squares, both orders of one table) go on a wall instead.
- **Words make a wall** of word chips.
- At the top: the record per minute and the last ten drills as small bars.
- **Buttons.** "The tricky ones (n)" drills only the items last missed or
  slow; tapping facts (or a row's number) picks them, and "Just these (n)"
  drills only those; "Practise them all" drills the whole bank.
- Each drill records per item the times seen, the times right first time,
  how the last try went and the day (`child.drills[skill].items`).

### End screen

| Who | Sees |
|---|---|
| Child, 4 to 7 | The mascot with a burst of stars (none with reduced motion), the number right of the total ("12 von 14 richtig!" / "12 of 14 right!"), "Besser geworden:" / "You got better at:" with the skills, and the Busy Bee bar, which says so when a level is reached |
| Child, 8 to 10 | The same, plus "12 von 14 beim ersten Versuch richtig" / "12 of 14 right first time" |
| Child, drill | Items a minute, and the record ("Neuer Rekord: 18 pro Minute!" / "New record: 18 a minute!") |

Buttons: "Fertig" / "Done" goes home; "Nochmal" / "Again" repeats the
session.

### The app today

Practice sessions award nothing and post nothing. Answer checking depends
on the server sending the correct answer separately
(`services/quiz/practiceAdapter.ts` strips it from the options).

## Parent dashboard

Practice has no grades. Per child, for a week or a chosen range:

- Sessions finished and minutes practised.
- First-try share across those sessions.
- The skills practised, each with its state in the parent's words
  (lesson-anatomy.md), so a recap that moved a skill to "Remembers it" or
  "Needs a refresh" shows there.
- Drill records per bank, and how they changed.
- The Busy Bee badge level from finished sessions (rewards.md).

## Open decisions

- Who builds the converter and where it lives (handoff page).
- Whether the backend builds sessions (proposed) or the app does.
- Whether typed requests keep the keyword list or move to a language model.

## Not yet in the reference

The player leaves these out; the app should build them:

- Drill words without a recorded clip yet are spoken by the browser's own
  voice; the next narration run records them.
- The Lessons tab does not write the pretend child's last skill check; the
  side panel's ✓ and ✗ buttons take one instead.

## Content status

Authoring of the check pools and drill banks runs as a queue, subject by
subject (docs/plans/2026-10-18-practice-content.md, with its phases and
the brief). Live progress, one row per curriculum, subject and year, is in
views/tracking.md, "Practice content"; questions the reviewers left for a
decision are in docs/plans/2026-10-18-practice-questions.md.

On 2026-10-20 every lesson set has check pools, 918 of 918:

| Curriculum | Subjects | Sets |
|---|---|---|
| de-DE | Mathe, Deutsch, Englisch | 435 |
| en-GB | maths, English, French | 483 |
| Drill banks | maths, Deutsch, English, foreign languages | 30 banks, 1630 items |

Narration of the new lines runs after authoring; until it is done, the
player shows the new tasks without their recorded voice.

Next: en-GB maths Years 1 to 6, the maths drill banks, then the home
languages, their drill banks and the foreign languages. Reading checks
may change shape before the home languages (a draw by passage, 2 texts
with 2 or 3 questions each); that is open in the plan.

About 13,800 skill-check tasks, 2,900 quick-check tasks and 24 more drill
banks in all; 30 drill banks when done. More volume (bigger pools, a practice bank of no-help tasks) waits until
after launch, when children's data shows where it is needed: the options and
their size are in the plan, "Later: more volume".
