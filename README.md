# Twist content

The Twist primary curriculum and the research behind it.

**Start with the site:** open `twist/pages/site/index.html`. It explains how
the content works and fits together: the chain from curriculum to task, the
curricula year by year with every skill and its lessons, the task types and
components, the reviews and the R&D.

## Find a lesson

Lessons are filed the way the curriculum places them:

```
twist/lessons/<curriculum>/<year>/<subject>/<skill>.yaml
twist/lessons/de-DE/klasse-1/math/count-to-5.yaml
twist/lessons/de-DE/klasse-3/lit-de/long-i.yaml
twist/lessons/de-DE/lernjahr-1/fl/en-weather.yaml
```

| Curriculum | Years | Subjects (folder) |
|---|---|---|
| de-DE | klasse-1 to klasse-4; stufe-0, lernjahr-1, lernjahr-2 for Englisch | Mathe (math), Deutsch (lit-de), Englisch (fl) |
| en-GB | reception, year-1 to year-6; ly-1 to ly-4 for French | Maths (math), English (lit-en), French (fl) |

- The whole course as authored, with every lesson's file:
  `twist/views/course-de-DE.md` (and course-en-GB.md).
- Play a lesson: `twist/pages/player/index.html`.
- What each year places: `twist/curricula/de-DE.yaml`.

## Quick reference

| What | Where |
|---|---|
| How a lesson is built, mastery, authoring checks | twist/docs/lesson-anatomy.md |
| Records and ids | twist/docs/model.md |
| Task types | twist/docs/task-types.md |
| Skills ("Ich kann") | twist/competencies/ |
| Pictures, drawn components, sounds | twist/assets/ |
| Progress, cost, reviews, open points | twist/views/tracking.md |
| Plan | twist/PLAN.md |
| Research | rnd/ |

## Build

```
node twist/build.mjs                 # check every record, write twist/views/
node twist/pages/site/build.mjs      # the site
node twist/pages/player/build.mjs    # the lesson player
```
