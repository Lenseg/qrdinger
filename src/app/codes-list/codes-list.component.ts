import { Component } from '@angular/core';
import { CodeDefinition } from '../global/typeClasses'

@Component({
  selector:'codes-list',
  templateUrl:'./codes-list.component.pug'
})

export class CodesListComponent {
  codesList : CodeDefinition[];
  constructor(){
    this.codesList = [{
      background: '#ffffff',
      foreground: '#000000',
      level: 'h',
      value: 'kek',
      id:'1',
      name:'kek',
      type:'Wifi'
    }]
  }
}
