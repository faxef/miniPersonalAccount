import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(() => {

        const auth = request.headers.get('Authorization');


        // Добавить элемент
        if (request.url.endsWith(`${environment.apiBaseUrl}/api/ticket`) && request.method === 'POST') {

          console.log(`[intercepting] ${request.method} : ${request.url} ${auth}`);

          const bodyPosted = request.body;
          const random = Math.floor(Math.random() * 1000) + 1;
          const newResult = {...bodyPosted, id: random};

          const body = {
            success: bodyPosted ? true : false,
            result: newResult
          };
          return of(new HttpResponse({status: 200, body: body}));
        }

        // Обновить элемент
        if (request.url.startsWith(`${environment.apiBaseUrl}/api/ticket`) && request.method === 'PUT') {

          console.log(`[intercepting] ${request.method} : ${request.url} ${auth}`);

          const bodyPosted = request.body;

          const body = {
            success: bodyPosted ? true : false,
            result: bodyPosted
          };
          return of(new HttpResponse({status: 200, body: body}));
        }

        // Удалить элемент
        if (request.url.startsWith(`${environment.apiBaseUrl}/api/ticket/`) && request.method === 'DELETE') {
          console.log(`[intercepting] ${request.method} : ${request.url} ${auth}`);
          const body = {
            success: true
          };
          return of(new HttpResponse({status: 200, body: body}));
        }

        // Изменение профиля
        if (request.url.endsWith(`${environment.apiBaseUrl}/api/profile/edit`) && request.method === 'PUT') {

          const bodyPosted = request.body;
          let body = {};

          body = {
            username: bodyPosted['username'],
            firstName: bodyPosted['firstName'],
            lastName: bodyPosted['lastName'],
            birthDate: bodyPosted['birthDate'],
            city: bodyPosted['city'],
          }
          return of(new HttpResponse({status: 200, body: body}));
        }

        // ВХОД
        if (request.url.endsWith(`${environment.apiBaseUrl}/api/auth/login`) && request.method === 'POST') {

          console.log(`[intercepting] ${request.method} : ${request.url} ${auth}`);

          const bodyPosted = request.body;

          const randomId = Math.floor(Math.random() * 9999);

          let body = {};

          // Имитация успешного/неуспешного входа
          if (bodyPosted['username'] == 'admin' && bodyPosted['password'] == 'admin') {
            body = {
              token: `token_${this.makeToken()}`,
              user: {
                id: randomId,
                username: bodyPosted['username'],
                firstName: bodyPosted['firstName'],
                lastName: bodyPosted['lastName'],
                birthDate: bodyPosted['birthDate'],
                city: bodyPosted['city'],
              }
            };
            return of(new HttpResponse({status: 200, body: body}));
          } else {
            return of(new HttpResponse({status: 401}));
          }
        }

        // ВЫХОД
        if (request.url.endsWith(`${environment.apiBaseUrl}/api/auth/logout`) && request.method === 'GET') {
          console.log(`[intercepting] ${request.method} : ${request.url} ${auth}`);
          const body = {
            success: true
          };
          return of(new HttpResponse({status: 200, body: body}));
        }

        // В противном случае просто обработать запрос
        return next.handle(request);
      })
    )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  private makeToken(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 25; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
