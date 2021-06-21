import { Component, OnInit } from '@angular/core';
import { Coordinate } from 'src/app/models/coordinate.model';
import { EthersService } from 'src/app/services/ethers.service';
import { HexagonService } from 'src/app/services/hexagon.service';

const myDataArray: Coordinate[] = []

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.less']
})
export class BrowserComponent implements OnInit {

  public numTokens: number;
  displayedColumns: string[] = ['position', 'location','weight','link',];
  dataSource = myDataArray;

  
  constructor(
    private ethers: EthersService,
    private hexagonService: HexagonService,
  ) {}

  async ngOnInit() {
    this.numTokens = await this.ethers.getBalanceOf();
    this.ethers.getTokenIdByOwner().then((res) => {
      let coordinates: Coordinate[] = [];
      res.forEach((id) => {
        coordinates.push(this.hexagonService.getCoordinatesFromId(id));
      })
      this.dataSource = coordinates;
    })
  }

  public generateLink(coords: Coordinate) {
    let location = new Coordinate(coords.x, coords.y, coords.z);
    const id = this.hexagonService.getIdFromCoordinates(location);
    return `/dashboard/${id}`;
  }

}