import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {concatMap, map, switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {
    FlightBookingActionTypes,
    FlightBookingActions,
    FlightsLoadAction,
    FlightsLoadedAction
} from '../actions/flight-booking.actions';
import {FlightService} from "@flight-workspace/flight-api";


@Injectable()
export class FlightBookingEffects {

  @Effect()
  flightsLoad$ = this.actions$
    .pipe(
        ofType(FlightBookingActionTypes.FlightsLoadAction),
        switchMap((a: FlightsLoadAction) => this.flightService.find(a.from, a.to)),
        map(flights => new FlightsLoadedAction(flights))
    );

  constructor(
    private actions$: Actions<FlightBookingActions>,
    private flightService: FlightService) {}
}
