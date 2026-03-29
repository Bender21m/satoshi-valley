# Satoshi Valley — Sprint Plan

> Phase-based development. Polish before features. Fun before content.

---

## ✅ PHASE 0: PROTOTYPE (COMPLETE)

### Sprint 1: "The Foundation"
- [x] GDD, GitHub repo, GitHub Pages deployment
- [x] Player movement, mining rigs, economy, day/night, HUD

### Sprint 2: "The Homestead"
- [x] Fullscreen, bigger world (120×90), Perlin noise terrain
- [x] River, lake, forest, mountains, buildings, paths, bridge
- [x] 7 NPCs with deep Bitcoin culture dialogue
- [x] Day/night cycle, market phases, halving events

### Sprint 3: "The Economy"
- [x] Shop system (Ruby), 20+ item database
- [x] Inventory (20-slot grid + hotbar), 3 rig tiers
- [x] Power grid, tools, food, save/load, procedural music
- [x] Market price fluctuation per phase

### Sprint 4: "The Daily Loop"
- [x] Crop system (potato, tomato, corn)
- [x] Skills (Mining, Farming, Engineering, Social, Foraging)
- [x] NPC hearts, daily summary, 25+ events, loading tips

### Sprint 5: "Tutorial & Onboarding"
- [x] 17-step tutorial, quest log (4 chapters, 13 objectives)
- [x] Visual hints, directional arrows, controls bar

### Sprint 6: "Visual Polish"
- [x] Detailed rig sprites, character redesign, building details
- [x] 30+ sprites, readable text, reference art pack

### Sprint 7: "The Citadel"
- [x] 5-tier upgrade (Shack → Citadel), map growth, menu

### Sprint 8: "Circular Economy"
- [x] Terraforming tools, Farmer Pete's Market
- [x] Full core loop: mine → earn → buy → farm → sell → upgrade

---

## 🔧 PHASE 1: FIX THE FUNDAMENTALS (Q2 2026)

> Priority: Make what exists feel polished before adding more.

### Sprint 9: "Controls" — Input Overhaul
- [ ] Mouse click-to-move with A* pathfinding
- [ ] Click-to-interact (NPCs, rigs, crops, buildings)
- [ ] Mouse-driven shop, inventory, item placement
- [ ] Context-sensitive cursor (hand, crosshair, speech bubble)
- [ ] Hybrid keyboard + mouse (both always work)
- [ ] Basic touch support for mobile web

### Sprint 10: "Words" — Dialogue & Text
- [ ] Typewriter text effect with blip sounds
- [ ] Press-to-advance dialogue (kill auto-timers)
- [ ] Tutorial overhaul (all steps player-paced)
- [ ] NPC portraits in dialogue box
- [ ] Basic dialogue choices (2-3 options)
- [ ] Proper notification queue (stack + fade)
- [ ] Word wrap fix on all UI panels

### Sprint 11: "Trade" — Shop & Menu UX
- [ ] Fix shop reliability bugs
- [ ] Item preview panel (description, stats, sprite)
- [ ] Category tabs (Tools | Rigs | Seeds | Animals | Special)
- [ ] Grey out unaffordable items
- [ ] Quantity selector (Shift+click for bulk)
- [ ] Inventory drag & drop
- [ ] Confirmation on expensive purchases

### Sprint 12: "Navigate" — Camera, Map & Wayfinding
- [ ] Smooth camera (lerp follow + movement lead)
- [ ] Corner minimap
- [ ] Quest markers (! and ?) above NPCs
- [ ] Objective compass arrow at screen edge
- [ ] Full world map overlay (Tab)
- [ ] Camera stops at map borders

### Sprint 13: "Architecture" — Code Refactor
- [ ] Split game.js into modules (engine, world, entities, systems, ui, data)
- [ ] Event bus (pub/sub)
- [ ] Game state machine (playing, menu, dialogue, shop, cutscene)
- [ ] ES modules (import/export)
- [ ] Data-driven items/NPCs/quests (JSON configs)
- [ ] Debug overlay (FPS, coords, collision, entities)

---

## 🌱 PHASE 2: THE LIVING WORLD (Q3-Q4 2026)

### Sprint 14: "Alive" — NPC Schedules & Depth
- [ ] Daily routines (home → work → tavern → sleep)
- [ ] NPC pathfinding, 20+ dialogue lines each
- [ ] Gift system with preferences
- [ ] Relationship tiers + heart milestone events
- [ ] Birthdays, group conversations

### Sprint 15: "Ranch" — The Carnivore System
- [ ] Cattle, chickens, goats, bees — full lifecycle
- [ ] Animal AI (wander, graze, sleep)
- [ ] Animal happiness → production quality
- [ ] Carnivore buffs, seed oil debuffs (satirical)
- [ ] Meat market at Farmer Pete's

### Sprint 16: "Seasons" — Weather & Time
- [ ] Weather: sunny, rain, storm, snow
- [ ] Weather affects gameplay (crops, rigs, NPCs, movement)
- [ ] Halving seasons with visual changes
- [ ] Seasonal crops, events, festivals
- [ ] Particles: rain, snow, leaves, fireflies

### Sprint 17: "Craft" — Expanded Farming & Crafting
- [ ] 12+ crop types, quality stars, fertilizer
- [ ] Sprinklers (auto-water, engineering unlock)
- [ ] Crafting bench, processing machines
- [ ] Seed maker, preserves for winter

---

## ⚡ PHASE 3: THE BITCOIN WORLD (Q1-Q2 2027)

### Sprint 18: "Trade" — P2P Economy
- [ ] Haggle mechanic, traveling merchant
- [ ] Lightning invoices, barter, black market
- [ ] Fiat inflation (Mayor's prices rise), reputation

### Sprint 19: "Fiatropolis" — The Dystopian City
- [ ] New region: concrete, surveillance, CBDC
- [ ] Debt mechanics, conversion quests
- [ ] Stealth in the city, border checkpoint

### Sprint 20: "Underground" — Cypherpunk Network
- [ ] Hidden bunker, privacy tools, encrypted messages
- [ ] The Hermit's backstory, node routing puzzle

### Sprint 21: "Dungeon" — The Mines
- [ ] Procedural data center dungeon
- [ ] Enemies, bosses, loot, combat
- [ ] Risk/reward (die = lose backpack)

### Sprint 22: "Volcano" — Geothermal Mining
- [ ] Volcanic region, free energy, heat management
- [ ] Rare minerals, eruption events

---

## 🎨 PHASE 4: ART & STORY (Q3 2027 — Q2 2028)

### Sprint 23: Original Sprites
### Sprint 24: Original Soundtrack
### Sprint 25: Story — The 24 Fragments
### Sprint 26: Cutscenes & Transitions

---

## 🎮 PHASE 5: POLISH (Q3-Q4 2028)

### Sprint 27: Juice & Game Feel
### Sprint 28: Achievements & Collections
### Sprint 29: Addiction Hooks
### Sprint 30: Accessibility & Settings

---

## 🌐 PHASE 6: MULTIPLAYER (2029)

### Sprint 31: Online Features
### Sprint 32: Modding & User Content

---

## 🚀 PHASE 7: LAUNCH (2030-2031)

### Sprint 33: Godot 4 Port
### Sprint 34: Release Prep (Steam, localization, QA, marketing)
### Sprint 35: Full Release + Console Ports

---

## 🎯 CURRENT FOCUS

**Phase 1, Sprint 9: Controls & Input Overhaul**

Priority: Mouse controls → click-to-move → click-to-interact → mouse shop/inventory

---

*Updated: 2026-03-29*
*Version: v0.5.3*
