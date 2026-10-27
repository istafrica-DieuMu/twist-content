/* ---------- The app: four tabs (Start, Study, Practice, Me) ----------
   The phone is the whole Twist app, as in ist-schoolido (app/(tabs)/_layout.tsx:
   Home, Study, Practice, Profile). Its tab bar shows on the tab screens and
   their pages and hides inside a lesson or a session. Study runs in the
   player's lesson view, so its side panel has the lesson tools; Start,
   Practice and Me run in the practice view, with the pretend child. That
   child is the child of every tab: Study follows its course, and a lesson
   finished from the app moves its skill on (finishLesson). Inlined after
   practice-ui.js. */
const APP = { tab: null, home: null, subj: null, year: null, topic: null, q: "", fromApp: false, units: false };
const ATXT = {
  de: { badges: "Abzeichen", dayPlayed: "Gespielt", dayToday: "Heute, noch offen", dayMissed: "Nicht gespielt", lightFirst: "Mach heute eine Lektion oder Übung, dann brennt die erste Flamme.", upNext: "Als Nächstes", thisWeek: "Diese Woche", days: ["Mo", "Di", "Mi", "Do", "Fr"], gold: "Gold!", earned: "Verdient", earnedIn: (y) => `Verdient, ${y}`, ofN: (a, b) => `${a} von ${b}`, noBadges: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", almost: "Fast geschafft", allBadges: (n) => `Alle weiteren Abzeichen (${n})`, how: { pathfinder: "Deinen ersten Einstufungstest machen", summit: "Den Test am Schuljahresende bestehen", legend: "Jede Fähigkeit eines Fachs können", "comeback-kid": "Eine Fähigkeit zurückholen", "like-clockwork": "4 Wochen alle Wiederholungen pünktlich", "time-traveller": "Etwas aus einer späteren Klasse lernen" }, hi: "Hallo!", startHere: "Fang hier an", minShort: (m) => `${m} Min.`, helloName: (n) => `Hallo, ${n}!`, todayPlan: "Dein Plan für heute", planLeft: (a, b) => `${a} von ${b} für heute geschafft`, planDone: "Für heute alles geschafft", unitOf: (k, n) => `Einheit ${k} von ${n}`, lessonDone: "Lektion geschafft", lessonsToday: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"} heute`, practiceDone: "Üben geschafft", sessionsToday: (n) => `${n} ${n === 1 ? "Übungsrunde" : "Übungsrunden"} heute`, winTitle: "Super, dein Plan für heute ist fertig!", winStreak: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge. Komm morgen wieder!`, winSub: "Komm morgen wieder!", wantMore: "Lust auf mehr?", unitsOf: (a, b) => `${a}/${b} Einheiten`, newDot: "neu", start: "Start", study: "Lernen", practice: "Üben", me: "Ich", hello: "Hallo! Schön, dass du da bist.", next: "Weiter lernen", goOn: "Mach weiter, wo du aufgehört hast", nextUnit: (x) => `Als Nächstes in ${x}`, nextYear: (y) => `Weiter mit ${y}`, more: "Andere Fächer", newSubj: "Probier ein neues Fach", fresh: "Neu für dich", lessonOf: (k, n) => `Lektion ${k} von ${n}`, mins: (m) => `etwa ${m} Minuten`, go: "Los geht's", allDone: "Alles geschafft!", allDoneSub: "Im Üben-Tab hältst du es frisch.", doneOf: (a, b) => `${a} von ${b} geschafft`, lessons: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"}`, finish: "Fertig", today: "Heute üben", allTopics: "Alle Themen", search: (s, y) => `Suchen in ${s}, ${y}`, nothing: "Nichts gefunden.", year: "Klasse", yourYear: "deine Klasse", sets: (n) => `${n} ${n === 1 ? "Einheit" : "Einheiten"}`,
    meTitle: "Mein Fortschritt", stars: "Sterne", streak: "Tage in Folge", sessions: "Übungsrunden", bee: "Fleißiges Bienchen", beeTo: (a, b) => `${a} von ${b} Übungsrunden`, beeMax: "Alle Stufen geschafft!", notYet: "Noch nicht verdient", level: (n) => `Stufe ${n} von 6`, streakTitle: "Serie", streakNow: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge`, streakBest: (n) => `Bester Lauf: ${n}`, streakTo: (n, name) => `Noch ${n} ${n === 1 ? "Schultag" : "Schultage"} bis ${name}`, streakNote: "Wochenenden zählen nicht und brechen nichts.", records: "Sprint-Rekorde", perMin: (n) => `${n} pro Minute`, noRecords: "Noch keinen Sprint gespielt. Probier einen im Üben-Tab!", subjects: "Deine Fächer", ofStars: (a, b) => `${a} von ${b} Sternen` },
  en: { badges: "Badges", dayPlayed: "Played", dayToday: "Today, still to do", dayMissed: "Not played", lightFirst: "Do a lesson or some practice today to light the first flame.", upNext: "Up next", thisWeek: "This week", days: ["M", "T", "W", "T", "F"], gold: "Gold!", earned: "Earned", earnedIn: (y) => `Earned, ${y}`, ofN: (a, b) => `${a} of ${b}`, noBadges: "None yet. The first comes with your first skill at I can do it.", almost: "Almost there", allBadges: (n) => `All the other badges (${n})`, how: { pathfinder: "Finish your first placement check", summit: "Pass the end-of-year check", legend: "Every skill of a subject", "comeback-kid": "Bring a skill back after a refresh", "like-clockwork": "Every recap on time for 4 weeks", "time-traveller": "Learn something from a later year" }, hi: "Hi!", startHere: "Start here", minShort: (m) => `${m} min`, helloName: (n) => `Hi, ${n}!`, todayPlan: "Your plan for today", planLeft: (a, b) => `${a} of ${b} done today`, planDone: "All done for today", unitOf: (k, n) => `Unit ${k} of ${n}`, lessonDone: "Lesson done", lessonsToday: (n) => `${n} ${n === 1 ? "lesson" : "lessons"} today`, practiceDone: "Practice done", sessionsToday: (n) => `${n} ${n === 1 ? "session" : "sessions"} today`, winTitle: "Great work, today's plan is done!", winStreak: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row. See you tomorrow!`, winSub: "See you tomorrow!", wantMore: "Want more?", unitsOf: (a, b) => `${a}/${b} units`, newDot: "new", start: "Home", study: "Study", practice: "Practice", me: "Me", hello: "Hi! Great to see you.", next: "Keep learning", goOn: "Pick up where you left off", nextUnit: (x) => `Next in ${x}`, nextYear: (y) => `On to ${y}`, more: "Other subjects", newSubj: "Try a new subject", fresh: "New for you", lessonOf: (k, n) => `Lesson ${k} of ${n}`, mins: (m) => `about ${m} minutes`, go: "Start", allDone: "All done!", allDoneSub: "Keep it fresh in the Practice tab.", doneOf: (a, b) => `${a} of ${b} done`, lessons: (n) => `${n} ${n === 1 ? "lesson" : "lessons"}`, finish: "Done", today: "Practise today", allTopics: "All topics", search: (s, y) => `Search ${s}, ${y}`, nothing: "Nothing found.", year: "Year", yourYear: "your year", sets: (n) => `${n} ${n === 1 ? "unit" : "units"}`,
    meTitle: "My progress", stars: "Stars", streak: "Days in a row", sessions: "Sessions", bee: "Busy Bee", beeTo: (a, b) => `${a} of ${b} practice sessions`, beeMax: "Every level done!", notYet: "Not earned yet", level: (n) => `Level ${n} of 6`, streakTitle: "Streak", streakNow: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row`, streakBest: (n) => `Best run: ${n}`, streakTo: (n, name) => `${n} more school ${n === 1 ? "day" : "days"} to ${name}`, streakNote: "Weekends never count and never break it.", records: "Drill records", perMin: (n) => `${n} a minute`, noRecords: "No drill played yet. Try one in the Practice tab!", subjects: "Your subjects", ofStars: (a, b) => `${a} of ${b} stars` },
};
const AT = () => ATXT[PL()];
const STREAK_NAME = { spark: ["Funke", "Spark"], flame: ["Flamme", "Flame"], campfire: ["Lagerfeuer", "Campfire"], torch: ["Fackel", "Torch"], comet: ["Komet", "Comet"], volcano: ["Vulkan", "Volcano"], sun: ["Sonne", "Sun"], supernova: ["Supernova", "Supernova"] };
const streakName = (id) => STREAK_NAME[id]?.[PL() === "de" ? 0 : 1] ?? id;
// The app's tab icons (ist-schoolido develop, assets/images/tabs): coloured when open, grey otherwise.
const TAB_ICON = { start: "home.svg", study: "study.svg", practice: "practice.svg", me: "profile.png" };
const tabIcon = (t, on) => `<img src="tabs/${on ? TAB_ICON[t] : TAB_ICON[t].replace(".", "-gray.")}" alt="" class="tab-${t}">`;
const TABS = ["start", "study", "practice", "me"];
// The tabs share one colour, the brand's, so the subjects' colours are the only
// colour that means something on a screen. Their tops are neutral (.fun-band).
const BRAND = "#6849dd", ROOM = { start: BRAND, study: BRAND, practice: BRAND, me: BRAND };

// A child with no name yet gets a German first name, kept with the child.
const CHILD_NAMES = ["Mia", "Emma", "Hannah", "Lina", "Leni", "Clara", "Emilia", "Frieda", "Ida", "Lotta", "Mila", "Marie", "Greta", "Paula", "Romy", "Noah", "Ben", "Leon", "Finn", "Paul", "Elias", "Felix", "Jonas", "Emil", "Theo", "Anton", "Karl", "Mats", "Henri", "Oskar"];
const randomName = (not) => { const pool = CHILD_NAMES.filter((n) => n !== not); return pool[Math.floor(Math.random() * pool.length)]; };
// The picture: a mascot on a colour, or a photo the child took (a 160 px JPEG, kept with the child).
const AV_POSES = ["start-1", "start-2", "start-3", "learn-1", "learn-2", "practise-1", "end-1", "end-2", "check-1"];
const AV_BG = ["#f5b400", "#f0640a", "#1971c2", "#2b8a3e", "#d6336c", "#6849dd"];
function avatar(c, cls = "") {
  const a = c.avatar ?? {};
  return a.photo ? `<span class="av photo ${cls}"><img src="${esc(a.photo)}" alt=""></span>`
    : `<span class="av ${cls}" style="--av:${esc(a.bg ?? AV_BG[0])}"><img src="${A}mascot/${esc(a.pose ?? "start-1")}.png" alt=""></span>`;
}
// The look (light, dark, night) belongs to the device, not the child.
const LOOKS = ["light", "dark", "night"];
const getLook = () => { try { const v = localStorage.getItem("twist-look"); return LOOKS.includes(v) ? v : "light"; } catch { return "light"; } };
function setLook(v) { try { localStorage.setItem("twist-look", v); } catch {} $("#screen").dataset.look = v; }
document.getElementById("screen")?.setAttribute("data-look", getLook());

function appChild() {
  PR.child ??= loadChild();
  if (!PR.child.name) { PR.child.name = randomName(); saveChild(); }
  // A child saved with a learning year (French year 1) gets the school year it belongs to.
  const toGrade = Object.entries(D.learningYears?.[PR.child.curriculum] ?? {}).find(([, ly]) => ly === PR.child.year);
  if (toGrade) PR.child.year = toGrade[0];
  if (!PR.index || PR.index.curriculum !== PR.child.curriculum) PR.index = indexContent(D.sets, D.drills, PR.child.curriculum);
  return PR.child;
}
function appTabs(active) {
  const T = AT(), nav = document.createElement("nav"); nav.className = "app-tabs"; nav.setAttribute("aria-label", "Twist");
  nav.innerHTML = TABS.map((t) => `<button data-t="${t}" style="--tc:${ROOM[t]}"${t === active ? ' aria-current="page"' : ""}>${tabIcon(t, t === active)}<span>${esc(T[t])}</span></button>`).join("");
  nav.querySelectorAll("button").forEach((b) => b.onclick = () => appTab(b.dataset.t));
  return nav;
}
const inPractice = () => document.body.classList.contains("practice");
// Switch the app to a tab. Study needs the lesson view; the others the practice view.
// Study opens on the track; { keep: true } goes back to the unit list if that was open.
function appTab(t, { keep = false } = {}) {
  stopAudio(); appChild();
  APP.tab = t;
  // Study is marked open before the view changes, so the lesson view coming back draws (and says) nothing.
  if (t === "study") { if (!keep) APP.units = false; APP.home = "study"; if (["practice", "parents", "types", "drawn", "fbv", "usv"].some((v) => document.body.classList.contains(v))) setView("lessons"); APP.fromApp = false; APP.units ? renderStudy() : renderTrack(); return renderPracticeSide(); }
  if (!inPractice()) setView("practice");
  APP.home = null; PR.on = false; PR.session = null; PR.home = true;
  if (t === "settings") APP.editPic = false;
  if (t === "start") renderHomeTab(); else if (t === "me") renderMe(); else if (t === "settings") renderSettings(); else renderPracticeHome();
  renderPracticeSide();
}
// The greeting row: the mascot, a line, and the streak flame, which opens Me.
function appHeader(title) {
  const s = streak(PR.child);
  return `<header class="pr-top"><img class="pr-me" src="${A}mascot/start-1.png" alt=""><h2>${esc(title)}</h2>
    <button class="app-flame${s.current ? " on" : ""}" data-rw="streak" aria-label="${esc(AT().streakNow(s.current))}"><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt="">${s.current}</button></header>`;
}
function wireHeader(scr) { scr.querySelectorAll("[data-me]").forEach((b) => b.onclick = () => appTab("me")); scr.querySelectorAll("[data-rw]").forEach((b) => b.onclick = () => rewardsPopover(b, b.dataset.rw)); scr.querySelectorAll("[data-settings]").forEach((b) => b.onclick = () => appTab("settings")); }
const beeStrip = () => {
  const L = PT(), bee = busyBee(PR.child.sessions), pct = bee.next ? (100 * (PR.child.sessions - bee.from)) / (bee.next - bee.from) : 100;
  return `<button class="pr-bee" data-bd="busy-bee"><img src="${A}badges/busy-bee.svg" alt=""><span><i class="pr-bar" style="--c:#f5b400"><i style="width:${pct}%"></i></i><small>${esc(bee.next ? L.beeBar(PR.child.sessions, bee.next) : AT().beeMax)}</small></span></button>`;
};

/* ---------- the course ---------- */
// The years of a subject: school years, or learning years for a foreign language.
function yearsOf(subj) {
  const c = PR.child;
  return [...new Set(D.sets.filter((s) => s.curriculum === c.curriculum && subjOf(s).endsWith("." + subj)).map((s) => s.year))].sort((a, b) => YEARS.indexOf(a) - YEARS.indexOf(b));
}
const childYearFor = (subj) => { const y = subj === "fl" ? D.learningYears?.[PR.child.curriculum]?.[PR.child.year] : PR.child.year; return yearsOf(subj).includes(y) ? y : yearsOf(subj)[0]; };
function courseSets(subj, year = childYearFor(subj)) {
  const c = PR.child;
  return D.sets.filter((s) => s.curriculum === c.curriculum && s.year === year && subjOf(s).endsWith("." + subj)).sort((a, b) => a.order - b.order);
}
const lessonsDone = (s) => PR.child.lessons?.[s.id] ?? 0;
const nextIn = (sets) => sets.find((s) => lessonsDone(s) < s.lessons.length);
const appSubjects = () => PR.index.subjects.filter((x) => yearsOf(x).length);
// A lesson opens after the books have played a moment, as in the app (QuizLoadingScreen).
function startLesson(setId, n) {
  stopAudio();
  loadingBooks(1400, () => {
    // Held as Study while the view changes, so the last lesson does not flash up (or speak) first.
    APP.home = "study"; if (inPractice()) setView("lessons");
    APP.home = null; APP.fromApp = true;
    pickSet(D.sets.findIndex((s) => s.id === setId), n);
  });
}
// The next lesson of a subject as a card: big on Start and Study, small for the other subjects.
function nextCard(subj, big, sets = courseSets(subj)) {
  const T = AT(), lg = PL(), s = nextIn(sets), col = colourOf(subj), name = SUBJ_NAME[PR.child.curriculum][subj] ?? subj;
  if (!s) return big && sets.length ? `<div class="pr-hero ln-next" style="--c:${col}"><span class="pr-kind">${esc(name)}</span><b class="pr-reason">${esc(T.allDone)}</b><span class="pr-sub">${esc(T.allDoneSub)}</span><img class="pr-art" src="${A}mascot/end-1.png" alt=""></div>` : "";
  const fresh = !sets.some(lessonsDone);
  const l = s.lessons[lessonsDone(s)];
  return big ? `<button class="pr-hero ln-next" style="--c:${col}" data-start="${esc(s.id)}" data-n="${l.n}">
      <span class="pr-kind">${esc(name)} · ${esc(T.lessonOf(l.n, s.lessons.length))}</span>
      <b class="pr-reason">${esc(l.title[lg] ?? l.title.de)}</b><span class="pr-sub">${esc(s.title[lg] ?? s.title.de)}</span>
      <span class="pr-size">${esc(T.mins(s.minutes ?? 10))}</span><span class="pr-go">${esc(T.go)}</span>
      <img class="pr-art" src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></button>`
    : `<button class="pr-mini" data-start="${esc(s.id)}" data-n="${l.n}" style="--c:${col}"><img src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""><span class="pr-kind">${esc(name)}</span><b>${esc(l.title[lg] ?? l.title.de)}</b><small>${esc(fresh ? T.fresh : T.lessonOf(l.n, s.lessons.length))}</small></button>`;
}
const wireStarts = (scr) => scr.querySelectorAll("[data-start]").forEach((b) => b.onclick = (e) => { e.preventDefault(); startLesson(b.dataset.start, +b.dataset.n); });

/* ---------- Start ---------- */
// What to do today: carry on learning, one practice suggestion, the badge on its way.
// The last lesson the child finished: kept by finishLesson, or read from the log.
function lastLesson(c) {
  if (c.last) return c.last;
  for (const e of [...(c.log ?? [])].reverse()) { const m = /^lesson (\d+) of (\S+) finished/.exec(e.text); if (m) return { setId: m[2], n: +m[1] }; }
  return null;
}
// What Start leads with: the unit the child was last in, else the next unit of
// that course, else the next year of it; with no lesson yet, the first subject.
function homePlan() {
  const c = PR.child, subs = appSubjects(), last = lastLesson(c), s = last && D.sets.find((x) => x.id === last.setId && x.curriculum === c.curriculum);
  if (!s) { const subj = subs.includes(APP.subj) ? APP.subj : subs[0]; return { subj, sets: courseSets(subj), head: "next" }; }
  const subj = subjOf(s).split(".").pop(), course = courseSets(subj, s.year);
  if (lessonsDone(s) < s.lessons.length) return { subj, sets: [s], head: "continue" };
  const after = course.slice(course.indexOf(s) + 1);
  if (nextIn(after)) return { subj, sets: after, head: "nextUnit" };
  if (nextIn(course)) return { subj, sets: course, head: "nextUnit" };
  const years = yearsOf(subj), ny = years[years.indexOf(s.year) + 1];
  if (ny && nextIn(courseSets(subj, ny))) return { subj, sets: courseSets(subj, ny), head: "nextYear", year: ny };
  return { subj, sets: course, head: "done" };
}
// What the child did today, read from its log: lessons finished, practice sessions finished.
function today(c) {
  const t = (c.log ?? []).filter((e) => e.day === c.today);
  return { lessons: t.filter((e) => /^lesson \d+ of \S+ finished/.test(e.text)).length, practice: t.filter((e) => /^\S+ session:/.test(e.text)).length };
}
// A title on one line where it can: a suffix like "-tion" never breaks off its hyphen.
const keepSuffix = (t) => esc(t).replace(/(^|\s)(-[\p{L}]+)/gu, '$1<span class="nb">$2</span>');
// A subject's mark: a short glyph in a ring that fills with the units done in the child's year.
const SUBJ_GLYPH = { math: "1+2", "lit-en": "Aa", "lit-de": "Aa", fl: { "en-GB": "Fr", "de-DE": "En" } };
function subjChip(x) {
  const sets = courseSets(x), done = sets.filter((s) => lessonsDone(s) >= s.lessons.length).length, fresh = !sets.some(lessonsDone);
  const g = SUBJ_GLYPH[x]?.[PR.child.curriculum] ?? SUBJ_GLYPH[x] ?? x.slice(0, 2);
  return `<button data-subj="${esc(x)}" style="--c:${colourOf(x)};--p:${sets.length ? (100 * done) / sets.length : 0}"><i class="hm-ring">${esc(g)}${fresh ? `<em>${esc(AT().newDot)}</em>` : ""}</i><b>${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</b><small>${esc(AT().unitsOf(done, sets.length))}</small></button>`;
}
// Next in each subject: a row of cards that slides sideways, one per subject with a
// lesson to do (the plan's subject left out while its card is above), so it holds
// three subjects today and more later. Dots under it show where the row is.
const ROW_TXT = { de: { head: "Als Nächstes in deinen Fächern" }, en: { head: "Next in your subjects" } };
function subjectRow(skip) {
  const T = AT(), lg = PL(), cards = appSubjects().filter((x) => x !== skip).map((subj) => {
    const sets = courseSets(subj), s = nextIn(sets); if (!s) return "";
    const l = s.lessons[lessonsDone(s)], k = sets.indexOf(s) + 1, name = SUBJ_NAME[PR.child.curriculum][subj] ?? subj;
    return `<div class="hm-card" role="group" data-subj="${esc(subj)}" style="--c:${colourOf(subj)}">
      <span class="pr-kind">${esc(name)} · ${esc(T.unitOf(k, sets.length))}</span><b>${keepSuffix(l.title[lg] ?? l.title.de)}</b><small>${esc(s.title[lg] ?? s.title.de)}</small>
      <button class="hm-card-go" data-start="${esc(s.id)}" data-n="${l.n}">${esc(T.go)}<i>${esc(T.minShort(s.minutes ?? 10))}</i></button><img src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></div>`;
  }).filter(Boolean);
  if (!cards.length) return "";
  return `<section class="hm-row"><h3 class="pr-h">${esc(ROW_TXT[lg].head)}</h3>${cards.length > 1 ? deckOf(cards) : cards.join("")}</section>`;
}
// A deck: the cards in a stack that never ends, turned like pages. The front card
// follows a finger (or the mouse) sideways and the one under it rises into place;
// pulled the other way, the card before comes back over the top from the left. A
// card that is passed slides under the stack. It turns by itself every 10 seconds:
// a faint line along the bottom of the front card fills meanwhile, and pressing and
// holding the card stops it (as in stories), with the card dipping a little. Not
// with reduced motion. A sideways trackpad scroll or the arrow keys turn it too.
// No bar under it: the faint line on the card and the cards peeking out say enough.
const DECK_MS = 10000;
const deckOf = (items) => `<div class="deck" tabindex="0" aria-roledescription="carousel">${items.map((x) => `<div class="dk-slide">${x}</div>`).join("")}</div>`;
function wireRow(scr) { scr.querySelectorAll(".deck").forEach((d, j) => deck(d, j * (DECK_MS / 2))); }
function deck(el, offset = 0) {
  const slides = [...el.children], n = slides.length, segs = el.nextElementSibling?.matches(".dk-bar") ? [...el.nextElementSibling.children] : [];
  if (n < 2) return;
  const h = Math.max(...slides.map((s) => s.offsetHeight));
  // Room under the front card only for the cards that peek out (10 px each, two at most).
  slides.forEach((s) => (s.style.height = `${h}px`)); el.style.height = `${h + 10 * Math.min(2, n - 1)}px`;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches, EASE = "transform .42s cubic-bezier(.22,.8,.25,1), opacity .3s";
  let i = 0, x0 = null, y0 = null, dx = 0, moved = false, held = false, busy = false, wait = null;
  const W = () => el.clientWidth || 300;
  // p is how far a turn has gone: -1 forward (the front card out to the left), +1 back.
  const place = (p = 0, ease = true) => slides.forEach((s, j) => {
    const k = (j - i + n) % n, back = p > 0 && k === n - 1;
    let tx = 0, rot = 0, d = k;
    if (k === 0) { tx = Math.min(0, p) * W() * 1.08; rot = Math.min(0, p) * 7; d = Math.max(0, p); }
    else if (back) { tx = (p - 1) * W() * 1.08; rot = (p - 1) * 7; d = 0; }
    else d = p < 0 ? k + p : k + p;
    const z = back ? n + 1 : n - k;
    s.style.transition = ease ? EASE : "none";
    s.style.transform = `translate(${tx}px, ${Math.max(0, d) * 10}px) rotate(${rot}deg) scale(${1 - Math.max(0, d) * 0.05})`;
    s.style.opacity = d > 2.2 && !(k === 0 || back) ? 0 : 1; s.style.zIndex = z;
    s.classList.toggle("front", k === 0); s.inert = k !== 0;
  });
  // The timer: a line on top of each card; only the front one runs.
  const timers = slides.map((s) => { const card = s.lastElementChild; card.insertAdjacentHTML("beforeend", '<i class="dk-timer" aria-hidden="true"><b></b></i>'); return card.lastElementChild; });
  const mark = () => { segs.forEach((g, j) => g.classList.toggle("on", j === i)); timers.forEach((t, j) => { t.classList.remove("run"); if (j === i && !still) { void t.offsetWidth; t.classList.add("run"); } }); };
  const turn = (d) => {
    if (busy) return; busy = true;
    place(d > 0 ? -1 : 1);
    setTimeout(() => { i = (i + d + n) % n; place(0); mark(); busy = false; }, 380);
  };
  const go = (j) => { if (j === i || busy) return; const d = (j - i + n) % n; d === 1 ? turn(1) : d === n - 1 ? turn(-1) : (i = j, place(0), mark()); };
  place(0, false); mark();
  // By hand: drag or swipe the front card; a quarter of the width, or a quick flick, turns it.
  let t0 = 0;
  el.addEventListener("pointerdown", (e) => { if (busy) return; x0 = e.clientX; y0 = e.clientY; dx = 0; moved = false; t0 = performance.now(); });
  el.addEventListener("pointermove", (e) => {
    if (x0 == null) return; dx = e.clientX - x0;
    if (!moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - y0)) { moved = true; el.setPointerCapture?.(e.pointerId); }
    if (moved) place(Math.max(-1, Math.min(1, dx / W())), false);
  });
  const up = () => {
    if (x0 == null) return; x0 = null;
    if (!moved) return;
    const fast = Math.abs(dx) / Math.max(1, performance.now() - t0) > 0.6;
    if (Math.abs(dx) > W() / 4 || (fast && Math.abs(dx) > 30)) { busy = true; place(dx < 0 ? -1 : 1); setTimeout(() => { i = (i + (dx < 0 ? 1 : -1) + n) % n; place(0); mark(); busy = false; }, 380); }
    else place(0);
  };
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  el.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  // A sideways trackpad scroll comes as many small steps: they add up, and the first
  // real swipe turns the page at once (skipping the timer, which starts again).
  let cool = false, sum = 0, quiet = null;
  el.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault(); clearTimeout(quiet); quiet = setTimeout(() => (sum = 0), 200);
    if (cool) return; sum += e.deltaX;
    if (Math.abs(sum) < 28) return;
    cool = true; setTimeout(() => (cool = false), 550); turn(sum > 0 ? 1 : -1); sum = 0;
  }, { passive: false });
  el.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") turn(1); if (e.key === "ArrowLeft") turn(-1); });
  segs.forEach((g, j) => g.onclick = () => go(j));
  // By itself: the front card's line fills over 10 seconds, then the page turns. Pressing
  // (and holding) the card stops it, as does keyboard focus inside the deck.
  const hold = (on) => { held = on; el.classList.toggle("held", on); };
  el.addEventListener("pointerdown", () => hold(true)); window.addEventListener("pointerup", () => el.isConnected && hold(el.contains(document.activeElement) && document.activeElement.matches(":focus-visible")));
  el.addEventListener("focusin", (e) => e.target.matches(":focus-visible") && hold(true)); el.addEventListener("focusout", () => hold(false));
  if (still) return;
  // As the screen opens, the front card nudges aside a little and settles, so the deck looks like it moves.
  setTimeout(() => { if (!el.isConnected || busy || x0 != null) return; place(-0.07); setTimeout(() => el.isConnected && x0 == null && !busy && place(0), 260); }, 650 + offset / 6);
  timers.forEach((t, j) => t.addEventListener("animationend", () => { if (el.isConnected && j === i && !held) turn(1); }));
  // Two decks on one screen take turns: the second starts half a turn later.
  if (offset) { timers[0].classList.remove("run"); setTimeout(() => mark(), offset); }
}
// The line under the greeting says what today asks for, not the count the ring shows:
// halfway, one to go; nothing yet, the streak to keep, or how long today's plan takes.
const GREET = {
  de: { half: "Eins geschafft, eins fehlt noch!", keep: (n) => `Halte deine Serie: ${n} ${n === 1 ? "Tag" : "Tage"}`, mins: (m) => `Heute etwa ${m} Minuten` },
  en: { half: "One done, one to go!", keep: (n) => `Keep your ${n}-day streak!`, mins: (m) => `About ${m} minutes today` },
};
function greetLine(got, goal, streakNow, plan, sug, did) {
  const G = GREET[PL()];
  if (got > 0) return G.half;
  if (streakNow > 0) return G.keep(streakNow);
  const s = !did.lessons && nextIn(plan.sets), b = BANDS[PR.child.band];
  const m = (s ? s.minutes ?? 10 : 0) + (sug && !did.practice ? (sug.kind === "drill" ? 2 : Math.max(2, Math.round(b.tasks * 0.4))) : 0);
  return m ? G.mins(m) : AT().planLeft(got, goal);
}
// The lesson step: the next lesson as the big card, with where it sits (unit dots, unit k of n).
function lessonStep(plan) {
  const T = AT(), lg = PL(), s = nextIn(plan.sets);
  if (!s) return "";
  const done = lessonsDone(s), l = s.lessons[done], col = colourOf(plan.subj), name = SUBJ_NAME[PR.child.curriculum][plan.subj] ?? plan.subj;
  const course = courseSets(plan.subj, s.year), k = course.indexOf(s) + 1;
  const dots = s.lessons.map((_, i) => `<i class="${i < done ? "on" : i === done ? "now" : ""}"></i>`).join("");
  return `<div class="pr-hero ln-next hm-lesson" role="group" data-subj="${esc(plan.subj)}" style="--c:${col}">
      <span class="pr-kind">${esc(name)} · ${esc(T.unitOf(k, course.length))}</span>
      <span class="hm-dots" aria-label="${esc(T.lessonOf(l.n, s.lessons.length))}">${dots}<small>${esc(T.lessonOf(l.n, s.lessons.length))}</small></span>
      <b class="pr-reason">${keepSuffix(l.title[lg] ?? l.title.de)}</b><span class="pr-sub">${esc(s.title[lg] ?? s.title.de)}</span>
      <button class="pr-go" data-start="${esc(s.id)}" data-n="${l.n}">${esc(T.go)}<small>${esc(T.minShort(s.minutes ?? 10))}</small></button>
      <img class="pr-art" src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></div>`;
}
const PRACTICE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>';
const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
// Start: today's plan (a lesson, then practice), ticked off as the child does it,
// then the subjects. With the plan done, a well done and the way to more.
function renderHomeTab() {
  const T = AT(), L = PT(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  const plan = homePlan(); APP.subj = plan.subj;
  const sug = mySuggestions()[0], did = today(c), s = streak(c), bee = busyBee(c.sessions);
  const lesson = nextIn(plan.sets) ? lessonStep(plan) : "";
  const goal = [lesson || did.lessons, sug || did.practice].filter(Boolean).length || 1;
  const got = Math.min(goal, (did.lessons ? 1 : 0) + (did.practice ? 1 : 0)), all = got >= goal;
  const subjName = SUBJ_NAME[c.curriculum][plan.subj] ?? plan.subj;
  const head = { continue: T.goOn, nextUnit: T.nextUnit(subjName), nextYear: T.nextYear(yearName(plan.year ?? "")), next: c.last || lastLesson(c) ? T.next : T.startHere, done: T.allDone }[plan.head];
  const doneRow = (text, sub) => `<div class="hm-done"><i>${TICK}</i><span><b>${esc(text)}</b><small>${esc(sub)}</small></span></div>`;
  const practiceCard = sug ? `<div class="pr-own st-today hm-practice" role="group" data-subj="${esc(subjOfSkill(sug.skills[0]))}" style="--c:${colourOf(subjOfSkill(sug.skills[0]))}"><i class="hm-ico">${PRACTICE_ICON}</i><span><small>${esc(sug.paused ? PAUSE_TXT[PL()].kind(L.kinds[sug.kind] ?? "") : L.kinds[sug.kind] ?? "")}</small><b>${esc(sug.reason[PL()])}</b><small>${esc(sizeOf(sug))}</small><button class="hm-pr-go" data-sug>${esc(sug.paused ? PAUSE_TXT[PL()].go : L.start)}</button></span><img class="hm-pr-art" src="${A}mascot/practise-1.png" alt=""></div>` : "";
  const steps = [];
  // The way back into the course is always there; a lesson done today shows as a tick beside its label.
  if (lesson) steps.push(`<p class="hm-step">${esc(head)}${did.lessons ? `<em class="hm-tick">${TICK}${esc(T.lessonsToday(did.lessons))}</em>` : ""}</p>${lesson}`);
  else if (did.lessons) steps.push(doneRow(T.lessonDone, T.lessonsToday(did.lessons)));
  if (did.practice) steps.push(doneRow(T.practiceDone, T.sessionsToday(did.practice)));
  else if (practiceCard) steps.push(`<p class="hm-step">${esc(T.today)}</p>${practiceCard}`);
  const more = [did.lessons && lesson ? `<p class="hm-step">${esc(head)}</p>${lesson}` : "", did.practice && practiceCard ? practiceCard : ""].filter(Boolean);
  scr.style.setProperty("--subj", BRAND); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page hm">
    <header class="hm-top fun-band" style="--room:${ROOM.start}">
      <button class="hm-av" data-settings aria-label="${esc(ST().title)}">${avatar(c)}</button>
      <div><h2>${esc(c.name ? T.helloName(c.name) : T.hi)}</h2><small>${esc(all ? T.planDone : greetLine(got, goal, s.current, plan, sug, did))}</small></div>
    </header>
    ${all ? `<section class="hm-win"><img src="${A}mascot/end-2.png" alt=""><div><b>${esc(T.winTitle)}</b><small>${esc(s.current ? T.winStreak(s.current) : T.winSub)}</small>
      <span class="hm-ticks">${did.lessons ? `<em>${TICK}${esc(T.lessonsToday(did.lessons))}</em>` : ""}${did.practice ? `<em>${TICK}${esc(T.sessionsToday(did.practice))}</em>` : ""}</span></div></section>`
    : `<section class="hm-plan"><h3 class="pr-h">${esc(T.todayPlan)}</h3>${steps.length > 1 ? deckOf(steps) : steps.join("") || doneRow(T.allDone, T.allDoneSub)}</section>`}
    ${all && more.length ? `<section class="hm-more"><h3 class="pr-h">${esc(T.wantMore)}</h3>${more.join("")}</section>` : ""}
    ${subjectRow(lesson && !all ? plan.subj : null)}
    <section><h3 class="pr-h">${esc(T.subjects)}</h3><div class="hm-subj">${subs.map(subjChip).join("")}</div></section>
  </div>`;
  scr.appendChild(appTabs("start"));
  wireHeader(scr); wireStarts(scr); wireRow(scr);
  scr.querySelectorAll(".hm-subj [data-subj]").forEach((b) => b.onclick = () => { APP.subj = b.dataset.subj; APP.year = null; APP.topic = null; APP.q = ""; appTab("study"); });
  // A tap on a card away from its button wiggles the button: that is what starts it.
  scr.querySelectorAll(".hm-lesson, .hm-card, .hm-practice").forEach((c) => c.addEventListener("click", (e) => { if (e.target.closest("button")) return; const g = c.querySelector(".pr-go, .hm-card-go, .hm-pr-go"); g?.classList.remove("nudge"); void g?.offsetWidth; g?.classList.add("nudge"); }));
  scr.querySelectorAll("[data-sug]").forEach((b) => b.onclick = () => { if (sug.paused) return resumeSession(); appTab("practice"); startSession({ kind: sug.kind, skills: sug.skills, minutes: sug.kind === "drill" ? 2 : null }); });
}

/* ---------- Study: the track ---------- */
// As in ist-schoolido (app/(tabs)/lesson-path.tsx), with a stone per skill (a
// lesson set) of the course: one column, arcs that bulge left and right and fill
// as skills are done, a line where a topic starts, the mascot on the current
// skill and islands in the open space. The card on top names the topic and the
// skill in focus and opens the unit list. As in Brilliant, one card stands at the
// bottom the whole time: it shows the stone that scrolls to the middle of the
// track, with the one button its state calls for.
const TRACK_ART = { math: "math", "lit-de": "german", "lit-en": "english", fl: { "de-DE": "english", "en-GB": "french" } };
const TRACK = {
  math: { route: "#018641", grad: ["#0BBE81", "#145E39"], soft: "#E2F0EA", islands: 4 },
  german: { route: "#E87729", grad: ["#E8A527", "#BC4113"], soft: "#F8EAE0", islands: 4 },
  english: { route: "#408AF4", grad: ["#32ACF5", "#0D42AC"], soft: "#E3EEF7", islands: 5 },
  // French has no art of its own: the English art turned to its purple.
  french: { route: "#8f73ff", grad: ["#9b7bff", "#4b2fb0"], soft: "#ece6fb", islands: 5, files: "english" },
};
// pad: room above the first stone, so it can scroll to the middle; unitGap: the room a unit's pill takes on the path.
// Spaced as Brilliant spaces its path (measured): the step about twice the stone, ~110 above and below a unit card.
const TR = { pad: 56, unitGap: 76, step: 210, decor: 132, stone: 107, stoneH: 74, arcW: 167.5, arcH: 173, islandW: 124, mascot: 104 };
const ISLAND_DY = [0, -24, 0, -24, -24];
const ARCH_PATH = "M8.15 22.9C8.15 22.9 47.71 2.35 47.71 2.35C50.42 0.94 53.65 0.62 56.58 1.47C195.73 41.95 199.88 146.33 57.21 211.78C53.93 213.28 50.06 213.2 46.85 211.56C46.85 211.56 3.18 189.23 3.18 189.23C-0.16 187.52 0.48 182.49 4.11 181.54C118.03 151.67 147.82 64.21 8.95 28.61C6.25 27.92 5.68 24.19 8.15 22.9Z";
const TKTXT = {
  de: { units: "Alle Einheiten", back: "Zurück", start: "Lektion starten", goOn: "Weiter lernen", again: "Nochmal spielen", locked: "Noch gesperrt", first: (t) => `Erst „${t}“ schaffen`, toNow: "Zu deiner Lektion", upNext: "Als Nächstes", look: "Anschauen", unit: (k) => `Einheit ${k}`, lessons: (n) => `${n} Lektionen`, tasks: (n) => `${n} Aufgaben`, doneOf: (k, n) => `${k} von ${n} geschafft`, more: "und mehr", min: (m) => `${m} Min.`, lessonOf: (k, n) => `Lektion ${k} von ${n}`, allDone: (n) => `${n} von ${n} Lektionen geschafft`, notYet: (n) => `${n} Lektionen`, showAll: (n) => n === 1 ? "Lektion zeigen" : `Die ${n} Lektionen zeigen`, showLess: "Weniger zeigen", subject: "Fach wählen" },
  en: { units: "All units", back: "Back", start: "Start lesson", goOn: "Keep going", again: "Play again", locked: "Locked", first: (t) => `Finish “${t}” first`, toNow: "To your lesson", upNext: "Up next", look: "Take a look", unit: (k) => `Unit ${k}`, lessons: (n) => `${n} lessons`, tasks: (n) => `${n} exercises`, doneOf: (k, n) => `${k} of ${n} done`, more: "and more", min: (m) => `${m} min`, lessonOf: (k, n) => `Lesson ${k} of ${n}`, allDone: (n) => `All ${n} lessons done`, notYet: (n) => `${n} lessons`, showAll: (n) => n === 1 ? "Show the lesson" : `Show the ${n} lessons`, showLess: "Show less", subject: "Choose a subject" },
};
const TK = () => TKTXT[PL()];
const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>';
const LIST = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.5" cy="6.5" r="1.3" class="f"/><circle cx="4.5" cy="12" r="1.3" class="f"/><circle cx="4.5" cy="17.5" r="1.3" class="f"/></svg>';
const LESSON_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="9" rx="8" ry="4"/><path d="M4 9v5c0 2.2 3.6 4 8 4s8-1.8 8-4V9"/></svg>';
const PUZZLE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H5v-3a2 2 0 1 0 0-4z"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
const trackArt = (subj) => { const a = TRACK_ART[subj]; return (typeof a === "string" ? a : a?.[PR.child.curriculum]) ?? "math"; };
// The course as a row of skills, each with its state: done (every lesson),
// current (the first not done), started (some lessons, further on), open (the
// one before has a lesson done) or locked.
function trackSkills(subj, year) {
  const lg = PL(), out = [];
  for (const s of courseSets(subj, year)) {
    const topic = s.topic?.[lg] ?? s.topic?.en ?? "";
    out.push({ s, topic, topicStart: !out.length || out.at(-1).topic !== topic, done: lessonsDone(s) >= s.lessons.length, some: lessonsDone(s) > 0 });
  }
  // A skill opens once the one before it has a lesson done; the current one is the first not done.
  const cur = out.findIndex((x) => !x.done);
  out.forEach((x, i) => x.state = x.done ? "done" : i === cur ? "current" : x.some ? "started" : i && (out[i - 1].some || out[i - 1].done) ? "open" : "locked");
  return out;
}
// One stone per lesson (the default) or per skill (Dodo's first version); the side panel switches it.
const STONES_KEY = "twist-stones";
const stonesPerLesson = () => { try { return localStorage.getItem(STONES_KEY) !== "skill"; } catch { return true; } };
// The course as a row of lessons: each skill's lessons in order, with the skill's state behind
// them. Done, current (the first not done), open (the next lesson of a skill that is open) or locked.
function trackLessons(subj, year) {
  const out = [];
  for (const sk of trackSkills(subj, year)) {
    const d = lessonsDone(sk.s);
    sk.s.lessons.forEach((l, k) => out.push({ s: sk.s, l, k, topic: sk.topic, topicStart: sk.topicStart && !k, done: k < d, skillState: sk.state }));
  }
  const cur = out.findIndex((x) => !x.done);
  out.forEach((x, i) => x.state = x.done ? "done" : i === cur ? "current" : x.k === lessonsDone(x.s) && ["current", "started", "open"].includes(x.skillState) ? "open" : "locked");
  return out;
}
function renderTrack() {
  const T = AT(), K = TK(), lg = PL(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  if (!subs.includes(APP.subj)) APP.subj = subs[0];
  const year = yearsOf(APP.subj).includes(APP.year) ? APP.year : childYearFor(APP.subj);
  const art = trackArt(APP.subj), look = TRACK[art], files = look.files ?? art, colour = colourOf(APP.subj);
  const perLesson = stonesPerLesson(), rows = perLesson ? trackLessons(APP.subj, year) : trackSkills(APP.subj, year), cur = Math.max(0, rows.findIndex((x) => x.state === "current"));
  const rowTitle = (r) => r.l ? r.l.title[lg] ?? r.l.title.de : r.s.title[lg] ?? r.s.title.de;
  // Each unit (a topic) opens with its pill on the path, in a gap of its own.
  const unitAt = []; rows.forEach((r, i) => unitAt.push((unitAt[i - 1] ?? 0) + (i && r.topicStart ? 1 : 0)));
  const top = (i) => TR.pad + i * TR.step + (unitAt[Math.min(i, rows.length - 1)] ?? 0) * TR.unitGap, mid = (i) => top(i) + TR.decor / 2;
  const at = (x) => `calc(50% + ${x}px)`;
  const arcs = rows.map((r, i) => {
    if (!i || r.topicStart) return "";
    const even = i % 2 === 0, y = top(i) - TR.step / 2 + TR.decor / 2 - TR.arcH / 2;
    const left = even ? -TR.stone / 2 + 48 - TR.arcW : TR.stone / 2 - 48;
    const island = `study/${files}-path-${((i - 1) % look.islands) + 1}.png`, ih = TR.islandW * 0.73;
    return `<svg class="tr-arc" viewBox="0 0 163.59 213.85" preserveAspectRatio="none" style="top:${y}px;left:${at(left)};width:${TR.arcW}px;height:${TR.arcH}px;transform:scaleX(${even ? -1 : 1}) rotate(-1deg)" aria-hidden="true"><path d="${ARCH_PATH}" fill="${look.route}" fill-opacity="${rows[i - 1].done ? 1 : 0.08}"/></svg>
      <img class="tr-island" src="${island}" alt="" style="top:${y + TR.arcH / 2 - ih / 2 + ISLAND_DY[(i - 1) % ISLAND_DY.length]}px;${even ? "right" : "left"}:4px;width:${TR.islandW}px">`;
  }).join("");
  // A unit is done, the child's (it holds the current lesson) or ahead; its cards take the colour of the first two.
  const unitState = [...new Set(unitAt)].map((u) => { const is = rows.map((_, i) => i).filter((i) => unitAt[i] === u); return is.includes(cur) ? "now" : is.every((i) => rows[i].state === "done") ? "done" : "ahead"; });
  const pillY = (i) => (mid(i - 1) + mid(i)) / 2;
  const lines = rows.map((r, i) => r.topicStart && i ? `<div class="tr-unitpill ${unitState[unitAt[i]]}" style="top:${pillY(i)}px"><small>${esc(K.unit(unitAt[i] + 1))}</small><b>${esc(r.topic)}</b></div>` : "").join("");
  // The course at the top, as Brilliant opens a course: its picture, name, what it covers,
  // how much is in it and how much is done. Scrolling on, the unit card sticks under it.
  // What it covers is the units' names; a line written for the child would replace it.
  const sets = [...new Set(rows.map((r) => r.s))], units = [...new Set(rows.map((r) => r.topic).filter(Boolean))];
  const nLessons = sets.reduce((k, x) => k + x.lessons.length, 0), nDone = sets.reduce((k, x) => k + Math.min(lessonsDone(x), x.lessons.length), 0);
  const tasksOf = (l) => (l.activities ?? []).reduce((k, a) => k + (a.draw ?? a.tasks?.length ?? 0) + (a.stages ?? []).reduce((m, st) => m + st.tasks.length, 0), 0);
  const nTasks = sets.reduce((k, x) => k + x.lessons.reduce((m, l) => m + tasksOf(l), 0), 0);
  const covers = units.slice(0, 3).map((u, k) => k && lg === "en" ? u.toLowerCase() : u).join(", ") + (units.length > 3 ? ` ${K.more}` : "");
  // At the end of the course, the next one: the same subject's next year.
  const ys = yearsOf(APP.subj), ny = ys[ys.indexOf(year) + 1];
  const nextUnits = ny ? [...new Set(courseSets(APP.subj, ny).map((x) => x.topic?.[lg] ?? x.topic?.en).filter(Boolean))] : [];
  const nextCovers = nextUnits.slice(0, 3).map((u, k) => k && lg === "en" ? u.toLowerCase() : u).join(", ") + (nextUnits.length > 3 ? ` ${K.more}` : "");
  const upNext = ny ? `<section class="tr-next" style="top:${mid(rows.length - 1) + 110}px"><small>${esc(K.upNext)}</small><h3>${esc(SUBJ_NAME[c.curriculum][APP.subj] ?? APP.subj)} · ${esc(yearName(ny))}</h3>${nextUnits.length ? `<p>${esc(nextCovers)}.</p>` : ""}<button type="button">${esc(K.look)}</button></section>` : "";
  const intro = `<header class="tr-intro"><img src="study/${art}.svg" alt=""><h2>${esc(SUBJ_NAME[c.curriculum][APP.subj] ?? APP.subj)} · ${esc(yearName(year))}</h2><p>${esc(covers)}.</p>
      <span class="tr-intro-n"><span>${LESSON_ICON}${esc(K.lessons(nLessons))}</span><span>${PUZZLE_ICON}${esc(K.tasks(nTasks))}</span></span>
      <span class="tr-intro-done"><i style="--p:${nLessons ? Math.round((100 * nDone) / nLessons) : 0}%"></i>${esc(K.doneOf(nDone, nLessons))}</span></header>`;
  const stones = rows.map((r, i) => `<button class="tr-stone ${r.state}" data-i="${i}" style="top:${top(i) + (TR.decor - TR.stoneH) / 2}px;left:${at(-TR.stone / 2)};width:${TR.stone}px" aria-label="${esc(rowTitle(r))}"><img src="study/${files}-stone-${r.state === "done" ? "done" : "active"}.png" alt=""></button>`).join("");
  const mascot = rows.length ? `<img class="tr-mascot" data-i="${cur}" src="${A}mascot/start-2.png" alt="" style="top:${mid(cur) - TR.mascot * 1.05}px;left:${at(TR.decor / 2 - TR.mascot * 1.2)};width:${TR.mascot}px">` : "";
  scr.style.setProperty("--subj", colour); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div>
    ${trackStats(art)}
    <div class="pr-home app-page tr-page" style="--route:${look.route};--g1:${look.grad[0]};--g2:${look.grad[1]};--soft:${look.soft}">
      ${intro}<button class="tr-card"><span><small id="trUnitNo"></small><b id="trUnit"></b></span>${CHEVRON}</button>
      <div class="tr-path ${art}" style="height:${top(rows.length) + (ny ? 300 : 420)}px">${arcs}${lines}${stones}${mascot}${upNext}</div>
    </div><div class="tr-fade" aria-hidden="true"></div>
    <div class="tr-dock" style="--route:${look.route};--g1:${look.grad[0]};--g2:${look.grad[1]};--soft:${look.soft}"><button class="tr-now" hidden></button><div class="tr-dock-in" aria-live="polite"></div></div>`;
  scr.appendChild(appTabs("study"));
  wireHeader(scr);
  const page = $(".tr-page", scr), dock = $(".tr-dock-in", scr), now = $(".tr-now", scr), card = $(".tr-card", scr), path = $(".tr-path", scr);
  let focus = -1, all = false, skate = null;
  // The stone in focus (the one at the middle of the track; the study animation will mark it): the card at the
  // bottom shows it with its button: Start on the lesson the child is up to, Play again on one
  // done, a lock and the lesson to finish first on one still locked.
  const show = (i, force) => {
    const r = rows[i]; if (!r || (i === focus && !force)) return;
    if (i !== focus) all = false;
    const moved = i !== focus; focus = i;
    scr.querySelectorAll(".tr-stone").forEach((b) => b.classList.toggle("focus", +b.dataset.i === i));
    const done = lessonsDone(r.s), n = r.s.lessons.length, next = r.s.lessons[Math.min(done, n - 1)], locked = r.state === "locked", finished = r.state === "done";
    // A lesson stone shows that lesson; a skill stone the lesson the child is up to.
    const at = r.l ? r.k : done, label = locked ? K.locked : finished ? K.again : done && !r.l ? K.goOn : K.start;
    const before = rows.slice(0, i).findLast((x) => x.state !== "done" && x.state !== "locked") ?? rows[cur];
    const row = (l, k) => `<li><button data-n="${l.n}" class="${k < done ? "done" : k === done && !locked ? "now" : ""}"${locked ? " disabled" : ""}><i>${k < done ? TICK : l.n}</i><span>${esc(l.title[lg] ?? l.title.de)}</span></button></li>`;
    const shown = all ? r.s.lessons.map(row) : [];
    // One stone is one lesson, so the card is short: the title on the left, the minutes (or a lock) on the right, the button.
    dock.innerHTML = `<span class="tr-head"><b>${keepSuffix(rowTitle(r))}</b><span class="tr-min">${locked ? LOCK : esc(K.min(r.s.minutes ?? 10))}</span></span>
      ${shown.length ? `<ol class="tr-ls">${shown.join("")}</ol>` : ""}
      <span class="tr-actions"><button class="tr-go ${r.state}"${locked ? ` disabled title="${esc(K.first(rowTitle(before)))}"` : ""}>${esc(label)}</button>
        ${r.l ? "" : `<button class="tr-more" aria-expanded="${all}" aria-label="${esc(all ? K.showLess : K.showAll(n))}" title="${esc(all ? K.showLess : K.showAll(n))}">${LIST}</button>`}</span>`;
    if (moved) { dock.classList.remove("swap"); void dock.offsetWidth; dock.classList.add("swap"); }
    $(".tr-more", dock)?.addEventListener("click", () => { all = !all; show(i, true); });
    dock.querySelectorAll("[data-n]").forEach((b) => b.onclick = () => startLesson(r.s.id, +b.dataset.n));
    $(".tr-go", dock).onclick = () => startLesson(r.s.id, r.l ? r.l.n : r.state === "done" ? r.s.lessons[0].n : next.n);
    // Away from the child's lesson, a round button above the card brings it back, pointing its way.
    now.hidden = i === cur; now.className = `tr-now ${i < cur ? "down" : "up"}`;
  };
  now.innerHTML = CHEVRON; now.setAttribute("aria-label", K.toNow); now.title = K.toNow;
  // The app's skate and study card on the current skill (anim-ui.js).
  APP.skate = skate = trackSkate({ path, rows, cur, top, art,
    onStart: () => { const r = rows[cur], d = lessonsDone(r.s); startLesson(r.s.id, r.l ? r.l.n : r.s.lessons[Math.min(d, r.s.lessons.length - 1)].n); },
    onNext: (i) => { show(i, true); scrollTo(i, "smooth"); } });
  // The skate keeps its mascot and route; its own card gives way to the card at the bottom.
  skate?.hide(true);
  // The focus line: the middle of the track's window.
  const focusY = () => page.getBoundingClientRect().top + page.clientHeight * 0.5 - path.getBoundingClientRect().top;
  const scrollTo = (i, behavior, lower = 0) => page.scrollTo({ top: Math.max(0, page.scrollTop + mid(i) - focusY() - lower), behavior });
  // Scrolling moves the focus. The track's own opening scroll is not the child's: it leaves the focus on the current skill.
  let quiet = 0;
  const nearest = (y) => rows.reduce((b, _, i) => Math.abs(mid(i) - y) < Math.abs(mid(b) - y) ? i : b, 0);
  // The unit card on top names the unit whose card has last passed under it, as Brilliant's level card does.
  const pills = rows.map((r, i) => r.topicStart && i ? [pillY(i), unitAt[i]] : null).filter(Boolean);
  let unitShown = -1;
  const sticky = () => {
    const edge = card.getBoundingClientRect().bottom - path.getBoundingClientRect().top;
    const u = pills.filter(([y]) => y <= edge).at(-1)?.[1] ?? 0; if (u === unitShown) return; unitShown = u;
    const i = unitAt.indexOf(u), r = rows[i];
    $("#trUnitNo").textContent = K.unit(u + 1); $("#trUnit").textContent = r.topic || (r.s.title[lg] ?? r.s.title.de);
    card.className = `tr-card ${unitState[u]}`;
  };
  page.onscroll = () => { sticky(); if (Date.now() < quiet) return; const i = nearest(focusY()); if (i !== focus) show(i); };
  const nx = $(".tr-next button", scr); if (nx) nx.onclick = () => { APP.year = ny; renderTrack(); };
  // Tapping a stone brings it to the middle, as scrolling there would.
  scr.querySelectorAll(".tr-stone, .tr-mascot").forEach((b) => b.onclick = () => { const i = +b.dataset.i; show(i); scrollTo(i, "smooth"); });
  now.onclick = () => { show(cur); scrollTo(cur, "smooth"); };
  APP.trackTaps?.abort();
  // The card opens the lesson list on the skill in focus.
  card.onclick = () => { APP.units = true; APP.year = year; APP.openSet = rows[focus]?.s.id ?? null; renderStudy(); };
  $(".tr-pill", scr).onclick = (e) => subjectMenu(e.currentTarget);
  // Open on the current skill.
  quiet = Date.now() + 500;
  scrollTo(cur, "auto"); show(cur); sticky();
}
// The subject menu under the pill: each subject with its icon.
function subjectMenu(pill) {
  const m = document.createElement("div"); m.className = "tr-menu"; m.setAttribute("role", "menu");
  m.innerHTML = appSubjects().map((x) => { const a = trackArt(x); return `<button role="menuitem" data-s="${x}"${x === APP.subj ? ' aria-current="true"' : ""}><img src="study/${a}.svg" alt="">${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</button>`; }).join("");
  const close = () => { m.remove(); document.removeEventListener("pointerdown", away, true); };
  const away = (e) => { if (!m.contains(e.target) && e.target !== pill) close(); };
  m.querySelectorAll("button").forEach((b) => b.onclick = () => { close(); APP.subj = b.dataset.s; APP.year = null; APP.openSet = null; APP.units ? renderStudy() : renderTrack(); });
  $("#screen").appendChild(m); document.addEventListener("pointerdown", away, true);
}

/* ---------- Rewards: a popover from the streak, stars and badges ---------- */
// It hangs from what was tapped, its tail pointing there, with a tab each for
// the streak (this week and the next streak badge), the stars (by subject) and
// the badges (the newest, the ones on their way, then all the rest), so the
// child never has to leave the screen it is on.
const RWTXT = {
  de: { title: "Deine Belohnungen", tabs: { streak: "Serie", stars: "Sterne", badges: "Abzeichen" }, recent: "Zuletzt verdient", next: "Als Nächstes", none: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", rest: (n) => `Alle weiteren (${n})`, close: "Schließen", starsHow: "Sterne bekommst du für jede Fähigkeit: üben, können, behalten.", streakBig: (n) => n === 1 ? "Schultag in Folge" : "Schultage in Folge", dayStreak: (n) => n === 1 ? "Tag in Folge" : "Tage in Folge", longest: "Längste Serie", days: (n) => n === 1 ? "1 Tag" : `${n} Tage`, badgesWord: (n) => n === 1 ? "Abzeichen" : "Abzeichen", allBadges: "Alle Abzeichen" },
  en: { title: "Your rewards", tabs: { streak: "Streak", stars: "Stars", badges: "Badges" }, recent: "Earned lately", next: "Up next", none: "None yet. The first comes with your first skill at I can do it.", rest: (n) => `All the others (${n})`, close: "Close", starsHow: "You get stars for every skill: practise it, can do it, remember it.", streakBig: (n) => n === 1 ? "school day in a row" : "school days in a row", dayStreak: () => "day streak", longest: "Longest streak", days: (n) => n === 1 ? "1 day" : `${n} days`, badgesWord: (n) => n === 1 ? "badge" : "badges", allBadges: "All badges" },
};
const RW = () => RWTXT[PL()];
const allStars = (c) => appSubjects().flatMap((x) => courseSets(x).map((st) => st.skill)).reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0);
// The streak and the badges, each as a card that rises from the bottom over the dimmed screen,
// as in the B2C App Exploration design in Figma (header pop-ups: streak 9576:12999, badges 9576:14526).
// Streak: the days in a row, the school week ticked off, the longest run. Badges: how many, the two
// newest and the next one to earn, and the way to all of them. A tap outside closes it.
const RW_ART = "twist-ui/";
function rewardsPopover(anchor, kind = "badges") {
  document.querySelector(".rw-pop")?.dispatchEvent(new Event("close"));
  const T = AT(), R = RW(), c = PR.child, scr = $("#screen"), s = streak(c);
  let body;
  if (kind === "streak") {
    const mon = c.today - (((c.today % 7) + 7) % 7), act = new Set(c.active ?? []);
    const days = T.days.map((d, i) => { const on = act.has(mon + i); return `<span class="rw-day${on ? " on" : ""}${mon + i === c.today ? " today" : ""}" title="${esc(on ? T.dayPlayed : mon + i === c.today ? T.dayToday : mon + i < c.today ? T.dayMissed : "")}"><i>${on ? `<img src="${RW_ART}rw-check.svg" alt="">` : ""}</i><small>${esc(d)}</small></span>`; }).join("");
    body = `<div class="rw-hero"><span><img class="rw-fire" src="${RW_ART}rw-fire.svg" alt=""><b>${s.current}</b></span><small>${esc(R.dayStreak(s.current))}</small></div>
      <div class="rw-week">${days}</div>
      <div class="rw-box rw-best"><small>${esc(R.longest)}</small><b>${esc(R.days(s.best))}</b></div>`;
  } else {
    const all = myBadges(), seen = c.badgeSeen ?? {}, got = all.filter((b) => b.earned).sort((x, y) => (seen[y.id]?.n ?? 0) - (seen[x.id]?.n ?? 0));
    const show = got.slice(0, 2); show.push(...nextBadges(all, 3 - show.length));
    body = `<div class="rw-hero"><span><img class="rw-gem" src="${RW_ART}rw-gem.svg" alt=""><b>${got.length}</b></span><small>${esc(R.badgesWord(got.length))}</small></div>
      <div class="rw-box rw-bds">${show.map((b) => `<button class="rw-bd${b.earned ? "" : " locked"}" data-bd="${esc(b.id)}"><img src="${RW_ART}rw-badge.png" alt=""><small>${esc(badgeName(b.id))}</small></button>`).join("")}</div>
      <button class="rw-all">${esc(R.allBadges)}<img src="${RW_ART}rw-chevron.svg" alt=""></button>`;
  }
  const scrim = document.createElement("div"); scrim.className = "rw-scrim";
  const m = document.createElement("div"); m.className = `rw-pop rw-${kind}`; m.setAttribute("role", "dialog"); m.setAttribute("aria-label", R.tabs[kind] ?? R.title); m.tabIndex = -1;
  m.innerHTML = body;
  const close = () => { m.classList.add("out"); scrim.classList.add("out"); setTimeout(() => { m.remove(); scrim.remove(); }, 180); document.removeEventListener("keydown", esc_); };
  const esc_ = (e) => { if (e.key === "Escape") close(); };
  m.addEventListener("close", close);
  scrim.onclick = close; document.addEventListener("keydown", esc_);
  m.querySelectorAll("[data-bd]").forEach((b) => b.onclick = () => { const x = myBadges().find((y) => y.id === b.dataset.bd); if (x) badgeSheet(x); });
  const all = $(".rw-all", m); if (all) all.onclick = () => { close(); appTab("me"); setTimeout(() => $(".me-bds")?.scrollIntoView({ block: "start", behavior: "smooth" }), 60); };
  scr.append(scrim, m); m.focus();
}

/* ---------- Study: the unit list ---------- */
// The lesson list, as in the B2C App Exploration design in Figma (study screen, "math" frames):
// the subject, the year, then every unit of the year as a quiet row. One unit is open at a
// time, the next one to do to start with: its progress, its lessons numbered, and To lesson.
// The subject and the stats sit in the track's top bar.
const STF = {
  de: { lessons: "Lektionen", go: "Zur Lektion", again: "Nochmal spielen" },
  en: { lessons: "Lessons", go: "To lesson", again: "Play again" },
};
function trackStats(art) {
  const K = TK(), s = streak(PR.child);
  // Only the streak and the badges, as in the design; the stars stay on the lessons.
  return `<header class="tr-stats">
      <button class="tr-pill" aria-haspopup="true" aria-label="${esc(K.subject)}"><img src="study/${art}.svg" alt="">${CHEVRON}</button>
      <button class="tr-stat tr-streak" data-rw="streak" aria-label="${esc(RW().tabs.streak)}"><img src="${RW_ART}rw-fire.svg" alt="">${s.current}</button>
      <button class="tr-stat tr-badges" data-rw="badges" aria-label="${esc(RW().tabs.badges)}"><img src="${RW_ART}rw-gem.svg" alt="">${myBadges().filter((b) => b.earned).length}</button>
    </header>`;
}
function renderStudy() {
  const T = AT(), F = STF[PL()], lg = PL(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  if (!subs.includes(APP.subj)) APP.subj = subs[0];
  const years = yearsOf(APP.subj), mine = childYearFor(APP.subj);
  if (!years.includes(APP.year)) APP.year = mine;
  const sets = courseSets(APP.subj, APP.year), colour = colourOf(APP.subj), art = trackArt(APP.subj);
  const next = nextIn(sets);
  if (APP.openSet !== "" && !sets.some((s) => s.id === APP.openSet)) APP.openSet = (next ?? sets[0])?.id ?? null;
  const subjName = SUBJ_NAME[c.curriculum][APP.subj] ?? APP.subj;
  const unit = (s) => {
    const done = lessonsDone(s), n = s.lessons.length, title = esc(s.title[lg] ?? s.title.de);
    if (s.id !== APP.openSet) return `<button class="stf-unit" data-open="${esc(s.id)}" aria-expanded="false">${title}</button>`;
    const l = s.lessons[done >= n ? 0 : done];
    return `<div class="stf-unit open" style="--p:${(100 * done) / n}%">
      <button class="stf-head" data-open="" aria-expanded="true"><b>${title}</b><i class="stf-bar" role="img" aria-label="${esc(TK().lessonOf(Math.min(done + 1, n), n))}"></i><span class="stf-chev" aria-hidden="true"></span></button>
      <ol class="stf-lessons">${s.lessons.map((x, k) => `<li class="${k < done ? "done" : ""}"><button data-start="${esc(s.id)}" data-n="${x.n}">${esc(x.title[lg] ?? x.title.de)}</button></li>`).join("")}</ol>
      <button class="stf-go" data-start="${esc(s.id)}" data-n="${l.n}">${esc(done >= n ? F.again : F.go)}</button>
    </div>`;
  };
  scr.style.setProperty("--subj", colour); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div>${trackStats(art)}
    <div class="pr-home app-page stf-page" data-subj="${esc(APP.subj)}" style="--c:${colour}">
      <div class="stf-title"><button class="stf-back" aria-label="${esc(TK().back)}"></button><img src="study/${art}.svg" alt=""><h2>${esc(subjName)}</h2></div>
      <div class="stf-grade"><button class="stf-grade-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${esc(T.year)}: ${esc(yearName(APP.year))}">${esc(yearName(APP.year))}${APP.year === mine ? `<small>${esc(T.yourYear)}</small>` : ""}</button>
        <ul class="stf-grade-list" role="listbox" aria-label="${esc(T.year)}" hidden>${years.map((y) => `<li><button role="option" data-year="${esc(y)}" aria-selected="${y === APP.year}">${esc(yearName(y))}${y === mine ? `<small>${esc(T.yourYear)}</small>` : ""}</button></li>`).join("")}</ul></div>
      <h3 class="stf-h">${esc(F.lessons)}</h3>
      <div class="stf-list">${sets.map(unit).join("") || `<p class="pr-empty">${esc(T.nothing)}</p>`}</div>
    </div>`;
  scr.appendChild(appTabs("study"));
  wireHeader(scr);
  $(".tr-pill", scr).onclick = (e) => subjectMenu(e.currentTarget);
  $(".stf-back", scr).onclick = () => { APP.units = false; renderTrack(); };
  // The year: the app's own list, not the system's, so it looks the same on every phone.
  const gBtn = $(".stf-grade-btn", scr), gList = $(".stf-grade-list", scr);
  const fold = (open) => { gList.hidden = !open; gBtn.setAttribute("aria-expanded", open); if (open) gList.querySelector('[aria-selected="true"]')?.focus(); };
  gBtn.onclick = (e) => { e.stopPropagation(); fold(gList.hidden); };
  gList.querySelectorAll("[data-year]").forEach((b) => b.onclick = () => { APP.year = b.dataset.year; APP.openSet = null; renderStudy(); });
  gList.onkeydown = (e) => {
    const opts = [...gList.querySelectorAll("[data-year]")], i = opts.indexOf(document.activeElement);
    if (e.key === "Escape") { e.preventDefault(); fold(false); gBtn.focus(); }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); opts[Math.max(0, Math.min(opts.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)))]?.focus(); }
  };
  // A tap anywhere else folds it; one listener per list drawn, the last one's goes.
  APP.gradeTaps?.abort(); APP.gradeTaps = new AbortController();
  scr.addEventListener("click", (e) => { if (!gList.hidden && !e.target.closest(".stf-grade")) fold(false); }, { signal: APP.gradeTaps.signal });
  // One unit open at a time: a tap opens it, a tap on the open one's head folds it.
  scr.querySelectorAll("[data-open]").forEach((b) => b.onclick = () => { APP.openSet = b.dataset.open; const y = $(".stf-page", scr).scrollTop; renderStudy(); $(".stf-page").scrollTop = y; });
  wireStarts(scr);
  if (APP.openSet && !APP.studyKeep) $(".stf-unit.open", scr)?.scrollIntoView({ block: "center" });
  APP.studyKeep = false;
}
// Called by the lesson end screen when the lesson was started from the app.
function appLessonDone(checkSteps, pass) {
  const c = appChild();
  if (set.curriculum !== c.curriculum || steps._recorded) return;
  steps._recorded = true;
  const check = pass == null ? null : { pass, keys: checkSteps.map(([s]) => taskKey(set.id, lesson.n, s.t.id)) };
  finishLesson(c, { setId: set.id, skill: set.skill, n: lesson.n, check });
  // A stone finished (each lesson, or the skill with a stone per skill): Study's track skates on (anim-ui.js, trackSkate).
  if (stonesPerLesson() || lessonsDone(set) >= set.lessons.length) APP.skillDone = true;
  saveChild();
}
const openStudy = () => appTab("study", { keep: true });

