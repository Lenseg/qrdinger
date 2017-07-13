import { Component, Input, Inject } from '@angular/core';

import { StateService, UIRouterGlobals } from '@uirouter/angular';

import { ModelUpdateService } from '../_services/index'

import { Code }  from '../_global/code';
import { codeTypes, codeTypesRepresentations } from '../_global/definitions';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'create-code',
  templateUrl: './create-code.component.html'
})
export class CreateCodeComponent {
  @Input() code: Code;
  private stateName:string;
  private activeType:string;
  private codeTypes:any = codeTypes;
  private typesMap:any = codeTypesRepresentations;
  private modelsCache:any = {};
  constructor (public modelUpdateService:ModelUpdateService, public stateService:StateService, public uiRouterGlobals:UIRouterGlobals) {
    var currentFormType = uiRouterGlobals.current.name.replace('edit.','')
    this.activeType = this.typesMap[currentFormType] || null;
    this.modelUpdateService.modelUdpaveEvent.subscribe((data:any) => {
      this.code.model = data;
    });
  }

  ngDoCheck() {
    if(this.code.type && this.code.type !== this.stateName){
      this.activeType = this.typesMap[this.code.type];
      this.stateName = this.code.type;
      this.stateService.go(`edit.${this.stateName}`,Object.assign({},this.code.options,this.code.model));
    }
  }
  public selectForm(type:string) : void {
    this.modelsCache[this.activeType] = this.code.model;
    if(this.modelsCache[type]){
      this.code.model = this.modelsCache[type];
    } else {
      this.code.type = type;
    }
    this.activeType = this.typesMap[type];
    this.stateService.go(`edit.${type}`,Object.assign({},this.code.options,this.code.model));
  };
}
