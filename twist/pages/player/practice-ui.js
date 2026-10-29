/* ---------- Practice tab (twist/docs/practice.md) ----------
   The phone shows the Practice tab as the child sees it; the side panel holds
   the pretend child and why each task was picked. Rules are in
   practice-rules.mjs, inlined above this file by build.mjs. */
const PR = { on: false, home: false, child: null, index: null, session: null, items: [], res: [], shownAt: 0, saved: null };
const PTXT = {
  de: { hello: "Hallo! Was üben wir heute?", helloSub: "Was üben wir heute?", subjectsPractice: "Ein Fach üben", doneTitle: "Übungsrunden geschafft", size: (n, m) => `${n} Aufgaben, etwa ${m} Minuten`, drillSize: (m) => `${m} Minuten, so schnell du kannst`, subjects: "Deine Fächer", stars: (a, b) => `${a} von ${b} Sternen`, practise: "Üben", back: "Zurück", allYears: "Alle Klassen", myYear: "Nur meine Klasse", skillsN: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} zum Üben`, reviewTopic: "Ganzes Thema wiederholen", noneHere: "Hier gibt es in deiner Klasse nichts. Tippe auf Alle Klassen.", found: (n) => `${n} gefunden`, noHits: "Nichts gefunden. Versuch ein anderes Wort.", gSubject: "Fach", gTopic: "Thema", gTime: "Wie lange?", gKind: "Wie?", understood: (ws) => `Verstanden: ${ws.join(", ")}`, title: "Üben", suggested: "Für dich", search: "Suchen: Einmaleins, Plus, Wörter …", browse: "Alles zum Üben", drill: "Sprint", start: "Los geht's", make: "Selbst zusammenstellen", ask: "Was möchtest du üben?", read: "Verstehen", none: "Das habe ich nicht verstanden. Wähle unten aus.", minutes: "Minuten", kinds: { mixed: "Gemischt", drill: "Sprint", review: "Wiederholen", "catch-up": "Nachholen", skill: "Gezielt üben", recaps: "Weißt du es noch?" }, right: (n) => `${n} richtig!`, rightOf: (r, n) => `${r} von ${n} richtig!`, done: "Fertig", askPh: "z. B. „10 Minuten Einmaleins“", examples: ["10 Minuten Einmaleins mit 7", "Plus und Minus wiederholen", "Wörter schnell lesen"], understoodT: "Verstanden", startThis: "Das üben", skillsFound: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} zum Üben`, own: "Eigene Runde", ownSub: "Wähle selbst, was du übst", startPr: "Übung starten", moreTopics: (n) => `+ ${n} mehr`, fewer: "Weniger", kindDesc: { mixed: "Aufgaben aus allen gewählten Themen", drill: "Schnelle Aufgaben gegen die Uhr", review: "Ohne Tipps, wie eine kleine Probe", "catch-up": "Mit Tipps, Schritt für Schritt" }, tasksFrom: (n, t) => `${n} Aufgaben aus ${t} ${t === 1 ? "Thema" : "Themen"}`, minsShort: (m) => `${m} Min`, beeBar: (a, b) => `${a} von ${b} bis zum Fleißigen Bienchen`, beeUp: "Neues Abzeichen: Fleißiges Bienchen!", whole: "Alles", drills: "Sprints", drillsSub: "Schnell rechnen und lesen, gegen die Uhr", allDrills: "Alle Sprints", notTried: "Noch nicht gespielt", hearAgain: "Nochmal hören", colourN: "Farbe", recapNow: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} auffrischen`, firstOf: (r, n) => `${r} von ${n} beim ersten Versuch richtig`, better: "Besser geworden:", perMin: (n) => `${n} pro Minute`, record: (n) => `Neuer Rekord: ${n} pro Minute!`, back: "Zurück zum Üben", again: "Nochmal" },
  en: { hello: "Hi! What shall we practise today?", helloSub: "What shall we practise today?", subjectsPractice: "Practise a subject", doneTitle: "Practice sessions finished", size: (n, m) => `${n} tasks, about ${m} minutes`, drillSize: (m) => `${m} minutes, as fast as you can`, subjects: "Your subjects", stars: (a, b) => `${a} of ${b} stars`, practise: "Practise", back: "Back", allYears: "All years", myYear: "Just my year", skillsN: (n) => `${n} ${n === 1 ? "thing" : "things"} to practise`, reviewTopic: "Review the whole topic", noneHere: "Nothing here for your year. Tap All years.", found: (n) => `${n} found`, noHits: "Nothing found. Try another word.", gSubject: "Subject", gTopic: "Topic", gTime: "How long?", gKind: "How?", understood: (ws) => `Understood: ${ws.join(", ")}`, title: "Practice", suggested: "Suggested for you", search: "Search: times tables, adding, words …", browse: "Everything to practise", drill: "Drill", start: "Start", make: "Make my own", ask: "What do you want to practise?", read: "Read it", none: "I didn't understand that. Pick below.", minutes: "minutes", kinds: { mixed: "Mixed", drill: "Drill", review: "Review", "catch-up": "Catch up", skill: "Skill practice", recaps: "Do you remember?" }, right: (n) => `${n} right!`, rightOf: (r, n) => `${r} of ${n} right!`, done: "Done", askPh: "e.g. “10 minutes of times tables”", examples: ["10 minutes of the 7 times table", "Review adding and subtracting", "Read words quickly"], understoodT: "Understood", startThis: "Practise this", skillsFound: (n) => `${n} ${n === 1 ? "thing" : "things"} to practise`, own: "Own session", ownSub: "Choose what to practise", startPr: "Start practice", moreTopics: (n) => `+ ${n} more`, fewer: "Fewer", kindDesc: { mixed: "Tasks from every topic you picked", drill: "Quick tasks against the clock", review: "No hints, like a little test", "catch-up": "With hints, step by step" }, tasksFrom: (n, t) => `${n} tasks from ${t} ${t === 1 ? "topic" : "topics"}`, minsShort: (m) => `${m} min`, beeBar: (a, b) => `${a} of ${b} to the Busy Bee`, beeUp: "New badge: Busy Bee!", whole: "Everything", drills: "Drills", drillsSub: "Quick maths and reading, against the clock", allDrills: "All drills", notTried: "Not played yet", hearAgain: "Hear it again", colourN: "Colour", recapNow: (n) => `Refresh ${n} ${n === 1 ? "skill" : "skills"}`, firstOf: (r, n) => `${r} of ${n} right first time`, better: "You got better at:", perMin: (n) => `${n} a minute`, record: (n) => `New record: ${n} a minute!`, back: "Back to practice", again: "Again" },
};
const PL = () => (PR.child?.curriculum === "en-GB" ? "en" : "de");
const PT = () => PTXT[PL()];
const STARS = { not_started: 0, learning: 0, practised: 1, can_do: 2, remembered: 3, needs_refresh: 2 };
const starsOf = (k) => { const s = PR.child.states[k]?.state ?? "not_started", n = STARS[s]; return "★".repeat(n) + "☆".repeat(3 - n) + (s === "needs_refresh" ? " ↻" : ""); };
const canDoOf = (k) => { const c = D.skills[skillOfKey(k)]?.can_do; return c ? c[PL()] ?? c.en ?? c.de : k; };
const SUBJ_NAME = { "de-DE": { math: "Mathe", "lit-de": "Deutsch", fl: "Englisch", world: "Sachunterricht", daz: "DaZ" }, "en-GB": { math: "Maths", "lit-en": "English", fl: "French" } };

function loadChild() {
  // A saved child from an older build, or a broken one, starts fresh.
  try { const c = JSON.parse(localStorage.getItem("twist-practice-child")); if (c?.states && BANDS[c.band] && ["de-DE", "en-GB"].includes(c.curriculum) && Number.isFinite(c.today)) return { seen: {}, lastCheck: {}, drills: {}, sessions: 0, lastSkill: null, log: [], ...c }; } catch (e) {}
  return newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
}
function saveChild() { try { localStorage.setItem("twist-practice-child", JSON.stringify(PR.child)); } catch (e) {} }
// The time machine keeps the child as it was before each change, so Rewind can undo it.
function snap() { (PR.history ??= []).push(JSON.stringify(PR.child)); if (PR.history.length > 40) PR.history.shift(); }

function openPractice() {
  PR.child ??= loadChild();
  PR.index = indexFor(PR.child);
  PR.saved ??= { set, lesson, steps, results, at };
  APP.home = null; PR.home = true; PR.on = false; $("#practiceSide").hidden = false;
  renderPracticeHome(); renderPracticeSide();
}
function closePractice() {
  PR.on = false; PR.home = false; PR.session = null; $("#practiceSide").hidden = true;
  if (PR.saved) { ({ set, lesson, steps, results, at } = PR.saved); PR.saved = null; go(at); }
}

// The Practice home, as in the Twist Dashboard design: what Twist suggests, as a deck; the
// subjects, each opening Own session on itself; the games (Race, Quiz me, Surprise); and Own
// session floating over the page.
const KIND_POSE = { recaps: "learn-2", "catch-up": "practise-1", drill: "check-2", review: "learn-3", skill: "practise-3", mixed: "practise-2" };
const setOfSkill = (k) => PR.index.bySkill[k]?.set;
const subjOfSkill = (k) => setOfSkill(k)?.id.split(".")[1];
const colourOf = (subj) => SUBJ_COLOUR[`${PR.child.curriculum}.${subj}`] ?? "#6849dd";
const poseSrc = (card) => `${A}mascot/${setOfSkill(card.skills[0])?.pose ?? KIND_POSE[card.kind]}.png`;
function sizeOf(card) {
  const b = BANDS[PR.child.band];
  // A sprint runs against the clock and starts again whole, so its card gives the time, not tasks.
  if (card.paused) return card.paused.kind === "drill" ? PAUSE_TXT[PL()].again(card.paused.minutes ?? 2) : PAUSE_TXT[PL()].left(card.paused.done, card.paused.total);
  if (card.kind === "drill") return PT().drillSize(2);
  // A length chosen (practice a parent sent) sizes the session (buildSession, tasksForMinutes).
  if (card.minutes) return PT().size(tasksForMinutes(card.minutes), card.minutes);
  const n = card.kind === "recaps" ? Math.min(card.skills.length, Math.floor(b.tasks / b.recapTasks)) * b.recapTasks : b.tasks;
  return PT().size(n, Math.max(2, Math.round(n * 0.4)));
}
const CHEVRON = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const LENS = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

function renderPracticeHome() {
  appChild();
  const L = PT(), K = MKTXT[PL()], scr = $("#screen");
  const cards = mySuggestions().slice(0, 3), can = gamesOpen();
  scr.style.setProperty("--subj", "#6849dd"); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page">
    <header class="pg-top fun-band" style="--room:${ROOM.practice}"><div><h2>${esc(AT().practice)}</h2><small>${esc(L.helloSub)}</small></div><img src="${A}mascot/practise-1.png" alt=""></header>
    <div id="prMain">
      ${cards.length ? `<h3 class="pr-h">${esc(L.suggested)}</h3>${cards.length > 1 ? deckOf(cards.map(card)) : card(cards[0])}` : ""}
      <h3 class="pr-h">${esc(L.subjectsPractice)}</h3><div class="ps-row">${appSubjects().map(subjCard).join("")}</div>
      <h3 class="pr-h">${esc(K.games)}</h3><div class="ps-row">${Object.entries(K.types).map(([t, name]) => `<button class="ps-card ps-game" data-g="${t}"${can[t] ? "" : " disabled"}><img src="${A}${MK_PIC[t]}" alt="" draggable="false"><b>${esc(name)}</b>${can[t] ? "" : `<small>${esc(K.later)}</small>`}</button>`).join("")}</div>
    </div></div>`;
  // Own session floats over the page, above the tabs: wide with its name at first, a round "+" once the page scrolls.
  const fab = document.createElement("button"); fab.className = "pr-own-fab"; fab.id = "prOwn";
  fab.setAttribute("aria-label", `${L.own}: ${L.ownSub}`);
  fab.innerHTML = `<span class="pr-own-fab-i" aria-hidden="true">+</span><b>${esc(L.own)}</b>`;
  scr.append(fab, appTabs("practice"));
  const pg = $(".app-page", scr); pg.addEventListener("scroll", () => fab.classList.toggle("mini", pg.scrollTop > 40), { passive: true });
  wireHeader(scr); wireRow(scr);
  scr.querySelectorAll(".ps-row").forEach(dragRow);
  scr.querySelectorAll("[data-card]").forEach((b) => b.onclick = () => { const c = cards[+b.dataset.card]; if (c.paused) return resumeSession(); PR.assignedId = c.assigned ?? null; startSession({ kind: c.kind, skills: c.skills, minutes: c.minutes ?? (c.kind === "drill" ? 2 : null) }); });
  scr.querySelectorAll("[data-subj]").forEach((b) => b.onclick = () => openMakeSheet(b.dataset.subj));
  scr.querySelectorAll("[data-g]").forEach((b) => b.onclick = () => playGame(b.dataset.g));
  $("#prOwn").onclick = () => openMakeSheet();
  // The same card as Start's practice suggestions (practiceCard in app-ui.js).
  function card(c) { return practiceCard(c, `data-card="${cards.indexOf(c)}"`); }
}
// What a card holds, in a line: the topics of a recap, the drill's set, the skill.
function cardSub(c) {
  const lg = PL(), b = BANDS[PR.child.band];
  if (c.kind === "recaps") { const ks = c.skills.slice(0, Math.floor(b.tasks / b.recapTasks)), ts = [...new Set(ks.map((k) => setOfSkill(k)?.topic?.[lg]).filter(Boolean))]; return ts.slice(0, 3).join(" · ") + (ts.length > 3 ? " …" : ""); }
  if (c.kind === "drill") return setOfSkill(c.skills[0])?.title[lg] ?? canDoOf(c.skills[0]);
  if (c.kind === "review") return PT().skillsFound(c.skills.length);
  return canDoOf(c.skills[0]);
}

