# Twist curriculum, phase 1: the curriculum itself

> Written before the names were settled. Read step as skill, profile as
> curriculum, stage as year, objective as standard, part as lesson. The
> current names are in docs/lesson-anatomy.md.

Branch `curriculum-phase1`, started 2026-10-12. Revised the same day after
the decisions at the end of this file. Everything this plan produces lives
in `twist/`; layout in twist/README.md.

Goal: a new Twist curriculum for primary school, built competency first.
One reusable library of competencies and lessons, mapped to each official
curriculum that places them in a grade. Phase 1 ends with a complete,
checked competency library, a lesson list over it, and the mappings to
the frameworks in scope. Nothing below the lesson (parts, steps, exercises,
items) is designed here. That is phase 2.

The rule for the whole design:

> **Grade determines curriculum expectations, proficiency determines
> learning level, and age determines presentation.**

So a child's school grade says what their curriculum expects by the end of
the year. Where they actually work comes from what they can already do,
which may be above or below that grade. How a lesson looks and sounds comes
from their age. These are three separate fields, never one.

## Status (2026-10-12)

- Decision: one de-DE curriculum on the KMK standards, no Land profiles for
  now. Land Lehrpläne (NRW, Bayern, Baden-Württemberg, Berlin/Brandenburg)
  are captured in official-de/ and extracted as reference only.
- C0 done: spec in docs/model.md, stage lists, build.mjs with checks and
  views (`npm install` once in twist/, then `node twist/build.mjs`).
- C1 done for Germany: frameworks kmk-mathe-2022 (65 objectives),
  kmk-deutsch-2022 (114), kmk-fremdsprachen-gs-2013 (9, target A1).
- C2 to C4 done for de-DE: 48 progressions, 433 steps, all placed
  (Klasse 1: 92, 2: 107, 3: 93, 4: 83; Englisch Stufe 0: 14, Lernjahr 1:
  28, Lernjahr 2: 16). Every KMK content objective is reached or listed as
  out of scope with a reason (10 classroom-only Deutsch objectives).
- Anton comparison: crosswalk/anton-twist-de.md maps all 874 Anton lessons
  of the same courses (873 used, 1 excluded) and lists placement
  differences and Twist-only steps.
- en-GB built the same day: frameworks eyfs-2026 (36 goals), nc-maths-2014
  (241), nc-english-2014 (220), nc-languages-2014 (12). New domain lit-en
  (10 progressions, 163 steps); 60 new math steps England needs (fractions,
  decimals, percentages, ratio, algebra, angles, coordinates, area and
  volume formulae, statistics); 3 new fl steps for KS2 French. Profile
  en-GB places 483 steps (Reception 46, Year 1 61, Year 2 82, Year 3 70,
  Year 4 55, Year 5 66, Year 6 42; French years 1 to 4: 14, 28, 11, 8).
  Every statutory objective is reached or out of scope with a reason, and
  every step sits within the year its objectives name.
- Two curricula share one library: 63 progressions, 661 steps.
- Lesson anatomy decided (docs/lesson-anatomy.md): a lesson teaches one
  step over 2 to 6 short parts; activity sequences vary by subject and step
  size; items are hand-authored; mastery runs not started, learning,
  practised, secure, mastered, with delayed reviews and diagnostics.
- Names settled: Curriculum, Subject, Year, Topic, Skill, Lesson,
  Activity, Task; four activities (Warm-up, Learn, Practise, Check) with
  settings. Record fields and folders renamed to match (curricula/, years/,
  skills, standards).
- Model lessons done (2026-10-13): one set per subject, Practise in three
  stages, pictures, voice (Sulafat teaches, Puck checks) and the player.
- Now: phase 2, every de-DE lesson. See "Phase 2: de-DE lessons" below.

## Scope

| Market | Frameworks | Subjects in phase 1 | Stages |
|---|---|---|---|
| Germany (de-DE) | KMK Bildungsstandards as the base; Lehrpläne of NRW, Bayern, Baden-Württemberg, Berlin/Brandenburg | Mathe, Deutsch, Englisch | Klasse 1 to 4; Englisch as Stufe 0 (oral), Lernjahr 1, Lernjahr 2 |
| England (en-GB) | EYFS for Reception; National Curriculum in England for Years 1 to 6 | Maths, English (with phonics and early literacy in Reception), French | Reception, Year 1 to 6; French by learning year |
| Later | Austria (Lehrplan Volksschule), Switzerland (Lehrplan 21) | | |

