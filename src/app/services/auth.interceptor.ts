import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  // HttpResponse,
  // HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from "rxjs/operators";

// https://itnext.io/handle-http-responses-with-httpinterceptor-and-toastr-in-angular-3e056759cb16

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: any;

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.authService.getUser()) return next.handle(req);

    const user = this.authService.getUser();
    const token = user.access_token;

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1)
      .pipe(
        catchError((err: any) => {
          if (err.status === 401 && err.statusText === 'Unauthorized') {
            console.log('DEU ERRO AQUI Ó >>>> ', err);

            // 

          }

          return throwError(err);
        })
    );

    // return next.handle(req1);

    /*
    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1).pipe(
      catchError(err => {
        if (err.status === 401 && err.statusText === 'Unauthorized') {
          console.log('ERRO >>>> ', err)

          this.authService.refreshToken().subscribe((response: any) => {
            console.log('response refreshToken >> ', response);
            const sto = localStorage.getItem('_user');
            if (sto) {
              const uuu = JSON.parse(sto);
              console.log('try sucesso uuu >> ', uuu);
              uuu.access_token = response.access_token;
              localStorage.setItem('_user', JSON.stringify(uuu));
            }
            return next.handle(req1);
          });

        }
        return throwError(err);
      })
    ),
    next.handle(req1);
    */

    // return next.handle(req1);
  }

  /*
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    var user = this.authService.getUser();

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('success');
          if (evt.body && evt.body.success) {
            console.log('success');
          }
        }
      }),
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          try {
            console.log('try >> ', err)
            console.log('try >> ', err.status)

            if (err.status === 403 && user) {
              console.log('try sucesso >> ', err.status);
              // console.log('try sucesso user >> ', user);
              this.authService.refreshToken().subscribe((response: any) => {
                console.log('response refreshToken >> ', response);
                const sto = localStorage.getItem('_user');
                if (sto) {
                  const uuu = JSON.parse(sto);
                  console.log('try sucesso uuu >> ', uuu);
                  uuu.access_token = response.access_token;
                  localStorage.setItem('_user', JSON.stringify(uuu));
                }
              })
            }
          } catch(e) {
            console.log('catch error')
          }
        }
        return of(err);
      })
    );
  }
  */

  refreshToken = (req: HttpRequest<any>, next: HttpHandler) => {
    const sub = this.authService.refreshToken().subscribe((response: any) => {
      console.log('response refreshToken >> ', response);
      const sto = localStorage.getItem('_user');
      if (sto) {
        const uuu = JSON.parse(sto);
        console.log('try sucesso uuu >> ', uuu);
        uuu.access_token = response.access_token;
        localStorage.setItem('_user', JSON.stringify(uuu));
      }
      sub.unsubscribe();
      return next.handle(req);
    });
  }

}