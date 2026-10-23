# Twist Preview feedback: what we need from the backend

For the IST-B2C backend team. Twist Preview (the web player of the Twist app,
new.dev.twist-learning.com) now has its own sign-in, user roles and feedback
pinned to app screens. It signs in against the same admin API the old content
review app used. This page lists the changes the backend needs so that
accounts and feedback can live in the backend database instead of a JSON file
on the preview server.

Until these changes ship, the preview keeps accounts and feedback in two JSON
files on its own server. Nothing breaks in the meantime. When the endpoints
below exist, we set `TWIST_API_URL` on the preview server and it switches over.

## How the preview talks to the backend

The browser never talks to the backend. The preview server (`twist/serve.mjs`,
Node) signs in for the person, keeps their access and refresh tokens in its
own memory, and calls the backend with `Authorization: Bearer <access token>`
on their behalf. So:

- No CORS changes are needed. All calls are server to server.
- Every call carries the signed-in person's own token. The backend must check
  the permission on every call; the preview checks too, but the backend is the
  authority.
- Responses use the usual `ApiRes` envelope (`{ success, data, error }`).

## What already works, no change needed

| Endpoint | Used for |
|---|---|
| `POST /api/v1/admin/auth/login` | Sign-in with email and password |
| `POST /api/v1/admin/auth/refresh` | Renewing the access token |
| `POST /api/v1/admin/auth/logout` | Sign-out |
| `GET /api/v1/admin/settings/admins` (paged) | The Users screen for admins |
| `GET /api/v1/admin/settings/admins/{id}` | Reading one account |
| `POST /api/v1/admin/settings/admins` | Adding an account |
| `PATCH /api/v1/admin/settings/admins/{id}/role?role=` | Changing a role |
| `PATCH /api/v1/admin/settings/admins/{id}` | Renaming, switching an account off (`isActive`) |
| `DELETE /api/v1/admin/settings/admins/{id}` | Removing an account |

## The changes, in the order we would ship them

### 1. Delete the old content review data

The old review app in schoolido-learning is retired. Please delete all rows in
these tables (the Review module, `com.ist.b2c.Review`), on dev, staging and
production:

| Table | What it held |
|---|---|
| `entity_review_screen` | Screens known to the review app |
| `entity_review_screen_verdict` | Verdicts on whole screens |
| `entity_review_asset_verdict` | Verdicts on pictures and audio |
| `entity_review_decision` | Leads' decisions where reviewers disagreed |
| `entity_review_prompt_override` | Proposed prompt edits |
| `entity_review_setting` | Review settings |
| `entity_regen_job` | Regeneration jobs |
| `entity_regen_candidate` | Regenerated candidates |
| `entity_regen_worker` | Regeneration workers |
| `entity_worker_credential` | Worker credentials |

Two questions for you to answer before deleting:

- **The tables themselves.** Delete the rows only, or drop the tables and the
  Review module's code too? We no longer call any `/api/v1/admin/review/*`
  endpoint, so dropping is fine from our side.
- **The reviewers' accounts.** Accounts with the roles `CONTENT_VIEWER`,
  `CONTENT_REVIEWER` and `CONTENT_REVIEW_LEAD` are not review data. Keep them;
  change 2 moves them onto the new roles.

### 2. Four Twist roles

Add three values to `AdminRole`. Admin stays `SUPER_ADMIN`.

