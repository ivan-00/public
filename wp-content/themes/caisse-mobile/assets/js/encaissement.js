"use strict";

let selectedPaymentMethod = "cash";
let receivedAmount = 0;
let amountInput = "";

function showPage(pageId) {
  const requestedPage = document.getElementById(pageId);

  console.log("Page demandée :", requestedPage);

  if (!requestedPage) {
    console.error(`La page #${pageId} est introuvable.`);
    return;
  }

  document.querySelectorAll(".app-page").forEach((page) => {
    page.classList.remove("app-page--active");
    page.hidden = true;
  });

  requestedPage.hidden = false;
  requestedPage.classList.add("app-page--active");

  console.log("Page affichée :", pageId);
}

function renderCheckoutTicket() {
  const checkoutItems = document.getElementById("checkout-ticket-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const paymentButtonTotal = document.getElementById(
    "payment-button-total"
  );

  if (!checkoutItems || !checkoutTotal) {
    return;
  }

  checkoutItems.innerHTML = ticket
    .map((item) => {
      return `
        <div class="checkout-ticket-line">
          <span>${item.quantity} × ${item.name}</span>

          <strong>
            ${formatPrice(item.price * item.quantity)}
          </strong>
        </div>
      `;
    })
    .join("");

  const total = calculateTotal();

  checkoutTotal.textContent = formatPrice(total);

  if (paymentButtonTotal) {
    paymentButtonTotal.textContent = formatPrice(total);
  }

  updateChangePreview();
}

function openCheckout() {
  console.log("Ouverture de l’encaissement");
  console.log("Ticket :", ticket);

  if (ticket.length === 0) {
    alert("Le ticket est vide.");
    return;
  }

  selectedPaymentMethod = "cash";
  receivedAmount = 0;
  amountInput = "";

  updatePaymentMethodUI();
  updatePaymentFieldsVisibility();
  updateReceivedAmount();
  renderCheckoutTicket();

  console.log("Avant changement de page");

  showPage("page-encaissement");

  console.log("Après changement de page");
}

function backToSale() {
  showPage("page-vente");
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;

  updatePaymentMethodUI();
  updatePaymentFieldsVisibility();
}

function updatePaymentMethodUI() {
  document.querySelectorAll(".payment-method").forEach((button) => {
    const isActive =
      button.dataset.paymentMethod === selectedPaymentMethod;

    button.classList.toggle(
      "payment-method--active",
      isActive
    );
  });
}

function updatePaymentFieldsVisibility() {
  const receivedCard = document.getElementById("open-amount-modal");
  const changePreview = document.querySelector(".change-preview");

  const isCash = selectedPaymentMethod === "cash";

  if (receivedCard) {
    receivedCard.hidden = !isCash;
  }

  if (changePreview) {
    changePreview.hidden = !isCash;
  }
}

function openAmountModal() {
  if (selectedPaymentMethod !== "cash") {
    return;
  }

  const modal = document.getElementById("amount-modal");

  if (!modal) {
    return;
  }

  amountInput = receivedAmount
    ? Math.round(receivedAmount * 100).toString()
    : "";

  updateAmountDisplay();
  modal.hidden = false;
}

function closeAmountModal() {
  const modal = document.getElementById("amount-modal");

  if (modal) {
    modal.hidden = true;
  }
}

function handleAmountKey(key) {
  if (key === "clear") {
    amountInput = "";
  } else if (key === "backspace") {
    amountInput = amountInput.slice(0, -1);
  } else if (["10", "20", "50"].includes(key)) {
    amountInput = String(Number(key) * 100);
  } else {
    amountInput += key;
  }

  amountInput = amountInput.replace(/^0+(?=\d)/, "");

  updateAmountDisplay();
}

function getEnteredAmount() {
  return Number(amountInput || 0) / 100;
}

function updateAmountDisplay() {
  const display = document.getElementById("amount-input-display");

  if (display) {
    display.textContent = formatPrice(getEnteredAmount());
  }
}

function confirmReceivedAmount() {
  const total = calculateTotal();
  const enteredAmount = getEnteredAmount();

  if (enteredAmount < total) {
    alert("Le montant reçu est inférieur au total.");
    return;
  }

  receivedAmount = enteredAmount;

  updateReceivedAmount();
  closeAmountModal();
}

