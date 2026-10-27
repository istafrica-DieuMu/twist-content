// Sign-in, roles, feedback and accounts in twist/server/: the file store
// behind a real HTTP server, and the backend store against a fake IST-B2C API.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer, request } from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApi, clientAddress } from "../server/api.mjs";
import { fileStore } from "../server/store-file.mjs";
import { apiStore } from "../server/store-api.mjs";

const SCREEN = { kind: "lesson", label: "Das ABC · lesson 1 · Learn screen 2", set: "de-DE.lit-de.alphabet", lesson: 1, step: 3, stepKind: "learn" };

async function start(store, opts = {}) {
  const api = createApi(store, opts);
  const server = createServer(async (req, res) => { if (!(await api.handle(req, res))) { res.writeHead(200); res.end("file"); } });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  // One person's browser: a cookie jar and the X-Twist header on changes.
  const as = async (login, password) => {
    const r = await fetch(base + "/auth/sign-in", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ login, password, next: "/pages/player/" }) });
    const cookie = r.headers.get("set-cookie")?.split(";")[0];
    const call = async (method, path, body, headers = { "X-Twist": "1" }) => {
      const res = await fetch(base + "/api/" + path, { method, headers: { Cookie: cookie ?? "", ...headers, ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
      return { status: res.status, body: await res.json() };
    };
    return { status: r.status, location: r.headers.get("location"), cookie, call };
  };
  return { base, as, close: () => server.close() };
}

test("file store: who sees, resolves and manages what", async (t) => {
  const store = fileStore(mkdtempSync(join(tmpdir(), "twist-fb-")), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  const srv = await start(store); t.after(srv.close);

  const anon = await fetch(srv.base + "/pages/player/", { redirect: "manual" });
  assert.equal(anon.status, 302);
  assert.match(anon.headers.get("location"), /^\/sign-in\?next=/);
  assert.equal((await fetch(srv.base + "/healthz")).status, 200);
  for (const p of ["/auth/sign-in", "/auth/sign-out"]) {
    const r = await fetch(srv.base + p, { redirect: "manual" });
    assert.equal(r.status, 303, `${p} opened directly`);
    assert.equal(r.headers.get("location"), "/sign-in");
  }

  const wrong = await srv.as("admin@ist.com", "nope");
  assert.equal(wrong.cookie, undefined);
  const admin = await srv.as("admin@ist.com", "admin-pass-123");
  assert.equal(admin.status, 303);
  assert.equal(admin.location, "/pages/player/");

  // Accounts: a manager, a tester the manager adds, a second tester the admin adds, a reviewer.
  const mk = async (who, email, role) => (await who.call("POST", "users", { email, name: email.split("@")[0], role, password: "long-enough-1" })).body.user;
  await mk(admin, "mia@ist.com", "manager");
  const mgr = await srv.as("mia@ist.com", "long-enough-1");
  assert.equal((await mgr.call("POST", "users", { email: "x@ist.com", name: "Xx", role: "reviewer", password: "long-enough-1" })).status, 403, "a manager hands out only tester");
  const tom = await mk(mgr, "tom@ist.com", "tester");
  const ann = await mk(admin, "ann@ist.com", "tester");
  await mk(admin, "rev@ist.com", "reviewer");
  assert.equal((await admin.call("POST", "users", { email: "short@ist.com", name: "Sh", role: "tester", password: "short" })).status, 400);

  const tomS = await srv.as("tom@ist.com", "long-enough-1"), annS = await srv.as("ann@ist.com", "long-enough-1"), rev = await srv.as("rev@ist.com", "long-enough-1");
  assert.equal((await tomS.call("GET", "me")).body.can.tools, false);
  assert.equal((await rev.call("GET", "me")).body.can.tools, true);
  const post = async (who, body) => (await who.call("POST", "feedback", { screen: SCREEN, pin: { x: 0.5, y: 0.4 }, target: { label: "Button: Weiter" }, body })).body.feedback;
  const fTom = await post(tomS, "Tom's comment"), fAnn = await post(annS, "Ann's comment");
  assert.equal(fTom.status, "open");
  assert.deepEqual(fTom.pin, { x: 0.5, y: 0.4 });

  const seen = async (who) => (await who.call("GET", "feedback?status=all")).body.feedback.map((f) => f.body).sort();
  assert.deepEqual(await seen(tomS), ["Tom's comment"], "a tester sees only their own");
  assert.deepEqual(await seen(mgr), ["Tom's comment"], "a manager sees their testers'");
  assert.deepEqual(await seen(rev), ["Ann's comment", "Tom's comment"]);
  assert.deepEqual(await seen(admin), ["Ann's comment", "Tom's comment"]);
  assert.equal((await tomS.call("GET", `feedback/${fAnn.id}`)).status, 404, "another tester's comment does not exist for Tom");

  assert.equal((await tomS.call("PATCH", `feedback/${fTom.id}`, { status: "resolved" })).status, 403, "a tester cannot resolve");
  assert.equal((await mgr.call("PATCH", `feedback/${fAnn.id}`, { status: "resolved" })).status, 404, "nor can a manager outside their team");
  const res = await mgr.call("PATCH", `feedback/${fTom.id}`, { status: "resolved" });
  assert.equal(res.body.feedback.status, "resolved");
  assert.equal(res.body.feedback.resolvedBy.name, "mia");
  assert.equal((await rev.call("PATCH", `feedback/${fAnn.id}`, { status: "resolved" })).body.feedback.status, "resolved");
  assert.deepEqual((await rev.call("GET", "feedback?status=open")).body.feedback, []);
  assert.equal((await tomS.call("PATCH", `feedback/${fTom.id}`, { body: "edited" })).status, 403, "a resolved comment is closed to edits");

  const replied = (await rev.call("POST", `feedback/${fTom.id}/replies`, { body: "Fixed in the next build." })).body.feedback;
  assert.equal(replied.replies.length, 1);
  assert.equal((await tomS.call("GET", `feedback/${fTom.id}`)).body.feedback.replies[0].body, "Fixed in the next build.");

  // Changes need the header; reading does not.
  assert.equal((await tomS.call("POST", "feedback", { screen: SCREEN, pin: { x: 0, y: 0 }, body: "x" }, {})).status, 403);
  assert.equal((await tomS.call("POST", "feedback", { screen: { kind: "nope", label: "x" }, pin: { x: 0, y: 0 }, body: "x" })).status, 400);
  assert.equal((await tomS.call("POST", "feedback", { screen: SCREEN, pin: { x: 2, y: 0 }, body: "x" })).status, 400);
  // An area: kept as a box, its pin at the top-left corner; one that leaves the screen is refused.
  const area = (await tomS.call("POST", "feedback", { screen: SCREEN, area: { x: 0.1, y: 0.2, w: 0.5, h: 0.3 }, body: "These two cards" })).body.feedback;
  assert.deepEqual(area.area, { x: 0.1, y: 0.2, w: 0.5, h: 0.3 });
  assert.deepEqual(area.pin, { x: 0.1, y: 0.2 });
  assert.equal((await tomS.call("POST", "feedback", { screen: SCREEN, area: { x: 0.8, y: 0.2, w: 0.5, h: 0.3 }, body: "x" })).status, 400);
  assert.equal((await tomS.call("POST", "feedback", { screen: SCREEN, area: { x: 0.1, y: 0.2, w: 0, h: 0.3 }, body: "x" })).status, 400);
  // An anchor: the part the pin was dropped on, kept in the screen; only a tag:nth-of-type chain is taken as its place.
  const anchor = { path: "div:nth-of-type(1)>section:nth-of-type(2)>button:nth-of-type(1)", text: "Review: Animals and nature", x: 0.25, y: 0.5 };
  const pinned = (await tomS.call("POST", "feedback", { screen: { ...SCREEN, anchor }, pin: { x: 0.3, y: 0.6 }, body: "This card" })).body.feedback;
  assert.deepEqual(pinned.screen.anchor, anchor);
  assert.equal((await tomS.call("POST", "feedback", { screen: { ...SCREEN, anchor: { ...anchor, path: "img[src=x]" } }, pin: { x: 0.3, y: 0.6 }, body: "x" })).status, 400);
  assert.equal((await tomS.call("POST", "feedback", { screen: { ...SCREEN, anchor: { ...anchor, x: 1.5 } }, pin: { x: 0.3, y: 0.6 }, body: "x" })).status, 400);
  // A lesson step that is not a task keeps its place in its activity.
  const placed = (await tomS.call("POST", "feedback", { screen: { ...SCREEN, stepKind: "learn", place: "learn2" }, pin: { x: 0.3, y: 0.6 }, body: "This screen" })).body.feedback;
  assert.equal(placed.screen.place, "learn2");
  // Pinned anew where it belongs: by its author or a reviewer; the anchor, spot and target change together.
  const moved = { screen: { ...SCREEN, stepKind: "learn", place: "learn2", anchor: { ...anchor, text: "Weiter" } }, pin: { x: 0.7, y: 0.2 }, target: { label: "Button: Weiter" } };
  const repinned = (await tomS.call("PATCH", `feedback/${placed.id}`, moved)).body.feedback;
  assert.deepEqual([repinned.pin, repinned.screen.anchor.text, repinned.target.label, repinned.body, repinned.can.move], [{ x: 0.7, y: 0.2 }, "Weiter", "Button: Weiter", "This screen", true]);
  assert.equal((await rev.call("PATCH", `feedback/${placed.id}`, { ...moved, pin: { x: 0.1, y: 0.1 } })).body.feedback.pin.x, 0.1, "a reviewer can pin it anew");
  assert.equal((await tomS.call("PATCH", `feedback/${placed.id}`, { ...moved, pin: { x: 2, y: 0 } })).status, 400);

  // Accounts: a manager resets their tester's password and switches them off; not Ann.
  assert.deepEqual((await mgr.call("GET", "users")).body.users.map((u) => u.email), ["tom@ist.com"]);
  assert.equal((await mgr.call("POST", `users/${ann.id}/password`, { password: "another-pass-1" })).status, 404);
  assert.equal((await mgr.call("POST", `users/${tom.id}/password`, { password: "another-pass-1" })).status, 200);
  assert.equal((await tomS.call("GET", "me")).status, 401, "a reset signs the person out");
  assert.equal((await srv.as("tom@ist.com", "long-enough-1")).cookie, undefined);
  const tom2 = await srv.as("tom@ist.com", "another-pass-1");
  assert.ok(tom2.cookie);
  assert.equal((await tom2.call("GET", "users")).status, 403, "a tester manages nobody");
  await mgr.call("PATCH", `users/${tom.id}`, { active: false });
  assert.equal((await tom2.call("GET", "me")).status, 401, "switching an account off ends its sessions");

  // Own password.
  assert.equal((await annS.call("POST", "me/password", { current: "wrong", next: "brand-new-pass" })).status, 403);
  const annOther = await srv.as("ann@ist.com", "long-enough-1");
  assert.equal((await annS.call("POST", "me/password", { current: "long-enough-1", next: "brand-new-pass" })).status, 200);
  assert.equal((await annS.call("GET", "me")).status, 200, "the session that changed it stays");
  assert.equal((await annOther.call("GET", "me")).status, 401, "her other sessions end");
  assert.ok((await srv.as("ann@ist.com", "brand-new-pass")).cookie);

  // Sign-out ends the session.
  await fetch(srv.base + "/auth/sign-out", { method: "POST", redirect: "manual", headers: { Cookie: admin.cookie } });
  assert.equal((await admin.call("GET", "me")).status, 401);
});

test("sign-in only sends people to a path on this site", async (t) => {
  const store = fileStore(mkdtempSync(join(tmpdir(), "twist-fb-")), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  const srv = await start(store); t.after(srv.close);
  const to = async (next) => (await fetch(srv.base + "/auth/sign-in", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ login: "admin@ist.com", password: "admin-pass-123", next }) })).headers.get("location");
  for (const bad of ["//evil.org", "/\\evil.org", "/\t/evil.org", "/\n/evil.org", "https://evil.org", "evil.org"]) assert.equal(await to(bad), "/pages/player/", bad);
  // Whatever comes back resolves on this site.
  for (const odd of ["/%2F/evil.org/..//evil.org", "/.//evil.org", "/a/../../evil.org"]) assert.equal(new URL(await to(odd), srv.base).origin, srv.base, odd);
  assert.equal(await to("/pages/player/#fb=abc"), "/pages/player/#fb=abc");
  assert.equal(await to("/pages/types/?x=1"), "/pages/types/?x=1");
});

