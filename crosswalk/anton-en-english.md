# Crosswalk: Anton English-GB English vs Twist English (en LOI), G1-G4

Date: 2026-10-09

Inputs:

- Anton: `/Users/diemu/ist/b2c/rnd/catalogue/views/en_gb-english.md` (10 courses, 736 lessons, Reception to KS3)
- Twist: `/Users/diemu/ist/b2c/schoolido-learning/content/en/grade-{1,2,3,4}/english/module-catalog.md` (read only)
- Background: `/Users/diemu/ist/b2c/rnd/anatomy.md`; file spec: `/Users/diemu/ist/b2c/rnd/crosswalk/README.md`

Method:

- Unit of comparison is the Twist lesson (bold title in the catalogue, 132 lessons across G1-G4) against the Anton lesson (an entry inside a topic line, 736 lessons).
- Matching is by what is taught, read from titles and the Twist part descriptions. The Anton catalogue holds titles and exercise counts only, so scope is inferred from the title. Where the title is the only evidence the row is marked partial and says so.
- Exact means same skill and scope. Partial means overlapping skill, or different scope or depth (for example Anton teaches one grapheme per lesson where Twist teaches a set).
- Grade gap is Anton year minus the Twist grade's aligned year (Reception = 0, Y1 = 1, ..., KS3 counted as Y7). Negative means Anton teaches it at a younger age; positive means Anton teaches it later.
- A row lists one Twist lesson against one Anton course and topic. Where several Anton lessons from the same topic match the same Twist lesson they sit in one row (the Pairs count says how many). Every Anton title below was checked against the catalogue file by script.

## Grade alignment

| Twist grade | Age | Aligned Anton course / year | Anton lessons in that course | Note |
|---|---|---|---|---|
| (below G1) | 4-5 | Reception, `c-nateng-r-gb` | 51 | Single-letter phonics and digraphs. Twist teaches this content in G1 Phonics (Letter Sounds) and later G2 and G3 phonics lessons. |
| (below G1) | 5-6 | Year 1, `c-nateng-1-gb` | 165 | Phonics review, short words, common words, alphabet, early grammar. Twist G1 spreads this across G1 phonics, grammar and sentence lessons, so G1 is matched against both Y1 and Y2. |
| G1 | 6-7 | Year 2, `c-nateng-2-gb` | 117 | Aligned year. Twist G1 phonics matches Reception and Y1, not Y2. |
| G2 | 7-8 | Year 3, `c-nateng-3-gb` | 91 | Aligned year. Twist G2 phonics and word study (blends, digraphs, silent letters, affixes) matches Reception to Y2 in Anton. |
| G3 | 8-9 | Year 4, `c-nateng-4-gb` | 70 | Aligned year. Twist G3 grammar and punctuation match Y2 to Y4. |
| G4 | 9-10 | Year 5, `c-nateng-5-gb` | 90 | Aligned year. Twist G4 word study matches Y3 to Y5 in Anton. |
| (above G4) | 10-11 | Year 6, `c-nateng-6-gb` | 89 | No aligned Twist grade. Listed under Missing in Twist. |
| (above G4) | 11-14 | KS3, `c-nateng-7-grammar-gb`, `c-nateng-7-reading-gb`, `c-nateng-7-writing-gb` | 63 (30, 3, 30) | No aligned Twist grade. Courses cover Y7 to Y9 together, so gaps are counted from Y7. |

Structural differences that affect alignment:

- Anton splits English into reading comprehension, vocabulary-grammar-punctuation and spelling topics. Twist G1-G4 add writing (paragraph, narrative, opinion), speaking and communication and media lessons that Anton English-GB has no equivalent for (KS3 Writing is spelling practice only).
- Twist G1 phonics (Letter Sounds, CVC Words, word families) is Reception and Year 1 content in Anton, two to three years earlier than the age alignment.
- Twist G2 vowel teams, blends and digraphs sit in Anton Reception and Year 1 (digraphs and trigraphs) and Year 2 (blends, long vowels).

## Matched lessons

Rows are ordered by Twist grade and catalogue order. Anton lessons are shown as course id (year) / topic: title. Grade gap = Anton year minus aligned year (G1 = Y2, G2 = Y3, G3 = Y4, G4 = Y5).

