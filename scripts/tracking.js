import { getOrder, getOrderProduct } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { loadHeader, updateCartQuantity } from "./header/header.js";

loadHeader();
updateCartQuantity();
loadPage();

async function loadPage(){

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getOrderProduct(order,productId);
  const matchingProduct = getProduct(productId);

  let trackInnerHTML=`
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on Monday, June 13
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${product.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
  .innerHTML = trackInnerHTML;
}