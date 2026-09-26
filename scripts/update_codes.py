#!/usr/bin/env python3
import html
import json
import re
import urllib.request
from datetime import date

SOURCE = "https://www.pockettactics.com/summoners-war/codes"
OUT = "codes.json"

def fetch():
    req = urllib.request.Request(SOURCE, headers={"User-Agent": "Mozilla/5.0 YunaRunesCodesBot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")

def clean(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return html.unescape(s)

def main():
    raw = clean(fetch())
    # Only use the current-code section, before the site's expired-code section.
    active_part = re.split(r"Expired codes\s*:", raw, maxsplit=1, flags=re.I)[0]
    # SW coupon codes are uppercase/digit strings; avoid ordinary prose words.
    candidates = re.findall(r"\b[A-Z0-9][A-Z0-9_-]{7,}\b", active_part)
    codes = []
    seen = set()
    for code in candidates:
        code = code.strip("_-")
        if code in seen:
            continue
        if not re.search(r"[A-Z]", code) or not re.search(r"\d", code):
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
        json.dump({
            "updated": str(date.today()),
            "source": SOURCE,
            "codes": codes
        }, f, ensure_ascii=False, indent=2)
        f.write("\n")

if __name__ == "__main__":
    main()
