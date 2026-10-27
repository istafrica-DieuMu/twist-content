// The animated badges: one folder a badge in assets/badges/<Name>/, its name the badge's
// English name written any way ("come back Kid" is comeback-kid), holding an SVG that plays
// its intro and then loops (*-animated.svg) and the WAV that starts with it. A badge with a
// folder has no drawn art in assets/badges (assets/tools/badges.mjs leaves it out); its still,
// for the small places, is assets/badges/stills/<id>.png (assets/tools/badge-stills.cjs).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const T = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BADGES = join(T, "assets/badges");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const flat = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Every badge's id, from the EN column of the tables in docs/rewards.md.
export function badgeIds() {
  const ids = new Set(), md = readFileSync(join(T, "docs/rewards.md"), "utf8").split("\n");
  let col = -1;
  for (const line of md) {
    if (!line.startsWith("|")) { col = -1; continue; }
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    if (col < 0) { col = cells.indexOf("EN"); continue; }
    if (/^:?-+:?$/.test(cells[0])) continue;
    if (cells[col]) ids.add(slug(cells[col]));
  }
  return [...ids];
}

// The badge folders: { id, dir, svg, wav, still } (files by name, still a path from
// assets/badges or null), and the folders whose name is no badge.
export function badgeFolders() {
  const ids = badgeIds(), found = [], unknown = [];
  for (const d of readdirSync(BADGES, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name === "stills") continue;
    const files = readdirSync(join(BADGES, d.name)), svg = files.find((f) => f.endsWith("-animated.svg"));
    if (!svg) continue;
    const id = ids.find((x) => flat(x) === flat(d.name));
    if (!id) { unknown.push(d.name); continue; }
    found.push({ id, dir: d.name, svg, wav: files.find((f) => f.endsWith(".wav")) ?? null, still: existsSync(join(BADGES, "stills", `${id}.png`)) ? `stills/${id}.png` : null });
  }
  return { found, unknown };
}
