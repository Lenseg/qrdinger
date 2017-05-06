import { Component } from '@angular/core';
import { FormControl, Validators }            from '@angular/forms';
import { CreateCodeService }  from '../create-code/create-code.service';

import { StateService } from 'ui-router-ng2';
import { ErrorMessage } from '../global/typeClasses';


@Component({
  selector: 'string-form',
  templateUrl: './string-form.component.pug'
})
export class StringFormComponent {
  textValue = this.stateService.params.text ? decodeURIComponent(this.stateService.params.text) : '' ;
  string = new FormControl(this.textValue,[
    Validators.required
  ]);

  errors : ErrorMessage[] = [];

  constructor(private createCodeService:CreateCodeService, private stateService:StateService){
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
      this.setUrlParams();
      this.sendModel();
    });
  }
  sendModel():void{
    this.createCodeService.codeValueUpdate(this.string.value);
  }
  setUrlParams(){
    this.stateService.go(this.stateService.current,{
      text:encodeURIComponent(this.string.value)
    })
  }
}

const errors = {
  required : {
    type:'err',
    message:'Please, put something in text field.'
  }
};
