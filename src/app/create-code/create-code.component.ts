import { Component, Input, Inject } from '@angular/core';
import { Code } from '../global/typeClasses';
import { CreateCodeService }  from '../_services/create-code.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { StateService, UIRouterGlobals } from 'ui-router-ng2';

@Component({
  selector: 'create-code',
  templateUrl: './create-code.component.pug',
  providers: [ CreateCodeService ]
})
export class CreateCodeComponent {
  @Input() code: Code = {
    value:''
  };
  private stateName:string;
  private codeTypes:string[];
  public activeType:string;
  typesMap = {
    wifi : 'Wi-Fi',
    url : 'Link',
    string : 'Text',
    sms : 'SMS',
    buisnessCard: 'Buisness card'
  }
  constructor (public stateService:StateService, public uiRouterGlobals:UIRouterGlobals, public createCodeService:CreateCodeService) {
    this.getCodeTypes();
    var currentFormType = uiRouterGlobals.current.name.replace('edit.','')
    this.activeType = this.typesMap[currentFormType] || null;
    this.createCodeService.codeValueUdpaveEvent.subscribe((data:string) => {
      this.code.value = data;
    });
  }

  private getCodeTypes(): void {
    this.codeTypes = [];
    var states = this.stateService.get();
    for (let state in states){
      if(~states[state].name.indexOf('edit.')){
        this.codeTypes.push(states[state].name.replace('edit.',''));
      }
    }
  };

  ngDoCheck() {
    if(this.code.type && this.code.type !== this.stateName){
      console.log('here', this.code.type, this.stateName)
      this.activeType = this.typesMap[this.code.type];
      this.stateName = this.code.type;
      this.stateService.go(`edit.${this.stateName}`);
    }
  }
  onOptionsUpdate(options:Code){
    Object.assign(this.code, options);
  }
  public selectForm(type:string) : void {
    this.activeType = this.typesMap[type];
    this.stateService.go(`edit.${type}`);
  };
}
