import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StateService } from 'ui-router-ng2';

import { ModelUpdateService } from '../_services/index'

import { ErrorMessage } from '../_global/definitions';
import { Code, StringCodeModel } from '../_global/code';


@Component({
  selector: 'string-form',
  templateUrl: './string-form.component.pug'
})
export class StringFormComponent {
  stringValue = this.stateService.params.text ? decodeURIComponent(this.stateService.params.text) : '' ;
  string = new FormControl(this.stringValue,[
    Validators.required
  ]);

  errors : ErrorMessage[] = [];

  constructor(private modelUpdateService:ModelUpdateService, private stateService:StateService){
    this.bindUpdateEvents()
  }
  bindUpdateEvents():void{
    this.string.valueChanges.subscribe((value:string) => {
      this.errors = [];
      if (!this.string.valid && this.string.dirty){
        for (const err in this.string.errors){
          this.errors.push(errors[err])
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    let model = {
      type:'string',
      string:this.string.value
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