// Stars earned out of stars possible, for a list of skills.
const starCount = (skills) => skills.reduce((n, k) => n + STARS[PR.child.states[k]?.state ?? "not_started"], 0);
const yearSkills = (subj) => { if (!offered(subj)) return []; const mine = PR.index.sets.filter((s) => s.id.split(".")[1] === subj && s.year === childYearFor(subj)); return (mine.length ? mine : PR.index.sets.filter((s) => s.id.split(".")[1] === subj)).map(stateKey); };

// A subject as a tile in a row that slides sideways: its object, its name, and a bar of its units
// done this year.
function subjCard(x) {
  const sets = courseSets(x), done = sets.filter((s_) => lessonsDone(s_) >= s_.lessons.length).length, pct = sets.length ? (100 * done) / sets.length : 0;
  return `<button class="ps-card" data-subj="${esc(x)}" style="--c:${colourOf(x)}"><img src="${A}objects/${subjObject(x)}.png" alt="" draggable="false"><b>${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</b><i class="ps-bar" aria-label="${esc(AT().unitsOf(done, sets.length))}"><i style="width:${pct}%"></i></i></button>`;
}

function startSession({ kind, skills = [], minutes = null, topics = [], tricky = false, focus = null }) {
  const fromTopics = topics.flatMap((key) => PR.index.topics.find((t) => t.key === key)?.skills ?? []);
  const all = [...new Set([...skills, ...fromTopics])];
  const session = buildSession({ kind, child: PR.child, index: PR.index, skills: all, minutes, tricky, focus, rng: Math.random });
  if (!session.items.length) { renderPracticeHome(); return; }
  PR.last = { tricky, focus };
  // A new session takes the place of a paused one on the same skills.
  if (PR.child.paused && PR.child.paused.skills.join() === session.skills.join()) PR.child.paused = null;
  playSession(session);
}
function playSession(session) {
  PR.session = session; PR.items = session.items; PR.res = []; PR.on = true; PR.home = false; PR.t0 = Date.now(); PR.applied = false;
  steps = PR.items.map((it) => ({ kind: "task", a: { activity: "practise" }, t: it.task, stage: it.mode, item: it })).concat([{ kind: "end" }]);
  results = steps.map(() => null);
  at = 0; practiceIntro();
}

