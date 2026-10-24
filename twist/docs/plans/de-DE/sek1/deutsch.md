# Deutsch, Klasse 5 to 10

Drafted 2026-10-24. Continues the Grundschule Deutsch course (../deutsch.md,
174 skills in Klasse 1 to 4) to the end of Sekundarstufe I. Follows the
conventions in README.md.

## Summary

| | |
|---|---|
| Domain | `lit-de`, continued. 11 existing progressions extended, 11 new ones |
| Frameworks | KMK Bildungsstandards Deutsch für den Ersten und den Mittleren Schulabschluss (2022, decided 23.06.2022, the current edition); NRW Kernlehrplan Gymnasium Sek I Deutsch (G9, 2019); Bayern LehrplanPLUS Deutsch Gymnasium 5 to 10 and Realschule 5 to 10; Berlin/Brandenburg Rahmenlehrplan Teil C Deutsch (2024) as a third check, already captured |
| Skills | 254 (Klasse 5: 48, 6: 47, 7: 46, 8: 42, 9: 38, 10: 33) |
| Lessons | about 540 (2 per skill; 3 to 4 for Passiv, Konjunktiv, indirekte Rede, Inhaltsangabe, Erörterung, Textanalyse, Interpretation) |
| Notes used | 196 ESA, 52 MSA, 4 G, 2 E; 10 marked "later in RS"; 12 marked "check" |
| Writing | taught in full, practised through structure, choice and correction tasks; free texts get a self-check and never count for mastery (section "Writing: practice and checks") |
| Readings | public domain texts (authors who died 1955 or earlier) and texts written for Twist; no copyrighted class readings |

## Structure

### Official areas

| Source | Areas (exact names) | Bands |
|---|---|---|
| KMK ESA/MSA (2022) | Sprechen und Zuhören; Schreiben; Lesen; Sich mit Texten und anderen Medien auseinandersetzen; Sprache und Sprachgebrauch untersuchen | end of Klasse 9 (ESA), end of Klasse 10 (MSA) |
| NRW Gymnasium (2019) | Kompetenzbereiche Rezeption and Produktion, across four Inhaltsfelder: Sprache; Texte; Kommunikation; Medien | Erprobungsstufe (5 and 6), erste Stufe (7 and 8), zweite Stufe (9 and 10) |
| Bayern LehrplanPLUS (Gymnasium and Realschule) | Lernbereich 1 Sprechen und Zuhören; 2 Lesen, mit Texten und weiteren Medien umgehen; 3 Schreiben; 4 Sprachgebrauch und Sprache untersuchen und reflektieren (Gymnasium adds 5, a profile area at music schools, not used) | one plan per Jahrgangsstufe |
| Berlin/Brandenburg Teil C (2024) | Sprechen und Zuhören; Schreiben; Lesen; Mit Texten und anderen Medien umgehen; Sprachwissen und Sprachbewusstheit entwickeln | Niveaustufen; Gymnasium Klasse 7 = E, 8 = F, 9 = G, 10 = H |

The KMK ESA and MSA standards are printed side by side and are nearly the
same. The MSA adds, among others: Novelle, Komödie and Tragödie; Epoche as
context; Wort-, Satz- und Gedankenfiguren; Montage, Kamerabewegung and
Schnitt; paraphrasing; Kommentar, Leserbrief, Interpretation and Lebenslauf
as text types; algorithms and user profiles analysed in general rather than
"am Beispiel". Grammar (Tempus, Modus, Genus verbi), Erörterung,
Inhaltsangabe, Bewerbungsanschreiben, zitieren, Sprachwandel and the full
set of punctuation marks are in both. So most grammar and writing skills
carry ESA, and literature and analysis skills move to MSA.

Placement follows the Gymnasium order. Bayern gives one plan per year and
is the main year check; NRW bands of two years confirm the band. Where
Bayern Realschule teaches a topic later than Bayern Gymnasium, the note says
"later in RS". Berlin/Brandenburg places several grammar terms later than
Bayern (Konjunktiv I at F, Konjunktiv II at G, Metrum and literary epochs at
H); this is mentioned where it matters but does not move a skill.

### Twist progressions

Existing progressions continue with new skills; 11 new progressions cover
what Grundschule does not have. Full ids are `lit-de.<progression>.<slug>`;
the tables give `<progression>.<slug>`.

| Progression | Status | Covers | Grundschule prerequisite |
|---|---|---|---|
| `lit-de.nouns` | extended | declension, pronoun types | `nouns.cases`, `nouns.pronouns` |
| `lit-de.verbs` | extended | stem forms, Plusquamperfekt, Futur II, Passiv, Konjunktiv, indirekte Rede | `verbs.tenses-mixed`, `verbs.future` |
| `lit-de.adjectives` | extended | adjective endings | `adjectives.agreement` |
| `lit-de.word-classes` | new | Wortarten overview with Latin terms, Präposition, Adverb, Konjunktion/Subjunktion, flektierbar and unflektierbar | `nouns.recognise`, `verbs.recognise`, `adjectives.recognise` |
| `lit-de.sentences` | extended | Satzglieder, Attribute, Gliedsätze, Satzgefüge, Feldermodell, Infinitiv- und Partizipgruppen, Nominalstil | `sentences.objects`, `sentences.place-time`, `sentences.conjunctions` |
| `lit-de.punctuation` | new | all comma rules, Zitat, Semikolon, Doppelpunkt, Gedankenstrich, Klammern | `sentences.list-commas`, `sentences.direct-speech-positions` |
| `lit-de.spelling` | extended | Dehnung, Schärfung, s-Laute, Groß- und Kleinschreibung, Getrennt- und Zusammenschreibung, Fremdwörter, das/dass | `spelling.das-dass`, `spelling.capital-advanced` |
| `lit-de.spelling-strategies` | extended | error analysis, digital spelling help | `spelling-strategies.choose-strategy` |
| `lit-de.vocabulary` | extended | Wortbildung, Synonyme, Fremdwörter, Fachwortschatz, Bedeutungswandel | `vocabulary.word-fields`, `vocabulary.foreign-words` |
| `lit-de.language-use` | new | Sprache reflektieren: Varietäten, Kommunikationsmodell, Register, Sprachwandel, diskriminierende Sprache, rhetorische Mittel | `vocabulary.spoken-written`, `vocabulary.languages`, `vocabulary.language-effect` |
| `lit-de.comprehension` | extended | Lesestrategien, kritisches Lesen | `comprehension.strategies` |
| `lit-de.nonfiction` | new | Sachtexte, diskontinuierliche Texte, journalistische Textsorten, Argumentation in Sachtexten, Reden | `texts-media.tables-charts`, `comprehension.find-information` |
| `lit-de.narrative` | new | epische Texte: Fabel, Sage, Kurzprosa, Kurzgeschichte, Novelle, Jugendbuch; Erzähler, Figuren, Handlung | `texts-media.fables-legends`, `texts-media.story-elements`, `texts-media.character-perspective` |
| `lit-de.poetry` | new | Lyrik: Vers, Reim, Metrum, Bilder, Sprecher, Ballade, Sonett, Expressionismus | `texts-media.poems`, `texts-media.ballads`, `texts-media.recite` |
| `lit-de.drama` | new | Szene, Akt, Dialog, Konflikt, Komödie und Tragödie, Inszenierung | `speaking.tell` (no drama skill in Grundschule) |
| `lit-de.literary-history` | new | Epochen and context | `world.time` timeline skills |
| `lit-de.texts-media` | extended | media analysis: film, Hörspiel, Werbung, soziale Medien, Quellenprüfung, Urheberrecht | `texts-media.media-use`, `texts-media.digital-texts`, `texts-media.research` |
| `lit-de.writing` | extended | planning, erzählen, beschreiben, berichten, schildern, Protokoll, Bewerbung, überarbeiten | `writing.plan`, `writing.report`, `writing.revise` |
| `lit-de.summary` | new | Inhaltsangabe, Paraphrase, Zitieren, Mitschrift, Exzerpt, Quellenangaben | `comprehension.notes` |
| `lit-de.argument` | new | Behauptung, Begründung, Beispiel; Stellungnahme, Leserbrief, Erörterung, Kommentar, Essay | `writing.opinion`, `speaking.argue` |
| `lit-de.analysis` | new | writing about texts: Deutungshypothese, Textbelege, Charakterisierung, Textanalyse, Interpretation | `texts-media.character-perspective` |
| `lit-de.speaking` | extended | Referat, Präsentation, Diskussion, Debatte, Vorstellungsgespräch, Feedback | `speaking.short-talk`, `speaking.interview` |

