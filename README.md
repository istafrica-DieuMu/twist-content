# Schoolido R&D

Research for Schoolido, separate from the schoolido-learning content repo.

## Sources

| Source | Folder | Status |
|--------|--------|--------|
| Anton (anton.app) | [anton/](anton/) | Phase 1 planned: all of English-GB and German-DE. See [anton/PHASES.md](anton/PHASES.md). |

Each source keeps its raw captures and source-specific notes in its own
folder.

## Outputs

| Output | What it holds |
|--------|---------------|
| [FINDINGS.md](FINDINGS.md) | What we learned, one row per finding, each linked to evidence and to where it was used. |
| [taxonomy.md](taxonomy.md) | Shared names for exercise types and lesson mechanics, mapped to Schoolido's question types. |
| [catalogue/](catalogue/) | Every captured curriculum, subject, grade, topic and lesson, generated from source data. |
| [anatomy.md](anatomy.md) | Twist and Anton lesson structure side by side: each level, its size, and what each product calls it. |
| [crosswalk/](crosswalk/) | Source topics and lessons mapped to Schoolido modules, with match quality. |
| [site/](site/) | One interactive page over all of the above. Open `site/index.html` in a browser; it is a standalone file with all data embedded. `node site/build.mjs` regenerates it from the docs, the catalogue and what is on disk. |

Rules for agents working here: [AGENTS.md](AGENTS.md).
