import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Этот метод будет проверять только наличие токена,
    // но не проверит, действителен ли этот токен
    // При необходимости можно также проверить токен на сервере
    // каждый раз при вызове этого гарда
    if (this.authService.hasToken()) {
      return true;
    }

    // Если пользователь не авторизован, перенаправляем его на страницу входа
    // и передаем ему текущий путь в качестве параметра returnUrl
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
