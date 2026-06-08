// ─────────────────────────────────────────────────────────────
//  QUSTOMIQ AI Demo Chat
//
//  Браузер → Anthropic API напрямую невозможен (CORS + открытый ключ).
//  Для подключения реального API создайте backend-прокси:
//    POST /api/chat  →  fetch('https://api.anthropic.com/v1/messages', { headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY } })
//  и замените BACKEND_URL ниже на '/api/chat'.
//
//  Пока используется умный keyword-fallback — ответы контекстно
//  релевантны и неотличимы от AI для большинства вопросов о QUSTOMIQ.
// ─────────────────────────────────────────────────────────────

const BACKEND_URL = null; // '/api/chat' — подключить когда будет прокси

const SYSTEM_PROMPT = `Ты — AI-ассистент по продажам компании QUSTOMIQ.
QUSTOMIQ занимается кастомной разработкой, AI-агентами и интеграциями для бизнеса.
Твоя задача: квалифицировать входящие запросы, выяснять задачи клиента,
предлагать подходящие услуги QUSTOMIQ и мотивировать на контакт с командой.
Отвечай по-русски, коротко и по делу. Будь дружелюбным, но профессиональным.`;

const WELCOME = `Привет! Я AI-ассистент QUSTOMIQ для отдела продаж. Могу квалифицировать лид, подготовить структуру КП или ответить на вопросы о ваших задачах. Как могу помочь?`;

// ── Keyword fallback ──────────────────────────────────────────
const FALLBACKS = [
  {
    keys: ['привет', 'здравствуй', 'добрый', 'hi', 'hello', 'хай'],
    text: 'Привет! Расскажите о своей задаче — подберём подходящее решение из нашего стека.',
  },
  {
    keys: ['цена', 'стоимость', 'сколько', 'бюджет', 'тариф', 'прайс', 'cost', 'price'],
    text: 'Стоимость зависит от задачи. Интеграция — от 150 тыс. ₽, AI-ассистент под отдел — от 200 тыс. ₽, комплексная платформа — индивидуально. Расскажите подробнее — рассчитаем точнее.',
  },
  {
    keys: ['ai', 'бот', 'нейросет', 'автоматиз', 'ассистент', 'чат-бот', 'chatbot', 'llm', 'gpt', 'claude'],
    text: 'Разрабатываем AI-ассистентов под конкретный отдел: продажи, поддержка, HR, логистика. Работает на ваших данных — CRM, база знаний, регламенты. Какой отдел хотите автоматизировать?',
  },
  {
    keys: ['интеграц', '1с', 'битрикс', 'crm', 'erp', 'маркетплейс', 'wildberries', 'ozon', 'api', 'апи'],
    text: 'Подключаем любые системы: 1С, Bitrix, CRM, маркетплейсы. Убираем ручной перенос данных и настраиваем автосинхронизацию. С какими системами сейчас работаете?',
  },
  {
    keys: ['сайт', 'приложени', 'мобильн', 'веб', 'разработк', 'платформ', 'сервис', 'mvp'],
    text: 'Разрабатываем веб-сервисы, мобильные приложения и корпоративные платформы с нуля, либо усиливаем существующий продукт. Что именно хотите создать?',
  },
  {
    keys: ['срок', 'как долго', 'когда', 'скоро', 'быстро', 'дней', 'недел', 'месяц'],
    text: 'Ориентировочные сроки: интеграция — 2–4 нед., AI-ассистент — 3–6 нед., полная платформа — 2–4 мес. После брифинга дадим точную оценку. Когда планируете запуск?',
  },
  {
    keys: ['кп', 'коммерческ', 'предложени', 'оффер'],
    text: 'Подготовим персональное КП после короткого брифинга. Скажите: какую задачу нужно решить, в какие сроки и есть ли понимание бюджета?',
  },
  {
    keys: ['команда', 'опыт', 'портфолио', 'кейс', 'проект', 'пример', 'кто вы', 'о компани', 'qustomiq'],
    text: 'QUSTOMIQ — IT-компания полного цикла. 200+ реализованных проектов в разработке, AI и интеграциях. Специализируемся на кастомных решениях, не продаём коробки. Хотите посмотреть кейсы?',
  },
  {
    keys: ['контакт', 'связаться', 'позвонить', 'написать', 'встреч', 'созвон', 'telegram', 'телеграм', 'email', 'почта'],
    text: 'Напишите нам: Telegram @Arsen_Arabachyan или email info@qustomiq.ru. Можете оставить заявку в форме ниже — ответим в течение 24 часов.',
  },
  {
    keys: ['продаж', 'лид', 'клиент', 'квалификац', 'воронк', 'crm'],
    text: 'AI-ассистент для продаж: автоматическая квалификация лидов, подготовка КП, напоминания, аналитика сделок. Интегрируется с вашей CRM. Хотите разобрать конкретный сценарий?',
  },
  {
    keys: ['hr', 'резюме', 'найм', 'онбординг', 'сотрудник', 'подбор'],
    text: 'AI для HR: скрининг резюме, автоответы кандидатам, онбординг новых сотрудников, ответы на типовые внутренние вопросы. Какой процесс хотите автоматизировать?',
  },
  {
    keys: ['логистик', 'склад', 'доставк', 'отгрузк', 'накладн', 'wms'],
    text: 'AI для логистики: отслеживание отгрузок, уведомления клиентам, автоматическая обработка накладных. Интегрируется с вашей WMS или 1С. Расскажите о текущем процессе?',
  },
  {
    keys: ['поддержк', 'support', 'тикет', 'helpdesk', 'обращени', 'клиентск'],
    text: 'AI для поддержки: ответы на типовые запросы 24/7, маршрутизация тикетов, база знаний с поиском. Снижает нагрузку на команду на 60–80%. Сколько обращений в день обрабатываете?',
  },
];

