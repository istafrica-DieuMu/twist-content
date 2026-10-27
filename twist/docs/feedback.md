# Feedback on app screens, and accounts

Twist Preview (`twist/serve.mjs`, the player at new.dev.twist-learning.com)
lets people sign in with their own account and pin a comment to a point on
any app screen: a step of a lesson, a tab of the app, the Study track or the
Parents view. Reviewers see every comment and open its screen from the list.

## Roles

| Role | Can |
|---|---|
| Tester | Use the app and the Parents view (not Drawings or Task types). Leave feedback. See, edit and delete their own comments while open, and read replies to them. Never sees anyone else's. |
| Manager | What a tester can, plus: add testers, set and reset their passwords, switch them off, delete them; see, reply to and resolve their testers' comments. |
| Reviewer | Use the whole preview; see every comment; reply, resolve, reopen and delete any. |
| Admin | Everything, including every account and every role. |

Everyone above tester also gets the team's tools, Drawings and Task types. For
a tester those tabs are gone and the server refuses the pages themselves, so
typing the address does not get round it.

The rules are one table in `twist/server/roles.mjs`. The server checks every
request against it; the page only hides what would fail.

## Leaving a comment

Press **Comment** in the top bar, or `c`, then click the point the comment is
about, or drag to select an area (two answer cards, a whole row). The comment
keeps:

- **The screen.** For a lesson: the lesson set's id, the lesson number, the
  step and, on a task, its task id; for the app, the tab; for Study, the
  subject and whether the track or the unit list was open. A label in words
  goes with it (`Das ABC · lesson 1 · Learn screen 2`) and the build date.
- **The point or the area**, as fractions of the screen's width and height,
  so a pin or a box sits in the same place at every phone size. An area's
  number sits on its top-left corner, and pointing at the number lights the
  box up.
- **The part it was dropped on** (`screen.anchor`): the card, button or
  picture under the pin, or the smallest part holding the whole box, found
  again by its place in the screen and its text, with the pin or box as
  fractions of that part. The app's screens scroll inside the phone and the
  cards on Start and Practice change with the child, so the pin follows its
  part as it scrolls. When the content or the UI changes, the pin looks for
  its part again: by its text where the part has moved, and by its place
  where the text was edited (at least half its words the same). Nothing
  looser: a part may show only in some states of the screen (an answer
  checked, a hint open, a card for one child), and another part must not be
  taken for it. A pin or box on no one part, or on a whole scrolling page,
  keeps that page as its part, known by its place alone (its words change
  with the child), and scrolls with it. Comments from before anchors look
  for the parts their label names and sit on them; when those are not on
  the screen, they show as a single point (no box) on the screen's
  scrolling content, as if dropped with the screen scrolled to the top. In
  Comment mode the wheel still scrolls the screen.
- **What is under the pin**, in words: `Option card: sieben`,
  `Button: Weiter`, `Picture: apple`; for an area, the parts inside it:
  `Area: Option card: Mäuse, Option card: Meuse`. If the screen changes
  later, this still says what the comment was about.

Comments show as numbered pins on their screen to whoever may see them. A pin
opens the comment, and a second click on it closes it again: its thread, a reply box, and Resolve, Edit, Copy link and
Delete where allowed. An area comment shows only its number; its box shows
while the comment is open or its number is pointed at, one box at a time.

**Pins** in the top bar (or `h`) hides or shows the comments on the screen.
It is each person's own choice, kept in their browser.

A comment whose part is not on the screen now waits in the **tray**, a
dashed count in the screen's top-right corner, instead of on the screen.
It comes back to its part when that shows again. The tray lists them; **Pin
again here** (for the comment's author and whoever may resolve it) asks for
a new spot or area on this screen and saves it with the part under it. **Copy link** gives a link (`…/pages/player/#fb=<id>`)
that opens the comment's screen with its pin.

## Finding comments

- **The top bar's inbox** lists the open comments with a count, newest first;
  one click opens the screen with the pin flashing. Its switches hide the pins,
  or show resolved ones too.
- **The Feedback tab** lists them all, filtered by status (open, resolved,
  all), by who wrote them, by kind of screen and curriculum, and by a search
  over the text, the screen, the task id and the replies. **Open the screen**
  goes there.

A step is found again by its task id, and a step that is not a task by its
place in its activity (`place`: `learn2` for Learn screen 3,
`intro:fluency`, `stage:fluency:1`), so a comment still lands on its screen
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
- An address gets ten sign-in tries in 15 minutes, each counted before its
  password is checked (IPv6 per /64; behind the proxy, `TRUST_PROXY=1`
  reads the address from `X-Forwarded-For`). An account is not locked by a
  count, so nobody can lock its owner out: after ten wrong passwords for it,
  its checks queue one at a time, a second apart and more as wrong tries
  grow (up to ten). Only a queue over a minute long, which takes a flood
  from many addresses, turns a try away, for that minute.
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
