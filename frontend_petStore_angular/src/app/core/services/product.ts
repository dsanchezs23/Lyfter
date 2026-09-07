import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.models/product.model';
import { HttpService } from './http';

@Injectable({providedIn: 'root',})
export class ProductService {
    private http = inject(HttpService);

    getAll(): Observable<ProductModel[]> {
        return this.http.request('product', 'get');
    }

    getById(id: string): Observable<ProductModel> {
        return this.http.request(`product/${id}`, 'get');
    }

    create(product: ProductModel): Observable<ProductModel> {
        return this.http.request('product', 'post', product);
    }

    update(id: string, product: ProductModel): Observable<ProductModel> {
        return this.http.request(`product/${id}`, 'put', product);
    }

    delete(id: string): Observable<void> {
        return this.http.request(`product/${id}`, 'delete');
    }

}
