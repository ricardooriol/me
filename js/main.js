/**
 * Ricardo Oriol — Dotted Architectural Canvas
 * Nanosecond In-Memory Routing Engine & Unified Navigation
 */

// Full In-Memory Article Repository
const articles = {
  'coming-soon': {
    title: 'coming soon',
    date: '',
    readTime: '',
    content: `
      <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeButton();
  initRoutingEngine();
  initGestureNavigation();
  initCursorReticle();
});

/**
 * Feature 5: Tactile Mechanical Audio Click (Web Audio API)
 * Synthesizes a subtle, low-frequency ~38ms Leica rotary dial acoustic latch.
 */
let audioCtx = null;
function playMechanicalClick() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 0.038);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.035);

    gain.gain.setValueAtTime(0.065, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.038);
  } catch (_) {}
}

/**
 * Feature 3: Eclipse Circular Theme Wipe (View Transitions API)
 * Expands a circular clip-path reveal originating from the theme button.
 */
function initThemeButton() {
  const btn = document.getElementById('theme-btn');
  
  // Prefer stored theme, otherwise default to dark
  const storedTheme = localStorage.getItem('canvas-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);

  let isAnimating = false;

  function toggleTheme(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isAnimating) return;
    isAnimating = true;

    // Trigger subtle tactile mechanical acoustic click
    playMechanicalClick();

    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';

    // Measure origin coordinates for radial wipe
    let originX = window.innerWidth - 30;
    let originY = 30;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    } else if (e && e.clientX) {
      originX = e.clientX;
      originY = e.clientY;
    }

    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (document.startViewTransition && !prefersReducedMotion) {
      const transition = document.startViewTransition(() => {
        document.documentElement.setAttribute('data-theme', next);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${originX}px ${originY}px)`,
              `circle(${maxRadius}px at ${originX}px ${originY}px)`
            ]
          },
          {
            duration: 440,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      }).catch(() => {});

      transition.finished.finally(() => {
        isAnimating = false;
      });

      // Safety fallback to prevent animation lock
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    } else {
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', next);

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        isAnimating = false;
      }, 400);
    }

    // Non-blocking asynchronous storage write to eliminate frame drop
    try {
      requestAnimationFrame(() => {
        localStorage.setItem('canvas-theme', next);
      });
    } catch (_) {}
  }

  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }

  // Silent keyboard shortcut for desktop: Press 'D'
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'd' || e.key === 'D') {
      toggleTheme();
    }
  });
}

/**
 * Nanosecond In-Memory Routing Engine with Anchored Navigation
 * Feature 10: Data Pulse Line on Route Navigation
 */
let currentView = 'home';
let navigateToFn = null;

function initRoutingEngine() {
  const views = {
    home: document.getElementById('view-home'),
    article: document.getElementById('view-article')
  };

  const navBackBtn = document.getElementById('nav-back-btn');
  const homeGreeting = document.getElementById('home-greeting');
  const backLabel = document.getElementById('back-label');
  const articleRows = document.querySelectorAll('.article-row');
  const pulseLine = document.getElementById('data-pulse-line');

  const articleTitleEl = document.getElementById('article-title');
  const articleMetaEl = document.getElementById('article-meta');
  const articleBodyEl = document.getElementById('article-body');

  function syncNavHeight() {
    const topNav = document.querySelector('.top-nav');
    if (homeGreeting && topNav && homeGreeting.offsetHeight > 0) {
      topNav.style.minHeight = `${homeGreeting.getBoundingClientRect().height}px`;
    }
  }

  function triggerDataPulse() {
    if (!pulseLine) return;
    pulseLine.classList.remove('pulsing');
    void pulseLine.offsetWidth; // Force reflow to re-trigger CSS keyframe
    pulseLine.classList.add('pulsing');
    setTimeout(() => {
      pulseLine.classList.remove('pulsing');
    }, 400);
  }

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);
  if (document.fonts) {
    document.fonts.ready.then(syncNavHeight);
  }

  function navigateTo(route, updateHistory = true) {
    const [viewName, param] = route.split('/');

    if (viewName !== currentView) {
      triggerDataPulse();
    }
    currentView = viewName;

    if (viewName === 'article') {
      syncNavHeight();
    }

    // Deactivate all views synchronously (0.00ms)
    Object.values(views).forEach(view => {
      if (view) view.classList.remove('active');
    });

    if (viewName === 'article' && param && articles[param]) {
      const art = articles[param];
      articleTitleEl.textContent = art.title;
      if (art.date && art.readTime) {
        articleMetaEl.textContent = `// ${art.date} · ${art.readTime}`;
        articleMetaEl.style.display = 'block';
      } else {
        articleMetaEl.textContent = '';
        articleMetaEl.style.display = 'none';
      }
      articleBodyEl.innerHTML = art.content;
      views.article.classList.add('active');
      document.title = `${art.title} — ricardo oriol`;
      document.body.classList.add('in-article-view');

      // Show back button, hide home greeting in top nav
      if (homeGreeting) homeGreeting.style.display = 'none';
      if (navBackBtn) navBackBtn.classList.add('visible');
      if (backLabel) backLabel.textContent = 'back';
    } else {
      views.home.classList.add('active');
      document.title = 'ricardo oriol';
      document.body.classList.remove('in-article-view');

      // Show home greeting, hide back button in top nav
      if (homeGreeting) homeGreeting.style.display = 'flex';
      if (navBackBtn) navBackBtn.classList.remove('visible');
    }

    window.scrollTo(0, 0);

    if (updateHistory) {
      const hash = route === 'home' ? '' : `#${route}`;
      history.pushState({ route }, '', hash || window.location.pathname);
    }
  }

  navigateToFn = navigateTo;

  // Persistent top-nav back button click handler
  if (navBackBtn) {
    navBackBtn.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // Bind article rows
  articleRows.forEach(row => {
    row.addEventListener('click', () => {
      const slug = row.getAttribute('data-article');
      if (slug) navigateTo(`article/${slug}`);
    });
  });

  // Browser Back/Forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash, false);
  });

  // Initial Route Resolution from URL hash
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialHash, false);

  // Keyboard shortcut: Escape to navigate back from article
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'Escape' && currentView === 'article') {
      navigateTo('home');
    }
  });
}

/**
 * Mobile Edge-Swipe Native Navigation
 */
function initGestureNavigation() {
  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1 && touchStartX < 45) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);

      if (deltaX > 60 && deltaY < 50 && navigateToFn && currentView === 'article') {
        navigateToFn('home');
      }
    }
  }, { passive: true });
}

/**
 * Feature 7: Minimalist Precision Cursor Reticle (Desktop Only)
 * Fine pointer tracking with smooth damping outer ring and interactive control snapping.
 */
function initCursorReticle() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.classList.add('cursor-active');
      ring.classList.add('cursor-active');
    }

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.classList.remove('cursor-active');
    ring.classList.remove('cursor-active');
  });

  // Smooth 60/120fps lerp follower for the outer ring
  function updateRing() {
    if (isVisible) {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(updateRing);
  }
  requestAnimationFrame(updateRing);

  // Interactive hover detection for links, buttons, and rows
  const targetSelectors = 'a, button, .article-row, .chrono-item, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target && e.target.closest && e.target.closest(targetSelectors)) {
      ring.classList.add('hovering');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target && e.target.closest && e.target.closest(targetSelectors)) {
      ring.classList.remove('hovering');
    }
  }, { passive: true });
}
