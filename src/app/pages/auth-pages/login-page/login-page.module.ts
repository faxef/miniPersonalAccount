import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


const routes = [
  {path: '', component: LoginPageComponent},
]
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginPageModule { }
