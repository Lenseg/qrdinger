import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { StateService } from 'ui-router-ng2';
import { ErrorMessage } from '../_global/typeClasses';

@Component({
  selector:'reqister',
  templateUrl:'./register.component.pug'
})
export class RegisterComponent{
  emailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


  form : FormGroup;

  passwordErrors: ErrorMessage[] = [];
  passwordWarns: ErrorMessage[] = [];
  emailErrors: ErrorMessage[] = [];
  emailWarns: ErrorMessage[] = [];
  passwordConfirmErrors: ErrorMessage[] = [];
  passwordConfirmWarns: ErrorMessage[] = [];
  constructor(private fb:FormBuilder){
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm():void{
    this.form = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.pattern(this.emailRegexp)
      ]],
      password: ['',Validators.required],
      passwordConfirm: ['',Validators.required]
    },{
      validator: this.isPasswordsAreSame('password','passwordConfirm')
    });
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
    });
  }
  isPasswordsAreSame(passControlName:string,passConfirmControlName:string){
    return(group: FormGroup) => {
      let passControl = group.get(passControlName);
      let passConfirmControl = group.get(passConfirmControlName);
      if(passConfirmControl.value !== passControl.value){
        let newErrors = Object.assign(passConfirmControl.errors || {}, {match:true});
        passConfirmControl.setErrors(newErrors)
      } else {
        if(passConfirmControl.errors.match){
          let newErrors = Object.assign(passConfirmControl.errors || {}, {});
          delete newErrors.match;
          passConfirmControl.setErrors(newErrors);
        }
      }
    }
  }
}
const errors = {
  password:{
    required : {
      type:'err',
      message:'Password required'
    }
  },
  passwordConfirm:{
    required : {
      type:'err',
      message:'Confirm password'
    },
    match:{
      type:'err',
      message:'Passwords doesn\'t match'
    }
  },
  email : {
    required : {
      type:'err',
      message:'Email required'
    },
    pattern : {
      type:'err',
      message:'Invalid email'
    }
  }
}
