/**
 * Ricardo Oriol — Dotted Architectural Canvas
 * Nanosecond In-Memory Routing Engine & Unified Navigation
 */

// Full In-Memory Article Repository
const articles = {
  'enterprise-integrations': {
    title: 'why enterprise integrations fail (and how to architect around it)',
    date: 'august 2025',
    readTime: '6 min read',
    content: `
      <p>most integration failures don't happen because of network timeouts or missing headers. they happen because engineers assume distributed systems behave like monolithic functions. when systems span different organizations, networks, and failure domains, failure isn't an exceptional state—it is the baseline.</p>

      <h3>01 the fallacy of synchronous expectations</h3>
      <p>in high-volume financial and enterprise systems, attempting to force two independent state machines into atomic synchrony creates cascading downtime. if service a waits synchronously on service b, and service b's p99 latency spikes by 400ms, service a exhausts its connection pool in seconds.</p>
      <blockquote>"architect for eventual consistency first, and treat synchronous handshakes as expensive exceptions"</blockquote>

      <h3>02 idempotency is non-negotiable</h3>
      <p>at stripe, idempotency isn't an afterthought or a "nice-to-have" utility. network drops will happen right after money leaves an account or right before a database commits. without cryptographic idempotency keys on every state-mutating request, retries become balance-destroying liabilities.</p>

      <h3>03 observability at system boundaries</h3>
      <p>enterprises often monitor their internal databases meticulously while remaining blind to their ingress and egress traffic. true integration resilience requires continuous telemetry on webhook delivery success rates, webhook signature verification failures, and retry backoff curves.</p>

      <p>don't build integrations assuming the partner api will always reply in 200ms. build queues, design deterministic retry exponential backoffs with jitter, enforce idempotency keys, and treat webhook delivery status as a core product metric.</p>
    `
  },
  'reliable-agentic-workflows': {
    title: 'from toy prompts to reliable agentic workflows',
    date: 'july 2025',
    readTime: '7 min read',
    content: `
      <p>over the past two years, the industry moved rapidly from simple prompt wrappers to complex agentic loops. yet, many ai prototypes crumble the moment they encounter enterprise production environments. what does it actually take to make an ai agent reliable enough for real-world operations?</p>

      <h3>01 bounded context vs. infinite hallucination</h3>
      <p>giving an llm an open-ended "solve this customer ticket" prompt without structured bounds is a recipe for silent degradation. production-grade agents require deterministic boundaries: strict json schema outputs, step-by-step verification nodes, and explicit fallback triggers.</p>

      <h3>02 grounding in immutable source data</h3>
      <p>when designing internal review systems that analyze integration metrics and transaction anomalies, the agent must never synthesize facts. every observation must cite an immutable log identifier, an api error code, or a verified payload snippet.</p>
      <blockquote>"if the agent cannot provide the raw evidence id for its conclusion, the conclusion does not exist"</blockquote>

      <h3>03 humans in the critical path</h3>
      <p>the best ai agents are not autonomous rogue actors; they are force multipliers for high-context engineers. the goal isn't to eliminate the engineer from reviewing an enterprise integration—it is to eliminate 45 minutes of manual log searching so the engineer can make an informed decision in 30 seconds.</p>
    `
  },
  'linux-servers-cloud-resiliency': {
    title: 'what 2,000 linux servers taught me about cloud resiliency',
    date: 'may 2025',
    readTime: '5 min read',
    content: `
      <p>before architecting cloud landing zones and multi-region ai workloads, i spent years maintaining over 2,000 linux and vmware production nodes supporting mission-critical telecommunications and banking infrastructure with a 99.99% uptime mandate.</p>

      <h3>01 the cloud doesn't eliminate infrastructure physics</h3>
      <p>it is easy for modern developers to view the cloud as magical infinite capacity. but underneath every kubernetes pod and aws serverless container lies an actual linux kernel, an actual tcp socket buffer, and an actual physical block storage disk with i/o limits.</p>

      <h3>02 kernel-level troubleshooting is a superpower</h3>
      <p>when an application mysteriously drops 2% of packets under peak traffic, high-level dashboards rarely tell the story. understanding file descriptors, socket backlog queues, tcp keepalive tuning, and memory page caches allows you to see the real bottleneck before re-architecting an entire application.</p>

      <h3>03 reliability is culture and discipline</h3>
      <p>zero downtime isn't bought from a cloud vendor; it is engineered through disciplined runbooks, automated drift detection, rigorous patching schedules, and ruthless blameless postmortems.</p>
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
    
    if (btn) {
      btn.classList.add('snapping');
    }

    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('canvas-theme', next);

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      if (btn) {
        btn.classList.remove('snapping');
      }
      isAnimating = false;
    }, 220);
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

  function navigateTo(route, updateHistory = true) {
    const [viewName, param] = route.split('/');
    currentView = viewName;

    // Deactivate all views synchronously (0.00ms)
    Object.values(views).forEach(view => {
      if (view) view.classList.remove('active');
    });

    if (viewName === 'article' && param && articles[param]) {
      const art = articles[param];
      articleTitleEl.textContent = art.title;
      articleMetaEl.textContent = `// ${art.date} · ${art.readTime}`;
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

  // Article bottom back button click handler
  const articleBackBottomBtn = document.getElementById('article-back-bottom');
  if (articleBackBottomBtn) {
    articleBackBottomBtn.addEventListener('click', () => {
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
