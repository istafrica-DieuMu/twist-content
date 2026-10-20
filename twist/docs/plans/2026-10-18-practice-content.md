# Practice content: authoring queue

Queued 2026-10-18 after the pilot on the times tables (commit 3eef54499).
Covers G12 to G14 in PLAN.md: a check pool in every lesson set, and drill
banks for the skills to know by heart. The format is in
lesson-anatomy.md, "Check pools"; drill banks in practice.md.

Progress is read from the lessons and shown in views/tracking.md,
"Practice content", one row per batch. Nothing here is ticked by hand.

## Size

| Work | Count | New tasks |
|---|---|---|
| Skill checks from 5 to 20 (4 to 20 at ages 4 to 5) | 912 sets | about 13,700 |
| Quick checks from 3 to 6 | 968 checks | about 2,900 |
| Drill banks | 24 new, 30 in all | about 1,500 items |

## Brief for each lesson set

Give the authoring agent this list, the "Authoring checks" in
lesson-anatomy.md and one pilot set of the same subject as the model
(`lessons/de-DE/klasse-2/math/table-7.yaml` or
`lessons/en-GB/year-4/math/table-7.yaml` for maths).

1. **Parts.** Add `metadata.parts`: 2 to 5 parts of the skill, taken from
   its "I can" line and what the lessons teach, each with `what` in de and
   en. A part is something the check must show, not a task type.
2. **Skill check.** Add `draw: 5` (`draw: 4` at ages 4 to 5) and a `part`
   on every task. Keep the existing tasks and their ids; write new ones on
   from the last id (`l2-c6` ...) to 20 in all, at least 3 a part, spread
   evenly.
3. **Quick checks.** Add `draw: 3` and 3 new tasks to each, on what that
   lesson taught.
4. **Every rule of a check holds**: no hints, only the first try counts,
   no `speak` in a skill check, no task copied from Practise or a Warm-up,
   no task twice in a pool. A no-reading set keeps options the child can
   hear.
5. **Mix the task types** the lessons use, and keep the difficulty of the
   no-help stage. A pool is not 20 of one type.
6. **Pictures and components.** Use objects already in the asset bank and
   components already in the set; a new object needs a picture
   (assets/tools/pictures.py) and goes in the batch's notes.
7. **Language.** German written and spoken as a native teacher would;
   British English for en-GB. Foreign-language sets keep instructions in
   the home language as their lessons do.
8. **On screen, not only in say.** A check is marked, so a story, its
   numbers and the question stand in `text` too. A `say` never carries a
   strategy ("Tausch die Zahlen, wenn es hilft"); that is a hint. Fix an
   existing check task of the set that breaks this.
9. **Quote a part's `what`** when it holds a comma, `<` or `>`.
10. **Every task stands alone.** Practice sessions draw Practise and
    Warm-up tasks one at a time, so point 8 holds for them too: fix any
    task of the set whose story, numbers or question is only in `say`. A
    story task's picture shows the whole story: `groups: [8, 5]` for "8, and
    5 more", `gone: 2` for "2 fly away" (docs/task-types.md); never one
    picture for a count. Decided 2026-10-19.
    A check rarely reuses a worked example from the set's Learn screens
    (the same sum or the same picture). One such task in a check is fine;
    the build warns from the second. Decided 2026-10-19, eased 2026-10-20.
    In Reception, Year 1 and Klasse 1, numbers on screen are digits, each
    spoken when tapped, never number words. Decided 2026-10-19.
11. **Options stay in the year's range.** No subtraction option below
    zero and no number above the year's range in Reception to Year 2 and
    Klasse 1 and 2, unless `metadata.misconceptions` names that mistake
    (the build warns).
12. **Tables, plans, pictograms and grids are drawn**: the table, grid,
    bar-chart (with `pictogram_object` for a pictogram) or cubes
    component, never lines of text or ■□ rows in `text` (the build warns
    in maths).
13. **A method in a check** (in `text` or `say`) only when the part's
    `what` names that method; otherwise the check asks the question alone.
14. **Every verb of the "I can" line** has a part, or the set's summary
    says that Practise covers it (drawing, writing).
