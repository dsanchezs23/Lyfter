import { inject, Injectable } from '@angular/core';
import { HttpService } from './http';
import { LoginRequest, RegisterRequest, Role, Session, UserModel } from '../models/user.model/user.model.ts';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class UserService {
    private http = inject(HttpService);
    
    getAll(): Observable<UserModel[]> {
        return this.http.request('user', 'get');
    }

    getById(id: string): Observable<UserModel> {
        return this.http.request(`user/${id}`, 'get');
    }
    
    create(user: any): Observable<UserModel> {
        return this.http.request('user', 'post', user);
    }

    update(id: string, user: any): Observable<UserModel> {
        return this.http.request(`user/${id}`, 'put', user);
    }
    
    delete(id: string): Observable<void> {
        return this.http.request(`user/${id}`, 'delete');
    }

    login(payload: LoginRequest): Observable<Session> {
        return this.http.request('login', 'post', payload);
    }

    register(role: Role, payload: RegisterRequest): Observable<Session>{
        return this.http.request(role, 'post', payload);
    }
}
