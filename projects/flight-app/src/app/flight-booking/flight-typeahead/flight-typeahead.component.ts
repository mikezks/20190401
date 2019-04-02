import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.timer$ = timer(0, 1000)
      .pipe(
        //take(3),
        takeUntil(this.destroy$),
        tap(value => console.log('operator', value))
      );

    /* this.timerSubscription = this.timer$
      .subscribe(
        value => console.log('callback', value)
      ); */
  }

  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
    this.destroy$.next(true);
  }

}
