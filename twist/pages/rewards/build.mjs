// Builds pages/rewards/index.html: stars and badges, from twist/docs/rewards.md.
// Never edit the output; edit the doc, this file or template.html and run
// `node twist/pages/rewards/build.mjs`.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const T = join(HERE, "..", "..");
const src = readFileSync(join(T, "docs/rewards.md"), "utf8").replace(/\r/g, "");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

// Blocks of one section: paragraphs, lists and tables, in order.
function blocks(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      out.push({ kind: "table", head: cells(rows[0]), rows: rows.slice(2).map(cells) });
      continue;
    }
    if (/^- /.test(l)) {
      const items = [];
      while (i < lines.length && (/^- /.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (/^- /.test(lines[i])) items.push(lines[i].slice(2)); else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      out.push({ kind: "list", items });
      continue;
    }
    const buf = []; while (i < lines.length && lines[i].trim() && !/^(\||- )/.test(lines[i])) buf.push(lines[i++]);
    out.push({ kind: "p", text: buf.join(" ") });
  }
  return out;
}

const parts = src.split(/\n(?=## )/);
const intro = blocks(parts[0].split("\n").slice(1));
const sections = parts.slice(1).map((s) => {
  const [title, ...rest] = s.split("\n");
  return { title: title.replace(/^##\s+/, ""), blocks: blocks(rest) };
});

// Each badge section gets its own colour; the page draws medals in it.
const HUES = { "Strand badges": "strand", Milestones: "mile", Remembering: "mem", Streaks: "streak", "Effort and curiosity": "effort" };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// The badge art from assets/badges (assets/tools/badges.mjs), inlined: the
// earned look, and the gold look it gets when every skill behind it is at Remembers it.
const art = (id, gold) => {
  const f = join(T, "assets/badges", `${id}${gold ? ".gold" : ""}.svg`);
  if (!existsSync(f)) throw new Error(`no badge art for ${id}: run assets/tools/badges.mjs`);
  return readFileSync(f, "utf8").trim().replace("<svg ", `<svg class="${gold ? "gold" : "art"}" aria-hidden="true" `);
};
const badgeId = (en) => en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function card(head, row, hue) {
  const en = row[head.indexOf("EN")], de = row[head.indexOf("DE")];
  const facts = head.map((h, k) => [h, row[k]]).filter(([h]) => !["EN", "DE", "Subject"].includes(h));
  return `<article class="badge">
    <div class="pics">${art(badgeId(en))}${art(badgeId(en), true)}</div>
    <div class="names"><h4>${inline(en)}</h4><p class="de" lang="de">${inline(de)}</p></div>
    <dl>${facts.map(([h, v]) => `<div><dt>${inline(h)}</dt><dd>${inline(v)}</dd></div>`).join("")}</dl>
  </article>`;
}

function table(b, hue) {
  if (b.head.includes("EN") && b.head.includes("DE")) {
    const si = b.head.indexOf("Subject");
    if (si < 0) return `<div class="grid">${b.rows.map((r) => card(b.head, r, hue)).join("")}</div>`;
    const groups = [...new Set(b.rows.map((r) => r[si]))];
    return groups.map((g) => `<h3 class="group">${inline(g)}</h3><div class="grid">${b.rows.filter((r) => r[si] === g).map((r) => card(b.head, r, hue)).join("")}</div>`).join("");
  }
  if (b.head[0] === "Stars") {
    return `<div class="stars">${b.rows.map(([n, state]) => `<div class="step"><div class="row" aria-label="${n} stars">${[1, 2, 3].map((k) => `<span class="${k <= +n ? "on" : ""}">★</span>`).join("")}</div><b>${inline(state)}</b></div>`).join("")}</div>`;
  }
  return `<div class="tw"><table><thead><tr>${b.head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

const render = (bs, hue) => bs.map((b) => b.kind === "p" ? `<p>${inline(b.text)}</p>`
  : b.kind === "list" ? `<ul>${b.items.map((x) => `<li>${inline(x)}</li>`).join("")}</ul>`
  : table(b, hue)).join("\n");

const count = sections.filter((s) => HUES[s.title]).reduce((n, s) => n + s.blocks.filter((b) => b.kind === "table").reduce((m, b) => m + b.rows.length, 0), 0);

const nav = sections.map((s) => `<li><a href="#${slug(s.title)}">${esc(s.title)}</a></li>`).join("");
const body = sections.map((s) => `<section id="${slug(s.title)}"${HUES[s.title] ? ` class="cat ${HUES[s.title]}"` : ""}>
  <h2>${esc(s.title)}</h2>
  ${render(s.blocks, HUES[s.title] ?? "strand")}
</section>`).join("\n");

const tpl = readFileSync(join(HERE, "template.html"), "utf8");
writeFileSync(join(HERE, "index.html"), tpl
  .replace("__INTRO__", render(intro))
  .replace("__COUNT__", String(count))
  .replace("__NAV__", nav)
  .replace("__BODY__", body)
  .replace("__BUILT__", new Date().toISOString().slice(0, 10)));
console.log(`pages/rewards/index.html: ${sections.length} sections, ${count} badges`);
