# Media: images and audio (steps 1g and 1h)

2026-10-09. Media for 12 lessons, 6 per curriculum, spread across subjects
and grades; lessons played in 1d were reused so the media matches the
screenshots. Picked by `tools/pick-media.mjs`; the lesson list with reasons
is `tools/lists/media/lessons.json`. Files are in `media/` (gitignored, kept
on disk), saved under their Anton file id.

| Curriculum | Course | Lesson | Exercises |
|---|---|---|---|
| German-DE | Deutsch 1. Klasse | Einzahl und Mehrzahl (played in 1d) | 6 |
| German-DE | Mathematik 1. Klasse | Zahlen vergleichen (played in 1d) | 8 |
| German-DE | DaZ Kurs A1 | Ich wasche mich. | 5 |
| German-DE | Englisch 3. Klasse | New Zealand | 6 |
| German-DE | Sachunterricht 1./2. Klasse | Sonne, Mond und Sterne | 5 |
| German-DE | Vorschule Buchstaben | A und B nachspuren | 4 |
| English-GB | English Year 1 | Phonics - ay (probed in 1a) | 4 |
| English-GB | Maths Year 2 | Equivalent Time | 5 |
| English-GB | Science Year 3-4 | Human Teeth | 5 |
| English-GB | History KS1 | The Great Fire of London | 5 |
| English-GB | EAL Alphabet and Phonics | a | 5 |
| English-GB | Preschool Maths | Logic, Activity Set 2 | 4 |

## How media is listed

Every exercise file has `mediaFiles` with four lists, each entry a file id
and an etag (`<hash>-<bytes>`): `images` (bitmaps, including the lesson
cover), `lsgs` (Anton vector graphics), `svgs` and `sounds`. All are served
by the same content endpoint as the JSON. 66 sound entries carry no etag
(`isMultiSound`): they are assembled in the app from several clips and have
no file of their own; they were skipped.

## 1g: images and graphics

540 files, 8.4 MB, fetched in 5 minutes, 0 failed.

| Kind | Files | Format |
|---|---|---|
| Bitmaps (`images`) | 98 | 87 JPEG, 11 PNG; e.g. 300 x 300 RGBA |
| Anton vector graphics (`lsgs`) | 248 | JSON drawing descriptions |
| SVG (`svgs`) | 194 | SVG |

The server labels some PNGs as `image/jpeg`; the fetch tool now names files
by their byte signature. One test file fetched before that fix,
`media/image/lsg_ea7090d989.jpg`, is a PNG with a `.jpg` name; it is kept
as fetched.

Most lesson pictures are vector graphics, not bitmaps: bitmaps appear mainly
as covers and as photos in content-heavy lessons (Englisch, Sachunterricht,
Science, EAL alphabet).

## 1h: audio

603 MP3 files, 9.9 MB, 27.6 minutes of audio, fetched in 6 minutes, 0
failed. 64 kbps mono, 48 kHz. Average clip 2.7 s.

Three sound ids differ only in characters that are replaced in file names,
so they share a file; 606 ids map to 603 files.

### Voices

Sound ids are `sound/<language>/<voice>/<text>`, so every clip names its
voice. 28 voice ids in these 12 lessons:

| Voice id pattern | Examples | Clips | Reading |
|---|---|---|---|
| `f…` / `m…` | f5, m3, m7 | most | female / male voices |
| `…_2025` | en/f3_2025 (133), en/m2_2025 (125), de/f4_2025 | 283 | newer voices; 258 of the 352 English clips (73%) use en/f3_2025 or en/m2_2025 |
| `…Poly` | de/m1Poly (37), de/f2Poly | 46 | the name suggests a synthetic text-to-speech voice; not confirmed |
| `…_chirp` | de/f11_chirp, de/m2_chirp | 4 | the name suggests a synthetic voice; not confirmed |
| `…_override_XX` | de/m1_override_MG, de/f2_override_LM | 55 | likely per-voice corrections; meaning not confirmed |
| `custom` | daz-phoneme-EE-l, JJ-phonics-ai-gb | 18 | phonics sounds, 0.7 s on average |
| `…Au` / `…Us` | m1Au, m1Us, m2Us | 12 | accent variants for English |

The prompt text is the file name, so audio and text can be matched without
listening: `sound/de/f1_override_AE/Schreibe die Mehrzahl!` is the spoken
instruction "Schreibe die Mehrzahl!".
