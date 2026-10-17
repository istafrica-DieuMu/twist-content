# Practice

How practice outside lessons works: the kinds of session, where their tasks
come from, how a session is scored, the Practice tab, typed requests and
drill banks. The lesson player's Practice tab is where these rules are
tried and tuned before the app builds them. Mastery, recaps and the states
are in lesson-anatomy.md; stars and badges in rewards.md.

Decided 2026-10-17.

## What practice is for

- Bring back skills before they are forgotten (recaps).
- Close gaps: skills at `Practised` or `Needs a refresh` (catch-up).
- Let a child practise what they choose: a topic, a skill, a drill.
- Build speed on facts to know by heart: times tables, facts to 20,
  tricky and exception words (drills).

Practice earns no stars. Recap tasks inside a session count for mastery
under the recap rules; everything else is practice only.

## Sessions

| Session | For | Tasks from | Help |
|---|---|---|---|
| Recaps due | Skills with a recap due and not taken by a warm-up | No-help Practise tasks and check tasks of each skill | None |
| Catch-up | One skill at `Practised` or `Needs a refresh` | Full-help stage first, then some-help, then no-help | The first hint once, after a wrong answer |
| Topic review | A topic the child picks | No-help Practise tasks and check tasks of the topic's skills | None |
| Skill practice | One skill the child picks | All three Practise stages, getting harder | None |
| Drill | A skill with a drill bank | The drill bank | None; an optional timer |

- **Length.** 10 tasks for ages 4 to 5, 14 for 6 to 7, 16 for 8 to 10. A
  drill runs by time instead: 2, 3 or 5 minutes.
- **Mixing.** Recaps due and topic review interleave skills: never two tasks
  of the same skill in a row when another skill is left.
- **Which task.** Inside its pool, a session takes the task the child has
  seen least recently, never one of the child's last skill-check tasks,
  with choice options shuffled each time.
- **Recaps first.** When a recap is due, its tasks take the no-help and
  check tasks first; other sessions use the rest.
- **Missed tasks.** A task missed on the first try comes back once at the
  end of the session.
- **Two misses.** The answer is shown, as in lessons, and counts as wrong.
- **Stage as difficulty.** Hints are off in practice, so the Practise
  stage a task comes from works as its difficulty: full-help tasks are the
  easiest way in, no-help and check tasks the hardest.

## Scoring

| Who | Sees |
|---|---|
| Child, 4 to 7 | The mascot, the number right ("12 richtig!" / "12 right!"), and "You got better at ..." / "Besser geworden: ..." per skill |
| Child, 8 to 10 | The same, plus "12 of 14 right first time" |
| Child, drill | Items per minute, and a personal best per drill bank ("New record: 18 a minute!") |
| Parent | Sessions, minutes, first-try share, the skills practised, drill records; no grades |

- Every task records its first try, the time taken and whether the answer
  was shown.
- A session is finished when every task in it is answered; finished
  sessions count for Busy Bee (rewards.md).
- In a drill, an item answered wrong or slower than the time target comes
  back sooner (in the same drill after 3 to 5 other items, and first in the
  next drill of that bank).

## The Practice tab

From the top:

1. **Suggested for you.** Up to 3 cards, each with its reason in plain
   words, in this order:
   - Recaps due: "4 skills to remember" / "4 Sachen zum Wiederholen".
   - Catch-up: the skill's "I can" line and why ("you missed it last week").
   - Drill: "Beat your record: 3, 6 and 9 times tables".
   With nothing due, the cards suggest the topic of the child's latest
   lesson and a drill they have started.
2. **Search.** Over the skills' "I can" lines, topic names and drill banks,
   in the child's language.
3. **Browse.** Subject, then topic, then skill. Each skill shows its stars;
   a skill with a drill bank shows a drill button.
4. **Floating button: Make my own.** A sheet with subject and topic chips,
   time (5, 10 or 15 minutes), kind (mixed, drill, review), and a text box:
   "What do you want to practise?" / "Was möchtest du üben?"

## Typed requests

A request is turned into filters, shown as chips the child can change
before starting:

```json
{ "subject": "math", "skills": ["math.mult-div.table-7"], "kind": "drill", "minutes": 10 }
```

- Fields: `subject`, `topics`, `skills`, `kind` (`mixed`, `drill`,
  `review`, `catch-up`), `minutes`, `tasks`. Every field is optional.
- The player reads requests with a keyword list in English and German:
  subject names, topic names, skill words ("Einmaleins", "times tables",
  "Plus", "spelling"), numbers with "Minuten" or "minutes", and table
  numbers ("mit 7", "the 7s").
- What it does not understand it says, and opens the filters.
- The contract is request in, these filters out. The app may later read
  requests with a language model on the backend; nothing else changes.

## Drill banks

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
  the answer and two near misses the app picks from other items of the
  bank. `flash`: a word shows for a moment and the child picks it
  (reading). `say`: the word is spoken and the child types it (spelling).
  `timed`: any of these against the time target.
- **Signs.** Items are written with `×` and `÷`; the app shows them in the
  curriculum's `operation-signs` facet (`·` and `:` in de-DE).
- **Words** are spoken by the narration voice like lesson lines.
- **The build checks** that the skill exists, that every maths answer is
  right, that no item appears twice, that each format is known, and that a
  word bank's words appear in their sentences.

Starter banks, written by hand:

| Bank | Skill |
|---|---|
| Times tables 3, 6, 9 | `math.mult-div.table-3-6-9` |
| Facts to 20 | `math.add-sub-to-20.fluency-to-20` |
| Year 1 exception words | `lit-en.spelling.exception-words-y1` |
| Sight words (Blitzlesen) | `lit-de.fluency.sight-words-easy` |

## The player's Practice tab

The player gets a second tab, Practice, next to the lessons.

- **Phone:** the Practice tab as the child sees it (above), playing
  sessions with the lesson task screens, with hints switched off.
- **Side panel, the pretend child:** curriculum, year, age band; each
  skill's state, with a bulk setter ("every skill before this one at I can
  do it"); a pretend today with "+1 day" and "+1 week", so recaps fall due.
  Saved in the browser.
- **Side panel, why this task:** for each task, the session kind, the pool
  (stage, check or drill bank), the skill, and the rule that picked it.
- The rules (session building, the recap schedule, the request reader) are
  plain functions in their own file, with tests, so the app team can read
  and port them.

## Later

- Skill checks to 20 tasks a skill, each task tagged with the part of the
  skill it covers, so each attempt draws a different 5 that still covers
  every part; the rest feed recaps and practice. About 13,800 tasks.
- Short checks doubled, about 2,900 tasks.
- Drill banks for the other skills to know by heart, about 30 in all.
- The app: the Practice tab, scoring and recommendations. Its practice
  recommendations already carry type, reason, priority and expiry, which
  the tab does not show yet.
