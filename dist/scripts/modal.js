export class ModalManager {
    constructor() {
        this.overlay = document.querySelector('.modal-overlay');
        this.summary = this.overlay.querySelector('.modal-order-summary');
        this.total = this.overlay.querySelector('.modal-total-price');
        this.startBtn = this.overlay.querySelector('.start-new-order-btn');
    }
    show(cart) {
        let totalPrice = 0;
        const html = cart.map(item => {
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
        </div>`;
        }).join('');
        this.summary.innerHTML = html;
        this.total.textContent = `$${totalPrice.toFixed(2)}`;
        this.overlay.style.display = 'flex';
    }
    hide() {
        this.overlay.style.display = 'none';
    }
    onReset(callback) {
        this.startBtn.addEventListener('click', () => {
            this.hide();
            callback();
        });
    }
}
//# sourceMappingURL=modal.js.map