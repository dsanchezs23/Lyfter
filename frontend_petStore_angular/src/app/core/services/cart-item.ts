import { inject, Injectable } from '@angular/core';
import { HttpService } from './http';
import { Observable } from 'rxjs';
import { CartItemModel } from '../models/cart-item.model';

@Injectable({ providedIn: 'root', })
export class CartItemService {
    private http = inject(HttpService);

    // NOTE: the backend route is /cartItem (camelCase), not /cart-item — Spring's @RequestMapping
    // is case-sensitive, so this path has to match exactly.
    getAll(): Observable<CartItemModel[]> {
        return this.http.request('cartItem', 'get');
    }

    getById(id: string): Observable<CartItemModel> {
        return this.http.request(`cartItem/${id}`, 'get');
    }

    create(cartItem: CartItemModel): Observable<CartItemModel> {
        return this.http.request('cartItem', 'post', cartItem);
    }

    // NOTE: backend_petStore has no PUT/DELETE for cartItem yet — these will 404 until those routes exist.
    update(id: string, cartItem: CartItemModel): Observable<CartItemModel> {
        return this.http.request(`cartItem/${id}`, 'put', cartItem);
    }

    delete(id: string): Observable<void> {
        return this.http.request(`cartItem/${id}`, 'delete');
    }
}
