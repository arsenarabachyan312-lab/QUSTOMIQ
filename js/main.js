import { init as initCursor     } from './modules/cursor.js';
import { init as initCanvas     } from './modules/canvas.js';
import { init as initTypewriter } from './modules/typewriter.js';
import { init as initCounters   } from './modules/counters.js';
import { init as initReveal     } from './modules/reveal.js';
import { init as initNav        } from './modules/nav.js';
import { init as initDemo       } from './modules/demo.js';
import { init as initForm       } from './modules/form.js';

// ES modules are deferred — DOM is guaranteed ready here
initCursor();
initCanvas();
initTypewriter();
initCounters();
initReveal();
initNav();
initDemo();
initForm();
