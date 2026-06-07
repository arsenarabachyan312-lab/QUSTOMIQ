export function init() {
  const form = document.getElementById('ctaForm');
  const btn  = document.getElementById('formBtn');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    btn.textContent = 'Отправляем...';
    btn.disabled    = true;

    // Replace with real API call (fetch / Telegram webhook / email service)
    setTimeout(() => {
      btn.textContent          = 'Заявка отправлена ✓';
      btn.style.background     = 'var(--green)';
      btn.style.boxShadow      = '0 8px 32px rgba(34,197,94,0.3)';
    }, 900);
  });
}
