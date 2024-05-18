import {Component, OnDestroy} from '@angular/core';
import {Ticket} from "../../../../core/interfaces/ticket";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketsService} from "../../../../core/services/tickets.service";
import {catchError, tap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogComponent} from "../../../../components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.scss'
})
export class TicketPageComponent implements OnDestroy {
  processing = false;
  ticketData!: Ticket;

  private $ticketParams: any;
  private ticketId: any;

  ticketForm = new FormGroup({
    id: new FormControl({value: 0, disabled: true}),
    createdAt: new FormControl({value: '', disabled: true}),
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private ticketService: TicketsService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // Подписка на роутинг параметры
    this.$ticketParams = this.activatedRoute.params.subscribe(params => {
      this.ticketId = params['id'];
    });

    this.getTicketData()
  }

  ticketDelete(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {message: 'Вы уверены, что хотите удалить этот тикет?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Если подтверждено удаление, вызываем метод удаления из сервиса
        this.ticketService.delete(this.ticketId).subscribe();
        void this.router.navigate(['/tickets']);
      }
    });
  }

  getTicketData() {
    this.ticketService.get(this.ticketId).pipe(
      tap(data => {
        if (data) {
          this.ticketData = data
          this.patchValues()
        }
      })
    ).subscribe().unsubscribe()
  }

  ticketUpdate() {
    this.processing = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {message: 'Вы уверены, что хотите изменить этот тикет?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.ticketService.update(this.ticketId, this.ticketForm.value).pipe(
          tap((data) => {
            this.ticketData = data
            this.processing = false
          }),
          catchError((err) => {
            console.error('---- Ошибка ---- ', err);
            this.processing = false
            return of(null);
          })
        ).subscribe()
        void this.router.navigate(['/tickets']);
      }
    });


  }

  private patchValues() {
    this.ticketForm.patchValue({
      id: this.ticketData.id,
      createdAt: this.ticketData.createdAt,
      title: this.ticketData.title,
      description: this.ticketData.description,
    });
  }

  ngOnDestroy(): void {
    this.$ticketParams.unsubscribe();
  }
}
