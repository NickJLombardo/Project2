document.querySelectorAll(".food-category-link").forEach(linkBtn =>
  linkBtn.addEventListener("click", e => {
    localStorage.setItem("category", e.target.dataset.value);
  })
);
