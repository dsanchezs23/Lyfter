import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class HttpService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    request(path: string, method: string, body?: any): Observable<any> {
        const url = `${this.baseUrl}/${path}`;
        switch (method.toLowerCase()) {
            case 'get':
                return this.http.get(url);

            case 'post':
                return this.http.post(url, body);
            case 'put':
                return this.http.put(url, body);
            case 'delete':
                return this.http.delete(url);
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
    }
}