15. **Near repeats**: a pool task that only swaps a noun or the numbers of
    a Practise, Warm-up or other pool task, with the same options and
    answer, is a repeat.
16. **Write every task with Edit**, one at a time; mechanical edits (the
    `draw:` lines, the parts block) may use a one-line replace.
17. **Done** when `node twist/build.mjs` shows no warnings for the set.

## Formats for reading, phonics, spelling and foreign languages

Decided 2026-10-20 from the Phase 1 pilots. The pilots are the models:
`lessons/de-DE/klasse-2/lit-de/find-information.yaml` (reading a text),
`lessons/de-DE/klasse-2/lit-de/lengthen-dt.yaml` (spelling),
`lessons/en-GB/year-1/lit-en/split-digraphs.yaml` (phonics, Years 1 and 2),
`lessons/en-GB/reception/lit-en/blend-cvc.yaml` (Reception reading) and
`lessons/de-DE/lernjahr-1/fl/en-food.yaml` (foreign languages).

**Reading a text**
- Parts follow what the child looks for (who, where, when; how many,
  what, with what; in the text or not), across the whole reading strand.
- New short texts written for Twist, in the form and length of the set's
  own (3 to 6 lines at Klasse 1 and 2, Years 1 and 2). One text serves at
  most 2 tasks of a pool, and those two never give away each other's
  answer.
- Every task shows its text in full in `text`, the same lines every
  time. A `highlight_in_text` card holds the whole text.
- In a quick check every task has its own text, so a draw of 3 never
  brings three questions on one text.
- A true statement is reworded a little from the text, so the child has
  to understand it, not match its words.
- The draw stays 5 (4 at ages 4 to 5); the short texts keep it quick.

**Phonics**
- Parts by grapheme or sound family, at most 5 (4 at ages 4 to 5); a
  mixed part for tasks across the graphemes is fine. Sets with more
  graphemes group them by sound family.
- Check words use only graphemes taught by that point in the curriculum
  order, as the set's lessons use them. Longer words only when the set
  teaches them.
- A reading check reads; writing a grapheme for a sound (encoding) stays
  in the spelling skills. Use a choice of written words under a picture
  instead.
- Picture options in a reading check set `option_audio: false`, so a
  child cannot tap round to hear the names.
- On screen a sound is written as the grapheme the child knows; where a
  sound is meant on its own, play the bank sound (`audio: { sound: ... }`).
- Spoken instructions come before the sound ("Listen. Which word is it?").
- True and false roughly even, at least a third of each.
- Only pictures in the asset bank; list missing CVC pictures under new
  objects and they are drawn between batches.

**Spelling (Deutsch)**
- A dictation task shows a bank picture or the sentence with a gap; no
  bare "Schreib das Wort." in a check.
- The answer is the bare word with exact capitals, the article heard but
  not typed. A noun typed in lower case is wrong.
- A check names the strategy ("Verlängere") only when the part's `what`
  names it (point 13); otherwise it asks only "d oder t?".
- Parts as in lengthen-dt: by word kind, plus choosing the helper word
  and the word in a sentence.
- A check does not use the Learn demonstration words; Practise words in a
  new task are fine. Every word is in a child's active vocabulary for the
  year, and every helper-word task has a real doubt (Rad, not Licht).

**Foreign languages**
- Checks use the set's own words; a word from an earlier skill only
  where the set's lessons use it too.
- Every first-person line carries `speaker`, Practise and Warm-up too.
- Any type the subject uses in that year may appear in a check.
- Reading single words is fine where Practise already shows them in
  writing; otherwise the task listens.
- Yes or no about what the child heard is a `true_false` with Ja/Nein
  (Yes/No) buttons, not German sentences to read.
- The question ("Wie sagst du auf Englisch?") stands in `text`
  everywhere (point 10).
- A task that only swaps one word in a Practise sentence frame is a near
  repeat (point 15); use another frame or a spare card.

**Reviews.** The reviewer agents read as native teachers; no separate
human read is planned before launch (decided 2026-10-20).

## Reviewer checklist

A second agent reads every new task of a batch and fixes it in place:

