// Fetches Anton content files into api/, politely and resumably.
//
//   node tools/fetch.mjs plans [--delay 1.5] [--include-outdated]
//   node tools/fetch.mjs levels <list.txt> [--delay 1]
//
// "plans" fetches plan/<project> for every plan listed in English-GB or German.
// "levels" fetches the level fileIds listed one per line in <list.txt>.
//
// Keep rule: a file that already exists is never refetched or overwritten.
// Every request is appended to api/fetch-log.jsonl, so a stopped run resumes.

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ANTON = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = join(ANTON, "api");
const LOG = join(API, "fetch-log.jsonl");
const BASE = "https://content.anton.app/files/";

const args = process.argv.slice(2);
const mode = args[0];
const flag = (name, def) => {
  const i = args.indexOf(name);
  return i === -1 ? def : args[i + 1];
};
const delayMs = Math.round(parseFloat(flag("--delay", mode === "plans" ? "1.5" : "1")) * 1000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function targets() {
  if (mode === "plans") {
    const plans = JSON.parse(readFileSync(join(API, "list/plans.json"), "utf8")).plans;
    return plans
      .filter((p) => !p.isDebug && (p.guiLanguages || []).some((l) => l === "en_gb" || l === "de"))
      .filter((p) => args.includes("--include-outdated") || !p.isOutdated)
      .map((p) => ({ fileId: p.fileId, etag: p.etag, out: join(API, "plan", p.project + ".json") }));
  }
  if (mode === "levels") {
    return readFileSync(args[1], "utf8").split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
      const [fileId, etag] = line.split(/\s+/);
      return { fileId, etag, out: join(API, fileId + ".json") };
    });
  }
  console.error("usage: node tools/fetch.mjs plans|levels <list.txt> [--delay s]");
  process.exit(2);
}

const list = targets();
let fetched = 0, skipped = 0, failed = 0, bytes = 0, netFails = 0;
const started = Date.now();
// Graceful stop: create tools/STOP and the run ends after the file in flight.
const STOP = join(ANTON, "tools", "STOP");
for (const t of list) {
  if (existsSync(STOP)) { console.log("Stopped: tools/STOP exists. Delete it to allow runs again."); break; }
  if (existsSync(t.out)) { skipped++; continue; }
  const url = `${BASE}?fileId=${encodeURIComponent(t.fileId)}&etag=${encodeURIComponent(t.etag || "latest")}`;
  let status = 0, size = 0, error = null;
  try {
    const res = await fetch(url);
    status = res.status;
    const body = Buffer.from(await res.arrayBuffer());
    size = body.length;
    if (res.ok) {
      mkdirSync(dirname(t.out), { recursive: true });
      writeFileSync(t.out, body);
      fetched++; bytes += size;
    } else {
      failed++;
    }
  } catch (e) {
    error = String(e); failed++;
  }
  appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), fileId: t.fileId, etag: t.etag, status, size, error }) + "\n");
  const n = fetched + failed;
  if (n % 25 === 0) console.log(`${n}/${list.length - skipped} done, ${failed} failed, ${(bytes / 1e6).toFixed(1)} MB`);
  if (status === 429 || status === 403) { console.log(`Stopped: HTTP ${status}. Check before resuming.`); break; }
  // A run of network errors means the connection is bad: stop rather than crawl on. Rerun to resume.
  netFails = error ? netFails + 1 : 0;
  if (netFails >= 10) { console.log("Stopped: 10 network errors in a row. Check the connection, then rerun."); break; }
  await sleep(delayMs);
}
console.log(`fetched ${fetched}, skipped ${skipped} existing, failed ${failed}, ${(bytes / 1e6).toFixed(1)} MB in ${Math.round((Date.now() - started) / 1000)} s`);
