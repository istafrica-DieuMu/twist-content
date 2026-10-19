// pages/drawings/index.html, the player's Drawings tab: every drawn component
// with its data fields (assets/drawn.yaml), what the lessons actually use, a
// real example from a lesson and a picture of it drawn by the lesson player.
// Needs Playwright: NODE_PATH=<dir with playwright>/node_modules node pages/drawings/build.cjs
// Writes pages/drawings/drawn/<id>[-n].png, index.html and standalone.html
// (pages/player/drawn.js on its own, the starting point for the app). Run it
// after a change to drawn.js or drawn.yaml; build the player first
// (node pages/player/build.mjs).
const { chromium } = require("playwright");
const { join } = require("path");
const fs = require("fs");
const T = join(__dirname, "../..");
const OUT = join(__dirname, "drawn");
const YAML = require(join(T, "node_modules/yaml"));

// How each component behaves beyond its data. Hand-written; the rest of the
// section comes from drawn.yaml and the lessons.
const NOTES = {
  "number-line": "Ticks every step (1, 5, 10, 0.1); long ticks at tens. In point_on_line the child taps the line and the tapped value is the answer.",
  rechenstrich: "No scale: the jumps are spaced by size. When the task's answer is the last landing point, that label reads ? (Learn screens show it).",
  clock: "An analogue face; in clock_hands_drag the child drags the hands (minute hand in steps of the task's step, from start). A clock as an option is keyed h:mm.",
  ruler: "Drawn to scale in cm with mm ticks; the object or segment lies along it from the given start.",
  coins: "Euro or pound coins and notes by value in cents; as an option it is keyed by the total.",
  "ten-frame": "Two rows of five. In drag_and_drop_count the child fills the cells; cross marks counters taken away.",
  zwanzigerfeld: "Two ten-frames, top and bottom row. A Learn screen with move animates counters across after a moment.",
  "hundred-field": "Ten rows of ten counters, filled up to a number; colour_split colours the first part.",
  "hundred-square": "The 1 to 100 table; cells can be marked or left as gaps.",
  grid: "Squared paper or a dot grid. In point_on_grid the child taps a crossing.",
  coordinates: "A first-quadrant (or four-quadrant) grid with axes and plotted points; point_on_grid taps a point.",
  "bar-chart": "Bars from rows of [label, value] with a scale in steps; a label naming a colour colours its bar. With pictogram_object it draws a pictogram (per: what one picture stands for).",
  cubes: "A building of cubes from a plan of stack heights, or its plan, front, side or top view. A plan names its rows hinten and vorne.",
  "writing-lines": "Handwriting lines in the child's script; tracing tasks draw over them (trace) or copy beside them (copy).",
  "letter-card": "Each word on its own card; highlight_in_text tasks tap words on the cards.",
  table: "Rows of cells, a header row by default; ? is a gap. Shrinks its font to fit the phone.",
  "written-calc": "A written calculation in columns with carries; gaps for the child to fill.",
  shape: "A 2D shape or 3D solid, or a row or column of them as a pattern.",
  fraction: "A shape cut into equal parts with some shaded.",
  thermometer: "A scale in degrees with the level drawn to the value.",
  spinner: "A spinner in coloured sectors, for chance.",
};

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap">';
// The page's styles: the tokens of the other Twist pages and the drawing cards.
const STYLE = `
/* Layout: a reference page beside "Twist Mobile API v2": sticky contents on the left, one section per screen, each row label → v2 field → twist-content source. Same tokens as that page so they read as a pair. */
:root{--bg:#faf8ff;--surface:#fff;--ink:#24123d;--muted:#64587b;--line:#e3dcf0;--accent:#6849dd;--accent-soft:#efeafd;--code-bg:#f4f1fb;--warn:#a1520b;--warn-soft:#fdf0e2;--ok:#1d7a4c;--ok-soft:#e5f6ec;
--body:"Source Sans 3","Segoe UI",system-ui,sans-serif;--display:"Andika","Trebuchet MS",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,Consolas,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#13101b;--surface:#1b1626;--ink:#ece7f7;--muted:#a79dbe;--line:#2f2742;--accent:#a48cff;--accent-soft:#2a2143;--code-bg:#181322;--warn:#f0a35c;--warn-soft:#33220f;--ok:#6fd39c;--ok-soft:#12291c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#13101b;--surface:#1b1626;--ink:#ece7f7;--muted:#a79dbe;--line:#2f2742;--accent:#a48cff;--accent-soft:#2a2143;--code-bg:#181322;--warn:#f0a35c;--warn-soft:#33220f;--ok:#6fd39c;--ok-soft:#12291c;color-scheme:dark}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16.5px/1.6 var(--body)}
.layout{max-width:1220px;margin:0 auto;padding-block:40px 80px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;grid-template-columns:210px minmax(0,1fr);gap:48px}
nav{position:sticky;top:20px;align-self:start;display:grid;gap:2px;font-size:.9rem}
nav .label{font:600 .75rem/1 var(--body);letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
nav a{color:var(--muted);text-decoration:none;padding:5px 10px;border-radius:6px;border-left:2px solid transparent}
nav a:hover,nav a:focus-visible{color:var(--ink);background:var(--accent-soft);border-left-color:var(--accent);outline:none}
nav a.on{color:var(--accent);font-weight:600;background:var(--accent-soft);border-left-color:var(--accent)}
main{min-width:0}
h1,h2,h3{font-family:var(--display);line-height:1.2;text-wrap:balance}
h1{font-size:clamp(1.9rem,5vw,2.7rem);margin:0 0 14px}
h2{font-size:1.55rem;margin:56px 0 14px;scroll-margin-top:16px;padding-top:24px;border-top:1px solid var(--line)}
h3{font-size:1.15rem;margin:28px 0 8px}
.lede{font-size:1.1rem;color:var(--muted);max-width:72ch;margin:0 0 18px}
p,li{max-width:76ch}
ul,ol{padding-left:1.3em}
li{margin:4px 0}
a{color:var(--accent);text-underline-offset:2px;overflow-wrap:anywhere}
code{font-family:var(--mono);font-size:.84em;background:var(--code-bg);padding:.08em .35em;border-radius:4px;overflow-wrap:anywhere}
pre{background:var(--code-bg);border:1px solid var(--line);border-radius:10px;padding:14px 16px;overflow-x:auto;font:400 .82rem/1.6 var(--mono)}
pre code{background:none;padding:0;font-size:inherit;overflow-wrap:normal}
.tw{overflow-x:auto;margin:14px 0;border:1px solid var(--line);border-radius:10px;background:var(--surface)}
table{border-collapse:collapse;width:100%;font-size:.92rem;min-width:760px}
th,td{text-align:left;vertical-align:top;padding:9px 12px;border-bottom:1px solid var(--line)}
th{font:600 .74rem/1.3 var(--body);letter-spacing:.07em;text-transform:uppercase;color:var(--muted);background:var(--code-bg)}
tr:last-child td{border-bottom:0}
td:first-child{font-weight:600;white-space:nowrap}
.tag{display:inline-block;font:600 .72rem/1.5 var(--body);letter-spacing:.05em;text-transform:uppercase;padding:1px 7px;border-radius:999px;white-space:nowrap}
.t-in{background:var(--ok-soft);color:var(--ok)}
.t-add{background:var(--warn-soft);color:var(--warn)}
.t-calc{background:var(--accent-soft);color:var(--accent)}
.note{border-left:3px solid var(--accent);background:var(--accent-soft);padding:12px 16px;border-radius:0 10px 10px 0;max-width:80ch;margin:16px 0}
.note.warn{border-left-color:var(--warn);background:var(--warn-soft)}
.note p{margin:0}
.flow{display:flex;flex-wrap:wrap;gap:8px;align-items:stretch;margin:18px 0}
.flow div{flex:1 1 170px;min-width:0;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:.9rem}
.flow b{display:block;font-family:var(--display);font-size:1rem;margin-bottom:2px}
.legend{display:flex;flex-wrap:wrap;gap:10px 18px;font-size:.9rem;color:var(--muted);margin:10px 0}
.dc-jump{font-size:.92rem;line-height:1.9;max-width:none}
.dcs{display:grid;gap:14px}
.dc{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:18px;align-items:start;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;scroll-margin-top:16px}
.dc-pic{background:#fff;border-radius:10px;border:1px solid var(--line);display:grid;place-items:center;min-height:120px;padding:8px}
.dc-pic img{display:block;max-width:100%;height:auto;max-height:300px}
.dc-none{color:#64587b;font-size:.85rem;padding:20px;text-align:center}
.dc-body{min-width:0}
.dc h4{font-family:var(--display);font-size:1.05rem;margin:0 0 4px;display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}
.dc h4 span{font:400 .88rem var(--body);color:var(--muted)}
.dc p{margin:0 0 8px;font-size:.95rem}
.dc dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;margin:0 0 8px;font-size:.88rem}
.dc dt{font-weight:600;color:var(--muted)}
.dc dd{margin:0;min-width:0}
.dc pre{margin:0;font-size:.76rem;max-height:220px}
.dc-more{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.dc-more figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:8px;padding:4px;width:calc(50% - 4px)}
.dc-more img{display:block;width:100%;height:auto;max-height:140px;object-fit:contain}
.dc-more figcaption{font:400 .72rem/1.3 var(--mono);color:#64587b;padding:3px 2px 0;overflow-wrap:anywhere}
.dc details{margin-top:8px}
.dc summary{cursor:pointer;font-weight:600;color:var(--accent);font-size:.9rem}
.dc details pre{max-height:420px;margin-top:6px}
.kind{display:inline-block;font:600 .7rem/1.6 var(--body);letter-spacing:.05em;text-transform:uppercase;padding:0 7px;border-radius:999px;background:var(--accent-soft);color:var(--accent)}
.kind.html{background:var(--warn-soft);color:var(--warn)}
@media (max-width:700px){.dc{grid-template-columns:minmax(0,1fr)}}
@media (max-width:900px){.layout{grid-template-columns:minmax(0,1fr);gap:20px;padding-block:24px 60px}nav{position:static;grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}nav .label{grid-column:1/-1}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}

.layout{grid-template-columns:minmax(0,1fr)}
`;

