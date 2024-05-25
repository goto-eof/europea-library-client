import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import AuthService from '../service/AuthService';

@Injectable()
export default class RequestInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
      );
  }
  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 || error.status === 403) {
      this.authService.removeUserData();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
    return throwError(() => error);
  }
}
