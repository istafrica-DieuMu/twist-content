# The Twist curriculum model

The spec for every record in twist/. PLAN.md explains why; this file says
what. If the two disagree, this file wins and PLAN.md gets fixed.

> Grade determines curriculum expectations, proficiency determines learning
> level, and age determines presentation.

## Records

| Record | Folder | One file holds | Key |
|---|---|---|---|
| Stage list | stages/ | the stages of one market | `market` |
| Framework | frameworks/<country>/ | one official document and its objectives | `framework` |
| Progression | competencies/<domain>/ | one progression and its ordered steps | `progression` |
| Lesson | lessons/<domain>/ | one lesson | `id` |
| Profile | profiles/ | one curriculum profile and its placements | `profile` |

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
`fl` steps are language-neutral can-do statements; each target language
gets its own lessons for them.

## Progressions and steps

A progression is an ordered list of steps in one domain, such as
`math.place-value` or `lit-de.spelling-strategies`. Order in the file is
the teaching order inside the progression, and it binds: each step has the
step before it as an implicit hard prerequisite, so no profile can place
them the other way round. A progression whose steps can come in any order
(the times tables, mass and capacity) says `order: free`, and then only
the explicit prerequisites bind.

A step is one observable can-do statement, small enough to teach in one
lesson and check with one or two items. Each step has:

- `id`: `<domain>.<progression>.<slug>`, for example
  `math.place-value.bundle-tens`. No numbers for order, no grade.
- `can_do`: an "Ich kann ..." and an "I can ..." statement. The German
  statement is the one German children and teachers read; the English one is
  for the team and for England. For `lit-de` the German is primary; for
  `lit-en` the English is.
- `prerequisites.hard`: steps that must be secure first. Can cross
  progressions and domains.
- `prerequisites.soft`: steps that help but do not block.
- `topic`: the child-facing section label, in German and English. Steps
  that share a label in the same stage form one topic in a grade view.
- `objectives`: the framework objective codes this step helps satisfy.
  The link lives here, on the step, so framework files can be regenerated
  from their documents without losing it. Coverage is computed both ways.
- `scope`: optional limits that make the step concrete, such as a number
  range (`range: 20`) or a set of letters.
- `enrichment`: true when no framework objective asks for the step, with
  `reason`.
- `facets`: the locale facets the step depends on (below), such as
  `written-subtraction` or `currency`.
- `beyond_framework`: a reason, for a step no framework objective asks for
  but schools in the market teach (written division in Germany).
- `note`: free text; required when a step has no objective yet and is not
  enrichment (for example a step only the English frameworks will ask for).

## Stages

A stage is where a profile places a step. Two kinds:

- `grade`: a school year (Reception, Year 1 to 6, Klasse 1 to 4).
- `learning-year`: a year of learning a foreign language (Stufe 0,
  Lernjahr 1 and 2; learning years 1 to 4 for French in England). A profile
  says which grades each learning year usually falls in.

Stage ids are fixed: `reception`, `year-1` to `year-6`, `klasse-1` to
`klasse-4`, `stufe-0`, `lernjahr-1`, `lernjahr-2`, `ly-1` to `ly-4`.

## Frameworks and objectives

A framework is one official document, generated from the captured text by
an extractor in the source folder and never edited by hand. Each objective
has:

- `code`: ours, built from the document's own structure, prefixed with the
  framework id (`kmk-m22.zo.2.3`). Stable.
- `text`: the document's wording, verbatim, in its language.
- `page`: the page in the captured file.
- `band`: the stage or stages the document attaches it to (`end-klasse-4`,
  `klasse-1-2`, `year-3`, `ks2`, `elg`).

Land Lehrpläne (NRW, Bayern, Baden-Württemberg, Berlin/Brandenburg) are
kept as reference files in official-de/frameworks/, outside twist/. They
are not part of the de-DE curriculum.

The KMK standards describe the end of Klasse 4. They are the competency
base; grade placement comes from each Land's Lehrplan through the profile.

## Profiles and placement

A profile is one market's curriculum: `de-DE` (one curriculum for Germany,
on the KMK standards; no Land profiles for now) and later `en-GB`. It lists:

- `frameworks`: the framework ids that apply.
- `stages`: the market's stage list.
- `learning_years`: for `fl`, which grade each learning year usually starts
  in, and any Land variants.
- `placement`: for each step id, `stage` (by when the profile expects it)
  and `order` (its position in that stage's view). Steps not placed are not
  part of the profile.
- `facets`: the locale facet values for the market (below).
- `domains`: the domains the profile covers so far; every step in them
  that serves one of the profile's frameworks must be placed.
- `subjects`: the subject name for each domain in this market (`fl:
  Englisch`); grade views are grouped by it.
- `learning_years`: for `fl`, the target language and the grades each
  learning year usually falls in.
- `out_of_scope`: framework objectives the app does not teach, each with a
  reason (classroom-only activities such as scenic play or a library visit).

The build checks placement against each objective's band (end of a Klasse,
end of Reception, end of a Year). A learning-year stage is compared through
the last grade it usually falls in, so French year 4 counts as Year 6.

Placement says what is expected by when. It never limits what a child may
work on: a learner's proficiency, per progression, decides where they
actually work.

## Lessons

A lesson teaches one step, or two steps that cannot be taught apart.

- `id`: `<domain>.<slug>`; for `fl`, `fl.<language>.<slug>` (`fl.en.`,
  `fl.fr.`).
- `teaches`: the step ids.
- `age_bands`: the presentation variants it needs: `a4-5` (audio-led, no
  reading), `a6-7` (audio support, short text), `a8-10` (text-led).
- `representation`: the most image-light form that still teaches the step:
  `text`, `audio`, `drawn` (the app draws it from data: ten-frames, number
  lines, clocks, shapes), `picture` (a commissioned illustration), `photo`.
- `facets`: the locale facets the lesson depends on.
- `item_types_likely`: Twist question types it will probably use.
- `twist_reuse`: today's schoolido-learning module ids it can adapt, each
  with `fit` (`as-is`, `adapt`, `rewrite`).
- `status`: `draft`, `checked`, `reviewed`.

Lessons come after the curriculum (plan step C5).

## Locale facets

Market differences that do not need a different step, applied by the app
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
written out: ä ae, ö oe, ü ue, ß ss. Once a profile is published an id
never changes; renaming means a new id and a `replaces` field on it.
