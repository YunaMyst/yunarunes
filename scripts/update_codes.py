#!/usr/bin/env python3
import html
import json
import re
import urllib.request
from datetime import date

SOURCE = "https://www.pockettactics.com/summoners-war/codes"
OUT = "codes.json"

def fetch():
    req = urllib.request.Request(SOURCE, headers={"User-Agent": "Mozilla/5.0 YunaRunesCodesBot/2.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")

def clean(s):
    s = re.sub(r"<script[\s\S]*?</script>", " ", s, flags=re.I)
    s = re.sub(r"<style[\s\S]*?</style>", " ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()

def main():
    raw = clean(fetch())

    # Read only the current active-code section.
    start = -1
    for pattern in (
        r"Here are all of the new Summoners War codes:",
        r"Here are the new Summoners War codes:",
        r"Active codes:"
    ):
        m = re.search(pattern, raw, flags=re.I)
        if m:
            start = m.end()
            break
    if start < 0:
        raise SystemExit("Active-code section not found; refusing to overwrite codes.json")

    end = len(raw)
    for pattern in (
        r"How do I redeem Summoners War codes\?",
        r"What are Summoners War codes\?",
        r"Expired codes:"
    ):
        m = re.search(pattern, raw[start:], flags=re.I)
        if m:
            end = start + m.start()
            break

    active_text = raw[start:end]
    candidates = re.findall(
        r"(?<![A-Za-z0-9_-])[A-Z0-9][A-Z0-9_-]{7,}(?![A-Za-z0-9_-])",
        active_text
    )

    codes = []
    seen = set()
    for code in candidates:
        code = code.strip("_-")
        if code in seen or not re.search(r"[A-Z]", code) or not re.search(r"\d", code):
            continue
        seen.add(code)
        codes.append({
            "code": code,
            "rewards": ["Verified active code"],
            "ios": "https://withhive.me/313/" + code,
            "expires": None
        })

    if not codes:
        raise SystemExit("No active codes detected; refusing to overwrite codes.json")

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"updated": str(date.today()), "source": SOURCE, "codes": codes}, f, ensure_ascii=False, indent=2)
        f.write("\n")

if __name__ == "__main__":
    main()
