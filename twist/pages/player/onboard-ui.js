/* ---------- Onboarding: a grown-up sets the device up, then hands it to the child ----------
   The app's first run (ist-schoolido app/onboarding.tsx, qr-scanner.tsx,
   child-select.tsx), redrawn for who is holding the phone. The grown-up part
   says where the QR code is, explains the camera before asking for it, has a
   code to type when the camera is off, and settles the child's class and a
   reminder while the grown-up is still there. Then a handoff screen, and the
   child part is spoken (the browser's voice in the preview): hello, a picture,
   one try at a task (tap, then Check), and straight into the first lesson.
   Logging out comes back here, to the sign-in. Inlined after anim-ui.js. */
const OB = { on: false, step: "welcome", camera: "allow", signedOut: false, wrong: 0, pick: null, said: null, o: null };
const OB_GROWN = ["welcome", "signin", "child", "handoff"];
const OB_STEPS = ["welcome", "signin", "scan", "code", "child", "handoff", "hello", "avatar", "try", "first"];
const OBTXT = {
  de: {
    welcome: "Willkommen bei Twist", welcomeSub: "Mathe, Deutsch und Englisch für Kinder von 6 bis 10, ein paar Minuten am Tag.",
    grownNote: "Ein Erwachsener richtet Twist einmal kurz ein. Danach gehört es deinem Kind.", setUp: "Einrichten",
    signin: "Mit dem Eltern-Konto verbinden", signedOut: "Dieses Gerät wurde abgemeldet. Verbinde es noch einmal mit dem Eltern-Konto.",
    where: ["Öffne dein Eltern-Konto auf twist-learning.com.", "Tippe auf „Gerät verbinden“.", "Scanne den Code, der dort erscheint."],
    camNote: "Twist braucht die Kamera nur für diesen Code.", scan: "QR-Code scannen", typeCode: "Code eingeben", noAccount: "Noch kein Eltern-Konto? Auf twist-learning.com anlegen.",
    scanHint: "Halte die Kamera auf den Code im Eltern-Konto.", scanTap: "Tippe auf den Rahmen, um einen Code zu scannen (Vorschau).",
    camOff: "Die Kamera ist aus", camOffSub: "Erlaube Twist die Kamera in den Einstellungen des Geräts, oder gib den Code ein.", openSettings: "Einstellungen öffnen",
    code: "Code eingeben", codeSub: "Den 6-stelligen Code findest du im Eltern-Konto unter „Gerät verbinden“.", connect: "Verbinden",
    connected: "Verbunden!", child: "Wer lernt auf diesem Gerät?", childSub: "Diese Kinder sind in deinem Eltern-Konto.",
    classWrong: "Stimmt die Klasse?", remind: "Tägliche Erinnerung", remindSub: (t) => `Eine Mitteilung um ${t} Uhr, an Schultagen`, done: "Fertig",
    handoff: (n) => `Alles bereit! Gib das Gerät jetzt ${n}.`, iAm: (n) => `Ich bin ${n}!`, back: "Zurück",
    hello: (n) => `Hallo ${n}! Ich bin dein Lernfreund. Wir lernen zusammen, jeden Tag ein bisschen.`, hi: "Hallo!",
    avatar: "Such dir ein Bild aus. Das bist dann du!", itsMe: "Das bin ich!",
    try: "Tippe auf die Drei. Dann drück auf Prüfen.", check: "Prüfen", nums: { 2: "die Zwei", 3: "die Drei", 5: "die Fünf" },
    wrong: (x) => `Das ist ${x}. Die Drei hat drei Punkte. Probier's nochmal!`, right: "Super! So geht jede Aufgabe: tippen, dann prüfen.", yay: "Richtig!", next: "Weiter",
    first: "Deine erste Lektion wartet schon. Los geht's!", firstAgain: "Deine nächste Lektion wartet schon. Los geht's!", go: "Los geht's", look: "Erst umschauen", lessonOf: (k, n) => `Lektion ${k} von ${n}`, mins: (m) => `etwa ${m} Minuten`,
    say: "Nochmal hören",
  },
  en: {
    welcome: "Welcome to Twist", welcomeSub: "Maths, English and French for children aged 5 to 11, a few minutes a day.",
    grownNote: "A grown-up sets Twist up once. After that it's your child's.", setUp: "Set up",
    signin: "Connect your parent account", signedOut: "This device was signed out. Connect it to the parent account again.",
    where: ["Open your parent account at twist-learning.com.", "Tap “Connect a device”.", "Scan the code that appears there."],
    camNote: "Twist only uses the camera for this code.", scan: "Scan QR code", typeCode: "Type the code", noAccount: "No parent account yet? Create one at twist-learning.com.",
    scanHint: "Point the camera at the code in your parent account.", scanTap: "Tap the frame to scan a code (preview).",
    camOff: "The camera is off", camOffSub: "Let Twist use the camera in the device's settings, or type the code.", openSettings: "Open Settings",
    code: "Type the code", codeSub: "You'll find the 6-character code in your parent account under “Connect a device”.", connect: "Connect",
    connected: "Connected!", child: "Who learns on this device?", childSub: "These children are in your parent account.",
    classWrong: "Is the year right?", remind: "Daily reminder", remindSub: (t) => `A notification at ${t}, on school days`, done: "Done",
    handoff: (n) => `All set! Now hand the device to ${n}.`, iAm: (n) => `I'm ${n}!`, back: "Back",
    hello: (n) => `Hi ${n}! I'm your learning buddy. We'll learn together, a little every day.`, hi: "Hi!",
    avatar: "Pick a picture. That's you!", itsMe: "That's me!",
    try: "Tap the three. Then press Check.", check: "Check", nums: { 2: "the two", 3: "the three", 5: "the five" },
    wrong: (x) => `That's ${x}. Three has three dots. Try again!`, right: "Great! Every task works like this: tap, then check.", yay: "That's right!", next: "Next",
    first: "Your first lesson is ready. Let's go!", firstAgain: "Your next lesson is ready. Let's go!", go: "Let's go", look: "Look around first", lessonOf: (k, n) => `Lesson ${k} of ${n}`, mins: (m) => `about ${m} minutes`,
    say: "Hear it again",
  },
};
const OT = () => OBTXT[PL()];
const OB_DOTS = { 2: "●●", 3: "●●●", 5: "●●●●●" };
const OB_QR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2zM16 16h2v2h-2z"/></svg>';
const OB_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

