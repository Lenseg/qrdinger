import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { StateService } from '@uirouter/angular';

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
