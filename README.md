# Better Direct AI web design system

Framework independent HTML/CSS components based on the [Hi-fi Design Figma file](https://www.figma.com/design/H43cNIVqz8JrhW0FJhMjCX/Hi-fi-Design--Copy-). Open `index.html` to see the component catalog, `homepage.html` for the homepage, `solutions.html` for the Solutions page, `partners.html` for the Partners hub, `oem-partnerships.html` for the OEM Partnerships page, `contracts.html` for the contracts page, or `contracts/gsa-mas.html` for the first contract detail page.

The homepage uses `styles/pages/homepage.css` for page-specific layout, while reusing `styles/components/index.css` and `styles/foundation/tokens.css`. Its Figma-exported logos and photos are in `assets/`. Homepage button-style controls, including Buy Now, are active buttons with no linked destinations yet. Navigation links and clickable cards remain linked. The partner-logo panel is marked pending until approved OEM marks are supplied.

The contracts page reuses the shared header, footer, buttons, and `ds-contract-card`. The Figma frame repeats placeholder card copy; the Federal and State Contracts card titles use the names supplied by the user. State cards use text treatments until approved logos are provided. Contract descriptions and logo-to-vehicle mapping need final review before publication. The Figma contract-hero raster asset could not be downloaded in this workspace, so the page temporarily reuses the supplied local hero SVG.

The GSA MAS detail page uses `contract-detail.css` for page layout and reuses shared cards, fact strips, and table styles. Its team photos were exported from Figma. The Figma offerings table repeats one sample row, so the HTML shows that row plus an explicit note that additional approved category/SIN data is needed. Contract number, eligibility, claims, team biographies, and contact details should be confirmed before publication. Most action buttons have no destinations yet; the GSA MAS card on `contracts.html` links to the new page.

`contract-detail.css` uses contract-neutral `contract-detail-*` class names so the same layout can serve other contract pages. The hero, breadcrumb, facts, card grid, team profiles, contact panel, and closing CTA are reusable; GSA-specific names and claims remain in `contracts/gsa-mas.html` content and IDs.

The eight GSA MAS benefit cards use distinct local Lucide icons: `badge-dollar-sign`, `messages-square`, `timer`, `shield-check`, `tag`, `route`, `rocket`, and `clipboard-check`. Their files are in `icons/`, and the shared card icon styling is in `styles/components/`.

The Solutions page reuses the Contracts hero, GSA MAS value cards, and the `ds-fact` stripe pattern from “Who we serve” for both AI capabilities and the four delivery steps. The FAQ uses native `<details>` elements. Shared video-preview, person-card, and FAQ styles live in `styles/components/`. The supplied Joe and Anthony stills are images only; video playback awaits approved video files or URLs. The Customized Project Management section follows its Figma frame with a full-width profile card and Anthony's supplied portrait. Its “Contact Anthony” button addresses the general team inbox with a subject for Anthony because a direct address has not been supplied.

The Partners hub uses the Contracts hero and shared light-blue cards. Featured partner logos are clearly marked as placeholders until approved assets are supplied. Its “Why Partner With Us” action leads to the OEM Partnerships page.

The OEM Partnerships page uses the Contracts hero and shared `ds-fact` pattern for both three-item lists. The Partners hub's “Why Partner With Us” CTA links to it. Both partnership-conversation actions use the general team inbox until an approved partnership inquiry flow is available.

## CSS structure

- `styles/foundation/` contains design tokens and font imports.
- `styles/components/` contains reusable site and card styles; `index.css` is the shared stylesheet entry point.
- `styles/pages/` contains one stylesheet per page or page family.
- `scripts/` contains all browser JavaScript; `site-navigation.js` is the shared site script.
- `content/` contains editorial source material that is not served as a page.

Page styles import the shared component entry point. Shared styles must not import page styles, and one page stylesheet must not import another.

## Use

Add this stylesheet to any HTML page:

```html
<link rel="stylesheet" href="/web-design-system/styles/components/index.css">
```

`styles/components/index.css` imports the foundation tokens and component modules. The CSS class prefix `ds-` keeps system styles separate from page-specific styles.

### Button

```html
<a class="ds-button ds-button--primary" href="/contact/">Contact us</a>
<a class="ds-button ds-button--secondary" href="/contracts/">Explore contracts</a>
<button class="ds-button ds-button--primary" type="submit">Send request</button>
<a class="ds-button ds-button--text" href="/solutions/">Explore solutions <svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>
```

Available modifiers: `--primary`, `--secondary`, `--text`, and `--inverse` for navy backgrounds. Use a native `disabled` button or `aria-disabled="true"` on a link when needed.

### Card

```html
<a class="ds-card" href="/solutions/">
  <span class="ds-card__icon" aria-hidden="true"><svg class="ds-icon" viewBox="0 0 24 24"><path d="M12 20v2M12 2v2M17 20v2M17 2v2M2 12h2M2 17h2M2 7h2M20 12h2M20 17h2M20 7h2M7 20v2M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg></span>
  <h3 class="ds-card__title">Explore solutions</h3>
  <p class="ds-card__body">Practical IT and AI services for your mission.</p>
  <span class="ds-card__action">Learn more <svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
</a>
```

Use `ds-card--subtle` for the pale blue surface. Wrap cards with `ds-grid`. For a dense, related list, use stripe items below.

### Stripe item list

```html
<ul class="ds-stripe-list" aria-label="Contract vehicles">
  <li>
    <a class="ds-stripe-item" href="/contracts/gsa/">
      <div class="ds-stripe-item__content">
        <h3 class="ds-stripe-item__title">GSA</h3>
        <p class="ds-stripe-item__body">Federal purchasing access and support.</p>
      </div>
      <span class="ds-stripe-item__action">Contract details <svg class="ds-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
    </a>
  </li>
</ul>
```

Each item has a vertical accent rule; the list adds a horizontal divider between neighboring items. Use one destination per item so the whole row can be a link.

### Section

```html
<section class="ds-section ds-section--subtle">
  <div class="ds-container">
    <div class="ds-section-heading">
      <p class="ds-eyebrow">Solutions</p>
      <h2 class="ds-title">Technology that moves missions forward</h2>
      <p class="ds-lead">A short description of the section.</p>
    </div>
  </div>
</section>
```

Available backgrounds: default white, `ds-section--subtle`, and `ds-section--inverse`. Add `ds-section-heading--center` for centered presentation.

For a centered editorial section with a visual area and action, add `ds-feature` to the section, `ds-feature__media` to its logo/gallery/content area, and `ds-feature__action` around its button. The homepage uses this shared pattern for Our contracts, Technology partners, and Community impact; each keeps its own media layout and background.

### Site header and top navigation

`scripts/site-navigation.js` is the single source of truth for the site header and footer. It replaces each page's fallback markup with the same shared desktop navigation, mobile menu, footer links, and dropdown behavior. Keep its script tag on every page; it resolves links and assets correctly for both root-level and nested pages. `styles/components/index.css` owns the shared styling. Add a `ds-skip-link` before the header for keyboard access.

## Source alignment

Figma provides the visual direction: Montserrat headings, Inter body text, Space Mono labels, navy primary actions, pill buttons, 16px cards, and a 1280px desktop content area. Existing workspace notes supply the semantic token and accessibility conventions. The preview uses sample content; site routes and contract details need final content review before launch.

## Accessibility and responsive behavior

The examples use semantic links, buttons, headings, navigation landmarks, visible keyboard focus, 44px or larger interactive targets, and reduced motion support. Grids stack on small screens. The header wraps its links rather than hiding navigation; a production mobile menu can be added once the site navigation structure is finalized.

## Icons

All component icons use [Lucide](https://lucide.dev/) SVG paths. The main card icons are `cpu` for solutions, `file-check` for contracts, and `handshake` for partnerships; card actions use `arrow-right`. Copy the inline `<svg>` markup from the catalog or use the source files in `icons/`. Inline SVGs inherit the current text color and render when the HTML file is opened directly. Decorative icons use `aria-hidden="true"`; give an icon-only control an accessible label on the control itself. The license notice is in `icons/LICENSE`.

