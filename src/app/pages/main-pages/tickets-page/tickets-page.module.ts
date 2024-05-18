import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsPageComponent } from './tickets-page.component';
import {TicketsListComponent} from "./tickets-list/tickets-list.component";
import {TicketAddModule} from "./tickets-list/ticket-add/ticket-add.module";



@NgModule({
  declarations: [
    TicketsPageComponent,
    TicketsListComponent,
  ],
  exports: [
    TicketsListComponent
  ],
  imports: [
    CommonModule,
    TicketAddModule
  ]
})
export class TicketsPageModule { }
