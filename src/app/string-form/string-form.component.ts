import { Component } from '@angular/core';
import { FormControl, Validators }            from '@angular/forms';
import { CreateCodeService }  from '../_services/index';

import { ErrorMessage } from '../global/typeClasses';


@Component({
  selector: 'string-form',
  templateUrl: './string-form.component.pug'
})
export class StringFormComponent {
  string = new FormControl('',[
    Validators.required
  ]);

  errors : ErrorMessage[] = [];

  constructor(private createCodeService:CreateCodeService){
    this.bindUpdateEvents()
  }
  bindUpdateEvents():void{
    this.string.valueChanges.subscribe((value:string) => {
      this.errors = [];
      if (!this.string.valid && this.string.dirty){
        for (const err in this.string.errors){
          this.errors.push(errors[err])
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    this.createCodeService.codeValueUpdate(this.string.value);
  }
}

const errors = {
  required : {
    type:'err',
    message:'Please, put something in text field.'
  }
};
