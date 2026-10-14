#!/usr/bin/env python3
"""Speak every line the lessons need, in each voice from voices.yaml.

1. Gathers the narration list: every Learn screen, task prompt, English
   target word, hint and feedback line in lessons/, every phrase in
   phrases.yaml, and every sound in sounds.yaml. Writes it to
   assets/narration/lines.yaml (id, language, text, where it is used).
   Identical lines share one clip.
2. Speaks each line in a voice through OpenRouter, trims the silence,
   evens the loudness, and writes a mono MP3 to
   assets/narration/<voice>/<id>.mp3 (sounds: sounds/<file>.mp3).
3. A listening model checks each clip against its text; the results go to
   assets/narration/<voice>.yaml. A clip that fails is remade once.

  python narration.py --list                  # write lines.yaml only
  python narration.py --voice eleven-sarah    # one voice
  python narration.py --voice all             # every candidate
  python narration.py --voice all --no-check  # skip the listening check

Maths written for the screen is read with one rule for every voice:
"+" plus, "−" minus, "=" gleich, "_" wie viel. Needs ffmpeg. Key:
OPENROUTER_API_KEY, or OPENROUTER_AUTHORING_API_KEY in
../schoolido-learning/.env.
"""
import argparse, base64, hashlib, json, os, random, re, subprocess, sys, tempfile, time, urllib.request, urllib.error, wave
from concurrent.futures import ThreadPoolExecutor
import threading
from datetime import date
from pathlib import Path

import yaml

TWIST = Path(__file__).resolve().parents[2]
ASSETS = TWIST / "assets"
OUT = ASSETS / "narration"
SL = TWIST.parents[1] / "schoolido-learning"
LISTEN_MODEL = "google/gemini-3.8-flash"
MAX_SOUND = 1.5
READ_MATHS = {"de": [(" = ?", " gleich wie viel?"), (" < ", " ist kleiner als "), (" > ", " ist größer als "), (" + ", " plus "), (" − ", " minus "), (" = ", " gleich "), ("_", "wie viel"), (" → ", ", dann ")],
              "en": [(" = ?", " equals what?"), (" < ", " is less than "), (" > ", " is greater than "), (" + ", " plus "), (" − ", " minus "), (" = ", " equals "), ("_", "what"), (" → ", ", then ")]}


class _Dumper(yaml.SafeDumper):
    """Quotes hex ids: other YAML readers take 9704e50338 for a number."""


_Dumper.add_representer(str, lambda d, v: d.represent_scalar("tag:yaml.org,2002:str", v, style='"' if re.fullmatch(r"[0-9a-f]{10}", v) else None))


def dump(data):
    return yaml.dump(data, Dumper=_Dumper, allow_unicode=True, sort_keys=False, width=200)


def key():
    k = os.environ.get("OPENROUTER_API_KEY")
    if not k and (SL / ".env").exists():
        m = re.search(r"^OPENROUTER_AUTHORING_API_KEY=[\"']?([^\"'\n]+)", (SL / ".env").read_text(), re.M)
        k = m and m.group(1)
    if not k:
        sys.exit("No OpenRouter key: set OPENROUTER_API_KEY.")
    return k


def spoken(text, lang):
    t = str(text).strip()
    for a, b in READ_MATHS.get(lang, []):
        t = t.replace(a, b)
    if lang == "de":
        t = say_numbers_de(t)
    return t


# German numbers are spoken as words: the voice swaps or spells out bare
# numerals ("46" came out as vierundsechzig). Must match sayNumbersDe() in
# player/build.mjs.
ONES_DE = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn",
           "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"]
TENS_DE = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"]


def de_words(n):
    def under_100(x):
        if x < 20:
            return ONES_DE[x]
        o, z = x % 10, x // 10
        return (("ein" if o == 1 else ONES_DE[o]) + "und" if o else "") + TENS_DE[z]

    def under_1000(x):
        h, r = divmod(x, 100)
        head = "" if not h else ("hundert" if h == 1 else ONES_DE[h] + "hundert")
        return head + (under_100(r) if r or not h else "")

    if n < 1000:
        return under_1000(n)
    k, r = divmod(n, 1000)
    return ("tausend" if k == 1 else under_1000(k).removesuffix("eins") + ("ein" if k % 100 == 1 else "") + "tausend") + (under_1000(r) if r else "")