Order of work: Germany first, then England. Maths, then the home language,
then the foreign language. In England, Maths and English come first;
French comes after both.

Anton is the main reference for structure, sequence, grain size and
wording. Competency statements, titles and later questions can follow
Anton's text, and can match it where that is the natural wording.
Scenarios, examples, names and stories are written for Twist. No Anton
images or audio go in, and records in twist/ do not cite Anton.

## The model

Five layers. Only the first two are content; the others are mappings and
placements.

```
Competency library     what a child can do, in observable steps, framework-neutral
  └ Lesson library     content that teaches one competency step, with age variants
Framework              one official document (KMK, NRW Lehrplan, EYFS, NC ...)
  └ Objective          one statement in that document, quoted, with its code
Mapping                objective  ↔  competency steps   (many to many)
Placement              per curriculum profile: competency step → stage, position
Learner record         per child: proficiency per competency (phase 2 and the app)
```

### Competency library

Competencies are grouped into **domains**. A domain is shared wherever the
learning is the same, and split where the language makes it different:

| Domain | Used by | Why it is one domain |
|---|---|---|
| `math` | DE, GB, later AT, CH | Number, operations, measures, shape and data are the same learning everywhere; only notation and context differ (handled as context, below). |
| `lit-de` | DE, later AT, CH | Learning to read and write German: letters and sounds, syllables, German spelling strategies, German grammar. |
| `lit-en` | GB | Learning to read and write English: synthetic phonics, English spelling patterns, English grammar. |
| `fl` | DE (Englisch), GB (French), later others | Early foreign language: listening, speaking, reading, writing, themes and phrases, on CEFR-style can-do steps. The steps are shared; the words and sounds come from the target language. |

Each domain is a set of **progressions** (for example `math.place-value`,
`lit-de.spelling-strategies`, `fl.speaking`), and each progression is an
ordered list of **steps**. A step is one observable can-do statement, small
enough for one lesson and one diagnostic check. Steps carry typed
prerequisites: `hard` (must be secure first) and `soft` (helps).

Proficiency is a learner's position on a progression. A child can sit at
different steps in different progressions, and can move ahead of their
grade or work below it without leaving their grade's view.

### Lesson library

A lesson teaches one competency step, sometimes two closely tied ones.
Lessons are Anton-sized: one learning goal, a handful of exercises (Anton's
median is 6). A lesson belongs to the library, not to a grade.

A lesson has **presentation variants by age band**, so the same goal can
be taught to a five-year-old in Reception and a nine-year-old catching up:

| Age band | Typically | Presentation |
|---|---|---|
| `a4-5` | Reception, Stufe 0 | audio-led, no reading needed, big targets, very short |
| `a6-7` | Klasse 1 to 2, Year 1 to 2 | audio support, short text, picture or drawn support |
| `a8-10` | Klasse 3 to 4, Year 3 to 6 | text-led, longer items, less audio |

Phase 1 records which variants a lesson needs. Phase 2 designs them.

Context rides on the lesson as **locale facets**, not as separate lessons
where avoidable: currency (euro and cent, pounds and pence), number format
(3.847 and 2,5 against 3,847 and 2.5), operation signs (`·` and `:`
against `×` and `÷`), the written-subtraction method, the handwriting
script, the dialect of English. A lesson that only works in one locale
says so.

### Frameworks, objectives and mappings

Every official document becomes a framework file with its objectives quoted
verbatim, coded and page-referenced. Each objective maps to the competency
steps that satisfy it. Coverage then reads both ways: every objective has
steps, and every step says which frameworks ask for it.

KMK standards describe what children can do at the end of Klasse 4. They
are a competency base, not a grade-by-grade plan, so grade placement comes
from the Länder:

