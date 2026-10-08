# Anton curriculum research: English (UK) and German (DE)

> **Prior baseline, kept as written.** From the first crawl on 2026-10-07, moved
> here from schoolido-learning/docs/notes on 2026-10-08. The raw files from that
> crawl were deleted, so this note is all that survives of it. Outdated: the
> "no question text" and "IST sign-off" limits (lifted), and the grade cap (only
> UK Reception to Year 5 and Deutsch Klasse 1 to 4 were covered; Phase 1 covers
> every grade). Counts and shares come from rendered pages and 33 sampled
> lessons, so treat them as approximate. Use the plan ids and endpoints as the
> starting point for step 1a, and the per-grade counts as a check on 1b and 1c.

Date: 2026-10-07. Source: anton.app, signed in with a research account, browsed by hand at human pace (one tab, pauses of 3 to 8 seconds between navigations). Research only. This note records titles, structure and exercise mechanics. It holds no question text, answers, audio or images. Question-level content would be a separate step and needs IST sign-off first.

## Scope and method

- Anton has no "English (EU)" version. The language versions are English (US), English (UK), Deutsch, Français, Español and Português (BR). English (UK) (`/en_gb/`, National Curriculum, Reception to KS3) is used here as the European English track.
- German means the Deutsch language version (`/de/`): the Deutsch subject (L1, native speakers) and Deutsch Zweitsprache (DaZ, German as a second language). Both matter to us, because our G1/G2 German reads like DaZ and our G3/G4 German reads like Deutsch L1.
- Covered: UK English Reception to Year 5, Deutsch Klasse 1 to 4, DaZ "Kurs A1" and "Vokabel-Training (leicht)" at section level. Not covered: UK Year 6, KS3, Deutsch Klasse 5 and up, DaZ Alphabetisierung, A2 and Vokabel-Training.
- Lesson lists were read from the rendered pages. Exercise lists were read from 33 sampled lessons (24 English, 9 German), about 200 exercises in total. Three exercises were opened to see the interaction. No paywall, captcha or rate limit came up. One page hung on the loading screen after four full reloads in a row. It recovered after a 30-second pause, and from then on I navigated inside the app.
- The account's language version was switched from English (US) to English (UK) and then to Deutsch. It is still set to Deutsch.

### Age alignment

| Our grade | Age | UK English | Deutsch |
| --- | --- | --- | --- |
| G1 | 6 to 7 | Year 2 (Year 1 for phonics, see gaps) | Klasse 1 |
| G2 | 7 to 8 | Year 3 | Klasse 2 |
| G3 | 8 to 9 | Year 4 | Klasse 3 |
| G4 | 9 to 10 | Year 5 | Klasse 4 |

Our G1 English content (CVC words, short vowels, word families) matches UK Reception and Year 1 phonics, one year younger than the age mapping suggests. Both mappings are used below where it matters.

## How the course tree is served

All curriculum data comes from one static file endpoint on a content CDN. I recorded the URL shapes only. I did not save response bodies.

- **Course tree per grade:** `GET https://content.anton.app/files/?fileId=plan/<plan-id>&etag=<hash>-<size>`. There is one JSON file per grade and subject, loaded when the grade page opens. The ETag suffix looks like a byte size (for example `b15f-215543` for Year 1 English, about 215 KB).
  - UK English: `c-nateng-r-gb` (Reception), `c-nateng-1-gb` to `c-nateng-5-gb`
  - Deutsch: `c-natdeu-1` to `c-natdeu-4`
  - DaZ: `c-deu-a1` (Kurs A1), `c-mono-deu-0` (Vokabel-Training leicht)
  - Maths for comparison: `c-mat-1`
