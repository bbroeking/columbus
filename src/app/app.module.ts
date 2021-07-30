import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Provider } from './services/ethers-utils/web3-provider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitalizeService } from './services/initalize.service';
import { EthersService } from './services/ethers.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// DnD
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DragScrollModule} from 'ngx-drag-scroll';
// import {FormControl} from '@angular/forms';

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
import { MapComponent } from './components/dashboard-components/map/map.component';
import { ParcelDetailsComponent } from './components/dashboard-components/parcel-details/parcel-details.component';
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { ParcelTileComponent } from './components/dashboard-components/parcel-tile/parcel-tile.component';
import { HoverTileMenuComponent } from './components/dashboard-components/hover-tile-menu/hover-tile-menu.component';
import { StructureComponent } from './components/dashboard-components/structure/structure.component';
import { LoginComponent } from './components/login-components/login/login.component';
import { DiscoverComponent } from './components/discover-components/discover/discover.component';
import { DiscoverParcelComponent } from './components/discover-components/discover-parcel/discover-parcel.component';
import { LandingPageComponent } from './components/landing-page-components/landing-page/landing-page.component';
import { WarRoomComponent } from './components/war-room-components/war-room/war-room.component';
import { ReportsComponent } from './components/report-components/reports/reports.component';
import { ReportDetailsComponent } from './components/report-components/report-details/report-details.component';
import { ConflictFeedComponent } from './components/war-room-components/conflict-feed/conflict-feed.component';
import { ConflictRoundComponent } from './components/war-room-components/conflict-round/conflict-round.component';
import { DeclareWarComponent } from './components/war-room-components/declare-war/declare-war.component';
import { ConflictResolvedComponent } from './components/war-room-components/conflict-resolved/conflict-resolved.component';
import { StructureDialogComponent } from './components/dashboard-components/structure-dialog/structure-dialog.component';
import { QueueHandlerPipe } from './components/dashboard-components/queue-handler.pipe';
import { StructureDropdownComponent } from './components/dashboard-components/structure-dropdown/structure-dropdown.component';
import { BuildStructureDialogComponent } from './components/dashboard-components/build-structure-dialog/build-structure-dialog.component';
import { CommandTableComponent } from './components/command-components/command-table/command-table.component';
import { TroopCardComponent } from './components/command-components/troop-card/troop-card.component';
import { MetamaskNotConnectedComponent } from './components/error-pages/metamask-not-connected/metamask-not-connected.component';
import { ClockComponent } from './components/discover-components/clock/clock.component';
import { BattlefieldCardComponent } from './components/war-room-components/battlefield-card/battlefield-card.component';
import { FilterDeployedPipe } from './pipes/filter-deployed.pipe';
import { FilterAnnexedPipe } from './pipes/filter-annexed.pipe';


export function init_app(initalizeService: InitalizeService) {
  return () => initalizeService.init();
}

export function enableWeb3Provider(provider: providers.Web3Provider) {
  return () => {
    provider.getSigner();  // Ask the user to enable MetaMask at load time.
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ParcelDetailsComponent,
    DashboardComponent,
    ParcelTileComponent,
    HoverTileMenuComponent,
    StructureComponent,
    LoginComponent,
    DiscoverComponent,
    DiscoverParcelComponent,
    LandingPageComponent,
    StructureDialogComponent,
    // Reports
    ReportsComponent,
    ReportDetailsComponent,
    // Conflicts 
    WarRoomComponent,
    ConflictFeedComponent,
    ConflictRoundComponent,
    DeclareWarComponent,
    ConflictResolvedComponent,
    QueueHandlerPipe,
    StructureDropdownComponent,
    BuildStructureDialogComponent,
    CommandTableComponent,
    TroopCardComponent,
    MetamaskNotConnectedComponent,
    ClockComponent,
    BattlefieldCardComponent,
    FilterDeployedPipe,
    FilterAnnexedPipe,
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
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule,
    DragScrollModule,
    MatProgressSpinnerModule
    // FormControl
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
