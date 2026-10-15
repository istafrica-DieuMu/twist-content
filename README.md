# Twist content

The Twist primary curriculum and the research behind it.

**Start with the site:** open `twist/pages/site/index.html`. It explains how
the content works and fits together: the chain from curriculum to task, the
curricula year by year with every skill and its lessons, the task types and
components, the reviews and the R&D.

## Find a lesson

Lessons are filed the way the curriculum places them:

```
twist/lessons/<curriculum>/<year>/<subject>/<skill>.yaml
twist/lessons/de-DE/klasse-1/math/count-to-5.yaml
twist/lessons/de-DE/klasse-3/lit-de/long-i.yaml
twist/lessons/de-DE/lernjahr-1/fl/en-weather.yaml
```

| Curriculum | Years | Subjects (folder) |
|---|---|---|
| de-DE | klasse-1 to klasse-4; stufe-0, lernjahr-1, lernjahr-2 for Englisch | Mathe (math), Deutsch (lit-de), Englisch (fl) |
| en-GB | reception, year-1 to year-6; ly-1 to ly-4 for French | Maths (math), English (lit-en), French (fl) |

- The whole course as authored, with every lesson's file:
  `twist/views/course-de-DE.md` (and course-en-GB.md).
- Play a lesson: `twist/pages/player/index.html`.
- What each year places: `twist/curricula/de-DE.yaml`.

## Quick reference

| What | Where |
|---|---|
| How a lesson is built, mastery, authoring checks | twist/docs/lesson-anatomy.md |
| Records and ids | twist/docs/model.md |
| Task types | twist/docs/task-types.md |
| Skills ("Ich kann") | twist/competencies/ |
| Pictures, drawn components, sounds | twist/assets/ |
| Progress, cost, reviews, open points | twist/views/tracking.md |
| Plan | twist/PLAN.md |
| Research | rnd/ |

## Build

```
node twist/build.mjs                 # check every record, write twist/views/
node twist/pages/site/build.mjs      # the site
node twist/pages/player/build.mjs    # the lesson player
```

## Run the lesson player locally

The player is one page, `twist/pages/player/index.html`, built from the
lesson records. It runs straight from disk in Chrome or Safari; no server
is needed.

1. **Get the repo and Node.** Node 22 or newer. Install the one dependency:

   ```
   cd twist && npm install && cd ..
   ```

2. **Build it** after any change to lessons, assets or the player:

   ```
   node twist/build.mjs                 # checks every record; fix any error first
                                        # (without the audio it warns "no audio yet"; that is fine)
   node twist/pages/player/build.mjs    # writes twist/pages/player/index.html
   ```

   The player build stops if a spoken line is not in
   `twist/assets/narration/lines.yaml` yet (new or changed text). Narrate it
   (step 4), or write a test copy without that audio:
   `node twist/pages/player/build.mjs --draft /tmp/player.html`.

3. **Open it:** `open twist/pages/player/index.html` (macOS), or drag the
   file into the browser. Choose a lesson with the button in the top bar;
   arrow keys step through it. The pictures and the mascot come from
   `twist/assets/` in the same clone.

4. **Audio.** The narration clips (about 3 GB, in
   `twist/assets/narration/<voice>/`) are not in git; without them the
   player runs silently. Either copy the `narration` folder from someone who
   has it into `twist/assets/narration/`, or make the clips:

   ```
   python3 -m venv twist/.venv
   twist/.venv/bin/pip install pyyaml pillow
   export OPENROUTER_API_KEY=...        # or OPENROUTER_AUTHORING_API_KEY in ../schoolido-learning/.env
   twist/.venv/bin/python twist/assets/tools/narration.py --voice all --jobs 40
   ```

   The tool makes only the clips that are missing, so after a content
   change it records just the new lines. Rebuild the player afterwards
   (step 2). Making every clip from nothing takes several hours and about
   $180 on OpenRouter (see twist/views/tracking.md); copying the folder is
   the quick way.
