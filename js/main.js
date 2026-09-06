/**
 * Ricardo Oriol - Personal Website & Digital Garden
 * Main Client Application Logic
 */

// Article content repository for instant modal reading
const articlesData = {
  'enterprise-integrations': {
    title: 'Why Enterprise Integrations Fail (And How to Architect Around It)',
    category: 'Architecture & Systems',
    date: 'August 2025',
    readTime: '6 min read',
    content: `
      <p>Most integration failures don't happen because of network timeouts or missing headers. They happen because engineers assume distributed systems behave like monolithic functions. When systems span different organizations, networks, and failure domains, failure isn't an exceptional state—it is the baseline.</p>

      <h3>1. The Fallacy of Synchronous Expectations</h3>
      <p>In high-volume financial and enterprise systems, attempting to force two independent state machines into atomic synchrony creates cascading downtime. If Service A waits synchronously on Service B, and Service B's p99 latency spikes by 400ms, Service A exhausts its connection pool in seconds.</p>
      <blockquote>"Architect for eventual consistency first, and treat synchronous handshakes as expensive exceptions."</blockquote>

      <h3>2. Idempotency is Non-Negotiable</h3>
      <p>At Stripe, idempotency isn't an afterthought or a "nice-to-have" utility. Network drops will happen right after money leaves an account or right before a database commits. Without cryptographic idempotency keys on every state-mutating request, retries become balance-destroying liabilities.</p>

      <h3>3. Observability at the Boundaries</h3>
      <p>Enterprises often monitor their internal databases meticulously while remaining blind to their ingress and egress traffic. True integration resilience requires continuous telemetry on webhook delivery success rates, webhook signature verification failures, and retry backoff curves.</p>

      <h3>Key Takeaway</h3>
      <p>Don't build integrations assuming the partner API will always reply in 200ms. Build queues, design deterministic retry exponential backoffs with jitter, enforce idempotency keys, and treat webhook delivery status as a core product metric.</p>
    `
  },
  'reliable-agentic-workflows': {
    title: 'From Toy Prompts to Reliable Agentic Workflows: Lessons from the Field',
    category: 'Applied AI',
    date: 'July 2025',
    readTime: '7 min read',
    content: `
      <p>Over the past two years, the tech world moved rapidly from simple prompt wrappers to complex agentic loops. Yet, many AI prototypes crumble the moment they encounter enterprise production environments. What does it actually take to make an AI agent reliable enough for real-world operations?</p>

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
    title: 'What 2,000 Linux Servers Taught Me About Cloud Resiliency',
    category: 'Infrastructure & Linux',
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
  initThemeToggle();
  initArticleModal();
  initEmailCopy();
  initSmoothScroll();
});

/**
 * Theme Toggle (Dark / Light)
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored theme or default to dark
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      // Moon icon for switching to dark
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      // Sun icon for switching to light
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }
}

/**
 * Article Modal Reader
 */
function initArticleModal() {
  const modalOverlay = document.getElementById('article-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalMeta = document.getElementById('modal-meta');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const articleCards = document.querySelectorAll('.article-card');

  articleCards.forEach(card => {
    card.addEventListener('click', () => {
      const articleId = card.getAttribute('data-article-id');
      const article = articlesData[articleId];

      if (article) {
        modalMeta.textContent = `${article.category} • ${article.date} • ${article.readTime}`;
        modalTitle.textContent = article.title;
        modalBody.innerHTML = article.content;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Email Copy with Toast Feedback
 */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-address-text');
  const toast = document.getElementById('toast');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email copied to clipboard!');
      }
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/**
 * Smooth Scroll & Active Nav Spy
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
