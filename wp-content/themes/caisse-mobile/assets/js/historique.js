"use strict";

function initHistory() {

    const dateInput = document.getElementById("history-date");

    if (!dateInput) {
        return;
    }

    dateInput.value = getTodayDateValue();

    dateInput.addEventListener("change", () => {
        renderHistory();
    }); 
    
    document.addEventListener("click", (event) => {

    const ticketButton = event.target.closest(".history-sale");

    if (ticketButton) {
        openTicketModal(ticketButton.dataset.saleId);
        return;
    }

    if (event.target.closest("[data-close-ticket-modal]")) {
        closeTicketModal();
    }

});
}

function getTodayDateValue() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getSaleDateValue(createdAt) {
    const date = new Date(createdAt);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getPaymentLabel(method) {
    const labels = {
        cash: "Espèces",
        card: "Carte bancaire",
        especes: "Espèces",
        carte: "Carte bancaire"
    };

    return labels[method] ?? method;
}

function getSaleArticleCount(sale) {
    const items = Array.isArray(sale.items) ? sale.items : [];

    return items.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);
}
function getSaleStoredDate(sale) {
    return sale.date || sale.createdAt;
}

function getSaleItems(sale) {
    return Array.isArray(sale.items) ? sale.items : [];
}

function getItemName(item) {
    return item.name || item.productName || item.title || "Produit";
}

function getItemQuantity(item) {
    return Number(item.quantity || item.qty || 1);
}

function getItemUnitPrice(item) {
    return Number(item.price || item.unitPrice || 0);
}

function getItemTotal(item) {
    if (item.total !== undefined) {
        return Number(item.total);
    }

    return getItemQuantity(item) * getItemUnitPrice(item);
}

function openTicketModal(saleId) {
    const sales = getSales();

    const sale = sales.find((currentSale) => {
        return String(currentSale.id) === String(saleId);
    });

    if (!sale) {
        console.error("Ticket introuvable :", saleId);
        return;
    }

    const modal = document.getElementById("ticket-modal");

    if (!modal) {
        return;
    }

    const storedDate = getSaleStoredDate(sale);
    const saleDate = new Date(storedDate);

    const formattedDate = saleDate.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("ticket-modal-number").textContent =
        sale.ticketNumber || sale.id || "Ticket";

    document.getElementById("ticket-modal-date").textContent =
        formattedDate;

    document.getElementById("ticket-modal-payment").textContent =
        getPaymentLabel(sale.paymentMethod);

    document.getElementById("ticket-modal-total").textContent =
        formatPrice(Number(sale.total || 0));

    const itemsContainer =
        document.getElementById("ticket-modal-items");

    const items = getSaleItems(sale);

    if (items.length === 0) {
        itemsContainer.innerHTML = `
            <div class="history-empty">
                Aucun produit enregistré sur ce ticket
            </div>
        `;
    } else {
        itemsContainer.innerHTML = items
            .map((item) => {
                const quantity = getItemQuantity(item);
                const unitPrice = getItemUnitPrice(item);
                const itemTotal = getItemTotal(item);

                return `
                    <div class="ticket-modal__item">

                        <div class="ticket-modal__item-info">

                            <span class="ticket-modal__item-name">
                                ${getItemName(item)}
                            </span>

                            <span class="ticket-modal__item-quantity">
                                ${quantity} × ${formatPrice(unitPrice)}
                            </span>

                        </div>

                        <strong class="ticket-modal__item-price">
                            ${formatPrice(itemTotal)}
                        </strong>

                    </div>
                `;
            })
            .join("");
    }

    const received =
        Number(
            sale.receivedAmount ??
            sale.amountReceived ??
            sale.received ??
            0
        );

    const change =
        Number(
            sale.changeAmount ??
            sale.change ??
            sale.returnedAmount ??
            0
        );

    const receivedRow =
        document.getElementById("ticket-modal-received-row");

    const changeRow =
        document.getElementById("ticket-modal-change-row");

    if (sale.paymentMethod === "cash" ||
        sale.paymentMethod === "especes") {

        receivedRow.hidden = false;
        changeRow.hidden = false;

        document.getElementById("ticket-modal-received").textContent =
            formatPrice(received);

        document.getElementById("ticket-modal-change").textContent =
            formatPrice(change);

    } else {
        receivedRow.hidden = true;
        changeRow.hidden = true;
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeTicketModal() {
    const modal = document.getElementById("ticket-modal");

    if (!modal) {
        return;
    }

    modal.hidden = true;
    document.body.style.overflow = "";
}

function renderHistory() {
    const listElement = document.getElementById("history-list");
    const summaryElement = document.getElementById("history-summary");
    const dateInput = document.getElementById("history-date");

    if (!listElement || !summaryElement || !dateInput) {
        return;
    }

    const selectedDate = dateInput.value;

const sales = getSales()
    .filter((sale) => {
        const saleDate = sale.date || sale.createdAt;
        return getSaleDateValue(saleDate) === selectedDate;
    })
    .sort((saleA, saleB) => {
        return new Date(saleB.date || saleB.createdAt) -
               new Date(saleA.date || saleA.createdAt);
    });

    summaryElement.textContent =
        `${sales.length} vente${sales.length > 1 ? "s" : ""}`;

    if (sales.length === 0) {
        listElement.innerHTML = `
            <div class="history-empty">
                Aucune vente enregistrée pour cette date
            </div>
        `;

        return;
    }

    listElement.innerHTML = sales
        .map((sale) => {
        const saleDate = new Date(sale.date || sale.createdAt);

            const time = saleDate.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit"
            });

            const articleCount = getSaleArticleCount(sale);

            return `
                <button
                    type="button"
                    class="history-sale"
                    data-sale-id="${sale.id}"
                >

                    <span class="history-sale__time">
                        ${time}
                    </span>

                    <span class="history-sale__info">

                        <span class="history-sale__payment">
                            ${getPaymentLabel(sale.paymentMethod)}
                        </span>

                        <span class="history-sale__articles">
                            ${articleCount}
                            article${articleCount > 1 ? "s" : ""}
                        </span>

                    </span>

                    <strong class="history-sale__total">
                        ${formatPrice(sale.total)}
                    </strong>

                </button>
            `;
        })
        .join("");
}