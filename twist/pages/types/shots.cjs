// Screenshots of the prototype player for types/index.html, and of the mocks in types/mocks.html.
// Needs Playwright: NODE_PATH=<dir with playwright installed>/node_modules node types/shots.cjs
// CHROME=<path> picks a browser binary when Playwright's own is not installed.
// PLAYER=<path> shoots another build of the player page (default ../player/index.html).
// OUT=<dir> writes the pngs somewhere else (default types/shots/).
// ONLY=mocks shoots only the mocks; ONLY=player only the player.
// NAMES=a,b shoots only the player shots with those file names.
const { chromium } = require("playwright");
const { join, resolve } = require("path");
const fs = require("fs");
const ROOT = join(__dirname, "..");
const PLAYER = resolve(process.env.PLAYER || join(ROOT, "player/index.html"));
const OUT = resolve(process.env.OUT || join(__dirname, "shots"));
const ONLY = process.env.ONLY || "";
const NAMES = process.env.NAMES ? process.env.NAMES.split(",") : null;

// [file name, lesson set id, lesson, task id or step kind, what to do before the shot]
// What to do: "wrong" or "right" taps an option and Check; "mic" and "mic-done" record;
// "type:<text>" types on the keyboard; "grid:x,y" taps a grid crossing;
// "hands:h:mm" drags the clock hands to that time.
const SHOTS = [
  ["flow-start", "de-DE.math.table-2-4-8", 1, "start"],
  ["flow-learn", "de-DE.math.table-2-4-8", 1, "learn"],
  ["flow-stage", "de-DE.math.table-2-4-8", 1, "stage"],
  ["flow-check", "de-DE.math.table-2-4-8", 1, "checkIntro"],
  ["flow-end", "de-DE.math.table-2-4-8", 1, "end"],
  ["multiple_choice", "de-DE.math.add-bridge-10", 1, "l1-f2"],
  ["multiple_choice-hint", "de-DE.math.add-bridge-10", 1, "l1-f2", "wrong"],
  ["multiple_choice-right", "de-DE.math.add-bridge-10", 1, "l1-f2", "right"],
  ["circle", "en-GB.math.circles-compass", 1, "l1-f1"],
  ["image_multiple_choice", "de-DE.fl.en-hobbies", 2, "l2-f1"],
  ["audio_choice", "de-DE.fl.en-about-me", 1, "l1-f1"],
  ["true_false", "de-DE.math.number-walls", 1, "l1-f4"],
  ["fill_in_blank", "de-DE.math.number-walls", 1, "l1-f1"],
  ["text_input", "de-DE.math.add-carry", 1, "l1-f3"],
  ["text_input-fraction", "en-GB.math.mixed-numbers", 1, "l1-n2", "type:4 3/"],
  ["text_input-letters", "en-GB.fl.fr-copy-words", 1, "l1-f5", "type:l'éc"],
  ["tap_to_count", "de-DE.math.count-to-10", 1, "l1-f1"],
  ["drag_and_drop_count", "de-DE.math.add-bridge-10", 1, "l1-f1"],
  ["point_on_line", "de-DE.math.add-bridge-10", 2, "l2-f4"],
  ["point_on_grid", "en-GB.math.first-quadrant", 1, "l1-f3", "grid:3,1"],
  ["clock_hands_drag", "en-GB.math.time-full-half", 2, "l2-f3", "hands:9:30"],
  ["highlight_in_text", "de-DE.lit-de.abstract-nouns", 2, "l2-f1"],
  ["tracing", "de-DE.lit-de.letters-l-o-a-m", 1, "l1-f6"],
  ["speak", "de-DE.fl.en-animals", 1, "l1-f3"],
  ["speak-recording", "de-DE.fl.en-animals", 1, "l1-f3", "mic"],
  ["speak-compare", "de-DE.fl.en-animals", 1, "l1-f3", "mic-done"],
  ["matching", "de-DE.fl.en-clothes", 1, "l1-f4"],
  ["sorting", "de-DE.fl.en-hobbies", 1, "l1-s4"],
  ["ordering", "de-DE.fl.en-about-me", 2, "l2-f1"],
];

