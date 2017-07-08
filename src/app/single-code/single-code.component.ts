import { Component, Input } from '@angular/core';
import { Code } from '../_global/code';

import { StateService } from 'ui-router-ng2';
import { CodesService } from '../_services/index';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 code:Code = {};
 constructor(public codesService:CodesService, public stateService:StateService){
  let codeId = this.stateService.params.codeId;
  if(codeId !== 'new'){
    this.codesService.getCode(this.codeId).subscribe(code => this.code = new Code(code));
  } else {
    this.code = new Code(code);
  }
 }
}
