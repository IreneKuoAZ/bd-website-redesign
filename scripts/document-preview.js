(() => {
  const downloadIcon = '<svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
  const closeIcon = '<svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  let lastTrigger;

  const fileName = (url) => decodeURIComponent(url.split('/').pop().split('?')[0]);
  const isOfficeFile = (url) => /\.(docx|xlsx|pptx)(?:$|\?)/i.test(url);

  const getModal = () => {
    let modal = document.querySelector('[data-document-preview-modal]');
    if (modal) return modal;
    modal = document.createElement('section');
    modal.className = 'ds-document-preview';
    modal.dataset.documentPreviewModal = '';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'document-preview-title');
    modal.innerHTML = `<div class="ds-document-preview__backdrop" data-document-preview-close></div><div class="ds-document-preview__dialog"><header class="ds-document-preview__header"><h2 id="document-preview-title"></h2><div class="ds-document-preview__actions"><a class="ds-document-preview__download" data-document-preview-download download>${downloadIcon}<span>Download</span></a><button class="ds-document-preview__close" type="button" data-document-preview-close aria-label="Close preview">${closeIcon}</button></div></header><div class="ds-document-preview__body"><iframe title="Document preview" data-document-preview-frame></iframe><p class="ds-document-preview__fallback" data-document-preview-fallback hidden>Preview is unavailable for this file type. You can still download the document to view it.</p></div></div>`;
    document.body.append(modal);
    modal.addEventListener('click', (event) => { if (event.target.closest('[data-document-preview-close]')) close(); });
    return modal;
  };

  const close = () => {
    const modal = document.querySelector('[data-document-preview-modal]');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('ds-document-preview-open');
    modal.querySelector('[data-document-preview-frame]').src = 'about:blank';
    lastTrigger?.focus();
  };

  const open = (href, label, trigger) => {
    const modal = getModal();
    const resolvedUrl = new URL(href, window.location.href).href;
    const name = label || fileName(resolvedUrl);
    const frame = modal.querySelector('[data-document-preview-frame]');
    const fallback = modal.querySelector('[data-document-preview-fallback]');
    const download = modal.querySelector('[data-document-preview-download]');
    lastTrigger = trigger || document.activeElement;
    modal.querySelector('#document-preview-title').textContent = name;
    download.href = resolvedUrl;
    download.download = fileName(resolvedUrl);
    fallback.hidden = true;
    if (/\.pdf(?:$|\?)/i.test(resolvedUrl) || /\.(csv|txt)(?:$|\?)/i.test(resolvedUrl)) {
      frame.src = resolvedUrl;
      frame.hidden = false;
    } else if (isOfficeFile(resolvedUrl)) {
      frame.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resolvedUrl)}`;
      frame.hidden = false;
    } else {
      frame.src = 'about:blank';
      frame.hidden = true;
      fallback.hidden = false;
    }
    modal.hidden = false;
    document.body.classList.add('ds-document-preview-open');
    modal.querySelector('[data-document-preview-close]').focus();
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-document-preview]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(link.href, link.dataset.documentTitle || link.textContent.trim(), link);
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  window.documentPreview = { open, close };
})();
