// ====================================
// SATOSHI VALLEY — Browser Prototype
// ====================================

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const TILE = 16;
const SCALE = 2;
const STILE = TILE * SCALE; // scaled tile size
const MAP_W = 40;
const MAP_H = 30;

// ---- INPUT ----
const keys = {};
document.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// ---- COLORS ----
const COL = {
  grass1: '#3A6C1E', grass2: '#4A7C2E', grass3: '#5A8C3E',
  dirt1: '#8B6914', dirt2: '#7B5904',
  stone: '#707070',
  wood: '#8B6340',
  water: '#2266AA',
  path: '#9B8860',
  orange: '#F7931A',
  darkOrange: '#C47415',
  skin: '#FFD5A0',
  hair: '#503214',
  rigGray: '#555555',
  rigDark: '#333333',
  ledGreen: '#00FF00',
  ledOrange: '#F7931A',
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF3333',
  hud: '#F7931A',
  hudBg: 'rgba(0,0,0,0.7)',
};

// ---- MAP GENERATION ----
// 0=grass, 1=dirt, 2=stone, 3=water, 4=path, 5=wood(wall)
const map = [];
function generateMap() {
  const rng = mulberry32(42);
  for (let y = 0; y < MAP_H; y++) {
    map[y] = [];
    for (let x = 0; x < MAP_W; x++) {
      // Border = water
      if (x === 0 || y === 0 || x === MAP_W-1 || y === MAP_H-1) {
        map[y][x] = 3; continue;
      }
      // Cabin area (center)
      if (x >= 18 && x <= 22 && y >= 13 && y <= 17) {
        if (y === 13 || y === 17 || x === 18 || x === 22) {
          map[y][x] = 5; continue; // walls
        }
        map[y][x] = 5; continue;
      }
      // Door
      if (x === 20 && y === 17) { map[y][x] = 4; continue; }
      // Path from cabin to left
      if (y === 18 && x >= 5 && x <= 22) { map[y][x] = 4; continue; }
      // Mining shed area (left)
      if (x >= 3 && x <= 8 && y >= 10 && y <= 14) {
        if (y === 10 || y === 14 || x === 3 || x === 8) {
          map[y][x] = 2; continue;
        }
        map[y][x] = 1; continue;
      }
      // Garden area (right of cabin)
      if (x >= 25 && x <= 32 && y >= 14 && y <= 18) {
        map[y][x] = 1; continue;
      }
      // Pond
      if (x >= 30 && x <= 34 && y >= 5 && y <= 8) {
        map[y][x] = 3; continue;
      }
      // Scattered dirt patches
      if (rng() < 0.08) { map[y][x] = 1; continue; }
      // Stone patches near mines (top)
      if (y < 6 && rng() < 0.15) { map[y][x] = 2; continue; }
      map[y][x] = 0;
    }
  }
}

function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function getTileColor(tile, x, y) {
  const v = ((x * 7 + y * 13) % 3);
  switch(tile) {
    case 0: return [COL.grass1, COL.grass2, COL.grass3][v];
    case 1: return v === 0 ? COL.dirt1 : COL.dirt2;
    case 2: return COL.stone;
    case 3: return COL.water;
    case 4: return COL.path;
    case 5: return COL.wood;
    default: return COL.grass1;
  }
}

function isSolid(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) return true;
  const t = map[ty][tx];
  return t === 3 || t === 5; // water and walls are solid
}

// ---- PLAYER ----
const player = {
  x: 20 * TILE + 8,
  y: 19 * TILE + 8,
  speed: 80,
  facing: { x: 0, y: 1 },
  wallet: 1000,
  totalEarned: 0,
};

