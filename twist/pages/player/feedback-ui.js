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
try { FBK.showResolved = localStorage.getItem("twist-fb-resolved") === "1"; } catch {}
// Seeing the comments on the screen, on or off: each person's own choice, kept in this browser.
const fbkPinsKey = () => `twist-fb-pins:${FBK.me?.user?.id ?? ""}`;
function fbkShowPins(on, save = true) {
  FBK.showPins = on;
  if (save) try { localStorage.setItem(fbkPinsKey(), on ? "1" : "0"); } catch {}
  const b = $("#fbkPinsBtn"); if (b) { b.setAttribute("aria-pressed", on); b.title = `${on ? "Hide" : "Show"} the comments on the screen (h)`; }
  if ($("#fbkPins")) $("#fbkPins").checked = on;
  if (!on && FBK.openId) fbkClosePop();
  fbkRenderPins();
}

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
// Drawings and Task types: everyone above tester, and everyone when the page runs without serve.mjs.
const fbkTools = () => !FBK.me || !!fbkCan().tools;

/* ---------- which screen is open ---------- */
const FBK_STEP = { start: "Start", intro: "Activity starts", stage: "Stage change", checkIntro: "Check starts", end: "End" };
function fbkScreen() {
  const b = document.body.classList;
  if (["types", "drawn", "sources", "fbv", "usv"].some((c) => b.contains(c))) return null;
  const build = $("#built")?.textContent || undefined;
  if (b.contains("parents")) return { kind: "parents", label: "Parents Lab", build };
  if (b.contains("practice")) { const tab = APP.tab ?? "start"; return { kind: "app", tab: PR.on ? "practice-session" : tab, label: PR.on ? "App · a practice session" : `App · ${SIDE_NAME[tab] ?? tab}`, build }; }
  if (APP.home === "study") return { kind: "study", subj: APP.subj ?? undefined, tab: APP.units ? "units" : "track", label: `Study ${APP.units ? "unit list" : "track"} · ${SUBJ_NAME[PR.child.curriculum]?.[APP.subj] ?? APP.subj ?? ""}`, build };
  const s = steps?.[at]; if (!set || !lesson || !s) return null;
  const what = s.kind === "task" ? `${s.t.id} (${s.t.type})` : s.kind === "learn" ? `Learn screen ${s.i + 1}` : FBK_STEP[s.kind] ?? s.kind;
  return { kind: "lesson", set: set.id, setTitle: titleOf(set.title), curriculum: set.curriculum, language: set.language, lesson: lesson.n, step: at, stepKind: s.kind, task: s.t?.id, taskType: s.t?.type, place: s.t ? undefined : fbkStepPlace(s), label: `${titleOf(set.title)} · lesson ${lesson.n} · ${what}`, build };
}
// A lesson step that is not a task, known by its place in its activity, so tasks added or moved
// before it do not move its comments: learn2 (Learn screen 3), intro:fluency, stage:fluency:1.
const fbkStepPlace = (s) => s.kind === "learn" ? `learn${s.i}` : s.kind === "stage" ? `stage:${s.a.activity}:${s.si}` : s.kind === "intro" || s.kind === "checkIntro" ? `${s.kind}:${s.a.activity}` : s.kind;
// A lesson step by its task id or its place. Comments from before places: a Learn screen's number is in
// the label, Start and End are one each; the rest are known by their step number (fbkKeys).
const fbkStepKey = (sc) => sc.task ?? sc.place ?? (sc.stepKind === "learn" && /Learn screen (\d+)$/.test(sc.label) ? `learn${+sc.label.match(/(\d+)$/)[1] - 1}` : sc.stepKind === "start" || sc.stepKind === "end" ? sc.stepKind : `${sc.stepKind}${sc.step}`);
// Two comments are on the same screen when these match.
const fbkKey = (sc) => !sc ? "" : sc.kind === "lesson" ? `L|${sc.set}|${sc.lesson}|${fbkStepKey(sc)}` : sc.kind === "app" ? `A|${sc.tab}` : sc.kind === "study" ? `S|${sc.subj}|${sc.tab}` : "P";
// The keys of the open screen: its own, and on a lesson step its old one by step number, for comments from before places.
const fbkKeys = (sc) => new Set([fbkKey(sc), ...(sc?.kind === "lesson" && !sc.task ? [fbkKey({ ...sc, place: undefined, label: "" })] : [])]);
// Where pins sit: the phone's screen, or the Parents Lab. The Lab is a page in a frame (same
// origin): its document is the root the pins anchor in, and its parts' boxes are moved by the
// frame's place on the page (fbkOff, fbkElAt).
function fbkSurface() {
  if (document.body.classList.contains("parents")) {
    const el = $("#parentsView iframe"), doc = el?.contentDocument;
    if (!doc?.body?.firstElementChild) return null;
    // Pins ride along when the Lab scrolls or reflows: its scroll does not reach this page.
    if (!doc._fbk) { doc._fbk = true; doc.addEventListener("scroll", fbkPlaceSoon, { capture: true, passive: true }); el.contentWindow.addEventListener("resize", fbkSoon); }
    return { el, host: $("#parentsView"), doc, root: doc.body };
  }
  return { el: $("#screen"), host: $(".phone") };
}
const fbkOff = (el) => { if (!el || el.ownerDocument === document) return { x: 0, y: 0 }; const f = $("#parentsView iframe")?.getBoundingClientRect(); return { x: f?.left ?? 0, y: f?.top ?? 0 }; };
// The part at a point on this page, inside the Lab's frame when that is the surface.
function fbkElAt(x, y, layer) {
  const sf = fbkSurface();
  if (sf?.doc) { const f = sf.el.getBoundingClientRect(); return sf.doc.elementFromPoint(x - f.left, y - f.top); }
  layer.style.pointerEvents = "none"; const el = document.elementFromPoint(x, y); layer.style.pointerEvents = ""; return el;
}

