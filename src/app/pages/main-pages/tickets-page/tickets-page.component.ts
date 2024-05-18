import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Ticket} from "../../../core/interfaces/ticket";
import {TicketsService} from "../../../core/services/tickets.service";

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss',
})
export class TicketsPageComponent {

  tickets$: BehaviorSubject<Ticket[]> | undefined;

  constructor(
    private ticketsService: TicketsService
  ) {
  }

  ngOnInit() {
    this.tickets$ = this.ticketsService.tickets$;
  }

}