// Start the onboarding: from the welcome, or ({ signedOut }) at the sign-in after a log-out.
function onboarding({ signedOut = false } = {}) {
  appChild(); stopAudio();
  OB.o?.remove();
  Object.assign(OB, { on: true, step: signedOut ? "signin" : "welcome", signedOut, wrong: 0, pick: null, said: null });
  OB.o = overlay("ob");
  obRender(); renderPracticeSide();
}
function obGo(step) { OB.step = step; OB.wrong = 0; OB.pick = null; speechSynthesis?.cancel?.(); obRender(); renderPracticeSide(); }
function obEnd(then) {
  OB.on = false; speechSynthesis?.cancel?.();
  try { localStorage.setItem("twist-onboarded", "1"); } catch {}
  const o = OB.o; OB.o = null; o?.classList.add("out"); setTimeout(() => o?.remove(), 300);
  then?.(); renderPracticeSide();
}
// The child's screens speak: the browser's clearest voice for the language, a little slower.
function obSay(text, always = false) {
  if (!("speechSynthesis" in window) || (!always && !$("#auto")?.checked)) return;
  const code = PL() === "de" ? "de-DE" : "en-GB", vs = speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith(code.slice(0, 2)));
  const u = new SpeechSynthesisUtterance(text); u.lang = code; u.rate = 0.9;
  u.voice = vs.find((v) => /premium|enhanced|natural|google/i.test(v.name)) ?? vs.find((v) => v.lang.replace("_", "-") === code) ?? vs[0] ?? null;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

