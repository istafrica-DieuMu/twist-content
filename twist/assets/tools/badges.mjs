// Draws the badges in docs/rewards.md as SVG: assets/badges/<id>.svg and
// <id>.gold.svg. The id is the English name in kebab case. Each group has its
// own frame shape and colour; the icon in the middle is drawn by hand below.
// Style follows the mascot: flat cartoon, bold aubergine outline, one darker
// tone per colour, one white highlight, no text. Run
// `node twist/assets/tools/badges.mjs`, then `node twist/pages/rewards/build.mjs`.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "badges");
const O = "#2B0A4F"; // outline, the mascot's aubergine
const W = 3.5;       // outline width at 120 px
const C = {          // palette from drawn.yaml, with a dark tone and a tint
  red: ["#E53935", "#B71C1C", "#FFCDD2"], blue: ["#1E88E5", "#1565C0", "#BBDEFB"],
  yellow: ["#FDD835", "#F9A825", "#FFF9C4"], green: ["#43A047", "#2E7D32", "#C8E6C9"],
  orange: ["#FB8C00", "#E65100", "#FFE0B2"], purple: ["#8E24AA", "#6A1B9A", "#E1BEE7"],
  pink: ["#EC407A", "#AD1457", "#F8BBD0"], brown: ["#8D6E63", "#5D4037", "#D7CCC8"],
  grey: ["#90A4AE", "#607D8B", "#ECEFF1"], white: ["#FFFFFF", "#D9D2E9", "#FFFFFF"],
  gold: ["#FFC107", "#E09B00", "#FFF3C4"], flame: ["#FF7043", "#D84315", "#FFCCBC"],
};
const s = (fill, w = W) => `fill="${fill}" stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const line = (w = W) => `fill="none" stroke="${O}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const hi = (x, y, rx = 3.2, ry = 2.2, r = -30) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" transform="rotate(${r} ${x} ${y})"/>`;

// ---------- frames: one shape per group ----------
// Each frame draws a back plate (colour), a shaded lower half and an inner face (tint).
const FRAMES = {
  // Strand: a round medal with two ribbon tails.
  medal: (k) => `
    <path d="M38 84 L28 114 L41 108 L48 118 L56 90Z" ${s(k[1])}/>
    <path d="M82 84 L92 114 L79 108 L72 118 L64 90Z" ${s(k[1])}/>
    <circle cx="60" cy="56" r="48" ${s(k[0])}/>
    <path d="M14 62 A46 46 0 0 0 106 62 A46 40 0 0 1 14 62Z" fill="${k[1]}"/>
    <circle cx="60" cy="56" r="37" ${s(k[2])}/>
    ${hi(32, 26, 5, 3)}`,
  // Milestone: a shield.
  shield: (k) => `
    <path d="M60 6 L104 20 V56 C104 84 84 104 60 114 C36 104 16 84 16 56 V20Z" ${s(k[0])}/>
    <path d="M17 60 C20 86 38 102 60 112 C82 102 100 86 103 60 C96 84 80 98 60 104 C40 98 24 84 17 60Z" fill="${k[1]}"/>
    <path d="M60 17 L93 28 V56 C93 78 78 93 60 101 C42 93 27 78 27 56 V28Z" ${s(k[2])}/>
    ${hi(28, 24, 5, 3)}`,
  // Remembering: a hexagon.
  hex: (k) => `
    <path d="M60 6 L106 32 V86 L60 112 L14 86 V32Z" ${s(k[0])}/>
    <path d="M15 72 V86 L60 111 L105 86 V72 L60 98Z" fill="${k[1]}"/>
    <path d="M60 18 L95 38 V80 L60 100 L25 80 V38Z" ${s(k[2])}/>
    ${hi(26, 34, 5, 3)}`,
  // Streak: a rounded square tilted like a flag.
  tile: (k) => `
    <rect x="12" y="12" width="96" height="96" rx="26" ${s(k[0])}/>
    <path d="M13 70 V82 C13 97 23 107 38 107 H82 C97 107 107 97 107 82 V70 C107 88 97 96 82 96 H38 C23 96 13 88 13 70Z" fill="${k[1]}"/>
    <rect x="23" y="23" width="74" height="74" rx="18" ${s(k[2])}/>
    ${hi(28, 22, 5, 3, -20)}`,
  // Effort and curiosity: a scalloped rosette.
  rosette: (k) => {
    const pts = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2, r = i % 2 ? 44 : 52;
      pts.push(`${(60 + r * Math.sin(a)).toFixed(1)} ${(60 - r * Math.cos(a)).toFixed(1)}`);
    }
    return `
    <path d="M${pts.join(" L")}Z" ${s(k[0])}/>
    <path d="M16 66 A44 44 0 0 0 104 66 A44 36 0 0 1 16 66Z" fill="${k[1]}"/>
    <circle cx="60" cy="60" r="36" ${s(k[2])}/>
    ${hi(36, 30, 5, 3)}`;
  },
};

// ---------- icons, drawn inside a 36 px radius around (60, 58) ----------
const ICONS = {
  // Maths
  "number-navigator": () => `
    <circle cx="60" cy="58" r="24" ${s("#fff")}/>
    <path d="M60 36 L67 58 L60 58Z" fill="${C.red[0]}"/><path d="M60 36 L53 58 L60 58Z" fill="${C.red[1]}"/>
    <path d="M60 80 L53 58 L60 58Z" fill="${C.blue[0]}"/><path d="M60 80 L67 58 L60 58Z" fill="${C.blue[1]}"/>
    <path d="M60 36 L67 58 L60 80 L53 58Z" ${line(3)}/>
    <circle cx="60" cy="58" r="3.5" ${s(C.yellow[0])}/>
    <path d="M60 32 V28 M60 84 V88 M34 58 H30 M86 58 H90" ${line(3)}/>`,
  "calculation-ace": () => `
    <g transform="rotate(-10 60 58)">
      <rect x="40" y="30" width="40" height="56" rx="7" ${s("#fff")}/>
      <path d="M60 44 V72 M46 58 H74" fill="none" stroke="${C.blue[0]}" stroke-width="9" stroke-linecap="round"/>
      <path d="M60 44 V72 M46 58 H74" ${line(2.2)} opacity=".0"/>
      <circle cx="47" cy="37" r="3" fill="${C.red[0]}"/><circle cx="73" cy="79" r="3" fill="${C.red[0]}"/>
    </g>`,
  "shape-shifter": () => `
    <rect x="52" y="52" width="28" height="28" rx="3" ${s(C.blue[0])}/>
    <circle cx="46" cy="64" r="15" ${s(C.red[0])}/>
    <path d="M60 28 L78 58 H42Z" ${s(C.yellow[0])}/>
    ${hi(56, 40, 2.4, 1.6)}`,
  "measure-master": () => `
    <g transform="rotate(-35 60 58)">
      <rect x="26" y="48" width="68" height="20" rx="3" ${s(C.yellow[0])}/>
      <rect x="27.5" y="60" width="65" height="6.5" fill="${C.yellow[1]}"/>
      <path d="M34 48 V56 M42 48 V53 M50 48 V56 M58 48 V53 M66 48 V56 M74 48 V53 M82 48 V56" ${line(2.6)}/>
      <rect x="26" y="48" width="68" height="20" rx="3" ${line()}/>
    </g>`,
  "data-detective": () => `
    <rect x="34" y="58" width="11" height="22" rx="2" ${s(C.green[0])}/>
    <rect x="49" y="44" width="11" height="36" rx="2" ${s(C.orange[0])}/>
    <rect x="64" y="52" width="11" height="28" rx="2" ${s(C.purple[0])}/>
    <path d="M30 80 H80" ${line()}/>
    <path d="M78 64 L88 76" ${line(7)}/>
    <circle cx="72" cy="56" r="12" ${s("rgba(255,255,255,.6)")}/>
    ${hi(67, 51, 2.6, 1.8)}`,
  "code-cracker": () => `
    <path d="M46 52 V42 C46 32 54 27 61 27 C68 27 74 32 74 40" ${line(6)}/>
    <rect x="38" y="50" width="44" height="34" rx="7" ${s(C.yellow[0])}/>
    <rect x="39.7" y="72" width="40.6" height="10.3" rx="5" fill="${C.yellow[1]}"/>
    <rect x="38" y="50" width="44" height="34" rx="7" ${line()}/>
    <circle cx="49" cy="64" r="4" ${s(C.red[0])}/><circle cx="60" cy="64" r="4" ${s(C.blue[0])}/><circle cx="71" cy="64" r="4" ${s(C.red[0])}/>`,
  // Home language
  bookworm: () => `
    <path d="M60 44 C50 38 38 38 28 42 V78 C38 74 50 74 60 80Z" ${s("#fff")}/>
    <path d="M60 44 C70 38 82 38 92 42 V78 C82 74 70 74 60 80Z" ${s("#fff")}/>
    <path d="M24 46 V84 C36 79 50 80 60 86 C70 80 84 79 96 84 V46" ${line()}/>
    <path d="M36 52 H52 M36 60 H52 M68 52 H84 M68 60 H84" fill="none" stroke="${C.grey[0]}" stroke-width="3" stroke-linecap="round"/>
    <path d="M74 40 V58 L79 54 L84 58 V40" ${s(C.red[0])}/>
    <circle cx="50" cy="34" r="7" ${s("rgba(255,255,255,.5)")}/><circle cx="70" cy="34" r="7" ${s("rgba(255,255,255,.5)")}/>
    <path d="M57 34 H63" ${line(3)}/>`,
  wordsmith: () => `
    <path d="M80 26 C60 30 44 46 40 70 L46 72 C54 54 66 40 80 26Z" ${s("#fff")}/>
    <path d="M80 26 C78 46 66 64 46 72 C56 56 68 42 80 26Z" fill="${C.white[1]}"/>
    <path d="M80 26 C60 30 44 46 40 70 L46 72 C66 64 78 46 80 26Z" ${line()}/>
    <path d="M62 44 L44 74" ${line(2.6)}/>
    <path d="M40 70 L36 84 L46 72" ${s(C.blue[0])}/>
    <path d="M30 88 C38 84 46 92 54 88 C62 84 70 92 78 88" fill="none" stroke="${C.blue[0]}" stroke-width="3.5" stroke-linecap="round"/>`,
  "spelling-wizard": () => `
    <path d="M36 82 L70 46" ${line(9)}/><path d="M36 82 L70 46" fill="none" stroke="${C.purple[0]}" stroke-width="4" stroke-linecap="round"/>
    <path d="M62 54 L70 46" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <path d="M76 26 L80 36 L90 40 L80 44 L76 54 L72 44 L62 40 L72 36Z" ${s(C.yellow[0])}/>
    <path d="M46 34 L48 39 L53 41 L48 43 L46 48 L44 43 L39 41 L44 39Z" ${s(C.yellow[0], 2.5)}/>
    <path d="M84 62 L86 66 L90 68 L86 70 L84 74 L82 70 L78 68 L82 66Z" ${s(C.pink[0], 2.5)}/>`,
  "grammar-guardian": () => `
    <rect x="28" y="40" width="20" height="10" rx="5" ${s(C.red[0], 3)}/>
    <rect x="52" y="40" width="28" height="10" rx="5" ${s(C.blue[0], 3)}/>
    <rect x="28" y="56" width="30" height="10" rx="5" ${s(C.green[0], 3)}/>
    <rect x="28" y="72" width="22" height="10" rx="5" ${s(C.yellow[0], 3)}/>
    <path d="M80 76 L90 88" ${line(7)}/>
    <circle cx="72" cy="66" r="13" ${s("rgba(255,255,255,.6)")}/>
    ${hi(67, 61, 2.6, 1.8)}`,
  "golden-mic": () => `
    <path d="M44 56 C44 68 51 76 60 76 C69 76 76 68 76 56" ${line()}/>
    <path d="M60 76 V86 M50 88 H70" ${line()}/>
    <rect x="49" y="26" width="22" height="40" rx="11" ${s(C.gold[0])}/>
    <path d="M50.8 50 H69.2 V55 C69.2 61 65 64.2 60 64.2 C55 64.2 50.8 61 50.8 55Z" fill="${C.gold[1]}"/>
    <path d="M50 40 H70 M50 48 H70" ${line(2.5)}/>
    <rect x="49" y="26" width="22" height="40" rx="11" ${line()}/>
    ${hi(55, 32, 2.4, 1.8)}`,
  // Foreign language
  chatterbox: () => `
    <path d="M28 36 H70 C74 36 76 38 76 42 V60 C76 64 74 66 70 66 H44 L34 76 L36 66 H28 C24 66 22 64 22 60 V42 C22 38 24 36 28 36Z" ${s("#fff")}/>
    <circle cx="38" cy="51" r="3.5" fill="${O}"/><circle cx="49" cy="51" r="3.5" fill="${O}"/><circle cx="60" cy="51" r="3.5" fill="${O}"/>
    <path d="M58 58 H92 C96 58 98 60 98 64 V78 C98 82 96 84 92 84 H88 L90 92 L80 84 H58 C54 84 52 82 52 78 V64 C52 60 54 58 58 58Z" ${s(C.yellow[0])}/>
    <path d="M62 71 C66 67 70 75 74 71 C78 67 82 75 86 71" ${line(3)}/>`,
  "pen-pal": () => `
    <path d="M30 50 C22 40 22 30 28 26 C32 34 38 40 46 44" ${s("#fff")}/>
    <path d="M32 48 C20 44 16 36 18 30 C26 36 34 40 42 44" ${s("#fff")}/>
    <rect x="34" y="42" width="54" height="38" rx="5" ${s("#fff")}/>
    <path d="M36 44 L61 64 L86 44" ${line()}/>
    <path d="M36 78 L54 60 M86 78 L68 60" ${line(2.6)}/>
    <circle cx="80" cy="50" r="5" ${s(C.red[0], 2.5)}/>`,
  globetrotter: () => `
    <circle cx="60" cy="58" r="25" ${s(C.blue[0])}/>
    <path d="M44 42 C50 40 54 46 52 52 C50 58 42 56 40 62 C38 56 38 46 44 42Z" ${s(C.green[0], 2.6)}/>
    <path d="M64 50 C72 46 80 52 80 60 C78 70 70 72 66 66 C62 60 58 56 64 50Z" ${s(C.green[0], 2.6)}/>
    <path d="M52 76 C56 72 62 74 64 80" ${s(C.green[0], 2.6)}/>
    <ellipse cx="60" cy="58" rx="36" ry="11" transform="rotate(-20 60 58)" fill="none" stroke="${C.orange[0]}" stroke-width="4"/>
    <circle cx="92" cy="46" r="4.5" ${s(C.yellow[0], 2.6)}/>
    ${hi(48, 42, 3, 2)}`,
  // Milestones
  "lift-off": () => `
    <path d="M52 70 C46 76 46 84 44 90 C50 88 56 86 60 80" ${s(C.orange[0])}/>
    <path d="M47 62 L36 66 L34 78 L46 72Z" ${s(C.red[0])}/>
    <path d="M73 62 L84 66 L86 78 L74 72Z" ${s(C.red[0])}/>
    <path d="M60 24 C72 32 76 48 74 72 H46 C44 48 48 32 60 24Z" ${s("#fff")}/>
    <path d="M60 24 C72 32 76 48 74 72 H64 C66 50 64 34 60 24Z" fill="${C.white[1]}"/>
    <path d="M60 24 C72 32 76 48 74 72 H46 C44 48 48 32 60 24Z" ${line()}/>
    <circle cx="60" cy="48" r="7" ${s(C.blue[0])}/>
    <path d="M52 72 H68 L64 80 H56Z" ${s(C.grey[0])}/>
    ${hi(57, 46, 2, 1.5)}`,
  pathfinder: () => `
    <path d="M58 34 V90" ${line(7)}/><path d="M58 34 V90" fill="none" stroke="${C.brown[0]}" stroke-width="3"/>
    <path d="M40 34 H80 L88 42 L80 50 H40Z" ${s(C.green[0])}/>
    <path d="M76 56 H38 L30 64 L38 72 H76Z" ${s(C.orange[0])}/>
    <path d="M44 92 C52 88 64 88 72 92" ${line()}/>`,
  summit: () => `
    <path d="M22 86 L48 46 L58 58 L68 44 L98 86Z" ${s(C.grey[0])}/>
    <path d="M60 86 L68 44 L98 86Z" fill="${C.grey[1]}"/>
    <path d="M22 86 L48 46 L58 58 L68 44 L98 86Z" ${line()}/>
    <path d="M42 56 L48 46 L54 54 L50 52 L46 56Z" ${s("#fff", 2.5)}/>
    <path d="M62 54 L68 44 L76 56 L70 54 L66 58Z" ${s("#fff", 2.5)}/>
    <path d="M68 44 V24" ${line()}/>
    <path d="M68 25 L84 30 L68 36Z" ${s(C.red[0])}/>`,
  "hat-trick": () => `
    <circle cx="60" cy="40" r="13" ${s(C.red[0])}/>
    <circle cx="44" cy="68" r="13" ${s(C.blue[0])}/>
    <circle cx="76" cy="68" r="13" ${s(C.yellow[0])}/>
    ${hi(55, 35)}${hi(39, 63)}${hi(71, 63)}`,
  legend: () => `
    <path d="M30 76 L26 40 L44 56 L60 32 L76 56 L94 40 L90 76Z" ${s(C.gold[0])}/>
    <path d="M28 66 L90.8 66 L90 76 H30Z" fill="${C.gold[1]}"/>
    <path d="M30 76 L26 40 L44 56 L60 32 L76 56 L94 40 L90 76Z" ${line()}/>
    <rect x="28" y="76" width="64" height="10" rx="3" ${s(C.gold[1])}/>
    <circle cx="60" cy="60" r="5" ${s(C.red[0])}/><circle cx="42" cy="66" r="3.5" ${s(C.blue[0], 2.6)}/><circle cx="78" cy="66" r="3.5" ${s(C.green[0], 2.6)}/>
    <circle cx="26" cy="40" r="3.5" ${s(C.gold[0], 2.6)}/><circle cx="60" cy="32" r="3.5" ${s(C.gold[0], 2.6)}/><circle cx="94" cy="40" r="3.5" ${s(C.gold[0], 2.6)}/>`,
  // Remembering
  "elephant-memory": () => `
    <path d="M40 44 C26 40 20 54 26 66 C30 74 38 72 42 66Z" ${s(C.grey[0])}/>
    <path d="M80 44 C94 40 100 54 94 66 C90 74 82 72 78 66Z" ${s(C.grey[0])}/>
    <path d="M60 34 C76 34 84 46 82 60 C80 70 72 74 68 76 C68 86 70 92 76 92 C80 92 82 88 80 86" ${s(C.grey[0])}/>
    <path d="M60 34 C44 34 36 46 38 60 C40 70 48 74 52 76 C52 86 56 92 62 92" ${s(C.grey[0])}/>
    <path d="M60 34 C76 34 84 46 82 60 C80 70 72 74 68 76 C68 86 70 92 76 92 C80 92 82 88 80 86 M60 34 C44 34 36 46 38 60 C40 70 48 74 52 76 C52 86 56 92 62 92 H66" fill="${C.grey[0]}"/>
    <path d="M60 34 C76 34 84 46 82 60 C80 70 72 74 68 76 C68 86 70 92 76 92 C80 92 82 88 80 86" ${line()}/>
    <path d="M60 34 C44 34 36 46 38 60 C40 70 48 74 52 76 C52 86 56 92 62 92" ${line()}/>
    <circle cx="50" cy="56" r="4" fill="${O}"/><circle cx="70" cy="56" r="4" fill="${O}"/>
    <circle cx="51.3" cy="54.6" r="1.3" fill="#fff"/><circle cx="71.3" cy="54.6" r="1.3" fill="#fff"/>
    <path d="M52 44 C56 41 64 41 68 44" ${line(2.6)}/>`,
  "comeback-kid": () => `
    <circle cx="60" cy="38" r="11" ${s("#fff")}/>
    <path d="M60 50 C44 50 38 64 40 74 C42 84 50 88 60 88 C70 88 78 84 80 74 C82 64 76 50 60 50Z" ${s(C.red[0])}/>
    <path d="M41 76 C44 84 52 87 60 87 C68 87 76 84 79 76 C72 82 48 82 41 76Z" fill="${C.red[1]}"/>
    <path d="M60 50 C44 50 38 64 40 74 C42 84 50 88 60 88 C70 88 78 84 80 74 C82 64 76 50 60 50Z" ${line()}/>
    <circle cx="56" cy="37" r="1.8" fill="${O}"/><circle cx="64" cy="37" r="1.8" fill="${O}"/>
    <path d="M56 42 C58 44 62 44 64 42" ${line(2.4)}/>
    <path d="M86 70 C92 56 86 40 72 34" ${line()}/><path d="M74 28 L70 35 L78 38" ${line()}/>
    ${hi(48, 60)}`,
  "like-clockwork": () => `
    <circle cx="74" cy="72" r="12" ${s(C.grey[0])}/>
    <circle cx="74" cy="72" r="13" fill="none" stroke="${C.grey[0]}" stroke-width="0"/>
    <circle cx="74" cy="72" r="5" ${s(C.grey[2])}/>
    <circle cx="54" cy="52" r="24" ${s("#fff")}/>
    <path d="M54 34 V37 M54 67 V70 M36 52 H39 M69 52 H72" ${line(3)}/>
    <path d="M54 52 V40 M54 52 L63 57" ${line()}/>
    <circle cx="54" cy="52" r="3" fill="${C.red[0]}"/>`,
  // Streaks
  spark: () => `
    <path d="M60 28 L66 50 L88 58 L66 66 L60 88 L54 66 L32 58 L54 50Z" ${s(C.yellow[0])}/>
    <path d="M60 58 L66 66 L60 88 L54 66Z" fill="${C.yellow[1]}"/>
    <path d="M60 28 L66 50 L88 58 L66 66 L60 88 L54 66 L32 58 L54 50Z" ${line()}/>
    ${hi(57, 46, 2, 1.5)}`,
  flame: () => `
    <path d="M60 24 C66 38 82 46 80 66 C78 80 70 88 60 88 C50 88 42 80 40 66 C38 52 50 46 52 34 C58 42 58 50 56 56 C62 48 64 36 60 24Z" ${s(C.flame[0])}/>
    <path d="M60 60 C64 66 70 70 68 78 C66 84 62 86 60 86 C56 86 52 82 52 76 C52 70 58 68 60 60Z" ${s(C.yellow[0], 2.8)}/>
    ${hi(48, 58)}`,
  campfire: () => `
    <path d="M34 84 L84 72" ${line(10)}/><path d="M34 84 L84 72" fill="none" stroke="${C.brown[0]}" stroke-width="4" stroke-linecap="round"/>
    <path d="M36 72 L86 84" ${line(10)}/><path d="M36 72 L86 84" fill="none" stroke="${C.brown[1]}" stroke-width="4" stroke-linecap="round"/>
    <path d="M60 28 C66 40 78 46 76 60 C75 70 68 74 60 74 C52 74 45 70 44 60 C43 50 52 46 54 36 C58 42 58 48 57 52 C62 46 63 38 60 28Z" ${s(C.flame[0])}/>
    <path d="M60 52 C64 58 68 60 67 66 C66 71 63 72 60 72 C57 72 53 70 53 66 C53 61 58 60 60 52Z" ${s(C.yellow[0], 2.6)}/>`,
  torch: () => `
    <path d="M52 56 H68 L64 92 H56Z" ${s(C.brown[0])}/>
    <path d="M60 57 H68 L64 92 H60Z" fill="${C.brown[1]}"/><path d="M52 56 H68 L64 92 H56Z" ${line()}/>
    <rect x="48" y="52" width="24" height="8" rx="3" ${s(C.grey[0])}/>
    <path d="M60 18 C66 28 76 34 74 44 C73 50 68 52 60 52 C52 52 47 50 46 44 C45 36 52 32 54 26 C57 30 57 34 56 38 C61 34 62 26 60 18Z" ${s(C.flame[0])}/>
    <path d="M60 36 C63 40 66 42 65 46 C64 50 62 50 60 50 C58 50 55 49 55 46 C55 42 59 41 60 36Z" fill="${C.yellow[0]}"/>`,
  comet: () => `
    <path d="M72 46 C56 46 40 56 26 74 C42 66 54 66 66 70Z" ${s(C.yellow[2])}/>
    <path d="M70 56 C58 60 44 70 34 86 C48 76 58 74 70 74Z" ${s(C.yellow[0])}/>
    <circle cx="74" cy="58" r="14" ${s(C.orange[0])}/>
    <path d="M61 62 A14 14 0 0 0 87 62 A14 9 0 0 1 61 62Z" fill="${C.orange[1]}"/>
    <circle cx="74" cy="58" r="14" ${line()}/>
    ${hi(69, 52, 3, 2)}
    <circle cx="36" cy="38" r="2.5" fill="${O}"/><circle cx="88" cy="86" r="2.5" fill="${O}"/>`,
  volcano: () => `
    <path d="M24 88 L46 50 H74 L96 88Z" ${s(C.brown[0])}/>
    <path d="M62 50 H74 L96 88 H72Z" fill="${C.brown[1]}"/><path d="M24 88 L46 50 H74 L96 88Z" ${line()}/>
    <path d="M46 50 C50 58 54 54 56 62 C58 56 62 60 64 56 C66 62 70 56 74 50Z" ${s(C.flame[0], 3)}/>
    <path d="M52 44 C48 34 52 26 58 30 C58 22 66 20 68 28 C74 26 76 36 70 40" ${s(C.flame[0])}/>
    <circle cx="44" cy="32" r="3.5" ${s(C.yellow[0], 2.5)}/><circle cx="80" cy="28" r="3" ${s(C.yellow[0], 2.5)}/>`,
  sun: () => {
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2, x = 60 + 32 * Math.sin(a), y = 58 - 32 * Math.cos(a);
      rays.push(`<path d="M${(60 + 23 * Math.sin(a)).toFixed(1)} ${(58 - 23 * Math.cos(a)).toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}" ${line(5)}/><path d="M${(60 + 23 * Math.sin(a)).toFixed(1)} ${(58 - 23 * Math.cos(a)).toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${C.orange[0]}" stroke-width="1.8" stroke-linecap="round"/>`);
    }
    return `${rays.join("")}
    <circle cx="60" cy="58" r="19" ${s(C.yellow[0])}/>
    <path d="M42 62 A19 19 0 0 0 78 62 A19 13 0 0 1 42 62Z" fill="${C.yellow[1]}"/>
    <circle cx="60" cy="58" r="19" ${line()}/>
    ${hi(53, 50, 3, 2)}`;
  },
  supernova: () => {
    const pts = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, r = i % 2 ? 14 : 34;
      pts.push(`${(60 + r * Math.sin(a)).toFixed(1)} ${(58 - r * Math.cos(a)).toFixed(1)}`);
    }
    return `
    <path d="M${pts.join(" L")}Z" ${s(C.purple[0])}/>
    <circle cx="60" cy="58" r="12" ${s(C.yellow[0])}/>
    <circle cx="60" cy="58" r="5" fill="#fff"/>
    <circle cx="30" cy="34" r="3" ${s(C.pink[0], 2.4)}/><circle cx="90" cy="82" r="3" ${s(C.blue[0], 2.4)}/><circle cx="88" cy="32" r="2.4" fill="${O}"/>`;
  },
  // Effort and curiosity
  "busy-bee": () => `
    <ellipse cx="50" cy="40" rx="11" ry="15" transform="rotate(-25 50 40)" ${s("rgba(255,255,255,.85)")}/>
    <ellipse cx="68" cy="38" rx="11" ry="15" transform="rotate(20 68 38)" ${s("rgba(255,255,255,.85)")}/>
    <ellipse cx="60" cy="64" rx="22" ry="18" ${s(C.yellow[0])}/>
    <path d="M52 47.5 C49 56 49 72 52 80.5 M66 47.5 C70 56 70 72 66 80.5" fill="none" stroke="${O}" stroke-width="6"/>
    <ellipse cx="60" cy="64" rx="22" ry="18" ${line()}/>
    <circle cx="44" cy="60" r="2.6" fill="${O}"/><path d="M40 68 C42 70 45 70 47 68" ${line(2.2)}/>
    <path d="M82 64 L90 64" ${line(3)}/>`,
  "time-traveller": () => `
    <path d="M42 30 H78 M42 86 H78" ${line(6)}/>
    <path d="M46 32 C46 46 58 52 58 58 C58 64 46 70 46 84 H74 C74 70 62 64 62 58 C62 52 74 46 74 32Z" ${s("rgba(255,255,255,.7)")}/>
    <path d="M50 36 H70 C68 44 62 48 60 54 C58 48 52 44 50 36Z" fill="${C.yellow[0]}"/>
    <path d="M60 64 C64 70 70 74 71 82 H49 C50 74 56 70 60 64Z" fill="${C.yellow[0]}"/>
    <path d="M46 32 C46 46 58 52 58 58 C58 64 46 70 46 84 H74 C74 70 62 64 62 58 C62 52 74 46 74 32Z" ${line()}/>
    <path d="M86 44 C94 54 92 70 82 78" ${line()}/><path d="M88 72 L82 78 L90 82" ${line()}/>`,
};

// Group, frame and colour per badge. Strand colour follows the subject.
const GROUPS = [
  ["medal", "blue", ["number-navigator", "calculation-ace", "shape-shifter", "measure-master", "data-detective", "code-cracker"]],
  ["medal", "red", ["bookworm", "wordsmith", "spelling-wizard", "grammar-guardian", "golden-mic"]],
  ["medal", "green", ["chatterbox", "pen-pal", "globetrotter"]],
  ["shield", "orange", ["lift-off", "pathfinder", "summit", "hat-trick", "legend"]],
  ["hex", "purple", ["elephant-memory", "comeback-kid", "like-clockwork"]],
  ["tile", "flame", ["spark", "flame", "campfire", "torch", "comet", "volcano", "sun", "supernova"]],
  ["rosette", "pink", ["busy-bee", "time-traveller"]],
];

mkdirSync(OUT, { recursive: true });
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">${body.replace(/\n\s*/g, "")}</svg>\n`;
let n = 0;
for (const [frame, colour, ids] of GROUPS) {
  for (const id of ids) {
    if (!ICONS[id]) throw new Error(`no icon for ${id}`);
    writeFileSync(join(OUT, `${id}.svg`), svg(FRAMES[frame](C[colour]) + ICONS[id]()));
    writeFileSync(join(OUT, `${id}.gold.svg`), svg(FRAMES[frame](C.gold) + ICONS[id]()));
    n++;
  }
}
console.log(`assets/badges: ${n} badges, ${n * 2} files`);
