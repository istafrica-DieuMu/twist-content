# official-de source folder

Official German curriculum documents: KMK Bildungsstandards and the Länder
Lehrpläne. The repo-wide rules in ../AGENTS.md apply, the keep rule above
all.

- One subfolder per issuer: kmk/, nrw/, by/, bw/, bebb/. Each holds raw/
  (the documents as downloaded) and text/ (pdftotext -layout output).
- Every download is appended to fetch-log.jsonl with URL, file, size and
  sha256. Never refetch over a saved file; a new version gets a new name.
- tools/ holds the extractors that turn a text into a framework file in
  ../twist/frameworks/de/. Those files are generated: change the extractor,
  never the YAML.
