// Accounts and feedback on the IST-B2C backend (TWIST_API_URL), the API the
// content review app in schoolido-learning signed in against. Sign-in,
// refresh, sign-out and the account list exist today; the feedback
// endpoints, the Twist roles, password resets and manager access are the
// changes asked for in twist/docs/feedback-backend.md. Every call carries the
// signed-in person's own token, so the backend checks each permission again.
import { StoreError } from "./store-file.mjs";

// The backend's AdminRole for each Twist role, and the older review roles read as the nearest Twist role.
export const ROLE_TO_WIRE = { tester: "TWIST_TESTER", manager: "TWIST_MANAGER", reviewer: "TWIST_REVIEWER", admin: "SUPER_ADMIN" };
const ROLE_FROM_WIRE = { TWIST_TESTER: "tester", TWIST_MANAGER: "manager", TWIST_REVIEWER: "reviewer", SUPER_ADMIN: "admin", CONTENT_VIEWER: "tester", CONTENT_REVIEWER: "tester", CONTENT_REVIEW_LEAD: "reviewer" };
export const fromWireRole = (r) => ROLE_FROM_WIRE[r] ?? null;
const REFRESH_SKEW_MS = 60_000;

const accountFrom = (r) => ({ id: String(r.id), email: r.email ?? "", name: r.fullName || (r.email ?? "").split("@")[0], role: fromWireRole(r.role), active: r.isActive !== false, createdBy: r.createdBy != null ? String(r.createdBy) : null, createdAt: r.createdAt ?? null, lastSignIn: r.lastLoginAt ?? null });
// Feedback comes back in the same shape the file store keeps, ids as strings.
const feedbackFrom = (f) => ({ ...f, id: String(f.id), status: String(f.status ?? "OPEN").toLowerCase(), author: f.author && { ...f.author, id: String(f.author.id) }, resolvedBy: f.resolvedBy && { ...f.resolvedBy, id: String(f.resolvedBy.id) }, replies: (f.replies ?? []).map((r) => ({ ...r, id: String(r.id), author: r.author && { ...r.author, id: String(r.author.id) } })) });

