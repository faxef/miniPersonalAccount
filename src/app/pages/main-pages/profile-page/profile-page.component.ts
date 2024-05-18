import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {ProfileService} from "../../../core/services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  processing = false;
  profileForm = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.patchValues()
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileUpdate()
    }
  }

  private patchValues() {
    this.profileForm.patchValue({
      id: this.authService.getUserData().id,
      username: this.authService.getUserData().username,
      firstName: this.authService.getUserData().firstName,
      lastName: this.authService.getUserData().lastName,
      birthDate: this.authService.getUserData().birthDate,
      city: this.authService.getUserData().city,
    });
  }

  private profileUpdate() {
    this.processing = true;
    this.profileService.update(this.profileForm.value).pipe(
      tap((data) => {
        this.processing = false
      }),
      catchError((err) => {
        console.error('---- Ошибка ---- ', err);
        this.processing = false
        return of(null);
      })
    ).subscribe();
  }
}
