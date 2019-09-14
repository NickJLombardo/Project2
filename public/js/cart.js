const stripe = Stripe("pk_test_BUkd0ZXAj6m0q0jMyRgBxNns00PPtgvjjr", {
  betas: ["checkout_beta_4"]
});
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

const checkoutSession = async (name, price) => {
  try {
    let session = await fetch(
      `/api/bookings/checkout-session/${name}/${price}`
    );
    session = await session.json();
    await stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your SKU
        { ["name"]: name, ["price"]: price }
      ],
      successUrl: "https://your-website.com/success",
      cancelUrl: "https://your-website.com/canceled"
      // sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert("error", err);
  }
};
// checkoutSession("min", 100);

const textReplace = (cartFormat, item, idx, x) => {
  const { id, name, price, quantity } = item;
  let output = cartFormat.replace(`{%ID%}`, idx);

  output = output.replace("{%NAME%}", name);
  output = output.replace("{%PRICE%}", price.toFixed(2));
  output = output.replace("{%QUANTITY%}", quantity);
  output = output.replace(/{%DATAID%}/g, id);
  output = output.replace("{%X%}", x);
  return output;
};

let currentCart = JSON.parse(localStorage.getItem("cartItems"));
if (!currentCart) currentCart = new Array();

const displayCart = currentCart => {
  let innerHtmlText = currentCart
    .map((item, i) => {
      return textReplace(cartFormat, item, i + 1, "X");
    })
    .join("");
  document.querySelector(".cart-item-table-body").innerHTML =
    innerHtmlText + additionalCartRow;
};

const updateCartItems = (id, quantity) => {
  currentCart.forEach(cartItem => {
    if (cartItem.id === id) cartItem.quantity = quantity;
    localStorage.setItem("cartItems", JSON.stringify(currentCart));
  });
};

const getCurrentSubtotalPrice = currentItemQuantity => {
  let itemPriceArr = [];
  document.querySelectorAll(".cart-item-price").forEach((cartItem, i) => {
    cartItem.textContent = (
      parseFloat(
        document.querySelectorAll(".cart-item-unit-price")[i].textContent
      ) * parseFloat(currentItemQuantity[i].value)
    ).toFixed(2);
    itemPriceArr.push(parseFloat(cartItem.textContent));
  });
  let totalBeforeTaxes = itemPriceArr.reduce((x, y) => x + y);
  let taxes = totalBeforeTaxes * 0.08;
  document.querySelector(".cart-taxes").textContent = taxes.toFixed(2);
  document.querySelector(".cart-total").textContent = (
    totalBeforeTaxes + taxes
  ).toFixed(2);
};

const noItemDisplay = () => {
  let item = { id: "", name: "No Item", price: 0, quantity: 0 };
  document.querySelector(".cart-item-table-body").innerHTML =
    textReplace(cartFormat, item, "", "") + additionalCartRow;
};

const onClickFunction = currentItemQuantity => {
  document.querySelectorAll(".decreaseByOne").forEach((btn, i) =>
    btn.addEventListener("click", e => {
      let currentValue = currentItemQuantity[i].value;
      let currentId = currentItemQuantity[i].parentElement.dataset.id;
      if (currentValue !== "1") {
        currentItemQuantity[i].value = parseInt(currentValue) - 1;
        getCurrentSubtotalPrice(currentItemQuantity);
      }
      updateCartItems(currentId, parseInt(currentItemQuantity[i].value));
    })
  );
  document.querySelectorAll(".increaseByOne").forEach((btn, i) =>
    btn.addEventListener("click", e => {
      let currentValue = currentItemQuantity[i].value;
      let currentId = currentItemQuantity[i].parentElement.dataset.id;
      currentItemQuantity[i].value = parseInt(currentValue) + 1;
      getCurrentSubtotalPrice(currentItemQuantity);
      updateCartItems(currentId, parseInt(currentItemQuantity[i].value));
    })
  );
  currentItemQuantity.forEach(qty =>
    qty.addEventListener("focusout", e => {
      if (e.target.value < 1) {
        e.target.value = 1;
        e.target.textContent = 1;
      }
    })
  );
  document.querySelectorAll(".remove-btn").forEach(removeBtn =>
    removeBtn.addEventListener("click", e => {
      setTimeout(() => e.target.blur(), 500);
      currentCart.map((cartItem, i) => {
        if (cartItem.id === e.target.dataset.id) {
          currentCart.splice(i, 1);
        }
      });
      cartdisplay(currentCart);
      localStorage.setItem("cartItems", JSON.stringify(currentCart));
    })
  );
  // document.querySelector(".order-btn").addEventListener("click", e => {
  //   setTimeout(() => e.target.blur(), 500);
  //   console.log(e.target);
  // });
};

const cartdisplay = currentCart => {
  if (currentCart.length === 0) {
    noItemDisplay();
  } else {
    displayCart(currentCart);
    const currentItemQuantity = document.querySelectorAll(
      ".current-item-quantity"
    );
    getCurrentSubtotalPrice(currentItemQuantity);
    onClickFunction(currentItemQuantity);
  }
  document.querySelector(".check-out-btn").addEventListener("click", e => {
    setTimeout(() => e.target.blur(), 500);
    let totalPrice = document.querySelector(".cart-total").textContent;
    let email = document.querySelector(".email-input").value;
    if (parseInt(totalPrice) === 0)
      document.querySelector(".invalid-text").textContent =
        "Add items before checkout";
    else {
      if (!email)
        document.querySelector(".invalid-text").textContent =
          "Enter your email to checkout";
      else {
        document.querySelector(".invalid-text").textContent = "";
        console.log(totalPrice, email);
        checkoutSession(email, totalPrice);
      }
    }
  });
};

cartdisplay(currentCart);
document.querySelector(".empty-cart-btn").addEventListener("click", e => {
  noItemDisplay();
  localStorage.setItem("cartItems", JSON.stringify([]));
  document.querySelector(".invalid-text").textContent = "";
});
