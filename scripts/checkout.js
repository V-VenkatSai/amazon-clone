import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
//import '../data/backend-practice.js';


async function loadPage(){
  try{
    // throw 'error1';
    await loadProductsFetch(); 
    //await loadCartFetch();
    const value = await new Promise((resolve,reject) => {
      //throw 'error2';
      loadCart(() => {
       // reject('error 3');
        resolve('value 3');
      });
  
    });
  }
  catch(error) {
    console.log('unexpected error. please try again later..');
  }
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

