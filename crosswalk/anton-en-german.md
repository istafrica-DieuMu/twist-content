# Crosswalk: Anton DaZ and German (en_gb) against Twist German, en LOI

Date: 2026-10-09

## Inputs

- Twist, read only: `/Users/diemu/ist/b2c/schoolido-learning/content/en/grade-{1,2,3,4}/german/module-catalog.md` (26, 29, 23 and 25 lessons).
- Anton, primary: `/Users/diemu/ist/b2c/rnd/catalogue/views/de-deutsch-als-zweitsprache-daz.md` (c-alpha-deu, c-deu-a1, c-deu-a2, c-mono-deu-0; c-sldeu-1 and c-sldeu-2 have 0 lessons and are marked outdated, so they are not counted).
- Anton, secondary: `/Users/diemu/ist/b2c/rnd/catalogue/views/en_gb-foreign-languages.md`, course German (c-mono-deu-1, 40 lessons). Its topics and titles repeat c-mono-deu-0 plus a Wiederholung lesson per topic, so c-mono-deu-0 is not matched separately.
- Anton, G3/G4 question only: `/Users/diemu/ist/b2c/rnd/catalogue/views/de-deutsch.md`, c-natdeu-3 (Klasse 3) and c-natdeu-4 (Klasse 4).
- Background: `/Users/diemu/ist/b2c/rnd/anatomy.md`, `/Users/diemu/ist/b2c/schoolido-learning/docs/authoring/german-en-loi-standard.md`, `/Users/diemu/ist/b2c/rnd/crosswalk/README.md`.

## Method

The catalogue views list lesson titles only, so every match is judged from titles and topic names, not exercise content. A match is exact when the Anton titles cover the Twist lesson's whole scope and partial when they cover part of it or the fit rests on a nearest title. Twist rows with several Anton lessons carry them all in one cell. Anton lessons count as matched when a row cites them. Twist titles with an em dash are written with a hyphen. Anton level ages are not in the inputs, so grades are aligned by content difficulty and the Twist target ages in the catalogues (6-7, 7-8, 8-9, 9-10).

## Track verdict

| Twist grade | Verdict | Evidence |
|---|---|---|
| G1 | Foreign language | Letters, sounds and vocabulary themes (colours, family, body, animals, school) line up with c-alpha-deu and c-mono-deu-1. Reading and writing answers are in English, as the en-LOI standard requires. 20 of 26 lessons match DaZ or c-mono-deu-1. |
| G2 | Mostly foreign language, switch begins | Vocabulary, articles, conjugation and word order match DaZ A1 (7 of 29 lessons match DaZ). Ten lessons are native-style literacy with no DaZ counterpart: Word Families, Compound Words, Affixes, Reading main idea, Reading details and inference, both Paragraphs lessons, both Creative Writing lessons, Poetry. Anton's native course puts compounds, affixes, poetry and the article and conjugation topics in Klasse 3 (see Misplaced). |
| G3 | Native speaker | 17 of 21 matched lessons match c-natdeu-3 or c-natdeu-4 (11 native only, 6 native and DaZ); 4 match DaZ only. Topics are diphthong spelling, syllable division, Märchen, Elfchen and Haikus, Perfekt and Nominativ/Akkusativ. These fit Deutsch Klasse 3 better than DaZ A2. |
| G4 | Native speaker | 16 of 17 matched lessons match c-natdeu-3 or c-natdeu-4 (11 native only, 5 native and DaZ); 1 match DaZ only. Dativ, Präteritum, weil and dass clauses, Aufsatz, Redewendungen and Balladen-level literature fit Deutsch Klasse 4. DaZ A2 covers only the grammar items (Dativ, war and hatte, weil, adjective endings), not the writing or literature lessons. |

The track switches in G2 and is complete by G3. G1 and the vocabulary and grammar half of G2 read as German as a foreign language; the G2 literacy lessons and all of G3 and G4 read as German for native speakers. The en-LOI standard covers G1 and G2 only, so G3 and G4 have no foreign-language framing (their catalogues say authored from scratch). Deutsch Klasse 1 and 2 were not compared.

## Grade and level alignment

| Twist grade | Target age | Anton DaZ and German (en_gb) level | Anton native Deutsch (comparison) | Basis |
|---|---|---|---|---|
| G1 | 6-7 | Alphabetisierung (c-alpha-deu); c-mono-deu-1 (all topics); A1 (c-deu-a1) Willkommen and Schule topics | not compared | Letters, sounds and first vocabulary themes |
| G2 | 7-8 | A1 (c-deu-a1): articles, conjugation, home and school vocabulary; Alphabetisierung for sp, st, ie | not compared (cross-references to Klasse 3 in Misplaced) | Present-tense A1 grammar and phrases |
| G3 | 8-9 | A1 stem changers and plurals; A2 (c-deu-a2) Perfekt and weil | c-natdeu-3 Klasse 3 | Perfekt, Nominativ/Akkusativ, spelling and text types |
| G4 | 9-10 | A2 (c-deu-a2): Dativ, war and hatte, weil, adjective endings | c-natdeu-4 Klasse 4 | Dativ, Präteritum, subordinate clauses, writing genres |

