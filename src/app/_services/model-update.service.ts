import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StateService } from 'ui-router-ng2';

import { WifiCodeModel, StringCodeModel, SmsCodeModel, UrlCodeModel } from '../_global/code';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class ModelUpdateService {
  model = new Subject<any>();
  modelUdpaveEvent = this.model.asObservable();
  constructor(private stateService:StateService){

  }
  modelUpdate (model:any){
    this.model.next(model);
  }
}
