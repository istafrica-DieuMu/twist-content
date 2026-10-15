# Handwriting scripts (Schreibschrift)

Joined handwriting looks different from school to school. A child should see
the same letter shapes their teacher uses, so the joined script is a setting
on the child, not part of the content. The lesson records only say that a
writing task is in joined script; the app draws it in the child's script.

This page is for the mobile app team (ist-schoolido), who draw the writing
lines, and the backend team (IST-B2C/backend), who store and serve the
setting. The parent dashboard (IST-B2C/Parent-dashboard) shows the choice.
The lesson player in `twist/pages/player/` already does all of this: open
Settings to see the four German scripts side by side.

## The scripts

German primary schools do not share one joined script. Each school chooses an
Ausgangsschrift, often guided by its Land.

| Value | Name | What it looks like | Font |
|---|---|---|---|
| `de-sas` | Schulausgangsschrift (SAS) | Rounded, fairly simple letter shapes. Developed in the former East Germany, still common in eastern Länder. The default for de-DE. | Playwrite DE SAS |
| `de-la` | Lateinische Ausgangsschrift (LA) | The older traditional script from 1953, with more loops and flourishes. Still taught in some schools, for example in Bavaria. | Playwrite DE LA |
| `de-va` | Vereinfachte Ausgangsschrift (VA) | A simplified LA from the 1970s, widely used in western Länder. Most letters start and end at the same height, which makes the joins easier. | Playwrite DE VA |
| `de-grund` | Grundschrift | Not a fully joined script: print-like letters with small exit strokes, so children develop their own joins. | Playwrite DE Grund |
| `en-gb-joined` | English joined style | England has no national script; schools use their own scheme. This is a common continuous style with lead-in and exit strokes. The default for en-GB. | Playwrite GB J |

All five fonts are from Google's Playwrite family, free under the SIL Open
Font License 1.1, and can be bundled with the app
(https://fonts.google.com/?query=Playwrite).

## Where the content uses it

A writing-lines picture or a tracing task with `script: joined`:

```yaml
- id: l1-f2
  type: tracing
  text: "Spur das Wort nach."
  show: { drawn: writing-lines, text: "Oma", mode: trace, script: joined }
  char: "Oma"
```

Six lesson sets use it today, 117 times in all: de-DE Klasse 2
`joined-lowercase`, `joined-capitals`, `joined-fluent`; en-GB Year 2
`start-joining`, Year 3 `joined-legible`, Year 5 `fluent-speed`. Print
writing lines (no `script`) are drawn in the app's print font as before.

The records never name a script. The lessons are written so that they hold
for every script: for example, the de-DE capitals lesson names no join that
differs between SAS, LA and VA, and the en-GB lessons say that the teacher
shows the school's way.

## For the mobile app

Draw the model word on the writing lines in the font of the child's
`handwriting_script`:

- `mode: trace`: the word as a light dashed outline to trace over; the
  child's ink goes on top. `mode: copy`: the word as solid ink on the left,
  an empty line to copy it on.
- Four lines, as in the player: the top line, a dashed middle line, the
  baseline (stronger) and the descender line. The baseline of the font sits
  on the baseline; size the font so the x-height fills the space between
  the middle line and the baseline.
- Keep the whole word one text run in one font size, with the font's
  OpenType features on (contextual alternates, ligatures). Do not add letter
  spacing and do not draw letters one by one: the joins come from the font,
  and both break them.
- Load all five fonts with the app (expo-font), so a change of setting shows
  at once and works offline.
- If the setting is missing, use the curriculum's default: `de-sas` for
  de-DE, `en-gb-joined` for en-GB. A de-DE value on an en-GB child (or the
  other way round) also falls back to the default.
- Marking does not change: a tracing task accepts any ink.

## For the backend

Store the script on the child and send it with the child's profile.

- **Field:** `handwriting_script` on the child, nullable, one of `de-sas`,
  `de-la`, `de-va`, `de-grund`, `en-gb-joined`. Null means "use the
  curriculum's default". Validate that the value belongs to the child's
  curriculum (`de-*` for de-DE, `en-gb-*` for en-GB) and reject the rest.
- **Read:** include it in the child profile the app already loads (with the
  curriculum and year), so the app can draw the first writing task without
  another call.
- **Write:** the parent dashboard sets it with the other child settings
  (the same update endpoint). Changing it needs no change to progress or
  mastery: it only changes how writing lines look.
- **Later:** a school or class can carry a default script for its children
  when Twist knows the school; the child's own value still wins.

## For the parent dashboard

Show the choice in the child's settings, only for a curriculum that has more
than one script (today de-DE). Show each script writing the same word, as
the player's Settings do, with one line on what it is, and a hint: "Ask your
child's teacher which script the school uses." Default: SAS.

## Open

- A default by Land would need the child's Land, and schools inside a Land
  differ, so the default is SAS until the school is known.
- Schools in England use many joined schemes; one English style is a
  compromise until a school can choose its scheme.
