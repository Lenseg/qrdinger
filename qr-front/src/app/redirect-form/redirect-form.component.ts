import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators }            from '@angular/forms';
import { StateService } from '@uirouter/angular';

import { ParamsService, ModelUpdateService } from '../_services/index'

import { Code } from '../_global/code';
import { ErrorMessage } from '../_global/definitions';
import { patternWarningWalidator } from '../_global/directives';

@Component({
  selector: 'app-redirect-form',
  templateUrl: './redirect-form.component.html'
})
export class RedirectFormComponent {

  code:Code;

  form : FormGroup;

  pathErrors: ErrorMessage[] = [];
  pathWarns: ErrorMessage[] = [];
  redirectErrors: ErrorMessage[] = [];
  redirectWarns: ErrorMessage[] = [];
  constructor(private modelUpdateService:ModelUpdateService, private paramsService:ParamsService, private fb:FormBuilder, private stateService:StateService){
    this.createForm();
    this.bindUpdateEvents();
    this.setModel();
  }
  createForm():void{
    let path =  this.stateService.params['number'] ? decodeURI(this.stateService.params['number']) : '',
    redirect =  this.stateService.params['message'] ? decodeURI(this.stateService.params['message']) : '';
    this.form = this.fb.group({
      path: [path,[
        Validators.required
      ]],
      redirect: [redirect,Validators.required]
    });
  }
  bindUpdateEvents():void{
    this.paramsService.bindFormParamsUpdate(this.form);
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
    let model = {
      type:'redirect',
      number:this.form.value.path,
      message:this.form.value.redirect
    };
    this.modelUpdateService.modelUpdate(model)
  }
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
