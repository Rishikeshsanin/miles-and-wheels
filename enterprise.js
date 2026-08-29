(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const copyReplacements = new Map([
    ['Place demo booking', 'Confirm trip'],
    ['place demo booking', 'confirm trip'],
    ['Payable demo total', 'Trip total'],
    ['Demo total', 'Trip total'],
    ['demo total', 'trip total'],
    ['Your demo booking has been stored locally on this device.', 'Your trip confirmation has been added to recent trips.'],
    ['Your demo booking has been stored locally on this device', 'Your trip confirmation has been added to recent trips'],
    ['No local bookings yet. Place a demo booking and it will appear here on this device.', 'No recent trips yet. Confirm a trip and it will appear here.'],
    ['Device-only profile', 'Your profile'],
    ['Stored on this device', 'Recent trips'],
    ['local booking history', 'trip history'],
    ['Local booking history', 'Trip history'],
    ['Backend-verified quote', 'Price verified'],
    ['Validated local fallback', 'Price ready'],
    ['Transparent demo pricing', 'Transparent pricing'],
    ['per day · demo', 'per day']
  ]);

  function removeLegacyPrivacyUI() {
    $('#privacyModal')?.remove();
    $('#privacyButton')?.remove();
    $('#privacyDoneButton')?.remove();
    $$('[href="#why-us"]').forEach((link) => {
      if (/privacy/i.test(link.textContent || '')) link.textContent = 'Why Miles';
    });
  }

  function rewriteTextNode(node) {
    if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue?.trim()) return;
    let value = node.nodeValue;
    for (const [from, to] of copyReplacements) value = value.split(from).join(to);
    if (value !== node.nodeValue) node.nodeValue = value;
  }

  function polishCustomerCopy(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) rewriteTextNode(node);
  }

  function setupCopyGuard() {
    polishCustomerCopy();
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) rewriteTextNode(node);
          else if (node instanceof HTMLElement) polishCustomerCopy(node);
        });
        if (record.type === 'characterData') rewriteTextNode(record.target);
      });
    });
    observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  }

  function releaseOverlayIfClear() {
    const openModal = $$('.modal').some((modal) => !modal.hidden);
    const drawer = $('#cartDrawer');
    const drawerOpen = drawer && drawer.getAttribute('aria-hidden') === 'false';
    if (!openModal && !drawerOpen) {
      const scrim = $('#scrim');
      if (scrim) scrim.hidden = true;
      document.body.style.overflow = '';
      document.body.classList.remove('no-scroll','modal-open','drawer-open');
    }
  }

  function hardCloseModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden','true');
    releaseOverlayIfClear();
  }

  function setupDefensiveModalClosing() {
    document.addEventListener('click', (event) => {
      const close = event.target.closest('.modal-close');
      if (close) {
        event.preventDefault();
        event.stopPropagation();
        hardCloseModal(close.closest('.modal'));
        return;
      }
      if (event.target.classList?.contains('modal')) hardCloseModal(event.target);
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      $$('.modal').filter((modal) => !modal.hidden).forEach(hardCloseModal);
    }, true);
  }

  function selectJourney(button) {
    const query = button.dataset.journeyQuery;
    const type = button.dataset.journeyType;
    const fleet = $('#fleet');
    if (type) {
      const typeButton = $(`[data-type="${CSS.escape(type)}"]`);
      typeButton?.click();
    }
    if (query) {
      const input = $('#fleetSearch');
      if (input) {
        input.value = query;
        input.dispatchEvent(new Event('input', { bubbles:true }));
      }
    }
    fleet?.scrollIntoView({ behavior:reduced ? 'auto' : 'smooth', block:'start' });
    setTimeout(() => {
      const grid = $('#fleetGrid');
      grid?.classList.remove('enterprise-flash');
      requestAnimationFrame(() => grid?.classList.add('enterprise-flash'));
    }, reduced ? 0 : 520);
  }

  function setupJourneyControls() {
    document.addEventListener('click', (event) => {
      const journey = event.target.closest('[data-journey-query],[data-journey-type]');
      if (journey) selectJourney(journey);
      if (event.target.closest('[data-scroll-fleet]')) {
        $('#fleet')?.scrollIntoView({ behavior:reduced ? 'auto' : 'smooth' });
      }
    });
  }

  function setupActiveNavigation() {
    const header = $('.site-header');
    const links = $$('.desktop-nav a[href^="#"]');
    const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('enterprise-active', link.getAttribute('href') === `#${visible.target.id}`));
      header?.classList.toggle('is-enterprise-active', window.scrollY > 12);
    }, { rootMargin:'-32% 0px -58% 0px', threshold:[0,.15,.5] });
    sections.forEach((section) => observer.observe(section));
  }

  function setupSearchShortcut() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const active = document.activeElement;
      if (active && /INPUT|TEXTAREA|SELECT/.test(active.tagName)) return;
      event.preventDefault();
      const search = $('#heroSearch');
      search?.focus();
      search?.scrollIntoView({ behavior:reduced ? 'auto' : 'smooth', block:'center' });
    });

    const searchLabel = $('.enterprise-search-card .hero-search-meta span');
    if (searchLabel && !searchLabel.querySelector('kbd')) {
      searchLabel.insertAdjacentHTML('beforeend', ' <kbd>/</kbd>');
    }
  }

  function setupCinematicParallax() {
    if (reduced || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const section = $('.enterprise-cinematic');
    const media = $('.enterprise-cinematic-media');
    if (!section || !media) return;
    section.addEventListener('pointermove', (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      media.style.transform = `scale(1.045) translate(${x * -12}px, ${y * -8}px)`;
    });
    section.addEventListener('pointerleave', () => { media.style.transform = ''; });
  }

  function setupEnterpriseReveals() {
    const elements = $$('.enterprise-proof-grid article,.journey-card,.enterprise-standard-grid article,.enterprise-city-grid article,.enterprise-support-actions a,.enterprise-work-copy,.enterprise-work-visual');
    elements.forEach((el, index) => {
      el.classList.add('enterprise-reveal');
      el.style.setProperty('--enterprise-delay', `${Math.min(index % 6, 5) * 60}ms`);
    });
    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('enterprise-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('enterprise-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold:.12, rootMargin:'0px 0px -5% 0px' });
    elements.forEach((el) => observer.observe(el));
  }

  function setupTripAttention() {
    const cartCount = $('#cartCount');
    const cartButton = $('#cartButton');
    if (!cartCount || !cartButton) return;
    let last = cartCount.textContent;
    const observer = new MutationObserver(() => {
      if (cartCount.textContent === last) return;
      last = cartCount.textContent;
      cartButton.classList.remove('enterprise-pulse');
      requestAnimationFrame(() => cartButton.classList.add('enterprise-pulse'));
    });
    observer.observe(cartCount, { childList:true, subtree:true, characterData:true });
  }

  function setupImageLoadPolish() {
    const apply = (image) => {
      if (!(image instanceof HTMLImageElement) || image.dataset.enterpriseImage === '1') return;
      image.dataset.enterpriseImage = '1';
      image.classList.add('enterprise-image-loading');
      const done = () => image.classList.add('enterprise-image-ready');
      if (image.complete) done(); else image.addEventListener('load', done, { once:true });
    };
    $$('img').forEach(apply);
    const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches('img')) apply(node);
      $$('img', node).forEach(apply);
    })));
    observer.observe(document.body, { childList:true, subtree:true });
  }

  function setupPageStatus() {
    const status = document.createElement('div');
    status.className = 'enterprise-status';
    status.setAttribute('aria-hidden','true');
    status.innerHTML = '<i></i><span>Fleet online</span>';
    document.body.appendChild(status);
    setTimeout(() => status.classList.add('enterprise-status-ready'), 900);
  }

  removeLegacyPrivacyUI();
  setupDefensiveModalClosing();
  setupCopyGuard();
  setupJourneyControls();
  setupActiveNavigation();
  setupSearchShortcut();
  setupCinematicParallax();
  setupEnterpriseReveals();
  setupTripAttention();
  setupImageLoadPolish();
  setupPageStatus();
})();
