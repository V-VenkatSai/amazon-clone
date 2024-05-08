import { orders } from "../data/orders.js";
import { formatDateWeekday } from "../data/deliveryoptions.js";
import { getProduct, loadProductsList } from "../data/products.js";
import { renderHeaderSummary } from "./shared/header.js";

async function loadTrackingPage() {
  await loadProductsList();
  renderHeaderSummary();
  renderTrackingSummary();
}

loadTrackingPage();

function renderTrackingSummary() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const currentTime = Date.now();
  let orderTime;
  let deliveryTime;

  let renderHTML = "";

  orders.forEach((orderList) => {
    if (orderList.id === orderId) {
      orderTime = Date.parse(orderList.orderTime);
      orderList.products.forEach((matchingItem) => {
        if (matchingItem.productId === productId) {
          const matchingProduct = getProduct(matchingItem.productId);

          const estimatedDeliveryTime = formatDateWeekday(
            matchingItem.estimatedDeliveryTime
          );
          deliveryTime = Date.parse(matchingItem.estimatedDeliveryTime);
          const deliveryDateMessage =
            Date.now() < deliveryTime
              ? `Arriving on ${estimatedDeliveryTime}`
              : `Delivered on ${estimatedDeliveryTime}`;
          renderHTML += `<a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            ${deliveryDateMessage}
            </div>

            <div class="product-info">
            ${matchingProduct.name}
            </div>

            <div class="product-info">
            Quantity: ${matchingItem.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            ${calculateProgressBar(currentTime, orderTime, deliveryTime)}`;
        }
      });
    }
  });

  document.querySelector(".js-order-tracking").innerHTML = renderHTML;
}

function calculateProgressBar(currentTime, orderTime, deliveryTime) {
  const progress =
    ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  let progressPercentage = Math.ceil(progress);

  if (progressPercentage <= 5) {
    progressPercentage = 5;
  } else if (progressPercentage >= 100) {
    progressPercentage = 100;
  }

  setTimeout(() => {
    document.querySelector(
      ".progress-bar"
    ).style.width = `${progressPercentage}%`;
  }, 400);

  const renderProgress = `

  <div class="progress-labels-container">
    <div class="progress-label
    ${renderCheckStatus(progressPercentage, "Preparing")}">
    Preparing
    </div>
    <div class="progress-label
    ${renderCheckStatus(progressPercentage, "Shipped")}">
    Shipped
    </div>
    <div class="progress-label
    ${renderCheckStatus(progressPercentage, "Delivered")}">
    Delivered
    </div>
  </div>

  <div class="progress-bar-container">
  <div class="progress-bar"></div>
  </div>`;

  return renderProgress;
}

function renderCheckStatus(progressPercentage, value) {
  let status;

  if (progressPercentage === 100) {
    status = "Delivered";
  } else if (progressPercentage > 50) {
    status = "Shipped";
  } else {
    status = "Preparing";
  }

  if (status === value) {
    return "current-status";
  } else {
    return "";
  }
}
