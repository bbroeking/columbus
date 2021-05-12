import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { InitalizeService } from './services/initalize.service';
import { EthersService } from './services/ethers.service';

export function init_app(initalizeService: InitalizeService) {
  return () => initalizeService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: Window,
                useValue: window 
              },
              // { provide: APP_INITIALIZER,
              //   useFactory: init_app,
              //   deps: [InitalizeService], // might also need web3
              //   multi: true,
              // },
              InitalizeService,
              EthersService],
  bootstrap: [AppComponent]
})

export class AppModule { }
