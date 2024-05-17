import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesComponent } from './main-pages.component';
import {RouterOutlet} from "@angular/router";
import {MainPagesRoutingModule} from "./main-pages-routing.module";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";



@NgModule({
  declarations: [
    MainPagesComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MainPagesRoutingModule,
  ],
})
export class MainPagesModule { }
