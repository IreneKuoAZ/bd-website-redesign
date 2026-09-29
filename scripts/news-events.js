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
