import { CartItem, Product } from './types.js';
export declare class CartManager {
    private cartSection;
    private cart;
    constructor(cartSection: HTMLElement);
    addToCart(product: Product): void;
    incrementItem(productId: string): void;
    decrementItem(productId: string): void;
    removeItem(productId: string): void;
    getCart(): CartItem[];
    clearCart(): void;
    private updateCartUI;
}
//# sourceMappingURL=cart.d.ts.map