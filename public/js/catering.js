const menuItemContainer = document.querySelector(
  ".catering-menu-items-container"
);
let menuItemCategoryHtml = `<div class="catering-menu-item-category-wrapper">
        <h2 class="catering-menu-title">{%CATEGORY%}</h2>
        <div class="menu-items-wrapper">
          {%SUBCATEGORIES%}
        </div> 
      </div>`;
let menuItemSubategoryHtml = `<div class="menu-item-subcategory-wrapper">
          <h3 class="catering-menu-sub-title">{%SUBCATEGORY%}</h3>
          <hr />
          {%MENUITEMS%}
        </div>`;
let menuItemHtml = `<div class="menu-item" data-id="{%ID%}" data-name="{%NAME%}" data-price="{%PRICE%}" data-min-order="{%MINORDER%}">
            <div class="menu-item-title-price-wrapper">
              <p>{%NAME%}</p>
              <p>$ {%PRICE%}</p>
            </div>
            <hr>  
            <p class="menu-item-description">{%DESCRIPTION%}</p>
            {%HR%}
            <div class="menu-item-details-wrapper">
              <p>Minimun Order - {%MINORDER%}</p>           
            </div>
          </div>`;
let menusByCategory = [];

const getId = (node, className) => {
  for (; node !== document; node = node.parentNode) {
    if (node.className === className) return node.dataset.id;
  }
};

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
            id: item.id,
            menuName: item.menuName,
            menuDescription: item.menuDescription,
            menuPrice: item.menuPrice,
            menuCateringMinOrder: item.menuCateringMinOrder
          }));
    });
  return subCategory;
};

const textReplace = (cartFormat, item) => {
  const {
    id,
    menuName,
    menuPrice,
    menuDescription,
    menuCateringMinOrder
  } = item;
  let output = cartFormat.replace(/{%ID%}/g, id);
  output = output.replace(/{%NAME%}/g, menuName);
  output = output.replace(/{%PRICE%}/g, menuPrice.toFixed(2));
  output = output.replace(
    /{%DESCRIPTION%}/g,
    menuDescription === null ? "" : menuDescription
  );
  output = output.replace("{%HR%}", menuDescription === null ? "" : "<hr>");
  output = output.replace(/{%MINORDER%}/g, menuCateringMinOrder);
  return output;
};

const creatingInnerHtml = menusBySubCategory => {
  let menuItemSubategoryInnerHtml = "";
  for (let subcategory in menusBySubCategory) {
    let menuItems = menusBySubCategory[subcategory];
    let menuItemHtmlText = menuItems
      .map(menuItem => {
        return textReplace(menuItemHtml, menuItem);
      })
      .join("");
    let menuItemSubategoryHtmlText = menuItemSubategoryHtml.replace(
      "{%SUBCATEGORY%}",
      subcategory
    );
    menuItemSubategoryHtmlText = menuItemSubategoryHtmlText.replace(
      "{%MENUITEMS%}",
      menuItemHtmlText
    );
    menuItemSubategoryInnerHtml += menuItemSubategoryHtmlText;
  }
  return menuItemSubategoryInnerHtml;
};

const filteringMenus = (menus, menuCategoryInput) => {
  menus.map(menu => {
    if (!Object.keys(menusByCategory).includes(menu.menuCategory))
      menusByCategory[menu.menuCategory] = Object.assign(
        {},
        subCateArr(menus, menu.menuCategory)
      );
  });
  let menuItemContainerInnerHtml = "";
  if (menuCategoryInput) {
    menus = menus.filter(menu => menu.menuCategory === menuCategoryInput);
    let filteredMenuItemCategoryHtmlText = menuItemCategoryHtml.replace(
      "{%CATEGORY%}",
      menuCategoryInput
    );
    let filteredMenuItemSubategoryInnerHtml = creatingInnerHtml(
      menusByCategory[menuCategoryInput]
    );

    filteredMenuItemCategoryHtmlText = filteredMenuItemCategoryHtmlText.replace(
      "{%SUBCATEGORIES%}",
      filteredMenuItemSubategoryInnerHtml
    );
    menuItemContainer.innerHTML = filteredMenuItemCategoryHtmlText;
  } else {
    for (let category in menusByCategory) {
      let menuItemCategoryHtmlText = menuItemCategoryHtml.replace(
        "{%CATEGORY%}",
        category
      );
      let menuItemSubategoryInnerHtml = creatingInnerHtml(
        menusByCategory[category]
      );

      menuItemCategoryHtmlText = menuItemCategoryHtmlText.replace(
        "{%SUBCATEGORIES%}",
        menuItemSubategoryInnerHtml
      );
      menuItemContainerInnerHtml += menuItemCategoryHtmlText;
    }
    menuItemContainer.innerHTML = menuItemContainerInnerHtml;
  }
  document.querySelectorAll(".menu-item-add-to-cart").forEach(menuItem =>
    menuItem.addEventListener("click", e => {
      e.target.blur();
      let cartItems = [];
      let id = e.target.dataset.id;
      let name = e.target.dataset.name;
      let price = parseFloat(e.target.dataset.price);
      let quantity = parseInt(e.target.dataset.quantity);
      if (localStorage.getItem("cartItems"))
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
      cartItems.push(Object.assign({}, { id, name, price, quantity }));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    })
  );
  const currentMenuItem = document.querySelector(".current-menu-item");
  const currentItem = document.querySelector(".current-item");
  const menuItem = document.querySelectorAll(".menu-item");
  const currentItemQuantity = document.querySelector(".current-item-quantity");
  menuItem.forEach(menuItem =>
    menuItem.addEventListener("click", e => {
      let className = "menu-item";
      let node = e.target;
      let id = getId(node, className);
      currentMenuItem.setAttribute("id", id);
    })
  );
};

const displayMenu = async () => {
  const res = await fetch("./api/menus/");
  const menus = await res.json();
  filteringMenus(menus);
  document.querySelectorAll(".catering-category-btn").forEach(categoryBtn =>
    categoryBtn.addEventListener("click", e => {
      e.target.blur();
      filteringMenus(menus, e.target.dataset.category);
    })
  );
};

displayMenu();
