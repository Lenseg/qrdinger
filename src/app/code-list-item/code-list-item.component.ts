import { Component } from '@angular/core';
import { CodeDefinition } from '../global/typeClasses';

@Component({
  selector:'codes-list-item',
  templateUrl:'./code-list-item.component.pug'
})

export class CodesListItemComponent {
  code : CodeDefinition;
}
