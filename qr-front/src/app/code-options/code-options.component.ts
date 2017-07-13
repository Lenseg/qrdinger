import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';

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
  constructor(private fb: FormBuilder, private stateService:StateService){

  }
  ngOnInit(){
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
        switch(this.code.options.level.toLowerCase()){
          case 'l' :
            formValues.level = 1;
            break;
          case 'm' :
            formValues.level = 2;
            break;
          case 'q' :
            formValues.level = 3;
            break;
          case 'h' :
            formValues.level = 4;
            break;
        }
      } else {
        formValues[option] = this.code.options[option] || formValues[option];
      }
    }
    formValues.level =  this.stateService.params['level'] ? parseInt(decodeURIComponent(this.stateService.params['level'])) : formValues.level;
    formValues.foreground =  this.stateService.params['foreground'] ? decodeURIComponent(this.stateService.params['foreground']) : formValues.foreground,
    formValues.background =  this.stateService.params['background'] ? decodeURIComponent(this.stateService.params['background']) : formValues.background;
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
    this.form.valueChanges.subscribe(()=>{
      this.updateCode(this.form.value);
    })
  }
  updateCode(value : CodeOptionsForm){
    var options : any = Object.assign({},value);
    switch(options.level){
      case 1 :
        options.level = 'L';
        break;
      case 2 :
        options.level = 'M';
        break;
      case 3 :
        options.level = 'Q';
        break;
      case 4 :
        options.level = 'H';
        break;
    }
    this.level = options.level;
    console.log(this.code, options)
    Object.assign(this.code.options, options)
  }
}
class CodeOptionsForm{
  level:number;
  background:string;
  foreground:string;
}
