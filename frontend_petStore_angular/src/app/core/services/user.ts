import { inject, Injectable } from '@angular/core';
import { HttpService } from './http';
import { LoginRequest, RegisterRequest, Role, Session, UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class UserService {
    private http = inject(HttpService);

    // backend_petStore scopes users by role in the path: GET /user/{role} and GET /user/{role}/{id}
    getAll(role: Role): Observable<UserModel[]> {
        return this.http.request(`user/${role}`, 'get');
    }

    getById(role: Role, id: string): Observable<UserModel> {
        return this.http.request(`user/${role}/${id}`, 'get');
    }

    // NOTE: there's no generic create/update/delete on the backend — registration goes through
    // register() below (POST /user/{role}), and there's no update/delete endpoint for users at all yet.

    login(payload: LoginRequest): Observable<Session> {
        return this.http.request('user/login', 'post', payload);
    }

    register(role: Role, payload: RegisterRequest): Observable<Session> {
        return this.http.request(`user/${role}`, 'post', payload);
    }
}
