import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UIRouterModule, UIView  } from 'ui-router-ng2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { APP_STATES } from './app.states';
import { routerConfigFn } from './router.config';

import { AuthService, AppConfigService }  from './_services/index';

import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { HomeComponent }  from './home/home.component';
import { CodesListComponent }  from './codes-list/codes-list.component';
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
    HomeComponent,
    LoginComponent,
    CreateCodeComponent,
    DisplayCodeComponent,
    CodesListComponent,
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
    AuthService
  ],
  bootstrap: [ UIView ]
})
export class AppModule { }
