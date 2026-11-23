#!/usr/bin/env python3
"""Make the badge library's pictures from the designer's files.

Each badge in badges/badge-library.yaml names its designer file in `art`,
relative to the folder the designer delivered. The picture is trimmed to the
badge, padded to a square, resized and saved as assets/badge-library/<id>.webp,
which the backend's asset sync uploads as twist/badge-library/<id>.webp.

  python badge_library.py --from <designer folder>             # every badge
  python badge_library.py --from <designer folder> --only a,b  # just these
  python badge_library.py --check                              # what is missing

The designer's files stay out of git.
"""
import argparse, sys
from pathlib import Path

import yaml
from PIL import Image

TWIST = Path(__file__).resolve().parents[2]
CATALOGUE = TWIST / "badges" / "badge-library.yaml"
OUT = TWIST / "assets" / "badge-library"

SIZE = 512
MARGIN = 0.04
QUALITY = 86


def badges():
    return yaml.safe_load(CATALOGUE.read_text(encoding="utf-8"))["badges"]


def make(src: Path, dst: Path):
    im = Image.open(src).convert("RGBA")
    box = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox() or (0, 0, *im.size)
    im = im.crop(box)
    side = round(max(im.size) / (1 - 2 * MARGIN))
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(im, ((side - im.width) // 2, (side - im.height) // 2))
    square.resize((SIZE, SIZE), Image.LANCZOS).save(dst, "WEBP", quality=QUALITY, method=6)
    opaque = im.getchannel("A").getextrema()[0] == 255
    return opaque


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--from", dest="src", type=Path)
    p.add_argument("--only")
    p.add_argument("--check", action="store_true")
    a = p.parse_args()
    all_badges = badges()
    if a.check:
        missing = [b["id"] for b in all_badges if not (OUT / f"{b['id']}.webp").is_file()]
        print(f"{len(all_badges) - len(missing)} of {len(all_badges)} pictures; missing: {', '.join(missing) or 'none'}")
        sys.exit(1 if missing else 0)
    if not a.src:
        p.error("--from is required")
    only = set(a.only.split(",")) if a.only else None
    OUT.mkdir(parents=True, exist_ok=True)
    opaque, made = [], 0
    for b in all_badges:
        if only and b["id"] not in only:
            continue
        src = a.src / b["art"]
        if not src.is_file():
            sys.exit(f"{b['id']}: no file {src}")
        if make(src, OUT / f"{b['id']}.webp"):
            opaque.append(b["id"])
        made += 1
    size = sum(f.stat().st_size for f in OUT.glob("*.webp"))
    print(f"{made} pictures made; assets/badge-library holds {size / 1e6:.1f} MB")
    if opaque:
        print(f"{len(opaque)} without a transparent background: {', '.join(opaque)}")


if __name__ == "__main__":
    main()