Mapping used: Alphabetisierung to G1; A1 and c-mono-deu-1 to G1 and G2; A2 to G3 and G4. A1 runs past G2 in practice, because it includes grammar that Twist defers to G3 and G4 (ich fahre, du fährst; plurals; einen; adjective endings).

## Matched lessons

| Twist lesson (grade, title) | Anton lesson (course id, level or Klasse, topic: title) | Match | Level fit note |
|---|---|---|---|
| G1, German Alphabet (A-Z) | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: one lesson per letter, E e; N n; A a; D d; R r; S s; M m; T t; L l; B b; U u; K k; P p; O o; F f; G g; H h; C c; J j; V v; W w; Z z; Y y; X x | partial | Anton teaches letter and sound together; Twist teaches names and shapes first and sounds in the next lesson. Same level. |
| G1, German Letter Sounds (A-Z) | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: B b; D d; F f; G g; H h; J j; K k; L l; M m; N n; P p; R r; S s; T t; V v; W w; Z z | exact | Same level; single-letter sound lessons line up one to one. |
| G1, German Vowels: short vowels | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: A a; E e; I i; O o; U u | partial | Anton does not split short and long vowels at this point; ie is its own lesson. Same level. |
| G1, German Vowels: umlauts and matching sounds | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Ä ä; Ö ö; Ü ü; ß | exact | Same level. |
| G1, German Consonants (Basic) | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Sch sch; ch (ich); ch (ach); Pf pf | partial | Letter groups match. Twist also teaches b/p, d/t, g/k pairs and word position, which Anton has no lesson for. Same level. |
| G1, German Numbers (1-20) | c-mono-deu-1, German (en_gb), Zahlen: Zahlen von 1 bis 5; Zahlen von 6 bis 10; Wiederholung: Zahlen. c-deu-a1, Kurs A1, In der Schule: Zahlen 13-20 | partial | No Anton lesson is titled for 11 and 12. Same level. |
| G1, German Colors | c-mono-deu-1, German (en_gb), Farben: Blau, gelb, rot, grün; Schwarz, weiß, grau; Orange, lila, rosa, braun; Wiederholung: Farben. c-deu-a1, Kurs A1, Essen und Trinken: Die Banane ist gelb. | exact | Same level. Anton adds grau, which Twist does not teach. |
| G1, German Family Words | c-mono-deu-1, German (en_gb), Die Familie: Eltern, Kinder & Geschwister; Großeltern & Enkelkinder; Wiederholung: Die Familie. c-deu-a1, Kurs A1, Menschen, Aussehen und Gefühle: Meine Familie. c-deu-a2, Kurs A2, Das bin ich: Das ist meine Familie. | exact | Same level. |
| G1, German Body Parts | c-mono-deu-1, German (en_gb), Der Körper: Der Körper; Der Kopf; Wiederholung: Der Körper. c-deu-a1, Kurs A1, Menschen, Aussehen und Gefühle: Körperteile: Was ist das? | exact | Same level. |
| G1, German Animals | c-mono-deu-1, German (en_gb), Tiere: Haustiere; Bauernhoftiere; Wildtiere; Wiederholung: Tiere. c-deu-a1, Kurs A1, Tiere: Ich habe eine Katze. | exact | Same level. |
| G1, German Food Words | c-mono-deu-1, German (en_gb), Essen & Getränke: Obst; Essen; Getränke; Wiederholung: Essen & Getränke | partial | Twist groups meals and treats; Anton splits Obst and Gemüse. Same level. |
| G1, German Classroom Objects | c-mono-deu-1, German (en_gb), Die Schule: In der Schule; Im Klassenzimmer; Im Schulranzen; Wiederholung: Die Schule. c-deu-a1, Kurs A1, In der Schule: Im Rucksack: Was ist das?; Im Klassenzimmer: Was ist das? | exact | Same level. |
| G1, German Weather Words | c-deu-a1, Kurs A1, Wetter: Es ist sonnig.; Es hat geregnet. | partial | Anton has two lessons. Es hat geregnet is Perfekt, see Misplaced. |
| G1, German Writing: simple sentences | c-deu-a1, Kurs A1, Freizeit und Hobbys: Ich male ein Bild.; Ich male, du schwimmst, sie singt … | partial | Anton trains grammar and speaking, not writing. Same level. |
| G1, German Writing: add one useful detail | c-deu-a1, Kurs A1, In der Schule: Das Buch ist rot. | partial | Covers the colour after ist only; no place or time detail lesson. |
| G1, German Greetings | c-mono-deu-1, German (en_gb), Hallo: Hallo & Tschüss; Wiederholung: Hallo. c-deu-a1, Kurs A1, Willkommen! Los geht's!: Hallo!; Tschüss! | partial | Hello and goodbye match. Twist time-of-day greetings (Guten Morgen) have no Anton line. Same level. |
| G1, German Simple Sentences | c-deu-a1, Kurs A1, Willkommen! Los geht's!: Ich bin … Jahre alt.; Ich heiße …; In der Schule: Ich habe einen Stift.; Tiere: Ich habe eine Katze. | exact | Same level. Anton tests the article after habe; Twist models it only. |
| G1, German Question Words | c-deu-a1, Kurs A1, In der Schule: Was hast du? Ich habe ein Lineal.; Freizeit und Hobbys: Was machst du?; Kontinente, Länder und Sprachen: Wo ist das?; Menschen, Aussehen und Gefühle: Wie geht es dir?. c-deu-a2, Kurs A2, Körper, Gefühle, Gesundheit: Wie geht es dir? | partial | Anton has no stand-alone question-word lesson; the words appear inside topic lessons. |
| G1, German Time Words | c-deu-a1, Kurs A1, Uhrzeit und Kalender: Mein Tag: morgens, mittags, abends; Die Wochentage | exact | Same level. |
| G1, German Communication: asking and answering | c-deu-a1, Kurs A1, Willkommen! Los geht's!: Ich heiße …; Miteinander sprechen. c-deu-a2, Kurs A2, Das bin ich: Ich heiße … | partial | Title-level match only; Anton content of Miteinander sprechen is not visible in the catalogue. |
| G2, German Phonics: long and short vowels | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: ie; I i | partial | Only the long-i spelling ie has an Anton lesson; doubled vowel and Dehnungs-h do not. |
| G2, German Phonics: consonant clusters | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Sp sp; St st; Sch sch | partial | Anton has no kl, bl, gl, fl lessons. Anton teaches sp, st at Alphabetisierung level, see Misplaced. |
| G2, German Vocabulary: topic-specific usage | c-mono-deu-1, German (en_gb), Die Schule: Im Klassenzimmer; Im Schulranzen; Zu Hause: Zimmer im Haus; Möbel; Wiederholung: Zu Hause. c-deu-a1, Kurs A1, Bei uns Zuhause: Zu Hause: Was ist das?; Der Tisch ist in der Küche. | exact | Anton places these at level 1 vocabulary; Twist already taught classroom objects in G1. |
| G2, German Grammar: Articles | c-deu-a1, Kurs A1, In der Schule: ein Buch, das Buch | exact | Anton teaches der/die/das and ein at A1. Same level band. |
| G2, German Grammar: Verb Conjugation | c-deu-a1, Kurs A1, Freizeit und Hobbys: Ich male, du schwimmst, sie singt …; Leon/Er spielt Fußball.; Wir spielen im Park. | exact | Same level band. |
| G2, German Grammar: Word Order | c-deu-a2, Kurs A2, In der Schule: Am Montag gehe ich in die Schule. | partial | One example lesson with the time phrase first; no dedicated verb-second lesson by title. |
| G2, German Global Connections | c-deu-a1, Kurs A1, Kontinente, Länder und Sprachen: Wo ist das? | partial | Anton covers where things are; Twist covers German-speaking countries and loanwords. |
| G3, German Phonics: diphthongs (ei, eu, au) | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Ei ei; Eu eu; Au au; Äu äu. c-natdeu-3, Klasse 3, Rechtschreibung - Besondere Laute: Wörter mit eu und äu | exact | Anton teaches these at Alphabetisierung level (G1); Twist at G3. See Misplaced. |
| G3, German Phonics: advanced consonant combinations | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Pf pf. c-natdeu-3, Klasse 3, Rechtschreibung - Rechtschreibstrategien: Merkwörter mit Dehnungs-h | partial | pf is already in Twist G1 Consonants. No Anton lesson for tsch. |
| G3, German Root Words and Word Families | c-natdeu-3, Klasse 3, Rechtschreibung - Rechtschreibstrategien: Nomen ableiten (ä und äu); Verben ableiten (ä und äu); Wörter verlängern (b und p) | partial | Anton uses stems for spelling; Twist uses them for meaning. |
| G3, German Syllable Division | c-natdeu-3, Klasse 3, Rechtschreibung - Silben: Wörter zerlegen; Trennungsregeln üben | exact | Same grade. |
| G3, German Vocabulary: topic expansion (travel, hobbies) | c-deu-a1, Kurs A1, Freizeit und Hobbys: In der Freizeit: Wer macht was?; Fußball spielen, Musik hören …. c-mono-deu-1, German (en_gb), Draußen: Verkehrsmittel. c-deu-a2, Kurs A2, Unterwegs: Sich fortbewegen | partial | Anton has these at A1 and level 1, below Twist G3. See Misplaced. |
| G3, German Synonyms and Antonyms | c-natdeu-3, Klasse 3, Grammatik - Adjektive: Gegensatzpaare | partial | Antonyms only; no synonym lesson. |
| G3, German Reading: longer passages | c-natdeu-3, Klasse 3, Lesen - Texte verstehen: Texte überblicken; Stichwörter finden; Lesen - Genau lesen: Sätze und Texte genau lesen | partial | Native reading skills; DaZ has no reading-comprehension lessons. |
| G3, German Reading: sequencing and structure | c-deu-a2, Kurs A2, Erlebnisse und Ferien: … weil der Bus nicht fährt. | partial | Cause part only (weil). No sequencing lesson in the courses read. |
| G3, German Reading: fiction vs nonfiction | c-natdeu-3, Klasse 3, Lesen - Texte kennenlernen und lesen: Unterschiedliche Texte benennen; Märchen kennenlernen | partial | Title-level match. |
| G3, German Multi-Paragraph Writing | c-natdeu-3, Klasse 3, Schreiben - Texte planen: Mit einem roten Faden planen | partial | Planning only; no lesson on paragraphs by title. |
| G3, German Narrative Writing | c-natdeu-3, Klasse 3, Schreiben - Texte schreiben: Geschichten; Reizwortgeschichten | exact | Same grade. |
| G3, German Informational Writing | c-natdeu-3, Klasse 3, Schreiben - Texte schreiben: Beschreibungen | partial | Description is the nearest informational form in Klasse 3. |
| G3, German Creative Writing | c-natdeu-3, Klasse 3, Schreiben - Texte planen: Schreibideen entwicklen; Texte schreiben: Elfchen schreiben; Haikus | partial | Source title spelled entwicklen in the catalogue. |
| G3, German Noun Gender (der/die/das) | c-deu-a1, Kurs A1, In der Schule: ein Buch, das Buch. c-natdeu-3, Klasse 3, Grammatik - Nomen: Nomen mit der Endung -ung; Nomen mit der Endung -heit/-keit | partial | Anton teaches the endings as noun families, not as gender cues. |
| G3, German Cases (Nominativ and Akkusativ - Introduction) | c-deu-a1, Kurs A1, In der Schule: Ich habe einen Stift.. c-deu-a2, Kurs A2, Körper, Gefühle, Gesundheit: Wen untersucht sie?; Erlebnisse und Ferien: Wir gehen in den Park.. c-natdeu-3, Klasse 3, Grammatik - Satzglieder: Das Subjekt. c-natdeu-4, Klasse 4, Grammatik - Satzglieder: Akkusativobjekte ermitteln | partial | Anton A2 and native Klasse 4 both put the accusative later or equal; Anton A1 uses einen earlier. |
| G3, German Verb Conjugation (Present) | c-deu-a1, Kurs A1, Freizeit und Hobbys: ich fahre, du fährst. c-natdeu-3, Klasse 3, Grammatik - Verben: Schwache Verben in der Gegenwart; Starke Verben in der Gegenwart | exact | Same grade as native Klasse 3; Anton DaZ has stem changers at A1. |
| G3, German Verb Conjugation (Past - Perfekt preview) | c-deu-a2, Kurs A2, Freizeit und Hobbys: Ich bin Fahrrad gefahren.; Am Montag habe ich Basketball gespielt.; Wir haben gestern gefeiert.; Ich bin losgefahren.; Hast du angerufen?; Wohin bist du gefahren?; gespielt, gefahren, eingekauft …; Erlebnisse und Ferien: Wir haben einen Ausflug gemacht. c-natdeu-3, Klasse 3, Grammatik - Verben: Schwache Verben in der Vergangenheit; Starke Verben in der Vergangenheit | exact | A2 and Klasse 3 agree with Twist G3. |
| G3, German Plurals | c-deu-a1, Kurs A1, In der Schule: Das sind drei Stifte.; Menschen, Aussehen und Gefühle: ein Finger, fünf Finger | partial | Title-level match; plural classes (-e, -en, umlaut) are not visible. Anton has it at A1. |
| G3, German Punctuation and Capitalization | c-natdeu-3, Klasse 3, Rechtschreibung - Groß- und Kleinschreibung: Nomen großschreiben; Grammatik - Wörtliche Rede: Wörtliche Rede und vorangestellter Begleitsatz; Satzarten/Satzzeichen: Satzschlusszeichen | exact | Same grade. |
| G3, German Communication: formal and informal | c-deu-a1, Kurs A1, Gesundheit: Haben Sie Schmerzen? | partial | Anton shows formal Sie in a health context only. |
| G3, German Presentations | c-natdeu-4, Klasse 4, Lesen - Texte sprechen und präsentieren: Ein Referat halten und Feedback geben | partial | Anton places it in Klasse 4, one grade later. |
| G4, German Advanced Phonics: ä/ö/ü patterns | c-alpha-deu, Alphabetisierung, Buchstaben und Laute lernen: Ä ä; Ö ö; Ü ü. c-natdeu-3, Klasse 3, Rechtschreibung - Rechtschreibstrategien: Nomen ableiten (ä und äu); Verben ableiten (ä und äu) | partial | Umlaut letters are Alphabetisierung level; the derivation pattern is Klasse 3. |
| G4, German Word Derivation | c-natdeu-3, Klasse 3, Grammatik - Nomen: Nomen mit der Endung -ung; Nomen mit der Endung -heit/-keit; Adjektive: Adjektive mit -ig und -lich. c-natdeu-4, Klasse 4, Grammatik - Nomen: Nomen mit Wortbausteinen bilden; Adjektive: Adjektive mit Wortbausteinen | exact | Anton starts at Klasse 3, one grade earlier. |
| G4, German Advanced Compound Words | c-natdeu-3, Klasse 3, Grammatik - Nomen: Zusammengesetzte Nomen. c-natdeu-4, Klasse 4, Grammatik - Verben: Zusammengesetzte Verben; Adjektive: Zusammengesetzte Adjektive | partial | Anton has two-part compounds by word class; no three-word compound lesson by title. |
| G4, German Figurative Language | c-natdeu-4, Klasse 4, Grammatik - Sprache erforschen: Redewendungen verstehen | partial | Idioms only; no simile or metaphor lesson by title. |
| G4, German Letter Writing | c-natdeu-4, Klasse 4, Schreiben - Texte schreiben: E-Mails schreiben | partial | E-mail is the nearest form; formal and informal letter openings are not visible. |
| G4, German Narrative Writing (Developed) | c-natdeu-3, Klasse 3, Schreiben - Texte schreiben: Geschichten. c-natdeu-4, Klasse 4, Schreiben - Texte schreiben: Gefühle beschreiben | partial | Klasse 4 has no story-writing lesson by title. |
| G4, German Informational Writing | c-natdeu-4, Klasse 4, Schreiben - Texte schreiben: Berichte schreiben | partial | Report is the nearest form. |
| G4, German Revising and Editing | c-natdeu-3, Klasse 3, Schreiben - Texte überarbeiten: Texte sprachlich überarbeiten; Texte rechtschriftlich und grammatikalisch überarbeiten; Rechtschreibung - Fehler berichtigen: Rechtschreibfehler berichtigen | exact | Anton has it in Klasse 3, one grade earlier. |
| G4, German Cases: Dativ introduction | c-deu-a2, Kurs A2, Körper, Gefühle, Gesundheit: Wem? dem Patienten, der Ärztin. c-natdeu-4, Klasse 4, Grammatik - Satzglieder: Dativobjekte ermitteln; Nomen: Die vier Fälle bilden | exact | A2 and Klasse 4 both fit G4. |
| G4, German Verb Conjugation: Präteritum | c-deu-a2, Kurs A2, In der Schule: Ich war gestern in der Schule.; Gestern hatte ich Mathe.. c-natdeu-4, Klasse 4, Grammatik - Verben: Verben im Präteritum | exact | A2 has war and hatte only; regular Präteritum is Klasse 4. |
| G4, German Adjective Endings (Basic) | c-deu-a2, Kurs A2, Das bin ich: Ich habe braune Haare.; Erlebnisse und Ferien: Auf dem Flohmarkt: Das ist ein schöner Rucksack.. c-natdeu-3, Klasse 3, Grammatik - Adjektive: Adjektive anpassen | exact | Anton A2 and native Klasse 3 are earlier than or equal to G4; see Misplaced. |
| G4, German Sentence Structure | c-deu-a2, Kurs A2, Erlebnisse und Ferien: … weil der Bus nicht fährt.; Körper, Gefühle, Gesundheit: … weil wir heute einen Test schreiben.. c-natdeu-4, Klasse 4, Grammatik - Satzarten/Satzzeichen: Sätze mit Konjunktionen verbinden; das und dass unterscheiden | exact | A2 and Klasse 4 both fit G4. |
| G4, German Punctuation (Advanced) | c-natdeu-3, Klasse 3, Grammatik - Wörtliche Rede: three lessons (vorangestellter, eingeschobener, nachgestellter Begleitsatz). c-natdeu-4, Klasse 4, Grammatik - Satzarten/Satzzeichen: Zeichensetzung bei Aufzählungen; Wörtliche Rede verwenden | partial | No comma-before-weil lesson by title. Quotation marks are Klasse 3 in Anton. |
| G4, German Presentations | c-natdeu-4, Klasse 4, Lesen - Texte sprechen und präsentieren: Ein Referat halten und Feedback geben; Ein Gedicht vortragen | exact | Same grade. |
| G4, German Research and Reporting | c-natdeu-4, Klasse 4, Lesen - Texte sprechen und präsentieren: Interviews durchführen; Schreiben - Texte schreiben: Berichte schreiben | partial | No source-gathering lesson by title. |
| G4, German Culture: Literature and Storytelling | c-natdeu-3, Klasse 3, Lesen - Texte kennenlernen und lesen: Grimms Märchen kennenlernen. c-natdeu-4, Klasse 4, Lesen - Texte kennenlernen und lesen: Sagen kennenlernen; Fabeln kennenlernen; Balladen kennenlernen | partial | Grimm tales are Klasse 3 in Anton; no lesson for modern children's books. |
| G4, German Culture: Geography and Global Connections | c-deu-a1, Kurs A1, Kontinente, Länder und Sprachen: Wo ist das? | partial | Anton covers where things are only; Anton is earlier (A1). |

