# 1d browser pass: running log

Observations in the order they were made. Screenshots in `screenshots/1d/`.
Raw Playwright output (same screenshots plus page snapshots) is in
`schoolido-learning/.playwright-mcp/`, copied here at the end of the pass.

## Session and navigation (2026-10-09)

- Account: the saved research account in the persistent profile, language
  version Deutsch. Navigating by URL sends the app back to the landing page;
  clicking the saved account resumes the session on the requested page.
  Moving around inside the app works.
- Screenshot `01-subject-list-de.png`: the Fächer (subjects) list.

## Lesson page

- `02-lesson-zahlen-vergleichen.png`: a cover image, then a vertical path of
  exercise tiles, each with three grey stars. No lock icons; every tile can
  be opened.
- `14-lesson-path-after-ex1.png`: after exercise 1 the tile shows three green
  stars and the learner's avatar moves next to it.

## Exercise frame

- Top bar: close (X), a progress bar, a speaker button (replay instruction)
  and a chat-bubble button (feedback to Anton).
- Instruction text with a speaker icon above the task; prompts are read aloud.
- Progress bar is segmented: each tap or item adds a green (right) or red
  (wrong) segment.

## Types

### memory (Mathematik 1. Klasse, Zahlen vergleichen, #1 "Ordne von klein nach groß")

- `10-memory-start.png`: four number cards; "Klicke die Zahlen in der
  Reihenfolge von klein nach groß an." So `memory` with a `chooseMode` is a
  tap-in-order task, not only a pairs game. Taxonomy needs correcting.
- `11-memory-wrong-feedback.png`: wrong tap gets a red frame and a red
  progress segment; the item does not reset, the learner carries on.
- `12-memory-after-item.png`: correct taps get a green frame; tapped cards
  show their value as a caption.
- 6 items in the exercise.
- `13-exercise-end.png`: end screen with the Anton character, "Geschafft!
  Sauber abgeliefert.", three green stars (with one wrong tap out of 24),
  buttons: retry, Weiter, "Meine Ergebnisse". Weiter returns to the lesson
  path rather than opening the next exercise.

### choose-all, findAll (same lesson, #2 "Kleiner! Größer?")

- `21-findAll-start.png`: "Klicke alle Zahlen an, die größer als 10 sind." A
  drawn 4x3 grid of numbers in a vector image (lsg); the tiles are regions of
  the picture, not buttons.
- `22-findAll-wrong.png`, `23-findAll-right.png`: a right tap puts a green
  tick on the tile. After the first wrong tap a **Lösen** (solve) button with
  an unlock icon appears.
- `24-findAll-reveal.png`: Lösen marks the remaining answers with grey ticks;
  the progress bar adds a grey segment, so a revealed item counts as neither
  right nor wrong. A Weiter bar appears at the bottom.
