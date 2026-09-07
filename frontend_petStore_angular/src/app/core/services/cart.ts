import { computed, inject, Injectable, signal } from '@angular/core';
import { CartModel } from '../models/cart.model/cart.model.ts';
import { ProductModel } from '../models/product.models/product.model';
import { HttpService } from './http.js';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root',})
export class CartService {
    private http = inject(HttpService);
    private STORAGE_KEY = 'petstore_cart';
    cart = signal<CartModel>(this.loadFromStorage());

    getAll(): Observable<CartModel[]> {
        return this.http.request('cart', 'get');
    }

    getById(id: string): Observable<CartModel> {
        return this.http.request(`cart/${id}`, 'get');
    }

    create(cartItem: any): Observable<CartModel>  {
        return this.http.request('cart', 'post', cartItem);
    }

    update(id: string, cartItem: any): Observable<CartModel>  {
        return this.http.request(`cart/${id}`, 'put', cartItem);
    }
    
    delete(id: string): Observable<void>  {
        return this.http.request(`cart/${id}`, 'delete');
    }

    itemCount = computed(() => this.cart().items.reduce((sum, i) => sum + i.quantity, 0));

    addItem(product: ProductModel, quantity: number) {
        const existingItem = this.cart().items.find(i => i.productId === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart().items.push({
                productId: product.id, quantity,
                cartId: '',
                priceAtTime: 0
            });
        }
        this.saveToStorage();
    }

    removeItem(productId: string) {
        this.cart().items = this.cart().items.filter(i => i.productId !== productId);
        this.saveToStorage();
    }

    clearCart() {
        this.cart.update(cart => ({ ...cart, items: [] }));
        this.saveToStorage();
    }

    private saveToStorage() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart()));
    }

    private loadFromStorage(): CartModel {
        const storedCart = localStorage.getItem(this.STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : { userId: '', items: [], totalPrice: 0 };
    }

    constructor() {
        () => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart()));
        }
    }
}