Counts: 65 Twist lessons matched (25 exact, 40 partial) of 103.

## Missing in Twist

Anton DaZ and c-mono-deu-1 lessons that no Twist row cites. The count column is lessons.

| Course | Level | Topic | Anton lessons with no Twist match | Count |
|---|---|---|---|---|
| c-alpha-deu | Alphabetisierung | Buchstaben und Laute lernen | ck; ig; ng; tz; Qu qu; chs; nk | 7 |
| c-deu-a1 | Kurs A1 | Willkommen! Los geht's! | Ich komme aus …; Ich wohne in … | 2 |
| c-deu-a1 | Kurs A1 | In der Schule | Im Schulgebäude: Was ist das?; lesen, rechnen, schreiben – Wer macht was?; Ist das ein Stift?; Wem gehört das? Mein Stift, dein Buch, ...; Ich mag Mathe.; Stundenplan: Ich habe am Dienstag Deutsch. | 6 |
| c-deu-a1 | Kurs A1 | Hilfreiche Sätze und Fragen im Unterricht | Ich habe eine Frage.; Wir sind auf Seite 27.; Lies, Schreibe, Höre zu! | 3 |
| c-deu-a1 | Kurs A1 | Freizeit und Hobbys | Ich habe keine Lust.; Möchtest du spielen?; Was kannst du?; Liest du?; Malst du gern? | 5 |
| c-deu-a1 | Kurs A1 | Einkaufen | Beim Einkaufen: Was ist das?; Zahlen bis 100; Geld; Was kostet das?; Ich kaufe zwei Äpfel.; Im Korb sind keine Äpfel.; Er kauft ein, sie packt aus | 7 |
| c-deu-a1 | Kurs A1 | Essen und Trinken | Ich mag Erdbeeren.; Ich esse gern Äpfel.; Es schmeckt süß.; Ich esse lieber Nudeln.; Sie kocht besser. | 5 |
| c-deu-a1 | Kurs A1 | Kontinente, Länder und Sprachen | Ich spreche Deutsch. | 1 |
| c-deu-a1 | Kurs A1 | Menschen, Aussehen und Gefühle | Die Hose ist blau.; Ich trage einen Schal.; Die Augen sind blau.; Ich habe lockige Haare.; Was ziehst du an?; die Jacke – sie; Ich rieche mit meiner Nase. | 7 |
| c-deu-a1 | Kurs A1 | Gesundheit | Mein Kopf tut weh.; Ich habe Bauchschmerzen.; Haben Sie Schmerzen? | 3 |
| c-deu-a1 | Kurs A1 | Tiere | Es gibt hier viele Rehe.; Ich füttere das Schaf.; Das ist Lorins Hund.; Dieser Hund ist braun. | 4 |
| c-deu-a1 | Kurs A1 | Bei uns Zuhause | Das Buch ist auf dem Tisch.; Der Spiegel hängt über dem Waschbecken.; Ich muss aufräumen.; Wir trennen Müll.; Ich wasche mich. | 5 |
| c-deu-a1 | Kurs A1 | Jahreszeiten | Im Frühling; Im Sommer; Im Winter; Schiebe die Plätzchen in den Ofen! | 4 |
| c-deu-a1 | Kurs A1 | Uhrzeit und Kalender | Datum: Heute ist der 10. Juli. | 1 |
| c-deu-a2 | Kurs A2 | Das bin ich | Mein Vater ist Koch.; Er ist mein bester Freund. | 2 |
| c-deu-a2 | Kurs A2 | In der Schule | Um 9 Uhr habe ich Mathe.; Mein Lieblingsfach ist Kunst.; Herr Fuchs ist unser Lehrer.; Er ist kleiner als ich.; Was möchtest du verbessern? | 5 |
| c-deu-a2 | Kurs A2 | Freizeit und Hobbys | Am liebsten treffe ich Freunde.; Ich soll einen Helm tragen.; Komm, wir gehen schwimmen! | 3 |
| c-deu-a2 | Kurs A2 | Erlebnisse und Ferien | Man kann Eis essen.; Man darf lange schlafen.; Das Foto im Park ist am besten.; Jemand hat eine Musikbox dabei.; Ich kaufe etwas.; Was möchtest du machen? | 6 |
| c-deu-a2 | Kurs A2 | Körper, Gefühle, Gesundheit | Beim Arzt | 1 |
| c-mono-deu-1 | German (en_gb) | Draußen | In der Stadt; In der Natur; Wiederholung: Draußen | 3 |
| c-mono-deu-1 | German (en_gb) | Zu Hause | Spielzeug | 1 |
| c-mono-deu-1 | German (en_gb) | Essen & Getränke | Gemüse | 1 |
| c-mono-deu-1 | German (en_gb) | Kleidung | Kleidung (1); Kleidung (2); Wiederholung: Kleidung | 3 |

