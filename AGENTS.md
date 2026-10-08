# Schoolido R&D

Research for Schoolido, kept separate from schoolido-learning. This folder is
one git repo.

## Layout

- **Source folders** (`anton/` today): everything captured from one source,
  isolated in its own folder: raw data, media, screenshots, and notes specific
  to that source. Nothing from a scrape lives outside its source folder.
- **Root outputs**: what we make from the captured data. These can draw on
  more than one source.
  - README.md: entry point.
  - FINDINGS.md: the findings register.
  - taxonomy.md: shared names for exercise types and lesson mechanics.
  - catalogue/: the content catalogue, generated from source data.
  - crosswalk/: source content mapped to Schoolido modules.
  - site/: one interactive page over the docs and captures. index.html is
    a standalone page, tracked in git; dist/artifact.html is the same page
    as a fragment for the claude.ai publisher, gitignored. Edit build.mjs or
    template.html, then run `node site/build.mjs`; never edit the outputs by
    hand. Rebuild after each capture step.
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
