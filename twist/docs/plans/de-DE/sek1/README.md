# de-DE Sekundarstufe I (Klasse 5 to 10)

Started 2026-10-24. Extends the de-DE strategy (../README.md) past
Grundschule to the end of Sekundarstufe I. Oberstufe (Klasse 11 to 13)
stays out for now (../omitted.md).

## School types

After Klasse 4 children go to different school types, and from Klasse 5
the subjects split (Sachunterricht becomes Biologie, Erdkunde, Geschichte,
Physik and so on).

| Type | Ends with | KMK standard |
|---|---|---|
| Gymnasium (G9 in most Länder, Abitur after Klasse 13; Sek I is Klasse 5 to 10) | entry to Oberstufe | MSA standards, plus the Länder's own Gymnasium curricula |
| Realschule, Realschule plus, Oberschule, Sekundarschule (names differ) | Mittlerer Schulabschluss (MSA) after Klasse 10 | Bildungsstandards for the MSA |
| Mittelschule, Hauptschule, or the basic course at combined schools | Erster Schulabschluss (ESA) after Klasse 9 | Bildungsstandards for the ESA (Deutsch, Mathe, first foreign language) |
| Gesamtschule, Gemeinschaftsschule | any of the above | the same standards, by course level |

## Conventions for the subject docs

Every subject doc in this folder follows these rules so they can be
compared and later turned into records.

1. **One placement, three levels.** Twist places each skill in one Klasse,
   following the Gymnasium order (the most common target of the transfer
   recommendation, and NRW and Bayern both teach G9). A note column marks:
   - **ESA**: part of the Erster Schulabschluss standard (every school type).
   - **MSA**: part of the MSA standard but not ESA.
   - **G**: Gymnasium only, beyond the MSA.
   - **later in RS**: Realschule usually teaches it one or more years later.
   A child's school type becomes a profile setting that picks which
   skills are expected; the skills and lessons stay the same.
2. **Germany-wide.** Base on the KMK Bildungsstandards where they exist;
   check order against NRW and Bayern (Gymnasium and one other type). No
   Land-only content (../README.md, decision 3).
3. **Domains.** Grundschule domains continue where the subject continues
   (`math`, `lit-de`, `fl`). Sachunterricht (`world`) splits: new domains
   per secondary subject, with the `world` skills as prerequisites.
4. **Skill tables** as in ../sachunterricht.md: Klasse, skill slug (no
   grade in the id), "Ich kann …", note. Each skill becomes one lesson set
   (about 2 lessons; 3 to 4 for a big new idea).
5. **Fun** applies as in ../fun.md; at ages 10 to 16 the hooks change
   (challenge, real-world use, competition with oneself, humour), and each
   doc says how.
6. **Omissions** go into ../omitted.md with a reason.
7. **Sources** are captured into rnd/official-de/ under its rules and
   listed in ../sources.md.

## Size (drafts, 2026-10-24)

| Doc | Subjects | Skills | Lessons (estimate) |
|---|---|---|---|
| mathe.md | Mathe | 233 | 500 |
| deutsch.md | Deutsch | 254 | 540 |
| sprachen.md | Englisch, Lernjahr 3 to 8 | 183 | 370 |
| sprachen.md | 2nd language, outline (Französisch about 100, Latein about 80, Spanisch about 100) | not counted | |
| naturwissenschaften.md | Biologie 102, Chemie 66, Physik 90 | 258 | 535 |
| gesellschaft.md | Erdkunde 92, Geschichte 104, Politik und Wirtschaft 75 | 271 | 560 |
| weitere.md | Informatik 74, Musik 65, Kunst 66, Ethik 70 | 275 | 565 |
| **all** | | **1474** | **about 3070** |

For comparison, Grundschule de-DE has 435 skills and 909 lessons today.

## Files

| File | Subjects |
|---|---|
| mathe.md | Mathe |
| deutsch.md | Deutsch |
| sprachen.md | Englisch (first foreign language), second foreign language |
| naturwissenschaften.md | Biologie, Chemie, Physik (and combined NaWi in Klasse 5 and 6 where Länder teach it) |
| gesellschaft.md | Erdkunde, Geschichte, Politik/Sozialkunde, Wirtschaft |
| weitere.md | Informatik, Musik, Kunst, Ethik |
