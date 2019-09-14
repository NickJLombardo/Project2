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

const displayByCategory = async (categoryAndClass, searchQuery) => {
  let [category, wrapper] = categoryAndClass;
  let url = `./api/${category}`;
  if (searchQuery) url += `?${searchQuery}`;
  let res = await fetch(url);
  categoryData = await res.json();
  let tHeadHtml = new String();
  let tBodyHtml = new String();
  categoryData.map((data, i) => {
    let tRowHtml = new String();
    let id;
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
        if (columnName === "id") id = data[columnName];
      }
    }
    tBodyHtml += categoryTableRow.replace("{%TROWDATA%}", tRowHtml);
    tBodyHtml = tBodyHtml.replace("{%DATAID%}", id);
  });
  let tableInnerHtml = categoryDataTable.replace("{%THEAD%}", tHeadHtml);
  tableInnerHtml = tableInnerHtml.replace("{%TBODY%}", tBodyHtml);
  document.querySelector(wrapper).innerHTML =
    invalidText + tableInnerHtml + updateBtn;
  let updateArr = new Array();
  let i = 0;
  let initialValue;
  let categoryApi;
  document.querySelectorAll(".input-text").forEach(inputText => {
    {
      inputText.addEventListener("focus", e => {
        initialValue = e.target.value;
      });
      inputText.addEventListener("focusout", e => {
        let id = parseInt(e.target.parentElement.parentElement.dataset.id);
        let columnName = e.target.dataset.column;
        let value = e.target.value;
        categoryApi =
          columnNameFormatter(columnName)
            .split(" ")[0]
            .toLowerCase() + "s";
        if (initialValue !== e.target.value) {
          let idArr = new Array();
          updateArr.map(update => idArr.push(update.id));
          console.log(idArr);
          if (idArr.includes(id)) {
            let index = idArr.indexOf(id);
            console.log(categoryApi);
            updateArr[index].categoryApi = categoryApi;
            updateArr[index][columnName] = value;
          } else {
            updateArr[i].categoryApi = categoryApi;
            updateArr[i] = { id, [columnName]: value };
            i++;
          }
        }
      });
    }
  });
  document
    .querySelector(".reservation-update-btn")
    .addEventListener("click", e => {
      let url = "/api/reservations/";
      console.log(updateArr);
      updateArr.map(updateData => {
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(updateData)
        })
          .then(res => res.json())
          .then(res => console.log(res));
      });
    });
};