const BADGE_NAME = {
  "number-navigator": ["Zahlenkompass", "Number Navigator"], "calculation-ace": ["Rechenass", "Calculation Ace"], "shape-shifter": ["Formenprofi", "Shape Shifter"],
  "measure-master": ["Messprofi", "Measure Master"], "data-detective": ["Datenspürnase", "Data Detective"], "code-cracker": ["Geheimcode", "Code Cracker"],
  bookworm: ["Leseratte", "Bookworm"], wordsmith: ["Schreibfeder", "Wordsmith"], "spelling-wizard": ["Fehlerfuchs", "Spelling Wizard"],
  "grammar-guardian": ["Sprachlupe", "Grammar Guardian"], "golden-mic": ["Goldenes Mikro", "Golden Mic"], chatterbox: ["Quasselstrippe", "Chatterbox"],
  "pen-pal": ["Brieftaube", "Pen Pal"], globetrotter: ["Globetrotter", "Globetrotter"], "lift-off": ["Startschuss", "Lift-off"], pathfinder: ["Startklar", "Pathfinder"],
  summit: ["Gipfel", "Summit"], "hat-trick": ["Hattrick", "Hat Trick"], legend: ["Legende", "Legend"], "elephant-memory": ["Elefantengedächtnis", "Elephant Memory"],
  "comeback-kid": ["Stehaufmännchen", "Comeback Kid"], "like-clockwork": ["Wie ein Uhrwerk", "Like Clockwork"], "busy-bee": ["Fleißiges Bienchen", "Busy Bee"],
  "time-traveller": ["Zeitreise", "Time Traveller"],
};
const badgeName = (id) => BADGE_NAME[id]?.[PL() === "de" ? 0 : 1] ?? streakName(id);
// The child's badges for its year (a foreign language by its learning year).
// Each badge is stamped the first time the app sees it earned, so the newest can come first.
function myBadges() {
  const c = PR.child, all = badges(c, Object.fromEntries(appSubjects().map((x) => [x, courseSets(x).map((s) => s.skill)])));
  const got = (c.badgeSeen ??= {}); let n = Object.keys(got).length, changed = false;
  for (const b of all) if (b.earned && !(b.id in got)) { got[b.id] = { day: c.today, n: n++ }; changed = true; }
  if (changed) saveChild();
  return all;
}
// The badges on their way: the closest first, one streak badge at a time; with none started, the first few to earn.
function nextBadges(all, max = 3) {
  const streakNext = all.find((b) => b.kind === "streak" && !b.earned)?.id;
  const open = all.filter((b) => !b.earned && b.need && (b.kind !== "streak" || b.id === streakNext));
  const close = open.filter((b) => b.have > 0).sort((x, y) => y.have / y.need - x.have / x.need);
  return (close.length ? close : open.sort((x, y) => x.need - y.need)).slice(0, max);
}
function badgeTile(b) {
  const T = AT(), part = b.need ? Math.min(1, b.have / b.need) : 0;
  const line = b.earned ? (b.gold ? T.gold : b.level ? T.level(b.level) : b.kind === "strand" ? T.earnedIn(yearName(childYearFor(b.subj))) : T.earned)
    : b.need ? T.ofN(b.have, b.need) : T.how[b.id] ?? "";
  const src = `${A}badges/${b.id}${b.gold ? ".gold" : ""}.svg`;
  // Earned badges float and catch the light, each at its own moment (anim.css); a tap opens the badge (anim-ui.js).
  return `<button class="bd${b.earned ? "" : " locked"}${b.gold ? " gold" : ""}" data-bd="${b.id}" style="--p:${100 * part};--m:url('${src}');--d:${(badgeTile.n = ((badgeTile.n ?? 0) + 1) % 7) * 0.7}s"><span class="bd-art"><img src="${src}" alt=""></span><b>${esc(badgeName(b.id))}</b><small>${esc(line)}</small>${!b.earned && b.need ? `<i class="pr-bar"><i style="width:${100 * part}%"></i></i>` : ""}</button>`;
}
// The school week the pretend day is in, Monday to Friday, the days played lit.
function weekStrip(c) {
  const T = AT(), mon = c.today - (((c.today % 7) + 7) % 7), act = new Set(c.active ?? []);
  // Played: a flame. Today, not yet: a faint flame waiting. Missed: a dot. Still to come: empty.
  const cell = (day) => act.has(day) ? `<img src="${A}badges/flame.svg" alt="">` : day === c.today ? `<img class="wait" src="${A}badges/flame.svg" alt="">` : day < c.today ? "<b></b>" : "";
  const none = !T.days.some((_, i) => act.has(mon + i));
  return `<div class="me-week">${T.days.map((d, i) => { const day = mon + i; return `<span class="${act.has(day) ? "on" : day < c.today ? "miss" : ""}${day === c.today ? " now" : ""}${day > c.today ? " later" : ""}" title="${esc(act.has(day) ? T.dayPlayed : day === c.today ? T.dayToday : day < c.today ? T.dayMissed : "")}"><i>${cell(day)}</i><small>${esc(d)}</small></span>`; }).join("")}</div>${none && c.today % 7 < 5 ? `<small class="me-hint">${esc(T.lightFirst)}</small>` : ""}`;
}
/* ---------- Me ---------- */
// The child's own page: this week and the streak, the badges (earned, close,
// and the rest), the subjects and the drill records.
function renderMe() {
  const T = AT(), c = appChild(), scr = $("#screen");
  const s = streak(c), all = myBadges(), got = all.filter((b) => b.earned);
  const close = nextBadges(all).filter((b) => b.have > 0);
  const rest = all.filter((b) => !b.earned && !close.includes(b));
  const ks = appSubjects().flatMap((x) => courseSets(x).map((st) => st.skill)), stars = ks.reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0);
  const recs = Object.entries(c.drills ?? {}).filter(([k, d]) => d.best && PR.index.bySkill[k]).sort((a, b) => b[1].best - a[1].best);
  const nextStreak = s.next ? T.streakTo(s.next[0] - s.current, streakName(s.next[1])) : "";
  scr.style.setProperty("--subj", BRAND); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page">
    <header class="me-band fun-band" style="--room:${ROOM.me}">${avatar(c, "lg")}<div><h2>${esc(c.name ?? T.meTitle)}</h2><small>${esc(yearName(c.year))} · ${esc(ST().cur[c.curriculum])}</small></div>
      <button class="me-gear" data-settings aria-label="${esc(ST().title)}">${GEAR}</button></header>
    <div class="me-tiles">
      <div><b>${stars}</b><span>★ ${esc(T.stars)}</span></div>
      <button data-scroll="me-week"><b>${s.current}</b><span>${esc(T.streak)}</span></button>
      <button data-scroll="me-badges"><b>${got.length}</b><span>${esc(T.badges)}</span></button>
    </div>
    <section class="me-card me-streak" id="me-week"><div><b>${esc(T.thisWeek)}</b><small>${esc(T.streakNow(s.current))} · ${esc(T.streakBest(s.best))}</small></div>
      ${weekStrip(c)}<small class="me-note">${nextStreak ? `${esc(nextStreak)}. ` : ""}${esc(T.streakNote)}</small></section>
    <section id="me-badges" class="me-bds"><h3 class="pr-h">${esc(T.badges)}<small>${esc(T.ofN(got.length, all.length))}</small></h3>
      ${got.length ? `<div class="bd-grid">${got.map(badgeTile).join("")}</div>` : `<p class="pr-empty">${esc(T.noBadges)}</p>`}
      ${close.length ? `<h4 class="hm-step">${esc(T.almost)}</h4><div class="bd-grid">${close.map(badgeTile).join("")}</div>` : ""}
      <details class="bd-all"><summary>${esc(T.allBadges(rest.length))}${CHEVRON}</summary><div class="bd-grid">${rest.map(badgeTile).join("")}</div></details></section>
    <h3 class="pr-h">${esc(T.subjects)}</h3>
    <div class="me-subj">${appSubjects().map((x) => { const sk = courseSets(x).map((st) => st.skill), g = sk.reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0), max = sk.length * 3; return `<button data-subj="${x}" style="--c:${colourOf(x)}"><b>${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</b><small>${esc(T.ofStars(g, max))}</small><i class="pr-bar"><i style="width:${max ? (100 * g) / max : 0}%"></i></i></button>`; }).join("")}</div>
    <h3 class="pr-h">${esc(T.records)}</h3>
    ${recs.length ? `<div class="me-recs">${recs.map(([k, d]) => `<button data-drill="${esc(k)}" style="--c:${colourOf(subjOfSkill(k))}"><span>${esc(setOfSkill(k)?.title[PL()] ?? k)}</span><b>${esc(T.perMin(d.best))}</b></button>`).join("")}</div>` : `<p class="pr-empty">${esc(T.noRecords)}</p>`}
  </div>`;
  scr.appendChild(appTabs("me"));
  wireHeader(scr);
  scr.querySelectorAll("[data-scroll]").forEach((b) => b.onclick = () => $("#" + b.dataset.scroll, scr).scrollIntoView({ behavior: "smooth", block: "start" }));
  scr.querySelectorAll("[data-subj]").forEach((b) => b.onclick = () => { APP.subj = b.dataset.subj; APP.year = null; APP.topic = null; APP.q = ""; appTab("study"); });
  scr.querySelectorAll("[data-drill]").forEach((b) => b.onclick = () => { appTab("practice"); renderDrillMap(b.dataset.drill); });
}

/* ---------- Settings: opened from the gear on Me, or the picture on Start ---------- */
// The child's profile (name, picture), what it learns (curriculum, year), the
// look, sound and handwriting, and a fresh start. A curriculum keeps its own
// progress: switching away and back brings it back (child.stash).
const GEAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2.6-1.5L14 2.5h-4l-.4 2.5A7.5 7.5 0 0 0 7 6.5l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 3l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2.6 1.5l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 2.6-1.5l2.4 1 2-3.4z"/></svg>';
const PENCIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1-4.5L16 4.5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M14 6.5l3 3"/></svg>';
const DICE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.4" class="fill"/><circle cx="15.5" cy="15.5" r="1.4" class="fill"/><circle cx="12" cy="12" r="1.4" class="fill"/></svg>';
const CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/></svg>';
const STXT = {
  de: { title: "Einstellungen", profile: "Ich", name: "Name", newName: "Neuer Name", picture: "Bild", photo: "Foto", colour: "Farbe", learn: "Lernen", curriculum: "Lehrplan", cur: { "de-DE": "Deutschland", "en-GB": "England" }, curNote: "Jeder Lehrplan behält seinen eigenen Fortschritt.", year: "Klasse", look: "Aussehen", looks: { light: "Hell", dark: "Dunkel", night: "Nacht" }, lookNote: { light: "Hell und bunt", dark: "Schont die Augen im Dunkeln", night: "Dunkel und warm, für den Abend" }, sound: "Ton und Spielen", autoAudio: "Aufgaben vorlesen", autoAudioSub: "Jede Frage wird gleich vorgelesen", autoNext: "Automatisch weiter", autoNextSub: "Nach einer richtigen Antwort nach 3 Sekunden", script: "Schreibschrift", scriptSub: "So sehen die Schreiblinien aus", scripts: { sas: "Schulausgangsschrift", la: "Lateinische Ausgangsschrift", va: "Vereinfachte Ausgangsschrift", grund: "Grundschrift" }, back: "Zurück" },
  en: { title: "Settings", profile: "Me", name: "Name", newName: "New name", picture: "Picture", photo: "Photo", colour: "Colour", learn: "Learning", curriculum: "Curriculum", cur: { "de-DE": "Germany", "en-GB": "England" }, curNote: "Each curriculum keeps its own progress.", year: "Year", look: "Look", looks: { light: "Light", dark: "Dark", night: "Night" }, lookNote: { light: "Bright and colourful", dark: "Easy on the eyes in the dark", night: "Dark and warm, for the evening" }, sound: "Sound and play", autoAudio: "Read tasks aloud", autoAudioSub: "Every question is read out straight away", autoNext: "Move on by itself", autoNextSub: "3 seconds after a right answer", script: "Handwriting", scriptSub: "How the writing lines look", scripts: { sas: "Schulausgangsschrift", la: "Lateinische Ausgangsschrift", va: "Vereinfachte Ausgangsschrift", grund: "Grundschrift" }, back: "Back" },
};
const ST = () => STXT[PL()];
// The app's own settings rows (app/settings.tsx, entry.settings): sound and feel, notifications, account, storage.
const STXT2 = {
  de: { feel: "Töne & Vibration", narration: "Vorlesen", narrationSub: "Liest Fragen und Anleitungen laut vor", sfx: "Soundeffekte", sfxSub: "Spielt Töne beim Tippen, bei Antworten und Belohnungen", vibrate: "Vibration", vibrateSub: "Ein kurzes Brummen beim Tippen und Antworten",
    notify: "Mitteilungen", remind: "Erinnerungen zum Üben", remindSub: "Ein kleiner Anstupser pro Tag, damit du dranbleibst",
    account: "Konto", avatar: "Avatar ändern", avatarSub: "Wähle ein neues Bild für dieses Profil", logout: "Abmelden", logoutSub: "Meldet dieses Gerät ab", logoutSure: "Abmelden? Danach musst du den QR-Code noch mal scannen. Tippe nochmal.",
    storage: "Speicher", clear: "Downloads löschen", clearSub: "Schafft Platz – Lektionen laden beim Öffnen neu", clearSure: "Downloads löschen? Deine Punkte, Abzeichen und dein Fortschritt bleiben. Tippe nochmal.", cleared: "Gelöscht. Lektionen laden beim Öffnen neu.",
    version: (v) => `Version ${v}` },
  en: { feel: "Sound & feel", narration: "Narration", narrationSub: "Reads questions and instructions aloud", sfx: "Sound effects", sfxSub: "Plays sounds for taps, answers and rewards", vibrate: "Vibration", vibrateSub: "A small buzz when tapping and answering",
    notify: "Notifications", remind: "Practice reminders", remindSub: "A daily nudge to keep practising",
    account: "Account", avatar: "Change avatar", avatarSub: "Pick a new picture for this profile", logout: "Log out", logoutSub: "Signs out of this device", logoutSure: "Log out? You'll need to scan the QR code again to get back in. Tap again.",
    storage: "Storage", clear: "Clear downloaded content", clearSub: "Frees up space — lessons download again when opened", clearSure: "Clear downloaded content? Your XP, badges and progress stay. Tap again.", cleared: "Cleared. Lessons will download again when you open them.",
    version: (v) => `Version ${v}` },
};
const pref = (k, def) => { try { const v = localStorage.getItem(k); return v == null ? def : v === "1"; } catch { return def; } };
const setPref = (k, on) => { try { localStorage.setItem(k, on ? "1" : "0"); } catch {} };
// Move the child to another curriculum: this one's progress is put away, the other's comes back.
function switchCurriculum(cur) {
  const c = PR.child; if (cur === c.curriculum) return;
  const { stash = {}, name, avatar: av } = c, keep = { ...c }; delete keep.stash;
  const y = YEAR_OF(cur)[0], s = D.sets.find((x) => x.year === y && x.id.startsWith(cur + "."));
  PR.child = { ...(stash[cur] ?? newChild({ curriculum: cur, year: y, band: ageBand(s?.ages) })), name, avatar: av, stash: { ...stash, [c.curriculum]: keep } };
  delete PR.child.stash[cur];
  PR.on = false; PR.session = null; PR.index = indexContent(D.sets, D.drills, cur);
}
// A photo, cropped to a square and made small enough to keep with the child.
function readPhoto(file, done) {
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => { const n = 160, cv = document.createElement("canvas"), s = Math.min(img.width, img.height); cv.width = cv.height = n; cv.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, n, n); URL.revokeObjectURL(url); done(cv.toDataURL("image/jpeg", 0.85)); };
  img.src = url;
}
function renderSettings() {
  const S = ST(), c = appChild(), scr = $("#screen"), a = c.avatar ?? {}, look = getLook();
  const S2 = STXT2[PL()];
  const link = (id, label, sub, cls = "") => `<button class="set-row set-link ${cls}" id="${id}"><span><b>${esc(label)}</b><small>${esc(sub)}</small></span>${cls ? "" : CHEVRON}</button>`;
  const sw = (id, on, label, sub) => `<label class="set-row set-sw"><span><b>${esc(label)}</b><small>${esc(sub)}</small></span><input type="checkbox" role="switch" id="${id}"${on ? " checked" : ""}><i aria-hidden="true"></i></label>`;
  scr.style.setProperty("--subj", BRAND); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home pr-page app-page set-page">
    <header class="pr-band fun-band" style="--c:${ROOM.me};--room:${ROOM.me}"><button class="pr-back" aria-label="${esc(S.back)}">${CHEVRON}</button><h2>${esc(S.title)}</h2></header>
    <section class="set-me"><button class="set-avbtn" aria-expanded="${!!APP.editPic}" aria-controls="setPics" aria-label="${esc(STXT2[PL()].avatar)}">${avatar(c, "xl")}<i>${PENCIL}</i></button>
      <div class="set-name"><label for="setName">${esc(S.name)}</label><span><input id="setName" value="${esc(c.name ?? "")}" maxlength="20" autocomplete="off"><button id="setDice" aria-label="${esc(S.newName)}" title="${esc(S.newName)}">${DICE}</button></span></div></section>
    <section class="set-card" id="setPics"${APP.editPic ? "" : " hidden"}><h3>${esc(S.picture)}</h3>
      <div class="set-avs" role="radiogroup" aria-label="${esc(S.picture)}">${AV_POSES.map((p) => `<button role="radio" aria-checked="${!a.photo && (a.pose ?? "start-1") === p}" data-pose="${p}" style="--av:${esc(a.bg ?? AV_BG[0])}"><img src="${A}mascot/${p}.png" alt=""></button>`).join("")}
        <label class="set-photo${a.photo ? " on" : ""}">${a.photo ? `<img src="${esc(a.photo)}" alt="">` : CAMERA}<span>${esc(S.photo)}</span><input type="file" accept="image/*" id="setPhoto" title="${esc(S.photo)}" aria-label="${esc(S.photo)}"></label></div>
      <div class="set-bgs" role="radiogroup" aria-label="${esc(S.colour)}"${a.photo ? " hidden" : ""}>${AV_BG.map((b) => `<button role="radio" aria-checked="${(a.bg ?? AV_BG[0]) === b}" data-bg="${b}" style="--av:${b}" aria-label="${esc(S.colour)} ${b}"></button>`).join("")}</div></section>
    <section class="set-card"><h3>${esc(S.learn)}</h3>
      <div class="set-row"><b>${esc(S.curriculum)}</b></div>
      <div class="set-seg" role="radiogroup" aria-label="${esc(S.curriculum)}">${["de-DE", "en-GB"].map((k) => `<button role="radio" data-cur="${k}" aria-checked="${k === c.curriculum}">${esc(S.cur[k])}</button>`).join("")}</div>
      <small class="set-note">${esc(S.curNote)}</small>
      <label class="set-row"><b>${esc(S.year)}</b><select id="setYear">${YEAR_OF(c.curriculum).map((y) => `<option value="${esc(y)}"${y === c.year ? " selected" : ""}>${esc(yearName(y))}</option>`).join("")}</select></label></section>
    <section class="set-card"><h3>${esc(S.look)}</h3>
      <div class="set-looks" role="radiogroup" aria-label="${esc(S.look)}">${LOOKS.map((l) => `<button role="radio" data-look="${l}" aria-checked="${l === look}"><i class="set-mini ${l}"><i></i><i></i><i></i></i><b>${esc(S.looks[l])}</b></button>`).join("")}</div>
      <small class="set-note">${esc(S.lookNote[look])}</small></section>
    <section class="set-card"><h3>${esc(S2.feel)}</h3>
      ${sw("setAuto", $("#auto")?.checked ?? true, S2.narration, S2.narrationSub)}
      ${sw("setSfx", pref("twist-sfx", true), S2.sfx, S2.sfxSub)}
      ${sw("setBuzz", pref("twist-vibrate", true), S2.vibrate, S2.vibrateSub)}
      ${sw("setNext", $("#autonext")?.checked ?? true, S.autoNext, S.autoNextSub)}</section>
    <section class="set-card"><h3>${esc(S2.notify)}</h3>${sw("setRemind", pref("twist-reminders", false), S2.remind, S2.remindSub)}</section>
    <section class="set-card"><h3>${esc(S2.account)}</h3>
      ${link("setLogout", S2.logout, S2.logoutSub, "bad")}</section>
    <section class="set-card"><h3>${esc(S2.storage)}</h3>${link("setClear", S2.clear, S2.clearSub)}</section>
    ${c.curriculum === "de-DE" ? `<section class="set-card"><h3>${esc(S.script)}</h3><small class="set-note">${esc(S.scriptSub)}</small>
      <div class="set-scripts" role="radiogroup" aria-label="${esc(S.script)}">${Object.keys(SCRIPTS).map((k) => `<button role="radio" data-script="${k}" aria-checked="${k === SCRIPT}"><span style="font-family:'${SCRIPTS[k]}'">Hallo ${esc(c.name ?? "Mia")}</span><small>${esc(S.scripts[k])}</small></button>`).join("")}</div></section>` : ""}
    <footer class="set-foot"><span class="av" style="--av:#6849dd"><img src="${A}mascot/start-1.png" alt=""></span><b>Twist</b><small>${esc(S2.version(D.built))}</small></footer>
  </div>`;
  scr.appendChild(appTabs("me"));
  const save = () => { saveChild(); renderSettings(); renderPracticeSide(); };
  $(".pr-back", scr).onclick = () => appTab("me");
  const nm = $("#setName", scr);
  nm.onchange = () => { c.name = nm.value.trim().slice(0, 20) || randomName(); save(); };
  $("#setDice", scr).onclick = () => { c.name = randomName(c.name); save(); };
  scr.querySelectorAll("[data-pose]").forEach((b) => b.onclick = () => { c.avatar = { pose: b.dataset.pose, bg: a.bg ?? AV_BG[0] }; save(); });
  scr.querySelectorAll("[data-bg]").forEach((b) => b.onclick = () => { c.avatar = { pose: a.pose ?? "start-1", bg: b.dataset.bg }; save(); });
  $("#setPhoto", scr).onchange = (e) => { const f = e.target.files?.[0]; if (f) readPhoto(f, (photo) => { c.avatar = { ...a, photo }; save(); }); };
  scr.querySelectorAll("[data-cur]").forEach((b) => b.onclick = () => { switchCurriculum(b.dataset.cur); save(); });
  $("#setYear", scr).onchange = (e) => { c.year = e.target.value; const s = D.sets.find((x) => x.year === c.year && x.id.startsWith(c.curriculum + ".")); c.band = ageBand(s?.ages); save(); };
  scr.querySelectorAll("[data-look]").forEach((b) => b.onclick = () => { setLook(b.dataset.look); renderSettings(); });
  const mirror = (id, to) => $("#" + id, scr).onchange = (e) => { const t = $("#" + to); if (t) { t.checked = e.target.checked; t.dispatchEvent(new Event("change")); } };
  mirror("setAuto", "auto"); mirror("setNext", "autonext");
  $("#setSfx", scr).onchange = (e) => { setPref("twist-sfx", e.target.checked); sfx("option-picked"); };
  $("#setBuzz", scr).onchange = (e) => { setPref("twist-vibrate", e.target.checked); buzz(30); };
  $("#setRemind", scr).onchange = (e) => setPref("twist-reminders", e.target.checked);
  // The pictures open from the pencil on the picture at the top, and stay open while one is chosen.
  $(".set-avbtn", scr).onclick = (e) => { APP.editPic = !APP.editPic; e.currentTarget.setAttribute("aria-expanded", APP.editPic); $("#setPics", scr).hidden = !APP.editPic; };
  // Two taps for the ones that can't be undone; in the preview, logging out shows the app opening again.
  const twice = (id, sure, done) => { const b = $("#" + id, scr), small = $("small", b); b.onclick = () => { if (!b.classList.contains("sure")) { b.classList.add("sure"); small.textContent = sure; return; } done(b, small); }; };
  twice("setLogout", S2.logoutSure, () => splash(() => appTab("start")));
  twice("setClear", S2.clearSure, (b, small) => { b.classList.remove("sure"); small.textContent = S2.cleared; b.onclick = null; });
  scr.querySelectorAll("[data-script]").forEach((b) => b.onclick = () => {
    // The same choice as the player's Settings: the lesson draws its writing lines in it next time.
    SCRIPT = b.dataset.script; try { localStorage.setItem("twist-script", SCRIPT); } catch {}
    document.querySelectorAll("input[name=script]").forEach((r) => r.checked = r.value === SCRIPT); renderSettings();
  });
}
// Demo data, to show the app with a child that has been using it for five weeks:
// about a third of each course done (the skills remembered, can do or practised),
// the next skill started, school days played with one missed, 47 practice
// sessions, two drill records. Today is still to play, so Start has a plan.
function loadDemo() {
  snap();
  const was = PR.child, c = (PR.child = { ...newChild({ curriculum: was.curriculum, year: was.year, band: was.band }), name: was.name, avatar: was.avatar, stash: was.stash });
  c.today = 32;
  for (let d = 1; d < c.today; d++) if (d % 7 < 5 && d !== 15) markActive(c, d);
  const STATE = ["remembered", "can_do", "can_do", "practised"];
  let last = null;
  for (const x of appSubjects()) {
    const sets = courseSets(x), n = Math.max(3, Math.round(sets.length / 3));
    sets.slice(0, n).forEach((st, i) => { c.lessons[st.id] = st.lessons.length; setState(c, st.skill, STATE[i % STATE.length]); logEvent(c, `lesson ${st.lessons.length} of ${st.id} finished`); });
    const nx = sets[n];
    if (nx) { c.lessons[nx.id] = 1; setState(c, nx.skill, "learning"); logEvent(c, `lesson 1 of ${nx.id} finished`); last ??= { setId: nx.id, n: 1, day: c.today - 1 }; }
  }
  // The lessons were played over the past weeks, the newest on the last day played.
  const days = c.active; c.log.forEach((e, i) => e.day = days[Math.min(days.length - 1, Math.floor((i * days.length) / c.log.length))]);
  // A few practice sessions this week, as the app logs them.
  [["mixed session: 9 of 10 right", 1], ["drill session: 18 a minute", 2], ["catch-up session: 8 of 10 right", 3]].forEach(([text, back]) => c.log.push({ day: days.at(-back), text }));
  c.last = last;
  c.sessions = 47;
  drillsForYear().slice(0, 2).forEach((k, i) => c.drills[k] = { best: [18, 24][i], weak: {} });
  PR.index = indexContent(D.sets, D.drills, c.curriculum);
}
// The preview's Settings menu (top right) loads demo data or resets, and redraws the screen the app is on.
function demoAction(fn) {
  appChild(); fn(); saveChild(); PR.on = false; PR.session = null;
  if (document.body.classList.contains("parents")) return renderParents();
  if (inPractice()) refreshPractice(); else appTab(APP.tab === "study" || !APP.tab ? "study" : APP.tab, { keep: true });
}
document.getElementById("demoLoad")?.addEventListener("click", () => demoAction(loadDemo));
document.getElementById("demoReset")?.addEventListener("click", () => demoAction(resetChild));
// Back to zero in this curriculum; the name, picture and the other curricula stay.
function resetChild() {
  snap();
  const was = PR.child;
  PR.child = { ...newChild({ curriculum: was.curriculum, year: was.year, band: was.band }), name: was.name, avatar: was.avatar, stash: was.stash };
}