Totals: c-alpha-deu 7 of 47; c-deu-a1 53 of 87; c-deu-a2 17 of 39; c-mono-deu-1 8 of 40. Lessons above Twist's G4 level: none; the A2 lessons listed here (clock times, comparatives, modal verbs, man kann) are the next step beyond Twist's G4 DaZ coverage.

Context only (not counted): c-natdeu-3 and c-natdeu-4 topics with no Twist lesson include Grammatik - Satzglieder (5 and 6 lessons), Rechtschreibung - Das Wörterbuch (2), Lesen - Bildzeichen und Diagramme (2), Lesen - Bücher (2), Blitzlesen (4), Grammatik - Adjektive: Mit Adjektiven vergleichen (Klasse 3 and 4), Lesen - Grafiken und Tabellen (2) and Grammatik - Satzarten/Satzzeichen: Satzarten (6).

## Missing in Anton

Twist lessons with no match in DaZ, c-mono-deu-1 or (G3 and G4 only) c-natdeu-3 and c-natdeu-4.

| Twist grade | Lessons with no Anton match | Count |
|---|---|---|
| G1 | German Reading: literal understanding; German Reading: retell key events; German Reading: simple inference; German Writing: neat spacing and letter formation; German Communication: polite everyday exchanges; German Culture (Basic) | 6 of 26 |
| G2 | German Word Families; German Compound Words; German Affixes; German Vocabulary: word meaning in context; German Reading: main idea; German Reading: details and inference; German Paragraphs: topic sentence; German Paragraphs: supporting details; German Creative Writing: ideas and characters; German Creative Writing: drafting and revising; German Poetry; German Communication: extended responses; German Presentations; German Culture: Traditions; German Culture: Geography; German History; German Science and Technology; German Art and Music; German Research Skills; German Digital Literacy; German Media Literacy; German Language Integration | 22 of 29 |
| G3 | German Culture: Regions; German Culture: Festivals and Holidays | 2 of 23 |
| G4 | German Academic Vocabulary; German Reading: theme and evidence; German Reading: summarizing; German Reading: comparing texts; German Essay Structure (Aufsatz); German Opinion Writing; German Media Literacy; German Culture: History and Notable Figures | 8 of 25 |

