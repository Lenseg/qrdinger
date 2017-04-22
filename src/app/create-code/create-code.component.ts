import { Component, Input, Inject } from '@angular/core';
import { CodeOptions } from '../global/typeClasses';
import { CreateCodeService }  from './create-code.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { StateService } from 'ui-router-ng2';

@Component({
  selector: 'create-code',
  templateUrl: './create-code.component.pug',
  providers: [ CreateCodeService ]
})
export class CreateCodeComponent {
  @Input()
  public codeOptions: CodeOptions = {
    value:''
  };
  private codeTypes:string[];
  public activeType:string;
  constructor (public stateService:StateService, public createCodeService:CreateCodeService) {
    this.getCodeTypes();
    this.createCodeService.codeValueUdpaveEvent.subscribe((data:string) => {
      this.codeOptions.value = data;
    });
  }

  private getCodeTypes(): void {
    this.codeTypes = [];
    var states = this.stateService.get();
    for (let state in states){
      if(~states[state].name.indexOf('createCode.')){
        let stateName = states[state].name.replace('createCode.','')
        this.codeTypes.push(stateName);
      }
    }
  };
  onOptionsUpdate(options:CodeOptions){
    Object.assign(this.codeOptions, options);
  }
  public selectForm(type:string) : void {
    this.activeType = type;
    this.stateService.go('createCode.' + type);
  };
}
