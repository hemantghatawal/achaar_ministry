let translations = {};

function updateLanguageToggle() {
  const toggleBtn = document.getElementById("lang-toggle");

  if (!toggleBtn) {
    return;
  }

  // Show only the language the user can switch to.
  toggleBtn.innerText = currentLang === "en" ? "हिंदी" : "English";
}

async function loadLanguage(lang) {
  const res = await fetch(`i18n/${lang}.json`);

  translations = await res.json();
  currentLang = lang;

  applyTranslations();
  updateLanguageToggle();

  localStorage.setItem("lang", lang);

  renderProducts(products);
  renderCategories();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");

    if (translations[key]) {
      if (key === "tagline") {
        const items = translations[key]
          .split(/\s*(?:•|â€¢)\s*/)
          .map((item) => item.trim())
          .filter(Boolean);
        el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
      } else {
        el.innerText = translations[key];
      }
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");

    if (translations[key]) {
      el.placeholder = translations[key];
    }
  });
}

document.getElementById("lang-toggle").onclick = () => {
  const nextLang = currentLang === "en" ? "hi" : "en";
  loadLanguage(nextLang);
};

const savedLang = localStorage.getItem("lang") || "hi";

loadLanguage(savedLang);
