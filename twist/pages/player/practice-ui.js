/* ---------- Practice tab (twist/docs/practice.md) ----------
   The phone shows the Practice tab as the child sees it; the side panel holds
   the pretend child and why each task was picked. Rules are in
   practice-rules.mjs, inlined above this file by build.mjs. */
const PR = { on: false, home: false, child: null, index: null, session: null, items: [], res: [], shownAt: 0, saved: null };
const PTXT = {
  de: { title: "Üben", suggested: "Für dich", search: "Suchen: Einmaleins, Plus, Wörter …", browse: "Alles zum Üben", drill: "Drill", start: "Los geht's", make: "Selbst zusammenstellen", ask: "Was möchtest du üben?", read: "Verstehen", none: "Das habe ich nicht verstanden. Wähle unten aus.", minutes: "Minuten", kinds: { mixed: "Gemischt", drill: "Drill", review: "Wiederholen", "catch-up": "Nachholen" }, right: (n) => `${n} richtig!`, firstOf: (r, n) => `${r} von ${n} beim ersten Versuch richtig`, better: "Besser geworden:", perMin: (n) => `${n} pro Minute`, record: (n) => `Neuer Rekord: ${n} pro Minute!`, back: "Zurück zum Üben", again: "Nochmal" },
  en: { title: "Practice", suggested: "Suggested for you", search: "Search: times tables, adding, words …", browse: "Everything to practise", drill: "Drill", start: "Start", make: "Make my own", ask: "What do you want to practise?", read: "Read it", none: "I didn't understand that. Pick below.", minutes: "minutes", kinds: { mixed: "Mixed", drill: "Drill", review: "Review", "catch-up": "Catch up" }, right: (n) => `${n} right!`, firstOf: (r, n) => `${r} of ${n} right first time`, better: "You got better at:", perMin: (n) => `${n} a minute`, record: (n) => `New record: ${n} a minute!`, back: "Back to practice", again: "Again" },
};
const PL = () => (PR.child?.curriculum === "en-GB" ? "en" : "de");
const PT = () => PTXT[PL()];
const STARS = { not_started: 0, learning: 0, practised: 1, can_do: 2, remembered: 3, needs_refresh: 2 };
const starsOf = (k) => { const s = PR.child.states[k]?.state ?? "not_started", n = STARS[s]; return "★".repeat(n) + "☆".repeat(3 - n) + (s === "needs_refresh" ? " ↻" : ""); };
const canDoOf = (k) => { const c = D.skills[k]?.can_do; return c ? c[PL()] ?? c.en ?? c.de : k; };
const SUBJ_NAME = { "de-DE": { math: "Mathe", "lit-de": "Deutsch", fl: "Englisch" }, "en-GB": { math: "Maths", "lit-en": "English", fl: "French" } };

function loadChild() {
  try { const c = JSON.parse(localStorage.getItem("twist-practice-child")); if (c?.states) return c; } catch (e) {}
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

function startSession(opts) { console.log("startSession", opts); }
function practiceFrame(step) { return { body: $("#screen"), foot: $("#screen") }; }
function practiceEnd() {}
function practiceGo(i) { return false; }
function renderPracticeSide() { $("#practiceSide").textContent = ""; }
function openMakeSheet() {}
