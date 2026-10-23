/* ---------- The preview's right panel: what to try on the open screen ----------
   The panel follows the phone. Each tab and the lesson player get the
   controls that change what is on screen, at the top; the pretend child, the
   time machine and the skills follow where they matter (renderPracticeSide in
   practice-ui.js builds the panel). Inlined after anim-ui.js. */
const SIDE_NAME = { start: "Start", study: "Study track", practice: "Practice", me: "Me", settings: "Settings", lesson: "Lesson player" };
// The parts below the controls: listed means shown, 1 means open.
const SIDE_PARTS = {
  start: { child: 1, time: 1 },
  study: { child: 0, time: 0, skills: 0 },
  practice: { child: 1, time: 1, search: 0, why: 1, skills: 1 },
  me: { child: 1, time: 0 },
  settings: { child: 0 },
  lesson: {},
};
// Which screen the phone shows: a tab of the app, the Study track, or a lesson.
function sideCtx() {
  if (document.body.classList.contains("practice")) return APP.tab ?? "start";
  return APP.home === "study" ? "study" : "lesson";
}
const sideLook = () => `<div class="sx-row"><span>Look</span><span class="sx-seg">${LOOKS.map((v) => `<button class="nbtn" data-look="${v}" aria-pressed="${getLook() === v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join("")}</span></div>`;
function sideTop(ctx) {
  const c = PR.child, head = `<div class="sx-head"><small>On screen</small><b>${SIDE_NAME[ctx]}</b></div>`;
  if (ctx === "lesson") {
    if (!set || !lesson) return head;
    const t = (x) => x?.[set.language] ?? x?.en ?? x?.de ?? "";
    const check = steps.findIndex((s) => s.kind === "checkIntro"), end = steps.findIndex((s) => s.kind === "end");
    return `${head}<div class="sx-box">
      <p class="sx-title"><b>${esc(t(set.title))}</b><small>${esc(yearName(set.year))}, ${esc(SUBJ[subjOf(set)] ?? "")}: lesson ${lesson.n} of ${set.lessons.length}, step ${at + 1} of ${steps.length}</small></p>
      <div class="sx-btns"><button class="nbtn" data-go="${at - 1}"${at ? "" : " disabled"}>◀ Step</button><button class="nbtn" data-go="${at + 1}"${at < steps.length - 1 ? "" : " disabled"}>Step ▶</button>${check > 0 ? `<button class="nbtn" data-go="${check}">Go to the Check</button>` : ""}<button class="nbtn" data-go="${end}">Go to the end</button></div>
      <div class="sx-row"><span>Lessons</span><span class="sx-seg">${set.lessons.map((l) => `<button class="nbtn" data-lesson="${l.n}" aria-pressed="${l.n === lesson.n}" title="${esc(t(l.title))}">${l.n}</button>`).join("")}</span></div>
      <label class="tg"><input type="checkbox" id="sxCount"${APP.fromApp ? " checked" : ""}${set.curriculum === c.curriculum ? "" : " disabled"}> Count it for ${esc(c.name ?? "the pretend child")}: the celebration, stars and Study's skate after the end</label>
      <label class="tg"><input type="checkbox" data-mirror="auto"${$("#auto").checked ? " checked" : ""}> Play audio automatically</label>
      <label class="tg"><input type="checkbox" data-mirror="autonext"${$("#autonext").checked ? " checked" : ""}> Next after a right answer (3 s)</label>
      ${sideLook()}
      <div class="sx-btns"><button class="nbtn" id="sxBack">Back to the app</button></div></div>`;
  }
  if (ctx === "study") {
    const sets = courseSets(APP.subj), s = nextIn(sets), d = s ? lessonsDone(s) : 0;
    return `${head}<div class="sx-box">
      <div class="sx-row"><span>Subject</span><span class="sx-seg">${appSubjects().map((x) => `<button class="nbtn" data-subj="${x}" aria-pressed="${x === APP.subj}">${esc(SUBJ_NAME[c.curriculum][x] ?? x)}</button>`).join("")}</span></div>
      <p class="sx-note">${s ? `Current skill: <b>${esc(s.title[PL()] ?? s.title.de)}</b>, ${d} of ${s.lessons.length} lessons done.` : "Every skill of this year is done."}</p>
      <div class="sx-btns">${s ? `<button class="nbtn" id="sxLesson">Do one lesson</button><button class="nbtn" id="sxSkill">Finish the skill and skate on</button><button class="nbtn" id="sxOpen">Open the lesson</button>` : ""}<button class="nbtn" id="sxSkate">Play the skate again</button><button class="nbtn" id="sxUnits">${APP.units ? "Show the track" : "Show the unit list"}</button></div>
      <div class="sx-row"><span>Stones</span><span class="sx-seg"><button class="nbtn" data-stones="lesson" aria-pressed="${stonesPerLesson()}">One per lesson</button><button class="nbtn" data-stones="skill" aria-pressed="${!stonesPerLesson()}">One per skill</button></span></div>
      ${sideLook()}</div>`;
  }
  if (ctx === "me") {
    const all = myBadges();
    return `${head}<div class="sx-box">
      <div class="sx-btns"><button class="nbtn" id="sxPlay">Play today</button><button class="nbtn" id="sxPlayNext">Next school day, played</button><button class="nbtn" id="sxSessions">+10 practice sessions</button></div>
      <div class="sx-row"><span>Open a badge</span><select id="sxBadge"><option value="">Choose …</option>${all.map((b) => `<option value="${b.id}">${esc(badgeName(b.id))}${b.earned ? " ✓" : ""}</option>`).join("")}</select></div>
      ${sideLook()}</div>`;
  }
  if (ctx === "start") {
    return `${head}<div class="sx-box">
      <div class="sx-btns"><button class="nbtn" id="sxNext">Open the next lesson</button><button class="nbtn" id="sxPlay">Play today</button><button class="nbtn" id="sxSplash">Show the splash screen</button></div>
      ${sideLook()}</div>`;
  }
  if (ctx === "settings") {
    const S = ["answer-correct", "answer-wrong", "try-again", "option-picked", "piece-locked", "card-lands", "stone-land", "skate-roll", "xp-earned", "streak-earned", "module-complete"];
    return `${head}<div class="sx-box">${sideLook()}
      <div class="sx-row"><span>Hear a sound</span><select id="sxSfx"><option value="">Choose …</option>${S.map((x) => `<option>${x}</option>`).join("")}</select></div>
      <p class="sx-note">Sound effects and Vibration on the phone switch these off, as in the app.</p>
      <div class="sx-btns"><button class="nbtn" id="sxSplash">Show the splash screen</button></div></div>`;
  }
  return head + `<div class="sx-box">${sideLook()}</div>`;
}
function sideWire(ctx, el) {
  const c = PR.child, on = (sel, f) => { const x = el.querySelector(sel); if (x) x.onclick = f; };
  const redraw = () => { saveChild(); refreshPractice(); };
  el.querySelectorAll("[data-look]").forEach((b) => b.onclick = () => { setLook(b.dataset.look); renderPracticeSide(); });
  on("#sxSplash", () => splash());
  on("#sxPlay", () => { markActive(c); logEvent(c, "played today, set by hand"); redraw(); });
  if (ctx === "lesson") {
    el.querySelectorAll("[data-go]").forEach((b) => b.onclick = () => go(+b.dataset.go));
    el.querySelectorAll("[data-lesson]").forEach((b) => b.onclick = () => { pickLesson(+b.dataset.lesson); });
    const cnt = el.querySelector("#sxCount"); if (cnt) cnt.onchange = (e) => { APP.fromApp = e.target.checked; };
    el.querySelectorAll("[data-mirror]").forEach((x) => x.onchange = () => { const m = $("#" + x.dataset.mirror); m.checked = x.checked; m.dispatchEvent(new Event("change")); });
    on("#sxBack", () => appTab(APP.tab && APP.tab !== "study" ? APP.tab : "study"));
  }
  if (ctx === "study") {
    const s = nextIn(courseSets(APP.subj));
    el.querySelectorAll("[data-subj]").forEach((b) => b.onclick = () => { APP.subj = b.dataset.subj; APP.year = null; appTab("study"); });
    on("#sxLesson", () => { const n = lessonsDone(s) + 1; finishLesson(c, { setId: s.id, skill: s.skill, n }); if (stonesPerLesson() || n >= s.lessons.length) APP.skillDone = true; saveChild(); appTab("study"); });
    el.querySelectorAll("[data-stones]").forEach((b) => b.onclick = () => { try { localStorage.setItem(STONES_KEY, b.dataset.stones); } catch {} APP.units = false; appTab("study"); });
    on("#sxSkill", () => { finishLesson(c, { setId: s.id, skill: s.skill, n: s.lessons.length, check: { pass: true, keys: [] } }); APP.skillDone = true; saveChild(); appTab("study"); });
    on("#sxOpen", () => startLesson(s.id, s.lessons[Math.min(lessonsDone(s), s.lessons.length - 1)].n));
    on("#sxSkate", () => { APP.skillDone = true; appTab("study"); });
    on("#sxUnits", () => { APP.units = !APP.units; appTab("study", { keep: true }); });
  }
  if (ctx === "me") {
    on("#sxPlayNext", () => { c.today += 1; while (c.today % 7 >= 5) c.today += 1; markActive(c); logEvent(c, "played, set by hand"); redraw(); });
    on("#sxSessions", () => { c.sessions += 10; redraw(); });
    const sel = el.querySelector("#sxBadge"); if (sel) sel.onchange = () => { const b = myBadges().find((x) => x.id === sel.value); sel.value = ""; if (b) badgeSheet(b); };
  }
  if (ctx === "start") on("#sxNext", () => { const p = homePlan(), s = nextIn(courseSets(p.subj)); if (s) startLesson(s.id, s.lessons[Math.min(lessonsDone(s), s.lessons.length - 1)].n); });
  if (ctx === "settings") { const sel = el.querySelector("#sxSfx"); if (sel) sel.onchange = () => { if (sel.value) { sfxPlayer.src = `${ANIM}sfx/${sel.value}.mp3`; sfxPlayer.play().catch(() => {}); } sel.value = ""; }; }
}

/* ---------- The lesson list on the left: open a lesson in the phone; close the list ---------- */
// From any view, a lesson picked in the list plays in the phone's lesson player.
function openFromList(i, n) {
  stopAudio();
  if (["practice", "parents", "types", "drawn"].some((v) => document.body.classList.contains(v))) setView("lessons");
  APP.fromApp = false; APP.units = false;
  pickSet(i, n);
}
const listClosed = () => { try { return localStorage.getItem("twist-list") === "closed"; } catch { return false; } };
function setList(open) {
  try { localStorage.setItem("twist-list", open ? "open" : "closed"); } catch {}
  document.body.classList.toggle("list-closed", !open);
  if (!docked()) toggle($("#openPick"), $("#drawer"), open);
  sizePhone();
}
// Runs as the page loads, before template.html's helpers ($, docked) exist.
document.body.classList.toggle("list-closed", listClosed());
document.getElementById("closeList").onclick = () => setList(false);
document.getElementById("openList").onclick = () => setList(true);