| Framework | Stage grain (to verify in C1) | Role |
|---|---|---|
| KMK Bildungsstandards Primarbereich, Mathe and Deutsch (2022) | end of Klasse 4 | the shared base every Land maps to |
| KMK report on foreign languages in primary school | end of Klasse 4 | target level for Englisch |
| NRW Lehrplan Grundschule | end of Klasse 2, end of Klasse 4 | placement |
| Bayern LehrplanPLUS Grundschule | Jahrgangsstufe 1/2, 3, 4 | placement |
| Baden-Württemberg Bildungsplan 2016 | Klasse 1/2, 3/4 | placement |
| Berlin/Brandenburg Rahmenlehrplan 1 to 10 | Niveaustufen, not grades | placement; closest to our competency model |
| EYFS statutory framework | end of Reception (Early Learning Goals) | placement for Reception |
| National Curriculum in England (2014) | per year in maths and parts of English; KS2 band for languages | placement for Years 1 to 6 |

Where a Land uses a two-year band, the placement inside the band follows
Anton's Klasse order unless the Lehrplan says otherwise, and the file says
which.

### Placement and curriculum profiles

A **curriculum profile** is what a family or school picks: for example
`de-DE/NRW`, `de-DE/BY`, `en-GB/England`. A profile's placement says, for
each competency step, the stage by which it is expected and its order in
that stage. A profile can also add content a Land requires and others do
not (a script, a Grundwortschatz list).

The grade view a child sees ("Klasse 2 Mathe, NRW") is generated from the
profile's placement plus the lesson library. Nothing is authored per grade.

Foreign languages place by learning year. Englisch in de-DE:

| Stage | Who | Content |
|---|---|---|
| Stufe 0 | children who start English in Klasse 1 or 2 | oral first: listening, songs, rhymes, chants, first words, no reading required (Anton: c-mono-eng-gb-0, 17 lessons) |
| Lernjahr 1 | most children, in Klasse 3 | the main foundation course (Anton: c-eng-3, 89 lessons) |
| Lernjahr 2 | Klasse 4 | (Anton: c-eng-4, 39 lessons) |

A Land table says which Klasse each stage starts in. A child who shows
readiness in Stufe 0 moves into Lernjahr 1 early; an older beginner starts
Lernjahr 1 with the `a8-10` presentation and gets the Stufe 0 basics as
short support lessons, without the content for six-year-olds. French in
en-GB follows the same three stages, placed against the KS2 languages
programme of study.

### Reusing today's Twist content

Today's Twist lessons map to competency steps, not to grades. "Twist G1"
does not mean Year 1 or Klasse 1: the age table puts G1 at 6 to 7 (Year 2,
Klasse 1), and G1 English phonics actually matches Reception and Year 1
(anton/notes/prior/2026-10-07-anton-curriculum-research.md). Each existing
module gets a `covers` list of steps and a fit note (as is, adapt, rewrite),
and then appears wherever any profile places those steps. Grades 1 and 2
German are the strongest Twist content (Germany review); they become
`lit-de` lessons.

### Naming

| Layer | Field | German | English |
|---|---|---|---|
| Competency domain | `domain` | Bereich | Domain |
| Progression | `progression` | Kompetenzfolge | Progression |
| Step | `step` | Kompetenzstufe | Step |
| Lesson | `lesson` | Lektion | Lesson |
| Framework | `framework` | Bildungsstandards, Lehrplan | Framework, Programme of study |
| Objective | `objective` | Kompetenzerwartung | Objective, Early Learning Goal |
| Profile | `profile` | Lehrplanprofil (z. B. NRW) | Curriculum profile |
| Stage | `stage` | Klasse, Stufe 0, Lernjahr | Reception, Year, Learning year |
| Topic (child-facing group) | `topic` | Thema | Topic |

Topics are what children see as sections in a grade view. They group
lessons in a profile and stage, generated from placement plus a topic
label on each step; one topic list per profile, not per lesson.

Ids are framework-neutral and never contain a grade:
`math.place-value.bundle-tens`, `lit-de.syllables.two-syllable-words`,
`fl.speaking.greet-and-name`. Lesson ids add the language where the
domain is shared: `fl.en.speaking.greet-and-name`, `fl.fr.speaking.greet-and-name`.
Lowercase ASCII; umlauts written out (ä to ae). Ids never change once
published; titles can.

## Records

The exact record shapes are in [docs/model.md](docs/model.md). Two choices
made since the first draft: step order is the order in the file, so step
ids carry no numbers (`math.place-value.bundle-tens`); and the link from
an objective to its steps lives on the step (`objectives:`), so framework
files can be regenerated from the official documents.

