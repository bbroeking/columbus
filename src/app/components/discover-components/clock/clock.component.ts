import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.less']
})
export class ClockComponent implements OnInit {

  days:number;
  hours: number;
  minutes: number;
  seconds: number;
  refresh: number;
  timeinterval: number;
  WEEK = 1000 * 60 * 60 * 24 * 7;
  constructor() { }

  ngOnInit(): void {
        // ticking refresh clock
    interval(1000).subscribe(
      () => this.updateClock()
    );
  }

    updateClock() {
    const t = this.getTimeRemaining(this.refresh!);
    this.days = t.days;
    this.hours = t.hours;
    this.minutes = t.minutes;
    this.seconds = t.seconds
    if (t.total <= 0) {
      clearInterval(this.timeinterval);
    }
  }

  getTimeRemaining(endtime: number){
    const total = (endtime + this.WEEK) - Date.now();
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
}
