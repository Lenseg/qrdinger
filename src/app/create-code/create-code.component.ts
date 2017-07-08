import { Component, Input, Inject } from '@angular/core';

import { StateService, UIRouterGlobals } from 'ui-router-ng2';

import { Code }  from '../_global/code';
import { codeTypes,codeTypesRepresentations } from '../_global/definitions';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'create-code',
  templateUrl: './create-code.component.pug'
})
export class CreateCodeComponent {
  @Input() code: Code;
  private stateName:string;
  private activeType:string;
  private modelsCache:any = {};
  constructor (public stateService:StateService, public uiRouterGlobals:UIRouterGlobals) {
    var currentFormType = uiRouterGlobals.current.name.replace('edit.','')
    this.activeType = this.codeTypesRepresentations[currentFormType] || null;
  }

  ngDoCheck() {
    if(this.code.type && this.code.type !== this.stateName){
      this.activeType = this.typesMap[this.code.type];
      this.stateName = this.code.type;
      this.stateService.go(`edit.${this.stateName}`);
    }
  }
  public selectForm(type:string) : void {
    this.modelsCache[this.activeType] = this.code;
    if(this.modelsCache[type]){
      this.code.model = this.modelsCache[type];
    } else {
      this.code.type = type;
    }
    this.activeType = this.typesMap[type];
    this.stateService.go(`edit.${type}`);
  };
}
