// ============================================================
// SATOSHI VALLEY — v0.2 "The Homestead Update"
// A Bitcoin farming sim — Stardew Valley meets the Bitcoin Standard
// ============================================================

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// ---- RESPONSIVE FULLSCREEN ----
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

document.addEventListener('keydown', e => {
  if (e.key === 'f' || e.key === 'F') {
    if (!document.fullscreenElement) canvas.requestFullscreen();
    else document.exitFullscreen();
  }
});

// ---- CONSTANTS ----
const TILE = 16;
const SCALE = 3; // bigger pixels, more visible
const ST = TILE * SCALE; // 48px per tile on screen
const MAP_W = 80;
const MAP_H = 60;
const FONT = '"Courier New", monospace';

// ---- INPUT ----
const keys = {};
const justPressed = {};
document.addEventListener('keydown', e => {
  if (!keys[e.key.toLowerCase()]) justPressed[e.key.toLowerCase()] = true;
  keys[e.key.toLowerCase()] = true;
  e.preventDefault();
});
document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// ---- SEEDED RNG ----
function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// ---- COLORS ----
const C = {
  // Nature
  grass: ['#2D5A1E','#3A6C1E','#4A7C2E','#3E7225'],
  grassFlower: ['#E8C840','#D04040','#6060D0','#E870B0'],
  dirt: ['#8B6914','#7B5904','#9B7924'],
  stone: ['#606060','#707070','#808080'],
  water: ['#1A5588','#2266AA','#2870B8'],
  sand: ['#D4B870','#C4A860','#E4C880'],
  woodWall: '#6B4320',
  woodFloor: '#A08050',
  roof: '#8B2020',
  path: ['#A09070','#B0A080','#908060'],
  fence: '#8B6340',
  
  // Player
  orange: '#F7931A',
  darkOrange: '#C47415',
  skin: '#FFD5A0',
  hair: '#503214',
  
  // Rigs
  rigBody: '#555555',
  rigDark: '#333333',
  rigLight: '#777777',
  ledGreen: '#00FF00',
  ledRed: '#FF0000',
  ledOrange: '#F7931A',
  
  // UI
  hud: '#F7931A',
  hudBg: 'rgba(10,10,10,0.85)',
  hudBorder: '#F7931A',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF4444',
  green: '#44FF44',
  blue: '#4488FF',
  gold: '#FFD700',
  gray: '#888888',
  
  // Phases
  phaseColors: ['#4488FF','#44FF44','#FFD700','#FF4444'],
};

// ---- MAP ----
// Tile types
const T = {
  GRASS: 0, DIRT: 1, STONE: 2, WATER: 3, PATH: 4,
  WOOD_WALL: 5, WOOD_FLOOR: 6, SAND: 7, FENCE: 8,
  DEEP_WATER: 9, FLOWERS: 10, TALL_GRASS: 11,
};

const SOLID = new Set([T.WATER, T.WOOD_WALL, T.DEEP_WATER, T.FENCE]);

const map = [];
const decorations = []; // {x, y, type, variant}

