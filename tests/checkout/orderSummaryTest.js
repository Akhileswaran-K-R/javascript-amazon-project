import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";

const productId1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2= 'id1';

describe('Test suite: renderOrderSummary', () => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML=`
    <div class="js-checkout-header"></div>  
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;

    cart.loadFromStorage();

    cart.cartItems=[{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId:productId2,
      quantity:1,
      deliveryOptionId:'2'
    }];

    renderOrderSummary();
  });

  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Back pack');

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(`$10.90`);

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(`$14.00`);
  });

  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it('updating the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');

    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$55.86');
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML='';
  })
});