import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  processing: Boolean = false;
  error: Boolean = false;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.error = false;
    this.processing = false;
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.processing = true;
  }

  private handleLoginSuccess() {
    this.processing = false;
    this.error = false;
  }

  private handleLoginError() {
    this.processing = false;
    this.error = true;
  }

}
