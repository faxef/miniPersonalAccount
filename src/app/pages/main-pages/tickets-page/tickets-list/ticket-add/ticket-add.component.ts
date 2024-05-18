import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ticket} from "../../../../../core/interfaces/ticket";
import {TicketsService} from "../../../../../core/services/tickets.service";

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrl: './ticket-add.component.scss'
})
export class TicketAddComponent {

  @Input() item: Ticket | null | undefined;
  @Output() formSubmitEvent = new EventEmitter<string>();

  ticketForm: FormGroup = new FormGroup({});

  processing: Boolean = false;

  constructor(
    private ticketsService: TicketsService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {

    this.processing  = true;

    if (this.ticketForm.valid) {
      if (!this.item) {
        this.doAddItem();
      } else {
        this.doUpdateItem();
      }
    }
  }

  getButtonText(): string {
    return this.item ? 'Обновить' : 'Добавить';
  }

  private doAddItem() {
    console.log(this.ticketForm.value);
    this.ticketsService.add(this.ticketForm.value).subscribe(
      (result) => {
        this.ticketForm.reset();
        this.formSubmitEvent.next('add');
        this.processing  = false;
      }
    );
  }

  private doUpdateItem() {
    this.ticketsService.update(this.ticketForm.value.id , this.ticketForm.value).subscribe(
      (result) => {
        if (result) {
          this.formSubmitEvent.next('update');
          this.reset();
        }
        this.processing  = false;
      }
    );
  }

  private reset() {
    this.item  = null;
    this.ticketForm.reset();
    this.initForm();
  }

  private initForm() {
    this.ticketForm = new FormGroup({
      title: new FormControl(this.item ? this.item.title : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : ''),
      id: new FormControl(this.item ? this.item.id : null),
    });
  }

}
