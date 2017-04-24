import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import { CommonCodeOptions, Levels } from '../global/typeClasses';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  form : FormGroup;

  @Output() onOptionsUpdate = new EventEmitter<CommonCodeOptions>();
  constructor(private fb: FormBuilder){
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

      this.onOptionsUpdate.emit(options);
    })
  }
}
