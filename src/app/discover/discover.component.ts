import { Component, OnInit } from '@angular/core';
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
  // refresh
  refresh: number | undefined;
  // attributes
  attribute_one: Object | undefined;
  attribute_two: Object | undefined;
  attribute_three: Object | undefined;
  attribute_four: Object | undefined;
  attribute_five: Object | undefined;

  // stale
  stale_one: boolean | undefined;
  stale_two: boolean | undefined;
  stale_three: boolean | undefined;
  stale_four: boolean | undefined;
  stale_five: boolean | undefined;

  constructor(private tileDataService: TileDataService,
              public tileGeneratorService: TileGeneratorService) { }

  ngOnInit(): void {
    this.tileGeneratorService.getUnclaimedLand().subscribe((res: UnclaimedLand | undefined) => {
      // if time > refresh
      this.refresh = res?.refresh;

      // else use last batch
      this.attribute_one = res?.attributes_one;
      this.attribute_two = res?.attributes_two;
      this.attribute_three = res?.attributes_three;
      this.attribute_four = res?.attributes_four;
      this.attribute_five = res?.attributes_five;

      this.stale_one = res?.stale_one;
      this.stale_two = res?.stale_two;
      this.stale_three = res?.stale_three;
      this.stale_four = res?.stale_four;
      this.stale_five = res?.stale_five;      
    });
  }

  async getTileStructures(){
    this.tileDataService.getTileStructures(this.uri).then((res) => console.log(res));
  }
}
