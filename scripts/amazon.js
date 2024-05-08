import { cart } from "../data/cart-class.js";
import { loadProductsList, search } from "../data/products.js";
import { renderHeaderSummary } from "./shared/header.js";

renderHeaderSummary();
async function loadPage() {
  await loadProductsList();
  renderProductsGrid();
}

loadPage();

function renderProductsGrid() {
  const url = new URL(window.location.href);
  const searchText = url.searchParams.get("search");
  const searchResults = search(searchText);

  if (searchResults.length === 0) {
    document.querySelector(".js-products-grid").innerHTML = `
        <div class="empty-results-message"
          data-testid="empty-results-message">
          No products matched your search.
        </div>
      `;
    return;
  }

  let productsHTML = "";

  searchResults.forEach((product) => {
    productsHTML += `
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
              src="${product.getStarsURL()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">1
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

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  const addedMssgTimeOuts = {};
  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    document.querySelector(".js-cart-quantity-mobile").innerHTML = cartQuantity;
  }

  function displayAddedMessage(productId) {
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.add("added-to-cart-visible");

    setTimeout(() => {
      if (addedMssgTimeOuts[productId]) {
        clearTimeout(addedMssgTimeOuts[productId]);
      }

      const timeOutId = setTimeout(() => {
        document
          .querySelector(`.js-added-to-cart-${productId}`)
          .classList.remove("added-to-cart-visible");
      }, 2000);

      addedMssgTimeOuts[productId] = timeOutId;
    });
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      updateCartQuantity();
      displayAddedMessage(productId);
    });
  });
}
