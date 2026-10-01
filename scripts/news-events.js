document.querySelectorAll('[data-event-date]').forEach((countdown) => {
  const target = new Date(countdown.dataset.eventDate).getTime();
  const days = countdown.querySelector('[data-countdown-days]');
  const hours = countdown.querySelector('[data-countdown-hours]');
  const minutes = countdown.querySelector('[data-countdown-minutes]');
  const seconds = countdown.querySelector('[data-countdown-seconds]');

  if (!Number.isFinite(target) || !days || !hours || !minutes || !seconds) return;

  const pad = (value) => String(value).padStart(2, '0');

  const updateCountdown = () => {
    const remaining = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);

    days.textContent = pad(Math.floor(totalSeconds / 86400));
    hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    seconds.textContent = pad(totalSeconds % 60);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const image = carousel.querySelector('img');
  const previous = carousel.querySelector('[data-carousel-previous]');
  const next = carousel.querySelector('[data-carousel-next]');
  const current = carousel.querySelector('[data-carousel-current]');
  const total = carousel.querySelector('[data-carousel-total]');

  if (!image || !previous || !next || !current || !total) return;

  let images;
  try {
    images = JSON.parse(carousel.dataset.carouselImages || '[]');
  } catch {
    return;
  }

  if (images.length < 2) return;

  let activeIndex = 0;
  total.textContent = images.length;

  const updateImage = () => {
    image.src = images[activeIndex];
    current.textContent = activeIndex + 1;
  };

  previous.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    updateImage();
  });

  next.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % images.length;
    updateImage();
  });
});
