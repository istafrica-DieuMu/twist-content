# Sprachen (languages): Englisch (English) and the second foreign language (Sek I)

Started 2026-10-24. Follows README.md in this folder. Englisch continues
the Grundschule plan (../englisch.md) from Lernjahr 3 to Lernjahr 8. The
second foreign language is planned at outline level.

## Summary

| | Englisch (first foreign language) | Second foreign language |
|---|---|---|
| Domain | `fl`, continued; new progressions below | `fl` for Französisch (French) and Spanisch (Spanish); a new domain `latin` for Latein (Latin) |
| Frameworks | KMK Bildungsstandards erste Fremdsprache ESA/MSA (2023); NRW Kernlehrplan Englisch Gymnasium G9 (2019) and Realschule (2022); Bayern LehrplanPLUS Gymnasium Englisch Jgst. 5 to 10 | NRW Kernlehrpläne G9 Französisch, Spanisch, Latein (2019); Bayern LehrplanPLUS Gymnasium Französisch and Latein (2. Fremdsprache, Jgst. 6), Spanisch (3. Fremdsprache, Jgst. 8) |
| Placement | by learning year: Lernjahr 3 to 8 = Klasse 5 to 10 for a child who started in Klasse 3 | by learning year: Lernjahr 1 to 4 (NRW, start Klasse 7) or 1 to 5 (Bayern, start Klasse 6) |
| CEFR targets | ESA: A2. MSA: B1. Gymnasium end of Klasse 10: B1+ (NRW) | A2 after the first Stufe, B1 at the end of Sek I (NRW Französisch, Spanisch); Latein: Kleines Latinum, no CEFR level |
| Skills | 183 (Lernjahr 3: 34, 4: 33, 5: 31, 6: 30, 7: 30, 8: 25) | outline: Französisch about 100, Spanisch about 100, Latein about 80 |
| Lessons (estimate) | about 370 | Französisch about 200; Spanisch and Latein later |

## Structure

### Official areas

KMK Bildungsstandards erste Fremdsprache ESA/MSA (2023). Six
Kompetenzbereiche (kmk/text/2023_06_22-Bista-ESA-MSA-ErsteFremdsprache.txt):

| KMK area | Parts | Line |
|---|---|---|
| 2.1 Funktionale kommunikative Kompetenz | Rezeption: Hörverstehen und audiovisuelles Verstehen, Leseverstehen; Sprechen (mündliche Interaktion, mündliche Produktion); Schreiben (schriftliche Interaktion, schriftliche Produktion); Mediation / Sprachmittlung; Verfügen über kommunikative Strategien; Verfügen über sprachliche Mittel (Lexiko-Grammatik, Aussprache und Prosodie) | 332 to 711 |
| 2.2 Interkulturelle Kompetenz | | 712 |
| 2.3 Text- und Medienkompetenz (einschließlich literarisch-ästhetischer Kompetenz) | | 765 |
| 2.4 Sprachbewusstheit | | 819 |
| 2.5 Sprachlernkompetenz | | 860 |
| 2.6 Fremdsprachenspezifische digitale Kompetenz | new in 2023 | 903 |

Levels (line 334): "Bis zum Ersten Schulabschluss erreichen die
Schülerinnen und Schüler im Wesentlichen das Niveau A2", for the MSA
"das Niveau B1". The KMK standards list no grammar items; the
sprachliche Mittel serve communication (line 645 to 655).

NRW Kernlehrplan Englisch G9 (nrw/text/g9_e_klp_3417_2019_06_23.txt) uses
the same five areas as the KMK (funktionale kommunikative Kompetenz,
interkulturelle kommunikative Kompetenz, Text- und Medienkompetenz,
Sprachlernkompetenz, Sprachbewusstheit) in three Stufen:

| NRW Stufe (G9) | Klassen | CEFR | Line |
|---|---|---|---|
| Ende der Erprobungsstufe | 5 and 6 | A2 | 478 |
| Erste Stufe | 7 and 8 | A2 mit Anteilen von B1 | 826 |
| Zweite Stufe | 9 and 10 | B1+ | 1220 |

The Kernlehrplan names the Stufen, not the Klassen; the Klassen follow the
G9 Stundentafel (check against APO-SI). Grammar lists: lines 596, 949, 1341.
Themes ("Soziokulturelles Orientierungswissen"): lines 676, 1044, 1416.

NRW Realschule (nrw/text/rs_e_klp_2022_06_13.txt) has the same three
Stufen, A2 at the end of the Erprobungsstufe (line 474), "A2 mit Anteilen
von B1" after the first Stufe (line 815), B1 at the end (line 1203). Its
grammar lists (lines 586, 935, 1325) are the evidence for "later in RS".

Bayern LehrplanPLUS Gymnasium Englisch has five Lernbereiche per
Jahrgangsstufe: 1 Kommunikative Kompetenzen (1.1 Kommunikative
Fertigkeiten incl. Sprachmittlung; 1.2 Verfügen über sprachliche Mittel:
Wortschatz, Grammatik, Aussprache und Intonation, Orthographie),
2 Interkulturelle Kompetenzen, 3 Text- und Medienkompetenzen,
4 Methodische Kompetenzen, 5 Themengebiete
(by/text/lehrplanplus-gym-englisch-jgs5.txt, -1fs-jgs6 to -1fs-jgs9,
-jgs10). Each grammar item appears only in the year it is introduced,
which makes Bayern the best source for order.

### Twist progressions

The Grundschule `fl` progressions continue. Skills stay language-neutral
where the ability is the same in every language (listening for gist,
writing an email, mediating). Grammar and country knowledge are
language-specific, so they get per-language progressions; that keeps the
`fl` rule ("skills are language-neutral, lessons are per language") true
for everything else.

