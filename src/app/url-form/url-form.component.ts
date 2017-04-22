import { Component } from '@angular/core';
import { CreateCodeService }  from '../create-code/create-code.service';
import { FormControl, Validators }            from '@angular/forms';

@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.pug'
})
export class UrlFormComponent {
  urlRegexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

  url = new FormControl('',[
    Validators.required,
    Validators.pattern(this.urlRegexp)
  ]);

  urlErrors : errorMessage[] = [];

  constructor(public createCodeService:CreateCodeService){
    this.url.valueChanges.forEach((value:string) => {
      this.urlErrors = [];
      if(!this.url.valid){
        for(let err in this.url.errors){
          this.urlErrors.push(errors[err])
        }
      }
      this.sendModel();
    });
  }
  sendModel():void{
    this.createCodeService.codeValueUpdate('url:' + this.url.value);
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
  patternProtocol : {
    type:'warn',
    message:'http(s) protocol prefix is reccomended.'
  }
};
class errorMessage {
  type:string,
  message:string
};
