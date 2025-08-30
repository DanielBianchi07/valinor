import { Injectable, signal, WritableSignal } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token = signal<string | undefined>(undefined);

  constructor() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this._token.set(token);
    }
  }

  set token(_token: string | undefined) {
    this._token.set(_token);
    localStorage.setItem('authToken', _token ?? '');
  }

  get token(): WritableSignal<string | undefined> {
    return this._token;
  }

  hasValidToken(): boolean {
    const token = this.token();
    if(!token) return false;

    const decodedToken = jwtDecode.jwtDecode(token);
    const now = Date.now() / 1000;
    

    if (!decodedToken.exp) return false;

    return decodedToken.exp > now;
  }
}
