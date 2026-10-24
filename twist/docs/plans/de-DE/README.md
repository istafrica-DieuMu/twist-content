# de-DE content strategy

Started 2026-10-24 on branch `experiment/de-DE-content-strategy`. Plans the
de-DE subjects after Mathe, Deutsch and Englisch, in enough detail to start
authoring from. Nothing here is placed in curricula/de-DE.yaml yet.

## Files

| File | What it holds |
|---|---|
| README.md | years, scope, decisions, order, phases, authoring steps |
| sachunterricht.md | Priority 1: areas, topics per Klasse, draft skills |
| daz.md | Priority 2: Deutsch als Zweitsprache |
| musik.md | Priority 3 |
| kunst.md | Priority 4 |
| ethik.md | Priority 5 |
| sources.md | the official documents: captured and still to fetch |
| fun.md | rules and hooks that make the lessons fun, and what they need built |
| mathe.md, deutsch.md, englisch.md | the content Twist already has: topics per Klasse, counts, open work |
| omitted.md | everything de-DE deliberately leaves out, with reasons |
| sek1/ | Sekundarstufe I, Klasse 5 to 10: conventions (school types, ESA, MSA, Gymnasium) and one doc per subject group |

## Scope

Germany-wide content for Klasse 1 to 4, the Grundschule every child goes
through before the transfer to secondary school (Übertritt) after Klasse 4,
and from 2026-10-24 also Sekundarstufe I, Klasse 5 to 10 (sek1/). No
content per Land: where the Länder differ, Twist follows the common
ground, the way the KMK standards do for Mathe and Deutsch.

Background for the scope (checked 2026-10-24; sources marked secondary
need an official page before anything family-facing):

- 13 of 16 Länder transfer after Klasse 4. Berlin and Brandenburg keep
  Grundschule to Klasse 6 (with a few Gymnasien and Brandenburg's
  Leistungs- und Begabungsklassen taking children from Klasse 5);
  Mecklenburg-Vorpommern has a schulartunabhängige Orientierungsstufe in
  Klasse 5 and 6 (Deutsches Schulportal, secondary). Those are the only
  places where Klasse 5 and 6 come before the transfer.
- Bayern: the Übertrittszeugnis averages Deutsch, Mathe and HSU; up to 2.33
  for Gymnasium, 2.66 for Realschule (BaySchO §6). A child with another
  first language who did not attend a German school from Klasse 1 can
  qualify with up to 3.33.
- Baden-Württemberg, from the 2025/26 transfer: parents' wish plus either
  the class recommendation or a Kompass 4 result (Deutsch, Mathe) at the
  Gymnasium level; otherwise a Potenzialtest.
- Berlin: Förderprognose from Deutsch, Mathe and the first foreign language;
  otherwise Probeunterricht. Thüringen and Brandenburg also bind
  (secondary). NRW and Sachsen leave the choice to the parents.
- Compulsory school starts at age 6, by a Land cut-off between 30 June and
  30 September.

## Years, for the dev team

A **grade** is the school year a child is in. A **learning year** counts how
long a child has learnt a foreign language, because the Länder start it in
different grades.

| Market | Grades (age) | Learning years |
|---|---|---|
| de-DE | Klasse 1 (6-7) to Klasse 4 (9-10) | Englisch: Stufe 0, Lernjahr 1, Lernjahr 2 |
| en-GB | Reception (4-5), Year 1 (5-6) to Year 6 (10-11) | French: ly-1 to ly-4 |

- **Reception** is England's first school year, before Year 1, under the
  EYFS framework. Germany has no school year at that age (Kita).
- **Same age, different number.** Year 2 is the age of Klasse 1; Year 5 the
  age of Klasse 4. Year 6 has no German Grundschule match.
- **Stufe 0** ("level 0") is optional oral Englisch for children who start
  in Klasse 1 or 2. Only Hamburg and Brandenburg start there today; NRW
  (from 2021/22) and Rheinland-Pfalz moved to Klasse 3, and the Saarland
  starts with Französisch. Stufe 0 also suits families who want an early
  start. The name comes from the benchmark course; the English
  label is "Starter". Year and subject names are to be standardized later.
