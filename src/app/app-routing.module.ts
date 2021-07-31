import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamaskGuard } from './metamask.guard';

import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
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
  { path: 'reports', component: ReportsComponent, canActivate: [MetamaskGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [MetamaskGuard] },
  { path: 'dashboard/:mapId', component: DashboardComponent, canActivate: [MetamaskGuard] },
  { path: 'annex', component: DiscoverComponent, canActivate: [MetamaskGuard] },
  { path: 'declare-war', component: DeclareWarComponent, canActivate: [MetamaskGuard]},
  { path: 'garrison', component: CommandTableComponent, canActivate: [MetamaskGuard]},
  { path: 'war-room/:conflictId', component: WarRoomComponent, canActivate: [MetamaskGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