Not continued: `phonological`, `letters`, `decoding`, `fluency` and
`handwriting` end in Grundschule. Fluency reading aloud continues inside
`poetry.recite` and the speaking skills.

## Draft skills

The note column uses the README conventions: **ESA**, **MSA**, **G**
(Gymnasium only), **later in RS** (with the Bayern Realschule year),
**E** (enrichment, with reason) and **check** (confirm when writing the
framework record). Länder that differ are named in the note.

### Klasse 5

Klasse 5 starts where Klasse 4 ends (four cases, Perfekt and Futur I,
Satzglieder with objects and Orts- und Zeitangaben, das/dass, Bericht,
Meinung, Ballade). It adds the Latin terms, the remaining tenses and the
Haupt- und Nebensatz.

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 5 | `word-classes.overview` | die Wortarten mit ihren Fachbegriffen bestimmen (Substantiv, Verb, Adjektiv, Artikel, Pronomen, Präposition, Konjunktion) | ESA; Latin terms from Klasse 5 in Bayern |
| 5 | `nouns.declension` | Nomen mit Artikel in allen vier Fällen deklinieren und Genus, Numerus und Kasus bestimmen | ESA |
| 5 | `nouns.pronouns-personal-possessive` | Personal- und Possessivpronomen unterscheiden und richtig beugen | ESA |
| 5 | `adjectives.declension` | Adjektive nach bestimmtem und unbestimmtem Artikel richtig beugen (der große Hund, ein großer Hund) | ESA |
| 5 | `word-classes.prepositions` | Präpositionen erkennen und sagen, welchen Fall sie verlangen (mit dem, für den, wegen des) | ESA |
| 5 | `word-classes.conjunctions` | nebenordnende Konjunktionen und unterordnende Subjunktionen unterscheiden | ESA |
| 5 | `verbs.stem-forms` | die Stammformen starker und unregelmäßiger Verben bilden (singen, sang, gesungen) | ESA; with a drill bank |
| 5 | `verbs.finite-infinite` | finite und infinite Verbformen unterscheiden (Infinitiv, Partizip I und II) | ESA |
| 5 | `verbs.past-perfect` | das Plusquamperfekt bilden und für das Frühere in der Vergangenheit nutzen | ESA |
| 5 | `verbs.tense-in-texts` | die passende Zeitform für einen Text wählen und durchhalten (Erzählen im Präteritum) | ESA |
| 5 | `sentences.operations` | mit Umstell-, Ersatz-, Weglass- und Erweiterungsprobe Sätze untersuchen | ESA |
| 5 | `sentences.parts-review` | Subjekt, Prädikat, Dativ- und Akkusativobjekt sicher bestimmen | ESA |
| 5 | `sentences.adverbials` | Adverbiale der Zeit, des Ortes, der Art und Weise und des Grundes erfragen und bestimmen | ESA |
| 5 | `sentences.main-sub-clauses` | Haupt- und Nebensatz an der Stellung des Verbs unterscheiden | ESA |
| 5 | `punctuation.main-sub-comma` | das Komma zwischen Haupt- und Nebensatz setzen | ESA |
| 5 | `punctuation.list-and-contrast` | Kommas bei Aufzählungen und vor aber, sondern, doch setzen | ESA |
| 5 | `punctuation.address-interjection` | Kommas bei Anrede und Ausruf setzen (Lea, komm her! Ach, ist das schön.) | ESA |
| 5 | `spelling.long-vowel-marks` | lange Vokale richtig schreiben (ie, Dehnungs-h, Doppelvokal, ohne Zeichen) | ESA |
| 5 | `spelling.open-closed-syllables` | mit offenen und geschlossenen Silben begründen, wann ein Doppelkonsonant kommt | ESA |
| 5 | `spelling.s-ss-sz` | s, ss und ß richtig schreiben, auch bei wechselnden Verbformen (fließen, floss) | ESA |
| 5 | `spelling.capitals-signals` | Nominalisierungen an Signalwörtern erkennen und großschreiben (das Lesen, beim Spielen, etwas Neues) | ESA |
| 5 | `spelling-strategies.error-analysis` | meine Fehler nach Fehlerart ordnen und die passende Strategie wählen | ESA |
| 5 | `vocabulary.word-formation` | Wörter durch Zusammensetzung und Ableitung bilden (Präfix, Stamm, Suffix) | ESA |
| 5 | `vocabulary.synonyms-antonyms-homonyms` | Synonyme, Antonyme und Homonyme unterscheiden und treffend einsetzen | ESA |
| 5 | `language-use.everyday-school-language` | Alltagssprache und Bildungssprache unterscheiden | ESA |
| 5 | `comprehension.reading-techniques` | einen Text markieren, in Abschnitte gliedern und Kerngedanken notieren | ESA |
| 5 | `comprehension.literary-vs-pragmatic` | literarische Texte und Sachtexte unterscheiden und sagen, was ich von ihnen erwarte | ESA |
| 5 | `nonfiction.charts` | Informationen aus Tabellen und Balkendiagrammen mit dem Text verbinden | ESA |
| 5 | `nonfiction.reference-texts` | Lexikonartikel und Sachtexte nutzen, um Informationen für einen eigenen Text zu sammeln | ESA |
| 5 | `narrative.fable-structure` | den Aufbau einer Fabel untersuchen (Ausgangslage, Rede und Gegenrede, Ergebnis) und die Lehre formulieren | ESA |
| 5 | `narrative.characters` | Figuren beschreiben: Eigenschaften, Gefühle, Beziehungen, mit Textstellen | ESA |
| 5 | `narrative.plot` | den Handlungsverlauf einer Geschichte darstellen (Ort, Zeit, Konflikt, Handlungsschritte) | ESA |
| 5 | `narrative.longer-book` | ein ganzes Buch lesen, über Figuren und Handlung sprechen und meine Lesevorliebe begründen | ESA; the book is a public-domain text or a serial written for Twist (Readings) |
| 5 | `poetry.rhyme-verse-stanza` | Vers, Strophe und Reimformen bestimmen (Paarreim, Kreuzreim, umarmender Reim) | ESA |
| 5 | `poetry.images-sound` | Vergleich, Personifikation und Klangmittel in Gedichten erkennen | ESA |
| 5 | `poetry.recite` | ein Gedicht sinnbetont vortragen (Pausen, Betonung, Tempo) | ESA; record and compare (task type `speak`) |
| 5 | `drama.scenes` | eine Spielszene lesen: Rolle, Dialog, Regieanweisung | ESA |
| 5 | `writing.planning-tools` | Ideen mit Cluster, Mindmap und Schreibplan sammeln und ordnen | ESA |
| 5 | `writing.narrative-structure` | eine Erzählung planen: Erzählsituation, Ereignis mit Höhepunkt, Ausgang | ESA |
| 5 | `writing.narrative-language` | anschaulich erzählen mit treffenden Verben, Adjektiven, wörtlicher Rede und Gedanken der Figuren | ESA |
| 5 | `writing.retell-perspective` | eine Geschichte aus der Sicht einer anderen Figur erzählen oder fortsetzen | ESA |
| 5 | `writing.process-description` | einen Vorgang in sinnvoller Reihenfolge beschreiben (Spielanleitung, Rezept) | ESA |
| 5 | `argument.claim-reason` | Behauptung, Begründung und Beispiel unterscheiden und meine Meinung so stützen | ESA |
| 5 | `writing.revise-criteria` | einen Text mit einer Checkliste überarbeiten (Inhalt, Aufbau, Sprache, Rechtschreibung) | ESA |
| 5 | `speaking.poster-talk` | einen kurzen Vortrag mit Plakat gliedern und halten | ESA |
| 5 | `speaking.active-listening` | aktiv zuhören, nachfragen und Gehörtes mit Notizen wiedergeben | ESA |
| 5 | `texts-media.library-search` | in einer Bibliothek und mit Kindersuchmaschinen gezielt suchen | ESA |
| 5 | `texts-media.film-feelings` | beschreiben, wie Musik, Geräusche und Perspektive in Hörspiel und Film Gefühle erzeugen | ESA |

Count: 48.

