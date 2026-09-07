import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
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

    // NOTE: backend_petStore has no DELETE /product/{id} yet — this will 404 until that route exists.
    delete(id: string): Observable<void> {
        return this.http.request(`product/${id}`, 'delete');
    }

}
