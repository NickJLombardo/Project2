document.querySelectorAll(".food-category-link").forEach(linkBtn =>
  linkBtn.addEventListener("click", e => {
    console.log(e.target.dataset.value);
    localStorage.setItem("category", e.target.dataset.value);
  })
);
