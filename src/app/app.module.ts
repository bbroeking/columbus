import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Provider } from './services/ethers-utils/web3-provider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { InitalizeService } from './services/initalize.service';
import { EthersService } from './services/ethers.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';

import { BrowserComponent } from './browser/browser.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { ParcelDetailsComponent } from './parcel-details/parcel-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParcelTileComponent } from './parcel-tile/parcel-tile.component';

// Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { providers } from 'ethers';
import { TileDataService } from './services/tile-data.service';

export function init_app(initalizeService: InitalizeService) {
  return () => initalizeService.init();
}

export function enableWeb3Provider(provider: providers.Web3Provider) {
  return () => {
    provider.getSigner();  // Ask the user to enable MetaMask at load time.
  };
}

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    MapComponent,
    BrowserComponent,
    ParcelDetailsComponent,
    DashboardComponent,
    ParcelTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [{ provide: Window,
                useValue: window 
              },
              {
                provide: APP_INITIALIZER, // move this to a better spot
                useFactory: enableWeb3Provider,
                deps: [Provider],
                multi: true
              },
              // { provide: APP_INITIALIZER,
              //   useFactory: init_app,
              //   deps: [InitalizeService], // might also need web3
              //   multi: true,
              // },
              InitalizeService,
              EthersService,
              TileDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