/* ---------- pins on the open screen ---------- */
function fbkLayer() {
  const sf = fbkSurface(); if (!sf) return null;
  let layer = $("#fbkLayer");
  if (!layer) { layer = document.createElement("div"); layer.id = "fbkLayer"; layer.onpointerdown = fbkLayerDown; layer.addEventListener("wheel", fbkWheel, { passive: false }); }
  if (layer.parentNode !== sf.host) sf.host.appendChild(layer);
  // Over the surface exactly: the phone's screen sits inside its frame's padding.
  const e = sf.el, inPhone = sf.host !== sf.el;
  Object.assign(layer.style, inPhone ? { left: e.offsetLeft + "px", top: e.offsetTop + "px", width: e.offsetWidth + "px", height: e.offsetHeight + "px", borderRadius: getComputedStyle(e).borderRadius } : { left: "0", top: "0", width: "100%", height: e.scrollHeight + "px", borderRadius: "0" });
  return layer;
}
function fbkRenderPins() {
  if (!FBK.me) return;
  FBK_FOUND.clear();
  const sc = fbkScreen(), layer = sc && fbkLayer();
  $("#fbkComment")?.toggleAttribute("disabled", !sc);
  if (!layer) { $("#fbkLayer")?.replaceChildren(); return; }
  layer.classList.toggle("pinning", FBK.pinning);
  const keys = fbkKeys(sc), here = FBK.list.filter((f) => keys.has(fbkKey(f.screen)) && (FBK.showResolved || f.status === "open" || f.id === FBK.flash));
  // The pin or box of a comment being written stays while the pins are drawn again around it.
  const writing = [...layer.querySelectorAll(".ghost")];
  // Comments whose part is not on the screen now gather in the tray in the screen's corner (fbkPlace).
  const tray = document.createElement("button"); tray.type = "button"; tray.className = "fbk-tray"; tray.hidden = true;
  tray.onclick = (e) => { e.stopPropagation(); fbkTrayCard(tray); };
  layer.replaceChildren(...writing, tray, ...(FBK.showPins || FBK.flash ? here : []).flatMap((f) => {
    const p = document.createElement("button");
    p.className = `fbk-pin ${f.status}${f.id === FBK.flash ? " flash" : ""}`; p.type = "button"; p._f = f;
    p.textContent = String(here.indexOf(f) + 1); p.dataset.id = f.id;
    p.title = `${f.author?.name ?? ""}: ${f.body}`; p.setAttribute("aria-label", `Comment by ${f.author?.name ?? "someone"}: ${f.body}`);
    p.onclick = (e) => { e.stopPropagation(); fbkCard(f, p); };
    if (!f.area) return [p];
    // An area comment: its box, with the number on its top-left corner; the pin lights the box up.
    // The box shows only while its comment is open, or its number is pointed at: one at a time.
    const box = fbkBox(f.area, `fbk-area ${f.status}${f.id === FBK.flash ? " flash" : ""}${f.id === FBK.openId ? " shown" : ""}`); box._f = f;
    p.classList.add("on-area");
    p.onpointerenter = () => box.classList.add("hot"); p.onpointerleave = () => box.classList.remove("hot");
    return [box, p];
  }));
  fbkPlace(layer);
  if (FBK.flash) {
    const p = layer.querySelector(".fbk-pin.flash"), f = p?._f;
    // Opened from a link: the part it is on scrolls into view first.
    if (f) { fbkFind(f.screen.anchor)?.scrollIntoView({ block: "center", inline: "center" }); fbkPlace(layer); setTimeout(() => p.isConnected && fbkCard(f, fbkMarkOf(f.id) ?? p), 250); }
    FBK.flash = null;
  }
  // Cards on the app's tabs slide in after a render: place the pins again once they have landed.
  clearTimeout(fbkRenderPins._t); fbkRenderPins._t = setTimeout(() => fbkPlace(), 450);
}
let fbkRaf = 0, fbkPlaceRaf = 0;
const fbkSoon = () => { cancelAnimationFrame(fbkRaf); fbkRaf = requestAnimationFrame(fbkRenderPins); };
const fbkPlaceSoon = () => { cancelAnimationFrame(fbkPlaceRaf); fbkPlaceRaf = requestAnimationFrame(() => fbkPlace()); };

