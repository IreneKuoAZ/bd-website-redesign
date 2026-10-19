(() => {
  const frame = document.querySelector('[data-online-catalog-frame]');
  const catalog = frame?.closest('[data-online-catalog-url]');
  const catalogLink = document.querySelector('[data-online-catalog-link]');
  const action = document.querySelector('[data-online-catalog-action]');
  if (!frame || !catalog || !catalogLink || !action) return;

  const catalogUrl = catalog.dataset.onlineCatalogUrl;
  if (!catalogUrl) {
    catalog.classList.add('online-catalog--unconfigured');
    action.hidden = true;
    return;
  }

  frame.src = catalogUrl;
  catalogLink.href = catalogUrl;
})();
