# Task types and interactions

The one place that says what each task type is, how the child works it,
and every interaction it supports. A task type is the record's `type`; an
interaction is one way of using that type (matching can pair a colour with
an object that has it, a word with its picture, a sum with its result).

Rules:

- Lessons in every curriculum use the same types. en-GB lessons are
  named "en-GB <lesson>" where an interaction is England's own.
- Write the type or interaction here before the first lesson uses it.
  The build rejects a task type that has no section in this file.
- Each interaction names a lesson that uses it, so there is always a
  working example to copy.
- Field names follow the Twist app's schemas
  (schoolido-learning/schemas/question-types), with bank ids (`object`,
  `drawn`, `sound`) in place of image and audio URLs. Where a record field
  differs from the Twist field, the section says so; a converter maps it.
- Hints follow the Practise stage: 3 in the full stage (strategy, think
  aloud, direct cue), 1 in the some stage, none in the none stage or a
  Check. Tracing never takes hints.
- Options can be heard (a speaker on each) unless hearing them gives the
  answer away: see Option audio at the end.

Shared fields on every task: `id`, `type`, `text` (what the screen shows),
`say` (what the voice says, if different; `{ de, en }` in foreign-language
lessons), `show` (a picture or drawn component), `hints`, `feedback`
(per wrong option), `difficulty` (easy, core, stretch; core if left out).

`show` can be two pictures side by side: `show: { objects: [house, mouse] }`
(for "Reimt sich das?"); each picture says its word when tapped.

`show` can carry `flash: 2`: the picture is shown for that many seconds
and then covered, so the child has to see the amount at a glance instead
of counting. A "Nochmal sehen" button shows it again for the same time;
in a Check it is not there.

Drawn components used by tasks are listed in assets/drawn.yaml. The ones
for amounts:

| Component | Data | Looks like |
|---|---|---|
| `dots` | `count`, `layout: dice / five-structure / row / scattered`, `colour_split: [3, 2]` | dice pips (1 to 6; 7 to 10 as two dice), rows of five (Kraft der 5), a row, or scattered dots |
| `dots` with `groups` | `groups: [4, 3]`, `layout: row / dice` | two amounts to compare: in rows, one under the other and lined up (red over blue, so pairs show); as dice, side by side |
| `ten-frame` | `filled`, `colour_split: [5, 2]` | a 2 by 5 frame with counters |
| `zwanzigerfeld` | `filled: [8, 5]`, `move` | two ten-frames |
| `number-house` | `roof`, `rows: [[3, null]]` | a roof number over pairs of cells, `null` is a gap |
| `hundred-field` | `filled`, `colour_split` | the Hunderterfeld: 10 by 10 dots with gaps after five each way |
| `hundred-square` | `highlight: [..]`, `hide: [..]` | 1 to 100 in rows of ten; hidden cells show ? |
| `base-ten` | `hundreds`, `tens`, `ones` | hundred flats (10 by 10, two to a column), tens rods and ones cubes; more than ten loose cubes start a new pair of columns |
| `place-value-chart` | `columns: [tens, ones]` (or with `hundreds`, `thousands`, `ten-thousands`, `hundred-thousands`, `millions` in front), `values: [4, null]` | Stellentafel; HT ZT T H Z E in German, HTh TTh Th H T O in English; six columns shrink to fit; null is a gap |
| `part-whole` | `whole`, `parts: [2, null]` | England's part-whole model: the whole in a circle above two part circles, `null` is a gap |

## Types in use

