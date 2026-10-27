/* ---------- Practice tab (twist/docs/practice.md) ----------
   The phone shows the Practice tab as the child sees it; the side panel holds
   the pretend child and why each task was picked. Rules are in
   practice-rules.mjs, inlined above this file by build.mjs. */
const PR = { on: false, home: false, child: null, index: null, session: null, items: [], res: [], shownAt: 0, saved: null };
const PTXT = {
  de: { hello: "Hallo! Was üben wir heute?", helloSub: "Was üben wir heute?", subjectsPractice: "Ein Fach üben", doneTitle: "Übungsrunden geschafft", size: (n, m) => `${n} Aufgaben, etwa ${m} Minuten`, drillSize: (m) => `${m} Minuten, so schnell du kannst`, subjects: "Deine Fächer", stars: (a, b) => `${a} von ${b} Sternen`, practise: "Üben", back: "Zurück", allYears: "Alle Klassen", myYear: "Nur meine Klasse", skillsN: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} zum Üben`, reviewTopic: "Ganzes Thema wiederholen", noneHere: "Hier gibt es in deiner Klasse nichts. Tippe auf Alle Klassen.", found: (n) => `${n} gefunden`, noHits: "Nichts gefunden. Versuch ein anderes Wort.", gSubject: "Fach", gTopic: "Thema", gTime: "Wie lange?", gKind: "Wie?", understood: (ws) => `Verstanden: ${ws.join(", ")}`, title: "Üben", suggested: "Für dich", search: "Suchen: Einmaleins, Plus, Wörter …", browse: "Alles zum Üben", drill: "Sprint", start: "Los geht's", make: "Selbst zusammenstellen", ask: "Was möchtest du üben?", read: "Verstehen", none: "Das habe ich nicht verstanden. Wähle unten aus.", minutes: "Minuten", kinds: { mixed: "Gemischt", drill: "Sprint", review: "Wiederholen", "catch-up": "Nachholen", skill: "Gezielt üben", recaps: "Weißt du es noch?" }, right: (n) => `${n} richtig!`, rightOf: (r, n) => `${r} von ${n} richtig!`, done: "Fertig", askPh: "z. B. „10 Minuten Einmaleins“", examples: ["10 Minuten Einmaleins mit 7", "Plus und Minus wiederholen", "Wörter schnell lesen"], understoodT: "Verstanden", startThis: "Das üben", skillsFound: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} zum Üben`, own: "Eigene Runde", ownSub: "Wähle selbst, wie und was du übst", moreTopics: (n) => `+ ${n} mehr`, fewer: "Weniger", kindDesc: { mixed: "Aufgaben aus allen gewählten Themen", drill: "Schnelle Aufgaben gegen die Uhr", review: "Ohne Tipps, wie eine kleine Probe", "catch-up": "Mit Tipps, Schritt für Schritt" }, tasksFrom: (n, t) => `${n} Aufgaben aus ${t} ${t === 1 ? "Thema" : "Themen"}`, minsShort: (m) => `${m} Min`, beeBar: (a, b) => `${a} von ${b} bis zum Fleißigen Bienchen`, beeUp: "Neues Abzeichen: Fleißiges Bienchen!", whole: "Alles", drills: "Sprints", drillsSub: "Schnell rechnen und lesen, gegen die Uhr", allDrills: "Alle Sprints", notTried: "Noch nicht gespielt", hearAgain: "Nochmal hören", colourN: "Farbe", recapNow: (n) => `${n} ${n === 1 ? "Sache" : "Sachen"} auffrischen`, firstOf: (r, n) => `${r} von ${n} beim ersten Versuch richtig`, better: "Besser geworden:", perMin: (n) => `${n} pro Minute`, record: (n) => `Neuer Rekord: ${n} pro Minute!`, back: "Zurück zum Üben", again: "Nochmal" },
  en: { hello: "Hi! What shall we practise today?", helloSub: "What shall we practise today?", subjectsPractice: "Practise a subject", doneTitle: "Practice sessions finished", size: (n, m) => `${n} tasks, about ${m} minutes`, drillSize: (m) => `${m} minutes, as fast as you can`, subjects: "Your subjects", stars: (a, b) => `${a} of ${b} stars`, practise: "Practise", back: "Back", allYears: "All years", myYear: "Just my year", skillsN: (n) => `${n} ${n === 1 ? "thing" : "things"} to practise`, reviewTopic: "Review the whole topic", noneHere: "Nothing here for your year. Tap All years.", found: (n) => `${n} found`, noHits: "Nothing found. Try another word.", gSubject: "Subject", gTopic: "Topic", gTime: "How long?", gKind: "How?", understood: (ws) => `Understood: ${ws.join(", ")}`, title: "Practice", suggested: "Suggested for you", search: "Search: times tables, adding, words …", browse: "Everything to practise", drill: "Drill", start: "Start", make: "Make my own", ask: "What do you want to practise?", read: "Read it", none: "I didn't understand that. Pick below.", minutes: "minutes", kinds: { mixed: "Mixed", drill: "Drill", review: "Review", "catch-up": "Catch up", skill: "Skill practice", recaps: "Do you remember?" }, right: (n) => `${n} right!`, rightOf: (r, n) => `${r} of ${n} right!`, done: "Done", askPh: "e.g. “10 minutes of times tables”", examples: ["10 minutes of the 7 times table", "Review adding and subtracting", "Read words quickly"], understoodT: "Understood", startThis: "Practise this", skillsFound: (n) => `${n} ${n === 1 ? "thing" : "things"} to practise`, own: "Make my own", ownSub: "Choose how and what to practise", moreTopics: (n) => `+ ${n} more`, fewer: "Fewer", kindDesc: { mixed: "Tasks from every topic you picked", drill: "Quick tasks against the clock", review: "No hints, like a little test", "catch-up": "With hints, step by step" }, tasksFrom: (n, t) => `${n} tasks from ${t} ${t === 1 ? "topic" : "topics"}`, minsShort: (m) => `${m} min`, beeBar: (a, b) => `${a} of ${b} to the Busy Bee`, beeUp: "New badge: Busy Bee!", whole: "Everything", drills: "Drills", drillsSub: "Quick maths and reading, against the clock", allDrills: "All drills", notTried: "Not played yet", hearAgain: "Hear it again", colourN: "Colour", recapNow: (n) => `Refresh ${n} ${n === 1 ? "skill" : "skills"}`, firstOf: (r, n) => `${r} of ${n} right first time`, better: "You got better at:", perMin: (n) => `${n} a minute`, record: (n) => `New record: ${n} a minute!`, back: "Back to practice", again: "Again" },
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

