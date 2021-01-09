import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export const TOKEN_KEY = 'jwt-token'; //token de Seguridad

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // Inicia a null para filtrar el primer valor de la guardia.
    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    token = '';

    constructor(private http: HttpClient) {
        this.loadToken();
    }
     
    async loadToken() {
        const token = await Storage.get({ key: TOKEN_KEY });    
        if (token && token.value) {
            console.log('jwt token: ', token.value);
            this.token = token.value;
            this.isAuthenticated.next(true);
        } else {
            this.isAuthenticated.next(false);
        }
    }
     
    login(credentials: {email, password}): Observable<any> {
        return this.http.post(`http://localhost:3000/api/auth/login`, credentials).pipe(
            map((data: any) => data.token),
            switchMap(token => {
                return from(Storage.set({key: TOKEN_KEY, value: token}));
            }),
            tap(_ => {
                this.isAuthenticated.next(true);
            })
        )
    }

    loginNoObservable(credentials: {email, password}) : Promise<any> {
        var fd = new FormData();
        fd.append('email',credentials.email);
        fd.append('password',credentials.password);
        return fetch("http://localhost:3000/api/auth/login",
            {
                method: 'post',
                body: fd
            })
        .then(resp => resp.json())
    }

     
    logout(): Promise<void> {
        this.isAuthenticated.next(false);
        return Storage.remove({key: TOKEN_KEY});
    }
}
