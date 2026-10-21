/* ---------- Parents: the child's progress for a parent ----------
   A view of its own beside App, Drawings and Task types. It reads the same
   pretend child as the app (PR.child), so demo data, lessons played and the
   time machine show here at once. Top to bottom: who and this week in a
   sentence, four numbers, the subjects (where the child is, how its skills
   stand), suggestions with a way into the app, rewards, the last four weeks
   and what happened lately. Inlined after app-ui.js. */
const PATXT = {
  de: {
    and: " und ", week: (n) => `${n}s Woche`, sub: (y, cur) => `${y} · ${cur}`, updated: "Stand heute",
    played: (a, b) => `hat an ${a} von ${b} Schultagen dieser Woche gelernt`, none: "hat diese Woche noch nicht gelernt",
    did: (l, s) => [l && `${l} ${l === 1 ? "Lektion" : "Lektionen"} geschafft`, s && `${s} ${s === 1 ? "Übungsrunde" : "Übungsrunden"} gespielt`].filter(Boolean).join(" und "),
    strong: (x) => `${x} läuft gut.`, needs: (x) => `In ${x} lohnt sich ein bisschen Üben.`,
    kDays: "Schultage gespielt", kLessons: "Lektionen diese Woche", kSessions: "Übungsrunden diese Woche", kSecure: "Fähigkeiten sicher",
    ofN: (a, b) => `von ${b}`, subjects: "Fächer", unit: (k, n) => `Einheit ${k} von ${n}`, now: "Gerade dran", allDone: "Alles für dieses Jahr geschafft",
    states: { remembered: "Behält es", can_do: "Kann es", practising: "Übt noch", learning: "Lernt gerade", not_started: "Noch nicht begonnen" },
    skillsN: (n) => `${n} Fähigkeiten`, units: (a, b) => `${a} von ${b} Einheiten`,
    recs: "Vorschläge für diese Woche", open: "In der App öffnen",
    rRecapT: (n) => `${n} ${n === 1 ? "Fähigkeit" : "Fähigkeiten"} zum Auffrischen`, rRecapW: "Kurz wiederholen, damit es bleibt. Etwa 5 Minuten.",
    rWeakT: (x) => `Gemeinsam üben: ${x}`, rWeakW: "Geübt, aber noch nicht sicher. Eine Runde mit Tipps hilft.",
    rRefreshW: "War schon sicher und braucht eine Auffrischung.",
    rNextT: (s) => `${s} voranbringen`, rNextW: (l) => `Als Nächstes: „${l}“. Hier ist am meisten zu tun.`,
    rTodayT: "Heute noch nicht gelernt", rTodayW: (n) => n ? `Eine Lektion hält die Serie von ${n} Tagen.` : "Eine Lektion heute startet eine neue Serie.",
    rStreakT: (name) => `Auf dem Weg zum Abzeichen ${name}`, rStreakW: (n) => `Noch ${n} ${n === 1 ? "Schultag" : "Schultage"} in Folge.`,
    rewards: "Belohnungen", streak: "Tage in Folge", best: (n) => `Bester Lauf: ${n}`, stars: "Sterne", badges: "Abzeichen", recent: "Zuletzt verdient", next: "Als Nächstes", noBadge: "Noch keins.",
    month: "Die letzten vier Wochen", playedL: "Gespielt", missedL: "Nicht gespielt", todayL: "Heute", openL: "noch offen",
    days: ["Mo", "Di", "Mi", "Do", "Fr"], dayFull: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    cell: (d, l, s) => `${d}: ${l} ${l === 1 ? "Lektion" : "Lektionen"}, ${s} ${s === 1 ? "Übungsrunde" : "Übungsrunden"}`,
    lately: "Zuletzt", today: "Heute", yesterday: "Gestern", nothing: "Noch nichts. Sobald gelernt wird, steht es hier.",
    eLesson: (n, t) => `Lektion ${n} von „${t}“ geschafft`, eCheck: (ok) => ok ? "Test bestanden" : "Test noch nicht bestanden",
    eSession: { mixed: "Gemischte Übungsrunde", drill: "Sprint", review: "Wiederholung", "catch-up": "Nachhol-Runde", skill: "Gezielt geübt", recaps: "Auffrischung" },
    eSecure: (t) => `Jetzt sicher: ${t}`, eKept: (t) => `Behält es: ${t}`, left: "vorzeitig beendet",
  },
  en: {
    and: " and ", week: (n) => `${n}'s week`, sub: (y, cur) => `${y} · ${cur}`, updated: "As of today",
    played: (a, b) => `learnt on ${a} of ${b} school days this week`, none: "hasn't played yet this week",
    did: (l, s) => [l && `finished ${l} ${l === 1 ? "lesson" : "lessons"}`, s && `played ${s} practice ${s === 1 ? "session" : "sessions"}`].filter(Boolean).join(" and "),
    strong: (x) => `${x} is going well.`, needs: (x) => `${x} would benefit from a little practice.`,
    kDays: "School days played", kLessons: "Lessons this week", kSessions: "Practice sessions this week", kSecure: "Skills secure",
    ofN: (a, b) => `of ${b}`, subjects: "Subjects", unit: (k, n) => `Unit ${k} of ${n}`, now: "Working on", allDone: "Everything for this year done",
    states: { remembered: "Remembers it", can_do: "Can do it", practising: "Still practising", learning: "Learning now", not_started: "Not started" },
    skillsN: (n) => `${n} skills`, units: (a, b) => `${a} of ${b} units`,
    recs: "Suggestions for this week", open: "Open in the app",
    rRecapT: (n) => `${n} ${n === 1 ? "skill" : "skills"} to refresh`, rRecapW: "A short review so it sticks. About 5 minutes.",
    rWeakT: (x) => `Practise together: ${x}`, rWeakW: "Practised but not secure yet. A session with hints helps.",
    rRefreshW: "Was secure and needs a refresh.",
    rNextT: (s) => `Move ${s} along`, rNextW: (l) => `Next up: “${l}”. This is where there's most to do.`,
    rTodayT: "Not played yet today", rTodayW: (n) => n ? `One lesson keeps the ${n}-day streak going.` : "One lesson today starts a new streak.",
    rStreakT: (name) => `On the way to the ${name} badge`, rStreakW: (n) => `${n} more school ${n === 1 ? "day" : "days"} in a row.`,
    rewards: "Rewards", streak: "Days in a row", best: (n) => `Best run: ${n}`, stars: "Stars", badges: "Badges", recent: "Earned lately", next: "Up next", noBadge: "None yet.",
    month: "The last four weeks", playedL: "Played", missedL: "Not played", todayL: "Today", openL: "still to play",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"], dayFull: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    cell: (d, l, s) => `${d}: ${l} ${l === 1 ? "lesson" : "lessons"}, ${s} ${s === 1 ? "practice session" : "practice sessions"}`,
    lately: "Lately", today: "Today", yesterday: "Yesterday", nothing: "Nothing yet. It shows here as soon as there's learning.",
    eLesson: (n, t) => `Finished lesson ${n} of “${t}”`, eCheck: (ok) => ok ? "check passed" : "check not passed yet",
    eSession: { mixed: "Mixed practice", drill: "Sprint", review: "Review", "catch-up": "Catch-up session", skill: "Skill practice", recaps: "Refresh" },
    eSecure: (t) => `Now secure: ${t}`, eKept: (t) => `Remembers: ${t}`, left: "left early",
  },
};
const PA = () => PATXT[PL()];
const CUR_NAME = { "de-DE": ["Deutschland", "Germany"], "en-GB": ["England", "England"] };
const STATE_ORDER = ["remembered", "can_do", "practising", "learning", "not_started"];
const bucket = (s) => (s === "practised" || s === "needs_refresh" ? "practising" : s ?? "not_started");
// A subject's step for a skill state: the subject's colour, lighter as the skill is less far along.
const STATE_MIX = { remembered: 100, can_do: 72, practising: 46, learning: 26 };
const dayName = (d) => PA().dayFull[((d % 7) + 7) % 7];

