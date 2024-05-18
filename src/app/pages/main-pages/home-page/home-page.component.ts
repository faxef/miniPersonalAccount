import { Component } from '@angular/core';
import {TicketsPageComponent} from "../tickets-page/tickets-page.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent extends TicketsPageComponent{

}
