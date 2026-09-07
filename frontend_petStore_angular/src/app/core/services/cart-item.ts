import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http';
import { Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model/cart-item.model.ts';

@Injectable({ providedIn: 'root', })
export class CartItemService {  
    private http = inject(HttpService);

    getAll(): Observable<CartItemModel[]>  {
        return this.http.request('cart-item', 'get');
    }

    getById(id: string): Observable<CartItemModel>  {
        return this.http.request(`cart-item/${id}`, 'get');
    }

    create(cartItem: any): Observable<CartItemModel>  {
        return this.http.request('cart-item', 'post', cartItem);
    }

    update(id: string, cartItem: any): Observable<CartItemModel>  {
        return this.http.request(`cart-item/${id}`, 'put', cartItem);
    }

    delete(id: string): Observable<void>  {
        return this.http.request(`cart-item/${id}`, 'delete');
    }

    
    
}