function renderParents() {
  const el = $("#parentsView"), c = appChild(), P = PA(), lg = PL(), T = AT(), subs = appSubjects();
  const mon = c.today - (((c.today % 7) + 7) % 7), act = new Set(c.active ?? []);
  const weekDays = Array.from({ length: 5 }, (_, i) => mon + i).filter((d) => d <= c.today);
  const log = c.log ?? [], lessonRe = /^lesson (\d+) of (\S+) finished/, sessionRe = /^(\S+) session(, left early)?:/;
  const on = (d) => ({ l: log.filter((e) => e.day === d && lessonRe.test(e.text)).length, s: log.filter((e) => e.day === d && sessionRe.test(e.text)).length });
  const week = weekDays.reduce((a, d) => { const x = on(d); return { l: a.l + x.l, s: a.s + x.s }; }, { l: 0, s: 0 });
  const played = weekDays.filter((d) => act.has(d)).length;
  // The subjects: units done in the child's year, the skill states, the next lesson.
  const subj = subs.map((x) => {
    const sets = courseSets(x), done = sets.filter((s) => lessonsDone(s) >= s.lessons.length).length, next = nextIn(sets);
    const counts = Object.fromEntries(STATE_ORDER.map((k) => [k, 0]));
    for (const s of sets) counts[bucket(c.states[s.skill]?.state)]++;
    const secure = counts.remembered + counts.can_do, tried = sets.length - counts.not_started;
    return { x, name: SUBJ_NAME[c.curriculum][x] ?? x, colour: colourOf(x), sets, done, next, counts, secure, ratio: sets.length ? done / sets.length : 1, struggle: tried ? counts.practising / tried : 0 };
  });
  const secure = subj.reduce((n, s) => n + s.secure, 0), skills = subj.reduce((n, s) => n + s.sets.length, 0);
  const best = [...subj].sort((a, b) => b.ratio - a.ratio)[0], weakest = [...subj].filter((s) => s.next).sort((a, b) => a.ratio - b.ratio)[0];
  const struggling = [...subj].sort((a, b) => b.struggle - a.struggle).find((s) => s.struggle > 0.25);
  const summary = `${c.name} ${played ? P.played(played, weekDays.length) : P.none}${played && (week.l || week.s) ? (week.l && week.s ? ", " : P.and) + P.did(week.l, week.s) : ""}. ${best && best.done ? P.strong(best.name) + " " : ""}${struggling && struggling !== best ? P.needs(struggling.name) : ""}`;

  // Suggestions, most useful first, each opening the app on it.
  const recs = [];
  const due = recapsDue(c).filter((k) => PR.index.bySkill[k]);
  if (due.length) recs.push({ icon: "recap", t: P.rRecapT(due.length), w: P.rRecapW, go: () => startSession({ kind: "recaps", skills: due }) });
  const weak = Object.entries(c.states).filter(([k, s]) => PR.index.bySkill[k] && (s.state === "needs_refresh" || s.state === "practised")).sort(([, a]) => (a.state === "needs_refresh" ? -1 : 1))[0];
  if (weak) recs.push({ icon: "together", t: P.rWeakT(setOfSkill(weak[0])?.title[lg] ?? canDoOf(weak[0])), w: weak[1].state === "needs_refresh" ? P.rRefreshW : P.rWeakW, go: () => startSession({ kind: "catch-up", skills: [weak[0]] }) });
  if (!act.has(c.today) && c.today % 7 < 5) { const s = streak(c); recs.push({ icon: "today", t: P.rTodayT, w: P.rTodayW(s.current), go: null, tab: "start" }); }
  if (weakest?.next) { const l = weakest.next.lessons[lessonsDone(weakest.next)]; recs.push({ icon: "next", colour: weakest.colour, t: P.rNextT(weakest.name), w: P.rNextW(l.title[lg] ?? l.title.de), lesson: [weakest.next.id, l.n] }); }
  const s = streak(c);
  if (s.next && recs.length < 4) recs.push({ icon: "streak", t: P.rStreakT(streakName(s.next[1])), w: P.rStreakW(s.next[0] - s.current), go: null, tab: "me" });

  // Rewards.
  const all = myBadges(), seen = c.badgeSeen ?? {}, got = all.filter((b) => b.earned).sort((x, y) => (seen[y.id]?.n ?? 0) - (seen[x.id]?.n ?? 0));
  const coming = nextBadges(all, 2);
  // Four school weeks, Monday to Friday, ending with this one.
  const weeks = Array.from({ length: 4 }, (_, w) => mon - (3 - w) * 7);
  const cell = (d) => {
    const x = on(d), label = `${dayName(d)}${d === c.today ? ` (${P.todayL})` : ""}`, tip = d > c.today ? label : act.has(d) ? P.cell(label, x.l, x.s) : `${label}: ${d === c.today ? P.openL : P.missedL}`;
    return `<i class="pa-day${act.has(d) ? " on" : d < c.today ? " off" : d > c.today ? " later" : ""}${d === c.today ? " today" : ""}" data-tip="${esc(tip)}" tabindex="0" aria-label="${esc(tip)}"></i>`;
  };
  // What happened lately, newest first, in words.
  const lately = [];
  for (const e of [...log].reverse()) {
    if (lately.length >= 8) break;
    let m, text = null, colour = null;
    if ((m = lessonRe.exec(e.text))) { const st = D.sets.find((x) => x.id === m[2]); if (!st) continue; colour = colourOf(subjOf(st).split(".").pop()); text = P.eLesson(m[1], st.title[lg] ?? st.title.de) + (/skill check passed/.test(e.text) ? `, ${P.eCheck(true)}` : /skill check not passed/.test(e.text) ? `, ${P.eCheck(false)}` : ""); }
    else if ((m = sessionRe.exec(e.text))) text = (P.eSession[m[1]] ?? m[1]) + (m[2] ? `, ${P.left}` : "");
    else if ((m = /^(\S+): \S+ → (can_do|remembered)$/.exec(e.text)) && PR.index.bySkill[m[1]]) { text = (m[2] === "remembered" ? P.eKept : P.eSecure)(setOfSkill(m[1])?.title[lg] ?? canDoOf(m[1])); colour = colourOf(subjOfSkill(m[1])); }
    if (text) lately.push({ day: e.day, text, colour });
  }
  const when = (d) => d === c.today ? P.today : d === c.today - 1 ? P.yesterday : dayName(d);
  const ICON = {
    recap: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
    together: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3 19c.6-3 2.6-5 5-5s4.4 2 5 5M13.5 19c.4-2.2 1.6-3.6 3-3.6s2.6 1.4 3 3.6"/>',
    today: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/><circle cx="12" cy="15" r="1.5" class="f"/>',
    next: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    streak: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
  };
  const bar = (r) => STATE_ORDER.filter((k) => r.counts[k]).map((k) => `<i style="flex:${r.counts[k]};background:${k === "not_started" ? "var(--pa-empty)" : `color-mix(in srgb, ${r.colour} ${STATE_MIX[k]}%, var(--panel))`}" data-tip="${esc(`${r.name}: ${P.states[k]}, ${r.counts[k]}`)}" tabindex="0" aria-label="${esc(`${P.states[k]}: ${r.counts[k]}`)}"></i>`).join("");

  el.innerHTML = `<div class="pa">
    <header class="pa-head">
      ${avatar(c, "lg")}
      <div><h1>${esc(P.week(c.name))}</h1><p>${esc(P.sub(yearName(c.year), CUR_NAME[c.curriculum][lg === "de" ? 0 : 1]))}</p></div>
      <span class="pa-updated">${esc(P.updated)}</span>
    </header>
    <p class="pa-summary">${esc(summary)}</p>
    <section class="pa-kpis">
      <div><b>${played}<small> ${esc(P.ofN(played, 5))}</small></b><span>${esc(P.kDays)}</span><span class="pa-dots">${Array.from({ length: 5 }, (_, i) => `<i class="${act.has(mon + i) ? "on" : mon + i > c.today ? "later" : ""}"></i>`).join("")}</span></div>
      <div><b>${week.l}</b><span>${esc(P.kLessons)}</span></div>
      <div><b>${week.s}</b><span>${esc(P.kSessions)}</span></div>
      <div><b>${secure}<small> ${esc(P.ofN(secure, skills))}</small></b><span>${esc(P.kSecure)}</span></div>
    </section>
    <div class="pa-grid">
      <div class="pa-main">
        <section class="pa-card">
          <h2>${esc(P.subjects)}</h2>
          <div class="pa-legend">${STATE_ORDER.map((k, i) => `<span><i style="background:${k === "not_started" ? "var(--pa-empty)" : `color-mix(in srgb, var(--ink) ${[85, 62, 40, 22][i]}%, var(--panel))`}"></i>${esc(P.states[k])}</span>`).join("")}</div>
          ${subj.map((r) => `<div class="pa-subj" style="--c:${r.colour}">
            <div class="pa-subj-top"><b><i></i>${esc(r.name)}</b><span>${esc(P.units(r.done, r.sets.length))}</span></div>
            <div class="pa-stack" role="img" aria-label="${esc(`${r.name}: ${STATE_ORDER.map((k) => `${P.states[k]} ${r.counts[k]}`).join(", ")}`)}">${bar(r)}</div>
            <p>${r.next ? `<span>${esc(P.now)}</span> ${esc(r.next.title[lg] ?? r.next.title.de)} <small>${esc(P.unit(r.sets.indexOf(r.next) + 1, r.sets.length))}</small>` : esc(P.allDone)}</p>
          </div>`).join("")}
        </section>
        <section class="pa-card">
          <h2>${esc(P.month)}</h2>
          <div class="pa-cal">${P.days.map((d) => `<small>${esc(d)}</small>`).join("")}
            ${weeks.map((m) => Array.from({ length: 5 }, (_, i) => cell(m + i)).join("")).join("")}</div>
          <div class="pa-legend"><span><i class="pa-sw on"></i>${esc(P.playedL)}</span><span><i class="pa-sw off"></i>${esc(P.missedL)}</span><span><i class="pa-sw today"></i>${esc(P.todayL)}</span></div>
        </section>
        <section class="pa-card">
          <h2>${esc(P.lately)}</h2>
          ${lately.length ? `<ol class="pa-feed">${lately.map((e) => `<li><time>${esc(when(e.day))}</time><i style="--c:${e.colour ?? "var(--muted)"}"></i><span>${esc(e.text)}</span></li>`).join("")}</ol>` : `<p class="pa-empty">${esc(P.nothing)}</p>`}
        </section>
      </div>
      <aside class="pa-side">
        <section class="pa-card pa-recs">
          <h2>${esc(P.recs)}</h2>
          ${recs.slice(0, 4).map((r, i) => `<div class="pa-rec"${r.colour ? ` style="--c:${r.colour}"` : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[r.icon]}</svg><div><b>${esc(r.t)}</b><p>${esc(r.w)}</p><button data-rec="${i}">${esc(P.open)}</button></div></div>`).join("")}
        </section>
        <section class="pa-card pa-rewards">
          <h2>${esc(P.rewards)}</h2>
          <div class="pa-rw">
            <div><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt=""><b>${s.current}</b><span>${esc(P.streak)}</span><small>${esc(P.best(s.best))}</small></div>
            <div><i>★</i><b>${allStars(c)}</b><span>${esc(P.stars)}</span></div>
            <div><img src="${A}badges/legend.svg" alt=""><b>${got.length}</b><span>${esc(P.badges)}</span></div>
          </div>
          <h3>${esc(P.recent)}</h3>
          ${got.length ? `<div class="pa-badges">${got.slice(0, 3).map((b) => `<span><img src="${A}badges/${b.id}${b.gold ? ".gold" : ""}.svg" alt="">${esc(badgeName(b.id))}</span>`).join("")}</div>` : `<p class="pa-empty">${esc(P.noBadge)}</p>`}
          <h3>${esc(P.next)}</h3>
          ${coming.map((b) => `<div class="pa-next"><img src="${A}badges/${b.id}.svg" alt=""><div><b>${esc(badgeName(b.id))}</b><i class="pa-bar"><i style="width:${b.need ? (100 * b.have) / b.need : 0}%"></i></i><small>${esc(T.ofN(b.have ?? 0, b.need ?? 1))}</small></div></div>`).join("")}
        </section>
      </aside>
    </div>
  </div><div class="pa-tip" role="tooltip" hidden></div>`;
  // Each suggestion opens the app on it.
  el.querySelectorAll("[data-rec]").forEach((b) => b.onclick = () => {
    const r = recs[+b.dataset.rec];
    if (r.lesson) { setView("lessons"); appTab("study"); startLesson(...r.lesson); return; }
    setView("practice"); appTab(r.tab ?? "practice"); r.go?.();
  });
  // One tooltip for every mark: the calendar's days and the skill bars.
  const tip = $(".pa-tip", el);
  const show = (t) => { const r = t.getBoundingClientRect(); tip.textContent = t.dataset.tip; tip.hidden = false; const w = tip.offsetWidth; tip.style.left = `${Math.min(innerWidth - w - 8, Math.max(8, r.left + r.width / 2 - w / 2))}px`; tip.style.top = `${r.top - tip.offsetHeight - 8}px`; };
  el.querySelectorAll("[data-tip]").forEach((t) => { t.onmouseenter = t.onfocus = () => show(t); t.onmouseleave = t.onblur = () => (tip.hidden = true); });
  el.onscroll = () => (tip.hidden = true);
}
