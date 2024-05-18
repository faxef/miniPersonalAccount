import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ProfileService } from "../../../core/services/profile.service";
import { User } from "../../../core/interfaces/user";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  processing = false;
  userData!: User;

  profileForm = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
    this.patchValues();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileUpdate();
    }
  }

  private patchValues() {
    const { id, username, firstName, lastName, birthDate, city } = this.userData;
    this.profileForm.patchValue({
      id,
      username,
      firstName,
      lastName,
      birthDate,
      city,
    });
  }

  private profileUpdate() {
    this.processing = true;
    this.profileService.update(this.profileForm.value).pipe(
      tap(() => {
        this.processing = false;
        this.userData = this.authService.getUserData();
      }),
      catchError((err) => {
        console.error('---- Ошибка ---- ', err);
        this.processing = false;
        return of(null);
      })
    ).subscribe();
  }
}
