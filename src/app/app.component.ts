import { Component } from '@angular/core';
import { MetamaskService } from './services/metamask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public metamaskService: MetamaskService) {}
}