| Twist lesson (grade, title) | Anton lesson (course id, year, topic, title) | Match | Grade gap | Pairs | Note |
|---|---|---|---|---|---|
| G1: Letter Recognition (A-Z) | c-nateng-1-gb (Y1) / Alphabet: 35 lessons (Aa ... YZ) | partial | -1 | 35 | Anton teaches one letter or one letter trio per lesson; Twist teaches five letters per part |
| G1: Letter Recognition (A-Z) | c-nateng-1-gb (Y1) / Alphabet: Small and Capital Letters; Alphabetical Order | partial | -1 | 2 | Twist covers case match and alphabetical order only in its Part 6 review |
| G1: Letter Sounds (A-Z) | c-nateng-r-gb (Reception) / Phonics - s, a, t, p: all 4 lessons // Phonics - i, n, m, d: all 4 lessons // Phonics - g, o, c, k: all 4 lessons // Phonics - e, u, r: all 3 lessons // Phonics - h, b, f, l: all 4 lessons // Phonics - j, v, w, x: all 4 lessons // Phonics - y, z, qu: all 3 lessons | exact | -2 | 26 | Same skill: letter to sound for all 26 letters plus qu; Anton places it in Reception |
| G1: Letter Sounds (A-Z) | c-nateng-1-gb (Y1) / Reading - Phonics Review: Phonics Review - s, a, t, p; Phonics Review - i, m, n, d; Phonics Review - g, o, k; Phonics Review - c, e, u, r; Phonics Review - h, b, f, l; Phonics Review - j, v, w, x; Phonics Review - z, y, qu | partial | -1 | 7 | Review of the same single letters |
| G1: Rhyming Words | c-nateng-1-gb (Y1) / Reading - Texts: Rhyming Words (1); Rhyming Words (2) | exact | -1 | 2 |  |
| G1: CVC Words | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a'; Short Words with 'e'; Short Words with 'i'; Short Words with 'o'; Short Words with 'u'; Short Words Practice | exact | -1 | 6 | Both teach one short vowel family at a time, then a mixed review |
| G1: CVC Words | c-nateng-2-gb (Y2) / Reading - Words: Practising Blending (1); Practising Blending (2); Decoding Words (1); Decoding Words (2); Decoding Words (3) | partial | 0 | 5 | Matched on title only; scope of blending and decoding lessons not visible in the catalogue |
| G1: Sight Words (Set 1): read and recognize | c-nateng-1-gb (Y1) / Reading - Words: Common Short Words (1); Common Short Words (2); Common Short Words (3); Common Short Words (4); Common Short Words Practice | exact | -1 | 5 | High-frequency short words read on sight, then a practice lesson |
| G1: Sight Words (Set 1): read and recognize | c-nateng-1-gb (Y1) / Spelling Practice: Spelling Practice (1) - the, a, am, is; Spelling Practice (2) - I, she, he, you; Spelling Practice (3) - of, to, in, on; Spelling Practice (4) - my, it, as, we; Spelling Practice (5) - up, by, and, how | partial | -1 | 5 | Spelling of words that overlap Twist Set 1 (the, a, I, to, in, my, it, we, and, is); reading versus spelling |
| G1: Sight Words (Set 1): use in sentences | c-nateng-1-gb (Y1) / Reading - Words: Common Short Words Practice | partial | -1 | 1 | Closest title; Twist adds fill-in and sentence building with the same words |
| G1: Short Vowel Sounds | c-nateng-r-gb (Reception) / Phonics - s, a, t, p: Phonics - a // Phonics - i, n, m, d: Phonics - i // Phonics - g, o, c, k: Phonics - o // Phonics - e, u, r: Phonics - e; Phonics - u | partial | -2 | 5 | Anton teaches each vowel letter with its sound; Twist is a hearing lesson across all five vowels |
| G1: Word Families: -at and -an | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Word Families: -ap and mixed review | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Short e Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'e' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Short i Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'i' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Short o Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'o' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Short u Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'u' | partial | -1 | 1 | No word-family lesson in Anton; short-vowel words cover the same word set |
| G1: Reading Comprehension: answer literal questions | c-nateng-2-gb (Y2) / Reading - Texts: Reading Comprehension (1); Reading Comprehension (2); Reading Comprehension (3); Reading Comprehension (4) | partial | 0 | 4 | Generic comprehension titles; Twist drills who, what, where, when |
| G1: Reading Comprehension: answer literal questions | c-nateng-1-gb (Y1) / Reading - Texts: Stories | partial | -1 | 1 | Title only |
| G1: Reading Comprehension: answer literal questions | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Key Details in Fiction | partial | +1 | 1 | Literal detail questions on a longer text |
| G1: Reading Comprehension: retell key events | c-nateng-2-gb (Y2) / Reading - Texts: Story Structure | exact | 0 | 1 | Beginning, middle, end |
| G1: Reading Comprehension: retell key events | c-nateng-2-gb (Y2) / Reading - Texts: Events | partial | 0 | 1 |  |
| G1: Reading Comprehension: retell key events | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Text: Sequencing Sentences | partial | -1 | 1 | Ordering sentences, not whole-story retelling |
| G1: Reading Comprehension: retell key events | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Ordering Stories and Events | partial | +1 | 1 | Same skill at longer-text depth |
| G1: Writing Sentences: complete ideas | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Sentence: Words and Sentences | partial | -1 | 1 | Title only; Twist teaches who part and what-happens part |
| G1: Writing Sentences: capitals and spacing | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Words and Spaces | partial | -1 | 1 | Covers the spacing half of the Twist lesson |
| G1: Writing Sentences: capitals and spacing | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letters | partial | -1 | 1 | Covers the capital-at-start half of the Twist lesson |
| G1: Writing Sentences: capitals and spacing | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letters and Full Stops | partial | 0 | 1 | Anton repeats it at Y2 with full stops |
| G1: Writing Sentences: ending punctuation | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Sentence Punctuation | exact | -1 | 1 |  |
| G1: Writing Sentences: ending punctuation | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Sentence Punctuation | exact | 0 | 1 | Anton repeats it at Y2 (aligned) |
| G1: Writing Sentences: ending punctuation | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Sentence: Types of Sentences (1); Types of Sentences (2) | partial | -1 | 2 | Sentence types (statement, question) behind the . and ? choice |
| G1: Writing Sentences: ending punctuation | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Sentence: Types of Sentence | partial | 0 | 1 |  |
| G1: Capitalization | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letter Rules | exact | -1 | 1 |  |
| G1: Capitalization | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital I | partial | -1 | 1 | Pronoun I part only |
| G1: Capitalization | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letter Rules | exact | 0 | 1 | Anton repeats it at Y2 (aligned) |
| G1: Capitalization | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Capital 'I' | partial | 0 | 1 | Pronoun I part only |
| G1: Everyday Vocabulary: naming and sorting words | c-nateng-1-gb (Y1) / Reading - Texts: Categories | exact | -1 | 1 | Sorting words into groups |
| G1: Everyday Vocabulary: naming and sorting words | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Nouns | partial | -1 | 1 | Twist notes these are the naming words (nouns) that later lessons build on |
| G1: Plural Nouns | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Plural Nouns; Plurals with '-s' and '-es' | exact | -1 | 2 |  |
| G1: Plural Nouns | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-s', '-es' // Reading - Words: Adding Suffixes '-s' and '-es' | partial | -1 | 2 | Same rule seen as spelling or reading of suffixed words |
| G1: Plural Nouns | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Plurals (1); Plurals (2) | partial | 0 | 2 | Anton Y2 plural lessons may extend past -s and -es; title only |
| G1: Action Words (Verbs) | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | -1 | 1 |  |
| G1: Action Words (Verbs) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | 0 | 1 | Anton repeats it at Y2 (aligned) |
| G1: Describing Words (Adjectives) | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Adjectives | exact | -1 | 1 |  |
| G1: Describing Words (Adjectives) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Adjectives | exact | 0 | 1 | Anton repeats it at Y2 (aligned) |
| G2: Long Vowel Sounds | c-nateng-2-gb (Y2) / Reading - Words: Long Vowel Sounds | exact | -1 | 1 |  |
| G2: Long Vowel Sounds | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: all 4 lessons | partial | -3 | 4 | Spellings of long a, e, o and i taught as digraphs and a trigraph, one per lesson |
| G2: Long Vowel Sounds | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - a-e; Phonics - e-e; Phonics - i-e; Phonics - o-e; Phonics - u-e (1); Phonics - u-e (2) | partial | -2 | 6 | Split-digraph spellings of the long vowels, taught one vowel at a time |
| G2: Vowel Teams: ai and ee | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: Digraphs - ai; Digraphs - ee | partial | -3 | 2 | Covers ai and ee only; Twist adds ay and ea |
| G2: Vowel Teams: ai and ee | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - ay; Phonics - ea // Spelling: Words with 'ai', 'oi', 'ay', 'oy'; Words with 'ee', 'ea' | partial | -2 | 4 | ay and ea reading plus spelling of the same teams |
| G2: Vowel Teams: ai and ee | c-nateng-2-gb (Y2) / Reading - Words: Vowel Digraphs | partial | -1 | 1 | Wider set of vowel digraphs |
| G2: Vowel Teams: oa and ui | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: Digraphs - oa | partial | -3 | 1 | oa only; no Anton lesson on ui |
| G2: Vowel Teams: oa and ui | c-nateng-2-gb (Y2) / Reading - Words: Vowel Digraphs | partial | -1 | 1 | Wider set of vowel digraphs |
| G2: Consonant Blends: foundations | c-nateng-2-gb (Y2) / Reading - Words: Consonant Blends | partial | -1 | 1 | Anton does all blends in one lesson; Twist splits l-blends from r- and s-blends |
| G2: Consonant Blends: application | c-nateng-2-gb (Y2) / Reading - Words: Consonant Blends | partial | -1 | 1 | Same lesson as above; Twist covers r- and s-blends here |
| G2: Digraphs: ch and sh | c-nateng-r-gb (Reception) / Digraphs - sh, ch, th, ng: Digraphs - sh; Digraphs - ch | exact | -3 | 2 |  |
| G2: Digraphs: ch and sh | c-nateng-1-gb (Y1) / Reading - Phonics Review: Phonics Review - ch, sh, th, ng | partial | -2 | 1 | Review lesson |
| G2: Digraphs: ch and sh | c-nateng-2-gb (Y2) / Reading - Words: Consonant Digraphs and Trigraphs | partial | -1 | 1 | Wider set of consonant digraphs |
| G2: Digraphs: th and wh | c-nateng-r-gb (Reception) / Digraphs - sh, ch, th, ng: Digraphs - th (hard); Digraphs - th (soft) | partial | -3 | 2 | th only |
| G2: Digraphs: th and wh | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - wh // Spelling: Words with 'ph', 'wh' | partial | -2 | 2 | wh only |
| G2: Digraphs: th and wh | c-nateng-2-gb (Y2) / Reading - Words: Consonant Digraphs and Trigraphs | partial | -1 | 1 |  |
| G2: Silent Letters | c-nateng-2-gb (Y2) / Spelling: Words with 'kn', 'gn'; Words Starting with 'wr' | exact | -1 | 2 | kn and wr; no mb lesson |
| G2: Silent Letters | c-nateng-5-gb (Y5) / Spelling: Silent Letters | partial | +2 | 1 | Anton revisits the full silent-letter set at Y5 |
| G2: Silent Letters | c-nateng-6-gb (Y6) / Spelling: Silent Letters | partial | +3 | 1 | Anton revisits at Y6 |
| G2: Sight Words (Set 2) | c-nateng-2-gb (Y2) / Reading - Words: Common Exception Words (1); Common Exception Words (2) // Spelling: Common Exception Words | partial | -1 | 3 | Common exception words are not the same list as Fry words |
| G2: Sight Words (Set 2) | c-nateng-1-gb (Y1) / Reading - Words: Common Exception Words (1); Common Exception Words (2) // Spelling Practice: Spelling Practice (2) - I, she, he, you; Spelling Practice (3) - of, to, in, on; Spelling Practice (6) - go, are, was, do | partial | -2 | 5 | Y1 lessons contain some Set 2 words (he, you, of, are, was) |
| G2: Compound Words | c-nateng-1-gb (Y1) / Spelling: Compound Words | exact | -2 | 1 |  |
| G2: Compound Words | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Compound Nouns | partial | -1 | 1 |  |
| G2: Prefixes | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Prefixes; Prefix: 'un-' // Spelling: Prefix: 'un-' | partial | -2 | 3 | un- only plus a general prefix lesson |
| G2: Prefixes | c-nateng-3-gb (Y3) / Spelling: Prefixes: 'in-', 'un-', 'mis-', 'dis-'; Prefixes: 're-', 'sub-', 'inter-', 'super-', 'anti-', 'auto-'; Prefixes | partial | 0 | 3 | Wider prefix set at the aligned year (re- appears here) |
| G2: Suffixes: -ing and -ed | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-ing', '-ed', '-er' | exact | -2 | 1 |  |
| G2: Suffixes: -ing and -ed | c-nateng-1-gb (Y1) / Reading - Words: Adding Suffixes '-ing', '-ed', '-er' and '-est' | partial | -2 | 1 | Reading side |
| G2: Suffixes: -ing and -ed | c-nateng-2-gb (Y2) / Reading - Words: Common Suffixes (1); Common Suffixes (2) | partial | -1 | 2 | Title only |
| G2: Suffixes: -ing and -ed | c-nateng-3-gb (Y3) / Spelling: Suffixes Beginning with Vowels | partial | 0 | 1 | Doubling and e-dropping before -ing and -ed |
| G2: Suffixes: -er and -est | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-er', '-est' | exact | -2 | 1 |  |
| G2: Suffixes: -er and -est | c-nateng-1-gb (Y1) / Reading - Words: Adding Suffixes '-ing', '-ed', '-er' and '-est' | partial | -2 | 1 | Reading side |
| G2: Suffixes: -er and -est | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Comparative Adjectives | partial | -1 | 1 | Comparison meaning |
| G2: Plural Exceptions | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Plurals (1); Plurals (2) | partial | -1 | 2 | Title only; irregular plurals not confirmed |
| G2: Plural Exceptions | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Plural Nouns | partial | 0 | 1 |  |
| G2: Reading Comprehension (Stories): foundations | c-nateng-2-gb (Y2) / Reading - Texts: Characters; Setting; Events; Story Structure | exact | -1 | 4 |  |
| G2: Reading Comprehension (Stories): foundations | c-nateng-1-gb (Y1) / Reading - Texts: Stories | partial | -2 | 1 |  |
| G2: Reading Comprehension (Stories): application | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Comparing and Contrasting People; Problems and Solutions | partial | 0 | 2 | Compare characters; problem and solution next to cause and effect |
| G2: Reading Comprehension (Stories): application | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Causes and Effects | partial | 0 | 1 | Cause and effect in non-fiction |
| G2: Main Idea | c-nateng-2-gb (Y2) / Reading - Texts: Main Idea | exact | -1 | 1 |  |
| G2: Main Idea | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Main Topic (1); Main Topic (2) | exact | 0 | 2 | Aligned year |
| G2: Supporting Details | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Key Details in Non-Fiction | exact | 0 | 1 |  |
| G2: Supporting Details | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Key Details in Fiction | partial | 0 | 1 |  |
| G2: Paragraph Writing: topic sentences | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Paragraphs | partial | 0 | 1 | Title only; Anton is a text-grammar lesson, Twist teaches topic sentences |
| G2: Paragraph Writing: supporting details | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Paragraphs | partial | 0 | 1 | Title only |
| G2: Descriptive Writing: precise word choice | c-nateng-2-gb (Y2) / Spelling: Shades of Meaning; Synonyms and Antonyms | partial | -1 | 2 | Word-choice precision through shades of meaning |
| G2: Opinion Writing: give reasons and examples | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +2 | 1 | Anton teaches reading evidence and reasons, not writing them |
| G2: Poetry | c-nateng-2-gb (Y2) / Reading - Texts: Poems | partial | -1 | 1 | Reading poems; Twist also writes them |
| G2: Poetry | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Rhyme; Alliteration | partial | 0 | 2 |  |
| G2: Grammar: identify nouns | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Nouns (1); Nouns (2) | exact | -1 | 2 |  |
| G2: Grammar: identify nouns | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Nouns | exact | 0 | 1 | Aligned year |
| G2: Grammar: identify verbs | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | -1 | 1 |  |
| G2: Grammar: identify verbs | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | 0 | 1 | Aligned year |
| G2: Grammar: identify verbs | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Verb: 'to be' | partial | 0 | 1 | Twist covers being verbs as Part 2 |
| G2: Contractions | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Apostrophes and Contractions (1); Apostrophes and Contractions (2) // Spelling: Contractions | exact | -1 | 3 |  |
| G2: Contractions | c-nateng-1-gb (Y1) / Reading - Words: Reading Contractions | partial | -2 | 1 | Reading only |
| G2: Contractions | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Punctuation: Contractions | exact | 0 | 1 | Aligned year |
| G2: Grammar: adjectives | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Adjectives | exact | -1 | 1 |  |
| G2: Grammar: adjectives | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Adjectives (1); Adjectives (2) | exact | 0 | 2 | Aligned year |
| G2: Grammar: adverbs | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Adverbs | exact | -1 | 1 |  |
| G2: Grammar: adverbs | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Adverbs | exact | 0 | 1 | Aligned year |
| G2: Spelling Patterns | c-nateng-1-gb (Y1) / Spelling: Words with Silent 'e' // Reading - Words: Words with Silent 'e' | partial | -2 | 2 | Silent-e pattern only |
| G2: Spelling Patterns | c-nateng-3-gb (Y3) / Spelling: Suffixes Beginning with Vowels | partial | 0 | 1 | Doubling and drop-e before a suffix |
| G3: Multisyllabic Words | c-nateng-1-gb (Y1) / Spelling: Syllables (1); Syllables (2) // Reading - Words: Reading Longer Words (1); Reading Longer Words (2) | partial | -3 | 4 | Syllable counting and reading longer words; Twist teaches syllable splitting patterns |
| G3: Multisyllabic Words | c-nateng-2-gb (Y2) / Reading - Words: Practising Blending Longer Words (1); Practising Blending Longer Words (2) // Spelling: Syllables | partial | -2 | 3 |  |
| G3: Complex Vowel Patterns | c-nateng-2-gb (Y2) / Reading - Words: Alternate Vowel Sounds | partial | -2 | 1 | Title only |
| G3: Complex Vowel Patterns | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - ou; Phonics - oy; Phonics - ir; Phonics - aw; Phonics - ew (1); Phonics - ew (2); Phonics - au | partial | -3 | 7 | Single graphemes (diphthongs, r-controlled, variant vowels), one per lesson |
| G3: Complex Vowel Patterns | c-nateng-r-gb (Reception) / Digraphs - oo, ar, or: all 4 lessons // Digraphs and Trigraphs - ur, ow, oi, ear: all 4 lessons // Digraphs and Trigraphs - er, air, ure: all 3 lessons | partial | -4 | 11 | Single graphemes, one per lesson |
| G3: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Prefixes: 'in-', 'un-', 'mis-', 'dis-' | exact | -1 | 1 | mis- and dis- |
| G3: Advanced Prefixes and Suffixes | c-nateng-2-gb (Y2) / Spelling: Suffixes: 'ment', 'ness'; Suffixes: 'ful', 'less', 'ly' | exact | -2 | 2 | -ment, -ness, -ful, -less |
| G3: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Nouns with Prefixes; Nouns with Suffixes | partial | -1 | 2 |  |
| G3: Advanced Prefixes and Suffixes | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Nouns with Prefixes; Nouns with Suffixes // Spelling: Prefixes; Suffixes | partial | 0 | 4 | Aligned year |
| G3: Root Words (Introduction) | c-nateng-3-gb (Y3) / Spelling: Root Words | exact | -1 | 1 |  |
| G3: Root Words (Introduction) | c-nateng-4-gb (Y4) / Spelling: Root Words | exact | 0 | 1 | Aligned year |
| G3: Root Words (Introduction) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Word Families | partial | -1 | 1 |  |
| G3: Root Words (Introduction) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Word Families | partial | 0 | 1 | Aligned year |
| G3: Spelling Patterns (Advanced) | c-nateng-4-gb (Y4) / Spelling: Words with 'ei', 'eigh', 'ey' | partial | 0 | 1 | ei words |
| G3: Spelling Patterns (Advanced) | c-nateng-5-gb (Y5) / Spelling: Words with '-ei-' and '-ie-' | partial | +1 | 1 | ie versus ei |
| G3: Spelling Patterns (Advanced) | c-nateng-3-gb (Y3) / Spelling: Suffixes Beginning with Vowels | partial | -1 | 1 | Doubling rule |
| G3: Vocabulary Building (Academic) | c-nateng-4-gb (Y4) / Spelling: Context Clues | partial | 0 | 1 | Meaning in context; Twist uses tier-2 academic words |
| G3: Vocabulary Building (Academic) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Word: Synonyms and Antonyms | partial | +1 | 1 | Synonym part |
| G3: Homophones | c-nateng-2-gb (Y2) / Spelling: Homophones | exact | -2 | 1 |  |
| G3: Homophones | c-nateng-3-gb (Y3) / Spelling: Homophones | exact | -1 | 1 |  |
| G3: Homophones | c-nateng-4-gb (Y4) / Spelling: Homophones | exact | 0 | 1 | Aligned year |
| G3: Homophones | c-nateng-5-gb (Y5) / Spelling: Homophones (1); Homophones (2); Homophones (3); Homophones (4) | partial | +1 | 4 | Larger sets |
| G3: Homophones | c-nateng-6-gb (Y6) / Spelling: Homophones (1); Homophones (2); Homophones (3); Homophones (4) | partial | +2 | 4 | Larger sets |
| G3: Reading Comprehension (Complex Texts) | c-nateng-4-gb (Y4) / Reading Comprehension - Non-Fiction: Informational Texts; Main Topic (1); Main Topic (2); Terms and Phrases | partial | 0 | 4 | Key ideas and word meaning in context for non-fiction |
| G3: Reading Comprehension (Complex Texts) | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | 1 | Citing evidence |
| G3: Text Structure and Organization | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Causes and Effects; Series and Steps; Comparing and Contrasting (1); Comparing and Contrasting (2); Comparing and Contrasting (3) | partial | -1 | 5 | Sequence, cause, compare in separate lessons |
| G3: Text Structure and Organization | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Problems and Solutions | partial | -1 | 1 |  |
| G3: Text Structure and Organization | c-nateng-2-gb (Y2) / Reading - Texts: Text Structure | partial | -2 | 1 | Title only |
| G3: Text Structure and Organization | c-nateng-4-gb (Y4) / Reading Comprehension - Non-Fiction: Series and Steps (1); Series and Steps (2) | partial | 0 | 2 | Aligned year |
| G3: Point of View and Perspective | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -1 | 2 |  |
| G3: Point of View and Perspective | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | 0 | 2 | Aligned year |
| G3: Point of View and Perspective | c-nateng-5-gb (Y5) / Reading Comprehension - Fiction: Narrator | partial | +1 | 1 |  |
| G3: Making Inferences | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Interpreting Information; Interpreting Information (2) | partial | +1 | 2 | Closest title; Twist teaches inference from text |
| G3: Compare and Contrast Texts | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) // Reading Comprehension - Non-Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) | exact | 0 | 4 | Aligned year |
| G3: Compare and Contrast Texts | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Comparing and Contrasting People // Reading Comprehension - Non-Fiction: Comparing and Contrasting (3) | partial | -1 | 2 |  |
| G3: Compare and Contrast Texts | c-nateng-2-gb (Y2) / Reading - Texts: Comparing Texts | partial | -2 | 1 |  |
| G3: Multi-Paragraph Writing | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Text: Paragraphs | partial | 0 | 1 | Aligned year; Anton is text grammar |
| G3: Multi-Paragraph Writing | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Paragraphs | partial | -1 | 1 |  |
| G3: Multi-Paragraph Writing | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Text: Paragraph Cohesion; Linking Paragraphs | partial | +1 | 2 |  |
| G3: Informational Writing | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Text: Headings and Subheadings | partial | 0 | 1 | Structure of informational text |
| G3: Informational Writing | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Headings | partial | -1 | 1 |  |
| G3: Opinion Writing (Advanced) | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | 1 | Reading side of reasons and evidence |
| G3: Writing for Different Purposes | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Purpose of a Text | partial | -1 | 1 | Reading side: purpose of a text |
| G3: Complex Sentences | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Sentence: Clauses | exact | 0 | 1 | Aligned year |
| G3: Complex Sentences | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Sentence: Subordinative Conjunctions | exact | -1 | 1 |  |
| G3: Complex Sentences | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Sentence: Subordinative Conjunctions | partial | -2 | 1 |  |
| G3: Complex Sentences | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | partial | 0 | 1 |  |
| G3: Verb Tenses (Advanced) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense (1); Present, Past and Future Tense (2) | partial | -1 | 2 | Anton teaches tense forms; Twist teaches consistency and shifts |
| G3: Verb Tenses (Advanced) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense | partial | 0 | 1 | Aligned year |
| G3: Verb Tenses (Advanced) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Text: Present and Past Tense; Present, Past and Future Tense | partial | -2 | 2 |  |
| G3: Irregular Verbs | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Verb Forms | partial | -1 | 1 | Title only |
| G3: Subject-Verb Agreement | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Standard English | partial | -1 | 1 | Standard English covers agreement; title only |
| G3: Subject-Verb Agreement | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Standard English | partial | 0 | 1 | Aligned year |
| G3: Pronouns and Antecedents | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns | partial | -1 | 1 |  |
| G3: Pronouns and Antecedents | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Pronouns // Vocabulary, Grammar and Punctuation - Text: Nouns and Pronouns | partial | 0 | 2 | Aligned year; Text lesson covers noun-to-pronoun replacement by title |
| G3: Possessives | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Possessive Apostrophes | exact | -2 | 1 |  |
| G3: Possessives | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Punctuation: Possessive Apostrophes | exact | -1 | 1 |  |
| G3: Possessives | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Punctuation: Possessive Apostrophes | exact | 0 | 1 | Aligned year |
| G3: Possessives | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Plural and Possessive 's' | partial | 0 | 1 |  |
| G3: Advanced Punctuation | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Commas in Lists | exact | -2 | 1 | Commas in a series |
| G3: Advanced Punctuation | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | -1 | 2 |  |
| G3: Advanced Punctuation | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | 0 | 2 | Aligned year |
| G3: Advanced Punctuation | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Punctuation: Commas (1); Commas (2); Direct Speech | partial | +1 | 3 |  |
| G3: Media Literacy (Advanced) | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Purpose of a Text | partial | -1 | 1 | Purpose part only; no audience, bias or fact-versus-opinion lesson |
| G4: Greek and Latin Roots | c-nateng-3-gb (Y3) / Spelling: Morphology and Etymology | partial | -2 | 1 | Word origins; title only |
| G4: Greek and Latin Roots | c-nateng-4-gb (Y4) / Spelling: Root Words | partial | -1 | 1 |  |
| G4: Greek and Latin Roots | c-nateng-6-gb (Y6) / Spelling: Word Origins | partial | +1 | 1 |  |
| G4: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Prefixes: 're-', 'sub-', 'inter-', 'super-', 'anti-', 'auto-'; Prefixes: 'in-', 'un-', 'mis-', 'dis-'; Suffix '-ous'; Suffix '-ly' | exact | -2 | 4 | Same affixes (mis-, dis-, sub-, super-, anti-, re-, -ous, -ly) |
| G4: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Suffix: '-ation'; Word Endings -tion -cian and -sion; Suffixes | partial | -2 | 3 | -tion and related endings |
| G4: Advanced Prefixes and Suffixes | c-nateng-4-gb (Y4) / Spelling: Prefixes; Suffixes: '-tion', '-cian', '-sion'; Suffixes | partial | -1 | 3 |  |
| G4: Advanced Prefixes and Suffixes | c-nateng-5-gb (Y5) / Spelling: Prefixes (1); Prefixes (2); Suffixes; Adding Suffixes | partial | 0 | 4 | Aligned year |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-2-gb (Y2) / Spelling: Synonyms and Antonyms; Shades of Meaning | exact | -3 | 2 |  |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-4-gb (Y4) / Spelling: Shades of Meaning | exact | -1 | 1 |  |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Word: Synonyms and Antonyms | exact | 0 | 1 | Aligned year |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Word: Synonyms; Antonyms; Synonyms and Antonyms | exact | +1 | 3 |  |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Word Relations (1); Word Relations (2); Word Relations (3) | partial | +2 | 3 | Title only; gap counted from Y7 |
| G4: Context Clues for Unfamiliar Words | c-nateng-4-gb (Y4) / Spelling: Context Clues | exact | -1 | 1 |  |
| G4: Context Clues for Unfamiliar Words | c-nateng-5-gb (Y5) / Spelling: Words in Context // Reading Comprehension - Non-Fiction: Terms and Phrases (1); Terms and Phrases (2) | partial | 0 | 3 | Aligned year |
| G4: Context Clues for Unfamiliar Words | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Context Clues (1); Context Clues (2) | exact | +2 | 2 | Gap counted from Y7 |
| G4: Theme and Central Message | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Fables (1); Fables (2) | partial | -2 | 2 | Fables carry a moral; no lesson titled theme |
| G4: Theme and Central Message | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Fables, Folktales and Myths (1); Fables, Folktales and Myths (2) | partial | -1 | 2 |  |
| G4: Citing Evidence | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | 0 | 1 | Aligned year; reading-side evidence |
| G4: Citing Evidence | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | 1 |  |
| G4: Summarizing Texts | c-nateng-2-gb (Y2) / Reading - Texts: Summarising Texts | exact | -3 | 1 |  |
| G4: Summarizing Texts | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Main Topic (1); Main Topic (2); Combining Information | partial | 0 | 3 | Aligned year |
| G4: Compare and Contrast Across Texts | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) // Reading Comprehension - Non-Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) | partial | -1 | 4 |  |
| G4: Compare and Contrast Across Texts | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Combining Information | partial | 0 | 1 | Aligned year |
| G4: Compare and Contrast Across Texts | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Combining Information (1); Combining Information (2); Combining Information (3) | partial | +1 | 3 |  |
| G4: Figurative Language | c-nateng-5-gb (Y5) / Spelling: Sayings and Expressions; Figures of Speech | exact | 0 | 2 | Aligned year |
| G4: Figurative Language | c-nateng-6-gb (Y6) / Spelling: Sayings and Expressions | partial | +1 | 1 |  |
| G4: Figurative Language | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Figure of Speech (1); Figure of Speech (2); Figure of Speech (3); Figure of Speech (4) | partial | +2 | 4 | Gap counted from Y7 |
| G4: Nonfiction Text Features | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Text Features | exact | -2 | 1 |  |
| G4: Nonfiction Text Features | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Text: Layout Devices | partial | 0 | 1 | Aligned year |
| G4: Nonfiction Text Features | c-nateng-2-gb (Y2) / Reading - Texts: Book Parts | partial | -3 | 1 |  |
| G4: Nonfiction Text Features | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Image Information | partial | -2 | 1 |  |
| G4: Point of View | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -1 | 2 |  |
| G4: Point of View | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -2 | 2 |  |
| G4: Point of View | c-nateng-5-gb (Y5) / Reading Comprehension - Fiction: Narrator | partial | 0 | 1 | Aligned year |
| G4: Essay Structure (Five-Paragraph) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Text: Paragraph Cohesion; Linking Paragraphs | partial | 0 | 2 | Aligned year; Anton is text grammar |
| G4: Narrative Writing (Developed) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Punctuation: Direct Speech | partial | 0 | 1 | Dialogue punctuation only |
| G4: Informational Writing (Developed) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Text: Headings and Subheadings | partial | -1 | 1 |  |
| G4: Opinion / Persuasive Writing | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | 0 | 1 | Aligned year; reading-side evidence |
| G4: Opinion / Persuasive Writing | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | 1 |  |
| G4: Opinion / Persuasive Writing | c-nateng-7-reading-gb (KS3 (Y7-9)) / Non-Fiction: Claims and Arguments | partial | +2 | 1 | Gap counted from Y7 |
| G4: Revising and Editing | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Punctuation: Punctuation Practice | partial | 0 | 1 | Edit-for-conventions part only |
| G4: Poetry Appreciation and Writing | c-nateng-5-gb (Y5) / Reading Comprehension - Fiction: Reading Poems; Limericks; Haikus | partial | 0 | 3 | Aligned year; reading poems, Twist also composes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Sentence: Coordinative Conjunctions; Subordinative Conjunctions | exact | -3 | 2 |  |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Sentence: Coordinative Conjunctions; Subordinative Conjunctions | exact | -2 | 2 |  |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | exact | -1 | 1 |  |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | exact | 0 | 1 | Aligned year |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | exact | +1 | 1 |  |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Sentence: Conjunctions (1); Conjunctions (2) | partial | +2 | 2 | Gap counted from Y7 |
| G4: Verb Tenses and Consistency | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense; Progressive Form; Perfect Form | partial | 0 | 3 | Aligned year; Anton teaches forms, Twist consistency |
| G4: Verb Tenses and Consistency | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense; Progressive Form; Perfect Form | partial | +1 | 3 |  |
| G4: Verb Tenses and Consistency | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Text: all 2 lessons | partial | +2 | 2 | Gap counted from Y7 |
| G4: Pronouns (Types and Agreement) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Word: Pronouns | exact | 0 | 1 | Aligned year |
| G4: Pronouns (Types and Agreement) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Pronouns | exact | -1 | 1 |  |
| G4: Pronouns (Types and Agreement) | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Word: Pronouns | exact | +1 | 1 |  |
| G4: Pronouns (Types and Agreement) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns; Possessive and Indefinite Pronouns; Reflexive Pronouns | partial | -2 | 3 | Pronoun types, one type per lesson |
| G4: Pronouns (Types and Agreement) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns (1); Personal Pronouns (2); Indefinite Pronouns; Possessive Pronouns | partial | -3 | 4 |  |
| G4: Pronouns (Types and Agreement) | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Word: Pronouns | partial | +2 | 1 | Gap counted from Y7 |
| G4: Advanced Punctuation | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Punctuation: Commas (1); Commas (2); Direct Speech | exact | 0 | 3 | Aligned year; no addresses lesson by title |
| G4: Advanced Punctuation | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | -1 | 2 |  |
| G4: Advanced Punctuation | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | +1 | 2 |  |
| G4: Spelling Patterns and Rules | c-nateng-5-gb (Y5) / Spelling: Adding Suffixes; Unstressed Vowels; Words with '-ough-'; Representing Alternate Sounds (1); Representing Alternate Sounds (2); Silent Letters | partial | 0 | 6 | Aligned year; spelling rules, Twist lesson has no stated word set |