function generateMap() {
  const rng = mulberry32(2009); // Bitcoin genesis year seed
  
  for (let y = 0; y < MAP_H; y++) {
    map[y] = [];
    for (let x = 0; x < MAP_W; x++) {
      map[y][x] = T.GRASS;
    }
  }
  
  // ---- RIVER (flowing left to right, with bends) ----
  let riverY = 10;
  for (let x = 0; x < MAP_W; x++) {
    riverY += Math.round((rng() - 0.5) * 1.5);
    riverY = Math.max(5, Math.min(15, riverY));
    for (let dy = -1; dy <= 1; dy++) {
      const ry = riverY + dy;
      if (ry >= 0 && ry < MAP_H) {
        map[ry][x] = Math.abs(dy) === 0 ? T.DEEP_WATER : T.WATER;
      }
    }
    // Sandy banks
    for (let dy = -2; dy <= 2; dy++) {
      const ry = riverY + dy;
      if (ry >= 0 && ry < MAP_H && map[ry][x] === T.GRASS) {
        if (rng() < 0.6) map[ry][x] = T.SAND;
      }
    }
  }
  
  // ---- LAKE (southeast) ----
  const lakeX = 58, lakeY = 42;
  for (let dy = -5; dy <= 5; dy++) {
    for (let dx = -7; dx <= 7; dx++) {
      const dist = Math.sqrt(dx*dx*0.7 + dy*dy);
      const ty = lakeY + dy, tx = lakeX + dx;
      if (ty >= 0 && ty < MAP_H && tx >= 0 && tx < MAP_W) {
        if (dist < 3.5) map[ty][tx] = T.DEEP_WATER;
        else if (dist < 4.5) map[ty][tx] = T.WATER;
        else if (dist < 5.5 && rng() < 0.5) map[ty][tx] = T.SAND;
      }
    }
  }
  
  // ---- CABIN (player home) ----
  buildCabin(35, 30, 7, 6);
  
  // ---- MINING SHED ----
  buildCabin(20, 28, 6, 5);
  
  // ---- PATHS ----
  // Main path: cabin to mining shed
  for (let x = 22; x <= 38; x++) {
    setTile(x, 36, T.PATH);
    if (rng() < 0.3) setTile(x, 35, T.PATH);
  }
  // Path south from cabin
  for (let y = 36; y <= 45; y++) {
    setTile(35, y, T.PATH);
    setTile(36, y, T.PATH);
  }
  // Path to mining shed
  for (let y = 33; y <= 36; y++) {
    setTile(22, y, T.PATH);
  }
  // Path north (to river / bridge)
  for (let y = 18; y <= 30; y++) {
    setTile(35, y, T.PATH);
  }
  
  // ---- BRIDGE over river ----
  for (let y = 0; y < MAP_H; y++) {
    if (map[y][35] === T.WATER || map[y][35] === T.DEEP_WATER) {
      map[y][35] = T.WOOD_FLOOR;
      map[y][36] = T.WOOD_FLOOR;
    }
  }
  
  // ---- GARDEN PLOTS (right of cabin) ----
  for (let y = 31; y <= 35; y++) {
    for (let x = 44; x <= 52; x++) {
      if ((x + y) % 2 === 0) setTile(x, y, T.DIRT);
      else setTile(x, y, T.DIRT);
    }
  }
  // Fence around garden
  for (let x = 43; x <= 53; x++) {
    setTile(x, 30, T.FENCE);
    setTile(x, 36, T.FENCE);
  }
  for (let y = 30; y <= 36; y++) {
    setTile(43, y, T.FENCE);
    setTile(53, y, T.FENCE);
  }
  setTile(48, 36, T.PATH); // gate
  
  // ---- FOREST (west side) ----
  for (let y = 20; y < MAP_H - 5; y++) {
    for (let x = 2; x < 15; x++) {
      if (rng() < 0.15) {
        decorations.push({ x: x, y: y, type: 'tree', variant: Math.floor(rng() * 3) });
      }
      if (rng() < 0.1) map[y][x] = T.TALL_GRASS;
    }
  }
  
  // ---- NORTHERN MOUNTAINS (stone area) ----
  for (let y = 1; y < 7; y++) {
    for (let x = 1; x < MAP_W - 1; x++) {
      if (map[y][x] !== T.WATER && map[y][x] !== T.DEEP_WATER) {
        if (rng() < 0.5) map[y][x] = T.STONE;
      }
    }
  }
  
  // ---- FLOWER PATCHES ----
  for (let i = 0; i < 30; i++) {
    const fx = 15 + Math.floor(rng() * 50);
    const fy = 20 + Math.floor(rng() * 35);
    if (map[fy] && map[fy][fx] === T.GRASS) {
      map[fy][fx] = T.FLOWERS;
    }
  }
  
  // ---- TALL GRASS scattered ----
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (map[y][x] === T.GRASS && rng() < 0.04) {
        map[y][x] = T.TALL_GRASS;
      }
    }
  }
  
  // ---- BORDER ----
  for (let x = 0; x < MAP_W; x++) {
    map[0][x] = T.STONE; map[MAP_H-1][x] = T.STONE;
  }
  for (let y = 0; y < MAP_H; y++) {
    map[y][0] = T.STONE; map[y][MAP_W-1] = T.STONE;
  }
}

function buildCabin(cx, cy, w, h) {
  for (let y = cy; y < cy + h; y++) {
    for (let x = cx; x < cx + w; x++) {
      if (y === cy || y === cy + h - 1 || x === cx || x === cx + w - 1) {
        map[y][x] = T.WOOD_WALL;
      } else {
        map[y][x] = T.WOOD_FLOOR;
      }
    }
  }
  // Door (bottom center)
  const doorX = cx + Math.floor(w / 2);
  map[cy + h - 1][doorX] = T.PATH;
}

function setTile(x, y, t) {
  if (y >= 0 && y < MAP_H && x >= 0 && x < MAP_W) map[y][x] = t;
}

function isSolid(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) return true;
  return SOLID.has(map[ty][tx]);
}

// ---- PLAYER ----
const player = {
  x: 35 * TILE + 8,
  y: 38 * TILE + 8,
  speed: 90,
  facing: { x: 0, y: -1 },
  wallet: 2500,
  totalEarned: 0,
  walkFrame: 0,
  walkTimer: 0,
  isMoving: false,
};

// ---- MINING RIGS ----
const rigs = [];
class MiningRig {
  constructor(x, y, tier = 0) {
    this.x = x; this.y = y;
    this.tier = tier; // 0=CPU, 1=GPU, 2=ASIC
    this.tierNames = ['CPU Miner', 'GPU Rig', 'ASIC S21'];
    this.tierHash = [1.0, 5.0, 50.0];
    this.tierHeat = [0.2, 0.8, 2.0];
    this.tierCost = [500, 5000, 50000];
    
    this.powered = true;
    this.hashrate = this.tierHash[tier];
    this.heat = this.tierHeat[tier];
    this.temperature = 20;
    this.durability = 100;
    this.overheating = false;
    this.satsMined = 0;
    this.mineAcc = 0;
    this.heatAcc = 0;
    this.animFrame = 0;
    this.animTimer = 0;
  }
  
