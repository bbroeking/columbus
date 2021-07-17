import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MetamaskGuard } from './metamask.guard';

import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { ExplorerComponent } from './components/dashboard-components/explorer/explorer.component';
import { MapComponent } from './components/dashboard-components/map/map.component';
import { DiscoverComponent } from './components/discover-components/discover/discover.component';
import { LandingPageComponent } from './components/landing-page-components/landing-page/landing-page.component';
import { LoginComponent } from './components/login-components/login/login.component';
import { ReportsComponent } from './components/report-components/reports/reports.component';
import { WarRoomComponent } from './components/war-room-components/war-room/war-room.component';
import { DeclareWarComponent } from './components/war-room-components/declare-war/declare-war.component';
import { CommandTableComponent } from './components/command-components/command-table/command-table.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [MetamaskGuard, AuthGuard] },
  { path: 'dashboard/:mapId', component: DashboardComponent, canActivate: [MetamaskGuard, AuthGuard] },
  { path: 'discover', component: DiscoverComponent, canActivate: [MetamaskGuard, AuthGuard] },
  { path: 'declare-war', component: DeclareWarComponent, canActivate: [MetamaskGuard, AuthGuard]},
  { path: 'garrison', component: CommandTableComponent, canActivate: [MetamaskGuard, AuthGuard]},
  { path: 'war-room/:conflictId', component: WarRoomComponent, canActivate: [MetamaskGuard, AuthGuard] },

  // throwaway routes
  { path: 'explorer', component: ExplorerComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
