document.querySelectorAll('.ds-team-card').forEach((card) => {
  const role = card.querySelector('.ds-team-card__role');
  const content = card.querySelector(':scope > div:not(.ds-team-card__media)');

  if (!role || !content) return;

  content.classList.add('ds-team-card__content');
  content.insertBefore(role, content.querySelector('.ds-team-card__bio'));
});