function obRender() {
  const T = OT(), c = PR.child, o = OB.o, s = OB.step, kid = OB_STEPS.indexOf(s) >= OB_STEPS.indexOf("hello");
  const g = OB_GROWN.indexOf({ scan: "signin", code: "signin" }[s] ?? s);
  const dots = g < 0 ? "" : `<div class="ob-dots" aria-label="${g + 1} / ${OB_GROWN.length}">${OB_GROWN.map((_, i) => `<i${i === g ? ' class="on"' : ""}></i>`).join("")}</div>`;
  const hero = (pose, h, sub) => `<div class="ob-arc"><img src="${A}mascot/${pose}.png" alt=""></div><h2>${esc(h)}</h2>${sub ? `<p>${esc(sub)}</p>` : ""}`;
  const bubble = (line) => `<div class="ob-say"><img src="${A}mascot/${s === "try" ? "learn-1" : "start-1"}.png" alt=""><div class="bubbleq"><span class="t">${esc(line)}</span><button class="spk" data-say aria-label="${esc(T.say)}">${SPK}</button></div></div>`;
  let body = "", foot = "", line = "";
  o.className = `an-over ob is-${s}${kid ? " kid" : " grown"}`;
  if (s === "welcome") {
    body = hero("start-1", T.welcome, T.welcomeSub) + `<p class="ob-note">${esc(T.grownNote)}</p>`;
    foot = `<button class="btn" data-to="signin">${esc(T.setUp)}</button>`;
  } else if (s === "signin") {
    body = hero("check-1", T.signin, OB.signedOut ? T.signedOut : "") + `<ol class="ob-where">${T.where.map((w) => `<li>${esc(w)}</li>`).join("")}</ol><p class="ob-note">${esc(T.camNote)}</p>`;
    foot = `<button class="btn ob-ico" data-to="scan">${OB_QR}${esc(T.scan)}</button><button class="btn light" data-to="code">${esc(T.typeCode)}</button><small class="ob-small">${esc(T.noAccount)}</small>`;
  } else if (s === "scan") {
    body = `<button class="ob-close" data-to="signin" aria-label="${esc(T.back)}">${OB_X}</button>` + (OB.camera === "allow"
      ? `<div class="ob-cam"><button class="ob-frame" aria-label="${esc(T.scan)}"><i></i></button><p>${esc(T.scanHint)}</p><small>${esc(T.scanTap)}</small><button class="btn light ob-alt" data-to="code">${esc(T.typeCode)}</button></div>`
      : `<div class="ob-cam off"><div class="ob-camoff"><b>${esc(T.camOff)}</b><span>${esc(T.camOffSub)}</span><button class="btn" data-settings>${esc(T.openSettings)}</button><button class="btn light" data-to="code">${esc(T.typeCode)}</button></div></div>`);
  } else if (s === "code") {
    body = `<button class="ob-close" data-to="signin" aria-label="${esc(T.back)}">${OB_X}</button><h2>${esc(T.code)}</h2><p>${esc(T.codeSub)}</p>
      <label class="ob-code"><input id="obCode" maxlength="6" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" aria-label="${esc(T.code)}"><span aria-hidden="true">${"<i></i>".repeat(6)}</span></label>`;
    foot = `<button class="btn" id="obConnect" disabled>${esc(T.connect)}</button>`;
  } else if (s === "child") {
    body = `<h2>${esc(T.child)}</h2><p>${esc(T.childSub)}</p>
      <div class="ob-kid">${avatar(c, "xl")}<span><b>${esc(c.name)}</b><small>${esc(yearName(c.year))} · ${esc(c.curriculum === "de-DE" ? "Deutschland" : "England")}</small></span></div>
      <label class="ob-row"><span>${esc(T.classWrong)}</span><select id="obYear">${YEAR_OF(c.curriculum).map((y) => `<option value="${esc(y)}"${y === c.year ? " selected" : ""}>${esc(yearName(y))}</option>`).join("")}</select></label>
      <label class="ob-row ob-sw"><span><b>${esc(T.remind)}</b><small>${esc(T.remindSub("16:00"))}</small></span><input type="checkbox" role="switch" id="obRemind"${pref("twist-reminders", true) ? " checked" : ""}><i aria-hidden="true"></i></label>
`;
    foot = `<button class="btn" data-to="handoff">${esc(T.done)}</button>`;
  } else if (s === "handoff") {
    body = `<div class="ob-hand">${avatar(c, "xl")}</div><h2>${esc(T.handoff(c.name))}</h2>`;
    foot = `<button class="btn" data-to="hello">${esc(T.iAm(c.name))}</button><button class="btn light" data-to="child">${esc(T.back)}</button>`;
  } else if (s === "hello") {
    line = T.hello(c.name);
    body = `<img class="ob-big" src="${A}mascot/start-2.png" alt=""><div class="bubbleq ob-line"><span class="t">${esc(line)}</span><button class="spk" data-say aria-label="${esc(T.say)}">${SPK}</button></div>`;
    foot = `<button class="btn" data-to="avatar">${esc(T.hi)}</button>`;
  } else if (s === "avatar") {
    const a = c.avatar ?? {};
    line = T.avatar;
    body = bubble(line) + `<div class="ob-me">${avatar(c, "xl")}</div>
      <div class="ob-poses" role="radiogroup" aria-label="${esc(T.avatar)}">${AV_POSES.slice(0, 6).map((p) => `<button role="radio" aria-checked="${!a.photo && (a.pose ?? "start-1") === p}" data-pose="${p}" style="--av:${esc(a.bg ?? AV_BG[0])}"><img src="${A}mascot/${p}.png" alt=""></button>`).join("")}</div>
      <div class="ob-bgs" role="radiogroup">${AV_BG.map((b) => `<button role="radio" aria-checked="${(a.bg ?? AV_BG[0]) === b}" data-bg="${b}" style="--av:${b}" aria-label="${b}"></button>`).join("")}</div>`;
    foot = `<button class="btn" data-to="try">${esc(T.itsMe)}</button>`;
  } else if (s === "try") {
    line = OB.wrong ? T.wrong(T.nums[OB.wrongPick]) : T.try;
    body = bubble(line) + `<div class="opts ob-opts">${[5, 3, 2].map((n) => `<button class="opt${OB.pick === n ? " sel" : ""}${OB.wrong && OB.wrongPick === n ? " bad" : ""}${OB.wrong > 1 && n === 3 ? " ob-hint" : ""}" data-n="${n}"><span>${n}</span><small>${OB_DOTS[n]}</small></button>`).join("")}</div>`;
    foot = `<button class="btn" id="obCheck"${OB.pick ? "" : " disabled"}>${esc(T.check)}</button>`;
  } else if (s === "first") {
    const p = homePlan(), st = nextIn(p.sets), l = st?.lessons[lessonsDone(st)], lg = PL();
    line = Object.keys(c.lessons ?? {}).length ? T.firstAgain : T.first;
    body = bubble(line) + (st ? `<button class="ob-lesson" data-first style="--c:${colourOf(p.subj)}"><img src="${A}mascot/${st.pose ?? "start-2"}.png" alt="">
        <small>${esc(SUBJ_NAME[c.curriculum][p.subj] ?? p.subj)} · ${esc(T.lessonOf(l.n, st.lessons.length))}</small><b>${esc(l.title[lg] ?? l.title.de)}</b><span>${esc(T.mins(st.minutes ?? 10))}</span></button>` : "");
    foot = `<button class="btn" data-first>${esc(T.go)}</button><button class="btn light" data-look-around>${esc(T.look)}</button>`;
  }
  o.innerHTML = `<div class="status"></div><div class="ob-body">${body}</div><div class="ob-foot">${foot}${dots}</div>`;
  obWire(o, line);
}

