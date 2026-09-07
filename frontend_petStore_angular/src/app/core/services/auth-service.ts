import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user';
import { LoginRequest, RegisterRequest, Role, Session } from '../models/user.model';
import { Observable, filter, tap } from 'rxjs';

const STORAGE_KEY = 'petstore_session';

@Injectable({ providedIn: 'root', })
export class AuthService {
    private userService = inject(UserService);
    session = signal<Session | null>(this.readStorageSession());
    isLoggedIn = computed(() => this.session() !== null);

    readStorageSession(): Session | null {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        try{
            return JSON.parse(raw) as Session;
        }catch{
            return null;
        }
    }

    constructor(){
        effect(() => {
            const current = this.session();
            if (current){
                localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
            }else {
                localStorage.removeItem(STORAGE_KEY);
            }
        });
    }

    hasRole(roles: Role[]): boolean{
        const current = this.session();
        return current !== null && roles.includes(current.role);
    }

    login(payload: LoginRequest): Observable<Session>{
        return this.userService.login(payload).pipe(
            filter((session): session is Session => session !== null),
            tap((session) => this.session.set(session))
        );
    }

    register(payload: RegisterRequest, role: Role): Observable<Session>{
        return this.userService.register(role, payload).pipe(
            tap((session) => this.session.set(session))
        );
    }

    logout(): void{
        this.session.set(null);
    }
}
