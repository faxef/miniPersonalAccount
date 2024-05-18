import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";


const routes = [
  {path: '', component: LoginPageComponent},
]
@NgModule({
  declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatFormField,
        MatInput,
        MatLabel
    ]
})
export class LoginPageModule { }
