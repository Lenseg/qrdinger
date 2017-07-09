import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators }            from '@angular/forms';
import { StateService } from 'ui-router-ng2';
import { ErrorMessage } from '../_global/definitions';

import { ModelUpdateService } from '../_services/index'

import { Code, WifiCodeModel } from '../_global/code';
import { isHexColor } from '../_global/directives';

@Component({
  selector: 'wifi-form',
  templateUrl: './wifi-form.component.pug'
})
export class WifiFormComponent {
  form : FormGroup;
  typeCache : string;

  typeErrors : ErrorMessage[] = [];
  nameErrors : ErrorMessage[] = [];
  nameWarns : ErrorMessage[] = [];
  passErrors : ErrorMessage[] = [];
  passWarns : ErrorMessage[] = [];

  constructor(private modelUpdateService:ModelUpdateService, private fb:FormBuilder,private stateService:StateService){
    this.createForm();
    this.typeCache = this.form.value.networkType;
    this.bindUpdateEvents();
  }
  createForm():void{
    var formValues:CodeWifiParams = {};
    formValues.name =  this.stateService.params.name ? decodeURI(this.stateService.params.name) : '';
    formValues.pass =  this.stateService.params.pass ? decodeURI(this.stateService.params.pass) : '',
    formValues.networkType =  this.stateService.params.networkType ? decodeURI(this.stateService.params.networkType) : 'WPA';
    formValues.hidden =  this.stateService.params.hidden ? this.stateService.params.hidden : false;
    this.form = this.fb.group({
      name: [formValues.name,
        Validators.required
      ],
      pass: formValues.pass,
      networkType:formValues.networkType,
      hidden:formValues.hidden
    },{
      validator: this.isPasswordReqired('networkType','pass')
    });
    this.form.setValue(formValues);
  }
  bindUpdateEvents():void{
    this.form.valueChanges.subscribe((value:any) => {
      if(this.checkIsTypeChanged(value.networkType)){
        this.setFormConfigByType(value.networkType)
      }
      for(let controlName in errors){
        let control = this.form.get(controlName);
        this[controlName+'Errors'] = [];
        this[controlName+'Warns'] = [];
        if (control && control.dirty && !control.valid) {
          for (let key in control.errors) {
            let errMessage = errors[controlName][key];
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
  isPasswordReqired(typeControlName:string,passControlName:string){
    return(group: FormGroup) => {
      let typeControl = group.get(typeControlName);
      let passControl = group.get(passControlName);
      if(typeControl.value !== 'nopass' && passControl.value === ''){
        passControl.setErrors({required: true})
      } else {
        passControl.setErrors(null);
      }
    }
  }
  checkIsTypeChanged(type:string){
    if(type!==this.typeCache){
      this.typeCache = type;
      return true
    }
    return false;
  }

  setFormConfigByType(type:string){
    let passControll = this.form.get('pass');
    if(type=== 'nopass'){
      passControll.disable();
      passControll.setValue('',{
        emitEvent:true
      });
    } else {
      passControll.enable();
    }
  }
  sendModel():void{
    let model = Object.assign({type:'wifi'},this.form.value);
    this.modelUpdateService.modelUpdate(model)
  }
}
class CodeWifiParams{
  networkType?:string;
  name?: string;
  pass?: string;
  hidden?:boolean;
}
const errors = {
  name:{
    required : {
      type:'err',
      message:'Network name required.'
    }
  },
  pass : {
    required : {
      type:'err',
      message:'Password  required.'
    }
  }
}
