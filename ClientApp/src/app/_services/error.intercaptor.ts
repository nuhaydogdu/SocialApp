import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //bize burada gelecek olan http repuest var ve request sonucunda bir response dönecek biz burada next parametresiyle sürecin içerisine kendi özel kodlarımızı eklemiş oluyoruz
    //ErrorInterceptor'u uygulamaya tanıtmak için app.module içerisinde provider kısmına ekliyoruz.
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 400) {
          if (error.error) {
            return throwError(error.error);
          }

          //eğer gelen responsenin error bilgisi errorsu içeriyorsa
          if (error.error.errors) {
            const serverError = error.error;
            let errorMessage = '';

            for (const key in serverError.errors) {
              errorMessage += serverError.errors[key] + '\n';
            }

            return throwError(errorMessage);
          }

          return throwError(error.error.message);
        }

        if (error.status === 401) {
          return throwError(error.statusText);
        }

        if (error.status === 500) {
          return throwError(error.error.Message);
        }

        return throwError(error);
      })
    );
  }
}
