import json
import time
from pathlib import Path
from urllib.request import Request, urlopen

BASE = "https://swarfarm.com/api/v2"
OUT = Path("monster-details.json")


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


def main():
    monsters = paged("monsters")
    skills = {str(s.get("id")): s for s in paged("skills")}
    result = {
        "_meta": {
            "source": "SWARFARM Bestiary API",
            "generatedBy": "YunaRunes",
            "naturalStars": "1-5",
            "note": "Static snapshot generated automatically by GitHub Actions."
        }
    }

    for m in monsters:
        natural = int(m.get("natural_stars") or 0)
        if natural < 1 or natural > 5:
            continue
        name = str(m.get("name") or "").strip()
        element = str(m.get("element") or "").strip()
        if not name or not element:
            continue
        key = f"{name}|{element}|{natural}"
        skill_list = []
        for sid in (m.get("skills") or []):
            obj = skills.get(str(sid))
            rec = skill_record(obj, sid)
            if rec:
                skill_list.append(rec)
        leader = m.get("leader_skill") or {}
        leader_text = ""
        if leader:
            attr = leader.get("attribute") or ""
            amount = leader.get("amount")
            area = leader.get("area") or ""
            leader_text = " ".join(str(x) for x in [attr, f"{amount}%" if amount is not None else "", area] if x)
        costs = []
        for c in (m.get("awaken_cost") or []):
            item = c.get("item") or {}
            costs.append({"item": item.get("name", ""), "quantity": c.get("quantity", 0)})
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
        result[key] = {
            "name": name,
            "element": element,
            "naturalStars": natural,
            "stats": stats,
            "baseStats": {
                "HP": m.get("base_hp"),
                "ATK": m.get("base_attack"),
                "DEF": m.get("base_defense"),
                "SPD": m.get("speed"),
            },
            "skills": skill_list,
            "leaderSkill": leader_text,
            "awakening": m.get("awaken_bonus") or "",
            "awakeningLevel": m.get("awaken_level"),
            "awakeningCost": costs,
            "skillUpsToMax": m.get("skill_ups_to_max"),
            "canAwaken": m.get("can_awaken"),
            "obtainable": m.get("obtainable"),
            "runes": {"sets": [], "mainStats": {}, "subStats": []},
            "source": f"https://swarfarm.com/bestiary/{m.get('bestiary_slug','')}" if m.get("bestiary_slug") else "https://swarfarm.com/bestiary/"
        }

    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(result)-1} monster variants")


if __name__ == "__main__":
    main()
