const WHATSAPP_NUMBER = "917014008607";

function sendOrder() {
  let message = "Namaste 🙏%0A%0AOrder:%0A";

  let total = 0;

  cart.forEach((item, i) => {
    let price = item.price * item.qty;

    message += `${i + 1}. ${item.product} - ${item.weight} x${item.qty} - ₹${price}%0A`;

    total += price;
  });

  message += `%0ATotal: ₹${total}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(url, "_blank");
}
