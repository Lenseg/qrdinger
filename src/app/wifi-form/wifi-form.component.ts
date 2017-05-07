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
  typeCache : string;

  typeErrors : ErrorMessage[] = [];
  nameErrors : ErrorMessage[] = [];
  nameWarns : ErrorMessage[] = [];
  passErrors : ErrorMessage[] = [];
  passWarns : ErrorMessage[] = [];

  constructor(private fb:FormBuilder, private createCodeService:CreateCodeService){
    this.createForm();
    this.typeCache = this.form.value.type;
    this.bindUpdateEvents();
  }
  createForm():void{
    var formValues:CommonCodeOptions = {};
    formValues.level =  this.stateService.params.level ? parseInt(decodeURI(this.stateService.params.level)) : 1;
    formValues.foreground =  this.stateService.params.foreground && isHexColor(this.stateService.params.foreground) ? '#' + decodeURI(this.stateService.params.foreground) : '#000000',
    formValues.background =  this.stateService.params.background && isHexColor(this.stateService.params.background) ? '#' + decodeURI(this.stateService.params.background) : '#ffffff';
    this.form = this.fb.group(formValues);
    this.updateCode(this.form.value)
    this.form = this.fb.group({
      name: ['',
        Validators.required
      ],
      pass: '',
      type:'WPA',
      hidden:false
    },{
      validator: this.isPasswordReqired('type','pass')
    });
    this.bindUpdateEvents();
  }
  bindUpdateEvents():void{
    this.form.valueChanges.subscribe((value:any) => {
      if(this.checkIsTypeChanged(value.type)){
        this.setFormConfigByType(value.type)
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
      this.sendModel(Object.assign({type:'wifi'},this.form.value));
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

  sendModel(formModel):void{
    this.createCodeService.codeValueUpdate(formModel);
  }

  encodeStringComponent(str:string):string{
    var encodedStr = str.replace('"','\\"').replace('"','\\"').replace(',','\\,').replace(';','\\;').replace(':','\\:');
    if(parseInt(encodedStr,16).toString(16) === encodedStr)
      encodedStr = '"' + encodedStr + '"';
    return encodedStr
  }
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
