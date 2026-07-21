"use strict";

let ticket = [];

function formatPrice(price) {
    return price.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR"
    });
}

function createProductCard(product) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = `product-card product-card--${product.category}`;
    button.dataset.productId = product.id;

    button.innerHTML = `
    <span class="product-card__icon">${product.icon ?? "•"}</span>

    <span class="product-card__name">
      ${product.name}
    </span>

    <strong class="product-card__price">
      ${formatPrice(product.price)}
    </strong>
  `;

    button.addEventListener("click", () => {
        addProductToTicket(product.id);
    });

    return button;
}

function renderProducts() {
    const containers = {
        sandwichs: document.getElementById("products-sandwichs"),
        boissons: document.getElementById("products-boissons"),
        glaces: document.getElementById("products-glaces")
    };

    Object.values(containers).forEach((container) => {
        if (container) {
            container.innerHTML = "";
        }
    });

    PRODUCTS.forEach((product) => {
        const container = containers[product.category];

        if (!container) {
            console.warn(
                `Catégorie inconnue pour ${product.name}: ${product.category}`
            );

            return;
        }

        container.appendChild(createProductCard(product));
    });
}

function addProductToTicket(productId) {
    const product = PRODUCTS.find((item) => item.id === productId);

    if (!product) {
        return;
    }

    const existingItem = ticket.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        ticket.push({
            ...product,
            quantity: 1
        });
    }

    renderTicket();
}

function calculateTotal() {
    return ticket.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}

function clearTicket() {
    ticket = [];
    renderTicket();
}

function renderTicket() {

    const ticketItems = document.getElementById("ticket-items");

    const ticketTotal = document.getElementById("ticket-total");

    const checkoutButton = document.getElementById("open-checkout");

    const itemCount = document.getElementById("ticket-count");

    if (!ticketItems || !ticketTotal) {

        return;

    }

    const total = calculateTotal();

    const totalQuantity = ticket.reduce((sum, item) => {

        return sum + item.quantity;

    }, 0);

    if (ticket.length === 0) {

        ticketItems.innerHTML = `

      <div class="ticket-empty">

        <span>Aucun produit</span>

        <small>Ajoutez des produits au ticket</small>

      </div>

    `;

        ticketTotal.textContent = formatPrice(0);

        if (itemCount) {

            itemCount.textContent = "0 article";

        }

        if (checkoutButton) {

            checkoutButton.textContent = "Encaisser";

            checkoutButton.disabled = true;

        }

        return;

    }

    ticketItems.innerHTML = ticket

        .map((item) => {

            const lineTotal = item.price * item.quantity;

            return `

        <button

          type="button"

          class="ticket-line"

          data-ticket-product-id="${item.id}"

        >

          <span class="ticket-line__quantity">

            ${item.quantity}×

          </span>

          <span class="ticket-line__content">

            <strong>${item.name}</strong>

            <small>${formatPrice(item.price)} l’unité</small>

          </span>

          <strong class="ticket-line__total">

            ${formatPrice(lineTotal)}

          </strong>

        </button>

      `;

        })

        .join("");

    ticketTotal.textContent = formatPrice(total);

    if (itemCount) {

        itemCount.textContent =

            `${totalQuantity} article${totalQuantity > 1 ? "s" : ""}`;

    }

    if (checkoutButton) {

        checkoutButton.textContent = `Encaisser • ${formatPrice(total)}`;

        checkoutButton.disabled = false;

    }

}

function initVente() {
    renderProducts();
    renderTicket();

    const clearButton = document.getElementById("clear-ticket");

    if (clearButton) {
        clearButton.addEventListener("click", clearTicket);
    }
}



