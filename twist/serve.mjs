// Serves the lesson player, Practice, Drawings and Task types from a clone of
// this repo, to people signed in with their own account. No dependencies;
// Node 18 or later.
//
//   node twist/serve.mjs                       # port 8080, accounts in .twist-data/
//   TWIST_USER=you@ist.com TWIST_PASS=… node twist/serve.mjs
//                                              # the first admin, made when there are no accounts yet
//   TWIST_API_URL=https://… node twist/serve.mjs
//                                              # accounts and feedback on the IST-B2C backend
//   PORT=3000 HOST=0.0.0.0 …                   # port; every interface (default: 127.0.0.1 only)
//   TWIST_DATA=/data                           # where the file store keeps accounts.json and feedback.json
//   COOKIE_SECURE=1                            # mark the session cookie Secure
//   TRUST_PROXY=1                              # behind our reverse proxy: read the client's address from
//                                              # X-Forwarded-For (sign-in limits) and https from X-Forwarded-Proto
//
// Sign-in, sessions, feedback and accounts are in server/ (twist/docs/feedback.md).
// Only pages/ and assets/ are served; / opens the player. Audio answers
// Range requests (phones need them to play and seek), and HTML and JS are
// gzipped once and kept in memory until the file changes (the player page
// is about 30 MB, 4 MB gzipped). Put it behind HTTPS (a reverse proxy).
import { createServer } from "node:http";
import { createReadStream, statSync, readFileSync, realpathSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join, normalize, extname, dirname, sep, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createApi } from "./server/api.mjs";
import { can, TOOL_DIRS } from "./server/roles.mjs";
import { fileStore } from "./server/store-file.mjs";
import { apiStore } from "./server/store-api.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const REAL_ROOT = realpathSync(ROOT);
const PORT = +(process.env.PORT ?? 8080);
// Only the reverse proxy on this machine reaches it, unless HOST says otherwise (HOST=0.0.0.0).
const HOST = process.env.HOST ?? "127.0.0.1";
const API_URL = process.env.TWIST_API_URL?.trim();
const DATA = process.env.TWIST_DATA ?? join(ROOT, "..", ".twist-data");
const store = API_URL ? apiStore(API_URL) : fileStore(DATA, { seedLogin: process.env.TWIST_USER, seedPassword: process.env.TWIST_PASS });
const api = createApi(store, { secureCookies: process.env.COOKIE_SECURE === "1", trustProxy: process.env.TRUST_PROXY === "1" });
const SERVED = ["pages", "assets"];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg", ".woff2": "font/woff2", ".yaml": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8" };
const ZIP = new Set([".html", ".js", ".mjs", ".css", ".json", ".svg", ".yaml", ".md"]);
const zipped = new Map(); // path -> { mtime, body }

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

const server = createServer(async (req, res) => {
  // Sign-in, sign-out, /api and the health check; anything else needs a session.
  if (await api.handle(req, res)) return;
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405, { Allow: "GET, HEAD" }); return res.end(); }
  const path = req.url.split("?")[0];
  if (path === "/" || path === "") { res.writeHead(302, { Location: "/pages/player/" }); return res.end(); }
  // A folder without its slash: redirect so relative links (../../assets/) resolve.
  const file = fileFor(path);
  if (!file) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  // Drawings and Task types are the team's tools: checked on the file that would be sent, so no way of
  // writing the address reaches them (lower case too, for file systems that ignore case).
  // The real path, so a symlink (none today) cannot lead into them under another name.
  let real; try { real = realpathSync(file); } catch { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  if (!real.startsWith(REAL_ROOT + sep)) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  const rel = relative(REAL_ROOT, real).split(sep).join("/").toLowerCase();
  if (!can(req.session.user).tools && TOOL_DIRS.some((d) => rel === d || rel.startsWith(d + "/"))) { res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("Drawings and Task types are for the content team, not testers.\n"); }
  let st;
  try { st = statSync(file); } catch { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found\n"); }
  // The target is built from the file's own path under ROOT, never from the
  // request, so "//other.site/pages/player" cannot redirect off this server.
  if (!path.endsWith("/") && file.endsWith(`${sep}index.html`) && !path.endsWith("index.html")) {
    const rel = file.slice(ROOT.length + 1, -"index.html".length).split(sep).join("/");
    res.writeHead(301, { Location: "/" + rel }); return res.end();
  }
  const ext = extname(file).toLowerCase(), type = TYPES[ext] ?? "application/octet-stream";
  const etag = `"${st.size.toString(36)}-${st.mtimeMs.toString(36)}"`;
  const headers = { "Content-Type": type, ETag: etag, "Last-Modified": st.mtime.toUTCString(), "Cache-Control": "no-cache", "Accept-Ranges": "bytes", "X-Content-Type-Options": "nosniff" };
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
server.listen(PORT, HOST, () => console.log(`Twist player on http://${HOST}:${PORT}/ (accounts: ${API_URL ? `backend ${API_URL}` : `file store in ${DATA}`})`));