`representation` on each lesson is recorded early so phase 2 can plan to
rely less on images. `drawn` means the app draws it from data (ten-frames,
number lines, Rechenstrich, clocks, shapes), as Anton does with vector
graphics (F-020).

## Steps

### C0. Schema and conventions

- Write `twist/docs/model.md` (this model as a spec) and
  `twist/schema/*.json` for the five record types.
- Settle lesson grain with numbers: Anton lesson (about 80 items, median 6
  exercises) against today's Twist part (25 to 35 questions, 5 to 15
  minutes), from anatomy.md and mechanics-benchmark.md.
- Fix the age bands, the locale facet list and the code scheme for
  objectives.

### C1. Official sources (Germany, then England)

The missing context: the repo has Anton and Twist but no official
curriculum text, so "matches the curriculum" cannot be checked yet.

- New source folders with the same keep-everything rules as anton/:
  `official-de/` (KMK, NRW, BY, BW, BE/BB) and later `official-gb/` (EYFS,
  National Curriculum, Development Matters, phonics screening check,
  multiplication tables check, KS2 test frameworks). Each with AGENTS.md,
  the raw documents and a fetch log.
- Per framework, a framework file with every in-scope objective quoted,
  coded and paged.
- A Land table: when English starts, handwriting scripts allowed
  (Lateinische, Vereinfachte, Schulausgangsschrift, Grundschrift), the
  official Grundwortschatz where one exists, the written-subtraction method,
  primary school length (4 or 6 years), stage grain of the Lehrplan.
- An England table: statutory year content in maths, spelling and grammar
  by year from the English appendices, phonics expectations in Reception
  and Year 1, what KS2 requires of a language.

### C2. Competency library, per domain

Built from the frameworks up and Anton across, in this order: `math`,
`lit-de`, `fl` (Englisch first), then `lit-en`, then `fl` for French.

- List the progressions for the domain. For `math` a first cut, from the
  KMK Leitideen and the NC strands: counting, number and place value,
  addition and subtraction, multiplication and division, fractions, money,
  length, mass, capacity, time, shape, position and direction, patterns and
  structures, data and chance.
- Write the steps in each progression, smallest observable grain, with
  prerequisites.
- Draw the steps' order from where both Anton curricula place them: a step
  Anton teaches in Klasse 1 and Year 1 is early in its progression whatever
  the grade (calibration.md has the number ranges by grade, F-015 the gaps
  between curricula).
- Keep an audit outside twist/, in `crosswalk/anton-twist-coverage.md`,
  that marks every Anton lesson in the source courses as `used`, `merged`
  or `excluded` (with a reason) against the step that took it, so nothing
  is dropped silently. The link runs from the audit to twist/, never back.
  Source courses: c-mat-1 to 4,
  c-natdeu-1 to 4, c-mono-eng-gb-0, c-eng-3, c-eng-4, c-mono-eng-gb-1 for
  Germany; c-mat-r-gb to c-mat-6-gb, c-nateng-r-gb to c-nateng-6-gb,
  c-mono-fra-1 for England, with c-alpha-deu, c-deu-a1 and c-deu-a2 as a
  structure reference for `fl`.

### C3. Mappings

- Map each framework objective to steps. KMK first, then the four Länder,
  then EYFS and the National Curriculum.
- Objectives with no step mean a missing step: add it to C2.
- Steps with no objective in any framework stay only with a clear reason;
  mark them `enrichment`.

### C4. Placement per profile

- `de-DE/NRW`, `de-DE/BY`, `de-DE/BW`, `de-DE/BEBB`, then `en-GB/England`.
- Place each step at the stage its framework expects it, ordered by
  prerequisites, then Anton's order where the Lehrplan is silent.
- Record where profiles disagree (a step in Klasse 2 for one Land and
  Klasse 3 for another). These differences are a finding in themselves.

### C5. Lesson library

- One lesson per step by default; join two steps where a lesson can't teach
  one without the other.
- Fill `age_bands`, `representation`, `locale_facets` and
  `item_types_likely`.
- Map today's Twist modules (`twist_reuse`, with fit), using the crosswalks
  as the starting point.
- Speaking lessons in `fl`: Twist has a speaking interaction and Anton does
  not (F-019), so this is where Twist goes beyond Anton.

### C6. Checks, run on every build

`twist/build.mjs` builds the views and fails on:

