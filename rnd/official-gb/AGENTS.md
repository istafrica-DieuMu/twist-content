# official-gb source folder

Official curriculum documents for England: the National Curriculum
programmes of study (DfE) and the EYFS statutory framework. Crown copyright,
reused under the Open Government Licence. The repo-wide rules in
../AGENTS.md apply, the keep rule above all.

- One subfolder per issuer: dfe/ (National Curriculum), eyfs/ (EYFS). Each
  holds raw/ (the documents as downloaded) and text/ (pdftotext -layout).
- Every download is appended to fetch-log.jsonl with URL, file, size and
  sha256. Never refetch over a saved file; a new version gets a new name.
- tools/nc-pos.mjs turns a text into a framework file in
  ../twist/frameworks/gb/. Those files are generated: change the extractor,
  never the YAML. Fixes for stacked fractions and superscripts are listed in
  the extractor and marked `fixed: true` on the objective.
- Not extracted yet: English Appendix 1 (spelling rules and word lists) and
  Appendix 2 tables (grammar by year). The programme of study bullets that
  point to them are mapped.
