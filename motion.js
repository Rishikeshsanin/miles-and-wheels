(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function injectExperienceLayer() {
    if (!$('#fxLoader')) {
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="fx-loader" id="fxLoader" aria-hidden="true">
          <div class="fx-loader-logo">M&amp;W</div>
          <div class="fx-loader-track"><span></span></div>
          <p>Preparing your road</p>
        </div>
        <div class="fx-progress" id="fxProgress" aria-hidden="true"></div>
        <div class="fx-pointer-glow" id="fxPointerGlow" aria-hidden="true"></div>
        <div class="fx-cursor-dot" id="fxCursorDot" aria-hidden="true"></div>
        <div class="fx-cursor-ring" id="fxCursorRing" aria-hidden="true"></div>
      `);
    }

    const heroVisual = $('.hero-visual');
    if (heroVisual && !$('.fx-orbit', heroVisual)) {
      heroVisual.classList.add('fx-parallax-root');
      heroVisual.insertAdjacentHTML('afterbegin', `
        <div class="fx-orbit fx-orbit-a" aria-hidden="true"></div>
        <div class="fx-orbit fx-orbit-b" aria-hidden="true"></div>
        <div class="fx-scan" aria-hidden="true"></div>
        <div class="fx-particles" aria-hidden="true"></div>
      `);
      const particleHost = $('.fx-particles', heroVisual);
      for (let i = 0; i < 16; i += 1) {
        const dot = document.createElement('i');
        dot.style.setProperty('--x', `${5 + Math.random() * 90}%`);
        dot.style.setProperty('--y', `${5 + Math.random() * 90}%`);
        dot.style.setProperty('--delay', `${Math.random() * 5}s`);
        dot.style.setProperty('--duration', `${4 + Math.random() * 6}s`);
        particleHost.appendChild(dot);
      }
    }

    const quickCategories = $('.quick-categories');
    if (quickCategories && !$('.fx-marquee')) {
      quickCategories.insertAdjacentHTML('afterend', `
        <section class="fx-marquee" aria-label="Product highlights">
          <div class="fx-marquee-track">
            <span>20+ CURATED RIDES</span><i>◆</i><span>LIVE TYPO-TOLERANT SEARCH</span><i>◆</i><span>DEVICE-LOCAL PRIVACY</span><i>◆</i><span>STATELESS QUOTE API</span><i>◆</i><span>RESPONSIVE EVERYWHERE</span><i>◆</i>
            <span aria-hidden="true">20+ CURATED RIDES</span><i aria-hidden="true">◆</i><span aria-hidden="true">LIVE TYPO-TOLERANT SEARCH</span><i aria-hidden="true">◆</i><span aria-hidden="true">DEVICE-LOCAL PRIVACY</span><i aria-hidden="true">◆</i><span aria-hidden="true">STATELESS QUOTE API</span><i aria-hidden="true">◆</i><span aria-hidden="true">RESPONSIVE EVERYWHERE</span><i aria-hidden="true">◆</i>
          </div>
        </section>
        <section class="fx-stats" aria-label="Miles and Wheels product metrics">
          <div class="container fx-stat-grid fx-reveal">
            <article><strong data-fx-count="20">0</strong><span>curated rides</span></article>
            <article><strong data-fx-count="4.8" data-decimals="1">0</strong><span>average demo rating</span></article>
            <article><strong data-fx-count="30">0</strong><span>rental days supported</span></article>
            <article><strong data-fx-count="0">0</strong><span>server-side user records</span></article>
          </div>
        </section>
      `);
    }

    const cities = $('.cities-section');
    if (cities && !$('.fx-showcase')) {
      cities.insertAdjacentHTML('beforebegin', `
        <section class="fx-showcase section-pad">
          <div class="container fx-showcase-grid">
            <div class="fx-showcase-copy fx-reveal">
              <p class="eyebrow">Interaction engineering</p>
              <h2>Built to feel alive, not like a template.</h2>
              <p>Motion gives feedback to every important action while the rental logic stays simple, private and predictable.</p>
              <div class="fx-pill-row"><span>Fuzzy search</span><span>3D cards</span><span>Live billing</span><span>Local history</span><span>API verification</span></div>
              <button class="fx-random-btn" id="fxRandomRide" type="button"><span>✦</span> Show me a random ride</button>
            </div>
            <div class="fx-console fx-reveal" id="fxConsole">
              <div class="fx-console-head"><i></i><i></i><i></i><small>rental-flow.js</small></div>
              <div class="fx-console-body">
                <p><b>01</b><strong>SEARCH</strong><em>updates on every keystroke</em></p>
                <p><b>02</b><strong>SELECT</strong><em>quantity and days remain integer-safe</em></p>
                <p><b>03</b><strong>VERIFY</strong><em>stateless API checks the quote</em></p>
                <p><b>04</b><strong>BOOK</strong><em>history stays on this browser</em></p>
              </div>
              <div class="fx-console-ready"><span></span> system ready</div>
            </div>
          </div>
        </section>
      `);
    }

    if (!$('#fxBackTop')) {
      document.body.insertAdjacentHTML('beforeend', '<button class="fx-back-top" id="fxBackTop" type="button" aria-label="Back to top">↑</button>');
    }
  }

  function decorateStaticContent() {
    $$('.section-heading, .why-copy, .benefit-grid, .steps-grid, .city-grid, .faq-list, .footer-grid, .hero-search-card, .location-pill').forEach((el) => el.classList.add('fx-reveal'));
    $('.hero-copy')?.classList.add('fx-hero-copy');
    $('.hero-visual')?.classList.add('fx-hero-visual');
    $('.site-header')?.classList.add('fx-header');
    $$('.category-chip, .type-tab').forEach((el) => el.classList.add('fx-control'));
  }

  function setupLoader() {
    const loader = $('#fxLoader');
    if (!loader) return;
    const finish = () => window.setTimeout(() => loader.classList.add('is-done'), reduced ? 0 : 260);
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
  }

  function setupScrollSystem() {
    const progress = $('#fxProgress');
    const header = $('.site-header');
    const back = $('#fxBackTop');
    let ticking = false;

    const render = () => {
      ticking = false;
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progress) progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
      header?.classList.toggle('fx-scrolled', y > 28);
      back?.classList.toggle('is-visible', y > 650);
      document.documentElement.style.setProperty('--fx-scroll', `${Math.min(1, y / 900)}`);
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    }, { passive: true });
    render();

    back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  function setupRevealSystem() {
    const elements = $$('.fx-reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const children = entry.target.querySelectorAll(':scope > *');
        children.forEach((child, index) => child.style.setProperty('--fx-delay', `${Math.min(index, 10) * 65}ms`));
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    elements.forEach((el) => observer.observe(el));
  }

  function setupCounters() {
    const counters = $$('[data-fx-count]');
    const animate = (el) => {
      const target = Number(el.dataset.fxCount || 0);
      const decimals = Number(el.dataset.decimals || 0);
      if (reduced) {
        el.textContent = target.toFixed(decimals);
        return;
      }
      const start = performance.now();
      const duration = 1200;
      const frame = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => observer.observe(el));
  }

  function setupPointer() {
    if (!finePointer || reduced) return;
    document.body.classList.add('fx-cursor-ready');
    const dot = $('#fxCursorDot');
    const ring = $('#fxCursorRing');
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    window.addEventListener('pointermove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      document.documentElement.style.setProperty('--fx-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--fx-y', `${event.clientY}px`);
      if (dot) dot.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`;
    }, { passive: true });

    const follow = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (ring) ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
      requestAnimationFrame(follow);
    };
    follow();

    document.addEventListener('pointerover', (event) => {
      ring?.classList.toggle('is-hover', Boolean(event.target.closest('a, button, input, select, summary, .vehicle-card')));
    });
  }

  function setupHeroParallax() {
    if (!finePointer || reduced) return;
    const root = $('.hero-visual');
    const image = $('.hero-image', root || document);
    if (!root || !image) return;
    root.addEventListener('pointermove', (event) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      image.style.setProperty('--fx-hero-x', `${x * 16}px`);
      image.style.setProperty('--fx-hero-y', `${y * 13}px`);
      image.style.setProperty('--fx-hero-ry', `${x * 2.5}deg`);
      image.style.setProperty('--fx-hero-rx', `${-y * 2}deg`);
    });
    root.addEventListener('pointerleave', () => {
      image.style.setProperty('--fx-hero-x', '0px');
      image.style.setProperty('--fx-hero-y', '0px');
      image.style.setProperty('--fx-hero-ry', '0deg');
      image.style.setProperty('--fx-hero-rx', '0deg');
    });
  }

  function bindCard(card) {
    if (!card || card.dataset.fxBound === 'true') return;
    card.dataset.fxBound = 'true';
    card.classList.add('fx-card');

    if (finePointer && !reduced) {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--fx-card-x', `${x * 100}%`);
        card.style.setProperty('--fx-card-y', `${y * 100}%`);
        card.style.setProperty('--fx-tilt-y', `${(x - 0.5) * 6}deg`);
        card.style.setProperty('--fx-tilt-x', `${(0.5 - y) * 5}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--fx-tilt-y', '0deg');
        card.style.setProperty('--fx-tilt-x', '0deg');
      });
    }
  }

  function bindVehicleCards() {
    $$('.vehicle-card').forEach(bindCard);
    const roots = [$('#fleetGrid'), $('#popularGrid')].filter(Boolean);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches('.vehicle-card')) bindCard(node);
        $$('.vehicle-card', node).forEach(bindCard);
      }));
    });
    roots.forEach((root) => observer.observe(root, { childList: true, subtree: true }));
  }

  function setupButtonEffects() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || reduced) return;
      const rect = button.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ripple = document.createElement('span');
      ripple.className = 'fx-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });

    if (!finePointer || reduced) return;
    $$('.primary-btn, .cart-btn, .category-chip, .fx-random-btn').forEach((button) => {
      button.classList.add('fx-magnetic');
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.setProperty('--fx-mx', `${x * 0.09}px`);
        button.style.setProperty('--fx-my', `${y * 0.13}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--fx-mx', '0px');
        button.style.setProperty('--fx-my', '0px');
      });
    });
  }

  function setupConsoleTilt() {
    const consoleCard = $('#fxConsole');
    if (!consoleCard || !finePointer || reduced) return;
    consoleCard.addEventListener('pointermove', (event) => {
      const rect = consoleCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      consoleCard.style.setProperty('--fx-console-y', `${x * 7}deg`);
      consoleCard.style.setProperty('--fx-console-x', `${-y * 5}deg`);
    });
    consoleCard.addEventListener('pointerleave', () => {
      consoleCard.style.setProperty('--fx-console-y', '0deg');
      consoleCard.style.setProperty('--fx-console-x', '0deg');
    });
  }

  function setupRandomRide() {
    $('#fxRandomRide')?.addEventListener('click', () => {
      const cards = $$('#fleetGrid .vehicle-card');
      if (!cards.length) {
        $('#fleet')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        return;
      }
      const card = cards[Math.floor(Math.random() * cards.length)];
      card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      if (!reduced) {
        setTimeout(() => card.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.035)', boxShadow: '0 34px 90px rgba(12,124,102,.28)' },
          { transform: 'scale(1)' }
        ], { duration: 850, easing: 'cubic-bezier(.16,1,.3,1)' }), 450);
      }
    });
  }

  function setupCartFeedback() {
    const count = $('#cartCount');
    if (!count) return;
    let previous = count.textContent;
    const observer = new MutationObserver(() => {
      const next = count.textContent;
      if (next !== previous) {
        count.classList.remove('fx-bump');
        requestAnimationFrame(() => count.classList.add('fx-bump'));
        previous = next;
      }
    });
    observer.observe(count, { childList: true, characterData: true, subtree: true });
  }

  function setupLocationFeedback() {
    const title = $('#locationTitle');
    const pill = $('#locationPill');
    if (!title || !pill) return;
    const observer = new MutationObserver(() => {
      const shared = title.textContent.trim() !== 'Location not shared';
      pill.classList.toggle('fx-location-active', shared);
    });
    observer.observe(title, { childList: true, characterData: true, subtree: true });
  }

  function confetti() {
    if (reduced) return;
    const palette = ['#0c7c66', '#13a986', '#7ce2c5', '#f1b94e', '#e98a4e', '#ffffff'];
    const x = innerWidth / 2;
    const y = Math.min(innerHeight * 0.42, 390);
    for (let i = 0; i < 48; i += 1) {
      const piece = document.createElement('i');
      piece.className = 'fx-confetti';
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.background = palette[i % palette.length];
      piece.style.setProperty('--dx', `${(Math.random() - 0.5) * Math.min(innerWidth * 0.86, 820)}px`);
      piece.style.setProperty('--dy', `${120 + Math.random() * Math.min(innerHeight * 0.55, 520)}px`);
      piece.style.setProperty('--rot', `${(Math.random() - 0.5) * 1000}deg`);
      piece.style.setProperty('--time', `${1 + Math.random() * 0.8}s`);
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2200);
    }
  }

  function setupSuccessFeedback() {
    const modal = $('#successModal');
    if (!modal) return;
    let wasOpen = !modal.hidden;
    const observer = new MutationObserver(() => {
      const open = !modal.hidden;
      if (open && !wasOpen) confetti();
      wasOpen = open;
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
  }

  function setupToastEnhancement() {
    const stack = $('#toastStack');
    if (!stack) return;
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        node.classList.add('fx-toast-item');
      }));
    });
    observer.observe(stack, { childList: true });
  }

  function setupFaqMotion() {
    const details = $$('.faq-list details');
    details.forEach((item) => item.addEventListener('toggle', () => {
      if (!item.open) return;
      details.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }));
  }

  function setupHeroEntrance() {
    if (reduced) return;
    $('.hero-copy')?.animate([
      { opacity: 0, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 850, delay: 120, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    $('.hero-visual')?.animate([
      { opacity: 0, transform: 'translateX(32px) scale(.97)' },
      { opacity: 1, transform: 'translateX(0) scale(1)' }
    ], { duration: 980, delay: 220, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
  }

  injectExperienceLayer();
  decorateStaticContent();
  setupLoader();
  setupScrollSystem();
  setupRevealSystem();
  setupCounters();
  setupPointer();
  setupHeroParallax();
  bindVehicleCards();
  setupButtonEffects();
  setupConsoleTilt();
  setupRandomRide();
  setupCartFeedback();
  setupLocationFeedback();
  setupSuccessFeedback();
  setupToastEnhancement();
  setupFaqMotion();
  setupHeroEntrance();
})();