// Before the first task: what this session is for, built from the session
// itself (its kind, skills, size), so it is shown and not spoken.
const GOAL_TXT = {
  de: { goal: "Ziel", and: "und", more: (n) => `${n} weitere`,
    recaps: (s) => `Zeig, dass du noch weißt, wie es geht: ${s}.`, "catch-up": (s) => `Üb ${s} noch einmal, mit Tipps, die dir helfen.`,
    review: (s) => `Zeig, was du kannst, ganz ohne Tipps: ${s}.`, mixed: (s) => `Üb alles bunt gemischt: ${s}.`, skill: (s) => `Üb ${s}, bis es ganz leicht geht.`,
    drill: (s, m, best) => `Schaff so viele wie du kannst in ${m} ${m === 1 ? "Minute" : "Minuten"}: ${s}.${best ? ` Dein Rekord sind ${best} pro Minute.` : ""}` },
  en: { goal: "Goal", and: "and", more: (n) => `${n} more`,
    recaps: (s) => `Show you still remember how to do it: ${s}.`, "catch-up": (s) => `Practise ${s} again, with hints to help you.`,
    review: (s) => `Show what you know, with no hints: ${s}.`, mixed: (s) => `Practise everything mixed up: ${s}.`, skill: (s) => `Practise ${s} until it feels easy.`,
    drill: (s, m, best) => `Do as many as you can in ${m} ${m === 1 ? "minute" : "minutes"}: ${s}.${best ? ` Your record is ${best} a minute.` : ""}` },
};
function practiceIntro() {
  const L = PT(), G = GOAL_TXT[PL()], lg = PL(), ses = PR.session;
  set = setOfSkill(ses.skills[0]) ?? D.sets[0];
  const names = [...new Set(ses.skills.map((k) => { const t = setOfSkill(k)?.title; return t?.[lg] ?? t?.de ?? canDoOf(k); }))];
  // Inside an English sentence a title starts small ("Practise numbers in order to 10"); German keeps its capitals.
  const inline = names.map((n) => lg === "en" && /^[A-Z][a-z]/.test(n) ? n[0].toLowerCase() + n.slice(1) : n);
  const list = inline.length <= 2 ? inline.join(` ${G.and} `) : `${inline.slice(0, 2).join(", ")} ${G.and} ${G.more(inline.length - 2)}`;
  const best = ses.kind === "drill" ? PR.child.drills[ses.skills[0]]?.best : null;
  const text = (G[ses.kind] ?? G.mixed)(list, ses.minutes ?? 2, best);
  const size = ses.kind === "drill" ? L.drillSize(ses.minutes ?? 2) : L.size(ses.items.length, ses.minutes ?? Math.max(3, Math.round(ses.items.length / 2.5)));
  const { body, foot } = practiceFrame({});
  body.innerHTML = `<div class="center start pr-intro">${mascotPose("start")}<span class="subj-chip"><b></b>${esc(L.kinds[ses.kind] ?? L.title)}</span>
    <h2 class="a-lesson">${esc(names.length === 1 ? names[0] : L.kinds[ses.kind] ?? L.title)}</h2><small class="pr-size">${esc(size)}</small>
    <div class="goal"><span class="gl">${esc(G.goal)}</span>${esc(text)}</div></div>`;
  nextBtn(foot, L.start, () => { PR.t0 = Date.now(); showPracticeStep(0); });
  renderPracticeSide();
}

// Practice owns navigation: record the outcome and time of the step being left,
// bring a first-try miss back once, stop a drill when its time is up.
function practiceGo(i) {
  if (!PR.on) return false;
  const leaving = steps[at];
  if (leaving?.kind === "task" && results[at] && PR.res[at] == null) {
    PR.res[at] = { outcome: results[at], ms: Date.now() - PR.shownAt };
    if (results[at] !== "first" && PR.session.kind !== "drill") {
      const before = PR.items.length;
      PR.items = requeue(PR.items, at);
      if (PR.items.length > before) { const it = PR.items.at(-1); steps.splice(steps.length - 1, 0, { kind: "task", a: { activity: "practise" }, t: it.task, stage: it.mode, item: it }); results.splice(results.length - 1, 0, null); }
    }
    // A drill item missed or too slow comes back after 4 other items.
    const slow = PR.session.seconds && PR.res[at].ms > PR.session.seconds * 1000;
    if (PR.session.kind === "drill" && (results[at] !== "first" || slow) && !leaving.item.again) {
      const it = { ...leaving.item, again: true, key: leaving.item.key + "#again", why: leaving.item.why + "; missed or slow, so it comes back after 4 items" };
      const pos = Math.min(at + 5, steps.length - 1);
      PR.items.splice(pos, 0, it); steps.splice(pos, 0, { kind: "task", a: { activity: "practise" }, t: it.task, stage: it.mode, item: it }); results.splice(pos, 0, null);
    }
  }
  if (i === 0 && at > 0) { endSession(true); return true; }
  const timeUp = PR.session.kind === "drill" && Date.now() - PR.t0 >= PR.session.minutes * 60000;
  showPracticeStep(timeUp ? steps.length - 1 : i);
  return true;
}

function showPracticeStep(i) {
  stopAudio();
  at = Math.max(0, Math.min(steps.length - 1, i));
  const step = steps[at];
  if (step.kind === "end") { practiceEnd(); renderPracticeSide(); return; }
  set = D.sets.find((s) => s.id === step.item.set); lesson = set.lessons.find((l) => l.n === step.item.lesson) ?? set.lessons[0];
  PR.shownAt = Date.now();
  // A drill's instruction has its own recording, a phrase (phrases.yaml, drill_*).
  const t = step.t, ph = t._phrase && D.phrases[t._lang]?.[t._phrase]?.[0];
  if (ph?.src && !t._prompt.length) t._prompt = [ph.src];
  renderTask(step);
  // A heard drill word: a big speaker to hear it again, colour swatches for a colour.
  if (t._sayWord) {
    const hear = document.createElement("button"); hear.className = "pr-hear"; hear.innerHTML = SPK; hear.setAttribute("aria-label", PT().hearAgain);
    hear.onclick = () => sayDrill(t, 0, 1); $("#screen .body")?.prepend(hear);
    // The instruction first, then the word: the screen has started the instruction; the word follows
    // when it ends, after a moment to get ready to listen, and comes twice.
    if (auto() && t._prompt.length) onQueueEnd = () => { if (steps[at] === step) sayDrill(t, 1000); };
    else sayDrill(t);
  }
  if (t._swatches) $("#screen .opts")?.querySelectorAll(".opt").forEach((b, i) => {
    const c = b.firstChild?.textContent?.trim(), hex = D.colours?.[c];
    if (!hex) return;
    b.firstChild.replaceWith(Object.assign(document.createElement("span"), { className: "pr-swatch", style: `background:${hex}` }));
    b.setAttribute("aria-label", `${PT().colourN} ${i + 1}`);
  });
  // A flash word shows on its own; the options come once it has gone.
  if (t._flashWord) {
    const f = document.createElement("div"), opts = $("#screen .opts"); f.className = "pr-flash"; f.textContent = t._flashWord;
    $("#screen .visual")?.appendChild(f); if (opts) opts.style.visibility = "hidden";
    setTimeout(() => { f.remove(); if (opts) opts.style.visibility = ""; }, 1500);
  }
  renderPracticeSide();
}

