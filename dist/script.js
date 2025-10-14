"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const cartSection = document.querySelector('.cart-section');
    const dessertsGrid = document.querySelector('.desserts-grid');
    const modalOverlay = document.querySelector('.modal-overlay');
    const startNewOrderBtn = document.querySelector('.start-new-order-btn');
    let cart = [];
    // --- Utility Functions ---
    const findProductCardById = (productId) => {
        const cards = document.querySelectorAll('.product-card');
        for (const card of cards) {
            const name = card.querySelector('.product-name').textContent;
            if (name === productId)
                return card;
        }
        return null;
    };
    const updateButtonState = (productCard, quantity) => {
        let quantitySelector = productCard.querySelector('.quantity-selector');
        if (!quantitySelector) {
            const addBtn = productCard.querySelector('.add-to-cart-btn');
            addBtn.style.display = 'none';
            quantitySelector = document.createElement('div');
            quantitySelector.classList.add('quantity-selector');
            quantitySelector.innerHTML = `
        <button class="decrement-btn"><img src="images/icon-decrement-quantity.svg" alt="Decrement"></button>
        <span class="quantity-text">${quantity}</span>
        <button class="increment-btn"><img src="images/icon-increment-quantity.svg" alt="Increment"></button>
      `;
            productCard.appendChild(quantitySelector);
        }
        else {
            const qtyText = quantitySelector.querySelector('.quantity-text');
            qtyText.textContent = quantity.toString();
        }
    };
    const resetButtonState = (productCard) => {
        const quantitySelector = productCard.querySelector('.quantity-selector');
        if (quantitySelector)
            quantitySelector.remove();
        const addBtn = productCard.querySelector('.add-to-cart-btn');
        addBtn.style.display = 'flex';
    };
    const addToCart = (productCard) => {
        const productId = productCard.querySelector('.product-name').textContent || '';
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src.replace('-desktop', '');
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            cart.push({ id: productId, name: productId, price: productPrice, quantity: 1, image: productImage });
        }
        updateCart();
    };
    const updateCart = () => {
        if (cart.length === 0) {
            cartSection.innerHTML = `
        <h3>Your Cart (0)</h3>
        <img src="images/illustration-empty-cart.svg" alt="Empty cart illustration" class="empty-cart-img">
        <p>Your added items will appear here</p>
      `;
            return;
        }
        let totalItems = 0;
        let totalPrice = 0;
        const cartItemsHtml = cart.map(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            return `
        <div class="cart-item">
          <div class="item-details">
            <p class="item-name">${item.name}</p>
            <div class="item-pricing">
              <span class="item-quantity">${item.quantity}x</span>
              <span class="item-price-per">@ $${item.price.toFixed(2)}</span>
              <span class="item-price-total">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">
            <img src="images/icon-remove-item.svg" alt="Remove item">
          </button>
        </div>
      `;
        }).join('');
        cartSection.innerHTML = `
      <h3>Your Cart (${totalItems})</h3>
      <div class="cart-items-container">${cartItemsHtml}</div>
      <div class="order-total-container">
        <span>Order Total</span>
        <span class="total-price">$${totalPrice.toFixed(2)}</span>
      </div>
      <div class="carbon-neutral-container">
        <img src="images/icon-carbon-neutral.svg" alt="Carbon neutral">
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>
      <button class="confirm-order-btn">Confirm Order</button>
    `;
    };
    const showConfirmationModal = () => {
        const modalSummaryContainer = modalOverlay.querySelector('.modal-order-summary');
        const modalTotalPriceElement = modalOverlay.querySelector('.modal-total-price');
        let totalPrice = 0;
        const modalItemsHtml = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            return `
        <div class="modal-cart-item">
          <div class="modal-item-info">
            <img src="${item.image}" alt="${item.name}">
            <div class="modal-item-details">
              <p class="item-name">${item.name}</p>
              <div class="item-pricing">
                <span class="item-quantity">${item.quantity}x</span>
                <span class="item-price-per">@ $${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <span class="modal-item-total-price">$${itemTotal.toFixed(2)}</span>
        </div>
      `;
        }).join('');
        modalSummaryContainer.innerHTML = modalItemsHtml;
        modalTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        modalOverlay.style.display = 'flex';
    };
    const resetOrder = () => {
        modalOverlay.style.display = 'none';
        cart = [];
        document.querySelectorAll('.product-card').forEach(card => resetButtonState(card));
        updateCart();
    };
    // --- Event listeners ---
    dessertsGrid.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target)
            return;
        const productCard = (target.closest('.product-card'));
        const productId = productCard.querySelector('.product-name').textContent || '';
        if (target.classList.contains('add-to-cart-btn')) {
            addToCart(productCard);
            updateButtonState(productCard, 1);
        }
        else if (target.classList.contains('increment-btn')) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity++;
                updateCart();
                updateButtonState(productCard, item.quantity);
            }
        }
        else if (target.classList.contains('decrement-btn')) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity--;
                if (item.quantity === 0) {
                    cart = cart.filter(ci => ci.id !== productId);
                    resetButtonState(productCard);
                }
                else {
                    updateButtonState(productCard, item.quantity);
                }
                updateCart();
            }
        }
    });
    cartSection.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.remove-item-btn')) {
            const btn = target.closest('.remove-item-btn');
            const productId = btn.dataset.id;
            const productCard = findProductCardById(productId);
            cart = cart.filter(item => item.id !== productId);
            if (productCard)
                resetButtonState(productCard);
            updateCart();
        }
        if (target.classList.contains('confirm-order-btn'))
            showConfirmationModal();
    });
    startNewOrderBtn.addEventListener('click', resetOrder);
});
//# sourceMappingURL=script.js.map