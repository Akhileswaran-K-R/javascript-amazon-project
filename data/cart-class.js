import { getDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId,number=0) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem=cartItem;
      }
    });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    let quantity;
    if(quantitySelector){
      quantity=Number(quantitySelector.value);
    }else{
      quantity=Number(number);
    }
  
    if(matchingItem){
      matchingItem.quantity+=quantity;
    }else{
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }
  
  removeFromCart(productId) {
    this.cartItems.forEach((cartItem,index) => {
      if(cartItem.productId === productId){
        this.cartItems.splice(index,1);
      }
    });
  
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity=0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity+=cartItem.quantity;
    });
    return cartQuantity;
  }

  updateCartQuantity(productId,newQuantity){
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId===productId){
        cartItem.quantity=newQuantity;
      }
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem=cartItem;
      }
    });
  
    if(!matchingItem || !getDeliveryOption(deliveryOptionId)){
      return;
    }
  
    matchingItem.deliveryOptionId=deliveryOptionId;
    this.saveToStorage();
  }
}

export const cart=new Cart('cart-oop');
//const businessCart=new Cart('cart-business');



//console.log(cart);
//console.log(businessCart);

//console.log(businessCart instanceof Cart);

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
}