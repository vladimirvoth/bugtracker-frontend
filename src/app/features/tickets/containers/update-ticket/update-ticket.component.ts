import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { updateTicketForm } from '../../models/forms';
import { priorities, statuses, types } from '../../models/ticket';
import { getTicket, updateTicket } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectCurrentTicket, selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit, OnDestroy {
  id: string;
  ticketForm = updateTicketForm;
  types = types;
  priorities = priorities;
  statuses = statuses;

  ticket$ = this.store.select(selectCurrentTicket);
  loading$ = this.store.select(selectLoading);

  protected componentDestroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromTickets.State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.store.dispatch(getTicket({ id: params['id'] }));

      this.ticket$
        .pipe(
          takeUntil(this.componentDestroyed$),
          filter((ticket) => Boolean(ticket))
        )
        .subscribe((ticket) => {
          this.id = ticket._id;

          this.ticketForm.patchValue({
            title: ticket.title,
            type: ticket.type,
            priority: ticket.priority,
            status: ticket.status,
            description: ticket.description
          });
        });
    });
  }

  save(value, property) {
    this.store.dispatch(updateTicket({ id: this.id, value, property }));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
