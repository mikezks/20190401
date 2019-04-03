import { Action } from '@ngrx/store';
import {Flight} from "@flight-workspace/flight-api";

export enum FlightBookingActionTypes {
    FlightsLoadedAction = '[FlightBooking] Flights loaded',
    FlightUpdateAction = '[FlightBooking] Update Flights',
    FlightsLoadAction = '[FlightBooking] Flights load'
}

export class FlightsLoadedAction implements Action {
  readonly type = FlightBookingActionTypes.FlightsLoadedAction;
  constructor(readonly flights: Flight[]) {}
}

export class FlightUpdateAction implements Action {
    readonly type = FlightBookingActionTypes.FlightUpdateAction;
    constructor(readonly flight: Flight) {}
}

export class FlightsLoadAction implements Action {
    readonly type = FlightBookingActionTypes.FlightsLoadAction;
    constructor(readonly from: string, readonly to: string) {}
}


export type FlightBookingActions =
    FlightsLoadedAction |
    FlightUpdateAction |
    FlightsLoadAction;
