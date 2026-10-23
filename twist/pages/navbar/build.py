# Inlines the hand-drawn icons from icons/ into index.html so CSS can animate their named parts
# (.door, .sheet, .tassel, .head, .eyes).
import pathlib
here = pathlib.Path(__file__).parent
page = (here / "index.template.html").read_text()
for svg in sorted((here / "icons").glob("*.svg")):
    page = page.replace("{{%s}}" % svg.stem, svg.read_text().strip())
(here / "index.html").write_text(page)
print("wrote index.html")
