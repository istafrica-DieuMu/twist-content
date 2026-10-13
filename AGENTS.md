# Schoolido R&D

Research for Schoolido, kept separate from schoolido-learning. This folder is
one git repo.

## Layout

- **Source folders** (`anton/`, `official-de/`, `official-gb/`): everything captured from one source,
  isolated in its own folder: raw data, media, screenshots, and notes specific
  to that source. Nothing from a scrape lives outside its source folder.
- **Root outputs**: what we make from the captured data. These can draw on
  more than one source.
  - README.md: entry point.
  - FINDINGS.md: the findings register.
  - taxonomy.md: shared names for exercise types and lesson mechanics.
  - catalogue/: the content catalogue, generated from source data.
  - anatomy.md: Twist and each source's lesson structure side by side.
  - crosswalk/: source content mapped to Schoolido modules, and
    anton-twist-de.md, built by `node crosswalk/anton-twist.mjs` from
    anton-twist-de.rules.yaml (edit the rules, never the .md).
  - Phase 3 analyses: type-gaps.md, mechanics-benchmark.md, calibration.md,
    media-benchmark.md, reference-set.md, german-insight.md.
  - site/: one interactive page over the docs and captures. index.html is
    a standalone page, tracked in git; dist/artifact.html is the same page
    as a fragment for the claude.ai publisher, gitignored. Edit build.mjs or
    template.html, then run `node site/build.mjs`; never edit the outputs by
    hand. Rebuild after each capture step.
  - twist/: the clean Twist curriculum, competency first, with two
    curricula for now (de-DE and en-GB) on one shared library: stages,
    frameworks, competencies, lessons, profiles, and generated views.
    Only our own content goes in; research inputs stay outside it.
    PLAN.md holds the steps; twist/AGENTS.md adds its own rules.
    views/tracking.md tracks progress per curriculum, year and topic
    and the OpenRouter cost of pictures and narration; build.mjs writes
    it, and `node twist/tracking.mjs --live` adds what the key has spent.
  - review/: the Twist Germany readiness review, one page built from
    de-launch-review.json (de-launch-review.v1.json is the earlier draft).
    Same output layout as site/: index.html tracked, dist/ gitignored.
    Edit the JSON or template.html, then run `node review/build.mjs`; never
    edit the outputs by hand. The build refuses data that mentions Anton's
    internal course ids or exercise-type names.
  - player/: the twist/ model lessons rendered in a phone frame, with the
    pictures, drawn components and narration, to see how a lesson renders.
    Edit build.mjs or template.html, then run `node player/build.mjs`;
    never edit index.html by hand. It reads the lesson records directly
    and plays the audio from twist/assets/narration/, which is not in git
    (remake it with twist/assets/tools/narration.py).
  - handoff/: the Twist curriculum handoff to the backend, mobile app and
    parent dashboard teams (IST-B2C/backend, ist-schoolido,
    IST-B2C/Parent-dashboard). index.html is a standalone page, written by
    hand, tracked in git; a copy is published as a claude.ai artifact.
    Update it by hand when twist/ changes what those teams build, and keep
    the published copy in step.
  - Add other outputs at the root as needed, and list them here and in
    README.md.

## Rules for every agent session here

- **Keep everything.** Never delete, move out, overwrite or "clean up" any
  captured file in a source folder. This includes temporary-looking files
  such as Playwright snapshots and console logs. If disk space or duplicates
  become a problem, stop and ask.
- **Generated outputs are rebuilt, never hand-edited.** catalogue/ is built
  by a script from source data; change the script, not the output.
- **Every finding links to evidence.** A FINDINGS.md row points at the source
  files it rests on.
- **Never write into schoolido-learning.** Reading it for comparison is fine.

Source-specific rules live in each source folder's AGENTS.md.
