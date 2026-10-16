// Builds pages/site/index.html: one page on how the Twist content works and
// fits together, from the records and docs in twist/. Never edit the output;
// edit this file or template.html and run `node twist/pages/site/build.mjs`.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const T = join(HERE, "..", "..");
const YAML = createRequire(join(T, "package.json"))("yaml");
const read = (p) => YAML.parse(readFileSync(join(T, p), "utf8"));
const text = (p) => readFileSync(join(T, p), "utf8");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

// Small Markdown to HTML: headings, paragraphs, lists, tables, code, emphasis, links.
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u.endsWith(".md") ? "#" : u}">${t}</a>`);
function md(src, level = 2) {
  const lines = src.replace(/\r/g, "").split("\n"), out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = /^(#{1,6})\s+(.*)/.exec(l))) { const n = Math.min(6, m[1].length + level - 1); out.push(`<h${n}>${inline(m[2])}</h${n}>`); i++; continue; }
    if (l.startsWith("```")) { const buf = []; i++; while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]); i++; out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map((c) => inline(c.trim().replace(/\\\|/g, "|")));
      const head = cells(rows[0]), body = rows.slice(2).map(cells);
      out.push(`<div class="tw"><table><thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s/.test(l)) {
      const ordered = /^\s*\d+\./.test(l), items = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
        if (/^\s*([-*]|\d+\.)\s/.test(lines[i])) items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s/, "")); else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      out.push(`<${ordered ? "ol" : "ul"}>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }
    if (l.startsWith(">")) { const buf = []; while (i < lines.length && lines[i].startsWith(">")) buf.push(lines[i++].replace(/^>\s?/, "")); out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`); continue; }
    const buf = []; while (i < lines.length && lines[i].trim() && !/^(#|\||```|>|\s*([-*]|\d+\.)\s)/.test(lines[i])) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}
