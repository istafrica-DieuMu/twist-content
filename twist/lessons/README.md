# lessons

Hand-authored lessons, one file per skill and curriculum:
`lessons/<curriculum>/<year>/<domain>/<slug>.yaml`, for example
`lessons/de-DE/klasse-1/math/count-to-5.yaml`. The year folder follows the
curriculum file (curricula/de-DE.yaml places count-to-5 in klasse-1), and
the build refuses a file in any other folder. How lessons are built is in
[../docs/lesson-anatomy.md](../docs/lesson-anatomy.md); the build checks
every file against it (lessons-check.mjs) and lists them in
[../views/lessons.md](../views/lessons.md). [../views/course-de-DE.md](../views/course-de-DE.md)
shows a curriculum as authored, year by year in placement order.

Model lessons (de-DE, drafts):

| File | Skill | Year |
|---|---|---|
| [de-DE/math/add-bridge-10.yaml](de-DE/math/add-bridge-10.yaml) | Adding across ten | Klasse 1 |
| [de-DE/lit-de/letters-l-o-a-m.yaml](de-DE/lit-de/letters-l-o-a-m.yaml) | The letters L, O, A, M | Klasse 1 |
| [de-DE/fl/en-colours.yaml](de-DE/fl/en-colours.yaml) | Colours in English | Stufe 0 |

## Record

```yaml
id: de-DE.math.add-bridge-10          # <curriculum>.<domain>.<slug>; never contains a year
skill: math.add-sub-to-20.add-bridge-10
curriculum: de-DE
track: daz                            # a track's set only (id de-DE.daz.<slug>; docs/model.md, Tracks)
language: de                          # language of the instructions
target_language: en                   # foreign-language lessons only
title: { de: "...", en: "..." }       # quote titles that contain commas or question marks
summary: >                            # what the lessons do, in English, for the team
  ...
metadata:
  year: klasse-1                      # must match the curriculum's placement
  topic: { de: ..., en: ... }
  ages: [6-7]                         # age versions written so far
  lesson_minutes: 8
  builds_on: [skill ids]              # what warm-ups draw on; must be prerequisites, directly or further back
  also_practises: [skill ids]         # skills used along the way but taught elsewhere
  vocabulary: { de: [...] }           # words the child meets and should understand
  no_reading: true                    # every task can be done without reading (Stufe 0, ages 4 to 5)
  forms: [drawn, text, audio, picture]
  drawn: [component ids]              # must match what the tasks use
  sounds: [sound ids]                 # must match what the tasks use
  facets: [operation-signs]
  misconceptions:                     # the typical errors the lessons address, and where
    - { id: ..., what: ..., addressed: ... }
  twist_reuse: []                     # schoolido-learning modules adapted, if any
  status: draft                       # draft, checked, reviewed
  version: 1
  authored: 2026-10-12
lessons:
  - n: 1
    title: { de: ..., en: ... }
    goal: { de: "...", en: "..." }    # shown under Goal on the start screen; a child's words, from the skill's can_do, never copied
    new_content: true                 # true: something new, so a Learn comes before Practise
    activities:
      - activity: warm-up             # warm-up, learn, practise, check
        from: earlier-skills          # warm-up: earlier-skills or last-lesson
        tasks: [...]
      - activity: learn
        mode: demonstration           # worked-examples, demonstration, model-text, new-sound, new-word, do-it-with-me
        screens: [{ text, say, show, sound }]
      - activity: practise
        setting: plain                # plain or in-context; a stage may set its own
        stages:                       # always full, some, none, in that order; 5 or 6 tasks each
          - support: full             # 3 hints per task
            tasks: [...]
          - support: some             # 1 hint per task
            tasks: [...]
          - support: none             # no hints
            setting: in-context
            tasks: [...]
      - activity: check
        size: quick                   # quick, skill (last lesson only), timed
        tasks: [...]
```

## Task

```yaml
- id: l1-f3                    # unique in the file: w warm-up, f/s/n the three Practise stages, c check
  type: multiple_choice        # a Twist question type
  text: "9 + 3 = _"            # what the screen shows
  say: "..."                   # what the voice says, if different from text
                               # in foreign-language lessons: { de: instruction, en: target words }
  show: { drawn: zwanzigerfeld, filled: [9, 3] }   # or { object: apple, count: 7 }
  audio: { sound: de.l }       # for audio_choice: a recorded sound, or { en: "Red." }
  options: ["10", "11", "12"]  # strings, or { object: ... } / { drawn: ..., colour: ... }
  answer: "12"
  feedback: { "10": "..." }    # per wrong option
  hints: ["strategy", "think aloud", "direct cue"]  # 3 in the full stage, 1 in some, none otherwise; tracing never
  difficulty: easy             # easy, core, stretch; leave out for core
  option_audio: false          # rarely needed; see below
```

Matching and sorting mirror the Twist schemas, with bank ids in place of
image URLs. Any pair side, bin or option can carry its own `say`, spoken
when the child taps it:

```yaml
- type: matching                # 2 to 6 pairs; the app shuffles the right side
  pairs:
    - left: { drawn: colour-swatch, colour: yellow, say: { en: "Yellow." } }
      right: { object: banana }
- type: sorting                 # 2 to 5 bins; every option names its bin
  bins:
    - { id: red, show: { drawn: colour-swatch, colour: red }, say: { en: "Red." } }
  options:
    - { object: strawberry, bin: red }
```

Every task type and interaction, with its fields and an example, is in
[../docs/task-types.md](../docs/task-types.md): the one source of truth
for types. Type-specific fields follow the Twist schemas: `frame` and a list `answer`
for fill_in_blank, `total_items` for drag_and_drop_count, `char` for tracing,
`expected_text` for speak, `spans` for highlight_in_text. Pictures, drawn
components and sounds are named by their asset bank id
([../assets/](../assets/)); the build rejects any id the bank does not have.

Options get a speaker when hearing them does not give the answer away: a
picture says its word ("Lampe"), a number or sum is read ("7 plus 6").
There is no option audio on audio_choice, where the sound is the question,
and none for a letter or syllable option. Set `option_audio` on a task only
when that default is wrong; narration.py and the player both follow it.
