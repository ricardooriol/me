/**
 * Ricardo Oriol — Minimal Canvas
 * Nanosecond In-Memory View Engine & Clean Geometric Theme Switcher
 */

// Full In-Memory Article Repository
const articles = {
  'enterprise-integrations': {
    title: 'Why enterprise integrations fail (and how to architect around it)',
    date: 'August 2025',
    readTime: '6 min read',
    content: `
      <p>Most integration failures don't happen because of network timeouts or missing headers. They happen because engineers assume distributed systems behave like monolithic functions. When systems span different organizations, networks, and failure domains, failure isn't an exceptional state—it is the baseline.</p>

      <h3>1. The Fallacy of Synchronous Expectations</h3>
      <p>In high-volume financial and enterprise systems, attempting to force two independent state machines into atomic synchrony creates cascading downtime. If Service A waits synchronously on Service B, and Service B's p99 latency spikes by 400ms, Service A exhausts its connection pool in seconds.</p>
      <blockquote>"Architect for eventual consistency first, and treat synchronous handshakes as expensive exceptions."</blockquote>

      <h3>2. Idempotency is Non-Negotiable</h3>
      <p>At Stripe, idempotency isn't an afterthought or a "nice-to-have" utility. Network drops will happen right after money leaves an account or right before a database commits. Without cryptographic idempotency keys on every state-mutating request, retries become balance-destroying liabilities.</p>

      <h3>3. Observability at System Boundaries</h3>
      <p>Enterprises often monitor their internal databases meticulously while remaining blind to their ingress and egress traffic. True integration resilience requires continuous telemetry on webhook delivery success rates, webhook signature verification failures, and retry backoff curves.</p>

      <p>Don't build integrations assuming the partner API will always reply in 200ms. Build queues, design deterministic retry exponential backoffs with jitter, enforce idempotency keys, and treat webhook delivery status as a core product metric.</p>
    `
  },
  'reliable-agentic-workflows': {
    title: 'From toy prompts to reliable agentic workflows',
    date: 'July 2025',
    readTime: '7 min read',
    content: `
      <p>Over the past two years, the industry moved rapidly from simple prompt wrappers to complex agentic loops. Yet, many AI prototypes crumble the moment they encounter enterprise production environments. What does it actually take to make an AI agent reliable enough for real-world operations?</p>

      <h3>1. Bounded Context vs. Infinite Hallucination</h3>
      <p>Giving an LLM an open-ended "solve this customer ticket" prompt without structured bounds is a recipe for silent degradation. Production-grade agents require deterministic boundaries: strict JSON schema outputs, step-by-step verification nodes, and explicit fallback triggers.</p>

      <h3>2. Grounding in Immutable Source Data</h3>
      <p>When designing internal review systems that analyze integration metrics and transaction anomalies, the agent must never synthesize facts. Every observation must cite an immutable log identifier, an API error code, or a verified payload snippet.</p>
      <blockquote>"If the agent cannot provide the raw evidence ID for its conclusion, the conclusion does not exist."</blockquote>

      <h3>3. Humans in the Critical Path</h3>
      <p>The best AI agents are not autonomous rogue actors; they are force multipliers for high-context engineers. The goal isn't to eliminate the engineer from reviewing an enterprise integration—it is to eliminate 45 minutes of manual log searching so the engineer can make an informed decision in 30 seconds.</p>
    `
  },
  'linux-servers-cloud-resiliency': {
    title: 'What 2,000 Linux servers taught me about cloud resiliency',
    date: 'May 2025',
    readTime: '5 min read',
    content: `
      <p>Before architecting cloud landing zones and multi-region AI workloads, I spent years maintaining over 2,000 Linux and VMware production nodes supporting mission-critical telecommunications and banking infrastructure with a 99.99% uptime mandate.</p>

      <h3>1. The Cloud Doesn't Eliminate Infrastructure Physics</h3>
      <p>It is easy for modern developers to view the cloud as magical infinite capacity. But underneath every Kubernetes pod and AWS serverless container lies an actual Linux kernel, an actual TCP socket buffer, and an actual physical block storage disk with I/O limits.</p>

      <h3>2. Kernel-Level Troubleshooting is a Superpower</h3>
      <p>When an application mysteriously drops 2% of packets under peak traffic, high-level dashboards rarely tell the story. Understanding file descriptors, socket backlog queues, TCP keepalive tuning, and memory page caches allows you to see the real bottleneck before re-architecting an entire application.</p>

      <h3>3. Reliability is Culture and Discipline</h3>
      <p>Zero downtime isn't bought from a cloud vendor; it is engineered through disciplined runbooks, automated drift detection, rigorous patching schedules, and ruthless blameless postmortems.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeButton();
  initRoutingEngine();
});

/**
 * Geometric Half-Circle Theme Button
 * Fluid circular reveal + single clean icon rotation
 */
function initThemeButton() {
  const btn = document.getElementById('theme-btn');
  
  // Prefer stored theme, otherwise default to paper (light)
  const storedTheme = localStorage.getItem('canvas-theme') || 'light';
  applyTheme(storedTheme, false);

  function applyTheme(theme, animate = true) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === theme && animate) return;

    const performThemeChange = () => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('canvas-theme', theme);
    };

    // Circular ripple effect from the button coordinates
    if (animate && document.startViewTransition && btn) {
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(performThemeChange);
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 300,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      performThemeChange();
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
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
 * Nanosecond In-Memory Routing Engine
 */
function initRoutingEngine() {
  const views = {
    home: document.getElementById('view-home'),
    writing: document.getElementById('view-writing'),
    article: document.getElementById('view-article')
  };

  const navToWriting = document.getElementById('nav-to-writing');
  const backToHome = document.getElementById('back-to-home');
  const backToWriting = document.getElementById('back-to-writing');
  const articleRows = document.querySelectorAll('.article-row');

  const articleTitleEl = document.getElementById('article-title');
  const articleMetaEl = document.getElementById('article-meta');
  const articleBodyEl = document.getElementById('article-body');

  function navigateTo(route, updateHistory = true) {
    const [viewName, param] = route.split('/');

    // Deactivate all views synchronously (0.00ms)
    Object.values(views).forEach(view => {
      if (view) view.classList.remove('active');
    });

    if (viewName === 'article' && param && articles[param]) {
      const art = articles[param];
      articleTitleEl.textContent = art.title;
      articleMetaEl.textContent = `${art.date} · ${art.readTime}`;
      articleBodyEl.innerHTML = art.content;
      views.article.classList.add('active');
      document.title = `${art.title} — Ricardo Oriol`;
    } else if (viewName === 'writing') {
      views.writing.classList.add('active');
      document.title = 'Writing — Ricardo Oriol';
    } else {
      views.home.classList.add('active');
      document.title = 'Ricardo Oriol';
    }

    window.scrollTo(0, 0);

    if (updateHistory) {
      const hash = route === 'home' ? '' : `#${route}`;
      history.pushState({ route }, '', hash || window.location.pathname);
    }
  }

  // Bind clicks with immediate synchronous response
  if (navToWriting) {
    navToWriting.addEventListener('click', () => navigateTo('writing'));
  }
  if (backToHome) {
    backToHome.addEventListener('click', () => navigateTo('home'));
  }
  if (backToWriting) {
    backToWriting.addEventListener('click', () => navigateTo('writing'));
  }

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
}