// Say a drill word a moment after its screen settles: its recorded clip when
// there is one, else the browser's clearest voice for its language, slower.
// It comes twice, with a pause between, so a child who missed the start hears
// it whole; the speaker button says it once more.
const DRILL_AGAIN = 1200;
function sayDrill(t, delay = 600, times = 2) {
  // The word comes a moment later; not if the child has moved on or left meanwhile (stopAudio).
  const step = steps[at];
  let tok = qToken;
  const still = () => steps[at] === step && tok === qToken && PR.on;
  const once = (left) => {
    if (!still()) return;
    const again = () => { if (left > 1 && still()) setTimeout(() => once(left - 1), DRILL_AGAIN); };
    if (t._clip) { play(t._clip, again); tok = qToken; return; }
    if (!("speechSynthesis" in window) || appOffScreen()) return;
    const tl = t._sayLang ?? set.target_language ?? set.language, code = { de: "de-DE", en: "en-GB", fr: "fr-FR" }[tl] ?? tl;
    const vs = speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith(code.slice(0, 2).toLowerCase()));
    const u = new SpeechSynthesisUtterance(t._sayWord); u.lang = code; u.rate = 0.75; u.onend = again;
    u.voice = vs.find((v) => /premium|enhanced|natural|google/i.test(v.name)) ?? vs.find((v) => v.lang.replace("_", "-") === code) ?? vs[0] ?? null;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  };
  setTimeout(() => once(times), delay);
}

