let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getDisplayProductName(item) {
  if (item.productNames && typeof item.productNames === "object") {
    return item.productNames[currentLang] || item.productNames.en || item.productNames.hi || item.product;
  }

  return item.product;
}

function addToCart(productId, productNames, weight, qty, price) {
  const existingItem = cart.find(
    (item) => item.productId === productId && item.weight === weight
  );

  if (existingItem) {
    existingItem.qty += qty;
    if (productNames) {
      existingItem.productNames = productNames;
    }
  } else {
    cart.push({
      productId,
      productNames,
      product: productNames?.en || productNames?.hi || "Product",
      weight,
      qty,
      price,
    });
  }

  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartModal();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  modal.classList.remove("open");
}

function renderCartModal() {
  const modal = document.getElementById("cartModal");

  if (!modal) {
    return;
  }

  if (cart.length === 0) {
    modal.innerHTML = `
      <div class="cart-sheet">
        <div class="cart-head">
          <h3>Your Cart</h3>
          <button class="cart-close" type="button">Close</button>
        </div>
        <div class="cart-empty">Your cart is empty.</div>
      </div>
    `;
    modal.querySelector(".cart-close").onclick = closeCart;
    return;
  }

  const itemsHtml = cart
    .map((item, index) => {
      const itemTotal = item.price * item.qty;
      const displayName = getDisplayProductName(item);
      return `
        <div class="cart-item">
          <div>
            <div><strong>${displayName}</strong></div>
            <div class="cart-item-meta">${item.weight} x ${item.qty} = ₹${itemTotal}</div>
          </div>
          <button class="cart-remove" type="button" data-index="${index}">Remove</button>
        </div>
      `;
    })
    .join("");

  modal.innerHTML = `
    <div class="cart-sheet">
      <div class="cart-head">
        <h3>Your Cart</h3>
        <button class="cart-close" type="button">Close</button>
      </div>
      ${itemsHtml}
      <div class="cart-total">Total: ₹${getCartTotal()}</div>
      <div class="cart-actions">
        <button class="cart-close" type="button">Continue Shopping</button>
        <button id="orderNow" class="add-cart" type="button">Order on WhatsApp</button>
      </div>
    </div>
  `;

  modal.querySelectorAll(".cart-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.index));
    });
  });

  modal.querySelectorAll(".cart-close").forEach((btn) => {
    btn.addEventListener("click", closeCart);
  });

  const orderBtn = modal.querySelector("#orderNow");
  if (orderBtn) {
    orderBtn.addEventListener("click", sendOrder);
  }
}

function openCart() {
  const modal = document.getElementById("cartModal");
  renderCartModal();
  modal.classList.add("open");
}

document.getElementById("viewCart").addEventListener("click", openCart);

document.getElementById("cartModal").addEventListener("click", (event) => {
  if (event.target.id === "cartModal") {
    closeCart();
  }
});
