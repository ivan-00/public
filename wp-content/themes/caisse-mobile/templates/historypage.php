<main class="app-content">
<section id="historyPage" class="app-page" hidden>

    <div class="history-toolbar">

        <label for="history-date">

            Date

        </label>

        <input

            type="date"

            id="history-date"

            class="history-date">

    </div>

    <div id="history-summary" class="history-summary">

        0 vente

    </div>

    <div id="history-list" class="history-list">

        <div class="history-empty">

            Aucune vente enregistrée

        </div>

    </div>
<div id="ticket-modal" class="ticket-modal" hidden>

    <div class="ticket-modal__overlay" data-close-ticket-modal></div>

    <div class="ticket-modal__content">

        <button
            type="button"
            class="ticket-modal__close"
            data-close-ticket-modal
            aria-label="Fermer"
        >
            ×
        </button>

        <div class="ticket-modal__header">
            <h3>Détail du ticket</h3>
            <span id="ticket-modal-number"></span>
        </div>

        <div class="ticket-modal__meta">

            <div>
                <span>Date et heure</span>
                <strong id="ticket-modal-date">-</strong>
            </div>

            <div>
                <span>Paiement</span>
                <strong id="ticket-modal-payment">-</strong>
            </div>

        </div>

        <div
            id="ticket-modal-items"
            class="ticket-modal__items"
        ></div>

        <div class="ticket-modal__totals">

            <div>
                <span>Total</span>
                <strong id="ticket-modal-total">0,00 €</strong>
            </div>

            <div id="ticket-modal-received-row">
                <span>Montant reçu</span>
                <strong id="ticket-modal-received">0,00 €</strong>
            </div>

            <div id="ticket-modal-change-row">
                <span>Monnaie rendue</span>
                <strong id="ticket-modal-change">0,00 €</strong>
            </div>

        </div>

    </div>

</div>
</section>
</main>
