import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketAddComponent} from "./ticket-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";



@NgModule({
  declarations: [TicketAddComponent],
  exports: [
    TicketAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ]
})
export class TicketAddModule { }
