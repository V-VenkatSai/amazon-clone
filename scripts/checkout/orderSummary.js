import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOptions,
  calculateDeliveryDate,
} from "../../data/deliveryoptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += ` 
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${
    matchingProduct.id
  }">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${
                    matchingProduct.id
                  }">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${
                        matchingProduct.id
                      }">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${
                      matchingProduct.id
                    }" type="number" value="${cartItem.quantity}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                      matchingProduct.id
                    }">Save</span>
                    <span  class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                      matchingProduct.id
                    }" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `   
  <div class="delivery-option js-delivery-option" data-product-id="${
    matchingProduct.id
  }" data-delivery-option-id="${deliveryOption.id}">
    <input type="radio" ${isChecked ? "Checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>
  `;
    });

    return html;
  }

  if (cart.calculateCartQuantity() === 0) {
    document.querySelector(".js-order-summary").innerHTML = `
Your cart is empty. <br>
<a class="button-primary view-products-link" href="." data-testid="view-products-link">
      View products
</a>
`;
  } else {
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  }

  renderCheckoutHeader();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const newQuantity = parseInt(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      if (newQuantity === 0) {
        document.querySelector(".js-delete-link").click();
      } else if (newQuantity <= 0 || newQuantity > 1000) {
        alert("Quantity must be atleast 1 and less than 1000");
        return;
      }

      cart.updateQuantity(productId, newQuantity);
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;

      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      cart.removeFromCart(productId);

      renderOrderSummary();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  function emptyPage() {}
}
