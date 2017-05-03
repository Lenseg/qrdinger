import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';
import { StateService } from 'ui-router-ng2';
import { CommonCodeOptions, Levels } from '../global/typeClasses';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  form : FormGroup;

  @Output() onOptionsUpdate = new EventEmitter<CommonCodeOptions>();
  constructor(private fb: FormBuilder, private stateService:StateService){
    this.createForm();
    this.bindChangeEvents();
  }
  createForm(){
    this.form = this.fb.group({
      level: '0',
      foreground: '#000000',
      background: '#ffffff'
    });
  }
  bindChangeEvents(){
    this.form.valueChanges.subscribe((value : CommonCodeOptions) => {
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
      this.stateService.go(this.stateService.current,{
        background:options.background,
        level:options.level,
        foreground:options.foreground
      })
      this.onOptionsUpdate.emit(options);
    })
  }
}
