import { Component, OnInit, OnDestroy } from '@angular/core';
import {timer, Observable, Subscription, Subject, interval, combineLatest, of, pipe, iif} from 'rxjs';
import {
    tap,
    take,
    takeUntil,
    switchMap,
    debounceTime,
    filter,
    startWith,
    map,
    distinctUntilChanged, merge
} from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {Flight} from "@flight-workspace/flight-api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  online$: Observable<boolean>;
  online: boolean;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initTypeahead();
    //this.rxjsDemo();
  }

  initTypeahead(): void {

    this.online$ = interval(2000)
        .pipe(
          startWith(0),
          map(x => Math.random() < 0.5),
          distinctUntilChanged(),
          tap(x => this.online = x)
        );

    this.flights$ =
        this.control.valueChanges
            .pipe(
                value => combineLatest(value, this.online$),
                filter(([value, online]) => online),
                map (([value, online]) => value),
                distinctUntilChanged(),
                debounceTime(300),
                switchMap((value: string) =>
                  iif(
                      () => value.length > 2,
                      of(value)
                          .pipe(
                            tap(() => this.loading = true),
                            switchMap(value => this.load(value)),
                            tap(() => this.loading = false)
                          ),
                      of([])
                  )
                /*{
                  if (value.length > 2) {
                      return of(value)
                          .pipe(
                            tap(() => this.loading = true),
                            switchMap(value => this.load(value)),
                            tap(() => this.loading = false)
                          );
                  } else {
                      return of([]);
                  }
                }*/
                )
            );
  }

  load(from: string): Observable<Flight[]> {
      const url = "http://www.angular.at/api/flight";

      const params = new HttpParams()
          .set('from', from);

      const headers = new HttpHeaders()
          .set('Accept', 'application/json');

      return this.http.get<Flight[]>(url, {params, headers});
  }

  rxjsDemo(): void {
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
