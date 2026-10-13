// Screenshots of the prototype player (player/index.html) for types/index.html.
// Needs Playwright: NODE_PATH=<dir with playwright installed>/node_modules node types/shots.cjs
// CHROME=<path> picks a browser binary when Playwright's own is not installed.
const { chromium } = require("playwright");
const { join } = require("path");
const ROOT = join(__dirname, "..");

// [file name, lesson set id, lesson, task id or step kind, what to do before the shot]
const SHOTS = [
  ["flow-start", "de-DE.math.table-2-4-8", 1, "start"],
  ["flow-learn", "de-DE.math.table-2-4-8", 1, "learn"],
  ["flow-stage", "de-DE.math.table-2-4-8", 1, "stage"],
  ["flow-check", "de-DE.math.table-2-4-8", 1, "checkIntro"],
  ["flow-end", "de-DE.math.table-2-4-8", 1, "end"],
  ["multiple_choice", "de-DE.math.add-bridge-10", 1, "l1-f2"],
  ["multiple_choice-hint", "de-DE.math.add-bridge-10", 1, "l1-f2", "wrong"],
  ["multiple_choice-right", "de-DE.math.add-bridge-10", 1, "l1-f2", "right"],
  ["image_multiple_choice", "de-DE.fl.en-hobbies", 2, "l2-f1"],
  ["audio_choice", "de-DE.fl.en-about-me", 1, "l1-f1"],
  ["true_false", "de-DE.math.number-walls", 1, "l1-f4"],
  ["fill_in_blank", "de-DE.math.number-walls", 1, "l1-f1"],
  ["text_input", "de-DE.math.add-carry", 1, "l1-f3"],
  ["tap_to_count", "de-DE.math.count-to-10", 1, "l1-f1"],
  ["drag_and_drop_count", "de-DE.math.add-bridge-10", 1, "l1-f1"],
  ["point_on_line", "de-DE.math.add-bridge-10", 2, "l2-f4"],
  ["highlight_in_text", "de-DE.lit-de.abstract-nouns", 2, "l2-f1"],
  ["tracing", "de-DE.lit-de.letters-l-o-a-m", 1, "l1-f6"],
  ["speak", "de-DE.fl.en-animals", 1, "l1-f3"],
  ["speak-recording", "de-DE.fl.en-animals", 1, "l1-f3", "mic"],
  ["speak-compare", "de-DE.fl.en-animals", 1, "l1-f3", "mic-done"],
  ["matching", "de-DE.fl.en-clothes", 1, "l1-f4"],
  ["sorting", "de-DE.fl.en-hobbies", 1, "l1-s4"],
  ["ordering", "de-DE.fl.en-about-me", 2, "l2-f1"],
];

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"] });
  const ctx = await b.newContext({ viewport: { width: 1300, height: 1000 }, deviceScaleFactor: 1.5 });
  const p = await ctx.newPage();
  await p.goto("file://" + join(ROOT, "player/index.html"));
  await p.evaluate(() => { document.getElementById("auto").checked = false; });
  for (const [name, setId, n, target, act] of SHOTS) {
    const ok = await p.evaluate(([setId, n, target]) => {
      const si = D.sets.findIndex((s) => s.id === setId); if (si < 0) return "no set";
      pickSet(si); pickLesson(n);
      const i = steps.findIndex((s) => s.kind === target || s.t?.id === target); if (i < 0) return "no step";
      go(i); stopAudio(); return "ok";
    }, [setId, n, target]);
    if (ok !== "ok") { console.log(`${name}: ${ok}`); continue; }
    if (act === "wrong" || act === "right") {
      // Tap a wrong option for the hint state, the right one for the praise state.
      const want = await p.evaluate(() => String(steps[at].t.answer)); await p.evaluate(() => { document.getElementById("autonext").checked = false; });
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
    await p.evaluate(() => stopAudio());
    await p.waitForTimeout(300);
    await (await p.$(".phone")).screenshot({ path: join(__dirname, "shots", name + ".png") });
    console.log(`${name}: shot`);
  }
  // Rough screens for the types still to build, in the player's own style.
  const tpl = require("fs").readFileSync(join(ROOT, "player/template.html"), "utf8");
  const css = tpl.slice(tpl.indexOf("<style>") + 7, tpl.indexOf("</style>"));
  const spkSvg = tpl.match(/const SPK = '([^']+)'/)[1];
  await p.goto("file://" + join(__dirname, "mocks.html"));
  await p.addStyleTag({ content: css + "body{display:flex;flex-wrap:wrap;gap:30px;padding:30px}" });
  await p.evaluate((svg) => document.querySelectorAll(".spk").forEach((x) => x.innerHTML = svg), spkSvg);
  await p.waitForTimeout(500);
  for (const el of await p.$$(".phone[id]")) {
    const id = await el.getAttribute("id");
    await el.screenshot({ path: join(__dirname, "shots", "mock-" + id + ".png") });
    console.log(`mock-${id}: shot`);
  }
  await b.close();
})();
