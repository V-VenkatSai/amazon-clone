export let cart;

loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

  let matchingItem;

    cart.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    const quantity = parseInt(document.querySelector(`.js-product-quantity-${productId}`).value);

    if(matchingItem){
      matchingItem.quantity+= quantity;
    } else{
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  
  saveToStorage();

};

export function removeFromCart(productId) {

  const newCart = [];

  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;

};

export function updateQuantity(productId, newQuantity){

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();

};

export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem;

    cart.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
  
}

export function loadCart(fun) {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    console.log(xhr.response);

      fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

}