### Klasse 6

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 6 | `verbs.future-perfect` | das Futur II bilden und erkennen, wann es verwendet wird | ESA; same year in Bayern RS |
| 6 | `verbs.passive` | Aktiv und Passiv unterscheiden und Sätze umformen | ESA; 3 lessons |
| 6 | `verbs.passive-use` | das Passiv gezielt einsetzen, wenn der Handelnde unwichtig ist (Anleitung, Bericht) | ESA |
| 6 | `word-classes.adverbs` | Adverbien erkennen und von Adjektiven unterscheiden | ESA |
| 6 | `word-classes.all-classes` | alle Wortarten bestimmen, auch Numerale und Interjektion, und flektierbare von unflektierbaren unterscheiden | ESA |
| 6 | `nouns.pronouns-more` | Demonstrativ-, Relativ-, Reflexiv- und Indefinitpronomen erkennen und verwenden | ESA |
| 6 | `sentences.genitive-prepositional-objects` | Genitiv- und Präpositionalobjekte bestimmen | ESA |
| 6 | `sentences.predicative` | das Prädikativ erkennen (Sie ist Ärztin. Er wird müde.) | MSA; check: named by Bayern Gymnasium 6 only |
| 6 | `sentences.attributes` | Attribute als Teil eines Satzglieds erkennen und Sätze damit genauer machen | ESA; later in RS (Bayern RS 7) |
| 6 | `sentences.relative-clauses` | Relativsätze bilden und das Relativpronomen richtig wählen | ESA |
| 6 | `sentences.adverbial-clauses` | Adverbialsätze der Zeit, des Grundes, des Zwecks und der Art bilden (als, weil, damit, indem) | ESA; later in RS (Bayern RS 7) |
| 6 | `sentences.subject-object-clauses` | Subjekt- und Objektsätze erkennen (Wer zu spät kommt, …; Ich hoffe, dass …) | MSA |
| 6 | `sentences.compound-complex` | Satzreihe und Satzgefüge unterscheiden und bewusst einsetzen | ESA |
| 6 | `sentences.fields` | Sätze im Feldermodell untersuchen (Vorfeld, Satzklammer, Mittelfeld, Nachfeld) | ESA; check: named by KMK, not placed by the Länder plans |
| 6 | `punctuation.clause-commas` | Kommas in Satzreihen und Satzgefügen setzen, auch bei eingeschobenen Nebensätzen | ESA |
| 6 | `spelling.das-dass-clauses` | das als Artikel, Pronomen und Relativpronomen von der Konjunktion dass unterscheiden (Ersatzprobe dieses, welches) | ESA; extends `spelling.das-dass` |
| 6 | `spelling.prefix-suffix` | Wörter mit end-/ent-, wieder/wider und -ig/-lich richtig schreiben | ESA |
| 6 | `spelling.foreign-words` | häufige Fremdwörter richtig schreiben (Rhythmus, Theater, Computer) | ESA |
| 6 | `spelling-strategies.digital-tools` | Wörterbuch und Rechtschreibprüfung nutzen und ihre Grenzen kennen | ESA |
| 6 | `vocabulary.foreign-words-meaning` | Fremdwörter aus dem Lateinischen, Griechischen und Englischen verstehen und passend verwenden | ESA |
| 6 | `language-use.dialect-standard` | Dialekt und Standardsprache unterscheiden und sagen, wo welche passt | ESA |
| 6 | `comprehension.reading-goals` | je nach Leseziel orientierend, selektiv oder genau lesen | ESA |
| 6 | `nonfiction.infographics` | Informationsgrafiken und Diagramme auswerten und mit dem Text vergleichen | ESA |
| 6 | `nonfiction.text-functions` | in Sachtexten informieren, erklären, appellieren und argumentieren unterscheiden | ESA |
| 6 | `nonfiction.compare-sources` | Informationen aus zwei Sachtexten zum gleichen Thema vergleichen | ESA |
| 6 | `narrative.legends-heroes` | Sagen untersuchen: Held, Prüfung, wahrer Kern und Erfundenes | ESA; check: Bayern Gymnasium 6 names the Antike; NRW names Märchen and Fabeln instead |
| 6 | `narrative.funny-tales` | Schwänke und Lügengeschichten erkennen und erklären, worüber man lacht | ESA; check: Bayern RS 6 only; kept for the public-domain texts and the humour |
| 6 | `narrative.narrator` | Autor und Erzähler unterscheiden, Ich-Erzähler und Er-/Sie-Erzähler erkennen | ESA |
| 6 | `narrative.time-place` | untersuchen, wie Ort und Zeit in einer Erzählung gestaltet sind | ESA |
| 6 | `narrative.novel-turning-points` | in einem Jugendbuch Konflikt, Wendepunkt und Entwicklung einer Figur verfolgen | ESA |
| 6 | `poetry.nature-poems` | Stimmung und Bilder in Natur- und Jahreszeitengedichten beschreiben | ESA |
| 6 | `drama.dialogue-intentions` | in Dialogen Absichten und Verhalten der Figuren untersuchen | ESA |
| 6 | `writing.object-description` | einen Gegenstand oder einen Weg genau und geordnet beschreiben | ESA |
| 6 | `writing.person-description` | eine Person beschreiben (Aussehen, Eigenschaften, Verhalten) | ESA |
| 6 | `writing.factual-report` | einen Bericht im Präteritum sachlich schreiben und von einer Erzählung abgrenzen | ESA; extends `writing.report` |
| 6 | `writing.story-from-prompt` | nach Reizwörtern, Bildern oder einem Erzählkern erzählen | ESA |
| 6 | `writing.fill-gaps-parallel` | Leerstellen in einem Text füllen und Paralleltexte schreiben | ESA |
| 6 | `argument.opinion-letter` | meine Meinung in einem Brief begründen und an den Empfänger anpassen | ESA |
| 6 | `argument.book-review` | eine Leseempfehlung oder Buchkritik schreiben | ESA |
| 6 | `speaking.short-presentation` | ein Kurzreferat mit Gliederung, Stichwortkarten und Bildern halten | ESA |
| 6 | `speaking.discussion` | in einer Diskussion meine Meinung begründen und auf andere eingehen | ESA |
| 6 | `speaking.nonverbal` | Stimme, Blick, Mimik und Gestik bewusst einsetzen | ESA |
| 6 | `texts-media.website-check` | die Seriosität einer Website prüfen (Impressum, Herausgeber, Datum) | ESA |
| 6 | `texts-media.camera-basics` | Einstellungsgröße und Kameraperspektive in einem Film beschreiben | ESA |
| 6 | `texts-media.public-internet` | Internetkommunikation als öffentlich erkennen und Folgen für mich und andere einschätzen | ESA |
| 6 | `vocabulary.hypernyms-precision` | Ober- und Unterbegriffe nutzen, um genau und abwechslungsreich zu formulieren | ESA |
| 6 | `poetry.dialect-poems` | ein Mundartgedicht verstehen und in die Standardsprache übertragen | E: Bayern Gymnasium 6 names dialect texts; kept as a short link to `language-use.dialect-standard`; any German dialect works |

Count: 47.

