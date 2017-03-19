import { Component, Input } from '@angular/core';
import { CodeOptions } from '../codeOptions';

@Component({
  selector: 'create-code',
  templateUrl: './create-code.component.pug'
})

export class CreateCodeComponent {
  @Input()
  public codeOptions: CodeOptions = {
    value:''
  };
  constructor () {
  }
  public generateCode(): void {
  };
}
