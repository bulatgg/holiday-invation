// Лёгкий снегопад
const snow = document.getElementById('snow');
for (let i = 0; i < 48; i++) {
  const flake = document.createElement('span');
  flake.className = 'snowflake';
  flake.textContent = Math.random() > 0.5 ? '❄' : '·';
  flake.style.left = `${Math.random() * 100}%`;
  flake.style.fontSize = `${7 + Math.random() * 12}px`;
  flake.style.animationDuration = `${9 + Math.random() * 15}s`;
  flake.style.animationDelay = `${-Math.random() * 20}s`;
  flake.style.setProperty('--drift', `${-45 + Math.random() * 90}px`);
  snow.appendChild(flake);
}

// Появление блока приглашения при прокрутке
const reveal = document.querySelector('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  observer.observe(reveal);
} else {
  reveal.classList.add('visible');
}

// Молнии на canvas — редкие короткие вспышки на первом экране
const canvas = document.getElementById('lightning');
const ctx = canvas.getContext('2d');
let w = 0, h = 0, bolts = [];
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function makeBolt() {
  const fromLeft = Math.random() > 0.5;
  let x = fromLeft ? Math.random() * w * .28 : w * (.72 + Math.random() * .28);
  let y = Math.random() * h * .22;
  const points = [{ x, y }];
  const segments = 9 + Math.floor(Math.random() * 8);
  for (let i = 0; i < segments; i++) {
    x += (Math.random() - .5) * 55;
    y += h * (.025 + Math.random() * .025);
    points.push({ x, y });
  }
  return { points, life: 1, decay: .035 + Math.random() * .025 };
}
function drawBolt(bolt) {
  const pts = bolt.points;
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.strokeStyle = `rgba(94, 204, 255, ${bolt.life * .9})`;
  ctx.lineWidth = 1.5; ctx.shadowBlur = 18; ctx.shadowColor = '#24aaff'; ctx.stroke();
  ctx.shadowBlur = 0;
  if (Math.random() > .82 && pts.length > 5) {
    const p = pts[4]; ctx.beginPath(); ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + (Math.random() - .5) * 45, p.y + 35);
    ctx.strokeStyle = `rgba(125,220,255,${bolt.life * .55})`; ctx.lineWidth = 1; ctx.stroke();
  }
}
function animate() {
  ctx.clearRect(0, 0, w, h);
  // На втором экране молнии постепенно исчезают, оставляя только снег
  const heroVisible = window.scrollY < h * .75;
  if (heroVisible && Math.random() < .012) bolts.push(makeBolt());
  bolts = bolts.filter(b => b.life > 0);
  bolts.forEach(b => { drawBolt(b); b.life -= b.decay; });
  requestAnimationFrame(animate);
}
animate();