### Klasse 7

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 7 | `verbs.mood-overview` | Indikativ, Konjunktiv und Imperativ unterscheiden | ESA |
| 7 | `verbs.subjunctive-two` | den Konjunktiv II bilden und für Wünsche, Bedingungen und Höflichkeit nutzen, auch mit würde | ESA; 3 lessons; later in RS (Bayern RS 8); Berlin/Brandenburg Gymnasium 9 |
| 7 | `verbs.subjunctive-one` | den Konjunktiv I bilden | ESA; later in RS (Bayern RS 8); Berlin/Brandenburg Gymnasium 8 |
| 7 | `verbs.reported-speech` | direkte Rede in indirekte Rede umformen (Konjunktiv I, Ersatzform Konjunktiv II) | ESA; 3 lessons; Bayern RS 7 introduces it with Indikativ and Konjunktiv |
| 7 | `verbs.passive-tenses` | das Passiv in allen Zeitformen bilden | ESA |
| 7 | `verbs.state-passive` | Vorgangspassiv und Zustandspassiv unterscheiden (wird geöffnet, ist geöffnet) | MSA; check |
| 7 | `verbs.modal-verbs` | mit Modalverben ausdrücken, ob etwas möglich, nötig oder gewünscht ist | ESA |
| 7 | `sentences.adverbial-relations` | Bedingung, Folge, Einräumung und Gegensatz in Nebensätzen ausdrücken (wenn, sodass, obwohl, während) | ESA |
| 7 | `sentences.connectors` | Sätze mit Konjunktionen und Adverbien logisch verknüpfen (deshalb, trotzdem, außerdem) | ESA |
| 7 | `sentences.infinitive-participle-groups` | Infinitiv- und Partizipgruppen erkennen und bilden | ESA; later in RS (Bayern RS 8) |
| 7 | `punctuation.infinitive-commas` | Kommas bei Infinitivgruppen setzen (um zu, ohne zu, anstatt zu) | ESA; later in RS (Bayern RS 8) |
| 7 | `punctuation.apposition-commas` | Kommas bei Appositionen und nachgestellten Erläuterungen setzen | ESA; later in RS (Bayern RS 8) |
| 7 | `spelling.capitals-special` | Zeit-, Zahl-, Farb- und Sprachbezeichnungen richtig groß- oder kleinschreiben (am Abend, abends, das Blau, auf Deutsch) | ESA |
| 7 | `spelling.separate-joined` | Verbindungen mit Verben getrennt oder zusammen schreiben (Rad fahren, kennenlernen) | ESA |
| 7 | `vocabulary.meaning-change` | an Beispielen erklären, wie Wörter ihre Bedeutung ändern | ESA |
| 7 | `language-use.compare-languages` | Wörter und Satzbau im Deutschen mit anderen Sprachen vergleichen, die ich kenne | ESA |
| 7 | `nonfiction.blogs-videos` | Blogs und Erklärvideos auf Inhalt, Adressat und Absicht untersuchen | ESA |
| 7 | `nonfiction.info-quality` | Qualität von Informationen und Argumenten in mehreren Texten vergleichen | ESA |
| 7 | `nonfiction.news-report` | Nachricht, Bericht und Reportage unterscheiden | ESA |
| 7 | `narrative.short-prose` | Anekdoten, Kalendergeschichten und Parabeln untersuchen (Pointe, Lehre, übertragene Bedeutung) | ESA |
| 7 | `narrative.conflict-plot` | Konflikt und Wendepunkt einer Erzählung herausarbeiten und als Spannungskurve zeichnen | ESA |
| 7 | `narrative.character-relations` | Figurenbeziehungen als Figurenkonstellation darstellen | ESA |
| 7 | `narrative.novel-themes` | in einem Jugendbuch Themen und Motive herausarbeiten und mit meinem Leben vergleichen | ESA |
| 7 | `narrative.middle-ages` | Heldenepos und Ritterdichtung in einer Nacherzählung kennenlernen | E: Bayern Gymnasium and Realschule 7 only; supports Geschichte, which teaches the Mittelalter around Klasse 7 in all Länder |
| 7 | `poetry.ballad-analysis` | eine Ballade untersuchen: Handlung, Figuren, Spannung, Strophen | ESA; extends `texts-media.ballads` |
| 7 | `poetry.metaphor` | Metapher, Vergleich und Personifikation unterscheiden und ihre Wirkung beschreiben | ESA |
| 7 | `poetry.speaker` | den Sprecher eines Gedichts (lyrisches Ich) vom Autor unterscheiden | ESA |
| 7 | `poetry.metre` | betonte und unbetonte Silben markieren und Jambus und Trochäus erkennen | MSA; check: NRW by end of Klasse 6, Berlin/Brandenburg Gymnasium 10, not named by Bayern or KMK |
| 7 | `drama.short-play` | ein kurzes Theaterstück untersuchen: Akt, Szene, Dialog, Monolog, Regieanweisung | ESA |
| 7 | `writing.depict-mood` | eine Situation schildern und Sinneseindrücke und Stimmung gestalten | ESA |
| 7 | `writing.material-info` | einen informierenden Text aus Bildern, Grafiken und kurzen Texten schreiben | ESA |
| 7 | `summary.plot-summary-intro` | den Inhalt einer Geschichte knapp im Präsens zusammenfassen (Einleitungssatz, Handlungsschritte) | ESA |
| 7 | `summary.paraphrase` | Aussagen aus Texten mit eigenen Worten und in indirekter Rede wiedergeben | ESA |
| 7 | `summary.quote-basic` | Textstellen richtig zitieren (Anführungszeichen, Zeilenangabe) | ESA |
| 7 | `argument.argument-chain` | ein Argument aus Behauptung, Begründung und Beispiel aufbauen | ESA |
| 7 | `argument.order-arguments` | Argumente nach ihrer Stärke ordnen und linear aufbauen | ESA |
| 7 | `argument.formal-letter` | einen sachlichen Brief formal richtig schreiben (Anfrage, Bitte, Beschwerde) | ESA |
| 7 | `writing.revise-logic` | einen Text auf Logik und Adressatenbezug überarbeiten | ESA |
| 7 | `speaking.referat` | ein Referat mit Visualisierung planen und halten | ESA |
| 7 | `speaking.respond-positions` | in Diskussionen die Positionen anderer zusammenfassen und darauf antworten | ESA |
| 7 | `texts-media.search-terms` | mit passenden Suchbegriffen recherchieren und Treffer bewerten | ESA |
| 7 | `texts-media.social-networks` | meine Nutzung sozialer Netzwerke prüfen: Privatsphäre, Datenschutz, Altersgrenzen | ESA |
| 7 | `texts-media.film-sound-cut` | Ton, Bildeffekte und Schnitt in Filmen und Hörspielen beschreiben | MSA (Schnitt is an MSA term) |
| 7 | `texts-media.advertising` | Werbung in verschiedenen Medien untersuchen: Zielgruppe, Mittel, Rollenbilder | ESA |
| 7 | `writing.formal-forms` | Formulare und standardisierte Texte korrekt ausfüllen (Anmeldung, Antrag) | ESA |
| 7 | `vocabulary.figurative-meaning` | wörtliche und übertragene Bedeutung unterscheiden (Sprichwort, Redensart, Bild) | ESA; extends `vocabulary.idioms` |

Count: 46.