function practiceFrame(step) {
  const scr = $("#screen"), L = PT();
  const done = PR.res.filter(Boolean).length, total = PR.items.length;
  const pct = PR.session.kind === "drill" ? Math.min(100, (100 * (Date.now() - PR.t0)) / (PR.session.minutes * 60000)) : (100 * done) / Math.max(1, total);
  scr.style.setProperty("--subj", SUBJ_COLOUR[subjOf(set ?? D.sets[0])] ?? "#6849dd"); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="hdr"><span></span>
    <div class="stepb"><span class="st">${esc(L.kinds[PR.session.kind] ?? L.title)}</span></div>
    <button class="ib x" aria-label="Close">${ICON.close}</button></div>
    ${PR.session.kind === "drill" ? `<div class="pbar"><i style="width:${pct}%"></i></div>` : pbar(PR.items.map((_, i) => i), (i) => PR.res[i]?.outcome ?? results[i])}`;
  $(".x", scr).onclick = () => leaveSheet(scr, true, pauseSession);
  const body = document.createElement("div"); body.className = "body"; scr.appendChild(body);
  const foot = document.createElement("div"); foot.className = "foot"; scr.appendChild(foot);
  return { body, foot };
}

// Paused (Pause practice in the leave sheet): the tasks still to do are kept for
// the child (child.paused) and offered first on Start and Practice, until they
// are finished, a new session on the same skills starts, or a week has passed.
const PAUSE_TXT = {
  de: { reason: "Mach weiter, wo du aufgehört hast", kind: (k) => `Pausiert · ${k}`, go: "Weiter", left: (a, n) => `${a} von ${n} geschafft, ${n - a} übrig`, again: (m) => `Startet neu: ${m} Minuten` },
  en: { reason: "Carry on where you stopped", kind: (k) => `Paused · ${k}`, go: "Carry on", left: (a, n) => `${a} of ${n} done, ${n - a} to go`, again: (m) => `Starts again: ${m} minutes` },
};
function pauseSession() {
  const s = PR.session, c = PR.child, left = PR.items.filter((_, i) => !PR.res[i]), done = PR.items.length - left.length;
  // A drill runs against the clock, so it starts again whole; other sessions keep their own tasks.
  if (left.length && done) c.paused = { kind: s.kind, skills: s.skills, mode: s.mode, minutes: s.minutes, seconds: s.seconds, day: c.today, done, total: PR.items.length,
    items: s.kind === "drill" ? [] : left.map(({ task, ...it }) => it) };
  endSession(true);
}
// The paused session's tasks, found again by their keys (a task met twice ends in #again).
function pausedItems(p) {
  return p.items.map((it) => { const base = it.key.replace(/#again$/, ""), pools = PR.index.bySkill[it.skill]?.pools; const e = pools && Object.values(pools).flat().find((x) => x?.key === base); return e ? { ...it, task: e.task } : null; }).filter(Boolean);
}
function resumeSession() {
  const p = PR.child.paused; PR.child.paused = null; saveChild();
  if (!p) return;
  const items = pausedItems(p);
  appTab("practice");
  if (p.kind === "drill" || !items.length) return startSession({ kind: p.kind, skills: p.skills, minutes: p.minutes });
  PR.last = {}; playSession({ kind: p.kind, skills: p.skills, mode: p.mode, items, seconds: p.seconds, minutes: p.minutes });
}
// The suggestions, with a paused session first while it is less than a week old, and before it
// what a parent sent from the Parents view (parents-ui.js), the newest waiting one.
const SENT_TXT = { de: "Von deinen Eltern", en: "From your grown-up" };
function mySuggestions() {
  const c = PR.child, p = c.paused, sent = [...(c.assigned ?? [])].reverse().find((a) => !a.done && a.skills.every((k) => PR.index.bySkill[k]));
  const list = [...(sent ? [{ kind: sent.kind, skills: sent.skills, minutes: sent.minutes, assigned: sent.id, reason: { de: SENT_TXT.de, en: SENT_TXT.en } }] : []), ...suggestions(c, PR.index)].slice(0, 3);
  if (!p) return list;
  if (c.today - p.day > 7 || !p.skills.every((k) => PR.index.bySkill[k])) { c.paused = null; saveChild(); return list; }
  return [{ kind: p.kind, skills: p.skills, paused: p, reason: { de: PAUSE_TXT.de.reason, en: PAUSE_TXT.en.reason } }, ...list];
}
function endSession(early) {
  stopAudio();
  const answered = PR.items.map((_, i) => PR.res[i]).filter(Boolean).length;
  if (answered && !PR.applied) applySession(PR.child, { ...PR.session, items: PR.items.slice(0, PR.res.length) }, PR.res, false);
  saveChild();
  PR.on = false; PR.home = true; PR.session = null;
  renderPracticeHome(); renderPracticeSide();
}

function practiceEnd() {
  // Score what was played: the session's tasks plus any that came back.
  const L = PT(), lg = PL(), items = PR.items, session = { ...PR.session, items };
  const res = items.map((_, i) => PR.res[i]);
  const sc = scoreSession(session, res);
  const out = applySession(PR.child, session, res, true); PR.applied = true;
  // Practice a parent sent: done, with its score, for the Parents view.
  const sentA = PR.assignedId && PR.child.assigned?.find((a) => a.id === PR.assignedId);
  if (sentA) { sentA.done = { day: PR.child.today, right: sc.right, total: sc.total }; PR.assignedId = null; }
  saveChild();
  const { body, foot } = practiceFrame({});
  const better = Object.entries(sc.perSkill).filter(([, p]) => p.right).map(([k]) => canDoOf(k));
  const big = session.kind === "drill" ? (out.record ? L.record(sc.perMinute) : L.perMin(sc.perMinute ?? 0)) : L.rightOf(sc.right, sc.total);
  const bee = busyBee(PR.child.sessions), levelUp = bee.level > 0 && PR.child.sessions === bee.from;
  // One moment of motion: stars burst once behind the mascot (none with reduced motion).
  const col = colourOf(subjOfSkill(session.skills[0]));
  body.innerHTML = `<div class="pr-end" style="--c:${col}">
    <div class="pr-burst" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<i style="--a:${i * 51}deg;--d:${i * 40}ms">★</i>`).join("")}${mascotPose("end")}</div>
    <h2>${esc(big)}</h2>
    ${PR.child.band === "8-10" && session.kind !== "drill" ? `<p class="pr-first">${esc(L.firstOf(sc.firstTry, sc.total))}</p>` : ""}
    ${better.length ? `<div class="pr-better"><b>${esc(L.better)}</b><ul>${better.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
    <div class="pr-bee end${levelUp ? " up" : ""}"><img src="${badgeArt("busy-bee")}" alt=""><span><i class="pr-bar" style="--c:#f5b400"><i style="width:${levelUp || !bee.next ? 100 : (100 * (PR.child.sessions - bee.from)) / (bee.next - bee.from)}%"></i></i>
      <small>${esc(levelUp ? L.beeUp : bee.next ? L.beeBar(PR.child.sessions, bee.next) : AT().beeMax)}</small></span></div></div>`;
  PR.on = false; PR.home = true;
  nextBtn(foot, L.done, () => { PR.session = null; renderPracticeHome(); renderPracticeSide(); });
  nextBtn(foot, L.again, () => startSession({ kind: session.kind, skills: session.skills, minutes: session.minutes, tricky: PR.last?.tricky, focus: PR.last?.focus })).classList.add("light");
}

// The reason for the current task, as labelled rows a developer can scan.
const STAGE_LABEL = { full: "Practise, full help", some: "Practise, some help", none: "Practise, no help", check: "Check task", drill: "Drill bank" };
function whyBox(it) {
  const k = PR.session.kind;
  const PICK = { recaps: "its recap is due", "catch-up": "the skill is at Practised or Needs a refresh", review: "part of the topic review", skill: "the child chose this skill", mixed: "part of a mixed session", drill: "from the skill's drill bank" };
  const rule = PICK[k] ?? it.why.split("; ")[0];
  const rows = [
    ["Session", `${esc(PT().kinds[k] ?? k)} <code>${esc(k)}</code>`],
    ["Skill", `${esc(canDoOf(it.skill))}<br><code>${esc(it.skill)}</code>`],
    ["From", esc(STAGE_LABEL[it.stage] ?? it.stage) + (it.recap ? ", as a recap" : "") + (it.again ? ", second time" : "")],
    ["Help", it.mode === "catch" ? "First hint once, after a wrong answer" : "No hints"],
    ["Picked", esc([rule, ...it.why.split("; ").slice(1).filter((x) => !/stage$|task$|^drill bank|^format/.test(x))].join("; "))],
    ["Task", `<code>${esc(it.key)}</code>`],
  ];
  return `<dl class="pr-why">${rows.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl>`;
}
// School years only: a language's learning years follow from the school year.
// A track's years (DaZ) are not school years either: the DaZ level sets them.
const YEAR_OF = (cur) => { const ly = new Set(Object.values(D.learningYears?.[cur] ?? {})); return [...new Set(D.sets.filter((s) => s.id.startsWith(cur + ".") && !s.track && !ly.has(s.year)).map((s) => s.year))]; };
// The practice index for a child: its curriculum, and its tracks (DaZ) if it has any.
const indexFor = (c) => indexContent(D.sets, D.drills, c.curriculum, c.tracks ?? {});
// The right panel: the open screen's controls (side-ui.js), then the parts of
// the pretend child that matter there (SIDE_PARTS).
function renderPracticeSide() {
  const el = $("#practiceSide"), c = PR.child; if (!el || !c) return;
  const ctx = sideCtx(), P = SIDE_PARTS[ctx] ?? {}, op = (k) => P[k] ? " open" : "";
  el.hidden = false;
  document.body.classList.toggle("on-track", ctx === "study"); document.body.classList.toggle("in-lesson", ctx === "lesson");
  const step = PR.on ? steps[at] : null, it = step?.item;
  const skills = PR.index.sets.filter((s) => s.year === c.year || (s.track && s.year === c.tracks?.[s.track])).map(stateKey);
  const opt = (v, cur, label = v) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(label)}</option>`;
  el.innerHTML = sideTop(ctx) + ("child" in P ? `<details${op("child")}><summary><b>Pretend child</b></summary>
    <div class="pr-grid">
      <label for="pcName">Name</label><input id="pcName" value="${esc(c.name ?? "")}" placeholder="for the greeting" autocomplete="off">
      <label for="pcCur">Curriculum</label><select id="pcCur">${opt("de-DE", c.curriculum)}${opt("en-GB", c.curriculum)}</select>
      <label for="pcYear">Year</label><select id="pcYear">${YEAR_OF(c.curriculum).map((y) => opt(y, c.year, yearName(y))).join("")}</select>
${Object.entries(D.tracks?.[c.curriculum] ?? {}).map(([k, tr]) => `<label for="pcTrack-${k}">${esc(tr.subject.de)} level</label><select id="pcTrack-${k}" data-track="${k}"><option value="">none</option>${tr.years.map((y) => opt(y.id, c.tracks?.[k] ?? "", y.label.de)).join("")}</select>`).join("")}
      <label for="pcBand">Age band</label><select id="pcBand">${["4-5", "6-7", "8-10"].map((b) => opt(b, c.band)).join("")}</select>
      <span>Sessions finished</span><b>${c.sessions}</b>
    </div>
    <p><button class="nbtn" id="pcDemo" title="Progress in every subject, a streak, badges and drill records">Load demo data</button> <button class="nbtn" id="pcReset" title="Back to zero in this curriculum; name and picture stay">Reset to zero</button></p></details>` : "")
    + ("time" in P ? `<details${op("time")}><summary><b>Time machine</b>: day ${c.today}</summary>${timeMachine(c)}</details>` : "")
    + ("search" in P ? `<details${op("search")}><summary><b>Search</b></summary><p class="tm-l">Words match a skill's "I can" line, topic and set title, filler words left out. A whole request ("10 Minuten Einmaleins mit 7") is read by <code>parseRequest</code>, a keyword parser, into subject, topics, skills, minutes and kind, and shows as the Understood card. Later a language model can return the same filters; the card and its Start button stay as they are.</p></details>` : "")
    + ("why" in P ? `<details ${it ? "open" : ""}><summary><b>Why this task</b></summary>${it ? whyBox(it) : `<p class="pr-why empty">Start a session to see why each task was picked.</p>`}</details>` : "")
    + ("skills" in P ? `<details${op("skills")}><summary><b>Skills in ${esc(yearName(c.year))}</b> (${skills.length})</summary><div class="pr-grid" id="pcSkills"></div></details>` : "");
  sideWire(ctx, el);
  const grid = $("#pcSkills");
  if (grid) 
  skills.forEach((k, i) => {
    const s = c.states[k]?.state ?? "not_started", n = nextRecap(c, k);
    const row = document.createElement("div"); row.style.cssText = "grid-column:1/-1;display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;border-top:1px solid #eee;padding-top:4px";
    row.style.gridTemplateColumns = "minmax(0, 1fr)";
    row.innerHTML = `<span title="${esc(k)}">${esc(canDoOf(k))}<br><small>${n ? `recap due day ${n.day}${n.upkeep ? " (upkeep)" : ""}` : ""}${c.lastCheck[k]?.length ? `${n ? " · " : ""}last check: ${c.lastCheck[k].length} tasks kept out` : ""}</small></span>
      <span class="tm-ctl"><select aria-label="State of ${esc(k)}">${STATES.map((x) => opt(x, s)).join("")}</select>
      <span class="tm-check"><button class="nbtn" data-pass="1" title="Take the skill check and pass it: Can do it, and its tasks are kept out of practice">✓</button><button class="nbtn" data-pass="" title="Take the skill check and fail it: Practised">✗</button></span>
      <button class="nbtn" data-up title="Set every skill before this one to can_do">⤒</button></span>`;
    row.querySelector("select").onchange = (e) => { snap(); setState(c, k, e.target.value); logEvent(c, `${k}: set to ${e.target.value} by hand`); saveChild(); refreshPractice(); };
    row.querySelectorAll("[data-pass]").forEach((b) => b.onclick = () => { snap(); takeSkillCheck(k, !!b.dataset.pass); saveChild(); refreshPractice(); });
    row.querySelector("[data-up]").onclick = () => { snap(); skills.slice(0, i).forEach((x) => setState(c, x, "can_do")); logEvent(c, `every skill before ${k} set to can_do`); saveChild(); refreshPractice(); };
    grid.appendChild(row);
  });
  if ("child" in P) {
  $("#pcCur").onchange = (e) => { switchCurriculum(e.target.value); saveChild(); refreshPractice(); };
  $("#pcYear").onchange = (e) => { c.year = e.target.value; const s = D.sets.find((x) => x.year === c.year && x.id.startsWith(c.curriculum + ".")); c.band = ageBand(s?.ages); saveChild(); refreshPractice(); };
  // A track level (DaZ): none leaves the child as it was; a level adds the subject to Study and practice.
  el.querySelectorAll("[data-track]").forEach((x) => x.onchange = () => { const t = { ...(c.tracks ?? {}) }; if (x.value) t[x.dataset.track] = x.value; else delete t[x.dataset.track]; if (Object.keys(t).length) c.tracks = t; else delete c.tracks; saveChild(); refreshPractice(); });
  $("#pcName").onchange = (e) => { c.name = e.target.value.trim().slice(0, 20) || undefined; saveChild(); refreshPractice(); };
  $("#pcBand").onchange = (e) => { c.band = e.target.value; saveChild(); refreshPractice(); };
  $("#pcReset").onclick = () => { resetChild(); saveChild(); refreshPractice(); };
  $("#pcDemo").onclick = () => { loadDemo(); saveChild(); refreshPractice(); };
  }
  if (!("time" in P)) return;
  const toDay = (d) => { if (d == null || d === c.today) return; snap(); c.today = d; saveChild(); refreshPractice(); };
  $("#tmDay").onclick = () => toDay(c.today + 1);
  $("#tmWeek").onclick = () => toDay(c.today + 7);
  $("#tmNext").onclick = () => toDay(nextDueDay(c) > c.today ? nextDueDay(c) : null);
  $("#tmBack").onclick = () => { const h = PR.history?.pop(); if (!h) return; PR.child = JSON.parse(h); saveChild(); PR.on = false; PR.session = null; refreshPractice(); };
  el.querySelectorAll(".tm-cal button").forEach((b) => b.onclick = () => toDay(+b.dataset.day));
  el.querySelectorAll("[data-auto]").forEach((b) => b.onclick = () => autoPlay(b.dataset.auto));
}
// Move the pretend child through time: days, the next recap, a calendar of
// what falls due, a whole session answered for it, and what happened so far.
function timeMachine(c) {
  const next = nextDueDay(c), up = upcoming(c, 27), byDay = {};
  for (const u of up) (byDay[Math.max(u.day, c.today)] ??= []).push(u);
  const cal = Array.from({ length: 28 }, (_, i) => c.today + i).map((d) => {
    const due = byDay[d] ?? [], title = due.map((u) => `${u.kind}: ${canDoOf(u.skill)}`).join("\n") || "nothing due";
    return `<button data-day="${d}" class="${d === c.today ? "now" : ""}" title="Day ${d}\n${esc(title)}"><small>${d}</small>${due.slice(0, 3).map((u) => `<i class="${u.kind}"></i>`).join("")}${due.length > 3 ? "<em>+</em>" : ""}</button>`;
  }).join("");
  const hero = PR.index && suggestions(c, PR.index)[0];
  const log = [...(c.log ?? [])].reverse().slice(0, 40);
  return `<div class="tm-row"><button class="nbtn" id="tmDay">+1 day</button><button class="nbtn" id="tmWeek">+1 week</button>
      <button class="nbtn" id="tmNext"${next > c.today ? "" : " disabled"}>${next > c.today ? `Next recap: day ${next}` : next === c.today ? "A recap is due today" : "No recap planned"}</button>
      <button class="nbtn" id="tmBack"${PR.history?.length ? "" : " disabled"} title="Undo the last change to the child">↶ Rewind${PR.history?.length ? ` (${PR.history.length})` : ""}</button></div>
    <p class="tm-l">Recaps by day, the next four weeks. Tap a day to go there.</p>
    <div class="tm-cal">${cal}</div>
    <p class="tm-key"><i class="recap"></i>recap <i class="refresh"></i>refresh <i class="upkeep"></i>upkeep</p>
    <p class="tm-l">${hero ? `Play the top suggestion for the child (${esc(PT().kinds[hero.kind] ?? hero.kind)}), answering:` : "No suggestion to play."}</p>
    <div class="tm-row"><button class="nbtn" data-auto="right"${hero ? "" : " disabled"}>All right</button><button class="nbtn" data-auto="mixed"${hero ? "" : " disabled"}>Mostly right</button><button class="nbtn" data-auto="wrong"${hero ? "" : " disabled"}>All wrong</button></div>
    <details class="tm-log"><summary>History (${c.log?.length ?? 0})</summary>${log.length ? `<ol>${log.map((e) => `<li><b>Day ${e.day}</b> ${esc(e.text)}</li>`).join("")}</ol>` : "<p>Nothing yet.</p>"}</details>`;
}
function autoPlay(style) {
  const hero = suggestions(PR.child, PR.index)[0]; if (!hero) return;
  const session = buildSession({ kind: hero.kind, child: PR.child, index: PR.index, skills: hero.skills, minutes: hero.kind === "drill" ? 2 : null, rng: Math.random });
  if (!session.items.length) return;
  snap(); applySession(PR.child, session, autoResults(session, style, Math.random), true); saveChild();
  PR.on = false; PR.session = null; refreshPractice();
}
// The skill check of a skill, taken without playing it: a fresh draw from its
// pool is recorded as the last check, and the skill moves to Can do it (pass)
// or Practised (fail).
function takeSkillCheck(k, pass) {
  const set_ = PR.index.bySkill[k]?.set; if (!set_) return;
  let found = null;
  for (const l of set_.lessons) for (const a of l.activities) if (a.activity === "check" && (a.size === "skill" || a.size === "timed")) found = { l, a };
  if (!found) { logEvent(PR.child, `${k}: has no skill check`); return; }
  const last = (PR.child.lastCheck[k] ?? []).map((key) => key.split("#").at(-1));
  const drawn = drawCheck(found.a, { last, rng: Math.random });
  recordCheck(PR.child, k, drawn.map((t) => taskKey(set_.id, found.l.n, t.id)));
  const was = PR.child.states[k]?.state ?? "not_started";
  if (pass && !["can_do", "remembered"].includes(was)) setState(PR.child, k, "can_do");
  if (!pass) setState(PR.child, k, "practised");
  logEvent(PR.child, `${k}: skill check ${pass ? "passed" : "failed"} (${drawn.length} tasks), ${was} → ${PR.child.states[k].state}`);
}

// A drill bank as a map: a grid for number facts, a wall for words, each in
// the colour of how the child did. Tapping facts picks them for a drill.
const MAPTXT = {
  de: { known: "Kann ich", slow: "Noch langsam", miss: "Noch falsch", unseen: "Noch nicht geübt", best: (n) => `Rekord: ${n} pro Minute`, noBest: "Noch kein Rekord", all: "Alle üben", tricky: (n) => `Die kniffligen (${n})`, chosen: (n) => `Nur diese (${n})`, pick: "Tippe Aufgaben an, um nur diese zu üben.", clear: "Auswahl löschen" },
  en: { known: "Know it", slow: "Still slow", miss: "Not yet right", unseen: "Not tried yet", best: (n) => `Record: ${n} a minute`, noBest: "No record yet", all: "Practise them all", tricky: (n) => `The tricky ones (${n})`, chosen: (n) => `Just these (${n})`, pick: "Tap facts to practise just those.", clear: "Clear" },
};
function renderDrillMap(k, sel = new Set()) {
  const L = PT(), M = MAPTXT[PL()], scr = $("#screen"), bank = PR.index.drills[k], d = PR.child.drills[k], m = drillMap(bank, d), colour = colourOf(subjOfSkill(k));
  scr.style.setProperty("--top", colour);
  const de = PR.child.curriculum === "de-DE", sign = (q) => (de ? q.replace("×", "·").replace("÷", ":") : q);
  // A grid cell shows its answer once tried (a division its dividend, so the row reads like the times fact).
  const shown = (x, op) => (x.status === "unseen" ? "" : op === "÷" || op === ":" ? x.label.split(/\s/)[0] : String(x.a));
  const cell = (x, op) => `<button class="dm-c ${x.status}" data-id="${esc(x.id)}" aria-pressed="${sel.has(x.id)}" title="${esc(sign(x.label))}${x.n ? ` · ${x.ok} of ${x.n} right first time` : ""}">${esc(op ? shown(x, op) : x.label)}</button>`;
  const grid = (g, gi) => `<table class="dm-grid"><tr><th>${esc(sign(g.op))}</th>${g.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${g.rows.map((r) => `<tr><th><button class="dm-row" data-g="${gi}" data-row="${esc(r)}">${esc(r)}</button></th>${g.cols.map((c) => `<td>${g.cells[r][c] ? cell(g.cells[r][c], g.op) : ""}</td>`).join("")}</tr>`).join("")}</table>`;
  const body = m.grids.map(grid).join("") + (m.wall.length ? `<div class="dm-wall">${m.wall.map((x) => cell({ ...x, label: sign(x.label) })).join("")}</div>` : "");
  const rates = d?.rates ?? [], top = Math.max(1, ...rates);
  const trickyN = m.counts.miss + m.counts.slow;
  scr.innerHTML = `<div class="status"></div><div class="pr-home pr-page app-page">
    <header class="pr-band" style="--c:${colour}"><button class="pr-back" aria-label="${esc(L.back)}">${CHEVRON}</button>
      <h2>${esc(L.drill)}</h2><small>${esc(canDoOf(k))}</small></header>
    <div class="dm-top"><b>${esc(d?.best ? M.best(d.best) : M.noBest)}</b>${rates.length ? `<span class="dm-spark" aria-hidden="true">${rates.map((r) => `<i style="height:${Math.max(8, (100 * r) / top)}%"></i>`).join("")}</span>` : ""}</div>
    <p class="dm-key">${["known", "slow", "miss", "unseen"].map((s) => `<span><i class="dm-c ${s}"></i>${esc(M[s])} ${m.counts[s]}</span>`).join("")}</p>
    ${body}
    <p class="pr-empty">${esc(M.pick)}${sel.size ? ` <button class="pr-more dm-clear">${esc(M.clear)}</button>` : ""}</p>
    <div class="dm-go">${sel.size ? `<button class="btn" data-go="focus">${esc(M.chosen(sel.size))}</button>` : ""}${trickyN ? `<button class="btn${sel.size ? " light" : ""}" data-go="tricky">${esc(M.tricky(trickyN))}</button>` : ""}<button class="btn${sel.size || trickyN ? " light" : ""}" data-go="all">${esc(M.all)}</button></div></div>`;
  $(".pr-back", scr).onclick = () => renderPracticeHome();
  scr.querySelectorAll(".dm-c[data-id]").forEach((b) => b.onclick = () => { const id = b.dataset.id; sel.has(id) ? sel.delete(id) : sel.add(id); renderDrillMap(k, sel); });
  scr.querySelectorAll(".dm-row").forEach((b) => b.onclick = () => { const g = m.grids[+b.dataset.g], ids = g.cols.map((c) => g.cells[b.dataset.row][c]?.id).filter(Boolean), all = ids.every((id) => sel.has(id)); ids.forEach((id) => (all ? sel.delete(id) : sel.add(id))); renderDrillMap(k, sel); });
  $(".dm-clear", scr)?.addEventListener("click", () => renderDrillMap(k));
  scr.appendChild(appTabs("practice"));
  scr.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => startSession({ kind: "drill", skills: [k], minutes: 2, tricky: b.dataset.go === "tricky", focus: b.dataset.go === "focus" ? [...sel] : null }));
}
function refreshPractice() {
  PR.index = indexFor(PR.child);
  // Redraw the tab the app is on (Start and Me follow the child too).
  const ctx = sideCtx();
  if (ctx === "study") { APP.units ? renderStudy() : renderTrack(); return renderPracticeSide(); }
  if (ctx === "lesson") return renderPracticeSide();
  if (!PR.on) (APP.tab === "start" ? renderHomeTab() : APP.tab === "me" ? renderMe() : APP.tab === "settings" ? renderSettings() : renderPracticeHome());
  renderPracticeSide();
}

// Own session and the games. Own session: a sheet over the dimmed page, where the mascot asks
// and the child taps the skills it has learnt, one subject at a time (several, from several
// subjects, can be picked), what needs practice first; then a screen of its own asks how long
// (5, 10 or 15 minutes) and starts a mixed round, with hints. The games pick for the child:
// Race (a sprint against the clock; the sprints to choose from, or a short round where the
// subject has none), Quiz me (three things learnt, no hints; how long, then go) and Surprise
// (three things learnt, at random; it starts at once). Until the child has learnt something,
// the games wait.
const MKTXT = {
  de: { find: "Suchen: Uhr, Plus, Nomen …", hits: (n) => `${n} gefunden`, noHits: "Nichts gefunden. Probier ein anderes Wort.", what: "Was möchtest du üben?", games: "Spiele zum Üben", types: { race: "Wettlauf", again: "Frag mich ab", surprise: "Wundertüte" }, later: "Nach deiner ersten Lektion", none: "Hier hast du noch nichts gelernt. Mach zuerst eine Lektion!", weakH: "Noch üben", knowH: "Kannst du schon", go: "Los geht's", close: "Schließen", howLong: "Wie lange möchtest du üben?", mins: (n) => `${n} Min.`, subjPractice: (x) => `${x} üben`, mixed: "Gemischt üben" },
  en: { find: "Search: clock, plus, nouns …", hits: (n) => `${n} found`, noHits: "Nothing found. Try another word.", what: "What do you want to practise?", games: "Practice games", types: { race: "Race", again: "Quiz me", surprise: "Surprise" }, later: "After your first lesson", none: "Nothing learnt here yet. Do a lesson first!", weakH: "Needs practice", knowH: "You know these", go: "Let's go", close: "Close", howLong: "How long would you like to practise?", mins: (n) => `${n} min`, subjPractice: (x) => `${x} practice`, mixed: "Mixed practice" },
};
// How the app presents itself to the child's age band, in one place. The youngest pick by
// picture; 8-10 get pictures with short text; the Sekundarstufe I bands (11-13, 14-16, still to
// come) get text first, compact cards and no mascot. A band the player does not know gets the
// 8-10 presentation.
const BAND_UI = {
  "4-5": { pick: "subject", mascot: true, dense: false, words: "young" },
  "6-7": { pick: "subject", mascot: true, dense: false, words: "young" },
  "8-10": { pick: "skill", mascot: true, dense: false, words: "young" },
  "11-13": { pick: "skill", mascot: false, dense: true, words: "older" },
  "14-16": { pick: "skill", mascot: false, dense: true, words: "older" },
};
const bandUI = () => BAND_UI[PR.child?.band] ?? BAND_UI["8-10"];
const MK_PIC = { race: "objects/clock.png", again: "objects/light-bulb.png", surprise: "objects/present.png" };
// The words a skill can be found by: its "I can" line, topic, unit title and subject; and the
// filler words a search leaves out.
const skillHay = (k) => { const s_ = setOfSkill(k), tp = s_?.topic ?? {}; return [canDoOf(k), tp.de, tp.en, s_?.title?.de, s_?.title?.en, SUBJ_NAME[PR.child.curriculum][subjOfSkill(k)]].join(" ").toLowerCase(); };
const STOP = new Set("ich will möchte mag gerne bitte mal noch nochmal üben ueben lernen mit und oder die der das den dem ein eine einen zum zur im in von für minuten minute min i want would like to please practise practice learn some the a an of with and or for minutes minute mins my me".split(" "));
const learnt = (k) => !["not_started", "learning", undefined].includes(PR.child.states[k]?.state);
// What the child has learnt, this year's first, from the subjects it has.
function learntSkills() {
  const yearKs = PR.index.subjects.flatMap((x) => yearSkills(x));
  const allKs = [...new Set([...yearKs, ...PR.index.sets.filter((s_) => offered(s_.id.split(".")[1])).map(stateKey)])];
  return allKs.filter(learnt);
}
const pickRandom = (xs, n) => xs.map((k) => [Math.random(), k]).sort((x, y) => x[0] - y[0]).map(([, k]) => k).slice(0, n);
const gamesOpen = () => { const n = learntSkills().length; return { race: n > 0 || Object.keys(PR.index.drills).length > 0, again: n > 0, surprise: n > 0 }; };
function playGame(t) {
  const K = MKTXT[PL()], known = learntSkills();
  if (t === "race") return Object.keys(PR.index.drills).length ? renderDrills() : startSession({ kind: "mixed", skills: pickRandom(known, 3), minutes: 5 });
  if (t === "again") return openSetup({ title: K.types.again, kind: "review", skills: pickRandom(known, 3) });
  startSession({ kind: "mixed", skills: pickRandom(known, 3), minutes: 10 });
}
// A skill needs practice when it is due a refresh, only practised, or had a wrong answer.
const needsPractice = (k) => ["practised", "needs_refresh"].includes(PR.child.states[k]?.state) || Object.values(PR.child.scores?.[setOfSkill(k)?.id] ?? {}).some((x) => x.right < x.total);
// The search looks through every year of the child's subjects, learnt or not (Own session plays
// with hints). A whole request ("10 Minuten Einmaleins mit 7") is read by parseRequest: its
// subject, topics or skills narrow the hits, its minutes are the length How long starts on, and
// the words it did not understand must match a skill's words. If that finds nothing, every word
// typed is matched instead.
function openMakeSheet(subj) {
  const K = MKTXT[PL()], U = bandUI(), lg = PL(), scr = $("#screen"), subs = appSubjects(), known = learntSkills();
  const every = [...new Set([...known, ...PR.index.sets.filter((s_) => offered(s_.id.split(".")[1])).map(stateKey)])];
  const sug = subjOfSkill(mySuggestions()[0]?.skills[0] ?? "");
  const S = { subj: subs.includes(subj) ? subj : subs.includes(sug) ? sug : subs[0], picked: [], q: "", minutes: null };
  const scrim = document.createElement("div"); scrim.className = "mk-scrim";
  const m = document.createElement("div"); m.className = `sheet menu-sheet pr-sheet mk-sheet${U.dense ? " mk-dense" : ""}`; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
  const close = () => { scrim.remove(); m.remove(); };
  const name = (x) => SUBJ_NAME[PR.child.curriculum][x] ?? x;
  const words = (q, skip = []) => q.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w) && !skip.includes(w));
  const found = () => {
    const r = parseRequest(S.q, PR.index), f = r.filters, got = r.understood.join(" ").toLowerCase().split(/\s+/);
    S.minutes = f.minutes ?? null;
    const named = f.skills ?? (f.topics ? PR.index.topics.filter((t) => f.topics.includes(t.key)).flatMap((t) => t.skills) : null);
    const sj = f.subject && offered(f.subject) ? f.subject : null, ws = words(S.q, got);
    const hits = every.filter((k) => (!named || named.includes(k)) && (!sj || subjOfSkill(k) === sj) && ws.every((w) => skillHay(k).includes(w)));
    const all = words(S.q);
    return hits.length || !all.length ? hits : every.filter((k) => all.every((w) => skillHay(k).includes(w)));
  };
  // A skill: a stripe in its subject's colour, the unit and its topic, the stars; tinted once picked.
  // From the first pick on, every row shows a round box to tick, so the others read as pickable too.
  const row = (k) => `<button data-k="${esc(k)}" aria-pressed="${S.picked.includes(k)}" style="--c:${colourOf(subjOfSkill(k))}"><span><b>${esc(setOfSkill(k)?.title?.[lg] ?? canDoOf(k))}</b><small>${esc(setOfSkill(k)?.topic?.[lg] ?? "")}</small></span>${starsOf3(k)}<i class="mk-tick" aria-hidden="true">${TICK}</i></button>`;
  const sec = (h, ks) => ks.length ? `<h4 class="mk-sec">${esc(h)}</h4><div class="mk-list">${ks.slice(0, 30).map(row).join("")}</div>` : "";
  // The top (the question and the search) is drawn once, so typing keeps its place; the rest
  // (subjects, skills, Let's go) again on every change. While searching, the hits come from
  // every subject, so the subject chips step aside.
  m.innerHTML = `<div class="mk-head"><i class="mk-grab" aria-hidden="true"></i><button class="pr-x" aria-label="${esc(K.close)}">${ICON.close}</button></div>
    <div class="mk-ask">${U.mascot ? `<img src="${A}mascot/practise-1.png" alt="">` : ""}<p>${esc(K.what)}</p></div>
    <label class="pr-search mk-find">${LENS}<input type="search" placeholder="${esc(K.find)}" aria-label="${esc(K.find)}" autocomplete="off" enterkeyhint="search"></label>
    <div class="mk-live"></div>`;
  const live = $(".mk-live", m);
  const draw = () => {
    const y = live.querySelector(".mk-body")?.scrollTop ?? 0, q = S.q.trim();
    const n = (x) => S.picked.filter((k) => subjOfSkill(k) === x).length;
    const was = m.classList.contains("mk-selecting");
    m.classList.toggle("mk-selecting", S.picked.length > 0); m.classList.toggle("mk-began", !was && S.picked.length > 0);
    let body;
    if (q) { const hits = found(); body = `<p class="mk-count">${esc(K.hits(hits.length))}</p>${hits.length ? `<div class="mk-list">${hits.slice(0, 40).map(row).join("")}</div>` : `<p class="pr-empty">${esc(K.noHits)}</p>`}`; }
    else { const ks = known.filter((k) => subjOfSkill(k) === S.subj); body = sec(K.weakH, ks.filter(needsPractice)) + sec(K.knowH, ks.filter((k) => !needsPractice(k))) || `<p class="pr-empty">${esc(K.none)}</p>`; }
    live.innerHTML = `${q ? "" : `<div class="mk-subj">${subs.map((x) => `<button data-fs="${x}" aria-pressed="${S.subj === x}" style="--c:${colourOf(x)}">${esc(name(x))}${n(x) ? `<em>${n(x)}</em>` : ""}</button>`).join("")}</div>`}
      <div class="mk-body">${body}</div>
      <div class="mk-foot"><button class="btn mk-go"${S.picked.length ? "" : " disabled"}>${esc(K.go)}</button></div>`;
    $(".mk-body", live).scrollTop = y;
    live.querySelectorAll("[data-fs]").forEach((b) => b.onclick = () => { S.subj = b.dataset.fs; draw(); $(".mk-body", live).scrollTop = 0; });
    live.querySelectorAll("[data-k]").forEach((b) => b.onclick = () => { const k = b.dataset.k; S.picked = S.picked.includes(k) ? S.picked.filter((x) => x !== k) : [...S.picked, k]; draw(); });
    $(".mk-go", live).onclick = () => {
      const ss = [...new Set(S.picked.map(subjOfSkill))];
      close(); openSetup({ title: ss.length === 1 ? K.subjPractice(name(ss[0])) : K.mixed, kind: "mixed", skills: S.picked, len: [5, 10, 15].includes(S.minutes) ? S.minutes : 10 });
    };
  };
  $(".pr-x", m).onclick = close;
  $(".mk-find input", m).oninput = (e) => { S.q = e.target.value; draw(); $(".mk-body", live).scrollTop = 0; };
  scrim.onclick = close;
  scr.append(scrim, m); draw();
}
// How long: a screen over the app with the session's name and a way out on top, the mascot, the
// question, 5, 10 or 15 minutes (10 to start with), and one big button.
function openSetup({ title, kind, skills, len = 10 }) {
  const K = MKTXT[PL()], scr = $("#screen"), S = { len };
  const v = document.createElement("div"); v.className = "ps-setup"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true"); v.setAttribute("aria-label", title);
  const draw = () => {
    v.innerHTML = `<header><b>${esc(title)}</b><button class="pr-x" aria-label="${esc(K.close)}">${ICON.close}</button></header><i class="ps-meter" aria-hidden="true"></i>
      <div class="ps-mid">${bandUI().mascot ? `<img src="${A}mascot/practise-3.png" alt="">` : ""}<h2>${esc(K.howLong)}</h2>
        <div class="ps-len" role="radiogroup" aria-label="${esc(K.howLong)}">${[5, 10, 15].map((n) => `<button role="radio" data-len="${n}" aria-checked="${S.len === n}">${esc(K.mins(n))}</button>`).join("")}</div></div>
      <button class="btn ps-go">${esc(K.go)}</button>`;
    $(".pr-x", v).onclick = () => v.remove();
    v.querySelectorAll("[data-len]").forEach((b) => b.onclick = () => { S.len = +b.dataset.len; draw(); });
    $(".ps-go", v).onclick = () => { v.remove(); startSession({ kind, skills, minutes: S.len }); };
  };
  draw(); scr.append(v); $(".ps-go", v).focus();
}