- a step without a can-do statement in both languages, or with a hard
  prerequisite that is placed later in any profile, or a cycle;
- a framework objective with no step;
- a step with no lesson;
- an id with a grade in it, or a duplicate id;
- a source id or a path into a source folder inside a record.

It reports per profile and stage: steps, lessons, share of each
representation, and Twist content reused.

A separate research-side script, outside twist/, builds the Anton coverage
audit. It fails on an Anton source lesson with no mark, and warns when a
profile's stage is far outside Anton's lesson count for the same stage.

### C7. Views and review

- Generated views: the competency library by domain; each profile's grade
  view (topics and lessons per stage); a coverage matrix of objectives by
  step; a Land comparison table. A curriculum tab on the site page.
- Review gate before phase 2: a German primary teacher reads the `math`,
  `lit-de` and Englisch views for one profile (NRW proposed); an English
  primary teacher reads the EYFS and Year 1 to 6 views.
- Findings go to FINDINGS.md.

## Size, from the captured data

Lessons in the Anton courses we draw on, against today's Twist
(catalogue/catalogue.db; schoolido-learning module catalogues):

| Subject | Anton courses | Lessons by stage | Anton total | Twist today (G1 to G4) |
|---|---|---|---|---|
| Mathe | c-mat-1 to c-mat-4 | 54, 88, 85, 69 | 296 | 146 (de LOI) |
| Deutsch | c-natdeu-1 to c-natdeu-4 | 91, 135, 100, 67 (60 in Klasse 2 are three handwriting scripts) | 393 | 110 (de LOI) |
| Englisch | Stufe 0, Klasse 3, Klasse 4, plus a 40-lesson vocabulary course | 17, 89, 39, 40 | 185 | 139, first-language English (F-017) |
| Maths (England) | Reception, Year 1 to 6 | 20, 108, 138, 101, 91, 96, 116 | 670 | 150 (en LOI) |
| English (England) | Reception, Year 1 to 6 | 51, 165, 117, 91, 70, 90, 89 | 673 | 139 (en LOI) |
| French (England) | c-mono-fra-1, vocabulary only, 11 themes | 40 | 40 | none |

Because `math` is one domain, the Mathe and Maths lists collapse into one
library of steps placed twice. Expect the step count well below the 966
Anton maths lessons added together.

French is the thinnest: Anton has no graded languages course for English
primary schools. The `fl` progressions are built once from the Englisch
side (where Anton has 145 graded lessons) and reused, with French lessons
written against them.

## Effort, roughly

| Step | Germany | England |
|---|---|---|
| C0 | half a day, once | |
| C1 | 2 days (five frameworks, Land table) | 1 to 2 days |
| C2 | `math` 2 days, `lit-de` 2 to 3, `fl` 1 | `lit-en` 2 to 3 days, French on `fl` 1 day; `math` already done |
| C3 + C4 | 2 days for four Länder | 1 day |
| C5 | 2 days | 2 days |
| C6 | 1 day, scripts written once | reuse |
| C7 | the reviewers' time | |

`math` is done first and end to end (C2 to C5 for one Land) before the
other domains start, so the schema and checks are tested early.

## Tools and skills

No new skills are installed. The skills registry (`npx skills find`,
searched for curriculum, lesson planning, pedagogy, instructional design,
CEFR, K-12 and standards alignment) offers general teacher-planning prompts
that neither read our data nor know these curricula. Two ideas from
`garethmanning/education-agent-skills` are in the schema: typed
prerequisites (scope-and-sequence-designer) and observable steps per
progression (learning-progression-builder). `anthropics/k12-teacher-skills`
is worth a look in phase 2, when we design inside a lesson.

The work runs on what is here: catalogue.db, the crosswalks,
calibration.md, german-insight.md, anatomy.md, the Germany review and the
schoolido-learning module catalogues (read only), plus the official
documents captured in C1.

## Decisions taken 2026-10-12

1. **England stages:** Reception to Year 6. Reception on EYFS, Years 1 to 6
   on the National Curriculum. Curriculum year and learner competency kept
   as separate mappings. Maths and English first, including phonics and
   early literacy in Reception. Today's Twist content reused by competency
   mapping, not by assuming G1 is Year 1.
