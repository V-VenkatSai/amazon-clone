export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
      quantity
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