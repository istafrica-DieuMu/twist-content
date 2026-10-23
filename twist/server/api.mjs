// Sign-in, sessions and the /api routes behind Twist Preview: who is signed
// in, feedback pinned to app screens, and accounts. serve.mjs asks
// handle() first and serves files only to a signed-in person.
//
// A session is a random id in an HttpOnly cookie; what it stands for (the
// person, and their backend tokens in backend mode) stays in this process.
// Changes need the X-Twist header, which another site cannot send without a
// CORS preflight this server never answers, so a form elsewhere cannot post here.
import { randomBytes, createHmac } from "node:crypto";
import { ROLES, ROLE_NAME, can, canSee, canResolve, canEdit, canDelete, manages, grantable, managesAnyone } from "./roles.mjs";
import { StoreError } from "./store-file.mjs";

export const COOKIE = "twist_session";
const IDLE_MS = 12 * 3600_000, MAX_MS = 7 * 24 * 3600_000;
const MIN_PASSWORD = 10;
const LIMIT = { body: 4000, reply: 2000, label: 200, field: 120 };

class Bad extends Error { constructor(status, message) { super(message); this.status = status; } }

// Wrong sign-in tries, counted in fifteen-minute windows. A full table never drops a counter that is still
// counting, so an attacker cannot push out the counts that hold them back; a new key then shares the counter
// of its overflow key (a wider network), which still counts and limits.
const WINDOW_MS = 15 * 60_000;
// Wrong passwords per account, in a fixed table of counters picked by a keyed hash of the login. Every account
// always has a counter of its own with the full limit, the table never grows and never drops a counter, and
// without the key (random, made at start) nobody can choose logins that land on someone else's counter.
// Two real accounts sharing one by chance is about one in 65,536 per pair.
function accountCounters(size = 1 << 16) {
  const key = randomBytes(32), n = new Uint32Array(size), until = new Float64Array(size), nextAt = new Float64Array(size);
  const live = (i, t) => until[i] > t || nextAt[i] > t;
  return {
    slot: (login) => createHmac("sha256", key).update(login).digest().readUInt32BE(0) % size,
    count: (i, t) => (until[i] > t ? n[i] : 0),
    nextAt: (i) => nextAt[i],
    setNextAt: (i, v) => { nextAt[i] = v; },
    add(i, t) { if (until[i] <= t) { n[i] = 0; until[i] = t + WINDOW_MS; if (!live(i, t)) nextAt[i] = 0; } n[i]++; },
    clear(i) { n[i] = 0; until[i] = 0; nextAt[i] = 0; },
  };
}
function tally(MAX_KEYS = 20_000) {
  const m = new Map();
  const sweep = (t) => { for (const [k, f] of m) if (f.until <= t && f.nextAt <= t) m.delete(k); };
  // The key a try is counted under: its own, or its overflow key when the table is full even after a sweep.
  const keyFor = (key, t, overflow) => {
    if (m.has(key) || m.size < MAX_KEYS) return key;
    sweep(t);
    if (m.has(key) || m.size < MAX_KEYS) return key;
    // Overflow keys get half as much room again; past that, everything new shares one counter.
    const o = `overflow:${overflow}`;
    return m.has(o) || m.size < MAX_KEYS * 1.5 ? o : "overflow:*";
  };
  return {
    keyFor,
    // The count with this try added.
    add(key, t) {
      const f = m.get(key);
      if (f && f.until > t) { f.n++; return f.n; }
      m.set(key, { n: 1, until: t + WINDOW_MS, nextAt: f?.nextAt ?? 0 }); return 1;
    },
    get: (key, t) => { const f = m.get(key); return f && f.until > t ? f : null; },
    delete: (key) => m.delete(key),
    sweep,
  };
}
// The address a try comes from. Behind our proxy (TRUST_PROXY) it is the last X-Forwarded-For entry, the one
// the proxy added; without one that header is the client's own and is ignored. IPv6 counts per /64, which
// one machine can fill with addresses.
export function clientAddress(req, trustProxy) {
  let a = (trustProxy && req.headers["x-forwarded-for"]?.split(",").at(-1).trim()) || req.socket.remoteAddress || "?";
  a = a.replace(/^::ffff:(?=\d+\.)/, "");
  if (!a.includes(":")) return a;
  const [head, tail = ""] = a.split("::"), h = head ? head.split(":") : [], tl = tail ? tail.split(":") : [];
  const full = a.includes("::") ? [...h, ...Array(8 - h.length - tl.length).fill("0"), ...tl] : h;
  return full.slice(0, 4).map((g) => g.toLowerCase().replace(/^0+(?=.)/, "")).join(":") + "::/64";
}

