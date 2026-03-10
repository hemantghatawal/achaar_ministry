const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter((p) => {
    const name = p.name[currentLang].toLowerCase();

    const keywords = p.keywords.join(" ");

    return name.includes(value) || keywords.includes(value);
  });

  renderProducts(filtered);
});
