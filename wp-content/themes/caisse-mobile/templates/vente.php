<header class="app-header">
    <div class="header-left">
        <h1>Ma caisse</h1>
        <h2 id="current-page-title" class="header-page-title">Vente</h2>
    </div>

    <div class="current-date" id="currentDate"></div>
</header>
<main class="app-content">

    <section id="salePage" class="app-page">

        <div class="pos-layout">

            <aside class="checkout-column">

                <section class="ticket-panel">

                    <div class="ticket-heading">
                        <h2>Ticket en cours</h2>

                        <button
                            type="button"
                            id="clear-ticket"
                            class="ticket-clear">
                            Supprimer
                        </button>
                    </div>

                    <div id="ticket-items" class="ticket-items">

                        <div class="ticket-empty">
                            <span>Aucun produit</span>
                            <small>Ajoutez des produits au ticket</small>
                        </div>

                    </div>

                </section>

                <section class="checkout-bottom">

                    <div class="ticket-summary">

                        <span id="ticket-count" class="ticket-count">
                            0 article
                        </span>

                        <div class="ticket-total">
                            <span>Total</span>
                            <strong id="ticket-total">0,00 €</strong>
                        </div>

                    </div>
                    <button
                        id="open-checkout"
                        class="primary-button"
                        type="button">
                        Encaisser
                    </button>

                </section>

            </aside>

            <section class="catalog-column">

                <div class="catalog-scroll">

                    <section class="product-category">
                        <h2>Glaces</h2>

                        <div
                            id="products-glaces"
                            class="product-grid"></div>
                    </section>

                    <section class="product-category">
                        <h2>Sandwichs</h2>

                        <div
                            id="products-sandwichs"
                            class="product-grid"></div>
                    </section>

                    <section class="product-category">
                        <h2>Boissons</h2>

                        <div
                            id="products-boissons"
                            class="product-grid"></div>
                    </section>
                </div>
            </section>
        </div>

    </section>

    <section id="historyPage" class="app-page" hidden>
        <!-- contenu de l'historique -->
    </section>
    <section id="settingsPage" class="app-page" hidden>
        <!-- contenu des paramètres -->
    </section>

</main>

<nav class="bottom-navigation">

    <button
        type="button"
        class="nav-button active"
        data-page="salePage"
        data-title="Vente">
        Vente
    </button>

    <button
        type="button"
        class="nav-button"
        data-page="historyPage"
        data-title="Historique">
        Historique
    </button>

    <button
        id="open-recap"
        type="button"
        class="nav-button"
        data-page="recapPage"
        data-title="Récapitulatif">
        Récapitulatif
    </button>

    <button
        type="button"
        class="nav-button"
        data-page="settingsPage"
        data-title="Paramètres">
        Paramètres
    </button>

</nav>