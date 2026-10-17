/* ---------- Practice tab (twist/docs/practice.md) ----------
   The phone shows the Practice tab as the child sees it; the side panel holds
   the pretend child and why each task was picked. Rules are in
   practice-rules.mjs, inlined above this file by build.mjs. */
const PR = { on: false, home: false, child: null, index: null, session: null, items: [], res: [], shownAt: 0, saved: null };
const PTXT = {
  de: { title: "Üben", suggested: "Für dich", search: "Suchen: Einmaleins, Plus, Wörter …", browse: "Alles zum Üben", drill: "Drill", start: "Los geht's", make: "Selbst zusammenstellen", ask: "Was möchtest du üben?", read: "Verstehen", none: "Das habe ich nicht verstanden. Wähle unten aus.", minutes: "Minuten", kinds: { mixed: "Gemischt", drill: "Drill", review: "Wiederholen", "catch-up": "Nachholen", skill: "Gezielt üben", recaps: "Weißt du es noch?" }, right: (n) => `${n} richtig!`, firstOf: (r, n) => `${r} von ${n} beim ersten Versuch richtig`, better: "Besser geworden:", perMin: (n) => `${n} pro Minute`, record: (n) => `Neuer Rekord: ${n} pro Minute!`, back: "Zurück zum Üben", again: "Nochmal" },
  en: { title: "Practice", suggested: "Suggested for you", search: "Search: times tables, adding, words …", browse: "Everything to practise", drill: "Drill", start: "Start", make: "Make my own", ask: "What do you want to practise?", read: "Read it", none: "I didn't understand that. Pick below.", minutes: "minutes", kinds: { mixed: "Mixed", drill: "Drill", review: "Review", "catch-up": "Catch up", skill: "Skill practice", recaps: "Do you remember?" }, right: (n) => `${n} right!`, firstOf: (r, n) => `${r} of ${n} right first time`, better: "You got better at:", perMin: (n) => `${n} a minute`, record: (n) => `New record: ${n} a minute!`, back: "Back to practice", again: "Again" },
};
const PL = () => (PR.child?.curriculum === "en-GB" ? "en" : "de");
const PT = () => PTXT[PL()];
const STARS = { not_started: 0, learning: 0, practised: 1, can_do: 2, remembered: 3, needs_refresh: 2 };
const starsOf = (k) => { const s = PR.child.states[k]?.state ?? "not_started", n = STARS[s]; return "★".repeat(n) + "☆".repeat(3 - n) + (s === "needs_refresh" ? " ↻" : ""); };
const canDoOf = (k) => { const c = D.skills[k]?.can_do; return c ? c[PL()] ?? c.en ?? c.de : k; };
const SUBJ_NAME = { "de-DE": { math: "Mathe", "lit-de": "Deutsch", fl: "Englisch" }, "en-GB": { math: "Maths", "lit-en": "English", fl: "French" } };

function loadChild() {
  // A saved child from an older build, or a broken one, starts fresh.
  try { const c = JSON.parse(localStorage.getItem("twist-practice-child")); if (c?.states && BANDS[c.band] && ["de-DE", "en-GB"].includes(c.curriculum) && Number.isFinite(c.today)) return { seen: {}, lastCheck: {}, drills: {}, sessions: 0, lastSkill: null, ...c }; } catch (e) {}
  return newChild({ curriculum: "de-DE", year: "klasse-2", band: "6-7" });
}
function saveChild() { try { localStorage.setItem("twist-practice-child", JSON.stringify(PR.child)); } catch (e) {} }

function openPractice() {
  PR.child ??= loadChild();
  PR.index = indexContent(D.sets, D.drills, PR.child.curriculum);
  PR.saved ??= { set, lesson, steps, results, at };
  PR.home = true; PR.on = false; $("#practiceSide").hidden = false;
  renderPracticeHome(); renderPracticeSide();
}
function closePractice() {
  PR.on = false; PR.home = false; PR.session = null; $("#practiceSide").hidden = true;
  if (PR.saved) { ({ set, lesson, steps, results, at } = PR.saved); PR.saved = null; go(at); }
}

