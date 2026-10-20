# BiteHub — Maison Edition

A redesigned version of the original BiteHub food-ordering experience. All 15 original HTML pages, images, JavaScript files and ordering/account features are retained.

## Open the site

1. Extract the ZIP archive to a folder.
2. Open `index.html` in a modern browser to explore the website.
3. Navigate with the bottom menu: Home, Orders, Deals and Profile. All account subpages are linked from the Profile screen.

For deployment, upload the entire folder contents to any static web host (for example GitHub Pages or Netlify). Don't move or rename any HTML, CSS, JavaScript or image files because their relative paths are connected.

## What changed

- A new warm ivory, deep-olive charcoal and muted brass visual palette.
- Editorial serif headlines and quieter UI typography.
- Refined hero carousels, food imagery, product cards and order controls.
- Updated styling on every account, rewards, vouchers, checkout customization and tracking page.
- Responsive mobile-first layout retained.

## Keep / customize the design

The original `style.css`, `app.js`, `cart.js`, and `app-state.js` remain as the feature foundation. The redesigned visual theme is kept separately in `luxe.css` and is loaded after `style.css` on every page. You can adjust palette colors in the `:root` section at the top of `luxe.css`.

Google Fonts and Font Awesome icons are loaded from their existing CDNs, so internet access is recommended for the full typography/icon appearance. Food photography is packaged locally in `images/`.
