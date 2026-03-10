let translations = {};

async function loadLanguage(lang) {
  const res = await fetch(`i18n/${lang}.json`);

  translations = await res.json();

  applyTranslations();

  localStorage.setItem("lang", lang);

  currentLang = lang;

  renderProducts(products);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");

    if (translations[key]) {
      el.innerText = translations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");

    if (translations[key]) {
      el.placeholder = translations[key];
    }
  });
}

document.getElementById("lang-hi").onclick = () => {
  loadLanguage("hi");
  renderCategories();
};

document.getElementById("lang-en").onclick = () => {
  loadLanguage("en");
  renderCategories();
};

const savedLang = localStorage.getItem("lang") || "hi";

loadLanguage(savedLang);
