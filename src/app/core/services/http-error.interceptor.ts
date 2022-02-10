import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { TokenService } from './token.service';
@Injectable({
    providedIn: "root",
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private notifierService: NotifierService, private tokenService: TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //get jwt token
        const token = this.tokenService.getToken();
        let req1 = request;
        if (token != null) {
            req1 = request.clone({
                headers: request.headers.append('Authorization', 'Bearer ' + token),
            });
        }
        return next.handle(req1)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage;
                    console.log(error);
                    if(error.error.message){
                        errorMessage = error.error.message;
                    }
                    else{
                        errorMessage="Server Offline Connection Refused"
                    }                   
                    console.log("ERR:", errorMessage);
                    this.notifierService.notify('error', errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}