/* Shared header and footer source of truth; HTML pages provide mount points. */
(() => {
  const siteUrl = new URL('../', new URL(document.currentScript.src));
  const href = (path) => new URL(path, siteUrl).href;
  const page = window.location.pathname.split('/').pop() || 'homepage.html';
  const active = (name) => page === name ? ' aria-current="page"' : '';
  const contactCc = [
    '"info@betterdirect.com" <info@betterdirect.com>',
    '"Mark Evans" <mark@betterdirect.com>',
    '"Diana Zhong" <diana@betterdirect.com>',
    '"Kim Lambert" <kim@betterdirect.com>',
    '"Kato Wong" <kato@betterdirect.com>',
    '"Thien Duc Phung" <thien@betterdirect.com>',
    '"Rachel Mock" <rachel.mock@betterdirect.com>',
    '"Matthew Walz" <matthew.walz@betterdirect.com>',
  ];
  const chevron = (className) => `<svg class="ds-icon ${className}" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  const about = `<a href="${href('about.html')}"${active('about.html')}>Our Company</a><a href="${href('success-stories.html')}"${active('success-stories.html')}>Success Stories</a><a href="${href('careers.html')}"${active('careers.html')}>Careers</a><a href="${href('news-insights.html')}"${active('news-insights.html')}>News &amp; Insights</a><a href="${href('news-events.html')}"${active('news-events.html')}>Events</a><a href="${href('resources.html')}"${active('resources.html')}>Resources</a>`;

    const header = `<header class="ds-header ds-site-header"><div class="ds-container ds-site-header__inner"><a class="ds-site-header__brand" href="${href('homepage.html')}" aria-label="Better Direct AI homepage"><img src="${href('assets/logo.svg')}" width="144" height="36" alt="Better Direct AI"></a><nav class="ds-site-nav" aria-label="Main navigation"><a href="${href('solutions.html')}"${active('solutions.html')}>Solutions</a><a href="${href('contracts.html')}"${active('contracts.html')}>Contracts</a><a href="${href('capability-statement.html')}"${active('capability-statement.html')}>Capabilities</a><a href="${href('partners.html')}"${active('partners.html')}>Partners</a><details class="ds-site-dropdown"><summary>About ${chevron('ds-site-dropdown__chevron')}</summary><div class="ds-site-dropdown__menu">${about}</div></details><a href="${href('contact.html')}"${active('contact.html')}>Contact Us</a></nav><div class="ds-site-header__actions"><button class="ds-button ds-button--secondary" type="button">Login</button><button class="ds-button ds-button--primary" type="button">Buy Now</button><details class="ds-site-menu"><summary aria-label="Open navigation"><span></span><span></span><span></span></summary><nav aria-label="Mobile navigation"><a href="${href('solutions.html')}"${active('solutions.html')}>Solutions</a><a href="${href('contracts.html')}"${active('contracts.html')}>Contracts</a><a href="${href('capability-statement.html')}"${active('capability-statement.html')}>Capabilities</a><a href="${href('partners.html')}"${active('partners.html')}>Partners</a><details class="ds-site-menu__group"><summary>About ${chevron('ds-site-menu__chevron')}</summary><div class="ds-site-menu__subnav">${about}</div></details><a href="${href('contact.html')}"${active('contact.html')}>Contact Us</a><div class="ds-site-menu__actions"><button class="ds-button ds-button--primary" type="button">Buy Now</button><button class="ds-button ds-button--secondary" type="button">Login</button></div></nav></details></div></div></header>`;
  const footer = `<footer class="ds-footer"><div class="ds-container"><div class="ds-footer__grid"><div class="ds-footer__brand"><a href="${href('homepage.html')}" aria-label="Better Direct AI homepage"><img class="ds-footer__logo" src="${href('assets/logo.svg')}" width="180" height="45" alt="Better Direct AI"></a><p>Technology and procurement support for public-sector missions.</p></div><div class="ds-footer__column"><h2>Explore</h2><a href="${href('solutions.html')}">Solutions</a><a href="${href('contracts.html')}">Contracts</a><a href="${href('capability-statement.html')}">Capabilities</a><a href="${href('partners.html')}">Partners</a></div><div class="ds-footer__column"><h2>Company</h2><a href="${href('about.html')}">Our Company</a><a href="${href('success-stories.html')}">Success Stories</a><a href="${href('careers.html')}">Careers</a><a href="${href('news-insights.html')}">News &amp; Insights</a><a href="${href('news-events.html')}">Events</a></div><div class="ds-footer__contact"><h2>Contact Us</h2><a href="mailto:info@betterdirect.com">info@betterdirect.com</a><a href="tel:+14809213858">(480) 921-3858</a><address class="ds-footer__address">2425 E. University Dr.<br>Tempe, AZ 85288</address></div></div><div class="ds-footer__legal"><span>© 2026 Better Direct AI. All rights reserved.</span><span>SDVOSB &amp; HUBZone</span></div></div></footer>`;

  document.querySelectorAll('.ds-site-header').forEach((element) => { element.outerHTML = header; });
  document.querySelectorAll('.ds-footer').forEach((element) => { element.outerHTML = footer; });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const mailto = new URL(link.href);
    const toAddresses = new Set(mailto.pathname.split(',').map((recipient) => {
      const address = recipient.match(/<([^>]+)>/)?.[1] || recipient;
      return decodeURIComponent(address.trim()).toLowerCase();
    }));
    const cc = contactCc.filter((recipient) => {
      const address = recipient.match(/<([^>]+)>/)?.[1];
      return address && !toAddresses.has(address.toLowerCase());
    }).join(', ');
    const params = new URLSearchParams(mailto.search);
    params.set('cc', cc);
    mailto.search = params.toString().replace(/\+/g, '%20');
    link.href = mailto.href;
  });
  document.querySelectorAll('.ds-footer__column').forEach((column) => {
    if (column.querySelector('h2')?.textContent.trim() !== 'Company') return;
    const resource = document.createElement('a');
    resource.href = href('resources.html');
    resource.textContent = 'Resources';
    column.append(resource);
  });
  document.querySelectorAll('.ds-site-header').forEach((siteHeader) => {
    const dropdowns = siteHeader.querySelectorAll('.ds-site-dropdown');
    const mobileMenu = siteHeader.querySelector('.ds-site-menu');
    const mobileMenuTrigger = mobileMenu?.querySelector(':scope > summary');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    dropdowns.forEach((dropdown) => dropdown.addEventListener('toggle', () => {
      if (dropdown.open) dropdowns.forEach((other) => { if (other !== dropdown) other.open = false; });
    }));
    dropdowns.forEach((dropdown) => {
      let closeTimer;
      dropdown.addEventListener('pointerenter', () => {
        if (!canHover.matches) return;
        window.clearTimeout(closeTimer);
        dropdowns.forEach((other) => { if (other !== dropdown) other.open = false; });
        dropdown.open = true;
      });
      dropdown.addEventListener('pointerleave', () => {
        if (canHover.matches) closeTimer = window.setTimeout(() => { dropdown.open = false; }, 180);
      });
      dropdown.querySelector(':scope > summary').addEventListener('click', (event) => {
        if (canHover.matches && event.detail !== 0) event.preventDefault();
      });
    });
    siteHeader.addEventListener('keydown', (event) => { if (event.key === 'Escape') dropdowns.forEach((dropdown) => { dropdown.open = false; }); });
    document.addEventListener('click', (event) => { if (!siteHeader.contains(event.target)) dropdowns.forEach((dropdown) => { dropdown.open = false; }); });
    mobileMenu?.addEventListener('toggle', () => {
      mobileMenuTrigger?.setAttribute('aria-label', mobileMenu.open ? 'Close navigation' : 'Open navigation');
    });
    mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { mobileMenu.open = false; }));
    siteHeader.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu?.open) mobileMenu.open = false;
    });
  });
  const updateHeaderScrollState = () => {
    document.querySelectorAll('.ds-site-header').forEach((siteHeader) => {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    });
  };
  updateHeaderScrollState();
  window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
})();
