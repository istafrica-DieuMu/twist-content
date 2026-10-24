# Informatik, Musik, Kunst, Ethik (Klasse 5 to 10)

Started 2026-10-24. Follows the conventions in README.md (this folder) and
continues the Grundschule plans ../musik.md, ../kunst.md, ../ethik.md and
the technology and media skills in ../sachunterricht.md.

## Summary

| Subject | Domain | Frameworks | Klassen | Skills | Lessons (estimate) |
|---|---|---|---|---|---|
| Informatik | `computing` (new) | GI Bildungsstandards Sek I (2025); NRW KLP Informatik 5/6 (2021) and WP Informatik (2023); Bayern Natur und Technik 6/7, Informatik 9/10 (NTG) | 5 to 10 | 74 (+1 E) | 165 |
| Musik | `music` | NRW KLP Musik G9 (2019); Bayern LehrplanPLUS Gymnasium Musik 5 to 10 | 5 to 10 | 65 (+1 E) | 130 |
| Kunst | `art` | NRW KLP Kunst G9 (2019); Bayern LehrplanPLUS Gymnasium Kunst 5 to 10 | 5 to 10 | 66 | 130 |
| Ethik | `ethics` | NRW KLP Praktische Philosophie Sek I (2024); Bayern LehrplanPLUS Gymnasium Ethik 5 to 10; KMK report on Ethik (2008, as amended 2020) | 5 to 10 (start differs by Land) | 70 | 140 |
| Total | | | | 275 (+2 E) | 565 |

There are no KMK Bildungsstandards for any of the four subjects, so the
ESA, MSA and G marks cannot come from a KMK document as they do for Mathe
or Deutsch. They are read from the Länder curricula and, for Informatik,
from the GI standards:

- **ESA**: taught at every school type (NRW: the non-italic Informatik
  expectations, which apply to Haupt-, Real-, Gesamt- and Sekundarschule
  as well; GI: all school types).
- **MSA**: taught at Realschule and Gymnasium, or only in an elective
  (NRW Wahlpflicht Informatik) that Realschulen also offer.
- **G**: Gymnasium only (NRW italic expectations, Bayern NTG Informatik,
  depth found only in the Gymnasium plans).
- **later in RS**, **E** (enrichment, with reason) and **check** as in
  README.md.

Placement follows the Gymnasium order of Bayern and NRW (both G9).

---

## Informatik

### Status in the Länder

Informatik is a compulsory subject in Sekundarstufe I in ten Länder for
2025/26, with Bremen and Rheinland-Pfalz to follow, and none planned in
Berlin, Brandenburg and Hessen (Informatik-Monitor 2025/26, press release:
https://idw-online.de/de/news860063; not captured, check against the full
report). Hours and Klassen differ widely. The KMK has no Bildungsstandards
for Informatik in Sek I; its Ständige Wissenschaftliche Kommission
recommended Informatik as a compulsory subject from 2024/25 (not captured).
The GI Bildungsstandards Informatik Sek I (2025) are the national
reference and are written in two bands, Klasse 5 to 6 and 7 to 10.

| Land | Klassen | Source |
|---|---|---|
| NRW | 5 and 6 compulsory at every school type since 2021/22, one KLP with Gymnasium-only items in italics; Wahlpflicht Informatik at Gymnasium (G9 from Klasse 9, from 2025/26) | nrw/text/si_kl5u6_if_klp_2021_07_01.txt:40, 178-182, 434-437; nrw/text/g9_wpif_klp_2023_06_01.txt:80-88 |
| Bayern (Gymnasium) | Natur und Technik, Schwerpunkt Informatik in 6 and 7 for all; Informatik 9 and 10 only in the naturwissenschaftlich-technologisches Gymnasium (NTG) | by/text/lehrplanplus-gym-nt-jgs6.txt:81-84; lehrplanplus-gym-nt-jgs7.txt:79-84; lehrplanplus-gym-informatik-jgs9.txt:30 |

### Structure

GI process areas: Modellieren und Implementieren, Begründen und Bewerten,
Strukturieren und Vernetzen, Kommunizieren und Kooperieren, Darstellen und
Interpretieren (gi/text/Bildungsstandards_Sek_I_2025__pdf-A_.txt:379-612).

GI content areas (same file, 686-861) and NRW Inhaltsfelder
(nrw/text/si_kl5u6_if_klp_2021_07_01.txt:354-425) map onto six Twist
progressions:

| Progression | GI Inhaltsbereich | NRW Inhaltsfeld | Bayern |
|---|---|---|---|
| `computing.data` | Informationen und Daten (ID) | Information und Daten | NT6 2.1 Informationsdarstellung; Inf9/10 Datenbanken |
| `computing.algorithms` | Algorithmen (AL) | Algorithmen | NT7 2.3 Beschreibung von Abläufen durch Algorithmen; Inf9/10 objektorientierte Programmierung |
| `computing.languages` | Sprachen und Automaten (SA) | Automaten und künstliche Intelligenz (automata part); WP: Automaten und formale Sprachen | NT7 2.1 Hypertext |
| `computing.systems` | Informatiksysteme (IS) | Informatiksysteme | NT6 2.3 Dateisystem; NT7 2.1 Internet |
| `computing.ai` | spread over ID-8, ID-11, AL-9, IMG-8 | Automaten und künstliche Intelligenz (AI part); WP: Künstliche Intelligenz und maschinelles Lernen | none in Sek I |
| `computing.society` | Informatik, Mensch und Gesellschaft (IMG) | Informatik, Mensch und Gesellschaft | NT7 2.2 Chancen und Risiken digitaler Kommunikation; Inf9 Datenschutz |

Proposed domain `computing`: the word England uses for the subject
(rnd/catalogue/views/en_gb-computing.md), so en-GB can place the same
skills. de-DE shows it as "Informatik". AI gets its own progression
because NRW gives it an Inhaltsfeld and it will grow; GI spreads it over
three areas.

Progressions run: unplugged instructions, then block-based programming
(Klasse 5 and 6), control structures and variables (7), text-based
programming in a small Python subset (8), data structures, automata,
databases (9), objects and classes (10, G). Data runs from binary and
pixels to databases and machine learning; security from passwords to
public-key encryption.

Grundschule prerequisites: `world.technology` `computer-parts`,
`algorithms`; `world.society` `code-encoding`, `media-types`,
`media-reality`, `internet-safety`.

