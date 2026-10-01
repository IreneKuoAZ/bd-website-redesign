(() => {
  const catalog = document.querySelector('[data-catalog]');
  if (!catalog) return;

  const search = catalog.querySelector('#catalog-search');
  const manufacturer = catalog.querySelector('#catalog-manufacturer');
  const results = catalog.querySelector('#catalog-results');
  const rows = catalog.querySelector('[data-catalog-rows]');
  const empty = catalog.querySelector('[data-catalog-empty]');
  const pagination = catalog.querySelector('[data-catalog-pagination]');
  const download = catalog.querySelector('[data-catalog-download]');
  const pageSize = 5;
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  let currentPage = 1;
  let products = [];
  const fallbackProducts = [
    ['BD10001', 'Samsung Electronics Co.', 'UN75U8000FFXZA', '75-inch Series 8 4K LED display, TAA compliant', 660.33, 589.58],
    ['BD10002', 'Apricorn, Inc.', 'A25-3PL256-1000F', 'FIPS validated 1TB USB 3.0 encrypted portable drive', 231.24, 206.46],
    ['BD10003', 'CISCO', 'C8300-2N2S-4T2X', 'Cisco Catalyst C8300-2N2S-4T2X Router', 11780.92, 10518.68],
    ['BD10004', 'CISCO', 'DNA-P-T3-A-5Y', 'Cisco DNA Advantage On-Prem License, 5 year', 43694.15, 39012.63],
    ['BD10005', 'PEERLESS INDUSTRIES, INC', 'ST660', 'SmartMount universal tilt wall mount for 39–80 inch displays', 113.53, 101.37],
    ['BD10006', 'Tripp Lite by Eaton', 'SU6000XFMR2UTAA', 'SmartOnline step-down isolation transformer, 6kVA, 2U rack mount', 1690.52, 1509.39],
    ['BD10007', 'CISCO', 'CS-DESKPRO-K9++', 'Cisco Desk Pro, TAA', 8455.82, 7549.84],
    ['BD10008', 'AXIOM', 'AXG99596', '3-foot CAT6 cable, blue, TAA compliant', 6.32, 5.64],
    ['BD10009', 'AXIOM', 'AXG99599', '5-foot CAT6 cable, blue, TAA compliant', 7.13, 6.37],
    ['BD10010', 'AXIOM', 'AXG99587', '10-foot CAT6 cable, blue, TAA compliant', 10.05, 8.97],
    ['BD10011', 'CISCO', 'GLC-LH-SMD++=', '1000BASE-LX/LH SFP transceiver module', 832.16, 743.00],
    ['BD10012', 'HP Inc.', '8M3V5AA#ABA', 'Poly Blackwire 3325 Teams headset with USB-C/A adapter', 61.60, 55.00],
    ['BD10013', 'Targus', 'DOCK182USZ', 'USB-C Universal DV4K docking station with 100W power delivery', 250.45, 223.62],
    ['BD10014', 'Samsung Electronics Co.', 'BE55FX-H', '55-inch 4K LED commercial display', 507.38, 453.02],
    ['BD10015', 'VERTIV', 'SCMV2160DPH-400', 'CYBEX Secure 16-port MultiViewer KVM switch', 13868.06, 12382.20],
    ['BD10016', 'Samsung Electronics Co.', 'UN70U8000FFXZA', '70-inch Series 8 4K LED display', 605.30, 540.45],
    ['BD10017', 'Samsung Electronics Co.', 'QN65Q7FAAFXZA', '65-inch Series 7 QLED 4K display', 540.28, 482.39],
    ['BD10018', 'Samsung Electronics Co.', 'QN65Q8FAAFXZA', '65-inch Series 8 QLED 4K display', 856.68, 764.89],
    ['BD10019', 'CISCO', 'C9300-24P-A', 'Catalyst 9300 24-port PoE+ Network Advantage switch', 3706.72, 3309.57],
    ['BD10020', 'CISCO', 'CON-SNBD-C93002PA', 'Next business day support for Catalyst 9300 24-port PoE', 1465.90, 1308.84]
  ].map(([vendorPartNumber, manufacturer, manufacturerPartNumber, description, msrp, price]) => ({ vendorPartNumber, manufacturer, manufacturerPartNumber, description, msrp, price }));

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const parseCurrency = (value) => Number(String(value).replace(/[$,\s]/g, ''));

  const parseCsv = (text) => {
    const parsedRows = [];
    let field = '';
    let row = [];
    let quoted = false;
    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];
      if (character === '"') {
        if (quoted && text[index + 1] === '"') { field += '"'; index += 1; } else quoted = !quoted;
      } else if (character === ',' && !quoted) { row.push(field.trim()); field = ''; } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && text[index + 1] === '\n') index += 1;
        row.push(field.trim());
        if (row.some(Boolean)) parsedRows.push(row);
        row = [];
        field = '';
      } else field += character;
    }
    row.push(field.trim());
    if (row.some(Boolean)) parsedRows.push(row);
    const [headers, ...data] = parsedRows;
    return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
  };

  const filteredProducts = () => {
    const query = search.value.trim().toLowerCase();
    return products.filter((product) => (!manufacturer.value || product.manufacturer === manufacturer.value) && (!query || Object.values(product).join(' ').toLowerCase().includes(query)));
  };

  const render = () => {
    const filtered = filteredProducts();
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    results.textContent = filtered.length ? `Showing ${((currentPage - 1) * pageSize) + 1}–${((currentPage - 1) * pageSize) + visible.length} of ${filtered.length} products` : 'No products found';
    rows.innerHTML = visible.map((product) => `<tr><td>${escapeHtml(product.vendorPartNumber)}</td><td>${escapeHtml(product.manufacturer)}</td><td>${escapeHtml(product.manufacturerPartNumber)}</td><td>${escapeHtml(product.description)}</td><td class="contract-catalog__price">${money.format(product.msrp)}</td><td class="contract-catalog__price">${money.format(product.price)}</td></tr>`).join('');
    empty.hidden = Boolean(visible.length);
    pagination.innerHTML = pageCount > 1 ? Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1;
      const isCurrentPage = page === currentPage;
      return `<button class="ds-button ds-button--${isCurrentPage ? 'primary' : 'secondary'}" type="button"${isCurrentPage ? ' aria-current="page"' : ''} data-page="${page}">${page}</button>`;
    }).join('') : '';
  };

  const resetAndRender = () => { currentPage = 1; render(); };
  const populateManufacturers = () => {
    manufacturer.replaceChildren(new Option('All manufacturers', ''));
    [...new Set(products.map((product) => product.manufacturer))].sort().forEach((name) => manufacturer.add(new Option(name, name)));
  };
  search.addEventListener('input', resetAndRender);
  manufacturer.addEventListener('change', resetAndRender);
  pagination.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    currentPage = Number(button.dataset.page);
    render();
  });

  const catalogUrl = '../assets/documents/ITES-4H%20Product%20Catalog.csv';
  download.textContent = 'Download Catalog';
  download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = new URL(catalogUrl, window.location.href).href;
    link.download = 'ITES-4H Product Catalog.csv';
    document.body.append(link);
    link.click();
    link.remove();
  });

  fetch(catalogUrl)
    .then((response) => { if (!response.ok) throw new Error('Catalog unavailable'); return response.text(); })
    .then((csv) => {
      products = parseCsv(csv).map((product) => ({
        vendorPartNumber: product['Vendor Part Number'],
        manufacturer: product.Manufacturer,
        manufacturerPartNumber: product['Manufacturer Part Number'],
        description: product['Product Description'],
        msrp: parseCurrency(product.MSRP),
        price: parseCurrency(product['ITES-4H Price'])
      }));
      populateManufacturers();
      render();
    })
    .catch(() => {
      products = fallbackProducts;
      populateManufacturers();
      render();
    });
})();
