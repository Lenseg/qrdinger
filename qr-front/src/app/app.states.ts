import {Transition} from "@uirouter/angular";

import { CodesService } from './_services/index';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CodesListComponent } from './codes-list/codes-list.component';
import { CreateCodeComponent } from './create-code/create-code.component';
import { RegisterComponent } from './register/register.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { WifiFormComponent } from './wifi-form/wifi-form.component';
import { StringFormComponent } from './string-form/string-form.component';
import { SmsFormComponent } from './sms-form/sms-form.component';
// import { BusinessCardFormComponent } from './business-card-form/business-card-form.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component'

const appState = {
  name:'app',
  redirectTo: 'home',
  abstract: true,
  component: AppComponent,
  data:{
    meta:{
      title:'Home',
      description:'Generate, customize, store and export your qr-codes for free in Qrdinger application. Various code types, styling options and export formats.'
    }
  }
}
const callbackState = {
  name:'callback',
  url: '/callback',
  component: CallbackComponent
}
const homeState = {
  parent: 'app',
  name: 'home',
  url: '/',
  component: HomeComponent,
  data:{
    meta:{
      title:'Home',
      description:'Generate, customize and store your qr-codes for free in Qrdinger application. Various code types and styling options and export formats.'
    }
  }
}
const loginState = {
  parent: 'app',
  name: 'login',
  url: '/login',
  data:{
    unathorizedOnly:true,
    meta:{
      title:'Login',
      description:'Authorize to receive access to saved qr-codes and full functionality of application.'
    }
  },
  component: LoginComponent
}
const forgotPassState = {
  parent: 'app',
  name: 'forgot-pass',
  url: '/forgot-pass',
  protected:true,
  data:{
    meta:{
      title:'Password reset',
      description:'Reset password via email.'
    }
  },
  component: ForgotPassComponent
}
const registerState = {
  parent: 'app',
  name: 'register',
  url: '/register',
  data:{
    meta:{
      title:'Registration',
      description:'Register to receive access to full functionality of application and qr-code saving.'
    }
  },
  component: RegisterComponent
}
const codesListState = {
  parent: 'app',
  name: 'codes',
  url: '/codes',
  protected:true,
  data:{
    meta:{
      title:'Saved Qr codes',
      description:'Your saved codes and application dashboard. Here you can manage codes, or proceed to code edit.'
    }
  },
  component: CodesListComponent
}
const editState = {
  parent: 'app',
  name: 'edit',
  url: '/edit/:codeId/?background?level?foreground',
  data:{
    meta:{
      title:'QR code generator',
      description:'Basic qr-code generator and exporter. Various qr-code types and stylig supported. Raster and vector code exporting.'
    }
  },
  component: CreateCodeComponent,
  params: {
    codeId:{
      value:'new',
      dynamic:true,
      inherit: true,
      raw:true
    },
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
  name:'edit.url',
  url:'url?url',
  component:UrlFormComponent,
  data:{
    meta:{
      title:'URL QR code generator',
      description:'URL qr-code generator and exporter. Various qr-code types and stylig supported. Raster and vector code exporting.'
    }
  },
  params:{
    url:{
      dynamic:true,
      inherit: true
    }
  }
}
const stringForm = {
  name:'edit.string',
  url:'string?text',
  component:StringFormComponent,
  data:{
    meta:{
      title:'Text QR code generator',
      description:'Text qr-code generator and exporter. Various qr-code types and stylig supported. Raster and vector code exporting.'
    }
  },
  params:{
    text:{
      dynamic:true,
      inherit: true
    }
  }
}
const smsForm = {
  name:'edit.sms',
  url:'sms?number?message',
  component:SmsFormComponent,
  data:{
    meta:{
      title:'SMS QR code generator',
      description:'SMS qr-code generator and exporter. Various qr-code types and stylig supported. Raster and vector code exporting.'
    }
  },
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
  name:'edit.wifi',
  url:'wifi?name?networkType?pass?hidden',
  component:WifiFormComponent,
  data:{
    meta:{
      title:'Wifi QR code generator',
      description:'Wifi qr-code generator and exporter. Various qr-code types and stylig supported. Raster and vector code exporting.'
    }
  },
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

// const businessCardForm = {
//   name:'edit.buisnessCard',
//   url:'/buisnessCard',
//   component:BusinessCardFormComponent
// }

export const APP_STATES = [appState, loginState, forgotPassState, callbackState, registerState, editState, codesListState, homeState, urlForm, stringForm, smsForm, wifiForm]
