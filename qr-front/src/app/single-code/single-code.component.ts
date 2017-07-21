import { Component, Input } from '@angular/core';
import { Code } from '../_global/code';

import { StateService } from '@uirouter/angular';
import { CodesService, AuthService } from '../_services/index';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.html'
})

export class SingleCodeComponent {
 code:Code;
 constructor(public codesService:CodesService, public stateService:StateService, private authService : AuthService){
  let codeId = this.stateService.params['codeId'];
  this.code = new Code();
  if(codeId !== 'new'){
    this.codesService.getCode(codeId).subscribe(code => this.code = new Code(code));
  }
 }
 saveCode(){
   this.codesService.saveCode(this.code.toJSON());
 }
}
