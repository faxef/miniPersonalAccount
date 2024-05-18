import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Ticket } from "../../../../../core/interfaces/ticket";
import { TicketsService } from "../../../../../core/services/tickets.service";

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss']
})
export class TicketAddComponent {

  @Input() item: Ticket | null | undefined;
  @Output() formSubmitEvent = new EventEmitter<string>();

  ticketForm: FormGroup = new FormGroup({});

  processing = false;

  constructor(private ticketsService: TicketsService) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.processing = true;

    if (this.ticketForm.valid) {
      if (!this.item) {
        this.doAddItem();
      }
    }
  }

  private doAddItem() {
    this.ticketsService.add(this.ticketForm.value).subscribe(
      () => {
        this.ticketForm.reset();
        this.formSubmitEvent.next('add');
        this.processing = false;
      }
    );
  }

  private initForm() {
    this.ticketForm = new FormGroup({
      title: new FormControl(this.item ? this.item.title : '', Validators.required),
      description: new FormControl(this.item ? this.item.description : ''),
      id: new FormControl(this.item ? this.item.id : null),
    });
  }

}