DE_PLACES = [(re.compile(r"\bH: "), "Hunderter "), (re.compile(r"\bZ: "), "Zehner "), (re.compile(r"\bE: "), "Einer "),
             (re.compile(r"(\S+) H, (\S+) Z, (\S+) E\b"), r"\1 Hunderter, \2 Zehner, \3 Einer")]


def say_numbers_de(t):
    for rx, b in DE_PLACES:
        t = rx.sub(b, t)
    t = re.sub(r"(?<![\d,.:])(\d{1,3}) (\d{3})(?![\d,.:]?\d)", r"\1\2", t)  # 10 000
    return re.sub(r"(?<![\d,.:])\d{1,6}(?![,.:]?\d)", lambda m: de_words(int(m.group())), t)


SEQ = []  # (where, line id, voice) in the order the lessons say them
MIXED = None  # target language of the lesson being gathered
LANG_NAME = {"de": "German", "en": "English", "fr": "French"}  # what the listening check expects
CUR = None  # its curriculum

def speak_model(t, tl):
    """What a speak task's model says: the target-language say, else expected_text as a sentence."""
    say = t.get("say")
    if isinstance(say, dict) and say.get(tl):
        return say[tl]
    x = t["expected_text"].strip()
    x = x[0].upper() + x[1:]
    return x if x[-1] in ".!?" else x + "."


# Options get a speaker when hearing them does not give the answer away.
# Never on audio_choice (the sound is the question), and never for a letter
# or syllable option. A task's `option_audio: true/false` overrides this.
# Must match optionAudio() in player/build.mjs.
NO_OPTION_AUDIO = {"audio_choice", "true_false", "highlight_in_text", "tracing", "speak", "text_input", "drag_and_drop_count", "point_on_line", "matching", "sorting"}
LETTERISH = re.compile(r"[A-Za-zÄÖÜäöüß]{1,3}")


def tappable(t, objects, lang, target):
    """What tapping a pair side, a bin, a sorting item or a shown picture
    says: its own `say`, or a picture's word (not in target-language
    lessons, which must not say German words). Must match player/build.mjs."""
    parts = [x for p in t.get("pairs", []) for x in (p.get("left"), p.get("right"))] + t.get("bins", [])
    if t["type"] == "sorting":
        parts += t.get("options", [])
    out = []
    for x in parts:
        if not isinstance(x, dict):
            continue
        if isinstance(x.get("say"), dict):
            out += list(x["say"].items())
            continue
        if isinstance(x.get("say"), str):
            out.append((lang, x["say"]))  # a bin or side with its own line in the lesson language
            continue
        o = x.get("show", x)
        if not target and isinstance(o, dict) and o.get("object") and o.get("count") is None:
            out.append((lang, word(objects, o["object"], lang)))
        elif t.get("option_audio") is not False and isinstance(x.get("text"), str) and not LETTERISH.fullmatch(x["text"]):
            out.append((lang, x["text"]))  # a number or sum card reads itself ("2 + 2")
    for oid in (t.get("show") or {}).get("objects", []):
        if not target:
            out.append((lang, word(objects, oid, lang)))
    return out


def word(objects, oid, lang):
    """An object's word without its article: der Löwe -> Löwe."""
    label = objects[oid]["labels"][lang]
    return label.split(" ", 1)[-1] if lang in ("de", "fr") and " " in label else label


def option_texts(t, objects, lang):
    """What each option says when its speaker is tapped, or [] for none."""
    if t.get("option_audio") is False or (t.get("option_audio") is None and t["type"] in NO_OPTION_AUDIO):
        return []
    out = []
    for o in t.get("options", []):
        if isinstance(o, dict) and "count" in o:
            continue  # "Wo sind 2 Bananen?": hearing the group would give the answer
        if isinstance(o, dict) and "object" in o:
            out.append(word(objects, o["object"], lang))
        elif isinstance(o, str) and (t.get("option_audio") or not LETTERISH.fullmatch(o)):
            out.append(o)
    return out


def voice_cfg(cfg, curriculum):
    """chosen and assign for a curriculum (curricula: in voices.yaml), else the default."""
    return (cfg.get("curricula") or {}).get(curriculum) or cfg


def curriculum_for_language(cfg, lang):
    for cur, c in (cfg.get("curricula") or {}).items():
        if c.get("language") == lang:
            return cur
    return None