Totals: 232 rows, 480 Twist-Anton lesson pairs (146 exact, 334 partial); 98 of 132 Twist lessons matched; 401 of 736 Anton lessons matched.

## Missing in Twist

Anton lessons with no Twist match, by Anton year. Word-list spelling practice and test-practice topics are summarised with counts. Reception to Year 5 list each unmatched lesson by topic; Year 6 and KS3 (above Twist G4) are summarised by topic with counts and the first titles in each topic.
Many unmatched lessons in Y3 to Y6 repeat a skill that Twist teaches once in an earlier grade, because Anton revisits Nouns, Adjectives, Adverbs, Verbs, Capital Letter Rules and End Punctuation every year while Twist teaches each once (for example Twist G2 Grammar: identify nouns, G1 Capitalization). They are listed here because no Twist lesson sits at that year. Y1 phonics review and single-grapheme lessons are the same case for Twist G1 and G2 phonics.

### Reception (`c-nateng-r-gb`), 6 of 51 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Digraphs - ff, ll, ss, zz, ck | 5 / 5 | Digraphs - ff; Digraphs - ll; Digraphs - ss; Digraphs - zz; Digraphs - ck |
| Digraphs - sh, ch, th, ng | 1 / 5 | Digraphs - ng |

### Y1 (`c-nateng-1-gb`), 48 of 165 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Reading - Phonics | 6 / 22 | Phonics - ie; Phonics - ue (1); Phonics - ue (2); Phonics - ph; Phonics - oe; Phonics - ey |
| Reading - Phonics Review | 12 / 20 | Phonics Review - ff, ll, ss; Phonics Review - ck, zz; Phonics Review - ai, ee, igh; Phonics Review - oa, oo; Phonics Review - ar, or, ur; Phonics Review - ow, oi, er; Phonics Review - ear, air, ure; Phonics Review - ay, ou, ie, ea; Phonics Review - oy, ir, ue; Phonics Review - aw, ew; Phonics Review - wh, ph; Phonics Review - oe, au |
| Reading - Texts | 2 / 6 | Definitions; Fantasy and Reality |
| Vocabulary, Grammar and Punctuation - Word | 3 / 10 | Noun Suffixes; Verb Suffixes; Adjective Suffixes |
| Vocabulary, Grammar and Punctuation - Sentence | 2 / 5 | Question Words; Connectives |
| Spelling | 21 / 32 | Words with 'ff', 'll', 'ss', 'zz', 'ck'; Words with 'nk'; Words with 'tch'; Words Ending with 've'; Words with 'ar'; Words with 'ea'; Words with 'er', 'ir', 'ur'; Words with 'oo', 'ue', 'ew'; Words with 'oo'; Words with 'oe', 'oe', 'ow'; Words with 'ou', 'ow'; Words with 'ie', 'igh'; Words with 'ie'; Words with 'or', 'ore', 'aw', 'au'; Words with 'air', 'ear', 'are'; Words with 'ear'; Words Ending with 'y'; Words with 'k'; Common Exception Words; Days of the Week; Colours |
| Spelling Practice | 2 / 8 | word-list spelling practice |

