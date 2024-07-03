import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage(){
  try{
    //throw 'error1';
    await Promise.all([
      await loadProductsFetch(),          //await works only with promises
      await loadCartFetch()
    ]);

  } catch(error) {
    console.log('Unexpected error. Please try again later'); 
  }

  

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
loadProductsFetch().then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/


/*
loadProducts(() => {                               //using call back(function inside fn)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});*/
