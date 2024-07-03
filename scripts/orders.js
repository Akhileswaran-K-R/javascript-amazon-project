import { cart} from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let orderInnerHTML;
renderOrderPage();

export async function renderOrderPage(){

  await loadProductsFetch();

  orderInnerHTML='';
  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    orderInnerHTML+=`
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>
                $${formatCurrency(order.totalCostCents)}
              </div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsOrder(order)}
        </div>
      </div>
    `;
  });
  localStorage.removeItem('cart-oop');
  cart.cartItems=[];
  document.querySelector('.js-order-grid')
  .innerHTML = orderInnerHTML;


  function productsOrder(order){

    let orderProductsHTML='';
    order.products.forEach((product) => {
      
      const {productId} = product;
      const matchingProduct=getProduct(productId);

      orderProductsHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingProduct.id}" data-quantity="${product.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return orderProductsHTML;
  }

  document.querySelectorAll('.js-buy-again-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const {quantity} = button.dataset;
      cart.addToCart(productId,quantity);

      button.innerHTML='Added';
      setTimeout(() => {
        button.innerHTML=`
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      },2000);
    });
  });
}