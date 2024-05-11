import { cart } from "../../data/cart-class.js";

export function renderHeaderSummary() {
  const renderHTML = `
  <section class="amazon-header-left-section">
        <a href="index.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </section>

      <section class="amazon-header-middle-section">
        <input class="search-bar js-search-bar" type="text" placeholder="Search" value="">
        <button class="search-button js-search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </section>

      <section class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cart-quantity">${cart.calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </section>
      
      <section class="amazon-header-right-mobile-section">
      <img class="js-hamburger-menu-toggle hamburger-menu-toggle" src="images/icons/hamburger-menu.png"/>
      </section>

      <div class="hamburger-menu-dropdown js-hamburger-menu-dropdown">
      <a class="hamburger-menu-link" href="orders.html">Returns & Orders </a>
      <a class="hamburger-menu-link" href="checkout.html">Cart (<span class="js-cart-quantity-mobile cart-quantity-mobile">${cart.calculateCartQuantity()}</span>)</a>
      </div>
      `;

  document.querySelector(".js-amazon-header").innerHTML = renderHTML;

  const inputBarEvent = document.querySelector(".js-search-bar");

  document
    .querySelector(".js-hamburger-menu-toggle")
    .addEventListener("click", () => {
      const hamburger = document.querySelector(".js-hamburger-menu-dropdown");
      const isOpened = hamburger.classList.contains("hamburger-menu-opened");

      if (isOpened) {
        hamburger.classList.remove("hamburger-menu-opened");
      } else {
        hamburger.classList.add("hamburger-menu-opened");
      }
    });

  inputBarEvent.addEventListener("keydown", (event) => {
    if(event.key == 'Enter'){
    searchValue(inputBarEvent.value);
    }
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    searchValue(inputBarEvent.value);
  });
}

renderHeaderSummary();

function searchValue(searchText) {
  if (!searchText) {
    window.location.href = "./";
  } else {
    window.location.href = `././?search=${searchText}`;
  }
}