### Y2 (`c-nateng-2-gb`), 51 of 117 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Reading - Texts | 4 / 18 | Text Types; Word Detectives; Visualising Texts; Analysing Texts |
| Vocabulary, Grammar and Punctuation - Word | 7 / 20 | Adjectives and Adverbs; Possessive Determiners; Articles; Demonstratives; Noun Suffixes; Verb Suffixes; Adjective Suffixes |
| Vocabulary, Grammar and Punctuation - Sentence | 2 / 5 | Prepositions; Noun Phrases |
| Vocabulary, Grammar and Punctuation - Text | 1 / 3 | Progressive Form |
| Vocabulary, Grammar and Punctuation - Punctuation | 1 / 9 | Punctuation Practice |
| Spelling | 5 / 15 | Words with 'dge', 'ge', 'g'; Words with 'c'; Words with 'le', 'el', 'al', 'il'; Suffixes; Suffix: 'tion' |
| Spelling Practice | 11 / 11 | word-list spelling practice |
| KS1 Test Practice - Questions | 10 / 10 | test practice sets |
| KS1 Test Practice - Spelling | 10 / 10 | test practice sets |

### Y3 (`c-nateng-3-gb`), 33 of 91 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Reading Comprehension - Fiction | 4 / 14 | Asking Questions; Describing Pictures; Illustrating Stories; Fairytales |
| Vocabulary, Grammar and Punctuation - Word | 6 / 21 | Group Nouns; Adjectives and Adverbs; Verb: 'to have'; Definite Articles; Indefinite Articles; Determiners |
| Vocabulary, Grammar and Punctuation - Sentence | 4 / 6 | Prepositions; Noun Phrases; Time, Place and Cause; Fronted Adverbials |
| Vocabulary, Grammar and Punctuation - Text | 3 / 7 | Nouns and Pronouns; Progressive Form; Present Perfect Form |
| Vocabulary, Grammar and Punctuation - Punctuation | 3 / 7 | Capital Letter Rules; End Punctuation; Punctuation Practice |
| Spelling | 5 / 17 | Words with 'y'; Words with 'ou'; Word Endings '-sure' and '-ture'; Words with 'ch'; Words with 'sc' |
| Spelling Practice | 8 / 8 | word-list spelling practice |

