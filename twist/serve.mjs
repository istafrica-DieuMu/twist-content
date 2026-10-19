// Serves the lesson player, Practice, Drawings and Task types from a clone of
// this repo, behind HTTP basic auth. No dependencies; Node 18 or later.
//
//   TWIST_USER=… TWIST_PASS=… node twist/serve.mjs          # port 8080
//   PORT=3000 TWIST_USER=… TWIST_PASS=… node twist/serve.mjs
//
// Only pages/ and assets/ are served; / opens the player. Audio answers
// Range requests (phones need them to play and seek), and HTML and JS are
// gzipped once and kept in memory until the file changes (the player page
// is about 25 MB, 4 MB gzipped). Put it behind HTTPS (a reverse proxy):
// basic auth sends the password with every request.
import { createServer } from "node:http";
import { createReadStream, statSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { timingSafeEqual } from "node:crypto";
import { join, normalize, extname, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = +(process.env.PORT ?? 8080);
const USER = process.env.TWIST_USER, PASS = process.env.TWIST_PASS;
if (!USER || !PASS) { console.error("Set TWIST_USER and TWIST_PASS: the player is served behind basic auth."); process.exit(1); }
const EXPECTED = Buffer.from(`${USER}:${PASS}`);
const SERVED = ["pages", "assets"];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg", ".woff2": "font/woff2", ".yaml": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8" };
const ZIP = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg", ".yaml", ".md"]);
const zipped = new Map(); // path -> { mtime, body }

function authorised(req) {
  const h = req.headers.authorization ?? "";
  if (!h.startsWith("Basic ")) return false;
  const got = Buffer.from(Buffer.from(h.slice(6), "base64").toString("utf8"));
  return got.length === EXPECTED.length && timingSafeEqual(got, EXPECTED);
}

// The file for a URL path, or null when it is outside pages/ and assets/.
function fileFor(urlPath) {
  let p;
  try { p = decodeURIComponent(urlPath.split("?")[0]); } catch { return null; }
  const rel = normalize(p).replace(/^[/\\]+/, "");
  if (rel.split(sep).some((part) => part.startsWith(".")) || !SERVED.includes(rel.split(sep)[0])) return null;
  let file = join(ROOT, rel);
  if (!file.startsWith(ROOT + sep)) return null;
  try { if (statSync(file).isDirectory()) file = join(file, "index.html"); } catch { return null; }
  return file;
}

const server = createServer((req, res) => {
  if (!authorised(req)) { res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Twist", charset="UTF-8"', "Content-Type": "text/plain" }); return res.end("Sign in to open the Twist lesson player.\n"); }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405, { Allow: "GET, HEAD" }); return res.end(); }
  const path = req.url.split("?")[0];
  if (path === "/" || path === "") { res.writeHead(302, { Location: "/pages/player/" }); return res.end(); }
  // A folder without its slash: redirect so relative links (../../assets/) resolve.
  const file = fileFor(path);
  if (!file) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  let st;
  try { st = statSync(file); } catch { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  if (!path.endsWith("/") && file.endsWith(`${sep}index.html`) && !path.endsWith("index.html")) { res.writeHead(301, { Location: path + "/" }); return res.end(); }
  const ext = extname(file).toLowerCase(), type = TYPES[ext] ?? "application/octet-stream";
  const etag = `"${st.size.toString(36)}-${st.mtimeMs.toString(36)}"`;
  const headers = { "Content-Type": type, ETag: etag, "Last-Modified": st.mtime.toUTCString(), "Cache-Control": ext === ".html" ? "no-cache" : "private, max-age=86400", "Accept-Ranges": "bytes", "X-Content-Type-Options": "nosniff" };
  if (req.headers["if-none-match"] === etag) { res.writeHead(304, headers); return res.end(); }
  // Gzip text once per version of the file.
  if (ZIP.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    let z = zipped.get(file);
    if (!z || z.mtime !== st.mtimeMs) { z = { mtime: st.mtimeMs, body: gzipSync(readFileSync(file), { level: 6 }) }; zipped.set(file, z); }
    res.writeHead(200, { ...headers, "Content-Encoding": "gzip", "Content-Length": z.body.length, Vary: "Accept-Encoding" });
    return res.end(req.method === "HEAD" ? undefined : z.body);
  }
  // Range requests for audio and video.
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
  if (range) {
    let start = range[1] === "" ? st.size - +range[2] : +range[1];
    let end = range[1] !== "" && range[2] !== "" ? +range[2] : st.size - 1;
    if (Number.isNaN(start) || start < 0 || start >= st.size || end < start) { res.writeHead(416, { "Content-Range": `bytes */${st.size}` }); return res.end(); }
    end = Math.min(end, st.size - 1);
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Content-Length": end - start + 1 });
    if (req.method === "HEAD") return res.end();
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { ...headers, "Content-Length": st.size });
  if (req.method === "HEAD") return res.end();
  createReadStream(file).pipe(res);
});
server.listen(PORT, () => console.log(`Twist player on http://localhost:${PORT}/ (basic auth as ${USER})`));
