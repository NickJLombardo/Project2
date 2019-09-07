let menuItemContainer = document.querySelector(".menu-items-container");

const subCateArr = function(menus, menuCategory) {
  let subCategory = new Array();
  menus
    .filter(menu1 => menu1.menuCategory === menuCategory)
    .map(menu => {
      if (!subCategory.includes(menu.menuSubcategory))
        subCategory[menu.menuSubcategory] = menus
          .filter(
            item =>
              item.menuSubcategory === menu.menuSubcategory &&
              item.menuCategory === menu.menuCategory
          )
          .map(item => ({
            id: item["id"],
            menuName: item["menuName"],
            menuDescription: item["menuDescription"],
            menuPrice: item["menuPrice"]
          }));
    });

  return subCategory;
};

const getId = (node, className, dataset) => {
  for (; node !== document; node = node.parentNode) {
    if (node.className === className) return node.dataset[dataset];
  }
};

const displayMenu = async () => {
  const res = await fetch("./api/menus/");
  const menus = await res.json();
  let menusByCategory = [];
  menus.map(menu => {
    if (!Object.keys(menusByCategory).includes(menu.menuCategory))
      menusByCategory[menu.menuCategory] = Object.assign(
        {},
        subCateArr(menus, menu.menuCategory)
      );
  });
  for (let key in menusByCategory) {
    let menuCategoryDiv = document.createElement("div");
    let menuCategoryTitle = document.createElement("h2");
    menuCategoryTitle.textContent = key;
    menuCategoryDiv.appendChild(menuCategoryTitle);
    for (let subkey in menusByCategory[key]) {
      let menuSubcategoryDiv = document.createElement("div");
      let menuSubcategoryTitle = document.createElement("h3");
      menuSubcategoryTitle.textContent = subkey;
      menuSubcategoryDiv.appendChild(menuSubcategoryTitle);
      let menuItems = menusByCategory[key][subkey];
      menuItems.map(menuItem => {
        const { id, menuName, menuPrice, menuDescription } = menuItem;
        let menuItemDiv = document.createElement("div");
        menuItemDiv.setAttribute("data-id", id);
        menuItemDiv.setAttribute("data-name", menuName);
        menuItemDiv.setAttribute("data-price", menuPrice);
        menuItemDiv.classList = "menu-item";
        let menuNameP = document.createElement("p");
        let menuPriceP = document.createElement("p");
        let menuDescriptionP = document.createElement("p");
        let br = document.createElement("br");
        menuNameP.textContent = menuName;
        menuPriceP.textContent = menuPrice;
        menuDescriptionP.textContent = menuDescription;
        menuItemDiv.appendChild(menuNameP);
        menuItemDiv.appendChild(menuPriceP);
        menuItemDiv.appendChild(menuDescriptionP);
        menuSubcategoryDiv.appendChild(menuItemDiv);
        menuSubcategoryDiv.appendChild(br);
      });
      menuCategoryDiv.appendChild(menuSubcategoryDiv);
    }
    menuItemContainer.appendChild(menuCategoryDiv);
  }
  document.querySelectorAll(".menu-item").forEach(menuItem =>
    menuItem.addEventListener("click", e => {
      let cartItems = [];
      let id = getId(e.target, "menu-item", "id");
      let name = getId(e.target, "menu-item", "name");
      let price = getId(e.target, "menu-item", "price");
      let quantity = 1;
      if (localStorage.getItem("cartItems"))
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
      cartItems.push(Object.assign({}, { id, name, price, quantity }));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log();
    })
  );
};

displayMenu();
