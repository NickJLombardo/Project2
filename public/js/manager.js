document.querySelectorAll(".category").forEach(categoryBtn =>
  categoryBtn.addEventListener("click", e => {
    displayByCategory([e.target.dataset.category, ".category-details-wrapper"]);
  })
);

document.querySelectorAll(".input-text").forEach(function(input) {
  input.addEventListener("dblclick", function(e) {
    e.target.innerHTML = dataInput;
    const insertHtml = () => {
      let parentElement = document.querySelector(".data-input").parentElement;
      if (parentElement !== null)
        parentElement.innerHTML = inputText.replace("{%INPUT%}", 1);
    };
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".data-input")) {
        insertHtml();
        removeClickEvent();
      }
      // e.target.innerHTML = inputText;
    });
    const removeClickEvent = () =>
      document.removeEventListener("click", function(e) {
        if (!e.target.closest(".data-input")) {
          insertHtml();
          removeClickEvent();
        }
      });
  });
});