// Drags the clock hands: first the minute hand from 12, then the hour hand from where it sits.
async function setHands(p, time) {
  const [h, m] = time.split(":").map(Number);
  const box = await (await p.$("#screen .visual svg")).boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2, R = box.width * 0.3;
  const at = (f, r = R) => [cx + r * Math.sin(2 * Math.PI * f), cy - r * Math.cos(2 * Math.PI * f)];
  const drag = async (from, to) => {
    await p.mouse.move(...from); await p.mouse.down();
    for (let i = 1; i <= 12; i++) await p.mouse.move(from[0] + ((to[0] - from[0]) * i) / 12, from[1] + ((to[1] - from[1]) * i) / 12);
    await p.mouse.up();
    await p.evaluate(() => window.getSelection().removeAllRanges());
  };
  const start = await p.evaluate(() => [steps[at].t.show?.hour ?? 12, steps[at].t.show?.minute ?? 0]);
  if (m !== start[1]) await drag(at(start[1] / 60), at(m / 60));
  const hf = ((h % 12) + m / 60) / 12, hs = ((start[0] % 12) + m / 60) / 12;
  if (h % 12 !== start[0] % 12) await drag(at(hs, R * 0.6), at(hf, R * 0.6));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"] });
  const ctx = await b.newContext({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  if (ONLY !== "mocks") {
    // The page is large (all lessons inline): wait for the DOM, then for the data and the fonts.
    await p.goto("file://" + PLAYER, { waitUntil: "domcontentloaded", timeout: 180000 });
    await p.waitForFunction(() => typeof D !== "undefined" && D.sets?.length > 0, null, { timeout: 180000 });
    await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => { document.getElementById("auto").checked = false; document.getElementById("autonext").checked = false; });
    for (const [name, setId, n, target, act] of SHOTS.filter((s) => !NAMES || NAMES.includes(s[0]))) {
      const ok = await p.evaluate(([setId, n, target]) => {
        const si = D.sets.findIndex((s) => s.id === setId); if (si < 0) return "no set";
        pickSet(si); pickLesson(n);
        const i = steps.findIndex((s) => s.kind === target || s.t?.id === target); if (i < 0) return "no step";
        go(i); stopAudio(); return "ok";
      }, [setId, n, target]);
      if (ok !== "ok") { console.log(`${name}: ${ok}`); continue; }
      if (act === "wrong" || act === "right") {
        // Tap a wrong option for the hint state, the right one for the praise state.
        const want = await p.evaluate(() => String(steps[at].t.answer));
        for (const o of await p.$$("#screen .opt")) {
          const txt = (await o.innerText()).trim();
          if ((act === "wrong") === (txt !== want)) { await o.click(); await p.click("#screen .foot .btn"); break; }
        }
        await p.waitForTimeout(500);
      }
      if (act?.startsWith("mic")) {
        await p.click("#screen .btn"); await p.waitForTimeout(1500);
        if (act === "mic-done") { await p.click("#screen .btn"); await p.waitForTimeout(1500); }
      }
      if (act?.startsWith("type:")) {
        // Tap each key in turn; a space is the ␣ key, a capital taps shift first.
        for (const ch of act.slice(5)) {
          const label = ch === " " ? "␣" : ch.toLowerCase();
          if (ch !== ch.toLowerCase()) await p.click('#screen .pad .opt:text-is("⇧")');
          await p.locator("#screen .pad .opt").filter({ hasText: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}$`, "i") }).first().click();
        }
      }
      if (act?.startsWith("grid:")) {
        const [x, y] = act.slice(5).split(",");
        await p.click(`#screen circle[data-x="${x}"][data-y="${y}"]`, { force: true });
      }
      if (act?.startsWith("hands:")) await setHands(p, act.slice(6));
      await p.evaluate(() => stopAudio());
      await p.waitForTimeout(300);
      await (await p.$(".phone")).screenshot({ path: join(OUT, name + ".png") });
      console.log(`${name}: shot`);
    }
  }
  if (ONLY !== "player") {
    // Rough screens for the types still to build, with the player's own stylesheet.
    const tpl = fs.readFileSync(join(ROOT, "player/template.html"), "utf8");
    const css = tpl.slice(tpl.indexOf("<style>") + 7, tpl.indexOf("</style>"));
    await p.goto("file://" + join(__dirname, "mocks.html"), { waitUntil: "domcontentloaded", timeout: 60000 });
    await p.addStyleTag({ content: css + "body{display:flex;flex-wrap:wrap;gap:30px;padding:30px}" });
    await p.evaluate(() => Promise.race([Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]), new Promise((r) => setTimeout(r, 20000))]));
    await p.waitForTimeout(500);
    for (const el of await p.$$(".phone[id]")) {
      const id = await el.getAttribute("id");
      await el.screenshot({ path: join(OUT, "mock-" + id + ".png") });
      console.log(`mock-${id}: shot`);
    }
  }
  await b.close();
})();
