import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //OnPush стратегия для улучшения производительности
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  hide = true;
  processing = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.processing = true;
    this.authService.login(this.loginForm.value).pipe(
      tap((data) => {
        data ? this.handleLoginSuccess() : this.handleLoginError();
      }),
      catchError((err) => {
        console.error('---- Ошибка ---- ', err);
        this.handleLoginError();
        return of(null);
      })
    ).subscribe();
  }

  private handleLoginSuccess() {
    this.processing = false;
    void this.router.navigate(['/']); // Редирект на главную страницу или другую защищенную страницу
  }

  private handleLoginError() {
    this.processing = false;
    this.snackBar.open('Проверьте логин или пароль', 'Ok');
  }
}