| Role | Who | Can |
|---|---|---|
| `TWIST_TESTER` | Teachers, parents, anyone trying the app | Use the app and the Parents view (not the team's Drawings and Task types pages), leave feedback, see and edit only their own feedback |
| `TWIST_MANAGER` | Someone who brings in testers | Everything a tester can, plus add testers, set and reset their passwords, switch them off, see and resolve their testers' feedback |
| `TWIST_REVIEWER` | The content team | Use the preview, see every comment, reply, resolve and reopen, delete any comment |
| `SUPER_ADMIN` | Product owners | Everything, including every account and every role |

Please move the existing accounts across in the same migration:
`CONTENT_VIEWER` and `CONTENT_REVIEWER` to `TWIST_TESTER`,
`CONTENT_REVIEW_LEAD` to `TWIST_REVIEWER`. Until that happens the preview
reads those old roles that way itself, so nobody is locked out.
`CONTENT_MANAGER` and `MARKETING_MANAGER` get no access to the preview.

### 3. Managers look after their own testers

Today every `/api/v1/admin/settings/admins` endpoint is `SUPER_ADMIN` only.
A manager needs a narrow slice of it:

- `GET /admins`: a manager gets only the accounts they created
  (`createdBy` = their id). Admins still get everyone.
- `POST /admins`: a manager may create accounts with role `TWIST_TESTER`
  only. Anything else is a 403.
- `PATCH /admins/{id}`, `POST /admins/{id}/password` (change 4),
  `DELETE /admins/{id}`: a manager only on accounts they created.
- `PATCH /admins/{id}/role`: admins only.
- Add `createdBy` to `DtoResAdminUser`. The entity already stores it as a
  string; return it as the creator's id. The preview uses it to know whose
  feedback a manager may see.

Nobody may change their own role or switch their own account off.

### 4. Passwords

Two endpoints, neither exists today:

**Set someone's password** (admin, or a manager for their own testers):

```
POST /api/v1/admin/settings/admins/{id}/password
{ "password": "new-password" }
→ 200 { "success": true }
```

At least 10 characters, at most 100. Please end that person's refresh tokens,
so a reset also signs them out everywhere. Record it in the audit log
(`ADMIN_PASSWORD_RESET`).

**Change your own password** (anyone signed in):

```
POST /api/v1/admin/auth/password
{ "currentPassword": "…", "newPassword": "…" }
→ 200, or 403 when currentPassword is wrong
```

### 5. Feedback

One table for comments, one for replies.

**`entity_twist_feedback`**

| Column | Type | Notes |
|---|---|---|
| `id` | bigint, PK | |
| `author_id` | bigint, FK to admin user | Who left it |
| `status` | `OPEN` or `RESOLVED` | New comments are `OPEN` |
| `body` | text, up to 4000 characters | What they wrote |
| `screen` | jsonb | Which screen, see below |
| `pin_x`, `pin_y` | numeric, 0 to 1 | Where on the screen, as a fraction of its width and height |
| `area_x`, `area_y`, `area_w`, `area_h` | numeric, 0 to 1, nullable | A selected box instead of a point, in the same fractions; the pin is then its top-left corner |
| `target_label` | varchar(200), nullable | The part under the pin in words, like `Option card: sieben` |
| `resolved_by_id` | bigint, nullable | |
| `resolved_at` | timestamp, nullable | |
| `created_at`, `updated_at` | timestamp | |

Index on `status`, `author_id`, `created_at`.

**`entity_twist_feedback_reply`**: `id`, `feedback_id` (FK, cascade delete),
`author_id`, `body` (up to 2000), `created_at`.

The backend does not need to understand `screen`; store it as it comes and
return it unchanged. The preview validates it. It looks like this:

```json
{
  "kind": "lesson",
  "label": "Das ABC · lesson 1 · Learn screen 2",
  "set": "de-DE.lit-de.alphabet",
  "setTitle": "Das ABC",
  "curriculum": "de-DE",
  "language": "de",
  "lesson": 1,
  "step": 3,
  "stepKind": "learn",
  "task": null,
  "taskType": null,
  "build": "2026-10-23"
}
```

`kind` is `lesson`, `app` (a tab: Start, Practice, Me, Settings), `study` or
`parents`. Please cap `screen` at 2 KB.

A comment points at a spot or at a box. For a box, `area` holds its left,
top, width and height as fractions of the screen; it must stay inside the
screen (`x + w` and `y + h` at most 1), and `w` and `h` at least 0.005. For a
spot, `area` is null.

**Endpoints**, all under `/api/v1/admin/twist/feedback`:

| Method and path | Body | Answer |
|---|---|---|
| `GET /?page=0&size=200` | | A page of comments this person may see, newest first, with their replies |
| `GET /{id}` | | One comment, or 404 if they may not see it |
| `POST /` | `{ screen, pin: { x, y }, area: { x, y, w, h } or null, target: { label } or null, body }` | The new comment |
| `PATCH /{id}` | `{ body }` or `{ status: "OPEN" or "RESOLVED" }` | The changed comment |
| `DELETE /{id}` | | 200 |
| `POST /{id}/replies` | `{ body }` | The whole comment, with the new reply |

A comment in every answer looks like this:

```json
{
  "id": 42,
  "status": "OPEN",
  "body": "The picture on this card is cut off at the bottom.",
  "screen": { "kind": "lesson", "label": "…", "set": "…", "lesson": 1, "step": 3 },
  "pin": { "x": 0.5, "y": 0.55 },
  "area": null,
  "target": { "label": "Option card: sieben" },
  "author": { "id": 9, "name": "Tess Tester", "email": "tess@example.com" },
  "resolvedBy": null,
  "resolvedAt": null,
  "createdAt": "2026-10-23T08:29:43Z",
  "updatedAt": "2026-10-23T08:29:43Z",
  "replies": [
    { "id": 3, "body": "Fixed in the next build.", "author": { "id": 7, "name": "Rita" }, "createdAt": "…" }
  ]
}
```

**Who may do what with a comment:**

| | Tester | Manager | Reviewer | Admin |
|---|---|---|---|---|
| Leave a comment | yes | yes | yes | yes |
| See it | own only | own and their testers' | all | all |
| Reply | where they can see it | where they can see it | all | all |
| Edit the text | own, while open | own, while open | own, while open | own, while open |
| Resolve or reopen | no | their testers' and own | all | all |
| Delete | own, while open | own, while open | all | all |

A comment someone may not see answers 404, not 403, so ids do not leak.

### 6. Please check: does `PATCH /admins/{id}` save?

`ControllerAdminUser.updateAdminUser` sets `fullName`, `role` and `isActive`
on the entity but never calls the repository's `save`, and the method is not
`@Transactional`. If that is right, renaming someone or switching them off
does nothing. The preview uses this endpoint for the "Can sign in" switch, so
please confirm it persists, and that a switched-off account cannot sign in or
refresh.

## How we test it together

1. Ship changes 2 to 5 on dev.
2. We start the preview against dev with `TWIST_API_URL` and walk through the
   roles: a tester sees only their own comments, a manager adds a tester and
   resets their password, a reviewer resolves a comment.
3. The preview's tests already run its backend client against a fake of these
   endpoints (`twist/test/feedback-server.test.mjs`); if your answers differ
   from the shapes above, tell us and we change the client, not you.
