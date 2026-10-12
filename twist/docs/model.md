# The Twist curriculum model

The spec for every record in twist/. PLAN.md explains why; this file says
what. If the two disagree, this file wins and PLAN.md gets fixed.

> Grade determines curriculum expectations, proficiency determines learning
> level, and age determines presentation.

## Names

The chain is **Curriculum, Subject, Year, Topic, Skill, Lesson, Activity,
Task**. Names for teachers and children in each country are in
[lesson-anatomy.md](lesson-anatomy.md). In the records:

| Level | Where it lives | Key |
|---|---|---|
| Curriculum | curricula/<id>.yaml | `curriculum` (de-DE, en-GB) |
| Subject | a domain (`math`, `lit-de`, `lit-en`, `fl`), named per curriculum in `subjects` | `domain` |
| Year | years/<market>.yaml; placement keys in the curriculum | year ids (klasse-1, year-2, lernjahr-1, ly-1) |
| Topic | on each skill | `topic` |
| Skill | competencies/<domain>/<progression>.yaml | `skills`, `id` |
| Learning progression | one file in competencies/ | `progression` |
| Standard | frameworks/<country>/<id>.yaml; linked from each skill | `standards` |
| Lesson, Activity, Task | lessons/ (to come) | |

## Records

| Record | Folder | One file holds | Key |
|---|---|---|---|
| Year list | years/ | the years of one market | `market` |
| Framework | frameworks/<country>/ | one official document and its standards | `framework` |
| Progression | competencies/<domain>/ | one learning progression and its ordered skills | `progression` |
| Lesson | lessons/<domain>/ | the lessons of one skill | `id` |
| Curriculum | curricula/ | one curriculum and its placements | `curriculum` |

The schemas in ../schema/ are the exact shape. build.mjs validates every
record against them.

## Domains

| Domain | What it covers | Used by |
|---|---|---|
| `math` | number, operations, measures, shape and space, patterns, data and chance | every market |
| `lit-de` | reading and writing German as the home language, from letters and sounds to texts | Germany; later Austria, Switzerland |
| `lit-en` | reading and writing English as the home language, from phonics to texts | England |
| `fl` | an early foreign language: listening, speaking, reading, writing, themes | Englisch in Germany, French in England |

Speaking and listening in the home language belong to `lit-de` and `lit-en`.
`fl` skills are language-neutral can-do statements; each target language
gets its own lessons for them.

## Progressions and skills

A progression is an ordered list of skills in one domain, such as
`math.place-value` or `lit-de.spelling-strategies`. Order in the file is
the teaching order inside the progression, and it binds: each skill has the
skill before it as an implicit hard prerequisite, so no curriculum can place
them the other way round. A progression whose skills can come in any order
(the times tables, mass and capacity) says `order: free`, and then only
the explicit prerequisites bind.

A skill is one observable can-do statement, small enough to teach in one
lesson and check with one or two items. Each skill has:

- `id`: `<domain>.<progression>.<slug>`, for example
  `math.place-value.bundle-tens`. No numbers for order, no grade.
- `can_do`: an "Ich kann ..." and an "I can ..." statement. The German
  statement is the one German children and teachers read; the English one is
  for the team and for England. For `lit-de` the German is primary; for
  `lit-en` the English is.
- `prerequisites.hard`: skills that must be secure first. Can cross
  progressions and domains.
- `prerequisites.soft`: skills that help but do not block.
- `topic`: the child-facing section label, in German and English. Skills
  that share a label in the same year form one topic in a grade view.
- `standards`: the framework standard codes this skill helps satisfy.
  The link lives here, on the skill, so framework files can be regenerated
  from their documents without losing it. Coverage is computed both ways.
- `scope`: optional limits that make the skill concrete, such as a number
  range (`range: 20`) or a set of letters.
- `enrichment`: true when no framework standard asks for the skill, with
  `reason`.
- `facets`: the locale facets the skill depends on (below), such as
  `written-subtraction` or `currency`.
- `beyond_framework`: a reason, for a skill no framework standard asks for
  but schools in the market teach (written division in Germany).
- `note`: free text; required when a skill has no standard yet and is not
  enrichment (for example a skill only the English frameworks will ask for).

## Years

A year is where a curriculum places a skill. Two kinds:

- `grade`: a school year (Reception, Year 1 to 6, Klasse 1 to 4).
- `learning-year`: a year of learning a foreign language (Stufe 0,
  Lernjahr 1 and 2; learning years 1 to 4 for French in England). A curriculum
  says which grades each learning year usually falls in.

