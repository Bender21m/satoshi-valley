# ⛏️ Satoshi Valley — Development Roadmap

> *A Bitcoin farming/life sim — Stardew Valley meets the Bitcoin Standard.*
> 
> **Live demo:** [bender21m.github.io/satoshi-valley](https://bender21m.github.io/satoshi-valley)
> **Repo:** [github.com/Bender21m/satoshi-valley](https://github.com/Bender21m/satoshi-valley)

---

## 🎯 Vision

Build the definitive Bitcoin culture game — a beautiful, addictive farming/life sim where players mine sats, build citadels, raise cattle, trade P2P, and discover Bitcoin's history through gameplay. The game should:

1. **Be genuinely fun** independent of the Bitcoin theme
2. **Capture Bitcoin culture authentically** — maxis, plebs, cypherpunks, HODLers, degens
3. **Teach without preaching** — players learn Bitcoin through experience, not lectures
4. **Create "just one more day" addiction** — always something finishing soon
5. **Be a love letter to the Bitcoin community** — every NPC, event, and item resonates

---

## ✅ Completed Sprints

### Sprint 1: The Foundation
- Game Design Document (120+ page equivalent)
- GitHub repo + GitHub Pages auto-deployment
- Core engine: player movement, tile map, collision
- Mining rig system with sat generation
- Day/night cycle with color-graded lighting
- Basic HUD

### Sprint 2: The Homestead
- 120×90 tile world with Perlin noise terrain generation
- Organic landscapes: rivers, lakes, mountains, forests, sandy shores
- 5 buildings: cabin, mining shed, shop, tavern, town hall
- Path network with bridges
- Multi-layered trees with wind sway
- Flower meadows, mushroom patches, tall grass

### Sprint 3: The Economy
- Shop system (Ruby's Hardware)
- 20+ item database (tools, rigs, power, food, seeds, materials, animals, upgrades)
- Inventory system (20-slot grid + hotbar)
- 3 mining rig tiers: CPU Miner (1 TH/s), GPU Rig (5 TH/s), ASIC S21 (50 TH/s)
- Power grid: solar panels, batteries, cooling fans, grid fallback
- Save/load to localStorage with auto-save
- Market phase price fluctuation

### Sprint 4: The Daily Loop
- Crop system: potato (4 days), tomato (6 days), corn (8 days)
- Growth stages with progress bars, harvest glow
- 5 skills with XP bars: Mining, Farming, Engineering, Social, Foraging
- NPC relationship hearts
- End-of-day summary screen
- 25+ random Bitcoin culture events
- Procedural music engine (adapts to time of day + market phase)

### Sprint 5: Tutorial & Onboarding
- 17-step guided tutorial with visual highlights
- Directional arrows, key hints, HUD highlights
- Quest log with 4 story chapters, 13+ objectives
- Controls bar always visible

### Sprint 6: Visual Polish
- Detailed mining rig sprites (CPU tower, GPU frame, ASIC S21 with orange ₿ stripe)
- Player character: orange ₿ hoodie, baseball cap, directional eyes
- Building details: log walls with grain, rooftops, chimneys with animated smoke
- 30+ pixel art sprites via canvas sprite system
- Readable text across all UI

### Sprint 7: The Citadel
- 5-tier home upgrade system:
  - 🛖 Shack (free) → 🏠 Cabin (2K) → 🏡 House (10K) → 🏰 Compound (50K) → 🗼 Citadel (200K)
- Building physically grows on the map
- Upgrade menu at front door (press C)
- HUD displays citadel tier

### Sprint 8: Circular Economy
- Terraforming tools:
  - 🪓 Axe — chop trees for wood, clear grass for fiber
  - 🌾 Hoe — convert any grass to farmable dirt
  - ⚒️ Shovel — pick up placed items/rigs back to inventory
- Farmer Pete's Market (sell-only NPC near garden)
- Harvested crops go to inventory → sell at market
- 20+ new items: tools, materials, premium upgrades, animals, decorations
- Full loop: mine → earn → buy tools → terraform → farm → sell → upgrade → repeat

---

## 🔨 Upcoming Sprints

### Sprint 9: The Carnivore Ranch
- Cattle system: buy calves → raise → butcher or sell beef
- Goat farming (milk, cheese)
- Bee keeping (honey production over time)
- Chicken coops (eggs daily)
- Carnivore diet buffs (energy, strength, health)
- Seed oils as debuff items (satirical)
- "Meat market" — sell beef for premium sats
- Animal sprites already created, need game logic

### Sprint 10: P2P Trading
- Negotiate prices with NPCs (haggle mechanic)
- Lightning invoice visual representation
- Barter system (trade items directly)
- Traveling merchant NPC (rare items, random visits)
- Black market (privacy tools, Tor node, CoinJoin)
- Fiat inflation visualized (Mayor's prices go up every cycle)
- Price discovery mechanic (supply/demand)

### Sprint 11: The Bitcoin World
- **Fiatropolis** — dystopian city region (debt, surveillance, CBDC)
- **Cypherpunk Underground** — secret bunker network (Tor, privacy)
- **Volcano Mining Facility** — geothermal power region
- Lightning Network as fast travel system
- Nostr social feed (in-game social network)
- Bitcoin conferences (seasonal events with minigames)
- The Silk Road quest (morally grey privacy storyline)

### Sprint 12: The Mines (Dungeon System)
- Abandoned data center below the mountains
- Procedurally generated floors
- Hardware loot drops (old GPUs, cooling parts, rare components)
- Combat system: malware bots, script kiddies, 51% attack swarms
- Boss: The Pool Operator
- Deeper floors = better loot, more danger
- Crafting from dungeon materials

### Sprint 13: Custom Art & Audio
- Original 16×16 sprite sheet (our own, Bitcoin-themed)
- Character sprite sheets: walk/idle/action in 4 directions
- Unique NPC designs per character
- Mining rig animation sheets (fans, LEDs)
- Building tileset (all citadel tiers, shop, tavern, etc.)
- Seasonal repaints (halving cycles = visual seasons)
- Original pixel art soundtrack (composed or commissioned)
- Environmental sound design (water, birds, mining hum)

### Sprint 14: Story & Lore
- 24 seed phrase fragments hidden across the world
- Each fragment = interactive Bitcoin history flashback:
  - Genesis Block, Pizza Transaction, Mt. Gox, Silk Road, Block Size Wars, UASF, El Salvador, ETF approval...
- Uncle Toshi's journal entries (found throughout the valley)
- 4 story endings based on player choices:
  - **Full Sovereignty** — self-sufficient citadel
  - **Community Builder** — helped everyone transition
  - **The Diplomat** — coexistence with Fiatropolis
  - **The Maximalist** — fortress valley, outsiders not welcome
- Blocksize Wars questline
- Mt. Gox Memorial quest

### Sprint 15: Mouse & Touch Controls
- Click to move / click to interact
- Click to place rigs, crops, items
- Drag and drop in inventory
- Touch controls for mobile
- Minimap

### Sprint 16: Multiplayer
- Co-op citadel building (2-4 players)
- Visit other players' valleys
- P2P trading between players
- Shared mining pools
- Community events

### Sprint 17: Modding & Community
- Mod support: custom items, NPCs, events, quests
- Map editor
- Scripting API
- Steam Workshop integration
- Community content pipeline

### Sprint 18: Release
- Steam page + wishlists campaign
- Localization (EN, ES, PT, JP, DE minimum)
- QA, bug fixing, performance optimization
- Marketing: Bitcoin conferences, Nostr, podcasts, YouTube
- **Steam Early Access launch**

---

## 🧡 Bitcoin Culture Integration

Every layer of the game breathes Bitcoin:

### NPCs (Current)
| Name | Archetype | Culture Reference |
|---|---|---|
| Hodl Hannah | Diamond hands | Cold storage, low time preference, HODL |
| Leverage Larry | Degen trader | Liquidations, 100x, "this time is different" |
| Mayor Keynesian | Fiat villain | Money printing, inflation denial, stimulus |
| Ruby | Mining hardware | Sats-only business, off-grid ethos |
| The Hermit | Cypherpunk OG | Block Size Wars, Hal Finney, "don't trust, verify" |
| Saylor | Corporate maxi | Laser eyes, cyber hornets, stack everything |
| Pizza Pete | Bitcoin OG | 10,000 BTC pizza, first real transaction |
| Farmer Pete | Bitcoin farmer | Farm-to-table, no middlemen, patience |

### Events (25+ random daily)
- China bans Bitcoin (47th time)
- FTX 2.0 collapse
- Nation-state treasury adoption
- Lightning Network ATH
- Pizza Day celebrations
- Whale movements, mempool stress
- "Few understand" trends on Nostr
- Difficulty adjustments

### World
- Signs: "21M", "HODL", "In code we trust"
- Cypherpunk Woods, The Hodl Tavern
- Seed phrase fragments = Bitcoin history lessons
- Market cycles mirror real Bitcoin: Accumulation → Hype → Euphoria → Capitulation
- Halving events reduce block rewards

---

## 🛠️ Technical Stack

| Component | Technology |
|---|---|
| Engine | HTML5 Canvas (pure JavaScript) |
| Rendering | 2D tile-based, 16×16 sprites at 3× scale |
| Audio | Web Audio API (procedural music + SFX) |
| Terrain | Perlin noise generation |
| Hosting | GitHub Pages (auto-deploy via Actions) |
| Save | localStorage (JSON) |
| Target | Godot 4 port for Steam release |

---

## 📅 Timeline

| Phase | Period | Goal |
|---|---|---|
| **Prototype** ✅ | 2026 Q1 | Playable web demo |
| **Content** | 2026-2027 | All gameplay systems, story, regions |
| **Art & Audio** | 2027-2028 | Original sprites, soundtrack |
| **Beta** | 2028-2029 | Public testing, Steam Next Fest |
| **Early Access** | 2029-2030 | Steam launch |
| **Full Release** | 2030-2031 | v1.0 + console ports |
| **Expansion** | 2031-2036 | Multiplayer, expansions, modding |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Current needs:**
- Pixel art: 16×16 sprite sheets (Bitcoin-themed)
- Music: lo-fi / ambient pixel art soundtrack
- Writing: NPC dialogue, quest text, lore
- Playtesting: feedback on balance, fun factor, bugs
- Bitcoin culture: event ideas, NPC concepts, easter eggs

---

*Built with ₿ love by the Satoshi Valley team*
*Last updated: 2026-03-29*