export function createApi(store, { secureCookies = false, trustProxy = false, now = () => Date.now(), maxKeys } = {}) {
  const sessions = new Map();
  const byAddress = tally(maxKeys), byAccount = accountCounters();
  // Ends every session of an account but the one given: after a password change or reset.
  const endSessions = (userId, keep) => { for (const [k, x] of sessions) if (x.user.id === userId && k !== keep) sessions.delete(k); };
  setInterval(() => {
    const t = now();
    for (const [k, s] of sessions) if (t - s.seen > IDLE_MS || t - s.created > MAX_MS) sessions.delete(k);
    byAddress.sweep(t);
  }, 600_000).unref();

  const cookieOf = (req) => Object.fromEntries((req.headers.cookie ?? "").split(";").map((c) => c.trim().split("=")).filter((p) => p.length === 2))[COOKIE];
  const secure = (req) => secureCookies || (trustProxy && req.headers["x-forwarded-proto"] === "https");
  const setCookie = (req, res, value, maxAge) => res.setHeader("Set-Cookie", `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure(req) ? "; Secure" : ""}`);

  function sessionOf(req) {
    const id = cookieOf(req), s = id && sessions.get(id), t = now();
    if (!s) return null;
    if (t - s.seen > IDLE_MS || t - s.created > MAX_MS) { sessions.delete(id); return null; }
    s.seen = t; return s;
  }
  // The signed-in person as they are now: an account switched off or removed ends its sessions.
  async function signedIn(req) {
    const s = sessionOf(req); if (!s) return null;
    const u = await store.current(s).catch(() => s.user);
    if (!u) { sessions.delete(s.id); return null; }
    s.user = u; return s;
  }

  const json = (res, status, body) => { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); };
  async function readJson(req) {
    let size = 0; const parts = [];
    for await (const c of req) { size += c.length; if (size > 64 * 1024) throw new Bad(413, "That is too long."); parts.push(c); }
    if (!size) return {};
    try { return JSON.parse(Buffer.concat(parts).toString("utf8")); } catch { throw new Bad(400, "That was not JSON."); }
  }
  async function readForm(req) {
    let size = 0; const parts = [];
    for await (const c of req) { size += c.length; if (size > 8 * 1024) break; parts.push(c); }
    return new URLSearchParams(Buffer.concat(parts).toString("utf8"));
  }
  const str = (v, max, name, min = 0) => { const s = String(v ?? "").trim(); if (s.length < min) throw new Bad(400, `${name} is missing.`); if (s.length > max) throw new Bad(400, `${name} is longer than ${max} characters.`); return s; };
  // Where to go after signing in: a path on this site only. Browsers drop tabs and newlines and read
  // a backslash as a slash, so "/\t/evil.org" would leave the site; resolve it and keep only the path.
  const safeNext = (n) => {
    const home = "/pages/player/";
    if (typeof n !== "string" || !n.startsWith("/") || /[\x00-\x1f\\]/.test(n)) return home;
    try { const u = new URL(n, "http://x"); return u.origin === "http://x" && !u.pathname.startsWith("//") ? u.pathname + u.search + u.hash : home; } catch { return home; }
  };

  /* ---------- the sign-in page ---------- */
  function signInPage(res, { error = "", next = "/pages/player/", login = "" } = {}) {
    const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    res.writeHead(error ? 401 : 200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Frame-Options": "DENY" });
    res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign in · Twist Preview</title>
<style>:root{--bg:#f5f3fa;--card:#fff;--ink:#2b0f45;--mute:#6b5a80;--line:#e1dbea;--accent:#7b3fe4;--bad:#b3261e}
@media (prefers-color-scheme:dark){:root{--bg:#17121f;--card:#221a2e;--ink:#f1ebfa;--mute:#b4a6c6;--line:#3a2f4a;--accent:#a77bff;--bad:#ff8a80}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;padding:16px}
form{width:100%;max-width:360px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:28px}
.logo{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--accent);color:#fff;font-weight:800;font-size:20px}
h1{font-size:20px;margin:14px 0 4px}p{margin:0 0 18px;color:var(--mute);font-size:14px}
label{display:block;font-size:13px;font-weight:600;margin:14px 0 6px}input{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font:inherit;background:transparent;color:inherit}
input:focus{outline:2px solid var(--accent);outline-offset:1px}button{margin-top:20px;width:100%;padding:11px;border:0;border-radius:10px;background:var(--accent);color:#fff;font:inherit;font-weight:700;cursor:pointer}
.err{color:var(--bad);font-size:14px;margin:14px 0 0}</style></head><body>
<form method="post" action="/auth/sign-in"><span class="logo">T</span><h1>Twist Preview</h1><p>Sign in with the account you were given. Ask your manager if you do not have one or forgot the password.</p>
<input type="hidden" name="next" value="${e(next)}">
<label for="login">Email</label><input id="login" name="login" autocomplete="username" required autofocus value="${e(login)}">
<label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required>
${error ? `<p class="err" role="alert">${e(error)}</p>` : ""}<button>Sign in</button></form></body></html>`);
  }

  async function signIn(req, res) {
    const ip = clientAddress(req, trustProxy);
    const f = await readForm(req), login = (f.get("login") ?? "").trim(), password = f.get("password") ?? "", next = safeNext(f.get("next"));
    const origin = req.headers.origin;
    const hostOf = (o) => { try { return new URL(o).host; } catch { return null; } };
    if (origin && hostOf(origin) !== req.headers.host) return signInPage(res, { error: "Sign in from this site's own page.", next });
    // An address gets ten tries in fifteen minutes. Each is counted before the password is checked, so
    // tries sent at once cannot all slip under the limit; a right password gives its try back.
    const t0 = now();
    // Overflow: when the address table is full, an IPv4 address shares its /16's counter, an IPv6 /64 its /32's.
    const ipKey = byAddress.keyFor(ip, t0, ip.includes(":") ? ip.split(":").slice(0, 2).join(":") : ip.split(".").slice(0, 2).join("."));
    const acct = byAccount.slot(login.toLowerCase().slice(0, 255));
    if (byAddress.add(ipKey, t0) > 10) return signInPage(res, { error: "Too many tries. Wait fifteen minutes and try again.", next, login });
    // An account is not locked by a count, which would let anyone lock its owner out. After ten wrong passwords
    // for it from anywhere, its checks queue up one at a time, a second apart and more as the count grows (up to
    // ten), so guesses sent at once are spread out too. Only a queue over a minute long, which takes a flood
    // from many addresses, turns a try away, for that minute.
    const wrong = byAccount.count(acct, t0);
    if (wrong >= 10) {
      const at = Math.max(t0, byAccount.nextAt(acct)), wait = at - t0;
      if (wait > 60_000) return signInPage(res, { error: "This account has had many wrong passwords just now. Try again in a minute.", next, login });
      byAccount.setNextAt(acct, at + Math.min(10, wrong - 9) * 1000);
      if (wait) await new Promise((r) => setTimeout(r, wait));
    }
    const r = await store.signIn(login, password);
    if (!r.user) {
      if (r.fail === "credentials") byAccount.add(acct, now());
      const msg = { credentials: "That email and password do not match an account.", inactive: "This account is switched off. Ask your manager.", role: `Your account (${r.backendRole}) has no Twist Preview role. Ask an admin for one.`, unreachable: "The sign-in service cannot be reached just now. This is not a password problem; try again in a minute." }[r.fail];
      return signInPage(res, { error: msg, next, login });
    }
    byAccount.clear(acct);
    const fa = byAddress.get(ipKey, now()); if (fa) fa.n = Math.max(0, fa.n - 1);
    const id = randomBytes(32).toString("base64url"), t = now();
    sessions.set(id, { id, user: r.user, tokens: r.tokens, created: t, seen: t });
    setCookie(req, res, id, MAX_MS / 1000);
    res.writeHead(303, { Location: next }); res.end();
  }

  /* ---------- feedback ---------- */
  // Only the fields a screen reference may hold, so the store never keeps whatever a client sends.
  function screenOf(v) {
    if (!v || typeof v !== "object") throw new Bad(400, "Which screen is this about?");
    const kinds = ["lesson", "app", "study", "parents"];
    if (!kinds.includes(v.kind)) throw new Bad(400, "Unknown kind of screen.");
    const out = { kind: v.kind, label: str(v.label, LIMIT.label, "The screen's name", 1) };
    for (const k of ["set", "setTitle", "curriculum", "language", "stepKind", "task", "taskType", "tab", "subj", "build"]) if (v[k] != null && v[k] !== "") out[k] = str(v[k], LIMIT.field, k);
    for (const k of ["lesson", "step"]) if (v[k] != null) { const n = Number(v[k]); if (!Number.isInteger(n) || n < 0 || n > 10000) throw new Bad(400, `${k} is not a number.`); out[k] = n; }
    if (v.kind === "lesson" && (!out.set || out.lesson == null)) throw new Bad(400, "A lesson screen needs its set and lesson.");
    return out;
  }
  function pinOf(v) {
    const x = Number(v?.x), y = Number(v?.y);
    if (!(x >= 0 && x <= 1 && y >= 0 && y <= 1)) throw new Bad(400, "The pin is off the screen.");
    return { x: Math.round(x * 10000) / 10000, y: Math.round(y * 10000) / 10000 };
  }
  // An area: a box on the screen in the same fractions as a pin, at least a little wide and tall, inside the screen.
  function areaOf(v) {
    if (v == null) return null;
    const [x, y, w, h] = ["x", "y", "w", "h"].map((k) => Number(v?.[k]));
    if (![x, y, w, h].every((n) => Number.isFinite(n) && n >= 0 && n <= 1) || w < 0.005 || h < 0.005 || x + w > 1.0001 || y + h > 1.0001) throw new Bad(400, "The area is off the screen.");
    const r = (n) => Math.round(n * 10000) / 10000;
    return { x: r(x), y: r(y), w: r(w), h: r(h) };
  }
  const targetOf = (v) => v && typeof v === "object" && v.label ? { label: str(v.label, LIMIT.label, "The target") } : null;
  const withCan = (u, f, accounts) => ({ ...f, can: { resolve: canResolve(u, f, accounts), edit: canEdit(u, f), delete: canDelete(u, f) } });
  // Whose accounts decide team membership: a manager's own, read once per request.
  const teamOf = async (s) => can(s.user).seeTeam || can(s.user).resolveTeam ? store.accounts(s).catch(() => []) : [];

  async function feedbackRoute(req, res, s, url, parts) {
    const u = s.user;
    if (!can(u).comment) throw new Bad(403, "Your role cannot leave feedback.");
    if (parts.length === 0 && req.method === "GET") {
      const accounts = await teamOf(s), status = url.searchParams.get("status");
      const list = (await store.listFeedback(s)).filter((f) => canSee(u, f, accounts) && (!status || status === "all" || f.status === status));
      list.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
      return json(res, 200, { feedback: list.map((f) => withCan(u, f, accounts)) });
    }
    if (parts.length === 0 && req.method === "POST") {
      const b = await readJson(req);
      // An area comment's pin is the area's top-left corner, where its number shows.
      const area = areaOf(b.area), pin = area ? { x: area.x, y: area.y } : pinOf(b.pin);
      const f = await store.createFeedback(s, { screen: screenOf(b.screen), pin, area, target: targetOf(b.target), body: str(b.body, LIMIT.body, "The comment", 1) });
      return json(res, 201, { feedback: withCan(u, f, []) });
    }
    const id = parts[0], accounts = await teamOf(s);
    const f = await store.getFeedback(s, id);
    if (!canSee(u, f, accounts)) throw new Bad(404, "No such comment.");
    if (parts.length === 1 && req.method === "GET") return json(res, 200, { feedback: withCan(u, f, accounts) });
    if (parts.length === 1 && req.method === "PATCH") {
      const b = await readJson(req), patch = {};
      if (b.body != null) { if (!canEdit(u, f)) throw new Bad(403, "Only the author can change an open comment."); patch.body = str(b.body, LIMIT.body, "The comment", 1); }
      if (b.status != null) { if (!["open", "resolved"].includes(b.status)) throw new Bad(400, "A comment is open or resolved."); if (!canResolve(u, f, accounts)) throw new Bad(403, "Your role cannot resolve this comment."); patch.status = b.status; }
      return json(res, 200, { feedback: withCan(u, await store.updateFeedback(s, id, patch), accounts) });
    }
    if (parts.length === 1 && req.method === "DELETE") {
      if (!canDelete(u, f)) throw new Bad(403, "Your role cannot delete this comment.");
      await store.deleteFeedback(s, id); return json(res, 200, { ok: true });
    }
    if (parts.length === 2 && parts[1] === "replies" && req.method === "POST") {
      const b = await readJson(req);
      return json(res, 201, { feedback: withCan(u, await store.addReply(s, id, str(b.body, LIMIT.reply, "The reply", 1)), accounts) });
    }
    throw new Bad(404, "Not found.");
  }

  /* ---------- accounts ---------- */
  async function usersRoute(req, res, s, parts) {
    const u = s.user;
    if (!managesAnyone(u)) throw new Bad(403, "Your role cannot manage accounts.");
    const all = await store.accounts(s), mine = all.filter((a) => a.id !== u.id && manages(u, a));
    if (parts.length === 0 && req.method === "GET") return json(res, 200, { users: mine, grantable: grantable(u), roles: ROLES, roleNames: ROLE_NAME, minPassword: MIN_PASSWORD });
    const password = (p) => { const s = String(p ?? ""); if (s.length < MIN_PASSWORD) throw new Bad(400, `A password needs at least ${MIN_PASSWORD} characters.`); if (s.length > 100) throw new Bad(400, "A password can have at most 100 characters."); return s; };
    const role = (r) => { if (!grantable(u).includes(r)) throw new Bad(403, `Your role cannot hand out the ${ROLE_NAME[r] ?? r} role.`); return r; };
    if (parts.length === 0 && req.method === "POST") {
      const b = await readJson(req), email = str(b.email, 255, "The email", 3);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Bad(400, "That is not an email address.");
      return json(res, 201, { user: await store.createAccount(s, { email, name: str(b.name, 100, "The name", 2), role: role(b.role ?? "tester"), password: password(b.password) }) });
    }
    const target = mine.find((a) => a.id === parts[0]);
    if (!target) throw new Bad(404, "No such account, or not one you look after.");
    if (parts.length === 1 && req.method === "PATCH") {
      const b = await readJson(req), patch = {};
      if (b.name != null) patch.name = str(b.name, 100, "The name", 2);
      if (b.role != null) patch.role = role(b.role);
      if (b.active != null) patch.active = !!b.active;
      return json(res, 200, { user: await store.updateAccount(s, target.id, patch) });
    }
    if (parts.length === 2 && parts[1] === "password" && req.method === "POST") {
      const b = await readJson(req);
      await store.setPassword(s, target.id, password(b.password));
      endSessions(target.id);
      return json(res, 200, { ok: true });
    }
    if (parts.length === 1 && req.method === "DELETE") { await store.deleteAccount(s, target.id); return json(res, 200, { ok: true }); }
    throw new Bad(404, "Not found.");
  }

  /* ---------- the router ---------- */
  // True when the request was answered here; otherwise serve.mjs serves a file to req.session.
  async function handle(req, res) {
    const url = new URL(req.url, "http://x"), path = url.pathname;
    try {
      if (path === "/healthz") { res.writeHead(200, { "Content-Type": "text/plain" }); res.end("ok\n"); return true; }
      if (path === "/sign-in" && req.method === "GET") { signInPage(res, { next: safeNext(url.searchParams.get("next")), error: url.searchParams.get("error") ?? "" }); return true; }
      if (path === "/auth/sign-in" && req.method === "POST") { await signIn(req, res); return true; }
      // The form's own address, opened directly or refreshed after a wrong password: show the form.
      if ((path === "/auth/sign-in" || path === "/auth/sign-out") && req.method === "GET") { res.writeHead(303, { Location: "/sign-in" }); res.end(); return true; }
      const s = await signedIn(req);
      if (path === "/auth/sign-out" && req.method === "POST") {
        if (s) { sessions.delete(s.id); await store.signOut(s); }
        setCookie(req, res, "", 0); res.writeHead(303, { Location: "/sign-in" }); res.end(); return true;
      }
      if (!path.startsWith("/api/")) {
        if (s) { req.session = s; return false; }
        if (/\.html?$|\/$/.test(path) && req.method === "GET") { res.writeHead(302, { Location: `/sign-in?next=${encodeURIComponent(path + url.search)}` }); res.end(); return true; }
        res.writeHead(401, { "Content-Type": "text/plain" }); res.end("Sign in to open Twist Preview.\n"); return true;
      }
      if (!s) { json(res, 401, { error: "Not signed in." }); return true; }
      if (req.method !== "GET" && req.headers["x-twist"] !== "1") { json(res, 403, { error: "Send changes from Twist Preview itself." }); return true; }
      const parts = path.slice(5).split("/").filter(Boolean).map(decodeURIComponent);
      if (parts[0] === "me" && parts.length === 1 && req.method === "GET") { json(res, 200, { user: s.user, roleName: ROLE_NAME[s.user.role], can: { ...can(s.user), manageUsers: managesAnyone(s.user) }, mode: store.mode, minPassword: MIN_PASSWORD }); return true; }
      if (parts[0] === "me" && parts[1] === "password" && req.method === "POST") {
        const b = await readJson(req), next = String(b.next ?? "");
        if (next.length < MIN_PASSWORD) throw new Bad(400, `A password needs at least ${MIN_PASSWORD} characters.`);
        await store.changeOwnPassword(s, String(b.current ?? ""), next); endSessions(s.user.id, s.id); json(res, 200, { ok: true }); return true;
      }
      if (parts[0] === "feedback") { await feedbackRoute(req, res, s, url, parts.slice(1)); return true; }
      if (parts[0] === "users") { await usersRoute(req, res, s, parts.slice(1)); return true; }
      json(res, 404, { error: "Not found." }); return true;
    } catch (e) {
      if (e instanceof Bad || e instanceof StoreError) { json(res, e.status, { error: e.message }); return true; }
      console.error(e); json(res, 500, { error: "Something went wrong on the server." }); return true;
    }
  }
  return { handle, sessions };
}
