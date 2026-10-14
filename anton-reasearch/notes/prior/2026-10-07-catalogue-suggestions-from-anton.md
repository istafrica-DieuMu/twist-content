****# Catalogue suggestions from the Anton comparison (en and de)

> **Prior baseline, kept as written.** From the first crawl on 2026-10-07, moved
> here from schoolido-learning/docs/notes on 2026-10-08. Capped at our G1 to G4
> and Anton's matching grades, and built on sampled data. Catalogue suggestions
> are out of scope for Phase 1; this note is input for Phase 3 (coverage
> matrix), to be redone against the full capture.

Date: 2026-10-07. Status: suggestions only. No catalogue, schema or content file was changed. Builds on [`2026-10-07-anton-curriculum-research.md`](2026-10-07-anton-curriculum-research.md), which has the full Anton topic maps.

Sources:
- Our side: the 16 catalogues at `content/{en,de}/grade-{1..4}/{english,german}/module-catalog.md`, the question-type schemas in `schemas/question-types/`, and `docs/authoring/german-en-loi-standard.md`.
- Anton side: course trees for UK English (Reception to Year 5), Deutsch (Klasse 1 to 4), DaZ (Vokabel-Training leicht, Kurs A1) and Englisch for German children (Stufe 0, Stufe 1 und 2, Klasse 3, Klasse 4).
- About 25 Anton exercises opened and screenshotted to learn the mechanics. The screenshots were deleted afterwards and no item content is recorded here.

## 1. Who each catalogue serves, and what to compare it with

| Catalogue | Learner, as the repo states it | Topic list today | Anton counterpart |
| --- | --- | --- | --- |
| `en/english` | Native English (implied by `english-standard.md`: US spelling, phoneme notation) | Native English phonics, reading, writing process, grammar, media | UK English Year 1 to Year 5 |
| `en/german` | German for English speakers (`german-en-loi-standard.md`, scoped to G1 and G2 only) | G1 is beginner vocabulary. G2 to G4 drift into native-speaker content (Aufsatz, Dativ, adjective endings) | DaZ Vokabel-Training and Kurs A1, plus Anton's Englisch for German children as a model for a foreign-language course |
| `de/english` | English for German-speaking children (stated only in the G1 Letter Sounds note) | Same topic list as `en/english`: native-English CVC families, vowel teams, writing process, media literacy | Englisch Stufe 0, Stufe 1 und 2, Klasse 3, Klasse 4 |
| `de/german` | German-native (stated only in the G1 Letter Sounds note: "German-native twin") | Same topic list as `en/german`: numbers 1 to 20, colours, family words, greetings | Deutsch Klasse 1 to 4 |

All 8 de/en pairs have identical unit and lesson lists. That is the biggest finding. The de version teaches native-English phonics to German children, and foreign-language beginner vocabulary to native German children. Anton keeps these four audiences as four separate courses with different content.

## 2. Exercise types: Anton against ours

Every mechanic below was observed in a live Anton exercise. "Ours" refers to our 19 question-type schemas.

