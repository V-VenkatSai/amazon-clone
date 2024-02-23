export const cart = [];

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
  console.log(cart);

};