# 🔄 HANDOFF.md — Dev Shift Handoff Log

> **Read this FIRST when starting your shift.** Update it LAST before ending your shift.

---

## 🏗️ Current State

**Last updated:** 2026-03-30 20:40 UTC
**Last dev:** Flexo (shift 3)
**Repo:** `Bender21m/satoshi-valley` | Fork: `satsdisco/satoshi-valley`
**Live demo:** https://bender21m.github.io/satoshi-valley
**game.js lines:** ~5,300 | **Save version:** v8 | **Sprints complete:** 14 | **Open issues:** 2

### What's Working ✅
- Full mining loop (3 rig tiers, power grid, durability, overheating)
- Farming (potato, tomato, corn, pumpkin) — plant, grow, harvest, sell
- Animal system (cow, goat, chicken, bee) with auto-feed from chest
- Fencing system + crafting bench (8 recipes)
- 5 building interiors (home, shop, tavern, shed, town hall)
- 9 NPCs with Bitcoin culture dialogue + daily schedules (tavern in evening!)
- **NPC quest system** — 15 quests across 6 NPCs with rewards
- Shop system (Ruby's Hardware, Seed Sally, Farmer Pete's Market)
- Tavern with beer/stew/pie/wine + drunk effect
- Citadel upgrade system (5 tiers: Shack → Citadel)
- Quest log with 15 objectives across 5 chapters
- BIP39 seed word collectibles (24 words placed across the map)
- **Fishing minigame** — 3 fish types including rare Bitcoin Fish
- Procedural music engine + terrain footsteps
- Weather system + seasonal visuals (autumn leaves, winter snow)
- Enhanced minimap (shows rigs, crops, animals, seed fragments)
- Late-game sat sinks (100K-1M sats: academy, monument, satellite, rocket)
- Title screen, pause menu, crafting bench
- Click-to-move, shift-click to place items
- Save/load v8 with quest progress

### Current Priority 🎯
**VISUAL POLISH SPRINT — Valley first, expansion later**
- DO NOT add new regions yet
- Focus: paths, buildings, characters, grass, water, lighting
- Make the valley feel lived-in and beautiful
- See ROADMAP.md "Visual Polish Sprint" section for full checklist

### Known Bugs 🐛
- #34: Building interiors don't change with citadel tier
- #56: Performance (not urgent, monitor only)

### What NOT to Do ❌
- Don't add Fiatropolis or new regions yet
- Don't add multiplayer features
- Don't restructure save format (v8 is stable)
- Don't rewrite the game engine

## 📝 Shift Log

### Shift 3 — Flexo (2026-03-30, evening)
**Did:**
- Code review + bug audit (filed issues #48-#68)
- Fixed 6 bugs: citadel trap, sleep energy, rain crops, alpha/shadow leaks, duplicate NPC check
- Sprint 12: Crafting system (8 recipes), fencing, decorations
- Sprint 13: Fishing minigame (3 fish types, timing minigame)
- Sprint 14: NPC quest system (15 quests across 6 NPCs), late-game sat sinks (up to 1M sats)
- Seasonal visuals (autumn leaves, winter snow, color shifts)
- Enhanced minimap (shows all placed items)
- NPC daily schedules (tavern gathering in evening)
- All 24 seed fragments placed across the map
- Updated ROADMAP with visual polish priority

**Next priority:** Visual polish — make the valley beautiful before expanding

### Shift 2 — Bender (2026-03-30, daytime)
**Did:**
- NPC pixel art overhaul (9 unique characters with walk animations)
- Perlin noise terrain (no more checkerboard grass)
- Beautiful water with caustics and shoreline foam
- Tree overhaul (tapered trunks, layered canopies)
- Rich terrain (stone, dirt, flowers, mushrooms all upgraded)
- Building exterior facades (unique per building)
- Tavern menu system
- Visible bed + sleep prompt
- Auto-feed animals from chest
- Night gameplay improvements

### Shift 1 — Flexo (2026-03-29/30, overnight)
**Did:**
- Built entire prototype from zero (Sprints 1-11)
- All core systems: mining, farming, economy, NPCs, quests, crafting, UI

---

## 📏 Rules for Devs

1. **ALWAYS read HANDOFF.md first**
2. **ALWAYS `git pull origin main`** before changes
3. **ALWAYS update HANDOFF.md** before ending shift
4. **Test before pushing** — `node -c web/game.js` + play test
5. **Don't break existing features**
6. **Current focus: VISUAL POLISH** — not new features

## 🔑 Repo Access
- **Flexo** pushes directly to Bender21m (has access)
- **Bender** uses fork + PRs from satsdisco

---

*Current priority: Make Satoshi Valley the most beautiful pixel art Bitcoin game ever made.* 🧡