const CARD_ICON = { recaps: ["↻", "#6849dd"], "catch-up": ["★", "#c44d00"], drill: ["⚡", "#0e8654"], review: ["✎", "#1971c0"] };
function renderPracticeHome() {
  const L = PT(), scr = $("#screen"), lg = PL();
  scr.innerHTML = `<div class="status"></div><div class="pr-home"><h2>${esc(L.title)}</h2>
    <div class="pr-h">${esc(L.suggested)}</div><div id="prCards" style="display:grid;gap:10px"></div>
    <input class="pr-search" id="prQ" type="search" placeholder="${esc(L.search)}" aria-label="${esc(L.search)}">
    <div id="prList" style="display:grid;gap:10px"></div></div>
    <button class="pr-fab" id="prFab" aria-label="${esc(L.make)}">+</button>`;
  const cards = $("#prCards");
  for (const c of suggestions(PR.child, PR.index)) {
    const [ic, col] = CARD_ICON[c.kind], b = document.createElement("button"); b.className = "pr-card"; b.style.setProperty("--c", col);
    const sub = c.kind === "recaps" ? c.skills.map(canDoOf).slice(0, 2).join(" · ") : canDoOf(c.skills[0]);
    b.innerHTML = `<span class="ic">${ic}</span><b>${esc(c.reason[lg])}</b><small>${esc(sub)}</small>`;
    b.onclick = () => startSession({ kind: c.kind, skills: c.skills });
    cards.appendChild(b);
  }
  $("#prQ").oninput = () => renderPracticeList($("#prQ").value);
  $("#prFab").onclick = () => openMakeSheet();
  renderPracticeList("");
}

function renderPracticeList(q) {
  const el = $("#prList"), lg = PL(), words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hit = (k) => { const tp = D.skills[k]?.topic ?? {}; const hay = [canDoOf(k), tp.de, tp.en, PR.index.drills[k] ? "drill einmaleins times blitzlesen" : ""].join(" ").toLowerCase(); return words.every((w) => hay.includes(w)); };
  el.innerHTML = `<div class="pr-h">${esc(PT().browse)}</div>`;
  for (const subject of PR.index.subjects) {
    const det = document.createElement("details"); det.className = "pr-sub"; det.open = !!words.length;
    det.innerHTML = `<summary>${esc(SUBJ_NAME[PR.child.curriculum][subject] ?? subject)}</summary>`;
    let n = 0;
    for (const tp of PR.index.topics.filter((t) => t.subject === subject)) {
      const ks = tp.skills.filter((k) => !words.length || hit(k)); if (!ks.length) continue;
      const h = document.createElement("div"); h.className = "pr-h"; h.textContent = tp.name[lg] ?? tp.name.en; det.appendChild(h);
      for (const k of ks) {
        n++;
        const row = document.createElement("div"); row.className = "pr-skill";
        row.innerHTML = `<span>${esc(canDoOf(k))}</span><span class="stars">${starsOf(k)}</span>`;
        row.onclick = (e) => { if (e.target.closest(".drillb")) return; startSession({ kind: ["practised", "needs_refresh"].includes(PR.child.states[k]?.state) ? "catch-up" : "skill", skills: [k] }); };
        if (PR.index.drills[k]) { const d = document.createElement("button"); d.className = "drillb"; d.textContent = PT().drill; d.onclick = () => startSession({ kind: "drill", skills: [k], minutes: 2 }); row.querySelector(".stars").after(d); }
        det.appendChild(row);
      }
    }
    if (n) el.appendChild(det);
  }
}


