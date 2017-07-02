import { Component, Input } from '@angular/core';
import { Code, CodeOptions } from '../global/typeClasses';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 @Input() code:Code;
  edit:boolean;
  codeOptions:CodeOptions={};
 constructor(){
   console.log(this.code,'singleConstr')
  //  this.code
   this.codeOptions = this.creareCodeOptions();
 }
 ngOnChanges(){
   this.codeOptions = this.creareCodeOptions();
 }
 creareCodeOptions(){
   var opts = Object.assign({},this.code);
   delete opts.id;
   delete opts.type;
   delete opts.name;
   return opts;
 }
}