function obWire(o, line) {
  const T = OT(), c = PR.child, on = (sel, f) => o.querySelectorAll(sel).forEach((b) => b.onclick = f);
  on("[data-to]", (e) => obGo(e.currentTarget.dataset.to));
  on("[data-say]", () => obSay(line, true));
  if (line && line !== OB.said) { OB.said = line; setTimeout(() => OB.o === o && obSay(line), 400); }
  on(".ob-frame", () => { sfx("piece-locked"); buzz(30); o.querySelector(".ob-cam").classList.add("got"); o.querySelector(".ob-cam p").textContent = T.connected; setTimeout(() => OB.step === "scan" && obGo("child"), 900); });
  on("[data-settings]", () => { OB.camera = "allow"; obRender(); renderPracticeSide(); });
  const code = o.querySelector("#obCode");
  if (code) {
    const boxes = o.querySelectorAll(".ob-code i");
    const show = () => { code.value = code.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6); boxes.forEach((b, i) => { b.textContent = code.value[i] ?? ""; b.classList.toggle("at", i === code.value.length); }); o.querySelector("#obConnect").disabled = code.value.length < 6; };
    code.oninput = show; show(); setTimeout(() => code.focus({ preventScroll: true }), 50);
    on("#obConnect", () => { sfx("piece-locked"); obGo("child"); });
  }
  const yr = o.querySelector("#obYear");
  if (yr) yr.onchange = () => { c.year = yr.value; const st = D.sets.find((x) => x.year === c.year && x.id.startsWith(c.curriculum + ".")); c.band = ageBand(st?.ages); saveChild(); obRender(); renderPracticeSide(); };
  const rm = o.querySelector("#obRemind"); if (rm) rm.onchange = () => setPref("twist-reminders", rm.checked);
  on("[data-pose]", (e) => { c.avatar = { pose: e.currentTarget.dataset.pose, bg: c.avatar?.bg ?? AV_BG[0] }; saveChild(); sfx("option-picked"); obRender(); });
  on("[data-bg]", (e) => { c.avatar = { pose: c.avatar?.pose ?? "start-1", bg: e.currentTarget.dataset.bg }; saveChild(); sfx("option-picked"); obRender(); });
  // The try: a wrong pick is marked and named, the second miss lights up the three; the right one gets the green sheet.
  on(".ob-opts .opt", (e) => { OB.pick = +e.currentTarget.dataset.n; sfx("option-picked"); buzz(8); o.querySelectorAll(".ob-opts .opt").forEach((b) => b.classList.toggle("sel", +b.dataset.n === OB.pick)); o.querySelector("#obCheck").disabled = false; });
  on("#obCheck", () => {
    if (OB.pick !== 3) { OB.wrong++; OB.wrongPick = OB.pick; OB.pick = null; sfx("try-again"); return obRender(); }
    sfx("answer-correct"); buzz(20);
    o.querySelectorAll(".ob-opts .opt").forEach((b) => { b.classList.remove("bad", "ob-hint", "sel"); b.classList.toggle("good", b.dataset.n === "3"); b.disabled = true; });
    o.querySelector(".ob-say .t").textContent = T.right;
    const sh = document.createElement("div"); sh.className = "sheet ok";
    sh.innerHTML = `<div class="msg">${esc(T.yay)}</div><button class="btn">${esc(T.next)}</button>`;
    o.querySelector(".ob-foot").replaceChildren(sh); obSay(T.right);
    sh.querySelector(".btn").onclick = () => obGo("first");
  });
  on("[data-first]", () => obEnd(() => { const p = homePlan(), st = nextIn(p.sets); appTab("start"); if (st) startLesson(st.id, st.lessons[Math.min(lessonsDone(st), st.lessons.length - 1)].n); }));
  on("[data-look-around]", () => obEnd(() => appTab("start")));
}
// The preview's Settings menu (top right) starts it again.
document.getElementById("replayOnboard")?.addEventListener("click", () => { appTab("start"); onboarding(); });
