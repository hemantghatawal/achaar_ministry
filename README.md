# Achaar Ministry

Achaar Ministry is a lightweight static storefront for showcasing and selling homemade achar online. The site displays a bilingual product catalog, supports category filtering and search, stores a local cart in the browser, and prepares WhatsApp order messages for checkout.

## Features

- Hindi and English language toggle
- Product listing driven by JSON data
- Category filters and live search
- Weight-based pricing
- Local cart using `localStorage`
- WhatsApp order handoff with itemized message
- Simple static build script for generating product markup into `index.html`

## Project Structure

```text
.
+-- build/
|   +-- build.js
+-- css/
|   +-- style.css
+-- data/
|   +-- categories.json
|   +-- products.json
+-- i18n/
|   +-- en.json
|   +-- hi.json
+-- images/
|   +-- logo.png
|   +-- products/
+-- js/
|   +-- app.js
|   +-- cart.js
|   +-- filters.js
|   +-- i18n.js
|   +-- search.js
|   +-- whatsapp.js
+-- index.html
+-- index.template.html
+-- package.json
```

## Getting Started

### 1. Install dependencies

This project does not currently depend on any external npm packages, but you can still run:

```bash
npm install
```

### 2. Start a local server

Because the app loads JSON with `fetch()`, open it through a local HTTP server instead of double-clicking `index.html`.

Examples:

```bash
npx serve .
```

or

```bash
python -m http.server 3000
```

Then open the local URL in your browser.

## Available Script

```bash
npm run build
```

This runs `build/build.js`, which reads `data/products.json` and `index.template.html`, then regenerates `index.html`.

## Data Model

Each product in `data/products.json` includes:

- `id`
- `name.hi` and `name.en`
- `category`
- `keywords`
- `image`
- `weights` object such as `200gm`, `500gm`, or `1kg`

Example:

```json
{
  "id": "kairi-chatkara",
  "name": {
    "hi": "Hindi product name",
    "en": "Kairi Chatkara"
  },
  "category": "kairi",
  "keywords": ["aam", "mango", "kairi", "chatkara"],
  "image": "images/products/kairi-chatkara.png",
  "weights": {
    "200gm": 125,
    "500gm": 275,
    "1kg": 525
  }
}
```

## Customization

### Update products

Edit `data/products.json` to add, remove, or update products.

### Update categories

Edit `data/categories.json`.

### Update translations

Edit:

- `i18n/en.json`
- `i18n/hi.json`

### Update WhatsApp number

Change `WHATSAPP_NUMBER` in `js/whatsapp.js`.

## Notes

- Cart and selected language are stored in the browser, so they persist across reloads on the same device.
- The generated `index.html` contains pre-rendered product cards, while the browser scripts also fetch live product data from JSON.
- Some Hindi text files appear to contain encoding issues; use UTF-8 when editing translation or category files.
- `index.html` currently links to `css/responsive.css`, but that file is not present in the repository.
