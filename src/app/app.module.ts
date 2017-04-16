import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UIRouterModule  } from 'ui-router-ng2';
import { CollapseDirective } from 'ng2-bootstrap';

import { APP_STATES } from './app.states';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { CreateCodeComponent }  from './create-code/create-code.component';
import { DisplayCodeComponent }  from './display-code/display-code.component';
import { UrlFormComponent }  from './url-form/url-form.component';
import { StringFormComponent }  from './string-form/string-form.component';
import { SmsFormComponent }  from './sms-form/sms-form.component';
import { BusinessCardFormComponent }  from './business-card-form/business-card-form.component';

import { CreateCodeService }  from './create-code/create-code.service';

@NgModule({
  imports:[
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'home' }
    }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCodeComponent,
    CollapseDirective,
    DisplayCodeComponent,
    UrlFormComponent,
    StringFormComponent,
    SmsFormComponent,
    BusinessCardFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
