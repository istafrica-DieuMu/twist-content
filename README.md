# Schoolido R&D

Research for Schoolido, separate from the schoolido-learning content repo.

## Sources

| Source | Folder | Status |
|--------|--------|--------|
| Official German curricula (KMK, NRW, Bayern, Baden-Württemberg, Berlin/Brandenburg) | [official-de/](official-de/) | KMK Mathe, Deutsch and Fremdsprachen captured and extracted into twist/frameworks/de/; Land Lehrpläne captured as reference. |
| Official curriculum for England (National Curriculum, EYFS) | [official-gb/](official-gb/) | Maths, English and languages programmes of study and EYFS 2026 captured and extracted into twist/frameworks/gb/. |
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
| [crosswalk/](crosswalk/) | Source topics and lessons mapped to Schoolido modules, with match quality; anton-twist-de.md maps every Anton German-DE primary lesson onto the new twist/ curriculum. |
| [site/](site/) | One interactive page over all of the above. Open `site/index.html` in a browser; it is a standalone file with all data embedded. `node site/build.mjs` regenerates it from the docs, the catalogue and what is on disk. |
| [twist/](twist/) | The clean Twist primary curriculum, competency first: stages, frameworks, competencies, lessons, curriculum profiles and generated grade views. Only our own content; research inputs stay outside it. Plan: [twist/PLAN.md](twist/PLAN.md). Progress per curriculum, year and topic, with what has been generated and its OpenRouter cost: [twist/views/tracking.md](twist/views/tracking.md). |
| [player/](player/) | The de-DE model lessons rendered in a phone frame with pictures, drawn components and narration, to see how lessons render. Open `player/index.html`; `node player/build.mjs` regenerates it from the twist/ records. Audio needs `twist/assets/tools/narration.py` run first. |
| [review/](review/) | Twist Germany readiness review: verdict, area scores, launch conditions and beta gate. Open `review/index.html`; `node review/build.mjs` regenerates it from `review/de-launch-review.json`. |
| [handoff/](handoff/) | Handoff of the new Twist curriculum model to the backend API, mobile app and parent dashboard teams: the lesson chain, mastery, curricula and standards, task types for the player, dashboard options, and work per team. Open `handoff/index.html`. Written by hand on 2026-10-13 from twist/ and a read of the three repos; update it by hand when twist/ changes what those teams build. |
| [types/](types/) | Every Twist task type with its screen, behaviour, marking and record fields: shots from the player for the 15 built types, mocks for the 12 still to build and for new options. Open `types/index.html`; `node types/shots.cjs` retakes the shots (needs Playwright). Written by hand; keep it in step with twist/docs/task-types.md. |

Rules for agents working here: [AGENTS.md](AGENTS.md).
