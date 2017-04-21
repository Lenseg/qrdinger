import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import { Options, Levels } from './code-options.model';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  commonOptionsForm : FormGroup;

  @Output() onOptionsUpdate = new EventEmitter<CodeOptions>();
  constructor(private fb: FormBuilder){
    this.createCommonOptionsForm();
    this.bindChangeEvents();
  }
  createCommonOptionsForm(){
    this.commonOptionsForm = this.fb.group({
      level: '1',
      foreground: '#000000',
      background: '#ffffff'
    });
  }
  bindChangeEvents(){
    this.commonOptionsForm.valueChanges.forEach((value : Options) => {
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
