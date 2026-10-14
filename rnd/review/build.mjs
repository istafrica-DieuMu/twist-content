// Builds the Germany readiness review page from de-launch-review.json.
//   node review/build.mjs   (from the rnd root)
// Outputs: review/index.html (standalone page) and review/dist/artifact.html
// (fragment for the claude.ai publisher, gitignored with site/dist).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(DIR, "de-launch-review.json"), "utf8"));
// Anton may be named; its internal course ids and exercise-type names stay out.
const banned = /c-natdeu|c-mat-|c-nateng|gapMulti|wordSlice|findAll/;
const hit = JSON.stringify(data).match(banned);
if (hit) { console.error(`Refusing to build: review data mentions "${hit[0]}". Internal benchmark ids do not belong in the review.`); process.exit(1); }
const json = JSON.stringify(data).replace(/</g, "\\u003c");
const fragment = readFileSync(join(DIR, "template.html"), "utf8").replace("/*DATA*/null", () => json);
const cut = fragment.indexOf("</style>") + "</style>".length;
const page = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  fragment.slice(0, cut) + "\n</head>\n<body>\n" + fragment.slice(cut) + "\n</body>\n</html>\n";
writeFileSync(join(DIR, "index.html"), page);
mkdirSync(join(DIR, "dist"), { recursive: true });
writeFileSync(join(DIR, "dist/artifact.html"), fragment);
console.log(`review/index.html: ${data.areas.length} areas, verdict "${data.verdict.label}" ${data.verdict.score}/100`);
