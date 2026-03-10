let products = [];
let currentLang = "hi";

async function loadProducts() {
  const res = await fetch("data/products.json");
  products = await res.json();
  renderProducts(products);
}

function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const weightKeys = Object.keys(product.weights);
    const firstWeight = weightKeys[0];

    const weightOptions = weightKeys
      .map((w) => `<option value="${w}">${w}</option>`)
      .join("");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name[currentLang]}" loading="lazy" onerror="this.onerror=null;this.src='images/logo.png';this.style.objectFit='contain';" />
      <h3 class="product-title">${product.name[currentLang]}</h3>
      <div class="purchase-meta">
        <div class="weight-wrap">
          <span class="meta-label">Weight</span>
          <select class="weight-select">${weightOptions}</select>
        </div>
        <div class="price-chip">₹<span class="price-value">${product.weights[firstWeight]}</span></div>
      </div>
      <div class="purchase-row">
        <div class="qty-controls">
          <button type="button" class="qty-btn qty-minus">-</button>
          <input type="number" value="1" min="1" class="qty" readonly />
          <button type="button" class="qty-btn qty-plus">+</button>
        </div>
        <button class="add-cart" type="button">Add</button>
      </div>
    `;

    const qtyInput = card.querySelector(".qty");
    const minusBtn = card.querySelector(".qty-minus");
    const plusBtn = card.querySelector(".qty-plus");
    const addBtn = card.querySelector(".add-cart");
    const weightSelect = card.querySelector(".weight-select");
    const priceValue = card.querySelector(".price-value");

    weightSelect.addEventListener("change", () => {
      const selectedWeight = weightSelect.value;
      priceValue.textContent = product.weights[selectedWeight];
    });

    minusBtn.addEventListener("click", () => {
      const currentQty = Number(qtyInput.value) || 1;
      qtyInput.value = Math.max(1, currentQty - 1);
    });

    plusBtn.addEventListener("click", () => {
      const currentQty = Number(qtyInput.value) || 1;
      qtyInput.value = currentQty + 1;
    });

    addBtn.addEventListener("click", () => {
      const selectedWeight = weightSelect.value;
      const qty = Number(qtyInput.value) || 1;
      const price = Number(product.weights[selectedWeight]);
      addToCart(product.name[currentLang], selectedWeight, qty, price);
      qtyInput.value = 1;
      if (typeof renderCartModal === "function") {
        renderCartModal();
      }
    });

    grid.appendChild(card);
  });
}

loadProducts();
