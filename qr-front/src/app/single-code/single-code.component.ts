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
 codeId:string;
 constructor(public codesService:CodesService, public stateService:StateService, private authService : AuthService){
  this.codeId = this.stateService.params['codeId'];
  this.code = new Code();
  if(this.codeId !== 'new'){
    this.codesService.getCode(this.codeId).subscribe(code =>
      this.code = new Code(code))
  }
 }
 saveCode(){
   this.codesService.saveCode(this.code, this.codeId);
 }
}
