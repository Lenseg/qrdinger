import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { UIRouterModule  } from 'ui-router-ng2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { APP_STATES } from './app.states';
import { routerConfigFn } from './router.config.ts';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, CreateCodeService } from './_services/index';
import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { CreateCodeComponent }  from './create-code/create-code.component';
import { DisplayCodeComponent }  from './display-code/display-code.component';
import { UrlFormComponent }  from './url-form/url-form.component';
import { WifiFormComponent }  from './wifi-form/wifi-form.component';
import { StringFormComponent }  from './string-form/string-form.component';
import { SmsFormComponent }  from './sms-form/sms-form.component';
import { BusinessCardFormComponent }  from './business-card-form/business-card-form.component';
import { CodeOptionsComponent } from './code-options/code-options.component';

@NgModule({
  imports:[
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'home' },
      config: routerConfigFn
    }),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
    HomeComponent,
    CreateCodeComponent,
    DisplayCodeComponent,
    UrlFormComponent,
    StringFormComponent,
    SmsFormComponent,
    WifiFormComponent,
    BusinessCardFormComponent,
    CodeOptionsComponent
  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,

      // providers used to create fake backend
      fakeBackendProvider,
      MockBackend,
      BaseRequestOptions
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