// ---- MINING RIGS ----
const rigs = [];
class MiningRig {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.powered = true;
    this.hashrate = 1.0;
    this.power = 0.3;
    this.heat = 0.2;
    this.temperature = 20;
    this.durability = 100;
    this.overheating = false;
    this.satsMined = 0;
    this.mineTimer = 0;
    this.heatTimer = 0;
  }
  
  update(dt) {
    if (!this.powered || this.durability <= 0) {
      // Cool down
      this.temperature -= 0.5 * dt;
      this.temperature = Math.max(15, this.temperature);
      return 0;
    }
    
    // Heat
    this.heatTimer += dt;
    if (this.heatTimer >= 1) {
      this.heatTimer = 0;
      if (this.powered) this.temperature += this.heat * 3;
      this.temperature -= (this.temperature - 20) * 0.05;
      this.temperature = Math.max(15, Math.min(100, this.temperature));
      this.overheating = this.temperature >= 85;
      if (this.temperature < 70) this.overheating = false;
    }
    
    if (this.overheating) return 0;
    
    // Mining
    this.mineTimer += dt;
    let earned = 0;
    if (this.mineTimer >= 2) {
      this.mineTimer = 0;
      const heatPen = 1 - Math.max(0, Math.min(0.5, (this.temperature - 70) / 30));
      const durPen = this.durability / 100;
      const effective = this.hashrate * heatPen * durPen;
      earned = Math.floor(effective * 10 / economy.difficulty);
      if (earned < 1) earned = 1;
      this.satsMined += earned;
      
      // Block lottery
      if (Math.random() < effective * 0.0001) {
        const reward = 625000;
        earned += reward;
        this.satsMined += reward;
        notifications.push({ text: '⛏️ BLOCK FOUND! +625,000 sats!', timer: 5 });
      }
      
      this.durability -= 0.05;
      if (this.durability < 0) this.durability = 0;
    }
    return earned;
  }
  
  getStatus() {
    if (this.durability <= 0) return 'BROKEN';
    if (this.overheating) return 'OVRHEAT';
    if (!this.powered) return 'OFF';
    return Math.floor(this.hashrate * 10 / economy.difficulty) + ' s/s';
  }
  
  getStatusColor() {
    if (this.durability <= 0) return COL.red;
    if (this.overheating) return '#FF6600';
    if (!this.powered) return '#888888';
    return COL.ledGreen;
  }
}

// ---- ECONOMY ----
const economy = {
  difficulty: 1.0,
  phase: 0, // 0=accum, 1=hype, 2=euphoria, 3=capitulation
  phaseNames: ['Accumulation', 'Hype', 'Euphoria', 'Capitulation'],
  phaseColors: ['#4488FF', '#44FF44', '#FFD700', '#FF4444'],
  phaseDays: 0,
  fiatInflation: 1.0,
};

// ---- TIME ----
const time = {
  dayLength: 180, // 3 minutes per day (shorter for prototype)
  current: 0.25, // start at 6 AM (6/24)
  day: 1,
  speed: 1,
};

function getHour() { return time.current * 24; }
function getTimeString() {
  const h = Math.floor(getHour());
  const m = Math.floor((getHour() - h) * 60);
  const period = h < 12 ? 'AM' : 'PM';
  const dh = h % 12 || 12;
  return `${dh}:${m.toString().padStart(2,'0')} ${period}`;
}
function getPeriod() {
  const h = getHour();
  if (h < 5) return 'Night';
  if (h < 7) return 'Dawn';
  if (h < 12) return 'Morning';
  if (h < 14) return 'Noon';
  if (h < 17) return 'Afternoon';
  if (h < 21) return 'Evening';
  return 'Night';
}

function getDayNightColor() {
  const h = getHour();
  if (h < 5) return { r: 0.1, g: 0.1, b: 0.25, a: 0.5 };
  if (h < 7) return { r: 0.85, g: 0.75, b: 0.65, a: lerp(0.3, 0, (h-5)/2) };
  if (h < 17) return { r: 1, g: 1, b: 1, a: 0 };
  if (h < 19) return { r: 0.9, g: 0.65, b: 0.45, a: lerp(0, 0.2, (h-17)/2) };
  if (h < 21) return { r: 0.4, g: 0.35, b: 0.55, a: lerp(0.2, 0.4, (h-19)/2) };
  return { r: 0.15, g: 0.15, b: 0.3, a: lerp(0.4, 0.5, (h-21)/3) };
}

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

// ---- NOTIFICATIONS ----
const notifications = [];

// ---- CAMERA ----
const camera = { x: 0, y: 0 };

// ---- GAME LOOP ----
let lastTime = performance.now();
let placeRigCooldown = 0;
let interactCooldown = 0;

generateMap();

