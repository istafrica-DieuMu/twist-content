// The "Drawings" section of sources/index.html: every drawn component with
// its data fields (assets/drawn.yaml), what the lessons actually use, a real
// example from a lesson and a picture of it drawn by the lesson player.
// Needs Playwright: NODE_PATH=<dir with playwright>/node_modules node pages/sources/drawn.cjs
// Writes pages/sources/drawn/<id>.png and the section between the DRAWN
// markers in index.html. Run it after a change to the player's drawings or
// to drawn.yaml; build the player first (node pages/player/build.mjs).
const { chromium } = require("playwright");
const { join } = require("path");
const fs = require("fs");
const T = join(__dirname, "../..");
const PAGE = join(__dirname, "index.html");
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

const PREFER = {
  clock: (o) => o && o.minute && o.minute % 15 === 0 && o.minute !== 0,
  "place-value-chart": (o) => o && (o.values ?? []).every((v) => v != null),
};

(async () => {
  const drawnYaml = YAML.parse(fs.readFileSync(join(T, "assets/drawn.yaml"), "utf8")).components;
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 2 });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto("file://" + join(T, "pages/player/index.html"), { waitUntil: "domcontentloaded", timeout: 180000 });
  await p.waitForFunction(() => typeof D !== "undefined", null, { timeout: 180000 });
  // Every use of every component across the lessons: where, in which task type, with which fields.
  const uses = await p.evaluate(() => {
    const out = {};
    D.sets.forEach((set, si) => set.lessons.forEach((l) => l.activities.forEach((a) => {
      (a.screens ?? []).forEach((s, i) => { const o = s.show; if (o?.drawn) (out[o.drawn] ??= []).push({ si, n: l.n, kind: "learn", i, act: a.activity, type: "learn", keys: Object.keys(o), file: set.file, id: `learn ${i + 1}`, record: o }); });
      [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((st) => st.tasks)].forEach((t) => {
        const o = t.show; if (o?.drawn) (out[o.drawn] ??= []).push({ si, n: l.n, kind: "task", task: t.id, act: a.activity, type: t.type, keys: Object.keys(o), file: set.file, id: t.id, record: o });
        for (const op of t.options ?? []) if (op && typeof op === "object" && op.drawn) (out[op.drawn] ??= []).push({ si, n: l.n, kind: "option", task: t.id, act: a.activity, type: t.type, keys: Object.keys(op), file: set.file, id: t.id });
      });
    })));
    return out;
  });
  fs.mkdirSync(OUT, { recursive: true });
  const rows = [];
  for (const c of drawnYaml) {
    const list = uses[c.id] ?? [];
    // The example: a task in a measurement or number lesson if one exists, else the first use; a task over a Learn screen.
    const shown = list.filter((u) => u.kind !== "option");
    // A clock at a full hour hides one hand behind the other, and a chart of gaps shows nothing: prefer data that shows the component.
    const good = (u) => !PREFER[c.id] || PREFER[c.id](u.record);
    const ex = shown.find((u) => u.kind === "task" && u.act !== "learn" && good(u)) ?? shown.find((u) => u.kind === "task" && u.act !== "learn") ?? shown[0] ?? list[0];
    let png = null, record = null;
    if (ex) {
      const r = await p.evaluate(async ({ si, n, kind, task, i }) => {
        window.play = () => {};
        const set = D.sets[si]; pickSet(si, n); const l = set.lessons.find((x) => x.n === n);
        let st, o;
        if (kind === "learn") { const a = l.activities.find((a) => a.screens); st = { kind: "learn", a, s: a.screens[i], i }; o = a.screens[i].show; }
        else { const a = l.activities.find((a) => [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((s) => s.tasks)].some((t) => t.id === task)); const t = [...(a.tasks ?? []), ...(a.stages ?? []).flatMap((s) => s.tasks)].find((t) => t.id === task); st = { kind: "task", a, t, stage: a.activity === "check" ? "check" : "none" }; o = kind === "option" ? t.options.find((x) => x && x.drawn) : t.show; }
        steps = [{ kind: "start" }, st, { kind: "end" }]; results = steps.map(() => null); go(1);
        await new Promise((res) => setTimeout(res, 400));
        const strip = (x) => JSON.parse(JSON.stringify(x, (k, v) => (k.startsWith("_") ? undefined : v)));
        return { record: strip(o), sel: kind === "option" ? "#screen .opts .opt" : "#screen .visual" };
      }, ex);
      record = r.record;
      const el = await p.$(r.sel);
      if (el && (await el.boundingBox())?.height > 4) { png = `drawn/${c.id}.png`; await el.screenshot({ path: join(__dirname, png) }); }
    }
    const fields = [...new Set(list.flatMap((u) => u.keys))].filter((k) => k !== "drawn").sort();
    const types = [...new Set(list.map((u) => u.type))];
    const subjects = [...new Set(list.map((u) => u.file.split("/")[2]))];
    rows.push({ c, n: list.length, ex, record, png, fields, types, subjects });
  }
  await b.close();

  // ---------- the section ----------
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
  const card = (r) => {
    const { c, ex } = r;
    const where = ex ? `${esc(ex.file.replace(/\.yaml$/, ""))} · ${ex.kind === "learn" ? `lesson ${ex.n}, Learn screen ${ex.i + 1}` : `${ex.id}${ex.kind === "option" ? " (an option)" : ""}`}` : "";
    return `<article class="dc" id="d-${c.id}">
<div class="dc-pic">${r.png ? `<img src="${r.png}" alt="${esc(c.what)}, drawn by the lesson player" loading="lazy">` : `<span class="dc-none">Not used in any lesson yet</span>`}</div>
<div class="dc-body"><h4><code>${esc(c.id)}</code>${c.names ? ` <span>${esc(c.names.de)} · ${esc(c.names.en)}</span>` : ""}</h4>
<p>${esc(c.what)}.${NOTES[c.id] ? ` ${esc(NOTES[c.id])}` : ""}</p>
<dl><dt>Data</dt><dd>${esc(c.data ?? "")}</dd>
<dt>In use</dt><dd>${r.n} ${r.n === 1 ? "use" : "uses"} in ${esc(r.subjects.join(", "))}; ${r.types.includes("learn") ? "Learn screens; " : ""}task types ${r.types.filter((t) => t !== "learn").map((t) => `<code>${esc(t)}</code>`).join(" ") || "none"}${r.fields.length ? `; fields ${r.fields.map((f) => `<code>${esc(f)}</code>`).join(" ")}` : ""}</dd>
${ex ? `<dt>Example</dt><dd>${where}</dd>` : ""}</dl>
${r.record ? `<pre><code>${esc(yamlOf(r.record))}</code></pre>` : ""}</div></article>`;
  };
  const total = rows.reduce((a, r) => a + r.n, 0);
  const html = `<!--DRAWN-->
<h2 id="drawings">Drawings</h2>
<p>The 37 drawn components are drawn by the app from a task's <code>show</code> data; no image file stands behind them, except the object pictures some of them hold. Each card shows one real use from the lessons, drawn by the R&amp;D lesson player, with the record that produced it. The data fields are documented in <code>twist/assets/drawn.yaml</code>; the player's drawing code (<code>twist/pages/player/template.html</code>, <code>function drawn</code>) is the reference to copy. The lessons use them ${total.toLocaleString("en-GB")} times.</p>
<p>In v2 the component travels as <code>show.drawn</code> with the same data fields, and pictures inside it as <code>show.imageUrls</code>. Where a task type makes a drawing touchable (a number line in <code>point_on_line</code>, a clock in <code>clock_hands_drag</code>, a grid in <code>point_on_grid</code>, a ten-frame in <code>drag_and_drop_count</code>), the card says so.</p>
<p class="dc-jump">${GROUPS.map(([g, ids]) => `<b>${esc(g)}:</b> ${ids.filter((i) => byId[i]).map((i) => `<a href="#d-${i}">${esc(i)}</a>`).join(", ")}`).join("<br>")}</p>
${GROUPS.map(([g, ids]) => `<h3>${esc(g)}</h3>\n<div class="dcs">${ids.filter((i) => byId[i]).map((i) => card(byId[i])).join("\n")}</div>`).join("\n")}
<!--/DRAWN-->`;
  let page = fs.readFileSync(PAGE, "utf8");
  page = page.includes("<!--DRAWN-->") ? page.replace(/<!--DRAWN-->[\s\S]*<!--\/DRAWN-->/, html) : page.replace('<h2 id="unused">', `${html}\n\n<h2 id="unused">`);
  fs.writeFileSync(PAGE, page);
  const missing = rows.filter((r) => !r.png).map((r) => r.c.id);
  console.log(`drawings: ${rows.length} components, ${rows.filter((r) => r.png).length} pictures${missing.length ? `, no picture: ${missing.join(", ")}` : ""}; page errors: ${errs.length}`);
})();