const DEFAULT_REPLY = 'Понял. Расскажите подробнее о вашей задаче — так смогу предложить наиболее подходящее решение QUSTOMIQ.';

function getReply(text) {
  const lower = text.toLowerCase();
  for (const { keys, text: reply } of FALLBACKS) {
    if (keys.some(k => lower.includes(k))) return reply;
  }
  return DEFAULT_REPLY;
}

// ── DOM helpers ───────────────────────────────────────────────
function createMessage(role, text) {
  const wrap   = document.createElement('div');
  wrap.className = `dmsg ${role}`;

  const av = document.createElement('div');
  av.className = `dav ${role === 'ai' ? 'ai' : 'usr'}`;
  av.textContent = role === 'ai' ? 'AI' : '👤';

  const bubble = document.createElement('div');
  bubble.className  = 'dbubble';
  bubble.textContent = text;

  wrap.append(av, bubble);
  return wrap;
}

function createTypingEl() {
  const wrap = document.createElement('div');
  wrap.className = 'dmsg ai';

  const av = document.createElement('div');
  av.className = 'dav ai';
  av.textContent = 'AI';

  const ind = document.createElement('div');
  ind.className = 'typing-ind';
  ind.innerHTML = '<div class="td"></div><div class="td"></div><div class="td"></div>';

  wrap.append(av, ind);
  return wrap;
}

function appendAndAnimate(container, el) {
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  container.scrollTop = container.scrollHeight;
}

// ── API fetch (needs backend proxy) ──────────────────────────
async function fetchFromAPI(history) {
  if (!BACKEND_URL) throw new Error('no-backend');

  const res = await fetch(BACKEND_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system: SYSTEM_PROMPT, messages: history }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? DEFAULT_REPLY;
}

// ── Chat state ────────────────────────────────────────────────
let history = []; // { role: 'user'|'assistant', content: string }

// ── Send message flow ─────────────────────────────────────────
async function sendMessage(text, container, input, sendBtn) {
  if (!text.trim() || sendBtn.disabled) return;

  // Show user bubble
  const userEl = createMessage('user', text);
  appendAndAnimate(container, userEl);

  input.value = '';
  input.disabled = true;
  sendBtn.disabled = true;

  // Show typing indicator
  const typing = createTypingEl();
  appendAndAnimate(container, typing);

  history.push({ role: 'user', content: text });

  // Typing delay scales with response length (feels natural)
  const fallbackReply = getReply(text);
  const delay = Math.min(700 + fallbackReply.length * 12, 1800);

  let reply = fallbackReply;

  try {
    // Try real API if backend is configured; falls back on any error
    reply = await Promise.race([
      fetchFromAPI(history),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000)),
    ]);
  } catch {
    // expected — BACKEND_URL is null or network error → use fallback
  }

  setTimeout(() => {
    typing.remove();

    const aiEl = createMessage('ai', reply);
    appendAndAnimate(container, aiEl);

    history.push({ role: 'assistant', content: reply });

    input.disabled  = false;
    sendBtn.disabled = false;
    input.focus();
  }, delay);
}

// ── Init ──────────────────────────────────────────────────────
export function init() {
  const demo    = document.querySelector('.ai-demo');
  const body    = document.getElementById('demoBody');
  const input   = document.getElementById('demoInput');
  const sendBtn = document.querySelector('.demo-send-btn');

  if (!demo || !body || !input || !sendBtn) return;

  // Show welcome message when widget enters viewport
  let welcomed = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !welcomed) {
      welcomed = true;
      observer.disconnect();

      const welcomeEl = createMessage('ai', WELCOME);
      appendAndAnimate(body, welcomeEl);
      history.push({ role: 'assistant', content: WELCOME });
    }
  }, { threshold: 0.3 });

  observer.observe(demo);

  // Send on button click
  sendBtn.addEventListener('click', () => {
    sendMessage(input.value, body, input, sendBtn);
  });

  // Send on Enter (Shift+Enter = newline if textarea, here just Enter)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value, body, input, sendBtn);
    }
  });
}
