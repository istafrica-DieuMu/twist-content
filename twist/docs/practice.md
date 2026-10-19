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
side panel sets a pretend child's skill states and date, and explains why
each task was picked.

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
  the answer and two near misses picked from other items of the bank.
  `flash`: a word shows for a moment and the child picks it (reading).
  `say`: the word is spoken and the child types it (spelling). `timed`:
  any of these against the time target.
- **Signs.** Items are written with `×` and `÷`; show them in the
  curriculum's `operation-signs` facet (`·` and `:` in de-DE).
- **Words** are spoken by the narration voice like lesson lines.
- **Item to task** (`drillTask`). A fact becomes `text_input` with the
  digit keyboard, or `multiple_choice`. A word becomes `text_input` with
  its sentence and the word blanked, or `multiple_choice` with two other
  words of the bank.
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
- **Sessions.** A session counts as finished when every task in it is
  answered, and a drill when its time runs out.

### Suggestions

Up to 3 cards (`suggestions`), each with a kind, its skills and a reason
in both languages, in this order:

1. Recaps due, if any: "4 skills to remember" / "4 Sachen zum Wiederholen".
2. Catch-up: a skill at `needs_refresh` first, else one at `practised`.
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

### The Practice tab

From the top:

1. **Greeting.** The mascot, "Hallo! Was üben wir heute?" / "Hi! What
   shall we practise today?", and the number of finished sessions with the
   bee.
2. **Suggested for you.** The first suggestion as a large card in the
   subject's colour, with the topic's mascot, the kind ("Weißt du es
   noch?" / "Do you remember?"), the reason, the skill's "I can" line, the
   size ("12 Aufgaben, etwa 5 Minuten" / "12 tasks, about 5 minutes") and
   a start button. The other suggestions as two smaller cards below it.
3. **Search.** Over the skills' "I can" lines, topic names and drill banks,
   in the child's language; the child's year first.
4. **Your subjects.** Each with its mascot and a bar of stars earned ("30
   von 138 Sternen" / "30 of 138 stars"). A subject opens a page in its
   colour with the topics of the child's year, each with a ring for its
   stars; "Alle Klassen" / "All years" shows every year. A topic lists its
   skills, each with stars, "Üben" / "Practise" (skill practice) and, with
   a drill bank, "Drill". "Ganzes Thema wiederholen" / "Review the whole
   topic" starts a topic review.
5. **Floating button: Make my own.** A sheet with the text box at the top,
   "Was möchtest du üben?" / "What do you want to practise?", then chips in
   groups: subject, topic, time (5, 10 or 15 minutes; a drill at most 5)
   and kind (mixed, drill, review, catch-up). The start button stays at the
   bottom. A typed request sets the chips and keeps the text. One it cannot
   read says "Das habe ich nicht verstanden. Wähle unten aus." / "I didn't
   understand that. Pick below."

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

### End screen

| Who | Sees |
|---|---|
| Child, 4 to 7 | The mascot with a burst of stars (none with reduced motion), the number right ("12 richtig!" / "12 right!"), and "Besser geworden:" / "You got better at:" with the skills |
| Child, 8 to 10 | The same, plus "12 von 14 beim ersten Versuch richtig" / "12 of 14 right first time" |
| Child, drill | Items a minute, and the record ("Neuer Rekord: 18 pro Minute!" / "New record: 18 a minute!") |

Buttons: "Nochmal" / "Again" repeats the session; "Zurück zum Üben" /
"Back to practice" goes home.

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

- `lastCheck` is never written, so nothing leaves out the last skill-check
  tasks yet.
- Recaps first: other sessions do not yet hold back the no-help and check
  tasks for a due recap.
- Drill `choose` options are random items of the bank, not near misses.
- A slow word item comes first in the next drill but not again within the
  same one.
- `flash` shows the options with the word instead of after it goes.
- The catch-up card's reason is generic ("Let's practise this again"),
  not the specific "you missed it last week".

## Content status

Authoring of the check pools and drill banks runs as a queue, subject by
subject (docs/plans/2026-10-18-practice-content.md, with its phases and
the brief). Live progress, one row per curriculum, subject and year, is in
views/tracking.md, "Practice content"; questions the reviewers left for a
decision are in docs/plans/2026-10-18-practice-questions.md.

On 2026-10-18:

| Done | Sets |
|---|---|
| de-DE Mathe Klasse 1 to 4, every set | 203 |
| en-GB maths Reception, every set | 14 |
| en-GB times tables 5 and 10, 3 6 9, 7 (Years 2 to 4, the first pilot) | 3 |
| One pilot each: Deutsch spelling, Deutsch reading a text, English phonics, Reception English, Englisch Lernjahr 1 | 5 |
| In all | 225 of 918 |

Next: en-GB maths Years 1 to 6, the maths drill banks, then the home
languages, their drill banks and the foreign languages. Reading checks
may change shape before the home languages (a draw by passage, 2 texts
with 2 or 3 questions each); that is open in the plan.

About 13,800 skill-check tasks, 2,900 quick-check tasks and 24 more drill
banks in all; 30 drill banks when done. More volume (bigger pools, a practice bank of no-help tasks) waits until
after launch, when children's data shows where it is needed: the options and
their size are in the plan, "Later: more volume".