/* ---------- anchors: a pin stays on the part it was dropped on ----------
   The app's screens scroll inside the phone, and the cards on Start and
   Practice change with the child. So a comment keeps the part of the screen
   it was dropped on (screen.anchor: its place in the screen, its text, and
   the pin or box as fractions of that part), and its pin follows that part
   as it scrolls, and survives small content and UI changes (fbkFind). A
   part may show only in some states of the app (an answer checked, a hint
   open, a card for this child), so a part that is not found is not taken
   for another: its comment waits in the tray in the screen's corner, comes
   back to its part when that shows again, and can be pinned anew there.
   Comments from before anchors sit on the screen's frame as before. */
const fbkRoot = () => { const sf = fbkSurface(); return sf?.root ?? sf?.el; };
const fbkText = (el) => (el.getAttribute("aria-label") || el.getAttribute("alt") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
const fbkScrolls = (el) => { const cs = el.ownerDocument.defaultView.getComputedStyle(el); return /auto|scroll/.test(cs.overflowY + cs.overflowX) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1); };
// A part's box in screen pixels; a scrolling part's box is its whole content, which moves as it scrolls.
function fbkRectOf(el) {
  const b = el.getBoundingClientRect(), o = fbkOff(el);
  if (!fbkScrolls(el)) return { left: b.left + o.x, top: b.top + o.y, width: b.width, height: b.height };
  const k = b.width / (el.offsetWidth || 1);
  return { left: b.left + o.x - el.scrollLeft * k, top: b.top + o.y - el.scrollTop * k, width: el.scrollWidth * k, height: el.scrollHeight * k };
}
// Its place in the screen, the way querySelector finds it again: div:nth-of-type(2)>button:nth-of-type(1).
function fbkPath(el, root) {
  const p = [];
  for (let e = el; e && e !== root; e = e.parentElement) p.unshift(`${e.tagName.toLowerCase()}:nth-of-type(${[...e.parentElement.children].filter((c) => c.tagName === e.tagName).indexOf(e) + 1})`);
  return p.join(">");
}
// How alike two texts are: the share of their words in common, 0 to 1.
const fbkWords = (t) => new Set(String(t ?? "").toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []);
function fbkLike(a, b) { const x = fbkWords(a), y = fbkWords(b); if (!x.size && !y.size) return 1; let n = 0; for (const w of x) if (y.has(w)) n++; return n / (x.size + y.size - n); }
// Parts found, so a scroll does not search the screen again; emptied when the pins are drawn again.
const FBK_FOUND = new Map();
// The part again: at its place with its text; moved, by its text, the first part of its kind with it;
// edited in place, the part of its kind at its place with at least half its words. Anything looser
// could take a part from another state of the screen for it, so otherwise null: not on the screen now.
function fbkFind(a) {
  const root = fbkRoot(); if (!a || !root) return null;
  const hit = FBK_FOUND.get(a); if (hit?.isConnected && root.contains(hit)) return hit;
  let at = null; try { at = a.path ? root.querySelector(":scope>" + a.path) : null; } catch {}
  let el = at && (!a.text || fbkText(at) === a.text) ? at : null;
  if (!el && a.text) {
    const kind = a.path?.split(">").pop().replace(/:nth-of-type\(\d+\)$/, "");
    el = [...root.querySelectorAll(kind || "*")].find((e) => fbkText(e) === a.text) ?? (at && fbkLike(a.text, fbkText(at)) >= 0.5 ? at : null);
  }
  if (el) FBK_FOUND.set(a, el);
  return el;
}
// The anchor of a pin at a point, or of a box: the part under the point, or the smallest part holding the whole box.
function fbkAnchorAt(r, layer) {
  const root = fbkRoot(); if (!root) return null;
  const cx = r.w ? r.x + r.w / 2 : r.x, cy = r.h ? r.y + r.h / 2 : r.y;
  let el = fbkElAt(cx, cy, layer);
  if (!el || el === root || !root.contains(el)) return null;
  if (!r.w) el = el.closest(FBK_PART) ?? el;
  const holds = (b) => b.left <= r.x + 1 && b.top <= r.y + 1 && b.left + b.width >= r.x + (r.w ?? 0) - 1 && b.top + b.height >= r.y + (r.h ?? 0) - 1;
  while (el && el !== root && !holds(fbkRectOf(el))) el = el.parentElement;
  if (!el || el === root) return null;
  const b = fbkRectOf(el), fx = (v) => Math.min(1, Math.max(0, v)), x = fx((r.x - b.left) / b.width), y = fx((r.y - b.top) / b.height);
  const path = fbkPath(el, root); if (path.length > 400 || path.split(">").length > 40) return null;
  return { path, text: fbkText(el), x, y, ...(r.w ? { w: fx(r.w / b.width), h: fx(r.h / b.height) } : {}) };
}
// Puts every pin and box on its part; hides those whose part is gone or scrolled out of sight.
function fbkPlace(layer = $("#fbkLayer")) {
  const root = fbkRoot(); if (!layer?.isConnected || !root) return;
  const L = layer.getBoundingClientRect(), k = layer.offsetWidth / (L.width || 1), away = [];
  for (const m of layer.children) {
    const f = m._f; if (!f) continue;
    const a = f.screen?.anchor, el = a && fbkFind(a), isBox = m.classList.contains("fbk-area");
    let x, y, w = 0, h = 0, clip = { l: 0, t: 0, r: layer.offsetWidth, b: layer.offsetHeight };
    // Its part is not on the screen now: the comment waits in the tray.
    if (a && !el) { m.style.visibility = "hidden"; if (!isBox) away.push(f); continue; }
    if (el) {
      const b = fbkRectOf(el);
      x = (b.left - L.left + a.x * b.width) * k; y = (b.top - L.top + a.y * b.height) * k;
      if (f.area) { w = (a.w ?? 0) * b.width * k; h = (a.h ?? 0) * b.height * k; }
      // Only the part of it left in view by each scrolling part around it.
      for (let e = el.parentElement; e && root.contains(e); e = e.parentElement) {
        if (e !== root && !fbkScrolls(e)) continue;
        const s0 = e.getBoundingClientRect(), o = fbkOff(e), s = { left: s0.left + o.x, top: s0.top + o.y, right: s0.right + o.x, bottom: s0.bottom + o.y };
        clip = { l: Math.max(clip.l, (s.left - L.left) * k), t: Math.max(clip.t, (s.top - L.top) * k), r: Math.min(clip.r, (s.right - L.left) * k), b: Math.min(clip.b, (s.bottom - L.top) * k) };
      }
    } else {
      const p = f.area ?? f.pin;
      x = p.x * layer.offsetWidth; y = p.y * layer.offsetHeight;
      if (f.area) { w = f.area.w * layer.offsetWidth; h = f.area.h * layer.offsetHeight; }
    }
    // A box shows the piece of it in view, its number on that piece's corner.
    const l = Math.max(x, clip.l), t = Math.max(y, clip.t), r = Math.min(x + w, clip.r), bt = Math.min(y + h, clip.b);
    const shown = f.area ? r > l && bt > t : x >= clip.l && x <= clip.r && y >= clip.t && y <= clip.b;
    m.style.visibility = shown ? "" : "hidden";
    if (isBox) Object.assign(m.style, { left: l + "px", top: t + "px", width: Math.max(0, r - l) + "px", height: Math.max(0, bt - t) + "px" });
    else Object.assign(m.style, f.area ? { left: l + "px", top: t + "px" } : { left: x + "px", top: y + "px" });
  }
  const tray = layer.querySelector(".fbk-tray"); if (!tray) return;
  tray._away = away; tray.hidden = !away.length;
  tray.textContent = String(away.length); tray.title = `${away.length} ${away.length === 1 ? "comment is" : "comments are"} not on the screen now: ${away.length === 1 ? "its part shows" : "their parts show"} only in some states, or the screen has changed`;
}
// Where a comment's card hangs: its pin when that is on the screen, else the tray.
const fbkMarkOf = (id) => { const p = $(`#fbkLayer .fbk-pin[data-id="${CSS.escape(id)}"]`); return p && p.style.visibility !== "hidden" ? p : p && $("#fbkLayer .fbk-tray:not([hidden])"); };
// The tray's list: each comment whose part is not on the screen now, to read, or to pin anew where it belongs.
function fbkTrayCard(tray) {
  const list = tray._away ?? [], nums = [...$("#fbkLayer").querySelectorAll(".fbk-pin")];
  const n = (f) => nums.find((p) => p._f === f)?.textContent ?? "";
  const p = fbkPop(tray, `<div class="fbk-trayl"><div class="pl" style="margin-top:0">Not on the screen now</div>
    <p class="pn">Their parts show only in some states of the screen (an answer checked, a hint open, a card for one child), or the screen has changed. Each comes back to its part when it shows again, or pin it anew.</p>
    <ul class="fbk-menu">${list.map((f) => `<li><button data-open="${esc(f.id)}"><b>${esc(n(f))}. ${esc(f.target?.label ?? "")}</b><span>${esc(f.body.length > 90 ? f.body.slice(0, 89) + "…" : f.body)}</span><small>${esc(f.author?.name ?? "")} · ${esc(fbkAgo(f.createdAt))}</small></button>${f.can?.move ? `<button class="nbtn" data-repin="${esc(f.id)}">Pin again here</button>` : ""}</li>`).join("")}</ul></div>`);
  const byId = (id) => list.find((f) => f.id === id);
  p.querySelectorAll("[data-open]").forEach((b) => b.onclick = () => fbkCard(byId(b.dataset.open), tray));
  p.querySelectorAll("[data-repin]").forEach((b) => b.onclick = () => { FBK.repin = byId(b.dataset.repin); fbkPinMode(true); });
}
// In Comment mode the layer covers the screen; the wheel still scrolls the part under it.
function fbkWheel(e) {
  if (!FBK.pinning) return;
  const layer = e.currentTarget, root = fbkRoot();
  let el = fbkElAt(e.clientX, e.clientY, layer);
  // The Lab scrolls as a whole page: the wheel scrolls its window.
  if (el && el.ownerDocument !== document) { e.preventDefault(); el.ownerDocument.defaultView.scrollBy(e.deltaX, e.deltaY); return; }
  for (; el && root?.contains(el); el = el.parentElement) {
    if (!fbkScrolls(el)) continue;
    const down = e.deltaY > 0, right = e.deltaX > 0;
    const canY = e.deltaY && (down ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0);
    const canX = e.deltaX && (right ? el.scrollLeft + el.clientWidth < el.scrollWidth - 1 : el.scrollLeft > 0);
    if (canY || canX) { e.preventDefault(); el.scrollBy(canX ? e.deltaX : 0, canY ? e.deltaY : 0); return; }
  }
}