function updateReceivedAmount() {
  const receivedElement = document.getElementById("received-amount");

  if (receivedElement) {
    receivedElement.textContent = formatPrice(receivedAmount);
  }

  updateChangePreview();
}

function calculateChange() {
  if (selectedPaymentMethod !== "cash") {
    return 0;
  }

  return Math.max(0, receivedAmount - calculateTotal());
}

function updateChangePreview() {
  const preview = document.getElementById("change-preview");

  if (preview) {
    preview.textContent = formatPrice(calculateChange());
  }
}

function confirmPayment() {
  const total = calculateTotal();

  if (ticket.length === 0) {
    return;
  }

  if (selectedPaymentMethod === "cash") {
    if (receivedAmount < total) {
      openAmountModal();
      return;
    }

    showChangeModal();
    return;
  }

  finishCardPayment();
}

function showChangeModal() {
  const modal = document.getElementById("change-modal");
  const changeAmount = document.getElementById("change-amount");
  const receivedSummary = document.getElementById("received-summary");
  const totalSummary = document.getElementById("total-summary");
  const changeSummary = document.getElementById("change-summary");

  if (
    !modal ||
    !changeAmount ||
    !receivedSummary ||
    !totalSummary ||
    !changeSummary
  ) {
    console.error("Le modal de rendu monnaie est incomplet.");
    return;
  }

  const total = calculateTotal();
  const change = calculateChange();

  changeAmount.textContent = formatPrice(change);
  receivedSummary.textContent = formatPrice(receivedAmount);
  totalSummary.textContent = formatPrice(total);
  changeSummary.textContent = formatPrice(change);

  modal.hidden = false;
}

function finishCardPayment() {
  saveCurrentSale();

  alert("Paiement par carte enregistré.");

  resetSale(false);
}

function saveCurrentSale() {
  if (typeof saveSale !== "function") {
    return;
  }

  saveSale({
    id: `sale-${Date.now()}`,
    date: new Date().toISOString(),
    items: ticket.map((item) => ({ ...item })),
    total: calculateTotal(),
    paymentMethod: selectedPaymentMethod,
    received:
      selectedPaymentMethod === "cash"
        ? receivedAmount
        : calculateTotal(),
    change:
      selectedPaymentMethod === "cash"
        ? calculateChange()
        : 0
  });
}

function resetSale(saveBeforeReset = true) {
  if (saveBeforeReset) {
    saveCurrentSale();
  }

  ticket = [];
  receivedAmount = 0;
  amountInput = "";
  selectedPaymentMethod = "cash";

  const changeModal = document.getElementById("change-modal");

  if (changeModal) {
    changeModal.hidden = true;
  }

  renderTicket();
  showPage("page-vente");
}
function initEncaissement() {

  console.log("initEncaissement exécutée");

  const checkoutButton = document.getElementById("open-checkout");

  console.log("Bouton Encaisser :", checkoutButton);

  if (!checkoutButton) {

    console.error("Le bouton #open-checkout est introuvable");

    return;

  }

  checkoutButton.addEventListener("click", () => {

    console.log("Clic sur Encaisser");

    openCheckout();

  });

  document

    .getElementById("back-to-sale")

    ?.addEventListener("click", backToSale);

  document.querySelectorAll(".payment-method").forEach((button) => {

    button.addEventListener("click", () => {

      selectPaymentMethod(button.dataset.paymentMethod);

    });

  });

  document

    .getElementById("open-amount-modal")

    ?.addEventListener("click", openAmountModal);

  document

    .getElementById("close-amount-modal")

    ?.addEventListener("click", closeAmountModal);

  document

    .querySelector("[data-close-amount-modal]")

    ?.addEventListener("click", closeAmountModal);

  document.querySelectorAll("#amount-keypad [data-key]").forEach((button) => {

    button.addEventListener("click", () => {

      handleAmountKey(button.dataset.key);

    });

  });

  document

    .getElementById("confirm-amount")

    ?.addEventListener("click", confirmReceivedAmount);

  document

    .getElementById("confirm-payment")

    ?.addEventListener("click", confirmPayment);

  document

    .getElementById("new-sale")

    ?.addEventListener("click", () => {

      resetSale(true);

    });

}