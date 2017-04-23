import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import { CreateCodeService }  from '../create-code/create-code.service';
import { ErrorMessage } from '../global/typeClasses';

@Component({
  selector: 'sms-form',
  templateUrl: './sms-form.component.pug'
})
export class SmsFormComponent {
  form : FormGroup;

  errors: ErrorMessage[] = [];

  constructor(private fb:FormBuilder, private createCodeService:CreateCodeService){
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm():void{
    this.form = this.fb.group({
      number: '',
      message: ''
    });
    this.bindUpdateEvents();
  }
  bindUpdateEvents():void{
    this.form.valueChanges.forEach((value:string) => {
      this.errors = [];
      if (!this.form.valid){
        for (let err in this.form.errors){
          this.errors.push(errors[err])
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    var number = this.form.value.number.replace(/[^+[0-9]]*/g,'');
    this.createCodeService.codeValueUpdate('SMSTO:' + number + ':' + this.form.value.message);
  }
}
const errors = {
  required : {
    type:'err',
    message:'Please, put something in text field.'
  }
};