### Y4 (`c-nateng-4-gb`), 33 of 70 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Reading Comprehension - Fiction | 2 / 8 | Pictures (1); Pictures (2) |
| Reading Comprehension - Non-Fiction | 2 / 10 | Pictures (1); Pictures (2) |
| Vocabulary, Grammar and Punctuation - Word | 8 / 14 | Nouns; Plural Nouns; Adjectives; Adverbs; Adjectives and Adverbs; Verbs; Possession; Determiners |
| Vocabulary, Grammar and Punctuation - Sentence | 4 / 6 | Prepositions; Noun Phrases; Time, Place and Cause; Fronted Adverbials |
| Vocabulary, Grammar and Punctuation - Text | 2 / 6 | Progressive Form; Present Perfect Form |
| Vocabulary, Grammar and Punctuation - Punctuation | 4 / 7 | Capital Letter Rules; End Punctuation; Contractions; Punctuation Practice |
| Spelling | 3 / 11 | Suffixes: '-gue', '-que'; Double Meaning; Abbreviations |
| Spelling Practice | 8 / 8 | word-list spelling practice |

### Y5 (`c-nateng-5-gb`), 48 of 90 lessons unmatched

| Topic | Unmatched / total | Unmatched lessons |
|---|---|---|
| Reading Comprehension - Fiction | 6 / 10 | Reading Dramas; Play: A Treasure Chest Full of Carrots (1); Play: A Treasure Chest Full of Carrots (2); Film: Mission to Planet Blubber; Illustration Information (1); Illustration Information (2) |
| Reading Comprehension - Non-Fiction | 1 / 9 | Reading Non-Fiction Texts |
| Vocabulary, Grammar and Punctuation - Word | 10 / 12 | Nouns; Adjectives; Adverbs; Adjectives and Adverbs; Verbs; Determiners; Standard English; Formal and Informal; Verb Prefixes; Verb Suffixes |
| Vocabulary, Grammar and Punctuation - Sentence | 9 / 10 | Prepositions; Clauses; Relative Clauses (1); Relative Clauses (2); Noun Phrases; Fronted Adverbials; Degrees of Possibility; Passive Voice; Structures of Formal Speech and Writing |
| Vocabulary, Grammar and Punctuation - Text | 1 / 7 | Nouns and Pronouns |
| Vocabulary, Grammar and Punctuation - Punctuation | 8 / 12 | Capital Letter Rules; End Punctuation; Apostrophes; Parenthesis; Colons, Semi-Colons and Dashes; Colons in Lists; Bullet Points; Hyphens |
| Spelling | 5 / 22 | Hyphenating Prefixes; Suffixes: '-cious' and '-tious'; Suffixes: '-tial' and '-cial'; Suffixes: '-ant/-ance/-ancy' and '-ent/-ence/-ency'; Suffixes: '-able/-ably' and '-ible/-ibly' |
| Spelling Practice | 8 / 8 | word-list spelling practice |

### Y6 (`c-nateng-6-gb`), 68 of 89 lessons unmatched

| Topic | Unmatched / total | Titles |
|---|---|---|
| Reading Comprehension - Fiction | 5 / 5 | Story: The Bridge Trolls (1); Story: The Bridge Trolls (2); Story: Jake and Norbert (1); Story: Jake and Norbert (2) ... |
| Reading Comprehension - Non-Fiction | 2 / 6 | Reading Informational Texts (1); Reading Informational Texts (2) |
| Vocabulary, Grammar and Punctuation - Word | 10 / 14 | Nouns; Adjectives; Adverbs; Adjectives and Adverbs ... |
| Vocabulary, Grammar and Punctuation - Sentence | 7 / 8 | Prepositions; Clauses; Noun Phrases; Fronted Adverbials ... |
| Vocabulary, Grammar and Punctuation - Text | 4 / 7 | Nouns and Pronouns; Paragraph Cohesion; Linking Paragraphs; Layout Devices |
| Vocabulary, Grammar and Punctuation - Punctuation | 9 / 11 | Capital Letter Rules; End Punctuation; Apostrophes; Parenthesis ... |
| Spelling | 3 / 10 | Hyphenating Prefixes; Homographs; Words in Context |
| Spelling Practice | 8 / 8 | word-list spelling practice |
| KS2 Test Practice - Questions | 10 / 10 | test practice |
| KS2 Test Practice - Spelling | 10 / 10 | test practice |

### KS3 (Y7-9) (`c-nateng-7-grammar-gb`), 16 of 30 lessons unmatched

| Topic | Unmatched / total | Titles |
|---|---|---|
| Word | 9 / 10 | Nouns (1); Nouns (2); Nouns (3); Verbs (1) ... |
| Sentence | 2 / 4 | Prepositions; Sentences |
| Punctuation | 3 / 3 | Capitalisation; Punctuation (1); Punctuation (2) |
| Vocabulary | 2 / 11 | Decoding Words; Connotations |

### KS3 (Y7-9) (`c-nateng-7-reading-gb`), 2 of 3 lessons unmatched

| Topic | Unmatched / total | Titles |
|---|---|---|
| Non-Fiction | 2 / 3 | Reading Informational Texts (1); Reading Informational Texts (2) |

### KS3 (Y7-9) (`c-nateng-7-writing-gb`), 30 of 30 lessons unmatched

| Topic | Unmatched / total | Titles |
|---|---|---|
| Spelling | 30 / 30 | word-list spelling practice |

## Missing in Anton

Twist lessons with no Anton match. Anton English-GB has no lesson on these skills by title, so they may still be taught inside a lesson with a different name (the catalogue shows titles only).

### Grade 1: 9 of 32 lessons unmatched

| Twist lesson | Section | Why no match |
|---|---|---|
| Beginning Sounds | Phonics and Word Recognition | Anton phonics lessons teach letter to sound; no lesson on hearing the first sound of a word |
| Ending Sounds | Phonics and Word Recognition | Same: no lesson on hearing the last sound of a word |
| Reading Comprehension: simple inference | Reading Comprehension | No inference lesson before Y5 (Interpreting Information) |
| Reading Fluency: accuracy and smooth reading | Reading Comprehension | Anton has no reading-aloud or fluency lessons |
| Reading Fluency: expression and phrasing | Reading Comprehension | Anton has no reading-aloud or fluency lessons |
| Writing Process: brainstorm ideas | Writing | Anton English-GB has no composition lessons; KS3 Writing is spelling only |
| Writing Process: plan and organize | Writing | Same: no composition lessons |
| Everyday Vocabulary: using words in sentences | Language and Grammar | No lesson on using taught vocabulary in sentences |
| Communication Skills | Speaking and Listening | Anton English-GB has no speaking and listening lessons |

