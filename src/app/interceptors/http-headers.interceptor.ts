import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
        setHeaders: {
          'x-rapidapi-key': '4be0e5d653msh3acd1bbfb2dbb83p1b515cjsn922f40d866b9',
          'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
        },
        setParams: {
          key: 'f959a9792af34a0c9ba6cea238ac34b1'
        }
      });

    return next.handle(request);
  }
}
