import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Provider } from './services/ethers-utils/web3-provider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitalizeService } from './services/initalize.service';
import { EthersService } from './services/ethers.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Routes } from '@angular/router';

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
import { AngularFireFunctionsModule, USE_EMULATOR } from '@angular/fire/functions';
import { providers } from 'ethers';

// Services
import { TileDataService } from './services/tile-data.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CloudFunctionsService } from './services/cloud-functions.service';

// Components
import { GarrisonComponent } from './components/war-room-components/garrison/garrison.component';
import { ExplorerComponent } from './components/dashboard-components/explorer/explorer.component';
import { MapComponent } from './components/dashboard-components/map/map.component';
import { BrowserComponent } from './components/dashboard-components/browser/browser.component';
import { ParcelDetailsComponent } from './components/dashboard-components/parcel-details/parcel-details.component';
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { ParcelTileComponent } from './components/dashboard-components/parcel-tile/parcel-tile.component';
import { HoverTileMenuComponent } from './components/dashboard-components/hover-tile-menu/hover-tile-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StructureComponent } from './components/dashboard-components/structure/structure.component';
import { StructureDetailsComponent } from './components/dashboard-components/structure-details/structure-details.component';
import { LoginComponent } from './components/login-components/login/login.component';
import { DiscoverComponent } from './components/discover-components/discover/discover.component';
import { DiscoverParcelComponent } from './components/discover-components/discover-parcel/discover-parcel.component';
import { LandingPageComponent } from './components/landing-page-components/landing-page/landing-page.component';
import { StructureUpgradeDialogComponent } from './components/dashboard-components/structure-upgrade-dialog/structure-upgrade-dialog.component';
import { WarRoomComponent } from './components/war-room-components/war-room/war-room.component';
import { ReportsComponent } from './components/report-components/reports/reports.component';
import { ReportDetailsComponent } from './components/report-components/report-details/report-details.component';
import { PlanningTableComponent } from './components/war-room-components/planning-table/planning-table.component';


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
    ReportDetailsComponent,
    GarrisonComponent,
    PlanningTableComponent
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
