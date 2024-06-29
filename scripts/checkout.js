import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

new Promise((resolve) => {
  console.log('start promise')
  loadProducts(() => {
    console.log('finished laoding');
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
/*
loadProducts(() => {                               //using call back(function inside fn)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});*/
