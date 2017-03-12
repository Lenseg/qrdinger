import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UIRouterModule, UIView } from 'ui-router-ng2';

import { AppComponent }  from './app.component';
import { AddCodeComponent } from './home.component';

import { APP_STATES } from './app.states';
import { GlobalModule } from './global/global.module';
import { routerConfigFn } from './router.config';

@NgModule({
  imports:[
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'home' },
      config: routerConfigFn
    }),
    GlobalModule,
    BrowserModule,
    FormsModule,
    HttpModule ],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ UIView ]
})
export class AppModule { }
