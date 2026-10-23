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

    private readonly TOKEN_KEY = 'token';

    constructor(
        private http: HttpClient,
    ) {
    }

    createUser(payload: UserFormModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload, this.httpOptions);
    }

    login(credentials : any){
        return this.http.post<any>(`${this.apiUrl}/login`, credentials, this.httpOptions).pipe(
            tap(res => {
                if(res && res.token){
                    this.setToken(res.token)
                }
            })
        )
    }

    setToken(token: string){
        return localStorage.setItem(this.TOKEN_KEY, token)
    }

    getToken(){
        return localStorage.getItem(this.TOKEN_KEY)
    }


    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token! && !this.isTokenExpired(token);
    }

    private isTokenExpired(token: string): boolean {
        // Logic to decode and check expiration
        return false; 
    }
    
}