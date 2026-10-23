// Sign-in, roles, feedback and accounts in twist/server/: the file store
// behind a real HTTP server, and the backend store against a fake IST-B2C API.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApi } from "../server/api.mjs";
import { fileStore } from "../server/store-file.mjs";
import { apiStore } from "../server/store-api.mjs";

const SCREEN = { kind: "lesson", label: "Das ABC · lesson 1 · Learn screen 2", set: "de-DE.lit-de.alphabet", lesson: 1, step: 3, stepKind: "learn" };

async function start(store) {
  const api = createApi(store);
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

  // Accounts: a manager resets their tester's password and switches them off; not Ann.
  assert.deepEqual((await mgr.call("GET", "users")).body.users.map((u) => u.email), ["tom@ist.com"]);
  assert.equal((await mgr.call("POST", `users/${ann.id}/password`, { password: "another-pass-1" })).status, 404);
  assert.equal((await mgr.call("POST", `users/${tom.id}/password`, { password: "another-pass-1" })).status, 200);
  assert.equal((await srv.as("tom@ist.com", "long-enough-1")).cookie, undefined);
  const tom2 = await srv.as("tom@ist.com", "another-pass-1");
  assert.ok(tom2.cookie);
  assert.equal((await tomS.call("GET", "users")).status, 403, "a tester manages nobody");
  await mgr.call("PATCH", `users/${tom.id}`, { active: false });
  assert.equal((await tom2.call("GET", "me")).status, 401, "switching an account off ends its sessions");

  // Own password.
  assert.equal((await annS.call("POST", "me/password", { current: "wrong", next: "brand-new-pass" })).status, 403);
  assert.equal((await annS.call("POST", "me/password", { current: "long-enough-1", next: "brand-new-pass" })).status, 200);
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
  for (let i = 0; i < 10; i++) await srv.as("admin@ist.com", "wrong");
  assert.equal((await srv.as("admin@ist.com", "admin-pass-123")).cookie, undefined);
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
  const unreachable = apiStore("http://127.0.0.1:9");
  assert.equal((await unreachable.signIn("a@b.c", "x")).fail, "unreachable");
});
