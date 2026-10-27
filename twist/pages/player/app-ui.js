/* ---------- The app: four tabs (Start, Study, Practice, Me) ----------
   The phone is the whole Twist app, as in ist-schoolido (app/(tabs)/_layout.tsx:
   Home, Study, Practice, Profile). Its tab bar shows on the tab screens and
   their pages and hides inside a lesson or a session. Study runs in the
   player's lesson view, so its side panel has the lesson tools; Start,
   Practice and Me run in the practice view, with the pretend child. That
   child is the child of every tab: Study follows its course, and a lesson
   finished from the app moves its skill on (finishLesson). Inlined after
   practice-ui.js. */
const APP = { tab: null, home: null, subj: null, year: null, topic: null, q: "", find: false, fromApp: false, units: false };
const ATXT = {
  de: { badges: "Abzeichen", dayPlayed: "Gespielt", dayToday: "Heute, noch offen", dayMissed: "Nicht gespielt", lightFirst: "Mach heute eine Lektion oder Übung, dann brennt die erste Flamme.", upNext: "Als Nächstes", thisWeek: "Diese Woche", days: ["Mo", "Di", "Mi", "Do", "Fr"], gold: "Gold!", earned: "Verdient", earnedIn: (y) => `Verdient, ${y}`, ofN: (a, b) => `${a} von ${b}`, noBadges: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", almost: "Fast geschafft", allBadges: (n) => `Alle weiteren Abzeichen (${n})`, how: { pathfinder: "Deinen ersten Einstufungstest machen", summit: "Den Test am Schuljahresende bestehen", legend: "Jede Fähigkeit eines Fachs können", "comeback-kid": "Eine Fähigkeit zurückholen", "like-clockwork": "4 Wochen alle Wiederholungen pünktlich", "time-traveller": "Etwas aus einer späteren Klasse lernen" }, hi: "Hallo!", startHere: "Fang hier an", minShort: (m) => `${m} Min.`, helloName: (n) => `Hallo, ${n}!`, todayPlan: "Dein Plan für heute", planLeft: (a, b) => `${a} von ${b} für heute geschafft`, planDone: "Für heute alles geschafft", unitOf: (k, n) => `Einheit ${k} von ${n}`, lessonDone: "Lektion geschafft", lessonsToday: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"} heute`, practiceDone: "Üben geschafft", sessionsToday: (n) => `${n} ${n === 1 ? "Übungsrunde" : "Übungsrunden"} heute`, winTitle: "Super, dein Plan für heute ist fertig!", winStreak: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge. Komm morgen wieder!`, winSub: "Komm morgen wieder!", wantMore: "Lust auf mehr?", unitsOf: (a, b) => `${a}/${b} Einheiten`, newDot: "neu", start: "Start", study: "Lernen", practice: "Üben", me: "Ich", hello: "Hallo! Schön, dass du da bist.", next: "Weiter lernen", goOn: "Mach weiter, wo du aufgehört hast", nextUnit: (x) => `Als Nächstes in ${x}`, nextYear: (y) => `Weiter mit ${y}`, more: "Andere Fächer", newSubj: "Probier ein neues Fach", fresh: "Neu für dich", lessonOf: (k, n) => `Lektion ${k} von ${n}`, mins: (m) => `etwa ${m} Minuten`, go: "Los geht's", allDone: "Alles geschafft!", allDoneSub: "Im Üben-Tab hältst du es frisch.", doneOf: (a, b) => `${a} von ${b} geschafft`, lessons: (n) => `${n} ${n === 1 ? "Lektion" : "Lektionen"}`, finish: "Fertig", today: "Für dich zum Üben", allTopics: "Alle Themen", search: (s, y) => `Suchen in ${s}, ${y}`, nothing: "Nichts gefunden.", year: "Klasse", yourYear: "deine Klasse", sets: (n) => `${n} ${n === 1 ? "Einheit" : "Einheiten"}`,
    meTitle: "Mein Fortschritt", stars: "Sterne", streak: "Tage in Folge", sessions: "Übungsrunden", bee: "Fleißiges Bienchen", beeTo: (a, b) => `${a} von ${b} Übungsrunden`, beeMax: "Alle Stufen geschafft!", notYet: "Noch nicht verdient", level: (n) => `Stufe ${n} von 6`, streakTitle: "Serie", streakNow: (n) => `${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge`, streakBest: (n) => `Bester Lauf: ${n}`, streakTo: (n, name) => `Noch ${n} ${n === 1 ? "Schultag" : "Schultage"} bis ${name}`, streakNote: "Wochenenden zählen nicht und brechen nichts.", records: "Sprint-Rekorde", perMin: (n) => `${n} pro Minute`, noRecords: "Noch keinen Sprint gespielt. Probier einen im Üben-Tab!", subjects: "Deine Fächer", ofStars: (a, b) => `${a} von ${b} Sternen` },
  en: { badges: "Badges", dayPlayed: "Played", dayToday: "Today, still to do", dayMissed: "Not played", lightFirst: "Do a lesson or some practice today to light the first flame.", upNext: "Up next", thisWeek: "This week", days: ["M", "T", "W", "T", "F"], gold: "Gold!", earned: "Earned", earnedIn: (y) => `Earned, ${y}`, ofN: (a, b) => `${a} of ${b}`, noBadges: "None yet. The first comes with your first skill at I can do it.", almost: "Almost there", allBadges: (n) => `All the other badges (${n})`, how: { pathfinder: "Finish your first placement check", summit: "Pass the end-of-year check", legend: "Every skill of a subject", "comeback-kid": "Bring a skill back after a refresh", "like-clockwork": "Every recap on time for 4 weeks", "time-traveller": "Learn something from a later year" }, hi: "Hi!", startHere: "Start here", minShort: (m) => `${m} min`, helloName: (n) => `Hi, ${n}!`, todayPlan: "Your plan for today", planLeft: (a, b) => `${a} of ${b} done today`, planDone: "All done for today", unitOf: (k, n) => `Unit ${k} of ${n}`, lessonDone: "Lesson done", lessonsToday: (n) => `${n} ${n === 1 ? "lesson" : "lessons"} today`, practiceDone: "Practice done", sessionsToday: (n) => `${n} ${n === 1 ? "session" : "sessions"} today`, winTitle: "Great work, today's plan is done!", winStreak: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row. See you tomorrow!`, winSub: "See you tomorrow!", wantMore: "Want more?", unitsOf: (a, b) => `${a}/${b} units`, newDot: "new", start: "Home", study: "Study", practice: "Practice", me: "Me", hello: "Hi! Great to see you.", next: "Keep learning", goOn: "Pick up where you left off", nextUnit: (x) => `Next in ${x}`, nextYear: (y) => `On to ${y}`, more: "Other subjects", newSubj: "Try a new subject", fresh: "New for you", lessonOf: (k, n) => `Lesson ${k} of ${n}`, mins: (m) => `about ${m} minutes`, go: "Start", allDone: "All done!", allDoneSub: "Keep it fresh in the Practice tab.", doneOf: (a, b) => `${a} of ${b} done`, lessons: (n) => `${n} ${n === 1 ? "lesson" : "lessons"}`, finish: "Done", today: "Recommended practice", allTopics: "All topics", search: (s, y) => `Search ${s}, ${y}`, nothing: "Nothing found.", year: "Year", yourYear: "your year", sets: (n) => `${n} ${n === 1 ? "unit" : "units"}`,
    meTitle: "My progress", stars: "Stars", streak: "Days in a row", sessions: "Sessions", bee: "Busy Bee", beeTo: (a, b) => `${a} of ${b} practice sessions`, beeMax: "Every level done!", notYet: "Not earned yet", level: (n) => `Level ${n} of 6`, streakTitle: "Streak", streakNow: (n) => `${n} school ${n === 1 ? "day" : "days"} in a row`, streakBest: (n) => `Best run: ${n}`, streakTo: (n, name) => `${n} more school ${n === 1 ? "day" : "days"} to ${name}`, streakNote: "Weekends never count and never break it.", records: "Drill records", perMin: (n) => `${n} a minute`, noRecords: "No drill played yet. Try one in the Practice tab!", subjects: "Your subjects", ofStars: (a, b) => `${a} of ${b} stars` },
};
const AT = () => ATXT[PL()];
const STREAK_NAME = { spark: ["Funke", "Spark"], flame: ["Flamme", "Flame"], campfire: ["Lagerfeuer", "Campfire"], torch: ["Fackel", "Torch"], comet: ["Komet", "Comet"], volcano: ["Vulkan", "Volcano"], sun: ["Sonne", "Sun"], supernova: ["Supernova", "Supernova"] };
const streakName = (id) => STREAK_NAME[id]?.[PL() === "de" ? 0 : 1] ?? id;
// The Home, Study and Practice icons, drawn for the navbar (twist/pages/navbar/icons/): their moving parts are named
// (.tb-door, .tb-sheet, .tb-tassel) so a tab animates once when you switch to it. Me keeps the app's picture.
const TAB_ART = {
  start: '<svg class="tb-icon tb-home" width="31" height="29" viewBox="0 0 62 58" fill="none" aria-hidden="true"><path d="M12 25 V47 Q12 54 19 54 H43 Q50 54 50 47 V25 L31 10 Z" fill="#BB72F2" stroke="#6C2EB7" stroke-width="3" stroke-linejoin="round"/><path d="M15 46 Q15 51 20 51 H42 Q47 51 47 46" stroke="#9A4FD8" stroke-width="3" stroke-linecap="round"/><path d="M17 30 V39" stroke="#D8A0FB" stroke-width="2.5" stroke-linecap="round"/><rect class="tb-doorway" x="24" y="33" width="14" height="21" rx="4" fill="#4A1D86" stroke="#6C2EB7" stroke-width="2.5"/><g class="tb-door"><rect x="24" y="33" width="14" height="21" rx="4" fill="#984BDB" stroke="#6C2EB7" stroke-width="2.5"/><path d="M27.5 37 V42" stroke="#B16AEB" stroke-width="2" stroke-linecap="round"/><circle cx="34.2" cy="44.5" r="1.7" fill="#D8A0FB"/></g><path d="M6.5 27 L31 7 L55.5 27" stroke="#6C2EB7" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 27 L31 7 L55.5 27" stroke="#AB5FE9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 22.5 L27.5 9" stroke="#D8A0FB" stroke-width="2.4" stroke-linecap="round"/><path d="M43.5 15.5 L46.5 18" stroke="#D8A0FB" stroke-width="2.4" stroke-linecap="round"/></svg>',
  study: '<svg class="tb-icon tb-study" width="32" height="27" viewBox="0 0 64 54" fill="none" aria-hidden="true"><path d="M3 14 V45 Q3 48.5 6.5 48 Q20 46 28 48.5 Q32 51.5 36 48.5 Q44 46 57.5 48 Q61 48.5 61 45 V14 Z" fill="#AE6EE6" stroke="#612EAD" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 11 Q22 4 9 5.5 Q6.5 5.8 6.5 8.5 V40 Q6.5 43 9.3 42.8 Q22 41.5 32 47 Z" fill="#D29DF6" stroke="#612EAD" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 15 Q20 13.5 27 16.5 M12 21.5 Q20 20 27 23 M12 28 Q20 26.5 27 29.5 M12 34.5 Q20 33 27 36" stroke="#AE6EE6" stroke-width="2" stroke-linecap="round"/><path d="M11 9 Q16 8.1 20 8.5" stroke="#ECCBFD" stroke-width="2" stroke-linecap="round"/><path d="M32 11 Q42 4 55 5.5 Q57.5 5.8 57.5 8.5 V40 Q57.5 43 54.7 42.8 Q42 41.5 32 47 Z" fill="#D29DF6" stroke="#612EAD" stroke-width="2.5" stroke-linejoin="round"/><path d="M52 15 Q44 13.5 37 16.5 M52 21.5 Q44 20 37 23 M52 28 Q44 26.5 37 29.5 M52 34.5 Q44 33 37 36" stroke="#AE6EE6" stroke-width="2" stroke-linecap="round"/><g class="tb-sheet"><path d="M32 11 Q42 4 55 5.5 Q57.5 5.8 57.5 8.5 V40 Q57.5 43 54.7 42.8 Q42 41.5 32 47 Z" fill="#ECCBFD" stroke="#612EAD" stroke-width="2.5" stroke-linejoin="round"/><path d="M52 15 Q44 13.5 37 16.5 M52 21.5 Q44 20 37 23 M52 28 Q44 26.5 37 29.5" stroke="#C084F0" stroke-width="2" stroke-linecap="round"/></g><path d="M32 11 V47" stroke="#612EAD" stroke-width="2.5" stroke-linecap="round"/></svg>',
  practice: '<svg class="tb-icon tb-practice" width="32" height="28" viewBox="0 0 64 56" fill="none" aria-hidden="true"><path d="M14 20 V39 Q14 48 32 49 Q50 48 50 39 V20 Z" fill="#A559DA" stroke="#6830A9" stroke-width="2.5" stroke-linejoin="round"/><path d="M17.5 41 Q21 45.5 32 46 Q43 45.5 46.5 41" stroke="#8C46C6" stroke-width="2.5" stroke-linecap="round"/><path d="M18 30 V36" stroke="#C27FEE" stroke-width="2.2" stroke-linecap="round"/><path d="M32 3 L61 16 L32 29 L3 16 Z" fill="#D193F2" stroke="#6830A9" stroke-width="3" stroke-linejoin="round"/><path d="M10 16 L30 7" stroke="#EBCBFD" stroke-width="2.4" stroke-linecap="round"/><path d="M32 16 Q44 17 53 19.6" stroke="#8C46C6" stroke-width="2.4" stroke-linecap="round"/><circle cx="32" cy="16" r="2.4" fill="#A559DA" stroke="#6830A9" stroke-width="1.8"/><g class="tb-tassel"><path d="M53 19.6 V35" stroke="#8C46C6" stroke-width="2.4" stroke-linecap="round"/><path d="M50.3 35 H55.7 L57.5 44.5 Q53 46.7 48.5 44.5 Z" fill="#A559DA" stroke="#6830A9" stroke-width="1.8" stroke-linejoin="round"/><path d="M52 37.5 L51.3 42.5" stroke="#D193F2" stroke-width="1.4" stroke-linecap="round"/><circle cx="53" cy="35" r="2" fill="#D193F2" stroke="#6830A9" stroke-width="1.6"/></g></svg>'
};
// Me is the app's picture (ist-schoolido develop, assets/images/tabs): coloured when open, grey otherwise. The drawn ones go grey in CSS.
const tabIcon = (t, on) => TAB_ART[t] ?? `<img src="tabs/${on ? "profile.png" : "profile-gray.png"}" alt="" class="tab-${t}">`;
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
  if (!PR.index || PR.index.curriculum !== PR.child.curriculum || PR.index.tracks !== JSON.stringify(PR.child.tracks ?? {})) PR.index = indexFor(PR.child);
  return PR.child;
}
function appTabs(active) {
  const T = AT(), nav = document.createElement("nav"); nav.className = "app-tabs"; nav.setAttribute("aria-label", "Twist");
  nav.innerHTML = TABS.map((t) => `<button data-t="${t}" style="--tc:${ROOM[t]}"${t === active ? ' aria-current="page"' : ""}>${tabIcon(t, t === active)}<span>${esc(T[t])}</span></button>`).join("");
  nav.querySelectorAll("button").forEach((b) => b.onclick = () => appTab(b.dataset.t));
  // A real switch (not a redraw of the same tab): the new tab's icon plays once and the pill slides over from the old one.
  // Some switches draw the new tab twice in a row (Study to Practice changes the view, then the tab); the second keeps the switch.
  const now = performance.now();
  if (APP.tabShown !== active) APP.tabSwitch = { from: APP.tabShown, at: now };
  APP.tabShown = active;
  const from = now - (APP.tabSwitch?.at ?? -1e9) < 400 ? APP.tabSwitch.from : null;
  if (from && from !== active && TABS.includes(from)) {
    const on = nav.querySelector(`[data-t="${active}"]`), was = nav.querySelector(`[data-t="${from}"]`);
    on?.classList.add("tb-play");
    const pill = document.createElement("i"); pill.className = "app-tabs-pill"; pill.style.setProperty("--tc", ROOM[active]);
    nav.classList.add("tb-sliding"); nav.prepend(pill);
    requestAnimationFrame(() => {
      if (!on || !was || !nav.isConnected) return nav.classList.remove("tb-sliding");
      const at = (b) => `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
      Object.assign(pill.style, { width: `${on.offsetWidth}px`, height: `${on.offsetHeight}px`, transform: at(was) });
      pill.getBoundingClientRect();
      pill.classList.add("go"); pill.style.transform = at(on);
      pill.addEventListener("transitionend", () => { nav.classList.remove("tb-sliding"); pill.remove(); }, { once: true });
    });
  }
  return nav;
}
const inPractice = () => document.body.classList.contains("practice");
// Switch the app to a tab. Study needs the lesson view; the others the practice view.
// Study opens on the track; { keep: true } goes back to the unit list if that was open.
function appTab(t, { keep = false } = {}) {
  stopAudio(); appChild();
  APP.tab = t;
  // Study is marked open before the view changes, so the lesson view coming back draws (and says) nothing.
  if (t === "study") { if (!keep) APP.units = false; APP.home = "study"; if (["practice", "parents", "types", "drawn", "sources", "fbv", "usv"].some((v) => document.body.classList.contains(v))) setView("lessons"); APP.fromApp = false; APP.units ? renderStudy() : renderTrack(); return renderPracticeSide(); }
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
// A track (DaZ) is at the level the child has in it (pretend child, DaZ level), whatever the school year.
const isTrack = (subj) => !!D.tracks?.[PR.child.curriculum]?.[subj];
const childYearFor = (subj) => { const y = isTrack(subj) ? PR.child.tracks?.[subj] : subj === "fl" ? D.learningYears?.[PR.child.curriculum]?.[PR.child.year] : PR.child.year; return yearsOf(subj).includes(y) ? y : yearsOf(subj)[0]; };
function courseSets(subj, year = childYearFor(subj)) {
  const c = PR.child;
  return D.sets.filter((s) => s.curriculum === c.curriculum && s.year === year && subjOf(s).endsWith("." + subj)).sort((a, b) => a.order - b.order);
}
const lessonsDone = (s) => PR.child.lessons?.[s.id] ?? 0;
const nextIn = (sets) => sets.find((s) => lessonsDone(s) < s.lessons.length);
// A foreign language starts in the year its curriculum gives it a learning year (French in Year 3,
// Englisch Stufe 0 in Klasse 1); before that it is not offered.
// A track (DaZ) only for a child who has it.
const offered = (x) => isTrack(x) ? !!PR.child.tracks?.[x] : x !== "fl" || !D.learningYears?.[PR.child.curriculum] || !!D.learningYears[PR.child.curriculum][PR.child.year];
const appSubjects = () => PR.index.subjects.filter((x) => yearsOf(x).length && offered(x));
// A lesson opens after the books have played a moment, as in the app (QuizLoadingScreen).
function startLesson(setId, n) {
  stopAudio();
  loadingBooks(1400, () => {
    // Held as Study while the view changes, so the last lesson does not flash up (or speak) first.
    APP.home = "study"; if (inPractice()) setView("lessons");
    APP.home = null; APP.fromApp = true;
    pickSet(D.sets.findIndex((s) => s.id === setId), n);
    // A lesson left part way picks up at the step where the child stopped.
    const r = PR.child.resume;
    if (r && r.setId === setId && r.n === lesson.n && r.at > 0 && r.at < steps.length - 1) go(r.at);
  });
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
  // Right answers in today's practice, from the log's "12 of 14 right".
  const right = t.reduce((n, e) => n + (+(/^\S+ session[^:]*: (\d+) of \d+ right/.exec(e.text)?.[1] ?? 0)), 0);
  return { lessons: t.filter((e) => /^lesson \d+ of \S+ finished/.test(e.text)).length, practice: t.filter((e) => /^\S+ session:/.test(e.text)).length, right };
}
// A row that scrolls sideways fades out at the edge it can still scroll to, so a cut chip reads as "more".
function scrollFades(scr) {
  scr.querySelectorAll(".scroll-fade").forEach((r) => {
    const mark = () => { r.classList.toggle("more-l", r.scrollLeft > 4); r.classList.toggle("more-r", r.scrollLeft + r.clientWidth < r.scrollWidth - 4); };
    r.addEventListener("scroll", mark, { passive: true }); mark();
  });
}
// A title on one line where it can: a suffix like "-tion" never breaks off its hyphen.
const keepSuffix = (t) => esc(t).replace(/(^|\s)(-[\p{L}]+)/gu, '$1<span class="nb">$2</span>');
// A subject's mark: a short glyph in a ring that fills with the units done in the child's year.
const SUBJ_GLYPH = { math: "1+2", "lit-en": "Aa", "lit-de": "Aa", fl: { "en-GB": "Fr", "de-DE": "En" }, world: "🌱", daz: "De" };
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
    // The app's lesson card: the soft subject fill, name and minutes, the title, the unit, a white button.
    return `<div class="pr-hero hm-card" role="group" style="--c:${colourOf(subj)}">
      <span class="pr-kind">${esc(name)}<i class="pr-dur">${esc(T.minShort(s.minutes ?? 10))}</i></span><b class="pr-reason">${keepSuffix(l.title[lg] ?? l.title.de)}</b><span class="pr-sub">${esc(s.title[lg] ?? s.title.de)} · ${esc(T.unitOf(k, sets.length))}</span>
      <button class="pr-go" data-start="${esc(s.id)}" data-n="${l.n}">${esc(T.go)}</button><img class="pr-art" src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></div>`;
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
  // Where the child stopped: the step inside this lesson when it was left part way, else the lesson.
  const r = PR.child.resume, inside = r && r.setId === s.id && r.n === l.n ? r : null, R = WHERE_TXT[lg];
  const where = [T.lessonOf(done + 1, s.lessons.length), inside?.act ? R.acts[inside.act] + (inside.k ? `, ${R.task(inside.k, inside.tasks)}` : "") : ""].filter(Boolean).join(" · ");
  const p = inside ? (100 * inside.at) / Math.max(1, inside.of - 1) : (100 * done) / s.lessons.length;
  return `<div class="pr-hero ln-next hm-lesson hm-resume" role="group" style="--c:${col}">
      <span class="pr-kind">${esc(name)}<i class="pr-dur">${esc(T.minShort(s.minutes ?? 10))}</i></span>
      <b class="pr-reason">${keepSuffix(l.title[lg] ?? l.title.de)}</b><span class="pr-sub">${esc(s.title[lg] ?? s.title.de)}</span>
      <span class="hm-where"><small>${esc(where)}</small><i class="hm-pbar" aria-hidden="true"><i style="width:${p}%"></i></i></span>
      <button class="pr-go" data-start="${esc(s.id)}" data-n="${l.n}">${esc(inside ? R.goOn : T.go)}</button>
      <img class="pr-art" src="${A}mascot/${s.pose ?? "start-2"}.png" alt=""></div>`;
}
const WHERE_TXT = {
  de: { acts: { "warm-up": "Aufwärmen", learn: "Entdecken", practise: "Üben", check: "Zeig, was du kannst" }, task: (k, n) => `Aufgabe ${k} von ${n}`, goOn: "Weitermachen" },
  en: { acts: { "warm-up": "Warm-up", learn: "Learn", practise: "Practise", check: "Show what you know" }, task: (k, n) => `question ${k} of ${n}`, goOn: "Carry on" },
};
// The object that stands for a subject on a practice card (the app's cup, croissant and number blocks).
const SUBJ_OBJECT = { math: "dice", "lit-de": "book", "lit-en": "book", fl: { "de-DE": "cup", "en-GB": "croissant" }, world: "tree", daz: "schoolbag" };
const subjObject = (x) => { const o = SUBJ_OBJECT[x]; return (typeof o === "string" ? o : o?.[PR.child.curriculum]) ?? "book"; };
const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
// Start: today's plan (a lesson, then practice), ticked off as the child does it,
// then the subjects. With the plan done, a well done and the way to more.
// A practice suggestion as the app's Recommended practice card, on Start and on Practice: a
// light card in the subject's colour, its title what is practised (the lesson set, the topic, or
// a recap's topics), the line under it why and how long, the subject's object, and one button
// (start) across the bottom; the card itself starts nothing. attr wires the button.
function practiceTitle(x) { const lg = PL(); if (x.kind === "recaps") return cardSub(x); if (x.kind === "review") return PR.index.topics.find((t) => t.key === x.topic)?.name[lg] ?? cardSub(x); return setOfSkill(x.skills[0])?.title[lg] ?? cardSub(x); }
function practiceCard(x, attr) {
  const L = PT(), subj = subjOfSkill(x.skills[0]), t = practiceTitle(x), why = x.paused ? PAUSE_TXT[PL()].kind(L.kinds[x.kind] ?? "") : x.reason[PL()].includes(t) ? L.kinds[x.kind] ?? "" : x.reason[PL()];
  return `<div class="hm-practice" role="group" style="--c:${colourOf(subj)}"><span><b>${esc(t)}</b><small>${esc(why)} · ${esc(sizeOf(x).split(", ").pop())}</small></span><button class="hm-pr-go" ${attr}>${esc(x.paused ? PAUSE_TXT[PL()].go : L.practise)}</button><img src="${A}objects/${subjObject(subj)}.png" alt=""></div>`;
}
function renderHomeTab() {
  const T = AT(), L = PT(), scr = $("#screen"), c = PR.child;
  const plan = homePlan(); APP.subj = plan.subj;
  const sugs = mySuggestions().slice(0, 2), sug = sugs[0], did = today(c), s = streak(c), bee = busyBee(c.sessions);
  const lesson = nextIn(plan.sets) ? lessonStep(plan) : "";
  const goal = [lesson || did.lessons, sug || did.practice].filter(Boolean).length || 1;
  const got = Math.min(goal, (did.lessons ? 1 : 0) + (did.practice ? 1 : 0)), all = got >= goal;
  // Something done today: a card of its own in the done green, the mascot cheering, what was done,
  // and a way to do more (Practice, or Study for lessons).
  const DONE_TXT = { de: { right: (n) => `${n} richtig`, more: "Noch mehr üben", lessons: "Weiterlernen" }, en: { right: (n) => `${n} right`, more: "Practise more", lessons: "Keep learning" } }[PL()];
  const doneRow = (text, sub, go) => `<div class="hm-done"><span><i>${TICK}</i><b>${esc(text)}</b></span><small>${esc(sub)}</small>${go ? `<button class="hm-done-go" data-done="${go}">${esc(go === "practice" ? DONE_TXT.more : DONE_TXT.lessons)}</button>` : ""}<img src="${A}mascot/end-${go === "practice" ? 1 : 3}.png" alt=""></div>`;
  // At most two practice suggestions, one under the other: the first with the mascot.
  // As the app's Recommended practice: a light card in the subject's colour, the whole card a button,
  // its title, what it is in a line or two, and the subject's object on the right.
  // The title is what is practised, short, as the app's "Tricky spellings": the lesson set, the topic,
  // or a recap's topics; the line under it says why and how long.
  const pCard = (x, i) => practiceCard(x, `data-sug="${i}"`);
  // Two suggestions make a deck, as the lessons of the other subjects do.
  const practiceHtml = sugs.length > 1 ? deckOf(sugs.map(pCard)) : sugs.map(pCard).join("");
  const steps = [];
  // The next lessons are in the subject row below; a lesson done today shows as its own row.
  if (did.lessons) steps.push(doneRow(T.lessonDone, T.lessonsToday(did.lessons), "study"));
  if (did.practice) steps.push(doneRow(T.practiceDone, T.sessionsToday(did.practice) + (did.right ? ` · ${DONE_TXT.right(did.right)}` : ""), "practice"));
  else if (practiceHtml) steps.push(`<h3 class="pr-h hm-step">${esc(T.today)}</h3>${practiceHtml}`);
  const more = [did.practice && practiceHtml ? practiceHtml : ""].filter(Boolean);
  const pct = (100 * got) / goal;
  scr.style.setProperty("--subj", BRAND); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page hm">
    <header class="hm-top fun-band" style="--room:${ROOM.start}">
      <button class="hm-av" data-settings aria-label="${esc(ST().title)}">${avatar(c)}</button>
      <div><h2>${esc(c.name ? T.helloName(c.name) : T.hi)}</h2><small>${esc(all ? T.planDone : greetLine(got, goal, s.current, plan, sug, did))}</small></div>
      <button class="hm-goal${all ? " full" : got ? "" : " zero"}" data-rw="streak" style="--p:${pct}" aria-label="${esc(T.planLeft(got, goal))}, ${esc(T.streakNow(s.current))}"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle class="v" cx="24" cy="24" r="20" pathLength="100"/></svg><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt=""><b>${s.current}</b></button>
    </header>
    ${all ? `<section class="hm-win"><img src="${A}mascot/end-2.png" alt=""><div><b>${esc(T.winTitle)}</b><small>${esc(s.current ? T.winStreak(s.current) : T.winSub)}</small>
      <span class="hm-ticks">${did.lessons ? `<em>${TICK}${esc(T.lessonsToday(did.lessons))}</em>` : ""}${did.practice ? `<em>${TICK}${esc(T.sessionsToday(did.practice))}</em>` : ""}</span></div></section>`
    : `<section class="hm-plan">${steps.join("") || doneRow(T.allDone, T.allDoneSub)}</section>`}
    ${all && more.length ? `<section class="hm-more"><h3 class="pr-h">${esc(T.wantMore)}</h3>${more.join("")}</section>` : ""}
    ${subjectRow(null)}
  </div>`;
  scr.appendChild(appTabs("start"));
  scr.querySelectorAll("[data-done]").forEach((b) => b.onclick = () => appTab(b.dataset.done));
  wireHeader(scr); wireStarts(scr); wireRow(scr);
  // A tap on a card away from its button wiggles the button: that is what starts it.
  scr.querySelectorAll(".hm-lesson, .hm-card, .hm-practice").forEach((c) => c.addEventListener("click", (e) => { if (e.target.closest("button")) return; const g = c.querySelector(".pr-go, .hm-pr-go"); g?.classList.remove("nudge"); void g?.offsetWidth; g?.classList.add("nudge"); }));
  scr.querySelectorAll("[data-sug]").forEach((b) => b.onclick = () => { const x = sugs[+b.dataset.sug || 0]; if (x.paused) return resumeSession(); appTab("practice"); PR.assignedId = x.assigned ?? null; startSession({ kind: x.kind, skills: x.skills, minutes: x.minutes ?? (x.kind === "drill" ? 2 : null) }); });
}

/* ---------- Study: the track ---------- */
// As in ist-schoolido (app/(tabs)/lesson-path.tsx), with a stone per skill (a
// lesson set) of the course: one column, arcs that bulge left and right and fill
// as skills are done, a line where a topic starts, the mascot on the current
// skill and islands in the open space. The card on top names the topic and the
// skill in focus and opens the unit list. The skill in focus has its popover
// open under it the whole time: as the track scrolls, the popover moves to the
// skill at the focus line and shows its lessons, each to start from there.
const TRACK_ART = { math: "math", "lit-de": "german", "lit-en": "english", fl: { "de-DE": "english", "en-GB": "french" }, world: "world", daz: "daz" };
const TRACK = {
  math: { route: "#018641", grad: ["#0BBE81", "#145E39"], soft: "#E2F0EA", islands: 4 },
  german: { route: "#E87729", grad: ["#E8A527", "#BC4113"], soft: "#F8EAE0", islands: 4 },
  english: { route: "#408AF4", grad: ["#32ACF5", "#0D42AC"], soft: "#E3EEF7", islands: 5 },
  // French has no art of its own: the English art turned to its purple.
  french: { route: "#8f73ff", grad: ["#9b7bff", "#4b2fb0"], soft: "#ece6fb", islands: 5, files: "english" },
  // Sachunterricht has no art of its own yet: the maths art turned to its teal.
  world: { route: "#0B8A8F", grad: ["#19B5B0", "#0A5E66"], soft: "#E0F2F1", islands: 4, files: "math" },
  // DaZ has no art of its own yet: the German art turned to its raspberry.
  daz: { route: "#C2255C", grad: ["#E64980", "#A61E4D"], soft: "#FBE7EF", islands: 4, files: "german" },
};
// pad: room above the first stone for its popover or the study card.
const TR = { pad: 380, step: 266, decor: 132, stone: 107, stoneH: 74, arcW: 167.5, arcH: 219, islandW: 124, mascot: 104 };
const ISLAND_DY = [0, -24, 0, -24, -24];
const ARCH_PATH = "M8.15 22.9C8.15 22.9 47.71 2.35 47.71 2.35C50.42 0.94 53.65 0.62 56.58 1.47C195.73 41.95 199.88 146.33 57.21 211.78C53.93 213.28 50.06 213.2 46.85 211.56C46.85 211.56 3.18 189.23 3.18 189.23C-0.16 187.52 0.48 182.49 4.11 181.54C118.03 151.67 147.82 64.21 8.95 28.61C6.25 27.92 5.68 24.19 8.15 22.9Z";
const TKTXT = {
  de: { units: "Alle Einheiten", back: "Zurück", start: "Lektion starten", goOn: "Weiter lernen", again: "Nochmal spielen", locked: "Noch gesperrt", min: (m) => `${m} Min.`, lessonOf: (k, n) => `Lektion ${k} von ${n}`, allDone: (n) => `${n} von ${n} Lektionen geschafft`, notYet: (n) => `${n} Lektionen`, showAll: (n) => n === 1 ? "Lektion zeigen" : `Die ${n} Lektionen zeigen`, showLess: "Weniger zeigen", subject: "Fach wählen" },
  en: { units: "All units", back: "Back", start: "Start lesson", goOn: "Keep going", again: "Play again", locked: "Locked", min: (m) => `${m} min`, lessonOf: (k, n) => `Lesson ${k} of ${n}`, allDone: (n) => `All ${n} lessons done`, notYet: (n) => `${n} lessons`, showAll: (n) => n === 1 ? "Show the lesson" : `Show the ${n} lessons`, showLess: "Show less", subject: "Choose a subject" },
};
const TK = () => TKTXT[PL()];
const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>';
const LIST = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.5" cy="6.5" r="1.3" class="f"/><circle cx="4.5" cy="12" r="1.3" class="f"/><circle cx="4.5" cy="17.5" r="1.3" class="f"/></svg>';
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
function renderTrack() {
  const T = AT(), K = TK(), lg = PL(), scr = $("#screen"), c = PR.child, subs = appSubjects();
  if (!subs.includes(APP.subj)) APP.subj = subs[0];
  const year = yearsOf(APP.subj).includes(APP.year) ? APP.year : childYearFor(APP.subj);
  const art = trackArt(APP.subj), look = TRACK[art], files = look.files ?? art, colour = colourOf(APP.subj);
  const rows = trackSkills(APP.subj, year), cur = Math.max(0, rows.findIndex((x) => x.state === "current"));
  const s = streak(c), stars = allStars(c);
  // Room above the first stone for the study card when it stands there; once the mascot has
  // moved down the track, less, so the top of the track is not an empty field.
  const pad = cur === 0 ? TR.pad : cur === 1 ? TR.pad - 80 : TR.pad - 170;
  const top = (i) => pad + i * TR.step, mid = (i) => top(i) + TR.decor / 2;
  const at = (x) => `calc(50% + ${x}px)`;
  const arcs = rows.map((r, i) => {
    if (!i) return "";
    const even = i % 2 === 0, y = top(i) - TR.step / 2 + TR.decor / 2 - TR.arcH / 2;
    const left = even ? -TR.stone / 2 + 48 - TR.arcW : TR.stone / 2 - 48;
    const island = `study/${files}-path-${((i - 1) % look.islands) + 1}.png`, ih = TR.islandW * 0.73;
    return `<svg class="tr-arc" viewBox="0 0 163.59 213.85" preserveAspectRatio="none" style="top:${y}px;left:${at(left)};width:${TR.arcW}px;height:${TR.arcH}px;transform:scaleX(${even ? -1 : 1}) rotate(-1deg)" aria-hidden="true"><path d="${ARCH_PATH}" fill="${look.route}" fill-opacity="${rows[i - 1].done ? 1 : 0.08}"/></svg>
      <img class="tr-island" src="${island}" alt="" style="top:${y + TR.arcH / 2 - ih / 2 + ISLAND_DY[(i - 1) % ISLAND_DY.length]}px;${even ? "right" : "left"}:4px;width:${TR.islandW}px">`;
  }).join("");
  const lines = rows.map((r, i) => r.topicStart && i ? `<i class="tr-unit" style="top:${mid(i) - 1}px;--gap:${TR.stone / 2 + 12}px"></i>` : "").join("");
  const stones = rows.map((r, i) => `<button class="tr-stone ${r.state}" data-i="${i}" style="top:${top(i) + (TR.decor - TR.stoneH) / 2}px;left:${at(-TR.stone / 2)};width:${TR.stone}px" aria-label="${esc(r.s.title[lg] ?? r.s.title.de)}"><img src="study/${files}-stone-${r.state === "done" ? "done" : "active"}.png" alt=""></button>`).join("");
  // Each skill's stars under its stone; they stay when the skate's card stands on the stone.
  const starRow = rows.map((r, i) => `<span class="tr-st ${r.state}" style="top:${top(i) + (TR.decor + TR.stoneH) / 2 + 2}px">${starsOf3(stateKey(r.s))}</span>`).join("");
  const mascot = rows.length ? `<img class="tr-mascot" data-i="${cur}" src="${A}mascot/start-2.png" alt="" style="top:${mid(cur) - TR.mascot * 1.05}px;left:${at(TR.decor / 2 - TR.mascot * 1.2)};width:${TR.mascot}px">` : "";
  scr.style.setProperty("--subj", colour); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div>
    <header class="tr-stats">
      <button class="tr-pill" aria-haspopup="true" aria-label="${esc(K.subject)}"><img src="study/${art}.svg" alt="">${CHEVRON}</button>
      <button class="tr-stat" data-rw="streak" aria-label="${esc(RW().tabs.streak)}"><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt="">${s.current}</button>
      <button class="tr-stat" data-rw="stars" aria-label="${esc(RW().tabs.stars)}"><i>★</i>${stars}</button>
      <button class="tr-stat" data-rw="badges" aria-label="${esc(RW().tabs.badges)}"><img src="${A}badges/legend.svg" alt="">${myBadges().filter((b) => b.earned).length}</button>
    </header>
    <div class="pr-home app-page tr-page" style="--route:${look.route};--g1:${look.grad[0]};--g2:${look.grad[1]};--soft:${look.soft}">
      <button class="tr-card"><i><img src="study/${art}.svg" alt=""></i><span><b id="trUnit"></b><b id="trLesson"></b></span>${CHEVRON}</button>
      <div class="tr-path ${art}" style="height:${top(rows.length) + 420}px">${arcs}${lines}${stones}${starRow}${mascot}<div class="tr-tip up" aria-live="polite" hidden></div></div>
    </div><div class="tr-fade" aria-hidden="true"></div>`;
  scr.appendChild(appTabs("study"));
  wireHeader(scr);
  const page = $(".tr-page", scr), tip = $(".tr-tip", scr), card = $(".tr-card", scr), path = $(".tr-path", scr);
  let focus = -1, open = false, all = false, skate = null;
  // The skill in focus: the card names it, and its popover sits under its stone.
  // The popover shows where the child is in the skill (a meter and the next
  // lesson); the whole list of lessons is one tap away. Tapping away or on the
  // stone closes it; scrolling to another skill or tapping a stone opens it.
  const close = () => { open = false; tip.hidden = true; skate?.hide(true); scr.querySelectorAll(".tr-stone.focus").forEach((b) => b.classList.remove("focus")); };
  const show = (i, force) => {
    const r = rows[i]; if (!r || (i === focus && open && !force)) return;
    if (i !== focus) all = false;
    focus = i; open = true; tip.hidden = false;
    $("#trUnit").textContent = r.topic || (r.s.title[lg] ?? r.s.title.de); $("#trLesson").textContent = r.s.title[lg] ?? r.s.title.de;
    scr.querySelectorAll(".tr-stone").forEach((b) => b.classList.toggle("focus", +b.dataset.i === i));
    const done = lessonsDone(r.s), n = r.s.lessons.length, next = r.s.lessons[Math.min(done, n - 1)], locked = r.state === "locked", finished = r.state === "done";
    const label = locked ? K.locked : finished ? K.again : done ? K.goOn : K.start;
    const W = WEAK_TXT[lg], weakAt = (l, k) => k < done && weakOf(r.s, l.n), firstWeak = r.s.lessons.find((l, k) => weakAt(l, k));
    const row = (l, k) => `<li><button data-n="${l.n}" class="${weakAt(l, k) ? "weak" : k < done ? "done" : k === done && !locked ? "now" : ""}"${locked ? " disabled" : ""}><i>${weakAt(l, k) ? "!" : k < done ? TICK : l.n}</i><span>${esc(l.title[lg] ?? l.title.de)}</span></button></li>`;
    // The lessons stay folded away until the child opens them.
    const shown = all ? r.s.lessons.map(row) : [];
    // One line for where the child is; the lessons open from the list button beside Start.
    tip.innerHTML = `<span class="tr-tt"><b>${keepSuffix(r.s.title[lg] ?? r.s.title.de)}</b>${starsOf3(stateKey(r.s), "tr-tip-st")}</span>
      <span class="tr-row"><span class="tr-meter" aria-hidden="true">${r.s.lessons.map((l, k) => `<i class="${weakAt(l, k) ? "weak" : k < done ? "on" : k === done && !locked ? "now" : ""}"></i>`).join("")}</span>
        <span class="tr-meta">${esc(finished ? K.allDone(n) : locked ? K.notYet(n) : K.lessonOf(done + 1, n))}<span>${esc(K.min(r.s.minutes ?? 10))}</span></span></span>
      ${firstWeak && !shown.length ? `<button class="tr-weak" data-n="${firstWeak.n}"><i>!</i><span>${esc(W.lesson(firstWeak.title[lg] ?? firstWeak.title.de))}</span></button>` : ""}
      ${shown.length ? `<ol class="tr-ls">${shown.join("")}</ol>` : ""}
      <span class="tr-actions"><button class="tr-go"${locked ? " disabled" : ""}>${locked ? LOCK : ""}${esc(label)}${locked ? "" : ARROW}</button>
        <button class="tr-more" aria-expanded="${all}" aria-label="${esc(all ? K.showLess : K.showAll(n))}" title="${esc(all ? K.showLess : K.showAll(n))}">${LIST}</button></span>`;
    $(".tr-more", tip)?.addEventListener("click", (e) => { e.stopPropagation(); all = !all; show(i, true); });
    // Above its stone, where the app's study card also stands; above the mascot when it stands there.
    tip.style.top = `${top(i) + (TR.decor - TR.stoneH) / 2 + 4 - (i === cur && !skate ? TR.mascot * 0.95 : 0)}px`;
    tip.querySelectorAll("[data-n]").forEach((b) => b.onclick = () => startLesson(r.s.id, +b.dataset.n));
    $(".tr-go", tip).onclick = () => startLesson(r.s.id, r.state === "done" ? r.s.lessons[0].n : next.n);
    // On the current skill the app's study card does the popover's job.
    const onSkate = !!skate && i === cur;
    if (onSkate) tip.hidden = true;
    skate?.hide(!onSkate);
  };
  // The app's skate and study card on the current skill (anim-ui.js).
  APP.skate = skate = trackSkate({ path, rows, cur, top, art,
    onStart: () => { const r = rows[cur], d = lessonsDone(r.s); startLesson(r.s.id, r.s.lessons[Math.min(d, r.s.lessons.length - 1)].n); },
    onNext: (i) => { show(i, true); scrollTo(i, "smooth"); } });
  // The focus line: 60% down the track's window, so the study card above the current skill clears the top card.
  const focusY = () => page.getBoundingClientRect().top + page.clientHeight * 0.6 - path.getBoundingClientRect().top;
  const scrollTo = (i, behavior, lower = 0) => page.scrollTo({ top: Math.max(0, page.scrollTop + mid(i) - focusY() - lower), behavior });
  // Scrolling moves the focus; a closed popover opens again on the next skill, not on the same one.
  // The track's own opening scroll is not the child's: it leaves the focus on the current skill.
  let quiet = 0;
  page.onscroll = () => { if (Date.now() < quiet) return; const i = Math.max(0, Math.min(rows.length - 1, Math.round((focusY() - pad - TR.decor / 2) / TR.step))); if (i !== focus) show(i); };
  scr.querySelectorAll(".tr-stone, .tr-mascot").forEach((b) => b.onclick = (e) => {
    e.stopPropagation(); const i = +b.dataset.i;
    if (i === focus && open) return close();
    show(i, true); scrollTo(i, "smooth");
  });
  tip.onclick = (e) => e.stopPropagation();
  // A tap anywhere else closes it. One listener per track: the last one's goes, and this one starts
  // after the tap that opened the track, which is still on its way up the page.
  APP.trackTaps?.abort(); APP.trackTaps = new AbortController();
  const { signal } = APP.trackTaps;
  setTimeout(() => scr.addEventListener("click", (e) => { if (open && !e.target.closest(".tr-stone, .tr-mascot, .tr-skate")) close(); }, { signal }));
  card.onclick = () => { APP.units = true; APP.year = year; renderStudy(); };
  $(".tr-pill", scr).onclick = (e) => subjectMenu(e.currentTarget);
  // Open on the current skill, a little lower when the study card stands above it.
  quiet = Date.now() + 500;
  scrollTo(cur, "auto", skate ? page.clientHeight * 0.15 : 0); show(cur);
}
// The subject menu under the pill: each subject with its icon.
function subjectMenu(pill) {
  const m = document.createElement("div"); m.className = "tr-menu"; m.setAttribute("role", "menu");
  // As the app's StatsBar picker: one row across the screen, an icon over each name; the
  // subject on show in its colour with a bar under it, the others faded.
  m.innerHTML = appSubjects().map((x) => { const a = trackArt(x); return `<button role="menuitem" data-s="${x}" style="--c:${colourOf(x)}"${x === APP.subj ? ' aria-current="true"' : ""}><i><img src="study/${a}.svg" alt=""></i><b>${esc(SUBJ_NAME[PR.child.curriculum][x] ?? x)}</b></button>`; }).join("");
  const close = () => { m.remove(); document.removeEventListener("pointerdown", away, true); };
  const away = (e) => { if (!m.contains(e.target) && e.target !== pill) close(); };
  m.querySelectorAll("button").forEach((b) => b.onclick = (e) => { if (moved) return e.preventDefault(); close(); APP.subj = b.dataset.s; APP.year = null; renderTrack(); });
  // The row slides left and right when the subjects don't fit: a swipe on a phone, and here a
  // mouse drag too. A drag that moved is not a tap on the subject it ends on.
  let drag = null, moved = false;
  m.onpointerdown = (e) => { if (e.pointerType !== "mouse") return; drag = { x: e.clientX, left: m.scrollLeft }; moved = false; };
  m.onpointermove = (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 5 && !moved) { moved = true; m.classList.add("drag"); m.setPointerCapture(e.pointerId); } if (moved) m.scrollLeft = drag.left - dx; };
  m.onpointerup = m.onpointercancel = () => { drag = null; m.classList.remove("drag"); setTimeout(() => moved = false); };
  m.ondragstart = (e) => e.preventDefault(); // the icons are images: the browser would drag them instead
  $("#screen").appendChild(m); document.addEventListener("pointerdown", away, true);
  m.querySelector('[aria-current="true"]')?.scrollIntoView({ inline: "nearest", block: "nearest" });
}