| Progression | Area | Status |
|---|---|---|
| `fl.listening` | Hörverstehen und audiovisuelles Verstehen | continues |
| `fl.reading` | Leseverstehen | continues |
| `fl.speaking` | Sprechen | continues |
| `fl.writing` | Schreiben | continues |
| `fl.themes` | Wortschatz by topic | continues; new slugs, no clash with Grundschule ones |
| `fl.culture-strategies` | Sprachbewusstheit, Sprachlernkompetenz, digitale Kompetenz | continues |
| `fl.mediation` | Mediation / Sprachmittlung | new; `fl.culture-strategies.mediate` becomes its prerequisite |
| `fl.texts` | Text- und Medienkompetenz, literature, film | new |
| `fl.grammar-en` | Lexiko-Grammatik, English | new, English only |
| `fl.culture-en` | Interkulturelle Kompetenz, anglophone countries | new, English only |
| `fl.exam` | ESA and MSA exam formats | new, language-neutral |

French and Spanish get `fl.grammar-fr`, `fl.culture-fr`, `fl.grammar-es`,
`fl.culture-es` in the same way. `fl.grammar` (Grundschule chunks) stays as
it is and is the prerequisite of the per-language grammar.

curricula/de-DE.yaml `learning_years` extends to `lernjahr-3: { grades:
[klasse-5] }` up to `lernjahr-8: { grades: [klasse-10] }`. Children who
start Englisch in Klasse 5 (Saarland, where Französisch comes first) begin
with Lernjahr 1 and 2 in the a10-12 presentation, as the existing note
for older beginners already says.

## Draft skills per learning year

Columns as in ../sachunterricht.md. The skill column gives the progression
after `fl.`. Notes: **ESA**, **MSA**, **G** and **later in RS** as in
README.md; **E** with a reason; **check** where the sources disagree or
did not settle it; **one Land** where only NRW or only Bayern names it.

Placement rule for grammar: the earlier of NRW G9 and Bayern Gymnasium,
unless the two differ by two years or more; then the later, with a note.
ESA/MSA for grammar is a judgment: the KMK lists no grammar, so an item
is ESA when NRW Realschule puts it in the Erprobungsstufe (A2), MSA when
it comes later.