### Klasse 8

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 8 | `verbs.tense-relations` | Zeitverhältnisse ausdrücken: vorzeitig, gleichzeitig, nachzeitig | ESA |
| 8 | `verbs.reported-speech-forms` | Redewiedergabe variieren: indirekte Rede, Modalverb (soll, will), Infinitivsatz, Paraphrase | ESA |
| 8 | `sentences.clause-types` | Gliedsätze nach Form und Funktion bestimmen (Subjekt-, Objekt-, Adverbial-, Attributsatz) | MSA |
| 8 | `sentences.cohesion` | mit Pronomen und Verweiswörtern einen Textzusammenhang herstellen | MSA |
| 8 | `punctuation.quotes` | Zitate richtig zeichnen, auch mit Auslassung und im eigenen Satz | ESA |
| 8 | `punctuation.colon-semicolon-dash` | Doppelpunkt, Semikolon, Gedankenstrich und Klammern einsetzen | ESA |
| 8 | `spelling.hyphen` | den Bindestrich richtig setzen (E-Mail, 3-mal, Ich-Erzähler) | ESA |
| 8 | `spelling.foreign-words-more` | Fremdwörter aus dem Französischen und Englischen schreiben und beugen | ESA |
| 8 | `spelling.capitals-exceptions` | Sonderfälle der Großschreibung beachten (am besten, Karl der Große, Straßennamen) | ESA |
| 8 | `spelling.separate-joined-more` | Getrennt- und Zusammenschreibung bei Adjektiven, Adverbien und Präpositionen | ESA |
| 8 | `vocabulary.subject-terms` | Fremdwörter und Fachbegriffe erklären und zielgerichtet verwenden | ESA |
| 8 | `language-use.varieties` | Jugendsprache, Umgangssprache und Fachsprache unterscheiden und ihre Wirkung beschreiben | ESA |
| 8 | `language-use.communication-model` | ein Gespräch mit einem Kommunikationsmodell untersuchen (Sender, Empfänger, Nachricht, Missverständnis) | ESA; later in RS (Bayern RS 9) |
| 8 | `language-use.conceptual-orality` | in Chat, Brief und Post mündlich und schriftlich geprägte Sprache unterscheiden | ESA |
| 8 | `comprehension.reading-strategies` | die Lesestrategie nach Text und Ziel wählen (punktuell, diagonal, sequenziell, analytisch) | ESA |
| 8 | `nonfiction.journalism` | journalistische Textsorten unterscheiden (Nachricht, Kommentar, Glosse, Reportage, Blog) | ESA |
| 8 | `nonfiction.argument-analysis` | in einem Sachtext These, Argumente und Absicht herausarbeiten | ESA |
| 8 | `nonfiction.information-opinion` | Information und Wertung in Texten unterscheiden | ESA |
| 8 | `narrative.short-story-features` | Merkmale der Kurzgeschichte erkennen (unvermittelter Anfang, Alltag, Wendepunkt, offenes Ende) | ESA; Bayern RS 7, Bayern Gymnasium names moderne Kurzprosa in 8 |
| 8 | `narrative.narrator-speech` | Erzählerbericht und Figurenrede in einer Erzählung unterscheiden | ESA |
| 8 | `narrative.perspective` | Erzählperspektive und Erzählverhalten bestimmen (Ich-Erzähler, auktorial, personal) | ESA; later in RS (Bayern RS 10) |
| 8 | `narrative.fiction-signals` | Fiktionalitätssignale erkennen und Fiktion von Wirklichkeit unterscheiden | ESA |
| 8 | `narrative.book-film` | ein Buch und seine Verfilmung vergleichen | MSA |
| 8 | `poetry.speech-situation-images` | Sprechsituation und Bildlichkeit eines Gedichts untersuchen | ESA |
| 8 | `poetry.compare-poems` | zwei Gedichte zum gleichen Thema unter einem Aspekt vergleichen | ESA |
| 8 | `drama.acts-constellation` | den Aufbau eines Dramas (Akt, Szene) und die Figurenkonstellation untersuchen | ESA |
| 8 | `drama.comedy-tragedy` | Komödie und Tragödie unterscheiden | MSA |
| 8 | `summary.inhaltsangabe` | eine Inhaltsangabe schreiben: Einleitung mit Thema, Hauptteil im Präsens, keine wörtliche Rede, keine Wertung | ESA; 3 lessons |
| 8 | `summary.nonfiction-summary` | den Inhalt eines Sachtexts zusammenfassen | ESA |
| 8 | `summary.lecture-notes` | Mitschriften von Vorträgen anfertigen | ESA |
| 8 | `writing.minutes` | ein Ergebnis- oder Verlaufsprotokoll schreiben | ESA |
| 8 | `writing.explain-terms` | in informierenden Texten Begriffe und Sachverhalte erklären | ESA |
| 8 | `argument.counter-arguments` | Gegenargumente aufgreifen und entkräften | ESA |
| 8 | `argument.appeal` | einen Aufruf oder eine Beschwerde mit sachlichen und emotionalen Mitteln verfassen | ESA |
| 8 | `argument.reader-letter` | einen Leserbrief mit linearer Argumentation schreiben | MSA |
| 8 | `writing.cohesion-revise` | einen Text auf Zusammenhang und Satzverknüpfungen überarbeiten | ESA |
| 8 | `speaking.slides` | eine Präsentation mit Folien gestalten: wenig Text, klare Bilder | ESA |
| 8 | `speaking.debate-intro` | an einer Debatte teilnehmen: Rollen, Regeln, Redezeit | MSA |
| 8 | `speaking.difficult-conversations` | schwierige Gespräche führen (Beschwerde, Missverständnis klären, Ich-Botschaft) | ESA |
| 8 | `texts-media.compare-coverage` | Berichte zu einem Thema in Zeitung, Online-Medien und sozialen Medien vergleichen | ESA |
| 8 | `texts-media.newspaper-structure` | den Aufbau einer gedruckten und einer Online-Zeitung beschreiben | ESA |
| 8 | `texts-media.graphic-novel` | Gestaltungsmittel in Comic und Graphic Novel beschreiben | ESA |

Count: 42.

### Klasse 9

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 9 | `verbs.subjunctive-distance` | den Konjunktiv bewusst für Distanz, Vermutung und Irreales einsetzen | MSA |
| 9 | `sentences.style-variation` | Satzbau variieren (Satzreihe, Satzgefüge, Ellipse) und die Wirkung beschreiben | MSA |
| 9 | `punctuation.comma-mastery` | Kommas in langen Sätzen sicher setzen und begründen | ESA; review of all comma rules |
| 9 | `spelling.error-profile` | meine Fehlerschwerpunkte bestimmen und gezielt üben | ESA |
| 9 | `spelling.mixed-review` | alle Rechtschreibregeln gemischt sicher anwenden | ESA; exam practice before the ESA |
| 9 | `language-use.four-sides` | Sach- und Beziehungsebene einer Äußerung unterscheiden | ESA |
| 9 | `language-use.discrimination` | diskriminierende Sprache und Klischees erkennen und Alternativen finden | MSA; check |
| 9 | `language-use.manipulation` | Manipulation durch Sprache erkennen (Euphemismus, Übertreibung, Schlagwort) | MSA |
| 9 | `language-use.gender-language` | Formen geschlechtergerechter Sprache kennen und ihre Wirkung beurteilen | MSA; check |
| 9 | `language-use.rhetorical-devices` | rhetorische Mittel erkennen und ihre Wirkung beschreiben (Anapher, Hyperbel, rhetorische Frage, Antithese) | MSA; Bayern RS 9, same year |
| 9 | `comprehension.critical-reading` | verlässliche und problematische Informationen beim Lesen unterscheiden | ESA |
| 9 | `nonfiction.data-cartoons` | Statistiken, Schaubilder und Karikaturen auswerten und mit Texten verbinden | ESA |
| 9 | `nonfiction.commentary-analysis` | einen Kommentar untersuchen: These, Argumente, sprachliche Mittel | MSA |
| 9 | `narrative.short-story-analysis` | eine Kurzgeschichte genau untersuchen, auch innerer Monolog und erlebte Rede | MSA |
| 9 | `narrative.motives-themes` | Motive und Themen in Erzählungen bestimmen und vergleichen | ESA |
| 9 | `narrative.context` | einen Text mit seiner Entstehungszeit und dem Leben des Autors in Beziehung setzen | ESA |
| 9 | `narrative.novel-society` | in einem Roman Konflikte zwischen Figur und Gesellschaft untersuchen | ESA |
| 9 | `poetry.form-language` | Form und Sprache eines Gedichts zusammen deuten | ESA |
| 9 | `drama.conflict` | den Konflikt eines Dramas und die Interaktion der Figuren untersuchen | ESA |
| 9 | `drama.staging` | eine Inszenierung beschreiben: Bühnenbild, Sprechweise, Körpersprache | MSA |
| 9 | `analysis.hypothesis` | eine Deutungshypothese formulieren und mit Textstellen belegen | ESA |
| 9 | `analysis.evidence` | Textbelege einbauen und erläutern (Zitat, Erklärung, Deutung) | ESA |
| 9 | `analysis.characterisation` | eine literarische Figur charakterisieren | ESA; check: Bayern Gymnasium names it in 10 |
| 9 | `analysis.structure` | eine Textanalyse aufbauen: Einleitung, Inhalt, Untersuchung, Deutung, Schluss | MSA; 3 lessons |
| 9 | `argument.outline` | eine Erörterung mit numerischer Gliederung planen | ESA |
| 9 | `argument.linear-essay` | eine lineare (steigernde) Erörterung schreiben | ESA; 3 lessons |
| 9 | `argument.dialectic-essay` | eine dialektische (Pro-und-Kontra-)Erörterung schreiben und abwägen | MSA; 3 lessons |
| 9 | `argument.material-based` | materialgestützt argumentieren: Informationen aus Texten und Grafiken als Belege nutzen | ESA |
| 9 | `argument.commentary` | einen Kommentar zu einem aktuellen Thema schreiben | MSA |
| 9 | `writing.application-letter` | ein Bewerbungsschreiben für ein Praktikum oder eine Ausbildung verfassen | ESA |
| 9 | `writing.cv` | einen tabellarischen Lebenslauf erstellen | MSA; check: KMK lists Lebenslauf for the MSA only, though schools for the ESA teach it |
| 9 | `summary.sources` | Übernahmen kennzeichnen und Quellen angeben | ESA |
| 9 | `speaking.debate` | eine Debatte führen: Eröffnung, freie Aussprache, Schlussrunde | MSA |
| 9 | `speaking.job-interview` | mich auf ein Vorstellungsgespräch vorbereiten und typische Fragen beantworten | ESA |
| 9 | `speaking.feedback` | Feedback nach Kriterien geben und annehmen | ESA |
| 9 | `texts-media.fake-news` | Falschmeldungen und bearbeitete Bilder erkennen und Quellen prüfen | ESA |
| 9 | `texts-media.algorithms` | erklären, wie Nutzerprofile und Algorithmen auswählen, was ich sehe | ESA |
| 9 | `texts-media.copyright` | Urheberrecht und Persönlichkeitsrecht beim Teilen von Medien beachten | ESA |