G2 cross-reference: three of these G2 lessons (Compound Words, Affixes, Poetry) have a native Klasse 3 counterpart, listed under Misplaced. The G1 reading lessons are written for English-speaking learners (answers in English) and have no counterpart in any Anton course read.

## Misplaced

Direction: Anton earlier means Anton teaches it at a lower level than Twist; Twist earlier means the reverse. Grade gaps are approximate because DaZ is ungraded.

| Twist lesson | Twist grade | Anton line | Anton level | Direction and gap |
|---|---|---|---|---|
| German Phonics: diphthongs (ei, eu, au) | G3 | c-alpha-deu: Ei ei; Eu eu; Au au; Äu äu | Alphabetisierung (G1) | Anton earlier, about 2 grades |
| German Phonics: consonant clusters (st, sp) | G2 | c-alpha-deu: Sp sp; St st | Alphabetisierung (G1) | Anton earlier, about 1 grade. Twist G1 defers st and sp on purpose |
| German Verb Conjugation (Past - Perfekt preview) | G3 | c-deu-a1 Wetter: Es hat geregnet. | A1 | Anton earlier, 1 to 2 grades for a single weather lesson. The main Perfekt block is A2 and fits G3 |
| German Verb Conjugation (Present), stem changers | G3 | c-deu-a1 Freizeit und Hobbys: ich fahre, du fährst | A1 | Anton earlier, 1 to 2 grades. Twist G2 defers stem changers to G3 |
| German Plurals | G3 | c-deu-a1: Das sind drei Stifte.; ein Finger, fünf Finger | A1 | Anton earlier, 1 to 2 grades. Twist uses plurals as a hook in G1 Umlauts |
| German Cases (Nominativ and Akkusativ) | G3 | c-deu-a1 In der Schule: Ich habe einen Stift. | A1 | Anton earlier, 1 to 2 grades. Twist models einen in G1 without testing it |
| German Adjective Endings (Basic) | G4 | c-deu-a1 Menschen: Ich habe lockige Haare.; c-deu-a2: Ich habe braune Haare.; c-natdeu-3: Adjektive anpassen | A1, A2, Klasse 3 | Anton earlier, 1 to 2 grades in DaZ and 1 grade in native Deutsch. Twist G1 forbids adjective endings |
| German Communication: formal and informal | G3 | c-deu-a1 Gesundheit: Haben Sie Schmerzen? | A1 | Anton earlier, 1 to 2 grades, in a health context only |
| German Vocabulary: topic expansion (travel, hobbies) | G3 | c-deu-a1 Freizeit und Hobbys; c-mono-deu-1 Draußen: Verkehrsmittel | A1, level 1 | Anton earlier, 1 to 2 grades |
| German Compound Words | G2 | c-natdeu-3 Zusammengesetzte Nomen | Klasse 3 | Twist earlier, 1 grade |
| German Affixes | G2 | c-natdeu-3: Adjektive mit -ig und -lich; Nomen mit der Endung -ung; Die Vorsilben ver- und vor- | Klasse 3 | Twist earlier, 1 grade |
| German Word Derivation | G4 | c-natdeu-3: Nomen mit der Endung -ung; Nomen mit der Endung -heit/-keit; Adjektive mit -ig und -lich | Klasse 3 | Anton earlier, 1 grade. Twist already teaches -ig, -lich, -ung in G2 |
| German Advanced Compound Words | G4 | c-natdeu-3 Zusammengesetzte Nomen | Klasse 3 | Anton earlier, 1 grade (two-part compounds) |
| German Poetry | G2 | c-natdeu-3 Lesen: Mit Gedichten umgehen | Klasse 3 | Twist earlier, 1 grade |
| German Grammar: Articles | G2 | c-natdeu-3 Grammatik - Nomen: Bestimmte und unbestimmte Artikel | Klasse 3 | Twist earlier, 1 grade; equal to DaZ A1 |
| German Grammar: Verb Conjugation | G2 | c-natdeu-3 Grammatik - Verben: Schwache Verben in der Gegenwart | Klasse 3 | Twist earlier, 1 grade; equal to DaZ A1 |
| German Grammar: Word Order | G2 | c-natdeu-3 Grammatik - Satzglieder: Satzglieder umstellen | Klasse 3 | Twist earlier, 1 grade |
| German Presentations | G3 and G2 | c-natdeu-4 Referat halten und Feedback geben | Klasse 4 | Twist earlier, 1 grade (G3) and 2 grades (G2) |
| German Revising and Editing | G4 | c-natdeu-3 Texte überarbeiten | Klasse 3 | Anton earlier, 1 grade |
| German Punctuation (Advanced), quotation marks | G4 | c-natdeu-3 Grammatik - Wörtliche Rede (3 lessons) | Klasse 3 | Anton earlier, 1 grade. Twist G3 Punctuation already lists comma and quote rules |
| German Culture: Literature and Storytelling | G4 | c-natdeu-3 Grimms Märchen kennenlernen | Klasse 3 | Anton earlier, 1 grade |
| German Culture: Geography and Global Connections | G4 | c-deu-a1 Kontinente, Länder und Sprachen: Wo ist das? | A1 | Anton earlier, 2 or more grades, at a much simpler depth |

