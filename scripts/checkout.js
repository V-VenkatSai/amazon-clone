import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsList } from "../data/products.js";

async function loadPage() {
  await loadProductsList();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
