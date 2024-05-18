import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsPageComponent } from './tickets-page.component';
import {TicketsListComponent} from "./tickets-list/tickets-list.component";
import {TicketAddModule} from "./tickets-list/ticket-add/ticket-add.module";
import {
  MatTableModule
} from "@angular/material/table";
import {TicketPageModule} from "./ticket-page/ticket-page.module";



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
    TicketAddModule,
    MatTableModule,
    TicketPageModule
  ]
})
export class TicketsPageModule { }
