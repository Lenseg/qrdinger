import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators }            from '@angular/forms';
import { CreateCodeService }  from '../create-code/create-code.service';

import { ErrorMessage } from '../global/typeClasses';

@Component({
  selector: 'wifi-form',
  templateUrl: './wifi-form.component.pug'
})
export class WifiFormComponent {
  form : FormGroup;


  typeErrors : ErrorMessage[] = [];
  nameErrors : ErrorMessage[] = [];
  nameWarns : ErrorMessage[] = [];
  passErrors : ErrorMessage[] = [];
  passWarns : ErrorMessage[] = [];

  constructor(private fb:FormBuilder, private createCodeService:CreateCodeService){
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm():void{
    this.form = this.fb.group({
      name: ['',
        Validators.required
      ],
      pass: '',
      type:'WPA',
      hidden:false
    });
    this.bindUpdateEvents();
  }
  bindUpdateEvents():void{
    this.form.valueChanges.subscribe((value:string) => {
      for(const controlName in errors){
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
      this.sendModel();
    });
  }
  sendModel():void{
    var number = this.form.value.number.replace(/[^+[0-9]]*/g,'');
    this.createCodeService.codeValueUpdate('SMSTO:' + number + ':' + this.form.value.message);
  }
}
const errors = {
  name:{
    required : {
      type:'err',
      message:'Network name is required.'
    }
  },
  password : {
  }
}
