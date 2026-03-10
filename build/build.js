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

function renderWeightList(weights) {
  const entries = Object.entries(weights || {});

  if (entries.length === 0) {
    return "        <li>Price unavailable</li>";
  }

  return entries
    .map(([weight, price]) => {
      return `        <li>${escapeHtml(weight)} - ₹${escapeHtml(price)}</li>`;
    })
    .join("\n");
}

function renderProductCard(product) {
  const productName = getProductName(product);
  const imagePath = product.image || "images/logo.png";
  const weightsHtml = renderWeightList(product.weights);

  return [
    "  <div class=\"product-card\">",
    `    <img src=\"${escapeHtml(imagePath)}\" alt=\"${escapeHtml(productName)}\">`,
    `    <h3>${escapeHtml(productName)}</h3>`,
    "    <ul>",
    weightsHtml,
    "    </ul>",
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
