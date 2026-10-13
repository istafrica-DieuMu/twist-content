#!/usr/bin/env python3
"""Make the bank's object pictures from objects.yaml.

Each object's `draw` line (hand-written) plus the shared style below goes to
one image model through OpenRouter. The result is trimmed, padded, resized
and palette-compressed with Pillow into assets/objects/<id>.png. Objects
with `recolour` also get one picture per colour the lessons ask for
(<id>.<colour>.png), made by editing the base picture so only that part
changes colour.

  python pictures.py                    # make every missing picture
  python pictures.py --only lion,apple  # just these (remakes them)
  python pictures.py --sheet sheet.png  # contact sheet of what exists
  python pictures.py --dry-run          # list what would be made, no calls

Key: OPENROUTER_API_KEY, or OPENROUTER_AUTHORING_API_KEY in
../schoolido-learning/.env. Style references: the mascot and the apple
sprite in schoolido-learning (read only), or STYLE_REFS=path,path.
"""
import argparse, base64, io, json, os, re, shutil, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path

import yaml
from PIL import Image, ImageDraw

TWIST = Path(__file__).resolve().parents[2]
ASSETS = TWIST / "assets"
OUT = ASSETS / "objects"
RAW = OUT / "raw"            # model output at full size; gitignored
LOG = OUT / "pictures.yaml"  # what made each file
SL = TWIST.parents[1] / "schoolido-learning"

MODEL = "openai/gpt-image-2.5-sunburst"
QUALITY = "low"
SIZE = 512       # final square size in px
MARGIN = 0.06    # empty border around the subject, share of SIZE
COLOURS = 64     # palette size of the final PNG

STYLE = """Children's learning app picture, drawn in exactly the same style as the reference images (a purple mascot and an apple): clean flat 2D vector cartoon, soft rounded shapes, bold thick dark aubergine (near-black plum) outline around the whole subject and its main parts, flat cel shading with one darker tone of each colour on one side, one small white highlight. Bright, friendly colours.
Keep it low detail so it reads at 64 pixels: few shapes, no texture, no gradients, no tiny details.
One subject only, centred, filling about 80% of a square canvas, on a transparent background. No ground shadow, no scene, no frame, no text or letters.
Do not draw the mascot."""
FACE = "Eyes like the mascot's: large, rounded, solid dark plum with one white catchlight. A small friendly smile."
NO_FACE = "No face: no eyes, no mouth."
RECOLOUR = """Redraw this exact picture: same shape, outline, shading, highlight and position. Change only the colour of {part} to {name} ({hex}), with its darker shade in a darker tone of the same {name}. Everything else stays exactly as it is. Transparent background."""


def key():
    k = os.environ.get("OPENROUTER_API_KEY")
    if not k and (SL / ".env").exists():
        m = re.search(r"^OPENROUTER_AUTHORING_API_KEY=[\"']?([^\"'\n]+)", (SL / ".env").read_text(), re.M)
        k = m and m.group(1)
    if not k:
        sys.exit("No OpenRouter key: set OPENROUTER_API_KEY.")
    return k


