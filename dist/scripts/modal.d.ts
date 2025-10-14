import { CartItem } from './types.js';
export declare class ModalManager {
    private overlay;
    private summary;
    private total;
    private startBtn;
    constructor();
    show(cart: CartItem[]): void;
    hide(): void;
    onReset(callback: () => void): void;
}
//# sourceMappingURL=modal.d.ts.map