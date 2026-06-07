const CONFIG = {
  particleColor:    'rgba(79,110,247,',
  lineColor:        'rgba(79,110,247,',
  maxParticles:     90,
  densityPerPixel:  10000,   // one particle per N px²
  connectionRadius: 150,
  repelRadius:      130,
  repelStrength:    0.012,
  speed:            0.45,
};

class Particle {
  constructor(w, h) {
    this.w = w; this.h = h;
    this.reset();
  }

  reset() {
    this.x  = Math.random() * this.w;
    this.y  = Math.random() * this.h;
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.r  = Math.random() * 1.8 + 0.8;
    this.op = Math.random() * 0.5 + 0.15;
  }

  update(mouse) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < CONFIG.repelRadius) {
        this.x -= dx * CONFIG.repelStrength;
        this.y -= dy * CONFIG.repelStrength;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.particleColor + this.op + ')';
    ctx.fill();
  }
}

export function init() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const mouse   = { x: null, y: null };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildParticles();
  }

  function buildParticles() {
    const count = Math.min(
      CONFIG.maxParticles,
      Math.floor((canvas.width * canvas.height) / CONFIG.densityPerPixel)
    );
    particles = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height));
  }

  function drawConnections() {
    const r = CONFIG.connectionRadius;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < r) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = CONFIG.lineColor + (0.18 * (1 - dist / r)) + ')';
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(mouse); p.draw(ctx); });
    drawConnections();
    requestAnimationFrame(loop);
  })();

  // Mouse tracking within hero
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  window.addEventListener('resize', resize, { passive: true });
  resize();
}
