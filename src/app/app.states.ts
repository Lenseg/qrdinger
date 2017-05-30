import {Transition} from "ui-router-ng2";

import { CodesService } from './_services/index';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CodesListComponent } from './codes-list/codes-list.component';
import { SingleCodeComponent } from './single-code/single-code.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { RegisterComponent } from './register/register.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { WifiFormComponent } from './wifi-form/wifi-form.component';
import { StringFormComponent } from './string-form/string-form.component';
import { SmsFormComponent } from './sms-form/sms-form.component';
import { BusinessCardFormComponent } from './business-card-form/business-card-form.component';
import { LoginComponent } from './login/login.component';

const appState = {
  name:'app',
  redirectTo: 'home',
  component: AppComponent
}
const homeState = {
  parent: 'app',
  name: 'home',
  url: '/',
  component: HomeComponent
}
const codeState = {
  parent: 'app',
  name: 'code',
  url: '/codes/:codeId',
  component: SingleCodeComponent,
  resolve: [
    {
      token: 'code',
      deps: [Transition, CodesService],
      resolveFn: (trans:Transition, codes:CodesService) => {

        codes.getCode(trans.params().codeId).then(function(data){console.log(data,'kek')})
        return codes.getCode(trans.params().codeId)
      }
    }
  ]
}
const loginState = {
  parent: 'app',
  name: 'login',
  url: '/login',
  component: LoginComponent,
  resolve: [
    { token: 'returnTo', deps: [Transition], resolveFn: returnTo },
  ]
}
const registerState = {
  parent: 'app',
  name: 'register',
  url: '/register',
  component: RegisterComponent,
  resolve: [
    { token: 'returnTo', deps: [Transition], resolveFn: returnTo },
  ]
}
const codesListState = {
  parent: 'app',
  name: 'codes',
  url: '/codes',
  component: CodesListComponent
}
const createCode = {
  parent: 'app',
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

export function returnTo ($transition$: Transition): any {
  if ($transition$.redirectedFrom() != null) {
    return $transition$.redirectedFrom().targetState();
  }
  const $state = $transition$.router.stateService;
  if ($transition$.from().name !== '') {
    return $state.target($transition$.from(), $transition$.params('from'));
  }
  return $state.target('home');
}

export const APP_STATES = [appState, loginState, registerState, codeState, codesListState, homeState, createCode, urlForm, stringForm, smsForm, businessCardForm, wifiForm]