| # | Anton mechanic (where seen) | Our type | Verdict |
| --- | --- | --- | --- |
| 1 | Tap one of 2 to 4 tiles after an audio prompt (Reception "Find Letter", DE Klasse 2 "Störenfriede") | `multiple_choice`, `audio_choice`, `image_multiple_choice` | Covered |
| 2 | Tap each picture to hear its word, then drag every matching picture into one drop zone (Reception "Drag Pictures and Sounds") | `multi_select` / `drag_and_drop` | **Gap.** The gesture is covered, but no option schema has an audio field. `audio_choice` has one `audio_url` per question, not per option. |
| 3 | Sort picture-and-word cards into 2 or 4 bins (Year 1 Nouns "Sort", the Test) | `sorting` | Covered |
| 4 | Draw lines from several words to one category (Year 1 Nouns "Combine") | `matching` / `multi_select` | Covered. Only the gesture differs. |
| 5 | Spell a whole word from audio plus a photo, typed letter by letter (Year 1 "Writing Whole Words") | `text_input` (has `narration_url`, `image_url`, `pattern`) | The schema supports it, but we use it rarely: 679 items, under 2%. |
| 6 | Dictation: hear a sentence, type the one missing word into a gap in the printed sentence (DE Klasse 1 "Wörter hören und schreiben") | None. `text_input` has no sentence frame, and `fill_in_blank` only takes tiles. | **Gap** |
| 7 | Transform a sentence by typing a phrase into a gap (Year 3 "Adding Fronted Adverbials") | None, for the same reason as 6 | **Gap** |
| 8 | Fill letter or punctuation tiles into gaps in a sentence (Year 1 "Fill in", Year 3 "Writing Speech") | `fill_in_blank` with tile distractors | Covered |
| 9 | Build a sentence from word or clause blocks, with distractor blocks and a Check button (DE "Satzsalat", Year 4 "Building Complex Sentences") | `ordering` (supports distractors) | Covered |
| 10 | Tap a word inside a sentence (Year 5 "Finding Silent Letters") | `highlight_in_text` | Covered |
| 11 | Flash reading: tap Start, a word shows for about 5 seconds and hides, then pick the matching picture from 2 (DE "Blitzlesen") | None | **Gap** |
| 12 | Tracing on German four-line paper (Lineatur), with a start dot, an arrow, enforced stroke order and multi-stroke letters, in three cursive scripts (DE Klasse 2 Schreibschrift) | `tracing` (only `char` and `correct_answer`) | **Gap in depth.** There are no lines, no script choice, no stroke order and no words. |
| 13 | Story as audio clips: drag each clip to the matching picture (Year 1 "Stories") | `matching` (text and image only) | **Gap.** No audio-to-picture matching for listening comprehension. |
| 14 | Syllables coloured alternately black and blue in printed German sentences (DE Klasse 1 dictation) | None | **Gap** for de/german G1 and G2 reading |
| 15 | Word-search grid with colour-coded target words (Year 1 "Spelling Practice") | None | Low priority. It is a motivational activity. |
| 16 | Narrated animated explainer slide inside the first exercise, with replay (DE "Wörter verlängern") | `teach` step: 3 to 5 worked examples | Ours is stronger |
| 17 | "Hint" button, Year 3 and up: one narrated strategy note per exercise | 3-tier hints per item on every guided-practice item | Ours is stronger |
| 18 | A wrong answer offers "try again" or "reveal". The reveal strikes the wrong answer in red and shows the right one, then "Weiter". | App behaviour, not schema | Ask the app team what happens after tier 3 today. The strike-through reveal is a clear pattern to copy. |
| 19 | KS1 SATs-format practice papers (Year 2) | None | Only worth adding if a market needs exam prep |

### Schema suggestions, ranked

1. **A typed gap inside a sentence** (rows 6 and 7). Either add an optional `frame` to `text_input`, or add an `input: "typed"` mode to `fill_in_blank`. This one change unlocks dictation in both languages and transformation items in grammar.
2. **Flash display** (row 11). Add an optional `display_ms` to `multiple_choice` and `image_multiple_choice`, so the stem hides after a set time. It serves sight-word fluency (en/english G1, G2) and Blitzlesen (de/german G1 to G3).
3. **Tracing v2** (row 12). Add `lineature` (none, or four-line), `script` (print, Schulausgangsschrift, Vereinfachte Ausgangsschrift, Lateinische Ausgangsschrift, UK pre-cursive), stroke-order data, and multi-letter words.
4. **Per-option audio** (rows 2 and 13). Add an optional `audio_url` on options in `multi_select`, `drag_and_drop`, `sorting` and `matching`, so a child can tap a picture to hear its word and can match audio clips to pictures. This serves phonics (which pictures start with /s/), listening comprehension, and both foreign-language catalogues.
5. **Syllable marking** (row 14). Add an optional syllable-split field on text-bearing items so the app can render alternating colours or arcs. German only.

