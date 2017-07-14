import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UIRouterModule, UIView  } from '@uirouter/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { APP_STATES } from './app.states';
import { routerConfigFn } from './router.config';

import { AuthService, AppConfigService, ParamsService, CodesService, ModelUpdateService }  from './_services/index';

import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { HomeComponent }  from './home/home.component';
import { CodesListComponent }  from './codes-list/codes-list.component';
import { CodesListItemComponent }  from './code-list-item/code-list-item.component';
import { SingleCodeComponent } from './single-code/single-code.component';
import { CreateCodeComponent }  from './create-code/create-code.component';
import { DisplayCodeComponent }  from './display-code/display-code.component';
import { UrlFormComponent }  from './url-form/url-form.component';
import { WifiFormComponent }  from './wifi-form/wifi-form.component';
import { StringFormComponent }  from './string-form/string-form.component';
import { SmsFormComponent }  from './sms-form/sms-form.component';
import { BusinessCardFormComponent }  from './business-card-form/business-card-form.component';
import { CodeOptionsComponent } from './code-options/code-options.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockData } from './mock-data';

@NgModule({
  imports:[
    HttpModule,
    InMemoryWebApiModule.forRoot(MockData, {
      passThruUnknownUrl: true
    }),
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'home' },
      config: routerConfigFn
    }),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateCodeComponent,
    DisplayCodeComponent,
    CodesListComponent,
    CodesListItemComponent,
    SingleCodeComponent,
    RegisterComponent,
    UrlFormComponent,
    StringFormComponent,
    SmsFormComponent,
    WifiFormComponent,
    BusinessCardFormComponent,
    CodeOptionsComponent

  ],
  providers: [
    AppConfigService,
    AuthService,
    ParamsService,
    CodesService,
    ModelUpdateService
  ],
  bootstrap: [ UIView ]
})
export class AppModule { }