import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  user: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        const user = this.authService.getUser();
        const token = user.access_token;

        if ([401, 403].includes(err.status) && token) {
          console.log('DEU PROIBIDO AQUI Ó');
          // this.authService.refreshToken().subscribe((response: any) => {
          //   console.log('RESPONSE AQUI >>> ', response);
          // });

          // this.http.post<any>(`http://localhost:8055/auth/refresh`, { refresh_token: user.refresh_token }).subscribe((response: any) => {
          //     console.log('SHIT!!! >>> ', user);
          // });

          return next.handle(req);
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      })
    );
  }
}
