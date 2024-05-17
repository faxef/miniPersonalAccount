import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'account', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  // { path: 'logout', component: LogoutComponent },
  // { path: '**', redirectTo: '/account', pathMatch: 'full' },
  { path: '',  redirectTo: '/login', pathMatch: 'full' }, // catch all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
