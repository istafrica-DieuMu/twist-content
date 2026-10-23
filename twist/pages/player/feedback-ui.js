/* ---------- Feedback: comments pinned to a point on an app screen ----------
   Served by twist/serve.mjs, the page asks /api/me who is signed in; opened
   as a file or anywhere without that server, none of this shows. Comment
   (or the c key) drops a pin on the phone, or a box when dragged: the comment
   keeps the screen (the lesson, its step and task id, or the app tab), the
   point or the box as fractions of the screen, and the part under the pin. Pins show on their screen to whoever
   may see them; reviewers get every comment in the top bar's Feedback menu
   and on the Feedback view, filtered by status, and open its screen from
   there. Managers and admins get the Users view. Rules: twist/docs/feedback.md.
   Inlined after side-ui.js; fbkInit() runs at the end of the page. */
const FBK = { me: null, list: [], pinning: false, showPins: true, showResolved: false, users: null, flash: null,
  f: { status: "open", author: "", kind: "", cur: "", q: "" } };
try { FBK.showPins = localStorage.getItem("twist-fb-pins") !== "0"; FBK.showResolved = localStorage.getItem("twist-fb-resolved") === "1"; } catch {}

async function fbkApi(method, path, body) {
  const r = await fetch("/api/" + path, { method, credentials: "same-origin", headers: { "X-Twist": "1", ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
  if (r.status === 401) { location.href = "/sign-in?next=" + encodeURIComponent(location.pathname + location.hash); throw new Error("Signed out"); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `The server answered ${r.status}.`);
  return j;
}
function fbkToast(msg, bad = false) {
  let t = $("#fbkToast"); if (!t) { t = document.createElement("div"); t.id = "fbkToast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.className = bad ? "bad" : ""; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 3500);
}
const fbkAgo = (iso) => { const s = (Date.now() - Date.parse(iso)) / 1000; if (!(s >= 0)) return ""; if (s < 60) return "just now"; if (s < 3600) return `${Math.floor(s / 60)} min ago`; if (s < 86400) return `${Math.floor(s / 3600)} h ago`; if (s < 7 * 86400) return `${Math.floor(s / 86400)} d ago`; return new Date(iso).toLocaleDateString(); };
const fbkCan = () => FBK.me?.can ?? {};
const fbkSeesOthers = () => fbkCan().seeAll || fbkCan().seeTeam;

/* ---------- which screen is open ---------- */
const FBK_STEP = { start: "Start", intro: "Activity starts", stage: "Stage change", checkIntro: "Check starts", end: "End" };
function fbkScreen() {
  const b = document.body.classList;
  if (["types", "drawn", "fbv", "usv"].some((c) => b.contains(c))) return null;
  const build = $("#built")?.textContent || undefined;
  if (b.contains("parents")) return { kind: "parents", label: "Parents view", build };
  if (b.contains("practice")) { const tab = APP.tab ?? "start"; return { kind: "app", tab: PR.on ? "practice-session" : tab, label: PR.on ? "App · a practice session" : `App · ${SIDE_NAME[tab] ?? tab}`, build }; }
  if (APP.home === "study") return { kind: "study", subj: APP.subj ?? undefined, tab: APP.units ? "units" : "track", label: `Study ${APP.units ? "unit list" : "track"} · ${SUBJ_NAME[PR.child.curriculum]?.[APP.subj] ?? APP.subj ?? ""}`, build };
  const s = steps?.[at]; if (!set || !lesson || !s) return null;
  const what = s.kind === "task" ? `${s.t.id} (${s.t.type})` : s.kind === "learn" ? `Learn screen ${s.i + 1}` : FBK_STEP[s.kind] ?? s.kind;
  return { kind: "lesson", set: set.id, setTitle: titleOf(set.title), curriculum: set.curriculum, language: set.language, lesson: lesson.n, step: at, stepKind: s.kind, task: s.t?.id, taskType: s.t?.type, label: `${titleOf(set.title)} · lesson ${lesson.n} · ${what}`, build };
}
// Two comments are on the same screen when these match; a lesson step is known by its task id, which survives reordering.
const fbkKey = (sc) => !sc ? "" : sc.kind === "lesson" ? `L|${sc.set}|${sc.lesson}|${sc.task ?? `${sc.stepKind}${sc.step}`}` : sc.kind === "app" ? `A|${sc.tab}` : sc.kind === "study" ? `S|${sc.subj}|${sc.tab}` : "P";
// Where pins sit: the phone's screen, or the Parents page.
function fbkSurface() {
  if (document.body.classList.contains("parents")) { const el = $("#parentsView > *"); return el ? { el, host: el } : null; }
  return { el: $("#screen"), host: $(".phone") };
}

/* ---------- pins on the open screen ---------- */
function fbkLayer() {
  const sf = fbkSurface(); if (!sf) return null;
  let layer = $("#fbkLayer");
  if (!layer) { layer = document.createElement("div"); layer.id = "fbkLayer"; layer.onpointerdown = fbkLayerDown; }
  if (layer.parentNode !== sf.host) sf.host.appendChild(layer);
  // Over the surface exactly: the phone's screen sits inside its frame's padding.
  const e = sf.el, inPhone = sf.host !== sf.el;
  Object.assign(layer.style, inPhone ? { left: e.offsetLeft + "px", top: e.offsetTop + "px", width: e.offsetWidth + "px", height: e.offsetHeight + "px", borderRadius: getComputedStyle(e).borderRadius } : { left: "0", top: "0", width: "100%", height: e.scrollHeight + "px", borderRadius: "0" });
  return layer;
}
function fbkRenderPins() {
  if (!FBK.me) return;
  const sc = fbkScreen(), layer = sc && fbkLayer();
  $("#fbkComment")?.toggleAttribute("disabled", !sc);
  if (!layer) { $("#fbkLayer")?.replaceChildren(); return; }
  layer.classList.toggle("pinning", FBK.pinning);
  const key = fbkKey(sc), here = FBK.list.filter((f) => fbkKey(f.screen) === key && (FBK.showResolved || f.status === "open" || f.id === FBK.flash));
  // The pin or box of a comment being written stays while the pins are drawn again around it.
  const writing = [...layer.querySelectorAll(".ghost")];
  layer.replaceChildren(...writing, ...(FBK.showPins || FBK.flash ? here : []).flatMap((f) => {
    const p = document.createElement("button");
    p.className = `fbk-pin ${f.status}${f.id === FBK.flash ? " flash" : ""}`; p.type = "button";
    p.style.left = f.pin.x * 100 + "%"; p.style.top = f.pin.y * 100 + "%";
    p.textContent = String(here.indexOf(f) + 1); p.dataset.id = f.id;
    p.title = `${f.author?.name ?? ""}: ${f.body}`; p.setAttribute("aria-label", `Comment by ${f.author?.name ?? "someone"}: ${f.body}`);
    p.onclick = (e) => { e.stopPropagation(); fbkCard(f, p); };
    if (!f.area) return [p];
    // An area comment: its box, with the number on its top-left corner; the pin lights the box up.
    const box = fbkBox(f.area, `fbk-area ${f.status}${f.id === FBK.flash ? " flash" : ""}`);
    p.classList.add("on-area");
    p.onpointerenter = () => box.classList.add("hot"); p.onpointerleave = () => box.classList.remove("hot");
    return [box, p];
  }));
  if (FBK.flash) { const p = layer.querySelector(".flash"); if (p) { const f = FBK.list.find((x) => x.id === FBK.flash); setTimeout(() => f && p.isConnected && fbkCard(f, p), 250); } FBK.flash = null; }
}
let fbkRaf = 0;
const fbkSoon = () => { cancelAnimationFrame(fbkRaf); fbkRaf = requestAnimationFrame(fbkRenderPins); };

/* ---------- dropping a pin ---------- */
function fbkPinMode(on = !FBK.pinning) {
  if (on && !fbkScreen()) return fbkToast("Open an app screen to comment on it.");
  FBK.pinning = on; document.body.classList.toggle("fbk-pinning", on);
  $("#fbkComment")?.setAttribute("aria-pressed", on);
  $("#fbkHint").hidden = !on; fbkClosePop(); fbkRenderPins();
}
const fbkBox = (a, cls) => { const b = document.createElement("div"); b.className = cls; Object.assign(b.style, { left: a.x * 100 + "%", top: a.y * 100 + "%", width: a.w * 100 + "%", height: a.h * 100 + "%" }); return b; };
// A part of the screen in words: "Button: Weiter", "Picture: apple".
const FBK_PART = "button, [role=button], .opt, img, svg, h1, h2, h3, p, li, label";
function fbkDescribe(el) {
  const pick = el.closest(FBK_PART) ?? el;
  const kind = pick.tagName === "IMG" ? "Picture" : pick.tagName === "svg" || pick.tagName === "SVG" ? "Drawing" : pick.matches("button, [role=button], .opt") ? (pick.matches(".opt") ? "Option card" : "Button") : /^H\d$/.test(pick.tagName) ? "Heading" : "Text";
  const text = (pick.getAttribute("aria-label") || pick.getAttribute("alt") || pick.textContent || "").replace(/\s+/g, " ").trim();
  return text ? `${kind}: ${text.length > 40 ? text.slice(0, 39) + "…" : text}` : kind;
}
// What the comment is about: the part under a pin, or the parts whose middle lies in an area (at most four).
function fbkTarget(r, layer) {
  const surface = fbkSurface()?.el; if (!surface) return null;
  if (!r.w) {
    layer.style.pointerEvents = "none"; const el = document.elementFromPoint(r.x, r.y); layer.style.pointerEvents = "";
    return el?.closest("#screen, #parentsView") ? { label: fbkDescribe(el) } : null;
  }
  const inside = [...surface.querySelectorAll(FBK_PART)].filter((el) => {
    const b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    return b.width && cx >= r.x && cx <= r.x + r.w && cy >= r.y && cy <= r.y + r.h;
  });
  // The outermost parts only: an option card, not also the text inside it.
  const outer = inside.filter((el) => !inside.some((o) => o !== el && o.contains(el)));
  const names = [...new Set(outer.map(fbkDescribe))];
  return { label: names.length ? `Area: ${names.slice(0, 4).join(", ")}${names.length > 4 ? ` and ${names.length - 4} more` : ""}` : "Area" };
}
// In Comment mode a press starts a pin; dragging past a few pixels makes it an area instead.
function fbkLayerDown(e) {
  if (!FBK.pinning || e.button !== 0) return;
  e.preventDefault();
  const layer = e.currentTarget, r = layer.getBoundingClientRect(), x0 = e.clientX, y0 = e.clientY;
  const frac = (cx, cy) => ({ x: Math.min(1, Math.max(0, (cx - r.left) / r.width)), y: Math.min(1, Math.max(0, (cy - r.top) / r.height)) });
  let box = null, last = e;
  layer.setPointerCapture(e.pointerId);
  const rectOf = (ev) => { const a = frac(x0, y0), b = frac(ev.clientX, ev.clientY); return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) }; };
  layer.onpointermove = (ev) => {
    last = ev;
    if (!box && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 6) return;
    if (!box) { box = fbkBox(rectOf(ev), "fbk-area open drawing"); layer.appendChild(box); }
    const a = rectOf(ev); Object.assign(box.style, { left: a.x * 100 + "%", top: a.y * 100 + "%", width: a.w * 100 + "%", height: a.h * 100 + "%" });
  };
  layer.onpointerup = layer.onpointercancel = (ev) => {
    layer.onpointermove = layer.onpointerup = layer.onpointercancel = null;
    box?.remove();
    if (ev.type === "pointercancel") return;
    const area = box ? rectOf(last) : null;
    // A box too thin to mean anything is a pin after all.
    if (area && (area.w < 0.02 || area.h < 0.02)) return fbkCompose(layer, { pin: frac(x0, y0), area: null }, { x: x0, y: y0 });
    if (area) {
      const rx = Math.min(x0, last.clientX), ry = Math.min(y0, last.clientY);
      return fbkCompose(layer, { pin: { x: area.x, y: area.y }, area }, { x: rx, y: ry, w: Math.abs(last.clientX - x0), h: Math.abs(last.clientY - y0) });
    }
    fbkCompose(layer, { pin: frac(x0, y0), area: null }, { x: x0, y: y0 });
  };
}
// Writing the comment for a pin or an area just placed.
function fbkCompose(layer, { pin, area }, screenRect) {
  const screen = fbkScreen(), target = fbkTarget(screenRect, layer);
  fbkPinMode(false);
  const marks = [];
  if (area) { const b = fbkBox(area, "fbk-area open ghost"); layer.appendChild(b); marks.push(b); }
  const ghost = document.createElement("span"); ghost.className = `fbk-pin open ghost${area ? " on-area" : ""}`; ghost.style.left = pin.x * 100 + "%"; ghost.style.top = pin.y * 100 + "%"; layer.appendChild(ghost); marks.push(ghost);
  const pop = fbkPop(area ? marks[0] : ghost, `<form class="fbk-compose"><div class="fbk-where"><b>${esc(screen.label)}</b>${target ? `<small>${esc(target.label)}</small>` : ""}</div>
    <textarea name="body" rows="4" maxlength="4000" required placeholder="${area ? "What is wrong or could be better in this area?" : "What is wrong or could be better here?"}"></textarea>
    <div class="fbk-row"><small>${fbkSeesOthers() ? "Everyone who reviews feedback sees this." : "Reviewers see this; other testers do not."}</small><span><button type="button" class="nbtn" data-x>Cancel</button><button class="nbtn fbk-go">Save</button></span></div></form>`, () => marks.forEach((m) => m.remove()));
  const form = $("form", pop), ta = $("textarea", pop); ta.focus();
  ta.onkeydown = (k) => { if (k.key === "Enter" && (k.metaKey || k.ctrlKey)) form.requestSubmit(); };
  $("[data-x]", pop).onclick = fbkClosePop;
  form.onsubmit = async (ev) => {
    ev.preventDefault(); const btn = $(".fbk-go", pop); btn.disabled = true;
    try { const { feedback } = await fbkApi("POST", "feedback", { screen, pin, area, target, body: ta.value }); FBK.list.unshift(feedback); fbkClosePop(); fbkRefreshAll(); fbkToast("Comment saved."); }
    catch (err) { btn.disabled = false; fbkToast(err.message, true); }
  };
}

/* ---------- pop-overs: the composer and a comment's card ---------- */
function fbkClosePop() { const p = $("#fbkPop"); if (p) { p._onClose?.(); p.remove(); } }
function fbkPop(anchor, html, onClose) {
  fbkClosePop();
  const p = document.createElement("div"); p.id = "fbkPop"; p.className = "fbk-pop"; p.innerHTML = html; p._onClose = onClose;
  document.body.appendChild(p);
  const a = anchor.getBoundingClientRect(), w = p.offsetWidth, h = p.offsetHeight;
  let left = a.right + 10, top = a.top - 12;
  if (left + w > innerWidth - 8) left = a.left - w - 10;
  if (left < 8) { left = Math.max(8, Math.min(innerWidth - w - 8, a.left - w / 2)); top = a.bottom + 10; }
  p.style.left = left + "px"; p.style.top = Math.max(8, Math.min(innerHeight - h - 8, top)) + "px";
  return p;
}
document.addEventListener("mousedown", (e) => { const p = $("#fbkPop"); if (p && !p.contains(e.target) && !e.target.closest(".fbk-pin")) fbkClosePop(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { fbkClosePop(); if (FBK.pinning) fbkPinMode(false); }
  if (FBK.me && (e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.closest("input,select,textarea,[contenteditable]")) fbkPinMode();
});
// One comment: what it says, where, who, the thread, and what this person may do with it.
function fbkThread(f, { jump = false } = {}) {
  const c = f.can ?? {};
  return `<div class="fbk-card" data-id="${esc(f.id)}">
    <div class="fbk-meta"><span class="fbk-st ${f.status}">${f.status === "open" ? "Open" : "Resolved"}</span><b>${esc(f.author?.name ?? "Someone")}</b><small>${esc(fbkAgo(f.createdAt))}</small></div>
    <p class="fbk-where"><b>${esc(f.screen?.label ?? "")}</b>${f.target ? `<small>${esc(f.target.label)}</small>` : ""}</p>
    <div class="fbk-body" data-body>${esc(f.body)}</div>
    ${f.status === "resolved" && f.resolvedBy ? `<p class="fbk-small">Resolved by ${esc(f.resolvedBy.name)} ${esc(fbkAgo(f.resolvedAt))}</p>` : ""}
    ${(f.replies ?? []).map((r) => `<div class="fbk-reply"><div class="fbk-meta"><b>${esc(r.author?.name ?? "")}</b><small>${esc(fbkAgo(r.createdAt))}</small></div><div class="fbk-body">${esc(r.body)}</div></div>`).join("")}
    <form class="fbk-replyform"><textarea rows="1" maxlength="2000" placeholder="Reply …" required></textarea><button class="nbtn">Reply</button></form>
    <div class="fbk-actions">${jump ? `<button class="nbtn fbk-go" data-act="jump">Open the screen</button>` : ""}${c.resolve ? `<button class="nbtn" data-act="${f.status === "open" ? "resolve" : "reopen"}">${f.status === "open" ? "Resolve" : "Reopen"}</button>` : ""}${c.edit ? `<button class="nbtn" data-act="edit">Edit</button>` : ""}<button class="nbtn" data-act="link" title="Copy a link that opens this comment on its screen">Copy link</button>${c.delete ? `<button class="nbtn fbk-del" data-act="delete">Delete</button>` : ""}</div>
  </div>`;
}
function fbkWire(root, f, after) {
  const card = root.querySelector(`.fbk-card[data-id="${CSS.escape(f.id)}"]`) ?? root; if (!card) return;
  const swap = (nf) => { const i = FBK.list.findIndex((x) => x.id === nf.id); if (i >= 0) FBK.list[i] = nf; else FBK.list.unshift(nf); fbkRefreshAll(); after?.(nf); };
  const rf = $(".fbk-replyform", card);
  rf.onsubmit = async (e) => { e.preventDefault(); const ta = $("textarea", rf); try { swap((await fbkApi("POST", `feedback/${encodeURIComponent(f.id)}/replies`, { body: ta.value })).feedback); } catch (err) { fbkToast(err.message, true); } };
  card.querySelectorAll("[data-act]").forEach((b) => b.onclick = async () => {
    const act = b.dataset.act;
    try {
      if (act === "jump") return fbkOpen(f);
      if (act === "link") { await navigator.clipboard.writeText(`${location.origin}${location.pathname}#fb=${encodeURIComponent(f.id)}`); return fbkToast("Link copied."); }
      if (act === "resolve" || act === "reopen") return swap((await fbkApi("PATCH", `feedback/${encodeURIComponent(f.id)}`, { status: act === "resolve" ? "resolved" : "open" })).feedback);
      if (act === "edit") {
        const body = $("[data-body]", card); body.innerHTML = `<textarea rows="3" maxlength="4000">${esc(f.body)}</textarea>`; const ta = $("textarea", body); ta.focus();
        b.textContent = "Save"; b.dataset.act = "save"; b.onclick = async () => { try { swap((await fbkApi("PATCH", `feedback/${encodeURIComponent(f.id)}`, { body: ta.value })).feedback); } catch (err) { fbkToast(err.message, true); } };
        return;
      }
      // Delete asks once, in place: the button turns into the question.
      if (act === "delete") { b.textContent = "Delete for good?"; b.dataset.act = "really"; return; }
      if (act === "really") { await fbkApi("DELETE", `feedback/${encodeURIComponent(f.id)}`); FBK.list = FBK.list.filter((x) => x.id !== f.id); fbkClosePop(); fbkRefreshAll(); fbkToast("Comment deleted."); }
    } catch (err) { fbkToast(err.message, true); }
  });
}
function fbkCard(f, anchor) {
  const p = fbkPop(anchor, fbkThread(f));
  // After a reply or a status change the card opens again, fresh, on its pin.
  fbkWire(p, f, (nf) => { if ($("#fbkPop") !== p) return; const pin = $(`.fbk-pin[data-id="${CSS.escape(nf.id)}"]`); if (pin) fbkCard(nf, pin); else fbkClosePop(); });
}

/* ---------- opening a comment's screen ---------- */
function fbkOpen(f) {
  const sc = f.screen; fbkClosePop();
  FBK.flash = f.id;
  if (sc.kind === "lesson") {
    const i = D.sets.findIndex((s) => s.id === sc.set);
    if (i < 0) { FBK.flash = null; return fbkToast("That lesson is not in this build any more.", true); }
    APP.home = "study"; setView("lessons"); APP.home = null; APP.fromApp = false;
    pickSet(i, sc.lesson);
    const j = sc.task ? steps.findIndex((s) => s.t?.id === sc.task) : -1;
    go(j >= 0 ? j : sc.step ?? 0);
  } else if (sc.kind === "study") { APP.subj = sc.subj ?? APP.subj; APP.units = sc.tab === "units"; appTab("study", { keep: true }); }
  else if (sc.kind === "app") appTab(sc.tab === "practice-session" ? "practice" : sc.tab);
  else if (sc.kind === "parents") setView("parents");
  fbkSoon();
}
async function fbkOpenHash() {
  const id = new URLSearchParams(location.hash.slice(1)).get("fb"); if (!id) return;
  let f = FBK.list.find((x) => x.id === id);
  if (!f) try { f = (await fbkApi("GET", `feedback/${encodeURIComponent(id)}`)).feedback; } catch (e) { return fbkToast(e.message, true); }
  fbkOpen(f);
}

/* ---------- the top bar: Comment, the Feedback menu, the account ---------- */
const fbkOpenCount = () => FBK.list.filter((f) => f.status === "open").length;
function fbkRenderBar() {
  const n = fbkOpenCount(), badge = $("#fbkCount"); badge.textContent = n ? String(n) : ""; badge.hidden = !n;
  $("#vFeedback .fbk-n").textContent = n ? ` ${n}` : "";
  const menu = $("#fbkMenu"); if (menu.hidden) return;
  const open = FBK.list.filter((f) => f.status === "open").slice(0, 12);
  menu.innerHTML = `<div class="pl" style="margin-top:0">${fbkSeesOthers() ? "Open feedback" : "Your open feedback"}</div>
    ${open.length ? `<ul class="fbk-menu">${open.map((f) => `<li><button data-id="${esc(f.id)}"><b>${esc(f.screen?.label ?? "")}</b><span>${esc(f.body.length > 90 ? f.body.slice(0, 89) + "…" : f.body)}</span><small>${esc(f.author?.name ?? "")} · ${esc(fbkAgo(f.createdAt))}${f.replies?.length ? ` · ${f.replies.length} ${f.replies.length === 1 ? "reply" : "replies"}` : ""}</small></button></li>`).join("")}</ul>` : `<p class="pn">Nothing open. Press Comment, or c, then click the screen to leave some.</p>`}
    <label class="tg"><input type="checkbox" id="fbkPins"${FBK.showPins ? " checked" : ""}> Show pins on the screen</label>
    <label class="tg"><input type="checkbox" id="fbkRes"${FBK.showResolved ? " checked" : ""}> Include resolved pins</label>
    <button class="nbtn" id="fbkAll" type="button">All feedback, with filters</button>`;
  menu.querySelectorAll("[data-id]").forEach((b) => b.onclick = () => { toggle($("#fbkInbox"), menu, false); const f = FBK.list.find((x) => x.id === b.dataset.id); if (f) fbkOpen(f); });
  $("#fbkPins").onchange = (e) => { FBK.showPins = e.target.checked; try { localStorage.setItem("twist-fb-pins", FBK.showPins ? "1" : "0"); } catch {} fbkRenderPins(); };
  $("#fbkRes").onchange = (e) => { FBK.showResolved = e.target.checked; try { localStorage.setItem("twist-fb-resolved", FBK.showResolved ? "1" : "0"); } catch {} fbkRenderPins(); };
  $("#fbkAll").onclick = () => { toggle($("#fbkInbox"), menu, false); setView("feedback"); };
}
function fbkRenderAccount() {
  const m = FBK.me, pop = $("#fbkMePop");
  $("#fbkMe .fbk-who").textContent = m.user.name;
  pop.innerHTML = `<div><b>${esc(m.user.name)}</b><p class="pn">${esc(m.user.email)} · ${esc(m.roleName)}</p></div>
    <div class="pl">Change your password</div>
    <form id="fbkPw" class="fbk-form"><input type="password" name="current" autocomplete="current-password" placeholder="Current password" required><input type="password" name="next" autocomplete="new-password" placeholder="New password, at least ${m.minPassword} characters" minlength="${m.minPassword}" required><button class="nbtn">Change password</button></form>
    <form method="post" action="/auth/sign-out"><button class="nbtn">Sign out</button></form>`;
  $("#fbkPw").onsubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    try { await fbkApi("POST", "me/password", { current: fd.get("current"), next: fd.get("next") }); e.target.reset(); fbkToast("Password changed."); } catch (err) { fbkToast(err.message, true); }
  };
}
function fbkRefreshAll() {
  fbkRenderBar(); fbkRenderPins();
  if (document.body.classList.contains("fbv")) fbkRenderView();
}
async function fbkLoad() {
  try { FBK.list = (await fbkApi("GET", "feedback?status=all")).feedback; fbkRefreshAll(); } catch (e) { if (e.message !== "Signed out") fbkToast(e.message, true); }
}

/* ---------- the Feedback view: every comment this person may see ---------- */
function fbkRenderView() {
  const v = $("#feedbackView"), F2 = FBK.f;
  const authors = [...new Map(FBK.list.map((f) => [f.author?.id, f.author?.name])).entries()].filter(([id]) => id).sort((a, b) => String(a[1]).localeCompare(String(b[1])));
  const q = F2.q.trim().toLowerCase();
  const shown = FBK.list.filter((f) => (F2.status === "all" || f.status === F2.status) && (!F2.author || f.author?.id === F2.author) && (!F2.kind || f.screen?.kind === F2.kind) && (!F2.cur || f.screen?.curriculum === F2.cur)
    && (!q || [f.body, f.screen?.label, f.target?.label, f.author?.name, f.screen?.task, ...(f.replies ?? []).map((r) => r.body)].some((s) => String(s ?? "").toLowerCase().includes(q))));
  const count = (st) => FBK.list.filter((f) => st === "all" || f.status === st).length;
  const keepFocus = document.activeElement?.id === "fbkQ";
  v.innerHTML = `<div class="fbk-page">
    <header class="fbk-head"><div><h1>${fbkSeesOthers() ? "Feedback" : "Your feedback"}</h1><p>${fbkCan().seeAll ? "Every comment left on an app screen." : fbkCan().seeTeam ? "Your comments and those of the testers you added." : "The comments you left. Reviewers see them too."} Open the screen to see what a comment points at.</p></div>
      <button class="nbtn" id="fbkReload" type="button">Refresh</button></header>
    <div class="fbk-filters">
      <span class="sx-seg" role="group" aria-label="Status">${["open", "resolved", "all"].map((st) => `<button class="nbtn" data-st="${st}" aria-pressed="${F2.status === st}">${{ open: "Open", resolved: "Resolved", all: "All" }[st]} <small>${count(st)}</small></button>`).join("")}</span>
      <input id="fbkQ" type="search" placeholder="Search comments, screens, task ids …" value="${esc(F2.q)}" aria-label="Search feedback">
      ${fbkSeesOthers() ? `<select id="fbkAuthor" aria-label="Who"><option value="">Everyone</option>${authors.map(([id, n]) => `<option value="${esc(id)}"${id === F2.author ? " selected" : ""}>${esc(n)}</option>`).join("")}</select>` : ""}
      <select id="fbkKind" aria-label="Screen"><option value="">Every screen</option>${[["lesson", "Lessons"], ["app", "App tabs"], ["study", "Study track"], ["parents", "Parents view"]].map(([k, n]) => `<option value="${k}"${k === F2.kind ? " selected" : ""}>${n}</option>`).join("")}</select>
      <select id="fbkCur" aria-label="Curriculum"><option value="">Both curricula</option>${["de-DE", "en-GB"].map((c) => `<option${c === F2.cur ? " selected" : ""}>${c}</option>`).join("")}</select>
    </div>
    <p class="fbk-small">${shown.length} of ${FBK.list.length}</p>
    <div class="fbk-list">${shown.length ? shown.map((f) => fbkThread(f, { jump: true })).join("") : `<p class="fbk-empty">No feedback matches.</p>`}</div></div>`;
  shown.forEach((f) => fbkWire(v, f));
  v.querySelectorAll("[data-st]").forEach((b) => b.onclick = () => { F2.status = b.dataset.st; fbkRenderView(); });
  $("#fbkQ", v).oninput = (e) => { F2.q = e.target.value; fbkRenderView(); };
  if (keepFocus) { const i = $("#fbkQ", v); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  if ($("#fbkAuthor", v)) $("#fbkAuthor", v).onchange = (e) => { F2.author = e.target.value; fbkRenderView(); };
  $("#fbkKind", v).onchange = (e) => { F2.kind = e.target.value; fbkRenderView(); };
  $("#fbkCur", v).onchange = (e) => { F2.cur = e.target.value; fbkRenderView(); };
  $("#fbkReload", v).onclick = fbkLoad;
}

/* ---------- the Users view: accounts this person looks after ---------- */
const fbkNewPassword = () => { const a = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789", b = crypto.getRandomValues(new Uint32Array(14)); return [...b].map((x) => a[x % a.length]).join(""); };
async function fbkRenderUsers() {
  const v = $("#usersView");
  try { FBK.users = await fbkApi("GET", "users"); } catch (e) { v.innerHTML = `<div class="fbk-page"><p class="fbk-empty">${esc(e.message)}</p></div>`; return; }
  const U = FBK.users, roleSel = (cur, name = "role") => `<select name="${name}"${U.grantable.length < 2 ? " disabled" : ""}>${U.grantable.map((r) => `<option value="${r}"${r === cur ? " selected" : ""}>${esc(U.roleNames[r])}</option>`).join("")}</select>`;
  const byId = Object.fromEntries(FBK.list.map((f) => [f.author?.id, 0]));
  FBK.list.forEach((f) => { if (f.author?.id in byId) byId[f.author.id]++; });
  v.innerHTML = `<div class="fbk-page">
    <header class="fbk-head"><div><h1>Users</h1><p>${fbkCan().manageAll ? "Every account. Admins can give any role." : "The testers you added. You can add more, reset their passwords and switch them off."} Passwords need at least ${U.minPassword} characters; pass a new one on yourself, it is shown here only once.</p></div></header>
    ${FBK.added ? `<p class="fbk-added" role="status">Added ${esc(FBK.added.name)}. Pass this password on: <code>${esc(FBK.added.pw)}</code> <button class="nbtn" data-ok>Done</button></p>` : ""}
    <form class="fbk-adduser" id="fbkAdd"><b>Add someone</b>
      <input name="name" placeholder="Name" required minlength="2"><input name="email" type="email" placeholder="Email" required>
      ${roleSel("tester")}<span class="fbk-pwrow"><input name="password" placeholder="Password" required minlength="${U.minPassword}" autocomplete="new-password"><button type="button" class="nbtn" data-gen>Make one</button></span>
      <button class="nbtn fbk-go">Add</button></form>
    <table class="fbk-users"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Can sign in</th><th>Feedback</th><th></th></tr></thead><tbody>
    ${U.users.length ? U.users.map((a) => `<tr data-id="${esc(a.id)}"><td>${esc(a.name)}</td><td>${esc(a.email)}</td><td>${roleSel(a.role)}</td>
      <td><label class="tg"><input type="checkbox" data-active${a.active ? " checked" : ""}> ${a.active ? "Yes" : "Switched off"}</label></td>
      <td>${byId[a.id] ? `<button class="nbtn" data-see>${byId[a.id]} comment${byId[a.id] === 1 ? "" : "s"}</button>` : `<span class="fbk-small">None</span>`}</td>
      <td class="fbk-acts"><button class="nbtn" data-reset>Reset password</button><button class="nbtn fbk-del" data-del>Delete</button></td></tr>`).join("") : `<tr><td colspan="6" class="fbk-empty">Nobody yet. Add someone above.</td></tr>`}
    </tbody></table></div>`;
  const add = $("#fbkAdd", v);
  $("[data-gen]", add).onclick = () => { add.password.value = fbkNewPassword(); };
  add.onsubmit = async (e) => {
    e.preventDefault(); const fd = new FormData(add), pw = fd.get("password");
    try { await fbkApi("POST", "users", { name: fd.get("name"), email: fd.get("email"), role: fd.get("role") ?? "tester", password: pw }); FBK.added = { name: fd.get("name"), pw }; fbkRenderUsers(); } catch (err) { fbkToast(err.message, true); }
  };
  $("[data-ok]", v)?.addEventListener("click", () => { FBK.added = null; fbkRenderUsers(); });
  v.querySelectorAll("tr[data-id]").forEach((tr) => {
    const id = tr.dataset.id, a = U.users.find((x) => x.id === id), path = `users/${encodeURIComponent(id)}`;
    const patch = async (body) => { try { await fbkApi("PATCH", path, body); fbkToast("Saved."); fbkRenderUsers(); } catch (err) { fbkToast(err.message, true); fbkRenderUsers(); } };
    $("select[name=role]", tr).onchange = (e) => patch({ role: e.target.value });
    $("[data-active]", tr).onchange = (e) => patch({ active: e.target.checked });
    $("[data-see]", tr)?.addEventListener("click", () => { Object.assign(FBK.f, { author: id, status: "all" }); setView("feedback"); });
    $("[data-reset]", tr).onclick = () => {
      const cell = $(".fbk-acts", tr), pw = fbkNewPassword();
      cell.innerHTML = `<span class="fbk-pwrow"><input value="${pw}" minlength="${U.minPassword}" aria-label="New password for ${esc(a.name)}"><button class="nbtn fbk-go" data-set>Set</button><button class="nbtn" data-x>Cancel</button></span>`;
      $("[data-x]", cell).onclick = fbkRenderUsers;
      $("[data-set]", cell).onclick = async () => { const val = $("input", cell).value; try { await fbkApi("POST", `${path}/password`, { password: val }); cell.innerHTML = `<span class="fbk-small">New password: <code>${esc(val)}</code></span> <button class="nbtn" data-x>Done</button>`; $("[data-x]", cell).onclick = fbkRenderUsers; } catch (err) { fbkToast(err.message, true); } };
    };
    $("[data-del]", tr).onclick = async (e) => {
      const b = e.currentTarget; if (b.dataset.sure !== "1") { b.dataset.sure = "1"; b.textContent = `Delete ${a.name}?`; return; }
      try { await fbkApi("DELETE", path); fbkToast("Deleted."); fbkRenderUsers(); } catch (err) { fbkToast(err.message, true); }
    };
  });
}

/* ---------- views, and starting up ---------- */
// Called by setView: the Feedback and Users views sit beside Drawings, Task types and Parents.
function fbkSetView(v) {
  const fv = v === "feedback", uv = v === "users";
  document.body.classList.toggle("fbv", fv); document.body.classList.toggle("usv", uv);
  $("#feedbackView").hidden = !fv; $("#usersView").hidden = !uv;
  $("#vFeedback")?.setAttribute("aria-selected", fv); $("#vUsers")?.setAttribute("aria-selected", uv);
  if (fv || uv) { stopAudio(); fbkPinMode(false); }
  if (fv) fbkRenderView();
  if (uv) fbkRenderUsers();
  fbkSoon();
}
async function fbkInit() {
  try { const r = await fetch("/api/me", { credentials: "same-origin" }); if (!r.ok) return; FBK.me = await r.json(); } catch { return; }
  document.body.classList.add("fbk-on");
  $("#fbkBar").hidden = false; $("#vFeedback").hidden = false; $("#vUsers").hidden = !FBK.me.can.manageUsers;
  $("#fbkComment").onclick = () => fbkPinMode();
  $("#fbkInbox").onclick = () => { toggle($("#fbkInbox"), $("#fbkMenu")); fbkRenderBar(); };
  $("#fbkMe").onclick = () => toggle($("#fbkMe"), $("#fbkMePop"));
  $("#vFeedback").onclick = () => setView("feedback");
  $("#vUsers").onclick = () => setView("users");
  document.addEventListener("click", (e) => {
    if (!e.target.isConnected) return;
    if (!$("#fbkMenu").hidden && !e.target.closest("#fbkMenu,#fbkInbox")) toggle($("#fbkInbox"), $("#fbkMenu"), false);
    if (!$("#fbkMePop").hidden && !e.target.closest("#fbkMePop,#fbkMe")) toggle($("#fbkMe"), $("#fbkMePop"), false);
  });
  fbkRenderAccount();
  // Pins follow the screen: every render replaces the screen's children, and views switch by body class.
  new MutationObserver(fbkSoon).observe($("#screen"), { childList: true });
  new MutationObserver(fbkSoon).observe($("#parentsView"), { childList: true });
  new MutationObserver(fbkSoon).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("resize", fbkSoon);
  window.addEventListener("hashchange", fbkOpenHash);
  await fbkLoad(); fbkOpenHash();
  // Others' new comments arrive while the page is open.
  setInterval(() => { if (!document.hidden) fbkLoad(); }, 60_000);
}