2. **Foreign language for England:** French.
3. **Länder:** KMK Bildungsstandards as the common competency base, with
   explicit mappings to each Land's Lehrplan; NRW, Bayern,
   Baden-Württemberg and Berlin/Brandenburg first. One reusable content
   library; Länder can differ in objectives, grade placement, order and
   extra content. KMK is not treated as a grade-by-grade curriculum. The
   same structure is meant to take Austria and Switzerland later.
4. **Englisch stages:** oral Stufe 0, then Lernjahr 1 and 2, with
   progression by competency rather than age or grade, and age-appropriate
   presentation variants of shared objectives and content.

## Open decisions

1. **Handwriting.** All four German scripts as options of one handwriting
   progression, or start with the one the reference Länder share (C1 will
   show which)?
2. **Today's Twist content that fits no step** (19 DaZ-style lessons in de
   German, F-018; first-language English in the de LOI, F-017): archive, or
   keep for a later DaZ or EAL domain?
3. **British or American English** for Englisch in Germany. Anton's course
   is c-mono-eng-gb, British.
4. **Review profile.** NRW as the one profile the German teacher reviews
   first?

## Phase 2: de-DE lessons

Started 2026-10-13. Every placed de-DE skill gets its lesson set, written
by hand (no generator scripts), checked by the build and played through in
the player before it counts as drafted.

Order (decided 2026-10-13): the first topic of each subject in every
year first, so every year has real lessons early; then the remaining
topics. Subjects: Mathe, Deutsch, Englisch. Within a topic, the
curriculum's placement order (views/curriculum-de-DE.md). After each
topic: review, commit and push, then go on (2026-10-13: alternate with
en-GB, more de-DE topics than en-GB, without stopping).

| # | Subject | Year | First topic | Skills |
|---|---|---|---|---|
| 1 | Mathe | Klasse 1 | Zahlen bis 10 | 7, all drafted 2026-10-13: 17 lessons, 386 tasks |
| 2 | Mathe | Klasse 2 | Zahlen bis 100 | 10, all drafted 2026-10-13: 20 lessons, 460 tasks |
| 3 | Mathe | Klasse 3 | Zahlen bis 1000 | 8, all drafted 2026-10-13: 16 lessons, 384 tasks |
| 4 | Mathe | Klasse 4 | Große Zahlen | 5, all drafted 2026-10-13: 15 lessons; to 10 000 (the Stellentafel gained a T column), then to a million: Stellenwerttafel to HT, Zahlenstrahl, Nachbarzahlen, sensible rounding, counting in big steps across boundaries |
| 5 | Deutsch | Klasse 1 | Laute hören | 4, all drafted 2026-10-13: 8 lessons; adds sounds at the start, middle and end, counting and blending sounds |
| 6 | Deutsch | Klasse 2 | Nomen | 1, drafted 2026-10-13: compound nouns, 3 lessons |
| 7 | Deutsch | Klasse 3 | Nomen | 2, both drafted 2026-10-13: noun endings and abstract nouns, 4 lessons |
| 8 | Deutsch | Klasse 4 | Die vier Fälle | 1, drafted 2026-10-13: 3 lessons |
| 9 | Englisch | Stufe 0 | Hören | 2, all drafted 2026-10-13: 4 lessons, 89 tasks |
| 10 | Englisch | Lernjahr 1 | Hören | 1, drafted 2026-10-13: short conversations, 2 lessons |
| 11 | Englisch | Lernjahr 2 | Hobbys und Sport | 1, drafted 2026-10-13: 2 lessons, 9 new hobby pictures |

Second topics, started 2026-10-13, in the same subject and year order:

