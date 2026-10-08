# Anton R&D crawl brief: Phase 1 (English-GB and German-DE)

See PHASES.md for where this phase fits. Phase 1 runs as the sub-steps 1a to
1e listed there; stop at the 1a gate before the full crawl.

R&D crawl of anton.app with the Playwright MCP (persistent profile at
~/.cache/anton-playwright-profile). I'm allowed to view and keep everything
on this account.

## Goal

Gather all the information Anton has, as deep and as broad as we can get it,
and keep all of it organized so we can study it later without re-crawling.

## Scope

Phase 1 covers two curricula completely: English-GB (UK) and German-DE. That
means every subject, every grade or year, every topic, chapter and lesson
those two curricula offer.

Out of scope for now, planned as Phase 2: French, English-US, Spanish.

## Output folder

~/ist/b2c/rnd/anton/ (its own git repo, outside schoolido-learning). Never
write into schoolido-learning.

## Keep rule

Never delete, move out, or overwrite anything you capture. No "cleanup". If
disk space or duplicates become a problem, stop and ask.

## Layout

    api/          raw JSON responses, one file per call, named by endpoint path
    media/        spot-downloaded media packs (gitignored, kept on disk)
    screenshots/  per exercise type and per lesson stage
    snapshots/    Playwright page snapshots and console logs
    notes/        analysis docs (below)
    index.md      what was captured, when, and where it lives

## Steps

1. Open https://anton.app headed. I sign in.
2. Find the JSON API behind the course tree and lessons. Save every response
   to api/ on first fetch so nothing ever needs fetching twice.
3. Subject list: every subject in English-GB and German-DE, with grades.
4. For each subject: the full tree (grades, topics, chapters, lessons) and
   every lesson's content (questions, answers, hints, feedback text, audio
   and image references).
5. Media: spot-download a few complete media packs (all audio and images of a
   lesson) for lessons spread across different subjects and grades, in both
   curricula. Record which lessons were picked and why in index.md.
6. Exercise types: play whole exercises across different lessons until every
   type is covered. Screenshot each type's start, interaction and feedback.
7. Lesson mechanics: items per lesson, sequencing (intro, practice, test),
   retry and mastery rules, hints, feedback, rewards, progression, streaks.
8. Pace: human speed, no parallel tabs, no bot-detection workarounds. Stop and
   tell me on paywall, captcha or rate limit.

## Notes to write in notes/

- subjects.md: subject and grade inventory per curriculum
- topic-maps.md: full tree per subject and grade
- exercise-types.md: inventory, frequency, how each type works, compared with
  the schemas in schoolido-learning/schemas/question-types/
- lesson-mechanics.md: the step 7 findings
- api.md: endpoint shapes and how content is structured
- usefulness.md: where each finding can feed Schoolido work

## Progress

Commit in the R&D repo after each subject. Update me in short lines as you
go. Report crawl progress and cost at each subject boundary.
