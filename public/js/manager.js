document.querySelectorAll(".input-text").forEach(function(input) {
  input.addEventListener("dblclick", function(e) {
    e.target.innerHTML = dataInput;
    const insertHtml = () => {
      let parentElement = document.querySelector(".data-input").parentElement;
      console.log(parentElement);
      if (parentElement)
        parentElement.innerHTML = inputText.replace("{%INPUT%}", 1);
    };
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".data-input")) {
        insertHtml();
      }
      document.removeEventListener("click", function(e) {
        if (!e.target.closest(".data-input")) {
          insertHtml();
        }
      });
      // e.target.innerHTML = inputText;
    });
  });
});
