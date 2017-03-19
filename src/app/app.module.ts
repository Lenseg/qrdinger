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

@NgModule({
  imports:[
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      otherwise: { state: 'home' }
    }),
    BrowserModule,
    FormsModule,
    HttpModule ],
  declarations: [ AppComponent, HomeComponent, CreateCodeComponent, CollapseDirective, DisplayCodeComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
