import {cart, removeFromCart,calculateCartQuantity, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){

  let cartSummaryHTML="";
  let cartQuantity=calculateCartQuantity();
  let displayCheckoutCart = document.querySelector('.js-return-to-home-link');
  displayCheckoutCart.innerHTML=`${cartQuantity} items`;

  cart.forEach((cartItem) => {
    const {productId}=cartItem;
    const matchingProduct=getProduct(productId);

    const {deliveryOptionId}=cartItem;
    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const dateString=calculateDate(deliveryOption);

  cartSummaryHTML+=`
  <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryOptionsHTML(matchingProduct,cartItem)}

        </div>
      </div>
    </div>`;
  });

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';

    deliveryOptions.forEach((deliveryOption) => {
      const isChecked = cartItem.deliveryOptionId===deliveryOption.id;

      const dateString=calculateDate(deliveryOption);

      const priceString = deliveryOption.priceCents===0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      html+=`
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  function calculateDate(deliveryOption){
    const today=dayjs();
    const deliveryDate=today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString=deliveryDate.format(
      'dddd, MMMM D'
    );
    return dateString;
  }

  document.querySelector('.js-order-summary')
  .innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const {productId} = link.dataset;
        removeFromCart(productId);

      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      cartQuantity=calculateCartQuantity();
      displayCheckoutCart.innerHTML=`${cartQuantity} items`;

      renderPaymentSummary();
      });
    });

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});


  document.querySelectorAll('.js-update-quantity')
  .forEach((link) => {
    link.addEventListener('click',()=>{
      const {productId}=link.dataset;
      document.querySelector(`.js-cart-item-container-${productId}`)
      .classList.add('is-editing-quantity');

      const inputElement=document.querySelector(`.js-quantity-input-${productId}`);
      inputElement.addEventListener('keydown',(event) =>{
        if(event.key==='Enter'){
          saveQuantity(link);
        }
      });
    });
  });

  document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      saveQuantity(link);
    });
  });

  function saveQuantity(link) {
    const {productId} = link.dataset;
    const input=document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity=Number(input.value);
    if(newQuantity<0 || newQuantity>=1000){
      alert('Quantity must be atleast 0 and less than 1000');
      return;
    }
    
    document.querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove('is-editing-quantity');

    updateCartQuantity(productId,newQuantity);

    cartQuantity=calculateCartQuantity();
    displayCheckoutCart.innerHTML=`${cartQuantity} items`;
    document.querySelector(`.js-quantity-label-${productId}`)
    .innerHTML=newQuantity;

    renderPaymentSummary();
  }
}