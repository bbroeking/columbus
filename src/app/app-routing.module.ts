import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { MapComponent } from './map/map.component';
import {BrowserComponent} from './browser/browser.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: BrowserComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'dashboard/:mapId', component: DashboardComponent },
  { path: 'explorer', component: ExplorerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
