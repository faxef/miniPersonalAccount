import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketPageComponent} from './ticket-page.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "../../../../components/dialog/dialog.module";


@NgModule({
  declarations: [
    TicketPageComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule
  ]
})
export class TicketPageModule {
}
