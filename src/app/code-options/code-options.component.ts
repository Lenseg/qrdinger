import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';
import { StateService } from 'ui-router-ng2';
import { CommonCodeOptions, Levels } from '../global/typeClasses';
import { isHexColor } from '../global/directives';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  form : FormGroup;

  @Output() onOptionsUpdate = new EventEmitter<CommonCodeOptions>();
  constructor(private fb: FormBuilder, private stateService:StateService){

  }
  ngOnInit(){
    this.createForm();
    this.bindChangeEvents();
  }
  createForm(){
    var formValues:CommonCodeOptions = {};
    formValues.level =  this.stateService.params.level ? parseInt(decodeURI(this.stateService.params.level)) : 1;
    formValues.foreground =  this.stateService.params.foreground && isHexColor(this.stateService.params.foreground) ? '#' + decodeURI(this.stateService.params.foreground) : '#000000',
    formValues.background =  this.stateService.params.background && isHexColor(this.stateService.params.background) ? '#' + decodeURI(this.stateService.params.background) : '#ffffff';
    this.form = this.fb.group(formValues);
    this.updateCode(this.form.value)
  }
  bindChangeEvents(){
    this.form.valueChanges.subscribe((value : CommonCodeOptions) => {this.updateCode(value);})
  }
  updateCode(value : CommonCodeOptions){
    var options = Object.assign({},value);
    this.setUrlParams(options);
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
    this.onOptionsUpdate.emit(options);
  }
  setUrlParams(params:CommonCodeOptions){
    this.stateService.go(this.stateService.current,{
      background:params.background.substring(1),
      level:params.level,
      foreground:params.foreground.substring(1)
    })
  }
}
