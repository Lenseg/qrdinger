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
      for(const controlName in errors){
        const control = this.form.get(controlName);
        this[controlName+'Errors'] = [];
        this[controlName+'Warns'] = [];
        if (control && control.dirty && !control.valid) {
          for (const key in control.errors) {
            console.log('key')
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
  isPasswordReqired(typeControlName:string,passControlName:string){
    return(group: FormGroup) => {
      let typeControl = group.get(typeControlName);
      let passControl = group.get(passControlName);
      console.log(passControl, typeControl.value !== 'nopass', !passControl.untouched, passControl.value === '',passControl.value)
      if(typeControl.value !== 'nopass' && !passControl.untouched && passControl.value === ''){
        return passControl.setErrors({required: true})
      } else {
        return passControl.setErrors({})
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
    this.createCodeService.codeValueUpdate(this.constructWifiString());
  }

  constructWifiString():string{
    var code = 'WIFI:' + 'T:' + this.form.value.type + ';';
    code += 'S:' + this.encodeStringComponent(this.form.value.name) + ';';
    if(this.form.value.type !== 'nopass'){
      code += 'P:' + this.encodeStringComponent(this.form.value.pass) + ';';
    }
    if(this.form.value.hidden){
      code += 'H:true;';
    }
    return code
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
