import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import { CommonCodeOptions, Levels } from '../global/typeClasses';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  commonOptionsForm : FormGroup;

  @Output() onOptionsUpdate = new EventEmitter<Options>();
  constructor(private fb: FormBuilder){
    this.createCommonOptionsForm();
    this.bindChangeEvents();
  }
  createCommonOptionsForm(){
    this.commonOptionsForm = this.fb.group({
      level: '0',
      foreground: '#000000',
      background: '#ffffff'
    });
  }
  bindChangeEvents(){
    this.commonOptionsForm.valueChanges.forEach((value : CommonCodeOptions) => {
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

      this.onOptionsUpdate.emit(options);
    })
  }
}
