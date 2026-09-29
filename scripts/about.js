document.querySelectorAll('.ds-team-card').forEach((card) => {
  const role = card.querySelector('.ds-team-card__role');
  const content = card.querySelector(':scope > div:not(.ds-team-card__media)');

  if (!role || !content) return;

  content.classList.add('ds-team-card__content');
  content.insertBefore(role, content.querySelector('.ds-team-card__bio'));
});

document.querySelectorAll('.ds-team-card__media[href*="youtu.be/"]').forEach((media) => {
  media.addEventListener('click', (event) => {
    if (window.location.protocol === 'file:') return;

    event.preventDefault();

    if (media.dataset.playing === 'true') return;

    const videoId = new URL(media.href).pathname.split('/').filter(Boolean).pop();
    if (!videoId) return;

    const player = document.createElement('iframe');
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    player.title = media.getAttribute('aria-label') || 'Team member video';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.allowFullscreen = true;

    media.replaceChildren(player);
    media.dataset.playing = 'true';
    media.removeAttribute('href');
    media.removeAttribute('target');
    media.removeAttribute('rel');
  });
});