### Draft skills

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `information-data` | den Unterschied zwischen Information und Daten erklären | ESA (NRW 5/6; GI ID-3) |
| 5 | `systems-around-me` | Informatiksysteme in meinem Alltag erkennen | ESA (GI IS-1) |
| 5 | `input-process-output` | das EVA-Prinzip an Geräten erklären | ESA (NRW 5/6) |
| 5 | `computer-components` | Prozessor, Speicher, Ein- und Ausgabegeräte und ihre Aufgaben nennen | ESA (GI IS-2); builds on `computer-parts` |
| 5 | `files-folders` | Dateien in Ordnern sinnvoll ablegen, speichern und wiederfinden | ESA (GI IS-3; NRW; Bayern NT6 2.3 as a tree) |
| 5 | `passwords` | ein sicheres Passwort bilden und meine Konten schützen | ESA (GI IS-4; Bayern NT7 2.2) |
| 5 | `clear-instructions` | eindeutige Handlungsanweisungen für Abläufe aus dem Alltag schreiben | ESA (NRW 5/6; GI AL-1) |
| 5 | `sequence-loop-branch` | Sequenz, Wiederholung und Verzweigung in Anweisungen erkennen | ESA (NRW 5/6) |
| 5 | `block-programming` | ein Programm aus Blöcken bauen, das eine Figur steuert | ESA (GI AL-3; NRW 5/6); 3 to 4 lessons |
| 5 | `debugging-blocks` | Fehler in einem Blockprogramm durch Testen finden und beheben | ESA (GI AL-4; NRW 5/6) |
| 5 | `binary-numbers` | Zahlen im Binärsystem codieren und decodieren | ESA (NRW 5/6; GI ID-1); see Mathe |
| 5 | `personal-data` | erkennen, welche Daten über mich persönlich sind, und sparsam damit umgehen | ESA (GI IMG-2; NRW Datenbewusstsein) |
| 6 | `encoding-text` | Text mit einem Zeichencode (ASCII) in Bits darstellen | ESA (GI ID-1) |
| 6 | `pixel-images` | erklären, wie ein Pixelbild aus Zahlen besteht | ESA (GI ID-1) |
| 6 | `pixel-vector` | Pixel- und Vektorgrafik unterscheiden und passend wählen | G (Bayern NT6 2.1; NRW WP 9/10) |
| 6 | `data-units` | Datenmengen in Bit, Byte, Kilobyte bis Terabyte umrechnen und vergleichen | ESA; comparing sizes is G (NRW italic) |
| 6 | `storage-places` | Speicherorte (Gerät, USB-Stick, Cloud) nach Kapazität und Sicherheit vergleichen | ESA (NRW 5/6) |
| 6 | `transposition-cipher` | eine Nachricht mit einem Transpositionsverfahren (Skytale) ver- und entschlüsseln | ESA (NRW 5/6) |
| 6 | `caesar-cipher` | eine Nachricht mit der Caesar-Verschiebung ver- und entschlüsseln und die Verfahren vergleichen | G (NRW italic: comparing ciphers; substitution in NRW WP) |
| 6 | `flowcharts` | einen Ablauf als Programmablaufplan oder Struktogramm darstellen | G (NRW italic) |
| 6 | `block-loops-conditions` | in Blockprogrammen Schleifen und Bedingungen einsetzen | ESA (NRW 5/6; GI AL-2) |
| 6 | `subprograms` | ein Programm in Unterprogramme zerlegen | G (NRW italic: Modularisierung) |
| 6 | `trace-algorithm` | das Ergebnis eines Algorithmus durch schrittweises Ausführen vorhersagen | G (NRW italic) |
| 6 | `automata-everyday` | erklären, wie ein Automat (Getränkeautomat, Ampel) auf Eingaben reagiert | ESA (NRW 5/6; GI SA-1) |
| 6 | `ai-everyday` | Anwendungen künstlicher Intelligenz in meinem Alltag erkennen | ESA (NRW 5/6) |
| 6 | `decision-tree` | Dinge mit einem Entscheidungsbaum ordnen und erklären, wie eine Maschine so lernt | ESA (NRW 5/6) |
| 6 | `neural-network-idea` | in Grundzügen beschreiben, wie ein künstliches neuronales Netz Bilder erkennt | G (NRW italic) |
| 7 | `internet-structure` | erklären, wie Client, Server und Router im Internet zusammenarbeiten | MSA (Bayern NT7 2.1; GI IS-5); check at Mittelschule |
| 7 | `ip-url` | IP-Adressen und URLs lesen und ihren Zweck erklären | MSA (Bayern NT7 2.1) |
| 7 | `message-path` | beschreiben, wie eine E-Mail oder Nachricht übertragen wird | MSA (Bayern NT7 2.1) |
| 7 | `hypertext` | eine Website als Graph aus Seiten und Verweisen darstellen | G (Bayern NT7 2.1) |
| 7 | `search-evaluate` | Suchergebnisse nach Quelle und Glaubwürdigkeit bewerten | ESA (Bayern NT7 2.1); builds on `media-reality` |
| 7 | `messaging-risks` | Chancen und Risiken von Messengern, E-Mail und sozialen Netzwerken abwägen | ESA (Bayern NT7 2.2; GI IMG-5) |
| 7 | `malware-scams` | Viren, Trojaner, Phishing und Abofallen erkennen und mich schützen | ESA (Bayern NT7 2.2; GI IS-9) |
| 7 | `image-rights` | das Recht am eigenen Bild und Persönlichkeitsrechte online beachten | ESA (Bayern NT7 2.2) |
| 7 | `copyright-sources` | Urheberrecht beachten und Quellen richtig angeben | ESA (Bayern NT6 2.2, NT7 2.1; GI IMG-7) |
| 7 | `control-structures` | Algorithmen mit ein- und zweiseitiger Bedingung und Wiederholung mit Bedingung formulieren | ESA (Bayern NT7 2.3; GI AL-6) |
| 7 | `variables` | Variablen nutzen, um Werte in einem Programm zu speichern und zu ändern | MSA (GI ID-7; NRW WP) |
| 7 | `problem-decomposition` | ein Problem in Teilprobleme zerlegen und ein Programm dafür planen | ESA (GI AL-6) |
| 7 | `sensors-actuators` | ein Gerät mit Sensoren und Aktoren steuern (simulierter Mikrocontroller) | MSA (GI IS-6); check |
| 8 | `analog-digital` | erklären, wie Ton und Bild digitalisiert werden (Abtastung, Auflösung) | MSA (GI ID-4) |
| 8 | `content-presentation` | Inhalt und Darstellung trennen (Formatvorlagen, HTML und CSS) | MSA (GI ID-6) |
| 8 | `html-basics` | eine einfache Webseite in HTML schreiben | MSA (NRW WP: Dokumentenbeschreibungssprache); check |
| 8 | `text-programming` | ein erstes Programm in einer textbasierten Sprache (Python) schreiben | MSA (GI AL-7 allows visual or text; NRW WP; Bayern Inf9 NTG); check; 3 to 4 lessons |
| 8 | `data-types` | Zahl, Text, Wahrheitswert und Liste als Datentypen unterscheiden und passend wählen | MSA (GI ID-7; NRW WP) |
| 8 | `logic-operators` | Bedingungen mit und, oder, nicht verknüpfen | MSA (NRW WP: logische Operationen) |
| 8 | `functions-parameters` | Funktionen mit Parametern schreiben und aufrufen | G (NRW WP; Bayern Inf9 NTG) |
| 8 | `systematic-testing` | Programme systematisch testen und Fehlerursachen finden | MSA (GI AL-8) |
| 8 | `spreadsheet-formulas` | in einer Tabellenkalkulation mit Formeln und Funktionen rechnen | ESA (GI ID-9); see Mathe |
| 8 | `data-flow` | Datenflüsse in einer Tabellenkalkulation darstellen und Funktionen verketten | G (Bayern Inf9 NTG LB1) |
| 8 | `backup-versions` | meine Daten mit Sicherungskopien und Versionen schützen | ESA (GI IS-8) |
| 8 | `unexpected-behaviour` | bei unerwartetem Verhalten eines Geräts systematisch die Ursache suchen | ESA (GI IS-7) |
| 9 | `lists-arrays` | gleichartige Daten in einer Liste speichern und durchlaufen | MSA (GI ID-7); Bayern places arrays in Inf10 NTG; check |
| 9 | `search-sort` | Such- und Sortierverfahren vergleichen und ihren Aufwand abschätzen | MSA (GI AL-5); check |
| 9 | `algorithm-properties` | prüfen, ob ein Verfahren endlich, eindeutig und ausführbar ist | MSA (NRW WP) |
| 9 | `finite-automata` | das Verhalten eines endlichen Automaten mit einem Zustandsdiagramm beschreiben und einen entwerfen | MSA (GI SA-3, SA-4; NRW WP) |
| 9 | `syntax-semantics` | Syntax und Semantik einer Sprache unterscheiden und Syntaxfehler finden | MSA (GI SA-2; NRW WP) |
| 9 | `logic-gates` | Schaltungen aus UND, ODER und NICHT aufbauen und Wahrheitstabellen lesen | G (NRW WP: logische Schaltungen) |
| 9 | `binary-adder` | erklären, wie eine Schaltung zwei Binärzahlen addiert | E: links `logic-gates` with `binary-numbers`; how a computer calculates |
| 9 | `database-tables` | Daten in Tabellen mit Datensätzen, Attributen und Schlüsseln ordnen | MSA (GI ID-10; Bayern Inf9 NTG) |
| 9 | `sql-queries` | mit SQL-Abfragen Informationen aus einer Datenbank gewinnen | G (Bayern Inf10 NTG); check |
| 9 | `machine-learning-types` | überwachtes, unüberwachtes und bestärkendes Lernen an Beispielen unterscheiden | MSA (NRW WP; GI AL-9) |
| 9 | `training-data-bias` | erklären, wie Trainingsdaten das Ergebnis einer KI beeinflussen | MSA (GI ID-11; NRW WP) |
| 9 | `correlation-causation` | Muster in Daten deuten und Korrelation von Ursache unterscheiden | MSA (GI ID-8); see Mathe |
| 10 | `network-layers` | Kommunikation im Netz mit einem Schichtenmodell und Protokollen (TCP/IP, HTTP) erklären | MSA (GI IS-5) |
| 10 | `symmetric-encryption` | symmetrische Verschlüsselung und das Problem des Schlüsselaustauschs erklären | MSA (GI ID-12) |
| 10 | `public-key` | das Prinzip der asymmetrischen Verschlüsselung und der digitalen Signatur erklären | G (GI ID-12 names cryptography only); check |
| 10 | `security-features` | HTTPS, Zwei-Faktor-Anmeldung und Updates bewusst nutzen | ESA (GI IS-9) |
| 10 | `data-security-goals` | Vertraulichkeit, Integrität und Verfügbarkeit von Daten unterscheiden | MSA (NRW 5/6 text, NRW WP) |
| 10 | `personal-data-rights` | beschreiben, wie Apps personenbezogene Daten sammeln, und meine Rechte nach der DSGVO nutzen | ESA (GI IMG-4; Bayern Inf9 LB4) |
| 10 | `big-data` | Chancen und Risiken der Auswertung großer Datenmengen abwägen | MSA (Bayern Inf9, Inf10; GI IMG-6) |
| 10 | `platform-power` | Lock-in-Effekte, Filterblasen und Monopole bei Plattformen erklären | MSA (GI IMG-6) |
| 10 | `licence-models` | Lizenzmodelle (proprietär, Open Source, Creative Commons) vergleichen | MSA (GI IMG-7; NRW WP) |
| 10 | `objects-classes` | Objekte und Klassen mit Attributen und Methoden modellieren und programmieren | G (Bayern Inf9, Inf10 NTG); check; 3 to 4 lessons |
| 10 | `ai-impact` | Auswirkungen von KI und Automatisierung auf Arbeit, Gesellschaft und Umwelt bewerten | MSA (GI IMG-8, IMG-9; NRW WP) |

Counts: 12, 15, 13, 12, 12, 11 = 75 rows. One (`binary-adder`) is E; 74
in the curriculum. Lessons: 2 per skill, 4 for `block-programming`,
`text-programming` and `objects-classes`, 3 for the cipher and AI skills:
about 165.

---

## Musik

### Structure

| NRW (KLP Musik G9) | Bayern (LehrplanPLUS Gymnasium Musik) |
|---|---|
| Kompetenzbereiche: Rezeption, Produktion, Reflexion | Lernbereiche in every Jahrgangsstufe: 1 Sprechen - Singen - Musizieren; 2 Musik - Mensch - Zeit; 3 Bewegung - Tanz - Szene; 4 Musik und ihre Grundlagen |
| Inhaltsfelder: 1 Bedeutungen, 2 Entwicklungen, 3 Verwendungen; two bands, end of Klasse 6 (Erprobungsstufe) and end of Klasse 10 | one plan per Jahrgangsstufe 5 to 10; items marked (MuG) only at the musisches Gymnasium |

