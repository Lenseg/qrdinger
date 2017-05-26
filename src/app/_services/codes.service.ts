import { Injectable } from '@angular/core';
import { CodeDefinition } from '../global/typeClasses';

@Injectable()
export class CodesService {
  codes: CodeDefinition[] = [{
    background: '#ffffff',
    foreground: '#000000',
    level: 'h',
    value: 'kek',
    id:'1',
    name:'kek',
    type:'Wifi'
  },{
    background: '#eaeaea',
    foreground: '#444444',
    level: 'l',
    value: 'sdflkjgblbehjrdvh;akrnefgkzjd,nvcz',
    id:'2',
    name:'kek2',
    type:'Sms'
  }];

  constructor() { }
  getCode(id){
    for(code of this.codes){
      if(code.id === id)
        return code;
    }
  }
}
