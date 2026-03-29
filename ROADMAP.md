# ⛏️ Satoshi Valley — Development Roadmap

> *A Bitcoin farming/life sim — Stardew Valley meets the Bitcoin Standard.*
>
> **Live demo:** [bender21m.github.io/satoshi-valley](https://bender21m.github.io/satoshi-valley)
> **Repo:** [github.com/Bender21m/satoshi-valley](https://github.com/Bender21m/satoshi-valley)

---

## 🎯 Vision

Build the definitive Bitcoin culture game — a beautiful, addictive farming/life sim where players mine sats, build citadels, raise cattle, trade P2P, and discover Bitcoin's history through gameplay. The game should:

1. **Be genuinely fun** independent of the Bitcoin theme
2. **Capture Bitcoin culture authentically** — maxis, plebs, cypherpunks, HODLers
3. **Teach without preaching** — players learn Bitcoin through experience, not lectures
4. **Create "just one more day" addiction** — always something finishing soon
5. **Be a love letter to the Bitcoin community** — every NPC, event, and item resonates

---

## 🏗️ Architecture

| Component | Technology |
|---|---|
| Engine | HTML5 Canvas (pure JavaScript) → Godot 4 port for Steam |
| Rendering | 2D tile-based, 16×16 sprites at 3× scale |
| Audio | Web Audio API (procedural music + SFX) |
| Terrain | Perlin noise generation |
| Hosting | GitHub Pages (auto-deploy via Actions) |
| Save | localStorage (JSON) → IndexedDB for larger saves |
| Target | Web prototype → Godot 4 (Steam/console) |

---

## ✅ Phase 0: Prototype (COMPLETE)

*8 sprints delivered. Playable web demo with core loop.*

### Sprint 1: The Foundation
- [x] Game Design Document (120+ page equivalent)
- [x] GitHub repo + GitHub Pages auto-deployment
- [x] Core engine: player movement, tile map, collision
- [x] Mining rig system with sat generation
- [x] Day/night cycle with color-graded lighting
- [x] Basic HUD

### Sprint 2: The Homestead
- [x] 120×90 tile world with Perlin noise terrain generation
- [x] Organic landscapes: rivers, lakes, mountains, forests, sandy shores
- [x] 5 buildings: cabin, mining shed, shop, tavern, town hall
- [x] Path network with bridges
- [x] Multi-layered trees with wind sway
- [x] Flower meadows, mushroom patches, tall grass

### Sprint 3: The Economy
- [x] Shop system (Ruby's Hardware)
- [x] 20+ item database (tools, rigs, power, food, seeds, materials, animals, upgrades)
- [x] Inventory system (20-slot grid + hotbar)
- [x] 3 mining rig tiers: CPU Miner → GPU Rig → ASIC S21
- [x] Power grid: solar panels, batteries, cooling fans, grid fallback
- [x] Save/load to localStorage with auto-save
- [x] Market phase price fluctuation

### Sprint 4: The Daily Loop
- [x] Crop system: potato (4d), tomato (6d), corn (8d)
- [x] Growth stages with progress bars, harvest glow
- [x] 5 skills with XP bars: Mining, Farming, Engineering, Social, Foraging
- [x] NPC relationship hearts
- [x] End-of-day summary screen
- [x] 25+ random Bitcoin culture events
- [x] Procedural music engine (adapts to time/market phase)

### Sprint 5: Tutorial & Onboarding
- [x] 17-step guided tutorial with visual highlights
- [x] Directional arrows, key hints, HUD highlights
- [x] Quest log with 4 story chapters, 13+ objectives
- [x] Controls bar always visible

### Sprint 6: Visual Polish
- [x] Detailed mining rig sprites (CPU tower, GPU frame, ASIC S21 with orange ₿ stripe)
- [x] Player character: orange ₿ hoodie, baseball cap, directional eyes
- [x] Building details: log walls with grain, rooftops, chimneys with animated smoke
- [x] 30+ pixel art sprites via canvas sprite system
- [x] Readable text across all UI

### Sprint 7: The Citadel
- [x] 5-tier home upgrade system (Shack → Cabin → House → Compound → Citadel)
- [x] Building physically grows on the map
- [x] Upgrade menu at front door (press C)
- [x] HUD displays citadel tier

### Sprint 8: Circular Economy
- [x] Terraforming tools: Axe, Hoe, Shovel
- [x] Farmer Pete's Market (sell-only NPC near garden)
- [x] Harvested crops go to inventory → sell at market
- [x] 20+ new items: tools, materials, premium upgrades, animals, decorations
- [x] Full core loop: mine → earn → buy → terraform → farm → sell → upgrade → repeat

---

## 🔧 Phase 1: Fix The Fundamentals (Q2 2026)

*Before adding features, make what exists feel polished and complete. A small game that works perfectly beats a big game full of jank.*

### Sprint 9: Controls & Input Overhaul
> 🎯 Goal: The game should feel good to play with ANY input method

- [ ] **Mouse controls** — click-to-move with A* pathfinding
- [ ] **Click-to-interact** — click NPCs, rigs, crops, buildings
- [ ] **Mouse inventory** — click to select items, drag to rearrange
- [ ] **Mouse shop** — click items to buy/sell, hover for details
- [ ] **Mouse placement** — click to place rigs, crops, items on map
- [ ] **Cursor context** — cursor changes based on what you're hovering (hand, crosshair, speech bubble)
- [ ] **Hybrid input** — mouse and keyboard work together seamlessly
- [ ] **Touch basics** — tap to move/interact (mobile web)

### Sprint 10: Dialogue & Text System
> 🎯 Goal: Every piece of text should feel alive and readable

- [ ] **Typewriter effect** — text reveals letter-by-letter with blip sounds
- [ ] **Press to advance** — spacebar/click/enter to continue dialogue, NOT auto-timers
- [ ] **Press to skip** — hold to skip typewriter animation, shows full text instantly
- [ ] **Tutorial overhaul** — all 17 steps become press-to-advance (no more missed instructions)
- [ ] **Dialogue portraits** — NPC face/emoji next to their name in dialogue box
- [ ] **Dialogue choices** — basic branching (2-3 response options for key conversations)
- [ ] **Notification queue** — notifications stack and fade properly, never overlap
- [ ] **Text wrapping** — proper word wrap on all UI panels (currently truncates)

### Sprint 11: Shop & Menu UX
> 🎯 Goal: Buying and selling should feel satisfying, not confusing

- [ ] **Fix Ruby's shop bugs** — ensure shop opens reliably, items purchasable
- [ ] **Item preview panel** — hover/select shows full description, stats, and sprite
- [ ] **Category tabs** — Tools | Rigs & Power | Seeds & Food | Animals | Special
- [ ] **Affordability** — grey out items you can't afford, green highlight on affordable
- [ ] **Buy confirmation** — confirm expensive purchases (>10K sats)
- [ ] **Quantity selector** — buy/sell multiple items at once (hold Shift)
- [ ] **Inventory tooltips** — hover shows item name, description, sell price
- [ ] **Drag & drop inventory** — reorder items, move between hotbar and grid

### Sprint 12: Camera, Map & Navigation
> 🎯 Goal: Players should always know where they are and where to go

- [ ] **Smooth camera** — lerp-based follow with slight lead in movement direction
- [ ] **Minimap** — corner minimap showing buildings, NPCs, player position
- [ ] **Quest markers** — `!` and `?` icons above NPCs with available/complete quests
- [ ] **Objective compass** — subtle arrow at screen edge pointing to next objective
- [ ] **Building labels** — names appear above buildings when nearby
- [ ] **World map** — press `Tab` for full map overlay with region names
- [ ] **Edge-of-world handling** — camera stops at map borders, no void visible

### Sprint 13: Code Architecture
> 🎯 Goal: Sustainable codebase that can grow to 10x the content

- [ ] **Modularize game.js** (currently 2300 lines, single file) into:
  - `engine.js` — render loop, camera, input manager, mouse handler
  - `world.js` — map generation, tiles, buildings, decoration
  - `entities.js` — player, NPCs, animals, pathfinding
  - `systems.js` — economy, skills, quests, crops, mining
  - `ui.js` — shop, inventory, dialogue, menus, HUD
  - `data.js` — item database, NPC data, quest definitions, event pool
- [ ] **Event system** — decouple game events (pub/sub pattern)
- [ ] **State machine** — proper game states (playing, menu, dialogue, shop, cutscene)
- [ ] **ES modules** — import/export instead of global variables
- [ ] **Data-driven design** — items, NPCs, quests loaded from JSON configs
- [ ] **Dev tools** — debug overlay (FPS, tile coords, collision boxes, entity info)

---

## 🌱 Phase 2: The Living World (Q3-Q4 2026)

*Make the valley feel alive. NPCs with routines, animals with behavior, weather that matters, a world that breathes.*

### Sprint 14: NPC Life
> 🎯 Goal: NPCs should feel like people, not signposts

- [ ] **Daily schedules** — each NPC has a routine (home → work → tavern → sleep)
- [ ] **Pathfinding AI** — NPCs walk between locations on paths
- [ ] **Unique dialogue pools** — 20+ lines per NPC, context-aware (time, weather, relationship level)
- [ ] **Gift system** — give items to NPCs, each has preferences (+hearts or -hearts)
- [ ] **Relationship tiers** — Stranger → Acquaintance → Friend → Close Friend → Best Friend
- [ ] **NPC events** — unlock story scenes at heart milestones (like Stardew)
- [ ] **Birthday events** — each NPC has a birthday, bonus hearts for gifts
- [ ] **Group conversations** — NPCs talk to each other in the tavern

### Sprint 15: The Carnivore Ranch
> 🎯 Goal: A cozy, satisfying animal husbandry system

- [ ] **Cattle** — buy calves → feed daily → grow over 14 days → butcher or sell beef
- [ ] **Chickens** — build coop, produce eggs daily, hatch chicks
- [ ] **Goats** — daily milk, make cheese (aged = more valuable)
- [ ] **Bees** — place hives near flowers, produce honey over time
- [ ] **Animal AI** — wander in fenced areas, graze, sleep at night
- [ ] **Animal happiness** — affects production (fed, petted, sheltered = happy)
- [ ] **Carnivore diet buffs** — eating meat/eggs/milk gives energy, strength, health bonuses
- [ ] **Seed oil debuffs** — satirical items that drain stats (vegetable oil, margarine, canola)
- [ ] **Meat market** — sell beef, eggs, cheese, honey at Farmer Pete's for premium sats
- [ ] **Animal sprites & animations** — walk cycles, eat, sleep, idle

### Sprint 16: Weather & Seasons
> 🎯 Goal: The world changes around you — plan, adapt, enjoy

- [ ] **Weather system** — sunny, cloudy, rain, thunderstorm, snow
- [ ] **Weather effects on gameplay:**
  - Rain: crops grow faster, mining rigs cool naturally, NPCs go indoors
  - Storm: solar panels fail, risk of rig damage, lightning strikes
  - Snow: slower movement, crops pause, cozy vibes
- [ ] **Halving seasons** — every N days, visual season change (spring/summer/fall/winter)
- [ ] **Seasonal crops** — certain seeds only grow in certain seasons
- [ ] **Seasonal events** — Bitcoin Pizza Day (May), Halving Party, Conference Season
- [ ] **Particle effects** — rain drops, snow flakes, falling leaves, fireflies at night
- [ ] **Ambient life** — butterflies, birds, fish jumping, frogs at night

### Sprint 17: Expanded Farming & Crafting
> 🎯 Goal: Deep, interconnected crafting that rewards experimentation

- [ ] **Crop expansion** — 12+ crop types across seasons with varying grow times
- [ ] **Crop quality** — star rating (normal → silver → gold) based on skill + soil
- [ ] **Fertilizer system** — compost from food scraps, speeds growth
- [ ] **Sprinklers** — auto-water crops (engineering skill unlock)
- [ ] **Crafting bench** — combine items to create new ones:
  - Copper wire + circuit board = custom mining controller
  - Wood + nails = fence sections
  - Milk + time = cheese
  - Honey + bread = premium food item
- [ ] **Processing machines** — smoker (meat), press (cheese), oven (bread)
- [ ] **Seed maker** — convert harvested crops back into seeds
- [ ] **Preserves** — jar fruits/veggies for winter, increased sell price

---

## ⚡ Phase 3: The Bitcoin World (Q1-Q2 2027)

*Expand beyond the valley. New regions, deeper economy, the full Bitcoin experience.*

### Sprint 18: P2P Trading System
> 🎯 Goal: An economy that teaches Bitcoin principles through gameplay

- [ ] **Haggle mechanic** — negotiate prices with NPCs (offer/counter-offer)
- [ ] **Traveling merchant** — rare visitor with unique items, random inventory each visit
- [ ] **Lightning invoices** — visual representation of payments (bolt animation)
- [ ] **Barter system** — trade items directly with NPCs
- [ ] **Black market** — hidden shop selling privacy tools (Tor node, CoinJoin mixer, Faraday bag)
- [ ] **Fiat inflation** — Mayor Keynesian's prices go up every cycle while yours stay stable
- [ ] **Price discovery** — supply/demand affects prices across the valley
- [ ] **Reputation system** — fair trading builds rep, scamming destroys it

### Sprint 19: Fiatropolis
> 🎯 Goal: Show — don't tell — why Bitcoin matters

- [ ] **New region** — dystopian city south of the valley (concrete, grey, surveillance cameras)
- [ ] **CBDC system** — residents use programmable money with expiration dates and spending limits
- [ ] **Debt mechanics** — NPCs in Fiatropolis are trapped in debt cycles
- [ ] **Mayor Keynesian's HQ** — the villain's lair, propaganda posters, money printers
- [ ] **Conversion quests** — help Fiatropolis residents escape to the valley
- [ ] **Surveillance avoidance** — stealth mechanics in the city (cameras, guards)
- [ ] **Contrast** — entering Fiatropolis visually shifts palette (desaturated, cold, oppressive)
- [ ] **Border checkpoint** — they try to tax you when you cross

### Sprint 20: Cypherpunk Underground
> 🎯 Goal: The cool secret area that rewards exploration

- [ ] **Hidden entrance** — discover through NPC hints or exploration
- [ ] **The Bunker** — underground network of cypherpunks running nodes
- [ ] **Privacy tools** — CoinJoin tutorials, Tor routing mini-game
- [ ] **The Hermit's backstory** — unlocked through underground quests
- [ ] **Secret shop** — items you can't get anywhere else
- [ ] **Encrypted messages** — find and decode messages that reveal lore
- [ ] **Node routing puzzle** — set up a Lightning Network path (puzzle mechanic)

### Sprint 21: The Mines (Dungeon System)
> 🎯 Goal: Action layer that breaks up the farming loop

- [ ] **Entrance** — abandoned data center in the mountains
- [ ] **Procedural generation** — floors get harder/richer as you go deeper
- [ ] **Loot** — old GPUs, cooling parts, rare components, ancient hardware
- [ ] **Enemies** — malware bots, script kiddies, 51% attack swarms, ransomware
- [ ] **Boss floors** — every 10 levels: The Pool Operator, The Exchange, The Regulator
- [ ] **Combat system** — simple but satisfying (tool-based: pickaxe, wrench as weapons)
- [ ] **Resource management** — food/coffee for energy, torches for light
- [ ] **Dungeon crafting** — combine dungeon drops to make rare items
- [ ] **Risk/reward** — dying loses your backpack contents (can retrieve next run)

### Sprint 22: Volcano Mining Facility
> 🎯 Goal: Endgame mining location with unique mechanics

- [ ] **New region** — volcanic area with geothermal power
- [ ] **Free energy** — no power costs but extreme heat management
- [ ] **Immersion cooling** — required for high-tier rigs in volcano zone
- [ ] **Volcanic events** — eruptions that threaten rigs (emergency shutdown mechanics)
- [ ] **Rare minerals** — unique crafting materials only found here
- [ ] **El Salvador vibes** — tropical, hopeful, nation-state adoption energy

---

## 🎨 Phase 4: Art, Audio & Story (Q3 2027 — Q2 2028)

*Transform the programmer art into something beautiful. Tell the full story.*

### Sprint 23: Original Sprite Art
> 🎯 Goal: A unique, cohesive visual identity

- [ ] **Custom tileset** — 16×16 tiles: grass, dirt, water, stone, sand (all seasons)
- [ ] **Character sprites** — player walk/idle/action in 4 directions (8 frames each)
- [ ] **NPC sprites** — unique design per character, walk cycles, expressions
- [ ] **Animal sprites** — cattle, chickens, goats, bees with idle/walk/eat animations
- [ ] **Building sprites** — all citadel tiers, shop, tavern, town hall, coops, barns
- [ ] **Mining rig sprites** — animated fans, LED blinks, heat shimmer
- [ ] **Item icons** — consistent style across all 50+ items
- [ ] **UI art** — custom panels, buttons, borders (replace solid rectangles)
- [ ] **Seasonal variants** — trees, flowers, grass change with halving cycles
- [ ] **Parallax layers** — distant mountains, clouds moving slower than foreground

### Sprint 24: Original Soundtrack
> 🎯 Goal: Music you hum in the shower — memorable, emotional, Bitcoin

- [ ] **Main theme** — the Satoshi Valley melody (earworm, 8-bit inspired)
- [ ] **Seasonal themes** — 4 tracks that capture each season's mood
- [ ] **Location themes** — valley, Fiatropolis (oppressive), underground (mysterious), dungeon (tense)
- [ ] **Night theme** — calm, reflective, stars-and-crickets energy
- [ ] **Shop music** — cozy, browsing vibes
- [ ] **Event stingers** — halving fanfare, block found celebration, quest complete
- [ ] **Dynamic mixing** — layers add/remove based on context (rain overlay, mining hum layer)
- [ ] **Environmental SFX** — water, birds, wind, footsteps (per terrain), door creaks, fire crackle
- [ ] **Adaptive to market** — music shifts mood during Euphoria vs Capitulation phases

### Sprint 25: Story & Lore — The 24 Fragments
> 🎯 Goal: A story that makes people care about Bitcoin's history

- [ ] **24 seed phrase fragments** hidden across all regions:
  1. Genesis Block (Jan 3, 2009)
  2. Hal Finney's first transaction
  3. The 10,000 BTC Pizza
  4. Silk Road opens
  5. Mt. Gox hack
  6. The DAO & the fork debate
  7. Segwit activation
  8. Block Size Wars / UASF
  9. Lightning Network launch
  10. China bans Bitcoin (again)
  11. El Salvador legal tender
  12. FTX collapse
  13. Ordinals controversy
  14. Spot ETF approval
  15. Nation-state adoption wave
  16. *...9 more TBD based on what happens IRL*
- [ ] **Interactive flashbacks** — each fragment triggers a playable memory scene
- [ ] **Uncle Toshi's journal** — 24 journal entries found throughout the valley
- [ ] **The Hermit's story** — ties fragments together into the narrative
- [ ] **4 story endings:**
  - 🏰 **Full Sovereignty** — self-sufficient citadel, off-grid, free
  - 🤝 **Community Builder** — helped everyone in the valley transition
  - 🕊️ **The Diplomat** — found coexistence with Fiatropolis
  - 🔥 **The Maximalist** — fortress valley, outsiders not welcome
- [ ] **Major questlines:**
  - The Blocksize Wars (faction choice: big blocks vs small blocks)
  - Mt. Gox Memorial (recover lost coins quest)
  - The Silk Road (morally grey privacy storyline)
  - The Genesis Discovery (finding Uncle Toshi's final message)

### Sprint 26: Cutscenes & Transitions
> 🎯 Goal: Cinematic moments that elevate the experience

- [ ] **Screen transitions** — fade, wipe, iris for area changes
- [ ] **Cutscene engine** — scripted sequences for story moments
- [ ] **Title screen** — animated logo, new game / continue / settings
- [ ] **Intro sequence** — the letter from Uncle Toshi, arriving at the valley
- [ ] **Ending sequences** — unique cinematic for each of the 4 endings
- [ ] **Building interiors** — enter buildings with transition, interior maps
- [ ] **Photo mode** — screenshot tool with filters (sepia, noir, etc.)

---

## 🎮 Phase 5: Game Feel & Polish (Q3-Q4 2028)

*The difference between "good" and "great." Make every interaction feel perfect.*

### Sprint 27: Juice & Game Feel
> 🎯 Goal: Every action should feel satisfying

- [ ] **Screen shake** — on big events (block found, explosion, boss hit)
- [ ] **Squash & stretch** — player bounces slightly when landing
- [ ] **Hit pause** — brief freeze frame on important moments
- [ ] **Particle systems** — dust when running, sparks when mining, leaves when chopping
- [ ] **Sound polish** — unique sounds for every interaction, layered SFX
- [ ] **Haptic feedback** — controller vibration support
- [ ] **Satisfying numbers** — sat counters tick up smoothly, not jump
- [ ] **Celebration moments** — confetti on milestones, fireworks on citadel upgrades

### Sprint 28: Achievements & Collections
> 🎯 Goal: Completionists should have 200+ hours of goals

- [ ] **Achievement system** — 50+ achievements with satisfying unlock animations
- [ ] **Collection journal:**
  - Items discovered / total
  - NPCs met and heart levels
  - Seed phrases found
  - Crops grown
  - Animals raised
  - Regions explored
  - Events witnessed
- [ ] **Milestones:**
  - First Sat, First Block, 100K sats, 1M sats, 21M sats
  - Citadel complete, all hearts maxed, all skills maxed
  - All fragments found, all endings seen
- [ ] **Rare unlocks** — hidden achievements for obscure discoveries
- [ ] **Stats page** — total sats earned, crops harvested, days played, etc.

### Sprint 29: Addiction Hooks
> 🎯 Goal: "Just one more day" at 2am

- [ ] **Tomorrow preview** — end of day shows "Tomorrow: GPU Rig ready, tomatoes harvestable, Ruby's birthday"
- [ ] **Daily gift** — random bonus for logging in / starting a new day
- [ ] **Streak bonus** — consecutive days played = small sat multiplier
- [ ] **Surprise events** — 5% chance per day of something memorable (meteorite, whale sighting, Satoshi's ghost)
- [ ] **Seasonal festivals** — 4 per year with unique minigames, prizes, NPC interactions
- [ ] **Progression breadcrumbs** — always one more thing almost ready
- [ ] **Speed run mode** — timer + leaderboards for speedrunners

### Sprint 30: Accessibility & Settings
- [ ] **Rebindable keys** — full key remapping
- [ ] **Colorblind modes** — deuteranopia, protanopia, tritanopia
- [ ] **Text size options** — small / medium / large
- [ ] **Game speed** — 0.5x, 1x, 2x, 3x day speed
- [ ] **Pause** — proper pause menu with save/load/settings
- [ ] **Auto-save settings** — frequency, slot count
- [ ] **Audio sliders** — music, SFX, ambient individually
- [ ] **Difficulty options** — casual (no rig damage, cheap prices) / normal / hard (realistic economics)

---

## 🌐 Phase 6: Multiplayer & Community (2029)

### Sprint 31: Online Features
- [ ] **Co-op citadel building** — 2-4 players in one valley
- [ ] **Visit friends' valleys** — read-only exploration of other saves
- [ ] **P2P trading between players** — Lightning-powered item exchange
- [ ] **Shared mining pools** — pool resources with friends for better returns
- [ ] **Community events** — server-wide challenges, leaderboards

### Sprint 32: Modding & User Content
- [ ] **Mod support** — custom items, NPCs, events, quests via JSON configs
- [ ] **Map editor** — visual tile editor for custom valleys
- [ ] **Scripting API** — GDScript hooks for modders
- [ ] **Steam Workshop** — browse and install community mods
- [ ] **Community content pipeline** — submission → review → featured

---

## 🚀 Phase 7: Launch (2030-2031)

### Sprint 33: Godot Port
- [ ] **Port to Godot 4** — migrate from HTML5 Canvas to GDScript
- [ ] **Native performance** — 60fps on all target platforms
- [ ] **Controller support** — full gamepad mapping
- [ ] **Steam integration** — achievements, cloud saves, workshop

### Sprint 34: Release Prep
- [ ] **Steam page** — wishlists campaign, trailers, screenshots
- [ ] **Localization** — EN, ES, PT, JP, DE, FR minimum
- [ ] **QA** — comprehensive bug testing, balance passes
- [ ] **Performance optimization** — profiling, memory management
- [ ] **Marketing:**
  - Bitcoin conferences (demos, talks)
  - Nostr/Twitter campaign
  - YouTube/podcast appearances
  - Press kit + review copies
- [ ] **Early Access launch** on Steam

### Sprint 35: Full Release & Beyond
- [ ] **v1.0 release** — all content, all endings, fully polished
- [ ] **Console ports** — Nintendo Switch, PlayStation, Xbox
- [ ] **Mobile** — iOS/Android (touch-optimized)
- [ ] **Expansions** — new regions, characters, storylines
- [ ] **Community tournaments** — seasonal competitive events

---

## 🧡 Bitcoin Culture Integration

Every layer of the game breathes Bitcoin:

### NPCs
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

### World Design
- Signs: "21M", "HODL", "In code we trust"
- Cypherpunk Woods, The Hodl Tavern
- Seed phrase fragments = Bitcoin history lessons
- Market cycles mirror real Bitcoin: Accumulation → Hype → Euphoria → Capitulation
- Halving events reduce block rewards and shift seasons

---

## 🎯 Vision Pillars (Always Reference)

1. **Fun first** — every mechanic must be enjoyable before the Bitcoin theme
2. **"Just one more day"** — always something finishing soon
3. **Visible progress everywhere** — skills, hearts, citadel, farm, wallet
4. **Bitcoin culture is king** — every NPC, event, item breathes Bitcoin
5. **Sovereignty as progression** — you're building independence
6. **Carnivore/citadel lifestyle** — beef ranch, goats, off-grid, self-sufficient
7. **Teach without preaching** — learn Bitcoin through gameplay, not lectures
8. **Beautiful world** — Stardew-quality pixel art, warm palette, alive with detail
9. **Polish over features** — a small game that feels perfect > a big game that feels janky
10. **Show, don't tell** — Fiatropolis shows fiat problems, the valley shows the solution

---

## 📅 Timeline

| Phase | Period | Goal |
|---|---|---|
| **Phase 0: Prototype** ✅ | 2026 Q1 | Playable web demo |
| **Phase 1: Fundamentals** | 2026 Q2 | Controls, UX, architecture |
| **Phase 2: Living World** | 2026 Q3-Q4 | NPCs, animals, weather, crafting |
| **Phase 3: Bitcoin World** | 2027 Q1-Q2 | Regions, economy, dungeons |
| **Phase 4: Art & Story** | 2027 Q3 — 2028 Q2 | Original sprites, soundtrack, lore |
| **Phase 5: Polish** | 2028 Q3-Q4 | Game feel, achievements, accessibility |
| **Phase 6: Multiplayer** | 2029 | Online features, modding |
| **Phase 7: Launch** | 2030-2031 | Godot port, Steam release, console ports |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Current needs:**
- 🎨 Pixel art: 16×16 sprite sheets (Bitcoin-themed)
- 🎵 Music: lo-fi / ambient pixel art soundtrack
- ✍️ Writing: NPC dialogue, quest text, lore
- 🎮 Playtesting: feedback on balance, fun factor, bugs
- 🧡 Bitcoin culture: event ideas, NPC concepts, easter eggs

---

*Built with ₿ love by the Satoshi Valley team*
*Next up: Phase 1, Sprint 9 — Controls & Input Overhaul*
*Last updated: 2026-03-29*
