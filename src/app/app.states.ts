import {Transition} from "ui-router-ng2";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { UrlFormComponent } from './url-form/url-form.component';

const homeState = {
  name: 'home',
  url: '/',
  component: HomeComponent
}

const createCode = {
  name: 'createCode',
  url: '/create',
  component: CreateCodeComponent
}
const urlForm = {
  name:'createCode.url',
  url:'/url',
  component:UrlFormComponent
}
export const APP_STATES = [homeState, createCode, urlForm]