### Grade 2: 12 of 41 lessons unmatched

| Twist lesson | Section | Why no match |
|---|---|---|
| Reading Fluency | Reading Comprehension | No Anton lesson on this skill by title |
| Paragraph Writing: closing sentences | Writing | No closing-sentence lesson; Paragraphs is text grammar |
| Personal Narrative: planning and sequence | Writing | No composition lessons |
| Personal Narrative: details and feelings | Writing | No composition lessons |
| Descriptive Writing: sensory details | Writing | No composition lessons |
| Opinion Writing: state an opinion | Writing | No opinion-versus-fact or opinion-stating lesson |
| Research Skills | Communication and Media | No research lessons |
| Presentation Skills | Communication and Media | No speaking lessons |
| Media Literacy | Communication and Media | No media lessons |
| Digital Literacy | Communication and Media | No digital-safety lessons |
| Language Arts Integration: reading to write | Communication and Media | No integration lessons |
| Language Arts Integration: speaking about texts | Communication and Media | No speaking lessons |

### Grade 3: 7 of 31 lessons unmatched

| Twist lesson | Section | Why no match |
|---|---|---|
| Reading Fluency (Complex) | Reading Comprehension | No fluency lessons |
| Narrative Writing (Advanced) | Writing | No composition lessons |
| Writing Process (Complete) | Writing | No composition lessons |
| Research Writing (Introduction) | Writing | No research or composition lessons |
| Creative Writing (Stories) | Writing | No composition lessons |
| Presentation Skills (Advanced) | Communication and Media | No speaking lessons |
| Language Arts Integration (Projects) | Communication and Media | No project lessons |

### Grade 4: 6 of 28 lessons unmatched

| Twist lesson | Section | Why no match |
|---|---|---|
| Research Writing | Writing | No research or composition lessons |
| Subjects and Predicates | Language and Grammar | No subject and predicate lesson in any Anton year |
| Presentation Skills | Communication and Media | No speaking lessons |
| Research Skills (Digital and Print) | Communication and Media | No research lessons |
| Media Literacy | Communication and Media | No media lessons; fact-versus-opinion has no Anton lesson by title |
| Digital Citizenship | Communication and Media | No digital-safety lessons |

## Misplaced

Matched pairs whose Anton year differs from the Twist aligned year. Negative gap: Anton teaches it earlier (at a younger age). Positive gap: Twist teaches it earlier. The last column notes where Anton also teaches the lesson at the aligned year, in which case the Twist placement is supported.

