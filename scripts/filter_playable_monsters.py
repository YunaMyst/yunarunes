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
    source = catalog_data.get("monsters", [])
    clean = []
    seen = set()

    for monster in source:
        stars = int(monster.get("stars") or 0)
        if stars < 2 or stars > 5:
            continue
        name = str(monster.get("name") or "").strip()
        element = str(monster.get("element") or "").strip()
        family = str(monster.get("family") or "").strip()
        role = str(monster.get("role") or "").strip().lower()
        if not name or not element:
            continue
        if family in {"", "100000", "0", "None"}:
            continue
        if role in MATERIAL_ROLES:
            continue
        if TECHNICAL.search(name):
            continue

        details_key = monster.get("detailsKey")
        detail = details_data.get(details_key, {}) if details_key else {}
        if detail and detail.get("obtainable") is False:
            continue
        if detail and str(detail.get("archetype") or "").strip().lower() in MATERIAL_ROLES:
            continue

        # One displayed entry per real monster family + element.
        # Normal awakening and Second Awakening are states of the same monster,
        # not separate monsters for the YunaRunes catalog.
        unique_key = (family, element)
        if unique_key in seen:
            continue
        seen.add(unique_key)
        clean.append(monster)

    clean.sort(key=lambda m: (
        str(m.get("name") or "").lower(),
        str(m.get("element") or ""),
        int(m.get("stars") or 0),
        int(m.get("awakeningLevel") or 0),
    ))

    keep_keys = {m.get("detailsKey") for m in clean if m.get("detailsKey")}
    filtered_details = {"_meta": details_data.get("_meta", {})}
    filtered_details.update({k: v for k, v in details_data.items() if k in keep_keys})

    meta = dict(catalog_data.get("_meta", {}))
    meta.update({
        "generatedBy": "YunaRunes",
        "filter": "playable monsters only; natural 2-5 stars; materials, technical placeholders and duplicate family/element entries removed; awakening states are not separate catalog entries",
        "playableMonsters": len(clean),
    })

    CATALOG.write_text(
        json.dumps({"_meta": meta, "monsters": clean}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    DETAILS.write_text(
        json.dumps(filtered_details, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Playable monsters: {len(clean)}")


if __name__ == "__main__":
    main()
