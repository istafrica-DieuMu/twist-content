# Anton content API (step 1a recon, 2026-10-08)

All curriculum content is served as static JSON from Anton's content CDN.
**No sign-in is needed**: the plan index, plan files and exercise files all
returned 200 without cookies or tokens. The browser and sign-in are only
needed for things the JSON does not show (how an exercise looks and behaves,
rewards, progression), which is step 1d.

## Endpoint

    GET https://content.anton.app/files/?fileId=<fileId>&etag=<etag>

- Canonical host in the `link` header: `apis-content.solocode.com`. Mirror:
  `content-2.anton.app`.
- `etag` is `<hash>-<bytes>`. The byte count matches the response size, so
  every file's size is known before fetching it.
- Responses are CDN-cached (`cdn-cache: HIT`). Plan and level files carry
  `cache-control: public, max-age=2592000` (30 days). The plan index carries
  `max-age=0, s-maxage=3600` and `etag=latest` works for it.
- A wrong fileId returns `404 text/plain` (50 bytes). Saved as
  `api/level/probe/c-nateng-1-gb~...~level-01.json`.

## File types

| fileId | What | Saved as |
|--------|------|----------|
| `list/plans` | Index of every course in every language version | `api/list/plans.json` |
| `plan/<project>` | One course: topics, lessons (blocks), exercises (levels) | `api/plan/<project>.json` |
| `level/<project>/<topic>/<block>/<level>` | One exercise with all its items | `api/level/...` |
| `sound/<lang>/<voice>/<text>` | One audio clip (TTS or custom) | not fetched yet |
| `.lsg` paths | Images and vector graphics | not fetched yet |

## Plan index (`list/plans`)

293 plans, 272 non-debug. Fields per plan: `project`, `fileId`, `etag`,
`subject`, `title`, `grades`, `guiLanguages`, `contentLanguagePrimary`,
`contentLanguageSecondary`, `totalBlocks`, `totalLevels`, `isOutdated`,
`isNewUntil`, `sortIndex`, `preschoolDifficulty`, `version`, `versionDate`.

- `guiLanguages` decides which language version lists the plan:
  `de`, `en_gb`, `en_us`, `fr`, `es`, `pt`. Non-debug counts: de 71, en_gb 61,
  en_us 55, es 54, pt 44, fr 42. This is the Phase 2 list; there are no
  country variants beyond these six.
- `totalBlocks` = lessons, `totalLevels` = exercises. They match the prior
  note: Year 1 English is 165 / 929 here, 164 / 929 in the note.
- `grades`: 0 = Reception or preschool, 1 to 13 = school years, 99 = not
  graded (language courses, DaZ, vocabulary).
- `subject` is a code (`nateng`, `natdeu`, `mat`, `sci`, `geo`, `his`, ...)
  or, for shared foreign-language courses (`c-mono-*`), an object keyed by
  language version.

## Plan file (`plan/<project>`)

    plan: title, project, version, versionDate, totalBlocks, totalLevels, etag
      topics[]: title, path, puid, tags[], isNewUntil
        blocks[] (lessons): title, path, puid, design, coverImage {id, etag}, tags[]
          levels[] (exercises): title, path, puid, type, etag

Every level carries its own etag, so a full plan gives the exact file list
and byte size for every exercise in that course.

## Level file (`level/...`)

    title, puid, path, type, keyboardLayout, voiceLang, voice,
    instruction {voice, speaker, autoplay},
    trainers[]: trainer, instruction, soundMode, shuffleButtons, atoms[]
    parentTopic, parentBlock, mediaFiles {sounds[], ...}, etag

- `trainer` is Anton's own exercise-type name (`imageButtons`, `findAll`,
  ...). The exercise-type inventory for taxonomy.md can be built from these
  directly, across all 30,889 exercises.
- `atoms` hold the items: instruction text, the spoken prompt, answer
  options, and which option is correct.
- Audio prompts are markup such as `<voice voiceLang='de' voice='custom'>JJ-phonics-ai-gb</voice>`.
  `mediaFiles.sounds` lists every clip as a `sound/...` fileId with its etag,
  so a lesson's full media pack can be listed without fetching it.

## Scope and estimate for steps 1b and 1c

Plans listed in English-GB or German, excluding 6 marked `isOutdated`:

| | Plans | Lessons | Exercises |
|---|---|---|---|
| English-GB or German (union) | 115 | 5,150 | 30,889 |

Per language version: English-GB lists 61 plans (2,582 lessons, 14,563
exercises); German lists 71 (2,945 lessons, 18,679 exercises). The two
overlap on shared language courses (`c-mono-*`).

- **Calls:** about 31,000 (115 plan files plus one per exercise).
- **Size:** about 150 MB of JSON. Sampled average is 4.9 KB per exercise
  file, from 1,493 exercises in two plans.
- **Time:** depends on the delay between requests. 3 s gives about 26 hours,
  1 s about 9 hours, 0.5 s about 4.5 hours. These are CDN-cached static
  files, but the brief asks for human pace.
- **Media is not in this estimate.** Audio clips and images are separate
  files, listed per exercise in `mediaFiles`. Step 1d spot-downloads a few
  lessons' worth only.

## Open questions for 1b

- Request delay: pick one of the options above.
- Whether to keep a resumable fetch log (fileId, etag, status, time) so a
  stopped crawl continues where it left off. Recommended.
- Whether to also save the six outdated plans' files for completeness.
