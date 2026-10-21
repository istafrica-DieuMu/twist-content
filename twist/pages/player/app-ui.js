/* ---------- The app: four tabs (Start, Study, Practice, Me) ----------
   The phone is the whole Twist app, as in ist-schoolido (app/(tabs)/_layout.tsx:
   Home, Study, Practice, Profile). Its tab bar shows on the tab screens and
   their pages and hides inside a lesson or a session. Study runs in the
   player's lesson view, so its side panel has the lesson tools; Start,
   Practice and Me run in the practice view, with the pretend child. That
   child is the child of every tab: Study follows its course, and a lesson
   finished from the app moves its skill on (finishLesson). Inlined after
   practice-ui.js. */
const APP = { tab: null, home: null, subj: null, year: null, topic: null, q: "", fromApp: false };
const ATXT = {
  de: { badges: "Abzeichen", dayPlayed: "Gespielt", dayToday: "Heute, noch offen", dayMissed: "Nicht gespielt", lightFirst: "Mach heute eine Lektion oder Übung, dann brennt die erste Flamme.", upNext: "Als Nächstes", thisWeek: "Diese Woche", days: ["Mo", "Di", "Mi", "Do", "Fr"], gold: "Gold!", earned: "Verdient", earnedIn: (y) => `Verdient, ${y}`, ofN: (a, b) => `${a} von ${b}`, noBadges: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", almost: "Fast geschafft", allBadges: (n) => `Alle weiteren Abzeichen (${n})`, how: { pathfinder: "Deinen ersten Einstufungstest machen", summit: "Den Test am Schuljahresende bestehen", legend: "Jede Fähigkeit eines Fachs können", "comeback-kid": "Eine Fähigkeit zurückholen", "like-clockwork": "4 Wochen alle Wiederholungen pünktlich", "time-traveller": "Etwas aus einer späteren Klasse lernen" }, hi: "Hallo!", startHere: "Fang hier an", minShort: (m) => `${m} Min.`, helloName: (n) => `Hallo, ${n}!`, todayPlan: "Dein Plan für heute", planLeft: (a, b) => `${a} von ${b} für heute geschafft`, planDone: "Für heute alles geschafft", unitOf: (k, n, y) => `Einheit ${k} von ${n}, ${y}`, lessonDone: "Lektion geschafft", lessonsToday: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"} heute`, practiceDone: "Üben geschafft", sessionsToday: (n) => `${n} ${n === 1 ? "Übungsrunde" : "Übungsrunden"} heute`, winTitle: "Super, dein Plan für heute ist fertig!", winStreak: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge. Komm morgen wieder!`, winSub: "Komm morgen wieder!", wantMore: "Lust auf mehr?", unitsOf: (a, b) => `${a}/${b} Einheiten`, newDot: "neu", start: "Start", study: "Lernen", practice: "Üben", me: "Ich", hello: "Hallo! Schön, dass du da bist.", next: "Weiter lernen", goOn: "Mach weiter, wo du aufgehört hast", nextUnit: (x) => `Als Nächstes in ${x}`, nextYear: (y) => `Weiter mit ${y}`, more: "Andere Fächer", newSubj: "Probier ein neues Fach", fresh: "Neu für dich", lessonOf: (k, n) => `Lektion ${k} von ${n}`, mins: (m) => `etwa ${m} Minuten`, go: "Los geht's", allDone: "Alles geschafft!", allDoneSub: "Im Üben-Tab hältst du es frisch.", doneOf: (a, b) => `${a} von ${b} geschafft`, lessons: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"}`, finish: "Fertig", today: "Heute üben", allTopics: "Alle Themen", search: (s, y) => `Suchen in ${s}, ${y}`, nothing: "Nichts gefunden.", year: "Klasse", yourYear: "deine Klasse", sets: (n) => `${n} ${n === 1 ? "Einheit" : "Einheiten"}`,
    meTitle: "Mein Fortschritt", stars: "Sterne", streak: "Tage in Folge", sessions: "Übungsrunden", bee: "Fleißiges Bienchen", beeTo: (a, b) => `${a} von ${b} Übungsrunden`, beeMax: "Alle Stufen geschafft!", notYet: "Noch nicht verdient", level: (n) => `Stufe ${n} von 6`, streakTitle: "Serie", streakNow: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge`, streakBest: (n) => `Bester Lauf: ${n}`, streakTo: (n, name) => `Noch ${n} ${n === 1 ? "Schultag" : "Schultage"} bis ${name}`, streakNote: "Wochenenden zählen nicht und brechen nichts.", records: "Drill-Rekorde", perMin: (n) => `${n} pro Minute`, noRecords: "Noch kein Drill gespielt. Probier einen im Üben-Tab!", subjects: "Deine Fächer", ofStars: (a, b) => `${a} von ${b} Sternen` },
  en: { badges: "Badges", dayPlayed: "Played", dayToday: "Today, still to do", dayMissed: "Not played", lightFirst: "Do a lesson or some practice today to light the first flame.", upNext: "Up next", thisWeek: "This week", days: ["M", "T", "W", "T", "F"], gold: "Gold!", earned: "Earned", earnedIn: (y) => `Earned, ${y}`, ofN: (a, b) => `${a} of ${b}`, noBadges: "None yet. The first comes with your first skill at I can do it.", almost: "Almost there", allBadges: (n) => `All the other badges (${n})`, how: { pathfinder: "Finish your first placement check", summit: "Pass the end-of-year check", legend: "Every skill of a subject", "comeback-kid": "Bring a skill back after a refresh", "like-clockwork": "Every recap on time for 4 weeks", "time-traveller": "Learn something from a later year" }, hi: "Hi!", startHere: "Start here", minShort: (m) => `${m} min`, helloName: (n) => `Hi, ${n}!`, todayPlan: "Your plan for today", planLeft: (a, b) => `${a} of ${b} done today`, planDone: "All done for today", unitOf: (k, n, y) => `Unit ${k} of ${n}, ${y}`, lessonDone: "Lesson done", lessonsToday: (n) => `${n} ${n === 1 ? "lesson" : "lessons"} today`, practiceDone: "Practice done", sessionsToday: (n) => `${n} ${n === 1 ? "session" : "sessions"} today`, winTitle: "Great work, today's plan is done!", winStreak: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row. See you tomorrow!`, winSub: "See you tomorrow!", wantMore: "Want more?", unitsOf: (a, b) => `${a}/${b} units`, newDot: "new", start: "Home", study: "Study", practice: "Practise", me: "Me", hello: "Hi! Great to see you.", next: "Keep learning", goOn: "Pick up where you left off", nextUnit: (x) => `Next in ${x}`, nextYear: (y) => `On to ${y}`, more: "Other subjects", newSubj: "Try a new subject", fresh: "New for you", lessonOf: (k, n) => `Lesson ${k} of ${n}`, mins: (m) => `about ${m} minutes`, go: "Start", allDone: "All done!", allDoneSub: "Keep it fresh in the Practise tab.", doneOf: (a, b) => `${a} of ${b} done`, lessons: (n) => `${n} ${n === 1 ? "lesson" : "lessons"}`, finish: "Done", today: "Practise today", allTopics: "All topics", search: (s, y) => `Search ${s}, ${y}`, nothing: "Nothing found.", year: "Year", yourYear: "your year", sets: (n) => `${n} ${n === 1 ? "unit" : "units"}`,
    meTitle: "My progress", stars: "Stars", streak: "Days in a row", sessions: "Sessions", bee: "Busy Bee", beeTo: (a, b) => `${a} of ${b} practice sessions`, beeMax: "Every level done!", notYet: "Not earned yet", level: (n) => `Level ${n} of 6`, streakTitle: "Streak", streakNow: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row`, streakBest: (n) => `Best run: ${n}`, streakTo: (n, name) => `${n} more school ${n === 1 ? "day" : "days"} to ${name}`, streakNote: "Weekends never count and never break it.", records: "Drill records", perMin: (n) => `${n} a minute`, noRecords: "No drill played yet. Try one in the Practise tab!", subjects: "Your subjects", ofStars: (a, b) => `${a} of ${b} stars` },
};
const AT = () => ATXT[PL()];
const STREAK_NAME = { spark: ["Funke", "Spark"], flame: ["Flamme", "Flame"], campfire: ["Lagerfeuer", "Campfire"], torch: ["Fackel", "Torch"], comet: ["Komet", "Comet"], volcano: ["Vulkan", "Volcano"], sun: ["Sonne", "Sun"], supernova: ["Supernova", "Supernova"] };
const streakName = (id) => STREAK_NAME[id]?.[PL() === "de" ? 0 : 1] ?? id;
const TAB_ICON = {
  start: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/></svg>',
  study: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5z"/></svg>',
  practice: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" class="fill"/></svg>',
  me: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c.8-3.8 3.9-6 7.5-6s6.7 2.2 7.5 6"/></svg>',
};
const TABS = ["start", "study", "practice", "me"];
// Each tab has its own colour: its band, the status bar over it and its pill in the tab bar.
const ROOM = { start: "#d9480f", study: "#1971c2", practice: "#2b8a3e", me: "#6849dd" };

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
  nav.innerHTML = TABS.map((t) => `<button data-t="${t}" style="--tc:${ROOM[t]}"${t === active ? ' aria-current="page"' : ""}>${TAB_ICON[t]}<span>${esc(T[t])}</span></button>`).join("");
  nav.querySelectorAll("button").forEach((b) => b.onclick = () => appTab(b.dataset.t));
  return nav;
}
const inPractice = () => document.body.classList.contains("practice");
// Switch the app to a tab. Study needs the lesson view; the others the practice view.
function appTab(t) {
  stopAudio(); appChild();
  APP.tab = t;
  if (t === "study") { if (inPractice()) setView("lessons"); APP.home = "study"; APP.fromApp = false; return renderStudy(); }
  if (!inPractice()) setView("practice");
  APP.home = null; PR.on = false; PR.session = null; PR.home = true;
  if (t === "start") renderHomeTab(); else if (t === "me") renderMe(); else if (t === "settings") renderSettings(); else renderPracticeHome();
  renderPracticeSide();
}
// The greeting row: the mascot, a line, and the streak flame, which opens Me.
function appHeader(title) {
  const s = streak(PR.child);
  return `<header class="pr-top"><img class="pr-me" src="${A}mascot/start-1.png" alt=""><h2>${esc(title)}</h2>
    <button class="app-flame${s.current ? " on" : ""}" data-me aria-label="${esc(AT().streakNow(s.current))}"><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt="">${s.current}</button></header>`;
}
function wireHeader(scr) { scr.querySelectorAll("[data-me]").forEach((b) => b.onclick = () => appTab("me")); scr.querySelectorAll("[data-settings]").forEach((b) => b.onclick = () => appTab("settings")); }
const beeStrip = () => {
  const L = PT(), bee = busyBee(PR.child.sessions), pct = bee.next ? (100 * (PR.child.sessions - bee.from)) / (bee.next - bee.from) : 100;
  return `<button class="pr-bee" data-me><img src="${A}badges/busy-bee.svg" alt=""><span><i class="pr-bar" style="--c:#f5b400"><i style="width:${pct}%"></i></i><small>${esc(bee.next ? L.beeBar(PR.child.sessions, bee.next) : AT().beeMax)}</small></span></button>`;
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
function startLesson(setId, n) {
  if (inPractice()) setView("lessons");
  APP.home = null; APP.fromApp = true;
  pickSet(D.sets.findIndex((s) => s.id === setId), n);
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
// The lesson step: the next lesson as the big card, with where it sits (unit dots, unit k of n).
function lessonStep(plan) {
  const T = AT(), lg = PL(), s = nextIn(plan.sets);
  if (!s) return "";
  const done = lessonsDone(s), l = s.lessons[done], col = colourOf(plan.subj), name = SUBJ_NAME[PR.child.curriculum][plan.subj] ?? plan.subj;
  const course = courseSets(plan.subj, s.year), k = course.indexOf(s) + 1;
  const dots = s.lessons.map((_, i) => `<i class="${i < done ? "on" : i === done ? "now" : ""}"></i>`).join("");
  return `<button class="pr-hero ln-next hm-lesson" style="--c:${col}" data-start="${esc(s.id)}" data-n="${l.n}">
      <span class="pr-kind">${esc(name)} · ${esc(T.unitOf(k, course.length, yearName(s.year)))}</span>
      <span class="hm-dots" aria-label="${esc(T.lessonOf(l.n, s.lessons.length))}">${dots}<small>${esc(T.lessonOf(l.n, s.lessons.length))}</small></span>
      <b class="pr-reason">${keepSuffix(l.title[lg] ?? l.title.de)}</b><span class="pr-sub">${esc(s.title[lg] ?? s.title.de)}</span>
      <span class="pr-go">${esc(T.go)}<small>${esc(T.minShort(s.minutes ?? 10))}</small></span>
      <img class="pr-art" src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></button>`;
}
const PRACTICE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>';
const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
// Start: today's plan (a lesson, then practice), ticked off as the child does it,
// then the subjects. With the plan done, a well done and the way to more.
function renderHomeTab() {
  const T = AT(), L = PT(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  const plan = homePlan(); APP.subj = plan.subj;
  const sug = suggestions(c, PR.index)[0], did = today(c), s = streak(c), bee = busyBee(c.sessions);
  const lesson = nextIn(plan.sets) ? lessonStep(plan) : "";
  const goal = [lesson || did.lessons, sug || did.practice].filter(Boolean).length || 1;
  const got = Math.min(goal, (did.lessons ? 1 : 0) + (did.practice ? 1 : 0)), all = got >= goal;
  const subjName = SUBJ_NAME[c.curriculum][plan.subj] ?? plan.subj;
  const head = { continue: T.goOn, nextUnit: T.nextUnit(subjName), nextYear: T.nextYear(yearName(plan.year ?? "")), next: c.last || lastLesson(c) ? T.next : T.startHere, done: T.allDone }[plan.head];
  const doneRow = (text, sub) => `<div class="hm-done"><i>${TICK}</i><span><b>${esc(text)}</b><small>${esc(sub)}</small></span></div>`;
  const practiceCard = sug ? `<button class="pr-own st-today hm-practice" data-sug style="--c:${colourOf(subjOfSkill(sug.skills[0]))}"><i class="hm-ico">${PRACTICE_ICON}</i><span><small>${esc(L.kinds[sug.kind] ?? "")}</small><b>${esc(sug.reason[PL()])}</b><small>${esc(sizeOf(sug))}</small></span>${CHEVRON}</button>` : "";
  const steps = [];
  if (did.lessons) steps.push(doneRow(T.lessonDone, T.lessonsToday(did.lessons)));
  else if (lesson) steps.push(`<p class="hm-step">${esc(head)}</p>${lesson}`);
  if (did.practice) steps.push(doneRow(T.practiceDone, T.sessionsToday(did.practice)));
  else if (practiceCard) steps.push(`<p class="hm-step">${esc(T.today)}</p>${practiceCard}`);
  const more = [did.lessons && lesson ? `<p class="hm-step">${esc(head)}</p>${lesson}` : "", did.practice && practiceCard ? practiceCard : ""].filter(Boolean);
  const pct = (100 * got) / goal;
  scr.style.setProperty("--subj", "#6849dd"); scr.style.setProperty("--top", ROOM.start);
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page hm">
    <header class="hm-top fun-band" style="--room:${ROOM.start}">
      <button class="hm-av" data-settings aria-label="${esc(ST().title)}">${avatar(c)}</button>
      <div><h2>${esc(c.name ? T.helloName(c.name) : T.hi)}</h2><small>${esc(all ? T.planDone : T.planLeft(got, goal))}</small></div>
      <button class="hm-goal${all ? " full" : got ? "" : " zero"}" data-me style="--p:${pct}" aria-label="${esc(T.planLeft(got, goal))}, ${esc(T.streakNow(s.current))}"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle class="v" cx="24" cy="24" r="20" pathLength="100"/></svg><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt=""><b>${s.current}</b></button>
    </header>
    ${all ? `<section class="hm-win"><img src="${A}mascot/end-2.png" alt=""><div><b>${esc(T.winTitle)}</b><small>${esc(s.current ? T.winStreak(s.current) : T.winSub)}</small></div></section>` : ""}
    <section class="hm-plan${all ? " all" : ""}"><h3 class="pr-h">${esc(T.todayPlan)}</h3>${steps.join("") || doneRow(T.allDone, T.allDoneSub)}</section>
    ${all && more.length ? `<section class="hm-more"><h3 class="pr-h">${esc(T.wantMore)}</h3>${more.join("")}</section>` : ""}
    <section><h3 class="pr-h">${esc(T.subjects)}</h3><div class="hm-subj">${subs.map(subjChip).join("")}</div></section>
    ${bee.next && bee.next - c.sessions <= 3 ? beeStrip() : ""}
  </div>`;
  scr.appendChild(appTabs("start"));
  wireHeader(scr); wireStarts(scr);
  scr.querySelectorAll(".hm-subj [data-subj]").forEach((b) => b.onclick = () => { APP.subj = b.dataset.subj; APP.year = null; APP.topic = null; APP.q = ""; appTab("study"); });
  scr.querySelectorAll("[data-sug]").forEach((b) => b.onclick = () => { appTab("practice"); startSession({ kind: sug.kind, skills: sug.skills, minutes: sug.kind === "drill" ? 2 : null }); });
}