Count: 38.

### Klasse 10

| Klasse | Skill slug | Ich kann … | Note |
|---|---|---|---|
| 10 | `sentences.nominal-style` | Nominalstil und Verbalstil unterscheiden und umformen | MSA |
| 10 | `language-use.irony-style` | Ironie, Stilbruch und Ellipse erkennen und ihre Wirkung beschreiben | MSA |
| 10 | `language-use.language-change` | Sprachwandel erklären: Entlehnung, Neologismus, digitale Kommunikation | ESA |
| 10 | `language-use.multilingualism` | Mehrsprachigkeit für Einzelne und die Gesellschaft beschreiben | MSA |
| 10 | `language-use.registers` | das Register wählen: Standardsprache, Fachsprache, Bildungssprache in Bewerbung, Referat, Chat | ESA |
| 10 | `comprehension.complex-texts` | komplexe Sachtexte systematisch erschließen | MSA |
| 10 | `nonfiction.compare-argument-texts` | zwei Texte zum gleichen Thema nach Argumentation und Form vergleichen und bewerten | MSA |
| 10 | `nonfiction.speech-analysis` | eine Rede untersuchen: Anlass, Absicht, Aufbau, rhetorische Mittel | MSA |
| 10 | `narrative.novella` | Merkmale der Novelle erkennen (unerhörte Begebenheit, Wendepunkt, Dingsymbol) | MSA; Bayern RS 9 |
| 10 | `narrative.frame-time` | Rahmen- und Binnenerzählung und die Zeitgestaltung untersuchen (Rückblende, Zeitraffung, Zeitdehnung) | MSA |
| 10 | `literary-history.epochs-overview` | Epochen der deutschen Literatur auf einer Zeitleiste ordnen und Texte zuordnen | MSA |
| 10 | `literary-history.enlightenment` | Ideen der Aufklärung in Texten erkennen (Vernunft, Toleranz) | MSA; Bayern RS teaches it in 8 |
| 10 | `literary-history.storm-romantic` | Sturm und Drang und Romantik an Gedichten unterscheiden | G; check: Bayern RS 8 names Sturm und Drang and Klassik |
| 10 | `poetry.sonnet` | die Form des Sonetts und ihre Funktion untersuchen | G |
| 10 | `poetry.expressionism` | Großstadt- und Weltendgedichte des Expressionismus untersuchen | MSA; check: named by Bayern RS 10 only of the captured plans; common in Klasse 10 textbooks |
| 10 | `poetry.interpretation` | ein Gedicht schriftlich interpretieren | MSA; 3 lessons |
| 10 | `drama.classic-structure` | den Aufbau eines klassischen Dramas untersuchen (Exposition, Höhepunkt, Wendepunkt, Katastrophe) | MSA |
| 10 | `drama.scene-analysis` | eine Dramenszene analysieren: Gesprächsverlauf, Absichten, Sprache | MSA |
| 10 | `analysis.interpretation` | einen epischen Text schriftlich interpretieren | MSA; 3 lessons |
| 10 | `analysis.nonfiction-analysis` | eine Sachtextanalyse schreiben (Thema, These, Argumentationsweise, Sprache, Absicht) | MSA; 3 lessons |
| 10 | `analysis.literary-judgement` | Kriterien für die Bewertung von Literatur nennen und eine Rezension schreiben | MSA |
| 10 | `argument.text-based-essay` | eine textgebundene Erörterung schreiben (die Position eines Textes prüfen) | MSA |
| 10 | `argument.concession` | Einräumungen formulieren und abwägend schließen | MSA |
| 10 | `argument.argument-types` | Argumenttypen unterscheiden (Fakt, Autorität, Erfahrung, Norm) und ihre Stärke prüfen | MSA |
| 10 | `argument.essay` | einen Essay schreiben | G |
| 10 | `summary.excerpt` | einen Text exzerpieren und Zitate für einen eigenen Text sammeln | MSA |
| 10 | `summary.citation` | Quellen korrekt nachweisen (Autor, Titel, Jahr, Internetadresse, Abrufdatum) | MSA |
| 10 | `writing.revise-coherence` | einen Text selbstständig auf Geschlossenheit und Kohärenz überarbeiten | MSA |
| 10 | `speaking.moderation` | eine Diskussion moderieren | MSA |
| 10 | `speaking.persuasive-speech` | eine überzeugende Rede aufbauen | MSA |
| 10 | `texts-media.film-analysis` | einen Film mit Montage, Kamerabewegung und Ton analysieren | MSA |
| 10 | `texts-media.opinion-formation` | Meinungsbildung im Netz untersuchen (Filterblase, Themensetzung, Influencer) | MSA |
| 10 | `texts-media.digital-literature` | digitale Literatur und neue Textformen beschreiben | G; Bayern Gymnasium 10 "ggf." |

Count: 33.

Total: 254 skills. The E skills (`poetry.dialect-poems`,
`narrative.middle-ages`) and the check skills should be confirmed before
records are written.

## Writing: practice and checks

docs/lesson-anatomy.md says writing lessons learn from a model, practise
on sentences, then write in context, and that free writing is not marked
automatically. From Klasse 5 on, writing is half of Deutsch (the NRW
Klassenarbeit types 1 to 6 are all writing), so each writing skill gets
three kinds of task:

| Stage | Tasks | Counts for mastery |
|---|---|---|
| Learn from a model | read a model text; tap its parts (Einleitung, Hauptteil, Schluss; Behauptung, Begründung, Beispiel; Thema, Handlungsschritte); sort sentences into the parts | yes |
| Practise the moves | put paragraphs or arguments in order; build a Gliederung; choose the better of two versions and then the reason; find the error and pick the fix (tense in an Inhaltsangabe, opinion in a Bericht, wörtliche Rede in a Zusammenfassung, missing Begründung); complete a sentence with the right connector; turn direct into indirect speech or Aktiv into Passiv; pick the best Einleitungssatz or Schlusssatz | yes |
| Write | the child types a short text (a paragraph, an Einleitung, one argument, a full Inhaltsangabe in Klasse 8 and later) | no |
| Check own text | after writing, the child goes through a checklist made for that skill, comparing with a model answer ("Steht das Thema im ersten Satz? Präsens? Keine wörtliche Rede?"); each item is ticked by the child | no |

The skill check uses only the first two kinds. A long essay (Erörterung,
Interpretation) is taught in parts: one lesson set per part (Gliederung,
Einleitung, one argument, Überleitung, Schluss), each with its own check,
and a final "write it all" lesson with the self-check.

Open decisions for the team:

1. Typed German answers. Today `text_input` is a number keypad and only 28
   of 7,992 Grundschule tasks are typed (../deutsch.md, G2). Klasse 5 to 10
   need short typed German answers with a list of accepted answers
   (Konjunktiv forms, Stammformen, Fremdwörter, indirekte Rede).
2. Whether free texts may get automatic feedback (a language model
   commenting on structure, never a grade). Not planned here; it would
   need its own privacy and quality review.
3. Whether a parent or teacher can see the free texts in the Parents view.

## Readings

Texts on screen are short, so most readings are extracts. Every text is
either written for Twist (Sachtexte, news, ads, posts, model essays, a
serial youth novel) or in the public domain. In the EU a work is free 70
years after the author's death; authors who died in 1955 or earlier are
free in 2026. Use a first edition or a public-domain facsimile; modern
editions, annotations and translations can carry their own rights, so the
edition is checked when the text goes in. Still protected: Brecht (died
1956, free in 2027), Benn (1956), Kästner (1974), Böll, Kaschnitz,
Bichsel and most post-war Kurzgeschichte authors.