def voice_for(cfg, curriculum, activity=None, phrase=None):
    """The voice for one use of a line: `assign`, else `chosen`, per curriculum.
    Must match voiceFor() in player/build.mjs."""
    c = voice_cfg(cfg, curriculum)
    a = c.get("assign") or {}
    return a.get(f"phrases.{phrase}") if phrase and f"phrases.{phrase}" in a else a.get(activity, c["chosen"])


def gather(cfg):
    """{line id: {lang, text, kind, voices, used}} from lessons and phrases."""
    lines = {}
    objects = {o["id"]: o for o in yaml.safe_load((ASSETS / "objects.yaml").read_text())["objects"]}

    def add(lang, text, kind, where, activity=None, phrase=None):
        if not text:
            return
        t = spoken(text, lang)
        lid = hashlib.sha1(f"{lang}|{t}".encode()).hexdigest()[:10]
        v = voice_for(cfg, CUR, activity, phrase)
        e = lines.setdefault(lid, {"lang": lang, "text": t, "kind": kind, "voices": [], "used": []})
        if MIXED and lang != MIXED:
            e["mixed"] = True  # a home-language line in a lesson that teaches MIXED
        e["used"].append(where)
        if v not in e["voices"]:
            e["voices"].append(v)
        SEQ.append((where, lid, v))

    global MIXED, CUR
    for p in sorted((TWIST / "lessons").rglob("*.yaml")):
        try:
            d = yaml.safe_load(p.read_text())
        except yaml.YAMLError as e:
            print(f"skipped {p.relative_to(TWIST)}: not valid YAML ({str(e).splitlines()[0]})", file=sys.stderr)
            continue
        lang, rel = d["language"], p.relative_to(TWIST / "lessons").with_suffix("")
        MIXED = d.get("target_language")
        CUR = d["curriculum"]
        for l in d["lessons"]:
            add(lang, l["title"].get(lang), "title", f"{rel}#{l['n']}")
            for a in l["activities"]:
                for i, s in enumerate(a.get("screens", [])):
                    say = s.get("say") or s.get("text")
                    for lg, v in (say.items() if isinstance(say, dict) else [(lang, say)]):
                        add(lg, v, "learn", f"{rel}#{l['n']}/learn{i + 1}", "learn")
                for t in a.get("tasks", []) + [t for st in a.get("stages", []) for t in st["tasks"]]:
                    w = f"{rel}#{l['n']}/{t['id']}"
                    say = t.get("say") or t.get("text")
                    for lg, v in (say.items() if isinstance(say, dict) else [(lang, say)]):
                        add(lg, v, "prompt", w, a["activity"])
                    for lg, v in (t.get("audio") or {}).items():
                        if lg != "sound":
                            add(lg, v, "target", w, a["activity"])
                    # A speak task plays the model after the child has spoken
                    # (the fallback while speech is not marked). Must match
                    # speakModel() in player/build.mjs.
                    if t["type"] == "speak":
                        tl = d.get("target_language") or lang
                        add(tl, speak_model(t, tl), "target", w, a["activity"])
                    for h in t.get("hints", []):
                        add(lang, h, "hint", w, a["activity"])
                    for v in (t.get("feedback") or {}).values():
                        add(lang, v, "feedback", w, a["activity"])
                    for v in option_texts(t, objects, lang):
                        add(lang, v, "option", w, a["activity"])
                    # A pair side, bin or option can carry its own `say` (a
                    # colour swatch saying "Yellow." when tapped).
                    for lg, v in tappable(t, objects, lang, d.get("target_language")):
                        add(lg, v, "option", w, a["activity"])
    MIXED = None
    for lang, groups in yaml.safe_load((ASSETS / "phrases.yaml").read_text()).items():
        CUR = curriculum_for_language(cfg, lang)
        for g, items in groups.items():
            for x in items:
                add(lang, x, "phrase", f"phrases/{lang}/{g}", phrase=g)
    return lines


