const shopName = "Drake's Electronics";
const currentYear = new Date().getFullYear();
let runningTotal = 0;

const shopNameElement = document.getElementById("shop-name");
if (shopNameElement) {
  shopNameElement.textContent = shopName;
}

const footerElement = document.getElementById("site-footer");
if (footerElement) {
  footerElement.textContent = `© ${currentYear} ${shopName}`;
}

const featuredTotalElement = document.getElementById("featured-total");
if (featuredTotalElement) {
  const priceElements = document.querySelectorAll(".product-card .price");

  priceElements.forEach((priceElement) => {
    const priceText = priceElement.textContent.replace(/[$,]/g, "").trim();
    if (!/^\d+(?:\.\d{1,2})?$/.test(priceText)) {
      throw new Error(`Invalid product price: "${priceElement.textContent}"`);
    }
    runningTotal += Number(priceText);
  });

  featuredTotalElement.textContent =
    `Featured product total (${priceElements.length} products): $${runningTotal.toFixed(2)}`;
}

const quantityInput = document.getElementById("Amount");
const giftWrapInput = document.getElementById("gift-wrapped");
const extendedWarrantyInput = document.getElementById("extended-warranty");
const orderTotalElement = document.getElementById("order-total");

if (quantityInput && giftWrapInput && extendedWarrantyInput && orderTotalElement) {
  const updateOrderTotal = () => {
    const quantity = Math.max(0, Math.floor(Number(quantityInput.value) || 0));
    const unitPriceCents =
      1999 +
      (giftWrapInput.checked ? 200 : 0) +
      (extendedWarrantyInput.checked ? 1000 : 0);
    const totalCents = quantity * unitPriceCents;
    const total = (totalCents / 100).toFixed(2);

    orderTotalElement.textContent = `Order total: $${total}`;
  };

  quantityInput.addEventListener("input", updateOrderTotal);
  giftWrapInput.addEventListener("change", updateOrderTotal);
  extendedWarrantyInput.addEventListener("change", updateOrderTotal);
  updateOrderTotal();
}

console.log("Shop name:", shopName);
console.log("Current year:", currentYear);
console.log("Running total:", `$${runningTotal.toFixed(2)}`);