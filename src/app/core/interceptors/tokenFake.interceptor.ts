import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {environment} from "../../../environments/environment";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Проверяем, если URL запроса начинается с apiBaseUrl
    if (request.url.startsWith(`${environment.apiBaseUrl}/api`)) {
      const token = this.authService.getToken();

      // Добавляем токен в заголовки, если он существует
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    // Передаем запрос дальше
    return next.handle(request);
  }
}
