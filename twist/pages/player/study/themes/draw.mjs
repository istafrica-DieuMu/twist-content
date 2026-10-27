// Draws the Study path's themed islands as SVG: one island base shared by every picture (an oval of
// grass with a darker edge, pebbles, pine trees, a soft shadow) and one object in the middle per picture.
// Three tones, as the subject islands use them: --i-ink (outlines), --i-mid (trees, the island's edge),
// --i-pale (the island's top, panels). The track sets them per subject; on their own the files are grey.
// Maths islands are generated art traced to SVG, not drawn here; this draws the remaining placeholders.
// Each file holds <g id="island">, which the track shows with <use>. Run: node draw.mjs (writes <theme>-<k>.svg here).
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const HERE = path.dirname(fileURLToPath(import.meta.url));

const INK = "var(--i-ink,#3a3a3a)", MID = "var(--i-mid,#9b9b9b)", PALE = "var(--i-pale,#e9e9e9)";
// Shapes: o = white with an outline, p = pale with an outline, m = mid with an outline, l = an outline only.
const st = { o: `fill:#fff;stroke:${INK}`, p: `fill:${PALE};stroke:${INK}`, m: `fill:${MID};stroke:${INK}`, l: `fill:none;stroke:${INK}`, i: `fill:${INK};stroke:none`, w: `fill:#fff;stroke:none` };
const s = (k, w = 3) => `style="${st[k]};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round"`;
const rect = (k, x, y, w, h, r = 3, sw) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${s(k, sw)}/>`;
const circ = (k, cx, cy, r, sw) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${s(k, sw)}/>`;
const ell = (k, cx, cy, rx, ry, sw) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${s(k, sw)}/>`;
const pth = (k, d, sw) => `<path d="${d}" ${s(k, sw)}/>`;

// A wobbly closed outline round (cx, cy), smoothed (Catmull-Rom to Bézier).
function blob(cx, cy, rx, ry, seed, wob = 0.06, n = 18) {
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, w = 1 + wob * Math.sin(a * 3 + seed) + wob * 0.6 * Math.sin(a * 5 + seed * 2); return [cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]; });
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1.map((v) => v.toFixed(1)).join(" ")} ${c2.map((v) => v.toFixed(1)).join(" ")} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; }
  return d + "Z";
}
const tree = (x, by, h) => { const w = h * 0.42, t = h * 0.18;
  return `${rect("m", x - 2.5, by - t, 5, t + 2, 1, 2)}${pth("m", `M${x} ${by - h}L${x + w * 0.62} ${by - h * 0.55}H${x + w * 0.32}L${x + w} ${by - t}H${x - w}L${x - w * 0.32} ${by - h * 0.55}H${x - w * 0.62}Z`, 2.5)}`; };
// The island: shadow, edge, top, grass flecks and pebbles; trees behind (left) and in front (right) of the object.
function base(seed, obj) {
  const cx = 110, cy = 103;
  const shadow = `<path d="${blob(cx, cy + 20, 96, 16, seed + 1, 0.08)}" style="fill:${PALE};opacity:.55"/>${ell("w", 60, cy + 34, 10, 2.5)}`;
  const edge = pth("m", blob(cx, cy + 9, 84, 22, seed, 0.05), 3);
  const top = pth("p", blob(cx, cy, 84, 22, seed, 0.05), 3);
  const flecks = [[-58, -4, 6], [-30, 9, 4], [6, 12, 5], [40, 6, 4], [62, -6, 5], [-12, -12, 3]].map(([dx, dy, r]) => `<ellipse cx="${cx + dx}" cy="${cy + dy}" rx="${r}" ry="${r * 0.5}" style="fill:${MID};opacity:.35"/>`).join("");
  const back = tree(46, cy - 2, 42) + tree(66, cy - 10, 34), front = tree(176, cy + 2, 36);
  // The object is drawn on a 90 × 85 grid and shown a third larger, as big on the island as today's objects.
  return `${shadow}${edge}${top}${flecks}${back}<g transform="translate(110 104) scale(1.3) translate(-110 -104)">${obj}</g>${front}`;
}

// The objects, standing on the island's top (ground y ≈ 103), about 90 wide and 85 tall at most.
const O = {
  // Grammar
  "grammar-1": () => `${pth("l", "M58 100H164", 3)}${[0, 1, 2].map((k) => { const x = 86 + k * 26; return `${rect(k === 1 ? "o" : "p", x, 68, 22, 26, 4)}${circ("o", x + 6, 96, 4.5)}${circ("o", x + 16, 96, 4.5)}`; }).join("")}${pth("m", "M58 94V60H76V50H82V94Z")}${rect("o", 62, 64, 10, 10, 2, 2.5)}${circ("o", 64, 96, 5)}${circ("o", 76, 96, 5)}${pth("l", "M82 82H86M108 82H112M134 82H138", 3)}`,
  "grammar-2": () => `${rect("p", 70, 76, 30, 27, 3)}${pth("m", "M104 103V76H134V103Z")}${pth("o", "M86 76L100 50L114 76Z")}${circ("o", 136, 62, 14)}${pth("l", "M80 90H90M114 90H124", 3)}`,
  "grammar-3": () => `${pth("p", "M70 103V62H150V103Z")}${pth("l", "M110 62V103M70 82H150", 3)}${circ("o", 90, 72, 6)}${pth("o", "M124 77L130 66L136 77Z", 2.5)}${rect("o", 84, 88, 12, 9, 2, 2.5)}${pth("o", "M130 86L136 92L130 98L124 92Z", 2.5)}${pth("m", "M66 62L74 52H146L154 62Z")}`,
  // Food and drink, French course
  "food-fr-1": () => `${pth("p", "M70 80H150L142 103H78Z")}${pth("l", "M76 88H144M80 96H140", 2)}${pth("o", "M76 82L120 40C126 36 132 42 128 48L86 88Z")}${pth("l", "M98 64L104 68M106 56L112 60M114 48L120 52", 2.5)}${pth("o", "M100 84L138 50C144 46 150 52 146 58L110 90Z")}${pth("o", "M122 84C122 70 152 66 158 82C154 80 150 82 150 86C140 82 130 82 122 84Z")}${pth("l", "M134 74L136 84M144 72L144 82", 2)}`,
  "food-fr-2": () => `${rect("p", 64, 88, 92, 15, 6)}${pth("o", "M74 88L96 60L118 88Z")}${circ("p", 90, 78, 3, 2)}${circ("p", 102, 82, 2.5, 2)}${pth("o", "M120 88C120 72 128 64 140 64C150 64 154 74 152 88Z")}${[[132, 60], [140, 56], [148, 60], [136, 50], [144, 50], [140, 44]].map(([x, y]) => circ("m", x, y, 5, 2.5)).join("")}${pth("l", "M140 44V36", 3)}`,
  "food-fr-3": () => `${ell("p", 104, 96, 38, 8)}${pth("o", "M74 92C86 70 120 66 132 92Z")}${pth("l", "M84 86C94 78 112 76 122 86", 2.5)}${pth("o", "M140 100V70H158V100Z")}${rect("m", 138, 62, 22, 8, 3)}${pth("p", "M142 86H156V98H142Z", 2)}`,
  // Food and drink, English course
  "food-en-1": () => `${pth("o", "M76 70C76 58 88 52 100 52C112 52 124 58 124 70C124 86 114 100 100 100C86 100 76 86 76 70Z")}${pth("l", "M124 64C138 62 140 80 124 84", 3.5)}${pth("o", "M76 66L62 56L66 52L80 60", 3)}${rect("m", 92, 44, 16, 8, 3)}${circ("m", 100, 41, 4)}${pth("p", "M128 103C128 92 134 88 140 88C146 88 152 92 152 103Z")}${pth("o", "M130 94H150", 2.5)}${circ("m", 140, 86, 3, 2)}`,
  "food-en-2": () => `${pth("o", "M84 58L104 58L94 100Z")}${pth("l", "M88 66H100M90 76H98", 2)}${[[86, 34], [92, 30], [98, 36], [102, 32]].map(([x, t]) => rect("p", x - 2.5, t, 6, 58 - t, 1.5, 2.5)).join("")}${pth("p", "M112 80C116 64 140 60 150 74L160 64V90L150 82C140 96 116 94 112 80Z")}${circ("i", 124, 76, 2.4)}${pth("l", "M132 70C136 76 136 82 132 88", 2.5)}`,
  "food-en-3": () => `${pth("p", "M66 100L82 84H150L162 100Z")}${pth("l", "M82 84L78 100M100 84L98 100M118 84L118 100M136 84L138 100", 2)}${pth("o", "M90 82L108 62L126 82Z")}${pth("m", "M95 78L108 66L121 78Z", 2)}${pth("o", "M136 82V64H152V82Z")}${ell("m", 144, 64, 8, 3, 2.5)}${pth("l", "M142 58C140 54 146 52 144 48", 2)}`,
  // Nature
  "nature-1": () => `${pth("l", "M110 103V58", 4)}${pth("m", "M110 86C100 80 92 82 88 86C94 92 104 90 110 86Z", 2.5)}${pth("m", "M110 78C120 72 128 74 132 78C126 84 116 82 110 78Z", 2.5)}${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<ellipse cx="${(110 + Math.cos(a) * 18).toFixed(1)}" cy="${(42 + Math.sin(a) * 18).toFixed(1)}" rx="9" ry="5" transform="rotate(${(a * 180 / Math.PI).toFixed(0)} ${(110 + Math.cos(a) * 18).toFixed(1)} ${(42 + Math.sin(a) * 18).toFixed(1)})" ${s("o", 2.5)}/>`; }).join("")}${circ("m", 110, 42, 12)}${ell("p", 132, 80, 6, 5, 2.5)}${pth("l", "M132 75V85", 2)}`,
  "nature-2": () => `${pth("m", "M94 56C94 40 126 40 126 56Z")}${circ("o", 104, 49, 3, 2)}${circ("o", 116, 47, 2.5, 2)}${rect("o", 105, 56, 10, 26, 3)}${pth("p", "M78 103C76 86 88 76 104 78C118 78 128 86 128 98C128 101 126 103 124 103Z")}${pth("l", "M84 84L80 78M92 80L90 73M100 78L100 71M108 78L110 71M116 80L120 74", 2.5)}${pth("o", "M124 92C132 90 138 94 138 100C134 103 128 103 124 102Z")}${circ("i", 132, 95, 2)}${circ("i", 138, 99, 1.8)}`,
  "nature-3": () => `${pth("m", "M104 103V40H116V103Z")}${pth("p", "M92 70H128V42L110 26L92 42Z")}${pth("m", "M86 44L110 22L134 44", 3.5)}${circ("o", 110, 50, 6)}${rect("m", 104, 62, 12, 3, 1.5, 2)}${pth("m", "M84 92C76 86 80 76 90 80C92 74 102 74 104 82", 3)}`,
  // Getting around (Sachunterricht)
  "traffic-1": () => `${[0, 1, 2, 3].map((k) => rect(k % 2 ? "p" : "o", 68 + k * 16, 94, 12, 8, 1.5, 2.5)).join("")}${rect("m", 133, 74, 6, 29, 2)}${rect("p", 124, 34, 24, 42, 6)}${circ("m", 136, 44, 5.5, 2.5)}${circ("o", 136, 55, 5.5, 2.5)}${circ("o", 136, 66, 5.5, 2.5)}`,
  "traffic-2": () => `${circ("o", 82, 86, 16)}${circ("o", 138, 86, 16)}${circ("p", 82, 86, 5, 2)}${circ("p", 138, 86, 5, 2)}${pth("l", "M82 86L100 62H128L138 86M100 62L110 86H82M110 86L128 62M96 54H106M128 62L124 50H132", 3.5)}${pth("p", "M90 40C90 28 112 26 116 38C116 42 112 44 108 44H92C90 44 90 42 90 40Z", 2.5)}`,
  "traffic-3": () => `${rect("m", 70, 46, 4, 57, 2, 2.5)}${circ("o", 72, 40, 9)}${pth("p", "M88 98V60C88 54 92 50 98 50H150C156 50 158 54 158 60V98Z")}${[0, 1, 2].map((k) => rect("o", 96 + k * 19, 58, 14, 14, 2, 2.5)).join("")}${pth("l", "M88 82H158", 3)}${circ("o", 104, 100, 7)}${circ("o", 144, 100, 7)}`,
};

const seeds = { time: 1.2, money: 2.4, grammar: 3.1, "food-fr": 4.2, "food-en": 4.2, nature: 5.3, traffic: 6.1 };
for (const [id, draw] of Object.entries(O)) {
  const theme = id.replace(/-\d+$/, ""), k = +id.match(/\d+$/)[0];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 155" width="220" height="155"><g id="island">${base((seeds[theme] ?? 1) + k * 0.7, draw())}</g></svg>\n`;
  fs.writeFileSync(path.join(HERE, `${id}.svg`), svg);
}
console.log(Object.keys(O).length, "islands");