| Skill | Public-domain candidates |
|---|---|
| `narrative.fable-structure` | Lessing, Fabeln (died 1781); Luther's Aesop fables |
| `narrative.longer-book`, `narrative.novel-*` | a serial written for Twist; or Wilhelm Hauff, Märchen (1827); Karl May (1912), extracts; E. T. A. Hoffmann, Nussknacker und Mausekönig (1822) |
| `narrative.legends-heroes` | Gustav Schwab, Die schönsten Sagen des klassischen Altertums (1850); Grimm, Deutsche Sagen (1859/1863) |
| `narrative.funny-tales` | Till Eulenspiegel (Volksbuch, 1510/11); Gottfried August Bürger, Münchhausen (1794) |
| `narrative.short-prose` | Johann Peter Hebel, Kannitverstan, Unverhofftes Wiedersehen (1826); Kleist, Anekdoten (1811); Kafka, Gibs auf!, Kleine Fabel (1924) |
| `narrative.short-story-*` | Wolfgang Borchert, Das Brot, Die Küchenuhr, Nachts schlafen die Ratten doch (died 1947) |
| `narrative.novella`, `narrative.frame-time` | Theodor Storm, Der Schimmelreiter (1888); Gottfried Keller, Kleider machen Leute (1890); Droste-Hülshoff, Die Judenbuche (1848); E. T. A. Hoffmann, Das Fräulein von Scuderi; Stefan Zweig, Schachnovelle (1942); Thomas Mann, Tonio Kröger (died 1955, free since 2026-01-01) |
| `narrative.novel-society` | Ödön von Horváth, Jugend ohne Gott (1938); Gerhart Hauptmann, Bahnwärter Thiel (1946) |
| `poetry.ballad-analysis` | Goethe, Erlkönig, Der Zauberlehrling (1832); Schiller, Die Bürgschaft, Der Handschuh (1805); Fontane, John Maynard, Die Brück' am Tay (1898); Droste-Hülshoff, Der Knabe im Moor |
| `poetry.nature-poems`, `poetry.metaphor`, `poetry.metre` | Mörike, Er ist's (1875); Eichendorff, Mondnacht (1857); Heine, Die Loreley (1856); Rilke, Der Panther (1926) |
| `nouns.declension` (hook), `poetry.images-sound` | Christian Morgenstern, Der Werwolf, Fisches Nachtgesang, Das ästhetische Wiesel (1914); Joachim Ringelnatz (1934); Hugo Ball, Karawane (1927) |
| `poetry.sonnet` | Andreas Gryphius, Es ist alles eitel (1664); Rilke |
| `poetry.expressionism` | Jakob van Hoddis, Weltende (1942); Georg Heym, Der Gott der Stadt (1912); Alfred Lichtenstein, Die Dämmerung (1914); Georg Trakl (1914) |
| `literary-history.*`, `drama.*` | Lessing, Nathan der Weise (Ringparabel); Schiller, Wilhelm Tell; Kleist, Der zerbrochne Krug; Büchner, Woyzeck (1837); Goethe and Eichendorff for Sturm und Drang and Romantik |
| `nonfiction.commentary-analysis` | Kurt Tucholsky, Glossen (1935); other journalism written for Twist |

Death years are from memory; confirm each when the text is chosen.

## Overlaps and prerequisites

| Area | Where | Plan |
|---|---|---|
| Grundschule Klasse 4 end state | `nouns.cases`, `verbs.perfect`, `verbs.future`, `sentences.objects`, `sentences.place-time`, `sentences.conjunctions`, `spelling.das-dass`, `writing.report`, `writing.opinion`, `texts-media.ballads` | hard prerequisites of the Klasse 5 and 6 skills that extend them; Klasse 5 opens each topic with a short check, and a failed check sends the child to the Grundschule skill |
| Englisch (sprachen.md) | Passiv, reported speech, if-clauses, word classes | same Klasse order where possible (German Passiv in 6, English passive in 7 or 8); a German skill never relies on the English one |
| Latein and other second languages | Latin grammar terms (Bayern uses them from Klasse 5), Fremdwörter from Latin and Greek | `word-classes.overview` teaches the Latin names; no Latin needed |
| Geschichte (gesellschaft.md) | Mittelalter (7), Aufklärung and French Revolution (8 to 10), sources and source criticism | `narrative.middle-ages` and `literary-history.enlightenment` link to the history skills; `texts-media.fake-news` shares cases with source work in Geschichte |
| Politik/Sozialkunde | media, opinion formation, debate | `texts-media.opinion-formation`, `speaking.debate` are the Deutsch side; Politik owns the institutions |
| Informatik (weitere.md) | algorithms, data protection, copyright | `texts-media.algorithms` explains the effect on reading; how algorithms work stays in Informatik |
| Ethik (weitere.md) | argument, discrimination, values in literature | `argument.*` is the writing technique; Ethik uses it |
| Musik | ballads, song lyrics, rhythm | `poetry.metre` can reuse the rhythm tap task from Musik |
| Kunst | Bildbeschreibung, comic and film images | `writing.object-description` and `texts-media.graphic-novel` share pictures with Kunst |
| Mathe | diagrams, statistics | `nonfiction.charts`, `nonfiction.data-cartoons` read diagrams that Mathe has taught; no new maths |
| All subjects | Fachbegriffe, Referat, Protokoll, Zitieren | taught once in Deutsch; other subjects link to them |

## Out of scope for an app

To record with reasons in curricula/de-DE.yaml and ../omitted.md:

- Reading a whole copyrighted youth novel as the class reads it (both
  Länder require one or two Ganzschriften a year). Twist teaches the
  methods on public-domain texts and its own serial; the class novel
  stays in class.
- Literary conversation, group discussion, Schreibkonferenz and peer
  feedback with real classmates. Twist teaches the rules and the moves
  with scripted conversations; the conversation itself needs other
  people.
- Szenisches Spiel, Standbild and theatre visits.
- Marking free texts: essays, Erörterungen and interpretations are
  practised in parts; the full text gets a self-check, no grade.
- Delivering a Referat or a Rede to an audience and a real
  Vorstellungsgespräch. The child can record and replay their voice
  (task type `speak` fallback) and self-check against criteria.
- Projects: Zeitungsprojekt, film or podcast production, Portfolio,
  Lesetagebuch, library visit.
- Handwriting at length and word-processor skills (Seitenlayout,
  Kommentarfunktion). The app has no word processor.
- The Bayern Gymnasium Lernbereich 5 (profile of music schools); Land-only.

## Task types and drawn components needed

New task types (to add to docs/task-types.md before first use):

| Type or interaction | What the child does | For |
|---|---|---|
| `text_input`, German text mode | types a word or short phrase; accepted answers listed per task | Stammformen, Konjunktiv, indirekte Rede, Fremdwörter, Zitate |
| `tap_gaps` (new type) | taps the gaps between words where a comma (or other mark) belongs | every `punctuation.*` skill |
| `highlight_in_text`, labelled spans (new interaction) | marks spans and gives each a label from a short list (Behauptung, Begründung, Beispiel; Erzählerbericht, Figurenrede) | `argument.*`, `analysis.*`, `narrative.narrator-speech` |
| `multi_select` (listed, not used yet) | picks every option that fits | rhetorical devices, features of a genre |
| `drag_and_drop` onto a diagram (listed, not used yet) | moves cards onto places in a drawing | Feldermodell, Figurenkonstellation, Spannungskurve, Gliederung |
| `choose_better` (interaction of `multiple_choice`) | sees two versions of a sentence or paragraph, picks the better one, then the reason | every `writing.*`, `argument.*`, `summary.*` skill |
| free text with self-check (activity setting) | types a text, then ticks a checklist against a model; never counts | the "Write" stage of writing skills |
| scripted conversation | chooses the next line in a conversation and sees the reaction | `speaking.discussion`, `speaking.debate`, `speaking.difficult-conversations`, `speaking.job-interview` |

New drawings for pages/player/drawn.js:

| Drawing | For |
|---|---|
| text with line numbers | citing with "Z. 12" (`summary.quote-basic`, `analysis.evidence`) |
| Feldermodell (Vorfeld, linke Satzklammer, Mittelfeld, rechte Satzklammer, Nachfeld) | `sentences.fields`, `sentences.main-sub-clauses` |
| tense line (time arrow with Vorzeitigkeit marked) | `verbs.past-perfect`, `verbs.future-perfect`, `verbs.tense-relations` |
| Spannungskurve | `narrative.conflict-plot`, `drama.classic-structure`, `writing.narrative-structure` |
| Figurenkonstellation (names and arrows) | `narrative.character-relations`, `drama.acts-constellation` |
| outline tree (numbered Gliederung) | `argument.outline`, `writing.planning-tools` |
| metre marks over syllables (x X) and rhyme letters at line ends | `poetry.metre`, `poetry.rhyme-verse-stanza`, `poetry.sonnet` |
| communication model (sender, message, receiver; the four sides) | `language-use.communication-model`, `language-use.four-sides` |
| message thread and social post | `language-use.conceptual-orality`, `texts-media.public-internet`, `texts-media.fake-news` |
| newspaper page (print and online) | `nonfiction.journalism`, `texts-media.newspaper-structure` |
| shot sizes set (Totale to Detail) and camera angles | `texts-media.camera-basics`, `texts-media.film-analysis` (pictures, generated) |
| epoch timeline | `literary-history.epochs-overview` (reuses the Sachunterricht timeline) |

