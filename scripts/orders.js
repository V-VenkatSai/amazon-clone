import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsList } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { formatDateMonth } from "../data/deliveryoptions.js";
import { renderHeaderSummary } from "./shared/header.js";

async function loadOrderPage() {
  await loadProductsList();
  renderHeaderSummary();
  orderRenderSummary();
}

loadOrderPage();

function orderRenderSummary() {
  let renderHTML = "";

  orders.forEach((orderList) => {
    renderHTML += `<div class="order-container">
    <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${formatDateMonth(orderList.orderTime)}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatCurrency(orderList.totalCostCents)}</div>
      </div>
    </div>
    
    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${orderList.id}</div>
    </div>
    </div>
    ${orderItems(orderList.products, orderList)}
    </div>`;
  });

  document.querySelector(".js-orders-grid").innerHTML = renderHTML;
  function orderItems(orderItemsList, orderList) {
    let orderItems = "";

    orderItemsList.forEach((orderItem) => {
      const productId = orderItem.productId;

      let matchingProduct = getProduct(productId);

      orderItems += `
  
  <div class="order-details-grid">
  <div class="product-image-container">
    <img src="${matchingProduct.image}">
  </div>
  
  <div class="product-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
      Arriving on: ${formatDateMonth(orderItem.estimatedDeliveryTime)}
    </div>
    <div class="product-quantity">
      Quantity: ${orderItem.quantity}
    </div>
    <button class="buy-again-button button-primary js-button-primary" data-product-id = ${
      orderItem.productId
    }>
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
    </button>
  </div>
  
  <div class="product-actions">
    <a href="tracking.html?orderId=${orderList.id}&productId=${
        orderItem.productId
      }">
      <button class="track-package-button button-secondary" data-product-id = ${
        orderItem.productId
      }>
        Track package
      </button>
    </a>
  </div>
  </div>`;
    });

    return orderItems;
  }

  document.querySelectorAll(".js-button-primary").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      updateCartQuantity();
    });
  });

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    document.querySelector(".js-cart-quantity-mobile").innerHTML = cartQuantity;
  }
}
