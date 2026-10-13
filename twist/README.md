# Twist curriculum

The clean Twist curriculum for primary school: competencies, lessons, the
official frameworks they map to, and the grade and year placement per
curriculum profile. Everything here is our own work. Research inputs
(Anton captures, crosswalks, analyses) stay outside this folder, at the rnd
root and in the source folders.

Plan and status: [PLAN.md](PLAN.md). Rules: [AGENTS.md](AGENTS.md).

The chain: **Curriculum, Subject, Year, Topic, Skill, Lesson, Activity,
Task**, named for teachers and children in
[docs/lesson-anatomy.md](docs/lesson-anatomy.md). Every task type and the
interactions it supports: [docs/task-types.md](docs/task-types.md).

Two curricula for now, on one shared library: **de-DE** (Germany, KMK) and
**en-GB** (England, EYFS and National Curriculum). Skills per year and
subject for both: [views/placements.md](views/placements.md).

## Layout

| Folder | What goes in it | Kind |
|---|---|---|
| [docs/](docs/) | The spec: the model, naming, age bands, locale facets, id rules | written |
| [schema/](schema/) | JSON Schema for each record type | written |
| [years/](years/) | The years each market uses: Reception, Year 1 to 6, Klasse 1 to 4, Stufe 0, Lernjahr 1 and 2, French years 1 to 4 | records |
| [frameworks/](frameworks/) | Official documents as coded objectives, verbatim quotes with page references, generated from the captured documents. `de/` for the KMK standards, `gb/` for EYFS and the National Curriculum | generated |
| [competencies/](competencies/) | The competency library: learning progressions and their skills, one folder per domain (`math`, `lit-de`, `lit-en`, `fl`) | records |
| [lessons/](lessons/) | Hand-authored lessons, one file per skill and curriculum (`lessons/de-DE/math/...`) | records |
| [assets/](assets/) | The asset bank: objects (one picture per concept, in the mascot style, made by assets/tools/pictures.py), components the app draws, sounds, and the voice pilot (assets/tools/narration.py) | records |
| [curricula/](curricula/) | One curriculum per market (`de-DE`, `en-GB`): which frameworks apply and in which year each skill is placed | records |
| [views/](views/) | Generated: grade and year views per profile, the competency library by domain, and coverage of each framework | generated |

Records are YAML. Views are built from the records by `build.mjs` (step C6
in the plan) and are never edited by hand.