- **Lernjahr 1 and 2** are the first and second year of Englisch, mostly
  Klasse 3 and 4. A Klasse 3 child gets Mathe and Deutsch from `klasse-3`
  and Englisch from `lernjahr-1`.

## Where de-DE stands

| Subject | Domain | Skills | Lessons |
|---|---|---|---|
| Mathe | `math` | 203 | 417 |
| Deutsch | `lit-de` | 174 | 376 |
| Englisch | `fl` | 58 | 116 |

All drafted and narrated. PLAN.md Phase 3 (G1 to G14) keeps deepening them
alongside this work.

## Decisions

| # | Decision | Date |
|---|---|---|
| 1 | Order: Sachunterricht, DaZ, Musik, Kunst, Ethik | 2026-10-24 |
| 2 | Sachunterricht is one combined subject, as in every Grundschule: one domain, one progression per area | 2026-10-24 |
| 3 | No content per Land; Germany-wide only | 2026-10-24 |
| 4 | ~~Klasse 1 to 4 only~~ Replaced: Sekundarstufe I (Klasse 5 to 10) is planned too, in sek1/, with subjects split as schools split them | 2026-10-24 |
| 5 | Vorschule (age 5 to 6) stays a later option | 2026-10-24 |
| 6 | Not planned: Sport, Werken, Textiles Gestalten, Religion. Medienbildung is a topic of Sachunterricht | 2026-10-24 |
| 7 | Sex education is left out of Sachunterricht; `my-boundaries` (saying no, who helps) stays | 2026-10-24 |

Open:

- Sekundarstufe I (details in the sek1/ docs): a text keyboard for typed
  German answers (`text_input` is a number pad today); whether free texts
  get automatic feedback and whether parents see them; whether
  `puberty-hormones` is the right boundary in Biologie; how one displayed
  subject (NaWi, Natur und Technik) spans two domains; add `lernjahr-3` to
  `lernjahr-8` to curricula/de-DE.yaml; order of second languages
  (proposed Französisch, Latein, Spanisch).
- Life and death in Ethik (Grundschule and Sek I).
- The domain id for Sachunterricht (proposed `world`, see
  sachunterricht.md).

## Phases

| # | Phase | Status |
|---|---|---|
| 0 | Branch | Done |
| 1 | First draft | Done |
| 2 | Decisions 1 to 6 | Done |
| 3 | Split into this folder | Done |
| 4 | Fetch the missing documents (sources.md) | Done for Sachunterricht, Musik, Kunst, Ethik (Bayern), 2026-10-24; DaZ and second checks open |
| 5 | Sachunterricht in full: skill ids, standards, out of scope, components, assets | Draft skills checked against four curricula, 2026-10-24; teacher review and framework record next |
| 6 | DaZ, Musik, Kunst, Ethik at the same depth | Musik, Kunst, Ethik checked against NRW and Bayern, 2026-10-24; DaZ skill placement open |
| 7 | Standardize year and subject names | Later |
| 8 | Review, commit, decide on merging | Grundschule docs committed 2026-10-24 |
| 9 | Sekundarstufe I plans (sek1/) | Drafted and checked against KMK, NRW and Bayern, 2026-10-24; omissions and sources merged |

## Authoring steps for each subject

The chain Mathe, Deutsch and Englisch went through:

1. Capture the frameworks into rnd/official-de/ (sources.md).
2. Write the framework record in twist/frameworks/de/ (generated by the
   extractors in rnd/official-de/tools/).
3. Write the skill library in twist/competencies/<domain>/, one file per
   progression, with "Ich kann" and "I can" lines, prerequisites and
   standards.
4. Add the domain to curricula/de-DE.yaml (`domains`, `subjects`,
   `frameworks`) and place every skill per Klasse, with out-of-scope reasons.
5. Add new task types to docs/task-types.md and new drawings to
   pages/player/drawn.js before a lesson uses them.
6. Model lessons: one topic per Klasse, played in the player.
7. All lessons by hand, then pictures and narration; the build has no
   warnings.
8. Teacher review; add the pass to reviews.yaml.
