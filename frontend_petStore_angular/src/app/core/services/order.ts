import { inject, Injectable } from '@angular/core';
import { HttpService } from './http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';

@Injectable({ providedIn: 'root', })
export class OrderService {
    private http = inject(HttpService);

    getAll(): Observable<OrderModel[]> {
        return this.http.request('order', 'get');
    }

    getById(id: string): Observable<OrderModel> {
        return this.http.request(`order/${id}`, 'get');
    }

    create(order: OrderModel): Observable<OrderModel> {
        return this.http.request('order', 'post', order);
    }

    // NOTE: backend_petStore has no PUT/DELETE for order yet — these will 404 until those routes exist.
    update(id: string, order: OrderModel): Observable<OrderModel> {
        return this.http.request(`order/${id}`, 'put', order);
    }

    delete(id: string): Observable<void> {
        return this.http.request(`order/${id}`, 'delete');
    }
}

