/* ---------- Parents: what a parent needs to know, and one thing to do ----------
   A view of its own beside App, Drawings and Task types. It reads the same
   pretend child as the app (PR.child), so demo data, lessons played and the
   time machine show here at once. Top to bottom: the week in a sentence, three
   numbers, what we noticed (each finding with its evidence and a button that
   sends that practice to the child's app), how each subject is going, what to
   praise, and the practice sent with how it went. The app behind it is silent.
   Inlined after app-ui.js. */
const PATXT = {
  de: {
    week: (n) => `${n}s Woche`, sub: (y, cur) => `${y} · ${cur}`, updated: "Stand heute",
    played: (n, a, b) => `${n} hat an ${a} von ${b} Schultagen gelernt`, none: (n) => `${n} hat diese Woche noch nicht gelernt`,
    mins: (m) => `, etwa ${m} Minuten`, needsN: (k) => k === 1 ? "Eine Sache braucht etwas Hilfe." : `${k} Sachen brauchen etwas Hilfe.`, allGood: "Gerade braucht nichts besondere Hilfe.",
    kDays: "Schultage gelernt", kMins: "Minuten diese Woche", kSecure: (n) => `Fähigkeiten, die ${n} kann`, ofN: (b) => `von ${b}`, about: "etwa",
    noticed: "Was uns aufgefallen ist", noticedSub: "Mit Beleg, das Wichtigste zuerst. Schicken Sie die passende Übung direkt in die App.",
    fCheck: (r, t) => `${r} von ${t} im Abschlusstest`, fCheckNo: "Abschlusstest noch nicht geschafft", fTricky: (p) => `Knifflig: ${p}`,
    fRefresh: "War schon sicher, jetzt wackelt es", fSlow: (n, xs) => `${n} ${n === 1 ? "Aufgabe" : "Aufgaben"} noch langsam oder falsch: ${xs}`,
    fRecapT: (n) => `${n} ${n === 1 ? "Fähigkeit" : "Fähigkeiten"} zum Auffrischen`, fRecapW: "Gelernt und sicher, jetzt Zeit für eine kurze Wiederholung, damit es bleibt.",
    fLeft: (n) => `${n} Übungsrunden diese Woche vorzeitig beendet`, fLeftW: "Vielleicht waren sie zu lang. Kürzere Runden helfen.",
    send: (n) => `An ${n} schicken`, sent: "Geschickt", noFindings: "Nichts Auffälliges. Alles, was geübt wurde, sitzt.",
    sendWhat: { "catch-up": "Übung mit Tipps, 10 Minuten", drill: "Sprint, 2 Minuten", recaps: "Kurze Wiederholung, 5 Minuten", mixed: "Gemischte Übung, 5 Minuten" },
    subjects: "Fächer", vGood: "Läuft gut", vHelp: "Braucht etwas Hilfe", vNew: "Noch nicht begonnen", vDone: "Jahr geschafft",
    units: (a, b) => `${a} von ${b} Einheiten`, now: "Gerade dran:",
    praise: "Dafür loben", praiseSub: "Diese Woche geschafft.", pSecure: (t) => `Kann jetzt: ${t}`, pKept: (t) => `Behält es: ${t}`, pRecord: (n) => `Neuer Rekord im Sprint: ${n} pro Minute`,
    pStreak: (n) => `${n} Tage in Folge gelernt`, pNone: "Diese Woche noch nichts Neues. Ein Lob fürs Dranbleiben hilft trotzdem.",
    sentH: "Geschickte Übungen", sentNone: "Noch nichts geschickt. Unter „Was uns aufgefallen ist“ geht das mit einem Tipp.",
    waiting: (d) => `Geschickt ${d}, wartet in der App`, doneOn: (d, r, t) => `Gemacht ${d}: ${r} von ${t} richtig`,
    rewards: "Belohnungen", streak: "Tage in Folge", stars: "Sterne", badges: "Abzeichen",
    today: "heute", yesterday: "gestern", dayFull: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"], on: "am",
  },
  en: {
    week: (n) => `${n}'s week`, sub: (y, cur) => `${y} · ${cur}`, updated: "As of today",
    played: (n, a, b) => `${n} learnt on ${a} of ${b} school days`, none: (n) => `${n} hasn't played yet this week`,
    mins: (m) => `, about ${m} minutes`, needsN: (k) => k === 1 ? "One thing needs a hand." : `${k} things need a hand.`, allGood: "Nothing needs extra help right now.",
    kDays: "School days played", kMins: "Minutes this week", kSecure: (n) => `Skills ${n} can do`, ofN: (b) => `of ${b}`, about: "about",
    noticed: "What we noticed", noticedSub: "With the evidence, most useful first. Send the right practice straight to the app.",
    fCheck: (r, t) => `${r} of ${t} on the skill check`, fCheckNo: "Skill check not passed yet", fTricky: (p) => `Tricky: ${p}`,
    fRefresh: "Was secure, now slipping", fSlow: (n, xs) => `${n} ${n === 1 ? "fact" : "facts"} still slow or wrong: ${xs}`,
    fRecapT: (n) => `${n} ${n === 1 ? "skill" : "skills"} due a refresh`, fRecapW: "Learnt and secure; a short review now makes it stick.",
    fLeft: (n) => `${n} practice sessions left early this week`, fLeftW: "They may have been too long. Shorter sessions help.",
    send: (n) => `Send to ${n}`, sent: "Sent", noFindings: "Nothing stands out. Everything practised has stuck.",
    sendWhat: { "catch-up": "Practice with hints, 10 minutes", drill: "Drill, 2 minutes", recaps: "Short review, 5 minutes", mixed: "Mixed practice, 5 minutes" },
    subjects: "Subjects", vGood: "Going well", vHelp: "Needs a hand", vNew: "Not started", vDone: "Year done",
    units: (a, b) => `${a} of ${b} units`, now: "Working on:",
    praise: "Praise this", praiseSub: "Done this week.", pSecure: (t) => `Can now do: ${t}`, pKept: (t) => `Remembers: ${t}`, pRecord: (n) => `New drill record: ${n} a minute`,
    pStreak: (n) => `${n} days in a row`, pNone: "Nothing new yet this week. Praise for keeping at it still helps.",
    sentH: "Practice you sent", sentNone: "Nothing sent yet. Under “What we noticed” it takes one tap.",
    waiting: (d) => `Sent ${d}, waiting in the app`, doneOn: (d, r, t) => `Done ${d}: ${r} of ${t} right`,
    rewards: "Rewards", streak: "Days in a row", stars: "Stars", badges: "Badges",
    today: "today", yesterday: "yesterday", dayFull: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], on: "on",
  },
};
const PA = () => PATXT[PL()];
const CUR_NAME = { "de-DE": ["Deutschland", "Germany"], "en-GB": ["England", "England"] };
const STATE_ORDER = ["remembered", "can_do", "practising", "learning", "not_started"];
const bucket = (s) => (s === "practised" || s === "needs_refresh" ? "practising" : s ?? "not_started");
const STATE_MIX = { remembered: 100, can_do: 72, practising: 46, learning: 26 };
const STATE_NAME = { de: { remembered: "Behält es", can_do: "Kann es", practising: "Übt noch", learning: "Lernt gerade", not_started: "Noch nicht begonnen" }, en: { remembered: "Remembers it", can_do: "Can do it", practising: "Still practising", learning: "Learning now", not_started: "Not started" } };
// Rough minutes for the week: a lesson takes its set's minutes, a drill 2, other practice 5 to 10.
const SESSION_MIN = { drill: 2, recaps: 5, mixed: 7, review: 8, "catch-up": 10, skill: 8 };

