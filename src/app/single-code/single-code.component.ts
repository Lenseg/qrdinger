import { Component, Input } from '@angular/core';
import { Code, CodeOptions } from '../global/typeClasses';

import { StateService } from 'ui-router-ng2';
import { CodesService } from '../_services/index';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 code:Code = {};
 codeId:string;
 edit:boolean;
 constructor(public codesService:CodesService, public stateService:StateService){
  this.codeId = this.stateService.params.codeId;
  if(this.codeId !== 'new'){
    this.codesService.getCode(this.codeId).subscribe(code => this.code = code);
  }
 }
}
