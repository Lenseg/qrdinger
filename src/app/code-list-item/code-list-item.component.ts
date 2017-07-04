import { Component, Input } from '@angular/core';
import { Code, CodeOptions } from '../global/typeClasses';

@Component({
  selector:'code-list-item',
  templateUrl:'./code-list-item.component.pug'
})

export class CodesListItemComponent {
  @Input('code') code : Code;
}
