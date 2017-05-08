import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StateService } from 'ui-router-ng2';

import { WifiCodeValueParams, OnLineCodeValueParams, SmsCodeValueParams } from '../global/typeClasses';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class CreateCodeService {
  codeValue = new Subject<string>();
  codeValueUdpaveEvent = this.codeValue.asObservable();
  constructor(private stateService:StateService){

  }
  codeValueUpdate (codeValueParams:WifiCodeValueParams & OnLineCodeValueParams & SmsCodeValueParams){
    this.setValueAsParams(codeValueParams);
    this.codeValue.next(this.constructCodeValue(codeValueParams));
  }
  constructCodeValue(codeValueParams:WifiCodeValueParams & OnLineCodeValueParams & SmsCodeValueParams){
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
    codeValue += 'S:' + this.encodeStringComponent(valueParams.name) + ';';
    if(valueParams.networkType !== 'nopass'){
      codeValue += 'P:' + this.encodeStringComponent(valueParams.pass) + ';';
    }
    if(valueParams.hidden){
      codeValue += 'H:true;';
    }
    return codeValue
  }
  encodeStringComponent(str:string):string{
    var encodedStr = str.replace('"','\\"').replace('"','\\"').replace(',','\\,').replace(';','\\;').replace(':','\\:');
    if(parseInt(encodedStr,16).toString(16) === encodedStr)
      encodedStr = '"' + encodedStr + '"';
    return encodedStr
  }
  constructUrlValue(valueParams:OnLineCodeValueParams){
    return 'URL:' + valueParams.text;
  }
  constructSmsValue(valueParams:SmsCodeValueParams){
    return 'SMSTO:' + valueParams.number + ':' + valueParams.message
  }
  bindFormParamsUpdate(formObservable: FormGroup){
    formObservable.valueChanges.subscribe(()=>{
      console.log(formObservable.value)
      this.stateService.go(this.stateService.current,formObservable.value)
    })
  }
  setValueAsParams(codeValueParams:WifiCodeValueParams & OnLineCodeValueParams & SmsCodeValueParams){
    var params:(WifiCodeValueParams & OnLineCodeValueParams & SmsCodeValueParams) = {};
    for(var param in codeValueParams){
      if(param !== 'type'){
        params[param] = encodeURI(codeValueParams[param]);
      }
    }
    console.log(params,this.stateService.current);
    this.stateService.go(this.stateService.current,params)
  }
