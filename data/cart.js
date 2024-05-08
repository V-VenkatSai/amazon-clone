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

    let quantity;

    try {
      quantity = parseInt(
        document.querySelector(`.js-product-quantity-${productId}`).value
      );
    } catch {
      quantity = 1;
    }


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

export function resetCart(){
  cart = [];
  saveToStorage();
}

export function loadCart(fun) {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
      fun();
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

}

export function loadCartFetch(){

  const promise = fetch('https://supersimplebackend.dev/cart').then((response) => {
    return response.text();
  }).then((cartItems) => {
    console.log(cartItems);
  })

  return promise;
}

export async function loadCartFetchAsync() {
 const response =  await fetch('https://supersimplebackend.dev/cart');
 const data = await response.text();
 console.log(data);
}