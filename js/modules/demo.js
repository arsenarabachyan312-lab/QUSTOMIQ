const CONVERSATION = [
  { role: 'user', text: 'Нужно отправить КП клиенту Иванов И.И.' },
  { role: 'ai',   text: 'Нашёл. Иванов И.И., сегмент: малый бизнес, последний контакт 3 дня назад. Для какого продукта готовим КП?' },
  { role: 'user', text: 'Автоматизация склада, бюджет до 500 тыс.' },
  { role: 'ai',   text: 'Готово! Сформировал персональное КП с учётом профиля компании и добавил кейс из похожей отрасли. Отправить на email из CRM?' },
  { role: 'user', text: 'Да, и поставь напоминание через 2 дня' },
  { role: 'ai',   text: 'Письмо отправлено. Напоминание на пт 09:00. Вероятность сделки: 74% на основе истории похожих лидов ✓' },
];

function createMessage(msg) {
  const wrap = document.createElement('div');
  wrap.className = `dmsg ${msg.role}`;

  const av = document.createElement('div');
  av.className = `dav ${msg.role === 'ai' ? 'ai' : 'usr'}`;
  av.textContent = msg.role === 'ai' ? 'AI' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'dbubble';
  bubble.textContent = msg.text;

  wrap.append(av, bubble);
  return wrap;
}

function createTypingIndicator() {
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

function appendAndShow(container, el) {
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  container.scrollTop = container.scrollHeight;
}

function runConversation(container, index = 0) {
  if (index >= CONVERSATION.length) {
    setTimeout(() => {
      container.innerHTML = '';
      runConversation(container, 0);
    }, 3000);
    return;
  }

  const msg = CONVERSATION[index];

  if (msg.role === 'ai') {
    const typing = createTypingIndicator();
    appendAndShow(container, typing);

    setTimeout(() => {
      typing.remove();
      const msgEl = createMessage(msg);
      appendAndShow(container, msgEl);
      setTimeout(() => runConversation(container, index + 1), 1600);
    }, 1300);
  } else {
    const msgEl = createMessage(msg);
    appendAndShow(container, msgEl);
    setTimeout(() => runConversation(container, index + 1), 900);
  }
}

export function init() {
  const demo = document.querySelector('.ai-demo');
  const body = document.getElementById('demoBody');
  if (!demo || !body) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runConversation(body);
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(demo);
}
