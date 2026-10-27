/* ---------- The app's animations and sounds (ist-schoolido, develop) ----------
   The Rive and Lottie files and the sound effects are the app's own, in
   player/anim/; they play where the app plays them: the splash at start, the
   books while a lesson loads, the skate on the Study track, and after a
   lesson the points, the streak, the badge and the confetti. The runtimes
   (@rive-app/canvas, lottie-web) load in template.html. Inlined after
   parents-ui.js. */
const ANIM = "anim/";
const SFX_ON = () => { try { return localStorage.getItem("twist-sfx") !== "0"; } catch { return true; } };
const sfxPlayer = new Audio();
// The app's volumes (lib/feedback/sounds.ts): a tap is quiet, the rest full.
const SFX_VOL = { "option-picked": 0.35, "card-lands": 0.6, "piece-locked": 0.8, "try-again": 0.8 };
const sfxPlayers = {};
// A sound effect, when Sound effects is on (Settings); each has its own player, so a tap never cuts off a cheer.
function sfx(name) {
  if (!SFX_ON() || appOffScreen()) return;
  const a = (sfxPlayers[name] ??= Object.assign(new Audio(`${ANIM}sfx/${name}.mp3`), { volume: SFX_VOL[name] ?? 1 }));
  a.currentTime = 0; a.play().catch(() => {});
}
// Every sound effect and a badge's sound, stopped (stopAudio): a badge's video goes on, silent.
function stopSfx() { Object.values(sfxPlayers).forEach((a) => a.pause()); sfxPlayer.pause(); badgeSound.pause(); }
// The app's cues while a task is open (lib/feedback/cues.ts): a tap on a choice,
// a tile or a point is option-picked; a card dropped into a slot or a bin lands.
document.getElementById("screen")?.addEventListener("click", (e) => {
  const t = e.target.closest?.(".opt, .tf button, .card.tap, .chips button, .pad button, .cards > *, .pairs > * > *, rect[data-v], circle[data-x], .gap, .slot, .bin");
  if (!t || t.disabled || !document.querySelector("#screen .hdr") || e.target.closest(".foot, .hdr, .sheet, .lm-sheet, .lv-sheet, .bubbleq")) return;
  if (t.matches(".gap, .slot, .bin") || t.closest(".bin")) { sfx("card-lands"); buzz(15); } else { sfx("option-picked"); buzz(8); }
}, true);
const VIBRATE_ON = () => { try { return localStorage.getItem("twist-vibrate") !== "0"; } catch { return true; } };
const buzz = (ms = 12) => { if (VIBRATE_ON()) navigator.vibrate?.(ms); };

// A Rive file on a canvas, sized for the screen's pixels; set(vm) fills its view model.
function riveOn(canvas, file, { stateMachine, artboard, set, onEvent, onLoad } = {}) {
  if (!window.rive) return null;
  const dpr = devicePixelRatio || 1, w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const r = new rive.Rive({ src: ANIM + file, canvas, artboard, stateMachines: stateMachine, autoplay: true, autoBind: true,
    layout: new rive.Layout({ fit: rive.Fit.Contain, alignment: rive.Alignment.Center }),
    onLoad: () => { r.resizeDrawingSurfaceToCanvas(); if (set && r.viewModelInstance) set(r.viewModelInstance, r); onLoad?.(r); } });
  if (onEvent) r.on(rive.EventType.RiveEvent, (e) => onEvent(e.data?.name, r));
  return r;
}
// A Lottie animation in a box (svg), the app's way: autoplay, loop or once.
function lottieIn(box, file, loop) {
  if (!window.lottie) return null;
  return lottie.loadAnimation({ container: box, renderer: "svg", loop, autoplay: true, path: ANIM + file });
}
// An overlay over the phone's screen; gone with the next screen or when closed.
function overlay(cls) {
  const o = document.createElement("div"); o.className = "an-over " + cls;
  $("#screen").appendChild(o);
  return o;
}

