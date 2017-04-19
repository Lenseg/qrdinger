import { Component } from '@angular/core';
import { CreateCodeService }  from '../create-code/create-code.service';

@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.pug'
})
export class UrlFormComponent {
  public url:string;

  constructor(public createCodeService:CreateCodeService){

  }
  sendModel():void{
    this.createCodeService.codeValueUpdate('url:' + this.url);
  }
}