Sources: nrw/text/g9_mu_klp_3406_2019_06_23_0.txt:362-470 (areas), 473-744
(Klasse 5/6), 745-1050 (Sek I); by/text/lehrplanplus-gym-musik-jgs5.txt to
-jgs10.txt.

As in Grundschule, Twist covers listening, reading and understanding
(NRW Rezeption and Reflexion; Bayern Lernbereiche 2 and 4). Singing,
playing, dancing and staging stay in class.

The domain `music` continues. Progressions:

| Progression | Content | Status |
|---|---|---|
| `music.reading` | clefs, accidentals, note values, metre, scores, chord symbols | continues |
| `music.theory` | steps, scales, intervals, triads, cadence | new: Sek I adds harmony, which the Grundschule plan did not need |
| `music.listening` | form, motif, programme music, film and advertising music, effect | continues |
| `music.instruments` | instrument groups, ensembles, voices, sound and digital audio | continues |
| `music.history` | epochs from the Middle Ages to 1950, composers, jazz, pop, music of other cultures | new: split from `music.instruments`, where Grundschule kept composers |

Order: both Länder start Klasse 5 with notation and the major scale;
Klasse 6 adds minor, intervals and triads; harmony and pop in 7; media
in 8; Wiener Klassik and Romantik in 9 (Bayern) and Barock, Jazz and
1900 to 1950 in 10 (Bayern). NRW puts Mittelalter and Barock in 5/6 and
the rest in its 7 to 10 band without a year; Twist follows Bayern for the
year and NRW for the content.

### Draft skills

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `treble-bass-clef` | Töne im Violin- und Bassschlüssel lesen | G (Bayern Mu5); NRW puts the bass clef in the 7 to 10 band; later in RS, check |
| 5 | `accidentals` | Kreuz, b und Auflösungszeichen lesen | ESA (NRW 5/6; Bayern Mu5) |
| 5 | `sixteenth-notes` | Noten- und Pausenwerte bis zur Sechzehntel lesen und klatschen | ESA (Bayern Mu5); builds on `eighth-notes` |
| 5 | `metre-upbeat` | gerade und ungerade Taktarten und den Auftakt erkennen | ESA (NRW 5/6) |
| 5 | `steps-leaps` | Tonwiederholung, Tonschritt und Tonsprung in einer Melodie erkennen | ESA (NRW 5/6) |
| 5 | `whole-half-steps` | Ganz- und Halbtonschritte auf der Klaviatur zeigen | ESA (Bayern Mu5) |
| 5 | `major-scale` | eine Dur-Tonleiter aufbauen und hören | ESA (NRW 5/6; Bayern Mu5) |
| 5 | `dynamics-tempo-terms` | italienische Fachbegriffe für Lautstärke und Tempo verwenden (pp bis ff, Adagio bis Presto) | ESA (NRW 5/6; Bayern Mu5); builds on `dynamics-tempo` |
| 5 | `instrument-groups` | Holzblas-, Blechblas-, Streich-, Schlag- und Tasteninstrumente nach Bau, Klang und Spielweise vergleichen | ESA (Bayern Mu5); builds on `instrument-families` |
| 5 | `programme-music` | hören, wie Musik eine Geschichte oder ein Bild darstellt | ESA (NRW 5/6 Bedeutungen) |
| 5 | `song-forms` | Strophe, Refrain, Rondo und ABA-Form beim Hören erkennen | ESA (NRW 5/6); builds on `rondo-canon` |
| 5 | `mozart-haydn` | Stationen aus dem Leben Mozarts und Haydns mit ihrer Musik verbinden | ESA (Bayern Mu5, one of the two) |
| 6 | `minor-scale` | Moll-Tonleitern bilden und Dur und Moll hören | ESA (NRW 5/6; Bayern Mu6) |
| 6 | `pentatonic` | die Pentatonik erkennen | ESA (NRW 5/6) |
| 6 | `intervals` | Intervalle bis zur Oktave bestimmen (rein, groß, klein) | ESA (NRW 5/6 Stammtöne; Bayern Mu6) |
| 6 | `intervals-by-ear` | Intervalle bis zur Quinte nach Gehör erkennen | G (Bayern Mu6) |
| 6 | `triads` | Dur- und Molldreiklänge bilden und hören | MSA (Bayern Mu6; NRW 7 to 10 band) |
| 6 | `consonance-dissonance` | Konsonanz und Dissonanz unterscheiden | ESA (NRW 5/6) |
| 6 | `articulation` | legato, staccato und Akzent hören und lesen | ESA (NRW 5/6; Bayern Mu6) |
| 6 | `odd-metres-triplets` | Triolen und Taktarten wie 5/4 und 7/8 erkennen | G (Bayern Mu6) |
| 6 | `motif-variation` | Wiederholung, Variation, Sequenz und Umkehrung eines Motivs erkennen | ESA (NRW 5/6; Bayern Mu6) |
| 6 | `medieval-music` | Merkmale weltlicher Musik des Mittelalters beschreiben | ESA (NRW 5/6) |
| 6 | `baroque-court-music` | höfische Musik des Barock beschreiben (Bach, Händel) | ESA (NRW 5/6; Bayern Mu6) |
| 6 | `ensembles` | Besetzungen erkennen (Sinfonieorchester, Blasorchester, Band, Volksmusikgruppe) | ESA (NRW 5/6; Bayern Mu6) |
| 6 | `music-theatre-first` | Oper und Musical kennen und sagen, was die Musik darin leistet | ESA (NRW 5/6 Musiktheater) |
| 6 | `music-in-public` | Musik im Alltag (Kaufhaus, Stadion, Spiel) nach ihrer Wirkung untersuchen | ESA (NRW 5/6 Verwendungen) |
| 7 | `cadence` | Haupt- und Nebenstufen und die einfache Kadenz erklären | MSA (NRW 7 to 10; Bayern Mu7) |
| 7 | `chord-symbols` | Akkordsymbole lesen und einer Liedbegleitung folgen | MSA (NRW Akkordbezeichnungen; Bayern Mu7) |
| 7 | `syncopation-groove` | Synkope, Off-Beat und Groove hören | ESA (NRW 7 to 10; Bayern Mu7) |
| 7 | `blues` | das zwölftaktige Blues-Schema und die Blues-Skala erkennen | ESA (NRW 7 to 10; Bayern Mu7) |
| 7 | `motif-theme` | Motiv und Thema unterscheiden | MSA (NRW 7 to 10) |
| 7 | `score-reading` | einer Partitur beim Hören folgen | MSA (NRW Partitur; Bayern Mu7) |
| 7 | `beethoven-schubert` | Leben und Musik Beethovens und Schuberts verbinden | MSA (Bayern Mu7, one of the two; NRW Wiener Klassik) |
| 7 | `dvorak-new-world` | in Dvořáks Sinfonie "Aus der Neuen Welt" Volksmusik und Sinfonie verbinden | MSA (Bayern Mu7, one option) |
| 7 | `music-emotion` | beschreiben, wie Musik Gefühle auslöst (Tongeschlecht, Tempo, Lautstärke) | ESA (Bayern Mu7) |
| 7 | `streaming-copyright` | erklären, wie Streaming, Urheberrecht und die Bezahlung von Musikern zusammenhängen | ESA (Bayern Mu7; NRW 7 to 10 Reflexion) |
| 7 | `rock-pop-1950s-60s` | Rock'n'Roll und Popmusik der 1950er und 1960er Jahre erkennen | ESA (NRW 7 to 10) |
| 8 | `film-music` | Aufgaben von Filmmusik erkennen (Underscoring, Paraphrasierung, Kontrapunktierung) | ESA (NRW 7 to 10; Bayern Mu8) |
| 8 | `advertising-music` | erklären, wie Musik in der Werbung beeinflusst | ESA (NRW 7 to 10; Bayern Mu8) |
| 8 | `music-video` | Bild und Musik in einem Musikvideo zusammen deuten | ESA (NRW 7 to 10) |
| 8 | `pop-styles` | Stile der Popularmusik an Rhythmus, Besetzung und Sound unterscheiden | ESA (Bayern Mu8) |
| 8 | `youth-cultures-music` | Musik als Zeichen von Jugendkulturen beschreiben | ESA (Bayern Mu8) |
| 8 | `rap` | Sprache, Rhythmus und Reim im Rap untersuchen | ESA (NRW 7 to 10) |
| 8 | `cover-versions` | ein Original mit einer Coverversion vergleichen | ESA (NRW 7 to 10) |
| 8 | `political-music` | Musik mit politischer Botschaft erkennen und deuten | MSA (NRW 7 to 10) |
| 8 | `music-other-cultures` | Musik einer außereuropäischen Kultur nach Tonvorrat, Rhythmus und Instrumenten beschreiben | ESA (NRW 7 to 10; Bayern Mu8) |
| 8 | `digital-audio` | Klang digital aufnehmen und bearbeiten (Sample, Loop, Effekt) | MSA (NRW 7 to 10 digitale Werkzeuge); check |
| 8 | `sound-waves` | erklären, wie Schall entsteht und warum Instrumente verschieden klingen (Obertöne) | E: Bayern asks only at MuG; Physik teaches Schall; link, do not reteach |
| 9 | `viennese-classic` | Merkmale der Wiener Klassik beschreiben (Kontrast, Ausgewogenheit) | MSA (NRW 7 to 10; Bayern Mu9) |
| 9 | `sonata-form` | Exposition, Durchführung und Reprise in der Sonatenhauptsatzform verfolgen | G (NRW 7 to 10 Formtypen; Bayern Mu9) |
| 9 | `symphony` | den Aufbau einer Sinfonie beschreiben | MSA (NRW Sinfonie; Bayern Mu9) |
| 9 | `romantic-music` | Merkmale der Romantik und der sinfonischen Dichtung beschreiben | MSA (Bayern Mu9) |
| 9 | `art-song` | Text und Musik in einem Kunstlied deuten | MSA (NRW Kunstlied; Bayern Mu9 Klavierlied) |
| 9 | `women-composers` | Werke von Komponistinnen wie Fanny Hensel und Clara Schumann einordnen | MSA (Bayern Mu5 option, Mu9) |
| 9 | `opera-musical` | Ouvertüre, Rezitativ, Arie, Song und Chor im Musiktheater unterscheiden | MSA (Bayern Mu9) |
| 9 | `voice-types` | Stimmlagen von Sopran bis Bass erkennen | ESA (NRW 5/6 Stimmlagen; Bayern Mu9) |
| 9 | `music-jobs` | Berufe rund um Musik und Musiktheater nennen | ESA (Bayern Mu9) |
| 10 | `baroque-genres` | Concerto, Suite und Oratorium unterscheiden | G (Bayern Mu10) |
| 10 | `jazz-history` | Wurzeln und Stile des Jazz beschreiben (Blues, New Orleans, Swing, Bebop) | MSA (NRW 7 to 10; Bayern Mu10) |
| 10 | `jazz-features` | Improvisation, Swing und Besetzung im Jazz erkennen | MSA (Bayern Mu10) |
| 10 | `impressionism-music` | Klangfarben im musikalischen Impressionismus beschreiben (Debussy) | G (NRW Musik um 1900; Bayern Mu10) |
| 10 | `new-music` | Atonalität, Zwölftonmusik und Collage in Musik von 1900 bis 1950 erkennen | G (NRW Neue Musik; Bayern Mu10) |
| 10 | `social-dances` | Gesellschaftstänze an Taktart und Tempo unterscheiden (Menuett, Walzer, Tango) | MSA (Bayern Mu10) |
| 10 | `music-economy` | erklären, wie Geld Musik beeinflusst (Charts, Labels, Empfehlungsalgorithmen) | MSA (NRW 7 to 10 Reflexion) |
| 10 | `music-eras` | Musikstücke vom Mittelalter bis heute einer Epoche zuordnen | MSA (review of `music.history`) |
| 10 | `judge-music` | ein Musikstück mit Fachbegriffen begründet beurteilen | MSA (NRW Reflexion) |

