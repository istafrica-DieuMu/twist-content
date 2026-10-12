# assets

The asset bank: every picture, drawn component and sound a task can use,
recorded once and reused across lessons, activities and curricula. Tasks
never point at a file; they point at a bank id, and the app or the design
team turns the id into the file.

## What is in the bank

| File | Holds | Made by |
|---|---|---|
| [objects.yaml](objects.yaml) | Objects, animals, food, people and places as single low-detail SVG illustrations, one per concept | design team, in the Pip style |
| [drawn.yaml](drawn.yaml) | Components the app draws from data: ten-frame, Zwanzigerfeld, number line, Rechenstrich, clock, coins, letter cards, writing lines, colour swatches | the app |
| [characters.yaml](characters.yaml) | Pip in a small set of poses | design team |
| [sounds.yaml](sounds.yaml) | Recorded sounds: phonemes per language, and the rule for words and sentences | voice team, text-to-speech |

## Rules

1. **One concept, one picture.** "Apfel", "apple" and "pomme" are the same
   object, `apple`. A lesson in any curriculum or language uses the same
   file.
2. **Objects first.** Pictures show one thing on a transparent background,
   centred, so the app can place, repeat, count, sort and recolour them.
   Scenes are the exception, kept for stories, and listed separately.
3. **Draw what the app can draw.** Quantities, number lines, clocks, money,
   shapes, letters and words are drawn by the app from data, never painted
   into a picture. A ten-frame with 7 dots is data, not an image.
4. **Colour slots.** Objects whose colour is the point (ball, balloon,
   crayon, car, T-shirt) have a `colour_slot`: one SVG, recoloured by the
   app. One crayon gives every colour in a colours lesson.
5. **Searchable metadata.** Each object records its word, first sound and
   syllables per language, so a phonics lesson can ask the bank for "German
   words starting with M, two syllables" and get Maus, Mond ... without new
   art.
6. **Style.** Low-detail SVG illustration that matches Pip: soft rounded
   shapes, a few flat fills with one shade for depth, a thin darker outline
   in the fill colour, no text inside the picture, no background. Readable
   at 64 px.

## Object record

```yaml
- id: apple                 # lowercase English, singular; never changes
  category: food            # food, animal, body, clothes, home, school, toy, transport, nature, people, place, tool
  labels: { de: der Apfel, en: apple, fr: la pomme }
  initial: { de: a, en: a, fr: p }       # first sound (phoneme, lowercase) per language
  syllables: { de: Ap-fel, en: ap-ple, fr: pomme }
  countable: true           # the app may show several
  colour_slot: false        # true when the app may recolour it
  tags: [fruit, round]
  status: needed            # needed, drawn, checked
```

Labels carry the article in German and French, because the article is part
of what children learn there.

## How a task refers to the bank

```yaml
show: { object: apple }                       # one picture
show: { object: apple, count: 7 }             # the app repeats it
show: { object: crayon, colour: red }         # a colour-slot object, recoloured
show: { drawn: zwanzigerfeld, filled: [8, 5] } # a drawn component with its data
say:  { sound: de.l }                          # a recorded phoneme
```

The build checks that every `object`, `drawn`, `character` and `sound` a
task names exists here, and writes a usage view (views/assets.md): which
lessons use each asset, and which assets are still needed.