/* ---------- Splash: the mascot waving, "Twist", as the app opens ---------- */
// The preview's Settings menu can show it again.
document.getElementById("replaySplash")?.addEventListener("click", () => { appTab(APP.tab && APP.tab !== "settings" ? APP.tab : "start"); splash(); });
function splash(then) {
  const o = overlay("an-splash");
  o.innerHTML = `<canvas aria-hidden="true"></canvas><div><b>Twist</b><small>Powered by IST</small></div>`;
  const r = riveOn($("canvas", o), "splash_screen_animation.riv", { stateMachine: "Splash_screen_animation" });
  let done = false;
  const close = () => { if (done) return; done = true; o.classList.add("out"); setTimeout(() => { r?.cleanup(); o.remove(); then?.(); }, 380); };
  o.onclick = close; setTimeout(close, 3000);
}

/* ---------- Loading: the books, while a lesson opens ---------- */
function loadingBooks(ms, then) {
  const o = overlay("an-loading");
  o.innerHTML = `<canvas aria-hidden="true"></canvas>`;
  const r = riveOn($("canvas", o), "loading_books.riv", { stateMachine: "State Machine 1" });
  setTimeout(() => { r?.cleanup(); o.remove(); then(); }, ms);
}

/* ---------- After a lesson: points, streak, badge, then the end screen's confetti ---------- */
const CTXT = {
  de: { checkPass: "Prüfung geschafft!", checkPassSub: "Dein zweiter Stern: Das kannst du jetzt.", checkNo: "Noch nicht geschafft, probier es bald wieder", checkNoSub: "Du übst die Fähigkeit weiter. Die Prüfung kommt bald wieder, dann holst du dir den zweiten Stern.", finished: "Lektion geschafft!", points: "Punkte verdient!", streak: (n) => `${n} ${n === 1 ? "Tag" : "Tage"} in Folge!`, streakSub: "Komm morgen wieder, dann wächst die Flamme.", badge: "Neues Abzeichen!", go: "Weiter" },
  en: { checkPass: "Check passed!", checkPassSub: "Your second star: you can do it now.", checkNo: "Not yet, try again soon", checkNoSub: "You keep practising this skill. The check comes back soon, and then you can win the second star.", finished: "Lesson finished!", points: "Points earned!", streak: (n) => `${n}-day streak!`, streakSub: "Come back tomorrow and the flame grows.", badge: "New badge!", go: "Continue" },
};
// The skill check's result as the skill's three stars: the ones it had, the ones it
// just won filling in (the second star is the check's), and on a not yet the second
// star waiting. Used by the celebration and by the lesson's end screen.
function checkStars(pass, from, to) {
  return `<span class="ck-stars${pass ? " pass" : ""}" aria-label="${to} / 3">${[1, 2, 3].map((i) => `<i class="${i <= to ? "on" : ""}${i > from && i <= to ? " new" : ""}${!pass && i === 2 && to < 2 ? " want" : ""}">★</i>`).join("")}</span>`;
}
const starsOfSkill = () => STARS[PR.child?.states?.[stateKey(set)]?.state ?? "not_started"];
// The screens one after another; each moves on by itself after a while, or with Continue.
function celebrate(screens, then) {
  const C = CTXT[PL()];
  const next = () => {
    const s = screens.shift(); if (!s) return then?.();
    const o = overlay("an-cele " + s.kind);
    o.innerHTML = `<div class="an-stage"></div><h2></h2><p></p><button class="btn go">${esc(C.go)}</button>`;
    const stage = $(".an-stage", o), clean = [];
    if (s.kind === "points") {
      stage.innerHTML = `<canvas aria-hidden="true"></canvas>`;
      clean.push(riveOn($("canvas", stage), "confetti.riv", { stateMachine: "State Machine 1", set: (vm) => { const p = vm.number("points"); if (p) p.value = s.points; } }));
      $("h2", o).textContent = C.points; sfx("xp-earned");
    } else if (s.kind === "streak") {
      stage.innerHTML = `<canvas aria-hidden="true"></canvas>`;
      clean.push(riveOn($("canvas", stage), "streak.riv", { stateMachine: "State Machine 1", set: (vm) => { const p = vm.number("streak"); if (p) p.value = s.streak; } }));
      $("h2", o).textContent = C.streak(s.streak); $("p", o).textContent = C.streakSub; sfx("streak-earned");
    } else if (s.kind === "check") {
      stage.innerHTML = `<div class="an-glow"></div>${checkStars(s.pass, s.from, s.to)}`;
      if (s.pass) clean.push(lottieIn($(".an-glow", stage), "Reward-light-bg.json", true));
      $("h2", o).textContent = s.pass ? C.checkPass : C.checkNo; $("p", o).textContent = s.pass ? C.checkPassSub : C.checkNoSub;
      sfx(s.pass ? "module-complete" : "xp-earned");
    } else if (s.kind === "finished") {
      // The app's Lesson finished: the glow turning behind the mascot, confetti falling once.
      stage.innerHTML = `<div class="an-glow"></div><img src="${A}mascot/end-2.png" alt="">`;
      clean.push(lottieIn($(".an-glow", stage), "Reward-light-bg.json", true));
      const c = document.createElement("div"); c.className = "an-fall"; o.appendChild(c); clean.push(lottieIn(c, "Confetti.json", false));
      $("h2", o).textContent = C.finished; $("p", o).textContent = s.phrase ?? ""; if (s.src) play(s.src); else sfx("module-complete");
    } else if (s.kind === "badge") {
      // An animated badge (its folder) plays with its sound; a drawn one pops in to the app's badge sound.
      const anim = BADGE_ANIM[s.id];
      stage.innerHTML = anim ? badgeAnimImg(s.id) : `<div class="an-glow"></div><div class="an-badge"></div><img src="${badgeArt(s.id)}" alt="">`;
      if (!anim) clean.push(lottieIn($(".an-glow", stage), "Reward-light-bg.json", true), lottieIn($(".an-badge", stage), "badge.json", false));
      if (anim) wireAnim(stage, s.id); else sfx("module-complete");
      $("h2", o).textContent = C.badge; $("p", o).textContent = badgeName(s.id);
    }
    buzz(20);
    let gone = false;
    const leave = () => { if (gone) return; gone = true; clearTimeout(t); clean.forEach((x) => x?.destroy?.() ?? x?.cleanup?.()); o.classList.add("out"); setTimeout(() => { o.remove(); next(); }, 260); };
    const t = setTimeout(leave, 5000);
    $("button", o).onclick = leave;
  };
  next();
}
// Called by the end screen: what the lesson earned, before and after it counted. The
// screens play in the app's order (points, streak, badges, lesson finished) and then
// Study opens by itself, where the track skates on when a skill was finished.
function afterLesson(before, checkSteps, pass = null, from = 0, to = 0) {
  const c = PR.child, after = streak(c), got = myBadges().filter((b) => b.earned).map((b) => b.id);
  const tasks = steps.map((s, i) => [s, results[i]]).filter(([s]) => s.kind === "task");
  const points = tasks.reduce((n, [, r]) => n + (r === "first" ? 10 : r === "second" || r === "helped" ? 5 : 0), 0);
  const screens = [];
  if (points) screens.push({ kind: "points", points });
  // The skill check (the step that gives the second star): passed or not yet, right after the points.
  if (pass !== null) screens.push({ kind: "check", pass, from, to });
  if (after.current > before.streak) screens.push({ kind: "streak", streak: after.current });
  got.filter((id) => !before.badges.includes(id)).slice(0, 2).forEach((id) => screens.push({ kind: "badge", id }));
  const p = phrase("lesson_done");
  screens.push({ kind: "finished", phrase: p?.text, src: p?.src });
  stopAudio();
  celebrate(screens, () => openStudy());
}
const beforeLesson = () => ({ streak: streak(PR.child).current, badges: myBadges().filter((b) => b.earned).map((b) => b.id) });

