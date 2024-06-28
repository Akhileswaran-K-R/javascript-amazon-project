import {cart} from '../../data/cart-class.js'

const productId1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2= 'id2';

describe('Test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage,'setItem');
    document.querySelector('.js-test-container').innerHTML=`
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${productId1}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    `;
  });

  it('adds an existing product to the cart', () => {

    /*spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });*/
    cart.loadFromStorage();
    
    cart.cartItems=[{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }]));
  });

  it('adds a new product to the cart', () => {

    /*spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });*/
    cart.loadFromStorage();

    cart.cartItems=[];

    cart.addToCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });

  it('removes an existing product from the cart', () => {

    /*spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId:productId2,
        quantity:1,
        deliveryOptionId:'2'
      }]);
    });*/
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

    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });

  it('remove a product that is not in the cart',() => {
    /*spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });*/
    cart.loadFromStorage();

    cart.cartItems=[{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.removeFromCart(productId2);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML='';
  })
});

describe('Test suite: updateDeliveryOption',() => {
  beforeEach(() => {
    spyOn(localStorage,'setItem');

    /*spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });*/
    cart.loadFromStorage();

    cart.cartItems=[{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }];
  });

  it('update the delivery option of a product in the cart',() =>{
    cart.updateDeliveryOption(productId1,'3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
    }]));
  });

 it('does nothing if product is not in the cart', () => {
    cart.updateDeliveryOption(productId2,'3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
 });

 it('does nothing if delivery option does not exist',() => {
    cart.updateDeliveryOption(productId1,'4');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
 });
});