// What the parent sent: { id, kind, skills, minutes, title, day, done: { day, right, total } }.
// The child's app shows what is waiting first among its practice suggestions (mySuggestions).
function sendPractice(c, f) {
  (c.assigned ??= []).push({ id: `a${Date.now()}`, kind: f.send.kind, skills: f.send.skills, minutes: f.send.minutes, title: f.title, day: c.today, done: null });
  logEvent(c, `parent sent ${f.send.kind} practice (${f.send.skills.join(", ")})`);
  saveChild();
}

function renderParents() {
  const el = $("#parentsView"), c = appChild(), P = PA(), lg = PL(), subs = appSubjects();
  const mon = c.today - (((c.today % 7) + 7) % 7), act = new Set(c.active ?? []);
  const weekDays = Array.from({ length: 5 }, (_, i) => mon + i).filter((d) => d <= c.today);
  const log = c.log ?? [], thisWeek = log.filter((e) => e.day >= mon);
  const lessonRe = /^lesson (\d+) of (\S+) finished/, sessionRe = /^(\S+) session(, left early)?:/;
  const played = weekDays.filter((d) => act.has(d)).length;
  const minutes = thisWeek.reduce((n, e) => { let m; if ((m = lessonRe.exec(e.text))) return n + (D.sets.find((x) => x.id === m[2])?.minutes ?? 10); if ((m = sessionRe.exec(e.text))) return n + (m[2] ? 3 : SESSION_MIN[m[1]] ?? 6); return n; }, 0);
  const when = (d) => d === c.today ? P.today : d === c.today - 1 ? P.yesterday : `${P.on} ${P.dayFull[((d % 7) + 7) % 7]}`;
  const titleOf = (k) => setOfSkill(k)?.title?.[lg] ?? canDoOf(k);
  const sentFor = (skills) => (c.assigned ?? []).find((a) => !a.done && a.skills.join() === skills.join());

  // Findings, each with its evidence and the practice that answers it.
  const F = [];
  for (const s of PR.index.sets) {
    const st = c.states[s.skill]?.state; if (!st || !offered(subjOfSkill(s.skill))) continue;
    const last = s.lessons.at(-1)?.n, sc = c.scores?.[s.id]?.[last], tricky = (sc?.missed ?? []).map((id) => s.parts?.find((p) => p.id === id)?.what?.[lg]).filter(Boolean);
    if (st === "practised" && (lessonsDone(s) >= s.lessons.length))
      F.push({ sev: 3, subj: subjOfSkill(s.skill), title: s.title[lg] ?? s.title.de, ev: [sc ? P.fCheck(sc.right, sc.total) : P.fCheckNo, tricky.length ? P.fTricky(tricky.join("; ")) : ""].filter(Boolean), send: { kind: "catch-up", skills: [s.skill], minutes: 10 } });
    else if (st === "needs_refresh") F.push({ sev: 2, subj: subjOfSkill(s.skill), title: s.title[lg] ?? s.title.de, ev: [P.fRefresh], send: { kind: "catch-up", skills: [s.skill], minutes: 10 } });
  }
  for (const [k, d] of Object.entries(c.drills ?? {})) {
    if (!PR.index.drills[k] || !d.items) continue;
    const slow = Object.entries(d.items).filter(([, x]) => x.last === "miss" || x.last === "slow").map(([id]) => id);
    if (slow.length >= 3) F.push({ sev: 1, subj: subjOfSkill(k), title: titleOf(k), ev: [P.fSlow(slow.length, slow.slice(0, 4).join(", ") + (slow.length > 4 ? " …" : ""))], send: { kind: "drill", skills: [k], minutes: 2 } });
  }
  const due = recapsDue(c).filter((k) => PR.index.bySkill[k]);
  if (due.length) F.push({ sev: 1, subj: null, title: P.fRecapT(due.length), ev: [P.fRecapW, due.slice(0, 3).map(titleOf).join(", ")], send: { kind: "recaps", skills: due, minutes: 5 } });
  const left = thisWeek.filter((e) => /session, left early/.test(e.text)).length;
  if (left >= 2) F.push({ sev: 0, subj: null, title: P.fLeft(left), ev: [P.fLeftW], send: null });
  const findings = F.sort((a, b) => b.sev - a.sev).slice(0, 5);

  // Subjects: units done, the skills bar, and a plain verdict.
  const subj = subs.map((x) => {
    const sets = courseSets(x), done = sets.filter((s) => lessonsDone(s) >= s.lessons.length).length, next = nextIn(sets);
    const counts = Object.fromEntries(STATE_ORDER.map((k) => [k, 0]));
    for (const s of sets) counts[bucket(c.states[s.skill]?.state)]++;
    const tried = sets.length - counts.not_started, help = F.filter((f) => f.subj === x && f.sev >= 2).length;
    const verdict = !tried ? "vNew" : !next ? "vDone" : help >= 2 || counts.practising / tried > 0.25 ? "vHelp" : "vGood";
    return { x, name: SUBJ_NAME[c.curriculum][x] ?? x, colour: colourOf(x), sets, done, next, counts, verdict, secure: counts.remembered + counts.can_do };
  });
  const secure = subj.reduce((n, s) => n + s.secure, 0), skills = subj.reduce((n, s) => n + s.sets.length, 0);
  const needs = findings.filter((f) => f.sev >= 2).length;
  const summary = `${played ? P.played(c.name, played, weekDays.length) + (minutes ? P.mins(minutes) : "") : P.none(c.name)}. ${needs ? P.needsN(needs) : P.allGood}`;

  // Praise: skills that became secure this week, a drill record, the streak.
  const praise = [];
  for (const e of thisWeek) {
    let m;
    if ((m = /^(\S+): \S+ → (can_do|remembered)$/.exec(e.text)) && PR.index.bySkill[m[1]]) praise.push({ colour: colourOf(subjOfSkill(m[1])), text: (m[2] === "remembered" ? P.pKept : P.pSecure)(titleOf(m[1])) });
    else if ((m = /^drill session: (\d+) a minute, a new record/.exec(e.text))) praise.push({ colour: null, text: P.pRecord(m[1]) });
  }
  const s = streak(c);
  if (s.current >= 3) praise.push({ colour: null, text: P.pStreak(s.current) });
  const sent = [...(c.assigned ?? [])].reverse().slice(0, 6);
  const bar = (r) => STATE_ORDER.filter((k) => r.counts[k]).map((k) => `<i style="flex:${r.counts[k]};background:${k === "not_started" ? "var(--pa-empty)" : `color-mix(in srgb, ${r.colour} ${STATE_MIX[k]}%, var(--panel))`}" data-tip="${esc(`${r.name}: ${STATE_NAME[lg][k]}, ${r.counts[k]}`)}" tabindex="0" aria-label="${esc(`${STATE_NAME[lg][k]}: ${r.counts[k]}`)}"></i>`).join("");
  const finding = (f, i) => { const was = f.send && sentFor(f.send.skills);
    return `<li class="pa-find sev${f.sev}"${f.subj ? ` style="--c:${colourOf(f.subj)}"` : ""}>
      <div><b>${f.subj ? `<i></i>` : ""}${esc(f.title)}</b>${f.ev.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
      ${f.send ? `<div class="pa-send"><button data-send="${i}"${was ? " disabled" : ""}>${was ? `✓ ${esc(P.sent)}` : esc(P.send(c.name))}</button><small>${esc(P.sendWhat[f.send.kind] ?? "")}</small></div>` : ""}</li>`; };

  el.innerHTML = `<div class="pa">
    <header class="pa-head">
      ${avatar(c, "lg")}
      <div><h1>${esc(P.week(c.name))}</h1><p>${esc(P.sub(yearName(c.year), CUR_NAME[c.curriculum][lg === "de" ? 0 : 1]))}</p></div>
      <span class="pa-updated">${esc(P.updated)}</span>
    </header>
    <p class="pa-summary">${esc(summary)}</p>
    <section class="pa-kpis">
      <div><b>${played}<small> ${esc(P.ofN(5))}</small></b><span>${esc(P.kDays)}</span><span class="pa-dots">${Array.from({ length: 5 }, (_, i) => `<i class="${act.has(mon + i) ? "on" : mon + i > c.today ? "later" : ""}"></i>`).join("")}</span></div>
      <div><b><small>${esc(P.about)} </small>${minutes}</b><span>${esc(P.kMins)}</span></div>
      <div><b>${secure}<small> ${esc(P.ofN(skills))}</small></b><span>${esc(P.kSecure(c.name))}</span></div>
    </section>
    <div class="pa-grid">
      <div class="pa-main">
        <section class="pa-card">
          <h2>${esc(P.noticed)}</h2><p class="pa-lead">${esc(P.noticedSub)}</p>
          ${findings.length ? `<ol class="pa-finds">${findings.map(finding).join("")}</ol>` : `<p class="pa-empty">${esc(P.noFindings)}</p>`}
        </section>
        <section class="pa-card">
          <h2>${esc(P.subjects)}</h2>
          <div class="pa-legend">${STATE_ORDER.map((k, i) => `<span><i style="background:${k === "not_started" ? "var(--pa-empty)" : `color-mix(in srgb, var(--ink) ${[85, 62, 40, 22][i]}%, var(--panel))`}"></i>${esc(STATE_NAME[lg][k])}</span>`).join("")}</div>
          ${subj.map((r) => `<div class="pa-subj" style="--c:${r.colour}">
            <div class="pa-subj-top"><b><i></i>${esc(r.name)}</b><em class="pa-verdict ${r.verdict}">${esc(P[r.verdict])}</em><span>${esc(P.units(r.done, r.sets.length))}</span></div>
            <div class="pa-stack" role="img" aria-label="${esc(`${r.name}: ${STATE_ORDER.map((k) => `${STATE_NAME[lg][k]} ${r.counts[k]}`).join(", ")}`)}">${bar(r)}</div>
            ${r.next ? `<p><span>${esc(P.now)}</span> ${esc(r.next.title[lg] ?? r.next.title.de)}</p>` : ""}
          </div>`).join("")}
        </section>
      </div>
      <aside class="pa-side">
        <section class="pa-card">
          <h2>${esc(P.praise)}</h2><p class="pa-lead">${esc(P.praiseSub)}</p>
          ${praise.length ? `<ul class="pa-praise">${praise.slice(0, 5).map((p) => `<li${p.colour ? ` style="--c:${p.colour}"` : ""}><i>★</i>${esc(p.text)}</li>`).join("")}</ul>` : `<p class="pa-empty">${esc(P.pNone)}</p>`}
        </section>
        <section class="pa-card">
          <h2>${esc(P.sentH)}</h2>
          ${sent.length ? `<ul class="pa-sent">${sent.map((a) => `<li class="${a.done ? "done" : ""}"><b>${esc(a.title)}</b><small>${esc(a.done ? P.doneOn(when(a.done.day), a.done.right, a.done.total) : P.waiting(when(a.day)))}</small></li>`).join("")}</ul>` : `<p class="pa-empty">${esc(P.sentNone)}</p>`}
        </section>
        <section class="pa-card pa-rewards">
          <h2>${esc(P.rewards)}</h2>
          <div class="pa-rw">
            <div><img src="${A}badges/${s.current ? "flame" : "spark"}.svg" alt=""><b>${s.current}</b><span>${esc(P.streak)}</span></div>
            <div><i>★</i><b>${allStars(c)}</b><span>${esc(P.stars)}</span></div>
            <div><img src="${A}badges/legend.svg" alt=""><b>${myBadges().filter((b) => b.earned).length}</b><span>${esc(P.badges)}</span></div>
          </div>
        </section>
      </aside>
    </div>
  </div><div class="pa-tip" role="tooltip" hidden></div>`;
  el.querySelectorAll("[data-send]").forEach((b) => b.onclick = () => { sendPractice(c, findings[+b.dataset.send]); renderParents(); });
  // One tooltip for the skill bars.
  const tip = $(".pa-tip", el);
  const show = (t) => { const r = t.getBoundingClientRect(); tip.textContent = t.dataset.tip; tip.hidden = false; const w = tip.offsetWidth; tip.style.left = `${Math.min(innerWidth - w - 8, Math.max(8, r.left + r.width / 2 - w / 2))}px`; tip.style.top = `${r.top - tip.offsetHeight - 8}px`; };
  el.querySelectorAll("[data-tip]").forEach((t) => { t.onmouseenter = t.onfocus = () => show(t); t.onmouseleave = t.onblur = () => (tip.hidden = true); });
  el.onscroll = () => (tip.hidden = true);
}
