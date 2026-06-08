const ENDPOINT = 'https://formsubmit.co/ajax/info@qustomiq.ru';

// ── Validation rules ────────────────────────────────────
const FIELDS = [
  {
    id:       'f-name',
    required: true,
    validate: (v) => v.trim().length >= 2,
  },
  {
    id:       'f-email',
    required: true,
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  },
  {
    id:       'f-task',
    required: true,
    validate: (v) => v.trim().length >= 10,
  },
];

// ── Helpers ─────────────────────────────────────────────
function getField(id)  { return document.getElementById(id); }
function getWrapper(el) { return el.closest('.form-field'); }

function setError(el, hasError) {
  getWrapper(el)?.classList.toggle('form-field--error', hasError);
}

function clearErrors() {
  document.querySelectorAll('.form-field--error')
    .forEach(el => el.classList.remove('form-field--error'));
}

function validateAll() {
  let valid = true;
  FIELDS.forEach(({ id, validate }) => {
    const el = getField(id);
    if (!el) return;
    const ok = validate(el.value);
    setError(el, !ok);
    if (!ok) valid = false;
  });
  return valid;
}

// ── Submit ──────────────────────────────────────────────
async function handleSubmit(e, form, btn, successEl) {
  e.preventDefault();
  clearErrors();

  if (!validateAll()) {
    // Focus first invalid field
    const first = form.querySelector('.form-field--error .form-input');
    first?.focus();
    return;
  }

  btn.textContent = 'Отправляем...';
  btn.disabled    = true;

  const payload = {
    name:    getField('f-name')?.value.trim()    ?? '',
    company: getField('f-company')?.value.trim() ?? '',
    email:   getField('f-email')?.value.trim()   ?? '',
    phone:   getField('f-phone')?.value.trim()   ?? '',
    message: getField('f-task')?.value.trim()    ?? '',
    _subject: 'Новая заявка с сайта QUSTOMIQ',
    _captcha: 'false',
  };

  try {
    const res = await fetch(ENDPOINT, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Success — hide form, show message
    form.style.display     = 'none';
    successEl.classList.add('show');

  } catch {
    // Network / server error — restore button
    btn.textContent = 'Ошибка — попробуйте ещё раз';
    btn.disabled    = false;
    btn.style.background = '#ef4444';
    setTimeout(() => {
      btn.textContent      = 'Отправить запрос →';
      btn.style.background = '';
    }, 3000);
  }
}

// ── Live validation (clear error on fix) ────────────────
function bindLiveValidation() {
  FIELDS.forEach(({ id, validate }) => {
    const el = getField(id);
    if (!el) return;

    el.addEventListener('input', () => {
      if (getWrapper(el)?.classList.contains('form-field--error')) {
        if (validate(el.value)) setError(el, false);
      }
    });
  });
}

// ── Init ────────────────────────────────────────────────
export function init() {
  const form      = document.getElementById('ctaForm');
  const btn       = document.getElementById('formBtn');
  const successEl = document.getElementById('formSuccess');
  if (!form || !btn || !successEl) return;

  form.addEventListener('submit', (e) => handleSubmit(e, form, btn, successEl));
  bindLiveValidation();
}
