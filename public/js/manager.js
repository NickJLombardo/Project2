const columnNameFormatter = columnName => {
  let captColumnName = columnName.toUpperCase();
  let indexArr = new Array();
  for (let i = 0; i < captColumnName.length; i++) {
    if (columnName[i] === captColumnName[i]) indexArr.push(i);
  }
  let formattedName = new String();
  let initIndex = 0;
  if (indexArr.length !== 0) {
    indexArr.map((index, i) => {
      formattedName += `${columnName.slice(initIndex, index)} `;
      initIndex = index;
    });
    return (
      formattedName[0].toUpperCase() +
      formattedName.slice(1) +
      columnName.slice(initIndex)
    );
  } else return columnName[0].toUpperCase() + columnName.slice(1);
};

const displayByCategory = async category => {
  let res = await fetch(`./api/${category}`);
  categoryData = await res.json();
  let tHeadHtml = new String();
  let tBodyHtml = new String();
  categoryData.map((data, i) => {
    let tRowHtml = new String();
    for (let columnName in data) {
      if (columnName !== "createdAt" && columnName !== "updatedAt") {
        if (i === 0)
          tHeadHtml += categoryTableHeadData.replace(
            "{%COLUMNNAME%}",
            columnName === "id" ? "No" : columnNameFormatter(columnName)
          );
        let tRowData = categoryTableData.replace("{%COLUMNNAME%}", columnName);
        tRowData = tRowData.replace(
          "{%DATA%}",
          data[columnName] === null ? "-" : data[columnName]
        );
        tRowHtml += tRowData;
      }
    }
    tBodyHtml += categoryTableRow.replace("{%TROWDATA%}", tRowHtml);
  });
  let tableInnerHtml = categoryDataTable.replace("{%THEAD%}", tHeadHtml);
  tableInnerHtml = tableInnerHtml.replace("{%TBODY%}", tBodyHtml);
  document.querySelector(
    ".category-details-wrapper"
  ).innerHTML = tableInnerHtml;
};

document.querySelectorAll(".category").forEach(categoryBtn =>
  categoryBtn.addEventListener("click", e => {
    displayByCategory(e.target.dataset.category);
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