/* ---------- The skate on the Study track ---------- */
// The app's study card (study_screen_animation.riv) on the current skill. It
// skates there from the skill before when the child has moved on since the
// track was last open; else it waits there (idle), or on the last (final).
// It stands in for the stones and route it draws itself, and the mascot.
const RIVE_THEME = { math: 2, english: 3, german: 4, french: 3, world: 2 };
function trackSkate({ path, rows, cur, top, art, onStart, onNext }) {
  if (!window.rive || !rows[cur] || rows[cur].state === "locked") return null;
  const key = `twist-track-${PR.child.curriculum}-${APP.subj}`;
  let last = null; try { last = JSON.parse(localStorage.getItem(key)); } catch {}
  try { localStorage.setItem(key, JSON.stringify(cur)); } catch {}
  // It skates when the child has moved on since the track was last open, or has just finished a skill.
  const final = cur === rows.length - 1, skating = cur >= 1 && ((last != null && last < cur) || APP.skillDone), anchor = skating ? cur - 1 : cur;
  APP.skillDone = false;
  const inverted = anchor % 2 === 1, mode = skating ? "State Machine 1" : final ? "State Machine 3" : "State Machine 2";
  // Where the card draws its stone in its 393 × 592 frame, measured: idle stands on a stone at
  // (187, 312) with its route curving down; the skate starts on one at (187, 222) and lands on
  // the next at (184, 477); final stands on (184, 477). Its stones are 255 px apart; the
  // track's are 266, so it is drawn 266/255 the size and pinned on the track's stone.
  const S = TR.step / 255, [px, py] = skating ? [187, 222] : final ? [184, 477] : [187, 312], on = skating ? anchor : cur;
  const x = (inverted ? 393 - px : px) * S, cy = top(on) + TR.decor / 2;
  const f = document.createElement("div"); f.className = "tr-skate" + (inverted ? " inverted" : "");
  f.style.cssText = `top:${cy - py * S}px;left:calc(50% - ${x}px);transform:scale(${S})`;
  f.innerHTML = `<canvas></canvas>`;
  path.appendChild(f);
  // Hidden under it: the stones it draws, the route it draws, and the static mascot.
  const stones = skating ? [anchor, anchor + 1] : [cur], arcs = skating ? [anchor + 1] : final ? [] : [cur + 1];
  stones.forEach((i) => path.querySelector(`.tr-stone[data-i="${i}"]`)?.classList.add("under-skate"));
  arcs.forEach((i) => path.querySelectorAll(".tr-arc")[i - 1]?.classList.add("under-skate"));
  path.querySelector(".tr-mascot")?.classList.add("under-skate");
  const r = rows[cur], lg = PL(), done = lessonsDone(r.s), title = r.s.title[lg] ?? r.s.title.de;
  const label = lg === "de" ? (done ? "WEITERLERNEN" : "LEKTION STARTEN") : done ? "CONTINUE LESSON" : "START LESSON";
  let vmi = null;
  const rv = riveOn($("canvas", f), "study_screen_animation.riv", { stateMachine: mode, artboard: "Study screen animation",
    set: (vm) => {
      vmi = vm;
      vm.string("title").value = title.length > 23 ? title.slice(0, 23).trim() + "..." : title;
      vm.string("durationLabel").value = `${r.s.minutes ?? 10} MIN`;
      vm.string("buttonLabel").value = label;
      vm.boolean("longButtonLabel").value = label.length > 12;
      vm.number("theme").value = RIVE_THEME[art] ?? 2;
      vm.boolean("inverted").value = inverted;
      vm.boolean("cardHidden").value = false;
      vm.trigger("nextStoneClick")?.on(() => onNext(anchor + 1));
      if (skating) sfx("skate-roll");
    },
    onEvent: (name) => { if (name === "start_lesson_clicked" && vmi && !vmi.boolean("cardHidden").value) onStart(); },
    onLoad: () => f.classList.add("ready") });
  return { anchor, hide: (h) => { if (vmi) vmi.boolean("cardHidden").value = h; }, el: f, rive: rv };
}

