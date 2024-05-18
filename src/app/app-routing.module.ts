import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/main-pages/main-pages.module').then(m => m.MainPagesModule),canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./pages/auth-pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
