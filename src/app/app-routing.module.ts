import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: '', component: MainPageComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  // { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
