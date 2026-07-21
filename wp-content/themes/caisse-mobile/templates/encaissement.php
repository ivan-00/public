<header class="top-header">
    <h1>Ma caisse</h1>
    <div class="header-date" id="currentDate"></div>
</header>
<section id="page-encaissement" class="app-page" hidden>

    <header class="app-header checkout-header">
        <button
            id="back-to-sale"
            class="icon-button"
            type="button"
            aria-label="Retour à la vente"
        >
            ←
        </button>

        <h1>Encaissement</h1>
    </header>
    <div class="checkout-layout">

        <section class="checkout-summary">

            <div class="checkout-card">
                <h2>Ticket en cours</h2>

                <div id="checkout-ticket-items"></div>
            </div>

            <div class="checkout-card checkout-total-card">
                <span>Total</span>

                <strong id="checkout-total">
                    0,00 €
                </strong>
            </div>

        </section>

        <section class="payment-panel">

            <div class="checkout-card">
                <h2>Méthode de paiement</h2>

                <button
                    class="payment-method payment-method--active"
                    data-payment-method="cash"
                    type="button"
                >
                    <span class="payment-method__icon">💶</span>

                    <span class="payment-method__content">
                        <strong>Espèces</strong>
                        <small>Paiement en espèces</small>
                    </span>

                    <span class="payment-method__check"></span>
                </button>

                <button
                    class="payment-method"
                    data-payment-method="card"
                    type="button"
                >
                    <span class="payment-method__icon">💳</span>

                    <span class="payment-method__content">
                        <strong>Carte bancaire</strong>
                        <small>Paiement par carte</small>
                    </span>

                    <span class="payment-method__check"></span>
                </button>
            </div>

            <button
                id="open-amount-modal"
                class="received-card"
                type="button"
            >
                <span>
                    <small>Montant reçu</small>

                    <strong id="received-amount">
                        0,00 €
                    </strong>
                </span>

                <span>✎</span>
            </button>

            <div class="checkout-card change-preview">
                <small>Rendu monnaie</small>

                <strong id="change-preview">
                    0,00 €
                </strong>
            </div>

            <button
                id="confirm-payment"
                class="primary-button checkout-button"
                type="button"
            >
                Encaisser
                <span id="payment-button-total">0,00 €</span>
            </button>

        </section>

    </div>

    <div id="amount-modal" class="modal" hidden>

        <div
            class="modal__backdrop"
            data-close-amount-modal
        ></div>

        <section class="modal__content amount-modal-content">

            <div class="modal-header">
                <h2>Montant reçu</h2>

                <button
                    id="close-amount-modal"
                    type="button"
                    aria-label="Fermer"
                >
                    ×
                </button>
            </div>

            <strong id="amount-input-display">
                0,00 €
            </strong>

            <div id="amount-keypad" class="amount-keypad">

                <button type="button" data-key="7">7</button>
                <button type="button" data-key="8">8</button>
                <button type="button" data-key="9">9</button>
                <button type="button" data-key="backspace">⌫</button>

                <button type="button" data-key="4">4</button>
                <button type="button" data-key="5">5</button>
                <button type="button" data-key="6">6</button>
                <button type="button" data-key="10">10 €</button>

                <button type="button" data-key="1">1</button>
                <button type="button" data-key="2">2</button>
                <button type="button" data-key="3">3</button>
                <button type="button" data-key="20">20 €</button>

                <button type="button" data-key="0">0</button>
                <button type="button" data-key="00">00</button>
                <button type="button" data-key="clear" class="key-clear">
                    C
                </button>
                <button type="button" data-key="50">50 €</button>

            </div>

            <button
                id="confirm-amount"
                class="primary-button"
                type="button"
            >
                Valider le montant
            </button>

        </section>

    </div>

</section>