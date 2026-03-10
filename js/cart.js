let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, weight, qty, price) {
  cart.push({
    product,
    weight,
    qty,
    price,
  });

  saveCart();
}
