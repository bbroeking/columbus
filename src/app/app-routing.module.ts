import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { MapComponent } from './map/map.component';
import {BrowserComponent} from './browser/browser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: BrowserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'dashboard/:mapId', component: DashboardComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