export function apiStore(baseUrl, { fetch: f = fetch } = {}) {
  const root = baseUrl.replace(/\/+$/, "");

  async function send(method, path, { token, body } = {}) {
    let res;
    try {
      res = await f(root + path, { method, headers: { Accept: "application/json", ...(body !== undefined ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body !== undefined ? JSON.stringify(body) : undefined });
    } catch (e) { throw new StoreError(502, `Cannot reach the backend at ${root}.`); }
    let json = null;
    try { json = await res.json(); } catch {}
    if (!res.ok) throw new StoreError(res.status === 401 ? 401 : res.status === 403 ? 403 : res.status === 404 ? 404 : res.status === 409 ? 409 : res.status >= 500 ? 502 : 400, json?.error || json?.message || `The backend answered ${res.status}.`);
    return json?.data;
  }
  const tokens = (d, now = Date.now()) => ({ accessToken: d.accessToken, refreshToken: d.refreshToken, accessExp: now + (Number(d.expiresIn) > 0 ? Number(d.expiresIn) * 1000 : 3600_000) });

  // A call as the signed-in person, refreshing their token first when it is about to run out.
  async function as(session, method, path, body) {
    const t = session.tokens;
    if (t.accessExp - REFRESH_SKEW_MS <= Date.now()) {
      const d = await send("POST", "/api/v1/admin/auth/refresh", { body: { refreshToken: t.refreshToken } }).catch((e) => { throw e.status === 502 ? e : new StoreError(401, "Your session ended. Sign in again."); });
      session.tokens = tokens(d);
    }
    return send(method, path, { token: session.tokens.accessToken, body });
  }

  return {
    mode: "backend",
    async signIn(email, password) {
      let d;
      try { d = await send("POST", "/api/v1/admin/auth/login", { body: { email, password } }); }
      catch (e) { return { fail: e.status === 502 ? "unreachable" : e.status === 400 || e.status === 401 || e.status === 403 ? "credentials" : "unreachable" }; }
      const role = fromWireRole(d?.role);
      if (!d?.accessToken) return { fail: "credentials" };
      if (!role) return { fail: "role", backendRole: d.role };
      return { user: { id: String(d.adminUserId), email: d.email ?? email, name: d.fullName || (d.email ?? email).split("@")[0], role }, tokens: tokens(d) };
    },
    // The backend checks the role on every call; the session keeps the one from sign-in.
    async current(session) { return session.user; },
    async signOut(session) { await as(session, "POST", "/api/v1/admin/auth/logout").catch(() => {}); },

    // Admins read every account; a manager reads the accounts they added (feedback-backend.md, "Managers").
    async accounts(session) {
      const out = [];
      for (let page = 0; page < 50; page++) {
        const d = await as(session, "GET", `/api/v1/admin/settings/admins?page=${page}&size=100&sort=fullName,asc`);
        for (const r of d?.content ?? []) { const a = accountFrom(r); if (a.role) out.push(a); }
        if (d?.last !== false || !d?.content?.length) break;
      }
      return out;
    },
    async createAccount(session, { email, name, role, password }) {
      return accountFrom(await as(session, "POST", "/api/v1/admin/settings/admins", { email: email.trim(), fullName: name.trim(), password, role: ROLE_TO_WIRE[role] }));
    },
    async updateAccount(session, id, patch) {
      if (patch.role != null) await as(session, "PATCH", `/api/v1/admin/settings/admins/${encodeURIComponent(id)}/role?role=${ROLE_TO_WIRE[patch.role]}`);
      const body = {};
      if (patch.name != null) body.fullName = patch.name.trim();
      if (patch.active != null) body.isActive = !!patch.active;
      if (Object.keys(body).length) await as(session, "PATCH", `/api/v1/admin/settings/admins/${encodeURIComponent(id)}`, body);
      return accountFrom(await as(session, "GET", `/api/v1/admin/settings/admins/${encodeURIComponent(id)}`));
    },
    async setPassword(session, id, password) { await as(session, "POST", `/api/v1/admin/settings/admins/${encodeURIComponent(id)}/password`, { password }); },
    async changeOwnPassword(session, current, next) { await as(session, "POST", "/api/v1/admin/auth/password", { currentPassword: current, newPassword: next }); },
    async deleteAccount(session, id) { await as(session, "DELETE", `/api/v1/admin/settings/admins/${encodeURIComponent(id)}`); },

    // The backend returns only what this person may see; the server filters again with the same rules.
    async listFeedback(session) {
      const out = [];
      for (let page = 0; page < 50; page++) {
        const d = await as(session, "GET", `/api/v1/admin/twist/feedback?page=${page}&size=200`);
        out.push(...(d?.content ?? []).map(feedbackFrom));
        if (d?.last !== false || !d?.content?.length) break;
      }
      return out;
    },
    async getFeedback(session, id) { return feedbackFrom(await as(session, "GET", `/api/v1/admin/twist/feedback/${encodeURIComponent(id)}`)); },
    async createFeedback(session, input) { return feedbackFrom(await as(session, "POST", "/api/v1/admin/twist/feedback", input)); },
    async updateFeedback(session, id, patch) {
      const body = { ...patch, ...(patch.status ? { status: patch.status.toUpperCase() } : {}) };
      return feedbackFrom(await as(session, "PATCH", `/api/v1/admin/twist/feedback/${encodeURIComponent(id)}`, body));
    },
    async deleteFeedback(session, id) { await as(session, "DELETE", `/api/v1/admin/twist/feedback/${encodeURIComponent(id)}`); },
    async addReply(session, id, body) { return feedbackFrom(await as(session, "POST", `/api/v1/admin/twist/feedback/${encodeURIComponent(id)}/replies`, { body })); },
  };
}
