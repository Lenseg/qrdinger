import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';

import { ParamsService, ModelUpdateService } from '../_services/index'

import { ErrorMessage } from '../_global/definitions';
import { Code, StringCodeModel } from '../_global/code';


@Component({
  selector: 'string-form',
  templateUrl: './string-form.component.html'
})
export class StringFormComponent {

  form : FormGroup
  errors : ErrorMessage[] = [];

  constructor(private modelUpdateService:ModelUpdateService, private fb:FormBuilder, private paramsService:ParamsService, private stateService:StateService){
    this.createForm();
    this.bindUpdateEvents();
  }
  createForm(){
    let stringValue = this.stateService.params['string'] ? decodeURIComponent(this.stateService.params['string']) : '' ;
    this.form = this.fb.group({
      string: [stringValue,[
        Validators.required
      ]]
    });
  }
  bindUpdateEvents():void{
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe((value:string) => {
      this.errors = [];
      const control = this.form.get('string');
      console.log(control)
      if (control && !control.valid && control.dirty){
        for (const err in control.errors){
          this.errors.push(errors[err])
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    let model = {
      type:'string',
      string:this.form.value.string
    };
    this.modelUpdateService.modelUpdate(model)
  }
}

const errors = {
  required : {
    type:'err',
    message:'Please, put something in text field.'
  }
};