test("the file store keeps its files to itself", () => {
  const dir = mkdtempSync(join(tmpdir(), "twist-fb-"));
  fileStore(join(dir, "data"), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  assert.equal(statSync(join(dir, "data")).mode & 0o777, 0o700);
  assert.equal(statSync(join(dir, "data", "accounts.json")).mode & 0o777, 0o600);
});

test("sign-in is throttled after ten wrong passwords", async (t) => {
  const store = fileStore(mkdtempSync(join(tmpdir(), "twist-fb-")), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  const srv = await start(store); t.after(srv.close);
  // Sent all at once from one address: each is counted before its password is checked.
  await Promise.all(Array.from({ length: 30 }, () => srv.as("nobody@ist.com", "wrong")));
  assert.equal((await srv.as("admin@ist.com", "admin-pass-123")).cookie, undefined, "the address is shut for a while");
});

test("wrong passwords from elsewhere slow an account down but never lock its owner out", async (t) => {
  const store = fileStore(mkdtempSync(join(tmpdir(), "twist-fb-")), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  const srv = await start(store, { trustProxy: true }); t.after(srv.close);
  const from = (ip, password) => fetch(srv.base + "/auth/sign-in", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Forwarded-For": ip }, body: new URLSearchParams({ login: "admin@ist.com", password }) });
  // Ten wrong tries, each from its own address: none of the addresses is shut, the account is now watched.
  for (let i = 0; i < 10; i++) await from(`10.0.0.${i}`, "wrong");
  // Three more sent at once wait their turn: a second, then two more, so they cannot be checked side by side.
  const t0 = Date.now();
  await Promise.all([11, 12, 13].map((i) => from(`10.0.0.${i}`, "wrong")));
  assert.ok(Date.now() - t0 >= 2900, `three at once took ${Date.now() - t0} ms`);
  const ok = await from("10.0.1.1", "admin-pass-123");
  assert.equal(ok.status, 303, "the owner still gets in");
  assert.ok(ok.headers.get("set-cookie"));
});

test("a full address table shares counters, and every account keeps a counter of its own", async (t) => {
  const store = fileStore(mkdtempSync(join(tmpdir(), "twist-fb-")), { seedLogin: "admin@ist.com", seedPassword: "admin-pass-123" });
  const srv = await start(store, { trustProxy: true, maxKeys: 2 }); t.after(srv.close);
  const from = (ip, login, password) => fetch(srv.base + "/auth/sign-in", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Forwarded-For": ip }, body: new URLSearchParams({ login, password }) });
  // Two addresses and two logins fill both tables.
  await from("10.0.0.1", "a@x.org", "wrong"); await from("10.0.0.2", "b@x.org", "wrong");
  // A new address still signs in: it counts under 10.9's counter.
  assert.equal((await from("10.9.0.1", "admin@ist.com", "admin-pass-123")).status, 303);
  // A new account is counted on its own counter however many logins came before, so it is queued after ten.
  // (From the two addresses already in the table, five each, so the address limit is not what stops them.)
  for (let i = 0; i < 10; i++) await from(`10.0.0.${1 + (i % 2)}`, "victim@x.org", "wrong");
  const t0 = Date.now();
  await Promise.all([1, 2].map((i) => from(`10.0.0.${i}`, "victim@x.org", "wrong")));
  assert.ok(Date.now() - t0 >= 900, "the shared counter queues them");
});

test("the client's address: the proxy's header only when trusted, IPv6 per /64", () => {
  const req = (remote, xff) => ({ socket: { remoteAddress: remote }, headers: xff ? { "x-forwarded-for": xff } : {} });
  assert.equal(clientAddress(req("127.0.0.1", "6.6.6.6, 1.2.3.4"), false), "127.0.0.1", "a client cannot pick its address");
  assert.equal(clientAddress(req("127.0.0.1", "6.6.6.6, 1.2.3.4"), true), "1.2.3.4", "the proxy's entry is the last");
  assert.equal(clientAddress(req("::ffff:10.1.2.3"), false), "10.1.2.3");
  assert.equal(clientAddress(req("2001:db8:aa:bb:1:2:3:4"), false), "2001:db8:aa:bb::/64");
  assert.equal(clientAddress(req("2001:db8:aa:bb::9"), false), "2001:db8:aa:bb::/64");
  assert.equal(clientAddress(req("2001:db8::1"), false), "2001:db8:0:0::/64");
});

test("backend store: tokens, roles and the feedback contract", async (t) => {
  const calls = [];
  const fake = createServer(async (req, res) => {
    let body = ""; for await (const c of req) body += c;
    calls.push({ method: req.method, url: req.url, auth: req.headers.authorization, body: body && JSON.parse(body) });
    const send = (status, data) => { res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify({ success: status < 400, data, error: status >= 400 ? "no" : undefined })); };
    const b = body && JSON.parse(body);
    if (req.url === "/api/v1/admin/auth/login") return b.password === "pw-123456789" ? send(200, { accessToken: "A1", refreshToken: "R1", expiresIn: 1, adminUserId: 7, email: b.email, fullName: "Rita", role: b.email.startsWith("old") ? "CONTENT_REVIEW_LEAD" : b.email.startsWith("mk") ? "MARKETING_MANAGER" : "TWIST_REVIEWER" }) : send(401);
    if (req.url === "/api/v1/admin/auth/refresh") return send(200, { accessToken: "A2", refreshToken: "R2", expiresIn: 3600 });
    if (req.url.startsWith("/api/v1/admin/twist/feedback") && req.method === "GET") return send(200, { content: [{ id: 3, status: "OPEN", screen: SCREEN, pin: { x: 0.1, y: 0.2 }, body: "hi", author: { id: 9, name: "Tom" }, replies: [], createdAt: "2026-10-23T08:00:00Z" }], last: true });
    if (req.url === "/api/v1/admin/twist/feedback/3" && req.method === "PATCH") return send(200, { id: 3, status: b.status, screen: SCREEN, pin: { x: 0.1, y: 0.2 }, body: "hi", author: { id: 9, name: "Tom" }, resolvedBy: { id: 7, name: "Rita" }, replies: [] });
    send(404);
  });
  await new Promise((r) => fake.listen(0, "127.0.0.1", r)); t.after(() => fake.close());
  const store = apiStore(`http://127.0.0.1:${fake.address().port}`);

  assert.deepEqual(await store.signIn("rita@ist.com", "bad"), { fail: "credentials" });
  assert.equal((await store.signIn("mk@ist.com", "pw-123456789")).fail, "role");
  assert.equal((await store.signIn("old@ist.com", "pw-123456789")).user.role, "reviewer", "the old review lead reads as reviewer");
  const r = await store.signIn("rita@ist.com", "pw-123456789");
  assert.deepEqual(r.user, { id: "7", email: "rita@ist.com", name: "Rita", role: "reviewer" });

  // expiresIn of 1 s is inside the refresh margin: the first call refreshes, then uses the new token.
  const session = { user: r.user, tokens: r.tokens };
  const list = await store.listFeedback(session);
  assert.equal(list[0].id, "3");
  assert.equal(list[0].status, "open");
  assert.equal(list[0].author.id, "9");
  assert.equal(calls.at(-1).auth, "Bearer A2");
  assert.equal(session.tokens.refreshToken, "R2");

  const patched = await store.updateFeedback(session, "3", { status: "resolved" });
  assert.equal(calls.at(-1).body.status, "RESOLVED");
  assert.equal(patched.status, "resolved");

  const srv = await start(store); t.after(srv.close);
  const rita = await srv.as("rita@ist.com", "pw-123456789");
  assert.equal((await rita.call("GET", "feedback")).body.feedback[0].can.resolve, true);
  // The address may carry /api/v1, as the dashboard writes it.
  for (const suffix of ["/api/v1", "/api/v1/", "/api"]) {
    assert.equal((await apiStore(`http://127.0.0.1:${fake.address().port}${suffix}`).signIn("rita@ist.com", "pw-123456789")).user.role, "reviewer", suffix);
  }
  const unreachable = apiStore("http://127.0.0.1:9");
  assert.equal((await unreachable.signIn("a@b.c", "x")).fail, "unreachable");
});

test("serve.mjs keeps Drawings and Task types from testers, however the address is written", async (t) => {
  const port = 20000 + Math.floor(Math.random() * 20000), base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [fileURLToPath(new URL("../serve.mjs", import.meta.url))], { env: { ...process.env, PORT: String(port), TWIST_DATA: mkdtempSync(join(tmpdir(), "twist-fb-")), TWIST_USER: "admin@ist.com", TWIST_PASS: "admin-pass-123", TWIST_API_URL: "" }, stdio: "pipe" });
  t.after(() => child.kill());
  await new Promise((r) => child.stdout.on("data", (d) => String(d).includes("Twist player on") && r()));
  const cookieOf = async (login, password) => (await fetch(base + "/auth/sign-in", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ login, password }) })).headers.get("set-cookie").split(";")[0];
  const admin = await cookieOf("admin@ist.com", "admin-pass-123");
  await fetch(base + "/api/users", { method: "POST", headers: { Cookie: admin, "X-Twist": "1", "Content-Type": "application/json" }, body: JSON.stringify({ email: "t@ist.com", name: "Tess", role: "tester", password: "long-enough-1" }) });
  const tester = await cookieOf("t@ist.com", "long-enough-1");
  // The request line exactly as written: fetch would drop a "#" and resolve "..", a client need not.
  const raw = (path, cookie) => new Promise((ok, bad) => { const r = request({ host: "127.0.0.1", port, path, headers: { Cookie: cookie } }, (res) => { res.resume(); ok(res.statusCode); }); r.on("error", bad); r.end(); });
  const sneaky = ["/pages/types/", "/pages/types/index.html", "/pages/drawings/index.html", "/pages/%74ypes/", "/pages/./types/index.html", "/pages//drawings/", "/pages/player/../types/", "/pages/x#/../types/index.html", "/pages/x%23/../types/index.html", "/pages/types"];
  for (const p of sneaky) assert.notEqual(await raw(p, tester), 200, p);
  assert.equal(await raw("/pages/types/index.html", tester), 403);
  assert.equal(await raw("/pages/player/", tester), 200, "the app itself is open to testers");
  assert.equal(await raw("/pages/types/index.html", admin), 200);
  assert.equal(await raw("/pages/x#/../types/index.html", admin), 200, "the same address reaches the page for the team");
});

