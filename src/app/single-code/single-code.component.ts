import { Component } from '@angular/core';
import { CodeDefinition, CodeOptions } from '../global/typeClasses';
import { CodesService } from '../_services/index'

@Component({
  selector:'single-code',
  templateUrl:'./single-code.component.pug'
})

export class SingleCodeComponent {
 edit:boolean;
 consturctor(private codesService:CodesService){

 }
}
