import { getDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey){
  const cart={
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
  
    addToCart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem=cartItem;
        }
      });
    
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity=Number(quantitySelector.value);
    
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
    },
    
    removeFromCart(productId) {
      this.cartItems.forEach((cartItem,index) => {
        if(cartItem.productId === productId){
          this.cartItems.splice(index,1);
        }
      });
    
      this.saveToStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity=0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity+=cartItem.quantity;
      });
      return cartQuantity;
    },
  
    updateCartQuantity(productId,newQuantity){
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId===productId){
          cartItem.quantity=newQuantity;
        }
      });
      saveToStorage();
    },
  
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
  };

  return cart;
}

const cart=Cart('cart-oop');
const businessCart=Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);