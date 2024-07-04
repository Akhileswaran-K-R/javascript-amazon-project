import { getOrder, getOrderProduct } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { loadHeader, updateCartQuantity } from "./header/header.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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

  const currentTime = dayjs()
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(product.estimatedDeliveryTime);

  const percentProgress = ((currentTime - orderTime)/(deliveryTime - orderTime)) * 100;

  const deliveredMessage = (currentTime < deliveryTime)?'Arriving on':'Delivered on'

  const trackInnerHTML=`
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${deliveredMessage} ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${product.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${(percentProgress < 50)?'current-status':''}">
        Preparing
      </div>
      <div class="progress-label ${(percentProgress >= 50 && percentProgress<100)?'current-status':''}">
        Shipped
      </div>
      <div class="progress-label ${(percentProgress>=100)?'current-status':''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style = "width: ${percentProgress}%"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking')
  .innerHTML = trackInnerHTML;
}