(() => {
  const contractField = document.querySelector('#contract');
  const contract = new URLSearchParams(window.location.search).get('contract');

  if (contractField && ['gsa-mas', '2git', 'sewp', 'admc', 'seaport'].includes(contract)) {
    contractField.value = contract;
  }
})();