  update(dt) {
    this.animTimer += dt;
    if (this.animTimer > 0.3) { this.animTimer = 0; this.animFrame = (this.animFrame + 1) % 4; }
    
    // Heat
    this.heatAcc += dt;
    if (this.heatAcc >= 1) {
      this.heatAcc = 0;
      if (this.powered && this.durability > 0) {
        this.temperature += this.heat * 3;
      }
      this.temperature -= (this.temperature - 20) * 0.06;
      this.temperature = Math.max(15, Math.min(100, this.temperature));
      if (this.temperature >= 85) this.overheating = true;
      if (this.temperature < 65) this.overheating = false;
    }
    
    if (!this.powered || this.durability <= 0 || this.overheating) return 0;
    
    this.mineAcc += dt;
    let earned = 0;
    if (this.mineAcc >= 2) {
      this.mineAcc = 0;
      const heatPen = 1 - Math.max(0, Math.min(0.5, (this.temperature - 70) / 30));
      const durPen = this.durability / 100;
      const effective = this.hashrate * heatPen * durPen;
      earned = Math.max(1, Math.floor(effective * 10 / economy.difficulty));
      this.satsMined += earned;
      
      if (Math.random() < effective * 0.0001) {
        const reward = 312500; // 3.125 BTC in sats
        earned += reward;
        this.satsMined += reward;
        notifications.push({ text: '⛏️ BLOCK FOUND! +312,500 sats!', timer: 6, big: true });
      }
      
      this.durability = Math.max(0, this.durability - 0.03);
    }
    return earned;
  }
  
  getStatus() {
    if (this.durability <= 0) return 'BROKEN';
    if (this.overheating) return 'OVERHEAT';
    if (!this.powered) return 'OFF';
    const eff = this.hashrate * (this.durability/100) / economy.difficulty;
    return Math.floor(eff * 10) + ' sat/s';
  }
  
  getStatusColor() {
    if (this.durability <= 0) return C.red;
    if (this.overheating) return C.ledOrange;
    if (!this.powered) return C.gray;
    return C.ledGreen;
  }
}

// ---- NPCs ----
const npcs = [
  {
    name: 'Hodl Hannah',
    x: 46 * TILE + 8, y: 33 * TILE + 8,
    color: '#FF69B4', hairColor: '#FFD700',
    dialogue: [
      '"The garden grows slow, but it grows forever."',
      '"I bought my first sats at 60k. Still hodling."',
      '"Your uncle taught me everything about nodes."',
      '"Don\'t listen to Leverage Larry. Just stack."',
    ],
    walkPath: [{x: 46, y: 33}, {x: 50, y: 33}, {x: 50, y: 35}, {x: 46, y: 35}],
    pathIndex: 0, moveTimer: 0, moveInterval: 3,
  },
  {
    name: 'Leverage Larry',
    x: 28 * TILE + 8, y: 40 * TILE + 8,
    color: '#4444FF', hairColor: '#222222',
    dialogue: [
      '"Bro, 100x long. Can\'t go tits up."',
      '"I\'m either getting a lambo or sleeping on your couch."',
      '"This time is different. Trust me."',
      '"Down 90% but still bullish."',
    ],
    walkPath: [{x: 28, y: 40}, {x: 32, y: 40}, {x: 32, y: 42}, {x: 28, y: 42}],
    pathIndex: 0, moveTimer: 0, moveInterval: 2,
  },
  {
    name: 'Mayor Keynesian',
    x: 40 * TILE + 8, y: 45 * TILE + 8,
    color: '#888888', hairColor: '#AAAAAA',
    dialogue: [
      '"We need more stimulus for the village!"',
      '"A little inflation never hurt anyone."',
      '"Your uncle was... eccentric. But respected."',
      '"The Fiat Bank has the village\'s best interests at heart."',
    ],
    walkPath: [{x: 40, y: 45}, {x: 42, y: 45}, {x: 42, y: 47}, {x: 40, y: 47}],
    pathIndex: 0, moveTimer: 0, moveInterval: 4,
  },
];

let activeDialogue = null; // { npc, lineIndex, timer }

// ---- ECONOMY ----
const economy = {
  difficulty: 1.0,
  phase: 0,
  phaseNames: ['Accumulation', 'Hype', 'Euphoria', 'Capitulation'],
  phaseDays: 0,
  cycle: 0,
  fiatInflation: 1.0,
  halvings: 0,
};

// ---- TIME ----
const time = {
  dayLength: 180,
  current: 0.25,
  day: 1,
  speed: 1,
  totalDays: 1,
};

