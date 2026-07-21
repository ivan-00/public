"use strict";

const SALES_STORAGE_KEY = "caisse-mobile-sales";

function getSales() {

  try {

    return JSON.parse(

      localStorage.getItem(SALES_STORAGE_KEY) || "[]"

    );

  } catch (error) {

    console.error("Impossible de lire les ventes.", error);

    return [];

  }

}

function saveSale(sale) {

  const sales = getSales();

  sales.push(sale);

  localStorage.setItem(

    SALES_STORAGE_KEY,

    JSON.stringify(sales)

  );

}