// The Practice home: one large suggestion in its subject's colour, two smaller
// ones, search, and the child's subjects with their stars.
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
// A recap's size with how many topics it covers ("12 tasks from 4 topics, about 5 minutes").
function sizeLine(card) {
  const L = PT(), b = BANDS[PR.child.band];
  if (card.kind !== "recaps" || card.paused) return sizeOf(card);
  const ks = card.skills.slice(0, Math.floor(b.tasks / b.recapTasks)), t = new Set(ks.map((k) => setOfSkill(k)?.topic?.[PL()])).size, n = ks.length * b.recapTasks;
  return `${L.tasksFrom(n, t)}, ${L.size(n, Math.max(2, Math.round(n * 0.4))).split(", ")[1]}`;
}
const CHEVRON = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const LENS = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

function renderPracticeHome() {
  appChild();
  const L = PT(), lg = PL(), scr = $("#screen");
  const cards = mySuggestions().slice(0, 3);
  const bee = busyBee(PR.child.sessions);
  scr.style.setProperty("--subj", "#6849dd"); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page">
    <header class="pg-top fun-band" style="--room:${ROOM.practice}"><div><h2>${esc(AT().practice)}</h2><small>${esc(L.helloSub)}</small></div><img src="${A}mascot/practise-1.png" alt=""></header>
    <div id="prMain">
      ${cards.length ? `<h3 class="pr-h">${esc(L.suggested)}</h3>${cards.length > 1 ? deckOf(cards.map(card)) : card(cards[0])}` : ""}
      <div id="prList"></div>
      ${Object.keys(PR.index.drills).length ? `<button class="pr-sprints" id="prAllDr"><i>${KIND_ICON.drill}</i><span><b>${esc(L.drills)}</b><small>${esc(L.drillsSub)}</small></span>${CHEVRON}</button>` : ""}
      ${bee.next && bee.next - PR.child.sessions <= 3 ? beeStrip() : ""}
    </div></div>`;
  // Choose my own floats over the page, above the tabs: wide with its name at first, a round "+" once the page scrolls.
  const fab = document.createElement("button"); fab.className = "pr-own-fab"; fab.id = "prOwn";
  fab.setAttribute("aria-label", `${L.own}: ${L.ownSub}`);
  fab.innerHTML = `<span class="pr-own-fab-i" aria-hidden="true">+</span><b>${esc(L.own)}</b>`;
  scr.append(fab, appTabs("practice"));
  const pg = $(".app-page", scr); pg.addEventListener("scroll", () => fab.classList.toggle("mini", pg.scrollTop > 40), { passive: true });
  wireHeader(scr); wireRow(scr);
  scr.querySelectorAll("[data-card]").forEach((b) => b.onclick = () => { const c = cards[+b.dataset.card]; if (c.paused) return resumeSession(); PR.assignedId = c.assigned ?? null; startSession({ kind: c.kind, skills: c.skills, minutes: c.minutes ?? (c.kind === "drill" ? 2 : null) }); });
  $("#prOwn").onclick = () => openMakeSheet();
  $("#prAllDr")?.addEventListener("click", () => renderDrills());
  renderSubjects();
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

// The subjects as cards in a row that slides sideways: the subject's object, its name, the topic
// the child is at, and a bar of its units done; a tap opens that subject's practice by topic.
function subjCard(x) {
  const lg = PL(), sets = courseSets(x), done = sets.filter((s_) => lessonsDone(s_) >= s_.lessons.length).length, at = nextIn(sets) ?? sets.at(-1);
  const pct = sets.length ? (100 * done) / sets.length : 0;
  return `<button class="ps-card" data-subj="${esc(x)}" style="--c:${colourOf(x)}"><img src="${A}objects/${subjObject(x)}.png" alt=""><small>${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</small><b>${esc(at?.topic?.[lg] ?? at?.title?.[lg] ?? "")}</b><i class="ps-bar" aria-label="${esc(AT().unitsOf(done, sets.length))}"><i style="width:${pct}%"></i></i></button>`;
}
function renderSubjects() {
  const L = PT(), el = $("#prList");
  el.innerHTML = `<h3 class="pr-h">${esc(L.subjectsPractice)}</h3><div class="ps-row scroll-fade">${appSubjects().map(subjCard).join("")}</div>`;
  scrollFades(el);
  el.querySelectorAll("[data-subj]").forEach((b) => b.onclick = () => renderSubject(b.dataset.subj));
}
// What kind of practice a card is, as a small icon in the subject colour.
const KIND_ICON = {
  recaps: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.1-5M19 4.5V8h-3.5"/></svg>',
  "catch-up": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6M6.5 11.5L12 6l5.5 5.5"/></svg>',
  drill: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3L5.5 13.5H12L11 21l7.5-10.5H12z"/></svg>',
  review: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="2"/><path d="M7.5 5h9"/></svg>',
  skill: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/></svg>',
  mixed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3.5l9 10H20M4 17h3.5l2.5-2.8M14 9.8L16.5 7H20M17.5 4.5L20 7l-2.5 2.5M17.5 14.5L20 17l-2.5 2.5"/></svg>',
};

// A skill: its "I can" line, its stars, and what the child can start.
function skillRow(k, withSubject = false) {
  const L = PT(), row = document.createElement("div"); row.className = "pr-skill"; row.style.setProperty("--c", colourOf(subjOfSkill(k)));
  const n = STARS[PR.child.states[k]?.state ?? "not_started"], refresh = PR.child.states[k]?.state === "needs_refresh";
  row.innerHTML = `<span class="pr-skill-t">${withSubject ? `<small>${esc(SUBJ_NAME[PR.child.curriculum][subjOfSkill(k)] ?? "")}</small>` : ""}${esc(canDoOf(k))}</span>
    <span class="pr-stars" aria-label="${n} / 3">${[1, 2, 3].map((i) => `<i class="${i <= n ? "on" : ""}">★</i>`).join("")}${refresh ? '<em title="refresh">↻</em>' : ""}</span>
    <span class="pr-acts"><button class="pr-play">${esc(L.practise)}</button>${PR.index.drills[k] ? `<button class="pr-drill">${esc(L.drill)}</button>` : ""}</span>`;
  row.querySelector(".pr-play").onclick = () => startSession({ kind: ["practised", "needs_refresh"].includes(PR.child.states[k]?.state) ? "catch-up" : "skill", skills: [k] });
  row.querySelector(".pr-drill")?.addEventListener("click", () => renderDrillMap(k));
  return row;
}

function ring(got, max, colour) {
  const r = 15, c = 2 * Math.PI * r, f = max ? got / max : 0;
  return `<svg class="pr-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="${r}" fill="none" stroke="#ececec" stroke-width="6"/>
    <circle cx="20" cy="20" r="${r}" fill="none" stroke="${colour}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(f * c).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 20 20)"/></svg>`;
}

function renderSubject(subj, allYears = false) {
  const L = PT(), lg = PL(), scr = $("#screen"), colour = colourOf(subj);
  scr.style.setProperty("--top", colour);
  const topics = PR.index.topics.filter((t) => t.subject === subj)
    .map((t) => ({ ...t, skills: allYears ? t.skills : t.skills.filter((k) => setOfSkill(k)?.year === PR.child.year) }))
    .filter((t) => t.skills.length);
  scr.innerHTML = `<div class="status"></div><div class="pr-home pr-page app-page">
    <header class="pr-band" style="--c:${colour}"><button class="pr-back" aria-label="${esc(L.back)}">${CHEVRON}</button>
      <h2>${esc(SUBJ_NAME[PR.child.curriculum][subj] ?? subj)}</h2><small>${esc(allYears ? L.allYears : yearName(PR.child.year))}</small></header>
    <div id="prTopics"></div>
    <button class="pr-more">${esc(allYears ? L.myYear : L.allYears)}</button></div>`;
  $(".pr-back", scr).onclick = () => renderPracticeHome();
  $(".pr-more", scr).onclick = () => renderSubject(subj, !allYears);
  const box = $("#prTopics", scr);
  for (const t of topics) {
    const d = document.createElement("details"); d.className = "pr-topic";
    const got = starCount(t.skills), max = t.skills.length * 3;
    const drills = t.skills.filter((k) => PR.index.drills[k]).length;
    d.innerHTML = `<summary>${ring(got, max, colour)}<span><b>${esc(t.name[lg] ?? t.name.en)}</b><small>${esc(L.skillsN(t.skills.length))}${drills ? ` · <em class="pr-dchip">${esc(L.drill)}</em>` : ""}</small></span>${CHEVRON}</summary>`;
    const review = document.createElement("button"); review.className = "pr-review"; review.textContent = L.reviewTopic;
    review.onclick = () => startSession({ kind: "review", skills: t.skills });
    if (t.skills.length > 1) d.appendChild(review);
    t.skills.forEach((k) => d.appendChild(skillRow(k)));
    box.appendChild(d);
  }
  if (!topics.length) box.innerHTML = `<p class="pr-empty">${esc(L.noneHere)}</p>`;
  scr.appendChild(appTabs("practice"));
}

// Filler words a search for skills leaves out (Choose my own, step 2).
const STOP = new Set("ich will möchte mag gerne bitte mal noch nochmal üben ueben lernen mit und oder die der das den dem ein eine einen zum zur im in von für minuten minute min i want would like to please practise practice learn some the a an of with and or for minutes minute mins my me".split(" "));
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

// Choose my own, for children of 6 to 8 first: the page dims and the sheet covers most of the
// screen; the mascot asks and the child answers with big picture cards. Step 1, how (a tap goes on):
// Schnell! (a race against the clock: a sprint where the subject has a drill bank, else a short
// mixed round), Wundertüte (three skills the child has learnt, at random; it starts at once)
// or Frag mich ab! / Quiz me! (a review, without hints, of something learnt). Step 2, what: up to 7 a subject by
// its picture, and the app picks the skills; from 8 the search, topic words and the skills, with
// one big button at the bottom. All existing session kinds of practice-rules.mjs.
const MKTXT = {
  de: { how: "Wie willst du üben?", what: "Was willst du üben?", whatSubj: "Welches Fach?", types: { race: ["Schnell!", "2 Minuten gegen die Uhr"], surprise: ["Wundertüte!", "Twist sucht 3 Sachen aus, die du kannst"], again: ["Frag mich ab!", "Was du gelernt hast, ohne Tipps"], mine: ["Selbst aussuchen", "Du wählst, was du übst"] },
    older: { how: "Wie willst du üben?", types: { race: ["Auf Zeit", "Ein Sprint gegen die Uhr"], surprise: ["Zufall", "Drei Fähigkeiten, die du schon kannst"], again: ["Wiederholen", "Ohne Tipps, wie ein kurzer Test"], mine: ["Eigene Auswahl", "Wähle die Fähigkeiten selbst, mit Tipps"] } },
    find: "Suchen: Uhr, Plus, Nomen …", ideas: "Vorschläge", hits: (n) => `${n} gefunden`, none: "Nichts gefunden. Probier ein anderes Wort.", all: "Alle", tapYours: "Tippe an, was du üben willst. Mehrere gehen auch!", pickFirst: "Wähle etwas aus", goN: (n) => n === 1 ? "Das üben" : `Diese ${n} üben`, weakH: "Noch üben", knowH: "Kannst du schon", time: "Zeit", mins: (n) => `${n} Min.`, hints: "Mit Tipps", later: "Nach deiner ersten Lektion", go: "Los geht's", back: "Zurück", close: "Schließen" },
  en: { how: "How do you want to practise?", what: "What do you want to practise?", whatSubj: "Which subject?", types: { race: ["Race!", "2 minutes against the clock"], surprise: ["Surprise!", "Twist picks 3 things you know"], again: ["Quiz me!", "What you've learnt, no hints"], mine: ["Pick my own", "You choose what to practise"] },
    older: { how: "How do you want to practise?", types: { race: ["Timed", "A sprint against the clock"], surprise: ["Random", "Three skills you already know"], again: ["Review", "No hints, like a short test"], mine: ["Custom", "Pick the skills yourself, with hints"] } },
    find: "Search: clock, plus, nouns …", ideas: "Ideas for you", hits: (n) => `${n} found`, none: "Nothing found. Try another word.", all: "All", tapYours: "Tap what you want to practise. You can pick more than one!", pickFirst: "Pick something first", goN: (n) => n === 1 ? "Practise this" : `Practise these ${n}`, weakH: "Needs practice", knowH: "You know these", time: "Time", mins: (n) => `${n} min`, hints: "Hints", later: "After your first lesson", go: "Let's go", back: "Back", close: "Close" },
};
// How the app presents itself to the child's age band, in one place. The youngest pick by
// picture; 8-10 get pictures with short text and the search; the Sekundarstufe I bands (11-13,
// 14-16, still to come) get text first, compact cards and no mascot. A band the player does not
// know gets the 8-10 presentation.
const BAND_UI = {
  "4-5": { pick: "subject", mascot: true, dense: false, words: "young" },
  "6-7": { pick: "subject", mascot: true, dense: false, words: "young" },
  "8-10": { pick: "skill", mascot: true, dense: false, words: "young" },
  "11-13": { pick: "skill", mascot: false, dense: true, words: "older" },
  "14-16": { pick: "skill", mascot: false, dense: true, words: "older" },
};
const bandUI = () => BAND_UI[PR.child?.band] ?? BAND_UI["8-10"];
const MK_PIC = { race: "mascot/topic-time.png", surprise: "objects/present.png", again: "mascot/learn-2.png", mine: "mascot/practise-3.png" };
// The words a skill can be found by: its "I can" line, topic, unit title and subject.
const skillHay = (k) => { const s_ = setOfSkill(k), tp = s_?.topic ?? {}; return [canDoOf(k), tp.de, tp.en, s_?.title?.de, s_?.title?.en, SUBJ_NAME[PR.child.curriculum][subjOfSkill(k)]].join(" ").toLowerCase(); };
const learnt = (k) => !["not_started", "learning", undefined].includes(PR.child.states[k]?.state);
function openMakeSheet() {
  const U = bandUI(), K0 = MKTXT[PL()], K = U.words === "older" ? { ...K0, ...K0.older } : K0, lg = PL(), scr = $("#screen"), young = U.pick === "subject";
  const scrim = document.createElement("div"); scrim.className = "mk-scrim";
  const m = document.createElement("div"); m.className = `sheet menu-sheet pr-sheet mk-sheet${U.dense ? " mk-dense" : ""}`; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
  // This year's skills first; the search reaches every year of the subjects the child has.
  const yearKs = PR.index.subjects.flatMap((x) => yearSkills(x)), drills = drillsForYear();
  const allKs = [...new Set([...yearKs, ...PR.index.sets.filter((s_) => offered(s_.id.split(".")[1])).map(stateKey)])];
  const allDrills = allKs.filter((k) => PR.index.drills[k]);
  // A sprint the child can race: one played before or on a skill begun, this year's first.
  const raceable = [...new Set([...drills, ...allDrills])].filter((k) => PR.child.drills[k] || (PR.child.states[k]?.state ?? "not_started") !== "not_started");
  const known = allKs.filter(learnt);
  const S = { step: 1, type: null, subj: null, q: "", fsubj: "all", picked: [], minutes: null, len: 10, hints: true };
  const close = () => { scrim.remove(); m.remove(); };
  const rand = (xs, n) => xs.map((k) => [Math.random(), k]).sort((x, y) => x[0] - y[0]).map(([, k]) => k).slice(0, n);
  const ofSubj = (ks, x) => ks.filter((k) => subjOfSkill(k) === x);
  // What a type plays from a subject, when the app picks: only what the child has learnt, a
  // race on a sprint they can do, else a short mixed round of learnt skills. Empty: not offered.
  const skillsFor = (type, x) => {
    const mine = x ? ofSubj(known, x) : known;
    if (type === "race") { const d = x ? ofSubj(raceable, x) : raceable; return d.length ? [d[0]] : rand(mine, 3); }
    return rand(mine, 3);
  };
  const can = (type) => type === "race" ? raceable.length || known.length : known.length;
  const start = (type, skills, subj) => {
    close();
    if (type === "race") return PR.index.drills[skills[0]] && skills.length === 1 ? startSession({ kind: "drill", skills, minutes: 2 }) : startSession({ kind: "mixed", skills, minutes: S.minutes ?? 5 });
    // A review has no hints, so only for skills learnt; something found but not learnt yet is practised with them.
    if (type === "again") return startSession({ kind: skills.every(learnt) ? "review" : "mixed", skills, minutes: S.minutes ?? 10 });
    if (type === "mine") return startSession({ kind: S.hints || !skills.every(learnt) ? "mixed" : "review", skills, minutes: S.minutes ?? S.len });
    return startSession({ kind: "mixed", skills: rand(known, 3), minutes: 10 });
  };
  // Without a search, the ideas: what the type can play from this year first. With one, every year.
  const pool = () => S.q.trim() ? (S.type === "race" ? allDrills : allKs)
    : S.type === "race" ? raceable : [...known.filter((k) => yearKs.includes(k)), ...known.filter((k) => !yearKs.includes(k))];
  const words = () => { const seen = new Set(); for (const k of pool()) { const t = setOfSkill(k)?.topic?.[lg] ?? ""; const w = t.split(/\s+/).find((x) => x.length > 2 && !STOP.has(x.toLowerCase()) && !/^\d/.test(x)); if (w && seen.size < 10) seen.add(w); } return [...seen]; };
  // A whole request ("10 Minuten Einmaleins mit 7") is read by parseRequest; the words it did not
  // understand must match a skill's "I can" line, topic, set title or subject.
  const shown = () => {
    const r = S.q.trim() ? parseRequest(S.q, PR.index) : { filters: {}, understood: [] }, f = r.filters, got = r.understood.join(" ").toLowerCase();
    S.minutes = f.minutes ?? null;
    const ws = S.q.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w && !STOP.has(w) && !got.split(/\s+/).includes(w) && !/^\d+$/.test(w));
    // Topics and subjects the child does not have (French before Year 3) are left out; if what
    // was understood finds nothing, every typed word is matched against the skills instead.
    const named = f.skills ?? (f.topics ? PR.index.topics.filter((t) => f.topics.includes(t.key) && offered(t.subject)).flatMap((t) => t.skills) : null);
    const subj = f.subject && offered(f.subject) ? f.subject : null, inFilter = (k) => S.fsubj === "all" || subjOfSkill(k) === S.fsubj;
    const hits = pool().filter((k) => (!named || named.includes(k)) && (!subj || subjOfSkill(k) === subj) && inFilter(k) && ws.every((w) => skillHay(k).includes(w)));
    if (hits.length || !S.q.trim()) return hits;
    const all = S.q.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w));
    return all.length ? pool().filter((k) => inFilter(k) && all.every((w) => skillHay(k).includes(w))) : hits;
  };
  // Up to 7 a subject is picked by its picture and the app picks the skills, except in Pick my
  // own: there every child taps the skills, the youngest with pictures and no search.
  const draw = () => {
    const bySubj = young && S.type !== "mine";
    const q = S.step === 1 ? K.how : bySubj ? K.whatSubj : K.what;
    let body = "", foot = "";
    // A skill card; the youngest see the topic's mascot.
    // A box to tick where several can be picked; a race takes one, so a round dot.
    const card = (k) => `<button data-k="${esc(k)}" aria-pressed="${S.picked.includes(k)}" style="--c:${colourOf(subjOfSkill(k))}">${young ? `<img src="${A}mascot/${setOfSkill(k)?.pose ?? "practise-2"}.png" alt="">` : ""}<span><b>${esc(setOfSkill(k)?.title?.[lg] ?? canDoOf(k))}</b><small>${esc(setOfSkill(k)?.topic?.[lg] ?? "")}</small></span>${starsOf3(k)}<i class="mk-pick${S.type === "race" ? " one" : ""}" aria-hidden="true">${TICK}</i></button>`;
    const subjChips = () => `<div class="mk-subj"><button data-fs="all" aria-pressed="${S.fsubj === "all"}">${esc(K.all)}</button>${PR.index.subjects.filter((x) => pool().some((k) => subjOfSkill(k) === x)).map((x) => `<button data-fs="${x}" aria-pressed="${S.fsubj === x}" style="--c:${colourOf(x)}">${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</button>`).join("")}</div>`;
    const find = `<label class="pr-search mk-find">${LENS}<input type="search" value="${esc(S.q)}" placeholder="${esc(K.find)}" autocomplete="off" enterkeyhint="search"></label>`;
    if (S.step === 2 && S.type === "mine") {
      // Pick my own: the search, the subjects, then what needs practice first and what the child
      // knows; a search shows its hits from every year. Below, the time and hints, then go.
      const list = shown(), weak = (k) => ["practised", "needs_refresh"].includes(PR.child.states[k]?.state) || Object.values(PR.child.scores?.[setOfSkill(k)?.id] ?? {}).some((x) => x.right < x.total);
      const sec = (h, ks) => ks.length ? `<h4 class="mk-sec">${esc(h)}</h4><div class="mk-list${young ? " mk-pics" : ""}">${ks.slice(0, 30).map(card).join("")}</div>` : "";
      body = `${find}${subjChips()}${S.q ? "" : `<p class="mk-count mk-tap">${esc(K.tapYours)}</p>`}${S.q ? `<p class="mk-count">${esc(K.hits(list.length))}</p><div class="mk-list${young ? " mk-pics" : ""}">${list.slice(0, 40).map(card).join("") || `<p class="pr-empty">${esc(K.none)}</p>`}</div>`
        : sec(K.weakH, list.filter(weak)) + sec(K.knowH, list.filter((k) => !weak(k))) || `<p class="pr-empty">${esc(K.none)}</p>`}`;
      const len = S.minutes ?? S.len;
      foot = `<div class="mk-opts"><span class="mk-len" role="radiogroup" aria-label="${esc(K.time)}">${[5, 10, 15].map((n) => `<button role="radio" data-len="${n}" aria-checked="${len === n}">${esc(K.mins(n))}</button>`).join("")}</span>
        <label class="mk-hints"><input type="checkbox"${S.hints ? " checked" : ""}><i aria-hidden="true"></i>${esc(K.hints)}</label></div>`;
    } else if (S.step === 1) body = `<div class="mk-big">${Object.entries(K.types).map(([t, [name, sub]]) => `<button data-t="${t}" aria-pressed="${S.type === t}"${can(t) ? "" : " disabled"}><img src="${A}${MK_PIC[t]}" alt=""><span><b>${esc(name)}</b><small>${esc(can(t) ? sub : K.later)}</small></span><i class="mk-goi" aria-hidden="true">${can(t) ? ARROW : LOCK}</i></button>`).join("")}</div>`;
    else if (bySubj) body = `<div class="mk-subjs">${PR.index.subjects.filter((x) => skillsFor(S.type, x).length).map((x) => `<button data-s="${x}" aria-pressed="${S.subj === x}" style="--c:${colourOf(x)}"><img src="study/${trackArt(x)}.svg" alt=""><b>${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</b></button>`).join("")}</div>`;
    else {
      const list = shown();
      body = `${young ? "" : `<label class="pr-search mk-find">${LENS}<input type="search" value="${esc(S.q)}" placeholder="${esc(K.find)}" autocomplete="off" enterkeyhint="search"></label>
        <div class="mk-words scroll-fade">${words().map((w) => `<button aria-pressed="${S.q === w}">${esc(w)}</button>`).join("")}</div>`}
        <div class="mk-subj"><button data-fs="all" aria-pressed="${S.fsubj === "all"}">${esc(K.all)}</button>${PR.index.subjects.filter((x) => pool().some((k) => subjOfSkill(k) === x)).map((x) => `<button data-fs="${x}" aria-pressed="${S.fsubj === x}" style="--c:${colourOf(x)}">${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</button>`).join("")}</div>
        <p class="mk-count">${esc(S.q || S.fsubj !== "all" ? K.hits(list.length) : S.type === "mine" ? K.tapYours : K.ideas)}</p>
        <div class="mk-list${young ? " mk-pics" : ""}">${list.slice(0, 40).map(card).join("") || `<p class="pr-empty">${esc(K.none)}</p>`}</div>`;
    }
    const ready = S.step === 2 && (bySubj ? !!S.subj : S.picked.length > 0);
    m.classList.toggle("mk-s1", S.step === 1);
    m.innerHTML = `<div class="mk-head">${S.step === 2 ? `<button class="mk-back" aria-label="${esc(K.back)}">${CHEVRON}</button>` : "<i></i>"}
        <span class="mk-dots" aria-hidden="true"><i class="on"></i><i${S.step === 2 ? ' class="on"' : ""}></i></span>
        <button class="pr-x" aria-label="${esc(K.close)}">${ICON.close}</button></div>
      <div class="mk-ask">${U.mascot ? `<img src="${A}mascot/practise-1.png" alt="">` : ""}<p>${esc(q)}</p></div>
      <div class="mk-body">${body}</div>
      ${S.step === 2 ? `<div class="mk-foot">${foot}<button class="btn mk-go"${ready ? "" : " disabled"}>${esc(bySubj || S.type === "race" ? K.go : S.picked.length ? K.goN(S.picked.length) : K.pickFirst)}</button></div>` : ""}`;
    $(".pr-x", m).onclick = close;
    $(".mk-back", m)?.addEventListener("click", () => { S.step = 1; S.type = null; draw(); });
    m.querySelectorAll("[data-t]").forEach((b) => b.onclick = () => {
      const t = b.dataset.t; S.type = t;
      m.querySelectorAll("[data-t]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      // Surprise starts at once; the others go on to what, once the press has shown.
      setTimeout(() => { if (!m.isConnected) return; if (t === "surprise") return start("surprise");
        S.step = 2; const sug = mySuggestions()[0], ok = PR.index.subjects.filter((x) => skillsFor(t, x).length);
        S.subj = sug && ok.includes(subjOfSkill(sug.skills[0])) ? subjOfSkill(sug.skills[0]) : ok[0];
        S.picked = young || t === "mine" ? [] : [pool().find((k) => sug?.skills.includes(k)) ?? pool()[0]].filter(Boolean); draw(); }, 180);
    });
    m.querySelectorAll("[data-s]").forEach((b) => b.onclick = () => { S.subj = b.dataset.s; draw(); });
    const qi = $(".mk-find input", m); if (qi) qi.oninput = () => { S.q = qi.value; const pos = qi.selectionStart; draw(); const n = $(".mk-find input", m); n.focus(); n.setSelectionRange(pos, pos); };
    m.querySelectorAll(".mk-words button").forEach((b) => b.onclick = () => { S.q = S.q === b.textContent ? "" : b.textContent; draw(); });
    m.querySelectorAll("[data-len]").forEach((b) => b.onclick = () => { S.len = +b.dataset.len; S.q = S.q.replace(/\d+\s*(min|minuten|minutes|mins)\b/i, "").trim(); draw(); });
    $(".mk-hints input", m)?.addEventListener("change", (e) => { S.hints = e.target.checked; });
    m.querySelectorAll("[data-fs]").forEach((b) => b.onclick = () => { S.fsubj = b.dataset.fs; draw(); });
    m.querySelectorAll("[data-k]").forEach((b) => b.onclick = () => { const k = b.dataset.k; S.picked = S.type === "race" ? [k] : S.picked.includes(k) ? S.picked.filter((x) => x !== k) : [...S.picked, k]; draw(); });
    $(".mk-go", m)?.addEventListener("click", () => start(S.type, bySubj ? skillsFor(S.type, S.subj) : S.picked));
    scrollFades(m);
  };
  scrim.onclick = close;
  scr.append(scrim, m); draw();
}