function getHour() { return time.current * 24; }
function getTimeStr() {
  const h = Math.floor(getHour());
  const m = Math.floor((getHour() - h) * 60);
  const p = h < 12 ? 'AM' : 'PM';
  return `${h % 12 || 12}:${m.toString().padStart(2,'0')} ${p}`;
}
function getPeriod() {
  const h = getHour();
  if (h < 5) return 'Night'; if (h < 7) return 'Dawn'; if (h < 12) return 'Morning';
  if (h < 14) return 'Noon'; if (h < 17) return 'Afternoon'; if (h < 21) return 'Evening';
  return 'Night';
}

function getDayOverlay() {
  const h = getHour();
  if (h < 5)  return { r:15, g:15, b:40, a:0.55 };
  if (h < 6)  return { r:60, g:40, b:60, a:lp(0.45,0.2,(h-5)) };
  if (h < 7)  return { r:180,g:140,b:100,a:lp(0.2,0.05,(h-6)) };
  if (h < 17) return { r:255,g:255,b:240,a:0 };
  if (h < 19) return { r:220,g:130,b:60, a:lp(0,0.15,(h-17)/2) };
  if (h < 21) return { r:80, g:60, b:100,a:lp(0.15,0.4,(h-19)/2) };
  return { r:20, g:20, b:50, a:lp(0.4,0.55,(h-21)/3) };
}
function lp(a,b,t) { return a+(b-a)*Math.max(0,Math.min(1,t)); }

// ---- PARTICLES ----
const particles = [];
function spawnSatParticle(x, y, amount) {
  particles.push({
    x: x * SCALE, y: y * SCALE,
    text: `+${amount}`,
    life: 1.5,
    vy: -30,
  });
}

// ---- NOTIFICATIONS ----
const notifications = [];

// ---- CAMERA ----
const cam = { x: 0, y: 0 };

// ---- INIT ----
generateMap();

// Starter rig in the mining shed
rigs.push(new MiningRig(22 * TILE + 8, 30 * TILE + 8, 0));
rigs.push(new MiningRig(24 * TILE + 8, 30 * TILE + 8, 0));

// ---- GAME LOOP ----
let lastTime = performance.now();
let placeCd = 0, interactCd = 0;

