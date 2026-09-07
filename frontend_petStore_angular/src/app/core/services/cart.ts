import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';
import { HttpService } from './http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root',})
export class CartService {
    private http = inject(HttpService);
    private STORAGE_KEY = 'petstore_cart';
    cart = signal<CartModel>(this.loadFromStorage());

    itemCount = computed(() => this.cart().items.reduce((sum, i) => sum + i.quantity, 0));

    constructor() {
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart()));
        });
    }

    getAll(): Observable<CartModel[]> {
        return this.http.request('cart', 'get');
    }

    getById(id: string): Observable<CartModel> {
        return this.http.request(`cart/${id}`, 'get');
    }

    create(cart: CartModel): Observable<CartModel> {
        return this.http.request('cart', 'post', cart);
    }

    // NOTE: backend_petStore has no PUT/DELETE for cart yet — these will 404 until those routes exist.
    update(id: string, cart: CartModel): Observable<CartModel> {
        return this.http.request(`cart/${id}`, 'put', cart);
    }

    delete(id: string): Observable<void> {
        return this.http.request(`cart/${id}`, 'delete');
    }

    addItem(product: ProductModel, quantity: number) {
        this.cart.update((current) => {
            const existingItem = current.items.find((i) => i.productId === product.id);
            const items = existingItem
                ? current.items.map((i) =>
                    i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
                  )
                : [
                    ...current.items,
                    { productId: product.id, quantity, cartId: '', priceAtTime: Number(product.price) },
                  ];
            return { ...current, items };
        });
    }

    removeItem(productId: string) {
        this.cart.update((current) => ({
            ...current,
            items: current.items.filter((i) => i.productId !== productId),
        }));
    }

    clearCart() {
        this.cart.update((current) => ({ ...current, items: [] }));
    }

    private loadFromStorage(): CartModel {
        const storedCart = localStorage.getItem(this.STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : { userId: '', items: [], totalPrice: 0 };
    }
}
