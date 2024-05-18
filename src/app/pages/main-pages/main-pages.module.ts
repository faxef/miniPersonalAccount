import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesComponent } from './main-pages.component';
import {RouterOutlet} from "@angular/router";
import {MainPagesRoutingModule} from "./main-pages-routing.module";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {TicketsPageModule} from "./tickets-page/tickets-page.module";
import {HomePageModule} from "./home-page/home-page.module";
import {ProfilePageModule} from "./profile-page/profile-page.module";
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";



@NgModule({
  declarations: [
    MainPagesComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    // Модуль Тикетов
    TicketsPageModule,
    // Главная страница
    HomePageModule,
    //Страница профиля
    ProfilePageModule,
    // Роутинг
    MainPagesRoutingModule,
  ],
})
export class MainPagesModule { }
