const COUNTERS = [
  { id: 'c1', target: 200, duration: 1500 },
  { id: 'c2', target: 50,  duration: 1200 },
  { id: 'c3', target: 98,  duration: 1800 },
];

// Квадратичный easeOut: быстрый старт → плавное замедление к финалу
function easeOut(t) {
  return 1 - (1 - t) * (1 - t);
}

function animateCounter(el, target, duration) {
  // Сбрасываем к 0 только перед стартом анимации (до этого в HTML реальное значение)
  el.textContent = '0';

  const startTime = performance.now();

  function frame(now) {
    const elapsed = now - startTime;
    const t       = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOut(t) * target);
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function init() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  // Собираем только существующие элементы
  const counters = COUNTERS.map(c => ({ ...c, el: document.getElementById(c.id) }))
                            .filter(c => c.el !== null);

  if (counters.length === 0) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      observer.disconnect();
      counters.forEach(({ el, target, duration }) => animateCounter(el, target, duration));
    }
  }, {
    // Низкий порог — срабатывает при появлении первых 15% блока,
    // корректно работает на мобильных где сетка вытянута в колонку
    threshold: 0.15,
  });

  observer.observe(grid);
}