const PREFER = {
  clock: (o) => o && o.minute && o.minute % 15 === 0 && o.minute !== 0,
  "place-value-chart": (o) => o && (o.values ?? []).every((v) => v != null),
};
// Fields whose value changes what a component looks like; a use with a new
// combination of them is another form worth a picture.
const FORM = ["kind", "mode", "layout", "digital", "roman", "script", "currency", "sheet", "tally", "dots", "axis", "axis_row", "diagonal", "back", "move", "cross", "parts", "type", "quadrants"];
const PRESENT = ["array", "groups", "row", "column", "pictogram_object", "split", "highlight", "hide", "mark", "labels", "lines", "halves", "jumps", "colour_split", "from"];
const formOf = (o) => [...FORM.filter((k) => o[k] != null && typeof o[k] !== "object").map((k) => `${k}: ${o[k]}`), ...PRESENT.filter((k) => o[k] != null && (!Array.isArray(o[k]) || o[k].length)).map((k) => k)].join(", ") || "plain";
const MAX_FORMS = 6;

// The source of a component: its function in drawn.js and every helper of
// drawn.js it calls, in file order, with line numbers.
const SRC = fs.readFileSync(join(T, "pages/player/drawn.js"), "utf8").split("\n");
const defs = {};
SRC.forEach((line, i) => { const m = /^(?:function\s+([A-Za-z_]\w*)|(?:const|let)\s+([A-Za-z_]\w*)\s*=)/.exec(line); if (m) defs[m[1] ?? m[2]] = i; });
const starts = Object.values(defs).concat(SRC.map((l, i) => (/^(\/\/|\/\*)/.test(l) ? i : null)).filter((x) => x != null)).sort((a, b) => a - b);
const bodyOf = (name) => { const i = defs[name]; const next = starts.find((j) => j > i) ?? SRC.length; return [i, SRC.slice(i, next).join("\n").trimEnd()]; };
const SWITCH = (() => { const [, body] = bodyOf("drawn"); return body; })();
function sourceFor(id) {
  const m = new RegExp(`case "${id}": return ([^\\n]+)`).exec(SWITCH);
  if (!m) return null;
  const seen = new Set(), queue = [m[1]], out = [];
  while (queue.length) for (const call of queue.shift().matchAll(/\b([A-Za-z_]\w*)\s*\(/g)) {
    const n = call[1]; if (seen.has(n) || defs[n] == null || ["drawn", "esc"].includes(n)) continue;
    seen.add(n); const [i, body] = bodyOf(n); out.push([i, body]); queue.push(body);
  }
  return { call: `case "${id}": return ${m[1].trim()}`, parts: out.sort((a, b) => a[0] - b[0]) };
}

(async () => {
  const drawnYaml = YAML.parse(fs.readFileSync(join(T, "assets/drawn.yaml"), "utf8")).components;
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 2 });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto("file://" + join(T, "pages/player/index.html"), { waitUntil: "domcontentloaded", timeout: 180000 });
  await p.waitForFunction(() => typeof D !== "undefined", null, { timeout: 180000 });
  // Every use of every component across the lessons: where, in which task type, with which data.
  const uses = await p.evaluate(() => {
    const out = {}, strip = (x) => JSON.parse(JSON.stringify(x, (k, v) => (k.startsWith("_") ? undefined : v)));
    D.sets.forEach((set, si) => set.lessons.forEach((l) => l.activities.forEach((a) => {
      (a.screens ?? []).forEach((s, i) => { const o = s.show; if (o?.drawn) (out[o.drawn] ??= []).push({ si, n: l.n, kind: "learn", i, act: a.activity, type: "learn", file: set.file, id: `learn ${i + 1}`, record: strip(o) }); });
      [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((st) => st.tasks)].forEach((t) => {
        const o = t.show; if (o?.drawn) (out[o.drawn] ??= []).push({ si, n: l.n, kind: "task", task: t.id, act: a.activity, type: t.type, file: set.file, id: t.id, record: strip(o) });
        (t.options ?? []).forEach((op, oi) => { if (op && typeof op === "object" && op.drawn) (out[op.drawn] ??= []).push({ si, n: l.n, kind: "option", oi, task: t.id, act: a.activity, type: t.type, file: set.file, id: t.id, record: strip(op) }); });
      });
    })));
    return out;
  });
  // Draws one use on its real screen and returns the element to photograph.
  const render = (u) => p.evaluate(async ({ si, n, kind, task, i, oi }) => {
    window.play = () => {};
    const set = D.sets[si]; pickSet(si, n); const l = set.lessons.find((x) => x.n === n);
    let st;
    if (kind === "learn") { const a = l.activities.find((a) => a.screens); st = { kind: "learn", a, s: a.screens[i], i }; }
    else { const a = l.activities.find((a) => [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((s) => s.tasks)].some((t) => t.id === task)); const t = [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((s) => s.tasks)].find((t) => t.id === task); st = { kind: "task", a, t, stage: a.activity === "check" ? "check" : "none" }; }
    steps = [{ kind: "start" }, st, { kind: "end" }]; results = steps.map(() => null); go(1);
    await new Promise((res) => setTimeout(res, 350));
    // An option is photographed with the whole row of options it sits in.
    return kind === "option" ? "#screen .opts" : "#screen .visual";
  }, u);
  // SVG or HTML: what drawn() returns for this record.
  const output = (o) => p.evaluate((o) => { try { const h = drawn(o).trim(); return h.startsWith("<svg") ? "SVG" : "HTML"; } catch (e) { return "error"; } }, o);
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
  const rows = [];
  for (const c of drawnYaml) {
    const list = uses[c.id] ?? [];
    const good = (u) => !PREFER[c.id] || PREFER[c.id](u.record);
    // Forms: one use per distinct form, the most common first; a task over a Learn screen or an option.
    const byForm = new Map();
    for (const u of list) { const f = formOf(u.record); if (!byForm.has(f)) byForm.set(f, []); byForm.get(f).push(u); }
    const rank = (u) => (u.kind === "task" && u.act !== "learn" ? 0 : u.kind === "learn" ? 1 : 2) - (good(u) ? 0.5 : 0);
    const forms = [...byForm.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, MAX_FORMS).map(([form, us]) => ({ form, count: us.length, use: [...us].sort((x, y) => rank(x) - rank(y))[0] }));
    const pics = [];
    for (const [k, f] of forms.entries()) {
      const sel = await render(f.use);
      const el = await p.$(sel);
      if (el && (await el.boundingBox())?.height > 4) { const png = `drawn/${c.id}${k ? `-${k + 1}` : ""}.png`; await el.screenshot({ path: join(__dirname, png) }); pics.push({ ...f, png }); }
    }
    const kind = list.length ? await output(list[0].record) : null;
    const fields = [...new Set(list.flatMap((u) => Object.keys(u.record)))].filter((k) => k !== "drawn").sort();
    const types = [...new Set(list.map((u) => u.type))];
    const subjects = [...new Set(list.map((u) => u.file.split("/")[2]))];
    rows.push({ c, n: list.length, pics, formsTotal: byForm.size, fields, types, subjects, kind, src: sourceFor(c.id) });
  }
  // The examples for standalone.html: one record per component.
  const samples = rows.filter((r) => r.pics[0]).map((r) => r.pics[0].use.record);
  const env = await p.evaluate(() => ({ pics: D.pics, objects: D.objects, colours: D.colours }));
  await b.close();

  // ---------- the page ----------
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const yamlOf = (o) => YAML.stringify({ show: o }, { flowCollectionPadding: true, lineWidth: 0 }).trim();
  const GROUPS = [
    ["Numbers and calculating", ["dots", "ten-frame", "zwanzigerfeld", "number-line", "rechenstrich", "equation", "part-whole", "number-house", "written-calc", "short-division", "number-wall", "base-ten", "hundred-field", "place-value-chart", "hundred-square"]],
    ["Measures", ["ruler", "clock", "coins", "thermometer"]],
    ["Shapes, space and position", ["shape", "grid", "cubes", "angle", "circle", "coordinates", "fraction"]],
    ["Data and chance", ["bar-chart", "table", "line-graph", "pie-chart", "spinner"]],
    ["Letters, words and colour", ["letter-card", "word-card", "syllable-arcs", "writing-lines", "sound-chart", "colour-swatch"]],
  ];
  const byId = Object.fromEntries(rows.map((r) => [r.c.id, r]));
  const where = (u) => `${esc(u.file.replace(/\.yaml$/, ""))} · ${u.kind === "learn" ? `lesson ${u.n}, Learn screen ${u.i + 1}` : `${u.id}${u.kind === "option" ? " (an option)" : ""}`}`;
  const card = (r) => {
    const { c } = r, main = r.pics[0], more = r.pics.slice(1);
    const source = r.src ? `<details><summary>Source in drawn.js (${r.src.parts.length} function${r.src.parts.length === 1 ? "" : "s"})</summary><pre><code>${esc(`// drawn(): ${r.src.call}\n\n` + r.src.parts.map(([i, body]) => `// drawn.js line ${i + 1}\n${body}`).join("\n\n"))}</code></pre></details>` : "";
    return `<article class="dc" id="d-${c.id}">
<div class="dc-pic-col"><div class="dc-pic">${main ? `<img src="${main.png}" alt="${esc(c.what)}, drawn by the lesson player" loading="lazy">` : `<span class="dc-none">Not used in any lesson yet</span>`}</div>
${more.length ? `<div class="dc-more">${more.map((f) => `<figure><img src="${f.png}" alt="" loading="lazy"><figcaption>${esc(f.form)} · ${f.count}</figcaption></figure>`).join("")}</div>` : ""}</div>
<div class="dc-body"><h4><code>${esc(c.id)}</code>${r.kind ? ` <span class="kind${r.kind === "HTML" ? " html" : ""}">${r.kind}</span>` : ""}${c.names ? ` <span>${esc(c.names.de)} · ${esc(c.names.en)}</span>` : ""}</h4>
<p>${esc(c.what)}.${NOTES[c.id] ? ` ${esc(NOTES[c.id])}` : ""}</p>
<dl><dt>Data</dt><dd>${esc(c.data ?? "")}</dd>
<dt>In use</dt><dd>${r.n} ${r.n === 1 ? "use" : "uses"} in ${esc(r.subjects.join(", "))}; ${r.types.includes("learn") ? "Learn screens; " : ""}task types ${r.types.filter((t) => t !== "learn").map((t) => `<code>${esc(t)}</code>`).join(" ") || "none"}${r.fields.length ? `; fields ${r.fields.map((f) => `<code>${esc(f)}</code>`).join(" ")}` : ""}</dd>
<dt>Forms</dt><dd>${r.formsTotal} in the lessons${r.formsTotal > r.pics.length ? `, the ${r.pics.length} most used drawn here` : ""}${main ? `; the big picture: ${esc(main.form)}` : ""}</dd>
${main ? `<dt>Example</dt><dd>${where(main.use)}</dd>` : ""}</dl>
${main ? `<pre><code>${esc(yamlOf(main.use.record))}</code></pre>` : ""}
${source}</div></article>`;
  };
  const total = rows.reduce((a, r) => a + r.n, 0), html = rows.filter((r) => r.kind === "HTML").map((r) => r.c.id);
  const page = `<h1>Drawings</h1>
<p class="lede">The 37 drawn components a Twist lesson screen can show, each with real examples from the lessons drawn by the lesson player, its data, and its source. The lessons use them ${total.toLocaleString("en-GB")} times.</p>

<h2 id="code">Use our drawing code</h2>
<p>Every drawing is a plain JavaScript function of the record's <code>show</code> data, in one file: <a href="../player/drawn.js"><code>twist/pages/player/drawn.js</code></a>. The lesson player inlines that same file, so what you see on these cards is what the file draws. The app can take the file as it is.</p>
<ul>
<li><b>Call</b> <code>drawn(o)</code> with one component (<code>{ drawn: "ruler", to: 10, length: 8 }</code>), or <code>show(o)</code> with a task's whole <code>show</code>. Each returns a string: an <code>&lt;svg&gt;</code> for most components, a small HTML block for ${html.length} (${html.map((i) => `<code>${esc(i)}</code>`).join(", ")}). The tag on each card says which.</li>
<li><b>Before calling, define what it reads</b> from the page around it: <code>A</code> (the assets base URL, e.g. the CDN's <code>content-assets/twist/</code>), <code>D.pics</code>, <code>D.objects</code> and <code>D.colours</code> (from <code>assets/objects.yaml</code> and the pictures folder), <code>set</code> (<code>curriculum</code> and <code>language</code> of the lesson), <code>UI.planBack</code> and <code>UI.planFront</code>, <code>SHOWN_ANSWER</code> (the task's answer, <code>[]</code> on Learn screens) and <code>esc()</code>. The file's header lists them.</li>
<li><b>In React Native:</b> render an SVG string with <code>SvgXml</code> from <code>react-native-svg</code>; the HTML components need a <code>WebView</code>, or a native port using the source below. Fonts: Andika (numbers and text in drawings), Red Hat Text (labels), and Playwrite DE SAS, LA, VA, Grund and Playwrite GB J for the writing lines.</li>
<li><b>Interaction</b> is not in the drawings: the task type adds it (tapping a number line in <code>point_on_line</code>, dragging clock hands in <code>clock_hands_drag</code>, tapping a grid in <code>point_on_grid</code>, filling a ten-frame in <code>drag_and_drop_count</code>). Those handlers are in the player's <code>template.html</code>.</li>
<li><b>Try it:</b> <a href="standalone.html"><code>standalone.html</code></a> loads <code>drawn.js</code> on its own with that setup and draws one example of every component; copy it as the starting point.</li>
</ul>

<p class="dc-jump">${GROUPS.map(([g, ids]) => `<b>${esc(g)}:</b> ${ids.filter((i) => byId[i]).map((i) => `<a href="#d-${i}">${esc(i)}</a>`).join(", ")}`).join("<br>")}</p>
${GROUPS.map(([g, ids]) => `<h2>${esc(g)}</h2>\n<div class="dcs">${ids.filter((i) => byId[i]).map((i) => card(byId[i])).join("\n")}</div>`).join("\n")}
<p>Where each drawing's data and media come from on every screen: <a href="../sources/index.html">Twist Screen Sources</a>.</p>`;
  fs.writeFileSync(join(__dirname, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Twist Drawings</title>
<!-- Written by pages/drawings/build.cjs; never edit by hand. -->
${FONTS}
<style>${STYLE}
.dc-pic-col{min-width:0}</style>
</head><body><div class="layout"><main>
${page}
</main></div></body></html>
`);
  // standalone.html: drawn.js with nothing of the player, as the app would use it.
  fs.writeFileSync(join(__dirname, "standalone.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Twist drawn.js on its own</title>
<!-- Written by pages/drawings/build.cjs. drawn.js with the minimum it needs; the starting point for using the drawings in the app. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Red+Hat+Text:wght@400;700&display=swap">
<style>body{margin:0;padding:16px;font:15px system-ui,sans-serif;background:#faf8ff;color:#24123d}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
figure{margin:0;background:#fff;border:1px solid #e3dcf0;border-radius:10px;padding:10px}
figure>div{display:grid;place-items:center;min-height:120px}figure svg{max-width:100%;height:auto}
figcaption{font:12px ui-monospace,monospace;color:#64587b;margin-top:6px}
/* The few classes the HTML components use (the player has fuller styles). */
.cards{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.card{border:2px solid #dfdfdf;border-bottom-width:5px;border-radius:12px;padding:8px 14px;font:700 26px Andika,sans-serif}
.word{font:700 32px Andika,sans-serif;display:flex;gap:2px}.syl{border-bottom:4px solid #8e3bd1;padding:0 4px}.wordcard{border:2px solid #dfdfdf;border-radius:12px;padding:6px 16px}
.tally td{padding:2px 8px;font:600 15px Andika,sans-serif}.soundchart{display:grid;gap:4px}.sc{border:1px solid #dfdfdf;border-radius:8px;padding:4px;text-align:center}.sc img{width:40px}
</style></head><body>
<h1 style="font-size:20px">drawn.js on its own: one example of every component</h1>
<main id="out"></main>
<script>
// 1. What drawn.js reads. In the app these come from the lesson payload and config.
var A = "../../assets/";                       // the assets base URL (the CDN in the app)
var D = ${JSON.stringify(env)};
var set = { curriculum: "de-DE", language: "de" };
var UI = { planBack: "hinten", planFront: "vorne" };
var SHOWN_ANSWER = [];
var esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
</script>
<script src="../player/drawn.js"></script>
<script>
// 2. Draw: drawn(record) returns an SVG or HTML string.
const SAMPLES = ${JSON.stringify(samples)};
document.getElementById("out").innerHTML = SAMPLES.map((o) => { let h; try { h = drawn(o); } catch (e) { h = "<b>" + esc(e.message) + "</b>"; } return "<figure><div>" + h + "</div><figcaption>" + esc(o.drawn) + "</figcaption></figure>"; }).join("");
</script>
</body></html>
`);
  const missing = rows.filter((r) => !r.pics.length).map((r) => r.c.id), npics = rows.reduce((a, r) => a + r.pics.length, 0);
  console.log(`drawings: ${rows.length} components, ${npics} pictures of ${rows.reduce((a, r) => a + r.formsTotal, 0)} forms${missing.length ? `, no picture: ${missing.join(", ")}` : ""}; page errors: ${errs.length}`);
})();