Counts: 12, 14, 11, 11, 9, 9 = 66 rows. One (`sound-waves`) is E; 65 in
the curriculum. About 130 lessons.

---

## Kunst

### Structure

| NRW (KLP Kunst G9) | Bayern (LehrplanPLUS Gymnasium Kunst) |
|---|---|
| Kompetenzbereiche: Produktion, Rezeption | Lernbereiche in every Jahrgangsstufe: 1 Bildende Kunst; 2 Architektur und Produktdesign; 3 Interaktion, Inszenierung und Kommunikation |
| Inhaltsfelder: 1 Bildgestaltung (Fläche, Raum, Zeit, Form, Material, Farbe), 2 Bildkonzepte (Bildstrategien, personale/soziokulturelle Bedingungen), 3 Gestaltungsfelder in Funktionszusammenhängen (Malerei, Grafik, Fotografie, Plastik, Architektur, Film, Aktion; Narration, Fiktion/Vision, Expression, Dokumentation, Persuasion) | an art history in order: 5 Vor- und Frühgeschichte, Ägypten; 6 Antike; 7 Romanik, Gotik; 8 Renaissance, Barock; 9 Klassizismus, Romantik, Realismus; 10 Impressionismus, Wegbereiter der Moderne, Jugendstil |

Sources: nrw/text/g9_ku_klp_3405_2019_06_23.txt:401-510 (areas), 514-717
(Klasse 5/6), 718-960 (Sek I); by/text/lehrplanplus-gym-kunst-jgs5.txt to
-jgs10.txt.

