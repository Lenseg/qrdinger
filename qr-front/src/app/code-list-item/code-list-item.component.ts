import { Component, Input } from '@angular/core';
import { Code } from '../_global/code';

@Component({
  selector:'code-list-item',
  templateUrl:'./code-list-item.component.html'
})

export class CodesListItemComponent {
  @Input('code') code : Code;
}
