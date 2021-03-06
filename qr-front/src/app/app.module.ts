import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIRouterModule, UIView  } from '@uirouter/angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MetaModule, MetaConfig } from 'ng2-ui-router-meta';

import { APP_STATES } from './app.states';
import { routerConfigFn } from './router.config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService, AppConfigService, ParamsService, CodesService, ExportCodeService, ModelUpdateService } from './_services/index';
import { UrlInterceptor } from './_global/url-interceptor';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CodesListComponent } from './codes-list/codes-list.component';
import { CodesListItemComponent } from './code-list-item/code-list-item.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { DisplayCodeComponent } from './display-code/display-code.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { WifiFormComponent } from './wifi-form/wifi-form.component';
import { StringFormComponent } from './string-form/string-form.component';
import { SmsFormComponent } from './sms-form/sms-form.component';
// import { BusinessCardFormComponent }  from './business-card-form/business-card-form.component';
import { CodeOptionsComponent } from './code-options/code-options.component';
import { CallbackComponent } from './callback/callback.component';


import { environment } from '../environments/environment';
import { ExportCodeComponent } from './export-code/export-code.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { RedirectFormComponent } from './redirect-form/redirect-form.component';

const metaConfig: MetaConfig = {
  useTitleSuffix: true,
  defaults: {
    title: 'Qrdinger',
    titleSuffix: ' | Qrdinger',
    description: 'Generate, customize, store and export your qr-codes for free in Qrdinger application. Various code types, styling options and export formats.'
  }
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UIRouterModule.forRoot({
      states: APP_STATES,
      otherwise: { state: 'home' },
      config: routerConfigFn
    }),
    MetaModule.forRoot(metaConfig),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    RegisterComponent,
    UrlFormComponent,
    StringFormComponent,
    SmsFormComponent,
    WifiFormComponent,
    // BusinessCardFormComponent,
    CodeOptionsComponent,
    CallbackComponent,
    ExportCodeComponent,
    ForgotPassComponent,
    RedirectFormComponent
  ],
  providers: [
    AppConfigService,
    AuthService,
    ParamsService,
    CodesService,
    ModelUpdateService,
    ExportCodeService,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    }],
  ],
  bootstrap: [ UIView ]
})
export class AppModule { }