// Split a doc into its H2 sections: [{ title, html }].
const sections = (src, drop = []) => src.split(/\n(?=## )/).filter((s) => s.startsWith("## ")).map((s) => {
  const title = s.split("\n")[0].replace(/^##\s+/, "");
  return { title, html: md(s.split("\n").slice(1).join("\n"), 3) };
}).filter((s) => !drop.includes(s.title));

// ---------- records ----------
const steps = new Map();
for (const p of walk(join(T, "competencies")).filter((p) => p.endsWith(".yaml"))) {
  const d = YAML.parse(readFileSync(p, "utf8"));
  for (const s of d.skills ?? []) steps.set(s.id, { ...s, progression: d.progression, ptitle: d.title });
}
const sets = walk(join(T, "lessons")).filter((p) => p.endsWith(".yaml")).map((p) => {
  const d = YAML.parse(readFileSync(p, "utf8")), types = {}, drawn = {};
  const visit = (v) => { if (Array.isArray(v)) return v.forEach(visit); if (!v || typeof v !== "object") return; if (v.drawn) drawn[v.drawn] = (drawn[v.drawn] ?? 0) + 1; if (v.crossed) drawn["crossed picture"] = (drawn["crossed picture"] ?? 0) + 1; if (v.script === "joined") drawn["Schreibschrift"] = (drawn["Schreibschrift"] ?? 0) + 1; Object.values(v).forEach(visit); };
  let tasks = 0;
  const lessons = (d.lessons ?? []).map((l) => {
    let n = 0;
    for (const a of l.activities ?? []) for (const t of [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((s) => s.tasks ?? [])]) { n++; types[t.type] = (types[t.type] ?? 0) + 1; }
    tasks += n;
    return { n: l.n, title: l.title?.de ?? l.title?.en, acts: (l.activities ?? []).map((a) => a.activity), tasks: n };
  });
  visit(d.lessons);
  return { id: d.id, skill: d.skill, cur: d.curriculum, title: d.title, summary: String(d.summary ?? "").trim(), year: d.metadata?.year, file: relative(join(T, ".."), p), lessons, tasks, types, drawn };
});
const frameworks = walk(join(T, "frameworks")).filter((p) => p.endsWith(".yaml")).map((p) => {
  const d = YAML.parse(readFileSync(p, "utf8"));
  return { id: d.framework ?? d.id, title: typeof d.title === "string" ? d.title : d.title?.de ?? d.title?.en ?? d.framework, count: (d.standards ?? d.objectives ?? []).length, country: d.country ?? "", band: d.band ?? "", url: d.url ?? "" };
});
const curricula = readdirSync(join(T, "curricula")).filter((f) => f.endsWith(".yaml")).map((f) => {
  const c = read(`curricula/${f}`), y = read(`years/${f}`);
  const lang = c.market.startsWith("de") ? "de" : "en";
  const yearIds = [...(y.grades ?? []), ...(y.learning_years ?? [])];
  const label = (id) => yearIds.find((s) => s.id === id)?.label?.[lang] ?? id;
  const bySkill = new Map(sets.filter((s) => s.cur === c.curriculum).map((s) => [s.skill, s]));
  const years = Object.entries(c.placement ?? {}).map(([yid, ids]) => ({
    id: yid, label: label(yid),
    skills: ids.map((id) => { const s = steps.get(id) ?? {}, set = bySkill.get(id); return { id, domain: id.split(".")[0], topic: s.topic?.[lang] ?? "", can: s.can_do?.[lang] ?? id, standards: s.standards ?? [], set: set ? { title: set.title?.[lang] ?? set.title?.de, file: set.file, lessons: set.lessons, tasks: set.tasks, summary: set.summary } : null }; }),
  }));
  return { id: c.curriculum, title: c.title, lang, subjects: c.subjects, frameworks: c.frameworks ?? [], facets: c.facets ?? {}, years };
});

// Task types: each `## \`type\`` section of task-types.md, with how often the lessons use it.
const tt = text("docs/task-types.md");
const typeSecs = tt.split(/\n(?=## )/).filter((s) => /^## `/.test(s)).map((s) => {
  const id = /^## `([^`]+)`/.exec(s)[1];
  const body = s.split("\n").slice(1).join("\n");
  const uses = { "de-DE": 0, "en-GB": 0 };
  for (const x of sets) uses[x.cur] = (uses[x.cur] ?? 0) + (x.types[id] ?? 0);
  return { id, html: md(body, 4), uses, shot: existsSync(join(HERE, "../types/shots", id + ".png")) ? `../types/shots/${id}.png` : null };
});
const ttIntro = md(tt.split(/\n(?=## `)/)[0].replace(/^# .*\n/, ""), 3);
const mocks = existsSync(join(HERE, "../types/shots")) ? readdirSync(join(HERE, "../types/shots")).filter((f) => f.startsWith("mock-")).map((f) => ({ id: f.slice(5, -4), shot: `../types/shots/${f}` })) : [];

// Drawn components, with use counts and the ones added most recently.
const NEW = new Set(["grid", "cubes", "fraction", "spinner", "table", "sound-chart", "crossed picture", "Schreibschrift"]);
const drawnUse = {};
for (const x of sets) for (const [k, v] of Object.entries(x.drawn)) drawnUse[k] = (drawnUse[k] ?? 0) + v;
const components = [
  ...(read("assets/drawn.yaml").components ?? []).map((c) => ({ id: c.id, what: c.what, data: c.data, uses: drawnUse[c.id] ?? 0, isNew: NEW.has(c.id) })),
  { id: "crossed picture", what: "A picture with a red ring and line across it, for a \"not allowed\" sign", data: "show: { object: dog, crossed: true }", uses: drawnUse["crossed picture"] ?? 0, isNew: true },
  { id: "Schreibschrift", what: "Writing lines in joined script, in the school's Ausgangsschrift (SAS, LA, VA or Grundschrift), a setting by Land", data: "show: { drawn: writing-lines, text, script: joined }", uses: drawnUse["Schreibschrift"] ?? 0, isNew: true },
];
const objects = read("assets/objects.yaml").objects ?? [];

const reviews = existsSync(join(T, "reviews.yaml")) ? read("reviews.yaml") : { passes: [], open: [] };
const anatomy = sections(text("docs/lesson-anatomy.md"));
const model = sections(text("docs/model.md"));
const rewards = sections(text("docs/rewards.md"));

// R&D: the research documents in rnd/, by title; their content stays there.
const R = join(T, "..", "rnd");
const rnd = existsSync(R) ? readdirSync(R).filter((f) => f.endsWith(".md") && f !== "README.md").map((f) => ({ file: `rnd/${f}`, title: readFileSync(join(R, f), "utf8").split("\n")[0].replace(/^#\s*/, "").replace(/\s*:?\s*(Twist vs )?Anton\b.*$/i, "").replace(/^German$/, "German sequencing") })) : [];
const official = existsSync(R) ? ["official-de", "official-gb"].filter((d) => existsSync(join(R, d))).map((d) => ({ dir: `rnd/${d}`, parts: readdirSync(join(R, d)).filter((x) => statSync(join(R, d, x)).isDirectory() && !["tools", "frameworks", "mappings"].includes(x)) })) : [];

const totals = {
  curricula: curricula.length,
  skills: steps.size,
  sets: sets.length,
  lessons: sets.reduce((n, s) => n + s.lessons.length, 0),
  tasks: sets.reduce((n, s) => n + s.tasks, 0),
  pictures: objects.filter((o) => o.status === "drawn").length,
  types: typeSecs.length,
  components: components.length,
};
const data = { built: new Date().toISOString().slice(0, 10), totals, curricula, frameworks, typeSecs, ttIntro, mocks, components, reviews, anatomy, model, rewards, rnd, official };
const tpl = readFileSync(join(HERE, "template.html"), "utf8");
writeFileSync(join(HERE, "index.html"), tpl.replace("__DATA__", JSON.stringify(data).replace(/</g, "\\u003c")));
console.log(`pages/site/index.html: ${totals.sets} lesson sets, ${totals.types} task types, ${totals.components} components, ${curricula.length} curricula`);