function update(dt) {
  // Time
  time.current += (dt * time.speed) / time.dayLength;
  if (time.current >= 1) {
    time.current -= 1;
    time.day++;
    time.totalDays++;
    economy.phaseDays++;
    if (economy.phaseDays >= 28) {
      economy.phaseDays = 0;
      economy.phase = (economy.phase + 1) % 4;
      if (economy.phase === 0) {
        economy.cycle++;
        economy.fiatInflation *= 1.05;
        if (economy.cycle % 4 === 0) {
          economy.halvings++;
          notifications.push({ text: `🔶 HALVING #${economy.halvings}! Block reward reduced!`, timer: 6, big: true });
        }
      }
      notifications.push({ text: `📈 ${economy.phaseNames[economy.phase]} phase begins`, timer: 3 });
    }
  }
  
  time.speed = keys[' '] ? 15 : 1;
  
  // Player movement
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy -= 1;
  if (keys['s'] || keys['arrowdown']) dy += 1;
  if (keys['a'] || keys['arrowleft']) dx -= 1;
  if (keys['d'] || keys['arrowright']) dx += 1;
  
  player.isMoving = dx !== 0 || dy !== 0;
  
  if (player.isMoving && !activeDialogue) {
    const len = Math.sqrt(dx*dx + dy*dy);
    dx /= len; dy /= len;
    player.facing = { x: dx, y: dy };
    
    const nx = player.x + dx * player.speed * dt;
    const ny = player.y + dy * player.speed * dt;
    
    // Check collisions at corners
    const r = 5; // collision radius
    const canX = !isSolid(Math.floor((nx - r) / TILE), Math.floor((player.y - r) / TILE)) &&
                 !isSolid(Math.floor((nx + r) / TILE), Math.floor((player.y + r) / TILE)) &&
                 !isSolid(Math.floor((nx - r) / TILE), Math.floor((player.y + r) / TILE)) &&
                 !isSolid(Math.floor((nx + r) / TILE), Math.floor((player.y - r) / TILE));
    const canY = !isSolid(Math.floor((player.x - r) / TILE), Math.floor((ny - r) / TILE)) &&
                 !isSolid(Math.floor((player.x + r) / TILE), Math.floor((ny + r) / TILE)) &&
                 !isSolid(Math.floor((player.x - r) / TILE), Math.floor((ny + r) / TILE)) &&
                 !isSolid(Math.floor((player.x + r) / TILE), Math.floor((ny - r) / TILE));
    
    if (canX) player.x = nx;
    if (canY) player.y = ny;
    
    player.walkTimer += dt;
    if (player.walkTimer > 0.15) { player.walkTimer = 0; player.walkFrame = (player.walkFrame + 1) % 4; }
  }
  
  // Close dialogue
  if (activeDialogue) {
    if (justPressed['e'] || justPressed['escape'] || justPressed['enter']) {
      activeDialogue = null;
    }
  }
  
  // Place rig
  placeCd -= dt;
  if (justPressed['r'] && placeCd <= 0 && !activeDialogue) {
    placeCd = 0.3;
    if (player.wallet < 500) {
      notifications.push({ text: 'Need 500 sats for a CPU miner!', timer: 2 });
    } else {
      const rx = Math.round((player.x + player.facing.x * 24) / TILE) * TILE + 8;
      const ry = Math.round((player.y + player.facing.y * 24) / TILE) * TILE + 8;
      const rtx = Math.floor(rx / TILE), rty = Math.floor(ry / TILE);
      const overlap = rigs.some(r => Math.abs(r.x - rx) < TILE && Math.abs(r.y - ry) < TILE);
      
      if (!isSolid(rtx, rty) && !overlap) {
        player.wallet -= 500;
        rigs.push(new MiningRig(rx, ry, 0));
        notifications.push({ text: '⛏️ CPU Miner placed! (-500 sats)', timer: 2 });
      } else {
        notifications.push({ text: "Can't place here!", timer: 1.5 });
      }
    }
  }
  
  // Interact
  interactCd -= dt;
  if (justPressed['e'] && interactCd <= 0 && !activeDialogue) {
    interactCd = 0.3;
    const ix = player.x + player.facing.x * 20;
    const iy = player.y + player.facing.y * 20;
    
    // Check rigs
    let closestRig = null, closestDist = 28;
    for (const rig of rigs) {
      const d = Math.hypot(rig.x - ix, rig.y - iy);
      if (d < closestDist) { closestRig = rig; closestDist = d; }
    }
    if (closestRig) {
      closestRig.powered = !closestRig.powered;
      notifications.push({ text: `Rig ${closestRig.powered ? 'ON ⚡' : 'OFF 💤'}`, timer: 1.5 });
    }
    
    // Check NPCs
    if (!closestRig) {
      for (const npc of npcs) {
        const d = Math.hypot(npc.x - ix, npc.y - iy);
        if (d < 32) {
          const line = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
          activeDialogue = { name: npc.name, text: line };
          break;
        }
      }
    }
  }
  
  // Update NPCs
  for (const npc of npcs) {
    npc.moveTimer += dt;
    if (npc.moveTimer >= npc.moveInterval) {
      npc.moveTimer = 0;
      npc.pathIndex = (npc.pathIndex + 1) % npc.walkPath.length;
    }
    const target = npc.walkPath[npc.pathIndex];
    const tx = target.x * TILE + 8, ty = target.y * TILE + 8;
    const speed = 30 * dt;
    if (Math.abs(npc.x - tx) > 1) npc.x += Math.sign(tx - npc.x) * speed;
    if (Math.abs(npc.y - ty) > 1) npc.y += Math.sign(ty - npc.y) * speed;
  }
  
  // Update rigs
  let totalHash = 0;
  for (const rig of rigs) {
    const earned = rig.update(dt);
    if (earned > 0) {
      player.wallet += earned;
      player.totalEarned += earned;
      if (earned > 100) spawnSatParticle(rig.x, rig.y - 10, earned);
    }
    if (rig.powered && !rig.overheating && rig.durability > 0) {
      totalHash += rig.hashrate;
    }
  }
  economy.difficulty = 1 + (totalHash / 10) * 0.5;
  
  // Camera
  const tcx = player.x * SCALE - canvas.width / 2;
  const tcy = player.y * SCALE - canvas.height / 2;
  cam.x += (tcx - cam.x) * 4 * dt;
  cam.y += (tcy - cam.y) * 4 * dt;
  
  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.y += p.vy * dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
  
  // Notifications
  for (let i = notifications.length - 1; i >= 0; i--) {
    notifications[i].timer -= dt;
    if (notifications[i].timer <= 0) notifications.splice(i, 1);
  }
  
  // Clear justPressed
  for (const k in justPressed) justPressed[k] = false;
}

