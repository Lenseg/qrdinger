import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';
import { StateService } from 'ui-router-ng2';

import { CreateCodeService }  from '../_services/index';
import { CommonCodeOptions, Levels } from '../global/typeClasses';
import { isHexColor } from '../global/directives';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  form : FormGroup;
  level : string | number;
  @Output() onOptionsUpdate = new EventEmitter<CommonCodeOptions>();
  constructor(private fb: FormBuilder, private stateService:StateService, private createCodeService:CreateCodeService){

  }
  ngOnInit(){
    this.createForm();
    this.bindChangeEvents();
  }
  createForm(){
    var formValues:CommonCodeOptions = {};
    formValues.level =  this.stateService.params.level ? parseInt(decodeURIComponent(this.stateService.params.level)) : 1;
    formValues.foreground =  this.stateService.params.foreground ? decodeURIComponent(this.stateService.params.foreground) : '#000000',
    formValues.background =  this.stateService.params.background ? decodeURIComponent(this.stateService.params.background) : '#ffffff';
    this.form = this.fb.group(formValues);
    this.updateCode(this.form.value)
  }
  bindChangeEvents(){
    this.createCodeService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe(()=>{
      this.updateCode(this.form.value);
    })

  }
  updateCode(value : CommonCodeOptions){
    var options = Object.assign({},value);
    switch(options.level){
      case 1 :
        options.level = 'L';
        break;
      case 2 :
        options.level = 'M';
        break;
      case 3 :
        options.level = 'Q';
        break;
      case 4 :
        options.level = 'H';
        break;
    }
    this.level = options.level;
    this.onOptionsUpdate.emit(options);
  }
}
