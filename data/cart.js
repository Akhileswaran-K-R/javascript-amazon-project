export const cart=JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem=cartItem;
    }
  });

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity=Number(quantitySelector.value);

  if(matchingItem){
    matchingItem.quantity+=quantity;
  }else{
    cart.push({
      productId,
      quantity
    });
  }

  saveToStorage();
}

export function removeFromCart(productId){
  cart.forEach((cartItem,index) => {
    if(cartItem.productId === productId){
      cart.splice(index,1);
    }
  });

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity=0;
  cart.forEach((cartItem) => {
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}

export function updateCartQuantity(productId,newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId===productId){
      cartItem.quantity=newQuantity;
    }
  });
  saveToStorage();
}