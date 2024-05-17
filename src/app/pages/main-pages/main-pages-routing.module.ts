import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {TicketsPageComponent} from "./tickets-page/tickets-page.component";
import {TicketPageComponent} from "./tickets-page/ticket-page/ticket-page.component";
import {MainPagesComponent} from "./main-pages.component";

const routes: Routes = [
  {
    path: '', component: MainPagesComponent, children: [
      {path: '', component: HomePageComponent},
      {path: 'profile/:id', component: ProfilePageComponent},
      {
        path: 'tickets', children: [
          {path: '', component: TicketsPageComponent},
          {path: 'ticket/:id', component: TicketPageComponent}
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule {
}
