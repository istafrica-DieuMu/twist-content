# Crosswalk

Source lessons mapped against Twist lessons, to find what is missing or
misplaced on either side.

## Inputs

- **Source side:** the catalogue (../catalogue/catalogue.db), built from the
  source folder's raw data.
- **Twist side:** the module catalogues in schoolido-learning, read only:
  `content/{en,de}/grade-{1..4}/{english,german,math}/module-catalog.md`
  (24 files: two LOIs, four grades, three subjects).

## Files

One file per source, Twist LOI and subject, for example anton-en-english.md,
anton-de-german.md, anton-en-math.md.

## What each file holds

1. **Grade alignment.** Which source grade matches which Twist grade, by age.
   Start from the age table in
   anton/notes/prior/2026-10-07-anton-curriculum-research.md.
2. **Matched lessons.** Source lesson, Twist module_id, match quality (exact
   or partial), source grade and Twist grade.
3. **Missing in Twist.** Source lessons with no Twist match, by grade.
4. **Missing in the source.** Twist lessons with no source match, by grade.
5. **Misplaced.** Matched lessons that sit in different grades on the two
   sides, either way: taught earlier in Twist, or taught earlier in the
   source. Give the grade gap.

Source lessons above Twist's G4 are listed under "Missing in Twist" with
their grade, as a view of where Twist's progression could lead.

Each row links to the source lesson's raw files and to the Twist catalogue
line. Findings worth acting on go to ../FINDINGS.md.

Not built yet. Comes after the catalogue exists (Anton Phase 3).
