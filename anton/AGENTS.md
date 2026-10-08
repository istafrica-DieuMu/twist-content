# Anton source folder

Everything captured from anton.app. The repo-wide rules in ../AGENTS.md apply
here too, the keep rule above all.

## Anton-specific rules

- **One browser at a time.** The Playwright profile at
  ~/.cache/anton-playwright-profile is shared between Claude Code and Codex.
  Do not run a crawl while another agent has the browser open.
- **Save before you parse.** Write every API response to api/ on first fetch,
  so nothing ever needs fetching twice.
- **Raw data stays here.** Findings go to ../FINDINGS.md, exercise-type names
  to ../taxonomy.md, and the catalogue and crosswalk are built into
  ../catalogue/ and ../crosswalk/. Each links back to files in this folder.

## Where to start

- PHASES.md: the phase plan and what each phase delivers.
- BRIEF.md: the instructions for the current phase (Phase 1).
- index.md: what has been captured so far (created by the first crawl).
- notes/prior/: the two notes from the first crawl (2026-10-07), kept as the
  baseline. Read the header in each for what is outdated.
