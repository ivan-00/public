"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initVente();
  initEncaissement();
  initRecap();
  initNavigation();
  updateCurrentDate();
  showPage("salePage", "Vente");
});

function initNavigation() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page, button.dataset.title);
    });
  });
}

function showPage(pageId, title = "") {
  const requestedPage = document.getElementById(pageId);

  if (!requestedPage) {
    console.error(`La page #${pageId} est introuvable.`);
    return;
  }

  document.querySelectorAll(".app-page").forEach((page) => {
    page.hidden = page.id !== pageId;
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    const isActive = button.dataset.page === pageId;
    button.classList.toggle("active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  const titleElement = document.getElementById("current-page-title");
  if (titleElement && title) {
    titleElement.textContent = title;
  }

  if (pageId === "recapPage" && typeof renderRecap === "function") {
    renderRecap();
  }
}

function updateCurrentDate() {
  const dateElement = document.getElementById("currentDate");
  if (!dateElement) return;

  dateElement.textContent = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
