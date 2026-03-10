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

    let weightOptions = "";

    for (const w in product.weights) {
      weightOptions += `<option value="${w}">
${w} - ₹${product.weights[w]}
</option>`;
    }

    card.innerHTML = `

<img src="${product.image}" />

<h3>${product.name[currentLang]}</h3>

<select class="weight-select">
${weightOptions}
</select>

<input type="number" value="1" min="1" class="qty"/>

<button class="add-cart">
Add
</button>

`;

    grid.appendChild(card);
  });
}

loadProducts();