// Place a starter rig in the mining shed
const starterRig = new MiningRig(5 * TILE + 8, 12 * TILE + 8);
rigs.push(starterRig);

function update(dt) {
  // Time
  time.current += (dt * time.speed) / time.dayLength;
  if (time.current >= 1) {
    time.current -= 1;
    time.day++;
    economy.phaseDays++;
    if (economy.phaseDays >= 28) {
      economy.phaseDays = 0;
      economy.phase = (economy.phase + 1) % 4;
      if (economy.phase === 0) {
        economy.fiatInflation *= 1.05;
        notifications.push({ text: '🔄 New cycle! Fiat inflated 5%', timer: 4 });
      }
      notifications.push({ text: `📈 Phase: ${economy.phaseNames[economy.phase]}`, timer: 3 });
    }
  }
  
  // Time speed
  if (keys[' ']) {
    time.speed = 10;
  } else {
    time.speed = 1;
  }
  
  // Player movement
  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy -= 1;
  if (keys['s'] || keys['arrowdown']) dy += 1;
  if (keys['a'] || keys['arrowleft']) dx -= 1;
  if (keys['d'] || keys['arrowright']) dx += 1;
  
  if (dx !== 0 || dy !== 0) {
    const len = Math.sqrt(dx*dx + dy*dy);
    dx /= len; dy /= len;
    player.facing.x = dx; player.facing.y = dy;
    
    const nx = player.x + dx * player.speed * dt;
    const ny = player.y + dy * player.speed * dt;
    
    // Collision check
    const tx = Math.floor(nx / TILE);
    const ty = Math.floor(ny / TILE);
    if (!isSolid(tx, ty)) {
      player.x = nx;
      player.y = ny;
    } else {
      // Try sliding
      const txH = Math.floor(nx / TILE);
      const tyH = Math.floor(player.y / TILE);
      if (!isSolid(txH, tyH)) player.x = nx;
      
      const txV = Math.floor(player.x / TILE);
      const tyV = Math.floor(ny / TILE);
      if (!isSolid(txV, tyV)) player.y = ny;
    }
  }
  
  // Place rig (R)
  placeRigCooldown -= dt;
  if (keys['r'] && placeRigCooldown <= 0) {
    placeRigCooldown = 0.5;
    if (player.wallet < 500) {
      notifications.push({ text: 'Need 500 sats for a CPU miner!', timer: 2 });
    } else {
      const rx = Math.round((player.x + player.facing.x * 24) / TILE) * TILE + 8;
      const ry = Math.round((player.y + player.facing.y * 24) / TILE) * TILE + 8;
      
      // Check not on solid tile and not overlapping existing rig
      const rtx = Math.floor(rx / TILE);
      const rty = Math.floor(ry / TILE);
      const overlap = rigs.some(r => Math.abs(r.x - rx) < TILE && Math.abs(r.y - ry) < TILE);
      
      if (!isSolid(rtx, rty) && !overlap) {
        player.wallet -= 500;
        const rig = new MiningRig(rx, ry);
        rigs.push(rig);
        notifications.push({ text: '⛏️ Placed CPU miner! (-500 sats)', timer: 2 });
      } else {
        notifications.push({ text: "Can't place here!", timer: 1.5 });
      }
    }
  }
  
  // Interact (E)
  interactCooldown -= dt;
  if (keys['e'] && interactCooldown <= 0) {
    interactCooldown = 0.3;
    const ix = player.x + player.facing.x * 20;
    const iy = player.y + player.facing.y * 20;
    
    let closest = null;
    let closestDist = 24;
    for (const rig of rigs) {
      const d = Math.sqrt((rig.x - ix)**2 + (rig.y - iy)**2);
      if (d < closestDist) { closest = rig; closestDist = d; }
    }
    
    if (closest) {
      closest.powered = !closest.powered;
      notifications.push({ 
        text: `Rig ${closest.powered ? 'ON ⚡' : 'OFF 💤'}`, 
        timer: 1.5 
      });
    }
  }
  
  // Update rigs
  let totalHash = 0;
  for (const rig of rigs) {
    const earned = rig.update(dt);
    if (earned > 0) {
      player.wallet += earned;
      player.totalEarned += earned;
    }
    if (rig.powered && !rig.overheating && rig.durability > 0) {
      totalHash += rig.hashrate;
    }
  }
  economy.difficulty = 1 + (totalHash / 10) * 0.5;
  
  // Camera
  const targetCX = player.x * SCALE - canvas.width / 2;
  const targetCY = player.y * SCALE - canvas.height / 2;
  camera.x += (targetCX - camera.x) * 5 * dt;
  camera.y += (targetCY - camera.y) * 5 * dt;
  
  // Notifications
  for (let i = notifications.length - 1; i >= 0; i--) {
    notifications[i].timer -= dt;
    if (notifications[i].timer <= 0) notifications.splice(i, 1);
  }
}

