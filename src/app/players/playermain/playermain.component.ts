import { Component, OnInit } from '@angular/core';
import { Observable, Subject, timer, combineLatest, forkJoin, interval } from 'rxjs';
import { map, take, tap, delay, mergeMap } from 'rxjs/operators';
import { of, from, fromEvent } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { startWith } from 'rxjs/internal/operators/startWith';
import { scan } from 'rxjs/internal/operators/scan';
//import { from } from 'rxjs/internal/observable/from';
//https://www.learnrxjs.io/operators/combination/combinelatest.html



/*
RXJS Common Operators V6
========================
Creation	
--------
from  - Create new obeservable from another boservable
fromPromise - 
fromEvent 
of

Combination	-
============== 
combineLatest , 
concat , 
merge , 
startWith , 
withLatestFrom , 
zip

Filtering -	debounceTime , distinctUntilChanged , filter , take , takeUntil
Transformation	- bufferTime , concatMap , map , mergeMap , scan , switchMap
Utility	- tap
Multicasting	- share

The following operators were renamed V6
=======================================
catch() => catchError()
do() => tap()
finally() => finalize()
switch() => switchAll()
Additionally, some Observable-creation methods were renamed/ refactored:

throw() => throwError()
fromPromise() => from() (this automatically detects the type)

*/
//////////////////////////////////////////////********* FORKJOIN ***************************************/
////////////////////////////////////////////////***************** */**///////////////////////*/*/*/*/*/*/
const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  of('Hello'),
  //emit 'World' after 1 second
  of('World').pipe(delay(1000)),
  //emit 0 after 1 second
  interval(1000).pipe(take(1)),
  //emit 0...1 in 1 second interval
  interval(1000).pipe(take(2)),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));



const myPromise1 = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

const source = of([1, 2, 3, 4, 5]);
//emit array of all 5 results
const example2 = source.pipe(mergeMap(q => forkJoin(...q.map(myPromise1))));


@Component({
  selector: 'app-playermain',
  templateUrl: './playermain.component.html',
  styleUrls: ['./playermain.component.css']
})
export class PlayermainComponent implements OnInit, AfterViewInit {
  myObs = of('Hello', 'Alligator', 'World!');
  myObsfrom = from(this.myObs);
  myObsCon = of('Srilanka', 'UK', 'USA', 'France');
  filteredarray: Array<string>;
  inject: string;

  el = document.getElementById('myel');
  // Create an Observable that will publish mouse movements
  mouseMoves = fromEvent(this.el, 'mousemove');

  @ViewChild('button1') button: ElementRef;
  setHtml = id => val => (document.getElementById(id).innerHTML = val);




  constructor() {
    this.filteredarray = new Array<string>()
    this.DoOfOperator();
    this.DoFilter();



  }

  DoFilter() {
    /*
    Newly introduced pipe() method for this (it was actually already added in RxJS 5.5).
    pipe takes an infinite amount of arguments and each argument is an operator you want to apply to the Observable.
    */

    //this is separation of the filters .
    this.myObsCon
      .pipe(filter(x => x.length > 3))
      .pipe(map(x => x.substring(0, 3)))
      .subscribe(
      x => this.filteredarray.push(x)
      )

    console.log(this.filteredarray)

    //this is pipe taking 2 operators 
    this.myObs
      .pipe
      (
      tap(x => console.log(x)),
      map(x => x.toUpperCase()),
      filter(x => x.length > 8)
      )
      .subscribe(x => console.log(x))

  }

  DoOfOperator() {
    const nums = of(1, 2, 3);
    const squareValues = map((val: number) => val * val);
    const squaredNums = squareValues(nums);
    console.log(squaredNums);
    squaredNums.subscribe(
      x => console.log(x)
    );

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    var buttonStream = fromEvent(this.button.nativeElement, 'click')
    var subscription = buttonStream.subscribe((Evt: MouseEvent) => {
      console.log(`Coords: ${Evt.clientX} X ${Evt.clientY}`);
      if (Evt.clientX < 40 && Evt.clientY < 40) {
        subscription.unsubscribe();
      }
    })

    var addOneClick$ = id =>
      fromEvent(document.getElementById(id), 'click').pipe(
        // map every click to 1
        mapTo(1),
        startWith(0),
        // keep a running total
        scan((acc, curr) => acc + curr),
        // set HTML for appropriate element
        tap(this.setHtml(`${id}Total`))
      );

    var combineTotal$ = combineLatest(addOneClick$('red'), addOneClick$('black'))
      .pipe(map(([val1, val2]) => val1 + val2))
      .subscribe(this.setHtml('total'));
  }

  Promisses() {
    const myPromise = willReject => {
      return new Promise((resolve, reject) => {
        if (willReject) {
          reject('Rejected!');
        }
        resolve('Resolved!');
      });
    };
  }

  ClicOperator() {

  }

  CombineLates() {
    //timerOne emits first value at 1s, then once every 4s
    const timerOne = timer(1000, 4000);
    //timerTwo emits first value at 2s, then once every 4s
    const timerTwo = timer(2000, 4000);
    //timerThree emits first value at 3s, then once every 4s
    const timerThree = timer(3000, 4000);

    //when one timer emits, emit the latest values from each timer as an array
    const combined = combineLatest(timerOne, timerTwo, timerThree);

    const subscribe = combined.subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        /*
          Example:
        timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
        timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
        timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
      */
        console.log(
          `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
        );
      }
    );

  }

}
