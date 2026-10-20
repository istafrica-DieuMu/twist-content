# Drill banks

One hand-written bank per skill to know by heart, used by practice only
(docs/practice.md, Drill banks). `<domain>/<skill-slug>.yaml`, checked by
`node twist/build.mjs` (drills-check.mjs). Write every item by hand.

## Foreign-language banks

Decided 2026-10-20. A skill in `fl` is shared by de-DE (English for German
children) and en-GB (French for English children), so its bank holds both
languages: the English items and the French items. Each item pairs a word in
the language being learnt with what it means:

```yaml
skill: fl.themes.numbers-to-10
formats: [listen]
items:
  - { word: three, lang: en, digit: 3, home: { de: drei, en: three } }
  - { word: trois, lang: fr, digit: 3, home: { de: drei, en: three } }
  - { word: rouge, lang: fr, colour: red, home: { de: rot, en: red } }
  - { word: cat, lang: en, object: cat, home: { de: die Katze, en: cat } }
```

- `lang` is the language of `word`, `en` or `fr`. A session takes only the
  items in the `target_language` of the child's set; practice-rules.mjs
  does not filter by `lang` yet.
- What the word means is shown by one of: `object`, an asset-bank object
  with a picture (with `colour`, the object in that colour, which needs its
  recoloured picture); `digit`, a number word's value; or `colour` alone, a
  `colour-swatch`.
- `home` is the word in German and in English, for the parent view and
  feedback.
- Formats: `listen` (hear the word, pick the picture or digit) and `flash`
  (read the word, pick the picture or digit). Use `flash` only where the
  sets of both curricula show the words in writing in Practise (numbers
  to 20 and to 100); the colour and numbers-to-10 sets are heard only, so
  their banks listen.
- The build checks `lang`, `home` in de and en, that the object and its
  picture exist and a swatch colour is drawn, that a digit matches the
  number word in all three languages, and that no word appears twice in
  one language.

When two skills of a domain share a slug (reading and spelling the same
word list), the strand goes in front of the slug in the file name:
`lit-en/word-reading.exception-words-y2.yaml`.
