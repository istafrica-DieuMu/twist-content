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
| Joined handwriting scripts (app and backend) | twist/docs/handwriting-scripts.md |
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

4. **Audio.** The narration clips are in git (about 3 GB, in
   `twist/assets/narration/<voice>/`), so a clone plays with sound; the
   first clone takes a while. After a content change, make the clips for
   the new lines, then commit them:

   ```
   python3 -m venv twist/.venv
   twist/.venv/bin/pip install pyyaml pillow
   export OPENROUTER_API_KEY=...        # or OPENROUTER_AUTHORING_API_KEY in ../schoolido-learning/.env
   twist/.venv/bin/python twist/assets/tools/narration.py --voice all --jobs 40
   ```

   The tool makes only the clips that are missing, so after a content
   change it records just the new lines. Rebuild the player afterwards
   (step 2). Making every clip from nothing would take several hours and
   about $180 on OpenRouter (see twist/views/tracking.md).

## Serve the player on a server

The full runbook for the host (deploy key, systemd, Caddy or nginx, checks,
updates, troubleshooting) is `twist/pages/hosting/index.html`. In short:

`twist/serve.mjs` serves the player with its Practice, Drawings and Task
types tabs from a clone, to people signed in with their own account, who
can pin feedback to any app screen (`twist/docs/feedback.md`). It needs only
Node 22 or newer;
no npm install, no build: the built player, the pictures and the narration
are all in the repo.

1. **Clone** (about 3.4 GB of files; `--depth 1` skips the history):

   ```
   git clone --depth 1 git@github.com:istafrica-DieuMu/twist-content.git
   ```

2. **Run.** `TWIST_USER` and `TWIST_PASS` make the first admin while there
   are no accounts yet; that admin adds everyone else on the Users tab:

   ```
   cd twist-content
   TWIST_USER=you@ist.com TWIST_PASS='a long password' PORT=8080 node twist/serve.mjs
   ```

   Accounts and feedback are kept in `.twist-data/` (`TWIST_DATA` moves it;
   not in git). With `TWIST_API_URL` set they live on the IST-B2C backend
   instead, once it has the endpoints in `twist/docs/feedback-backend.md`.

   It listens on 127.0.0.1 only; `HOST=0.0.0.0` opens it to the network
   (only behind a firewall that keeps the port closed to the outside).

   Or in Docker, with the settings in `.env.player` (`TWIST_USER`,
   `TWIST_PASS`, optional `TWIST_API_URL` and `PLAYER_PORT`, default 4410;
   not in git); `.twist-data/` next to it is mounted for the accounts:

   ```
   docker compose -p twist-player -f docker-compose.player.yml --env-file .env.player up -d
   ```

   The `Makefile` wraps it: `make help` lists `player-up`, `player-down`,
   `player-restart`, `player-logs`, `player-ps`, `player-check` and
   `player-deploy` (pull `main`, restart only when needed, check). It uses
   `docker-compose`; elsewhere add `COMPOSE="docker compose"`. On every push
   to `main`, `.github/workflows/deploy-player.yml` runs `make player-deploy`
   on the dev server.

   `/` opens the player. Only `twist/pages/` and `twist/assets/` are
   served; lesson files and the rest of the repo are not.

3. **Put HTTPS in front.** The session cookie and the sign-in form must not
   travel in clear text, so serve it through a reverse proxy with a
   certificate (Caddy: `twist.example.org { reverse_proxy localhost:8080 }`)
   and set `COOKIE_SECURE=1` (the Docker setup does).

4. **Keep it running** with systemd or a process manager, with the
   variables in its environment, not in the repo. Back up `.twist-data/`.
   Sessions live in memory: a restart signs everyone out.

5. **Update:** `git pull` (or a fresh shallow clone) and restart. The built
   player is committed, so there is nothing to build on the server.
