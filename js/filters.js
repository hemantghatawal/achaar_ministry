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

    btn.onclick = () => {
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
