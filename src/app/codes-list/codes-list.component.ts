import { Component } from '@angular/core';
import { CodeDefinition } from '../global/typeClasses'

@Component({
  selector:'codes-list',
  templateUrl:'./codes-list.component.pug'
})

export class CodesListComponent {
  codesList : CodeDefinition[];
}
