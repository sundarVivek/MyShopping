import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        catchError((err) => {
          this.spinner.setLoading(false, request.url);
          throw err;
        }),
        map((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinner.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}

