import { inject, Injectable } from '@angular/core';
import { HttpService } from './http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model/order.model';

@Injectable({ providedIn: 'root', })
export class OrderService {
    private http = inject(HttpService);;

    getAll(): Observable<OrderModel[]> {
        return this.http.request('order', 'get');
    }

    getById(id: string): Observable<OrderModel>  {
        return this.http.request(`order/${id}`, 'get');
    }

    create(order: any): Observable<OrderModel> {
        return this.http.request('order', 'post', order);
    }

    update(id: string, order: any): Observable<OrderModel> {
        return this.http.request(`order/${id}`, 'put', order);
    }

    delete(id: string): Observable<void> {
        return this.http.request(`order/${id}`, 'delete');
    }
}