- The exercise has its own URL (`uebung-08`) whose number is the level file
  number, not the position on the lesson path (#2).

### Leaving an exercise

- `25-after-cancel.png`: the X asks "Jetzt abbrechen?" with Nein / Ja.

### choose-one, buttons (#3 "Größte Zahl")

- `30-buttons-start.png`: "Welche der drei Zahlen ist die Größte? Wähle aus."
  Three plain grey text buttons.
- `31-buttons-wrong.png`: wrong answer adds a red progress segment; the
  buttons stay for another try.

### fill-gap, gapMulti in a test (#8 "Test")

- `40-test-gapMulti-start.png`: "Setze das passende Vergleichszeichen ein."
  "15 _ 15" with the answer buttons <, =, > in a bar at the bottom.
- `41-test-wrong.png`: in the test a wrong answer is handled as in practice:
  red segment, try again. No separate test mode visible per item.

### Course picker and list-style lessons

- `50-deutsch-course-picker.png`: clicking a subject opens its grades in
  place, each with its exercise count (Deutsch: 1. Klasse 564, 2. Klasse 860,
  3. Klasse 588, ...). These match the catalogue.
- `51-lesson-einzahl-mehrzahl.png`: this lesson is a list with exercise
  names, not a path (the `design` field in the course file). The Test row
  shows **three trophies instead of stars**: tests earn trophies.

### match-pairs, dragMatch (Deutsch 1. Klasse, Einzahl und Mehrzahl, #4 "Bilder zuordnen")

- `52-dragMatch-start.png`: "Ordne zu." Pictures and word cards scattered on
  the screen ("der Hut", "die Hüte"); the plural ending is highlighted in
  blue. The child drags a word onto its picture.
- `53-dragMatch-wrong.png`: a wrong drop sends the card back; red segment.
- `55-dragMatch-right.png`: a right drop removes the pair; green segment.

### find-in-text, findWordsInText (Deutsch 1, Einzahl und Mehrzahl, #5 "Mehrzahlsuche")

- `60-findWordsInText-start.png`: "Tippe das Wort an, das in der Mehrzahl
  steht." A picture and one sentence; every word is underlined and tappable.
  The spelling pattern is coloured ("Erd**bee**ren").

### sort-into-groups, dragGroup (Deutsch 1, Wortschlangen, #4 "Zuordnen")

- `70-dragGroup-start.png`: "Sortiere die Wortschlangen danach, ob sich in
  ihnen ein Tiername versteckt oder nicht." Letter strings scattered on the
  screen (fBÖBLöwe, bwbHaseJnseu, ...), two drop bins along the bottom: Tier /
  kein Wort.

### trace-path, followPath (Deutsch 1, Uu, #1 "Uu schreiben")

- `80-followPath-start.png`: "Schreibe das U/u." Letter tracing on a
  four-line writing grid with a house mnemonic for the zones (roof, house,
  cellar). A start dot with an arrow shows where to begin. This is
  handwriting tracing, which matches Twist `tracing`.

### timed, flashRead (Deutsch 1, Blitzlesen schwer, #1 "Natur")

- `90-flashRead-start.png`: "Lies das Wort und wähle das richtige Bild aus.
  Achtung, du hast nur kurz Zeit!" and a Start button.
- `91-flashRead-word.png`, `92-flashRead-choices.png`: after Start the word
  ("Blume") shows for about 2 seconds and fades; the child then picks the
  picture from memory.

### Navigation note

Clicking Fächer opens a side menu whose overlay blocks clicks on the
subject list, and grade rows of an open subject stay in the list, so text
matching picks the wrong grade. Reliable route: open
`https://anton.app/de/lernen/<pageUrl>/`, click the saved account to resume,
then lesson and exercise by position.

### label-picture, dragAndValidate (Mathematik 1, Mit Geld rechnen, #2)

- `b0-dragAndValidate-start.png`: "4 Euro und 50 Cent". Drag coins into a
  purse, then press **Prüfen** (check). Checked on request, not per drop.
  This is close to Twist `drag-and-drop-count`; the taxonomy note that Twist
  `drag-and-drop-count` has no Anton counterpart is wrong.

### teach, contentPlayer (Mathematik 2, Fragen und Antworten finden, #1)

- `c0-contentPlayer-start.png`: "Ordne die Frage der passenden
  Rechengeschichte zu. Klicke immer das richtige Kind an. Für diese Übung
  musst du den Ton anschalten." An audio story where the learner taps the
  right character. Not a passive teach screen. **Tipp** button with a bulb in
  the top bar: first hint button seen.

### written-maths, mathGrid (Mathematik 3, Schriftliche Subtraktion, #1)

- `d0-mathGrid-start.png`: "Schreibe die Aufgabe für die schriftliche
  Subtraktion auf. 415 - 213". A place-value grid (H Z E) with the minuend
  given; the learner types digits into the cells, then Prüfen.

### find-on-picture, findOnImage (Deutsch 4, Grafiken verstehen, #3)

- `e0-findOnImage-start.png`: "Schau dir den Waldpark-Plan an und finde die
  gesuchten Orte. Klicke die Eisdiele an." A drawn park map; tap the place.

### odd-one-out, kickItem (Deutsch 5, Wörter ableiten, #2)

- `f0-kickItem-start.png`: "Ein Wort gehört nicht zur Wortfamilie. Klicke es
  an." Photo plus four word buttons (tückisch, Stück, Stückchen, stückeln).

### build-word, wordBuilder (Deutsch Oberstufe, Romantik, #8 Test)

- `i0-wordBuilder-start.png`: "Von wann bis wann dauerte die Romantik? Setze
  die Zeitspanne der Epoche zusammen." Number tiles to build a year span.
  wordBuilder assembles any answer from tiles, not only words.

### put-in-order, dragSort (Musik, Noten und Notenwerte, #9)

- `j0-dragSort-start.png`: "Ordne die Notenwerte. Beginne oben mit dem
  längsten Notenwert." Vertical list with drag handles, then Prüfen.

### choose-by-sound, soundButtons (Englisch Stufe 0, My name is, #4)

- `k0-soundButtons-start.png`: options are audio buttons only, each with a
  tick to choose it. Listen, then pick.

### segment, wordSlice (Deutsch 2, Zwielaute, #5)

- `a0-wordSlice-start.png`: "Setze die Wörter mit Zwielaut zusammen." Photo
  of a tree; letter tiles B, m, au go into a slot to build "Baum".
  **Taxonomy correction:** wordSlice assembles a word from parts; it does
  not cut words up. The "segment" type needs renaming (assemble from parts)
  and probably merging with build-word.

### read-and-answer, multipleChoiceText (Deutsch 9/10, Nicht flektierbare Wörter, #4)

- `g0-multipleChoiceText-start.png`: "Lies den Text und beantworte
  anschließend die Fragen." A text card ("Adverbien ...") with Weiter, then
  the questions.

### geometry, shapeMirror (Mathematik 9/10, Ähnlichkeit, #8 Test)

- `h0-shapeMirror-start.png`: "Spiegele die Figur vertikal entlang der
  Mitte." Squared grid, a triangle and a red mirror line; the learner places
  points for the image. Reset (trash) and Prüfen.

### Locks exist in preschool puzzle courses

- `l0-kidColorize-start-course.png`: Vorschule Früchte-Puzzles is a grid of
  locked tiles that open in sequence; only the first is open. A "Tipp /
  Fokus" toggle sits top right. The earlier "no locks" holds for the school
  courses seen, not for these puzzle courses. colour-in (kidColorize) is in
  the second, locked tile, so it was not opened.

### Rewards

- `m2-spiele.png`: the Spiele page lists games (Hidden, ANTON Sports:
  Weitsprung, Astro Bang, Avatar Superstar, Bat Cave, Block Puzzle, City
  Jumper, Crazy Cobras, ...). The account shows **2 coins** after one
  finished exercise: exercises earn coins, coins pay for games.

## Not covered in 1d

- count (kidCount) and set-clock (digitalClock): their first-position
  exercises are only in English-GB courses, and the account is set to the
  German version, so English-GB URLs redirect. 1 and 2 exercises in the
  sample. Needs a language switch.
- colour-in (kidColorize): behind a preschool lock for the automated pass.
  Checked by hand by the user on 2026-10-09: pick a colour, then tap a region
  of the picture; regions are parts of shapes (part of a square, a circle,
  and so on). No screenshot.
- Meine Ergebnisse (results page) and how a whole lesson completes.