| Twist lesson | Anton lesson (course id, year, topic, title) | Match | Gap | Taught earlier by | Also taught at aligned year in Anton |
|---|---|---|---|---|---|
| G1: Letter Recognition (A-Z) | c-nateng-1-gb (Y1) / Alphabet: 35 lessons (Aa ... YZ) | partial | -1 | Anton | no |
| G1: Letter Recognition (A-Z) | c-nateng-1-gb (Y1) / Alphabet: Small and Capital Letters; Alphabetical Order | partial | -1 | Anton | no |
| G1: Letter Sounds (A-Z) | c-nateng-r-gb (Reception) / Phonics - s, a, t, p: all 4 lessons // Phonics - i, n, m, d: all 4 lessons // Phonics - g, o, c, k: all 4 lessons // Phonics - e, u, r: all 3 lessons // Phonics - h, b, f, l: all 4 lessons // Phonics - j, v, w, x: all 4 lessons // Phonics - y, z, qu: all 3 lessons | exact | -2 | Anton | no |
| G1: Letter Sounds (A-Z) | c-nateng-1-gb (Y1) / Reading - Phonics Review: Phonics Review - s, a, t, p; Phonics Review - i, m, n, d; Phonics Review - g, o, k; Phonics Review - c, e, u, r; Phonics Review - h, b, f, l; Phonics Review - j, v, w, x; Phonics Review - z, y, qu | partial | -1 | Anton | no |
| G1: Rhyming Words | c-nateng-1-gb (Y1) / Reading - Texts: Rhyming Words (1); Rhyming Words (2) | exact | -1 | Anton | no |
| G1: CVC Words | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a'; Short Words with 'e'; Short Words with 'i'; Short Words with 'o'; Short Words with 'u'; Short Words Practice | exact | -1 | Anton | yes |
| G1: Sight Words (Set 1): read and recognize | c-nateng-1-gb (Y1) / Reading - Words: Common Short Words (1); Common Short Words (2); Common Short Words (3); Common Short Words (4); Common Short Words Practice | exact | -1 | Anton | no |
| G1: Sight Words (Set 1): read and recognize | c-nateng-1-gb (Y1) / Spelling Practice: Spelling Practice (1) - the, a, am, is; Spelling Practice (2) - I, she, he, you; Spelling Practice (3) - of, to, in, on; Spelling Practice (4) - my, it, as, we; Spelling Practice (5) - up, by, and, how | partial | -1 | Anton | no |
| G1: Sight Words (Set 1): use in sentences | c-nateng-1-gb (Y1) / Reading - Words: Common Short Words Practice | partial | -1 | Anton | no |
| G1: Short Vowel Sounds | c-nateng-r-gb (Reception) / Phonics - s, a, t, p: Phonics - a // Phonics - i, n, m, d: Phonics - i // Phonics - g, o, c, k: Phonics - o // Phonics - e, u, r: Phonics - e; Phonics - u | partial | -2 | Anton | no |
| G1: Word Families: -at and -an | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a' | partial | -1 | Anton | no |
| G1: Word Families: -ap and mixed review | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'a' | partial | -1 | Anton | no |
| G1: Short e Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'e' | partial | -1 | Anton | no |
| G1: Short i Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'i' | partial | -1 | Anton | no |
| G1: Short o Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'o' | partial | -1 | Anton | no |
| G1: Short u Word Families | c-nateng-1-gb (Y1) / Reading - Words: Short Words with 'u' | partial | -1 | Anton | no |
| G1: Reading Comprehension: answer literal questions | c-nateng-1-gb (Y1) / Reading - Texts: Stories | partial | -1 | Anton | yes |
| G1: Reading Comprehension: answer literal questions | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Key Details in Fiction | partial | +1 | Twist | yes |
| G1: Reading Comprehension: retell key events | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Text: Sequencing Sentences | partial | -1 | Anton | yes |
| G1: Reading Comprehension: retell key events | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Ordering Stories and Events | partial | +1 | Twist | yes |
| G1: Writing Sentences: complete ideas | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Sentence: Words and Sentences | partial | -1 | Anton | no |
| G1: Writing Sentences: capitals and spacing | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Words and Spaces | partial | -1 | Anton | yes |
| G1: Writing Sentences: capitals and spacing | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letters | partial | -1 | Anton | yes |
| G1: Writing Sentences: ending punctuation | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Sentence Punctuation | exact | -1 | Anton | yes |
| G1: Writing Sentences: ending punctuation | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Sentence: Types of Sentences (1); Types of Sentences (2) | partial | -1 | Anton | yes |
| G1: Capitalization | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital Letter Rules | exact | -1 | Anton | yes |
| G1: Capitalization | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Punctuation: Capital I | partial | -1 | Anton | yes |
| G1: Everyday Vocabulary: naming and sorting words | c-nateng-1-gb (Y1) / Reading - Texts: Categories | exact | -1 | Anton | no |
| G1: Everyday Vocabulary: naming and sorting words | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Nouns | partial | -1 | Anton | no |
| G1: Plural Nouns | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Plural Nouns; Plurals with '-s' and '-es' | exact | -1 | Anton | yes |
| G1: Plural Nouns | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-s', '-es' // Reading - Words: Adding Suffixes '-s' and '-es' | partial | -1 | Anton | yes |
| G1: Action Words (Verbs) | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | -1 | Anton | yes |
| G1: Describing Words (Adjectives) | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Adjectives | exact | -1 | Anton | yes |
| G2: Long Vowel Sounds | c-nateng-2-gb (Y2) / Reading - Words: Long Vowel Sounds | exact | -1 | Anton | no |
| G2: Long Vowel Sounds | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: all 4 lessons | partial | -3 | Anton | no |
| G2: Long Vowel Sounds | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - a-e; Phonics - e-e; Phonics - i-e; Phonics - o-e; Phonics - u-e (1); Phonics - u-e (2) | partial | -2 | Anton | no |
| G2: Vowel Teams: ai and ee | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: Digraphs - ai; Digraphs - ee | partial | -3 | Anton | no |
| G2: Vowel Teams: ai and ee | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - ay; Phonics - ea // Spelling: Words with 'ai', 'oi', 'ay', 'oy'; Words with 'ee', 'ea' | partial | -2 | Anton | no |
| G2: Vowel Teams: ai and ee | c-nateng-2-gb (Y2) / Reading - Words: Vowel Digraphs | partial | -1 | Anton | no |
| G2: Vowel Teams: oa and ui | c-nateng-r-gb (Reception) / Digraphs and Trigraphs - ai, ee, oa, igh: Digraphs - oa | partial | -3 | Anton | no |
| G2: Vowel Teams: oa and ui | c-nateng-2-gb (Y2) / Reading - Words: Vowel Digraphs | partial | -1 | Anton | no |
| G2: Consonant Blends: foundations | c-nateng-2-gb (Y2) / Reading - Words: Consonant Blends | partial | -1 | Anton | no |
| G2: Consonant Blends: application | c-nateng-2-gb (Y2) / Reading - Words: Consonant Blends | partial | -1 | Anton | no |
| G2: Digraphs: ch and sh | c-nateng-r-gb (Reception) / Digraphs - sh, ch, th, ng: Digraphs - sh; Digraphs - ch | exact | -3 | Anton | no |
| G2: Digraphs: ch and sh | c-nateng-1-gb (Y1) / Reading - Phonics Review: Phonics Review - ch, sh, th, ng | partial | -2 | Anton | no |
| G2: Digraphs: ch and sh | c-nateng-2-gb (Y2) / Reading - Words: Consonant Digraphs and Trigraphs | partial | -1 | Anton | no |
| G2: Digraphs: th and wh | c-nateng-r-gb (Reception) / Digraphs - sh, ch, th, ng: Digraphs - th (hard); Digraphs - th (soft) | partial | -3 | Anton | no |
| G2: Digraphs: th and wh | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - wh // Spelling: Words with 'ph', 'wh' | partial | -2 | Anton | no |
| G2: Digraphs: th and wh | c-nateng-2-gb (Y2) / Reading - Words: Consonant Digraphs and Trigraphs | partial | -1 | Anton | no |
| G2: Silent Letters | c-nateng-2-gb (Y2) / Spelling: Words with 'kn', 'gn'; Words Starting with 'wr' | exact | -1 | Anton | no |
| G2: Silent Letters | c-nateng-5-gb (Y5) / Spelling: Silent Letters | partial | +2 | Twist | no |
| G2: Silent Letters | c-nateng-6-gb (Y6) / Spelling: Silent Letters | partial | +3 | Twist | no |
| G2: Sight Words (Set 2) | c-nateng-2-gb (Y2) / Reading - Words: Common Exception Words (1); Common Exception Words (2) // Spelling: Common Exception Words | partial | -1 | Anton | no |
| G2: Sight Words (Set 2) | c-nateng-1-gb (Y1) / Reading - Words: Common Exception Words (1); Common Exception Words (2) // Spelling Practice: Spelling Practice (2) - I, she, he, you; Spelling Practice (3) - of, to, in, on; Spelling Practice (6) - go, are, was, do | partial | -2 | Anton | no |
| G2: Compound Words | c-nateng-1-gb (Y1) / Spelling: Compound Words | exact | -2 | Anton | no |
| G2: Compound Words | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Compound Nouns | partial | -1 | Anton | no |
| G2: Prefixes | c-nateng-1-gb (Y1) / Vocabulary, Grammar and Punctuation - Word: Prefixes; Prefix: 'un-' // Spelling: Prefix: 'un-' | partial | -2 | Anton | yes |
| G2: Suffixes: -ing and -ed | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-ing', '-ed', '-er' | exact | -2 | Anton | yes |
| G2: Suffixes: -ing and -ed | c-nateng-1-gb (Y1) / Reading - Words: Adding Suffixes '-ing', '-ed', '-er' and '-est' | partial | -2 | Anton | yes |
| G2: Suffixes: -ing and -ed | c-nateng-2-gb (Y2) / Reading - Words: Common Suffixes (1); Common Suffixes (2) | partial | -1 | Anton | yes |
| G2: Suffixes: -er and -est | c-nateng-1-gb (Y1) / Spelling: Suffixes: '-er', '-est' | exact | -2 | Anton | no |
| G2: Suffixes: -er and -est | c-nateng-1-gb (Y1) / Reading - Words: Adding Suffixes '-ing', '-ed', '-er' and '-est' | partial | -2 | Anton | no |
| G2: Suffixes: -er and -est | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Comparative Adjectives | partial | -1 | Anton | no |
| G2: Plural Exceptions | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Plurals (1); Plurals (2) | partial | -1 | Anton | yes |
| G2: Reading Comprehension (Stories): foundations | c-nateng-2-gb (Y2) / Reading - Texts: Characters; Setting; Events; Story Structure | exact | -1 | Anton | no |
| G2: Reading Comprehension (Stories): foundations | c-nateng-1-gb (Y1) / Reading - Texts: Stories | partial | -2 | Anton | no |
| G2: Main Idea | c-nateng-2-gb (Y2) / Reading - Texts: Main Idea | exact | -1 | Anton | yes |
| G2: Descriptive Writing: precise word choice | c-nateng-2-gb (Y2) / Spelling: Shades of Meaning; Synonyms and Antonyms | partial | -1 | Anton | no |
| G2: Opinion Writing: give reasons and examples | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +2 | Twist | no |
| G2: Poetry | c-nateng-2-gb (Y2) / Reading - Texts: Poems | partial | -1 | Anton | yes |
| G2: Grammar: identify nouns | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Nouns (1); Nouns (2) | exact | -1 | Anton | yes |
| G2: Grammar: identify verbs | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Verbs | exact | -1 | Anton | yes |
| G2: Contractions | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Apostrophes and Contractions (1); Apostrophes and Contractions (2) // Spelling: Contractions | exact | -1 | Anton | yes |
| G2: Contractions | c-nateng-1-gb (Y1) / Reading - Words: Reading Contractions | partial | -2 | Anton | yes |
| G2: Grammar: adjectives | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Adjectives | exact | -1 | Anton | yes |
| G2: Grammar: adverbs | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Adverbs | exact | -1 | Anton | yes |
| G2: Spelling Patterns | c-nateng-1-gb (Y1) / Spelling: Words with Silent 'e' // Reading - Words: Words with Silent 'e' | partial | -2 | Anton | yes |
| G3: Multisyllabic Words | c-nateng-1-gb (Y1) / Spelling: Syllables (1); Syllables (2) // Reading - Words: Reading Longer Words (1); Reading Longer Words (2) | partial | -3 | Anton | no |
| G3: Multisyllabic Words | c-nateng-2-gb (Y2) / Reading - Words: Practising Blending Longer Words (1); Practising Blending Longer Words (2) // Spelling: Syllables | partial | -2 | Anton | no |
| G3: Complex Vowel Patterns | c-nateng-2-gb (Y2) / Reading - Words: Alternate Vowel Sounds | partial | -2 | Anton | no |
| G3: Complex Vowel Patterns | c-nateng-1-gb (Y1) / Reading - Phonics: Phonics - ou; Phonics - oy; Phonics - ir; Phonics - aw; Phonics - ew (1); Phonics - ew (2); Phonics - au | partial | -3 | Anton | no |
| G3: Complex Vowel Patterns | c-nateng-r-gb (Reception) / Digraphs - oo, ar, or: all 4 lessons // Digraphs and Trigraphs - ur, ow, oi, ear: all 4 lessons // Digraphs and Trigraphs - er, air, ure: all 3 lessons | partial | -4 | Anton | no |
| G3: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Prefixes: 'in-', 'un-', 'mis-', 'dis-' | exact | -1 | Anton | yes |
| G3: Advanced Prefixes and Suffixes | c-nateng-2-gb (Y2) / Spelling: Suffixes: 'ment', 'ness'; Suffixes: 'ful', 'less', 'ly' | exact | -2 | Anton | yes |
| G3: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Nouns with Prefixes; Nouns with Suffixes | partial | -1 | Anton | yes |
| G3: Root Words (Introduction) | c-nateng-3-gb (Y3) / Spelling: Root Words | exact | -1 | Anton | yes |
| G3: Root Words (Introduction) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Word Families | partial | -1 | Anton | yes |
| G3: Spelling Patterns (Advanced) | c-nateng-5-gb (Y5) / Spelling: Words with '-ei-' and '-ie-' | partial | +1 | Twist | yes |
| G3: Spelling Patterns (Advanced) | c-nateng-3-gb (Y3) / Spelling: Suffixes Beginning with Vowels | partial | -1 | Anton | yes |
| G3: Vocabulary Building (Academic) | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Word: Synonyms and Antonyms | partial | +1 | Twist | yes |
| G3: Homophones | c-nateng-2-gb (Y2) / Spelling: Homophones | exact | -2 | Anton | yes |
| G3: Homophones | c-nateng-3-gb (Y3) / Spelling: Homophones | exact | -1 | Anton | yes |
| G3: Homophones | c-nateng-5-gb (Y5) / Spelling: Homophones (1); Homophones (2); Homophones (3); Homophones (4) | partial | +1 | Twist | yes |
| G3: Homophones | c-nateng-6-gb (Y6) / Spelling: Homophones (1); Homophones (2); Homophones (3); Homophones (4) | partial | +2 | Twist | yes |
| G3: Reading Comprehension (Complex Texts) | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | Twist | yes |
| G3: Text Structure and Organization | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Causes and Effects; Series and Steps; Comparing and Contrasting (1); Comparing and Contrasting (2); Comparing and Contrasting (3) | partial | -1 | Anton | yes |
| G3: Text Structure and Organization | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Problems and Solutions | partial | -1 | Anton | yes |
| G3: Text Structure and Organization | c-nateng-2-gb (Y2) / Reading - Texts: Text Structure | partial | -2 | Anton | yes |
| G3: Point of View and Perspective | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -1 | Anton | yes |
| G3: Point of View and Perspective | c-nateng-5-gb (Y5) / Reading Comprehension - Fiction: Narrator | partial | +1 | Twist | yes |
| G3: Making Inferences | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Interpreting Information; Interpreting Information (2) | partial | +1 | Twist | no |
| G3: Compare and Contrast Texts | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Comparing and Contrasting People // Reading Comprehension - Non-Fiction: Comparing and Contrasting (3) | partial | -1 | Anton | yes |
| G3: Compare and Contrast Texts | c-nateng-2-gb (Y2) / Reading - Texts: Comparing Texts | partial | -2 | Anton | yes |
| G3: Multi-Paragraph Writing | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Paragraphs | partial | -1 | Anton | yes |
| G3: Multi-Paragraph Writing | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Text: Paragraph Cohesion; Linking Paragraphs | partial | +1 | Twist | yes |
| G3: Informational Writing | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Headings | partial | -1 | Anton | yes |
| G3: Opinion Writing (Advanced) | c-nateng-5-gb (Y5) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | Twist | no |
| G3: Writing for Different Purposes | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Purpose of a Text | partial | -1 | Anton | no |
| G3: Complex Sentences | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Sentence: Subordinative Conjunctions | exact | -1 | Anton | yes |
| G3: Complex Sentences | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Sentence: Subordinative Conjunctions | partial | -2 | Anton | yes |
| G3: Verb Tenses (Advanced) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense (1); Present, Past and Future Tense (2) | partial | -1 | Anton | yes |
| G3: Verb Tenses (Advanced) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Text: Present and Past Tense; Present, Past and Future Tense | partial | -2 | Anton | yes |
| G3: Irregular Verbs | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Verb Forms | partial | -1 | Anton | no |
| G3: Subject-Verb Agreement | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Standard English | partial | -1 | Anton | yes |
| G3: Pronouns and Antecedents | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns | partial | -1 | Anton | yes |
| G3: Possessives | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Possessive Apostrophes | exact | -2 | Anton | yes |
| G3: Possessives | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Punctuation: Possessive Apostrophes | exact | -1 | Anton | yes |
| G3: Advanced Punctuation | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Punctuation: Commas in Lists | exact | -2 | Anton | yes |
| G3: Advanced Punctuation | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | -1 | Anton | yes |
| G3: Advanced Punctuation | c-nateng-5-gb (Y5) / Vocabulary, Grammar and Punctuation - Punctuation: Commas (1); Commas (2); Direct Speech | partial | +1 | Twist | yes |
| G3: Media Literacy (Advanced) | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Purpose of a Text | partial | -1 | Anton | no |
| G4: Greek and Latin Roots | c-nateng-3-gb (Y3) / Spelling: Morphology and Etymology | partial | -2 | Anton | no |
| G4: Greek and Latin Roots | c-nateng-4-gb (Y4) / Spelling: Root Words | partial | -1 | Anton | no |
| G4: Greek and Latin Roots | c-nateng-6-gb (Y6) / Spelling: Word Origins | partial | +1 | Twist | no |
| G4: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Prefixes: 're-', 'sub-', 'inter-', 'super-', 'anti-', 'auto-'; Prefixes: 'in-', 'un-', 'mis-', 'dis-'; Suffix '-ous'; Suffix '-ly' | exact | -2 | Anton | yes |
| G4: Advanced Prefixes and Suffixes | c-nateng-3-gb (Y3) / Spelling: Suffix: '-ation'; Word Endings -tion -cian and -sion; Suffixes | partial | -2 | Anton | yes |
| G4: Advanced Prefixes and Suffixes | c-nateng-4-gb (Y4) / Spelling: Prefixes; Suffixes: '-tion', '-cian', '-sion'; Suffixes | partial | -1 | Anton | yes |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-2-gb (Y2) / Spelling: Synonyms and Antonyms; Shades of Meaning | exact | -3 | Anton | yes |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-4-gb (Y4) / Spelling: Shades of Meaning | exact | -1 | Anton | yes |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Word: Synonyms; Antonyms; Synonyms and Antonyms | exact | +1 | Twist | yes |
| G4: Synonyms, Antonyms, and Shades of Meaning | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Word Relations (1); Word Relations (2); Word Relations (3) | partial | +2 | Twist | yes |
| G4: Context Clues for Unfamiliar Words | c-nateng-4-gb (Y4) / Spelling: Context Clues | exact | -1 | Anton | yes |
| G4: Context Clues for Unfamiliar Words | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Context Clues (1); Context Clues (2) | exact | +2 | Twist | yes |
| G4: Theme and Central Message | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Fables (1); Fables (2) | partial | -2 | Anton | no |
| G4: Theme and Central Message | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Fables, Folktales and Myths (1); Fables, Folktales and Myths (2) | partial | -1 | Anton | no |
| G4: Citing Evidence | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | Twist | yes |
| G4: Summarizing Texts | c-nateng-2-gb (Y2) / Reading - Texts: Summarising Texts | exact | -3 | Anton | yes |
| G4: Compare and Contrast Across Texts | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) // Reading Comprehension - Non-Fiction: Comparing and Contrasting (1); Comparing and Contrasting (2) | partial | -1 | Anton | yes |
| G4: Compare and Contrast Across Texts | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Combining Information (1); Combining Information (2); Combining Information (3) | partial | +1 | Twist | yes |
| G4: Figurative Language | c-nateng-6-gb (Y6) / Spelling: Sayings and Expressions | partial | +1 | Twist | yes |
| G4: Figurative Language | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Vocabulary: Figure of Speech (1); Figure of Speech (2); Figure of Speech (3); Figure of Speech (4) | partial | +2 | Twist | yes |
| G4: Nonfiction Text Features | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Text Features | exact | -2 | Anton | yes |
| G4: Nonfiction Text Features | c-nateng-2-gb (Y2) / Reading - Texts: Book Parts | partial | -3 | Anton | yes |
| G4: Nonfiction Text Features | c-nateng-3-gb (Y3) / Reading Comprehension - Non-Fiction: Image Information | partial | -2 | Anton | yes |
| G4: Point of View | c-nateng-4-gb (Y4) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -1 | Anton | yes |
| G4: Point of View | c-nateng-3-gb (Y3) / Reading Comprehension - Fiction: Point of View (1); Point of View (2) | exact | -2 | Anton | yes |
| G4: Informational Writing (Developed) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Text: Headings and Subheadings | partial | -1 | Anton | no |
| G4: Opinion / Persuasive Writing | c-nateng-6-gb (Y6) / Reading Comprehension - Non-Fiction: Evidence and Reason | partial | +1 | Twist | yes |
| G4: Opinion / Persuasive Writing | c-nateng-7-reading-gb (KS3 (Y7-9)) / Non-Fiction: Claims and Arguments | partial | +2 | Twist | yes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Sentence: Coordinative Conjunctions; Subordinative Conjunctions | exact | -3 | Anton | yes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Sentence: Coordinative Conjunctions; Subordinative Conjunctions | exact | -2 | Anton | yes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | exact | -1 | Anton | yes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Sentence: Conjunctions | exact | +1 | Twist | yes |
| G4: Conjunctions (Coordinating and Subordinating) | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Sentence: Conjunctions (1); Conjunctions (2) | partial | +2 | Twist | yes |
| G4: Verb Tenses and Consistency | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Text: Present, Past and Future Tense; Progressive Form; Perfect Form | partial | +1 | Twist | yes |
| G4: Verb Tenses and Consistency | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Text: all 2 lessons | partial | +2 | Twist | yes |
| G4: Pronouns (Types and Agreement) | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Word: Pronouns | exact | -1 | Anton | yes |
| G4: Pronouns (Types and Agreement) | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Word: Pronouns | exact | +1 | Twist | yes |
| G4: Pronouns (Types and Agreement) | c-nateng-3-gb (Y3) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns; Possessive and Indefinite Pronouns; Reflexive Pronouns | partial | -2 | Anton | yes |
| G4: Pronouns (Types and Agreement) | c-nateng-2-gb (Y2) / Vocabulary, Grammar and Punctuation - Word: Personal Pronouns (1); Personal Pronouns (2); Indefinite Pronouns; Possessive Pronouns | partial | -3 | Anton | yes |
| G4: Pronouns (Types and Agreement) | c-nateng-7-grammar-gb (KS3 (Y7-9)) / Word: Pronouns | partial | +2 | Twist | yes |
| G4: Advanced Punctuation | c-nateng-4-gb (Y4) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | -1 | Anton | yes |
| G4: Advanced Punctuation | c-nateng-6-gb (Y6) / Vocabulary, Grammar and Punctuation - Punctuation: Commas; Direct Speech | exact | +1 | Twist | yes |