| Type | What the child does | Player | First used |
|---|---|---|---|
| `multiple_choice` | taps one of 2 to 4 text options | yes | add-bridge-10 |
| `image_multiple_choice` | taps one of 2 to 4 pictures | yes | letters-l-o-a-m |
| `audio_choice` | hears a sound or word, taps the matching option | yes | letters-l-o-a-m |
| `true_false` | taps Ja or Nein | yes | add-bridge-10 |
| `fill_in_blank` | fills each gap from option chips | yes | add-bridge-10 |
| `text_input` | types a number on a keypad | yes | add-bridge-10 |
| `tap_to_count` | taps each picture once, then taps how many | yes | count-to-5 |
| `drag_and_drop_count` | moves counters until a frame is full | yes | add-bridge-10 |
| `point_on_line` | taps a point on a number line | yes | add-bridge-10 |
| `highlight_in_text` | taps every card that has a letter | yes | letters-l-o-a-m |
| `tracing` | traces or copies a letter with a finger | yes (any ink counts) | letters-l-o-a-m |
| `speak` | says a word aloud | yes (no listening yet) | en-colours |
| `matching` | links each left item with its right item | yes | en-colours |
| `sorting` | puts each item into its bin | yes | en-colours |
| `ordering` | puts cards into slots in the right order | yes | order-to-10 |

Twist types not used yet: `clock_hands_drag`, `drag_and_drop`,
`multi_select`, `pick_side`. Each gets a section here when a
lesson first needs it.

## `multiple_choice`

The child taps one text option. Right: green and a praise phrase. Wrong:
red, that option's feedback if there is any, then the hint for the stage.

Fields: `options` (strings), `answer` (one of them), `feedback` keyed by
wrong option.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Sum with a drawn model | "7 + 5 = _" over a Zwanzigerfeld, options 10, 12, 13 | add-bridge-10 |
| How many | "Wie viele Bälle sind es?" over `{ object: ball, count: 3 }`, options 1, 2, 3 | count-to-5 |
| Which jump first | "Welcher Sprung kommt zuerst?" over an empty Rechenstrich, options 1, 3, 4 | add-bridge-10 |
| Which sum fits the story | "Welche Aufgabe passt? Tom hat 7 Sticker ...", options 7 + 6, 7 − 6, 6 + 6 | add-bridge-10 |
| How many, at a glance | "Wie viele Punkte?" over `{ drawn: dots, count: 4, layout: dice, flash: 2 }` | subitize-to-10 |
| Which numeral for this amount | four dots shown, options 3, 4, 5, with `option_audio: false` (hearing "vier" on the option would give the answer) | write-numerals-to-10 |
| Before or after | "Welche Zahl kommt nach 6?", options 5, 7, 8 | order-to-10 |
| Which statement is true | "Welches stimmt?" options 3 < 5, 5 < 3, 3 = 5 | compare-to-10 |
| Missing part | "7 = 3 + _" over a split ten-frame, options 3, 4, 5 | partition-to-10 |
| Missing part or whole (England) | "The whole is five. One part is four. What is the other part?" over `{ drawn: part-whole, whole: 5, parts: [4, null] }` | en-GB partition-to-10 |
| How many more to make ten | over a ten frame with 7, options 2, 3, 4 | en-GB partition-to-10 |
| One more, one less | "Here are three apples. One more apple comes. How many now?" | en-GB order-to-10 |
| Which is more, said aloud | "Which is more, three or seven?", options 3, 7 (they say themselves) | en-GB compare-to-10 |
| How many tens and ones | over `{ drawn: base-ten, tens: 3, ones: 4 }`, options 7, 34, 43 | bundle-tens |
| Estimate at a glance | "Wie viele sind es ungefähr?" over `{ drawn: hundred-field, filled: 30, flash: 2 }`, options etwa 10, etwa 30, etwa 90 | bundle-tens |
| Read a place-value chart | over `{ drawn: place-value-chart, columns: [tens, ones], values: [2, 6] }`, options 26, 62, 8 | place-value-to-100 |
| Hear a number, find its digits | the voice says "Sechsunddreißig", options 36, 63, 30 with `option_audio: false` | read-write-to-100 |
| Read a number word | the screen says "dreiundvierzig", options 34, 43, 40 with `option_audio: false` | read-write-to-100 |
| Read the hundred field | over `{ drawn: hundred-field, filled: 45 }`, options 45, 54, 40 | hundred-field |
| Hidden number on the hundred square | over `{ drawn: hundred-square, highlight: [46], hide: [56] }`, "unter 46", options 47, 56, 66 | hundred-square |
| A move on the hundred square | "Start 14, 2 Zeilen nach unten", options 16, 24, 34 | hundred-square |
| Where the arrow points | over `{ drawn: number-line, from: 30, to: 40, labels: ends, mark: 32 }`, options 32, 23, 38 | number-line-to-100 |
| The rule of a sequence | "31, 41, 51, 61", options +1, +10, −10 with `option_audio: false` | sequences-to-100 |
| Which number does not fit | "10, 20, 30, 45, 50", options 20, 45, 50 | sequences-to-100 |
| Number riddle | "Größer als 30. Kleiner als 40. Die Einerziffer ist 8.", options 38, 48, 83 | number-puzzles-to-100 |
| Build a compound from two pictures | "Apfel und Baum. Welches Wort entsteht?" over `{ objects: [apple, tree] }`, options Apfelbaum, Baumapfel, Apfelhaus | compound-nouns |
| What a compound means | "Was ist ein Baumhaus?", options ein Haus, ein Baum | compound-nouns |
| Article of a compound | "der, die oder das? Baumhaus" over the two pictures; the last word decides | compound-nouns |
| Make a noun with an ending | "hoffen → ?", options die Hoffnung, die hoffnung, die Hoffheit | noun-endings |
| Which word is (not) a noun | "Welches Wort ist ein Nomen?" mutig, Mut, mutiger; the article test | abstract-nouns |
| Which sentence is written correctly | three spellings of one sentence, `option_audio: false` | abstract-nouns |
| Ask the case question | "Wen oder was? \"Die Katze fängt eine Maus.\"" with the question in `say`, options the noun groups | noun-cases |
| Which case is it in | "In welchem Fall steht \"dem Kind\"?", options Nominativ, Dativ, Akkusativ | noun-cases |
| What is the digit worth? | "Wie viel ist die 4 in 247 wert?", options 4, 40, 400 | place-value-to-1000 |
| Round to tens or hundreds | "Runde 471 auf Hunderter." over a number line with the arrow at 471, options 400, 500, 470 | round-to-1000 |
| Which clue makes the riddle unique | options are clue sentences; one names the missing digit | number-puzzles-to-1000 |

