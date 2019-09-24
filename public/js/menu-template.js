let menuItemContainer = document.querySelector(".menu-items-container");
let menuItemCategoryHtml = `<div class="menu-item-category-wrapper">
        <h2>{%CATEGORY%}</h2>
        <div class="menu-item-subcategories-wrapper">
          {%SUBCATEGORIES%}
        </div> 
      </div>`;
let menuItemSubategoryHtml = `<div class="menu-item-subcategory-wrapper">
          <h3>{%SUBCATEGORY%}</h3>
          <hr />
          {%MENUITEMS%}
        </div>`;
let menuItemHtml = `<div class="menu-item">
            <div class="menu-item-details-wrapper">
              <p>{%NAME%}</p>
              <p>$ {%PRICE%}</p>
            </div>
            <div class="menu-item-details-wrapper">
              <p class="menu-item-description">{%DESCRIPTION%}</p>
              <button class="menu-item-add-to-cart" data-id="{%ID%}" data-name="{%NAME%}" data-price="{%PRICE%}" data-quantity="{%QUANTITY%}">Add To Cart</button>
            </div>
          </div>`;
