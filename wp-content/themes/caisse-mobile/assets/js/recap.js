"use strict";

function getTodayDateKey(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("fr-CA");
}

function getTodaySales() {
  const todayKey = new Date().toLocaleDateString("fr-CA");

  return getSales().filter((sale) => {
    return getTodayDateKey(sale.date) === todayKey;
  });
}

function calculateCategoryQuantities(sales) {
  const quantities = {
    sandwichs: 0,
    boissons: 0,
    glaces: 0
  };

  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (quantities[item.category] === undefined) {
        return;
      }

      quantities[item.category] += item.quantity;
    });
  });

  return quantities;
}

function renderRecap() {
  const sales = getTodaySales();

  const revenue = sales.reduce((sum, sale) => {
    return sum + sale.total;
  }, 0);

  const cashRevenue = sales
    .filter((sale) => sale.paymentMethod === "cash")
    .reduce((sum, sale) => sum + sale.total, 0);

  const cardRevenue = sales
    .filter((sale) => sale.paymentMethod === "card")
    .reduce((sum, sale) => sum + sale.total, 0);

  const categoryQuantities = calculateCategoryQuantities(sales);

  document.getElementById("recap-revenue").textContent =
    formatPrice(revenue);

  document.getElementById("recap-sales-count").textContent =
    String(sales.length);

  document.getElementById("recap-cash").textContent =
    formatPrice(cashRevenue);

  document.getElementById("recap-card").textContent =
    formatPrice(cardRevenue);

  document.getElementById("recap-sandwichs").textContent =
    String(categoryQuantities.sandwichs);

  document.getElementById("recap-boissons").textContent =
    String(categoryQuantities.boissons);

  document.getElementById("recap-glaces").textContent =
    String(categoryQuantities.glaces);
}

function openRecap() {
  renderRecap();
  showPage("page-recap");
}

function closeRecap() {
  showPage("page-vente");
}

function initRecap() {
  const recapButton = document.getElementById("open-recap");

  if (!recapButton) {
    console.error("Le bouton #open-recap est introuvable.");
    return;
  }

  recapButton.addEventListener("click", openRecap);

  document
    .getElementById("back-to-sale-from-recap")
    ?.addEventListener("click", closeRecap);
}
function updateCurrentDate() {
    const dateElement = document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

updateCurrentDate();