Twist-internal note: G2 Communication defers weil to G4 (verb-final order), yet G3 Reading: sequencing and structure lists weil and deshalb under cause-effect. Anton A2 teaches weil.

## Summary

- Twist has 103 German lessons (G1 26, G2 29, G3 23, G4 25). 65 match Anton (25 exact, 40 partial) and 38 do not (G1 6, G2 22, G3 2, G4 8).
- Anton DaZ and c-mono-deu-1 have 213 lessons in scope (47 Alphabetisierung, 87 A1, 39 A2, 40 c-mono-deu-1). 85 have no Twist match: 7 Alphabetisierung, 53 A1, 17 A2, 8 c-mono-deu-1.
- Track verdict: G1 foreign language; G2 mostly foreign language with ten native-style literacy lessons; G3 and G4 native speaker. The switch begins in G2 and is complete in G3.
- G3: 17 of 21 matched lessons match Deutsch Klasse 3 or 4 against 10 that match DaZ; G4: 16 of 17 matched lessons against 6. Deutsch Klasse 3 and 4 fit better than DaZ A2, which only covers the G3 and G4 grammar items.
- Largest Twist gaps against DaZ: Einkaufen (7 lessons, numbers to 100, money), Menschen, Aussehen und Gefühle (clothing and appearance, 7), Gesundheit (3), Jahreszeiten (4), Hilfreiche Sätze und Fragen im Unterricht (3) and A2 modal verbs and comparatives.
- Largest Anton gaps against Twist G2: all of the culture, science, art, history, digital and media lessons (no DaZ counterpart), and the G1 reading lessons. G4 lessons with no Anton counterpart include Aufsatz, Opinion Writing and Academic Vocabulary.
- Misplaced: 22 pairs. Anton DaZ teaches Perfekt, stem changers, plurals, accusative and adjective endings at A1 or A2, 1 to 2 grades before Twist G3 and G4. Anton native Deutsch teaches compounds, affixes, poetry, articles and conjugation in Klasse 3, one grade after Twist G2.
- Twist G1 to G2 vocabulary themes match c-mono-deu-1 closely (Farben, Zahlen, Körper, Familie, Schule, Tiere); the gap is Kleidung, Draußen, Gemüse and Spielzeug.
- Caveat: all matches rest on catalogue titles, not exercise content.
