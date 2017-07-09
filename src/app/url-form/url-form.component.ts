import { Component } from '@angular/core';
import { FormControl, Validators }            from '@angular/forms';
import { StateService } from 'ui-router-ng2';
import { ErrorMessage } from '../_global/definitions';

import { ModelUpdateService } from '../_services/index'

import { Code, UrlCodeModel } from '../_global/code';
import { patternWarningWalidator } from '../_global/directives';

@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.pug'
})
export class UrlFormComponent {
  urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  protocolRegexp = /^(http:|ftp:|https:)/;
  urlValue = this.stateService.params.url ? decodeURIComponent(this.stateService.params.url) : '' ;
  url = new FormControl(this.urlValue,[
    Validators.required,
    Validators.pattern(this.urlRegexp),
    patternWarningWalidator(this.protocolRegexp)
  ]);

  errors : ErrorMessage[] = [];
  warns : ErrorMessage[] = [];

  constructor(private modelUpdateService:ModelUpdateService,private stateService:StateService){
    this.bingUpdateEvents();
  }
  bingUpdateEvents():void{
    this.url.valueChanges.subscribe((value:string) => {
      this.errors = [];
      this.warns = [];
      if (!this.url.valid && this.url.dirty){
        for (let err in this.url.errors){
          if (errors[err].type === 'err'){
            this.errors.push(errors[err])
          } else {
            this.warns.push(errors[err])
          };
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    let model = {
      type:'url',
      url:this.url.value
    };
    this.modelUpdateService.modelUpdate(model)
  }
}

const errors = {
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
};