def post(k, path, body, raw=False):
    req = urllib.request.Request(f"https://openrouter.ai/api/v1/{path}", data=json.dumps(body).encode(),
                                 headers={"Authorization": f"Bearer {k}", "Content-Type": "application/json"})
    tries = 8
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                data = r.read()
            return data if raw else json.loads(data)
        except urllib.error.HTTPError as e:
            if attempt == tries - 1 or e.code not in (408, 429, 500, 502, 503, 504):
                raise RuntimeError(f"HTTP {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
        except (urllib.error.URLError, OSError):
            if attempt == tries - 1:
                raise
        # Back off longer each time, with jitter so parallel jobs spread out
        # (a rate limit is per minute).
        time.sleep(min(120, 10 * 2 ** attempt) * (0.5 + random.random()))


def tts(k, v, text, direction):
    g = "gemini" in v["model"]
    body = {"model": v["model"], "input": text, "voice": v["voice"], "response_format": "pcm" if g else "mp3"}
    if g and direction:
        body["instructions"] = direction
    audio = post(k, "audio/speech", body, raw=True)
    if not g:
        return audio, "mp3"
    buf = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    with wave.open(buf.name, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(audio)
    data = Path(buf.name).read_bytes()
    Path(buf.name).unlink()
    return data, "wav"


def finish(audio, fmt, dest, cap=None):
    """Trim silence, even the loudness, mono 48 kbps MP3; cap held sounds."""
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp) / f"in.{fmt}"
        src.write_bytes(audio)
        af = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,"
              "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,loudnorm=I=-18:TP=-2")
        if cap:
            af += f",atrim=0:{cap},afade=t=out:st={cap - 0.2}:d=0.2"
        dest.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", af, "-ar", "24000", "-ac", "1", "-b:a", "48k", str(dest)], check=True)


def listen(k, f, expect):
    prompt = (f"Listen to this clip. It should say: {expect}. Reply as JSON only: "
              '{"heard": "what you hear", "correct": true or false, "issues": "short, or empty"}. '
              "Be strict about wrong words, wrong numbers, a letter name (El, Em) said instead of a sound, and a wrong language or accent.")
    d = post(k, "chat/completions", {"model": LISTEN_MODEL, "temperature": 0, "response_format": {"type": "json_object"},
        "messages": [{"role": "user", "content": [{"type": "text", "text": prompt},
            {"type": "input_audio", "input_audio": {"data": base64.b64encode(f.read_bytes()).decode(), "format": "mp3"}}]}]})
    m = re.search(r"\{.*\}", d["choices"][0]["message"]["content"], re.S)
    return json.loads(m.group(0)) if m else {"heard": "", "correct": False, "issues": "unreadable reply"}


def duration(f):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)], capture_output=True, text=True)
    return round(float(out.stdout.strip() or 0), 2)


def run_voice(k, cfg, v, lines, sounds, check, jobs, redo=()):
    vdir, logf = OUT / v["id"], OUT / f"{v['id']}.yaml"
    log = (yaml.safe_load(logf.read_text()) if logf.exists() else None) or {}
    brief = v.get("brief", cfg["brief"])
    sounds = [x for x in sounds if x["id"].split(".")[0] == v.get("language", "de")]  # a voice makes the sounds of its language
    mine = {lid: e for lid, e in lines.items() if v["id"] in e["voices"]}
    # Drop clips this voice no longer says (text changed, or assigned to
    # another voice), and any to redo.
    keep = set(mine) | {s["id"] for s in sounds}
    for iid in [i for i in log if i not in keep or i in redo]:
        (vdir / log.pop(iid)["file"]).unlink(missing_ok=True)
    work = [("line", lid, e) for lid, e in mine.items()] + [("sound", s["id"], s) for s in sounds]
    lock, done = threading.Lock(), [0]

    def save():
        with lock:
            snap = dict(sorted(log.items()))
        logf.write_text(f"# Written by tools/narration.py: {v['model']}, voice {v['voice']}.\n" + dump(snap))

    def one(item):
        kind, iid, e = item
        if kind == "line":
            dest, text = vdir / f"{iid}.mp3", e["text"]
            vlang = v.get("language", "de")
            if e["lang"] != vlang:  # a target-language line: that language's note
                note = cfg["en_note"] if e["lang"] == "en" else cfg["target_notes"][e["lang"]]
            elif e.get("mixed"):  # a home-language line in a foreign-language lesson
                note = (cfg.get("mixed_notes") or {}).get(e["lang"], cfg["mixed_note"])
            else:
                note = ""
            direction = brief + (" " + note if note else "")
            expect, cap = f'"{text}" ({LANG_NAME[e["lang"]]})', None
        else:
            dest, text = vdir / "sounds" / f"{iid.replace(':', '-long')}.mp3", e["say"]
            direction, expect, cap = brief + " " + e["how"], e["what"], MAX_SOUND
        dhash = hashlib.sha1(direction.encode()).hexdigest()[:8]
        # Remade when the direction changed (a new brief), not only when missing.
        if dest.exists() and iid in log and log[iid].get("direction", dhash) == dhash:
            return
        # A clip on disk with no log entry (a run stopped before it saved its
        # log): the id is a hash of the text, so keep it and only listen to it.
        adopt = dest.exists() and iid not in log
        try:
            for attempt in (1, 2):
                if not (adopt and attempt == 1):
                    audio, fmt = tts(k, v, text, direction)
                    finish(audio, fmt, dest, cap)
                r = listen(k, dest, expect) if check else {}
                if not check or r.get("correct"):
                    break
            log[iid] = {"file": str(dest.relative_to(vdir)), "text": text, "seconds": duration(dest), "bytes": dest.stat().st_size,
                        "made": str(date.today()), "tries": attempt, "direction": dhash, **({"check": r} if check else {})}
            with lock:
                done[0] += 1
                n = done[0]
            if n % 100 == 0:  # save as it goes, so a stopped run keeps its log
                save()
                print(f"  {v['id']}: {n} made", flush=True)
        except Exception as ex:
            print(f"  {v['id']} {iid} FAILED {str(ex)[:120]}", flush=True)

    with ThreadPoolExecutor(jobs) as ex:
        list(ex.map(one, work))
    ok = sum(1 for x in log.values() if x.get("check", {}).get("correct"))
    save()
    print(f"{v['id']}: {len(log)} clips, {ok} passed the listening check, {len(work) - len(log)} missing")