Twist: `options` become objects with `label`; `answer` becomes the
correct option's id.

## `image_multiple_choice`

As multiple_choice, but the options are pictures from the bank or drawn
components.

Fields: `options` (list of `{ object }`, `{ object, colour }`,
`{ object, count, layout }` or `{ drawn, ... }`), `answer`: the object id,
the colour for colour versions, or the count for groups of counted things.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Picture that starts with a sound | "Was fängt mit L an?" lamp, sun, fish; answer `lamp` | letters-l-o-a-m |
| Read a word, find its picture | `show: { drawn: syllable-arcs, word: Oma }`, options grandma, mum, llama | letters-l-o-a-m |
| Group with a given number | "Wo sind 2 Bananen?" three banana groups of 1, 2 and 3; answer `"2"` | count-to-5 |
| Which has more, fewer | "Wo sind mehr?" two groups; answer is the count of the one with more | compare-to-10 |
| Dot pattern with a given number | "Wo sind 6 Punkte?" three dot patterns; answer `"6"` | subitize-to-10 |
| What rhymes with this? | "Was reimt sich auf Haus?" over `{ object: house }`, options mouse, ball, tree | rhymes |
| Odd one out | "Welches Wort reimt sich nicht?" options dog, mouth, cat; answer cat | rhymes |
| How many sounds? | over `{ object: fish }`, options dot rows of 2, 3 and 4; f ... i ... sh is three sounds | en-GB oral-blending |
| How many syllables (claps)? | over `{ object: banana }`, options three dot rows of 1, 2 and 3 claps; answer `"3"` | syllables |
| Word with n syllables | "Welches Wort hat 3 Silben?" options pictures; each says its word | syllables |
| Same first sound | "Was fängt so an wie Sonne?" over `{ object: sun }`, options sock, fish, ball | initial-sound |
| Hear an instruction, find the action (English) | hears "Stand up!", taps the child standing up of three action pictures | classroom-phrases |
| Hear a word, find the picture (English) | hears "Mouse.", taps the mouse; the words sound like German ones (Maus, mouse) | familiar-words |
| Read a word, find its picture (English) | `show: { drawn: letter-card, text: "cloud" }`, options cloud, clown, clock (same first sounds, so only reading works) | en-GB new-graphemes |
| Read a word at a glance | as above, with `flash: 2` on the letter card, so the word must be read whole | en-GB automatic-decoding |
| Read a sentence, find what it is about | text "The bird is in the tree.", options bird, bread, bee | en-GB automatic-decoding |
| Blocks or chart for a number | "Wo sind 36?" options three `base-ten` pictures; or "Welche Stellentafel zeigt 53?" three `place-value-chart` pictures | bundle-tens, place-value-to-100 |
| Hundred field for a number | "Wo sind 50?" three `hundred-field` pictures | hundred-field |

