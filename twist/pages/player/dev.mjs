// Local dev server for the player: changes show at once, no manual build.
//   node twist/pages/player/dev.mjs [port]      (default 8765)
// Serves twist/ over http (so the Rive animations load) and reloads the open
// page after every change. A change to the player's own code (js, css,
// template) is put together in well under a second from the last build's
// data; a change to lessons, assets, curricula or drills runs the full build
// (a few minutes). Builds a draft, so lines not narrated yet do not stop it
// (they play without audio). Writes pages/player/draft.html and
// .dev-data.json (not in git); index.html is left to build.mjs.
import { createServer } from "node:http";
import { readFileSync, writeFileSync, statSync, watch } from "node:fs";
import { join, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const T = join(HERE, "../..");
const PORT = +(process.argv[2] ?? 8765);
const DRAFT = join(HERE, "draft.html");
const DATA = join(HERE, ".dev-data.json");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".riv": "application/octet-stream", ".yaml": "text/plain; charset=utf-8" };

let version = 0, building = false, again = false;
function build() {
  if (building) { again = true; return; }
  building = true;
  const t0 = Date.now();
  execFile("node", [join(HERE, "build.mjs"), "--draft", DRAFT, "--data-out", DATA], { cwd: T, maxBuffer: 1 << 26 }, (err, out, errOut) => {
    building = false;
    if (err) console.error("build failed:\n" + (errOut || err.message));
    else {
      // The draft points its assets at file://; served over http they stay relative.
      writeFileSync(DRAFT, readFileSync(DRAFT, "utf8").replace(/"assets":"file:\/\/[^"]*"/, '"assets":"../../assets/"'));
      version++;
      console.log(`rebuilt in ${((Date.now() - t0) / 1000).toFixed(1)} s${errOut ? " (" + errOut.trim().split("\n").at(-1) + ")" : ""}`);
    }
    if (again) { again = false; build(); }
  });
}

// The player's code alone changed: the same steps as the end of build.mjs, from the saved data.
// It does not wait for a full build that is running; that build reloads the page again when done.
function compose() {
  let data; try { data = readFileSync(DATA, "utf8"); } catch { return build(); }
  const rd = (f) => readFileSync(join(HERE, f), "utf8");
  try {
    const rules = rd("practice-rules.mjs").replace(/^export /gm, "");
    const ui = ["practice-ui.js", "app-ui.js", "parents-ui.js", "anim-ui.js", "side-ui.js", "feedback-ui.js"].map(rd).join("\n");
    writeFileSync(DRAFT, rd("template.html").replace("__DATA__", () => data.replace(/</g, "\\u003c")).replace("/*__PRACTICE__*/", () => rules + "\n" + ui).replace("/*__PRACTICE_CSS__*/", () => ["practice.css", "app.css", "parents.css", "anim.css", "feedback.css"].map(rd).join("\n")).replace("/*__DRAWN__*/", () => rd("drawn.js")));
    version++; console.log("player code reloaded");
  } catch (e) { console.error("compose failed: " + e.message); }
}

// Rebuild on any change that the player is built from.
let timer = null, full = false;
const later = (isFull) => { full ||= isFull; clearTimeout(timer); timer = setTimeout(() => { const f = full; full = false; f ? build() : compose(); }, 200); };
for (const dir of ["lessons", "assets", "curricula", "competencies", "years", "drills"])
  watch(join(T, dir), { recursive: true }, (_, f) => { if (f && !f.includes("narration/")) later(true); });
watch(HERE, { recursive: true }, (_, f) => { if (f && /\.(js|mjs|css|html)$/.test(f) && !/(^|\/)(index|draft)\.html$/.test(f) && !f.startsWith("anim/") && f !== "dev.mjs" && f !== "build.mjs") later(false); });

// The open page asks for the build number and reloads when it changes.
const RELOAD = `<script>(()=>{let v=null;setInterval(async()=>{try{const n=await (await fetch("/__dev/version")).text();if(v!==null&&n!==v)location.reload();v=n;}catch{}},800);})();</script>`;

createServer((req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  if (path === "/__dev/version") { res.writeHead(200, { "Content-Type": "text/plain", "Cache-Control": "no-store" }); return res.end(String(version)); }
  if (path === "/" || path === "/pages/player" || path === "/pages/player/") { res.writeHead(302, { Location: "/pages/player/draft.html" }); return res.end(); }
  const file = normalize(join(T, path));
  if (!file.startsWith(T + sep)) { res.writeHead(404); return res.end(); }
  let st; try { st = statSync(file); } catch { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  if (st.isDirectory()) { res.writeHead(404); return res.end(); }
  const ext = extname(file).toLowerCase();
  let body = readFileSync(file);
  if (file === DRAFT) body = body.toString().replace("</body>", RELOAD + "</body>");
  res.writeHead(200, { "Content-Type": TYPES[ext] ?? "application/octet-stream", "Cache-Control": "no-store" });
  res.end(body);
}).listen(PORT, "127.0.0.1", () => console.log(`player dev: http://localhost:${PORT}/pages/player/draft.html (rebuilds and reloads on change)`));

// Start from the last build's data at once when there is one; the full build follows.
try { statSync(DATA); compose(); } catch {}
build();