function startSession({ kind, skills = [], minutes = null, topics = [] }) {
  const fromTopics = topics.flatMap((key) => PR.index.topics.find((t) => t.key === key)?.skills ?? []);
  const all = [...new Set([...skills, ...fromTopics])];
  const session = buildSession({ kind, child: PR.child, index: PR.index, skills: all, minutes, rng: Math.random });
  if (!session.items.length) { renderPracticeHome(); return; }
  PR.session = session; PR.items = session.items; PR.res = []; PR.on = true; PR.home = false; PR.t0 = Date.now(); PR.applied = false;
  steps = PR.items.map((it) => ({ kind: "task", a: { activity: "practise" }, t: it.task, stage: it.mode, item: it })).concat([{ kind: "end" }]);
  results = steps.map(() => null);
  at = 0; showPracticeStep(0);
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
  renderTask(step);
  const t = step.t;
  if (t._sayWord && "speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(t._sayWord); u.lang = set.language === "de" ? "de-DE" : "en-GB"; speechSynthesis.cancel(); speechSynthesis.speak(u); }
  if (t._flashWord) {
    const f = document.createElement("div"); f.className = "pr-flash"; f.textContent = t._flashWord;
    $("#screen .visual")?.appendChild(f); setTimeout(() => f.remove(), 1500);
  }
  renderPracticeSide();
}

function practiceFrame(step) {
  const scr = $("#screen"), L = PT();
  const done = PR.res.filter(Boolean).length, total = PR.items.length;
  const pct = PR.session.kind === "drill" ? Math.min(100, (100 * (Date.now() - PR.t0)) / (PR.session.minutes * 60000)) : (100 * done) / Math.max(1, total);
  scr.style.setProperty("--subj", SUBJ_COLOUR[subjOf(set ?? D.sets[0])] ?? "#6849dd");
  scr.innerHTML = `<div class="status"></div><div class="hdr"><span></span>
    <div class="stepb"><span class="st">${esc(L.kinds[PR.session.kind] ?? L.title)}</span></div>
    <button class="ib x" aria-label="Close">${ICON.close}</button></div>
    <div class="pbar"><i style="width:${pct}%"></i></div>`;
  $(".x", scr).onclick = () => endSession(true);
  const body = document.createElement("div"); body.className = "body"; scr.appendChild(body);
  const foot = document.createElement("div"); foot.className = "foot"; scr.appendChild(foot);
  return { body, foot };
}

function endSession(early) {
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
  const out = applySession(PR.child, session, res, true); PR.applied = true; saveChild();
  const { body, foot } = practiceFrame({});
  const better = Object.entries(sc.perSkill).filter(([, p]) => p.right).map(([k]) => canDoOf(k));
  const big = session.kind === "drill" ? (out.record ? L.record(sc.perMinute) : L.perMin(sc.perMinute ?? 0)) : L.right(sc.right);
  body.innerHTML = `<div class="center">${mascotPose("end")}<h2 class="done">${esc(big)}</h2>
    ${PR.child.band === "8-10" && session.kind !== "drill" ? `<p>${esc(L.firstOf(sc.firstTry, sc.total))}</p>` : ""}
    ${better.length ? `<p><b>${esc(L.better)}</b><br>${better.map(esc).join("<br>")}</p>` : ""}</div>`;
  PR.on = false; PR.home = true;
  nextBtn(foot, L.back, () => { PR.session = null; renderPracticeHome(); renderPracticeSide(); });
  nextBtn(foot, L.again, () => startSession({ kind: session.kind, skills: session.skills, minutes: session.minutes })).classList.add("light");
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
const YEAR_OF = (cur) => [...new Set(D.sets.filter((s) => s.id.startsWith(cur + ".")).map((s) => s.year))];
function renderPracticeSide() {
  const el = $("#practiceSide"), c = PR.child; if (!el || !c) return;
  const step = PR.on ? steps[at] : null, it = step?.item;
  const skills = PR.index.sets.filter((s) => s.year === c.year).map((s) => s.skill);
  const opt = (v, cur, label = v) => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(label)}</option>`;
  el.innerHTML = `<details open><summary><b>Pretend child</b></summary>
    <div class="pr-grid">
      <label for="pcCur">Curriculum</label><select id="pcCur">${opt("de-DE", c.curriculum)}${opt("en-GB", c.curriculum)}</select>
      <label for="pcYear">Year</label><select id="pcYear">${YEAR_OF(c.curriculum).map((y) => opt(y, c.year, yearName(y))).join("")}</select>
      <label for="pcBand">Age band</label><select id="pcBand">${["4-5", "6-7", "8-10"].map((b) => opt(b, c.band)).join("")}</select>
      <span>Today: day <b>${c.today}</b></span><span><button class="nbtn" id="pcDay">+1 day</button> <button class="nbtn" id="pcWeek">+1 week</button></span>
      <span>Sessions finished</span><b>${c.sessions}</b>
    </div>
    <p><button class="nbtn" id="pcReset">Reset this child</button></p></details>
    <details ${it ? "open" : ""}><summary><b>Why this task</b></summary>${it ? whyBox(it) : `<p class="pr-why empty">Start a session to see why each task was picked.</p>`}</details>
    <details open><summary><b>Skills in ${esc(yearName(c.year))}</b> (${skills.length})</summary><div class="pr-grid" id="pcSkills"></div></details>`;
  const grid = $("#pcSkills");
  skills.forEach((k, i) => {
    const s = c.states[k]?.state ?? "not_started", n = nextRecap(c, k);
    const row = document.createElement("div"); row.style.cssText = "grid-column:1/-1;display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;border-top:1px solid #eee;padding-top:4px";
    row.innerHTML = `<span title="${esc(k)}">${esc(canDoOf(k))}<br><small>${n ? `recap due day ${n.day}${n.upkeep ? " (upkeep)" : ""}` : ""}</small></span>
      <select aria-label="State of ${esc(k)}">${STATES.map((x) => opt(x, s)).join("")}</select>
      <button class="nbtn" title="Set every skill before this one to can_do">⤒</button>`;
    row.querySelector("select").onchange = (e) => { setState(c, k, e.target.value); saveChild(); refreshPractice(); };
    row.querySelector("button").onclick = () => { skills.slice(0, i).forEach((x) => setState(c, x, "can_do")); saveChild(); refreshPractice(); };
    grid.appendChild(row);
  });
  $("#pcCur").onchange = (e) => { const cur = e.target.value, y = YEAR_OF(cur)[0], s = D.sets.find((x) => x.year === y && x.id.startsWith(cur + ".")); PR.child = newChild({ curriculum: cur, year: y, band: ageBand(s?.ages) }); saveChild(); PR.on = false; PR.session = null; refreshPractice(); };
  $("#pcYear").onchange = (e) => { c.year = e.target.value; const s = D.sets.find((x) => x.year === c.year && x.id.startsWith(c.curriculum + ".")); c.band = ageBand(s?.ages); saveChild(); refreshPractice(); };
  $("#pcBand").onchange = (e) => { c.band = e.target.value; saveChild(); refreshPractice(); };
  $("#pcDay").onclick = () => { c.today += 1; saveChild(); refreshPractice(); };
  $("#pcWeek").onclick = () => { c.today += 7; saveChild(); refreshPractice(); };
  $("#pcReset").onclick = () => { PR.child = newChild({ curriculum: c.curriculum, year: c.year, band: c.band }); saveChild(); refreshPractice(); };
}
function refreshPractice() {
  PR.index = indexContent(D.sets, D.drills, PR.child.curriculum);
  if (!PR.on) renderPracticeHome();
  renderPracticeSide();
}

function openMakeSheet() {
  const L = PT(), lg = PL(), scr = $("#screen"), F = { subject: PR.index.subjects[0], topics: [], skills: [], minutes: 10, kind: "mixed" };
  const m = document.createElement("div"); m.className = "sheet menu-sheet"; m.style.maxHeight = "85%"; m.style.overflowY = "auto";
  const draw = (note = "") => {
    const tps = PR.index.topics.filter((t) => t.subject === F.subject);
    m.innerHTML = `<div class="msg">${esc(L.make)}</div>
      <label class="pr-h" for="prAsk">${esc(L.ask)}</label>
      <div style="display:flex;gap:8px"><input class="pr-search" id="prAsk" type="text"><button class="btn light" id="prRead" style="width:auto">${esc(L.read)}</button></div>
      ${note ? `<p class="note">${esc(note)}</p>` : ""}
      <div class="pr-chips" id="fcSub">${PR.index.subjects.map((s) => `<button data-v="${s}" aria-pressed="${F.subject === s}">${esc(SUBJ_NAME[PR.child.curriculum][s] ?? s)}</button>`).join("")}</div>
      <div class="pr-chips" id="fcTop">${tps.map((t) => `<button data-v="${esc(t.key)}" aria-pressed="${F.topics.includes(t.key)}">${esc(t.name[lg] ?? t.name.en)}</button>`).join("")}</div>
      <div class="pr-chips" id="fcMin">${[5, 10, 15].map((n) => `<button data-v="${n}" aria-pressed="${F.minutes === n}">${n} ${esc(L.minutes)}</button>`).join("")}</div>
      <div class="pr-chips" id="fcKind">${["mixed", "drill", "review", "catch-up"].map((k) => `<button data-v="${k}" aria-pressed="${F.kind === k}">${esc(L.kinds[k])}</button>`).join("")}</div>`;
    const ask = $("#prAsk", m);
    $("#prRead", m).onclick = () => {
      const r = parseRequest(ask.value, PR.index);
      if (r.unknown) return draw(L.none);
      Object.assign(F, { topics: r.filters.topics ?? F.topics, skills: r.filters.skills ?? [], minutes: r.filters.minutes ?? F.minutes, kind: r.filters.kind ?? F.kind, subject: r.filters.subject ?? F.subject });
      draw(r.understood.join(" · "));
    };
    m.querySelectorAll("#fcSub button").forEach((b) => b.onclick = () => { F.subject = b.dataset.v; F.topics = []; F.skills = []; draw(); });
    m.querySelectorAll("#fcTop button").forEach((b) => b.onclick = () => { const v = b.dataset.v; F.topics = F.topics.includes(v) ? F.topics.filter((x) => x !== v) : [...F.topics, v]; draw(); });
    m.querySelectorAll("#fcMin button").forEach((b) => b.onclick = () => { F.minutes = +b.dataset.v; draw(); });
    m.querySelectorAll("#fcKind button").forEach((b) => b.onclick = () => { F.kind = b.dataset.v; draw(); });
    const go_ = document.createElement("button"); go_.className = "btn"; go_.textContent = L.start;
    go_.onclick = () => {
      const fromTopics = F.topics.flatMap((key) => PR.index.topics.find((t) => t.key === key)?.skills ?? []);
      let skills = [...new Set([...F.skills, ...fromTopics])];
      if (!skills.length) skills = PR.index.topics.filter((t) => t.subject === F.subject).flatMap((t) => t.skills).filter((k) => PR.index.sets.find((s) => s.skill === k)?.year === PR.child.year);
      if (F.kind === "drill") skills = skills.filter((k) => PR.index.drills[k]);
      if (!skills.length) return draw(L.none);
      m.remove(); startSession({ kind: F.kind, skills: F.kind === "drill" ? [skills[0]] : skills, minutes: F.kind === "drill" ? Math.min(F.minutes, 5) : F.minutes });
    };
    const x = document.createElement("button"); x.className = "btn light"; x.textContent = UI.close; x.onclick = () => m.remove();
    m.appendChild(go_); m.appendChild(x);
  };
  draw(); scr.appendChild(m);
}
