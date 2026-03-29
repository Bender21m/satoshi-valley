// ============================================================
// SATOSHI VALLEY — Sprite Generator
// Creates pixel-perfect 16x16 sprites on offscreen canvases
// These replace the runtime ctx.fillRect drawing for key items
// ============================================================

const SpriteCache = {};

function createSprite(name, size, drawFn) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const cx = c.getContext('2d');
  cx.imageSmoothingEnabled = false;
  drawFn(cx, size);
  SpriteCache[name] = c;
  return c;
}

function initSprites() {
  const S = 16; // Base sprite size
  
  // ---- ITEMS ----
  
  createSprite('item_wrench', S, (cx, s) => {
    // Wrench
    cx.fillStyle = '#888';
    cx.fillRect(6, 1, 4, 10);
    cx.fillStyle = '#AAA';
    cx.fillRect(5, 0, 6, 3); // head
    cx.fillRect(4, 0, 2, 4);
    cx.fillRect(10, 0, 2, 4);
    cx.fillStyle = '#664';
    cx.fillRect(6, 10, 4, 5); // handle
    cx.fillStyle = '#775';
    cx.fillRect(7, 11, 2, 3);
  });
  
  createSprite('item_pickaxe', S, (cx, s) => {
    cx.fillStyle = '#664';
    cx.fillRect(7, 4, 2, 12); // handle
    cx.fillStyle = '#888';
    cx.fillRect(2, 1, 12, 3); // head
    cx.fillStyle = '#AAA';
    cx.fillRect(2, 1, 3, 4); // left point
    cx.fillRect(11, 1, 3, 4); // right point
    cx.fillStyle = '#666';
    cx.fillRect(6, 1, 4, 4); // binding
  });
  
  createSprite('item_cpu', S, (cx, s) => {
    cx.fillStyle = '#4A4A50';
    cx.fillRect(2, 2, 12, 12);
    cx.fillStyle = '#3A3A40';
    cx.fillRect(2, 2, 12, 3);
    cx.fillStyle = '#333';
    for (let i = 0; i < 3; i++) cx.fillRect(4, 7 + i * 3, 8, 1);
    cx.fillStyle = '#0F0';
    cx.fillRect(3, 3, 2, 1);
    cx.fillStyle = '#F70';
    cx.fillRect(11, 3, 2, 1);
  });
  
  createSprite('item_gpu', S, (cx, s) => {
    cx.fillStyle = '#445';
    cx.fillRect(1, 12, 14, 3); // base
    cx.fillRect(2, 2, 2, 10); // left post
    cx.fillRect(12, 2, 2, 10);
    cx.fillStyle = '#568';
    cx.fillRect(4, 3, 3, 9); // card 1
    cx.fillStyle = '#586';
    cx.fillRect(8, 3, 3, 9); // card 2
    cx.fillStyle = '#0F0';
    cx.fillRect(3, 2, 2, 1);
  });
  
  createSprite('item_asic', S, (cx, s) => {
    cx.fillStyle = '#1A1A20';
    cx.fillRect(1, 3, 14, 10);
    cx.fillStyle = '#F7931A';
    cx.fillRect(1, 7, 14, 2); // orange stripe
    cx.fillStyle = '#111';
    cx.fillRect(2, 4, 4, 8); // front fan
    cx.fillRect(10, 4, 4, 8); // back fan
    cx.fillStyle = '#0A0';
    cx.fillRect(6, 4, 2, 1);
    cx.fillRect(6, 6, 2, 1);
  });
  
  createSprite('item_solar', S, (cx, s) => {
    cx.fillStyle = '#2244AA';
    cx.fillRect(1, 1, 14, 14);
    cx.fillStyle = '#3366CC';
    cx.fillRect(2, 2, 12, 12);
    cx.fillStyle = '#4477DD';
    cx.fillRect(2, 2, 6, 6);
    cx.fillRect(8, 8, 6, 6);
    cx.fillStyle = '#88AAEE';
    cx.fillRect(5, 5, 2, 2); // sun glint
  });
  
  createSprite('item_battery', S, (cx, s) => {
    cx.fillStyle = '#333';
    cx.fillRect(3, 3, 10, 12);
    cx.fillStyle = '#444';
    cx.fillRect(4, 4, 8, 10);
    cx.fillStyle = '#666';
    cx.fillRect(5, 1, 6, 3); // terminal
    cx.fillStyle = '#4F4';
    cx.fillRect(5, 11, 6, 2); // charge indicator
    cx.fillStyle = '#FFF';
    cx.fillRect(7, 6, 1, 4); // + symbol
    cx.fillRect(6, 7, 3, 1);
  });
  
  createSprite('item_fan', S, (cx, s) => {
    cx.fillStyle = '#445566';
    cx.fillRect(2, 2, 12, 12);
    cx.fillStyle = '#334455';
    cx.fillRect(3, 3, 10, 10);
    // Fan blades
    cx.fillStyle = '#778899';
    cx.fillRect(7, 3, 2, 5);
    cx.fillRect(7, 8, 2, 5);
    cx.fillRect(3, 7, 5, 2);
    cx.fillRect(8, 7, 5, 2);
    // Center
    cx.fillStyle = '#556677';
    cx.fillRect(7, 7, 2, 2);
  });
  
  // ---- BITCOIN CULTURE ITEMS ----
  
  createSprite('item_node', S, (cx, s) => {
    // Bitcoin node (small server)
    cx.fillStyle = '#2A2A30';
    cx.fillRect(2, 1, 12, 14);
    cx.fillStyle = '#3A3A44';
    cx.fillRect(3, 2, 10, 12);
    // Hard drive bays
    cx.fillStyle = '#222';
    cx.fillRect(4, 3, 8, 3);
    cx.fillRect(4, 7, 8, 3);
    // LEDs
    cx.fillStyle = '#F7931A'; // Bitcoin orange
    cx.fillRect(4, 12, 2, 1);
    cx.fillStyle = '#0F0';
    cx.fillRect(7, 12, 2, 1);
    cx.fillStyle = '#00F';
    cx.fillRect(10, 12, 2, 1);
  });
  
  createSprite('item_ledger', S, (cx, s) => {
    // Hardware wallet
    cx.fillStyle = '#222';
    cx.fillRect(4, 1, 8, 14);
    cx.fillStyle = '#333';
    cx.fillRect(5, 2, 6, 10);
    // Screen
    cx.fillStyle = '#115511';
    cx.fillRect(5, 3, 6, 5);
    cx.fillStyle = '#33AA33';
    cx.fillRect(6, 4, 4, 3);
    // Buttons
    cx.fillStyle = '#444';
    cx.fillRect(5, 12, 3, 2);
    cx.fillRect(9, 12, 3, 2);
  });
  
  createSprite('item_sats', S, (cx, s) => {
    // Stack of sats (coins)
    cx.fillStyle = '#C47415';
    cx.beginPath(); cx.ellipse(8, 12, 6, 3, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#F7931A';
    cx.beginPath(); cx.ellipse(8, 10, 6, 3, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#C47415';
    cx.beginPath(); cx.ellipse(8, 8, 6, 3, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#F7931A';
    cx.beginPath(); cx.ellipse(8, 6, 6, 3, 0, 0, Math.PI * 2); cx.fill();
    // ₿ symbol
    cx.fillStyle = '#FFF';
    cx.fillRect(7, 4, 2, 4);
    cx.fillRect(6, 5, 1, 2);
    cx.fillRect(9, 5, 1, 2);
  });
  
  // ---- FOOD ----
  
  createSprite('item_steak', S, (cx, s) => {
    // Beef steak
    cx.fillStyle = '#8B2020';
    cx.beginPath(); cx.ellipse(8, 9, 6, 5, 0.2, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#AA3030';
    cx.beginPath(); cx.ellipse(8, 8, 5, 4, 0.2, 0, Math.PI * 2); cx.fill();
    // Fat marbling
    cx.fillStyle = '#CC8888';
    cx.fillRect(5, 7, 2, 1);
    cx.fillRect(9, 8, 2, 1);
    cx.fillRect(7, 6, 1, 2);
  });
  
  createSprite('item_honey', S, (cx, s) => {
    // Honey jar
    cx.fillStyle = '#886622';
    cx.fillRect(4, 4, 8, 10);
    cx.fillStyle = '#DDAA22';
    cx.fillRect(5, 5, 6, 8);
    // Lid
    cx.fillStyle = '#AA8844';
    cx.fillRect(4, 2, 8, 3);
    cx.fillStyle = '#CC9944';
    cx.fillRect(5, 3, 6, 1);
    // Label
    cx.fillStyle = '#FFF';
    cx.fillRect(6, 8, 4, 3);
    cx.fillStyle = '#DDAA22';
    cx.fillRect(7, 9, 2, 1);
  });
  
  console.log(`✅ ${Object.keys(SpriteCache).length} sprites generated`);
}

// Helper to draw a cached sprite scaled up
function drawSprite(name, x, y, scale = 3) {
  const spr = SpriteCache[name];
  if (!spr) return;
  ctx.drawImage(spr, x, y, spr.width * scale, spr.height * scale);
}

window.SpriteCache = SpriteCache;
window.createSprite = createSprite;
window.initSprites = initSprites;
window.drawSprite = drawSprite;
