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

No new domain. DaZ reuses two that exist:

| Part | Domain | What it takes |
|---|---|---|
| Speaking, listening, words, sentences | `fl` | `fl` skills are language-neutral can-do lines with lessons per target language. DaZ is `fl` with German as the target: new lessons, no new skills |
| Letters and reading for children new to the Latin script | `lit-de` | the existing letter and sound skills from Klasse 1, with instructions a beginner can follow (pictures, audio, few words) |

This answers PLAN.md open point 2 (keep first-language German content for a
later DaZ domain): DaZ needs no domain of its own.

## Learning years

DaZ placement works like Englisch (English): by learning year, not by Klasse.

| Learning year | Level | Content |
|---|---|---|
| DaZ Start | Pre-A1 | greetings, name, age, colours, numbers to 20, body, family, school things, classroom phrases (Ich habe eine Frage, Wie heißt das?) |
| DaZ 1 | A1 | food, clothes, home, feelings, hobbies, weather, days and times; der, die, das; ein, eine; plurals; I have, I can, I like |
| DaZ 2 | A2 | past events (Perfekt), where things are (Präpositionen), describing (Adjektive), asking and answering in school subjects |

Which `fl` skills go in which DaZ year is the next step; the Englisch
placement in curricula/de-DE.yaml is the model.

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

- How the app shows DaZ: as a fourth subject, or as a mode that changes
  instructions and voice speed across Deutsch.
- Instructions in the home language: decided 2026-10-25, English for now
  (the support language besides German); Arabic, Turkish, Ukrainian and
  Russian later.

## Size

About 60 lesson sets on existing `fl` skills, plus beginner versions of
about 30 `lit-de` letter lessons. The benchmark has a letters course of 47
lessons and A1 and A2 courses of 87 and 39 lessons.
