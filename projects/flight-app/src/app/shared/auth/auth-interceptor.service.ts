import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {OAuthStorage} from "angular-oauth2-oidc";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private router: Router,
        private storage: OAuthStorage) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('http://www.angular.at')) {
          // const headers = req.headers.set('Authorization', 'Dummy Token for Demo');
          const headers = req.headers
                  .set(
                    'Authorization',
                    'Bearer ' + this.storage.getItem('access_token')
                  );
          req = req.clone({ headers });
        }
        return next
                .handle(req)
                .pipe(
                    catchError(error => this.handleError(error))
                );
    }

    private handleError(event: HttpErrorResponse) {
      if (event.status === 401 || event.status === 403) {
        this.router.navigate(['/home', { needsLogin: true }]);
      }
      return throwError(event);
    }
}
