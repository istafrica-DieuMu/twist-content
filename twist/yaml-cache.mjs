// Big generated YAML (the narration lines and voice logs, tens of MB) parses
// slowly; keep a JSON copy in .venv/cache, used while the file's size and
// modification time are unchanged.
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const T = dirname(fileURLToPath(import.meta.url));
const DIR = join(T, ".venv", "cache");
const seen = new Map();

export function loadBig(path) {
  if (!existsSync(path)) return null;
  const st = statSync(path), stamp = `${st.size}:${st.mtimeMs}`;
  if (seen.get(path)?.stamp === stamp) return seen.get(path).data;
  const cache = join(DIR, relative(T, path).replace(/[\/\\]/g, "__") + ".json");
  let data;
  try { const c = JSON.parse(readFileSync(cache, "utf8")); if (c.stamp === stamp) data = c.data; } catch {}
  if (data === undefined) {
    data = YAML.parse(readFileSync(path, "utf8"));
    try { mkdirSync(DIR, { recursive: true }); writeFileSync(cache, JSON.stringify({ stamp, data })); } catch {}
  }
  seen.set(path, { stamp, data });
  return data;
}
