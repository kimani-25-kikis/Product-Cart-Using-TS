// src/scripts/main.ts
import { CartManager } from './cart.js';
import { ModalManager } from './modal.js';
document.addEventListener('DOMContentLoaded', () => {
    const cartSection = document.querySelector('.cart-section');
    const dessertsGrid = document.querySelector('.desserts-grid');
    const cartManager = new CartManager(cartSection);
    const modalManager = new ModalManager();
    dessertsGrid.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn)
            return;
        const card = btn.closest('.product-card');
        const name = card.querySelector('.product-name').textContent;
        const price = parseFloat(card.querySelector('.product-price').textContent.replace('$', ''));
        const image = card.querySelector('img').src.replace('-desktop', '');
        const product = { id: name, name, price, image };
        if (btn.classList.contains('add-to-cart-btn')) {
            cartManager.addToCart(product);
            updateButtonState(card, 1);
        }
    });
    // Confirm order button
    cartSection.addEventListener('click', e => {
        if (e.target.classList.contains('confirm-order-btn')) {
            modalManager.show(cartManager.getCart());
        }
    });
    // Reset on new order
    modalManager.onReset(() => {
        cartManager.clearCart();
        document.querySelectorAll('.product-card').forEach(card => resetButtonState(card));
    });
});
// Utility functions
function updateButtonState(card, quantity) {
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.style.display = 'none';
    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('quantity-selector');
    quantityDiv.innerHTML = `
    <button class="decrement-btn"><img src="images/icon-decrement-quantity.svg" alt="Decrement"></button>
    <span class="quantity-text">${quantity}</span>
    <button class="increment-btn"><img src="images/icon-increment-quantity.svg" alt="Increment"></button>
  `;
    card.appendChild(quantityDiv);
}
function resetButtonState(card) {
    const qtyDiv = card.querySelector('.quantity-selector');
    if (qtyDiv)
        qtyDiv.remove();
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.style.display = 'flex';
}
//# sourceMappingURL=main.js.map