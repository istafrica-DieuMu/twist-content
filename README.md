# Schoolido R&D

Research for Schoolido, separate from the schoolido-learning content repo.

## Sources

| Source | Folder | Status |
|--------|--------|--------|
| Anton (anton.app) | [anton/](anton/) | Phase 1 (capture of English-GB and German-DE) and Phase 3 (analyses) done 2026-10-09; Phase 2 not started. See [anton/PHASES.md](anton/PHASES.md). |

Each source keeps its raw captures and source-specific notes in its own
folder.

## Outputs

| Output | What it holds |
|--------|---------------|
| [FINDINGS.md](FINDINGS.md) | What we learned, one row per finding, each linked to evidence and to where it was used. |
| [taxonomy.md](taxonomy.md) | Shared names for exercise types and lesson mechanics, mapped to Schoolido's question types. |
| [catalogue/](catalogue/) | Every captured curriculum, subject, grade, topic and lesson, generated from source data. |
| [anatomy.md](anatomy.md) | Twist and Anton lesson structure side by side: each level, its size, and what each product calls it. |
| [type-gaps.md](type-gaps.md) | Anton interaction types Twist lacks, ranked by use, and the reverse. |
| [mechanics-benchmark.md](mechanics-benchmark.md) | How a learner moves through a lesson in each product, and what Twist could take. |
| [calibration.md](calibration.md) | Difficulty per grade: number ranges, sentence lengths, items per exercise. |
| [media-benchmark.md](media-benchmark.md) | Anton's pictures and audio against Twist's media rules. |
| [reference-set.md](reference-set.md) | Two representative Anton exercises per shared type, for the review app and AI reviewer. |
| [german-insight.md](german-insight.md) | How Anton sequences German, and options for the Twist German repair. |
| [crosswalk/](crosswalk/) | Source topics and lessons mapped to Schoolido modules, with match quality. |
| [site/](site/) | One interactive page over all of the above. Open `site/index.html` in a browser; it is a standalone file with all data embedded. `node site/build.mjs` regenerates it from the docs, the catalogue and what is on disk. |
| [review/](review/) | Twist Germany readiness review: verdict, area scores, launch conditions and beta gate. Open `review/index.html`; `node review/build.mjs` regenerates it from `review/de-launch-review.json`. |

Rules for agents working here: [AGENTS.md](AGENTS.md).