- **Plan index:** `fileId=list/plans&etag=latest`.
- **Images:** `fileId=image/lsg_<10-hex hash>&etag=<hash>-<size>`, with about 160 thumbnails per grade page.
- **App code:** `fileId=project/<module>!master!<version>!0`, versioned through `fileId=projectVersions`. Each UI area is its own module (`app01-learn-list`, `app01-trainers`, `lsg2`, and so on).
- **Mirrors:** `content.anton.app` and `content-2.anton.app`. The client pings both and fails over.
- **Session traffic** goes to other hosts: `b-apis-db.anton.app` (POST, user actions), `apis-db-logger-s-lb-*.anton.app/apisLogger/subscribe` (GET long-poll with an auth token in the query string) and `logger.anton.app/events` (analytics).
- **Page URLs** mirror the plan: `/en_gb/learn/uk-english-year-1/topic-08-alphabet/exercises-01-Aa/exercise-01/`, which is grade, then topic, then lesson ("exercises" in Anton's words), then exercise. Deep links reload to the landing page and resume after the account name is clicked.

**Takeaway for us:** Anton ships one JSON tree per grade and subject, CDN-cached by ETag. Our per-module JSON layout is finer-grained. A per-grade index file of the same kind would cut app start-up requests, if the app needs that.

## Topic maps

Format is section, then lesson titles, with lesson counts. The grade header gives Anton's own exercise count. Numbered repeats (for example "Main Topic (1), (2)") are folded together.

### UK English, Reception (204 exercises, 51 lessons)

Synthetic phonics in UK "Letters and Sounds" order. There are 13 sections, one per sound set, and one lesson per grapheme, 4 exercises each.

- s, a, t, p; i, n, m, d; g, o, c, k; e, u, r; h, b, f, l; j, v, w, x; y, z, qu
- Digraphs ff, ll, ss, zz, ck; sh, ch, th (hard and soft), ng
- Digraphs and trigraphs ai, ee, oa, igh; oo (short and long), ar, or; ur, ow, oi, ear; er, air, ure

### UK English, Year 1 (929 exercises, about 164 lessons)

- **Reading, Phonics (22):** Phase 5 alternative graphemes (ay, ou, ie, ea, oy, ir, ue, aw, wh, ph, ew, oe, au, ey) and split digraphs a-e, e-e, i-e, o-e, u-e
- **Reading, Phonics Review (20):** cumulative review of every sound set from Reception onward, 6 to 10 exercises each
- **Reading, Words (19):** short-vowel words a/e/i/o/u, silent e, common short words (4 lessons plus practice), suffixes -s/-es and -ing/-ed/-er/-est, contractions, longer words, common exception words
- **Reading, Texts (6):** Definitions, Fantasy and Reality, Stories, Rhyming Words (2), Categories
- **VGP, Word (10):** nouns, plural nouns, -s/-es plurals, adjectives, verbs, prefixes, un-, noun/verb/adjective suffixes
- **VGP, Sentence (5):** Words and Sentences, Types of Sentences (2), Question Words, Connectives
- **VGP, Text (1):** Sequencing Sentences
- **VGP, Punctuation (5):** Words and Spaces, Capital Letters, Capital I, Capital Letter Rules, Sentence Punctuation
- **Spelling (32):** syllables, suffixes, un-, ff/ll/ss/zz/ck, nk, tch, ve, vowel digraph spelling sets (ai/oi/ay/oy, ar, ee/ea, er/ir/ur, oo/ue/ew, ou/ow, ie/igh, or/ore/aw/au, air/ear/are), y endings, ph/wh, k, compound words, common exception words, days of the week, colours
- **Spelling Practice (8):** word-list drills, 4 words per list
- **Alphabet (36):** one lesson per letter Aa to Zz, a review every 3 letters, then upper/lower case and alphabetical order

### UK English, Year 2 (654 exercises, about 117 lessons)

- **Reading, Words (16):** decoding (3), blending (2), blending longer words (2), common suffixes (2), common exception words (2), vowel digraphs, alternate vowel sounds, long vowels, consonant blends, consonant digraphs and trigraphs
- **Reading, Texts (18):** Reading Comprehension (4), Text Types, Text Structure, Book Parts, Main Idea, Setting, Word Detectives, Characters, Events, Poems, Story Structure, Visualising, Analysing, Summarising, Comparing Texts
- **VGP, Word (20):** nouns (2), plurals (2), compound nouns, adjectives, adverbs, adjectives and adverbs, verbs, personal pronouns (2), indefinite pronouns, possessive determiners, possessive pronouns, articles, demonstratives, noun/verb/adjective suffixes, comparative adjectives
- **VGP, Sentence (5):** types of sentence, coordinating and subordinating conjunctions, prepositions, noun phrases
- **VGP, Text (3):** present/past tense, present/past/future, progressive form
- **VGP, Punctuation (9):** capitals and full stops, capital I, capital rules, sentence punctuation, commas in lists, possessive apostrophes, contractions (2), practice
- **Spelling (15):** dge/ge/g, soft c, kn/gn, wr, le/el/al/il, ment/ness, ful/less/ly, suffixes, contractions, -tion, homophones, common exception words, syllables, synonyms and antonyms, shades of meaning
- **Spelling Practice (11):** word lists
- **KS1 Test Practice, Questions (10) and Spelling (10):** SATs-style practice papers, 4 exercises each

### UK English, Year 3 (467 exercises, 88 lessons)

- **Reading Comprehension, Fiction (14):** Asking Questions, Key Details, Fables (2), Point of View (2), Ordering Events, Problems and Solutions, Describing Pictures, Illustrating Stories, Rhyme, Alliteration, Comparing People, Fairytales
- **Reading Comprehension, Non-Fiction (11):** Key Details, Main Topic (2), Purpose, Cause and Effect, Comparing (3), Image Information, Series and Steps, Text Features
- **VGP, Word (20):** nouns, plurals, group nouns, adjectives (2), adverbs, adjectives and adverbs, verbs, verb forms, to be, to have, word families, personal/possessive/indefinite/reflexive pronouns, definite and indefinite articles, determiners, Standard English, nouns with prefixes and suffixes
- **VGP, Sentence (6):** coordinating and subordinating conjunctions, prepositions, noun phrases, time/place/cause, fronted adverbials
- **VGP, Text (6):** nouns and pronouns, tenses (2), progressive, present perfect, paragraphs, headings
- **VGP, Punctuation (7):** capitals, end punctuation, commas, possessive apostrophes, contractions, direct speech, practice
- **Spelling (16):** vowel suffixes, y, ou, prefixes in/un/mis/dis and re/sub/inter/super/anti/auto, -ation, -ly, -sure/-ture, -ous, -tion/-cian/-sion, ch, root words, sc, homophones, morphology and etymology
- **Spelling Practice (8):** statutory Year 3/4 word list

### UK English, Year 4 (359 exercises, 70 lessons)

- **Fiction (8):** fables/folktales/myths (2), point of view (2), pictures (2), comparing (2)
- **Non-Fiction (10):** informational texts, main topic (2), terms and phrases, series and steps (2), pictures (2), comparing (2)
- **VGP, Word (14):** nouns, plurals, adjectives, adverbs, verbs, word families, pronouns, possession, plural vs possessive s, determiners, Standard English, prefixed and suffixed nouns
- **VGP, Sentence (6):** conjunctions, prepositions, clauses, noun phrases, time/place/cause, fronted adverbials
- **VGP, Text (6):** nouns and pronouns, tenses, progressive, present perfect, paragraphs, headings and subheadings
- **VGP, Punctuation (7):** as in Year 3
- **Spelling (11):** prefixes, -tion/-cian/-sion, -gue/-que, suffixes, root words, ei/eigh/ey, homophones, context clues, shades of meaning, double meaning, abbreviations
- **Spelling Practice (8)**

### UK English, Year 5 (500 exercises, 90 lessons)

- **Fiction (10):** reading dramas, a play (2 parts), a film, poems, limericks, haikus, narrator, illustration information (2)
- **Non-Fiction (9):** non-fiction texts, main topic (2), terms and phrases (2), evidence and reason, interpreting information (2), combining information
- **VGP, Word (12):** nouns, adjectives, adverbs, verbs, synonyms and antonyms, pronouns, determiners, Standard English, formal and informal, verb prefixes and suffixes
- **VGP, Sentence (10):** conjunctions, prepositions, clauses, relative clauses (2), noun phrases, fronted adverbials, degrees of possibility, passive voice, formal structures
- **VGP, Text (7):** nouns and pronouns, tenses, progressive, perfect, paragraph cohesion, linking paragraphs, layout devices
- **VGP, Punctuation (12):** capitals, end punctuation, commas (2), apostrophes, direct speech, parenthesis, colons/semi-colons/dashes, colons in lists, bullet points, hyphens, practice
- **Spelling (22):** prefixes (2), hyphenating prefixes, -cious/-tious, -tial/-cial, -ant/-ent families, -able/-ible, suffixes (2), ei/ie, ough, silent letters, unstressed vowels, alternate sounds (2), homophones (4), words in context, sayings and expressions, figures of speech
- **Spelling Practice (8):** statutory Year 5/6 word list

### Deutsch, Klasse 1 (564 exercises, about 91 lessons)

- **Buchstaben und ihre Laute lernen (1) (31):** letters in the Fibel order L, O, A, M, I, S, T, E, N, D, U, P, K, B, F, Ei, R, H, W, G, Au, Sch, Z, Eu, Ch, J, plus ie and cumulative "Übungen" reviews after each new letter
- **Buchstaben und ihre Laute lernen (2) (16):** Ö, Ü, Ä, St, Sp, Pf, ng, nk, Qu, V, C, Y, X, Äu, ck, ß
- **Silben lesen (3):** one, two and three syllables
- **Erste Wörter lesen (6):** ABC order, words and pictures, similar words, singular/plural, word chains, riddles
- **Erste Sätze lesen (4):** picture-sentence matching, descriptions, key words, "Malen mit Anton" (read and colour)
- **Erste Texte lesen (4):** short texts, ordering a story, finding headings, reading tables
- **Erste Wörter schreiben (7):** copying words, gap words, building words, word snakes, plurals, capitalisation, suffixes
- **Erste Sätze schreiben (6):** copying sentences, dictation, articles, shuffled sentences, "Satzsalat", gap sentences
- **Sprechen und Zuhören (10):** rhymes, poems, emotions, play stories, tongue twisters, jokes, theme stories (trees, animals, plants, travel)
- **Blitzlesen, Grundwortschatz (4):** timed sight-reading, easy/medium/hard/function words

### Deutsch, Klasse 2 (860 exercises, 69 lessons plus 60 handwriting lessons)

- **Grammatik:** Nomen (7: noun basics, compounds, definite/indefinite articles, singular/plural), Verben (3: basics, conjugation, prefixed verbs), Adjektive (3), Satzarten/Satzzeichen (4), Oberbegriffe/Wortfelder (2)
- **Rechtschreibung:** Silben (3), vowels/umlauts/diphthongs/consonants (5), special sounds Sp/St, Qu, V, tz, chs, x (6), Wortstamm/Wortfamilie (2), strategies (6: Silbenschwingen, lengthening d/t, b/p, g/k, deriving ä and äu), capitalisation (2), ABC (2)
- **Lesen:** Genau lesen (4), pictograms and diagrams (2), understanding texts (6: key words, skimming, finding information, inferring words, reading riddles, text types)
- **Schreiben (8):** lists, invitations, letters, poems, writing to pictures, profiles and descriptions, describing a process, revising
- **Blitzlesen (4)**
- **Schreibschrift (60):** three cursive scripts (Schulausgangsschrift 18, Vereinfachte Ausgangsschrift 21, Lateinische Ausgangsschrift 21), letter groups traced in order

### Deutsch, Klasse 3 (588 exercises, about 100 lessons)

- **Grammatik:** Nomen (9: incl. pronouns, compounds, -ung/-nis/-heit/-keit), Verben (8: strong/weak in present and past, prefixes ver/vor/ab/zer/auf/ein/aus/...), Adjektive (8: opposites, -ig/-lich, three compound types, comparison), Satzglieder (5: subject, predicate, identifying, building, moving), Satzarten (2), Wörtliche Rede (3: speech tag before, inside and after)
- **Rechtschreibung:** Silben (4), short and long vowels (5: double consonants, ck, tz, i/ie), special sounds (5), strategies (12: lengthening, Merkwörter for double vowels, long i, Dehnungs-h, ß, deriving ä/äu), capitalisation (3), Wörterbuch (2), correcting errors (2)
- **Lesen:** Genau lesen (3), pictograms and diagrams (2), understanding texts (4), text types (6: recipes, poems, fairy tales, Andersen, Grimm), books and library (2)
- **Schreiben:** planning (3), writing (6: dictation, stories, Elfchen, haiku, descriptions, Reizwortgeschichten), revising (2)
- **Blitzlesen (4)**

### Deutsch, Klasse 4 (408 exercises, 67 lessons)

- **Grammatik:** Nomen (4: incl. the four cases), Verben (7: Präteritum, Perfekt, Futur, imperative, compound verbs), Adjektive (3), Satzglieder (6: dative and accusative objects, place and time adverbials), Satzarten/Satzzeichen (5: das/dass, conjunctions, list commas, direct speech), Sprache erforschen (3: idioms, spoken vs written, loanwords)
- **Rechtschreibung:** Silben (2), short/long vowels (8), s-sounds, ph, v (3), strategy review (4), capitalisation (4: hidden articles, multi-part proper names)
- **Lesen:** graphs and tables (2), understanding texts (3), speaking and presenting (4: poem recital, giving a talk with feedback, preparing a presentation, interviews), text types (4: Sagen, Balladen, Fabeln, mixed)
- **Schreiben:** planning (1), writing (4: emails, reports, describing feelings, dictation)

### DaZ (German as a second language), section level

- **Vokabel-Training (leicht) (110 exercises):** greetings; colours (3 lessons); numbers 1 to 10 (2); body (2); family (2); school (3); outdoors (town, nature, transport)
- **Kurs A1 (487 exercises), 14 themes:** greetings and introductions (7); school (10, incl. articles, plurals, haben, possessives, numbers 13 to 20); classroom phrases (3); hobbies (12, incl. verb conjugation and modal verbs); shopping (6, incl. numbers to 100 and money); food (6, incl. comparatives); continents and languages (2); people, clothes and feelings (10); health (3); animals (5); home (6, incl. prepositions with dative); seasons (4); weather (2); time and calendar (1)
- Also listed but not mapped: Alphabetisierung (342), Kurs A2 (216), Vokabel-Training (238)

## Exercise type inventory

Each Anton lesson ("Übung" in German) holds 3 to 9 named exercises. Each exercise is a run of about 12 items with a progress bar. Types below are inferred from exercise titles in the 33 sampled lessons, about 200 exercises, plus three exercises opened directly. Frequencies are approximate.

| Type (Anton title pattern) | Rough share | Notes |
| --- | --- | --- |
| Select / choose (Find, Choose, Choose Sound, Yes or No, "Die richtige ... auswählen") | about 25% | Tile grid, often with an audio prompt. Observed as a 2x2 letter grid with "select the letter that matches the sound". |
| Test (end-of-lesson) | about 12% (1 per lesson) | Present in 24 of 33 sampled lessons. Missing from phonics-sound, reading-text and practice-paper lessons. |
| Reading a named text with questions | about 12% | Stories, fables, informational texts, haikus, fairy tales. Each text is its own exercise. |
| Match / sort / drag (Match, Sort, Drag Pictures and Sounds, "zuordnen", "sortieren", Categorising) | about 12% | |
| Typed production (Spell, Writing Whole Words, "Wörter hören und schreiben", "eintragen", Converting to the passive, Writing Speech) | about 10% | Spelling from audio (dictation) is routine from Klasse 1 and Year 1. |
| Fill the gap ("einsetzen", Fill in, Adding Commas, "Wortenden ergänzen") | about 8% | |
| Tap or mark in text (Finding Fronted Adverbials, Finding Silent Letters, "markieren", "Störenfriede streichen") | about 7% | Observed as tap-the-word in a sentence, with a photo and sentence audio. |
| Learn / explain ("Learn s", "Erklärung", "kennenlernen", "What is a Haiku?") | about 6% | The main teaching surface. It is an exercise in the list, not a separate step. Some drill exercises also open with a narrated animated explainer slide. |
| Build / order (Combine, Building Lists, "Satz zusammenbauen", ordering a story, Satzsalat) | about 5% | |
| Error correction (Correcting Mistakes, Correcting Spellings, "Fehler berichtigen") | about 3% | |
| Handwriting / tracing ("Write Aa", Schreibschrift) | small in samples, large in Klasse 2 | 60 cursive lessons in Deutsch Klasse 2 alone |
| Timed reading (Blitzlesen) | 4 lessons per grade in Deutsch K1 to K3 | Words flash briefly and the child picks the match |
| Other (word search, read-and-colour, interviews, practice papers) | about 2% | |

The landing page claims "over 200 exercise types".

## Lesson structure and progression model

- **Hierarchy:** subject, then grade (Year/Klasse), then section (for example "Vocabulary, Grammar and Punctuation, Sentence"), then lesson, then 3 to 9 exercises, then about 12 items. Grade pages say "More topics are coming soon".
- **Typical skill lesson:** an optional Learn/Erklärung exercise, then 3 to 7 drills that change the interaction (find, sort, fill, build, correct, write), then a Test. Example: Year 5 "Silent Letters" runs Finding, five letter-specific drills, Adding, Spelling, then Test.
- **Phonics lesson:** a fixed 4-exercise template per grapheme (Find Letter, Choose Sound, Choose Picture and Find Letter in Word, Drag Pictures and Sounds) with no test. Reviews come as separate cumulative lessons after every 2 to 4 graphemes (English) or after every new letter early on (Deutsch).
- **Reading lessons:** one exercise per text, usually with no test.
- **Item flow:** phonics and simple drill exercises open straight into a question. Strategy lessons (for example Deutsch Klasse 2 "Wörter verlängern") open with a narrated, animated explainer slide inside the first exercise, with replay and "Weiter". Every prompt has read-aloud audio. A correct answer gets a green outline and auto-advances. A wrong answer shows "try again" or "reveal" (the reveal strikes the wrong answer in red and shows the right one). From Year 3 on, some exercises have a "Hint" button that shows one narrated strategy note per exercise, not per item.
- **Progression:** no locks. Every lesson in every grade can be opened directly. The plan file sets the order, and "Last viewed" marks where the learner left off.
- **Rewards:** the profile card shows three counters. The UK landing page says learners "earn stars and trophies through learning exercises and unlock fun games like puzzles, car races and pixel art". I did not play a full exercise through to the reward screen.
- **Assessment:** lesson Tests only, plus KS1 SATs-style practice papers in Year 2. I saw no placement or baseline test.

## Gap comparison against our G1 to G4 catalogues

Our side comes from the canonical catalogues in `content/en/grade-{1..4}/{english,german}` (the `content/pilot` tree is a partial staging copy and leaves out some G1 topics, such as letter recognition and letter sounds), and from `docs/taxonomy.md` for the lesson contract.

### Size

| | Ours: topics / parts | Anton UK English: lessons | Ours German: topics / parts | Anton Deutsch: lessons |
| --- | --- | --- | --- | --- |
| G1 | 32 / 116 | 164 (Y1), 117 (Y2) | 26 / 93 | 91 |
| G2 | 41 / 134 | 88 (Y3) | 29 / 93 | 69 + 60 handwriting |
| G3 | 31 topics | 70 (Y4) | 23 topics | 100 |
| G4 | 28 topics | 90 (Y5) | 25 topics | 67 |

Our units are not the same size as Anton's. One of our parts is a 6 to 7 step sitting of about 25 to 35 questions, while one Anton lesson is 3 to 9 exercises of about 12 items each. By item volume the two are closer than the lesson counts suggest. By distinct topics, Anton has 2 to 4 times more per grade in English, and 2 to 4 times more in German from Klasse 2 on.

### English: Anton has it, we do not

- **A full synthetic phonics sequence.** Anton teaches about 90 graphemes one lesson each (Reception plus Year 1), in a published order with cumulative reviews. We have CVC, short vowels, word families (G1), and blends, digraphs ch/sh/th/wh, vowel teams oa/ui and silent letters (G2). We do not cover most Phase 3 to 5 graphemes: ai, ee, igh, oa, oo, ar, or, ur, ow, oi, ear, air, ure, er, the alternative spellings (ay, ou, ie, ea, oy, ir, ue, aw, ew, oe, au, ey) or the split digraphs a-e to u-e.
- **Letter knowledge depth.** Anton has one lesson per letter plus case and ABC order (36 lessons). We cover A to Z in two topics (Letter Recognition and Letter Sounds, 6 parts each), which puts about five letters in each part.
- **Spelling as its own strand.** Anton has 15 to 32 spelling lessons per year, plus word-list practice tied to the statutory lists, plus typed spelling. Spelling appears in our G2 (`spelling-patterns`), G3 (`spelling-patterns-advanced`) and G4 (`spelling-patterns-and-rules`) at 2 to 3 parts each.
- **Grammar breadth.** Anton covers word classes we skip: pronoun types (personal, possessive, reflexive, indefinite), determiners and demonstratives, articles, Standard English, formal/informal, relative clauses, passive voice, modal verbs ("degrees of possibility"), present perfect, progressive form, paragraph cohesion.
- **Punctuation breadth.** Anton covers commas in lists, apostrophes (possession and contraction), direct speech, parenthesis, colons, semi-colons, dashes, bullet points and hyphens, 7 to 12 lessons per year. We have capitals, end marks (G1) and quotes and commas (G3, G4).
- **Reading volume.** Anton writes a new text for each reading exercise (plays, films, limericks, haikus, fables, informational texts). Our reading topics teach comprehension skills on short passages.
- **Test prep.** Year 2 has KS1 SATs practice papers. We have no exam-format practice.

### English: we have it, Anton does not

- **Writing as a process.** We cover brainstorm, plan, draft, revise and edit; personal narrative, opinion, informational, research and five-paragraph essays; writing for different purposes (G1 to G4). In the sampled years Anton's writing is sentence-level grammar and punctuation, with no composition strand in UK English up to Year 5.
- **Speaking, listening, media, digital.** We have communication skills (G1), presentation skills, media literacy, research skills and digital literacy or citizenship (G2 to G4). Anton UK English has none of these in Years 1 to 5.
- **Fluency instruction.** Our reading fluency topics (accuracy, phrasing, expression, self-correction) have no Anton UK counterpart. Anton's Blitzlesen appears only in German.

### German: Anton has it, we do not

- **Beginning reading (Erstlesen).** Anton Klasse 1 has 47 letter lessons in Fibel order, syllable reading, then words, sentences and texts. Our G1 German has five phonics topics (alphabet, letter sounds, short vowels, umlauts, basic consonants) and then switches to vocabulary. It has no syllable reading and no word-to-sentence-to-text progression.
- **Rechtschreibstrategien.** Silbenschwingen, Verlängern, Ableiten and Merkwörter run as a repeated strand in Klasse 2 to 4 with 4 to 12 lessons per year. We have nothing comparable. This is the core of German primary spelling.
- **Handwriting.** Anton has 60 cursive lessons in three Ausgangsschrift variants. We have 40 `tracing` items in the whole English and German tree.
- **Dictation and typed production.** "Wörter hören und schreiben" appears from Klasse 1. We have 679 `text_input` items across all of English and German G1 to G4, under 2% of items.
- **Grammar sequence.** Satzglieder, Wortarten with word-formation suffixes, strong and weak verbs, Wörtliche Rede with three speech-tag positions, das/dass. Our G3/G4 German covers gender, cases, conjugation, plurals and Präteritum, but has no Satzglieder topic and no direct-speech topic.
- **Text types.** Märchen (Grimm, Andersen), Sagen, Balladen, Fabeln, Elfchen and Reizwortgeschichte.

### German: we have it, Anton does not

- Formal and informal register (du/Sie), regional culture, festivals, notable figures, and literature and geography units (G3, G4).
- Essay structure (Aufsatz), letter writing (formal and informal) and research reporting at G4. Anton K4 has emails, reports and a little planning.
- Media literacy at G4.

### Our German track is not consistent across grades

Our G1/G2 German (numbers, colours, family, body, animals, food, weather, greetings, "ich bin / ich habe", question words) lines up almost one to one with DaZ Vokabel-Training (leicht) and the first themes of DaZ Kurs A1. That is by design: `docs/authoring/german-en-loi-standard.md` defines en-LOI German as German for English speakers. But that standard is scoped to `grade-{1,2}` only. Our G3/G4 German (cases, Präteritum, adjective endings, Aufsatz) lines up with Deutsch L1 Klasse 3/4. So the en-LOI learner switches from German as a foreign language to native-speaker German between G2 and G3, with no bridge. Anton keeps DaZ and Deutsch as separate subjects. We need to decide whether G3/G4 en-LOI German continues the foreign-language track (closer to DaZ A1/A2) or is a separate L1 track.

## Strengths and weaknesses against Anton

### Our strengths

1. **Explicit teaching inside every part.** Each part runs opener, warmup (3 prerequisite checks), teach (3 to 5 worked examples), guided practice with 3-tier hints, applied practice, challenge with transfer, and assessment. Anton's teaching is an optional "Learn" or "Erklärung" exercise or a short animated explainer, and its hints (Year 3 and up only) are one note per exercise. A child who gets an Anton item wrong can retry or reveal the answer. One of ours gets three item-specific hints first.
2. **Assessment design.** We have a baseline assessment per grade, a grade final, lesson finals as slot-based pools, and skill-indexed practice that can target weak skills. Anton has only end-of-lesson Tests (and KS1 papers), with no placement or diagnostic.
3. **Coverage beyond decoding and grammar.** Composition, speaking and listening, presentation, media and digital literacy, research, and culture. Anton UK English stops at grammar, punctuation, spelling and comprehension up to Year 5.
4. **Narration as a designed product.** We have an authored narration standard (speakable sounds, audio tags, deliberate pauses). Anton reads every prompt aloud with a speaker icon. It is functional, but I saw no character voice or pacing design.
5. **One curriculum shipped in two languages of instruction.** Every lesson exists in `en/` and `de/`. Anton keeps each language version separate, and the UK and DE trees share no structure.

### Our weaknesses

1. **Breadth.** Anton has 2 to 4 times more distinct topics per grade in English, and in German from Klasse 2 on. The phonics, spelling and punctuation gaps listed above are the largest.
2. **Few interaction types and almost no production.** Across `content/en/grade-{1..4}/{english,german}` (about 36,900 typed items, practice banks included), 55% are multiple choice and 16% true/false. Typing (`text_input`, 679 items, 1.8%), speaking (107) and tracing (40) are close to absent. Anton has the child write, spell, dictate, build, correct and trace in nearly every skill lesson. Spelling cannot be taught well through multiple choice.
3. **No systematic phonics progression in either language.** Anton follows Letters and Sounds (UK) and the Fibel letter order (DE), with cumulative reviews after every sound set. Our phonics is a set of topics rather than one ordered sequence.
4. **No German spelling strategies and no handwriting.** These are core to German Klasse 1 to 4 and are what teachers and parents check against.
5. **The German track switches from DaZ to L1 at G3** (see above).
6. **Thin text library.** Anton gives each reading exercise its own story, play, fable or informational text. Ours reuse short passages per skill.
7. **Curriculum alignment is unlabelled.** Anton names its frameworks: National Curriculum, statutory word lists, KS1 SATs, Letters and Sounds, Ausgangsschrift. Our catalogues do not cite a standard, which makes them harder to sell to schools.

### Suggested follow-ups, in priority order

1. Extend `german-en-loi-standard.md` to G3/G4, or split L1 German into its own track, before authoring more G3/G4 German.
2. Add a typed spelling item and a dictation item (audio to typed word) to the item types. Then retrofit the spelling topics.
3. Draft one ordered phonics sequence for G1 English (graphemes in order with cumulative reviews) and one Erstlesen sequence for G1 German. Map the existing topics into it.
4. Add the missing English grammar and punctuation topics to the G2 to G4 catalogues, using the Anton lists above as a checklist.
5. Add a Rechtschreibstrategien strand to German G2 to G4.
6. Tag each catalogue lesson with the framework objective it serves (for example English NC or Bildungsstandards).
