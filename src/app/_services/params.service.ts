import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StateService } from 'ui-router-ng2';

@Injectable()
export class ParamsService {
  constructor(private stateService:StateService){

  }
  bindFormParamsUpdate(formObservable: FormGroup){
    formObservable.valueChanges.subscribe(()=>{
      var params:any = {};
      for(var param in formObservable.value){
          params[param] = encodeURIComponent(formObservable.value[param]);
      }
      this.stateService.go(this.stateService.current,params);
    })
  }
  setObjectAsParams(newParams:any){
    var params = {};
    for(var param in params){
        params[param] = encodeURIComponent(newParams[param]);
      }
    this.stateService.go(this.stateService.current,params);
  }
}
