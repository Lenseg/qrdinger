import { Component, Input } from '@angular/core';
import { CodeDefinition, CodeOptions } from '../global/typeClasses';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 edit:boolean;
 @Input() code:CodeDefinition;
 constructor(){
   console.log(this.code);
 }

}
