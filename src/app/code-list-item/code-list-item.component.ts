import { Component, Input } from '@angular/core';
import { Code } from '../_global/code';

@Component({
  selector:'code-list-item',
  templateUrl:'./code-list-item.component.pug'
})

export class CodesListItemComponent {
  @Input('code') code : Code;
}
