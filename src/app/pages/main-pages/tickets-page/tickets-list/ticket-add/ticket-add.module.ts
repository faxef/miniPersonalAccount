import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketAddComponent} from "./ticket-add.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [TicketAddComponent],
  exports: [
    TicketAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TicketAddModule { }
