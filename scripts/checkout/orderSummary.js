import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions,getDeliveryOption,calculateDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary(){

  let cartSummaryHTML="";

  cart.forEach((cartItem) => {
    const {productId}=cartItem;
    const matchingProduct=getProduct(productId);

    const {deliveryOptionId}=cartItem;
    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const dateString=calculateDate(deliveryOption);

  cartSummaryHTML+=`
  <div class="cart-item-container js-cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
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

  document.querySelector('.js-order-summary')
  .innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const {productId} = link.dataset;
        removeFromCart(productId);

        renderCheckoutHeader();
        renderOrderSummary();
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

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  }
}