# Catalogue

Every captured lesson in one structure: source, curriculum, subject, grade,
topic, lesson. Each lesson row carries its exercise types (named per
../taxonomy.md), item count, whether media was captured, and the path to its
raw files in the source folder.

Generated, never hand-edited:

- catalogue.db: SQLite, the source of truth, built by a script from the
  source folders' raw data.
- Markdown views, one per source, curriculum and subject, generated from
  catalogue.db.

Not built yet. The build script comes after Anton Phase 1 steps 1b and 1c.
