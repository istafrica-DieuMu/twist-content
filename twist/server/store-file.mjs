// Accounts and feedback in two JSON files under TWIST_DATA, for running the
// preview without the IST-B2C backend (a laptop, or the dev server until the
// backend has the feedback endpoints: twist/docs/feedback-backend.md).
// Passwords are scrypt hashes. Writes go to a temporary file first and are
// renamed into place, one at a time, so a crash never leaves half a file.
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, chmodSync } from "node:fs";
import { join } from "node:path";
import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";
import { ROLES } from "./roles.mjs";

export function hashPassword(pw) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("base64")}$${scryptSync(pw, salt, 32).toString("base64")}`;
}
export function checkPassword(pw, stored) {
  const [kind, salt, hash] = String(stored ?? "").split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const want = Buffer.from(hash, "base64"), got = scryptSync(String(pw), Buffer.from(salt, "base64"), want.length);
  return timingSafeEqual(want, got);
}

export class StoreError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const now = () => new Date().toISOString();
// What leaves the store about an account: never the hash.
const pub = ({ hash, ...a }) => a;

export function fileStore(dir, { seedLogin, seedPassword } = {}) {
  // Password hashes: readable by this server's user only.
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  const files = { accounts: join(dir, "accounts.json"), feedback: join(dir, "feedback.json") };
  const load = (f) => existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : [];
  const db = { accounts: load(files.accounts), feedback: load(files.feedback) };
  for (const f of Object.values(files)) if (existsSync(f)) chmodSync(f, 0o600);
  const save = (k) => { const tmp = `${files[k]}.${process.pid}.tmp`; writeFileSync(tmp, JSON.stringify(db[k], null, 1), { mode: 0o600 }); renameSync(tmp, files[k]); };
  // The first admin comes from TWIST_USER and TWIST_PASS, the login the player had before accounts.
  if (!db.accounts.length && seedLogin && seedPassword) {
    db.accounts.push({ id: randomUUID(), email: seedLogin, name: seedLogin.split("@")[0], role: "admin", active: true, createdBy: null, createdAt: now(), hash: hashPassword(seedPassword) });
    save("accounts");
  }
  const account = (id) => db.accounts.find((a) => a.id === id) ?? null;
  const feedback = (id) => { const f = db.feedback.find((x) => x.id === id); if (!f) throw new StoreError(404, "No such comment."); return f; };
  const byLogin = (login) => db.accounts.find((a) => a.email.toLowerCase() === String(login).trim().toLowerCase());

  return {
    mode: "file",
    async signIn(login, password) {
      const a = byLogin(login);
      // Hash even when there is no account, so the answer takes as long either way.
      const ok = checkPassword(password, a?.hash ?? "scrypt$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");
      if (!a || !ok) return { fail: "credentials" };
      if (!a.active) return { fail: "inactive" };
      a.lastSignIn = now(); save("accounts");
      return { user: { id: a.id, email: a.email, name: a.name, role: a.role } };
    },
    // A session keeps the user it signed in as; this reads the current role and
    // whether the account is still active, so a change takes effect at once.
    async current(session) {
      const a = account(session.user.id);
      return a && a.active ? { id: a.id, email: a.email, name: a.name, role: a.role } : null;
    },
    async signOut() {},

    async accounts() { return db.accounts.map(pub); },
    async createAccount(session, { email, name, role, password }) {
      if (byLogin(email)) throw new StoreError(409, `There is already an account for ${email}.`);
      const a = { id: randomUUID(), email: email.trim(), name: name.trim(), role, active: true, createdBy: session.user.id, createdAt: now(), hash: hashPassword(password) };
      db.accounts.push(a); save("accounts");
      return pub(a);
    },
    async updateAccount(session, id, patch) {
      const a = account(id); if (!a) throw new StoreError(404, "No such account.");
      if (patch.name != null) a.name = patch.name.trim();
      if (patch.role != null && ROLES.includes(patch.role)) a.role = patch.role;
      if (patch.active != null) a.active = !!patch.active;
      a.updatedAt = now(); save("accounts");
      return pub(a);
    },
    async setPassword(session, id, password) {
      const a = account(id); if (!a) throw new StoreError(404, "No such account.");
      a.hash = hashPassword(password); a.updatedAt = now(); save("accounts");
    },
    async changeOwnPassword(session, current, next) {
      const a = account(session.user.id);
      if (!a || !checkPassword(current, a.hash)) throw new StoreError(403, "Your current password is not right.");
      a.hash = hashPassword(next); a.updatedAt = now(); save("accounts");
    },
    async deleteAccount(session, id) {
      const i = db.accounts.findIndex((a) => a.id === id); if (i < 0) throw new StoreError(404, "No such account.");
      db.accounts.splice(i, 1); save("accounts");
    },

    async listFeedback() { return db.feedback; },
    async getFeedback(session, id) { return feedback(id); },
    async createFeedback(session, input) {
      const u = session.user;
      const f = { id: randomUUID(), ...input, status: "open", author: { id: u.id, name: u.name, email: u.email }, createdAt: now(), updatedAt: now(), resolvedBy: null, resolvedAt: null, replies: [] };
      db.feedback.push(f); save("feedback");
      return f;
    },
    async updateFeedback(session, id, patch) {
      const f = feedback(id), u = session.user;
      if (patch.body != null) f.body = patch.body;
      if (patch.status === "resolved" && f.status !== "resolved") Object.assign(f, { status: "resolved", resolvedBy: { id: u.id, name: u.name }, resolvedAt: now() });
      if (patch.status === "open") Object.assign(f, { status: "open", resolvedBy: null, resolvedAt: null });
      f.updatedAt = now(); save("feedback");
      return f;
    },
    async deleteFeedback(session, id) {
      feedback(id); db.feedback = db.feedback.filter((x) => x.id !== id); save("feedback");
    },
    async addReply(session, id, body) {
      const f = feedback(id), u = session.user;
      f.replies.push({ id: randomUUID(), body, author: { id: u.id, name: u.name }, createdAt: now() });
      f.updatedAt = now(); save("feedback");
      return f;
    },
  };
}
