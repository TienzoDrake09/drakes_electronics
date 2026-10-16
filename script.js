const shopName = "Drake's Electronics";
const currentYear = new Date().getFullYear();
const productStock = {
  "ear-buds": 10,
  smartphone: 0,
  laptop: 0,
};
const freeDeliveryThreshold = 150;
const deliveryFeeCents = 2000;
let runningTotal = 0;

document.querySelectorAll("[data-stock-product]").forEach((statusElement) => {
  const productId = statusElement.dataset.stockProduct;
  const stockCount = productStock[productId];

  if (stockCount === undefined) {
    throw new Error(`Missing stock count for product "${productId}"`);
  }

  statusElement.textContent =
    stockCount > 0 ? `Available (${stockCount})` : `Not available (${stockCount})`;
});

const stockStatusElement = document.getElementById("stock-status");
if (stockStatusElement) {
  if (productStock["ear-buds"] > 10) {
    stockStatusElement.textContent = "In stock";
  } else if (productStock["ear-buds"] >= 1) {
    stockStatusElement.textContent = "Only a few left";
  } else {
    stockStatusElement.textContent = "Sold out";
  }
}

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
const memberInput = document.getElementById("member");
const memberCheckButton = document.getElementById("member-check");
const deliveryFeeElement = document.getElementById("delivery-fee");
const finalTotalElement = document.getElementById("final-total");

if (
  quantityInput &&
  giftWrapInput &&
  extendedWarrantyInput &&
  orderTotalElement &&
  memberInput &&
  memberCheckButton &&
  deliveryFeeElement &&
  finalTotalElement
) {
  const calculateSubtotalCents = () => {
    const quantity = Math.max(0, Math.floor(Number(quantityInput.value) || 0));
    const unitPriceCents =
      1999 +
      (giftWrapInput.checked ? 200 : 0) +
      (extendedWarrantyInput.checked ? 1000 : 0);

    return quantity * unitPriceCents;
  };

  const updateOrderTotal = () => {
    const subtotalCents = calculateSubtotalCents();
    const isMember = memberInput.checked;
    const hasFreeDelivery = isMember === true && subtotalCents >= freeDeliveryThreshold * 100;
    const orderDeliveryFeeCents = hasFreeDelivery ? 0 : deliveryFeeCents;
    const finalTotalCents = subtotalCents + orderDeliveryFeeCents;

    orderTotalElement.textContent = `Items subtotal: $${(subtotalCents / 100).toFixed(2)}`;
    deliveryFeeElement.textContent = `Delivery fee: $${(orderDeliveryFeeCents / 100).toFixed(2)}`;
    finalTotalElement.textContent = `Final total: $${(finalTotalCents / 100).toFixed(2)}`;
  };

  quantityInput.addEventListener("input", updateOrderTotal);
  giftWrapInput.addEventListener("change", updateOrderTotal);
  extendedWarrantyInput.addEventListener("change", updateOrderTotal);
  memberInput.addEventListener("change", () => {
    memberCheckButton.hidden = memberInput.checked !== true;
    updateOrderTotal();
  });
  memberCheckButton.addEventListener("click", updateOrderTotal);
  updateOrderTotal();
}

console.log("Shop name:", shopName);
console.log("Current year:", currentYear);
console.log("Running total:", `$${runningTotal.toFixed(2)}`);