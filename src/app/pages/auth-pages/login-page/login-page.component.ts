import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  processing = false;
  error = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    }
  }

  onSubmit() {
    this.error = false;
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.processing = true;
    this.authService.login(this.loginForm.value).pipe(
      tap((data) => {
        if (data) {
          this.handleLoginSuccess();
        } else {
          this.handleLoginError();
        }
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
    this.error = false;
    this.router.navigate(['/']); // Редирект на главную страницу или другую защищенную страницу
  }

  private handleLoginError() {
    this.processing = false;
    this.error = true;
  }

}