### Lernjahr 3 (Klasse 5)

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 3 | `grammar-en.be-forms` | Formen von *to be* mit Kurzformen sicher verwenden | ESA |
| 3 | `grammar-en.have-got` | mit *have got* sagen, was jemand hat | ESA |
| 3 | `grammar-en.plurals-irregular` | unregelmäßige Mehrzahlformen bilden (*children, mice, feet*) | ESA |
| 3 | `grammar-en.possessives` | Besitz ausdrücken (*my, your*, *'s*-Genitiv, *of*) | ESA |
| 3 | `grammar-en.object-pronouns` | *me, him, her, us, them* richtig einsetzen | ESA |
| 3 | `grammar-en.this-that` | *this, that, these, those* unterscheiden | ESA |
| 3 | `grammar-en.simple-present` | über Gewohnheiten im *simple present* sprechen, auch mit *-s* | ESA |
| 3 | `grammar-en.do-questions-negatives` | Fragen und Verneinungen mit *do* und *does* bilden | ESA |
| 3 | `grammar-en.question-words` | Fragen mit *who, what, whose, where, when, why* stellen, auch nach dem Subjekt | ESA |
| 3 | `grammar-en.frequency-adverbs` | *always, often, never* an die richtige Stelle setzen | ESA |
| 3 | `grammar-en.present-progressive` | sagen, was gerade passiert, und es vom *simple present* unterscheiden | ESA |
| 3 | `grammar-en.imperative` | Aufforderungen und Verbote formulieren | ESA |
| 3 | `grammar-en.can-must` | mit *can, must, mustn't, needn't* Fähigkeiten, Pflichten und Verbote ausdrücken | ESA |
| 3 | `grammar-en.some-any` | *some, any* und *somebody, anything* richtig verwenden | ESA |
| 3 | `grammar-en.much-many` | Mengen mit *much, many, a lot of* angeben | ESA |
| 3 | `grammar-en.word-order` | Sätze in der Reihenfolge Subjekt, Verb, Objekt, Ort, Zeit bauen | ESA |
| 3 | `grammar-en.past-be` | mit *was* und *were* über Vergangenes sprechen | ESA |
| 3 | `grammar-en.simple-past-regular` | das *simple past* regelmäßiger Verben bilden, auch Fragen mit *did* | ESA |
| 3 | `grammar-en.irregular-verbs-1` | die ersten 40 unregelmäßigen Verben im *simple past* verwenden | ESA |
| 3 | `grammar-en.linking-when-because` | Sätze mit *and, but, when, because, that* verbinden | ESA |
| 3 | `themes.school-day` | über Stundenplan, Fächer und Schulalltag sprechen | ESA |
| 3 | `themes.house-and-room` | mein Zimmer und unser Zuhause genau beschreiben | ESA |
| 3 | `themes.pets` | ein Haustier beschreiben und sagen, wie man es pflegt | ESA |
| 3 | `themes.shopping-food` | einkaufen, Preise nennen und Mengen angeben | ESA |
| 3 | `themes.dates-celebrations` | Datum, Ordnungszahlen und Feste nennen | ESA |
| 3 | `listening.everyday-dialogues` | in kurzen Alltagsgesprächen das Thema und wichtige Einzelheiten verstehen | ESA |
| 3 | `reading.personal-messages` | E-Mails, Postkarten und Chatnachrichten verstehen | ESA |
| 3 | `speaking.classroom-talk` | im Unterricht auf Englisch nachfragen, um Hilfe bitten und mitreden | ESA |
| 3 | `speaking.my-day` | meinen Tagesablauf zusammenhängend erzählen | ESA |
| 3 | `writing.personal-email` | eine kurze persönliche E-Mail oder Postkarte schreiben | ESA |
| 3 | `mediation.signs-menus` | jemandem auf Deutsch sagen, was auf einem Schild oder einer Speisekarte steht | ESA |
| 3 | `culture-en.british-isles` | United Kingdom, Great Britain und Irland unterscheiden und die Hauptstädte nennen | ESA |
| 3 | `culture-en.london-sights` | wichtige Sehenswürdigkeiten Londons erkennen und beschreiben | ESA; Bayern Jgst. 5 also names Washington D.C. and New York, placed in Lernjahr 4 |
| 3 | `culture-strategies.phonetic-script` | Lautschriftzeichen den Lauten zuordnen und neue Wörter richtig aussprechen | ESA receptive; check (NRW G and Bayern only) |

34 skills.

### Lernjahr 4 (Klasse 6)

Target A2 (NRW, end of the Erprobungsstufe).

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 4 | `grammar-en.present-perfect` | mit dem *present perfect* über Erlebtes und Ergebnisse sprechen (*ever, never, just, already, yet*) | ESA |
| 4 | `grammar-en.past-or-perfect` | *simple past* und *present perfect* richtig wählen | ESA |
| 4 | `grammar-en.past-progressive` | mit dem *past progressive* sagen, was gerade geschah, als etwas passierte | MSA, later in RS (NRW RS 9/10); NRW G puts it in 7/8, Bayern in 6 |
| 4 | `grammar-en.going-to` | Pläne mit *going to* ausdrücken | ESA |
| 4 | `grammar-en.will-future` | Vorhersagen und spontane Entscheidungen mit *will* ausdrücken | ESA |
| 4 | `grammar-en.future-forms` | *will, going to* und das *present* für Fahrpläne unterscheiden | MSA |
| 4 | `grammar-en.comparison-adjectives` | Adjektive steigern und vergleichen (*-er, more, as … as*) | ESA |
| 4 | `grammar-en.adverbs-manner` | Adverbien der Art und Weise bilden und von Adjektiven unterscheiden | ESA |
| 4 | `grammar-en.conditional-1` | Bedingungen mit *if* (Typ 1) ausdrücken | ESA |
| 4 | `grammar-en.relative-clauses` | Relativsätze mit *who, which, that* und ohne Relativpronomen bilden | MSA, later in RS (NRW RS 7/8) |
| 4 | `grammar-en.question-tags` | Frageanhängsel verwenden, um ein Gespräch in Gang zu halten | MSA; check (not in the NRW RS lists) |
| 4 | `grammar-en.modals-advice` | mit *should, could, may, might* Rat geben, um Erlaubnis bitten und Vermutungen äußern | ESA |
| 4 | `grammar-en.modal-substitutes` | *be able to, have to, be allowed to* in allen Zeiten verwenden | MSA |
| 4 | `grammar-en.conjunctions` | Sätze mit *although, so that, while* verbinden | MSA |
| 4 | `themes.travel-tickets` | am Bahnhof, Flughafen und Schalter zurechtkommen | ESA |
| 4 | `themes.at-the-doctor` | beim Arzt und in der Apotheke sagen, was mir fehlt | ESA |
| 4 | `themes.holidays-weather` | über Ferien und Wetter berichten | ESA |
| 4 | `themes.sport-music` | über Sport, Musik und Freizeit sprechen | ESA |
| 4 | `themes.town-country` | das Leben in Stadt und Land vergleichen | ESA |
| 4 | `listening.announcements` | Durchsagen am Bahnhof und Flughafen verstehen | ESA |
| 4 | `listening.short-videos` | in kurzen Videoclips Hauptaussagen verstehen und vorhersagen, wie es weitergeht | ESA |
| 4 | `reading.leaflets-websites` | in Prospekten und Webseiten gezielt Informationen finden | ESA |
| 4 | `speaking.directions` | nach dem Weg fragen und den Weg beschreiben | ESA |
| 4 | `speaking.shop-cafe` | im Café bestellen und im Laden etwas kaufen | ESA |
| 4 | `speaking.opinion-because` | meine Meinung sagen und kurz begründen | ESA |
| 4 | `writing.holiday-blog` | über ein Erlebnis in der Vergangenheit schreiben | ESA |
| 4 | `writing.picture-story` | eine Geschichte zu einer Bildfolge schreiben | ESA |
| 4 | `mediation.everyday-info` | Öffnungszeiten, Preise und Angebote zwischen Deutsch und Englisch weitergeben | ESA |
| 4 | `texts.poems-songs` | kurze Gedichte und Liedtexte verstehen und vortragen | ESA |
| 4 | `texts.story-characters` | in einer einfachen Geschichte Figuren und Handlung erkennen | ESA |
| 4 | `culture-en.usa-overview` | die USA mit Regionen, Alaska und Hawaii, Washington und New York beschreiben | ESA |
| 4 | `culture-en.romans-in-britain` | Spuren der Kelten und Römer in Britannien nennen (Hadrian's Wall, Bath) | G, one Land (Bayern Jgst. 6) |
| 4 | `culture-strategies.false-friends` | falsche Freunde und Wort-für-Wort-Fallen erkennen (*become, lucky, drive*) | ESA |

33 skills.

### Lernjahr 5 (Klasse 7)

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `grammar-en.irregular-verbs-2` | weitere 60 unregelmäßige Verben in allen drei Formen sicher verwenden | ESA |
| 5 | `grammar-en.possessive-pronouns` | *mine, yours, theirs* verwenden | ESA |
| 5 | `grammar-en.reflexive-pronouns` | *myself, each other* und reflexive Verben richtig einsetzen | MSA |
| 5 | `grammar-en.prop-word-one` | Wiederholungen mit *one* und *ones* vermeiden | MSA |
| 5 | `grammar-en.adverbs-position` | Adverbien steigern und an die richtige Stelle setzen | MSA |
| 5 | `grammar-en.present-perfect-progressive` | mit *since* und *for* sagen, wie lange etwas schon andauert | MSA; check (not named in the NRW RS lists) |
| 5 | `grammar-en.past-perfect` | mit dem *past perfect* Vorzeitigkeit ausdrücken | MSA, later in RS |
| 5 | `grammar-en.narrative-tenses` | in einer Geschichte *simple past, past progressive* und *past perfect* mischen | MSA, later in RS |
| 5 | `grammar-en.conditional-2` | unwahrscheinliche Bedingungen ausdrücken (*If I were …*) | MSA |
| 5 | `grammar-en.conditional-3` | über verpasste Möglichkeiten in der Vergangenheit sprechen | MSA, later in RS |
| 5 | `grammar-en.state-verbs` | Verben, die keine *-ing*-Form haben, erkennen (*know, like, belong*) | MSA |
| 5 | `themes.media-use` | über meine Mediennutzung, ihre Chancen und Gefahren sprechen | ESA |
| 5 | `themes.friends-feelings` | Gefühle beschreiben und über Freundschaft und Streit sprechen | ESA |
| 5 | `themes.environment` | über Umweltschutz im Alltag sprechen | ESA |
| 5 | `listening.interviews` | Interviews und Podcasts für Jugendliche verstehen, Hauptaussagen und Einzelheiten | MSA |
| 5 | `listening.accents` | britisches und amerikanisches Englisch am Klang unterscheiden | MSA |
| 5 | `reading.skim-scan` | einen Text überfliegen und gezielt nach Informationen absuchen | MSA |
| 5 | `reading.unknown-words` | unbekannte Wörter aus Wortteilen und Zusammenhang erschließen | MSA (KMK names it for the MSA) |
| 5 | `speaking.describe-picture` | ein Bild oder einen Cartoon beschreiben | ESA |
| 5 | `speaking.short-talk` | einen vorbereiteten Kurzvortrag mit Stichwortzettel halten | ESA |
| 5 | `speaking.agree-disagree` | in einem Gespräch zustimmen, widersprechen und nachfragen | MSA |
| 5 | `writing.online-post` | einen Beitrag oder Kommentar in einem Forum schreiben | ESA |
| 5 | `writing.reply-letter` | auf einen persönlichen Brief ausführlich antworten | MSA |
| 5 | `writing.story-ending` | eine Geschichte weiterschreiben oder ein neues Ende erfinden | MSA |
| 5 | `mediation.summarise-for-someone` | den Inhalt eines englischen Textes für jemanden auf Deutsch zusammenfassen | MSA |
| 5 | `texts.story-feelings` | Gefühle und Eigenschaften von Figuren aus einem Text erschließen | MSA |
| 5 | `culture-en.uk-regions` | Regionen des UK beschreiben (Wales, Cornwall, Lake District) | ESA; Bayern Jgst. 6 and 7, NRW "eine Region in Großbritannien" |
| 5 | `culture-en.teens-in-north-america` | Schulalltag, Feste und Freizeit Jugendlicher in den USA beschreiben (Thanksgiving, Independence Day) | ESA |
| 5 | `culture-en.early-history` | 1066, Henry VIII, Elizabeth I und die *Mayflower* in eine Zeitleiste ordnen | G, one Land (Bayern Jgst. 7) |
| 5 | `culture-strategies.be-ae` | britische und amerikanische Wörter und Schreibweisen unterscheiden | MSA |
| 5 | `culture-strategies.learn-words-smart` | Wortschatz in Wortfamilien, Wortfeldern und *chunks* lernen | ESA |

31 skills.

### Lernjahr 6 (Klasse 8)

Target A2 with parts of B1 (NRW, end of the first Stufe).

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 6 | `grammar-en.passive-basic` | Vorgänge im Passiv beschreiben (Gegenwart und Vergangenheit) | MSA |
| 6 | `grammar-en.passive-tenses` | das Passiv in allen Zeiten und mit zwei Objekten bilden | MSA; check (NRW G lists the personal passive in 9/10) |
| 6 | `grammar-en.gerund` | das *gerund* als Subjekt und nach Präpositionen verwenden | MSA |
| 6 | `grammar-en.gerund-or-infinitive` | nach einem Verb *gerund* oder *to*-Infinitiv wählen | MSA |
| 6 | `grammar-en.reported-statements` | wiedergeben, was jemand gesagt hat (indirekte Rede) | MSA, later in RS |
| 6 | `grammar-en.reported-questions` | Fragen und Aufforderungen indirekt wiedergeben | MSA, later in RS |
| 6 | `grammar-en.articles-use` | wissen, wann *the* steht und wann nicht (*school, people, the USA*) | MSA |
| 6 | `grammar-en.non-defining-relatives` | Zusatzinformationen in Relativsätzen mit Kommas geben | MSA, later in RS (NRW RS 9/10, Bayern Jgst. 9, NRW G 7/8) |
| 6 | `grammar-en.contrast-purpose` | Gegensätze und Absichten ausdrücken (*even though, whereas, in order to*) | MSA |
| 6 | `themes.part-time-jobs` | über Ferienjobs und Taschengeld sprechen | ESA |
| 6 | `themes.city-life` | das Leben in einer Großstadt beschreiben und mit meinem Ort vergleichen | ESA |
| 6 | `listening.podcast-details` | einem längeren Podcast Einzelheiten entnehmen | MSA |
| 6 | `listening.film-scene` | eine Filmszene mit Untertiteln verstehen | MSA |
| 6 | `reading.news-report` | in einem Zeitungsbericht Hauptaussagen und unterstützende Details unterscheiden | MSA |
| 6 | `reading.statistics` | Diagramme und Statistiken beschreiben | MSA |
| 6 | `speaking.phone-call` | telefonisch etwas buchen oder nachfragen | ESA |
| 6 | `speaking.presentation` | eine Präsentation gliedern und mit Überleitungen halten | MSA |
| 6 | `writing.formal-email` | eine formelle E-Mail schreiben (Anfrage, Beschwerde) | MSA |
| 6 | `writing.paragraphs` | Absätze mit Themensatz und Verbindungswörtern schreiben | MSA |
| 6 | `writing.summary` | einen Text kurz zusammenfassen | MSA |
| 6 | `mediation.for-a-visitor` | einem Gast aus dem Ausland einen deutschen Text auf Englisch erklären | MSA |
| 6 | `texts.cartoon-song` | Aussage und Wirkung eines Cartoons oder Songs erklären | MSA |
| 6 | `culture-en.london-today` | London als Weltstadt beschreiben: Vielfalt, Wirtschaft, Kultur | MSA |
| 6 | `culture-en.political-systems` | Monarchie im UK und Präsidialsystem der USA vergleichen | MSA; check (Bayern Jgst. 8 names it; NRW "politische Aspekte") |
| 6 | `culture-en.american-independence` | die Entstehung der USA erklären (Boston Tea Party, Declaration of Independence) | G, one Land (Bayern Jgst. 8) |
| 6 | `culture-en.west-native-americans` | die Besiedlung des Westens und die Folgen für die Native Americans beschreiben | G, one Land (Bayern Jgst. 8) |
| 6 | `culture-en.immigration-usa` | erklären, warum Menschen aus Europa in die USA auswanderten | MSA (NRW first Stufe) |
| 6 | `culture-en.canada` | Kanada mit Geographie, Zweisprachigkeit und First Nations beschreiben | G, one Land (Bayern Jgst. 8) |
| 6 | `culture-strategies.register` | formelle und informelle Sprache unterscheiden und passend wählen | MSA |
| 6 | `culture-strategies.dictionary-use` | ein einsprachiges und ein digitales Wörterbuch nutzen | MSA |

30 skills.

### Lernjahr 7 (Klasse 9)

The ESA is taken at the end of Klasse 9; the ESA exam skills sit here.

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 7 | `grammar-en.used-to-would` | über frühere Gewohnheiten mit *used to* und *would* sprechen | MSA, later in RS |
| 7 | `grammar-en.tense-overview` | aus allen Zeitformen die passende wählen | MSA |
| 7 | `grammar-en.future-progressive-perfect` | mit *will be doing* und *will have done* über die Zukunft sprechen | G (NRW G 9/10 only) |
| 7 | `grammar-en.participle-clauses` | Sätze mit Partizipialkonstruktionen verkürzen und verbinden | MSA, later in RS |
| 7 | `grammar-en.emphasis` | Aussagen hervorheben (*do*-Emphase, *It was … who*, Inversion) | G |
| 7 | `grammar-en.modal-nuances` | mit *might, ought to, shall, need* Grade von Sicherheit und Pflicht ausdrücken | MSA |
| 7 | `grammar-en.indirect-questions` | höfliche indirekte Fragen stellen (*Could you tell me where …?*) | MSA |
| 7 | `grammar-en.linking-adverbs` | Gedanken mit *however, therefore, moreover* verknüpfen | MSA |
| 7 | `themes.work-internship` | über Berufswünsche, Praktikum und Arbeit im Ausland sprechen | ESA |
| 7 | `themes.consumption-advertising` | über Konsum, Werbung und Nachhaltigkeit sprechen | MSA |
| 7 | `themes.school-exchange` | einen Schüleraustausch planen und darüber berichten | MSA |
| 7 | `listening.discussion` | einer Diskussion folgen und die Meinungen der Sprechenden erkennen | MSA |
| 7 | `reading.argument-text` | in einem Meinungstext Argumente und Haltung erkennen | MSA |
| 7 | `speaking.discussion` | in einer Diskussion argumentieren und auf andere eingehen | MSA |
| 7 | `speaking.job-interview` | ein Vorstellungsgespräch führen | MSA |
| 7 | `writing.cv-application` | einen Lebenslauf und ein Bewerbungsschreiben verfassen | MSA |
| 7 | `writing.comment` | einen Kommentar mit Für und Wider schreiben | MSA |
| 7 | `writing.characterisation` | eine Figur aus einem Text charakterisieren | MSA |
| 7 | `writing.change-perspective` | eine Szene aus der Sicht einer anderen Figur neu schreiben | MSA |
| 7 | `mediation.article-for-partner` | einen deutschen Artikel für eine Austauschpartnerin auf Englisch zusammenfassen | MSA |
| 7 | `texts.short-story` | eine *short story* nach Handlung, Figuren und Erzähler untersuchen | MSA |
| 7 | `texts.poem-devices` | in Gedichten und Songs einfache Stilmittel erkennen | MSA; check (Bayern Jgst. 9 and NRW G; RS not checked) |
| 7 | `culture-en.australia-nz` | Australien und Neuseeland beschreiben, auch die Geschichte der Aborigines | MSA (NRW "ein weiteres anglophones Land"; Bayern Jgst. 9) |
| 7 | `culture-en.world-english` | erklären, wo und warum Englisch Weltsprache ist, und Varietäten erkennen | MSA |
| 7 | `culture-en.stereotypes` | Stereotype und Vorurteile über Länder erkennen und hinterfragen | MSA |
| 7 | `culture-strategies.check-my-text` | meinen Text mit einer Checkliste auf typische Fehler prüfen | MSA |
| 7 | `exam.esa-listening` | Hörverstehensaufgaben im Prüfungsformat lösen | ESA |
| 7 | `exam.esa-reading` | Leseaufgaben im Prüfungsformat lösen (Zuordnen, Lücken, Richtig oder Falsch) | ESA |
| 7 | `exam.esa-writing` | eine Schreibaufgabe im Prüfungsformat planen und schreiben | ESA |
| 7 | `exam.esa-mediation` | eine Sprachmittlungsaufgabe im Prüfungsformat lösen | ESA |

30 skills.

### Lernjahr 8 (Klasse 10)

Target B1 (MSA) and B1+ (NRW Gymnasium).

| Lernjahr | Skill | Ich kann … | Note |
|---|---|---|---|
| 8 | `grammar-en.mixed-conditionals` | Bedingungssätze aller Typen und Mischformen verwenden | G (Bayern Jgst. 7 Mischformen; NRW RS lists types 1 to 3 only) |
| 8 | `grammar-en.lassen` | *let, make, have something done* für deutsch „lassen" richtig wählen | MSA; E for the narrow item: no curriculum names it, it is a frequent error of German speakers |
| 8 | `grammar-en.countable-uncountable` | zählbare und nicht zählbare Nomen richtig verwenden (*advice, information*) | MSA |
| 8 | `themes.global-challenges` | über Klimawandel, Migration und Menschenrechte sprechen | MSA |
| 8 | `listening.authentic-media` | Nachrichten, Reden und Dokumentationen in verschiedenen Varietäten verstehen | MSA |
| 8 | `reading.online-sources` | englische Online-Quellen finden und ihre Glaubwürdigkeit prüfen | MSA (KMK 2.6) |
| 8 | `speaking.monologue` | zusammenhängend zu einem Thema sprechen, wie in der mündlichen Prüfung | MSA |
| 8 | `speaking.debate` | in einer Debatte Position beziehen und Gegenargumente entkräften | MSA |
| 8 | `writing.article-report` | einen Artikel oder Bericht für eine Schülerzeitung schreiben | MSA |
| 8 | `writing.picture-comment` | ein Bild beschreiben und Stellung dazu nehmen | MSA |
| 8 | `writing.essay` | einen gegliederten argumentativen Aufsatz schreiben | G |
| 8 | `mediation.intercultural` | beim Vermitteln kulturelle Unterschiede erklären | MSA |
| 8 | `texts.novel` | einen Jugendroman in Abschnitten lesen und verstehen | G (Bayern Jgst. 10 Ganzschrift) |
| 8 | `texts.film-analysis` | Kameraeinstellungen, Musik und Schnitt in einer Filmszene deuten | MSA; check |
| 8 | `texts.drama-scene` | eine Dramenszene lesen und die Beziehungen der Figuren erklären | MSA |
| 8 | `texts.stylistic-devices` | Stilmittel in Sachtexten und Reden erkennen und ihre Wirkung erklären | G |
| 8 | `culture-en.civil-rights` | Sklaverei, Bürgerkrieg und Civil Rights Movement erklären | MSA (NRW "Demokratie und Menschenrechte"; Bayern Jgst. 10) |
| 8 | `culture-en.scotland` | Schottland mit Geschichte, Politik und Gesellschaft beschreiben | G, one Land (Bayern Jgst. 10) |
| 8 | `culture-en.youth-culture` | Jugendkulturen früher und heute vergleichen | MSA |
| 8 | `culture-strategies.translation-tools` | Übersetzungsprogramme und KI-Texte prüfen und sinnvoll einsetzen | MSA (KMK 2.6) |
| 8 | `exam.msa-listening` | Hör- und Hörsehaufgaben im MSA-Format lösen | MSA |
| 8 | `exam.msa-reading` | Leseaufgaben im MSA-Format lösen | MSA |
| 8 | `exam.msa-writing` | eine MSA-Schreibaufgabe in der vorgegebenen Zeit lösen | MSA |
| 8 | `exam.msa-mediation` | eine Sprachmittlungsaufgabe im MSA-Format lösen | MSA |
| 8 | `exam.oral-exam` | mich auf eine mündliche Prüfung vorbereiten (Monolog und Gespräch) | MSA |

25 skills.

Count: 34 + 33 + 31 + 30 + 30 + 25 = 183 skills.

## Second foreign language

### When and which

| Land | Start (Gymnasium) | Choice | Source |
|---|---|---|---|
| NRW G9 | Klasse 7 (moved from 6 with G9; the same at other school types) | Französisch, Latein, Spanisch and others | nrw/text/Faktenblatt_G9-Schulfachliche-Umsetzung.txt line 52 to 57 |
| Bayern | Jgst. 6 | Französisch or Latein (Latein also as first foreign language from Jgst. 5); Spanisch only as third foreign language from Jgst. 8 or late-starting | by/raw/lehrplanplus-gym-franzoesisch-2fs-jgs6.html, -latein-2fs-jgs6.html, -spanisch-3fs-jgs8.html |

CEFR targets for a modern second foreign language: A2 at the end of the
first Stufe and B1 at the end of Sek I (NRW Französisch
nrw/text/g9_f_klp_3410_2019_06_23.txt lines 469 and 844; Spanisch
nrw/text/g9_s_klp_3416_2019_06_23.txt lines 473 and 824). There is no
KMK standard for the second foreign language at ESA or MSA level.

Latein has no CEFR target. NRW: original texts from the third learning
year at the latest (g9_l_klp_3402_2019_06_23_0.txt line 441), a basic
vocabulary of 1100 to 1200 lemmata (line 495), and the Kleines Latinum
usually at the end of Sek I (line 269).

### Recommendation

Plan **Französisch first**, then **Latein**, then **Spanisch**.

1. Französisch is the second foreign language in every Land and at every
   school type that offers one; national pupil numbers by language are to
   be confirmed from Destatis (Sources, still to fetch).
2. Twist already has French in `fl`: en-GB teaches French as its primary
   foreign language with 64 French lesson files (lessons/en-GB/ly-1 to
   ly-4/fl) and French narration voices (assets/narration/*-fr). The
   language-neutral `fl` skills, the French audio pipeline and many
   pictures carry over.
3. The Saarland teaches Französisch as first foreign language from the
   Grundschule; a de-DE French track would use the same skills.
4. Latein is Gymnasium-only and needs a different design (below), so it
   should not hold up Französisch. Its drill-heavy content (forms,
   vocabulary) fits an app well, which makes it the second priority.
5. Spanisch reuses the Französisch structure almost one to one once that
   exists; Bayern offers it only as a third language, which lowers demand
   in one of the two reference Länder.

### Französisch (and Spanisch) through `fl`

Learning years run 1 to 4 (start Klasse 7) or 1 to 5 (start Klasse 6).
The child is 11 or 12, so Lernjahr 1 compresses the Grundschule `fl`
steps (Stufe 0, Lernjahr 1 and 2) into one year in an a10-12 presentation;
the same skills get French lessons, not new skills.

| Learning year | CEFR | Outline | Skills (estimate) |
|---|---|---|---|
| 1 | A1 | Grundschule `fl` skills in French (greet, numbers, family, school, food, likes); `grammar-fr`: articles and gender, *être, avoir*, verbs in *-er*, *ne … pas*, questions with *est-ce que*, plural; `culture-fr`: France on the map, Paris, greetings (*la bise*) | 30 (most reused `fl` skills with new lessons) |
| 2 | A1 to A2 | `grammar-fr`: *aller, faire* and irregular verbs, *futur composé*, *passé composé* with *avoir* and *être*, possessives, adjectives and their position, object pronouns; themes: town, shopping, hobbies, holidays; `mediation` and `writing` skills reused | 25 |
| 3 | A2 | `grammar-fr`: *imparfait* and *passé composé*, relative pronouns, *futur simple*, comparison, *y* and *en*; `culture-fr`: regions, Franco-German friendship, school in France | 25 |
| 4 (and 5) | A2 to B1 | `grammar-fr`: *conditionnel*, *si*-clauses, *subjonctif* (common triggers), *gérondif*; `culture-fr`: francophonie (Québec, West Africa), youth and media; `texts`: *bande dessinée*, chanson, short story; `exam` skills | 20 to 25 |

About 100 skills, about 200 lessons. Spanisch: same outline with
`grammar-es` (*ser* and *estar*, *gustar*, stem-changing verbs,
*pretérito perfecto, indefinido, imperfecto*, *subjuntivo*) and
`culture-es` (Spain, Latin America, Spanish in the USA).

The grammar items per year above follow the usual textbook order and are
not yet checked against the NRW and Bayern lists; check before drafting
slugs.

### Latein: a separate domain

Latein is a reading and translating subject; nobody speaks it, listens
to it or writes letters in it. Most `fl` skills (listening, speaking,
writing, mediation in the communicative sense) do not apply, so Latein
gets its own domain `latin`, named in de-DE as "Latein". Progressions
follow the three NRW Kompetenzbereiche (line 389 to 420) and the Bayern
Lernbereiche (Texte, Sprachliche Basis, Kultureller Kontext, Methodik):

| Progression | NRW area | App fit |
|---|---|---|
| `latin.words` | Sprachkompetenz (Wortschatz) | very good: 1100 to 1200 lemmata as a drill bank, word families, Latin roots in German, English and French |
| `latin.forms` | Sprachkompetenz (Formenlehre) | very good: identify and build forms (declensions 1 to 5, conjugations, tenses, voice) with tables |
| `latin.syntax` | Sprachkompetenz (Satzlehre) | good: mark subject, predicate, cases; AcI, ablativus absolutus, participles as sentence diagrams |
| `latin.texts` | Textkompetenz | partial: decode a sentence step by step, choose or assemble the best German translation; free translation needs a teacher |
| `latin.culture` | Kulturkompetenz (Antike Welt) | good: Rome's topography, daily life, myths, Pompeji (Bayern Jgst. 6, by/text/lehrplanplus-gym-latein-2fs-jgs6.txt line 398) |

Links: `lit-de` grammar terms (Wortarten, Satzglieder, Fälle) are hard
prerequisites; `world.time` and Geschichte (Rome) are soft ones;
`fl.culture-strategies.compare-languages` links Latin roots to English
and French words. Audio is optional (vocabulary in classical
pronunciation). About 80 skills over four or five learning years, ending
with original texts (Caesar, Ovid, Phaedrus are in the public domain).

## Overlaps and prerequisites

| Item | Already in | Plan |
|---|---|---|
| Grundschule English | `fl` Stufe 0, Lernjahr 1 and 2 | hard prerequisites for Lernjahr 3: `fl.grammar.he-she-it` before `grammar-en.simple-present`, `fl.grammar.now-and-routine` before `grammar-en.present-progressive`, `fl.culture-strategies.mediate` before `mediation.signs-menus` |
| grammar terms (Nomen, Verb, Zeitform, Aktiv/Passiv, Relativsatz) | `lit-de` Grundschule and Sek I (deutsch.md in this folder) | soft prerequisites; Englisch lessons use the German term next to the English one |
| text types (Bericht, Kommentar, Charakterisierung, Inhaltsangabe) | Sek I Deutsch (German) | `fl.writing` and `fl.texts` reuse the German method; the lesson adds only the English conventions |
| countries, history (Romans, colonisation, independence, Civil Rights, Cold War) | Erdkunde (geography) and Geschichte (gesellschaft.md) | `culture-en` teaches the English-language view and vocabulary; facts link to the history skills as soft prerequisites |
| statistics and charts | `math` | `reading.statistics` only adds the English phrases |
| media literacy, online sources, AI tools | Informatik (computer science), Deutsch | `reading.online-sources` and `culture-strategies.translation-tools` stay language-specific |
| job applications | Deutsch, Wirtschaft (Berufsorientierung) | `writing.cv-application` covers English formats only |

## Out of scope for an app

To record in ../omitted.md and, once the frameworks exist, in
curricula/de-DE.yaml `out_of_scope`:

- Spontaneous conversation with a real partner (KMK MSA "spontan und
  flüssig an Gesprächen … teilnehmen"). Twist simulates dialogues with
  set turns and can record the child; open interaction with an
  unpredictable partner needs another person.
- Group discussions, role plays with classmates, peer feedback, project
  work.
- The oral exam with an examiner. `exam.oral-exam` prepares for it.
- Grading free writing of more than a few sentences. Twist offers a
  model text and a self-check list; automatic marking is an open
  decision (it would need a language model and a review process).
- Copyrighted novels, films, TV clips and songs. Twist writes its own
  stories, scenes and songs, uses public-domain texts (and for Latein the
  classical authors), and links to reading guides only for set texts.
- Exchanges, trips and stays abroad.
- Free translation from Latin into German as the only answer form; Twist
  uses step-by-step decoding and choice or assembly of translations.
- Klassenarbeiten and their Land-specific formats; `exam` skills follow
  the shared KMK formats.

## Task types and drawn components needed (new only)

| Item | Kind | For |
|---|---|---|
| `text_input` with a letter keyboard | new interaction of an existing type (today a number keypad) | spelling, verb forms, gap fills with free typing |
| reading passage with several questions | activity setting: a text that stays on screen beside 3 to 6 tasks | `reading.*`, `texts.*`, `exam.*` |
| listening passage with several questions | activity setting: audio with replay limits as in exams | `listening.*`, `exam.*` |
| chat reply | new task type: a message thread, the child picks or builds the next message | `writing.online-post`, `speaking.*` simulations, `mediation.*` |
| write and check | new task type: free text, then a model answer and a checklist the child ticks; counts only the checked items that the app can verify (length, required words) | `writing.*`, `exam.*-writing` |
| longer `speak` | new interaction of `speak`: a 30 to 90 second answer, played back next to a model | `speaking.monologue`, `exam.oral-exam` |
| `multi_select`, `drag_and_drop` | listed as not used yet | marking several true statements; labelling maps |
| tense timeline | drawing: a time line with now, past, future and markers for duration | all tense skills |
| maps of the UK and Ireland, USA, Canada, Australia and New Zealand, France | drawings; share with Erdkunde | `culture-en.*`, `culture-fr.*` |
| phonetic chart | drawing: IPA symbols with sample words | `culture-strategies.phonetic-script` |
| message frames: email, letter, chat, forum post, departure board, menu, sign, leaflet | drawings | reading, writing and mediation tasks |
| storyboard of film shots | drawing: close-up, long shot, high angle | `texts.film-analysis` |
| Latin sentence diagram | drawing: words coloured by role, arrows from attributes to nouns | `latin.syntax`, `latin.texts` |
| declension and conjugation tables | existing `table` drawing with gaps | `latin.forms`, `grammar-fr` |

## Fun: hooks for ages 10 to 16

fun.md applies. At this age the hooks shift from play to challenge, real
use, competition with oneself and humour.

| Hook | What it is | Used in |
|---|---|---|
| Mission abroad | each learning year has a serial story: a trip to London (Lernjahr 3 to 4), a term at a US high school (5 to 6), an exchange in Australia (7), a youth project in Scotland (8). Lessons are episodes; the child needs English to move the story on | themes, culture-en, speaking simulations |
| Beat your time | timed rounds on irregular verbs and forms against the child's own best, never against other children | `grammar-en.irregular-verbs-*`, `latin.forms` |
| Be the interpreter | the child helps a grandparent at a hotel, a lost tourist in the home town, a cousin reading an English game manual | `mediation.*` |
| Chat simulations | message threads with story characters; choosing the reply changes the next message | `writing.online-post`, `speaking.agree-disagree` |
| Funny mistakes | false friends and literal translations as jokes ("I become a burger"); the right form is never in doubt | `culture-strategies.false-friends`, `grammar-en.lassen` |
| Record and compare | the child records a talk, hears it next to the model, and again a month later | `speaking.*`, `exam.oral-exam` |
| Real-world tasks | write a real email to a pen friend, check a travel website, read a menu for a family holiday | writing, reading |
| Escape room | short story puzzles where each clue needs a grammar form or a fact (a Roman villa for Latein) | grammar review, `latin.*` |
| Exam countdown | from Lernjahr 7, a visible plan to the ESA or MSA date with mock tasks | `exam.*` |

Review question (adapted from fun.md): would a 13-year-old do this lesson
again without being told? If only because of homework, change the hook.

## Sources

### Captured 2026-10-24 (rnd/official-de/, logged in fetch-log.jsonl)

| File | What |
|---|---|
| kmk/raw/2023_06_22-Bista-ESA-MSA-ErsteFremdsprache.pdf | KMK Bildungsstandards erste Fremdsprache ESA/MSA (22.06.2023) |
| kmk/raw/2012_10_18-Bildungsstandards-Fortgef-FS-Abi.pdf | KMK standards for the Abitur, fortgeführte Fremdsprache; Oberstufe, not used here |
| nrw/raw/g9_e_klp_3417_2019_06_23.pdf | NRW Kernlehrplan Englisch Gymnasium G9 |
| nrw/raw/rs_e_klp_2022_06_13.pdf | NRW Kernlehrplan Englisch Realschule |
| nrw/raw/g9_f_klp_3410_2019_06_23.pdf | NRW Kernlehrplan Französisch Gymnasium G9 |
| nrw/raw/g9_s_klp_3416_2019_06_23.pdf | NRW Kernlehrplan Spanisch Gymnasium G9 |
| nrw/raw/g9_l_klp_3402_2019_06_23_0.pdf | NRW Kernlehrplan Latein Gymnasium G9 |
| nrw/raw/Faktenblatt_G9-Schulfachliche-Umsetzung.pdf | NRW G9 fact sheet (second foreign language from Klasse 7) |
| by/raw/lehrplanplus-gym-englisch-jgs5.html, -englisch-1fs-jgs6 to -jgs9.html, -englisch-jgs10.html | Bayern LehrplanPLUS Gymnasium Englisch Jgst. 5 to 10 |
| by/raw/lehrplanplus-gym-franzoesisch-2fs-jgs6.html | Bayern Französisch as second foreign language, Jgst. 6 |
| by/raw/lehrplanplus-gym-latein-2fs-jgs6.html | Bayern Latein as second foreign language, Jgst. 6 |
| by/raw/lehrplanplus-gym-spanisch-3fs-jgs8.html | Bayern Spanisch as third foreign language, Jgst. 8 |

by/raw/lehrplanplus-gym-englisch-jgs6.html to -jgs9.html are the
LehrplanPLUS start page (the URL without /1-fremdsprache redirects
there). They stay under the keep rule; the -1fs- files hold the content.

To add to ../sources.md.

### Still to fetch

- Bayern Französisch and Latein Jgst. 7 to 10 (second foreign language),
  for grammar order; NRW schulinterne Lehrpläne (g9_f_silp, g9_s_silp,
  g9_l_silp) for a year-by-year split.
- Bayern Realschule Englisch (LehrplanPLUS Realschule) to check "later in
  RS" against a second Land.
- KMK Vereinbarung on the Latinum (2005, revised) and the Bayern Latinum
  rules.
- Destatis, Allgemeinbildende Schulen: pupils by foreign language, to
  confirm the order Französisch, Latein, Spanisch.
- One central exam per type for `exam` formats: NRW Zentrale Prüfungen 10
  Englisch (MSA and ESA) and the Bayern Realschule Abschlussprüfung
  Englisch.
- Stundentafeln for the start Klasse of the second foreign language in
  other Länder (BW, Hessen, Niedersachsen).

## Size and benchmark

| | Twist plan | Benchmark |
|---|---|---|
| Englisch Klasse 5 to 10 | 183 skills, about 370 lessons | 238 lessons (Klasse 5: 50, 6: 51, 7: 36, 8: 30, 9: 35, 10: 36), of them 28 lessons of irregular verbs and 9 of listening practice |
| Französisch, Spanisch | about 100 skills each, about 200 lessons each | ungraded vocabulary courses only (40 lessons each); no Sek I course |
| Latein | about 80 skills | none |

The benchmark repeats grammar topics across years (irregular verbs in
four years, tenses reviewed in Klasse 9 to 11) and has few lessons on
writing, mediation and text work. Twist places each grammar item once and
reviews it through practice (twist/docs/practice.md) instead of repeat
lessons, and adds the KMK areas the benchmark covers least: Sprachmittlung,
Text- und Medienkompetenz and exam formats. If 370 lessons is too much
for a first release, the G-only skills (12) and the exam skills (9) can
wait; that leaves 162 skills and about 325 lessons.
