const WHATSAPP_NUMBER = "917014008607";

function sendOrder() {
  if (!cart || cart.length === 0) {
    return;
  }

  let message = "Namaste!\n\nOrder:\n";
  let total = 0;

  cart.forEach((item, i) => {
    const lineTotal = item.price * item.qty;
    message += `${i + 1}. ${item.product} - ${item.weight} x${item.qty} - ₹${lineTotal}\n`;
    total += lineTotal;
  });

  message += `\nTotal: ₹${total}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
