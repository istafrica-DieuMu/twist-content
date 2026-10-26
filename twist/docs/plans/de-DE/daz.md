# Deutsch als Zweitsprache (DaZ, German as a second language)

Priority 2. A support track for children who are learning German as a
second language, at any Klasse from 1 to 4. Not a graded subject.

## Why

The Deutsch grade is the largest input to the transfer recommendation, and a
child who is still learning German falls behind in every subject. Bayern
recognises this directly: a child with another first language who did not
attend a German school from Klasse 1 can qualify for Gymnasium with an
average up to 3.33 instead of 2.33 (BaySchO §6).

## Structure

DaZ is a subject of its own, separate from Deutsch (decided 2026-10-26). It
needs no new domain: it is a **track** in curricula/de-DE.yaml (`tracks.daz`)
with its own learning years and its own placement, so a skill can be placed
in Englisch or Deutsch and again in DaZ.

| Part | Domain | What it takes |
|---|---|---|
| Speaking, listening, words, sentences | `fl` | `fl` skills are language-neutral can-do lines with lessons per target language. DaZ places all 64 of them with German as the target |
| Letters and reading for children new to the Latin script | `lit-de` | 25 Klasse 1 letter and sound skills, with instructions a beginner can follow (pictures, audio, few words) |

Lesson sets: `lessons/de-DE/<daz year>/daz/<file>.yaml`, id `de-DE.daz.<name>`,
`track: daz`, `language: en` (instructions), `target_language: de`.

## Learning years and placement

By learning year, not by Klasse: a child starts at DaZ Start whatever the
Klasse. Decided 2026-10-26.

| Learning year | Level | Skills | What it is for |
|---|---|---|---|
| DaZ Start (`daz-start`) | Pre-A1 | 16 | The first weeks at school: classroom phrases, greetings, school things, colours, numbers to 20, body, family, feelings, "Ich bin, ich habe, ich möchte" |
| DaZ Buchstaben (`daz-letters`) | | 25 | Only for children new to the Latin script: the Klasse 1 letter course, L O A M to the alphabet and first sentences. One question when DaZ starts decides it |
| DaZ 1 (`daz-1`) | A1 | 27 | Everyday German and the grammar German needs early: der, die, das, gender and verb endings, questions, prepositions; food, clothes, home, town, time, numbers to 100 |
| DaZ 2 (`daz-2`) | A2 | 21 | Joining in at school: task language in other subjects, daily routine, describing, joining sentences, the past, short texts, presenting, festivals, mediating for the family |

Against the Englisch order: feelings, numbers to 20 and guessing from
context come earlier (a DaZ child is surrounded by German from day one);
gender, verb endings, time and numbers to 100 move to DaZ 1 (A1 basics in
German, and Mathe needs them); mediating moves to DaZ 2.

Three new `fl` skills, language-neutral like the others and marked
enrichment (no KMK standard): `fl.grammar.past` (the Perfekt),
`fl.grammar.connect` (und, aber, dann, weil, with the verb at the end after
weil) and `fl.listening.school-language` (kreise ein, ordne zu, vergleiche,
mehr, weniger).

## Frameworks

No KMK standard for primary DaZ (the KMK has a recommendation on
Bildungssprache, not standards). Use the CEFR Companion Volume (2020) levels
Pre-A1, A1 and A2 for the steps, with the Council of Europe's Collated
Representative Samples of Descriptors for Young Learners, Vol. 1 (ages 7 to
10, 2018) for wording that fits the age. Check the order against Bayern's
LehrplanPLUS Deutsch als Zweitsprache for Grundschule, which replaces
Deutsch for children who need language support; Rheinland-Pfalz has a
Rahmenplan DaZ (2006) built on Bayern's.

## Open

- Decided 2026-10-26: the app shows DaZ as its own subject, not as a mode
  of Deutsch.
- Instructions in the home language: decided 2026-10-25, English for now
  (the support language besides German); Arabic, Turkish, Ukrainian and
  Russian later.

## Size

89 lesson sets: 64 on `fl` skills and 25 beginner versions of the
Klasse 1 letter lessons. The benchmark has a letters course of 47
lessons and A1 and A2 courses of 87 and 39 lessons.
