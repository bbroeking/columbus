import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DiscoverComponent } from './discover/discover.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { AuthGuard } from './auth.guard';
import { ReportsComponent } from './reports/reports.component';
import { WarRoomComponent } from './war-room/war-room.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:mapId', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard] },
  { path: 'war-room/:conflictId', component: WarRoomComponent, canActivate: [AuthGuard] },
  // throwaway routes
  { path: 'explorer', component: ExplorerComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
