// Twist drawn components: every picture and drawing a lesson screen shows.
// The lesson player inlines this file (pages/player/build.mjs); the app can
// use the same code. Each drawing is a function of the record's `show` data
// (assets/drawn.yaml documents the fields) and returns a string: an <svg>
// for most components, a small HTML block for a few (cards, tables, the
// sound chart, writing lines, tallies and pictograms).
//
// Entry points:
//   drawn(o, ctx)   one drawn component: o = { drawn: "<id>", ...data }
//   show(o, ctx)    a task or Learn screen's whole `show`: a picture, two
//                   pictures, a text card or a drawn component
//   pic(o, opts)    an object picture, or a counted group of it
//   ctx: { small: true } draws at option size; { moved: n } animates a
//   Zwanzigerfeld.
//
// What it reads from the page around it (the player defines these; an app
// that uses this file defines its own):
//   A            the assets base URL, e.g. "../../assets/" or the CDN base
//   D.pics       file names of the colour variants in assets/objects/
//   D.objects    object id -> { de, en, initial, drawn } (assets/objects.yaml)
//   D.colours    colour name -> hex (the swatches)
//   set          the lesson set: set.curriculum and set.language pick
//                currency, number format, place-value letters and script
//   UI           the lesson's UI strings (UI.planBack, UI.planFront)
//   SHOWN_ANSWER the task's answer, so a number line hides it ([] on Learn)
//   esc(s)       HTML escaping
// It also keeps the handwriting script setting (SCRIPT, from localStorage)
// and measures text with a canvas for the writing lines.
//
// The HTML-based components use the player's CSS classes (.cards, .card,
// .word, .syl, .wordcard, .trace, .soundchart, .tally, .pairview); see the
// styles in pages/player/template.html.

