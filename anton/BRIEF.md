# Anton R&D crawl brief: Phase 1 (English-GB and German-DE)

See PHASES.md for where this phase fits. Phase 1 runs as the layered steps
1a to 1h listed there, cheapest first; 1f to 1h are optional.

R&D capture of anton.app. Course and exercise content comes from Anton's
public content CDN with tools/fetch.mjs (see notes/api.md). The browser pass
(1d) uses the Playwright MCP with the persistent profile at
~/.cache/anton-playwright-profile. I'm allowed to view and keep everything
on this account.

## Goal

Gather all the information Anton has, as deep and as broad as we can get it,
and keep all of it organized so we can study it later without re-crawling.

## Scope

Phase 1 covers two curricula completely: English-GB (UK) and German-DE. That
means every subject, every grade or year, every topic, chapter and lesson
those two curricula offer. No grade cap: not limited to our G1 to G4 or to
primary school. For English-GB that is Reception through KS3 and beyond if
offered; for German-DE every Klasse offered, plus every DaZ course and level.

## Start from the prior baseline

notes/prior/2026-10-07-anton-curriculum-research.md survives from the first
crawl. It lists the content endpoint, the plan index (list/plans) and plan ids
such as c-nateng-1-gb and c-natdeu-1. Step 1a starts from these instead of
rediscovering them, and uses its per-grade lesson and exercise counts as a
check on the full crawl. It only covered UK Reception to Year 5 and Deutsch
Klasse 1 to 4, from sampled pages, so it is a floor, not the full picture.

Out of scope for now, planned as Phase 2: French, English-US, Spanish.

## Output folder

~/ist/b2c/rnd/anton/, the Anton source folder inside the rnd repo. All raw
captures and Anton-specific notes stay in this folder. Findings and shared
names go to the rnd root (see "Root outputs" below). Never write into
schoolido-learning.

## Keep rule

Never delete, move out, or overwrite anything you capture. No "cleanup". If
disk space or duplicates become a problem, stop and ask.

## Layout

    api/          raw JSON responses, one file per call, named by endpoint path
    media/        spot-downloaded media packs (gitignored, kept on disk)
    screenshots/  per exercise type and per lesson stage
    snapshots/    Playwright page snapshots and console logs
    notes/        analysis docs (below)
    index.md      what was captured, when, and where it lives. Starts with a
                  "## Status" section, one line per step: "1a: done",
                  "1b: in progress", and so on. The R&D page reads these.

## Steps

1. Structure (1b): fetch every course file listed in English-GB or German
   with `node tools/fetch.mjs plans --include-outdated`, then rebuild the
   catalogue with `node catalogue/build.mjs` from the rnd root.
2. Text sample (1c): fetch the list in tools/lists/sample-1c.txt with
   `node tools/fetch.mjs levels tools/lists/sample-1c.txt`. Rerun the same
   command to retry failures; existing files are skipped. Rebuild the
   catalogue, then fill ../taxonomy.md from the trainer counts.
3. Browser pass (1d): open https://anton.app headed; I sign in. Play one
   exercise per trainer type in the taxonomy. Screenshot each type's start,
   interaction and feedback into screenshots/. Record items per lesson,
   sequencing, retry and mastery rules, hints, feedback, rewards,
   progression and streaks.
4. Full text, images, audio (1f to 1h): only when asked, in the priority
   order in PHASES.md. Record every chunk and media pack in index.md.
5. Pace: a fixed delay between requests (1 s for exercise files), no
   parallel requests, no bot-detection workarounds. Stop and tell me on
   HTTP 403 or 429, a paywall or a captcha.

## Notes to write in notes/

- subjects.md: subject and grade inventory per curriculum
- topic-maps.md: full tree per subject and grade
- exercise-types.md: inventory, frequency, how each type works, compared with
  the schemas in schoolido-learning/schemas/question-types/
- lesson-mechanics.md: the step 7 findings
- api.md: endpoint shapes and how content is structured
- usefulness.md: where each finding can feed Schoolido work

## Root outputs (in ~/ist/b2c/rnd/)

- FINDINGS.md: add one row per finding during 1e, source "anton", each with
  links to the evidence in this folder.
- taxonomy.md: exercise-type table from the 1c trainer counts; lesson-mechanics
  table after 1d.
- catalogue/: built in 1b, rebuilt after every capture step.
- crosswalk/: built in Phase 3.

## Progress

Commit in the rnd repo after each subject. After each step, update the Status
lines in index.md and run `node site/build.mjs` from the rnd root. Update me in short lines as you
go. Report crawl progress and cost at each subject boundary.