Rows: 163 (364 pairs): 307 pairs where Anton teaches earlier, 57 pairs where Twist teaches earlier.

## Summary

- Matched: 480 Twist-Anton lesson pairs in 232 table rows (146 exact, 334 partial). 98 of 132 Twist lessons (en LOI G1-G4) have at least one Anton match, and 401 of 736 Anton lessons are matched. Only about 30 percent of pairs are exact, because Anton lessons are narrower (one grapheme, one word class) than Twist lessons.
- Missing in Twist: 335 Anton lessons have no Twist match: 219 in Reception to Y5, 68 in Y6 and 48 in KS3. Of the Reception to Y5 count, 57 are word-list Spelling Practice lessons and KS1 test-practice sets (Y1 to Y5) that Twist has no counterpart for.
- Biggest content gaps in Twist: sentence-level grammar (prepositions, noun phrases, fronted adverbials, relative clauses, passive voice, degrees of possibility, formal speech), perfect and progressive verb forms as their own lessons, determiners and articles, and punctuation beyond commas, direct speech and apostrophes (parenthesis, colons, semi-colons, dashes, hyphens, bullet points). Anton also has Y5 drama, film and play reading and Y3 to Y5 picture-reading lessons that Twist lacks.
- Missing in Anton: 34 Twist lessons have no Anton match (G1 9, G2 12, G3 7, G4 6). They fall into these groups: composition writing (narrative, personal narrative, descriptive, creative, process, research writing), speaking and presentation, media and digital literacy, reading fluency, Subjects and Predicates, and Twist G1 Beginning Sounds and Ending Sounds. Anton English-GB has no composition lessons (KS3 Writing is 30 spelling-practice lessons), so Twist has about 25 writing and communication lessons with no Anton counterpart.
- Misplaced: 163 rows (364 pairs) have a non-zero grade gap. In 307 pairs Anton teaches the skill earlier, in 57 pairs Twist teaches it earlier. Of the pairs, 112 are exact matches.
- Largest gaps where Anton is earlier: Twist G2 vowel teams, digraphs and long vowels (Anton Reception, gap -3), Twist G3 Multisyllabic Words and Complex Vowel Patterns (Anton Reception and Y1, gap -3 to -4), Twist G4 Synonyms, Antonyms and Shades of Meaning, Summarizing Texts and Conjunctions (Anton Y2, gap -3). Twist G1 phonics matches Reception and Y1 in Anton (gap -1 to -2).
- Largest gaps where Twist is earlier: Twist G2 Silent Letters (Anton revisits at Y5, +2, and Y6, +3), Twist G2 Opinion Writing reasons (Anton Y5 evidence and reason, +2), and Twist G3 and G4 reading and word-study lessons where Anton's only match is a Y5 or Y6 lesson (+1) or KS3 (+2). These are mostly partial matches.
- Many misplaced pairs are not real misplacements: for 60 Twist lessons Anton also teaches the same skill at the aligned year, so the pair is a spiral repeat. 38 matched Twist lessons have no aligned Anton pair at all, and these are the ones to review (mostly G2 phonics and G3 word study).
- Caveat: the Anton catalogue lists titles and exercise counts only. Grammar and punctuation titles that repeat across years (Nouns, Verbs, Commas) are matched on title, so depth differences between years are not visible here.

