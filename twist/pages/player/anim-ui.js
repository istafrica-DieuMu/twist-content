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
  if (!SFX_ON()) return;
  const a = (sfxPlayers[name] ??= Object.assign(new Audio(`${ANIM}sfx/${name}.mp3`), { volume: SFX_VOL[name] ?? 1 }));
  a.currentTime = 0; a.play().catch(() => {});
}
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
  de: { finished: "Lektion geschafft!", points: "Punkte verdient!", streak: (n) => `${n} ${n === 1 ? "Tag" : "Tage"} in Folge!`, streakSub: "Komm morgen wieder, dann wächst die Flamme.", badge: "Neues Abzeichen!", go: "Weiter" },
  en: { finished: "Lesson finished!", points: "Points earned!", streak: (n) => `${n}-day streak!`, streakSub: "Come back tomorrow and the flame grows.", badge: "New badge!", go: "Continue" },
};
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
    } else if (s.kind === "finished") {
      // The app's Lesson finished: the glow turning behind the mascot, confetti falling once.
      stage.innerHTML = `<div class="an-glow"></div><img src="${A}mascot/end-2.png" alt="">`;
      clean.push(lottieIn($(".an-glow", stage), "Reward-light-bg.json", true));
      const c = document.createElement("div"); c.className = "an-fall"; o.appendChild(c); clean.push(lottieIn(c, "Confetti.json", false));
      $("h2", o).textContent = C.finished; $("p", o).textContent = s.phrase ?? ""; if (s.src) play(s.src); else sfx("module-complete");
    } else if (s.kind === "badge") {
      stage.innerHTML = `<div class="an-glow"></div><div class="an-badge"></div><img src="${A}badges/${s.id}.svg" alt="">`;
      clean.push(lottieIn($(".an-glow", stage), "Reward-light-bg.json", true), lottieIn($(".an-badge", stage), "badge.json", false));
      $("h2", o).textContent = C.badge; $("p", o).textContent = badgeName(s.id); sfx("module-complete");
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
function afterLesson(before, checkSteps) {
  const c = PR.child, after = streak(c), got = myBadges().filter((b) => b.earned).map((b) => b.id);
  const tasks = steps.map((s, i) => [s, results[i]]).filter(([s]) => s.kind === "task");
  const points = tasks.reduce((n, [, r]) => n + (r === "first" ? 10 : r === "second" || r === "helped" ? 5 : 0), 0);
  const screens = [];
  if (points) screens.push({ kind: "points", points });
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
const RIVE_THEME = { math: 2, english: 3, german: 4, french: 3 };
function trackSkate({ path, rows, cur, top, art, onStart, onNext }) {
  if (!window.rive || !rows[cur] || rows[cur].state === "locked") return null;
  // Where it last stood, per subject; a stone per lesson keeps its own place (the rows differ).
  const key = `twist-track-${PR.child.curriculum}-${APP.subj}${rows[0]?.l ? "-lessons" : ""}`;
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
  // Only once the file has loaded: if it never does, the track keeps its own stone and mascot.
  const cover = () => {
    stones.forEach((i) => path.querySelector(`.tr-stone[data-i="${i}"]`)?.classList.add("under-skate"));
    arcs.forEach((i) => path.querySelectorAll(".tr-arc")[i - 1]?.classList.add("under-skate"));
    path.querySelector(".tr-mascot")?.classList.add("under-skate");
  };
  // A lesson stone names its lesson and starts it; a skill stone names the skill and goes on where it stopped.
  const r = rows[cur], lg = PL(), done = !r.l && lessonsDone(r.s), title = r.l ? r.l.title[lg] ?? r.l.title.de : r.s.title[lg] ?? r.s.title.de;
  const label = lg === "de" ? (done ? "WEITERLERNEN" : "LEKTION STARTEN") : done ? "CONTINUE LESSON" : "START LESSON";
  let vmi = null, skate = null;
  const rv = riveOn($("canvas", f), "study_screen_animation.riv", { stateMachine: mode, artboard: "Study screen animation",
    set: (vm) => {
      vmi = vm;
      vm.string("title").value = title.length > 23 ? title.slice(0, 23).trim() + "..." : title;
      vm.string("durationLabel").value = `${r.s.minutes ?? 10} MIN`;
      vm.string("buttonLabel").value = label;
      vm.boolean("longButtonLabel").value = label.length > 12;
      vm.number("theme").value = RIVE_THEME[art] ?? 2;
      vm.boolean("inverted").value = inverted;
      vm.boolean("cardHidden").value = !!skate?.hidden;
      vm.trigger("nextStoneClick")?.on(() => onNext(anchor + 1));
      if (skating) sfx("skate-roll");
    },
    onEvent: (name) => { if (name === "start_lesson_clicked" && vmi && !vmi.boolean("cardHidden").value) onStart(); },
    onLoad: () => { cover(); f.classList.add("ready"); } });
  // hide() before the file has loaded applies once it has.
  let hidden = false;
  return skate = { anchor, hide: (h) => { hidden = h; if (vmi) vmi.boolean("cardHidden").value = h; }, get hidden() { return hidden; }, el: f, rive: rv };
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
    <button class="bs-stage" aria-label="${esc(badgeName(b.id))}"><div class="an-glow"></div><div class="an-badge"></div><img src="${A}badges/${b.id}${b.gold ? ".gold" : ""}.svg" alt=""></button>
    <span class="bs-date">${esc(date)}<small>${esc(ago)}</small></span>
    <small class="bs-kind">${esc(kind)}${b.level ? ` · ${esc(B.level(b.level))}` : ""}</small>
    <h2>${esc(badgeName(b.id))}</h2>
    <p class="bs-what">${esc(what)}</p>
    ${progress ? `<div class="bs-prog"><i class="pr-bar"><i style="width:${100 * (b.earned ? Math.min(1, b.have / b.need) : part)}%"></i></i><small>${esc(progress)}</small></div>` : ""}
    ${extra ? `<p class="bs-extra">${esc(extra)}</p>` : ""}
    <button class="btn go">${esc(b.earned ? B.ok : B.close)}</button>`;
  $("#screen").appendChild(o);
  const clean = b.earned ? [lottieIn($(".an-glow", o), "Reward-light-bg.json", true), lottieIn($(".an-badge", o), "badge.json", false)] : [];
  if (b.earned) { sfx("xp-earned"); buzz(15); }
  const stage = $(".bs-stage", o), img = $("img", stage);
  stage.onclick = () => { img.classList.remove("spin"); void img.offsetWidth; img.classList.add("spin"); buzz(10); sfx(b.earned ? "option-picked" : "piece-locked"); };
  let gone = false;
  const close = () => { if (gone) return; gone = true; document.removeEventListener("keydown", key); o.classList.add("out"); scrim.classList.add("out"); setTimeout(() => { clean.forEach((x) => x?.destroy?.()); o.remove(); scrim.remove(); }, 260); };
  const key = (e) => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", key);
  scrim.onclick = close; $(".go", o).onclick = close; $(".go", o).focus({ preventScroll: true });
}
// Any badge tile in the app opens its sheet.
document.getElementById("screen")?.addEventListener("click", (e) => {
  const t = e.target.closest?.("[data-bd]"); if (!t) return;
  const b = myBadges().find((x) => x.id === t.dataset.bd); if (b) badgeSheet(b);
});

/* ---------- The verdict: right or wrong, on the answer button ---------- */
// The design's micro-interactions (timed frame by frame from the design videos), played on the
// button the child answered with (Answer or Check). The
// colour grows in from the right, a piece rides across, then the colour pulls back to the left
// and the option shows itself again. One variant per outcome (the outcome table):
//   right-full   right first time: "Correct!", a star with "+1", confetti (2.7 s)
//   right-short  right after a miss or a hint: "Correct!" only (1.4 s)
//   right-calm   right in the check: "Correct!" only (1.4 s)
//   wrong-short  a miss with another try to come: the video's red, "!" marks and the cross (2.8 s)
//   wrong-full   a miss that ends the task, the answer shown: the same, with the wrong sound (2.8 s)
//   wrong-calm   wrong in the check: the cross only (1.4 s)
// It returns how long it plays, so the lesson can wait for it; 0 with reduced motion.
const VERDICT = {
  "right-full": { ms: 2700, sfx: ["answer-correct", [950, "xp-earned"], [1450, "card-lands"]] },
  "right-short": { ms: 1400, sfx: ["answer-correct"] },
  "right-calm": { ms: 1400, sfx: ["answer-correct"] },
  "wrong-short": { ms: 2800, sfx: ["try-again"] },
  "wrong-full": { ms: 2800, sfx: ["answer-wrong"] },
  "wrong-calm": { ms: 1400, sfx: ["answer-wrong"] },
};
const CORRECT_WORD = { de: "Richtig!", en: "Correct!", fr: "Correct !" };
const CO_STAR = '<svg viewBox="0 0 100 100" aria-hidden="true"><path class="co-ring" d="M50 3l13 28 30 4-22 21 6 30-27-15-27 15 6-30L7 35l30-4z"/><path class="co-core" d="M50 15l10 21 23 3-17 16 4 23-20-11-20 11 4-23-17-16 23-3z"/></svg>';
const CO_CURL = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 15c3 1 6-1 5-4s-5-1-3 2 7 3 8-2 3-6 5-6"/></svg>';
const CO_CROSS = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 4.5l11 11M15.5 4.5l-11 11"/></svg>';
function verdictFx(el, variant) {
  const v = VERDICT[variant];
  if (!el || !v || matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  el.querySelectorAll(".co-fx, .co-burst").forEach((x) => x.remove());
  const right = variant.startsWith("right"), full = variant.endsWith("full"), r = (a, z) => a + Math.random() * (z - a);
  const fx = document.createElement("span");
  fx.className = `co-fx co-${right ? "right" : "wrong"}${full || variant === "wrong-short" ? "" : " co-short"}`; fx.setAttribute("aria-hidden", "true");
  // Sizes follow the smaller of the height and a share of the width, so a square tile and a long pill both fit.
  el.style.setProperty("--co-r", getComputedStyle(el).borderTopLeftRadius);
  el.style.setProperty("--co-h", `${Math.round(Math.min(el.offsetHeight, el.offsetWidth * 0.42))}px`);
  el.style.setProperty("--co-w", `${el.offsetWidth}px`);
  const word = `<span class="co-wordtrack"><b class="co-word">${CORRECT_WORD[PL()] ?? CORRECT_WORD.en}</b></span>`;
  if (right) fx.innerHTML = `<span class="co-fill"></span>${word}${full ? `<span class="co-startrack"><span class="co-star">${CO_STAR}<b>+1</b></span></span>` : ""}`;
  else {
    // A miss with the video's strip: the circle in a row of "!" marks, nine each side, whose bars
    // grow left to right as the strip arrives. The check keeps the plain cross on its own.
    const marks = Array.from({ length: 19 }, (_, k) => k - 9).filter((j) => Math.abs(j) > 1)
      .map((j) => `<i class="co-bang" style="--j:${j};--d:${(0.4 + (j + 9) * 0.045).toFixed(3)}s"></i>`).join("");
    fx.innerHTML = variant === "wrong-calm"
      ? `<span class="co-fill"></span><span class="co-xtrack"><span class="co-x">${CO_CROSS}</span></span>`
      : `<span class="co-fill"></span><span class="co-wtrack">${marks}<span class="co-x">${CO_CROSS}</span></span>`;
  }
  el.classList.add("co-on"); el.appendChild(fx);
  if (variant === "right-full") {
    // Confetti inside the button, cut by its shape as in the video: white and dark green dashes, white curls.
    const burst = document.createElement("span"); burst.className = "co-burst"; burst.setAttribute("aria-hidden", "true");
    burst.innerHTML = Array.from({ length: 26 }, (_, i) => {
      const at = `--x:${r(3, 97).toFixed(1)}%;--y:${r(12, 80).toFixed(1)}%;--d:${r(1.4, 1.85).toFixed(2)}s;--dx:${r(-7, 7).toFixed(1)}px;--dy:${r(4, 12).toFixed(1)}px;--r:${Math.round(r(-90, 90))}deg;--r2:${Math.round(r(-200, 200))}deg`;
      return i % 4 === 3 ? `<i class="co-curl" style="${at}">${CO_CURL}</i>` : `<i class="co-bit" style="${at};--k:${i % 2 ? "#1d6b2a" : "#fff"}"></i>`;
    }).join("");
    fx.appendChild(burst);
  }
  // The app's sounds on the verdict's beats.
  v.sfx.forEach((x) => { const [ms, name] = typeof x === "string" ? [0, x] : x; setTimeout(() => fx.isConnected && sfx(name), ms); });
  setTimeout(() => { el.querySelectorAll(".co-fx, .co-burst").forEach((x) => x.remove()); el.classList.remove("co-on"); }, v.ms + 80);
  return v.ms;
}
