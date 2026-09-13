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
});

/**
 * Snappy Consistent Theme Transition across all browsers
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

    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', next);

    // Non-blocking asynchronous storage write to eliminate frame drop
    try {
      requestAnimationFrame(() => {
        localStorage.setItem('canvas-theme', next);
      });
    } catch (_) {}

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      isAnimating = false;
    }, 400);
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

  const articleTitleEl = document.getElementById('article-title');
  const articleMetaEl = document.getElementById('article-meta');
  const articleBodyEl = document.getElementById('article-body');
  let currentArticleSlug = null;

  let cachedNavHeight = 0;
  function syncNavHeight() {
    const topNav = document.querySelector('.top-nav');
    if (homeGreeting && topNav && homeGreeting.offsetHeight > 0) {
      topNav.style.minHeight = '';
      cachedNavHeight = homeGreeting.getBoundingClientRect().height;
      topNav.style.minHeight = `${cachedNavHeight}px`;
    } else if (topNav && cachedNavHeight > 0) {
      topNav.style.minHeight = `${cachedNavHeight}px`;
    }
  }

  syncNavHeight();
  const mediaQuery = window.matchMedia('(max-width: 600px)');
  const handleViewportChange = () => {
    cachedNavHeight = 0;
    const topNav = document.querySelector('.top-nav');
    if (topNav) topNav.style.minHeight = '';
    syncNavHeight();
  };
  window.addEventListener('resize', handleViewportChange);
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleViewportChange);
  }
  if (document.fonts) {
    document.fonts.ready.then(syncNavHeight);
  }

  function navigateTo(route, updateHistory = true) {
    const [viewName, param] = route.split('/');
    currentView = viewName;

    if (viewName === 'article') {
      const topNav = document.querySelector('.top-nav');
      if (topNav && cachedNavHeight > 0) {
        topNav.style.minHeight = `${cachedNavHeight}px`;
      } else {
        syncNavHeight();
      }
    }

    // Fast synchronous view deactivation (0.00ms)
    if (views[currentView]) {
      views[currentView].classList.remove('active');
    } else {
      views.home.classList.remove('active');
      views.article.classList.remove('active');
    }

    if (viewName === 'article' && param && articles[param]) {
      if (currentArticleSlug !== param) {
        currentArticleSlug = param;
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
      }
      views.article.classList.add('active');
      document.title = `${articles[param].title} — ricardo oriol`;
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
