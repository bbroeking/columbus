import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { LandAttributes } from '../models/land-attributes.model';
import { CloudFunctionsService } from '../services/cloud-functions.service';
import { TileDataService } from '../services/tile-data.service';
import { TileGeneratorService, UnclaimedLand } from '../services/tile-generator.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.less']
})
export class DiscoverComponent implements OnInit {

  uri: string;
  page: string = 'Discover';
  // refresh
  refresh: number | undefined;
  // attributes
  attribute_one: LandAttributes | undefined;
  attribute_two: LandAttributes | undefined;
  attribute_three: LandAttributes | undefined;
  attribute_four: LandAttributes | undefined;
  attribute_five: LandAttributes | undefined;

  // stale
  stale_one: boolean | undefined;
  stale_two: boolean | undefined;
  stale_three: boolean | undefined;
  stale_four: boolean | undefined;
  stale_five: boolean | undefined;

  timeinterval: any; 
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  
  WEEK = 1000 * 60 * 60 * 24 * 7;

  constructor(private tileDataService: TileDataService,
              public tileGeneratorService: TileGeneratorService) { }

  ngOnInit(): void {
    this.tileGeneratorService.getUnclaimedLand().subscribe((res: UnclaimedLand | undefined) => {
      // if time > refresh
      this.refresh = res?.refresh;
      if(this.refresh) if (this.refresh + this.WEEK < Date.now()) {
        this.tileGeneratorService.refreshUnclaimedLands();
      }

      // ticking refresh clock
      interval(1000).subscribe(
        () => this.updateClock()
      )
      // else use last batch
      this.attribute_one = res?.attributes_one as LandAttributes;
      this.attribute_two = res?.attributes_two as LandAttributes;
      this.attribute_three = res?.attributes_three as LandAttributes;
      this.attribute_four = res?.attributes_four as LandAttributes;
      this.attribute_five = res?.attributes_five as LandAttributes;

      this.stale_one = res?.stale_one;
      this.stale_two = res?.stale_two;
      this.stale_three = res?.stale_three;
      this.stale_four = res?.stale_four;
      this.stale_five = res?.stale_five;
    });

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


  async getTileStructures(){
    this.tileDataService.getTileStructures(this.uri).then((res) => console.log(res));
  }
}
