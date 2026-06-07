const COUNTERS = [
  { id: 'c1', target: 200, duration: 1500 },
  { id: 'c2', target: 50,  duration: 1200 },
  { id: 'c3', target: 98,  duration: 1800 },
];

function animateCounter(el, target, duration) {
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

export function init() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      COUNTERS.forEach(({ id, target, duration }) => {
        const el = document.getElementById(id);
        if (el) animateCounter(el, target, duration);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(grid);
}
