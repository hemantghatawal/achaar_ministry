const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const productsPath = path.join(rootDir, "data", "products.json");
const templatePath = path.join(rootDir, "index.template.html");
const outputPath = path.join(rootDir, "index.html");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getProductName(product) {
  if (product && product.name && typeof product.name === "object") {
    return product.name.en || product.name.hi || "Unnamed Product";
  }

  return "Unnamed Product";
}

function renderWeightOptions(weights) {
  const entries = Object.entries(weights || {});

  if (entries.length === 0) {
    return "<option value=\"na\">N/A</option>";
  }

  return entries
    .map(([weight]) => `<option value=\"${escapeHtml(weight)}\">${escapeHtml(weight)}</option>`)
    .join("");
}

function renderProductCard(product) {
  const productName = getProductName(product);
  const imagePath = product.image || "images/logo.png";
  const weightEntries = Object.entries(product.weights || {});
  const firstPrice = weightEntries.length > 0 ? weightEntries[0][1] : "N/A";

  return [
    "  <div class=\"product-card\">",
    `    <img src=\"${escapeHtml(imagePath)}\" alt=\"${escapeHtml(productName)}\" loading=\"lazy\">`,
    `    <h3 class=\"product-title\">${escapeHtml(productName)}</h3>`,
    "    <div class=\"purchase-meta\">",
    "      <div class=\"weight-wrap\">",
    "        <span class=\"meta-label\">Weight</span>",
    `        <select class=\"weight-select\">${renderWeightOptions(product.weights)}</select>`,
    "      </div>",
    `      <div class=\"price-chip\">₹<span class=\"price-value\">${escapeHtml(firstPrice)}</span></div>`,
    "    </div>",
    "    <div class=\"purchase-row\">",
    "      <div class=\"qty-controls\">",
    "        <button type=\"button\" class=\"qty-btn qty-minus\">-</button>",
    "        <input type=\"number\" value=\"1\" min=\"1\" class=\"qty\" readonly>",
    "        <button type=\"button\" class=\"qty-btn qty-plus\">+</button>",
    "      </div>",
    "      <button class=\"add-cart\" type=\"button\">Add</button>",
    "    </div>",
    "  </div>",
  ].join("\n");
}

function parseJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const sanitized = raw.replace(/^\uFEFF/, "");
  return JSON.parse(sanitized);
}

function build() {
  const products = parseJsonFile(productsPath);
  const template = fs.readFileSync(templatePath, "utf8");

  if (!template.includes("{{PRODUCTS}}")) {
    throw new Error("Template is missing {{PRODUCTS}} placeholder");
  }

  const productsHtml = products.map(renderProductCard).join("\n\n");
  const finalHtml = template.replace("{{PRODUCTS}}", productsHtml);

  fs.writeFileSync(outputPath, finalHtml, "utf8");
  console.log("Static site generated successfully");
}

build();
