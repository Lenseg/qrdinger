import { Injectable } from '@angular/core';

import { WifiCodeValueParams, OnLineCodeValueParams, SmsCodeValueParams } from '../global/typeClasses';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class CreateCodeService {
  codeValue = new Subject<string>();
  codeValueUdpaveEvent = this.codeValue.asObservable();
  codeValueUpdate (codeValueParams:WifiCodeValueParams | OnLineCodeValueParams | SmsCodeValueParams){
    this.codeValue.next(this.constructCodeValue(codeValueParams));
  }
  constructCodeValue(codeValueParams:WifiCodeValueParams | OnLineCodeValueParams | SmsCodeValueParams){
    switch(codeValueParams.type){
      case 'wifi':
        return this.constructWifiValue(codeValueParams);
      case 'url':
        return this.constructUrlValue(codeValueParams);
      case 'text':
        return codeValueParams.text;
      case 'sms':
        return this.constructSmsValue(codeValueParams);
    }
  }
  constructWifiValue(valueParams:WifiCodeValueParams){
    var codeValue = 'WIFI:' + 'T:' + valueParams.networkType + ';';
    code += 'S:' + this.encodeStringComponent(valueParams.networkName) + ';';
    if(valueParams.networkType !== 'nopass'){
      codeValue += 'P:' + this.encodeStringComponent(valueParams.networkPass) + ';';
    }
    if(valueParams.networkHidden){
      codeValue += 'H:true;';
    }
    return codeValue
  }
  constructUrlValue(valueParams:OnLineCodeValueParams){
    return 'URL:' + valueParams.text;
  }
  constructSmsValue(valueParams:SmsCodeValueParams){
    return 'SMSTO:' + valueParams.number + ':' + valueParams.message
  }
}
