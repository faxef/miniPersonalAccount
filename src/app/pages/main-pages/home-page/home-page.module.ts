import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./home-page.component";
import {TicketAddModule} from "../tickets-page/tickets-list/ticket-add/ticket-add.module";
import {TicketsPageModule} from "../tickets-page/tickets-page.module";



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    TicketAddModule,
    TicketsPageModule
  ]
})
export class HomePageModule { }
