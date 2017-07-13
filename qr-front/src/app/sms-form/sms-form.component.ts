import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators }            from '@angular/forms';
import { StateService } from '@uirouter/angular';

import { ModelUpdateService } from '../_services/index'

import { Code, SmsCodeModel } from '../_global/code';
import { ErrorMessage } from '../_global/definitions';
import { patternWarningWalidator } from '../_global/directives';

@Component({
  selector: 'sms-form',
  templateUrl: './sms-form.component.html'
})
export class SmsFormComponent {
  code:Code;
  numberRegexp = /[0-9]/;
  statrtsWidthPlusRegexp = /^\+/;

  form : FormGroup;

  messageErrors: ErrorMessage[] = [];
  messageWarns: ErrorMessage[] = [];
  numberErrors: ErrorMessage[] = [];
  numberWarns: ErrorMessage[] = [];
  constructor(private modelUpdateService:ModelUpdateService, private fb:FormBuilder, private stateService:StateService){
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm():void{
    var formValues:smsParams = {};
    formValues.number =  this.stateService.params['number'] ? decodeURI(this.stateService.params['number']) : '';
    formValues.message =  this.stateService.params['message'] ? decodeURI(this.stateService.params['message']) : '',
    this.form = this.fb.group({
      number: ['',[
        Validators.required,
        Validators.pattern(this.numberRegexp),
        patternWarningWalidator(this.statrtsWidthPlusRegexp)
      ]],
      message: ['',Validators.required]
    });
    this.form.setValue(formValues);
  }
  bindUpdateEvents():void{
    this.form.valueChanges.subscribe((value:string) => {
      for(let controlName in errors){
        const control = this.form.get(controlName);
        this[controlName+'Errors'] = [];
        this[controlName+'Warns'] = [];
        if (control && control.dirty && !control.valid) {
          for (const key in control.errors) {
            const errMessage = errors[controlName][key];
            if(errMessage.type === 'err'){
              this[controlName+'Errors'].push(errMessage)
            } else {
              this[controlName+'Warns'].push(errMessage)
            }
          }
        }
      }
      this.setModel();
    });
  }
  setModel():void{
    var number = this.form.value.number.replace(/[^+[0-9]]*/g,'');
    let model = {
      type:'sms',
      number:number,
      message:this.form.value.message
    };
    this.modelUpdateService.modelUpdate(model)
  }
  preventCharInput(e:KeyboardEvent):void{
    var regexp = /[^0-9,+,(,),\-,—,–, ]/g;
    if(regexp.test(e.key))
      e.preventDefault();
  }
  filterPaste(e:ClipboardEvent):void{
    setTimeout(() => {
      var regexp = /[^0-9,+,(,),\-,—,–, ]/g;
      var control = this.form.get('number');
      control.setValue(control.value.replace(regexp,''));
    },0);
  }
}
class smsParams {
  number?:string;
  message?:string;
}
const errors = {
  number:{
    required : {
      type:'err',
      message:'Are you sure number shold be empty?'
    },
    pattern : {
      type:'err',
      message:'Please, put some numbers in here'
    },
    patternWarning : {
      type:'warn',
      message:'International prefix (+X) is reccomended'
    }
  },
  message : {
    required : {
      type:'warn',
      message:'Are you sure message shold be empty?'
    }
  }
}