- The answer is right and a choice task has one right option; work every
  sum, count, clock, tally and drawn figure against its data.
- Native wording, with `say` matching `text` and numbers in words.
- The parts fit the "I can" line and each task tests its part.
- The year fits, and nothing appears that the Learn screens never taught
  unless it is everyday knowledge.
- No hints (also none in `say`), no copies of Practise or Warm-up, no near
  repeats in a pool, true/false mixed, a mix of types, timed tasks quick.
- The data is on screen (point 8 above).
- Report per set what changed, and what a human should decide.

## Phases

Run as a workflow, one batch at a time: authors in parallel (about 15
sets each), then reviewers in parallel, then a clean build, narration in
the check voices and a commit. From 2026-10-20 the run goes straight on
with no stop for a read: de-DE first, then en-GB, and each curriculum's
narration starts in a background shell as soon as its batches finish.

| Phase | What | Batches |
|---|---|---|
| 0 | Before scaling: money read as words in German narration, the brief and reviewer checklist from batch 1 | done 2026-10-18 |
| 1 | Pilots for the formats not yet tried: a Deutsch spelling set, an English phonics set, a Reception set (ages 4 to 5, draw 4), a foreign-language set | 4 sets |
| 2 | Maths (the English check voice was heard and approved on 2026-10-20) | 2 to 11 |
| 3 | Maths drill banks | 10 banks |
| 4 | Home languages, read in full by the reviewer agents as native teachers | 12 to 22 |
| 5 | Literacy drill banks, word lists checked against their sources | 10 banks |
| 6 | Foreign languages: the drill item format first, then the batches and banks | 23 to 29, 4 banks |
| 7 | Close: 918 of 918 in tracking, a final pass in reviews.yaml, the handoff page | |

## Batches

In this order: maths first (most practice and every drill bank), then the
home languages, then the foreign languages. A batch is one row of the
tracking table; an agent takes about 15 sets at a time.

| # | Batch | Sets |
|---|---|---|
| 1 | de-DE math klasse-1 | 41 (done 2026-10-18) |
| 2 | de-DE math klasse-2 | 63 (3 done) |
| 3 | de-DE math klasse-3 | 51 |
| 4 | de-DE math klasse-4 | 48 |
| 5 | en-GB math reception | 14 |
| 6 | en-GB math year-1 | 29 |
| 7 | en-GB math year-2 | 51 (1 done) |
| 8 | en-GB math year-3 | 52 (1 done) |
| 9 | en-GB math year-4 | 39 (1 done) |
| 10 | en-GB math year-5 | 48 |
| 11 | en-GB math year-6 | 26 |
| 12 | de-DE lit-de klasse-1 | 51 |
| 13 | de-DE lit-de klasse-2 | 46 |
| 14 | de-DE lit-de klasse-3 | 42 |
| 15 | de-DE lit-de klasse-4 | 35 |
| 16 | en-GB lit-en reception | 32 |
| 17 | en-GB lit-en year-1 | 32 |
| 18 | en-GB lit-en year-2 | 29 |
| 19 | en-GB lit-en year-3 | 20 |
| 20 | en-GB lit-en year-4 | 16 |
| 21 | en-GB lit-en year-5 | 17 |
| 22 | en-GB lit-en year-6 | 17 |
| 23 | de-DE fl stufe-0 | 14 |
| 24 | de-DE fl lernjahr-1 | 28 |
| 25 | de-DE fl lernjahr-2 | 16 |
| 26 | en-GB fl ly-1 | 14 |
| 27 | en-GB fl ly-2 | 28 |
| 28 | en-GB fl ly-3 | 11 |
| 29 | en-GB fl ly-4 | 8 |

**After each batch:**
- A second agent reviews it against the same brief: answers, one right
  option, native language, parts that fit the skill, no copies.
- Narrate the new lines in the check voices (`narration.py --voice
  gemini-puck` and `--voice gemini-puck-en`), then rebuild the player.
- Add the pass to reviews.yaml.
- Commit the batch.

## Drill banks

One hand-written bank per skill (practice.md, Drill banks). Done: 5 and
10, 3 6 9, 7, facts to 20, Year 1 exception words, Sight words easy.

