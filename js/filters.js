let categories = [];

async function loadCategories() {
  const res = await fetch("data/categories.json");
  categories = await res.json();

  renderCategories();
}

function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";

    // language aware
    btn.innerText = cat.name[currentLang];

    if (cat.id === "all") {
      btn.classList.add("is-selected");
    }

    btn.onclick = () => {
      document
        .querySelectorAll("#categories .category-btn")
        .forEach((categoryBtn) => categoryBtn.classList.remove("is-selected"));

      btn.classList.add("is-selected");

      if (cat.id === "all") {
        renderProducts(products);
      } else {
        const filtered = products.filter((p) => p.category === cat.id);

        renderProducts(filtered);
      }
    };

    container.appendChild(btn);
  });
}

loadCategories();
