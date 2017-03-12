import { Component } from '@angular/core';

import { Code } from './code'

@Component({
  selector:'add-code',
  templateUrl:'./add-code.component.pug'
})

export class AddCodeComponent {

  model = new Code(0, 'no url', 'kek.jpg', 'table');

  submited = false;

  onSubmitt () {
    this.submited = true;
  }
}
