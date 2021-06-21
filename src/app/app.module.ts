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


import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';



// Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { providers } from 'ethers';
import { TileDataService } from './services/tile-data.service';
import { HoverTileMenuComponent } from './hover-tile-menu/hover-tile-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StructureComponent } from './structure/structure.component';
import { StructureDetailsComponent } from './structure-details/structure-details.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { AngularFireFunctionsModule, USE_EMULATOR } from '@angular/fire/functions';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverParcelComponent } from './discover-parcel/discover-parcel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StructureUpgradeDialogComponent } from './structure-upgrade-dialog/structure-upgrade-dialog.component';
import { WarRoomComponent } from './war-room/war-room.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { CloudFunctionsService } from './services/cloud-functions.service';


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
    ParcelTileComponent,
    HoverTileMenuComponent,
    NavbarComponent,
    StructureComponent,
    StructureDetailsComponent,
    LoginComponent,
    DiscoverComponent,
    DiscoverParcelComponent,
    LandingPageComponent,
    StructureUpgradeDialogComponent,
    WarRoomComponent,
    ReportsComponent,
    ReportDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatButtonToggleModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
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
              { provide: USE_EMULATOR, useValue: ['localhost', 5001] }, //proxy angular fire functions
              InitalizeService,
              EthersService,
              TileDataService,
              CloudFunctionsService],
  bootstrap: [AppComponent],
})

export class AppModule { }
