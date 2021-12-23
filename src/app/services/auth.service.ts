import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userStorage: string = '_user';
  refreshTokenTimer: any;

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

  // See calls to this method in the app.component.ts
  refreshToken = (): Observable<any> => {
    return this.http.post<any>(`${environment.api}/auth/refresh`, { refresh_token: (this.getUser()).refresh_token });
  };

  private updateUserToken = (data: any) => {
    const user = localStorage.getItem(this.userStorage);
    if (user) {
      const userData = JSON.parse(user);
      userData.access_token = data.access_token;
      userData.refresh_token = data.refresh_token;
      localStorage.setItem(this.userStorage, JSON.stringify(userData));
    }
  }

  autoRefreshUserSession = (clearRefreshInterval: boolean = false) => {
    const expirationLimit = this.getUser().expires / 2;
    console.log(`Start auto-refresh timer to ${expirationLimit} ms`);

    if (clearRefreshInterval) {
      console.log('Clear auto-refresh user session');
      clearInterval(this.refreshTokenTimer);
      return;
    }

    // Refresh token imediatly
    this.refreshToken().subscribe((response: any) => {
      this.updateUserToken(response.data);
    });

    // Start auto-refresh timer
    this.refreshTokenTimer = setInterval(() => {
      console.log('Auto-refresh user session');
      this.refreshToken().subscribe((response: any) => {
        this.updateUserToken(response.data);
      });
    }, expirationLimit);
  }

  clearAutoRefreshUserSession = () => {
    this.autoRefreshUserSession(true);
  }
}