/* ---------- dropping a pin ---------- */
function fbkPinMode(on = !FBK.pinning) {
  if (on && !fbkScreen()) return fbkToast("Open an app screen to comment on it.");
  FBK.pinning = on; document.body.classList.toggle("fbk-pinning", on);
  if (!on) FBK.repin = null;
  $("#fbkComment")?.setAttribute("aria-pressed", on);
  $("#fbkHint").textContent = FBK.repin ? "Click the new spot for this comment, or drag to select an area. Esc cancels." : "Click the point your comment is about, or drag to select an area. Esc cancels.";
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
  const surface = fbkRoot(); if (!surface) return null;
  if (!r.w) {
    const el = fbkElAt(r.x, r.y, layer);
    return el && (el.ownerDocument !== document || el.closest("#screen, #parentsView")) ? { label: fbkDescribe(el) } : null;
  }
  const inside = [...surface.querySelectorAll(FBK_PART)].filter((el) => {
    const b = fbkRectOf(el), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
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
  const target = fbkTarget(screenRect, layer), anchor = fbkAnchorAt(screenRect, layer);
  const screen = { ...fbkScreen(), ...(anchor ? { anchor } : {}) };
  if (FBK.repin) return fbkRepin(FBK.repin, { screen, pin, area, target });
  fbkPinMode(false);
  const marks = [], draft = { pin, area, screen };
  if (area) { const b = fbkBox(area, "fbk-area open ghost"); b._f = draft; layer.appendChild(b); marks.push(b); }
  const ghost = document.createElement("span"); ghost.className = `fbk-pin open ghost${area ? " on-area" : ""}`; ghost._f = draft; layer.appendChild(ghost); marks.push(ghost);
  fbkPlace(layer);
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

// A comment pinned anew where it belongs: its screen, part, spot or area and what is under it, saved.
async function fbkRepin(f, place) {
  fbkPinMode(false);
  try { const { feedback } = await fbkApi("PATCH", `feedback/${encodeURIComponent(f.id)}`, place); FBK.list = FBK.list.map((x) => x.id === f.id ? feedback : x); fbkRefreshAll(); fbkToast("Pinned again."); }
  catch (err) { fbkToast(err.message, true); }
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
  if (FBK.me && (e.key === "h" || e.key === "H") && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.closest("input,select,textarea,[contenteditable]")) fbkShowPins(!FBK.showPins);
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
  // Its area's box shows while the card is open; no other box does.
  const boxes = (id) => $("#fbkLayer")?.querySelectorAll(".fbk-area").forEach((b) => b.classList.toggle("shown", b._f?.id === id));
  const p = fbkPop(anchor, fbkThread(f), () => { if (FBK.openId === f.id) { FBK.openId = null; boxes(null); } });
  FBK.openId = f.id; boxes(f.id);
  // After a reply or a status change the card opens again, fresh, on its pin.
  fbkWire(p, f, (nf) => { if ($("#fbkPop") !== p) return; const at = fbkMarkOf(nf.id); if (at) fbkCard(nf, at); else fbkClosePop(); });
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
    const want = fbkStepKey(sc), j = steps.findIndex((s) => (s.t ? s.t.id : fbkStepPlace(s)) === want);
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
  $("#fbkPins").onchange = (e) => fbkShowPins(e.target.checked);
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
  if (!fbkTools()) {
    $("#vDrawn").hidden = true; $("#vTypes").hidden = true; $("#vSources").hidden = true; document.body.classList.add("fbk-notools");
    // Opened on a tool page (a #types link) before the role was known: back to the app.
    if (["types", "drawn", "sources"].some((c) => document.body.classList.contains(c))) appTab("start");
  }
  $("#fbkComment").onclick = () => fbkPinMode();
  let pinsOn = true; try { pinsOn = (localStorage.getItem(fbkPinsKey()) ?? localStorage.getItem("twist-fb-pins")) !== "0"; } catch {}
  fbkShowPins(pinsOn, false); $("#fbkPinsBtn").onclick = () => fbkShowPins(!FBK.showPins);
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
  // A part may show only in some states (an answer checked, a hint open): place the pins again when the screen changes inside.
  new MutationObserver(fbkPlaceSoon).observe($("#screen"), { childList: true, subtree: true });
  new MutationObserver(fbkSoon).observe($("#parentsView"), { childList: true });
  new MutationObserver(fbkSoon).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("resize", fbkSoon);
  // Pins ride along when a part of the screen scrolls (scroll does not bubble, so listen on the way down).
  document.addEventListener("scroll", fbkPlaceSoon, { capture: true, passive: true });
  window.addEventListener("hashchange", fbkOpenHash);
  await fbkLoad(); fbkOpenHash();
  // Others' new comments arrive while the page is open.
  setInterval(() => { if (!document.hidden) fbkLoad(); }, 60_000);
}
