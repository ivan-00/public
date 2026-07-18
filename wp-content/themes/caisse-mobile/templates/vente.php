<section id="page-vente" class="app-page app-page--active">

    <header class="app-header">
        <h1>Ma caisse</h1>
    </header>

    <div class="pos-layout">

        <aside class="checkout-column">

            <section class="ticket-panel">
                <div class="ticket-heading">
                    <h2>Ticket en cours</h2>
                    <button type="button" class="ticket-clear">Supprimer</button>
                </div>

                <div id="ticket-items" class="ticket-items">
                    <div class="ticket-empty">
                        <span>Aucun produit</span>
                        <small>Ajoutez des produits au ticket</small>
                    </div>
                </div>
            </section>

            <section class="checkout-bottom">

                <div class="ticket-total">
                    <span>Total</span>
                    <strong id="ticket-total">0,00 €</strong>
                </div>

                <div class="numeric-keypad">
                    <button type="button">7</button>
                    <button type="button">8</button>
                    <button type="button">9</button>
                    <button type="button">⌫</button>

                    <button type="button">4</button>
                    <button type="button">5</button>
                    <button type="button">6</button>
                    <button type="button">+</button>

                    <button type="button">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">−</button>

                    <button type="button">0</button>
                    <button type="button">00</button>
                    <button type="button">,</button>
                    <button type="button" class="key-clear">C</button>
                </div>

              <button

    id="open-checkout"

    class="primary-button"

    type="button"

>

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
                        class="product-grid"
                    ></div>
                </section>

                <section class="product-category">
                    <h2>Sandwichs</h2>
                    <div
                        id="products-sandwichs"
                        class="product-grid"
                    ></div>
                </section>

                <section class="product-category">
                    <h2>Boissons</h2>
                    <div
                        id="products-boissons"
                        class="product-grid"
                    ></div>
                </section>

            </div>

            <nav class="bottom-navigation">
                <button type="button">Vente</button>
                <button type="button">Historique</button>
                <button type="button">Récapitulatif</button>
                <button type="button">Paramètres</button>
            </nav>

        </section>

    </div>

</section>


