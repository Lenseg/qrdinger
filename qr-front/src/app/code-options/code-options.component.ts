import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';


import { ParamsService } from '../_services/index';
import { Code, CodeOptions } from '../_global/code';
import { codeTypesRepresentations } from '../_global/definitions';

import { isHexColor } from '../_global/directives';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.html'
})
export class CodeOptionsComponent {
  @Input() code : Code;
  form : FormGroup;
  level : string | number;
  constructor(private fb: FormBuilder, private paramsService:ParamsService, private stateService:StateService){

  }
  ngOnChanges(){
    this.createForm();
    this.bindChangeEvents();
  }
  createForm(){
    var formValues:CodeOptionsForm = {
      level : 1,
      foreground : '#000000',
      background : '#ffffff'
    };
    for(let option in formValues){
      if(option === 'level'){
        formValues.level = this.parseLevel(this.code.options.level)
      } else {
        formValues[option] = this.code.options[option] || formValues[option];
      }
    }
    this.form = this.fb.group(formValues);
    this.updateCode(this.form.value)
  }
  // ngDoCheck() {
  //   if(this.code){
  //     for(let option in this.form.value){
  //       if(option === 'level'){
  //         let cacheValue;
  //         switch(this.code.options.level.toLowerCase()){
  //           case 'l' :
  //             cacheValue = 1;
  //             break;
  //           case 'm' :
  //             cacheValue = 2;
  //             break;
  //           case 'q' :
  //             cacheValue = 3;
  //             break;
  //           case 'h' :
  //             cacheValue = 4;
  //             break;
  //         }
  //         if(this.form.controls[option].value !== cacheValue)
  //           this.form.controls[option].setValue(cacheValue, {emitEvent: false});
  //       } else {
  //         if(this.form.controls[option].value !== this.code.options[option])
  //           this.form.controls[option].setValue(this.code.options[option], {emitEvent: false});
  //       }
  //     }
  //   }
  // }
  bindChangeEvents(){
    this.paramsService.bindFormParamsUpdate(this.form);
    this.form.valueChanges.subscribe(()=>{
      this.updateCode(this.form.value);
    })
  }
  parseLevel(level){
    let parseResult
    if(typeof level === 'string'){
      switch(level.toLowerCase()){
        case 'l' :
          parseResult = 1;
          break;
        case 'm' :
          parseResult = 2;
          break;
        case 'q' :
          parseResult = 3;
          break;
        case 'h' :
          parseResult = 4;
          break;
      }
    } else if (typeof level === 'number'){
      switch(level){
        case 1 :
          parseResult = 'L';
          break;
        case 2 :
          parseResult = 'M';
          break;
        case 3 :
          parseResult = 'Q';
          break;
        case 4 :
          parseResult = 'H';
          break;
      }
    }
    return parseResult
  }
  updateCode(value : CodeOptionsForm){
    var options : any = Object.assign({},value);
    options.level = this.parseLevel(options.level);
    Object.assign(this.code.options, options)
  }
}
class CodeOptionsForm{
  level:number;
  background:string;
  foreground:string;
}
