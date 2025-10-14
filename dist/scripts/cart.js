export class CartManager {
    constructor(cartSection) {
        this.cartSection = cartSection;
        this.cart = [];
    }
    addToCart(product) {
        const existingItem = this.cart.find(i => i.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            this.cart.push(Object.assign(Object.assign({}, product), { quantity: 1 }));
        }
        this.updateCartUI();
    }
    incrementItem(productId) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity++;
            this.updateCartUI();
        }
    }
    decrementItem(productId) {
        const item = this.cart.find(i => i.id === productId);
        if (!item)
            return;
        item.quantity--;
        if (item.quantity <= 0) {
            this.cart = this.cart.filter(i => i.id !== productId);
        }
        this.updateCartUI();
    }
    removeItem(productId) {
        this.cart = this.cart.filter(i => i.id !== productId);
        this.updateCartUI();
    }
    getCart() {
        return this.cart;
    }
    clearCart() {
        this.cart = [];
        this.updateCartUI();
    }
    updateCartUI() {
        if (this.cart.length === 0) {
            this.cartSection.innerHTML = `
        <h3>Your Cart (0)</h3>
        <img src="images/illustration-empty-cart.svg" alt="Empty cart illustration" class="empty-cart-img">
        <p>Your added items will appear here</p>
      `;
            return;
        }
        let totalItems = 0;
        let totalPrice = 0;
        const cartItemsHtml = this.cart.map(item => {
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
        </div>`;
        }).join('');
        this.cartSection.innerHTML = `
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
    }
}
//# sourceMappingURL=cart.js.map