Twist covers seeing, analysing, knowing and judging (NRW Rezeption; the
analysis and knowledge parts of Bayern's three Lernbereiche). Making with
real material stays in class.

The domain `art` continues. Progressions:

| Progression | Content | Status |
|---|---|---|
| `art.colour-form` | colour theory and contrasts, composition, space on the flat surface, perspective, proportion | continues |
| `art.looking` | the steps of an artwork analysis, iconography, functions of art | continues |
| `art.history` | art epochs from prehistory to early modernism | new: Bayern teaches a year-by-year history; Grundschule kept this inside `art.looking` |
| `art.design` | architecture, interiors, product and fashion design, typography | new: Bayern Lernbereich 2 |
| `art.media` | photo, film, communication design, advertising, self-presentation, image rights | continues |

### Draft skills

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `colour-properties` | Farbton, Helligkeit und Sättigung unterscheiden | ESA (NRW 5/6 Farbe) |
| 5 | `colour-contrasts` | Hell-Dunkel-, Kalt-Warm- und Komplementärkontrast erkennen | ESA (NRW 5/6; Bayern Ku5 Farbsystematik, Ku7); builds on `colour-wheel` |
| 5 | `paint-materials` | erklären, woraus Farbe besteht (Pigment, Bindemittel) und wie sie deckt oder lasiert | ESA (Bayern Ku5) |
| 5 | `figure-ground` | Figur und Grund in einem Bild unterscheiden | ESA (NRW 5/6 Fläche) |
| 5 | `order-principles` | Reihung, Streuung und Ballung in Bildern finden | ESA (NRW 5/6) |
| 5 | `form-types` | organische und geometrische Formen und Formkontraste erkennen | ESA (NRW 5/6 Form) |
| 5 | `material-effect` | Materialien nach Oberfläche, Zustand und Wirkung beschreiben | ESA (NRW 5/6 Material; Bayern Ku5 LB2); builds on `material-feel` |
| 5 | `hierarchical-scale` | die Bedeutungsperspektive erkennen (wichtige Figuren sind größer) | ESA (Bayern Ku5) |
| 5 | `cave-art` | Höhlenmalerei und Figuren der Vorgeschichte beschreiben (Lascaux, Schwäbische Alb) | ESA (Bayern Ku5) |
| 5 | `egyptian-art` | Kunst und Bauwerke im Alten Ägypten beschreiben (Pyramide, Relief) | ESA (Bayern Ku5) |
| 5 | `writing-as-image` | Bilderschrift, Schmuckschrift und Geheimschrift als gestaltete Schrift erkennen | ESA (Bayern Ku5 LB3) |
| 5 | `narrative-images` | zeigen, wie ein Bild eine Geschichte erzählt (Thema, Handlung, Figur, Ort) | ESA (NRW 5/6 Narration) |
| 6 | `depth-cues` | Raum auf der Fläche erkennen (Überdeckung, Größenabnahme, Höhenlage, Staffelung) | ESA (NRW 5/6; Bayern Ku6); builds on `foreground-background` |
| 6 | `parallel-projection` | Körper in Parallelperspektive erkennen und vervollständigen | ESA (Bayern Ku6, Ku7; NRW 7 to 10) |
| 6 | `viewpoint-crop` | Ansicht, Platzierung und Bildausschnitt in ihrer Wirkung vergleichen | ESA (Bayern Ku6); builds on `camera-view` |
| 6 | `greek-art` | griechische Plastik und Vasenmalerei beschreiben (Kontrapost, Schönheitsideal) | ESA (Bayern Ku6) |
| 6 | `roman-art` | Mosaik, Fresko und Porträtbüste der Römer erkennen | ESA (Bayern Ku6) |
| 6 | `ancient-architecture` | Tempel, Säulenordnungen, Basilika und Forum der Antike unterscheiden | ESA (Bayern Ku6 LB2) |
| 6 | `sacred-secular` | religiöse und weltliche Aufgaben von Kunst und Bauwerken unterscheiden | ESA (Bayern Ku5, Ku6) |
| 6 | `text-image` | Text und Bild in Comics, Plakaten und Bildergeschichten untersuchen | ESA (Bayern Ku6 LB3) |
| 6 | `typography-basics` | Schriftart, Schriftgröße und Versalien unterscheiden | ESA (Bayern Ku6) |
| 6 | `fantasy-images` | Fantasiebilder und ihre Mittel untersuchen (Fiktion, Vision) | ESA (NRW 5/6 Fiktion/Vision) |
| 6 | `body-language-images` | Körpersprache, Gestik und Mimik in Fotos und Standbildern deuten | ESA (Bayern Ku6 LB3) |
| 7 | `contour-hatching` | Kontur und Schraffur als Mittel für Form, Licht und Oberfläche erkennen | ESA (Bayern Ku7) |
| 7 | `subtractive-mixing` | die subtraktive Farbmischung erklären | ESA (Bayern Ku7); builds on `mixing-colours` |
| 7 | `colour-symbolism` | Darstellungs- und Symbolwert von Farben deuten | ESA (Bayern Ku7; NRW Symbolfarbe) |
| 7 | `romanesque-gothic` | romanische und gotische Kunst und Bauwerke unterscheiden (Rundbogen, Spitzbogen, Gewölbe) | ESA (Bayern Ku7) |
| 7 | `iconography` | Figuren in mittelalterlichen Bildern an Attributen und Farben erkennen | MSA (Bayern Ku7) |
| 7 | `artwork-analysis` | ein Kunstwerk in Schritten untersuchen (erster Eindruck, Bestand, Bildaufbau, Deutung) | ESA (Bayern Ku7 Werkanalyse; NRW Rezeption); builds on `describe-picture` |
| 7 | `sacred-buildings` | Kirche, Synagoge und Moschee nach Aufbau und Zeichen vergleichen | ESA (Bayern Ku7 LB2); see Ethik `islam`, `judaism` |
| 7 | `printmaking` | Hochdruck, Tiefdruck und Siebdruck unterscheiden | ESA (Bayern Ku7 LB3; NRW druckgrafische Gestaltungen) |
| 7 | `reproduction` | erklären, was Buchdruck und Digitalisierung für Bilder verändert haben | MSA (Bayern Ku7) |
| 7 | `collage-montage` | Collage und Montage als Verfahren erkennen | ESA (NRW 7 to 10 Bildstrategien) |
| 7 | `chance-methods` | Zufallsverfahren in der Kunst erkennen (Frottage, Décalcomanie) | ESA (NRW 7 to 10 zufallsgelenkt) |
| 8 | `linear-perspective` | Fluchtpunkt, Horizont und Fluchtlinien in einem Bild finden | MSA (NRW 7 to 10; Bayern Ku8) |
| 8 | `two-point-perspective` | Bilder mit einem und mit zwei Fluchtpunkten unterscheiden | MSA (NRW 7 to 10; Bayern MuG only); check |
| 8 | `renaissance` | das neue Welt- und Menschenbild der Renaissance in Bildern erkennen | MSA (Bayern Ku8) |
| 8 | `baroque-art` | Barock und Renaissance nach Komposition, Licht und Bewegung vergleichen | G (Bayern Ku8) |
| 8 | `painting-genres` | Porträt, Stillleben und Landschaft als Gattungen unterscheiden | MSA (Bayern Ku8); cut for Grundschule (../omitted.md), named here |
| 8 | `golden-ratio` | Proportion und Goldenen Schnitt in Bildern und Bauten finden | MSA (Bayern Ku8); see Mathe |
| 8 | `functions-of-art` | Aufgaben von Kunst unterscheiden (religiös, politisch, repräsentativ, ästhetisch) | MSA (Bayern Ku8) |
| 8 | `floor-plan` | Grundriss, Schnitt und Ansicht lesen | ESA (Bayern Ku8 LB2); see Mathe |
| 8 | `interior-effect` | die Wirkung eines Raums durch Licht, Farbe und Anordnung beschreiben | ESA (Bayern Ku8 LB2) |
| 8 | `communication-design` | Plakate, Logos und Werbung nach Botschaft, Sender und Empfänger untersuchen | ESA (Bayern Ku8 LB3; NRW Persuasion) |
| 8 | `fonts-effect` | die Wirkung von Schriften beurteilen | ESA (Bayern Ku8) |
| 9 | `human-proportions` | Proportionen der menschlichen Figur erkennen | ESA (Bayern Ku9) |
| 9 | `nineteenth-century-art` | Klassizismus, Romantik und Realismus an Bildern unterscheiden | MSA (Bayern Ku9) |
| 9 | `art-and-power` | Darstellung von Macht und Propaganda in Bildern erkennen | MSA (Bayern Ku9; NRW Persuasion) |
| 9 | `composition-lines` | einen Bildaufbau mit Kompositionslinien und Blickachsen untersuchen | MSA (Bayern Ku9) |
| 9 | `fashion-ornament` | Kleidung, Schmuck und Ornament aus verschiedenen Zeiten und Kulturen vergleichen | ESA (Bayern Ku9 LB2) |
| 9 | `photo-means` | fotografische Mittel erkennen (Standpunkt, Licht, Schärfentiefe, Brennweite) | ESA (Bayern Ku9 LB3; NRW Fotografie) |
| 9 | `self-presentation` | Selbstinszenierung in sozialen Medien und Jugendkulturen untersuchen | ESA (Bayern Ku9 LB3) |
| 9 | `street-art` | Street-Art und Graffiti als Bildsprache deuten | ESA (Bayern Ku9); licence needed for most examples |
| 9 | `performance-art` | Performance und Aktionskunst als Kunstform verstehen | MSA (Bayern Ku9; NRW Aktion); licence needed |
| 9 | `image-licences` | Bildrecht, Urheberrecht und Lizenzen bei Bildern beachten | ESA (NRW 7 to 10; Bayern Ku9); builds on `computing` `image-rights`, `copyright-sources` |
| 10 | `colour-functions` | Lokalfarbe, Erscheinungsfarbe und Ausdrucksfarbe unterscheiden | MSA (NRW 7 to 10; Bayern Ku10) |
| 10 | `additive-mixing` | additive und subtraktive Farbmischung vergleichen (Bildschirm und Druck) | MSA (Bayern Ku10); see `computing` `pixel-images` |
| 10 | `aerial-perspective` | Luft- und Farbperspektive erkennen | MSA (NRW 7 to 10; Bayern Ku10) |
| 10 | `impressionism` | Merkmale des Impressionismus beschreiben (Monet, Manet, Freilichtmalerei) | MSA (Bayern Ku10) |
| 10 | `modernism-pioneers` | van Gogh, Cézanne und Gauguin als Wegbereiter der Moderne vergleichen, auch den Einfluss außereuropäischer Kunst | MSA (Bayern Ku10) |
| 10 | `abstraction` | naturalistische, verfremdende und abstrahierende Darstellung unterscheiden | MSA (Bayern Ku10) |
| 10 | `art-nouveau` | Jugendstil in Architektur, Möbeln und Plakaten erkennen | MSA (Bayern Ku10) |
| 10 | `design-judgement` | Designobjekte nach Form, Funktion und Nachhaltigkeit bewerten | ESA (Bayern Ku10) |
| 10 | `explanatory-drawing` | eine erklärende Zeichnung oder Explosionszeichnung lesen | ESA (Bayern Ku10 LB3) |
| 10 | `staged-documentary-photo` | dokumentarische und inszenierte Fotos unterscheiden und Bildmanipulation erkennen | ESA (Bayern Ku10; NRW Dokumentation) |
| 10 | `utopia-images` | Bilder von Utopien und Zukunftsvorstellungen deuten | MSA (NRW 7 to 10 Fiktion/Vision) |

Counts: 12, 11, 11, 11, 10, 11 = 66. About 130 lessons.

---

## Ethik

### Where and when Ethik is taught

Ethik (or its Land equivalent) replaces Religion for children who do not
take it, except in Berlin and Brandenburg, where it is compulsory for all.
The start Klasse in Sek I differs (KMK report, kmk/text/2008_02_22-Situation-Ethik-Unterricht.txt):

| Land | Subject | Sek I from | Line |
|---|---|---|---|
| Baden-Württemberg | Ethik | Klasse 5 since 2021/22 (before: 7) | 364-377 |
| Bayern | Ethik | Klasse 1, every school type with Religion | 684 |
| Berlin | Ethik, compulsory for all | Klasse 7 | 930 |
| Brandenburg | L-E-R, compulsory | Klasse 5 | 1162 |
| Bremen | Philosophie | Sek I (Oberschule, Gymnasium) | 1313 |
| Hamburg | Philosophie | Stadtteilschule, Gymnasium; start Klasse not given, check | 1449 |
| Hessen | Ethik | all school types after Grundschule | 1576 |
| Mecklenburg-Vorpommern | Philosophieren mit Kindern | Klasse 1 to 10 | 121, 1844 |
| Niedersachsen | Werte und Normen | Schuljahrgang 5 | 1982 |
| NRW | Praktische Philosophie | Klasse 5 (new KLP from 2025/26) | 2268; nrw/text/klp_si_pp_2024_10_02.txt:80-95 |
| Rheinland-Pfalz | Ethik | all school types | 2422 |
| Saarland | Ethik | Klasse 5 | 2745 |
| Sachsen | Ethik | all school types | 2912 |
| Sachsen-Anhalt | Ethikunterricht | all years | 3080 |
| Schleswig-Holstein | Philosophie | all school types | 2574 |
| Thüringen | Ethik | all school types | 3311 |

The KMK report is dated 2020; BW and Hessen have moved since. Twist places
Ethik from Klasse 5 (Gymnasium order in Bayern and NRW). A Berlin child
starts at Klasse 7; the profile setting should start the subject there and
offer Klasse 5 and 6 as optional.

### Structure

| NRW (KLP Praktische Philosophie 2024) | Bayern (LehrplanPLUS Gymnasium Ethik) |
|---|---|
| Inhaltsfelder: 1 Das Selbst, 2 Zwischenmenschliche Beziehungen, 3 Verantwortung, 4 Strukturen des Zusammenlebens, 5 Gegenwart und Zukunft, 6 Sinnsuche und Lebensentwürfe, 7 Menschliche Erkenntnis; two bands, end of Klasse 6 and end of Klasse 10 | Lernbereiche per year: 5 Wahrnehmung und Bedürfnisse, Familie, Spielen, Feste; 6 Judentum und Christentum, Umgang mit Medien, Dem Anderen begegnen, Konsum und Freizeit; 7 Islam, Konflikte und ihre Regelung, Erwachsen werden; 8 Sinnsuche, Soziales Engagement, Liebe, Freundschaft, Sexualität, Umwelt- und Tierethik; 9 Fernöstliche Religionen, Gewissen und Verantwortung, Friedensethik, Arbeitsethik; 10 Ursprünge des Philosophierens, Religionsphilosophie, Wirtschaftsethik, Medienethik |

Sources: nrw/text/klp_si_pp_2024_10_02.txt:403-475 (areas), 477-776
(Klasse 5/6), 777-1140 (Sek I); by/text/lehrplanplus-gym-ethik-jgs5.txt to
-jgs10.txt. The old NRW KLP (2008, nrw/text/pp_klp_5017_2008_05_06.txt)
expires from 2025/26 and is captured for reference only.

The domain `ethics` continues. Progressions:

| Progression | Content | NRW | Status |
|---|---|---|---|
| `ethics.self` | personality, feelings, roles, growing up, meaning, conscience | 1, 6 | continues |
| `ethics.together` | family, friendship, conflict, bullying, tolerance, justice, law, peace | 2, 4 | continues |
| `ethics.beliefs` | world religions, festivals, creation, religion and philosophy | 6 | continues |
| `ethics.modern-world` | media, consumption, environment, animals, work, economy, AI | 3, 5 | continues |
| `ethics.thinking` | perception, prejudice, arguments, ethical positions, thought experiments, philosophical questions | 7 | new: NRW gives it an Inhaltsfeld and Bayern a Lernbereich in 10 |

### Draft skills

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `perception-differs` | erklären, warum Menschen dasselbe unterschiedlich wahrnehmen | ESA (NRW 5/6 IF7; Bayern Eth5 LB1) |
| 5 | `illusions` | an Täuschungen zeigen, dass Wahrnehmung trügen kann | ESA (NRW 5/6 Wahrnehmung und Täuschung) |
| 5 | `personality-strengths` | meine Persönlichkeit mit Stärken und Schwächen beschreiben | ESA (NRW 5/6 IF1); builds on `what-i-can` |
| 5 | `emotions-actions` | erklären, wie Gefühle mein Handeln und das Zusammenleben beeinflussen | ESA (NRW 5/6 IF1; Bayern Eth5); builds on `feelings-show` |
| 5 | `needs-rules` | Bedürfnisse und Regeln in Beziehung setzen | ESA (Bayern Eth5); builds on `rules-why` |
| 5 | `waiting-for-reward` | abwägen, wann Verzicht auf sofortige Belohnung besser für mich und andere ist | ESA (Bayern Eth5) |
| 5 | `first-judgements` | erste Urteile darauf prüfen, ob sie Vorurteile sind | ESA (Bayern Eth5) |
| 5 | `family-forms` | Familie als Gemeinschaft mit Aufgaben für alle beschreiben, auch in verschiedenen Familienformen | ESA (Bayern Eth5 LB2; NRW 5/6 IF2) |
| 5 | `i-messages` | Ich-Botschaften formulieren und gut zuhören | ESA (Bayern Eth5, Eth7) |
| 5 | `fair-play` | begründen, warum Spiele Regeln und Fairness brauchen | ESA (Bayern Eth5 LB3); builds on `fair-unfair` |
| 5 | `festivals-cultures` | Feste und Rituale verschiedener Kulturen und Weltanschauungen vergleichen | ESA (Bayern Eth5 LB4; NRW 5/6 IF6); builds on `festivals-world` |
| 5 | `humans-animals-nature` | Verantwortung des Menschen für Tiere und Natur begründen | ESA (NRW 5/6 IF3); builds on `responsibility-animals` |
| 6 | `judaism` | Grundlagen des Judentums beschreiben (Tora, Sabbat, Synagoge) | ESA (Bayern Eth6); builds on `religions-places` |
| 6 | `christianity` | Grundlagen des Christentums beschreiben (Bibel, Jesus, Kirche) | ESA (Bayern Eth6) |
| 6 | `creation-science` | Schöpfungserzählungen und naturwissenschaftliche Erklärungen der Welt unterscheiden | ESA (Bayern Eth6) |
| 6 | `truth-truthfulness` | Wahrheit, Wahrhaftigkeit und Lüge unterscheiden und Lügen beurteilen | ESA (NRW 5/6 IF3); builds on `truth-lie` |
| 6 | `justice-principles` | Gerechtigkeit nach Gleichheit, Bedarf und Leistung unterscheiden | ESA (NRW 5/6 IF4); builds on `justice-sharing` |
| 6 | `media-influence` | erkennen, wie Medien meine Meinung beeinflussen | ESA (Bayern Eth6 LB2; NRW 5/6 IF7) |
| 6 | `screen-time` | meine Mediennutzung prüfen und Regeln für mich finden | ESA (Bayern Eth6 LB2); builds on `media-habits` |
| 6 | `online-contacts` | Chancen und Gefahren von Kontakten im Internet abwägen | ESA (Bayern Eth6 LB2); see `computing` `messaging-risks` |
| 6 | `tolerance-solidarity` | Toleranz, Solidarität und Freundschaft unterscheiden | ESA (Bayern Eth6 LB3) |
| 6 | `saying-no` | auf faire Weise Nein sagen | ESA (Bayern Eth6 LB3) |
| 6 | `consumer-pressure` | Werbung und Gruppendruck beim Konsum durchschauen | ESA (Bayern Eth6 LB4; NRW 5/6 IF5) |
| 6 | `consumption-effects` | Folgen meines Konsums für Menschen in anderen Ländern und die Umwelt beschreiben | ESA (Bayern Eth6; NRW 5/6 IF5) |
| 6 | `life-dreams` | materielle und immaterielle Wünsche und Lebensträume unterscheiden | ESA (NRW 5/6 IF6); builds on `wishes` |
| 7 | `islam` | Grundlagen des Islam beschreiben (Koran, fünf Säulen, Moschee) | ESA (Bayern Eth7) |
| 7 | `abrahamic-common` | Gemeinsamkeiten von Judentum, Christentum und Islam benennen | ESA (Bayern Eth7) |
| 7 | `muslims-islamists` | zwischen Muslimen und Islamisten unterscheiden | MSA (Bayern Eth7); check wording with a reviewer |
| 7 | `conflict-causes` | Ursachen von Konflikten erkennen (Interessen, Wahrnehmung, Vorurteile) | ESA (Bayern Eth7 LB2) |
| 7 | `conflict-solving` | Konflikte gewaltfrei lösen (Kompromiss, Vereinbarung) | ESA (Bayern Eth7 LB2) |
| 7 | `handling-anger` | mit Wut in einem Streit umgehen | ESA (Bayern Eth7 LB2) |
| 7 | `bullying` | Mobbing und Cybermobbing erkennen und als Zuschauer helfen | ESA (Bayern Eth7 LB2, NT7 2.2) |
| 7 | `growing-up` | Freiheit und Verantwortung im Jugendalter abwägen | ESA (Bayern Eth7 LB3; NRW 7 to 10 IF1) |
| 7 | `roles-identity` | Rollen und Erwartungen erkennen, die meine Identität prägen | ESA (Bayern Eth7 LB3; NRW 5/6 IF1) |
| 7 | `diversity-respect` | Vielfalt in Herkunft, Glauben, Geschlecht und sexueller Orientierung respektieren | ESA (NRW 5/6 IF2; Bayern Eth8 LB3); respect only, no sex education (../omitted.md) |
| 7 | `reason-emotion` | die Rolle von Vernunft und Gefühl bei Entscheidungen vergleichen | MSA (NRW 7 to 10 IF1) |
| 8 | `meaning-of-life` | Möglichkeiten, Sinn im Leben zu finden, vergleichen | ESA (Bayern Eth8 LB1; NRW 7 to 10 IF6) |
| 8 | `group-pressure` | Gruppendruck erkennen und mich ihm widersetzen | ESA (Bayern Eth8 LB1) |
| 8 | `volunteering` | soziales Engagement würdigen und Möglichkeiten für mich finden | ESA (Bayern Eth8 LB2) |
| 8 | `friendship-love` | in Freundschaft und Liebe verantwortungsvoll mit eigenen und fremden Gefühlen umgehen, auch mit Enttäuschung | ESA (Bayern Eth8 LB3, without the sexuality part) |
| 8 | `expectations` | Erwartungen anderer an mich prüfen | ESA (Bayern Eth8 LB3) |
| 8 | `environmental-ethics` | Begründungen für Umweltschutz und Nachhaltigkeit vergleichen | ESA (Bayern Eth8 LB4; NRW 7 to 10 IF5) |
| 8 | `animal-ethics` | den moralischen Status von Tieren an Beispielen diskutieren (Haltung, Ernährung, Versuche) | MSA (Bayern Eth8 LB4) |
| 8 | `emotional-images` | erkennen, wie Bilder und Filme Gefühle für eine Sache wecken | ESA (Bayern Eth8 LB4) |
| 8 | `freedom-responsibility` | Freiheit und Verantwortung bei Entscheidungen abwägen | MSA (NRW 7 to 10 IF3) |
| 8 | `civil-courage` | Zivilcourage an Beispielen beurteilen | ESA (NRW 7 to 10 IF3) |
| 8 | `digital-values` | Chancen und Risiken von sozialen Medien und KI nach Werten beurteilen | MSA (NRW 7 to 10 IF3, IF4); see `computing` `ai-impact` |
| 9 | `hinduism` | Grundlagen des Hinduismus beschreiben | ESA (Bayern Eth9) |
| 9 | `buddhism` | Grundlagen des Buddhismus beschreiben | ESA (Bayern Eth9) |
| 9 | `conscience` | erklären, was das Gewissen ist und was es beeinflusst | MSA (Bayern Eth9 LB2) |
| 9 | `nonviolent-communication` | Gewaltfreie Kommunikation und Deeskalation anwenden | ESA (Bayern Eth9 LB3) |
| 9 | `war-and-peace` | Pazifismus und die Lehre vom gerechten Krieg vergleichen | MSA (Bayern Eth9 LB3; NRW 7 to 10 IF5) |
| 9 | `work-meaning` | den Wert von Arbeit für ein gutes Leben beurteilen | ESA (Bayern Eth9 LB4) |
| 9 | `achievement` | das Leistungsprinzip kritisch einordnen | MSA (Bayern Eth9 LB4) |
| 9 | `ethical-positions` | ethische Positionen unterscheiden (Folgen, Pflicht, Tugend) | G (NRW 7 to 10 IF3 names "ethische Positionen" without listing them); check |
| 9 | `value-conflicts` | Wertekonflikte beschreiben und eine begründete Entscheidung treffen | MSA (NRW 7 to 10 IF3); builds on `dilemmas` |
| 9 | `prejudice-origin` | erklären, wie Vorurteile entstehen und sich verbreiten, und Wege dagegen finden | ESA (NRW 7 to 10 IF7) |
| 9 | `filter-bubbles` | den Einfluss von Peergroup und Filterblasen auf meine Urteile erkennen | ESA (NRW 7 to 10 IF7); see `computing` `platform-power` |
| 10 | `philosophical-questions` | philosophische Fragen von Alltagsfragen unterscheiden und selbst stellen | MSA (Bayern Eth10 LB1); builds on `big-questions` |
| 10 | `thought-experiments` | Gedankenexperimente durchführen und ihren Nutzen erklären | MSA (Bayern Eth10 LB1) |
| 10 | `myth-philosophy` | mythisches und philosophisches Denken unterscheiden (Vorsokratiker) | G (Bayern Eth10 LB1) |
| 10 | `socratic-questions` | wie Sokrates fragen, um eine Meinung zu prüfen | MSA (Bayern Eth10 LB1) |
| 10 | `religion-worldviews` | religiöse und nichtreligiöse Überzeugungen vergleichen und respektieren | MSA (Bayern Eth10 LB2; NRW 7 to 10 IF6) |
| 10 | `god-question` | Argumente zur Frage nach Gott prüfen (Theodizee, Gottesbeweise) | G (Bayern Eth10 LB2); check |
| 10 | `extremism` | Gefahren von religiösem und politischem Extremismus erkennen | MSA (Bayern Eth10 LB2; NRW 7 to 10 IF2); check wording |
| 10 | `business-ethics` | wirtschaftliches Handeln nach Gerechtigkeit beurteilen (Fair Trade, homo oeconomicus) | MSA (Bayern Eth10 LB3) |
| 10 | `media-ethics` | die Verantwortung von Medienmachern und Nutzern beurteilen (Pressekodex, Inszenierung) | MSA (Bayern Eth10 LB4) |
| 10 | `law-justice` | das Verhältnis von Recht, Gerechtigkeit und Rechtsstaat erklären | MSA (NRW 7 to 10 IF4); see Politik |
| 10 | `utopia-dystopia` | Utopien und Dystopien vergleichen und ihre Funktion erklären | MSA (NRW 7 to 10 IF5) |
| 10 | `good-life` | Vorstellungen vom gelingenden Leben vergleichen (Glück, Eudaimonie) | MSA (NRW 7 to 10 IF6) |

Counts: 12, 13, 11, 11, 11, 12 = 70. About 140 lessons.

As in Grundschule, Ethik tasks never mark one opinion as right where
reasonable people disagree. Knowledge (what Muslims believe, what
Pazifismus means) is checked as right or wrong; judgements use the "pick
the reasons that fit" task (../fun.md).

---

## Overlaps and prerequisites

| Skill area | Also in | Plan |
|---|---|---|
| binary numbers, number systems | Mathe | `computing` `binary-numbers` teaches coding; Mathe owns place value. Link, do not reteach |
| spreadsheets, correlation, data diagrams | Mathe (Daten und Zufall) | `spreadsheet-formulas`, `correlation-causation` link to the Mathe data skills |
| logic gates, circuits, sensors | Physik (naturwissenschaften.md) | Physik owns the electric circuit; `logic-gates` starts from switches in series and parallel |
| sound and acoustics | Physik | `music` `sound-waves` is E and links to the Physik skill |
| media, fake news, sources, data protection, AI | Deutsch (Medien), Politik (gesellschaft.md), Ethik, Informatik | one owner each: source checking in `computing` `search-evaluate`; value judgements in `ethics` `media-influence`, `digital-values`, `media-ethics`; law and democracy in Politik |
| copyright, image rights, licences | Informatik, Kunst, Musik | `computing` `copyright-sources`, `image-rights`, `licence-models` first; `art` `image-licences` and `music` `streaming-copyright` apply them |
| epochs (Antike, Mittelalter, Renaissance, Barock, 19th century) | Geschichte (gesellschaft.md) | Kunst and Musik assume the Geschichte timeline; the time-travel hook from ../fun.md is shared |
| perspective, proportion, golden ratio, floor plans | Mathe (Geometrie) | Kunst skills link to them |
| world religions, sacred buildings | Ethik, Kunst, Geschichte | `ethics.beliefs` owns belief; `art` `sacred-buildings` owns form |
| consumption, work, economy | Wirtschaft (gesellschaft.md) | Ethik judges, Wirtschaft explains |
| animals, environment | Biologie | Ethik judges, Biologie explains |

Grundschule end state each subject builds on: Musik `note-names`,
`eighth-notes`, `time-signatures`, `rondo-canon`, `orchestra`,
`composers`; Kunst `colour-wheel`, `art-times-cultures`, `camera-view`,
`art-mood`; Ethik `dilemmas`, `big-questions`, `media-habits`,
`justice-sharing`; Sachunterricht `algorithms`, `code-encoding`,
`computer-parts`, `media-reality`.

## Out of scope

To add to ../omitted.md with these reasons (not done in this pass):

| What | Status | Reason |
|---|---|---|
| Informatik projects and team work (Bayern NT6 2.2, NT7 2.4, Inf10 LB3; NRW Kommunizieren und Kooperieren) | out | need a team and weeks of work; Twist teaches the steps (plan, model, test) inside skills |
| Handling named office products (Bayern NT6 2.1 Softwarebeherrschung) | out | product interfaces change; Twist teaches the concepts (file, format, object) |
| Bayern's object view of documents in NT6 (Punktnotation, Klassendiagramm for text and graphics) | later | one Land's didactic route; objects come in `objects-classes` (Klasse 10) |
| Real hardware (microcontrollers, robots) | out (in class) | Twist simulates sensors and actuators in `sensors-actuators` |
| A full programming environment | out | Twist uses a small in-app editor with a Python subset; bigger programs belong in class |
| Medienbildung and Informatik "as subjects: out" in ../omitted.md | change | true for Grundschule only; from Klasse 5 Informatik is a subject in most Länder and gets the `computing` domain |
| Singing, playing, dancing, staging, conducting, composing for performance (NRW Produktion; Bayern LB 1 and 3) | out | done together in class, as in Grundschule |
| Bayern MuG-only items (Generalbass, harmonising with voice-leading rules, conducting, chamber music forms) | out | one school profile in one Land |
| Painting, drawing, printing, modelling, model building, fashion design, photography and film projects, exhibitions | out | done with real material, as in Grundschule |
| Bayern MuG-only items in Kunst (exhibition concepts, performative interventions) | out | one school profile in one Land |
| Liebe, Freundschaft, Sexualität: the sexuality part (Bayern Eth8 LB3) | out | follows the sex-education decision in ../omitted.md; friendship and respect are taught |
| Grenzerfahrungen, illness, death, origin and limits of life (NRW 5/6 and 7 to 10 IF6) | open | same open decision as Grundschule; sensitive for a child alone with an app |
| A current war as a case study (Bayern Eth9 LB3) | out | dated fast and distressing; Twist teaches the concepts with historical cases |
| Planning a festival, inventing a game, class mediation (Bayern Eth5, Eth7) | out | need other children |

## Task types and drawn components

New ones only. Already planned for Grundschule: stave, graphic notation,
tap the rhythm, colour mixer, colour wheel, camera frame, timeline,
choose-your-path, sequence of moves on a grid, block code editor.

| Item | Kind | For |
|---|---|---|
| text code editor with runner (Python subset, run in the browser, hidden tests) | task type | `text-programming` and later algorithm skills |
| flowchart and Struktogramm builder | task type and drawing | `flowcharts`, `control-structures` |
| bit cards (flip bits, see the number or letter) | drawing | `binary-numbers`, `encoding-text`, `binary-adder` |
| pixel grid (paint pixels, see the numbers) | drawing | `pixel-images`, `pixel-vector`, `additive-mixing` |
| cipher wheel and Skytale | drawing | `transposition-cipher`, `caesar-cipher` |
| logic circuit builder with truth table | task type and drawing | `logic-gates`, `binary-adder` |
| state diagram builder and simulator | task type and drawing | `automata-everyday`, `finite-automata` |
| decision tree builder (sort cards, tree grows) | task type | `decision-tree`, `training-data-bias` |
| network map with a moving packet | drawing | `internet-structure`, `message-path`, `network-layers` |
| folder tree (drag files into folders) | task type | `files-folders` |
| mini spreadsheet | task type | `spreadsheet-formulas`, `data-flow` |
| table with SQL runner (small in-browser database) | task type | `database-tables`, `sql-queries` |
| message inspector (tap the parts of a phishing message that give it away) | task type, extends label-a-picture | `malware-scams`, `messaging-risks` |
| piano keyboard linked to the stave | drawing | `whole-half-steps`, `major-scale`, `intervals`, `triads`, `cadence` |
| bass clef on the stave | drawing, extends the stave | `treble-bass-clef` |
| hear and pick (interval, chord, style, era) | task type, extends listening tasks | ear-training and history skills |
| listening map (audio with a time bar; tap when the section changes) | task type | `song-forms`, `sonata-form`, `film-music` |
| score follower (bars light up during playback) | drawing | `score-reading`, `symphony` |
| perspective overlay (drag lines on a painting, find vanishing point and horizon) | task type and drawing | `linear-perspective`, `two-point-perspective`, `depth-cues` |
| composition overlay (axes, thirds, golden ratio) | drawing | `composition-lines`, `golden-ratio`, `order-principles` |
| before and after slider (original and edited photo) | drawing | `staged-documentary-photo`, `reproduction` |
| photo settings simulator (focus, focal length, light) | drawing | `photo-means` |
| argument map (drag reasons and counter-reasons to a claim) | task type | `value-conflicts`, `ethical-positions`, `war-and-peace` |

## Fun: hooks for ages 10 to 16

../fun.md applies. At 10 to 16 a child wants challenge, real use, a
record to beat and to be taken seriously; a mascot pose and "Wusstest
du?" lines still work at 10 and wear thin by 14, so from Klasse 7 the
voice gets drier and the surprises turn into real-world facts.

| Subject | Hook | What it is | Used in |
|---|---|---|---|
| Informatik | Par score | Each programming puzzle has a block count to beat; the child sees their own best | `block-programming`, `block-loops-conditions`, `control-structures` |
| Informatik | Escape room | Locked doors open with a cracked cipher, a binary code or a correct automaton | `caesar-cipher`, `binary-numbers`, `finite-automata` |
| Informatik | Train it, break it | The child trains a decision tree on picture cards, then a skewed card set shows how it fails | `decision-tree`, `training-data-bias` |
| Informatik | Scam spotter | Real-looking messages, adverts and logins; find the trap before the timer runs out | `malware-scams`, `messaging-risks`, `passwords` |
| Informatik | Make something that runs | Each text-programming lesson ends with a small program the child can keep (a quiz, a dice game) | `text-programming`, `functions-parameters`, `lists-arrays` |
| Musik | Ear streak | Interval and chord rounds that count a streak and a personal best | `intervals-by-ear`, `triads`, `minor-scale` |
| Musik | Rescore the scene | A short silent clip; the child picks music and sees the mood change | `film-music`, `music-emotion`, `advertising-music` |
| Musik | Beat lab | A loop grid where the child builds a groove, then hears where the off-beat sits | `syncopation-groove`, `pop-styles`, `digital-audio` |
| Musik | Name the era | Short clips to place on the timeline, against the clock | `music-eras`, `baroque-court-music`, `viennese-classic` |
| Kunst | Art detective | A painting has gone missing; the child identifies it by epoch, technique and iconography | `romanesque-gothic`, `iconography`, `impressionism` |
| Kunst | Find the vanishing point | Drag lines on real paintings and photos of streets | `linear-perspective`, `two-point-perspective` |
| Kunst | Real or edited | Pairs of photos; find the edit and say what it changes | `staged-documentary-photo`, `self-presentation` |
| Kunst | Logo critic | Rate real-style (invented) logos and posters on clear criteria, then see the designer's notes | `communication-design`, `fonts-effect` |
| Ethik | What would you do | Choose-your-path dilemmas at teenage scale (group chat, party, part-time job); afterwards the child sees which reasons others found strongest | `group-pressure`, `bullying`, `civil-courage`, `value-conflicts` |
| Ethik | Thought experiments | Short classic puzzles (the ring of Gyges, the experience machine) to argue with | `thought-experiments`, `good-life`, `philosophical-questions` |
| Ethik | Ask like Socrates | A scripted dialogue where the child picks the next question and watches a claim fall apart or hold | `socratic-questions`, `first-judgements` |

"Others found strongest" needs aggregated answers from other children;
check with the DPO before building it, or replace it with reasons written
by the authors.

## Rights

- Musik: composers who died in 1955 or earlier are public domain in the
  EU (Mozart to Debussy, Bartók, Schönberg, Ives, Prokofiev). Strawinsky
  (died 1971) and Bernstein (died 1990), both options in Bayern Mu6 and
  Mu7, are protected: pick Bartók and Dvořák, or license. Pop, rap, film
  music and most jazz recordings need licences or recordings made for
  Twist; cover-version and pop-style skills should use music written for
  Twist in each style. Recordings carry their own rights (70 years).
- Kunst: works by artists who died in 1955 or earlier, as in Grundschule.
  Street art, pop art, performance and most twentieth-century design are
  protected (Warhol, Beuys, Haring); license or use works made for Twist.
  Press photos are protected; `staged-documentary-photo` needs our own
  photos or licensed ones.
- Informatik: example apps, logos and messages are invented; never show a
  real brand in a phishing example.

## Sources

### Captured (2026-10-24)

Fetch log: rnd/official-de/fetch-log.jsonl lines 80 to 161 (my entries
among other agents' lines).

| Issuer | Document | Path (rnd/official-de/) | Covers |
|---|---|---|---|
| GI | Bildungsstandards Informatik für die Sekundarstufe I (2025), CC0 | gi/raw/Bildungsstandards_Sek_I_2025__pdf-A_.pdf, gi/text/ | Informatik |
| KMK | Bildung in der digitalen Welt (2016) | kmk/raw/2016_12_08-Bildung-in-der-digitalen-Welt.pdf, kmk/text/ | Informatik, media |
| KMK | Zur Situation des Unterrichts in den Fächern Ethik, Philosophie, L-E-R, Werte und Normen (2008, as amended 2020) | kmk/raw/2008_02_22-Situation-Ethik-Unterricht.pdf, kmk/text/ | Ethik |
| NRW | KLP Informatik Klasse 5 und 6 (2021) | nrw/raw/si_kl5u6_if_klp_2021_07_01.pdf, nrw/text/ | Informatik |
| NRW | KLP Informatik Wahlpflicht Gymnasium (2023) | nrw/raw/g9_wpif_klp_2023_06_01.pdf, nrw/text/ | Informatik |
| NRW | KLP Musik Gymnasium G9 (2019) | nrw/raw/g9_mu_klp_3406_2019_06_23_0.pdf, nrw/text/ | Musik |
| NRW | KLP Kunst Gymnasium G9 (2019) | nrw/raw/g9_ku_klp_3405_2019_06_23.pdf, nrw/text/ | Kunst |
| NRW | KLP Praktische Philosophie Sek I (2024, in force from 2025/26) | nrw/raw/klp_si_pp_2024_10_02.pdf, nrw/text/ | Ethik |
| NRW | KLP Praktische Philosophie (2008, expiring) | nrw/raw/pp_klp_5017_2008_05_06.pdf, nrw/text/ | Ethik, reference |
| Bayern | LehrplanPLUS Gymnasium Musik 5 to 10 | by/raw/lehrplanplus-gym-musik-jgs5.html to -jgs10.html, by/text/ | Musik |
| Bayern | LehrplanPLUS Gymnasium Kunst 5 to 10 | by/raw/lehrplanplus-gym-kunst-jgs5.html to -jgs10.html, by/text/ | Kunst |
| Bayern | LehrplanPLUS Gymnasium Ethik 5 to 10 | by/raw/lehrplanplus-gym-ethik-jgs5.html to -jgs10.html, by/text/ | Ethik |
| Bayern | LehrplanPLUS Gymnasium Natur und Technik 5 to 7 | by/raw/lehrplanplus-gym-nt-jgs5.html to -jgs7.html, by/text/ | Informatik |
| Bayern | LehrplanPLUS Gymnasium Informatik 9 and 10 (NTG) | by/raw/lehrplanplus-gym-informatik-jgs9.html, -jgs10.html, by/text/ | Informatik |

Key lines: GI content areas gi/text/…:686 (ID), 735 (AL), 779 (SA), 815
(IS), 861 (IMG). NRW Informatik 5/6 expectations
nrw/text/si_kl5u6_if_klp_2021_07_01.txt:505-610 (binary 523, units 525,
transposition 528, flowchart 545, visual programming 549, modularisation
551, decision tree 571, neural networks 573, EVA 591). The italics that
mark Gymnasium-only items are lost in pdftotext; they were read with
`pdftohtml -xml` from the raw PDF. NRW WP Informatik
nrw/text/g9_wpif_klp_2023_06_01.txt:594-735. Bayern NT6 Informatik
by/text/lehrplanplus-gym-nt-jgs6.txt:1142, 1330, 1379; NT7
lehrplanplus-gym-nt-jgs7.txt:386, 472, 550, 597.

The Bayern nt_gym pages for 6 and 7 were fetched at the same second by
this agent and the naturwissenschaften agent; fetch-log.jsonl has two
identical lines each (same sha256). Nothing was lost.

### Still to fetch

| Priority | Issuer | Document | For |
|---|---|---|---|
| 1 | GI, Stifterverband | Informatik-Monitor 2025/26, full report | which Länder teach Informatik in which Klassen |
| 1 | KMK SWK | Digitalisierung im Bildungssystem (2022), the recommendation on Informatik | Informatik status |
| 2 | Bayern | LehrplanPLUS Realschule IT and Mittelschule Informatik; Realschule Musik, Kunst, Ethik | ESA and MSA marks, "later in RS" |
| 2 | NRW | KLP Realschule Musik and Kunst | "later in RS" |
| 2 | BW | Bildungsplan 2016 Gymnasium Informatik (Aufbaukurs Klasse 7), Ethik from Klasse 5 | second check; BW start of Ethik |
| 3 | Niedersachsen | KC Werte und Normen; KC Informatik 9/10 | Ethik and Informatik second check |
| 3 | Berlin/Brandenburg | Rahmenlehrplan Teil C Ethik (7 to 10), L-E-R | Ethik start at 7 |
| 3 | Hamburg | Bildungsplan Philosophie Sek I | start Klasse |

## Size and benchmark

| Subject | Twist skills | Twist lessons | Benchmark (de) |
|---|---|---|---|
| Informatik | 74 (+1 E) | about 165 | one course, Klasse 5 to 7, 5 lessons and 34 exercises, all on information and data (binary, data units, text coding, pixel graphics) |
| Musik | 65 (+1 E) | about 130 | two courses to Klasse 5, 34 lessons; mostly instruments, notes and rhythm; nothing beyond Klasse 5 |
| Kunst | 66 | about 130 | none |
| Ethik | 70 | about 140 | none |

The benchmark is thin for these subjects, so size here follows the
curricula: about 11 to 15 skills per Klasse, at Bayern's pace of one
skill for every 4 to 8 class hours of the app-suitable Lernbereiche.
Priority stays as in Grundschule: Informatik is the one with weight
(compulsory in most Länder, and a natural fit for an app); Musik, Kunst
and Ethik follow.
