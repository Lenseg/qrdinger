import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { StateService } from '@uirouter/angular';

@Injectable()
export class ParamsService {
  constructor(private stateService: StateService) {

  }
  bindFormParamsUpdate(formObservable: FormGroup) {
    formObservable.valueChanges.subscribe(() => {
      this.setObjectAsParams(formObservable.value);
    });
  }
  createParamsObject(newParams) {
    const params = {};
    for (const param in newParams) {
      if (param === 'level') {
        if (typeof newParams[param] === 'number') {
          switch (newParams[param]) {
            case 1 :
              params[param] = 'L';
              break;
            case 2 :
              params[param] = 'M';
              break;
            case 3 :
              params[param] = 'Q';
              break;
            case 4 :
              params[param] = 'H';
              break;
          }
        }
      } else {
        params[param] = encodeURIComponent(newParams[param]);
      }
    }
    return params;
  }
  setObjectAsParams(newParams: any) {
    this.stateService.go(this.stateService.current, this.createParamsObject(newParams));
  }
}
