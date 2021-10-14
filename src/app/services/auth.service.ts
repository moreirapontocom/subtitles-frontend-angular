import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userStorage: string = '_user';

  constructor(private http: HttpClient) {}

  setUser = (userData: any): void => {
    return localStorage.setItem(this.userStorage, JSON.stringify(userData));
  };

  getUser = () => {
    const user = localStorage.getItem(this.userStorage);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  removeUser = (): void => {
    localStorage.removeItem(this.userStorage);
  };

  login = (form: any): Observable<any> => {
    return this.http.post<any>(`${environment.api}/auth/login`, form);
  };

  refreshToken = (): Observable<any> => {
    return this.http.post<any>(`${environment.api}/auth/refresh`, { refresh_token: (this.getUser()).refresh_token });
  };
}