| # | Subject | Year | Second topic | Skills |
|---|---|---|---|---|
| 1 | Mathe | Klasse 1 | Rechnen bis 10 | 8, all drafted 2026-10-13: 16 lessons, with Rechengeschichten |
| 2 | Maths | Reception | Adding and subtracting to 10 | 3, all drafted 2026-10-13: 6 lessons, First Then Now stories, counting on, bonds to 10 |
| 3 | Mathe | Klasse 2 | Plus und Minus bis 100 | 10, all drafted 2026-10-13: 21 lessons; Analogieaufgaben, Zehnerübergang on the Rechenstrich, ergänzen to the next ten and to 100, schrittweise, stellenweise, Hilfsaufgabe, ergänzen, gleichsinniges Verändern, checking with the Umkehraufgabe and Überschlag, finding mistakes, Platzhalter and Ungleichungen |
| 4 | Maths | Year 1 | Subtracting to 10 and number stories | 3, all drafted 2026-10-13: 6 lessons, taking away, counting back, number stories with answer sentences |
| 5 | Maths | Year 2 | Addition and subtraction facts | 4, all drafted 2026-10-13: 8 lessons, any order, inverse and fact families with the part-whole model, near doubles, number walls and chains (number-wall component) |
| 6 | Maths | Year 3 | Numbers to 100 (hundred square and 100-dot grid) | 2, both drafted 2026-10-13: 4 lessons, brisk revision for Year 3 with jumps of 9 and 11 and complements to 100 |
| 7 | Mathe | Klasse 3 | Rechnen bis 1000 | 6, all drafted 2026-10-13: 12 lessons; hundreds and Analogieaufgaben, Zehner- and Hunderterübergang, halbschriftlich (schrittweise, stellenweise, ergänzen), choosing a way, Überschlag, Summe and Differenz |
| 8 | Deutsch | Klasse 2 | Pronomen and Verben | 5, all drafted 2026-10-13: 10 lessons; er, sie, es by the article, wir and ihr, Verben erkennen with the ich-Probe, Personalformen, Grundform with the wir-Probe, Vorsilben and moving prefixes |

Klasse 3 starts with Zahlen bis 1000, as the school year does; the words
of multiplying and dividing (mult-div.vocabulary) moved to open Malnehmen
und Teilen (decided 2026-10-13).

Every task type and interaction used is documented in docs/task-types.md
before its first lesson.

Per skill: 2 to 3 lessons for a small skill, up to 6 for a large one. Each
lesson is Warm-up (not in the very first lesson of a topic), Learn when
something is new, Practise in three stages of 5 or 6 tasks, and a Check;
the last lesson ends with the skill check. New pictures go into the bank
first (assets/tools/pictures.py), then the lessons, then the narration
(assets/tools/narration.py) and the player.

Klasse 1 Mathe, topic Zahlen bis 10:

| Skill | Lessons | Status |
|---|---|---|
| count-to-5 | 2: count to 3, count to 5 | drafted 2026-10-13, 42 tasks, played through |
| count-to-10 | 2: count to 10 in a row, count scattered things | drafted 2026-10-13, 42 tasks, played through |
| subitize-to-10 | 2: dice patterns, Kraft der 5 on the ten-frame | drafted 2026-10-13, 44 tasks |
| write-numerals-to-10 | 3: 1 to 5, 6 to 10, zero with numeral and amount | drafted 2026-10-13, 68 tasks |
| order-to-10 | 2: in order, before and after | drafted 2026-10-13, 44 tasks |
| compare-to-10 | 3: more and fewer, the signs, using the signs | drafted 2026-10-13, 66 tasks |
| partition-to-10 | 3: split with counters, number house, all splits | drafted 2026-10-13, 69 tasks |

Klasse 2 Mathe, topic Zahlen bis 100 (2 lessons each, 46 tasks each,
drafted 2026-10-13). The number line gained `step` and `mark` so 0 to 100
stays tappable; the place-value chart is an option key.

| Skill | Lessons |
|---|---|
| bundle-tens | tens and ones; estimate and check |
| place-value | tens left, ones right; zero and too many ones |
| read-write | hear and write; reading number words |
| hundred-field | reading rows; at a glance |
| hundred-square | neighbours on the square; moves and patterns |
| number-line | tens and ticks; where the arrow points |
| order-compare | compare the tens first; neighbouring numbers and tens |
| sequences | counting in steps; finding the rule |
| double-halve | doubling; halving |
| number-puzzles | two clues; three clues |

Klasse 3 Mathe, topic Zahlen bis 1000 (2 lessons each, drafted
2026-10-13). base-ten gained hundred flats; tick lengths on the number
line follow its step.

| Skill | Lessons |
|---|---|
| hundreds | ten tens make a hundred; hundreds, tens and ones |
| place-value | H, Z and E; what is the digit worth? |
| read-write | hear and write; number words to 1000 |
| number-line | finding hundreds and tens; reading arrows |
| order-compare | compare from the left; neighbouring tens and hundreds |
| sequences | counting in big steps; finding and explaining rules |
| round | rounding to tens; rounding to hundreds |
| number-puzzles | solving riddles; checking and making riddles |