A drawn component as an option is keyed like a group: by its `count`
(dots), `filled` (ten-frame, hundred-field), tens × 10 + ones (base-ten)
or its digits read as a number (place-value-chart, `[5, 3]` is 53).
Drawn options never speak.

## `audio_choice`

The child hears something (a big speaker plays it again) and taps the
option that matches. The sound is the question, so options never get
their own audio.

Fields: `audio` (`{ sound: de.l }` from the bank, or `{ en: "Red." }`),
`options` (strings, pictures or swatches), `answer`.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Sound to letter | hears `de.l`, taps L among L, M, S | letters-l-o-a-m |
| Syllable to syllable | hears `de.mo`, taps Mo among Ma, Mo | letters-l-o-a-m |
| English word to colour | hears "Red.", taps the red swatch | en-colours |
| English word to picture | hears "Green.", taps the frog | en-colours |
| English word to coloured object | hears "Blue.", taps the blue car of three | en-colours |
| Number word to numeral | hears "Sieben." (`audio: { de: "Sieben." }`), taps 7 among 1, 7, 9 | write-numerals-to-10 |
| Blend sounds into a word | hears "c ... a ... t." (pure sounds, never letter names), taps the cat of cat, car, cup | en-GB oral-blending |
| A heard word's first or last sound | hears "Bus.", taps the picture that starts with the same sound (ball) | en-GB oral-blending |
| Hear a tricky word, choose its spelling | hears "Heart.", options hart, heart, haert; the sound-alike spelling is always there | en-GB exception-words-ks2 |
| What a conversation is about | hears "I'm hungry. Can I have an apple, please?", taps "um Essen" of three German options | en-short-dialogues |
| A detail from a conversation | hears "Is your bag green? No, it's yellow.", taps "gelb"; the wrong word comes first so the child listens to the end | en-short-dialogues |
| What someone can or likes to do | hears "I can swim, but I can't dance.", taps the swimming picture | en-hobbies |

## `true_false`

The child taps Ja or Nein. The question sits in `say` so the voice can
ask it naturally ("Zähl die Fische. Sind das drei Fische?").

