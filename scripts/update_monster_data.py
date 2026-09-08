import json
import time
from pathlib import Path
from urllib.request import Request, urlopen

BASE = "https://swarfarm.com/api/v2"
DETAILS_OUT = Path("monster-details.json")
CATALOG_OUT = Path("monster-catalog.json")
IMAGE_BASE = "https://swarfarm.com/static/herders/images/monsters/"


def get_json(url):
    req = Request(url, headers={"User-Agent": "YunaRunes/1.0 (community tool)"})
    with urlopen(req, timeout=60) as r:
        return json.load(r)


def paged(endpoint):
    page = 1
    out = []
    while True:
        data = get_json(f"{BASE}/{endpoint}/?page={page}&page_size=100")
        out.extend(data.get("results", []))
        if not data.get("next"):
            return out
        page += 1
        time.sleep(0.4)


def skill_record(skill, skill_id):
    if not skill:
        return None
    effects = []
    for e in skill.get("effects", []) or []:
        effect = e.get("effect") or {}
        name = effect.get("name")
        if name:
            effects.append(name)
    return {
        "id": skill.get("id", skill_id),
        "name": skill.get("name", ""),
        "description": skill.get("description", ""),
        "slot": skill.get("slot"),
        "cooltime": skill.get("cooltime"),
        "hits": skill.get("hits"),
        "passive": skill.get("passive"),
        "aoe": skill.get("aoe"),
        "multiplier": skill.get("multiplier_formula"),
        "scalesWith": skill.get("scales_with", []),
        "effects": effects,
        "upgrades": skill.get("upgrades", []),
    }


def leader_text(leader):
    if not leader:
        return ""
    attr = leader.get("attribute") or ""
    amount = leader.get("amount")
    area = leader.get("area") or ""
    return " ".join(str(x) for x in [attr, f"{amount}%" if amount is not None else "", area] if x)


def awakening_costs(monster):
    costs = []
    for c in monster.get("awaken_cost") or []:
        item = c.get("item") or {}
        costs.append({"item": item.get("name", ""), "quantity": c.get("quantity", 0)})
    return costs


def variant_key(m):
    return f"{m['name']}|{m['element']}|{m['naturalStars']}|A{m['awakeningLevel']}"


def main():
    monsters = paged("monsters")
    skills = {str(s.get("id")): s for s in paged("skills")}
    details = {
        "_meta": {
            "source": "SWARFARM Bestiary API",
            "generatedBy": "YunaRunes",
            "naturalStars": "1-5",
            "includesSecondAwakening": True,
            "note": "Static snapshot generated automatically by GitHub Actions."
        }
    }
    catalog = []
    seen = set()

    for m in monsters:
        natural = int(m.get("natural_stars") or 0)
        if natural < 1 or natural > 5:
            continue
        name = str(m.get("name") or "").strip()
        element = str(m.get("element") or "").strip()
        if not name or not element:
            continue
        awakening_level = int(m.get("awaken_level") or 0)
        key = variant_key({"name": name, "element": element, "naturalStars": natural, "awakeningLevel": awakening_level})

        skill_list = []
        for sid in (m.get("skills") or []):
            if isinstance(sid, dict):
                obj = sid
                sid_value = sid.get("id")
            else:
                sid_value = sid
                obj = skills.get(str(sid))
            rec = skill_record(obj, sid_value)
            if rec:
                skill_list.append(rec)

        stats = {
            "HP": m.get("max_lvl_hp"),
            "ATK": m.get("max_lvl_attack"),
            "DEF": m.get("max_lvl_defense"),
            "SPD": m.get("speed"),
            "CRI Rate": m.get("crit_rate"),
            "CRI Dmg": m.get("crit_damage"),
            "Resistance": m.get("resistance"),
            "Accuracy": m.get("accuracy"),
        }
        base_stats = {
            "HP": m.get("base_hp"),
            "ATK": m.get("base_attack"),
            "DEF": m.get("base_defense"),
            "SPD": m.get("speed"),
        }
        image = m.get("image_filename") or ""
        image_url = IMAGE_BASE + image if image else ""

        details[key] = {
            "name": name,
            "element": element,
            "naturalStars": natural,
            "baseStars": m.get("base_stars"),
            "awakeningLevel": awakening_level,
            "isSecondAwakening": awakening_level >= 2,
            "familyId": m.get("family_id"),
            "com2usId": m.get("com2us_id"),
            "archetype": m.get("archetype"),
            "stats": stats,
            "baseStats": base_stats,
            "skills": skill_list,
            "leaderSkill": leader_text(m.get("leader_skill") or {}),
            "awakening": m.get("awaken_bonus") or "",
            "awakeningCost": awakening_costs(m),
            "skillUpsToMax": m.get("skill_ups_to_max"),
            "canAwaken": m.get("can_awaken"),
            "obtainable": m.get("obtainable"),
            "image": image_url,
            "runes": {"sets": [], "mainStats": {}, "subStats": []},
            "source": f"https://swarfarm.com/bestiary/{m.get('bestiary_slug','')}" if m.get("bestiary_slug") else "https://swarfarm.com/bestiary/"
        }

        if key not in seen:
            seen.add(key)
            catalog.append({
                "id": m.get("id"),
                "name": name,
                "element": element,
                "family": m.get("family_id"),
                "role": m.get("archetype") or "",
                "stars": natural,
                "awakeningLevel": awakening_level,
                "isSecondAwakening": awakening_level >= 2,
                "image": image_url,
                "detailsKey": key,
            })

    catalog.sort(key=lambda x: (x["name"].lower(), x["element"], x["stars"], x["awakeningLevel"]))
    DETAILS_OUT.write_text(json.dumps(details, ensure_ascii=False, indent=2), encoding="utf-8")
    CATALOG_OUT.write_text(json.dumps({
        "_meta": {"source": "SWARFARM Bestiary API", "includesSecondAwakening": True},
        "monsters": catalog
    }, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(catalog)} monster variants, including second awakenings")


if __name__ == "__main__":
    main()