## Fun

fun.md applies. At 10 to 16 the hooks change: less mascot, more
challenge, real-world use, competing with one's own best and humour.
Twist must not look like a primary school app to a fourteen-year-old.

| Hook | What it is | Used in |
|---|---|---|
| The editors (Die Redaktion) | A running story for Klasse 7 to 10: the child joins a school newspaper team written for Twist. Each writing skill is a job for the paper: fix an article before print, write the Kommentar, cut a report to 80 words, check a source before it goes online | `writing.*`, `summary.*`, `nonfiction.journalism`, `texts-media.fake-news` |
| Comma saves lives | Funny sentences whose meaning flips with one comma ("Komm, wir essen, Opa!"); the child picks which picture fits each version | `punctuation.*` |
| Beat your record | Timed blitz rounds (Stammformen, das/dass, Kommas) with a personal best; no ranking against others | `verbs.stem-forms`, `spelling.das-dass-clauses`, `punctuation.comma-mastery` |
| Debate duel | The app argues the other side; the child picks the strongest rebuttal each round and sees how a judge would score it | `argument.*`, `speaking.debate` |
| Who knows what | A short mystery told twice, by a Ich-Erzähler and a narrator who knows everything; the child finds the clue only one of them can know | `narrative.perspective`, `narrative.narrator` |
| Poetry remix | Swap words in a famous poem and hear what breaks (metre, rhyme, image); write a Parallelgedicht | `poetry.*` |
| Nonsense with rules | Morgenstern's Werwolf, who asks to be declined; Dada sound poems; grammar of made-up words | `nouns.declension`, `poetry.images-sound`, `word-classes.*` |
| Real use | Write the complaint that gets the refund, the application for a holiday job, the post that does not go wrong in public | `argument.appeal`, `writing.application-letter`, `texts-media.public-internet` |
| Director's chair | Choose shot size and music for a scene and see how the mood changes | `texts-media.camera-basics`, `texts-media.film-analysis` |
| Spot the trick | Real-looking ads, headlines and posts written for Twist; find the trick (Euphemismus, cut-off chart, fake account) | `language-use.manipulation`, `texts-media.advertising`, `texts-media.fake-news` |

The review question in fun.md becomes: would a thirteen-year-old (or
fifteen-year-old for Klasse 9 and 10) do this lesson again without being
told to?

## Sources

### Captured (2026-10-24)

| Issuer | Document | File |
|---|---|---|
| KMK | Bildungsstandards Deutsch ESA/MSA (2022) | rnd/official-de/kmk/raw/2022_06_23-Bista-ESA-MSA-Deutsch.pdf, text/ alongside |
| NRW | Kernlehrplan Gymnasium Sek I Deutsch, Heft 3409 (2019) | rnd/official-de/nrw/raw/g9_d_klp_3409_2019_06_23.pdf |
| Bayern | LehrplanPLUS Gymnasium Deutsch, Jahrgangsstufen 5 to 10 | rnd/official-de/by/raw/lehrplanplus-gymnasium-deutsch-jgs{5..10}.html |
| Bayern | LehrplanPLUS Realschule Deutsch, Jahrgangsstufen 5 to 10 | rnd/official-de/by/raw/lehrplanplus-realschule-deutsch-jgs{5..10}.html |
| Berlin/Brandenburg | Rahmenlehrplan Teil C Deutsch (2024), already in the repo | rnd/official-de/bebb/raw/Teil_C_Deutsch_2024_02_28.pdf |

Placement evidence (text/ files, line numbers):

- KMK ESA standards apply at the end of Klasse 9, MSA at the end of
  Klasse 10: kmk/text/2022_06_23-Bista-ESA-MSA-Deutsch.txt line 407.
- Tempus, Modus, Genus verbi in both levels: line 1786; Satzklammer and
  Felderstruktur: line 1777; all punctuation marks in both: line 943.
- Text types (Inhaltsangabe and Erörterung in both; Kommentar, Leserbrief,
  Interpretation, Lebenslauf only MSA): lines 1044 to 1090.
- Genres (Novelle, Komödie, Tragödie only MSA): line 1357; Epoche only
  MSA: line 1368; figures of speech only MSA: line 1375; algorithms:
  line 1568; Sprachwandel: line 1738; term lists per level: lines 1876 to
  1905.
- NRW bands: Erprobungsstufe line 479, erste Stufe line 809, zweite Stufe
  line 1055 (nrw/text/g9_d_klp_3409_2019_06_23.txt); Metrum by end of
  Klasse 6: line 606; Aktiv/Passiv and Modi in erste Stufe: line 828;
  commas with Infinitiv- und Partizipgruppen: line 859; Bewerbungen:
  line 1180; geschlechtergerechte Sprache: line 1076; Klassenarbeit
  types: lines 1423 to 1458.
- Bayern Gymnasium (by/text/lehrplanplus-gymnasium-deutsch-jgsN.txt):
  tenses jgs5 line 369; Aktiv/Passiv jgs6 line 345; das/dass jgs6 line
  364; Satzglieder incl. Prädikativ and Adverbialsätze jgs6 line 348;
  Konjunktiv jgs7 line 356; Infinitiv commas jgs7 line 378; summary of
  literary texts jgs7 line 288 and jgs8 line 291; Erörterung jgs9 line
  288; Sonett jgs10 line 191; Aufklärung jgs10 line 184; Essay jgs10 line
  297; Nominalstil jgs10 line 260.
- Bayern Realschule (by/text/lehrplanplus-realschule-deutsch-jgsN.txt):
  indirect speech jgs7 line 437; Konjunktiv I and II jgs8 line 452;
  commas with Infinitiv- und Partizipgruppen and Appositionen jgs8 line
  478; Argumentationskette jgs9 line 361.
- Berlin/Brandenburg Gymnasium levels (Klasse 7 = E to 10 = H):
  bebb/text/Teil_C_Deutsch_2024_02_28.txt lines 680 to 686; term lists by
  level lines 1990 to 2130 (Konjunktiv I at F, Konjunktiv II at G,
  Metrum and Epoche at H).

### To fetch

| Priority | Issuer | Document | For |
|---|---|---|---|
| 1 | NRW | Kernlehrplan Deutsch for Realschule or Gesamtschule (Sek I) | second non-Gymnasium order check |
| 2 | Bayern | LehrplanPLUS Mittelschule Deutsch 5 to 9 (the pages for 7 to 9 returned an error page on 2026-10-24) | ESA order check |
| 2 | BW | Bildungsplan 2016 Deutsch, Gymnasium and Sekundarstufe I | third Land |
| 3 | IDS | Verzeichnis grundlegender grammatischer Fachausdrücke (grammis.ids-mannheim.de/vggf), referenced by the KMK annex | grammar terms |
| 3 | KMK | Bildungsstandards Deutsch Allgemeine Hochschulreife (2012, revised 2024 if out) | the Klasse 10 end state seen from the Oberstufe |

Add the captured rows and the to-fetch rows to ../sources.md.

## Size and benchmark

| Klasse | Skills | Lessons (est.) | Benchmark lessons |
|---|---|---|---|
| 5 | 48 | 100 | 54 |
| 6 | 47 | 97 | 42 |
| 7 | 46 | 98 | 35 |
| 8 | 42 | 90 | 42 |
| 9 | 38 | 82 | 40 for 9 and 10 together |
| 10 | 33 | 73 | |
| Total | 254 | about 540 | 213 |

The benchmark's secondary German courses are almost all grammar and
spelling (in Klasse 5 to 8 only one lesson on Sachtexte; literary
genres, epochs and text analysis only in the 9/10 course, about 20
lessons, and no writing lessons). Twist's grammar and spelling skills for
Klasse 5 to 10 (about 95 skills, 190 lessons) are close to the benchmark
in coverage; the rest (literature, writing, media, speaking) is what the
curricula ask for and the benchmark does not cover. The benchmark has one
long topic on irregular verbs (12 lessons in Klasse 5); Twist covers it
with one skill and a drill bank.

Assets are mostly text. Pictures: shot-size and camera images, newspaper
and post mock-ups, portraits for authors in the epoch timeline (public
domain only), scene pictures for stories: about 400 to 600. Narration:
poems and dialogues get model readings; long reading texts are not read
aloud by default from Klasse 5, which keeps narration far below the
Grundschule's 3 GB.