Fields: `answer` (true or false).

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Do you hear this sound at the start? | "Hörst du am Anfang ein L?" with a ladder | letters-l-o-a-m |
| Is this the right number? | "Sind das 3 Fische?" over `{ object: fish, count: 3 }` | count-to-5 |
| The same amount? | "Sind es rote und blaue Punkte gleich viele?" over `{ drawn: dots, groups: [4, 3], layout: row }` | compare-to-10 |
| Is this comparison true? | "Stimmt das? 6 > 3", the voice reads "sechs ist größer als drei" | compare-to-10 |
| Do these rhyme? | "Reimt sich das?" over `{ objects: [house, mouse] }`; the voice says "Haus, Maus" | rhymes |
| Same first sound? | "Fangen sie gleich an?" over `{ objects: [sun, sock] }` | initial-sound |
| Does this split work? | "Stimmt das? 8 + 5 = 8 + 1 + 4" | add-bridge-10 |
| Is this the numeral? | a card shows 6, the voice asks "Ist das die Neun?"; the screen says only "Stimmt das?", so the answer cannot be read off the screen | write-numerals-to-10 |
| Is this chart right? | "Tim hört dreiundsiebzig und schreibt: drei, sieben" over a chart showing 3, 7 | read-write-to-100 |
| Is the estimate good? | "Tom schätzt: etwa siebzig" over a hundred field with 68 | bundle-tens |
| Does the answer fit every clue? | "Stimmt 75? Größer als 70. Ungerade. Die Einerziffer ist 3." | number-puzzles-to-100 |
| Is the riddle unique? | "Ist das Rätsel eindeutig? Meine Zahl ist gerade und liegt zwischen 200 und 300." | number-puzzles-to-1000 |

## `fill_in_blank`

A frame with gaps (`_`); the child taps option chips to fill the gaps in
order and taps Prüfen. Tapping a filled gap empties it. A chip can fill more
than one gap (H: 3, Z: 3, E: 8 needs one 3 chip).

Fields: `frame`, `options`, `answer` (a list, one per gap).

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Split a number to make ten | "8 + 6 = 8 + _ + _", answer 2, 4 | add-bridge-10 |
| Missing letter in a word | "_ama" with a llama, options L, M, O | letters-l-o-a-m |
| Neighbours of a number | "_ , 5, _" options 3, 4, 6, 7, answer 4, 6 | order-to-10 |
| Sign between two numbers | "6 _ 4" options <, >, =, answer >, `option_audio: false` (hearing "größer als" would give it away); with two dice above it in the full stage | compare-to-10 |
| A number that makes it true | "_ > 6" options 4, 6, 8, answer 8 | compare-to-10 |
| Split of a number | "6 = _ + _" with a split dot picture, answer 4, 2 | partition-to-10 |
| Number house | `show: { drawn: number-house, roof: 7, rows: [[3, null]] }`, frame "3 + _ = 7" | partition-to-10 |
| Tens and ones of an amount | over base-ten blocks, frame "_ Zehner und _ Einer" or "Z: _  E: _" | bundle-tens, place-value-to-100 |
| Missing to 100 | over a hundred field with 70, frame "70 + _ = 100" | hundred-field |
| Neighbouring tens | "Nachbarzehner: _ , 27, _" options 20, 26, 28, 30 | order-compare-to-100 |
| Continue a sequence | "42, 44, 46, _ , _" | sequences-to-100 |
| Double by tens and ones | "Das Doppelte von 32", frame "60 + _ = _" | double-halve-to-100 |
| Split into place values | "Zerlege 683.", frame "683 = _ + _ + _" | place-value-to-1000 |
| Round two ways | "Runde 738.", frame "auf Zehner: _   auf Hunderter: _" | round-to-1000 |
| Join or split a compound | "Hand + Schuh = _" (options include HandSchuh for the one-capital rule); "Schneemann = _ + _" | compound-nouns |
| Noun ending | "die Ehrlich_", options heit, keit, ung | noun-endings |
| Missing grapheme | over a bird picture, frame "b_rd", options ir, ou, ay | en-GB new-graphemes |
| Article in a case | "Ich gebe _ Katze _ Futter.", options der, die, das, dem | noun-cases |

## `text_input`

The child types a number on an on-screen keypad and taps Prüfen. Used
when choosing from options would make the task too easy.

Fields: `answer` (a string).

