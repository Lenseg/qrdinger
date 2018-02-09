import { Component, Input } from '@angular/core';
import { Code } from '../_global/code';
import { CodesService } from '../_services/index';

@Component({
  selector: 'app-code-list-item',
  templateUrl: './code-list-item.component.html'
})

export class CodesListItemComponent {
  @Input('code') code: Code;

  constructor(private codesService: CodesService) {}

  delete() {
    this.codesService.removeCode(this.code.id);
  }
}