Year ids are fixed: `reception`, `year-1` to `year-6`, `klasse-1` to
`klasse-4`, `stufe-0`, `lernjahr-1`, `lernjahr-2`, `ly-1` to `ly-4`.

## Frameworks and standards

A framework is one official document, generated from the captured text by
an extractor in the source folder and never edited by hand. Each standard
has:

- `code`: ours, built from the document's own structure, prefixed with the
  framework id (`kmk-m22.zo.2.3`). Stable.
- `text`: the document's wording, verbatim, in its language.
- `page`: the page in the captured file.
- `band`: the year or years the document attaches it to (`end-klasse-4`,
  `klasse-1-2`, `year-3`, `ks2`, `elg`).

Land Lehrpläne (NRW, Bayern, Baden-Württemberg, Berlin/Brandenburg) are
kept as reference files in official-de/frameworks/, outside twist/. They
are not part of the de-DE curriculum.

The KMK standards describe the end of Klasse 4. They are the competency
base; placement in Klasse 1 to 4 follows the usual German order, checked
against the NRW Lehrplan's Klasse 2 and Klasse 4 bands.

## Curricula and placement

A curriculum is one market's curriculum: `de-DE` (one curriculum for Germany,
on the KMK standards; no Land curricula for now) and `en-GB` (England, on
EYFS and the National Curriculum). It lists:

- `frameworks`: the framework ids that apply.
- `years`: the market's year list.
- `learning_years`: for `fl`, which grade each learning year usually starts
  in, and any Land variants.
- `placement`: for each year, the skills placed in it, in teaching order.
  A skill's year is when the curriculum expects it. Skills not placed are
  not part of the curriculum.
- `facets`: the locale facet values for the market (below).
- `domains`: the domains the curriculum covers so far; every skill in them
  that serves one of the curriculum's frameworks must be placed.
- `subjects`: the subject name for each domain in this market (`fl:
  Englisch`); grade views are grouped by it.
- `learning_years`: for `fl`, the target language and the grades each
  learning year usually falls in.
- `out_of_scope`: framework standards the app does not teach, each with a
  reason (classroom-only activities such as scenic play or a library visit).

The build checks placement against each standard's band (end of a Klasse,
end of Reception, end of a Year). A learning year is compared through
the last grade it usually falls in, so French year 4 counts as Year 6.

Placement says what is expected by when. It never limits what a child may
work on: a learner's proficiency, per progression, decides where they
actually work.

## Lessons

A skill is taught over 2 to 6 lessons, each one short sitting. The lessons
of one skill (sometimes two skills that cannot be taught apart) live in one
record:

- `id`: `<domain>.<slug>`; for `fl`, `fl.<language>.<slug>` (`fl.en.`,
  `fl.fr.`).
- `teaches`: the skill ids.
- `age_bands`: the presentation variants it needs: `a4-5` (audio-led, no
  reading), `a6-7` (audio support, short text), `a8-10` (text-led).
- `representation`: the most image-light form that still teaches the skill:
  `text`, `audio`, `drawn` (the app draws it from data: ten-frames, number
  lines, clocks, shapes), `picture` (a commissioned illustration), `photo`.
- `facets`: the locale facets the lesson depends on.
- `task_types_likely`: Twist question types its tasks will probably use.
- `twist_reuse`: today's schoolido-learning module ids it can adapt, each
  with `fit` (`as-is`, `adapt`, `rewrite`).
- `status`: `draft`, `checked`, `reviewed`.

How lessons are built (activities and tasks) and the mastery rule are in [lesson-anatomy.md](lesson-anatomy.md).

## Locale facets

Market differences that do not need a different skill, applied by the app
or by the lesson's variants:

| Facet | de-DE | en-GB |
|---|---|---|
| `currency` | euro, cent (€, ct) | pound, pence (£, p) |
| `number-format` | 3.847 and 2,5 | 3,847 and 2.5 |
| `operation-signs` | `·` and `:` | `×` and `÷` |
| `units` | metric | metric, with miles, pints in context where the NC asks |
| `time-format` | 24-hour in writing, "Viertel nach" | 12-hour with am and pm, "quarter past" |
| `date-format` | 12.10.2026 | 12/10/2026 |
| `script` | Druckschrift, then a Land's Schreibschrift | print, then joined |
| `written-subtraction` | by Land (from C1) | column method with exchange |

## Ids

Lowercase ASCII, dot between levels, hyphen inside a level. Umlauts and ß
written out: ä ae, ö oe, ü ue, ß ss. Once a curriculum is published an id
never changes; renaming means a new id and a `replaces` field on it.
