"use strict";

function toLocalDateKey(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSelectedRecapDate() {
  const input = document.getElementById("recap-date");
  return input?.value || toLocalDateKey(new Date());
}

function getSalesForDate(dateKey) {
  return getSales().filter((sale) => toLocalDateKey(sale.date) === dateKey);
}

function calculateProductQuantities(sales) {
  const products = {};

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!products[item.id]) {
        products[item.id] = { name: item.name, quantity: 0 };
      }
      products[item.id].quantity += item.quantity;
    });
  });

  return Object.values(products).sort((a, b) => b.quantity - a.quantity);
}

function paymentLabel(method) {
  return method === "card" ? "Carte bancaire" : "Espèces";
}

function renderProductTotals(products) {
  const container = document.getElementById("recap-products-list");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = '<p class="recap-empty">Aucun produit vendu ce jour.</p>';
    return;
  }

  container.innerHTML = products.map((product) => `
    <div class="recap-row">
      <span>${product.name}</span>
      <strong>${product.quantity}</strong>
    </div>
  `).join("");
}

function renderPaymentHistory(sales) {
  const container = document.getElementById("recap-payment-history");
  if (!container) return;

  if (sales.length === 0) {
    container.innerHTML = '<p class="recap-empty">Aucun paiement enregistré ce jour.</p>';
    return;
  }

  const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sortedSales.map((sale) => {
    const time = new Date(sale.date).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const itemCount = sale.items.reduce((sum, item) => sum + item.quantity, 0);

    return `
      <article class="payment-history-item">
        <div>
          <strong>${time}</strong>
          <span>${paymentLabel(sale.paymentMethod)} · ${itemCount} article${itemCount > 1 ? "s" : ""}</span>
        </div>
        <strong>${formatPrice(sale.total)}</strong>
      </article>
    `;
  }).join("");
}

function renderRecap() {
  const sales = getSalesForDate(getSelectedRecapDate());

  const revenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const cashRevenue = sales.filter((sale) => sale.paymentMethod === "cash")
    .reduce((sum, sale) => sum + sale.total, 0);
  const cardRevenue = sales.filter((sale) => sale.paymentMethod === "card")
    .reduce((sum, sale) => sum + sale.total, 0);

  document.getElementById("recap-revenue").textContent = formatPrice(revenue);
  document.getElementById("recap-sales-count").textContent = String(sales.length);
  document.getElementById("recap-cash").textContent = formatPrice(cashRevenue);
  document.getElementById("recap-card").textContent = formatPrice(cardRevenue);

  renderProductTotals(calculateProductQuantities(sales));
  renderPaymentHistory(sales);
}

function initRecap() {
  const dateInput = document.getElementById("recap-date");
  if (!dateInput) return;

  dateInput.value = toLocalDateKey(new Date());
  dateInput.addEventListener("change", renderRecap);
}
