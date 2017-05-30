import { Component, Input } from '@angular/core';
import { CodeDefinition, CodeOptions } from '../global/typeClasses';

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 @Input() code:CodeDefinition;
  edit:boolean;
  codeOptions:CodeOptions={};
 constructor(){
   console.log(this.code)
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
