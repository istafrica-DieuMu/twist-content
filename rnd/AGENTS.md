# rnd: research for Twist

Everything here is research input, kept apart from the content in ../twist/.
The root AGENTS.md rules apply.

## Layout

- **Source folders** (`anton/`, `official-de/`, `official-gb/`): everything
  captured from one source, isolated in its own folder: raw data, media,
  screenshots, and notes specific to that source. Nothing from a scrape
  lives outside its source folder. Source-specific rules live in each source
  folder's AGENTS.md. The official-de and official-gb tools write the quoted
  standards into ../twist/frameworks/.
- **Outputs made from the captures:**
  - README.md: entry point to the research.
  - FINDINGS.md: the findings register. Every finding links to evidence.
  - taxonomy.md: shared names for exercise types and lesson mechanics.
  - anatomy.md: Twist and each source's lesson structure side by side.
  - Analyses: type-gaps.md, mechanics-benchmark.md, calibration.md,
    media-benchmark.md, reference-set.md, german-insight.md.
  - catalogue/: the content catalogue, generated from source data by
    `node rnd/catalogue/build.mjs`.
  - crosswalk/: source content mapped to Schoolido modules, and
    anton-twist-de.md, built by `node rnd/crosswalk/anton-twist.mjs` from
    anton-twist-de.rules.yaml (edit the rules, never the .md).
  - site/: the research page over the docs and captures. Edit build.mjs or
    template.html, then run `node rnd/site/build.mjs`; never edit the
    outputs by hand.
  - review/: the Twist Germany readiness review, one page built from
    de-launch-review.json. Edit the JSON or template.html, then run
    `node rnd/review/build.mjs`. The build refuses data that mentions
    Anton's internal course ids or exercise-type names.

## Rules

- **Keep everything.** Never delete, move out, overwrite or "clean up" any
  captured file in a source folder. This includes temporary-looking files
  such as Playwright snapshots and console logs. If disk space or duplicates
  become a problem, stop and ask.
- **Generated outputs are rebuilt, never hand-edited.**
- **Every finding links to evidence.** A FINDINGS.md row points at the
  source files it rests on.
