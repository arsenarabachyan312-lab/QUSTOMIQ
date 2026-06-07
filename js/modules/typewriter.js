const WORDS        = ['под вас', 'под бизнес', 'под команду', 'под рынок'];
const TYPE_SPEED   = 82;    // ms per character when typing
const DELETE_SPEED = 48;    // ms per character when deleting
const PAUSE_AFTER  = 2200;  // ms pause after word is complete
const PAUSE_BEFORE = 400;   // ms pause before typing next word

export function init() {
  const el = document.getElementById('twEl');
  if (!el) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const word = WORDS[wordIndex];

    if (deleting) {
      el.textContent = word.slice(0, charIndex--);
      if (charIndex < 0) {
        deleting   = false;
        wordIndex  = (wordIndex + 1) % WORDS.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    } else {
      el.textContent = word.slice(0, charIndex++);
      if (charIndex > word.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    }
  }

  setTimeout(tick, 2000);
}
