import { Component } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Ticket} from "../../../core/interfaces/ticket";

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent {

  tickets$: BehaviorSubject<Ticket[]> | undefined;

  constructor(
    private ticketsService: TicketsService
  ) { }

  ngOnInit() {
    // this.tickets$  = this.ticketsService.tickets$;
  }

  hasTickets(tickets: Ticket[]): boolean {
    return tickets && tickets.length > 0;
  }

}