// ---- DRAWING ----
function drawTile(x, y, tile) {
  const sx = x * ST - cam.x;
  const sy = y * ST - cam.y;
  
  // Skip off-screen
  if (sx > canvas.width + ST || sy > canvas.height + ST || sx < -ST || sy < -ST) return;
  
  const v = ((x * 7 + y * 13) % 3);
  const t = performance.now() / 1000;
  
  switch(tile) {
    case T.GRASS:
      ctx.fillStyle = C.grass[v];
      ctx.fillRect(sx, sy, ST, ST);
      // Grass detail
      if ((x * 3 + y * 7) % 11 === 0) {
        ctx.fillStyle = C.grass[(v+1)%4];
        ctx.fillRect(sx + 12, sy + 8, 4, 8);
      }
      break;
    case T.TALL_GRASS:
      ctx.fillStyle = C.grass[v];
      ctx.fillRect(sx, sy, ST, ST);
      // Swaying grass blades
      const sway = Math.sin(t * 2 + x + y) * 3;
      ctx.fillStyle = '#5A9C3E';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(sx + 8 + i * 12 + sway, sy + 4, 3, ST - 8);
      }
      break;
    case T.FLOWERS:
      ctx.fillStyle = C.grass[v];
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = C.grassFlower[(x + y) % 4];
      ctx.fillRect(sx + 12, sy + 12, 6, 6);
      ctx.fillRect(sx + 28, sy + 24, 6, 6);
      break;
    case T.DIRT:
      ctx.fillStyle = C.dirt[v];
      ctx.fillRect(sx, sy, ST, ST);
      break;
    case T.STONE:
      ctx.fillStyle = C.stone[v];
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = C.stone[(v+1)%3];
      ctx.fillRect(sx + 6, sy + 6, 12, 8);
      break;
    case T.WATER:
      ctx.fillStyle = C.water[v];
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = `rgba(100,180,255,${0.1 + Math.sin(t*2+x+y)*0.08})`;
      ctx.fillRect(sx, sy, ST, ST);
      break;
    case T.DEEP_WATER:
      ctx.fillStyle = '#1A4570';
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = `rgba(60,140,220,${0.1 + Math.sin(t*1.5+x*2+y)*0.1})`;
      ctx.fillRect(sx, sy, ST, ST);
      break;
    case T.SAND:
      ctx.fillStyle = C.sand[v];
      ctx.fillRect(sx, sy, ST, ST);
      break;
    case T.PATH:
      ctx.fillStyle = C.path[v];
      ctx.fillRect(sx, sy, ST, ST);
      break;
    case T.WOOD_WALL:
      ctx.fillStyle = C.woodWall;
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = '#5A3310';
      ctx.fillRect(sx + 2, sy + ST/2 - 1, ST - 4, 2);
      break;
    case T.WOOD_FLOOR:
      ctx.fillStyle = C.woodFloor;
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = '#907040';
      for (let i = 0; i < 3; i++) ctx.fillRect(sx, sy + i * 16, ST, 1);
      break;
    case T.FENCE:
      ctx.fillStyle = C.grass[v]; // grass underneath
      ctx.fillRect(sx, sy, ST, ST);
      ctx.fillStyle = C.fence;
      ctx.fillRect(sx + ST/2 - 3, sy, 6, ST); // post
      ctx.fillRect(sx, sy + 10, ST, 4); // rail
      ctx.fillRect(sx, sy + ST - 14, ST, 4); // rail
      break;
  }
}