German numbers are now spoken as words (narration.py and the player
build share the rule): the voice swapped bare numerals such as 46.

### en-GB, same order

Started 2026-10-13. Topic 1 is Maths, Reception, Numbers to 10: the same
six library skills as de-DE topic 1, written again for England, not
translated. Children are 4 to 5 (EYFS), so the lessons are oral (number
options say themselves), have no warm-ups, three Practise stages of 5, a
3-task check and a 4-task skill check. Numerals and the signs < > = come
in Year 1, so Reception orders and compares amounts and spoken numbers;
number bonds use England's part-whole model. British English voices with
their own brief (voices.yaml curricula: en-GB).

Placement order (decided 2026-10-13): en-GB placement within a year was
not a teaching order (Year 6 Maths opened with written multiplication of
money). Each year's natural opening topic now comes first: place value in
Maths (Numbers to 100, 1000, 10 000, 1 000 000, 10 000 000), Phonics in
Year 1 English, Reading words in Years 2 and 3, Information texts in
Year 5. The rest of each year is unchanged; a full sequence review of
en-GB is its own step later.

| # | Subject | Year | First topic | Skills |
|---|---|---|---|---|
| 1 | Maths | Reception | Numbers to 10 | 6, all drafted 2026-10-13: 12 lessons, 222 tasks |
| 2 | English | Reception | Hearing sounds | 4, all drafted 2026-10-13: 8 lessons, 148 tasks |
| 3 | French | Learning year 1 | Listening | 2, all drafted 2026-10-13: 4 lessons, 92 tasks |
| 4 | Maths | Year 1 | Numbers to 10 | 1, drafted 2026-10-13: 3 lessons, 68 tasks; adds the number words one to ten, which Year 1 asks for |
| 5 | Maths | Year 2 | Numbers to 100 | 5, all drafted 2026-10-13: 10 lessons, 230 tasks; place value adds the part-whole model and partitioning in more than one way (34 = 20 + 14), comparing uses <, > and = and adds one more, ten more |
| 6 | Maths | Year 3 | Numbers to 1000 | 8, all drafted 2026-10-13: 16 lessons, 384 tasks; England's own content: 10 or 100 more or less, counting in 4s, 8s and 50s, digit cards, estimating with money |
| 7 | Maths | Year 4 | Numbers to 10 000 | 2, both drafted 2026-10-13: 6 lessons, 142 tasks; adds 1000 more or less and rounding to the nearest 1000 |
| 8 | Maths | Year 5 | Numbers to 1 000 000 | 2, both drafted 2026-10-13: 4 lessons, 92 tasks; six-column chart, powers of ten, sensible rounding in contexts |
| 9 | Maths | Year 6 | Numbers to 10 000 000 | 1, drafted 2026-10-13: 2 lessons, 46 tasks; the chart gains a millions column |
| 10 | English | Year 1 | Phonics | 3, all drafted 2026-10-13: new graphemes, split digraphs, alternative pronunciations, 6 lessons; 14 new pictures for the words |
| 11 | English | Year 2 | Reading words | 2, both drafted 2026-10-13: reading fluently (words flash, odd word in a sentence) and suffixes, 4 lessons |
| 12 | English | Year 3 | Reading words | 2, both drafted 2026-10-13: prefixes and root words, exception words, 4 lessons |
| 13 | English | Year 4 | Stories and poems | 1, drafted 2026-10-13: themes and conventions, 2 lessons, every story written for Twist |
| 14 | English | Year 5 | Information texts | 2, both drafted 2026-10-13: finding and presenting information, fact and opinion, 4 lessons |
| 15 | English | Year 6 | How texts work | 1, drafted 2026-10-13: backing up views with evidence (point, evidence, explain), 2 lessons |
| 16 | French | Learning year 2 | Listening | 1, drafted 2026-10-13: short conversations, 2 lessons |
| 17 | French | Learning year 3 | Hobbies and sport | 1, drafted 2026-10-13: 2 lessons, with jouer au and jouer de la, j'aime and je sais |
| 18 | French | Learning year 4 | Language patterns | 1, drafted 2026-10-13: now and every day (en train de, tous les jours), 2 lessons |