/* ---------- A badge, tapped: the app's achievement sheet ---------- */
// The app's AchievementBottomSheet: the glow turning, the badge bursting in,
// the day it was earned in gold, its name. Here it also says what the badge is
// for and how far the child is, and a badge not earned yet shows grey with its
// progress. Tapping the badge spins it.
const BADGE_WHAT = {
  "number-navigator": ["Jede Zahlen-Fähigkeit deiner Klasse können", "Every number skill of your year"],
  "calculation-ace": ["Jede Rechen-Fähigkeit deiner Klasse können", "Every calculating skill of your year"],
  "shape-shifter": ["Alles zu Formen und Raum deiner Klasse können", "Every shape and space skill of your year"],
  "measure-master": ["Alles zum Messen deiner Klasse können", "Every measuring skill of your year"],
  "data-detective": ["Alles zu Daten und Zufall deiner Klasse können", "Every data and chance skill of your year"],
  "code-cracker": ["Alles zu Mustern deiner Klasse können", "Every pattern skill of your year"],
  bookworm: ["Jede Lese-Fähigkeit deiner Klasse können", "Every reading skill of your year"],
  wordsmith: ["Jede Schreib-Fähigkeit deiner Klasse können", "Every writing skill of your year"],
  "spelling-wizard": ["Jede Rechtschreib-Fähigkeit deiner Klasse können", "Every spelling skill of your year"],
  "grammar-guardian": ["Jede Grammatik-Fähigkeit deiner Klasse können", "Every grammar skill of your year"],
  "golden-mic": ["Jede Sprech-Fähigkeit deiner Klasse können", "Every speaking skill of your year"],
  chatterbox: ["Alles zum Hören und Sprechen deines Lernjahrs können", "Every listening and speaking skill of your year"],
  "pen-pal": ["Alles zum Lesen und Schreiben deines Lernjahrs können", "Every reading and writing skill of your year"],
  globetrotter: ["Alles zu Land und Leuten deines Lernjahrs können", "Every culture skill of your year"],
  "lift-off": ["Deine erste Fähigkeit können", "Your first skill at Can do it"],
  pathfinder: ["Deinen ersten Einstufungstest machen", "Finish your first placement check"],
  summit: ["Den Test am Schuljahresende bestehen", "Pass the end-of-year check"],
  "hat-trick": ["Ein Abzeichen in jedem Fach im selben Jahr", "A badge in every subject in the same year"],
  legend: ["Jede Fähigkeit eines Fachs bis zum Ende können", "Every skill of a subject, all the way to the end"],
  "elephant-memory": ["Fähigkeiten, die du dir gemerkt hast", "Skills you remember"],
  "comeback-kid": ["Eine Fähigkeit zurückholen, die du fast vergessen hattest", "Bring back a skill you had nearly forgotten"],
  "like-clockwork": ["4 Wochen lang jede Wiederholung pünktlich", "Every recap on time for 4 weeks"],
  "busy-bee": ["Übungsrunden, die du geschafft hast", "Practice sessions you finished"],
  "time-traveller": ["Etwas aus einer späteren Klasse lernen", "Learn something from a later year"],
};
const BTXT = {
  de: { earned: (d) => `VERDIENT AM ${d}`, notYet: "NOCH NICHT VERDIENT", got: "Abzeichen verdient!", locked: "Noch zu holen", ok: "Super!", close: "Schließen",
    kind: { strand: "Fach-Abzeichen", milestone: "Meilenstein", memory: "Merken", streak: "Serie", effort: "Fleiß" },
    days: (n) => `${n} Schultage in Folge`, gold: "Gold! Du hast dir alles gemerkt.", toGold: "Wird golden, wenn du dir jede Fähigkeit merkst.",
    level: (n) => `Stufe ${n}`, next: (a, b) => `${a} von ${b} bis zur nächsten Stufe`, of: (a, b) => `${a} von ${b}`, ago: (n) => n === 0 ? "heute" : n === 1 ? "gestern" : `vor ${n} Tagen` },
  en: { earned: (d) => `EARNED ${d}`, notYet: "NOT EARNED YET", got: "Badge earned!", locked: "Still to get", ok: "Great!", close: "Close",
    kind: { strand: "Subject badge", milestone: "Milestone", memory: "Remembering", streak: "Streak", effort: "Effort" },
    days: (n) => `${n} school days in a row`, gold: "Gold! You remember all of it.", toGold: "Turns gold when you remember every skill.",
    level: (n) => `Level ${n}`, next: (a, b) => `${a} of ${b} to the next level`, of: (a, b) => `${a} of ${b}`, ago: (n) => n === 0 ? "today" : n === 1 ? "yesterday" : `${n} days ago` },
};
// The pretend day as a date: today is today, each day before it one day back.
function badgeDate(day) {
  const d = new Date(Date.now() - (PR.child.today - day) * 864e5);
  return d.toLocaleDateString(PL() === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
}
// A badge from assets/badges/<Name>/: its SVG plays the intro and then loops by itself; its
// sound starts with the SVG (when sound effects are on). Played again, the SVG loads anew so
// it starts from the beginning.
const badgeSound = new Audio(); badgeSound.preload = "auto";
let badgePlays = 0;
const badgeAnimImg = (id) => `<img class="bm-svg" src="${A}${BADGE_ANIM[id].svg}" alt="">`;
function wireAnim(stage, id) {
  const img = $(".bm-svg", stage), a = BADGE_ANIM[id]; if (!img) return;
  badgeSound.pause();
  img.onload = () => { if (!a.wav || !SFX_ON() || appOffScreen()) return; badgeSound.src = A + a.wav; badgeSound.currentTime = 0; badgeSound.play().catch(() => {}); };
  img.src = `${A}${a.svg}?play=${++badgePlays}`;
}
function badgeSheet(b) {
  const B = BTXT[PL()], lg = PL() === "de" ? 0 : 1, seen = PR.child.badgeSeen?.[b.id];
  const what = b.kind === "streak" ? B.days(b.need) : BADGE_WHAT[b.id]?.[lg] ?? "";
  const kind = b.kind === "strand" ? `${SUBJ_NAME[PR.child.curriculum][b.subj] ?? ""}, ${yearName(childYearFor(b.subj))}` : B.kind[b.kind] ?? "";
  const part = b.need ? Math.min(1, (b.have ?? 0) / b.need) : 0;
  const progress = b.earned ? (b.level && b.need ? B.next(b.have, b.need) : "") : b.need ? B.of(b.have ?? 0, b.need) : "";
  const extra = b.earned && b.kind === "strand" ? (b.gold ? B.gold : B.toGold) : "";
  const date = b.earned ? B.earned(badgeDate(seen?.day ?? PR.child.today)) : B.notYet;
  const ago = b.earned && seen ? ` (${B.ago(PR.child.today - seen.day)})` : "";
  const scrim = overlay("bs-scrim"), o = document.createElement("div");
  o.className = "bs-sheet" + (b.earned ? "" : " locked") + (b.gold ? " gold" : "");
  o.setAttribute("role", "dialog"); o.setAttribute("aria-label", badgeName(b.id));
  o.innerHTML = `<i class="bs-grip"></i>
    <button class="bs-stage${b.earned && BADGE_ANIM[b.id] ? " anim" : ""}" aria-label="${esc(badgeName(b.id))}">${b.earned && BADGE_ANIM[b.id] ? badgeAnimImg(b.id) : `<div class="an-glow"></div><div class="an-badge"></div><img src="${badgeArt(b.id, b.gold)}" alt="">`}</button>
    <span class="bs-date">${esc(date)}<small>${esc(ago)}</small></span>
    <small class="bs-kind">${esc(kind)}${b.level ? ` · ${esc(B.level(b.level))}` : ""}</small>
    <h2>${esc(badgeName(b.id))}</h2>
    <p class="bs-what">${esc(what)}</p>
    ${progress ? `<div class="bs-prog"><i class="pr-bar"><i style="width:${100 * (b.earned ? Math.min(1, b.have / b.need) : part)}%"></i></i><small>${esc(progress)}</small></div>` : ""}
    ${extra ? `<p class="bs-extra">${esc(extra)}</p>` : ""}
    <button class="btn go">${esc(b.earned ? B.ok : B.close)}</button>`;
  $("#screen").appendChild(o);
  const anim = b.earned && BADGE_ANIM[b.id], stage = $(".bs-stage", o), img = $("img", stage);
  const clean = b.earned && !anim ? [lottieIn($(".an-glow", o), "Reward-light-bg.json", true), lottieIn($(".an-badge", o), "badge.json", false)] : [];
  if (b.earned) { if (anim) wireAnim(stage, b.id); else sfx("xp-earned"); buzz(15); }
  // A tap: an animated badge plays its intro again; a drawn one spins.
  stage.onclick = () => { buzz(10); if (anim) return wireAnim(stage, b.id); img.classList.remove("spin"); void img.offsetWidth; img.classList.add("spin"); sfx(b.earned ? "option-picked" : "piece-locked"); };
  let gone = false;
  const close = () => { if (gone) return; gone = true; if (anim) badgeSound.pause(); document.removeEventListener("keydown", key); o.classList.add("out"); scrim.classList.add("out"); setTimeout(() => { clean.forEach((x) => x?.destroy?.()); o.remove(); scrim.remove(); }, 260); };
  const key = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", key);
  scrim.onclick = close; $(".go", o).onclick = close; $(".go", o).focus({ preventScroll: true });
}
// Any badge tile in the app opens its sheet.
document.getElementById("screen")?.addEventListener("click", (e) => {
  const t = e.target.closest?.("[data-bd]"); if (!t) return;
  const b = myBadges().find((x) => x.id === t.dataset.bd); if (b) badgeSheet(b);
});