def data_url(img):
    buf = io.BytesIO()
    img.save(buf, "PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def ref_image(path):
    """A reference on white, 512 px square: the model reads style, not size."""
    im = Image.open(path).convert("RGBA")
    im.thumbnail((512, 512), Image.LANCZOS)
    bg = Image.new("RGBA", (512, 512), "white")
    bg.alpha_composite(im, ((512 - im.width) // 2, (512 - im.height) // 2))
    return data_url(bg.convert("RGB"))


def style_refs():
    paths = os.environ.get("STYLE_REFS")
    paths = paths.split(",") if paths else [SL / "scripts/image-generation/maskot.png", SL / "scripts/image-generation/assets/sprites/apple.png"]
    return [ref_image(p) for p in paths]


def call(k, prompt, refs):
    body = {"model": MODEL, "prompt": prompt, "aspect_ratio": "1:1", "n": 1, "quality": QUALITY,
            "background": "transparent", "input_references": [{"type": "image_url", "image_url": {"url": u}} for u in refs]}
    req = urllib.request.Request("https://openrouter.ai/api/v1/images", data=json.dumps(body).encode(),
                                 headers={"Authorization": f"Bearer {k}", "Content-Type": "application/json"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                data = json.loads(r.read())
            break
        except urllib.error.HTTPError as e:
            if attempt == 2 or e.code not in (429, 500, 502, 503):
                raise RuntimeError(f"HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
            time.sleep(10 * (attempt + 1))
        except (urllib.error.URLError, ConnectionError, TimeoutError) as e:
            if attempt == 2:
                raise
            time.sleep(10 * (attempt + 1))
    img = (data.get("data") or [{}])[0]
    b64 = img.get("b64_json") or (img.get("url", "").split(",", 1)[1] if img.get("url", "").startswith("data:") else None)
    if not b64:
        raise RuntimeError(f"no image: {json.dumps(data)[:300]}")
    return base64.b64decode(b64), (data.get("usage") or {}).get("cost")


def finish(raw_bytes, dest):
    """Trim to the subject, pad to a square with a margin, resize, compress."""
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGBA")
    alpha = im.getchannel("A").point(lambda a: 255 if a > 8 else 0)
    box = alpha.getbbox()
    if box:
        im = im.crop(box)
    side = round(max(im.size) / (1 - 2 * MARGIN))
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.alpha_composite(im, ((side - im.width) // 2, (side - im.height) // 2))
    sq = sq.resize((SIZE, SIZE), Image.LANCZOS)
    sq.quantize(colors=COLOURS, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(dest, "PNG", optimize=True)
    return dest.stat().st_size


def has_alpha(raw_bytes):
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGBA")
    return im.getpixel((2, 2))[3] < 16 and im.getpixel((im.width - 3, im.height - 3))[3] < 16


def colours_used():
    """{object id: set of colours} from every lesson record."""
    used = {}
    for p in (TWIST / "lessons").rglob("*.yaml"):
        def walk(v):
            if isinstance(v, dict):
                if "object" in v and "colour" in v:
                    used.setdefault(v["object"], set()).add(v["colour"])
                for x in v.values(): walk(x)
            elif isinstance(v, list):
                for x in v: walk(x)
        walk(yaml.safe_load(p.read_text()))
    return used


def sheet(dest):
    files = sorted(OUT.glob("*.png"))
    cell, cols = 160, 8
    rows = -(-len(files) // cols)
    out = Image.new("RGB", (cols * cell, rows * (cell + 18)), "#eef0f3")
    d = ImageDraw.Draw(out)
    for i, f in enumerate(files):
        x, y = (i % cols) * cell, (i // cols) * (cell + 18)
        im = Image.open(f).convert("RGBA")
        im.thumbnail((cell - 12, cell - 12), Image.LANCZOS)
        tile = Image.new("RGBA", (cell - 8, cell - 8), "white")
        tile.alpha_composite(im, ((tile.width - im.width) // 2, (tile.height - im.height) // 2))
        out.paste(tile.convert("RGB"), (x + 4, y + 4))
        d.text((x + 6, y + cell - 2), f"{f.stem} {f.stat().st_size // 1024}KB", fill="#333")
    out.save(dest)
    print(f"sheet: {dest} ({len(files)} pictures)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated object ids; remakes them")
    ap.add_argument("--sheet", help="write a contact sheet PNG and stop")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--jobs", type=int, default=6)
    a = ap.parse_args()
    if a.sheet:
        return sheet(Path(a.sheet))

    objects = yaml.safe_load((ASSETS / "objects.yaml").read_text())["objects"]
    hexes = yaml.safe_load((ASSETS / "drawn.yaml").read_text())["colours"]
    only = set(a.only.split(",")) if a.only else None
    used = colours_used()
    OUT.mkdir(exist_ok=True); RAW.mkdir(exist_ok=True)
    log = yaml.safe_load(LOG.read_text()) if LOG.exists() else {}
    log = log or {}

    base_jobs = [o for o in objects if (only and o["id"] in only) or (not only and not (OUT / f"{o['id']}.png").exists())]
    var_jobs = [(o, c) for o in objects if o.get("recolour") for c in sorted(used.get(o["id"], ()))
                if (only and o["id"] in only) or (not only and not (OUT / f"{o['id']}.{c}.png").exists())]
    print(f"{len(base_jobs)} pictures, {len(var_jobs)} colour versions to make")
    if a.dry_run:
        for o in base_jobs: print(" ", o["id"], "-", o["draw"])
        for o, c in var_jobs: print(" ", f"{o['id']}.{c}")
        return

    k, refs = key(), style_refs()
    total = [0.0]

    def make_base(o):
        face = FACE if o["category"] in ("animal", "people", "action") else NO_FACE
        prompt = f"{STYLE}\n\nSubject: {o['draw']}. {face}"
        raw, cost = call(k, prompt, refs)
        (RAW / f"{o['id']}.png").write_bytes(raw)
        size = finish(raw, OUT / f"{o['id']}.png")
        total[0] += cost or 0
        log[o["id"]] = {"file": f"{o['id']}.png", "model": MODEL, "quality": QUALITY, "draw": o["draw"], "cost": cost, "bytes": size, "made": str(date.today()), "transparent": has_alpha(raw)}
        print(f"  {o['id']}: {size // 1024} KB, ${cost}")

    def make_variant(o, c):
        name = f"{o['id']}.{c}"
        if c == o["recolour"]["base"]:
            shutil.copyfile(OUT / f"{o['id']}.png", OUT / f"{name}.png")
            log[name] = {"file": f"{name}.png", "copy_of": f"{o['id']}.png", "made": str(date.today())}
            return
        base = Image.open(RAW / f"{o['id']}.png").convert("RGBA")
        bg = Image.new("RGBA", base.size, "white"); bg.alpha_composite(base)
        prompt = RECOLOUR.format(part=o["recolour"]["part"], name=c, hex=hexes[c])
        raw, cost = call(k, prompt, [data_url(bg.convert("RGB"))])
        (RAW / f"{name}.png").write_bytes(raw)
        size = finish(raw, OUT / f"{name}.png")
        total[0] += cost or 0
        log[name] = {"file": f"{name}.png", "model": MODEL, "quality": QUALITY, "from": f"{o['id']}.png", "colour": c, "cost": cost, "bytes": size, "made": str(date.today()), "transparent": has_alpha(raw)}
        print(f"  {name}: {size // 1024} KB, ${cost}")

    def safe(f, *args):
        try: f(*args)
        except Exception as e: print("  FAILED", args[0]["id"], *args[1:], e)

    with ThreadPoolExecutor(a.jobs) as ex:
        list(ex.map(lambda o: safe(make_base, o), base_jobs))
    with ThreadPoolExecutor(a.jobs) as ex:
        list(ex.map(lambda j: safe(make_variant, *j), var_jobs))
    LOG.write_text("# Written by tools/pictures.py: what made each picture.\n" + yaml.safe_dump(dict(sorted(log.items())), allow_unicode=True, sort_keys=False))
    print(f"total ${total[0]:.3f}")


if __name__ == "__main__":
    main()
