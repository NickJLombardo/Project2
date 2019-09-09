let cartFormat = `<tr class="cart-item-table-body-row">
            <td class="cart-item-table-data">
              <button class="remove-btn" data-id="{%DATAID%}">{%X%}</button>
            </td>
            <td class="cart-item-table-data text-center">{%ID%}</td>
            <td class="cart-item-table-data">{%NAME%}</td>
            <td
              class="cart-item-table-data cart-item-table-data-number cart-item-unit-price"
            >
              {%PRICE%}
            </td>
            <td class="cart-item-table-data">
              <div class="quantity" data-id="{%DATAID%}">
                <span class="operator decreaseByOne"> - </span>
                <input type="number" value="{%QUANTITY%}" class="current-item-quantity" />
                <span class="operator increaseByOne"> + </span>
              </div>
            </td>
            <td
              class="cart-item-table-data cart-item-table-data-number cart-item-price"
            >0.00
            </td>
          </tr>`;
let additionalCartRow = `<tr class="cart-item-table-body-row taxes-row">
            <td></td>
            <td></td>
            <td class="cart-item-table-data">Taxes (Based on the current location)</td>
            <td></td>
            <td></td>
            <td
              class="cart-item-table-data cart-item-table-data-number cart-taxes"
            >0.00</td>
          </tr>
          <tr class="cart-item-table-body-row">
            <td></td>
            <td></td>
            <td class="cart-item-table-data">Total</td>
            <td></td>
            <td></td>
            <td
              class="cart-item-table-data cart-item-table-data-number cart-total"
            >0.00</td>
          </tr>
          <tr class="cart-item-table-body-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="cart-item-table-data">
              <button class="order-btn btn">Order</button>
            </td>
          </tr>
          <tr class="cart-item-table-body-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="cart-item-table-data">
              <button class="check-out-btn btn">Check Out</button>
            </td>
          </tr>`;
