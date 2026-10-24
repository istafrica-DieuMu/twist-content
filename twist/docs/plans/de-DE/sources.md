# Sources

The official documents each subject needs, captured into rnd/official-de/
under the rules in its AGENTS.md (raw/, text/, fetch-log.jsonl).

Germany-wide content means one national reference per subject where there
is one, checked against two or three Länder for order and scope.

## Captured

| Issuer | Document | Covers |
|---|---|---|
| KMK | Bildungsstandards Primarbereich Deutsch (German), Mathe (2022) | Deutsch, Mathe |
| KMK | Fremdsprachen in der Grundschule (2013) | Englisch (English) |
| NRW | Lehrpläne Primarstufe, Sammelband (2025) | Deutsch, Englisch, Kunst (art), Mathe, Musik (music), Praktische Philosophie (practical philosophy), Religion (religious education), Sachunterricht (general studies), Sport (PE) |
| Bayern | LehrplanPLUS Mathematik, Jahrgangsstufen 1, 3, 4 | Mathe |
| BW | Bildungsplan 2016 Mathematik | Mathe |
| Berlin/Brandenburg | Rahmenlehrplan Teil C Deutsch, Mathe, moderne Fremdsprachen | Deutsch, Mathe, Englisch |
| Bayern | LehrplanPLUS Heimat- und Sachunterricht (local and general studies) 1/2 and 3/4 (2026-10-24) | Sachunterricht |
| BW | Bildungsplan 2016 Grundschule Sachunterricht (2026-10-24) | Sachunterricht |
| Berlin/Brandenburg | Rahmenlehrplan Teil C Sachunterricht (2015) (2026-10-24) | Sachunterricht |
| GDSU | Perspektivrahmen Sachunterricht (2013), table of contents only; the book is not free (Klinkhardt, ISBN 978-3-7815-1992-3) (2026-10-24) | Sachunterricht |
| Bayern | LehrplanPLUS Musik, Kunst (1/2; 3/4 one-hour and two-hour), Ethik (1/2, 3/4) (2026-10-24) | Musik, Kunst, Ethik |

## To fetch

| Priority | Issuer | Document | For |
|---|---|---|---|
| 1 | GDSU | the Perspektivrahmen book itself, if the team buys it | Sachunterricht |
| 2 | Bayern | LehrplanPLUS Grundschule Deutsch als Zweitsprache (lehrplanplus.bayern.de/fachprofil/grundschule/daz) | DaZ (German as a second language) |
| 2 | Council of Europe | CEFR Companion Volume (2020): Pre-A1, A1, A2 | DaZ |
| 2 | Council of Europe | Collated Representative Samples of Descriptors for Young Learners, Vol. 1, ages 7 to 10 (2018) | DaZ |
| 2 | Rheinland-Pfalz | Rahmenplan DaZ (2006) | DaZ, second check |
| 3 | BW | Musik | Musik, second check |
| 4 | BW | Kunst | Kunst, second check |
| 5 | Thüringen or Sachsen | Ethik (BW has no Grundschule Ethik) | Ethik, second check |
| any | Brandenburg, MV, Thüringen | official pages for the transfer rules now backed only by Deutsches Schulportal | README background |

The names and editions above are from memory; confirm each on the issuer's
site when fetching.

## Sekundarstufe I (captured 2026-10-24)

Line references for each claim are in the sek1/ subject docs.

| Issuer | Documents | For |
|---|---|---|
| KMK | Bildungsstandards ESA/MSA Deutsch, Mathe (2022), erste Fremdsprache (2023); Biologie (biology), Chemie (chemistry), Physik (physics) MSA (2024); Bildung in der digitalen Welt (2016); Situation des Ethikunterrichts (2008, as amended 2020); Abitur standards fortgeführte Fremdsprache (2012, not used) | all subjects |
| GI | Bildungsstandards Informatik (computer science) Sekundarstufe I (2025) | Informatik |
| DGfG | Bildungsstandards Geographie (2020) | Erdkunde (geography) |
| bpb | Beutelsbacher Konsens | Politik (politics), the neutrality rules |
| NRW, Gymnasium G9 (2019) | Kernlehrpläne Deutsch, Mathe, Englisch, Französisch (French), Spanisch (Spanish), Latein (Latin), Biologie, Chemie, Physik, Erdkunde, Geschichte (history), Wirtschaft-Politik (economics and politics), Kunst, Musik; Informatik WP (2023); G9 fact sheet | all subjects |
| NRW, other | Informatik Klasse 5 and 6 (2021); Praktische Philosophie Sek I (2024, and the 2008 plan it replaces); Realschule Mathe, Englisch, Biologie, Chemie, Physik, Erdkunde, Politik; Hauptschule Gesellschaftslehre (social studies) | all subjects |
| Bayern, Gymnasium | LehrplanPLUS Jgst 5 to 10: Deutsch, Mathematik, Englisch, Musik, Kunst, Ethik; Natur und Technik (science and technology) 5 to 7; Biologie, Physik, Chemie (NTG) 8 to 10; Geschichte 6 to 10; Geographie 5, 7, 10; Politik und Gesellschaft (politics and society) 8, 9 and the ISB Rahmenplan for 10; Wirtschaft und Recht (economics and law) 8, 9; Informatik 9, 10; Französisch and Latein (2nd language, Jgst 6), Spanisch (3rd language, Jgst 8) | all subjects |
| Bayern, Realschule | LehrplanPLUS Deutsch 5 to 10 | Deutsch |

Four Bayern Englisch captures (`lehrplanplus-gym-englisch-jgs6` to `jgs9`)
hold the site's start page after a redirect; the real pages are the
`-1fs-` files. Kept under the keep rule.

## Sekundarstufe I, still to fetch

| Issuer | Document | For |
|---|---|---|
| Bayern | Realschule and Mittelschule plans (Mathe from 7, Englisch, sciences, Gesellschaft); Chemie outside the NTG; Geographie 6, 8, 9; PuG and Wirtschaft und Recht (economics and law) 10; 2nd language Jgst 7 to 10 | ESA and "later in RS" marks |
| NRW | Hauptschule Mathe, Deutsch, Englisch, Wirtschaft; Realschule Deutsch and Geschichte; APO-SI (Stufe to Klasse) | ESA marks, placement |
| BW, Berlin/Brandenburg | Sek I plans for every subject (BW BNT returned an error) | second Land check |
| KMK | recommendations on democracy education and remembrance culture; SWK recommendation on Informatik | Politik, Geschichte, Informatik |
| Destatis | pupils by foreign language | choice of the second language |
