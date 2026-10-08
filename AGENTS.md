# Anton R&D

This folder holds everything captured from anton.app for Schoolido research.
It is its own git repo and is separate from schoolido-learning.

## Rules for every agent session here

- **Keep everything.** Never delete, move out, overwrite or "clean up" any
  captured file (api/, media/, screenshots/, snapshots/, notes/). This
  includes temporary-looking files such as Playwright snapshots and console
  logs. If disk space or duplicates become a problem, stop and ask.
- **Never write into schoolido-learning.** Reading it for comparison is fine.
- **One browser at a time.** The Playwright profile at
  ~/.cache/anton-playwright-profile is shared between Claude Code and Codex.
  Do not run a crawl while another agent has the browser open.
- **Save before you parse.** Write every API response to api/ on first fetch,
  so nothing ever needs fetching twice.

## Where to start

- PHASES.md: the phase plan and what each phase delivers.
- BRIEF.md: the instructions for the current phase (Phase 1).
- index.md: what has been captured so far (created by the first crawl).
