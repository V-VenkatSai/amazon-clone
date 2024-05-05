import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
//import '../data/backend-practice.js';


async function loadPage(){
 await loadProductsFetch(); 
 await loadCartFetch();
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
/*
Promise.all([
  
  loadProductsFetch(),
  new Promise((resolve) => {

    loadCart(() => {
      resolve();
    });

  })

]).then(() => {
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/

/*
new Promise((resolve) => {

  loadProducts(() => {
    resolve();
  });

}).then(() => {

  return new Promise((resolve) => {

    loadCart(() => {
      resolve();
    });

  });

}).then(() => {
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

});
*/


// loadProducts(() => {

//   loadCart(() => {

//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();

//   }) 

// });

