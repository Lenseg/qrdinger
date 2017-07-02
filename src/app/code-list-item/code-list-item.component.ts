import { Component, Input } from '@angular/core';
import { Code, CodeOptions } from '../global/typeClasses';

@Component({
  selector:'code-list-item',
  templateUrl:'./code-list-item.component.pug'
})

export class CodesListItemComponent {
  @Input('code') code : Code;
  codeOptions : CodeOptions;
  constructor(){
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
