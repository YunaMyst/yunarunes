import json
import re
from pathlib import Path

CATALOG = Path("monster-catalog.json")
DETAILS = Path("monster-details.json")
TECHNICAL = re.compile(r"edit|left|right|direita|direito|esquerda|esquerdo|modifica[cç][aã]o|cristal|chefe do despertar", re.I)
MATERIAL_ROLES = {"material", "matérial", "fodder"}


def main():
    catalog_data = json.loads(CATALOG.read_text(encoding="utf-8"))
    details_data = json.loads(DETAILS.read_text(encoding="utf-8"))
    clean, seen = [], set()
    for monster in catalog_data.get("monsters", []):
        stars = int(monster.get("stars") or 0)
        name = str(monster.get("name") or "").strip()
        element = str(monster.get("element") or "").strip()
        family = str(monster.get("family") or "").strip()
        role = str(monster.get("role") or "").strip().lower()
        if stars < 2 or stars > 5 or not name or not element:
            continue
        if family in {"", "100000", "0", "None"} or role in MATERIAL_ROLES or TECHNICAL.search(name):
            continue
        detail = details_data.get(monster.get("detailsKey"), {})
        if detail.get("obtainable") is False:
            continue
        if str(detail.get("archetype") or "").strip().lower() in MATERIAL_ROLES:
            continue
        key = (family, element, int(monster.get("awakeningLevel") or 0))
        if key in seen:
            continue
        seen.add(key)
        clean.append(monster)
    clean.sort(key=lambda m: (str(m.get("name") or "").lower(), str(m.get("element") or ""), int(m.get("stars") or 0), int(m.get("awakeningLevel") or 0)))
    keep = {m.get("detailsKey") for m in clean if m.get("detailsKey")}
    filtered_details = {"_meta": details_data.get("_meta", {})}
    filtered_details.update({k: v for k, v in details_data.items() if k in keep})
    meta = dict(catalog_data.get("_meta", {}))
    meta.update({"generatedBy": "YunaRunes", "filter": "playable unique monsters only", "playableMonsterVariants": len(clean)})
    CATALOG.write_text(json.dumps({"_meta": meta, "monsters": clean}, ensure_ascii=False, indent=2), encoding="utf-8")
    DETAILS.write_text(json.dumps(filtered_details, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Playable monster variants: {len(clean)}")


if __name__ == "__main__":
    main()
