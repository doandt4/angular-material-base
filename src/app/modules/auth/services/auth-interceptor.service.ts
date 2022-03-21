import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApmWrapperService } from '../../core';
import { augmentErrorResponse, makeLogArguments } from './auth-interceptor-helper';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private apmWrapperService: ApmWrapperService) {}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 401) {
            this.apmWrapperService.captureError(new Error('Http status code 401 received.'));
            this.authService.logout();
        }
        const errorResponse = augmentErrorResponse(error);
        const defaultMessage = [errorResponse.message];
        const messages =
            errorResponse instanceof HttpErrorResponse
                ? defaultMessage
                : (((errorResponse.errorJson && errorResponse.errorJson.message) || defaultMessage) as string[]);
        const message = messages.join('\n');
        this.apmWrapperService.captureError(new Error(message));
        return throwError(errorResponse);
    }

    private logRequest(req: HttpRequest<any>) {
        const transactionName = environment.elasticAPM.transactionName;
        if (transactionName && req.headers.has(transactionName)) {
            const { id = '', email = '' } = this.authService.getUser() || {};
            const args = makeLogArguments(req);
            const customTransactionName = req.headers.get(transactionName) || '';
            const transaction = this.apmWrapperService.startTransaction(
                customTransactionName,
                'custom',
                { id, email },
                args,
            );
            const httpSpan = this.apmWrapperService.startSpan(`${req.method} ${req.urlWithParams}`, 'http');
            return [transaction, httpSpan];
        }
        return [undefined, undefined];
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.authService.getJWT();
        const [transaction, httpSpan] = this.logRequest(req);

        if (!jwt) {
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => this.handleError(error)),
                finalize(() => {
                    this.apmWrapperService.endTransaction(transaction, httpSpan);
                }),
            );
        }

        const headers: { [key: string]: string } =
            req.body instanceof FormData
                ? { Authorization: `Bearer ${jwt}` }
                : {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${jwt}`,
                  };

        req = req.clone({
            setHeaders: headers,
        });

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => this.handleError(error)),
            finalize(() => {
                this.apmWrapperService.endTransaction(transaction, httpSpan);
            }),
        );
    }
}
