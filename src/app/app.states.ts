import {Transition} from "ui-router-ng2";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { StringFormComponent } from './string-form/string-form.component';
import { SmsFormComponent } from './sms-form/sms-form.component';
import { BusinessCardFormComponent } from './business-card-form/business-card-form.component';

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
const stringForm = {
  name:'createCode.string',
  url:'/string',
  component:StringFormComponent
}
const smsForm = {
  name:'createCode.sms',
  url:'/sms',
  component:SmsFormComponent
}
const businessCardForm = {
  name:'createCode.buisnessCard',
  url:'/buisnessCard',
  component:BusinessCardFormComponent
}
export const APP_STATES = [homeState, createCode, urlForm, stringForm, smsForm, businessCardForm]
