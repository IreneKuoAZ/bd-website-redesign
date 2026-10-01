(() => {
  const filters = {
    team: document.querySelector('#career-team'),
    workType: document.querySelector('#career-work-type'),
    location: document.querySelector('#career-location'),
  };
  const roles = [...document.querySelectorAll('.career-role-card')];
  const emptyState = document.querySelector('.careers-filter-empty');

  if (!filters.team || !filters.workType || !filters.location || !emptyState) return;

  const updateRoles = () => {
    let visibleCount = 0;

    roles.forEach((role) => {
      const matches =
        (!filters.team.value || role.dataset.team === filters.team.value) &&
        (!filters.workType.value || role.dataset.workType === filters.workType.value) &&
        (!filters.location.value || role.dataset.location === filters.location.value);

      role.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    emptyState.hidden = visibleCount !== 0;
  };

  Object.values(filters).forEach((filter) => filter.addEventListener('change', updateRoles));
})();
