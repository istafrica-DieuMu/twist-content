# assets

The asset bank: every picture, drawn component and sound a task can use,
recorded once and reused across lessons, activities and curricula. Tasks
never point at a file; they point at a bank id, and the app or the design
team turns the id into the file.

## What is in the bank

| File | Holds | Made by |
|---|---|---|
| [objects.yaml](objects.yaml) | Objects, animals, food, people and places, one picture per concept; the pictures are in [objects/](objects/) | [tools/pictures.py](tools/pictures.py), checked by the design team |
| [drawn.yaml](drawn.yaml) | Components the app draws from data: ten-frame, Zwanzigerfeld, number line, Rechenstrich, clock, coins, letter cards, writing lines, colour swatches | the app |
| [sounds.yaml](sounds.yaml) | Phonemes and syllables per language, each with the text to say and a hand-written direction | spoken in the chosen voice by [tools/narration.py](tools/narration.py) |
| [voices.yaml](voices.yaml), [phrases.yaml](phrases.yaml) | The voice's character brief and the pilot candidates; what the app says between tasks | hand-written |

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
   crayon, car, T-shirt, leaf) have a `colour_slot` and a `recolour` entry
   naming the part that changes. The tool makes one picture per colour the
   lessons ask for by editing the base picture, so every crayon is the same
   drawing in a different colour. Colour values live in drawn.yaml
   (`colours`) and are shared with the colour swatches.
5. **Searchable metadata.** Each object records its word, first sound and
   syllables per language, so a phonics lesson can ask the bank for "German
   words starting with M, two syllables" and get Maus, Mond ... without new
   art.
6. **Style.** The mascot's style: flat 2D vector cartoon, soft rounded
   shapes, a bold dark aubergine outline, flat cel shading with one darker
   tone per colour, one small white highlight. Low detail, readable at
   64 px, no text inside the picture, transparent background. Animals and
   people have the mascot's eyes; objects have no face. The mascot itself
   is only a style reference: lessons use no mascot or character art.

## Pictures

Each picture is a 512 px square PNG with a transparent background, trimmed
to the subject with a 6% margin and reduced to a 64-colour palette: 8 to
23 KB each, about 1.1 MB for the 74 pictures so far. Colour versions are
`objects/<id>.<colour>.png`.

[tools/pictures.py](tools/pictures.py) makes them. It sends the shared
style, the object's hand-written `draw` line and two style references (the
mascot and the apple sprite from schoolido-learning, read only) to
`openai/gpt-image-2.5-sunburst` on OpenRouter at low quality, about $0.023
a picture and $0.015 a colour version. Pillow does the trimming and
compression. [objects/pictures.yaml](objects/pictures.yaml) records what
made each file; the full-size model output goes to objects/raw/, which git
ignores.

```
python3 -m venv twist/.venv && twist/.venv/bin/pip install -r twist/assets/tools/requirements.txt
twist/.venv/bin/python twist/assets/tools/pictures.py            # make what is missing
twist/.venv/bin/python twist/assets/tools/pictures.py --only egg # remake one
```

The model was picked on 2026-10-12 by sending one prompt and the two
references for four test objects (apple, lion, crayon, grandma) to ten
OpenRouter image models. The two GPT Image models and Gemini 3.1 Flash
Image matched the mascot's outline and shading best; Sunburst matched the
eyes most closely and costs a third of Gemini. FLUX.2 Klein was cheapest
($0.016) but drew thinner outlines. Recraft v4.1 redrew the mascot instead
of the object. Nano Banana 2.1 was out of quota at Google that day.

The build warns when a lesson uses an object or colour that has no picture
yet.

## Voice

One voice speaks everything: Learn screens, prompts, hints, feedback, the
English target words, the app's phrases ([phrases.yaml](phrases.yaml)) and
the sounds. [voices.yaml](voices.yaml) holds the character brief that goes
with every request to a model that takes directions, the pilot candidates,
and `chosen`, the voice in use.