/* ---------- pictures and drawn components ---------- */
// "Scattered" groups sit on a loose grid: one cell each, some cells empty,
// a small fixed offset per cell. Nothing overlaps, and a group looks the
// same every time, so it can be counted.
const SCATTER_GRID = { 4: [3, 2, [0, 4, 2, 3, 1, 5]], 6: [3, 3, [0, 5, 7, 2, 3, 8, 1, 6, 4]], 12: [4, 3, [0, 6, 11, 3, 9, 1, 4, 10, 7, 2, 8, 5]] };
const JITTER = [[.12, -.10], [-.10, .08], [.08, .12], [-.12, -.06], [.10, -.12], [-.08, .10], [.06, .08], [-.06, -.12], [.12, .06], [-.12, .04], [.04, .10], [-.04, -.08]];
function group(o, opts = {}) {
  const one = pic({ ...o, count: undefined });
  const n = o.count, small = opts.small;
  if (o.layout === "scattered") {
    // More than 12 things: a wider grid, cells taken in a fixed scattered order.
    const big = (k) => { const cols = Math.ceil(Math.sqrt(k * 1.4)), rows = Math.ceil(k / cols), cells = cols * rows, gcd = (a, b) => (b ? gcd(b, a % b) : a), step = [7, 11, 13, 17].find((k) => gcd(k, cells) === 1); return [cols, rows, Array.from({ length: cells }, (_, i) => (i * step) % cells)]; };
    const [cols, rows, order] = n <= 4 ? SCATTER_GRID[4] : n <= 6 ? SCATTER_GRID[6] : n <= 12 ? SCATTER_GRID[12] : big(n);
    const W = small ? 96 : 330, H = small ? 110 : 240, cw = W / cols, ch = H / rows, size = Math.floor(Math.min(cw, ch) * 0.74);
    const items = Array.from({ length: n }, (_, i) => {
      const cell = order[i], c = cell % cols, r = Math.floor(cell / cols), [jx, jy] = JITTER[cell % JITTER.length];
      const x = (c + 0.5 + jx) * cw - size / 2, y = (r + 0.5 + jy) * ch - size / 2;
      return `<span class="it${o.gone && i >= n - o.gone ? " gone" : ""}" data-i="${i}" style="left:${(100 * x) / W}%;top:${(100 * y) / H}%;width:${size}px;height:${size}px">${one}</span>`;
    });
    return `<div class="grp scat" style="height:${H}px;max-width:${W}px;margin:0 auto">${items.join("")}</div>`;
  }
  const size = opts.size ?? (small ? (n > 6 ? 20 : n > 3 ? 24 : 30) : n > 5 ? 52 : n > 3 ? 62 : 80);
  // gone: the last k things are crossed out, taken away.
  const gone = (i) => o.gone && i >= n - o.gone ? ' gone' : "";
  return `<div class="grp row">${Array.from({ length: n }, (_, i) => `<span class="it${gone(i)}" data-i="${i}" style="width:${size}px;height:${size}px">${one}</span>`).join("")}</div>`;
}
function pic(o, opts) {
  if (!o) return "";
  // A whole story: groups: [8, 5] draws two groups side by side ("8, and 5 more");
  // gone: 2 crosses out the last 2 of the group ("6 birds, 2 fly away").
  if (o.groups && o.object) { opts = opts ?? {}; const big = Math.max(...o.groups), size = opts.small ? (big > 6 ? 18 : 24) : big > 5 ? 40 : big > 3 ? 50 : 60;
    return `<div class="grps">${o.groups.map((g) => `<div class="tray">${group({ ...o, groups: undefined, count: g }, { ...opts, size })}</div>`).join("")}</div>`; }
  if (o.count != null && o.object) return group(o, opts);
  if (o.drawn === "colour-swatch") return swatch(o.colour);
  const f = o.colour && D.pics.includes(`${o.object}.${o.colour}.png`) ? `${o.object}.${o.colour}.png` : `${o.object}.png`;
  const img = `<img src="${A}objects/${f}" alt="${esc(D.objects[o.object]?.de ?? o.object)}">`;
  // crossed: a "not allowed" sign, a red ring with a line across the picture.
  return o.crossed ? `<span style="position:relative;display:inline-block">${img}<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="50" cy="50" r="44" fill="none" stroke="#E53935" stroke-width="8"/><line x1="19" y1="19" x2="81" y2="81" stroke="#E53935" stroke-width="8" stroke-linecap="round"/></svg></span>` : img;
}
const swatch = (c) => `<svg viewBox="0 0 100 100" width="84" height="84"><path d="M50 8c22 0 40 14 40 38 0 26-18 46-42 46S10 76 10 52 28 8 50 8z" fill="${D.colours[c]}" stroke="#2b0f45" stroke-width="5"/><path d="M30 34c4-8 12-12 20-12" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round" fill="none"/></svg>`;
function counter(x, y, fill, cls = "") { return `<circle class="${cls}" cx="${x}" cy="${y}" r="12" fill="${fill}" stroke="#2b0f45" stroke-width="2.5" ${cls === "gone" ? 'opacity=".45"' : ""}/>` + (cls === "gone" ? `<path d="M${x - 11} ${y - 11} L${x + 11} ${y + 11} M${x + 11} ${y - 11} L${x - 11} ${y + 11}" stroke="#2b0f45" stroke-width="3.5" stroke-linecap="round"/>` : ""); }
function field(rows, opts = {}) {
  // rows: [[colour per cell or null] x10] ; two rows for a Zwanzigerfeld, one for a ten-frame (2x5)
  const W = 330, cell = 31, gap = 8;
  let s = "";
  rows.forEach((row, r) => row.forEach((c, i) => {
    const x = 8 + i * cell + (i >= 5 ? gap : 0), y = 8 + r * (cell + 6);
    s += `<rect x="${x}" y="${y}" width="${cell - 3}" height="${cell - 3}" rx="6" fill="#fff" stroke="#c9b8da" stroke-width="2"/>`;
    if (c) s += `<g data-r="${r}" data-i="${i}" style="cursor:${opts.tap && r === 1 ? "pointer" : "default"}">${counter(x + 14, y + 14, c.fill, c.cls)}</g>`;
  }));
  return `<svg viewBox="0 0 ${W} ${16 + rows.length * (cell + 6)}" width="100%" style="max-width:${W}px">${s}</svg>`;
}
function zwanziger(a, b, moved = 0) {
  const top = Array(10).fill(null), bot = Array(10).fill(null);
  for (let i = 0; i < a; i++) top[i] = { fill: "#E53935" };
  for (let i = 0; i < moved; i++) top[a + i] = { fill: "#1E88E5", cls: "moved" };
  for (let i = 0; i < b - moved; i++) bot[i] = { fill: "#1E88E5" };
  return field([top, bot]);
}
// cross: the last k counters are crossed out (taken away); fromStart crosses the first k.
function tenFrame(n, split, cross = 0, fromStart = false) { const col = (i) => ({ fill: split && i >= split[0] ? "#1E88E5" : "#E53935", cls: (fromStart ? i < cross : i >= n - cross) ? "gone" : "" }); const r1 = Array(5).fill(null).map((_, i) => i < n ? col(i) : null), r2 = Array(5).fill(null).map((_, i) => i + 5 < n ? col(i + 5) : null); return field([r1.concat(Array(5).fill(null)).slice(0, 5), r2.slice(0, 5)]).replace(/viewBox="0 0 330/, 'viewBox="0 0 170'); }
function house(roof, rows) {
  // More than four floors get shorter floors, so a whole house fits the screen.
  const rh = rows.length > 4 ? 34 : 52, fs = rows.length > 4 ? 24 : 30;
  let s = `<path d="M20 70 L90 12 L160 70 Z" fill="#efe0fb" stroke="#2b0f45" stroke-width="4" stroke-linejoin="round"/><text x="90" y="58" text-anchor="middle" font-size="30" font-weight="700" fill="#2b0f45">${roof}</text>`;
  rows.forEach((r, i) => r.forEach((v, j) => { const x = 28 + j * 62, y = 74 + i * rh; s += `<rect x="${x}" y="${y}" width="62" height="${rh}" fill="#fff" stroke="#2b0f45" stroke-width="4"/><text x="${x + 31}" y="${y + rh / 2 + fs / 3}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${v == null ? "#8e3bd1" : "#2b0f45"}">${v == null ? "?" : v}</text>`; }));
  return `<svg viewBox="0 0 180 ${80 + rows.length * rh}" width="${rows.length > 4 ? 150 : 180}">${s}</svg>`;
}
// Schriftliches Rechnen: numbers right-aligned in columns, the sign before the last row, the
// Übertrag small above the line, then the result; "_" in a result is a gap, "?" a highlighted digit.
function writtenCalc(o) {
  const rows = o.rows ?? [], res = o.result ?? "", carry = o.carry ?? "", partials = o.partials ?? [];
  const n = Math.max(...rows.map((r) => r.length), res.length, carry.length, ...partials.map((r) => r.length)) + 1, cw = 30, W = n * cw + 16;
  const put = (str, yy, size, colour) => { const k = n - str.length; [...str].forEach((ch, i) => { if (ch === " ") return; const x = 8 + (k + i) * cw + cw / 2;
    s += ch === "_" ? `<rect x="${x - 11}" y="${yy - 24}" width="22" height="28" rx="4" fill="#f6effc" stroke="#8e3bd1" stroke-width="2"/>` : `<text x="${x}" y="${yy}" text-anchor="middle" font-size="${size}" font-weight="700" fill="${ch === "?" ? "#8e3bd1" : colour}">${esc(ch)}</text>`; }); };
  // above: small digits written over the first number when entbündelt; cross: "x" marks a crossed-out digit of the first row.
  const above = o.above ?? "", cross = o.cross ?? "";
  let y = above.trim() ? 56 : 34, s = "";
  if (above.trim()) put(above, 26, 16, "#8e3bd1");
  rows.forEach((r, i) => { put(r, y, 28, "#2b0f45");
    if (i === 0 && cross.includes("x")) { const k = n - cross.length; [...cross].forEach((ch, j) => { if (ch !== "x") return; const x = 8 + (k + j) * cw + cw / 2; s += `<line x1="${x - 10}" y1="${y + 2}" x2="${x + 10}" y2="${y - 22}" stroke="#8e3bd1" stroke-width="3"/>`; }); } if (i === rows.length - 1) s += `<text x="${8 + cw / 2}" y="${y}" text-anchor="middle" font-size="28" font-weight="700" fill="#2b0f45">${o.op === "-" || o.op === "−" ? "−" : o.op === "·" ? "·" : o.op === "×" || o.op === "x" ? "×" : "+"}</text>`; y += 36; });
  if (carry.trim()) { put(carry, y - 6, 16, "#8e3bd1"); y += 6; }
  s += `<line x1="8" y1="${y - 22}" x2="${W - 8}" y2="${y - 22}" stroke="#2b0f45" stroke-width="3"/>`;
  // Long multiplication: the partial products sit between two lines, the total below the second.
  if (partials.length) { y += 12; partials.forEach((r) => { put(r, y, 28, "#2b0f45"); y += 36; }); s += `<line x1="8" y1="${y - 22}" x2="${W - 8}" y2="${y - 22}" stroke="#2b0f45" stroke-width="3"/>`; }
  if (res) { y += 12; put(res, y, 28, "#2b0f45"); }
  return `<svg viewBox="0 0 ${W} ${y + 10}" width="${Math.min(W * 1.1, 260)}">${s}</svg>`;
}
// Short division, the bus stop: divisor outside, dividend under the bar, quotient on top;
// carries are small digits written before a dividend digit; "_" in the quotient is a gap; remainder adds "r n".
function shortDivision(o) {
  const dd = String(o.dividend ?? ""), q = String(o.quotient ?? "").padStart(dd.length, " "), cr = String(o.carries ?? "").padStart(dd.length, " "), cw = 34, x0 = 64, W = x0 + dd.length * cw + (o.remainder != null ? 70 : 16);
  let s = `<text x="${x0 - 14}" y="92" text-anchor="end" font-size="30" font-weight="700" fill="#2b0f45">${esc(String(o.divisor ?? ""))}</text>`;
  s += `<path d="M${x0 - 6} 104 Q ${x0 + 4} 82 ${x0 - 6} 60 L ${x0 + dd.length * cw + 6} 60" fill="none" stroke="#2b0f45" stroke-width="3.5"/>`;
  [...dd].forEach((ch, i) => { const x = x0 + i * cw + cw / 2; s += `<text x="${x}" y="92" text-anchor="middle" font-size="30" font-weight="700" fill="#2b0f45">${esc(ch)}</text>`;
    if (cr[i] && cr[i] !== " ") s += `<text x="${x - 13}" y="78" text-anchor="middle" font-size="15" font-weight="700" fill="#8e3bd1">${esc(cr[i])}</text>`;
    const c = q[i]; if (c && c !== " ") s += c === "_" ? `<rect x="${x - 12}" y="22" width="24" height="30" rx="4" fill="#f6effc" stroke="#8e3bd1" stroke-width="2"/>` : `<text x="${x}" y="48" text-anchor="middle" font-size="30" font-weight="700" fill="${c === "?" ? "#8e3bd1" : "#2b0f45"}">${esc(c)}</text>`; });
  if (o.remainder != null) s += `<text x="${x0 + dd.length * cw + 10}" y="48" font-size="24" font-weight="700" fill="#2b0f45">r ${esc(String(o.remainder))}</text>`;
  return `<svg viewBox="0 0 ${W} 112" width="${Math.min(W * 1.1, 320)}">${s}</svg>`;
}
// A Zahlenmauer: rows from the bottom up, each brick the sum of the two below; null is a gap.
// An analogue clock: hour 1-12, minute 0-59; the hour hand moves on with the minutes.
// Shapes and solids, flat colours with a dark outline; 3D solids drawn in a simple oblique view.
const SHAPE_COL = { red: "#E53935", blue: "#1E88E5", yellow: "#FDD835", green: "#43A047", orange: "#FB8C00", purple: "#8E24AA", pink: "#F48FB1", brown: "#8D6E63", black: "#263238", white: "#FFFFFF" };
function shape(o) {
  // A row or a column of shapes: kinds in `row` or `column`, colours in `colours` (one per shape, or one for all); "?" leaves a gap.
  const list = o.row ?? o.column;
  if (list) { const cs = o.colours ?? [], n = list.length, sz = o.size ?? Math.min(76, Math.floor((o.row ? 320 : 600) / n) - 6); return `<div style="display:flex;flex-direction:${o.row ? "row" : "column"};gap:4px;align-items:center;justify-content:center">${list.map((k, i) => k === "?" ? `<svg viewBox="0 0 120 120" width="${sz}" height="${sz}"><rect x="10" y="10" width="100" height="100" rx="14" fill="none" stroke="#947dec" stroke-width="5" stroke-dasharray="12 10"/><text x="60" y="78" text-anchor="middle" font-size="56" font-weight="800" fill="#947dec">?</text></svg>` : shape({ kind: k, colour: Array.isArray(cs) ? cs[i] ?? cs[0] : cs, size: sz })).join("")}</div>`; }
  const f = SHAPE_COL[o.colour] ?? "#b9a6f5", st = `stroke="#2b0f45" stroke-width="3" stroke-linejoin="round"`, sh = "#00000022";
  const g = {
    circle: `<circle cx="60" cy="60" r="44" fill="${f}" ${st}/>`,
    triangle: `<polygon points="60,14 108,100 12,100" fill="${f}" ${st}/>`,
    square: `<rect x="18" y="18" width="84" height="84" fill="${f}" ${st}/>`,
    rectangle: `<rect x="8" y="32" width="104" height="56" fill="${f}" ${st}/>`,
    hexagon: `<polygon points="35,16 85,16 110,60 85,104 35,104 10,60" fill="${f}" ${st}/>`,
    pentagon: `<polygon points="60,14 106,47 88,101 32,101 14,47" fill="${f}" ${st}/>`,
    octagon: `<polygon points="40,12 80,12 108,40 108,80 80,108 40,108 12,80 12,40" fill="${f}" ${st}/>`,
    parallelogram: `<polygon points="36,30 112,30 84,90 8,90" fill="${f}" ${st}/>`,
    trapezoid: `<polygon points="38,30 82,30 112,90 8,90" fill="${f}" ${st}/>`,
    cube: `<polygon points="18,40 78,40 78,100 18,100" fill="${f}" ${st}/><polygon points="18,40 40,18 100,18 78,40" fill="${f}" ${st}/><polygon points="78,40 100,18 100,78 78,100" fill="${f}" ${st}/><polygon points="78,40 100,18 100,78 78,100" fill="${sh}"/>`,
    cuboid: `<polygon points="8,48 84,48 84,100 8,100" fill="${f}" ${st}/><polygon points="8,48 30,28 106,28 84,48" fill="${f}" ${st}/><polygon points="84,48 106,28 106,80 84,100" fill="${f}" ${st}/><polygon points="84,48 106,28 106,80 84,100" fill="${sh}"/>`,
    sphere: `<circle cx="60" cy="60" r="44" fill="${f}" ${st}/><ellipse cx="60" cy="60" rx="44" ry="13" fill="none" stroke="#2b0f45" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="44" cy="42" r="9" fill="#ffffff66"/>`,
    cylinder: `<path d="M22 28 V92 A38 12 0 0 0 98 92 V28" fill="${f}" ${st}/><ellipse cx="60" cy="28" rx="38" ry="12" fill="${f}" ${st}/><ellipse cx="60" cy="28" rx="38" ry="12" fill="#ffffff33"/>`,
    cone: `<path d="M60 12 L98 92 A38 12 0 0 1 22 92 Z" fill="${f}" ${st}/><path d="M22 92 A38 12 0 0 0 98 92" fill="none" stroke="#2b0f45" stroke-width="1.5" stroke-dasharray="4 4"/>`,
    pyramid: `<polygon points="60,12 14,96 82,106" fill="${f}" ${st}/><polygon points="60,12 82,106 108,86" fill="${f}" ${st}/><polygon points="60,12 82,106 108,86" fill="${sh}"/><path d="M14 96 L40 78 L108 86 M40 78 L60 12" fill="none" stroke="#2b0f45" stroke-width="1.5" stroke-dasharray="4 4"/>`,
  }[o.kind];
  return g ? `<svg viewBox="0 0 120 120" width="${o.size ?? 120}" height="${o.size ?? 120}">${g}</svg>` : `<div class="note">[shape ${esc(o.kind)}]</div>`;
}
// A bar chart (bars with values on a scale) or, with tally: true, a Strichliste in fives.
// A bar whose label names a colour ("Gelb", "Team Grün", "blue") is drawn in that colour; other bars take the palette in order.
const COLOUR_WORDS = { rot: "red", red: "red", blau: "blue", blue: "blue", gelb: "yellow", yellow: "yellow", "grün": "green", green: "green", orange: "orange", lila: "purple", violett: "purple", purple: "purple", rosa: "pink", pink: "pink", braun: "brown", brown: "brown", schwarz: "black", black: "black", "weiß": "white", white: "white" };
const barColour = (label, i) => { const w = String(label ?? "").toLowerCase().split(/[^a-zäöüß]+/).find((x) => COLOUR_WORDS[x]); return w ? SHAPE_COL[COLOUR_WORDS[w]] : Object.values(SHAPE_COL)[i % 8]; };
function barChart(o) {
  const rows = o.rows ?? [];
  // Pictogram: each row repeats a picture value / key times; a remainder of half a key shows half a picture.
  if (o.pictogram_object) {
    // per: what one picture stands for (key is the older name; as an option, key is its id).
    const key = o.per ?? o.key ?? 1, src = `${A}objects/${o.pictogram_object}.png`;
    const row = (v) => { const full = Math.floor(v / key), half = v % key ? 1 : 0; return `${'<img src="' + src + '" style="width:30px;height:30px">'.repeat(full)}${half ? `<span style="display:inline-block;width:15px;overflow:hidden;vertical-align:top"><img src="${src}" style="width:30px;height:30px;max-width:none"></span>` : ""}`; };
    return `<table class="tally">${rows.map(([l, v]) => `<tr><td>${esc(l)}</td><td style="text-align:left">${row(v)}</td></tr>`).join("")}</table>${key > 1 ? `<div style="font:600 14px Andika,sans-serif;margin-top:6px"><img src="${src}" style="width:22px;height:22px;vertical-align:middle"> = ${key}</div>` : ""}`;
  }
  if (o.tally) {
    const marks = (n) => { let t = ""; for (let i = 0; i < n; i += 5) { const k = Math.min(5, n - i), x = (i / 5) * 46; for (let j = 0; j < Math.min(k, 4); j++) t += `<line x1="${x + j * 9}" y1="4" x2="${x + j * 9}" y2="30" stroke="#2b0f45" stroke-width="3" stroke-linecap="round"/>`; if (k === 5) t += `<line x1="${x - 4}" y1="26" x2="${x + 31}" y2="8" stroke="#2b0f45" stroke-width="3" stroke-linecap="round"/>`; } return `<svg viewBox="-6 0 ${Math.max(1, Math.ceil(n / 5)) * 46 + 6} 34" height="30">${t}</svg>`; };
    return `<table class="tally">${rows.map(([l, v]) => `<tr>${l ? `<td>${esc(l)}</td>` : ""}<td>${marks(v)}</td></tr>`).join("")}</table>`;
  }
  // from: the scale starts above 0 (a cut-off axis, for spotting misleading charts).
  const lo = o.from ?? 0, max = Math.max(...rows.map((r) => r[1]), lo + 1), step = o.step ?? (max - lo > 20 ? 5 : max - lo > 10 ? 2 : 1), top = lo + Math.ceil((max - lo) / step) * step, H = 150, bw = Math.min(56, 260 / rows.length - 12), x0 = 34;
  let s = "";
  for (let v = lo; v <= top; v += step) { const y = 10 + H - ((v - lo) / (top - lo)) * H; s += `<line x1="${x0}" y1="${y}" x2="320" y2="${y}" stroke="#e3dcf7" stroke-width="1"/><text x="${x0 - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#2b0f45">${v}</text>`; }
  rows.forEach(([l, v], i) => { const x = x0 + 12 + i * (bw + 12), h = (Math.max(v, lo) - lo) / (top - lo) * H, c = barColour(l, i); s += `<rect x="${x}" y="${10 + H - h}" width="${bw}" height="${h}" fill="${c}" stroke="#2b0f45" stroke-width="2"/><text x="${x + bw / 2}" y="${H + 26}" text-anchor="middle" font-size="12" font-weight="700" fill="#2b0f45">${esc(l)}</text>`; });
  s += `<line x1="${x0}" y1="${10 + H}" x2="320" y2="${10 + H}" stroke="#2b0f45" stroke-width="2.5"/><line x1="${x0}" y1="10" x2="${x0}" y2="${10 + H}" stroke="#2b0f45" stroke-width="2.5"/>`;
  return `<svg viewBox="0 0 330 ${H + 34}" width="100%" style="max-width:360px">${s}</svg>`;
}
// Coins and notes by value in cent (or pence), in the curriculum's currency or `currency: eur|gbp`: 1, 2, 5, 10, 20, 50, 100, 200 are coins, 500 and up are notes.
function coins(o) {
  const gb = o.currency ? o.currency === "gbp" : (set?.curriculum ?? "").startsWith("en"), lab = (v) => gb ? (v >= 100 ? `£${v / 100}` : `${v}p`) : (v >= 100 ? `${v / 100} €` : `${v} ct`);
  return `<div class="coins">${(o.values ?? []).map((v) => {
    if (v >= 500) { const c = gb ? { 500: "#7fb7a4", 1000: "#e08a4a", 2000: "#9b7bc8", 5000: "#d9534f" }[v] : { 500: "#9e9e9e", 1000: "#e57373", 2000: "#64b5f6", 5000: "#ffb74d", 10000: "#81c784" }[v]; return `<svg viewBox="0 0 120 64" width="96" height="51"><rect x="3" y="3" width="114" height="58" rx="6" fill="${c ?? "#bbb"}" stroke="#2b0f45" stroke-width="3"/><rect x="12" y="12" width="96" height="40" rx="4" fill="none" stroke="#ffffff99" stroke-width="2"/><text x="60" y="41" text-anchor="middle" font-size="22" font-weight="800" fill="#2b0f45">${lab(v)}</text></svg>`; }
    // Real relative sizes: euro coins, or UK coins (2p bigger than 5p, 10p bigger than 20p).
    const r = (gb ? { 1: 18, 2: 23, 5: 16, 10: 22, 20: 19, 50: 24, 100: 21, 200: 25 } : { 1: 16, 2: 18, 5: 20, 10: 19, 20: 21, 50: 24, 100: 23, 200: 26 })[v] ?? 20, copper = v <= 5 && !gb || gb && v <= 2, gold = gb ? v === 100 : v >= 10 && v <= 50;
    const fill = copper ? "#c8794a" : gold ? "#e7c25a" : "#cfd4da", bi = v === 200 || (!gb && v === 100);
    const inner = bi ? `<circle cx="30" cy="30" r="${r * 0.68}" fill="${(v === 200) === !gb ? "#e7c25a" : "#cfd4da"}" stroke="#2b0f4566" stroke-width="1.5"/>` : "";
    const ring = bi ? ((v === 200) === !gb ? "#cfd4da" : "#e7c25a") : fill;
    // 20p and 50p are seven-sided (curved heptagons, drawn as heptagons).
    const hept = gb && (v === 20 || v === 50), body = hept ? `<polygon points="${Array.from({ length: 7 }, (_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7; return `${30 + r * Math.cos(a)},${30 + r * Math.sin(a)}`; }).join(" ")}" fill="${ring}" stroke="#2b0f45" stroke-width="2.5" stroke-linejoin="round"/>` : `<circle cx="30" cy="30" r="${r}" fill="${ring}" stroke="#2b0f45" stroke-width="2.5"/>`;
    return `<svg viewBox="0 0 60 60" width="${r * 2 + 8}" height="${r * 2 + 8}">${body}${inner}<text x="30" y="${30 + (lab(v).length > 4 ? 4 : 5)}" text-anchor="middle" font-size="${lab(v).length > 4 ? 10 : 13}" font-weight="800" fill="#2b0f45">${lab(v)}</text></svg>`;
  }).join("")}</div>`;
}
// A ruler in cm with a strip to measure above it; the strip starts at `start` (0 if left out).
function ruler(o) {
  const to = o.to ?? 15, w = 300, x0 = 14, sc = (v) => x0 + (v / to) * w, y = 70, start = o.start ?? 0;
  let s = `<rect x="${x0 - 6}" y="${y}" width="${w + 12}" height="50" rx="5" fill="#fff6c9" stroke="#2b0f45" stroke-width="2.5"/>`;
  for (let mm = 0; mm <= to * 10; mm++) { const v = mm / 10, big = mm % 10 === 0, mid = mm % 5 === 0; if (to > 20 && !big && !mid) continue; s += `<line x1="${sc(v)}" y1="${y}" x2="${sc(v)}" y2="${y + (big ? 18 : mid ? 12 : 7)}" stroke="#2b0f45" stroke-width="${big ? 2 : 1}"/>`; if (big) s += `<text x="${sc(v)}" y="${y + 38}" text-anchor="middle" font-size="${to > 20 ? 10 : 14}" font-weight="700" fill="#2b0f45">${v}</text>`; }
  s += `<text x="${x0 + 4}" y="${y + 47}" font-size="11" fill="#2b0f45">cm</text>`;
  if (o.length != null) s += `<rect x="${sc(start)}" y="${y - 30}" width="${sc(start + o.length) - sc(start)}" height="22" rx="4" fill="${o.colour === "blue" ? "#1E88E5" : o.colour === "green" ? "#43A047" : "#E53935"}" stroke="#2b0f45" stroke-width="2"/><line x1="${sc(start)}" y1="${y - 8}" x2="${sc(start)}" y2="${y}" stroke="#2b0f45" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="${sc(start + o.length)}" y1="${y - 8}" x2="${sc(start + o.length)}" y2="${y}" stroke="#2b0f45" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  return `<svg viewBox="0 0 330 130" width="100%" style="max-width:360px">${s}</svg>`;
}
// A circle with its parts: `parts` lists which to draw (centre, radius,
// diameter, circumference, chord), `labels: true` names them, `highlight`
// colours one part red, `values` writes a length on radius or diameter.
function circleParts(o) {
  const c = 110, r = 76, en = (set?.language ?? "de") === "en", parts = o.parts ?? ["centre", "radius"], hi = o.highlight;
  const NAME = en ? { centre: "centre", radius: "radius", diameter: "diameter", circumference: "circumference", chord: "chord" } : { centre: "Mittelpunkt", radius: "Radius", diameter: "Durchmesser", circumference: "Umfang", chord: "Sehne" };
  const col = (p) => p === hi ? "#E53935" : "#2b0f45", w = (p) => p === hi ? 5 : 3, lab = (p) => (o.labels ? NAME[p] : "") + (o.values?.[p] ? `${o.labels ? " " : ""}${o.values[p]}` : "");
  let s = `<circle cx="${c}" cy="${c}" r="${r}" fill="#f3eefc" stroke="${parts.includes("circumference") ? col("circumference") : "#2b0f45"}" stroke-width="${parts.includes("circumference") ? w("circumference") : 3}"/>`;
  if (parts.includes("diameter")) s += `<line x1="${c - r}" y1="${c}" x2="${c + r}" y2="${c}" stroke="${col("diameter")}" stroke-width="${w("diameter")}"/>` + (lab("diameter") ? `<text x="${c - r / 2}" y="${c + 18}" text-anchor="middle" font-size="13" font-weight="700" fill="${col("diameter")}">${esc(lab("diameter"))}</text>` : "");
  if (parts.includes("radius")) { const a = -Math.PI / 3, x2 = c + r * Math.cos(a), y2 = c + r * Math.sin(a); s += `<line x1="${c}" y1="${c}" x2="${x2}" y2="${y2}" stroke="${col("radius")}" stroke-width="${w("radius")}"/>` + (lab("radius") ? `<text x="${c + 34}" y="${c - 34}" font-size="13" font-weight="700" fill="${col("radius")}">${esc(lab("radius"))}</text>` : ""); }
  if (parts.includes("chord")) { const a1 = Math.PI * 0.62, a2 = Math.PI * 0.12; s += `<line x1="${c + r * Math.cos(a1)}" y1="${c + r * Math.sin(a1)}" x2="${c + r * Math.cos(a2)}" y2="${c + r * Math.sin(a2)}" stroke="${col("chord")}" stroke-width="${w("chord")}"/>` + (lab("chord") ? `<text x="${c + 18}" y="${c + 72}" text-anchor="middle" font-size="13" font-weight="700" fill="${col("chord")}">${esc(lab("chord"))}</text>` : ""); }
  if (parts.includes("circumference") && lab("circumference")) s += `<text x="${c - 30}" y="${c - r - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="${col("circumference")}">${esc(lab("circumference"))}</text>`;
  if (parts.includes("centre")) s += `<circle cx="${c}" cy="${c}" r="${hi === "centre" ? 6 : 4.5}" fill="${col("centre")}"/>` + (lab("centre") ? `<text x="${c - 8}" y="${c - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${col("centre")}">${esc(lab("centre"))}</text>` : "");
  return `<svg viewBox="0 0 220 220" width="100%" style="max-width:240px">${s}</svg>`;
}
function clock(o) {
  const c = 90, r = 80, ang = (f) => (f * 2 * Math.PI) - Math.PI / 2, hand = (f, len, w, col) => `<line x1="${c}" y1="${c}" x2="${c + len * Math.cos(ang(f))}" y2="${c + len * Math.sin(ang(f))}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  let s = `<circle cx="${c}" cy="${c}" r="${r}" fill="#fff" stroke="#2b0f45" stroke-width="5"/>`;
  // roman: true writes I to XII, which Year 3 in England reads.
  const ROM = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  for (let i = 1; i <= 12; i++) s += `<text x="${c + (o.roman ? 55 : 64) * Math.cos(ang(i / 12))}" y="${c + (o.roman ? 55 : 64) * Math.sin(ang(i / 12)) + (o.roman ? 5 : 8)}" text-anchor="middle" font-size="${o.roman ? (ROM[i].length > 2 ? 13 : 16) : 22}" font-weight="700" fill="#2b0f45">${o.roman ? ROM[i] : i}</text>`;
  for (let i = 0; i < 60; i++) if (i % 5) s += `<circle cx="${c + 74 * Math.cos(ang(i / 60))}" cy="${c + 74 * Math.sin(ang(i / 60))}" r="1.6" fill="#2b0f45"/>`;
  const m = o.minute ?? 0, h = ((o.hour ?? 12) % 12) + m / 60;
  // clock_hands_drag: round grips on the hand ends show they can be moved.
  const grip = (f, len, col) => o._drag ? `<circle cx="${c + len * Math.cos(ang(f))}" cy="${c + len * Math.sin(ang(f))}" r="7" fill="${col}" stroke="#fff" stroke-width="2"/>` : "";
  s += hand(h / 12, 34, 8, "#2b0f45") + hand(m / 60, 50, 5, "#8e3bd1") + grip(h / 12, 34, "#2b0f45") + grip(m / 60, 50, "#8e3bd1") + `<circle cx="${c}" cy="${c}" r="6" fill="#2b0f45"/>`;
  const dig = o.digital ? `<div style="font:700 26px Andika,sans-serif;text-align:center">${esc(String(o.hour))}:${String(m).padStart(2, "0")}</div>` : "";
  return `<div><svg viewBox="0 0 180 180" width="${o._drag ? 220 : 160}" height="${o._drag ? 220 : 160}" ${o._drag ? 'style="touch-action:none;cursor:grab"' : ""}>${s}</svg>${dig}</div>`;
}
function numberWall(rows) {
  const n = rows[0].length, w = 66, h = 44, W = n * w + 8, H = rows.length * h + 8;
  let s = "";
  rows.forEach((r, i) => r.forEach((v, j) => { const x = 4 + (i * w) / 2 + j * w, y = H - 4 - (i + 1) * h;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${v == null ? "#f6effc" : "#fff"}" stroke="#2b0f45" stroke-width="4"/><text x="${x + w / 2}" y="${y + h / 2 + 10}" text-anchor="middle" font-size="28" font-weight="700" fill="${v == null ? "#8e3bd1" : "#2b0f45"}">${v == null ? "?" : v}</text>`; }));
  return `<svg viewBox="0 0 ${W} ${H}" width="${Math.min(W, 330)}" style="max-width:100%">${s}</svg>`;
}
// The Hunderterfeld: 10 by 10 dots, gaps after five each way, filled row by row.
function hundredField(filled, split) {
  let g = "";
  for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), c = i % 10, x = 14 + c * 26 + (c >= 5 ? 8 : 0), y = 14 + r * 26 + (r >= 5 ? 8 : 0);
    g += `<circle cx="${x}" cy="${y}" r="10" fill="${i < filled ? (split && i >= split[0] ? "#1E88E5" : "#E53935") : "#fff"}" stroke="${i < filled ? "#2b0f45" : "#cbb9dd"}" stroke-width="2"/>`; }
  return `<svg viewBox="0 0 280 280" width="260">${g}</svg>`;
}
// The Hundertertafel / hundred square: 1 to 100; highlight and hide lists.
function hundredSquare(o) {
  const hl = new Set(o.highlight ?? []), hide = new Set(o.hide ?? []); let g = "";
  for (let n = 1; n <= 100; n++) { const r = Math.floor((n - 1) / 10), c = (n - 1) % 10, x = c * 30, y = r * 30;
    g += `<rect x="${x + 1}" y="${y + 1}" width="28" height="28" rx="4" fill="${hide.has(n) ? "#efe0fb" : hl.has(n) ? "#ffe08a" : "#fff"}" stroke="#2b0f45" stroke-width="1.5"/><text x="${x + 15}" y="${y + 20}" text-anchor="middle" font-size="12" font-weight="700" fill="${hide.has(n) ? "#8e3bd1" : "#2b0f45"}">${hide.has(n) ? "?" : n}</text>`; }
  return `<svg viewBox="0 0 302 302" width="300">${g}</svg>`;
}
// Base-ten blocks: tens as rods of ten, ones as single cubes.
function baseTen(tens, ones, hundreds = 0) {
  let g = "", x = 4;
  // Hundreds as flats of 10 by 10, two to a column, beside the rods.
  for (let h = 0; h < hundreds; h++) { const fx = x + Math.floor(h / 2) * 78, fy = 4 + (h % 2) * 78;
    g += `<rect x="${fx}" y="${fy}" width="72" height="72" fill="#7E57C2" stroke="#2b0f45" stroke-width="1.5"/>`;
    for (let k = 1; k < 10; k++) g += `<line x1="${fx + k * 7.2}" y1="${fy}" x2="${fx + k * 7.2}" y2="${fy + 72}" stroke="#2b0f45" stroke-width=".6"/><line x1="${fx}" y1="${fy + k * 7.2}" x2="${fx + 72}" y2="${fy + k * 7.2}" stroke="#2b0f45" stroke-width=".6"/>`; }
  if (hundreds) x += Math.ceil(hundreds / 2) * 78 + 6;
  for (let t = 0; t < tens; t++) { for (let k = 0; k < 10; k++) g += `<rect x="${x}" y="${4 + k * 15}" width="15" height="15" fill="#4C8DF6" stroke="#2b0f45" stroke-width="1.5"/>`; x += 22; }
  x += 8;
  // Ones stack two wide, five high; more than ten start a new pair of columns.
  for (let o = 0; o < ones; o++) g += `<rect x="${x + (Math.floor(o / 10) * 2 + (o % 2)) * 19}" y="${124 - Math.floor((o % 10) / 2) * 19}" width="15" height="15" fill="#F5A524" stroke="#2b0f45" stroke-width="1.5"/>`;
  const w = x + (ones ? 44 + (ones > 10 ? 38 : 0) : 0);
  return `<svg viewBox="0 0 ${Math.max(w, 40)} 160" width="${Math.min(320, Math.max(w, 40) * 1.4)}">${g}</svg>`;
}
// Place-value chart; column letters follow the lesson's language.
function placeValue(columns, values) {
  const dec = { tenths: "1/10", hundredths: "1/100", thousandths: "1/1000" };
  const L = { de: { millions: "M", "hundred-thousands": "HT", "ten-thousands": "ZT", thousands: "T", hundreds: "H", tens: "Z", ones: "E", ...dec }, en: { millions: "M", "hundred-thousands": "HTh", "ten-thousands": "TTh", thousands: "Th", hundreds: "H", tens: "T", ones: "O", ...dec } }[set?.language ?? "de"] ?? { millions: "M", "hundred-thousands": "HTh", "ten-thousands": "TTh", thousands: "Th", hundreds: "H", tens: "T", ones: "O", ...dec };
  let g = ""; columns.forEach((c, i) => { const x = i * 80, v = values?.[i];
    g += `<rect x="${x + 2}" y="2" width="76" height="40" fill="${dec[c] ? "#fde7d4" : "#efe0fb"}" stroke="#2b0f45" stroke-width="3"/><text x="${x + 40}" y="31" text-anchor="middle" font-size="${dec[c] ? 20 : 26}" font-weight="700" fill="#2b0f45">${L[c]}</text>`;
    g += `<rect x="${x + 2}" y="42" width="76" height="60" fill="#fff" stroke="#2b0f45" stroke-width="3"/><text x="${x + 40}" y="86" text-anchor="middle" font-size="38" font-weight="700" fill="${v == null ? "#8e3bd1" : "#2b0f45"}">${v == null ? "?" : v}</text>`;
    // The decimal point sits on the line between ones and tenths.
    if (c === "ones" && columns[i + 1] === "tenths") g += `<circle cx="${x + 80}" cy="92" r="6" fill="#2b0f45"/>`; });
  return `<svg viewBox="0 0 ${columns.length * 80 + 4} 106" width="${Math.min(columns.length * 80 + 4, 330)}">${g}</svg>`;
}
// The part-whole model (England): whole above, two parts below; null is a gap.
function partWhole(whole, parts) {
  const c = (x, y, v, big) => `<circle cx="${x}" cy="${y}" r="${big ? 38 : 32}" fill="${v == null ? "#efe0fb" : "#fff"}" stroke="#2b0f45" stroke-width="4"/><text x="${x}" y="${y + 12}" text-anchor="middle" font-size="34" font-weight="700" fill="${v == null ? "#8e3bd1" : "#2b0f45"}">${v == null ? "?" : v}</text>`;
  return `<svg viewBox="0 0 240 200" width="220"><line x1="120" y1="60" x2="62" y2="140" stroke="#2b0f45" stroke-width="4"/><line x1="120" y1="60" x2="178" y2="140" stroke="#2b0f45" stroke-width="4"/>${c(120, 48, whole, true)}${c(62, 150, parts[0])}${c(178, 150, parts[1])}</svg>`;
}
function equation(text, split) {
  const tokens = text.split(" ");
  const m = split?.match(/^(\d+) = (\d+) \+ (\d+)$/);
  let idx = m ? tokens.findIndex((t, i) => i > 0 && t === m[1]) : -1;
  const parts = tokens.map((t, i) => `<span style="display:inline-block;position:relative;min-width:30px;text-align:center">${t === "_" ? '<span style="color:#8e3bd1">?</span>' : esc(t)}${i === idx ? `<svg viewBox="0 0 80 70" width="80" style="position:absolute;left:50%;top:100%;transform:translateX(-50%)"><path d="M40 4 L18 34 M40 4 L62 34" stroke="#8e3bd1" stroke-width="4" stroke-linecap="round"/><text x="14" y="62" text-anchor="middle" font-size="26" font-weight="700" fill="#2b0f45">${m[2]}</text><text x="66" y="62" text-anchor="middle" font-size="26" font-weight="700" fill="#2b0f45">${m[3]}</text></svg>` : ""}</span>`).join(" ");
  return `<div class="frame" style="padding-bottom:70px">${parts}</div>`;
}
function arcs(points, scale, y0, labelAll) {
  // points: [[from, size], ...] drawn as hops above the line
  return points.map(([f, n]) => { const x1 = scale(f), x2 = scale(f + n), mx = (x1 + x2) / 2, h = Math.min(42, Math.max(26, Math.abs(x2 - x1) * 0.45));
    return `<path d="M${x1} ${y0} Q ${mx} ${y0 - h * 2} ${x2} ${y0}" fill="none" stroke="#8e3bd1" stroke-width="3.5"/><path d="M${x2 - 7 * Math.sign(n)} ${y0 - 9} L${x2} ${y0} L${x2 + 3 * Math.sign(n)} ${y0 - 11}" fill="none" stroke="#8e3bd1" stroke-width="3.5" stroke-linecap="round"/><text x="${mx}" y="${y0 - h - 6}" text-anchor="middle" font-size="18" font-weight="700" fill="#8e3bd1">${n < 0 ? "−" + -n : "+" + n}</text>`; }).join("");
}
function rechenstrich(start, jumps, back = false) {
  // Minus jumps go left; the line spans every point the jumps reach.
  let pos = start; const pts = [start, ...jumps.map((j) => (pos += j))];
  if (!jumps.length) pts.push(back ? start - 5 : start + 5);
  const lo = Math.min(...pts), span = Math.max(Math.max(...pts) - lo, 1);
  const sc = (v) => 24 + ((v - lo) / span) * 282, y = 110;
  let s = `<line x1="10" y1="${y}" x2="320" y2="${y}" stroke="#2b0f45" stroke-width="4" stroke-linecap="round"/>`;
  let at = start; const hops = [];
  jumps.forEach((j) => { hops.push([at, j]); at += j; });
  const marks = [start, ...hops.map(([f, n]) => f + n)];
  s += arcs(hops, sc, y);
  const hideEnd = jumps.length && SHOWN_ANSWER.includes(String(marks.at(-1)));
  marks.forEach((v, i) => { const q = hideEnd && i === marks.length - 1; s += `<line x1="${sc(v)}" y1="${y - 10}" x2="${sc(v)}" y2="${y + 10}" stroke="#2b0f45" stroke-width="4"/><text x="${sc(v)}" y="${y + 36}" text-anchor="middle" font-size="22" font-weight="700" fill="${q ? "#8e3bd1" : "#2b0f45"}">${q ? "?" : v}</text>`; });
  const d = back ? -1 : 1;
  if (!jumps.length) s += `<path d="M${sc(start)} ${y} Q ${sc(start + 1.5 * d)} ${y - 70} ${sc(start + 3 * d)} ${y}" fill="none" stroke="#8e3bd1" stroke-width="3.5" stroke-dasharray="7 7"/><text x="${sc(start + 1.5 * d)}" y="${y - 44}" text-anchor="middle" font-size="22" font-weight="700" fill="#8e3bd1">?</text>`;
  return `<svg viewBox="0 0 330 160" width="100%" style="max-width:330px">${s}</svg>`;
}
function numberLine(o, pick) {
  const from = o.from ?? 0, to = o.to ?? 20, sc = (v) => 15 + ((v - from) / (to - from)) * 300, y = 120;
  let s = `<line x1="8" y1="${y}" x2="322" y2="${y}" stroke="#2b0f45" stroke-width="4" stroke-linecap="round"/>`;
  // step: ticks every 1 (default), 5 or 10, so 0 to 100 stays tappable.
  const step = o.step ?? 1, n = Math.round((to - from) / step);
  // Count ticks by index so decimal steps (0.1) and negative numbers stay exact.
  for (let i = 0; i <= n; i++) {
    const v = Math.round((from + i * step) * 1000) / 1000, k = Math.round(v / step);
    // Long ticks every ten steps, a middle tick at five (on a line in fives, long ticks at the tens).
    const big = step === 5 ? Math.round(v) % 10 === 0 : k % 10 === 0, mid = step !== 5 && k % 5 === 0;
    s += `<line x1="${sc(v)}" y1="${y - (big ? 14 : mid ? 10 : 6)}" x2="${sc(v)}" y2="${y + (big ? 14 : mid ? 10 : 6)}" stroke="#2b0f45" stroke-width="${big ? 4 : 2.5}"/>`;
    // Long labels get the curriculum's thousands separator; the end labels stay inside the line.
    const de = set?.language === "de", lab = (Math.abs(v) >= 10000 ? v.toLocaleString(de ? "de-DE" : "en-GB").replace(/\./g, " ") : String(v).replace(".", de ? "," : ".")).replace("-", "−"), long = lab.length > 4;
    const anchor = long && v === to ? "end" : long && v === from ? "start" : "middle", lx = anchor === "end" ? 326 : anchor === "start" ? 4 : sc(v);
    // labels: fractions names every tick as a fraction of the whole (step 1/8 on 0 to 1: 1/8, 2/8 ...); fractions_of sets the denominator.
    if (o.labels === "fractions") { const den = o.fractions_of ?? Math.round(1 / step), num = Math.round(v * den); s += `<text x="${sc(v)}" y="${y + 40}" text-anchor="middle" font-size="${n > 10 ? 11 : 15}" font-weight="700" fill="#2b0f45">${num % den === 0 ? num / den : num + "/" + den}</text>`; }
    else if (o.labels === "all" || (o.labels === "tens" && big) || ((o.labels === "ends") && (v === from || v === to))) s += `<text x="${lx}" y="${y + 40}" text-anchor="${anchor}" font-size="${long ? 17 : lab.includes(".") || lab.includes(",") ? (n > 10 ? 11 : 15) : 20}" font-weight="700" fill="#2b0f45">${lab}</text>`;
    if (pick) s += `<rect data-v="${v}" x="${sc(v) - 7}" y="${y - 30}" width="14" height="60" fill="transparent" style="cursor:pointer"/>`;
  }
  s += arcs(o.jumps ?? [], sc, y);
  const mark = pick != null && pick !== true ? pick : o.mark;
  if (mark != null) s += `<path d="M${sc(mark)} ${y - 18} l-10 -18 h20 z" fill="#8e3bd1" stroke="#2b0f45" stroke-width="2"/>`;
  return `<svg viewBox="0 0 330 170" width="100%" style="max-width:330px">${s}</svg>`;
}
// The school's Ausgangsschrift for joined writing; schools choose it by Land, so it is a setting.
const SCRIPTS = { sas: "Playwrite DE SAS", la: "Playwrite DE LA", va: "Playwrite DE VA", grund: "Playwrite DE Grund" };
// England has no national script; Playwrite GB J follows the joined style English schools teach.
const scriptFont = () => (set?.curriculum ?? "").startsWith("en") ? "Playwrite GB J" : SCRIPTS[SCRIPT];
let SCRIPT = (() => { try { return localStorage.getItem("twist-script") || "sas"; } catch { return "sas"; } })();
function writing(text, mode, joined) {
  if (joined) {
    // Joined writing: one set of four lines per row of words. Words keep a size
    // a child can trace and wrap onto more rows; only a single word too long for
    // a row gets smaller.
    // A word is written at 52, a sentence at 40 (Playwrite is wide); the four
    // lines of each row are spaced from the font size, so the letters fill them.
    const font = scriptFont(), W = 300, maxW = W - 24, words = String(text).split(/\s+/).filter(Boolean);
    const FS = words.length > 1 ? 40 : 52, MIN = 30;
    const ctx = (writing.c ??= document.createElement("canvas").getContext("2d"));
    const width = (t, fs) => { ctx.font = `${fs}px "${font}", cursive`; const m = ctx.measureText(t).width; return m > 0 ? m : t.length * fs * 0.55; };
    const rows = [];
    for (const w of words) {
      const last = rows[rows.length - 1], cand = last ? `${last} ${w}` : w;
      if (last && width(cand, FS) <= maxW) rows[rows.length - 1] = cand; else rows.push(w);
    }
    // Row geometry from the size: top line, dashed middle line, baseline, descender line.
    const g = { top: 0.75 * FS, mid: 1.53 * FS, base: 2.49 * FS, desc: 3.26 * FS, h: 3.5 * FS };
    const ink = mode === "trace" ? 'fill="#d4c2f7" stroke="#5a3fb8" stroke-width="2" stroke-linejoin="round" paint-order="stroke"' : 'fill="#2b0f45"';
    const svg = rows.map((r, k) => {
      const fs = Math.max(MIN, Math.min(FS, (FS * maxW) / width(r, FS))), y0 = k * g.h;
      const lines = [g.top, g.mid, g.base, g.desc].map((y, i) => `<line x1="8" x2="${W - 8}" y1="${(y0 + y).toFixed(1)}" y2="${(y0 + y).toFixed(1)}" stroke="${i === 2 ? "#8e3bd1" : "#cbb9dd"}" stroke-width="${i === 2 ? 3 : 2}" ${i === 1 ? 'stroke-dasharray="6 6"' : ""}/>`).join("");
      return `${lines}<text x="${W / 2}" y="${(y0 + g.base).toFixed(1)}" text-anchor="middle" style="font-family:'${font}', cursive" font-size="${fs.toFixed(1)}" ${ink}>${esc(r)}</text>`;
    }).join("");
    return `<svg viewBox="0 0 ${W} ${(rows.length * g.h).toFixed(1)}" class="wl">${svg}</svg>`;
  }
  const lines = [40, 80, 130, 170].map((y, i) => `<line x1="10" x2="290" y1="${y}" y2="${y}" stroke="${i === 2 ? "#8e3bd1" : "#cbb9dd"}" stroke-width="${i === 2 ? 3 : 2}" ${i === 1 ? 'stroke-dasharray="6 6"' : ""}/>`).join("");
  const glyph = mode === "trace"
    ? `<text x="150" y="130" text-anchor="middle" font-size="130" fill="#efe0fb" stroke="#a58bc4" stroke-width="2.5" stroke-dasharray="6 5">${esc(text)}</text><circle cx="${/[a-z]/.test(text) ? 132 : 112}" cy="${/[ao]/.test(text) ? 86 : 42}" r="8" fill="#2e9e48"/>`
    : `<text x="${text.length > 1 ? 62 : 50}" y="130" text-anchor="middle" font-size="${text.length > 1 ? 70 : 100}" fill="#2b0f45">${esc(text)}</text>`;
  return `<svg viewBox="0 0 300 200">${lines}${glyph}</svg>`;
}
// Angle: two arms from a vertex, an arc with the size, a right-angle square,
// optionally a protractor laid on it. degrees 0 to 360; label "?" hides the size.
function angle(o) {
  const d = o.degrees ?? 60, cx = 165, cy = o.protractor ? 170 : 150, r = 120, rad = (a) => (a * Math.PI) / 180;
  const base = o.rotate ?? 0, p = (a, rr) => [cx + rr * Math.cos(rad(-(base + a))), cy + rr * Math.sin(rad(-(base + a)))];
  let s = "";
  if (o.protractor) {
    s += `<path d="M${cx - 140} ${cy} A140 140 0 0 1 ${cx + 140} ${cy} Z" fill="#fff8e6" stroke="#b7791f" stroke-width="2.5"/>`;
    for (let a = 0; a <= 180; a += 5) { const [x1, y1] = [cx + 140 * Math.cos(rad(-a)), cy + 140 * Math.sin(rad(-a))], l = a % 10 ? 7 : 13, [x2, y2] = [cx + (140 - l) * Math.cos(rad(-a)), cy + (140 - l) * Math.sin(rad(-a))];
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#b7791f" stroke-width="${a % 10 ? 1 : 1.6}"/>`;
      if (a % 30 === 0) { const [tx, ty] = [cx + 116 * Math.cos(rad(-a)), cy + 116 * Math.sin(rad(-a))], [ux, uy] = [cx + 98 * Math.cos(rad(-a)), cy + 98 * Math.sin(rad(-a))];
        s += `<text x="${tx}" y="${ty + 4}" text-anchor="middle" font-size="11" fill="#8a5a12">${a}</text><text x="${ux}" y="${uy + 4}" text-anchor="middle" font-size="10" fill="#b7791f">${180 - a}</text>`; } }
    s += `<circle cx="${cx}" cy="${cy}" r="4" fill="#b7791f"/>`;
  }
  const [ax, ay] = p(0, r), [bx, by] = p(d, r);
  if (d === 90 && !o.protractor) { const [q1x, q1y] = p(0, 22), [q2x, q2y] = p(90, 22), [q3x, q3y] = p(45, 31); s += `<path d="M${q1x} ${q1y} L${q3x} ${q3y} L${q2x} ${q2y}" fill="none" stroke="#8e3bd1" stroke-width="3"/>`; }
  else { const [sx, sy] = p(0, 40), [ex, ey] = p(d, 40); s += `<path d="M${sx} ${sy} A40 40 0 ${d > 180 ? 1 : 0} 0 ${ex} ${ey}" fill="none" stroke="#8e3bd1" stroke-width="3"/>`; }
  s += `<line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="#2b0f45" stroke-width="4" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#2b0f45" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="#2b0f45"/>`;
  if (o.label !== false) { const [lx, ly] = p(d / 2, 62); s += `<text x="${lx}" y="${ly + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="#8e3bd1">${esc(o.label ?? d + "°")}</text>`; }
  return `<svg viewBox="0 0 330 ${o.protractor ? 190 : 280}" width="100%" style="max-width:330px">${s}</svg>`;
}
// Coordinates: a square grid with numbered axes, first quadrant or all four;
// points [[x, y, "A"]], a polygon [[x, y], ...] and a moved copy of it.
function coordinates(o) {
  const four = o.quadrants === 4, m = o.max ?? (four ? 6 : 10), lo = four ? -m : 0, n = m - lo, W = 300, u = W / n, ox = 20, oy = 10;
  const X = (x) => ox + (x - lo) * u, Yc = (y) => oy + (m - y) * u;
  let s = "";
  for (let i = 0; i <= n; i++) { const v = lo + i;
    s += `<line x1="${X(v)}" y1="${Yc(m)}" x2="${X(v)}" y2="${Yc(lo)}" stroke="#e3dcf7" stroke-width="1"/><line x1="${X(lo)}" y1="${Yc(v)}" x2="${X(m)}" y2="${Yc(v)}" stroke="#e3dcf7" stroke-width="1"/>`;
    if (v !== 0 || !four) { s += `<text x="${X(v)}" y="${Yc(four ? 0 : lo) + 15}" text-anchor="middle" font-size="10" fill="#2b0f45">${String(v).replace("-", "−")}</text>`; if (v !== 0) s += `<text x="${X(four ? 0 : lo) - 5}" y="${Yc(v) + 4}" text-anchor="end" font-size="10" fill="#2b0f45">${String(v).replace("-", "−")}</text>`; } }
  const ax = four ? 0 : lo;
  s += `<line x1="${X(lo)}" y1="${Yc(ax)}" x2="${X(m) + 6}" y2="${Yc(ax)}" stroke="#2b0f45" stroke-width="2.5"/><line x1="${X(ax)}" y1="${Yc(lo)}" x2="${X(ax)}" y2="${Yc(m) - 6}" stroke="#2b0f45" stroke-width="2.5"/><text x="${X(m) + 8}" y="${Yc(ax) + 4}" font-size="12" font-weight="700" fill="#2b0f45">x</text><text x="${X(ax) + 5}" y="${Yc(m) - 2}" font-size="12" font-weight="700" fill="#2b0f45">y</text>`;
  const poly = (pts, fill, dash) => pts?.length ? `<polygon points="${pts.map(([x, y]) => `${X(x)},${Yc(y)}`).join(" ")}" fill="${fill}" fill-opacity=".35" stroke="#2b0f45" stroke-width="2.5" ${dash ? 'stroke-dasharray="6 5"' : ""}/>` : "";
  s += poly(o.shape, "#8e3bd1") + poly(o.moved, "#43A047", true);
  if (o.mirror) s += o.mirror.axis === "x" ? `<line x1="${X(lo)}" y1="${Yc(o.mirror.at ?? 0)}" x2="${X(m)}" y2="${Yc(o.mirror.at ?? 0)}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="8 5"/>` : `<line x1="${X(o.mirror.at ?? 0)}" y1="${Yc(lo)}" x2="${X(o.mirror.at ?? 0)}" y2="${Yc(m)}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="8 5"/>`;
  for (const [x, y, l] of o.points ?? []) s += `<circle cx="${X(x)}" cy="${Yc(y)}" r="5.5" fill="#E53935" stroke="#2b0f45" stroke-width="1.5"/>${l ? `<text x="${X(x) + 8}" y="${Yc(y) - 7}" font-size="14" font-weight="700" fill="#2b0f45">${esc(l)}</text>` : ""}`;
  // point_on_grid: every crossing can be tapped; the picked one gets a blue ring.
  if (o._pick) { const [px, py] = o._pick; s += `<circle cx="${X(px)}" cy="${Yc(py)}" r="9" fill="#1E88E5" fill-opacity=".35" stroke="#1E88E5" stroke-width="3"/>`; }
  if (o._tap) for (let x = lo; x <= m; x++) for (let y = lo; y <= m; y++) s += `<circle data-x="${x}" data-y="${y}" cx="${X(x)}" cy="${Yc(y)}" r="${u / 2}" fill="transparent" style="cursor:pointer"/>`;
  return `<svg viewBox="0 0 335 ${W + 32}" width="100%" style="max-width:335px">${s}</svg>`;
}
// Line graph: points joined by lines over labelled x positions, with a scale.
function lineGraph(o) {
  const rows = o.rows ?? [], max = Math.max(...rows.map((r) => r[1]), 1), step = o.step ?? (max > 50 ? 10 : max > 20 ? 5 : max > 10 ? 2 : 1), top = Math.ceil(max / step) * step, H = 160, x0 = 40, W = 280;
  const X = (i) => x0 + 14 + (i * (W - 28)) / Math.max(rows.length - 1, 1), Yv = (v) => 10 + H - (v / top) * H;
  let s = "";
  for (let v = 0; v <= top; v += step) s += `<line x1="${x0}" y1="${Yv(v)}" x2="${x0 + W}" y2="${Yv(v)}" stroke="#e3dcf7"/><text x="${x0 - 6}" y="${Yv(v) + 4}" text-anchor="end" font-size="11" fill="#2b0f45">${v}</text>`;
  s += `<polyline points="${rows.map((r, i) => `${X(i)},${Yv(r[1])}`).join(" ")}" fill="none" stroke="#1E88E5" stroke-width="3"/>`;
  rows.forEach(([l, v], i) => { s += `<circle cx="${X(i)}" cy="${Yv(v)}" r="4.5" fill="#1E88E5" stroke="#2b0f45" stroke-width="1.5"/><text x="${X(i)}" y="${H + 28}" text-anchor="middle" font-size="11" font-weight="700" fill="#2b0f45">${esc(l)}</text>`; });
  s += `<line x1="${x0}" y1="${10 + H}" x2="${x0 + W}" y2="${10 + H}" stroke="#2b0f45" stroke-width="2.5"/><line x1="${x0}" y1="10" x2="${x0}" y2="${10 + H}" stroke="#2b0f45" stroke-width="2.5"/>`;
  if (o.ylabel) s += `<text x="4" y="8" font-size="10" fill="#6d5f7b">${esc(o.ylabel)}</text>`;
  return `<svg viewBox="0 0 330 ${H + 40}" width="100%" style="max-width:360px">${s}</svg>`;
}
// Pie chart: sectors in proportion, each labelled, with a key below.
function pieChart(o) {
  const parts = o.parts ?? [], total = parts.reduce((n, p) => n + p[1], 0) || 1, cx = 110, cy = 110, r = 96;
  let a = -90, s = "", key = "";
  parts.forEach(([l, v], i) => { const sweep = (v / total) * 360, c = barColour(l, i), a1 = (a * Math.PI) / 180, a2 = ((a + sweep) * Math.PI) / 180;
    s += sweep >= 359.9 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="#2b0f45" stroke-width="2.5"/>` : `<path d="M${cx} ${cy} L${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)} Z" fill="${c}" stroke="#2b0f45" stroke-width="2.5"/>`;
    key += `<g transform="translate(232 ${22 + i * 24})"><rect width="16" height="16" rx="3" fill="${c}" stroke="#2b0f45" stroke-width="1.5"/><text x="22" y="13" font-size="13" font-weight="700" fill="#2b0f45">${esc(l)}</text></g>`;
    a += sweep; });
  return `<svg viewBox="0 0 330 ${Math.max(225, 30 + parts.length * 24)}" width="100%" style="max-width:340px">${s}${key}</svg>`;
}
// Thermometer: a vertical scale (negative numbers allowed) filled to a value.
function thermometer(o) {
  const from = o.from ?? -10, to = o.to ?? 30, step = o.step ?? 5, v = o.value ?? 0, top = 16, bot = 250, Yv = (t) => bot - ((t - from) / (to - from)) * (bot - top);
  let s = `<rect x="150" y="${top - 8}" width="30" height="${bot - top + 16}" rx="15" fill="#fff" stroke="#2b0f45" stroke-width="3"/><circle cx="165" cy="${bot + 24}" r="22" fill="#E53935" stroke="#2b0f45" stroke-width="3"/>`;
  s += `<rect x="158" y="${Yv(v)}" width="14" height="${bot + 10 - Yv(v)}" fill="#E53935"/>`;
  for (let t = from; t <= to; t += step) s += `<line x1="180" y1="${Yv(t)}" x2="${t % (2 * step) ? 190 : 196}" y2="${Yv(t)}" stroke="#2b0f45" stroke-width="2"/><text x="202" y="${Yv(t) + 5}" font-size="14" font-weight="${t === 0 ? 800 : 600}" fill="#2b0f45">${String(t).replace("-", "−")}°C</text>`;
  if (o.mark != null) s += `<path d="M146 ${Yv(o.mark)} l-14 -8 v16 z" fill="#8e3bd1"/>`;
  return `<svg viewBox="0 0 330 300" width="100%" style="max-width:240px">${s}</svg>`;
}
// Anlauttabelle: each field a letter with a picture whose word starts with its sound.
// Pictures come from data (pictures: {m: mouse}) or the first drawn bank object with that initial.
function soundChart(o) {
  const letters = o.letters ?? ["a", "e", "i", "o", "u", "m", "l", "s", "t", "n", "r", "f", "h", "b", "d", "k", "p", "w", "z", "g"];
  const pick = (l) => (o.pictures ?? {})[l] ?? Object.keys(D.objects).find((id) => D.objects[id].drawn && D.objects[id].initial === l);
  const cells = letters.map((l) => {
    const id = pick(l), gap = (o.gaps ?? []).includes(l), mark = o.mark === l;
    return `<div class="sc${mark ? " mark" : ""}"><b>${gap ? "?" : esc(l.length === 1 ? l.toUpperCase() + l : l[0].toUpperCase() + l.slice(1) + " " + l)}</b>${id ? `<img src="${A}objects/${id}.png" alt="${esc(D.objects[id]?.de ?? id)}">` : ""}</div>`;
  }).join("");
  return `<div class="soundchart" style="grid-template-columns:repeat(${o.columns ?? Math.min(5, letters.length)},1fr)">${cells}</div>`;
}
// Dots: dice pips (two dice from 7 on: a five and the rest), rows of five
// (Kraft der 5), a row, or scattered. colour_split colours the parts.
const PIPS = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[25, 25], [50, 50], [75, 75]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]], 6: [[30, 22], [70, 22], [30, 50], [70, 50], [30, 78], [70, 78]] };
function dots(o, small) {
  if (o.array) {
    // A Punktefeld: rows by columns; split_rows colours the first rows red and the rest blue.
    const [r, c] = o.array, g = Math.min(26, 300 / Math.max(c, 1), 220 / Math.max(r, 1)), w = c * g + 8, h = r * g + 8;
    let s = "";
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) s += `<circle cx="${4 + g / 2 + j * g}" cy="${4 + g / 2 + i * g}" r="${g * 0.38}" fill="${o.split_rows != null && i >= o.split_rows ? "#1E88E5" : "#E53935"}" stroke="#2b0f45" stroke-width="1.5"/>`;
    return `<svg viewBox="0 0 ${w} ${h}" width="${Math.min(small ? 100 : 300, w * (small ? 0.5 : 1.2))}">${s}</svg>`;
  }
  if (o.groups) {
    // Two amounts to compare: lined-up rows (red over blue) or dice side by side.
    const cols = ["#E53935", "#1E88E5"];
    if (o.layout === "dice") return `<div style="display:flex;gap:${small ? 6 : 22}px;justify-content:center">${o.groups.map((g, k) => dots({ count: g, layout: "dice", colour_split: k ? [0, g] : [g] }, small)).join("")}</div>`;
    const max = Math.max(...o.groups), w = max * 30 + 10;
    const rows = o.groups.map((g, k) => Array.from({ length: g }, (_, i) => `<circle cx="${20 + i * 30}" cy="${20 + k * 34}" r="11" fill="${cols[k]}" stroke="#2b0f45" stroke-width="2"/>`).join("")).join("");
    return `<svg viewBox="0 0 ${w} ${o.groups.length * 34 + 8}" width="${Math.min(small ? 90 : 300, w * (small ? 0.6 : 1.4))}">${rows}</svg>`;
  }
  const n = o.count, split = o.colour_split ?? [n], fill = (i) => (i < split[0] ? "#E53935" : "#1E88E5");
  const dot = (x, y, r, i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill(i)}" stroke="#2b0f45" stroke-width="2"/>`;
  if (o.layout === "dice") {
    const parts = n <= 6 ? [n] : [5, n - 5]; let i = 0;
    const dice = parts.map((p) => `<svg viewBox="0 0 100 100" width="${small ? 46 : 110}"><rect x="4" y="4" width="92" height="92" rx="18" fill="#fff" stroke="#2b0f45" stroke-width="5"/>${PIPS[p].map(([x, y]) => dot(x, y, 9, i++)).join("")}</svg>`);
    return `<div style="display:flex;gap:${small ? 4 : 12}px;justify-content:center">${dice.join("")}</div>`;
  }
  if (o.layout === "five-structure" || o.layout === "row") {
    const per = o.layout === "row" ? n : 5, rows = Math.ceil(n / per), w = per * 30 + 10;
    let g = ""; for (let i = 0; i < n; i++) g += dot(20 + (i % per) * 30 + (o.layout === "five-structure" ? 0 : 0), 20 + Math.floor(i / per) * 32, 11, i);
    return `<svg viewBox="0 0 ${w} ${rows * 32 + 8}" width="${Math.min(small ? 90 : 300, w * (small ? 0.6 : 1.4))}">${g}</svg>`;
  }
  const grp = group({ object: "_", count: n, layout: "scattered" }, { small });
  let i = 0; return grp.replace(/<span class="it"([^>]*)>[\s\S]*?<\/span>/g, (m, a) => `<span class="it"${a}><svg viewBox="0 0 30 30" width="100%">${dot(15, 15, 11, i++)}</svg></span>`);
}
// Karopapier: cols by rows of squares. cells [[c, r, colour]] fill whole squares, halves [[c, r, corner, colour]] fill the
// triangle in one corner (tl, tr, bl, br), lines [[c1, r1, c2, r2]] run between grid points, axis: c is a dashed mirror line,
// labels [[c, r, text]] write into a square; dots: true draws a dot grid instead of lines. Columns and rows count from 0, top left.
function grid(o) {
  const C = o.cols ?? 6, R = o.rows ?? 6, g = Math.min(34, 300 / C, 240 / R), p = 6, W = C * g + 2 * p, H = R * g + 2 * p;
  const X = (c) => p + c * g, Y = (r) => p + r * g, col = (k) => SHAPE_COL[k] ?? "#b9a6f5";
  let s = "";
  for (const [c, r, k] of o.cells ?? []) s += `<rect x="${X(c)}" y="${Y(r)}" width="${g}" height="${g}" fill="${col(k)}"/>`;
  for (const [c, r, corner, k] of o.halves ?? []) {
    const pts = { tl: [[c, r], [c + 1, r], [c, r + 1]], tr: [[c, r], [c + 1, r], [c + 1, r + 1]], bl: [[c, r], [c, r + 1], [c + 1, r + 1]], br: [[c + 1, r], [c + 1, r + 1], [c, r + 1]] }[corner] ?? [];
    s += `<polygon points="${pts.map(([a, b]) => `${X(a)},${Y(b)}`).join(" ")}" fill="${col(k)}"/>`;
  }
  if (o.dots) { for (let i = 0; i <= C; i++) for (let j = 0; j <= R; j++) s += `<circle cx="${X(i)}" cy="${Y(j)}" r="2" fill="#7a6a9e"/>`; }
  else { for (let i = 0; i <= C; i++) s += `<line x1="${X(i)}" y1="${p}" x2="${X(i)}" y2="${H - p}" stroke="#c9bdf0" stroke-width="1"/>`; for (let j = 0; j <= R; j++) s += `<line x1="${p}" y1="${Y(j)}" x2="${W - p}" y2="${Y(j)}" stroke="#c9bdf0" stroke-width="1"/>`; }
  for (const [c, r, k] of o.cells ?? []) s += `<rect x="${X(c)}" y="${Y(r)}" width="${g}" height="${g}" fill="none" stroke="#2b0f45" stroke-width="1.5"/>`;
  for (const [c1, r1, c2, r2] of o.lines ?? []) s += `<line x1="${X(c1)}" y1="${Y(r1)}" x2="${X(c2)}" y2="${Y(r2)}" stroke="#2b0f45" stroke-width="3" stroke-linecap="round"/>`;
  if (o.axis != null) s += `<line x1="${X(o.axis)}" y1="${p - 4}" x2="${X(o.axis)}" y2="${H - p + 4}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  if (o.diagonal) s += o.diagonal === "down" ? `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(Math.min(C, R))}" y2="${Y(Math.min(C, R))}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="7 5"/>` : `<line x1="${X(0)}" y1="${Y(Math.min(C, R))}" x2="${X(Math.min(C, R))}" y2="${Y(0)}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  if (o.axis_row != null) s += `<line x1="${p - 4}" y1="${Y(o.axis_row)}" x2="${W - p + 4}" y2="${Y(o.axis_row)}" stroke="#E53935" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  for (const [c, r, t] of o.labels ?? []) s += `<text x="${X(c) + g / 2}" y="${Y(r) + g * 0.68}" text-anchor="middle" font-size="${g * 0.55}" font-weight="800" fill="#2b0f45">${esc(t)}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${Math.min(320, W * 1.1)}">${s}</svg>`;
}
// A cube building from its plan: plan rows run from back to front, columns left to right, each number a stack height.
// mode: building (drawn in a slanted view), plan (the Bauplan, heights in squares), front, side (from the right) or top.
function cubes(o) {
  const plan = o.plan ?? [[1]], rows = plan.length, cols = Math.max(...plan.map((r) => r.length)), h = (r, c) => plan[r]?.[c] ?? 0, mode = o.mode ?? "building";
  const f = SHAPE_COL[o.colour] ?? "#b9a6f5", st = `stroke="#2b0f45" stroke-width="2" stroke-linejoin="round"`;
  const squares = (heights, label) => {
    // heights: one column height per position, drawn as stacked squares standing on a line.
    const top = Math.max(...heights, 1), g = Math.min(34, 260 / heights.length, 180 / top), W = heights.length * g + 12, H = top * g + 12;
    let s = "";
    heights.forEach((n, i) => { for (let k = 0; k < n; k++) s += `<rect x="${6 + i * g}" y="${H - 6 - (k + 1) * g}" width="${g}" height="${g}" fill="${f}" ${st}/>`; });
    return `<svg viewBox="0 0 ${W} ${H}" width="${Math.min(260, W * 1.2)}">${s}<line x1="2" y1="${H - 6}" x2="${W - 2}" y2="${H - 6}" stroke="#2b0f45" stroke-width="2.5"/></svg>`;
  };
  if (mode === "front") return squares([...Array(cols)].map((_, c) => Math.max(...plan.map((_, r) => h(r, c)))));
  if (mode === "side") return squares([...Array(rows)].map((_, i) => Math.max(...[...Array(cols)].map((_, c) => h(rows - 1 - i, c)))));
  if (mode === "plan" || mode === "top") {
    const filled = plan.flatMap((r, i) => r.map((n, c) => [c, i, n])).filter(([, , n]) => n);
    const g = grid({ cols, rows, cells: filled.map(([c, i]) => [c, i, o.colour]), labels: mode === "plan" ? filled.map(([c, i, n]) => [c, i, String(n)]) : [] });
    // A Bauplan names its rows: the top row is at the back (hinten), the bottom one at the front.
    if (mode !== "plan" || o.sides === false) return g;
    const side = (k) => `<div style="font:700 13px 'Red Hat Text',sans-serif;color:#7a6a9e;text-align:center">${esc(UI[k])}</div>`;
    return `<div style="display:inline-flex;flex-direction:column;gap:4px">${side("planBack")}${g}${side("planFront")}</div>`;
  }
  const s0 = 30, d = s0 * 0.5, top = Math.max(...plan.flat(), 1), W = cols * s0 + rows * d + 12, H = top * s0 + rows * d + 12;
  let s = "";
  for (let r = 0; r < rows; r++) {
    const dep = rows - 1 - r; // 0 is the front row
    for (let c = 0; c < cols; c++) for (let k = 0; k < h(r, c); k++) {
      const x = 6 + c * s0 + dep * d, y = H - 6 - k * s0 - dep * d;
      s += `<polygon points="${x},${y} ${x + s0},${y} ${x + s0},${y - s0} ${x},${y - s0}" fill="${f}" ${st}/>`;
      s += `<polygon points="${x},${y - s0} ${x + d},${y - s0 - d} ${x + s0 + d},${y - s0 - d} ${x + s0},${y - s0}" fill="${f}" ${st}/><polygon points="${x},${y - s0} ${x + d},${y - s0 - d} ${x + s0 + d},${y - s0 - d} ${x + s0},${y - s0}" fill="#ffffff44"/>`;
      s += `<polygon points="${x + s0},${y} ${x + s0 + d},${y - d} ${x + s0 + d},${y - s0 - d} ${x + s0},${y - s0}" fill="${f}" ${st}/><polygon points="${x + s0},${y} ${x + s0 + d},${y - d} ${x + s0 + d},${y - s0 - d} ${x + s0},${y - s0}" fill="#00000022"/>`;
    }
  }
  return `<svg viewBox="0 0 ${W} ${H}" width="${Math.min(280, W * 1.3)}">${s}</svg>`;
}
// A fraction picture: kind circle (pie), bar or rect (rows x cols), split into equal parts with the first `shaded` coloured.
function fraction(o) {
  const n = o.parts ?? 4, k = o.shaded ?? 1, f = SHAPE_COL[o.colour] ?? "#E53935", st = `stroke="#2b0f45" stroke-width="2.5"`;
  if (o.kind === "circle") {
    if (n === 1) return `<svg viewBox="0 0 120 120" width="120"><circle cx="60" cy="60" r="52" fill="${k ? f : "#fff"}" ${st}/></svg>`;
    let s = "";
    for (let i = 0; i < n; i++) { const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2; s += `<path d="M60 60 L${60 + 52 * Math.cos(a0)} ${60 + 52 * Math.sin(a0)} A52 52 0 ${1 / n > 0.5 ? 1 : 0} 1 ${60 + 52 * Math.cos(a1)} ${60 + 52 * Math.sin(a1)} Z" fill="${i < k ? f : "#fff"}" ${st}/>`; }
    return `<svg viewBox="0 0 120 120" width="120">${s}</svg>`;
  }
  const [rr, cc] = o.kind === "rect" ? [o.rows ?? 2, Math.ceil(n / (o.rows ?? 2))] : [1, n], w = 220 / cc, hh = o.kind === "rect" ? Math.min(w, 120 / rr) : 46;
  let s = "", i = 0;
  for (let r = 0; r < rr; r++) for (let c = 0; c < cc && i < n; c++, i++) s += `<rect x="${4 + c * w}" y="${4 + r * hh}" width="${w}" height="${hh}" fill="${i < k ? f : "#fff"}" ${st}/>`;
  return `<svg viewBox="0 0 228 ${rr * hh + 8}" width="228">${s}</svg>`;
}
// A spinner (Glücksrad): equal sectors, one colour each, with a pointer at the top.
function spinner(o) {
  const sec = o.sectors ?? ["red", "blue"], n = sec.length;
  let s = "";
  for (let i = 0; i < n; i++) { const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2; s += n === 1 ? `<circle cx="60" cy="64" r="50" fill="${SHAPE_COL[sec[0]] ?? "#ccc"}" stroke="#2b0f45" stroke-width="2.5"/>` : `<path d="M60 64 L${60 + 50 * Math.cos(a0)} ${64 + 50 * Math.sin(a0)} A50 50 0 ${1 / n > 0.5 ? 1 : 0} 1 ${60 + 50 * Math.cos(a1)} ${64 + 50 * Math.sin(a1)} Z" fill="${SHAPE_COL[sec[i]] ?? (sec[i] === "white" ? "#fff" : "#ccc")}" stroke="#2b0f45" stroke-width="2.5"/>`; }
  return `<svg viewBox="0 0 120 120" width="130">${s}<circle cx="60" cy="64" r="5" fill="#2b0f45"/><polygon points="52,4 68,4 60,20" fill="#2b0f45"/></svg>`;
}
// A table: rows of cells, the first row a header unless header: false; sheet: true adds column letters and row numbers
// like a spreadsheet; mark: [[r, c]] highlights cells (rows and columns count from 0 in `rows`); "?" is a gap.
function table(o) {
  const rows = o.rows ?? [], head = o.header !== false, marks = new Set((o.mark ?? []).map(([r, c]) => `${r},${c}`)), n = Math.max(...rows.map((r) => r.length), 0);
  const td = (v, r, c, th) => `<${th ? "th" : "td"} style="border:1.5px solid #2b0f45;padding:4px 8px;${th ? "background:#efeafd;" : ""}${marks.has(`${r},${c}`) ? "background:#FDD835;" : ""}">${v === "?" ? '<span class="blank">?</span>' : esc(v ?? "")}</${th ? "th" : "td"}>`;
  const side = (x) => `<th style="border:1px solid #c9bdf0;padding:2px 6px;color:#7a6a9e;font-weight:600;background:#f6f3ff">${x}</th>`;
  let h = o.sheet ? `<tr>${side("")}${[...Array(n)].map((_, c) => side(String.fromCharCode(65 + c))).join("")}</tr>` : "";
  rows.forEach((row, r) => { h += `<tr>${o.sheet ? side(r + 1) : ""}${[...Array(n)].map((_, c) => td(row[c], r, c, head && r === 0 && !o.sheet)).join("")}</tr>`; });
  return `<table style="border-collapse:collapse;font:600 15px Andika,sans-serif;color:#2b0f45;margin:0 auto">${h}</table>`;
}
function drawn(o, ctx = {}) {
  switch (o.drawn) {
    case "table": return table(o);
    case "grid": return grid(o);
    case "cubes": return cubes(o);
    case "fraction": return fraction(o);
    case "spinner": return spinner(o);
    case "dots": return dots(o, ctx.small);
    case "zwanzigerfeld": return zwanziger(o.filled[0], o.filled[1], ctx.moved ?? 0);
    case "ten-frame": return tenFrame(o.filled, o.colour_split, o.cross, o.cross_from === "start");
    case "number-house": return house(o.roof, o.rows);
    case "part-whole": return partWhole(o.whole, o.parts);
    case "number-wall": return numberWall(o.rows);
    case "written-calc": return writtenCalc(o);
    case "short-division": return shortDivision(o);
    case "hundred-field": return hundredField(o.filled, o.colour_split);
    case "hundred-square": return hundredSquare(o);
    case "base-ten": return baseTen(o.tens ?? 0, o.ones ?? 0, o.hundreds ?? 0);
    case "place-value-chart": return placeValue(o.columns, o.values);
    case "equation": return equation(o.text, o.split);
    case "rechenstrich": return rechenstrich(o.start, o.jumps ?? [], o.back);
    case "number-line": return numberLine(o);
    case "letter-card": return `<div class="cards">${(o.text.includes(" ") ? o.text.split(" ") : [o.text]).map((t) => `<div class="card">${esc(t)}</div>`).join("")}</div>`;
    case "writing-lines": return `<div class="trace">${writing(o.text, o.mode, o.script === "joined")}</div>`;
    case "sound-chart": return soundChart(o);
    case "angle": return angle(o);
    case "coordinates": return coordinates(o);
    case "line-graph": return lineGraph(o);
    case "pie-chart": return pieChart(o);
    case "thermometer": return thermometer(o);
    case "syllable-arcs": return `<div class="word">${o.syllables.map((s) => `<span class="syl">${esc(s)}</span>`).join("")}</div>`;
    case "word-card": return `<div class="word"><span class="wordcard">${esc(o.text)}</span></div>`;
    case "colour-swatch": return swatch(o.colour);
    case "clock": return clock(o);
    case "circle": return circleParts(o);
    case "ruler": return ruler(o);
    case "shape": return shape(o);
    case "bar-chart": return barChart(o);
    case "coins": return coins(o);
  }
  return `<div class="note">[${esc(o.drawn)}]</div>`;
}
const show = (o, ctx) => !o ? "" : o.objects ? `<div class="pairview">${o.objects.map((id, i) => `<span class="pv" data-i="${i}">${pic({ object: id })}</span>`).join("")}</div>` : o.drawn ? drawn(o, ctx) : o.text != null ? `<span style="font:700 ${String(o.text).length > 14 ? 17 : String(o.text).length > 5 ? 26 : 40}px Andika,sans-serif">${esc(o.text)}</span>` : pic(o);
