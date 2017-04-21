import { Component, EventEmitter, Output } from '@angular/core';

import { CodeOptions } from '../code-options-model';
@Component({
  selector: 'code-options',
  templateUrl: './code-options.component.pug'
})
export class CodeOptionsComponent {
  public options : CodeOptions = {};
  public level : number;

  @Output() onOptionsUpdate = new EventEmitter<CodeOptions>();

  updateOptions(){
    var level = '';
    switch(this.level){
      case 1 :
        level = 'L';
        break;
      case 2 :
        level = 'M';
        break;
      case 3 :
        level = 'Q';
        break;
      case 4 :
        level = 'H';
        break;
    }
    this.options.level = level;
    this.onOptionsUpdate.emit(this.options);
  }
}
