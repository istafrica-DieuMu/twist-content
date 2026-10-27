// Stills of the animated badges (badge-folders.mjs: assets/badges/<Name>/*-animated.svg) to
// assets/badges/stills/<id>.png, the badge at rest after its intro, cut to the
// badge (the canvas around it is room for the celebration), on a clear ground.
// The player shows a still where the badge is small and the animation in the
// badge's sheet. Some badges animate with SMIL, some with CSS, so each plays
// in real time and is then paused. Needs Playwright:
// `node twist/assets/tools/badge-stills.cjs`, then `node twist/pages/player/build.mjs`.
const { chromium } = require("playwright");
const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const DIR = join(__dirname, "..", "badges"), OUT = join(DIR, "stills"), SIZE = 480, REST_MS = 9000;

// In the page: the badge is the biggest solid shape in the picture. Each shape of solid pixels
// (all but see-through) is found with what it encloses; all but the biggest is cleared, and so
// is the faint glow outside it.
function keepBadge(src) {
  return new Promise((done) => { const im = new Image(); im.onload = () => {
    const w = im.width, h = im.height, c = Object.assign(document.createElement("canvas"), { width: w, height: h }), g = c.getContext("2d");
    g.drawImage(im, 0, 0); const d = g.getImageData(0, 0, w, h), px = d.data, solid = (i) => px[i * 4 + 3] >= 220;
    // Outside: the see-through pixels that reach the edge. Everything else belongs to a shape.
    const out = new Uint8Array(w * h), q = [];
    const push = (i) => { if (!out[i] && !solid(i)) { out[i] = 1; q.push(i); } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
    while (q.length) { const i = q.pop(), x = i % w; if (x > 0) push(i - 1); if (x < w - 1) push(i + 1); if (i >= w) push(i - w); if (i < w * (h - 1)) push(i + w); }
    // The shapes, the biggest kept.
    const lab = new Int32Array(w * h); let best = 0, bestN = 0, n = 0;
    for (let s = 0; s < w * h; s++) {
      if (out[s] || lab[s]) continue;
      n++; let size = 0; const st = [s]; lab[s] = n;
      while (st.length) { const i = st.pop(), x = i % w; size++;
        for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) if (j >= 0 && j < w * h && !out[j] && !lab[j]) { lab[j] = n; st.push(j); } }
      if (size > bestN) { bestN = size; best = n; }
    }
    // Kept: the shape and a pixel around it, its soft edge.
    const near = (i) => { const x = i % w; return lab[i] === best || (x > 0 && lab[i - 1] === best) || (x < w - 1 && lab[i + 1] === best) || lab[i - w] === best || lab[i + w] === best; };
    for (let i = 0; i < w * h; i++) if (!near(i)) px[i * 4 + 3] = 0;
    g.putImageData(d, 0, 0); done(c.toDataURL("image/png"));
  }; im.src = src; });
}

(async () => {
  // The folders, as the player's build finds them (badge-folders.mjs).
  const { badgeFolders } = await import("./badge-folders.mjs"), { found, unknown } = badgeFolders();
  for (const name of unknown) console.warn(`${name}: no badge of that name in docs/rewards.md`);
  const folders = found.map((f) => ({ id: f.id, file: join(DIR, f.dir, f.svg) }));
  mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  await Promise.all(folders.map(async ({ id, file }) => {
    const p = await b.newPage({ viewport: { width: SIZE, height: SIZE } });
    await p.goto("file://" + file);
    // The badge's own part of the canvas: the viewBox reaches as far past it on each side.
    const box = await p.evaluate((size) => {
      const s = document.documentElement, [x, y, w] = s.getAttribute("viewBox").split(/[\s,]+/).map(Number);
      s.setAttribute("width", size); s.setAttribute("height", size);
      return { x: (-x / w) * size, y: (-y / w) * size, w: ((w + 2 * x) / w) * size };
    }, SIZE);
    await p.waitForTimeout(REST_MS);
    await p.evaluate(() => { document.documentElement.pauseAnimations?.(); document.getAnimations().forEach((a) => a.pause()); });
    const shot = await p.screenshot({ omitBackground: true, clip: { x: box.x, y: box.y, width: box.w, height: box.w } });
    // Only the badge: the confetti and glow of its celebration around it are cleared.
    await p.goto("about:blank");
    const png = await p.evaluate(keepBadge, "data:image/png;base64," + shot.toString("base64"));
    writeFileSync(join(OUT, `${id}.png`), Buffer.from(png.split(",")[1], "base64"));
    await p.close();
  }));
  await b.close();
  console.log(`assets/badges/stills: ${folders.length} stills (${folders.map((f) => f.id).join(", ")})`);
})();
