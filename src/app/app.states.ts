import {Transition} from "ui-router-ng2";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { WifiFormComponent } from './wifi-form/wifi-form.component';
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
  url: '/create?background?level?foreground',
  component: CreateCodeComponent,
  params: {
    background:{
      dynamic:true,
      inherit: true,
      raw:true
    },
    level:{
      dynamic:true,
      inherit: true,
      raw:true
    },
    foreground:{
      dynamic:true,
      inherit: true,
      raw:true
    }
  }
}
const urlForm = {
  name:'createCode.url',
  url:'/url?url',
  component:UrlFormComponent,
  params:{
    url:{
      dynamic:true,
      inherit: true
    }
  }
}
const stringForm = {
  name:'createCode.string',
  url:'/string?text',
  component:StringFormComponent,
  params:{
    text:{
      dynamic:true,
      inherit: true
    }
  }
}
const smsForm = {
  name:'createCode.sms',
  url:'/sms?number?message',
  component:SmsFormComponent,
  params:{
    number:{
      dynamic:true,
      inherit: true
    },
    message:{
      dynamic:true,
      inherit: true
    }
  }
}
const wifiForm = {
  name:'createCode.wifi',
  url:'/wifi?name?networkType?pass?hidden',
  component:WifiFormComponent,
  params:{
    name:{
      dynamic:true,
      inherit: true,
      raw:true
    },
    networkType:{
      dynamic:true,
      inherit: true
    },
    pass:{
      dynamic:true,
      inherit: true,
      raw:true
    },
    hidden:{
      dynamic:true,
      inherit: true
    }
  }
}
const businessCardForm = {
  name:'createCode.buisnessCard',
  url:'/buisnessCard',
  component:BusinessCardFormComponent
}
export const APP_STATES = [homeState, createCode, urlForm, stringForm, smsForm, businessCardForm, wifiForm]
