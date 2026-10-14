# Anton capture index

## Status

- 1a: done
- 1b: done
- 1c: done
- 1d: done (21 of 23 types; colour-in checked by hand; count and set-clock not opened, see notes/1d-log.md)
- 1e: done (notes written; counts from full text to refresh when 1f finishes)
- 1f: done (all 31,804 exercise files, both curricula; tools/lists/1f/README.md)
- 1g: done (12 lessons, 540 visual files; notes/media.md)
- 1h: done (12 lessons, 603 audio clips; notes/media.md)

## Captured

| When | What | Where |
|------|------|-------|
| 2026-10-08 | Plan index, all six language versions (293 plans) | `api/list/plans.json` + `.headers.txt` |
| 2026-10-08 | Full plan, English Year 1 (165 lessons, 929 exercises listed) | `api/plan/c-nateng-1-gb.json` + `.headers.txt` |
| 2026-10-08 | Full plan, Deutsch Klasse 1 (91 lessons, 564 exercises listed) | `api/plan/c-natdeu-1.json` + `.headers.txt` |
| 2026-10-09 | Structure pass (1b): every course listed in English-GB or German, outdated included (121 files, 7.6 MB) | `api/plan/*.json` |
| 2026-10-09 | Text sample (1c): 399 lessons, all 2,514 exercise files listed in `tools/lists/sample-1c.txt` (16.1 MB, 55 minutes, 2 network errors retried) | `api/level/...` |
| 2026-10-09 | 1f German-DE Deutsch, Mathe, Englisch: all 10,516 listed files (1,844 single downloader, then 8,672 with 3 downloaders at 0.3 s in 27 min, 0 failed, no 403/429). Deutsch and Mathe complete; Englisch complete except its 2 outdated courses (chunk 15) | `api/level/...`, `tools/lists/1f/shards/de-core-*` |
| 2026-10-09 | 1f German-DE DaZ: complete, 1,079 of 1,079. 3 downloaders at 0.3 s fetched 923 over 3.5 h with 156 `fetch failed` (no response, no 403/429; slow or dropped connection on our side); a single downloader at 1 s fetched the 156 in 4.5 min, 0 failed | `tools/lists/1f/shards/de-daz-*` |
| 2026-10-09 | 1f German-DE chunks 05 to 15 (science, preschool, music, geography, history, computing, biology, chemistry, physics, foreign languages, outdated): 5,604 files, 3 downloaders at 0.3 s, 15 min, 0 failed. All German-DE chunks complete | `tools/lists/1f/shards/de-rest-*` |
| 2026-10-09 | 1f English-GB: all 11,036 remaining files, 3 downloaders at 0.3 s. The connection dropped twice (no response from any site, no 403/429); each time the downloaders stopped after 10 errors in a row and a restart resumed. 31,804 of 31,804 exercise files now on disk, all valid JSON | `tools/lists/1f/shards/gb-*` (run1, run2, run logs) |
| 2026-10-08 | One exercise file, Phonics ay, Find Letter | `api/level/probe/level~c-nateng-1-gb~...~level-01.json` |
| 2026-10-08 | 404 response from the wrong URL shape, kept as evidence | `api/level/probe/c-nateng-1-gb~...~level-01.json` |

Recon notes: [notes/api.md](notes/api.md). Every request is logged in `api/fetch-log.jsonl`.

## Media packs

12 lessons, 6 per curriculum (list and reasons: `tools/lists/media/lessons.json`). 1g: 540 images and graphics, 8.4 MB. 1h: 603 MP3 clips, 9.9 MB, 27.6 min. All in `media/` (gitignored). Details: [notes/media.md](notes/media.md).
