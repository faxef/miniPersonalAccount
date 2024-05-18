import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {

  @Input() data: any = [];

  displayedColumns: string[] = ['id', 'title', 'description', 'createdAt'];

  constructor(private router: Router) {
  }

  navigateToTicket(row: any): void {
    void this.router.navigate(['/tickets/ticket', row.id]);
  }
}