Interactions: the result of a sum ("9 + 7 = _"); the answer to a story
problem (add-bridge-10). Hear a number and write it ("Einundfünfzig.
Schreib die Zahl."); read a number word and write it; the end of a
hundred-square move; double or halve; solve a riddle (Zahlen bis 100
lessons).

## `tap_to_count`

Pictures of one object; the child taps each once (it gets its number, so
none is counted twice), then taps how many there are.

Fields: `show: { object, count, layout: row | scattered }`, `options`,
`answer`. The build checks that the answer is the number shown.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Count things in a row | 4 balloons in a row, options 3, 4, 5 | count-to-5 |
| Count scattered things | 8 eggs scattered, options 7, 8, 9 | count-to-10 |

Scattered things sit on a loose grid (one cell each, small offsets), so
they never overlap and can always be counted.

## `drag_and_drop_count`

A Zwanzigerfeld; the child taps counters in the second row to move them
up until the first row is full, then taps Prüfen.

Fields: `show: { drawn: zwanzigerfeld, filled: [7, 5] }`, `total_items`
(counters that can move), `answer` (how many to move).

Interactions: fill up to ten (add-bridge-10).

## `point_on_line`

A number line; the child taps a tick and taps Prüfen. The marker shows
where they tapped, never the number.

Fields: `show: { drawn: number-line, from, to, labels, jumps, step }`,
`answer` (a number). `step` (1, 5, 10, 100, 1000 or 100000; 1 if left out) sets which ticks
are drawn and can be tapped, so a line from 0 to 100 or 1000 has ticks a child's
finger can hit. The answer must sit on a tick.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Where a sum lands, with or without jump arcs | 0 to 20, "8 + 5" | add-bridge-10 |
| Find a ten on a long line | 0 to 100, `step: 10`, labels ends, "Wo ist 60?" | number-line-to-100 |
| Find a number on a section | 40 to 60, labels tens, "Wo ist 47?" | number-line-to-100 |

A number line can also be a picture to read: `show` with `mark: 35`
draws the marker at 35, and a multiple_choice asks which number it marks
(number-line-to-100).

## `highlight_in_text`

Letter or word cards; the child taps every card that matches and taps
Prüfen.

Fields: `show: { drawn: letter-card, text: "L o l M L a" }` (cards split
on spaces), `spans` (the cards to find).

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Every form of a letter | every upper- and lower-case L in "L o l M L a" | letters-l-o-a-m |
| Every noun in a sentence written in small letters | "die übung macht mir freude", spans übung, freude | noun-endings, abstract-nouns |
| The word that does not fit | "I eat cake with a sock", spans sock | en-GB automatic-decoding |
| Root word or suffixes of a split word | "care less ness", spans less, ness | en-GB suffixes-y2 |
| The silent letter | "i s l a n d" split into letters, spans s | en-GB exception-words-ks2 |

## `tracing`

Writing lines with the letter. In trace mode it is drawn dashed with a
green start dot and the child traces it; in copy mode a model sits on the
left and the child writes beside it. The prototype accepts any ink; the
app will compare the strokes.

Fields: `show: { drawn: writing-lines, text, mode: trace | copy, arrows }`,
`char`. No hints in any stage: the guide is the help.

Interactions: trace a letter; copy a letter (letters-l-o-a-m); trace and
copy a numeral, 0 to 10 (write-numerals-to-10).

## `speak`

The child hears the model and says the word. Speech recognition for
young children is not reliable enough to mark, so speak tasks are
practice only, never in a skill check (the build warns). The prototype
does not listen.

Fields: `say` (`{ de: instruction, en: model }`), `show`, `expected_text`.

Interactions: say the colour of a crayon; say the colour of a thing
(en-colours).

## `matching`

Two columns; the child taps a left item (it says its word if it has a
`say`), then the right item it belongs to. A made pair takes the left
item's colour as its border. Prüfen checks all pairs; wrong pairs are
undone.

Fields: `pairs` (2 to 6), each `{ left, right }`; a side is a bank
picture, a drawn component or text, and may carry its own `say`. The app
shuffles the right side.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Colour with a thing that has it | yellow ↔ banana, green ↔ frog, red ↔ strawberry; tapping a colour says "Yellow." | en-colours |
| Numeral with its amount | 3 ↔ three dots on a dice, 5 ↔ five apples; a side can be `{ text: "3" }` | write-numerals-to-10 |
| Number with a split | 7 ↔ 4 + 3, 5 ↔ 2 + 3 | partition-to-10 |
| Number with its number word | 17 ↔ siebzehn, 70 ↔ siebzig, 71 ↔ einundsiebzig, with `option_audio: false` (hearing the cards would give the pairs) | read-write-to-100 |
| Rhyming pairs | Haus ↔ Maus, Tisch ↔ Fisch, Hose ↔ Rose; every picture says its word | rhymes |
| Same first sound | Sonne ↔ Socke, Fisch ↔ Frosch, Ball ↔ Banane | initial-sound |
| First word with its compound | a tree picture ↔ Baumhaus; the picture says its word | compound-nouns |
| Compound with its last part or its article | Regenschirm ↔ Schirm; Haustür ↔ die, with `option_audio: false` | compound-nouns |
| Case question with its case | Wem? ↔ Dativ, four pairs | noun-cases |

Twist: `pairs[].left` and `right` become `{ label, image_url }`; `say`
becomes the narration of that side.

## `sorting`

Items at the top, two to five bins below. The child taps an item, then a
bin; tapping an item in a bin puts it back. Tapping a bin says its word
if it has a `say`. Prüfen checks every item; wrong ones go back.

Fields: `bins` (`{ id, show, say }`), `options` (`{ object, bin }`).
Twist calls the option's bin `correct_bin_id`.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Pictures by colour | strawberry, apple → red; frog, leaf → green | en-colours |
| Words by syllables | bins of one, two and three claps; Ball, Hase, Banane ... (each picture says its word) | syllables |
| Words by first sound | bins headed by a sun and a fish; Sonne, Socke / Fisch, Frosch | initial-sound |
| Words by the sound a spelling makes | bins headed by a cow and a snowman; text cards now, show, town, slow with `option_audio: false` (hearing the cards would give the sound away). Options can be `{ text, bin }` and bins can be `{ show: { text }, say }` | en-GB alternative-pronunciations |

## `ordering`

Number or picture cards above, empty slots below. The child taps cards in
order to fill the slots from the left; tapping a filled slot empties it.
Prüfen checks the whole order; wrong cards go back.

Fields: `options` (strings or bank pictures; may include extra cards that
do not belong), `slot_count`, `answer` (the cards in slot order). Twist
calls the answer `correct_arrangement` and gives options ids.

Interactions:

| Interaction | Example | Used in |
|---|---|---|
| Numbers from small to big | 4, 2, 5, 3 into four slots: 2, 3, 4, 5 | order-to-10 |
| Count backwards | 7, 9, 8, 6 from big to small: 9, 8, 7, 6 | order-to-10 |
| Amounts from few to many | three dot pictures, fewest first | compare-to-10 |
| Two-digit numbers | 45, 18, 81, 54, smallest first | order-compare-to-100 |
| Build an English sentence from word cards | "Bau den Satz: Ich mag Fußball." cards football, I, like into I like football, `option_audio: false` | en-hobbies |
| A sequence in steps | 38, 18, 28, 48 into tens steps | sequences-to-100 |

## Option audio

An option gets a speaker when hearing it does not give the answer away:

- a picture option says its word ("Lampe"), a number or sum is read
  ("13", "7 plus 6"), and a word option is read;
- never on audio_choice (the sound is the question), never for a letter
  or syllable option, never for a group of counted things ("Wo sind 2
  Bananen?");
- matching and sorting: a side, bin or item with its own `say` says that;
  a picture with no `say` says its word, unless the lesson has a target
  language (an Englisch lesson must not say German words); a number or
  sum card ("3", "2 + 2") reads itself, unless the task sets
  `option_audio: false` (matching a numeral to its amount, where hearing
  "drei" would give it away);
- a task can set `option_audio: true` or `false` to override.

narration.py and the player both follow these rules; the player build
fails if a line has no clip.
