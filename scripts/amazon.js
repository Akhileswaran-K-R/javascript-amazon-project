import {cart} from '../data/cart-class.js';
import {products,loadProductsFetch} from '../data/products.js';
import { loadHeader, updateCartQuantity } from './header/header.js';

loadHeader();

loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid(){

  let productsHTML = '';
  updateCartQuantity();

  let filterProducts = products;
  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  if(search){
    search=search.toLowerCase();

    filterProducts = products.filter((product) => {
      let matchingKeyword;

      product.keywords.forEach((keyword) => {
        if(keyword.toLowerCase().includes(search)){
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search);
    });
  }

  filterProducts.forEach((product) => {
    productsHTML +=`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
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

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;

  });
  let timeoutId;
  const productGrid = document.querySelector('.js-products-grid');

  if(productsHTML){
    productGrid.classList.remove('no-search');
    productGrid.innerHTML=productsHTML;
  }else{
    productGrid.classList.add('no-search');
    productGrid.innerHTML = 'No matches found';
  }
  

  function displayAdded(productId,addedTimeOutId=null){
    if(addedTimeOutId){
      clearTimeout(addedTimeOutId);
    }

    const addSelector=document.querySelector(`.js-added-to-cart-${productId}`);

    timeoutId=setTimeout(()=>{
      addSelector.classList.remove('visible-added-to-cart');
    },2000);

    addSelector.classList.add('visible-added-to-cart');
  
    addedTimeOutId=timeoutId;
    return addedTimeOutId;
  }

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    let addedTimeOutId;
    button.addEventListener('click', () => {
      const {productId} = button.dataset;

      cart.addToCart(productId);
      updateCartQuantity();
      addedTimeOutId=displayAdded(productId,addedTimeOutId);
      
    });
  });
}