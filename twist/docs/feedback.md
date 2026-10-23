# Feedback on app screens, and accounts

Twist Preview (`twist/serve.mjs`, the player at new.dev.twist-learning.com)
lets people sign in with their own account and pin a comment to a point on
any app screen: a step of a lesson, a tab of the app, the Study track or the
Parents view. Reviewers see every comment and open its screen from the list.

## Roles

| Role | Can |
|---|---|
| Tester | Use the whole preview. Leave feedback. See, edit and delete their own comments while open, and read replies to them. Never sees anyone else's. |
| Manager | What a tester can, plus: add testers, set and reset their passwords, switch them off, delete them; see, reply to and resolve their testers' comments. |
| Reviewer | Use the preview; see every comment; reply, resolve, reopen and delete any. |
| Admin | Everything, including every account and every role. |

The rules are one table in `twist/server/roles.mjs`. The server checks every
request against it; the page only hides what would fail.

## Leaving a comment

Press **Comment** in the top bar, or `c`, then click the point the comment is
about. The comment keeps:

- **The screen.** For a lesson: the lesson set's id, the lesson number, the
  step and, on a task, its task id; for the app, the tab; for Study, the
  subject and whether the track or the unit list was open. A label in words
  goes with it (`Das ABC · lesson 1 · Learn screen 2`) and the build date.
- **The point**, as a fraction of the screen's width and height, so a pin sits
  in the same place at every phone size.
- **What is under the pin**, in words: `Option card: sieben`,
  `Button: Weiter`, `Picture: apple`. If the screen changes later, this still
  says what the comment was about.

Comments show as numbered pins on their screen to whoever may see them. A pin
opens the comment: its thread, a reply box, and Resolve, Edit, Copy link and
Delete where allowed. **Copy link** gives a link (`…/pages/player/#fb=<id>`)
that opens the comment's screen with its pin.

## Finding comments

- **The top bar's inbox** lists the open comments with a count, newest first;
  one click opens the screen with the pin flashing. Its switches hide the pins,
  or show resolved ones too.
- **The Feedback tab** lists them all, filtered by status (open, resolved,
  all), by who wrote them, by kind of screen and curriculum, and by a search
  over the text, the screen, the task id and the replies. **Open the screen**
  goes there.

A step is found again by its task id, so a comment still lands on its task
after tasks are added or moved. A lesson set that is no longer in the build
says so instead of opening.

## Accounts

The **Users** tab, for managers and admins, adds people (with a password made
for them, shown once to pass on), changes roles (admins only), resets
passwords, switches accounts off and deletes them. A row with comments
links to them. Everyone changes their own password from the account menu
in the top bar. Passwords need at least 10 characters.

Switching an account off, deleting it or resetting its password ends its
sessions at once. Changing your own password ends your other sessions.

## Where accounts and feedback are kept

`serve.mjs` has two stores behind the same routes:

- **File store** (default): `accounts.json` and `feedback.json` in
  `TWIST_DATA` (`.twist-data/` at the repo root, not in git; the Docker setup
  mounts it). Passwords are scrypt hashes. `TWIST_USER` and `TWIST_PASS` make
  the first admin while there are no accounts.
- **Backend store**: with `TWIST_API_URL` set, sign-in and accounts go to the
  IST-B2C admin API, the one the content review app used, and feedback to new
  endpoints there. What the backend has to add is in
  [feedback-backend.md](feedback-backend.md). Moving from the file store to the
  backend does not carry comments across; resolve or copy what is open first.

## Security

- Sessions are random ids in an HttpOnly, SameSite=Lax cookie (Secure behind
  HTTPS); what they stand for stays in the server's memory, so a restart signs
  everyone out. Sessions end after 12 idle hours or 7 days.
- Every change needs the `X-Twist: 1` header, which another site cannot send
  without a CORS preflight this server never answers.
- Sign-in allows ten wrong passwords per address and ten per account in 15
  minutes; each try is counted before its password is checked.
- Everything under `pages/` and `assets/` needs a session; `/healthz` and the
  sign-in page do not.

## Code

| File | What |
|---|---|
| `twist/server/roles.mjs` | Roles and who may do what |
| `twist/server/api.mjs` | Sign-in page, sessions, `/api/me`, `/api/feedback`, `/api/users` |
| `twist/server/store-file.mjs` | The file store |
| `twist/server/store-api.mjs` | The backend store |
| `twist/pages/player/feedback-ui.js`, `feedback.css` | Pins, the composer, the inbox, the Feedback and Users tabs |
| `twist/test/feedback-server.test.mjs` | Roles, sessions, both stores |

Opened as a file, or anywhere without `serve.mjs`, the player shows none of
this.