| Subject | Skill | Items |
|---|---|---|
| Maths | `math.add-sub-to-20.add-to-10` | the additions to 10 |
| Maths | `math.add-sub-to-20.sub-to-10` | the subtractions to 10 |
| Maths | `math.add-sub-to-100.complement` | pairs to 100 in tens and fives |
| Maths | `math.numbers-to-100.double-halve` | doubles to 50 and halves to 100 |
| Maths | `math.mult-div.core-facts` | ×1, ×2, ×5, ×10 |
| Maths | `math.mult-div.table-2-4-8` | 2, 4 and 8, with division |
| Maths | `math.mult-div.all-tables` | every fact to 10 × 10, mixed |
| Maths | `math.mult-div.div-facts` | every division fact to 100 ÷ 10 |
| Maths | `math.mult-div.squares` | the squares to 10 × 10 |
| Maths | `math.mult-div.table-11-12` | 11 and 12, to 12 × 12 |
| English | `lit-en.word-reading.first-tricky-words` | Reception tricky words, flash |
| English | `lit-en.word-reading.exception-words-y2` | Year 2 words, flash |
| English | `lit-en.spelling.exception-words-y2` | Year 2 words with sentences, say |
| English | `lit-en.word-reading.exception-words-ks2` | KS2 words, flash |
| English | `lit-en.spelling.word-list-3-4` | the Year 3 and 4 statutory words, say |
| English | `lit-en.spelling.word-list-5-6` | the Year 5 and 6 statutory words, say |
| Deutsch | `lit-de.fluency.function-words` | häufige kleine Wörter, flash |
| Deutsch | `lit-de.fluency.sight-words-longer` | längere Blitzwörter, flash |
| Deutsch | `lit-de.spelling.core-vocabulary` | Grundwortschatz with sentences, say |
| Deutsch | `lit-de.letters.sound-chart` | letter and Anlaut, flash |
| Foreign language | `fl.themes.numbers-to-10` | number words, needs a new item format |
| Foreign language | `fl.themes.numbers-to-20` | number words, needs a new item format |
| Foreign language | `fl.themes.numbers-to-100` | number words, needs a new item format |
| Foreign language | `fl.themes.colours` | colour words, needs a new item format |

The foreign-language banks need an item that pairs a word in the new
language with a picture or the home-language word. Decide that format
before writing them; drills-check.mjs then checks it.

## Open before starting

- The converter (handoff page) reads `metadata.parts`, `draw` and `part`;
  the pilot sets show the format.
- Narration of about 16,600 new lines in the check voices.
- The foreign-language drill item format.

## Later: more volume

Decided 2026-10-19: the first version keeps skill checks at 20, quick checks
at 6 and the Practise stages as they are. More volume comes after launch,
where children's data shows it is needed. The two options weighed, as of
225 of 918 sets done:

| Option | New tasks | Narration | Notes |
|---|---|---|---|
| Skill checks 20 to 30 | about 9,200 (10 x 918 sets) | about 9,000 clips | A draw of 5 already gives 4 fully different attempts at 20; little gain |
| Quick checks 6 to 9 | about 2,900 (3 x 974) | about 3,000 clips | Seen once per lesson and not counted; little gain |
| Double all Practise stages | about 29,500 (15.6 per lesson x 1,892 lessons) | about 75,000 clips (hints and feedback) | Practice draws mostly on the no-help stage; full and some help serve lessons |
| **Preferred: a practice bank** of 10 no-help tasks per skill, for practice and recaps only | about 9,200 | about 9,000 clips | No hints or feedback; raises each skill's no-help and check tasks from about 32 to 42 |

Before adding volume:

- **Measure first.** The backend records `seen` per task; report, by skill,
  when children start meeting tasks they have already done, and add tasks
  only there.
- **Protect check freshness in the rules:** practice takes check tasks only
  after a skill's no-help tasks run out (a change in practice-rules.mjs with
  a test), and records `lastCheck`.
- **Drill banks** (above) are the cheap way to give long repetition for
  facts and words to know by heart.