function draw() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  
  // Draw tiles (only visible ones)
  const startX = Math.max(0, Math.floor(camera.x / STILE));
  const startY = Math.max(0, Math.floor(camera.y / STILE));
  const endX = Math.min(MAP_W, startX + Math.ceil(canvas.width / STILE) + 2);
  const endY = Math.min(MAP_H, startY + Math.ceil(canvas.height / STILE) + 2);
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      ctx.fillStyle = getTileColor(map[y][x], x, y);
      ctx.fillRect(x * STILE, y * STILE, STILE, STILE);
      
      // Water shimmer
      if (map[y][x] === 3) {
        ctx.fillStyle = 'rgba(100,180,255,0.15)';
        const shimmer = Math.sin(performance.now() / 500 + x + y) * 0.5 + 0.5;
        ctx.globalAlpha = shimmer * 0.3;
        ctx.fillRect(x * STILE, y * STILE, STILE, STILE);
        ctx.globalAlpha = 1;
      }
    }
  }
  
  // Draw mining rigs
  for (const rig of rigs) {
    const rx = rig.x * SCALE - STILE/2;
    const ry = rig.y * SCALE - STILE/2;
    
    // Body
    ctx.fillStyle = COL.rigGray;
    ctx.fillRect(rx + 2, ry + 4, STILE - 4, STILE - 6);
    // Top
    ctx.fillStyle = COL.rigDark;
    ctx.fillRect(rx + 2, ry + 2, STILE - 4, 4);
    // LED
    ctx.fillStyle = rig.powered && rig.durability > 0 ? COL.ledGreen : '#440000';
    ctx.fillRect(rx + 4, ry + 3, 4, 2);
    // Heat glow
    if (rig.temperature > 60) {
      const intensity = (rig.temperature - 60) / 40;
      ctx.fillStyle = `rgba(255, ${Math.floor(100 - intensity * 100)}, 0, ${intensity * 0.3})`;
      ctx.fillRect(rx - 2, ry - 2, STILE + 4, STILE + 4);
    }
    
    // Status text
    ctx.fillStyle = rig.getStatusColor();
    ctx.font = '10px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(rig.getStatus(), rig.x * SCALE, ry - 2);
    
    // Temp bar
    const barW = STILE - 4;
    const tempPct = (rig.temperature - 15) / 85;
    ctx.fillStyle = '#333';
    ctx.fillRect(rx + 2, ry + STILE + 2, barW, 3);
    ctx.fillStyle = tempPct > 0.8 ? COL.red : tempPct > 0.5 ? '#FF8800' : COL.ledGreen;
    ctx.fillRect(rx + 2, ry + STILE + 2, barW * tempPct, 3);
  }
  
  // Draw player
  const px = player.x * SCALE - STILE/2;
  const py = player.y * SCALE - STILE/2;
  
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(player.x * SCALE, py + STILE + 2, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Legs
  ctx.fillStyle = COL.darkOrange;
  ctx.fillRect(px + 6, py + STILE - 8, 6, 8);
  ctx.fillRect(px + STILE - 12, py + STILE - 8, 6, 8);
  // Body
  ctx.fillStyle = COL.orange;
  ctx.fillRect(px + 4, py + 8, STILE - 8, STILE - 14);
  // Arms
  ctx.fillStyle = COL.skin;
  ctx.fillRect(px + 1, py + 8, 4, 12);
  ctx.fillRect(px + STILE - 5, py + 8, 4, 12);
  // Head
  ctx.fillStyle = COL.skin;
  ctx.fillRect(px + 6, py + 2, STILE - 12, 8);
  // Hair
  ctx.fillStyle = COL.hair;
  ctx.fillRect(px + 6, py, STILE - 12, 4);
  // Eyes
  ctx.fillStyle = COL.black;
  ctx.fillRect(px + 8, py + 4, 2, 2);
  ctx.fillRect(px + STILE - 10, py + 4, 2, 2);
  // Bitcoin B on shirt
  ctx.fillStyle = COL.black;
  ctx.font = 'bold 10px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('₿', player.x * SCALE, py + 22);
  
  ctx.restore();
  
  // ---- Day/Night overlay ----
  const dnColor = getDayNightColor();
  if (dnColor.a > 0) {
    ctx.fillStyle = `rgba(${Math.floor(dnColor.r*255)},${Math.floor(dnColor.g*255)},${Math.floor(dnColor.b*255)},${dnColor.a})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // ---- HUD ----
  ctx.fillStyle = COL.hudBg;
  ctx.fillRect(8, 8, 220, 120);
  ctx.strokeStyle = COL.hud;
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 8, 220, 120);
  
  ctx.fillStyle = COL.hud;
  ctx.font = 'bold 14px Courier New';
  ctx.textAlign = 'left';
  ctx.fillText(`₿ ${formatNum(player.wallet)} sats`, 16, 28);
  
  ctx.font = '12px Courier New';
  ctx.fillStyle = '#CCCCCC';
  ctx.fillText(getTimeString() + (time.speed > 1 ? ' ⏩' : ''), 16, 46);
  ctx.fillText(`Day ${time.day} — ${getPeriod()}`, 16, 62);
  
  const totalHash = rigs.reduce((s, r) => s + (r.powered && !r.overheating && r.durability > 0 ? r.hashrate : 0), 0);
  ctx.fillText(`⚡ ${totalHash.toFixed(1)} TH/s | Diff: ${economy.difficulty.toFixed(1)}`, 16, 78);
  
  ctx.fillStyle = economy.phaseColors[economy.phase];
  ctx.fillText(`Phase: ${economy.phaseNames[economy.phase]}`, 16, 94);
  
  ctx.fillStyle = '#888';
  ctx.fillText(`Rigs: ${rigs.length} | Day ${economy.phaseDays + 1}/28`, 16, 110);
  ctx.fillText(`Total earned: ${formatNum(player.totalEarned)}`, 16, 122);
  
  // ---- Rig detail (nearest rig) ----
  let nearestRig = null;
  let nearestDist = 48;
  for (const rig of rigs) {
    const d = Math.sqrt((rig.x - player.x)**2 + (rig.y - player.y)**2);
    if (d < nearestDist) { nearestRig = rig; nearestDist = d; }
  }
  
  if (nearestRig) {
    const panelX = canvas.width - 200;
    ctx.fillStyle = COL.hudBg;
    ctx.fillRect(panelX, 8, 192, 80);
    ctx.strokeStyle = COL.hud;
    ctx.strokeRect(panelX, 8, 192, 80);
    
    ctx.fillStyle = COL.hud;
    ctx.font = 'bold 12px Courier New';
    ctx.fillText('CPU Miner', panelX + 8, 26);
    
    ctx.font = '11px Courier New';
    ctx.fillStyle = '#CCC';
    ctx.fillText(`Temp: ${nearestRig.temperature.toFixed(0)}°C`, panelX + 8, 42);
    ctx.fillText(`Durability: ${nearestRig.durability.toFixed(0)}%`, panelX + 8, 56);
    ctx.fillText(`Mined: ${formatNum(nearestRig.satsMined)} sats`, panelX + 8, 70);
    ctx.fillStyle = nearestRig.getStatusColor();
    ctx.fillText(`Status: ${nearestRig.getStatus()}`, panelX + 8, 84);
  }
  
  // ---- Notifications ----
  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];
    const alpha = Math.min(1, n.timer);
    ctx.fillStyle = `rgba(247, 147, 26, ${alpha})`;
    ctx.font = 'bold 14px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(n.text, canvas.width / 2, canvas.height - 40 - i * 20);
  }
  ctx.textAlign = 'left';
}

function formatNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function gameLoop(now) {
  const dt = Math.min(0.1, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