No schema change is needed for row 5. Typed spelling is an authoring habit we have not built. Every phonics and spelling lesson final could carry at least one `text_input` spelling slot.

## 3. en version

### en/english (native English, G1 to G4)

**Keep.** Writing as a process, speaking and listening, presentation, media and digital literacy, fluency, and the teach step with 3-tier hints. Anton's UK English has none of these up to Year 5.

**G1**
- **Move consonant digraphs and the first vowel teams into G1.** We teach sh, ch, th, wh, ai, ee, oa and ui in G2. Anton teaches them in Reception and Year 1, and Common Core puts consonant digraphs, final -e and common vowel teams in grade 1 (RF.1.3a, RF.1.3c). Suggested G1 order: letter sounds, CVC, short vowels, word families, digraphs (sh, ch, th, ck, ng), then magic e, then vowel teams (ai, ee, oa, igh).
- **Add a cumulative review part after every two or three sound topics.** This mirrors Anton's "Phonics Review" lessons. Our mixed-review parts only review their own lesson.
- **Add a typed spelling slot** to the CVC, short-vowel and word-family finals.
- **Add "and" as a joining word and a question-words part** to the Writing Sentences lessons. Anton Year 1 has Question Words and Connectives. Our G1 has neither.

**G2**
- Add alternative vowel spellings (ay, ou, ie, ea, oy, ir, ue, aw, ew, oe, au) after the vowel teams.
- Add suffix spelling rules: -ment, -ness, -ful, -less, -ly. Then contractions with apostrophes, possessive apostrophes and common homophones (there/their/they're, to/too/two).
- Grammar now covers nouns, verbs, adjectives, adverbs and contractions. Add personal and possessive pronouns, a/an, conjunctions (and, but, because, or, when, if), past and present tense with the progressive form, the four sentence types (statement, question, command, exclamation), and commas in lists.

**G3**
- Grammar and punctuation: fronted adverbials with the comma, prepositions and conjunctions of time, place and cause, present perfect, paragraphs and headings, and direct speech with inverted commas as its own lesson (it currently sits inside Advanced Punctuation).
- Word study: prefixes in, il, im, ir, mis, dis, re, sub, super, anti and auto. Suffixes -ation, -ous, -ly, -sure/-ture and -tion/-sion/-cian. Word families.
- Reading: genre lessons (fables, fairy tales, rhyme and alliteration in poems) and purpose of a text.

**G4 (UK Year 5 by age)**
- Grammar: relative clauses, modal verbs (Anton calls them "degrees of possibility"), formal and informal register, and cohesion across paragraphs.
- Punctuation: brackets, dashes, hyphens, bullet points and colons in lists. Our Advanced Punctuation covers commas and quotes only.
- Spelling: -able/-ible, -cious/-tious, -ant/-ent families, ei/ie, ough, silent letters, unstressed vowels.
- Reading: drama or play scripts. Poetry is covered.

**Cross-grade**
- **Tag each lesson with one standard.** Our English standard uses US spelling, so Common Core (RF, L, RL, RI, W, SL) fits. None of the 16 catalogues cites a framework today.
- **Give reading parts their own texts.** Anton writes a new text for each reading exercise (stories, fables, informational texts, plays). One short authored text per reading part, reused across that part's skills, would close most of this gap.

### en/german (German for English speakers)

**G1** matches DaZ starter vocabulary well: numbers, colours, family, body, animals, food, classroom, weather, greetings, ich bin / ich habe, question words, time words and polite phrases. Keep it.

**G2** is the problem year. Today it covers word families (-er, -chen), affixes, word meaning in context, paragraph writing, creative writing, poetry, five culture units, research, and digital and media literacy. Most of that is native-speaker or cross-curricular content. A 7-year-old English speaker in their second year of German cannot work in German at that level. Suggest rebuilding G2 around the next band of DaZ A1 themes, with grammar taught inside each theme:
- Clothes; home, rooms and furniture; toys; town and transport; nature
- Hobbies and free time (ich spiele, ich mag, ich kann)
- Shopping, numbers to 100 and money
- Feelings (Wie geht es dir?)
- Days, months and seasons; birthday
- Grammar threads: der/die/das with plurals, haben and sein, ich/du/er/sie verb forms, kein, mögen and können

**G3 and G4** should continue the foreign-language track (A1 into A2):
- Daily routine and telling the time; the school day
- Food, restaurant and ordering; weather and seasons; travel and places
- Telling what happened (Perfekt with haben and sein)
- Fixed phrases with prepositions (in der Schule, auf dem Tisch), without teaching the Dativ as a system
- Describing people; short emails and postcards; short reading texts

Move these to `de/german`, where they belong: Aufsatz, the Dativ grammar unit, adjective endings, research, and presentations held in German.

**Other suggestions**
- Extend `german-en-loi-standard.md` to G3 and G4 so the "English for the ask, German for the target" rule holds through G4.
- Lean on `speak` (pronunciation), `audio_choice` (listening) and audio-to-picture `matching` (schema suggestion 4). Introduce typed vocabulary spelling (`text_input`) from G2.
- Keep the culture units. Anton's English course for German children has an "English speaking world" unit (UK, London, Ireland, North America, Australia, New Zealand), which supports keeping German culture in a foreign-language course.
- Anton closes every theme with a "Review" lesson. Our mixed-review parts already do this.

## 4. de version

### de/english (English for German-speaking children)

Today the catalogue is the native-English list. Only the G1 Letter Sounds lesson was authored as English for German speakers. Anton's course for this learner is theme-based vocabulary and spoken chunks, with reading and writing coming late:
- Stufe 0: 7 themes, 15 lessons
- Stufe 1 und 2: 11 themes, about 29 lessons
- Klasse 3: 15 themes, about 85 lessons
- Klasse 4: 10 themes, about 35 lessons

Suggest rebuilding de/english as a foreign-language catalogue:

- **G1:** hello and goodbye, "my name is", colours, numbers 1 to 10, body and head, family, school, classroom and schoolbag, toys, pets and farm animals, fruit. Keep Letter Sounds as an "English sounds" strand. Mostly listening and speaking (`audio_choice`, `image_multiple_choice`, `speak`), with almost no reading.
- **G2:** numbers 11 to 20, clothes, the home (rooms and furniture), outside (town, nature, transport), food and drink and meals, feelings, weather, days of the week, birthday. Chunks: I like, I have got, Can I have ...?
- **G3 (Anton Klasse 3):** age and where I am from, "What colour is it?", phone numbers, extended family, wild animals and favourite animal, clothes by season, school and best friends, city life, meals, months and seasons, weather and temperature, and the English-speaking world. Start reading words and short sentences. Start copying words.
- **G4 (Anton Klasse 4):** numbers to 100 and maths in English, telling the time and daily routine, the five senses, hobbies and sports with can/can't, jobs ("I want to be ..."), ordering in a restaurant, directions around the world, water animals and how animals move, special days. Short texts and simple writing (postcard, profile).
- **Pronunciation for German speakers:** a light strand on the sounds German speakers find hard. These are th, w against v, the short a in cat against e in bed, and final voiced consonants (bed, dog).
- **Drop from de/english:** CVC word families, vowel teams, silent letters, Greek and Latin roots, the five-paragraph essay, the writing process, and media and digital literacy. Those belong to native-English learners.

### de/german (German for native speakers)

Today the catalogue is the en/german list. G1 is beginner vocabulary that 6-year-old native speakers already know orally, and G3 and G4 mix second-language topics (gender, present-tense conjugation, travel and hobby vocabulary) with native ones. Anton's Deutsch Klasse 1 to 4 is a good checklist.

**G1: replace the vocabulary units with beginning reading (Erstlesen)**
- Letters and sounds in one fixed order with cumulative reviews. Anton uses the Fibel order L, O, A, M, I, S, T, E, N, D, U, P, K, B, F, Ei, R, H, W, G, Au, Sch, Z, Eu, Ch, J, then Ö, Ü, Ä, St, Sp, Pf, ng, nk, Qu, V, C, Y, X, Äu, ck, ß. Group 3 or 4 sounds per part.
- Reading syllables (one, two and three syllables), then words, then sentences, then first short texts.
- Writing: copying words, gap words, dictation (hear and write), capital letters at sentence start, a first look at capitalised nouns, articles, singular and plural.
- Speaking and listening: rhymes, poems, tongue twisters.
- Blitzlesen with basic vocabulary (needs schema suggestion 2).

**G2**
- **Keep:** compound nouns, affixes (they map to Anton's Wortbausteine), articles, verb conjugation, poetry.
- **Add Rechtschreibstrategien as a named strand** that repeats in G2 to G4: Silbenschwingen, Verlängern (d/t, b/p, g/k), Ableiten (ä, äu) and Merkwörter. Also short and long vowels, Sp/St, Qu, V, tz, chs/x, word stem and word family, and ABC order.
- **Add text types for writing:** list, invitation, letter, picture story, profile, describing a process, revising a text.
- **Drop or move:** "Word Order" (native speakers produce verb-second order without being taught it), the five culture units (Sachunterricht territory for native speakers), and research, digital and media (move to G3 or G4, or make them cross-curricular).

**G3**
- **Add:** Satzglieder (subject, predicate, moving parts of a sentence), direct speech with the speech tag before, inside and after, strong and weak verbs in the past, verb prefixes, adjectives with -ig and -lich and comparison, nouns with -ung, -nis, -heit and -keit, using a dictionary, correcting spelling mistakes with the strategies, fairy tales (Grimm, Andersen), Elfchen and haiku, Reizwortgeschichte.
- **Reframe:** turn "Noun Gender" into a short "Artikel bestimmen" part, and turn "Present Conjugation" into Personalform and Grundform. Native speakers know gender and conjugation and need the labels, not the forms.
- **Move to en/german:** vocabulary for travel and hobbies.
- **Keep:** du/Sie register, Perfekt, plurals, punctuation and capitalisation, presentations.

**G4**
- **Add:** all four cases (we only have a Dativ introduction), Futur, dative and accusative objects as Satzglieder, place and time adverbials, das against dass, commas in lists, s-sounds (s, ss, ß), ph and v, capitalising nouns hidden behind an article and multi-part names, idioms and loanwords, legends, ballads and fables, reciting a poem, giving a talk with feedback, interviews, emails, reports.
- **Reframe:** turn "Adjective Endings" (taught by article type: definite, indefinite) into fitting adjectives into sentences. Anton covers this as "Adjektive anpassen" in Klasse 2 and 3 and has no ending-table unit in Klasse 4. Ending tables are how a second-language course teaches it.
- **Keep:** Aufsatz, letter writing, Präteritum, derivation, compound words, media literacy.

**Item types for de/german:** typed dictation in a sentence (schema suggestion 1), syllable marking (5), Blitzlesen (2), tracing on Lineatur with a choice of Ausgangsschrift (3). Spotting the misspelt word ("Störenfriede") already works with `multiple_choice` or `highlight_in_text`.

## 5. What playing whole exercises showed

Played end to end or for several items each:
- Year 1 Nouns: the intro exercise, "Find", and the Test
- Year 5 Haikus: "The Old Pond", a reading exercise
- Englisch Klasse 3 Colours: "Vokabeln lernen", "Vokabeln üben" and "Vokabeln buchstabieren"
- Two DaZ A1 lesson pages

**Scoring and rewards**
- Every action is scored on its own. Each card dropped in a sort, and each tap in a "select every ..." scene, is one segment of the progress bar.
- A wrong tap adds a red segment and brings up a "Solve" button, but the child carries on with the same item.
- An exercise ends with 0 to 3 stars, filled in proportion to the score (one wrong tap in 9 left about 2.7 stars). A Test ends with 0 to 3 trophies in the same way. One mistake in 8 cards still passed the Test.
- The lesson page shows the stars for each exercise and the trophies for the Test. Nothing is locked: the Test can be taken before the drills.
- "My results" keeps a printable history of each attempt, with a timestamp, a score bar and a replay of every item.

**Feedback**
- A wrong answer gets a generic message plus retry or reveal.
- In reading exercises, a correct answer is followed by a narrated explanation card giving the reason. Our `explanation` field could do the same.
- Our item-quality rules already require per-option feedback that names the mistake ("That's ten more. Count on by just one."), which goes further than Anton's generic message. Ask the app team whether `explanation` is shown after correct answers as well as wrong ones.

**Item design**
- Many Anton items offer only 2 options: Blitzlesen, the Year 5 image choice, the Year 5 word choice. We have no rule on option count. Setting a floor of 3 options for multiple choice outside true/false would keep our guess rate below theirs.
- In reading exercises the text stays pinned above the questions. Answered questions stay on screen and the next one appears below, so the child never has to remember the text.
- The intro exercise for a concept is 4 narrated flashcards (picture plus word) that advance on their own. Picture questions on the same words follow immediately. It is a short version of our teach step followed by guided practice.

**The foreign-language lesson template (Englisch Klasse 3)**

Every vocabulary lesson runs the same five exercises: Vokabeln lernen, Vokabeln üben, Vokabeln abschreiben, Vokabeln buchstabieren, Test.
- **Lernen:** flashcards with a picture, the English word with audio, and the German translation in italics. The instruction is in German.
- **Üben:** matching translation pairs by sliding one tile onto the other, plus picture choice.
- **Buchstabieren:** drag letter tiles into one box per letter, a scaffold before free typing.

This maps onto our part structure. Learn is the teach step, practise is guided practice, copy and spell are applied practice, and Test is the assessment. Suggest using it as the default part shape for de/english and en/german vocabulary parts. Letter-tile spelling already works with our `ordering` type: letters as options, `slot_count` equal to the word length, extra letters as distractors.

**DaZ lesson tags**

Each DaZ A1 lesson page carries a tag line that names the communicative goal and the grammar points. "Ich habe einen Stift." is tagged: naming things, indefinite articles, accusative object, pronouns, conjugation of haben, statement, question, present tense. Its exercises drill the haben forms, then the pronoun choice, then ein/eine/einen, then complete sentences, then the Test. This is the model for en/german G2 to G4: grammar taught inside a phrase, and a can-do plus grammar tag on every part (see item 6 of the order of work below).

## 6. Suggested order of work

1. **Decide that de/english is a foreign-language course and de/german is a native-speaker course, then rebuild their catalogues.** Today the de version ships the wrong curriculum to both audiences. This matters more than any single topic gap.
2. **Refocus en/german G2 to G4 on A1/A2 themes,** and extend the en-LOI standard to G4.
3. **Add the Rechtschreibstrategien strand to de/german G2 to G4,** and Erstlesen to de/german G1.
4. **Add the phonics spine and the missing grammar and punctuation lessons to en/english.**
5. **Schema work:** typed gap in a sentence first, then flash display, tracing v2, per-option audio and syllable marking.
6. **Tag every lesson with a framework objective** (Common Core for en/english, the KMK Bildungsstandards for de/german, CEFR levels for both foreign-language catalogues), so the gaps above can be tracked.
