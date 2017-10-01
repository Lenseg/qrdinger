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

  address:string = 'http://qrdinger.com/';

  urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  pathEndRegexp = /^[\w\d_-]+$/;
  protocolRegexp = /^(http:|ftp:|https:)/;

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
    let path =  this.stateService.params['path'] ? decodeURI(this.stateService.params['path']) : '',
    redirect =  this.stateService.params['redirect'] ? decodeURI(this.stateService.params['redirect']) : '';
    this.form = this.fb.group({
      path: [path,[
        Validators.required,
        Validators.pattern(this.pathEndRegexp)
      ]],
      redirect: [redirect,[
        Validators.required,
        Validators.pattern(this.urlRegexp),
        patternWarningWalidator(this.protocolRegexp)
      ]]
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
      address:this.address,
      path:this.form.value.path,
      redirect:this.form.value.redirect
    };
    this.modelUpdateService.modelUpdate(model)
  }
}
const errors = {
  path:{
    required : {
      type:'err',
      message:'Path cant be empty?'
    },
    pattern : {
      type:'err',
      message:'Only alpha-numeric and -_ allowed.'
    },
  },
  redirect : {
    pattern : {
      type:'err',
      message:'Your link is incorrect.'
    },
    required : {
      type:'err',
      message:'Please, put something in link field.'
    },
    patternWarning : {
      type:'warn',
      message:'Http(s) protocol prefix is reccomended.'
    }
  }

}
