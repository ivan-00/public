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

function renderHistory() {
    const listElement = document.getElementById("history-list");
    const summaryElement = document.getElementById("history-summary");
    const dateInput = document.getElementById("history-date");

    if (!listElement || !summaryElement || !dateInput) {
        return;
    }

    const selectedDate = dateInput.value;

    const sales = getSales()
        .filter((sale) => sale && sale.createdAt)
        .filter((sale) => {
            return getSaleDateValue(sale.createdAt) === selectedDate;
        })
        .sort((saleA, saleB) => {
            return new Date(saleB.createdAt) - new Date(saleA.createdAt);
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
            const saleDate = new Date(sale.createdAt);

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