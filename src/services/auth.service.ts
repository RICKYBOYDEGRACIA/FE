import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UserFormModel } from "../app/shared/interface/user.inteface";
import { AuthResponse } from "../app/shared/interface/auth.interface";
import { isPlatformBrowser } from "@angular/common";

export interface User {
    id: string,
    email: string,
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private platformId = inject(PLATFORM_ID);
    currentUser = signal<User | null>(this.getUserFromToken());


    constructor(
        private http: HttpClient,
    ) {
    }

    createUser(payload: UserFormModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload, this.httpOptions);
    }

    login(credentials: any){
        return this.http.post<any>(`${this.apiUrl}/login`, credentials, this.httpOptions).pipe(
            tap(res => {
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('token', res.token);
                }
                const decodedUser = this.decodeToken(res.token);
                this.currentUser.set(decodedUser);
            })
        )
    }

    private decodeToken(token: string): User | null {
        try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.id, email: payload.email };
        } catch (e) {
        return null;
        }
    }

    private getUserFromToken(): User | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        const token = localStorage.getItem('token');
        if (!token) return null;
        return this.decodeToken(token);
    }
}