/* ---------- Study ---------- */
// All the structured content: pick a subject, a year and a topic (or search),
// then a unit and its lessons; a lesson opens in the lesson player.
function renderStudy() {
  const T = AT(), lg = PL(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  if (!subs.includes(APP.subj)) APP.subj = subs[0];
  const years = yearsOf(APP.subj), mine = childYearFor(APP.subj);
  if (!years.includes(APP.year)) APP.year = mine;
  const sets = courseSets(APP.subj, APP.year), colour = colourOf(APP.subj);
  const topics = [];
  for (const s of sets) { const name = s.topic?.[lg] ?? s.topic?.en ?? ""; if (topics.at(-1)?.name !== name) topics.push({ name, sets: [] }); topics.at(-1).sets.push(s); }
  const q = APP.q.trim().toLowerCase();
  const hit = (s) => !q || [s.title?.de, s.title?.en, s.topic?.de, s.topic?.en, s.can_do?.[lg], ...s.lessons.map((l) => l.title[lg])].join(" ").toLowerCase().includes(q);
  const shown = topics.filter((tp) => !APP.topic || tp.name === APP.topic).map((tp) => ({ ...tp, sets: tp.sets.filter(hit) })).filter((tp) => tp.sets.length);
  const next = nextIn(sets), done = sets.filter((s) => lessonsDone(s) >= s.lessons.length).length;
  const subjName = SUBJ_NAME[c.curriculum][APP.subj] ?? APP.subj;
  scr.style.setProperty("--subj", colour); scr.style.setProperty("--top", `color-mix(in srgb, ${colour} 10%, var(--card))`);
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page st-page">
    <header class="st-band" style="--c:${colour}">
      <div class="ln-subj" role="tablist">${subs.map((x) => `<button role="tab" data-s="${x}" aria-selected="${x === APP.subj}" style="--c:${colourOf(x)}">${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</button>`).join("")}</div>
      <div class="st-row"><label class="st-year"><span>${esc(T.year)}</span><select id="stYear">${years.map((y) => `<option value="${esc(y)}"${y === APP.year ? " selected" : ""}>${esc(yearName(y))}${y === mine ? ` (${esc(T.yourYear)})` : ""}</option>`).join("")}</select></label>
        <span class="st-count">${esc(T.doneOf(done, sets.length))}</span></div>
    </header>
    <label class="pr-search">${LENS}<input id="stQ" type="search" value="${esc(APP.q)}" placeholder="${esc(T.search(subjName, yearName(APP.year)))}" autocomplete="off"></label>
    <div class="st-topics">${[{ name: null }, ...topics].map((tp) => { const d = tp.sets?.filter((x) => lessonsDone(x) >= x.lessons.length).length, all = !!tp.sets && d === tp.sets.length; return `<button data-t="${esc(tp.name ?? "")}" aria-pressed="${(APP.topic ?? null) === tp.name}"${all ? ' class="done"' : ""}>${all ? "✓ " : ""}${esc(tp.name ?? T.allTopics)}${tp.sets && !all && d ? `<small>${d}/${tp.sets.length}</small>` : ""}</button>`; }).join("")}</div>
    ${!q && !APP.topic && next ? upNext(next) : ""}
    <div id="stList">${shown.map((tp) => `<section class="ln-topic"><h3 class="pr-h">${esc(tp.name)}<small>${esc(T.doneOf(tp.sets.filter((s) => lessonsDone(s) >= s.lessons.length).length, tp.sets.length))}</small></h3>${tp.sets.map((s) => studySetRow(s, s === next && !q)).join("")}</section>`).join("") || `<p class="pr-empty">${esc(T.nothing)}</p>`}</div>
  </div>`;
  scr.appendChild(appTabs("study"));
  scr.querySelectorAll(".ln-subj button").forEach((b) => b.onclick = () => { APP.subj = b.dataset.s; APP.year = null; APP.topic = null; APP.q = ""; renderStudy(); });
  $("#stYear").onchange = (e) => { APP.year = e.target.value; APP.topic = null; renderStudy(); };
  scr.querySelectorAll(".st-topics button").forEach((b) => b.onclick = () => { APP.topic = b.dataset.t || null; renderStudy(); });
  const qi = $("#stQ"); qi.oninput = () => { APP.q = qi.value; const pos = qi.selectionStart; renderStudy(); const n = $("#stQ"); n.focus(); n.setSelectionRange(pos, pos); };
  wireStarts(scr);
  scr.querySelector(".st-topics [aria-pressed=true]")?.scrollIntoView({ inline: "center", block: "nearest" });
}
// Study's way back in: one row with the next lesson of the course; the unit below is open on it.
function upNext(s) {
  const T = AT(), lg = PL(), done = lessonsDone(s), l = s.lessons[done];
  return `<button class="st-next" data-start="${esc(s.id)}" data-n="${l.n}"><span class="st-next-i">${PLAY}</span><span><small>${esc(T.upNext)} · ${esc(s.title[lg] ?? s.title.de)}</small><b>${keepSuffix(l.title[lg] ?? l.title.de)}</b></span><em>${esc(T.minShort(s.minutes ?? 10))}</em></button>`;
}
const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
// A unit (lesson set): its lessons done, title and stars; open, its goal and lessons to start.
function studySetRow(s, open) {
  const T = AT(), lg = PL(), done = lessonsDone(s), n = s.lessons.length;
  const stars = STARS[PR.child.states[s.skill]?.state ?? "not_started"], started = done > 0 || stars > 0;
  return `<details class="ln-set${done >= n ? " done" : ""}${open ? " now" : ""}"${open ? " open" : ""}><summary><span class="ln-ring" style="--p:${(100 * done) / n}">${done >= n ? "✓" : `${done}/${n}`}</span><span class="ln-t"><b>${esc(s.title[lg] ?? s.title.de)}</b><small>${esc(T.lessons(n))}</small></span>
      ${started ? `<span class="pr-stars" aria-label="${stars} / 3">${[1, 2, 3].map((i) => `<i class="${i <= stars ? "on" : ""}">★</i>`).join("")}</span>` : "<span></span>"}</summary>
    ${s.can_do?.[lg] ? `<p class="ln-can">${esc(s.can_do[lg])}</p>` : ""}
    <ol class="ln-lessons">${s.lessons.map((l, i) => `<li><button data-start="${esc(s.id)}" data-n="${l.n}" class="${i < done ? "done" : i === done ? "now" : ""}"><span class="ln-n">${i < done ? "✓" : l.n}</span><span>${esc(l.title[lg] ?? l.title.de)}</span>${i === done ? `<em>${esc(T.go)}</em>` : ""}</button></li>`).join("")}</ol></details>`;
}
// Called by the lesson end screen when the lesson was started from the app.
function appLessonDone(checkSteps, pass) {
  const c = appChild();
  if (set.curriculum !== c.curriculum || steps._recorded) return;
  steps._recorded = true;
  const check = pass == null ? null : { pass, keys: checkSteps.map(([s]) => taskKey(set.id, lesson.n, s.t.id)) };
  finishLesson(c, { setId: set.id, skill: set.skill, n: lesson.n, check });
  saveChild();
}
const openStudy = () => appTab("study");

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
const myBadges = () => badges(PR.child, Object.fromEntries(appSubjects().map((x) => [x, courseSets(x).map((s) => s.skill)])));
function badgeTile(b) {
  const T = AT(), part = b.need ? Math.min(1, b.have / b.need) : 0;
  const line = b.earned ? (b.gold ? T.gold : b.level ? T.level(b.level) : b.kind === "strand" ? T.earnedIn(yearName(childYearFor(b.subj))) : T.earned)
    : b.need ? T.ofN(b.have, b.need) : T.how[b.id] ?? "";
  return `<div class="bd${b.earned ? "" : " locked"}" style="--p:${100 * part}"><img src="${A}badges/${b.id}${b.gold ? ".gold" : ""}.svg" alt=""><b>${esc(badgeName(b.id))}</b><small>${esc(line)}</small>${!b.earned && b.need ? `<i class="pr-bar"><i style="width:${100 * part}%"></i></i>` : ""}</div>`;
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
  const nextStreak1 = all.find((b) => b.kind === "streak" && !b.earned)?.id;
  const close = all.filter((b) => !b.earned && b.need && b.have > 0 && (b.kind !== "streak" || b.id === nextStreak1)).sort((x, y) => y.have / y.need - x.have / x.need).slice(0, 3);
  const rest = all.filter((b) => !b.earned && !close.includes(b));
  const ks = appSubjects().flatMap((x) => courseSets(x).map((st) => st.skill)), stars = ks.reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0);
  const recs = Object.entries(c.drills ?? {}).filter(([k, d]) => d.best && PR.index.bySkill[k]).sort((a, b) => b[1].best - a[1].best);
  const nextStreak = s.next ? T.streakTo(s.next[0] - s.current, streakName(s.next[1])) : "";
  scr.style.setProperty("--subj", "#6849dd"); scr.style.setProperty("--top", "#6849dd");
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
const DICE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.4" class="fill"/><circle cx="15.5" cy="15.5" r="1.4" class="fill"/><circle cx="12" cy="12" r="1.4" class="fill"/></svg>';
const CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/></svg>';
const STXT = {
  de: { title: "Einstellungen", profile: "Ich", name: "Name", newName: "Neuer Name", picture: "Bild", photo: "Foto", colour: "Farbe", learn: "Lernen", curriculum: "Lehrplan", cur: { "de-DE": "Deutschland", "en-GB": "England" }, curNote: "Jeder Lehrplan behält seinen eigenen Fortschritt.", year: "Klasse", look: "Aussehen", looks: { light: "Hell", dark: "Dunkel", night: "Nacht" }, lookNote: { light: "Hell und bunt", dark: "Schont die Augen im Dunkeln", night: "Dunkel und warm, für den Abend" }, sound: "Ton und Spielen", autoAudio: "Aufgaben vorlesen", autoAudioSub: "Jede Frage wird gleich vorgelesen", autoNext: "Automatisch weiter", autoNextSub: "Nach einer richtigen Antwort nach 3 Sekunden", script: "Schreibschrift", scriptSub: "So sehen die Schreiblinien aus", scripts: { sas: "Schulausgangsschrift", la: "Lateinische Ausgangsschrift", va: "Vereinfachte Ausgangsschrift", grund: "Grundschrift" }, fresh: "Neu anfangen", freshSub: "Sterne, Abzeichen und Serie in diesem Lehrplan auf null", freshBtn: "Alles zurücksetzen", sure: "Wirklich? Tippe nochmal", back: "Zurück" },
  en: { title: "Settings", profile: "Me", name: "Name", newName: "New name", picture: "Picture", photo: "Photo", colour: "Colour", learn: "Learning", curriculum: "Curriculum", cur: { "de-DE": "Germany", "en-GB": "England" }, curNote: "Each curriculum keeps its own progress.", year: "Year", look: "Look", looks: { light: "Light", dark: "Dark", night: "Night" }, lookNote: { light: "Bright and colourful", dark: "Easy on the eyes in the dark", night: "Dark and warm, for the evening" }, sound: "Sound and play", autoAudio: "Read tasks aloud", autoAudioSub: "Every question is read out straight away", autoNext: "Move on by itself", autoNextSub: "3 seconds after a right answer", script: "Handwriting", scriptSub: "How the writing lines look", scripts: { sas: "Schulausgangsschrift", la: "Lateinische Ausgangsschrift", va: "Vereinfachte Ausgangsschrift", grund: "Grundschrift" }, fresh: "Start again", freshSub: "Stars, badges and streak in this curriculum back to zero", freshBtn: "Reset everything", sure: "Sure? Tap again", back: "Back" },
};
const ST = () => STXT[PL()];
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
  const sw = (id, on, label, sub) => `<label class="set-row set-sw"><span><b>${esc(label)}</b><small>${esc(sub)}</small></span><input type="checkbox" role="switch" id="${id}"${on ? " checked" : ""}><i aria-hidden="true"></i></label>`;
  scr.style.setProperty("--subj", ROOM.me); scr.style.setProperty("--top", ROOM.me);
  scr.innerHTML = `<div class="status"></div><div class="pr-home pr-page app-page set-page">
    <header class="pr-band fun-band" style="--c:${ROOM.me};--room:${ROOM.me}"><button class="pr-back" aria-label="${esc(S.back)}">${CHEVRON}</button><h2>${esc(S.title)}</h2></header>
    <section class="set-me">${avatar(c, "xl")}
      <div class="set-name"><label for="setName">${esc(S.name)}</label><span><input id="setName" value="${esc(c.name ?? "")}" maxlength="20" autocomplete="off"><button id="setDice" aria-label="${esc(S.newName)}" title="${esc(S.newName)}">${DICE}</button></span></div></section>
    <section class="set-card"><h3>${esc(S.picture)}</h3>
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
    <section class="set-card"><h3>${esc(S.sound)}</h3>
      ${sw("setAuto", $("#auto")?.checked ?? true, S.autoAudio, S.autoAudioSub)}
      ${sw("setNext", $("#autonext")?.checked ?? true, S.autoNext, S.autoNextSub)}</section>
    ${c.curriculum === "de-DE" ? `<section class="set-card"><h3>${esc(S.script)}</h3><small class="set-note">${esc(S.scriptSub)}</small>
      <div class="set-scripts" role="radiogroup" aria-label="${esc(S.script)}">${Object.keys(SCRIPTS).map((k) => `<button role="radio" data-script="${k}" aria-checked="${k === SCRIPT}"><span style="font-family:'${SCRIPTS[k]}'">Hallo ${esc(c.name ?? "Mia")}</span><small>${esc(S.scripts[k])}</small></button>`).join("")}</div></section>` : ""}
    <section class="set-card set-fresh"><h3>${esc(S.fresh)}</h3><small class="set-note">${esc(S.freshSub)}</small><button id="setReset">${esc(S.freshBtn)}</button></section>
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
  scr.querySelectorAll("[data-script]").forEach((b) => b.onclick = () => {
    // The same choice as the player's Settings: the lesson draws its writing lines in it next time.
    SCRIPT = b.dataset.script; try { localStorage.setItem("twist-script", SCRIPT); } catch {}
    document.querySelectorAll("input[name=script]").forEach((r) => r.checked = r.value === SCRIPT); renderSettings();
  });
  const reset = $("#setReset", scr);
  reset.onclick = () => {
    if (!reset.classList.contains("sure")) { reset.classList.add("sure"); reset.textContent = S.sure; return; }
    snap(); PR.child = { ...newChild({ curriculum: c.curriculum, year: c.year, band: c.band }), name: c.name, avatar: c.avatar, stash: c.stash }; save();
  };
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
