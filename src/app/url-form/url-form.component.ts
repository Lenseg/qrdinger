import { Component } from '@angular/core';
import { FormControl, Validators }            from '@angular/forms';
import { CreateCodeService }  from '../create-code/create-code.service';
import { patternWarningWalidator } from '../global/directives';

import { ErrorMessage } from '../global/typeClasses';
@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.pug'
})
export class UrlFormComponent {
  urlRegexp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  protocolRegexp = /^(http:|ftp:|https:)/;
  url = new FormControl('',[
    Validators.required,
    Validators.pattern(this.urlRegexp),
    patternWarningWalidator(this.protocolRegexp)
  ]);

  errors : ErrorMessage[] = [];
  warns : ErrorMessage[] = [];

  constructor(private createCodeService:CreateCodeService){
    this.bingUpdateEvents();
  }
  bingUpdateEvents():void{
    this.url.valueChanges.subscribe((value:string) => {
      this.errors = [];
      this.warns = [];
      if (!this.url.valid && !this.url.untouched){
        for (const err in this.url.errors){
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
    this.createCodeService.codeValueUpdate(this.url.value);
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