/* ---------- Rewards: a popover from the streak, stars and badges ---------- */
// It hangs from what was tapped, its tail pointing there, with a tab each for
// the streak (this week and the next streak badge), the stars (by subject) and
// the badges (the newest, the ones on their way, then all the rest), so the
// child never has to leave the screen it is on.
const RWTXT = {
  de: { title: "Deine Belohnungen", tabs: { streak: "Serie", stars: "Sterne", badges: "Abzeichen" }, recent: "Zuletzt verdient", next: "Als Nächstes", none: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", rest: (n) => `Alle weiteren (${n})`, close: "Schließen", starsHow: "Sterne bekommst du für jede Fähigkeit: üben, können, behalten.", streakBig: (n) => n === 1 ? "Schultag in Folge" : "Schultage in Folge" },
  en: { title: "Your rewards", tabs: { streak: "Streak", stars: "Stars", badges: "Badges" }, recent: "Earned lately", next: "Up next", none: "None yet. The first comes with your first skill at I can do it.", rest: (n) => `All the others (${n})`, close: "Close", starsHow: "You get stars for every skill: practise it, can do it, remember it.", streakBig: (n) => n === 1 ? "school day in a row" : "school days in a row" },
};
const RW = () => RWTXT[PL()];
const allStars = (c) => appSubjects().flatMap((x) => courseSets(x).map(stateKey)).reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0);
function rewardsPopover(anchor, tab = "badges") {
  document.querySelector(".rw-pop")?.dispatchEvent(new Event("close"));
  const T = AT(), R = RW(), c = PR.child, scr = $("#screen"), all = myBadges(), s = streak(c);
  const seen = c.badgeSeen ?? {}, got = all.filter((b) => b.earned).sort((x, y) => (seen[y.id]?.n ?? 0) - (seen[x.id]?.n ?? 0));
  const next = nextBadges(all), rest = all.filter((b) => !b.earned && !next.includes(b));
  const nextStreak = s.next ? T.streakTo(s.next[0] - s.current, streakName(s.next[1])) : "";
  const panels = {
    streak: `<div class="rw-hero rw-flame${s.current ? " on" : ""}"><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt=""><span><b>${s.current}</b><small>${esc(R.streakBig(s.current))} · ${esc(T.streakBest(s.best))}</small></span></div>
      ${weekStrip(c)}<small class="me-note">${nextStreak ? `${esc(nextStreak)}. ` : ""}${esc(T.streakNote)}</small>`,
    stars: `<div class="rw-hero rw-star"><i>★</i><span><b>${allStars(c)}</b><small>${esc(R.starsHow)}</small></span></div>
      <div class="me-subj">${appSubjects().map((x) => { const sk = courseSets(x).map(stateKey), g = sk.reduce((n, k) => n + STARS[c.states[k]?.state ?? "not_started"], 0), max = sk.length * 3; return `<div style="--c:${colourOf(x)}"><b>${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</b><small>${esc(T.ofStars(g, max))}</small><i class="pr-bar"><i style="width:${max ? (100 * g) / max : 0}%"></i></i></div>`; }).join("")}</div>`,
    badges: `<h4 class="hm-step">${esc(R.recent)}</h4>
      ${got.length ? `<div class="bd-grid">${got.slice(0, 3).map(badgeTile).join("")}</div>` : `<p class="pr-empty">${esc(R.none)}</p>`}
      <h4 class="hm-step">${esc(R.next)}</h4><div class="bd-grid">${next.map(badgeTile).join("")}</div>
      <details class="bd-all"><summary>${esc(R.rest(got.length > 3 ? rest.length + got.length - 3 : rest.length))}${CHEVRON}</summary><div class="bd-grid">${[...got.slice(3), ...rest].map(badgeTile).join("")}</div></details>`,
  };
  const count = { streak: s.current, stars: allStars(c), badges: got.length };
  const icon = { streak: `<img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt="">`, stars: "<i>★</i>", badges: `<img src="${A}badges/legend.svg" alt="">` };
  const scrim = document.createElement("div"); scrim.className = "rw-scrim";
  const m = document.createElement("div"); m.className = "rw-pop"; m.setAttribute("role", "dialog"); m.setAttribute("aria-label", R.title);
  m.innerHTML = `<div class="rw-tabs" role="tablist">${Object.keys(panels).map((k) => `<button role="tab" data-k="${k}" aria-selected="${k === tab}">${icon[k]}<b>${count[k]}</b><small>${esc(R.tabs[k])}</small></button>`).join("")}
      <button class="rw-x" aria-label="${esc(R.close)}">${ICON.close}</button></div>
    <div class="rw-body"></div>`;
  const body = $(".rw-body", m);
  const show = (k) => { tab = k; m.querySelectorAll("[data-k]").forEach((b) => b.setAttribute("aria-selected", b.dataset.k === k)); body.innerHTML = panels[k]; body.scrollTop = 0; aim(); };
  // The tail points at what was tapped, or at the tab when that isn't on screen.
  const aim = () => {
    const box = scr.getBoundingClientRect(), from = anchor?.isConnected ? anchor.getBoundingClientRect() : null;
    const top = from ? from.bottom - box.top + 10 : 100;
    m.style.top = `${top}px`; m.style.maxHeight = `${box.height - top - 96}px`;
    const x = from ? from.left + from.width / 2 - box.left : box.width / 2;
    m.style.setProperty("--tail", `${Math.max(28, Math.min(box.width - 28, x)) - 12}px`);
  };
  const close = () => { m.remove(); scrim.remove(); document.removeEventListener("keydown", esc_); };
  const esc_ = (e) => { if (e.key === "Escape") close(); };
  m.addEventListener("close", close);
  scrim.onclick = close; $(".rw-x", m).onclick = close; document.addEventListener("keydown", esc_);
  m.querySelectorAll("[data-k]").forEach((b) => b.onclick = () => show(b.dataset.k));
  scr.append(scrim, m); show(tab); $(`[data-k="${tab}"]`, m).focus();
}

/* ---------- Study: the unit list ---------- */
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
  // Search sits behind the lens until the child opens it (or has typed something).
  const finding = !!(APP.find || APP.q);
  scr.style.setProperty("--subj", colour); scr.style.setProperty("--top", `color-mix(in srgb, ${colour} 10%, var(--card))`);
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page st-page">
    <header class="st-band" style="--c:${colour}">
      <div class="st-head"><button class="st-back" aria-label="${esc(TK().back)}">${CHEVRON}</button><h2>${esc(TK().units)}</h2>
        <button class="st-find" aria-label="${esc(T.search(subjName, yearName(APP.year)))}" aria-expanded="${finding}">${LENS}</button></div>
      <div class="st-subjs" role="tablist">${subs.map((x) => `<button role="tab" data-s="${x}" aria-selected="${x === APP.subj}" style="--c:${colourOf(x)}"><i><img src="study/${trackArt(x)}.svg" alt=""></i><b>${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</b></button>`).join("")}</div>
      ${years.length > 1 ? `<div class="st-years scroll-fade" role="tablist" aria-label="${esc(T.year)}">${years.map((y) => `<button role="tab" data-y="${esc(y)}" aria-selected="${y === APP.year}"${y === mine ? ` title="${esc(T.yourYear)}"` : ""}>${esc(yearName(y))}${y === mine ? '<i class="st-mine" aria-hidden="true"></i>' : ""}</button>`).join("")}</div>` : ""}
      <div class="st-prog"><span>${esc(T.doneOf(done, sets.length))}</span><i class="pr-bar"><i style="width:${sets.length ? (100 * done) / sets.length : 0}%"></i></i></div>
    </header>
    ${finding ? `<label class="pr-search">${LENS}<input id="stQ" type="search" value="${esc(APP.q)}" placeholder="${esc(T.search(subjName, yearName(APP.year)))}" autocomplete="off"></label>` : ""}
    <div class="st-topics scroll-fade">${[{ name: null }, ...topics].map((tp) => { const d = tp.sets?.filter((x) => lessonsDone(x) >= x.lessons.length).length, all = !!tp.sets && d === tp.sets.length; return `<button data-t="${esc(tp.name ?? "")}" aria-pressed="${(APP.topic ?? null) === tp.name}"${all ? ' class="done"' : ""}>${all ? "✓ " : ""}${esc(tp.name ?? T.allTopics)}${tp.sets && !all && d ? `<small>${d}/${tp.sets.length}</small>` : ""}</button>`; }).join("")}</div>
    ${!q && !APP.topic && next ? upNext(next) : ""}
    <div id="stList">${shown.map((tp) => `<section class="ln-topic"><h3 class="pr-h">${esc(tp.name)}<small>${esc(T.doneOf(tp.sets.filter((s) => lessonsDone(s) >= s.lessons.length).length, tp.sets.length))}</small></h3>${tp.sets.map((s) => studySetRow(s, s === next && !q)).join("")}</section>`).join("") || `<p class="pr-empty">${esc(T.nothing)}</p>`}</div>
  </div>`;
  scr.appendChild(appTabs("study"));
  $(".st-back", scr).onclick = () => { APP.units = false; renderTrack(); };
  scr.querySelectorAll(".st-subjs button").forEach((b) => b.onclick = () => { APP.subj = b.dataset.s; APP.year = null; APP.topic = null; APP.q = ""; renderStudy(); });
  scr.querySelectorAll(".st-years button").forEach((b) => b.onclick = () => { APP.year = b.dataset.y; APP.topic = null; renderStudy(); });
  $(".st-find", scr).onclick = () => { APP.find = !finding; if (!APP.find) APP.q = ""; renderStudy(); if (APP.find) $("#stQ")?.focus(); };
  scr.querySelectorAll(".st-topics button").forEach((b) => b.onclick = () => { APP.topic = b.dataset.t || null; renderStudy(); });
  const qi = $("#stQ"); if (qi) qi.oninput = () => { APP.q = qi.value; const pos = qi.selectionStart; renderStudy(); const n = $("#stQ"); n.focus(); n.setSelectionRange(pos, pos); };
  wireStarts(scr);
  scr.querySelector(".st-topics [aria-pressed=true]")?.scrollIntoView({ inline: "center", block: "nearest" });
  scr.querySelector(".st-years [aria-selected=true]")?.scrollIntoView({ inline: "center", block: "nearest" });
  scrollFades(scr);
}
// Study's way back in: one row with the next lesson of the course; the unit below is open on it.
function upNext(s) {
  const T = AT(), lg = PL(), done = lessonsDone(s), l = s.lessons[done];
  // Only the play button starts the lesson; the row around it says which one.
  return `<div class="st-next"><button class="st-next-i" data-start="${esc(s.id)}" data-n="${l.n}" aria-label="${esc(T.go)}: ${esc(l.title[lg] ?? l.title.de)}">${PLAY}</button><span><small>${esc(T.upNext)} · ${esc(s.title[lg] ?? s.title.de)}</small><b>${keepSuffix(l.title[lg] ?? l.title.de)}</b></span><em>${esc(T.minShort(s.minutes ?? 10))}</em></div>`;
}
const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>';
// A skill's stars, the same everywhere: 0 to 3 filled by its state (docs/rewards.md),
// the rest empty, so a skill not taken yet shows three empty stars; a refresh mark when due.
function starsOf3(k, cls = "") {
  const st = PR.child.states[k]?.state ?? "not_started", n = STARS[st];
  return `<span class="pr-stars ${cls}" aria-label="${n} / 3">${[1, 2, 3].map((i) => `<i class="${i <= n ? "on" : ""}">★</i>`).join("")}${st === "needs_refresh" ? '<em title="refresh">↻</em>' : ""}</span>`;
}
// A lesson whose last check had a miss is not mastered yet: an amber mark, how its check went
// and a button to play it again. The skill check covers every lesson, so the parts it found
// tricky are named once, on the unit, under its "I can" line.
const WEAK_TXT = {
  de: { score: (r, t) => `${r} von ${t}`, check: "Noch nicht ganz", nudge: "Fast! Noch ein Versuch.", again: "Nochmal", redo: "Nochmal", lesson: (t) => `Nochmal: ${t}` },
  en: { score: (r, t) => `${r} of ${t}`, check: "Not quite yet", nudge: "Almost! One more go.", again: "Try again", redo: "Redo", lesson: (t) => `Try again: ${t}` },
};
// A lesson not mastered: its last check had a miss. A skill left at one star (practised) with all
// its lessons done failed its skill check, in the last lesson, even when no score was kept.
const weakOf = (s, n) => {
  const sc = PR.child.scores?.[s.id]?.[n];
  if (sc) return sc.right < sc.total ? sc : null;
  const last = s.lessons.at(-1)?.n;
  return n === last && PR.child.states[stateKey(s)]?.state === "practised" && (PR.child.lessons?.[s.id] ?? 0) >= s.lessons.length ? { missed: [] } : null;
};
// For the child: the score as dots, filled for each one right ("3 of 5" read out), or "Not quite yet".
// For the child: how it went as one circle per question, a tick for each right ("3 of 5" read out).
const weakText = (w, W) => w.total ? `<span class="ln-dots" role="img" aria-label="${esc(W.score(w.right, w.total))}">${Array.from({ length: w.total }, (_, i) => `<i class="${i < w.right ? "on" : ""}">${i < w.right ? "✓" : ""}</i>`).join("")}</span>` : esc(W.check);
const REDO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M4 4v4.5h4.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// A unit (lesson set): its lessons done, title and stars; open, its goal and lessons to start.
function studySetRow(s, open) {
  const T = AT(), lg = PL(), done = lessonsDone(s), n = s.lessons.length, W = WEAK_TXT[lg];
  const lessonRow = (l, i) => {
    const weak = i < done && weakOf(s, l.n);
    if (!weak) return `<li><button data-start="${esc(s.id)}" data-n="${l.n}" class="${i < done ? "done" : i === done ? "now" : ""}"><span class="ln-n">${i < done ? "✓" : l.n}</span><span>${esc(l.title[lg] ?? l.title.de)}</span>${i === done ? `<em>${esc(T.go)}</em>` : ""}</button></li>`;
    return `<li><button data-start="${esc(s.id)}" data-n="${l.n}" class="weak"><img class="ln-mascot" src="${A}mascot/practise-2.png" alt=""><span class="ln-w"><span>${esc(l.title[lg] ?? l.title.de)}</span>${weakText(weak, W)}</span><em class="ln-redo">${REDO}${esc(W.redo)}</em></button></li>`;
  };
  return `<details class="ln-set${done >= n ? " done" : ""}${open ? " now" : ""}"${open ? " open" : ""}><summary><span class="ln-ring" style="--p:${(100 * done) / n}">${done >= n ? "✓" : `${done}/${n}`}</span><span class="ln-t"><b>${esc(s.title[lg] ?? s.title.de)}</b><small>${esc(T.lessons(n))}</small></span>
      ${starsOf3(stateKey(s))}</summary>
    ${s.can_do?.[lg] ? `<p class="ln-can">${esc(s.can_do[lg])}</p>` : ""}
    <ol class="ln-lessons">${s.lessons.map(lessonRow).join("")}</ol></details>`;
}
// Called by the lesson end screen when the lesson was started from the app.
function appLessonDone(checkSteps, pass) {
  const c = appChild();
  if (set.curriculum !== c.curriculum || steps._recorded) return;
  steps._recorded = true;
  if (c.resume?.setId === set.id) delete c.resume;
  const check = pass == null ? null : { pass, keys: checkSteps.map(([s]) => taskKey(set.id, lesson.n, s.t.id)) };
  const missed = [...new Set(checkSteps.filter(([s, r]) => r !== "first" && s.t.part).map(([s]) => s.t.part))];
  const score = checkSteps.length ? { right: checkSteps.filter(([, r]) => r === "first").length, total: checkSteps.length, missed } : null;
  finishLesson(c, { setId: set.id, skill: stateKey(set), n: lesson.n, check, score });
  // A skill finished: Study's track skates on to the next one (anim-ui.js, trackSkate).
  if (lessonsDone(set) >= set.lessons.length) APP.skillDone = true;
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
  const c = PR.child, all = badges(c, Object.fromEntries(appSubjects().map((x) => [x, courseSets(x).map(stateKey)])));
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
// Badge art: the animated set from badge-motion-twist (player/badges/<name>/: artwork, still,
// intro video with its sound, idle loop) where a badge has one; else the drawn badge.
const MOTION = { "lift-off": "rocket", pathfinder: "compass", "number-navigator": "abacus", "shape-shifter": "shapes", "measure-master": "measure", "data-detective": "insight",
  "code-cracker": "code-cracker", bookworm: "bookworm", wordsmith: "wordsmith", "grammar-guardian": "grammar-guardian", "golden-mic": "golden-mic", chatterbox: "chatterbox",
  "pen-pal": "pen-pal", globetrotter: "globetrotter", "spelling-wizard": "spelling-wizard", "elephant-memory": "memory-keeper" };
const badgeArt = (id, gold = false) => MOTION[id] ? `badges/${MOTION[id]}/${MOTION[id]}-badge.svg` : `${A}badges/${id}${gold ? ".gold" : ""}.svg`;
const badgeVideo = (id, kind) => MOTION[id] && `badges/${MOTION[id]}/${MOTION[id]}-badge-${kind}.mp4`;
function badgeTile(b) {
  const T = AT(), part = b.need ? Math.min(1, b.have / b.need) : 0;
  const line = b.earned ? (b.gold ? T.gold : b.level ? T.level(b.level) : b.kind === "strand" ? T.earnedIn(yearName(childYearFor(b.subj))) : T.earned)
    : b.need ? T.ofN(b.have, b.need) : T.how[b.id] ?? "";
  const src = badgeArt(b.id, b.gold);
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
// The child's own room, calm, one number to a card: who I am (picture, name, year and streak),
// this week, my next badge, my badges on a shelf, my stars. Records live with the sprints on
// Practice; settings behind the gear. Older bands get the same sections, denser and plainer.
const ME2 = {
  de: { week: "Diese Woche", next: "Dein nächstes Abzeichen", got: "Deine Abzeichen", all: "Alle", stars: "Deine Sterne", starsAll: "Sterne", still: (n) => `Noch ${n}`, streak: (n) => `${n} ${n === 1 ? "Tag" : "Tage"} in Folge`, none: "Noch keins. Das erste kommt mit deiner ersten Fähigkeit auf „Kann ich“.", change: "Bild ändern" },
  en: { week: "This week", next: "Your next badge", got: "Your badges", all: "All", stars: "Your stars", starsAll: "Stars", still: (n) => `${n} to go`, streak: (n) => `${n}-day streak`, none: "None yet. The first comes with your first skill at I can do it.", change: "Change picture" },
};
function renderMe() {
  const T = AT(), M = ME2[PL()], c = appChild(), scr = $("#screen"), lg = PL(), dense = bandUI().dense;
  const s = streak(c), all = myBadges(), seen = c.badgeSeen ?? {}, got = all.filter((b) => b.earned).sort((x, y) => (seen[y.id]?.n ?? 0) - (seen[x.id]?.n ?? 0));
  const nb = nextBadges(all, 1)[0], what = nb ? (BADGE_WHAT[nb.id]?.[lg === "de" ? 0 : 1] ?? T.how[nb.id] ?? "") : "";
  const subs = appSubjects(), starsOf = (x) => courseSets(x).reduce((n, st) => n + STARS[c.states[stateKey(st)]?.state ?? "not_started"], 0), stars = subs.reduce((n, x) => n + starsOf(x), 0);
  const nextStreak = s.next ? T.streakTo(s.next[0] - s.current, streakName(s.next[1])) : "";
  scr.style.setProperty("--subj", BRAND); scr.style.removeProperty("--top");
  scr.innerHTML = `<div class="status"></div><div class="pr-home app-page me${dense ? " me-dense" : ""}">
    <header class="me-hero fun-band" style="--room:${ROOM.me}"><button class="me-av" data-pic aria-label="${esc(M.change)}">${avatar(c, dense ? "" : "lg")}<i>${PENCIL}</i></button>
      <div><h2>${esc(c.name ?? T.meTitle)}</h2><small><span>${esc(yearName(c.year))}</span><span><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt="">${esc(M.streak(s.current))}</span></small></div>
      <button class="me-gear" data-settings aria-label="${esc(ST().title)}">${GEAR}</button></header>
    <h3 class="pr-h">${esc(M.week)}</h3>
    <section class="me-card me-streak" id="me-week">${weekStrip(c)}<small class="me-note">${nextStreak ? `${esc(nextStreak)}. ` : ""}${esc(T.streakNote)}</small></section>
    ${nb ? `<h3 class="pr-h">${esc(M.next)}</h3>
    <button class="me-next" data-bd="${nb.id}"><img src="${badgeArt(nb.id)}" alt=""><span><b>${esc(badgeName(nb.id))}</b><small>${esc(what)}</small>
      <i class="pr-bar" style="--c:#6849dd"><i style="width:${(100 * nb.have) / nb.need}%"></i></i><em>${esc(M.still(nb.need - nb.have))}</em></span></button>` : ""}
    <h3 class="pr-h pr-hrow">${esc(M.got)}${all.length ? `<button class="pr-link" id="meAll">${esc(M.all)} (${all.length}) ${CHEVRON}</button>` : ""}</h3>
    ${got.length ? `<div class="me-shelf scroll-fade">${got.map((b) => `<button class="me-bd" data-bd="${b.id}"><img src="${badgeArt(b.id, b.gold)}" alt=""><small>${esc(badgeName(b.id))}</small></button>`).join("")}</div>` : `<p class="pr-empty">${esc(M.none)}</p>`}
    <div id="meAllList" hidden><div class="bd-grid">${all.map(badgeTile).join("")}</div></div>
    <h3 class="pr-h">${esc(M.stars)}</h3>
    <section class="me-stars"><div class="me-total"><b>${stars}</b><span>★ ${esc(M.starsAll)}</span></div>
      <div class="me-chips">${subs.map((x) => `<button data-subj="${x}" style="--c:${colourOf(x)}"><b>★ ${starsOf(x)}</b><small>${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</small></button>`).join("")}</div></section>
  </div>`;
  scr.appendChild(appTabs("me"));
  wireHeader(scr); scrollFades(scr);
  $("[data-pic]", scr).onclick = () => { appTab("settings"); APP.editPic = true; renderSettings(); };
  $("#meAll", scr)?.addEventListener("click", (e) => { const l = $("#meAllList", scr); l.hidden = !l.hidden; e.currentTarget.classList.toggle("open", !l.hidden); });
  scr.querySelectorAll("[data-subj]").forEach((b) => b.onclick = () => { APP.subj = b.dataset.subj; APP.year = null; APP.topic = null; APP.q = ""; appTab("study"); });
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
  PR.on = false; PR.session = null; PR.index = indexFor(PR.child);
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
    <h3 class="pr-h set-h">${esc(S.learn)}</h3><section class="set-card">
      <div class="set-row"><b>${esc(S.curriculum)}</b></div>
      <div class="set-seg" role="radiogroup" aria-label="${esc(S.curriculum)}">${["de-DE", "en-GB"].map((k) => `<button role="radio" data-cur="${k}" aria-checked="${k === c.curriculum}">${esc(S.cur[k])}</button>`).join("")}</div>
      <small class="set-note">${esc(S.curNote)}</small>
      <label class="set-row"><b>${esc(S.year)}</b><select id="setYear">${YEAR_OF(c.curriculum).map((y) => `<option value="${esc(y)}"${y === c.year ? " selected" : ""}>${esc(yearName(y))}</option>`).join("")}</select></label></section>
    <h3 class="pr-h set-h">${esc(S.look)}</h3><section class="set-card">
      <div class="set-looks" role="radiogroup" aria-label="${esc(S.look)}">${LOOKS.map((l) => `<button role="radio" data-look="${l}" aria-checked="${l === look}"><i class="set-mini ${l}"><i></i><i></i><i></i></i><b>${esc(S.looks[l])}</b></button>`).join("")}</div>
      <small class="set-note">${esc(S.lookNote[look])}</small></section>
    <h3 class="pr-h set-h">${esc(S2.feel)}</h3><section class="set-card">
      ${sw("setAuto", $("#auto")?.checked ?? true, S2.narration, S2.narrationSub)}
      ${sw("setSfx", pref("twist-sfx", true), S2.sfx, S2.sfxSub)}
      ${sw("setBuzz", pref("twist-vibrate", true), S2.vibrate, S2.vibrateSub)}
      ${sw("setNext", $("#autonext")?.checked ?? true, S.autoNext, S.autoNextSub)}
      ${sw("setRemind", pref("twist-reminders", false), S2.remind, S2.remindSub)}</section>
    <h3 class="pr-h set-h">${esc(S2.account)}</h3><section class="set-card">
      ${link("setClear", S2.clear, S2.clearSub)}
      ${link("setLogout", S2.logout, S2.logoutSub, "bad")}</section>
    ${c.curriculum === "de-DE" ? `<h3 class="pr-h set-h">${esc(S.script)}</h3><section class="set-card"><small class="set-note">${esc(S.scriptSub)}</small>
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
  const was = PR.child, c = (PR.child = { ...newChild({ curriculum: was.curriculum, year: was.year, band: was.band }), name: was.name, avatar: was.avatar, stash: was.stash, tracks: was.tracks });
  c.today = 32;
  for (let d = 1; d < c.today; d++) if (d % 7 < 5 && d !== 15) markActive(c, d);
  const STATE = ["remembered", "can_do", "can_do", "practised"];
  let last = null;
  for (const x of appSubjects()) {
    const sets = courseSets(x), n = Math.max(3, Math.round(sets.length / 3));
    sets.slice(0, n).forEach((st, i) => { c.lessons[st.id] = st.lessons.length; setState(c, stateKey(st), STATE[i % STATE.length]); logEvent(c, `lesson ${st.lessons.length} of ${st.id} finished`);
      // A skill left at one star: its skill check had misses on the first parts.
      if (STATE[i % STATE.length] === "practised") ((c.scores ??= {})[st.id] = {})[st.lessons.length] = { right: 3, total: 5, missed: (st.parts ?? []).slice(0, 2).map((p) => p.id), day: c.today - 1 }; });
    const nx = sets[n];
    if (nx) { c.lessons[nx.id] = 1; setState(c, stateKey(nx), "learning"); logEvent(c, `lesson 1 of ${nx.id} finished`); last ??= { setId: nx.id, n: 1, day: c.today - 1 }; }
  }
  // The lessons were played over the past weeks, the newest on the last day played.
  const days = c.active; c.log.forEach((e, i) => e.day = days[Math.min(days.length - 1, Math.floor((i * days.length) / c.log.length))]);
  // A few practice sessions this week, as the app logs them.
  [["mixed session: 9 of 10 right", 1], ["drill session: 18 a minute", 2], ["catch-up session: 8 of 10 right", 3]].forEach(([text, back]) => c.log.push({ day: days.at(-back), text }));
  c.last = last;
  c.sessions = 47;
  drillsForYear().slice(0, 2).forEach((k, i) => c.drills[k] = { best: [18, 24][i], weak: {} });
  PR.index = indexFor(c);
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
  PR.child = { ...newChild({ curriculum: was.curriculum, year: was.year, band: was.band }), name: was.name, avatar: was.avatar, stash: was.stash, tracks: was.tracks };
}

/* ---------- Drills: every bank of the child's curriculum, by subject ---------- */
function drillCard(k) {
  const lg = PL(), d = PR.child.drills[k], m = drillMap(PR.index.drills[k], d), n = m.items.length;
  const bar = ["known", "slow", "miss"].map((st) => `<i class="${st}" style="width:${(100 * m.counts[st]) / Math.max(1, n)}%"></i>`).join("");
  return `<button class="dr-card" data-drill="${esc(k)}" style="--c:${colourOf(subjOfSkill(k))}"><b>${esc(setOfSkill(k)?.title[lg] ?? k)}</b>
    <small>${esc(d?.best ? AT().perMin(d.best) : PT().notTried)}</small><span class="dr-bar">${bar}</span></button>`;
}
// The banks of the child's year (a foreign language by its learning year); if none, every bank
// of the subjects the child has.
function drillsForYear() {
  const ks = Object.keys(PR.index.drills).filter((k) => offered(subjOfSkill(k))), y = (k) => setOfSkill(k)?.year;
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
