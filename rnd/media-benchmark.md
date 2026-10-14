# Media benchmark

Phase 3 item 6, 2026-10-09. Anton's images and audio (12 lessons, steps 1g
and 1h, [anton/notes/media.md](anton/notes/media.md)) against Twist's media
rules: `schoolido-learning/docs/authoring/narration-strategy.md`,
`docs/authoring/practice-visuals-policy.md` and the image-generation pipeline
(`visuals.md` per part).

Limits: 12 lessons is a sample, not a census. The audio was measured (length,
format, voice ids), not listened to, so tone and pacing are not assessed here.

## Pictures

| | Twist | Anton |
|---|---|---|
| How pictures are made | AI-generated from a prompt in each part's `visuals.md` | mostly drawn vector graphics: 248 Anton `lsg` files and 194 SVGs against 98 bitmaps |
| Bitmaps | most item pictures | lesson covers and photos in content-heavy lessons (Englisch, Sachunterricht, Science, EAL alphabet) |
| Counts and quantities | the picture must show exactly the stated number; AI generation miscounts groups (known Twist issue) | quantities are drawn objects, for example the number grid in `21-findAll-start.png`, so a count is exact by construction |
| Reuse | one picture per item | shared graphics folders reused across lessons (20 of 248 lsg files in this sample sit in `shared-lsg/`) |

**Reading.** For anything the child must count or read off a picture
(counts, tallies, grids, coins, clocks, number lines: Twist's "math visuals"
rule), Anton never relies on a generated image. Twist could do the same:
render quantity pictures from data (SVG) and keep AI images for scenes and
objects. That would remove the miscount class of defects for the items where
it matters most.

## Audio

| | Twist | Anton |
|---|---|---|
| Unit | a `narration_script` per step or item | one clip per spoken string, 2.7 s average (603 clips, 27.6 min) |
| Naming | `./narrations/<id>.mp3` | the spoken text is the file name (`sound/de/f1_override_AE/Schreibe die Mehrzahl!`) |
| Voices | one persona (Pip) per LOI, ElevenLabs v3 with audio tags | 28 voice ids in 12 lessons; English mostly two newer voices (258 of 352 clips) |
| Phoneme sounds | written out as speakable sounds ("buh") for TTS; IPA banned | dedicated short recordings, 0.7 s, in a `custom` voice folder (`JJ-phonics-a-gb`, `ae-phoneme-b`); English phonics clips also live there |
| Format | MP3 | MP3, 64 kbps mono, 48 kHz |

**Reading.**

- **Phonemes are recorded, not synthesised.** Anton keeps isolated sounds
  as their own short recordings and reuses them. Twist's "speakable sounds"
  rule exists because a TTS voice cannot say a bare phoneme reliably; a small
  recorded phoneme set (about 40 for English, a similar set for German)
  would sidestep that.
- **Clips named by text are reusable.** The same instruction ("Schreibe die
  Mehrzahl!") is one file however many exercises use it. Twist names clips by step or item id, so when the same instruction repeats across items, each item carries its own clip.
- **Anton's audio is short and functional** (2.7 s average), which suits
  instructions and item prompts. Twist's narration is longer and directed
  (pauses, tags, praise) by design; whether Anton's clips carry any of that
  needs listening, which this pass did not do.