[tools/narration.py](tools/narration.py) gathers every spoken line from
the lessons into [narration/lines.yaml](narration/lines.yaml) (identical
lines share one clip), speaks them in a voice through OpenRouter, trims the
silence, evens the loudness and writes mono 48 kbps MP3s to
narration/<voice>/ (sounds in narration/<voice>/sounds/, a colon in the id
written as `-long`, held sounds capped at 1.5 s). `google/gemini-3.8-flash`
then listens to every clip and checks it against its text; a clip that
fails is remade once, and the results are in narration/<voice>.yaml.
`--page` writes narration/pilot.html, where any lesson can be played in
any voice. The audio and the page are not in git; the tool remakes them.

Maths written for the screen is read with one rule for every voice: "+"
plus, "−" minus, "=" gleich, "_" wie viel, "= ?" gleich wie viel.

Each sound in sounds.yaml has a `say` text and a `how` line, the direction
a voice actor would get ("only the consonant l, held, not the letter name
El"). Models that take no directions get only `say`.

### Picking the voice

On 2026-10-13, 51 voices (all 30 Gemini 3.8 Flash TTS voices with the
brief, all 21 ElevenLabs v4 voices) read one German Learn line and four
English colour words. The listening model rated almost all of them 5 of
5, so it cannot choose; it only flagged four ElevenLabs voices (brian,
eric, harry, laura) as not British in English. The pilot then made every
line in seven voices: four ElevenLabs v4 voices (the production model),
two Gemini voices and one native German MAI voice. The listening check
flagged 0 of 390 clips for Gemini Sulafat, 1 for Gemini Puck, 29 to 36
for the ElevenLabs voices (which read letter sounds in sentences as letter
names: "Löwe fängt mit lll an" as "El El El", since they take no
directions) and 73 for MAI Mia (numbers misread). After listening, the
team chose **Gemini Sulafat**, with Puck kept as the alternate; the other
five voices were removed.

Two voices share the lessons: Sulafat teaches and practises, and Puck
speaks every Check and the phrase that opens it ("Jetzt zeigst du, was du
kannst."), with his own brief: a little more focused and serious, still
kind. The change of voice tells the child that this part counts. `assign`
in voices.yaml sets this; the tool gives each line to the voice of the
activity it is used in, so a line used in both practice and a check has a
clip in each voice.

If production moves to ElevenLabs later, lines that contain a letter sound
need the sound played from the bank (`de.l`) inside the line, because
ElevenLabs will not say a bare sound reliably.

## Object record

```yaml
- id: apple                 # lowercase English, singular; never changes
  draw: "a red apple with a short brown stem and one green leaf"   # what the picture shows, hand-written
                            # colour-slot objects add: recolour: { part: "the balloon and its knot", base: red }
  category: food            # food, animal, body, clothes, home, school, toy, transport, nature, people, place, tool
  labels: { de: der Apfel, en: apple, fr: la pomme }
  initial: { de: a, en: a, fr: p }       # first sound (phoneme, lowercase) per language
  syllables: { de: Ap-fel, en: ap-ple, fr: pomme }
  countable: true           # the app may show several
  colour_slot: false        # true when the app may recolour it
  tags: [fruit, round]
  status: drawn             # needed, drawn (a picture exists), checked (a person approved it)
```

Labels carry the article in German and French, because the article is part
of what children learn there.

## How a task refers to the bank

```yaml
show: { object: apple }                       # one picture
show: { object: apple, count: 7 }             # the app repeats it
show: { object: crayon, colour: red }         # objects/crayon.red.png
show: { drawn: zwanzigerfeld, filled: [8, 5] } # a drawn component with its data
say:  { sound: de.l }                          # a recorded phoneme
```

The build checks that every `object`, `drawn` and `sound` a task names
exists here, and writes a usage view (views/assets.md): which
lessons use each asset, and which assets are still needed.
