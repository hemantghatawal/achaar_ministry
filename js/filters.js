async function loadCategories() {
  const res = await fetch("data/categories.json");

  const categories = await res.json();

  const container = document.getElementById("categories");

  categories.forEach((cat) => {
    const btn = document.createElement("button");

    btn.className = "category-btn";

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