function drawTree(dx, dy, variant) {
  const sx = dx * ST - cam.x;
  const sy = dy * ST - cam.y;
  if (sx > canvas.width + ST*2 || sy > canvas.height + ST*2 || sx < -ST*2 || sy < -ST*2) return;
  
  // Trunk
  ctx.fillStyle = '#5A3A1A';
  ctx.fillRect(sx + ST/2 - 6, sy + 8, 12, ST - 8);
  // Canopy
  const colors = ['#2B5E1A', '#3A7025', '#2E6820'];
  ctx.fillStyle = colors[variant];
  ctx.beginPath();
  ctx.arc(sx + ST/2, sy - 4, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#4A8A35';
  ctx.beginPath();
  ctx.arc(sx + ST/2 - 6, sy, 14, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer() {
  const sx = player.x * SCALE - cam.x;
  const sy = player.y * SCALE - cam.y;
  const w = ST, h = ST + 12;
  const px = sx - w/2, py = sy - h/2;
  const bob = player.isMoving ? Math.sin(player.walkFrame * Math.PI / 2) * 2 : 0;
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + h/2 + 2, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Legs
  const legOffset = player.isMoving ? Math.sin(player.walkFrame * Math.PI) * 4 : 0;
  ctx.fillStyle = C.darkOrange;
  ctx.fillRect(px + 10 + legOffset, py + h - 16, 10, 16);
  ctx.fillRect(px + w - 20 - legOffset, py + h - 16, 10, 16);
  
  // Boots
  ctx.fillStyle = '#4A3520';
  ctx.fillRect(px + 8 + legOffset, py + h - 6, 14, 6);
  ctx.fillRect(px + w - 22 - legOffset, py + h - 6, 14, 6);
  
  // Body
  ctx.fillStyle = C.orange;
  ctx.fillRect(px + 6, py + 16 + bob, w - 12, h - 34);
  
  // Bitcoin logo on shirt
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${14}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText('₿', sx, py + 36 + bob);
  
  // Arms
  const armSwing = player.isMoving ? Math.sin(player.walkFrame * Math.PI) * 6 : 0;
  ctx.fillStyle = C.skin;
  ctx.fillRect(px + 1, py + 18 + bob - armSwing, 8, 20);
  ctx.fillRect(px + w - 9, py + 18 + bob + armSwing, 8, 20);
  
  // Head
  ctx.fillStyle = C.skin;
  ctx.fillRect(px + 10, py + 2 + bob, w - 20, 18);
  
  // Hair
  ctx.fillStyle = C.hair;
  ctx.fillRect(px + 8, py - 2 + bob, w - 16, 8);
  
  // Eyes
  ctx.fillStyle = C.black;
  if (player.facing.x <= 0) ctx.fillRect(px + 14, py + 10 + bob, 4, 4);
  if (player.facing.x >= 0) ctx.fillRect(px + w - 18, py + 10 + bob, 4, 4);
}

function drawNPC(npc) {
  const sx = npc.x * SCALE - cam.x;
  const sy = npc.y * SCALE - cam.y;
  const w = ST, h = ST + 8;
  const px = sx - w/2, py = sy - h/2;
  
  if (sx > canvas.width + w || sy > canvas.height + h || sx < -w || sy < -h) return;
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(sx, sy + h/2, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Body
  ctx.fillStyle = npc.color;
  ctx.fillRect(px + 8, py + 14, w - 16, h - 28);
  // Head
  ctx.fillStyle = C.skin;
  ctx.fillRect(px + 12, py + 2, w - 24, 16);
  // Hair
  ctx.fillStyle = npc.hairColor;
  ctx.fillRect(px + 10, py - 2, w - 20, 8);
  // Eyes
  ctx.fillStyle = C.black;
  ctx.fillRect(px + 16, py + 8, 3, 3);
  ctx.fillRect(px + w - 19, py + 8, 3, 3);
  
  // Name above head
  const dist = Math.hypot(npc.x - player.x, npc.y - player.y);
  if (dist < 48) {
    ctx.fillStyle = C.white;
    ctx.font = `bold 11px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(npc.name, sx, py - 8);
    
    // Interact prompt
    ctx.fillStyle = C.gray;
    ctx.font = `10px ${FONT}`;
    ctx.fillText('[E] Talk', sx, py - 20);
  }
}

function drawRig(rig) {
  const sx = rig.x * SCALE - cam.x;
  const sy = rig.y * SCALE - cam.y;
  const w = ST, h = ST;
  const rx = sx - w/2, ry = sy - h/2;
  
  if (sx > canvas.width + w || sy > canvas.height + h || sx < -w || sy < -h) return;
  
  // Heat glow
  if (rig.temperature > 60) {
    const intensity = (rig.temperature - 60) / 40;
    ctx.fillStyle = `rgba(255,${Math.floor(80-intensity*80)},0,${intensity*0.2})`;
    ctx.fillRect(rx - 6, ry - 6, w + 12, h + 12);
  }
  
  // Body
  ctx.fillStyle = C.rigDark;
  ctx.fillRect(rx, ry, w, 6);
  ctx.fillStyle = C.rigBody;
  ctx.fillRect(rx, ry + 6, w, h - 6);
  ctx.fillStyle = C.rigLight;
  ctx.fillRect(rx + 2, ry + 8, w - 4, 2);
  
  // Vent lines
  ctx.fillStyle = '#444444';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(rx + 6, ry + 16 + i * 10, w - 12, 2);
  }
  
  // LED
  const ledPulse = rig.powered && rig.durability > 0;
  ctx.fillStyle = ledPulse ? C.ledGreen : '#440000';
  if (ledPulse && rig.animFrame % 2 === 0) ctx.fillStyle = '#00CC00';
  ctx.fillRect(rx + 4, ry + 2, 6, 3);
  
  // Hash LED
  ctx.fillStyle = rig.overheating ? C.red : (rig.powered ? C.ledOrange : '#442200');
  ctx.fillRect(rx + w - 10, ry + 2, 6, 3);
  
  // Status
  const dist = Math.hypot(rig.x - player.x, rig.y - player.y);
  ctx.fillStyle = rig.getStatusColor();
  ctx.font = `bold 10px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(rig.getStatus(), sx, ry - 4);
  
  // Temp bar
  if (dist < 48) {
    const barW = w - 4;
    const pct = (rig.temperature - 15) / 85;
    ctx.fillStyle = '#222';
    ctx.fillRect(rx + 2, ry + h + 2, barW, 4);
    ctx.fillStyle = pct > 0.8 ? C.red : pct > 0.5 ? C.ledOrange : C.green;
    ctx.fillRect(rx + 2, ry + h + 2, barW * pct, 4);
    
    // Interact prompt
    ctx.fillStyle = C.gray;
    ctx.font = `10px ${FONT}`;
    ctx.fillText('[E] Toggle', sx, ry - 16);
  }
}

function drawHUD() {
  const pad = 12;
  const w = 240, h = 160;
  
  // Main HUD panel
  ctx.fillStyle = C.hudBg;
  roundRect(pad, pad, w, h, 4);
  ctx.strokeStyle = C.hudBorder;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Balance
  ctx.fillStyle = C.hud;
  ctx.font = `bold 16px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.fillText(`₿ ${fmt(player.wallet)} sats`, pad + 10, pad + 24);
  
  // Time
  ctx.font = `13px ${FONT}`;
  ctx.fillStyle = '#CCCCCC';
  ctx.fillText(`${getTimeStr()}${time.speed > 1 ? ' ⏩' : ''}`, pad + 10, pad + 44);
  ctx.fillText(`Day ${time.day} — ${getPeriod()}`, pad + 10, pad + 62);
  
  // Hashrate
  const totalHash = rigs.reduce((s, r) => s + (r.powered && !r.overheating && r.durability > 0 ? r.hashrate : 0), 0);
  ctx.fillText(`⚡ ${totalHash.toFixed(1)} TH/s`, pad + 10, pad + 82);
  ctx.fillText(`Difficulty: ${economy.difficulty.toFixed(2)}`, pad + 10, pad + 100);
  
  // Phase
  ctx.fillStyle = C.phaseColors[economy.phase];
  ctx.font = `bold 13px ${FONT}`;
  ctx.fillText(`${economy.phaseNames[economy.phase]}`, pad + 10, pad + 120);
  ctx.fillStyle = C.gray;
  ctx.font = `11px ${FONT}`;
  ctx.fillText(`Day ${economy.phaseDays + 1}/28 | Cycle ${economy.cycle + 1}`, pad + 10, pad + 136);
  ctx.fillText(`Rigs: ${rigs.length} | Halvings: ${economy.halvings}`, pad + 10, pad + 152);
  
  // Nearest rig detail
  let nearRig = null, nearDist = 60;
  for (const r of rigs) {
    const d = Math.hypot(r.x - player.x, r.y - player.y);
    if (d < nearDist) { nearRig = r; nearDist = d; }
  }
  
  if (nearRig) {
    const rw = 210, rh = 100;
    const rx = canvas.width - rw - pad;
    ctx.fillStyle = C.hudBg;
    roundRect(rx, pad, rw, rh, 4);
    ctx.strokeStyle = C.hudBorder;
    ctx.stroke();
    
    ctx.fillStyle = C.hud;
    ctx.font = `bold 13px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(nearRig.tierNames[nearRig.tier], rx + 10, pad + 20);
    
    ctx.font = `11px ${FONT}`;
    ctx.fillStyle = '#CCC';
    ctx.fillText(`Temp: ${nearRig.temperature.toFixed(0)}°C`, rx + 10, pad + 38);
    ctx.fillText(`Durability: ${nearRig.durability.toFixed(0)}%`, rx + 10, pad + 54);
    ctx.fillText(`Mined: ${fmt(nearRig.satsMined)} sats`, rx + 10, pad + 70);
    ctx.fillStyle = nearRig.getStatusColor();
    ctx.fillText(`Status: ${nearRig.getStatus()}`, rx + 10, pad + 86);
  }
  
  // Dialogue box
  if (activeDialogue) {
    const dw = Math.min(600, canvas.width - 40);
    const dh = 80;
    const dx = (canvas.width - dw) / 2;
    const dy = canvas.height - dh - 20;
    
    ctx.fillStyle = C.hudBg;
    roundRect(dx, dy, dw, dh, 6);
    ctx.strokeStyle = C.hud;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = C.hud;
    ctx.font = `bold 14px ${FONT}`;
    ctx.textAlign = 'left';
    ctx.fillText(activeDialogue.name, dx + 16, dy + 24);
    
    ctx.fillStyle = C.white;
    ctx.font = `13px ${FONT}`;
    ctx.fillText(activeDialogue.text, dx + 16, dy + 50);
    
    ctx.fillStyle = C.gray;
    ctx.font = `10px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.fillText('[E] Close', dx + dw - 12, dy + dh - 10);
  }
  
  // Notifications
  ctx.textAlign = 'center';
  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];
    const alpha = Math.min(1, n.timer);
    ctx.fillStyle = n.big ? `rgba(255,215,0,${alpha})` : `rgba(247,147,26,${alpha})`;
    ctx.font = `bold ${n.big ? 18 : 14}px ${FONT}`;
    ctx.fillText(n.text, canvas.width / 2, canvas.height - 60 - i * 24);
  }
  
  // Particles
  for (const p of particles) {
    ctx.fillStyle = `rgba(247,147,26,${Math.min(1, p.life)})`;
    ctx.font = `bold 12px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(p.text, p.x - cam.x, p.y - cam.y);
  }
  
  ctx.textAlign = 'left';
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function fmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function draw() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Tiles
  const startX = Math.max(0, Math.floor(cam.x / ST) - 1);
  const startY = Math.max(0, Math.floor(cam.y / ST) - 1);
  const endX = Math.min(MAP_W, startX + Math.ceil(canvas.width / ST) + 3);
  const endY = Math.min(MAP_H, startY + Math.ceil(canvas.height / ST) + 3);
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      drawTile(x, y, map[y][x]);
    }
  }
  
  // Trees
  for (const d of decorations) {
    if (d.type === 'tree') drawTree(d.x, d.y, d.variant);
  }
  
  // Rigs
  for (const rig of rigs) drawRig(rig);
  
  // NPCs
  for (const npc of npcs) drawNPC(npc);
  
  // Player
  drawPlayer();
  
  // Day/night overlay
  const dn = getDayOverlay();
  if (dn.a > 0) {
    ctx.fillStyle = `rgba(${dn.r},${dn.g},${dn.b},${dn.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // HUD (on top of everything)
  drawHUD();
}

function gameLoop(now) {
  const dt = Math.min(0.1, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