/* ---------- Drills: every bank of the child's curriculum, by subject ---------- */
function drillCard(k) {
  const lg = PL(), d = PR.child.drills[k], m = drillMap(PR.index.drills[k], d), n = m.items.length;
  const bar = ["known", "slow", "miss"].map((st) => `<i class="${st}" style="width:${(100 * m.counts[st]) / Math.max(1, n)}%"></i>`).join("");
  return `<button class="dr-card" data-drill="${esc(k)}" style="--c:${colourOf(subjOfSkill(k))}"><b>${esc(setOfSkill(k)?.title[lg] ?? k)}</b>
    <small>${esc(d?.best ? AT().perMin(d.best) : PT().notTried)}</small><span class="dr-bar">${bar}</span></button>`;
}
// The banks of the child's year (a foreign language by its learning year); every bank if none.
function drillsForYear() {
  const ks = Object.keys(PR.index.drills), y = (k) => setOfSkill(k)?.year;
  const mine = ks.filter((k) => y(k) === PR.child.year || y(k) === D.learningYears?.[PR.child.curriculum]?.[PR.child.year]);
  return mine.length ? mine : ks;
}
function renderDrills() {
  const L = PT(), scr = $("#screen"), ks = Object.keys(PR.index.drills);
  scr.style.setProperty("--top", "#6849dd");
  scr.innerHTML = `<div class="status"></div><div class="pr-home pr-page app-page">
    <header class="pr-band" style="--c:#6849dd"><button class="pr-back" aria-label="${esc(L.back)}">${CHEVRON}</button><h2>${esc(L.drills)}</h2><small>${esc(L.drillsSub)}</small></header>
    ${PR.index.subjects.map((x) => { const mine = ks.filter((k) => subjOfSkill(k) === x).sort((a, b) => YEARS.indexOf(setOfSkill(a)?.year) - YEARS.indexOf(setOfSkill(b)?.year)); return mine.length ? `<h3 class="pr-h">${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</h3><div class="dr-grid">${mine.map(drillCard).join("")}</div>` : ""; }).join("")}
  </div>`;
  $(".pr-back", scr).onclick = () => renderPracticeHome();
  scr.querySelectorAll("[data-drill]").forEach((b) => b.onclick = () => renderDrillMap(b.dataset.drill));
  scr.appendChild(appTabs("practice"));
}