def page(lines, cfg, sounds):
    """narration/pilot.html: play any lesson in order, each line in its assigned voice."""
    logs = {}
    for v in cfg["candidates"]:
        f = OUT / f"{v['id']}.yaml"
        logs[v["id"]] = {k: {"ok": bool(x.get("check", {}).get("correct")), "heard": x.get("check", {}).get("heard", "")}
                         for k, x in ((yaml.safe_load(f.read_text()) or {}).items() if f.exists() else [])}
    # One group per lesson ("de-DE/math/add-bridge-10#1"), in lesson order.
    groups = {}
    for w, lid, voice in SEQ:
        g = w.split("#")[0] + "#" + w.split("#")[1].split("/")[0] if "#" in w else "phrases"
        e = lines[lid]
        groups.setdefault(g, []).append({"id": lid, "kind": e["kind"], "text": e["text"], "lang": e["lang"], "voice": voice})
    data = {"chosen": cfg["chosen"], "voices": [{"id": "", "label": "As assigned: " + ", ".join(f"{k} by {v}" for k, v in (cfg.get("assign") or {}).items()) + f", the rest by {cfg['chosen']}", "note": ""}],
            "groups": groups, "sounds": [{"id": s["id"], "file": s["id"].replace(":", "-long"), "what": s["what"]} for s in sounds], "logs": logs}
    html = """<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Voice pilot</title>
<style>
:root{--bg:#fbfaf7;--fg:#2a2233;--muted:#6b6375;--line:#e6e1ea;--accent:#6b3fb0;--bad:#b4232a}
@media (prefers-color-scheme:dark){:root{--bg:#18151c;--fg:#eee9f2;--muted:#a59cad;--line:#332c3a;--accent:#c39bff;--bad:#ff8a8a}}
body{background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,sans-serif;margin:0 auto;max-width:900px;padding:16px}
h1{font-size:22px;margin:4px 0 2px}h2{font-size:16px;margin:22px 0 6px}p{color:var(--muted);margin:4px 0 12px}
.bar{position:sticky;top:0;background:var(--bg);padding:8px 0;border-bottom:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap;align-items:center;z-index:1}
select,button{font:inherit;padding:6px 10px;border:1px solid var(--line);border-radius:8px;background:transparent;color:var(--fg)}
button.play{border-color:var(--accent);color:var(--accent)}
.row{display:flex;gap:10px;align-items:baseline;padding:5px 0;border-bottom:1px solid var(--line);cursor:pointer}
.row.on{background:color-mix(in srgb,var(--accent) 12%,transparent)}
.k{font-size:12px;color:var(--muted);min-width:64px}.t{flex:1}.x{font-size:12px;color:var(--bad)}
.snd{display:inline-block;margin:4px 8px 4px 0}
</style>
<h1>Voice pilot</h1><p>Every line of the three de-DE model lessons in each candidate voice. Tap a line to hear it, or play a whole lesson. Red notes are where the listening check disagreed.</p>
<div class=bar><select id=v></select><select id=g></select><button class=play id=all>Play lesson</button><button id=stop>Stop</button></div>
<div id=list></div><h2>Sounds</h2><div id=snd></div>
<script>
const D=__DATA__;const a=new Audio();let q=[],cur=null;
const V=document.getElementById('v'),G=document.getElementById('g'),L=document.getElementById('list');
D.voices.forEach(v=>V.add(new Option(v.label,v.id)));Object.keys(D.groups).forEach(g=>G.add(new Option(g,g)));
try{V.value=localStorage.getItem('voice')||V.value}catch(e){}
function vo(x){return V.value||x.voice}function src(x){return vo(x)+'/'+x.id+'.mp3'}
function render(){try{localStorage.setItem('voice',V.value)}catch(e){}L.innerHTML='';
 D.groups[G.value].forEach((x,i)=>{const r=document.createElement('div');r.className='row';r.dataset.i=i;
  const c=(D.logs[vo(x)]||{})[x.id];r.innerHTML=`<span class=k>${x.kind}${x.lang!=='de'?' · '+x.lang:''}${V.value?'':' · '+x.voice.split('-')[1]}</span><span class=t></span>`+(c&&!c.ok?`<span class=x></span>`:'');
  r.querySelector('.t').textContent=x.text;if(c&&!c.ok)r.querySelector('.x').textContent='heard: '+c.heard;
  r.onclick=()=>{q=[];play(i)};L.appendChild(r)});
 const S=document.getElementById('snd');S.innerHTML='';D.sounds.forEach(s=>{const b=document.createElement('button');b.className='snd';b.textContent=s.id;b.title=s.what;b.onclick=()=>{a.src=(V.value||D.chosen)+'/sounds/'+s.file+'.mp3';a.play()};S.appendChild(b)})}
function play(i){const rows=[...L.children];rows.forEach(r=>r.classList.remove('on'));const x=D.groups[G.value][i];if(!x)return;rows[i].classList.add('on');cur=i;a.src=src(x);a.play().catch(()=>{})}
a.onended=()=>{if(q.length){setTimeout(()=>play(q.shift()),350)}};
document.getElementById('all').onclick=()=>{const n=D.groups[G.value].length;q=[...Array(n).keys()].slice(1);play(0)};
document.getElementById('stop').onclick=()=>{q=[];a.pause()};V.onchange=render;G.onchange=render;render();
</script>"""
    (OUT / "pilot.html").write_text(html.replace("__DATA__", json.dumps(data, ensure_ascii=False)))
    print("narration/pilot.html")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", help="a candidate id, or all")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--page", action="store_true", help="write narration/pilot.html")
    ap.add_argument("--no-check", action="store_true")
    ap.add_argument("--jobs", type=int, default=8)
    ap.add_argument("--redo", help="comma-separated line or sound ids to remake")
    a = ap.parse_args()
    cfg = yaml.safe_load((ASSETS / "voices.yaml").read_text())
    lines = gather(cfg)
    OUT.mkdir(exist_ok=True)
    (OUT / "lines.yaml").write_text("# Written by tools/narration.py: every spoken line, one clip each.\n"
                                    + dump(lines))
    print(f"{len(lines)} lines in narration/lines.yaml")
    sounds = [s for s in yaml.safe_load((ASSETS / "sounds.yaml").read_text())["sounds"] if "say" in s]
    if a.page:
        return page(lines, cfg, sounds)
    if a.list or not a.voice:
        return
    voices = cfg["candidates"] if a.voice == "all" else [v for v in cfg["candidates"] if v["id"] == a.voice]
    if not voices:
        sys.exit(f"no candidate {a.voice}")
    if not subprocess.run(["which", "ffmpeg"], capture_output=True).returncode == 0:
        sys.exit("ffmpeg is needed.")
    k = key()
    # Voices run side by side; each has its own clips and log.
    with ThreadPoolExecutor(len(voices)) as ex:
        list(ex.map(lambda v: run_voice(k, cfg, v, lines, sounds, not a.no_check, a.jobs, set(a.redo.split(",")) if a.redo else set()), voices))


if __name__ == "__main__":
    main()
