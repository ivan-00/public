<section id="recapPage" class="app-page" hidden>

    <div class="recap-content">

        <section class="recap-toolbar recap-card">
            <label for="recap-date">Journée affichée</label>
            <input id="recap-date" type="date">
        </section>

        <div class="recap-summary-grid">
            <section class="recap-card">
                <span>Chiffre d’affaires</span>
                <strong id="recap-revenue">0,00 €</strong>
            </section>

            <section class="recap-card">
                <span>Nombre de ventes</span>
                <strong id="recap-sales-count">0</strong>
            </section>
        </div>

        <section class="recap-card">
            <h2>Paiements du jour</h2>

            <div class="recap-row">
                <span>Espèces</span>
                <strong id="recap-cash">0,00 €</strong>
            </div>

            <div class="recap-row">
                <span>Carte bancaire</span>
                <strong id="recap-card">0,00 €</strong>
            </div>
        </section>

        <section class="recap-card">
            <h2>Produits vendus</h2>
            <div id="recap-products-list" class="recap-products-list"></div>
        </section>

        <section class="recap-card">
            <h2>Historique des paiements de la journée</h2>
            <div id="recap-payment-history" class="recap-payment-history"></div>
        </section>

    </div>

</section>
